import { getIronSession, IronSession } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
  isAdmin?: boolean
  lastActivity?: number
}

export const SESSION_DURATION_MS = 2 * 60 * 60 * 1000 // 2 hours

export const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'sirius_admin_session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 2, // 2 hours in seconds
  },
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies()
  return getIronSession<SessionData>(cookieStore, sessionOptions)
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const session = await getSession()
    if (!session.isAdmin) return false
    if (!session.lastActivity) return false
    if (Date.now() - session.lastActivity > SESSION_DURATION_MS) return false
    return true
  } catch {
    return false
  }
}
