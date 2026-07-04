import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Inlined here to avoid importing next/headers (not available in Edge runtime)
const COOKIE = 'sr_community_token'
const edgeSecret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'sr-community-2026-fallback'
)
async function hasValidSession(token: string | undefined) {
  if (!token) return false
  try { await jwtVerify(token, edgeSecret); return true } catch { return false }
}

// Bots that should never access the site (scrapers, vulnerability scanners, etc.)
// Note: legitimate search engine bots (Googlebot, Bingbot, etc.) are explicitly allowed below.
const BLOCKED_PATTERNS = [
  /sqlmap/i,
  /nikto/i,
  /masscan/i,
  /zgrab/i,
  /nmap/i,
  /dirbuster/i,
  /havij/i,
  /acunetix/i,
]

// Paths that must never be accessible from the browser
const BLOCKED_PATHS = new Set([
  '/wp-admin',
  '/wp-login',
  '/phpmyadmin',
  '/.env',
  '/.git',
  '/config',
  '/admin',
])

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ua = request.headers.get('user-agent') ?? ''

  // Community route protection
  if (pathname.startsWith('/community')) {
    const token = request.cookies.get(COOKIE)?.value
    if (!(await hasValidSession(token))) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Admin route protection
  if (pathname.startsWith('/admin/community')) {
    const token = request.cookies.get('sr_admin_token')?.value
    const valid = token ? await hasValidSession(token) : false
    if (!valid) return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // 1. Block known attack tool signatures in the User-Agent header
  if (BLOCKED_PATTERNS.some(p => p.test(ua))) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // 2. Block probing for common CMS / server paths that don't exist on this site
  if (BLOCKED_PATHS.has(pathname)) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // 3. Block requests with no User-Agent (almost always automated scrapers)
  //    Exception: allow Vercel/Netlify health checks which have no UA
  const isHealthCheck = request.headers.get('x-vercel-id') || request.headers.get('x-nf-request-id')
  if (!ua && !isHealthCheck) {
    return new NextResponse('Bad Request', { status: 400 })
  }

  // 4. Force HTTPS in production (belt-and-suspenders — HSTS header also handles this)
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') === 'http'
  ) {
    const host = request.headers.get('host')
    if (!host) return NextResponse.next()
    return NextResponse.redirect(
      `https://${host}${pathname}${request.nextUrl.search}`,
      301
    )
  }

  return NextResponse.next()
}

export const config = {
  // Run middleware on all routes except Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}
