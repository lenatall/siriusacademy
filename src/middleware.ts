import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import type { SessionData } from '@/lib/session'

const SESSION_DURATION_MS = 2 * 60 * 60 * 1000

const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'sirius_admin_session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 2,
  },
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login'
  const isAdminApi = pathname.startsWith('/api/admin') && pathname !== '/api/admin/auth'

  if (!isAdminPage && !isAdminApi) return NextResponse.next()

  const response = NextResponse.next()

  try {
    const session = await getIronSession<SessionData>(request, response, sessionOptions)

    if (!session.isAdmin || !session.lastActivity) {
      return unauthenticated(request, pathname)
    }

    const now = Date.now()
    if (now - session.lastActivity > SESSION_DURATION_MS) {
      session.destroy()
      await session.save()
      return unauthenticated(request, pathname)
    }

    // Refresh lastActivity (rolling session)
    session.lastActivity = now
    await session.save()

    return response
  } catch {
    return unauthenticated(request, pathname)
  }
}

function unauthenticated(request: NextRequest, pathname: string) {
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const loginUrl = new URL('/admin/login', request.url)
  loginUrl.searchParams.set('redirect', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
