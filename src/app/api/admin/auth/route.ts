import { NextResponse } from 'next/server'

const ADMIN_USER = process.env.ADMIN_USER || 'admin'
const ADMIN_PASS = process.env.ADMIN_PASS || 'sirius2024'

export async function POST(request: Request) {
  const { username, password } = await request.json()
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return NextResponse.json({ success: true, token: 'admin-session-ok' })
  }
  return NextResponse.json({ success: false, message: 'Identifiants incorrects' }, { status: 401 })
}
