import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ua = request.headers.get('user-agent') ?? ''

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
