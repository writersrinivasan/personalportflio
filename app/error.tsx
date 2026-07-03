'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error for debugging — replace with a real logging service (Sentry, etc.) post-launch
    console.error('[Page Error]', error)
  }, [error])

  return (
    <main className="min-h-screen bg-brand-dark flex items-center justify-center px-6 text-center">
      <div>
        <div className="text-5xl mb-6">⚠️</div>
        <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
        <p className="text-white/50 text-base mb-10 max-w-sm mx-auto leading-relaxed">
          An unexpected error occurred. Please try again — if the problem persists, reach out directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all hover:shadow-lg hover:shadow-orange-400/30"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-medium px-6 py-3 rounded-full text-sm transition-all"
          >
            Back to home
          </a>
        </div>
        {error.digest && (
          <p className="text-white/20 text-xs mt-8 font-mono">Error ID: {error.digest}</p>
        )}
      </div>
    </main>
  )
}
