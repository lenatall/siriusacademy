import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createSessionToken, COOKIE_NAME, COOKIE_OPTIONS } from '@/lib/session'
import { checkRateLimit, recordFailedAttempt, recordSuccessfulLogin } from '@/lib/rateLimit'

export const runtime = 'nodejs'

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return 'unknown'
}

export async function POST(request: Request) {
  const ip = getClientIp(request)

  let body: { username?: string; password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Requête invalide' }, { status: 400 })
  }

  const { username = '', password = '' } = body

  const rateCheck = checkRateLimit(ip, username)
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { success: false, message: 'Trop de tentatives. Veuillez réessayer plus tard.' },
      { status: 429 }
    )
  }

  const adminUsername = process.env.ADMIN_USERNAME ?? 'admin'
  const adminHash = process.env.ADMIN_PASSWORD_HASH ?? ''

  const usernameMatch = username === adminUsername
  const passwordMatch = adminHash ? await bcrypt.compare(password, adminHash) : false

  if (!usernameMatch || !passwordMatch) {
    const result = recordFailedAttempt(ip, username)
    if (!result.allowed) {
      return NextResponse.json(
        { success: false, message: 'Trop de tentatives. Veuillez réessayer plus tard.' },
        { status: 429 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Identifiants incorrects.' },
      { status: 401 }
    )
  }

  recordSuccessfulLogin(ip, username)

  const token = await createSessionToken()
  const response = NextResponse.json({ success: true })
  response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS)

  return response
}
