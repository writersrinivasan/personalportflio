'use client'

import { useEffect } from 'react'

// Catches errors in the root layout itself — last line of defence
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#07070F', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '24px' }}>
        <div>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h1 style={{ color: '#E2DFEF', fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#6E6C90', fontSize: '14px', marginBottom: '32px', maxWidth: '320px', lineHeight: 1.6 }}>
            A critical error occurred. Please refresh or contact writersrinivasan@gmail.com.
          </p>
          <button
            onClick={reset}
            style={{ background: '#F97316', color: '#fff', border: 'none', borderRadius: '100px', padding: '12px 28px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
          >
            Try again
          </button>
          {error.digest && (
            <p style={{ color: '#3E3C60', fontSize: '11px', marginTop: '24px', fontFamily: 'monospace' }}>
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  )
}
