/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevent browsers from guessing (sniffing) the content type
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Prevent this site from being embedded in an iframe on another site (clickjacking)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Force HTTPS for 2 years — never downgrade to HTTP
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Only send the page origin (not the full URL) in the Referer header
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Block camera, microphone, geolocation — this site does not use them
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  // Enable browser DNS prefetching for faster external link loads
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

const nextConfig = {
  // Apply security headers to every route
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  // Redirect www to non-www (canonical URL consolidation)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.srinivasanramanujam.com' }],
        destination: 'https://srinivasanramanujam.com/:path*',
        permanent: true,
      },
    ]
  },

  // Disable the X-Powered-By: Next.js header (don't reveal framework to attackers)
  poweredByHeader: false,

  // Strict React mode — catches potential issues early in development
  reactStrictMode: true,
}

module.exports = nextConfig
