import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { isAdminAuthenticated } from '@/lib/session'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  let body: { currentPassword?: string; newPassword?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  }

  const { currentPassword = '', newPassword = '' } = body

  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json(
      { error: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' },
      { status: 400 }
    )
  }

  const adminHash = process.env.ADMIN_PASSWORD_HASH ?? ''
  const currentValid = adminHash ? await bcrypt.compare(currentPassword, adminHash) : false

  if (!currentValid) {
    return NextResponse.json({ error: 'Mot de passe actuel incorrect.' }, { status: 401 })
  }

  const newHash = await bcrypt.hash(newPassword, 12)

  // Write new hash to .env.local
  const envPath = path.join(process.cwd(), '.env.local')
  try {
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : ''
    if (envContent.includes('ADMIN_PASSWORD_HASH=')) {
      envContent = envContent.replace(/^ADMIN_PASSWORD_HASH=.*/m, `ADMIN_PASSWORD_HASH=${newHash}`)
    } else {
      envContent += `\nADMIN_PASSWORD_HASH=${newHash}\n`
    }
    fs.writeFileSync(envPath, envContent, 'utf-8')
    // Force env var update in current process (takes effect immediately)
    process.env.ADMIN_PASSWORD_HASH = newHash
  } catch {
    return NextResponse.json(
      { error: 'Impossible de sauvegarder. Mettez à jour ADMIN_PASSWORD_HASH manuellement.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, hash: newHash })
}
