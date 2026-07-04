'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Access denied.'); return }
      router.push('/community')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg-primary, #0A0A0A)' }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(207,106,62,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <svg width="52" height="52" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SR mark">
            <defs>
              <linearGradient id="lg-login" gradientUnits="userSpaceOnUse" x1="4" y1="8" x2="96" y2="92">
                <stop offset="0%"   stopColor="#E8956A"/>
                <stop offset="45%"  stopColor="#CF6A3E"/>
                <stop offset="100%" stopColor="#A84B2A"/>
              </linearGradient>
            </defs>
            <path d="M 43,14 C 43,6 8,6 8,26 C 8,46 44,46 44,66 C 44,86 8,86 8,76"
                  fill="none" stroke="url(#lg-login)" strokeWidth="8.5" strokeLinecap="round"/>
            <path d="M 57,10 L 57,88"
                  fill="none" stroke="url(#lg-login)" strokeWidth="8.5" strokeLinecap="round"/>
            <path d="M 57,10 C 78,10 93,20 93,36 C 93,53 78,56 57,56"
                  fill="none" stroke="url(#lg-login)" strokeWidth="8.5" strokeLinecap="round"/>
            <path d="M 68,56 L 93,88"
                  fill="none" stroke="url(#lg-login)" strokeWidth="8.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <h1
            className="text-2xl font-bold text-center mb-2"
            style={{ color: '#F0EBE3' }}
          >
            GenAI Community
          </h1>
          <p className="text-center text-sm mb-8" style={{ color: 'rgba(240,235,227,0.5)' }}>
            Enter the email you enrolled with to access your community space.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium mb-1.5 tracking-wide uppercase"
                style={{ color: 'rgba(240,235,227,0.55)' }}
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#F0EBE3',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(207,106,62,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(207,106,62,0.15)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
              />
            </div>

            {error && (
              <p className="text-sm text-center" style={{ color: '#F08080' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-3 text-sm font-semibold transition-all"
              style={{
                background: loading ? 'rgba(207,106,62,0.5)' : 'linear-gradient(135deg,#E8956A,#CF6A3E)',
                color: '#fff',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Verifying…' : 'Access Community →'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'rgba(240,235,227,0.3)' }}>
          Not enrolled yet?{' '}
          <a
            href="/#booking"
            style={{ color: 'rgba(207,106,62,0.8)', textDecoration: 'underline' }}
          >
            Join the next cohort
          </a>
        </p>
      </div>
    </main>
  )
}
