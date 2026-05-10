import { NextResponse } from 'next/server'
import { COOKIE_NAME } from '@/lib/session'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
  return response
}
