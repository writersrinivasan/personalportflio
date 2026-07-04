'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Member = {
  email: string
  name: string
  phone: string | null
  whatsapp_consent: boolean
  placement_consent: boolean
  bio: string | null
  linkedin_url: string | null
  resume_url: string | null
  resume_name: string | null
  joined_at: string
  updated_at: string | null
}

const CORAL = '#CF6A3E'
const CORAL_LIGHT = '#E8956A'

function Pill({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
      style={{
        background: on ? 'rgba(37,211,102,0.12)' : 'rgba(255,255,255,0.06)',
        color: on ? '#4ade80' : 'rgba(240,235,227,0.35)',
      }}
    >
      {on ? '✓' : '–'} {label}
    </span>
  )
}

export default function AdminDashboard() {
  const router   = useRouter()
  const [members, setMembers]   = useState<Member[]>([])
  const [loading, setLoading]   = useState(true)
  const [search,  setSearch]    = useState('')
  const [dlLoading, setDlLoading] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/members')
      .then(r => { if (r.status === 401) { router.push('/admin/login'); throw new Error() } return r.json() })
      .then(d => { setMembers(d); setLoading(false) })
      .catch(() => {})
  }, [router])

  async function downloadResume(member: Member) {
    if (!member.resume_url) return
    setDlLoading(member.email)
    const res = await fetch('/api/admin/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: member.resume_url }),
    })
    setDlLoading(null)
    if (res.ok) {
      const { url } = await res.json()
      window.open(url, '_blank')
    }
  }

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const filtered = members.filter(m =>
    !search ||
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    total:      members.length,
    withPhone:  members.filter(m => m.phone).length,
    waConsent:  members.filter(m => m.whatsapp_consent).length,
    plConsent:  members.filter(m => m.placement_consent).length,
    withResume: members.filter(m => m.resume_url).length,
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
        <div style={{ color: CORAL }} className="text-xl animate-pulse">Loading members…</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ background: '#0A0A0A', color: '#F0EBE3' }}>
      <div className="pointer-events-none fixed inset-0" style={{
        background: 'radial-gradient(ellipse 70% 35% at 60% 0%, rgba(207,106,62,0.09) 0%, transparent 65%)',
      }} />

      {/* Nav */}
      <nav
        className="sticky top-0 z-40 flex items-center justify-between px-5 py-4"
        style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none" aria-label="SR mark">
            <defs>
              <linearGradient id="lg-anav" gradientUnits="userSpaceOnUse" x1="4" y1="8" x2="96" y2="92">
                <stop offset="0%"   stopColor="#E8956A"/>
                <stop offset="45%"  stopColor="#CF6A3E"/>
                <stop offset="100%" stopColor="#A84B2A"/>
              </linearGradient>
            </defs>
            <path d="M 43,14 C 43,6 8,6 8,26 C 8,46 44,46 44,66 C 44,86 8,86 8,76" fill="none" stroke="url(#lg-anav)" strokeWidth="8.5" strokeLinecap="round"/>
            <path d="M 57,10 L 57,88" fill="none" stroke="url(#lg-anav)" strokeWidth="8.5" strokeLinecap="round"/>
            <path d="M 57,10 C 78,10 93,20 93,36 C 93,53 78,56 57,56" fill="none" stroke="url(#lg-anav)" strokeWidth="8.5" strokeLinecap="round"/>
            <path d="M 68,56 L 93,88" fill="none" stroke="url(#lg-anav)" strokeWidth="8.5" strokeLinecap="round"/>
          </svg>
          <div>
            <span className="font-semibold text-sm" style={{ color: '#F0EBE3' }}>Admin</span>
            <span className="text-xs ml-2" style={{ color: 'rgba(240,235,227,0.35)' }}>Community Dashboard</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="text-xs px-3 py-1.5 rounded-lg transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(240,235,227,0.5)' }}
        >
          Sign out
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Total Members', value: stats.total,      icon: '👥' },
            { label: 'Phone Added',   value: stats.withPhone,  icon: '📱' },
            { label: 'WhatsApp OK',   value: stats.waConsent,  icon: '💬' },
            { label: 'Open to Refs',  value: stats.plConsent,  icon: '🚀' },
            { label: 'Resume Up',     value: stats.withResume, icon: '📄' },
          ].map(s => (
            <div
              key={s.label}
              className="rounded-xl p-4 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-bold" style={{ color: CORAL_LIGHT }}>{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(240,235,227,0.4)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'rgba(240,235,227,0.3)' }}>🔍</span>
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: '#F0EBE3' }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(207,106,62,0.5)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)' }}
          />
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['Name / Email', 'Phone', 'Consents', 'LinkedIn', 'Resume', 'Joined'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium tracking-wide uppercase" style={{ color: 'rgba(240,235,227,0.4)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-sm" style={{ color: 'rgba(240,235,227,0.3)' }}>
                      No members found.
                    </td>
                  </tr>
                )}
                {filtered.map((m, i) => (
                  <tr
                    key={m.email}
                    style={{
                      background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    {/* Name / Email */}
                    <td className="px-4 py-3">
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(240,235,227,0.4)' }}>{m.email}</p>
                      {m.bio && (
                        <p className="text-xs mt-1 max-w-xs truncate" style={{ color: 'rgba(240,235,227,0.35)' }} title={m.bio}>
                          {m.bio}
                        </p>
                      )}
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-3">
                      {m.phone
                        ? <span style={{ color: '#F0EBE3' }}>{m.phone}</span>
                        : <span style={{ color: 'rgba(240,235,227,0.25)' }}>—</span>
                      }
                    </td>

                    {/* Consents */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <Pill on={m.whatsapp_consent} label="WhatsApp" />
                        <Pill on={m.placement_consent} label="Referral" />
                      </div>
                    </td>

                    {/* LinkedIn */}
                    <td className="px-4 py-3">
                      {m.linkedin_url
                        ? (
                          <a
                            href={m.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs underline"
                            style={{ color: CORAL_LIGHT }}
                          >
                            View ↗
                          </a>
                        )
                        : <span style={{ color: 'rgba(240,235,227,0.25)' }}>—</span>
                      }
                    </td>

                    {/* Resume */}
                    <td className="px-4 py-3">
                      {m.resume_url ? (
                        <button
                          onClick={() => downloadResume(m)}
                          disabled={dlLoading === m.email}
                          className="text-xs px-3 py-1.5 rounded-lg transition-all"
                          style={{
                            background: 'rgba(207,106,62,0.15)',
                            border: `1px solid rgba(207,106,62,0.3)`,
                            color: CORAL_LIGHT,
                            cursor: dlLoading === m.email ? 'not-allowed' : 'pointer',
                          }}
                        >
                          {dlLoading === m.email ? '…' : '⬇ Download'}
                        </button>
                      ) : (
                        <span style={{ color: 'rgba(240,235,227,0.25)' }}>—</span>
                      )}
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-3 text-xs" style={{ color: 'rgba(240,235,227,0.4)' }}>
                      {new Date(m.joined_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-center pb-4" style={{ color: 'rgba(240,235,227,0.2)' }}>
          Showing {filtered.length} of {members.length} members · Data from Supabase
        </p>
      </div>
    </main>
  )
}
