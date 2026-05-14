import { NextResponse } from 'next/server'

const PREVIEW_COOKIE = 'genie_preview_auth'

export async function POST(request: Request) {
  const formData = await request.formData()
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('next') ?? '/preview')
  const configuredPassword = process.env.STAGING_PASSWORD

  if (!configuredPassword) {
    return NextResponse.redirect(new URL('/preview/login?setup=1', request.url), 303)
  }

  if (password !== configuredPassword) {
    return NextResponse.redirect(new URL(`/preview/login?error=1&next=${encodeURIComponent(next)}`, request.url), 303)
  }

  const response = NextResponse.redirect(new URL(next.startsWith('/preview') ? next : '/preview', request.url), 303)
  response.cookies.set(PREVIEW_COOKIE, configuredPassword, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/preview',
    maxAge: 60 * 60 * 12,
  })
  return response
}
