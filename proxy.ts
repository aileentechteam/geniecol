import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PREVIEW_COOKIE = 'genie_preview_auth'

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  const isProtectedPath = pathname.startsWith('/preview') || pathname === '/jack-henry'

  if (!isProtectedPath) {
    return NextResponse.next()
  }

  if (pathname === '/preview/login') {
    return NextResponse.next()
  }

  const configuredPassword = process.env.STAGING_PASSWORD

  if (!configuredPassword) {
    return NextResponse.redirect(new URL('/preview/login?setup=1', request.url))
  }

  const cookieValue = request.cookies.get(PREVIEW_COOKIE)?.value
  if (cookieValue === configuredPassword) {
    return NextResponse.next()
  }

  const loginUrl = new URL('/preview/login', request.url)
  loginUrl.searchParams.set('next', `${pathname}${search}`)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/preview/:path*', '/jack-henry'],
}
