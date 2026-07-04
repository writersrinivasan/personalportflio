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

type Announcement = {
  id: string
  title: string
  body: string
  tag: string
  pinned: boolean
  created_at: string
}

const TAGS = ['General', 'Opportunity', 'Event', 'Newsletter', 'Resource', 'Urgent']

const TAG_COLORS: Record<string, string> = {
  General:     'rgba(240,235,227,0.15)',
  Opportunity: 'rgba(74,222,128,0.15)',
  Event:       'rgba(96,165,250,0.15)',
  Newsletter:  'rgba(207,106,62,0.2)',
  Resource:    'rgba(167,139,250,0.15)',
  Urgent:      'rgba(248,113,113,0.2)',
}
const TAG_TEXT: Record<string, string> = {
  General:     'rgba(240,235,227,0.6)',
  Opportunity: '#4ade80',
  Event:       '#60a5fa',
  Newsletter:  '#E8956A',
  Resource:    '#a78bfa',
  Urgent:      '#f87171',
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

  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [annTitle,  setAnnTitle]  = useState('')
  const [annBody,   setAnnBody]   = useState('')
  const [annTag,    setAnnTag]    = useState('General')
  const [annPinned, setAnnPinned] = useState(false)
  const [annSaving, setAnnSaving] = useState(false)
  const [annToast,  setAnnToast]  = useState('')

  function showToast(msg: string) {
    setAnnToast(msg)
    setTimeout(() => setAnnToast(''), 3000)
  }

  useEffect(() => {
    fetch('/api/admin/members')
      .then(r => { if (r.status === 401) { router.push('/admin/login'); throw new Error() } return r.json() })
      .then(d => { setMembers(d); setLoading(false) })
      .catch(() => {})

    fetch('/api/admin/announcements')
      .then(r => r.ok ? r.json() : [])
      .then(d => setAnnouncements(Array.isArray(d) ? d : []))
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

  async function postAnnouncement() {
    if (!annTitle.trim() || !annBody.trim()) return
    setAnnSaving(true)
    const res = await fetch('/api/admin/announcements', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ title: annTitle, body: annBody, tag: annTag, pinned: annPinned }),
    })
    setAnnSaving(false)
    if (res.ok) {
      const newAnn = await res.json()
      setAnnouncements(prev => [newAnn, ...prev])
      setAnnTitle(''); setAnnBody(''); setAnnTag('General'); setAnnPinned(false)
      showToast('Announcement posted!')
    } else {
      showToast('Failed to post.')
    }
  }

  async function deleteAnnouncement(id: string) {
    const res = await fetch('/api/admin/announcements', {
      method:  'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ id }),
    })
    if (res.ok) {
      setAnnouncements(prev => prev.filter(a => a.id !== id))
      showToast('Deleted.')
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

      {/* Toast */}
      {annToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl text-sm font-medium shadow-lg"
          style={{ background: '#1E1208', border: `1px solid ${CORAL}`, color: CORAL_LIGHT }}>
          {annToast}
        </div>
      )}

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

        {/* Announcement composer */}
        <section className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <span>📢</span> Post Announcement
          </h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Title  (e.g. New job opening at Hexaware!)"
              value={annTitle}
              onChange={e => setAnnTitle(e.target.value)}
              className="w-full rounded-lg px-4 py-3 text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#F0EBE3' }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(207,106,62,0.5)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />
            <textarea
              rows={4}
              placeholder="Write your announcement here… share an opportunity, an event, a resource, or a shoutout."
              value={annBody}
              onChange={e => setAnnBody(e.target.value)}
              className="w-full rounded-lg px-4 py-3 text-sm outline-none resize-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#F0EBE3' }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(207,106,62,0.5)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />
            <div className="flex flex-wrap items-center gap-3">
              {/* Tag selector */}
              <div className="flex flex-wrap gap-2">
                {TAGS.map(t => (
                  <button
                    key={t}
                    onClick={() => setAnnTag(t)}
                    className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                    style={{
                      background: annTag === t ? TAG_COLORS[t] : 'rgba(255,255,255,0.05)',
                      color:      annTag === t ? TAG_TEXT[t]   : 'rgba(240,235,227,0.4)',
                      border:     annTag === t ? `1px solid ${TAG_TEXT[t]}40` : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {/* Pin toggle */}
              <label className="flex items-center gap-2 cursor-pointer ml-auto">
                <div
                  className="w-5 h-5 rounded flex items-center justify-center transition-all"
                  style={{
                    background: annPinned ? `linear-gradient(135deg,${CORAL_LIGHT},${CORAL})` : 'rgba(255,255,255,0.06)',
                    border: annPinned ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  }}
                  onClick={() => setAnnPinned(p => !p)}
                >
                  {annPinned && <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span className="text-xs" style={{ color: 'rgba(240,235,227,0.5)' }}>Pin to top</span>
              </label>
            </div>
            <button
              onClick={postAnnouncement}
              disabled={annSaving || !annTitle.trim() || !annBody.trim()}
              className="w-full rounded-xl py-3 text-sm font-semibold transition-all"
              style={{
                background: annSaving || !annTitle.trim() || !annBody.trim()
                  ? 'rgba(207,106,62,0.3)'
                  : `linear-gradient(135deg,${CORAL_LIGHT},${CORAL})`,
                color: '#fff',
                cursor: annSaving || !annTitle.trim() || !annBody.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              {annSaving ? 'Posting…' : 'Post to Community →'}
            </button>
          </div>

          {/* Posted announcements list */}
          {announcements.length > 0 && (
            <div className="mt-5 space-y-2">
              <p className="text-xs font-medium tracking-wide uppercase mb-3" style={{ color: 'rgba(240,235,227,0.35)' }}>
                Posted ({announcements.length})
              </p>
              {announcements.map(a => (
                <div
                  key={a.id}
                  className="flex items-start gap-3 rounded-xl p-3"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {a.pinned && <span className="text-xs mt-0.5">📌</span>}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-sm font-medium">{a.title}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: TAG_COLORS[a.tag] || TAG_COLORS.General, color: TAG_TEXT[a.tag] || TAG_TEXT.General }}
                      >
                        {a.tag}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'rgba(240,235,227,0.45)' }}>{a.body}</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(240,235,227,0.25)' }}>
                      {new Date(a.created_at).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteAnnouncement(a.id)}
                    className="shrink-0 text-xs px-2 py-1 rounded-lg transition-all"
                    style={{ color: '#f87171', border: '1px solid rgba(248,113,113,0.2)' }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

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
