'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

type Profile = {
  name: string
  email: string
  phone: string | null
  whatsapp_consent: boolean
  placement_consent: boolean
  bio: string | null
  linkedin_url: string | null
  resume_name: string | null
}

const CORAL = '#CF6A3E'
const CORAL_LIGHT = '#E8956A'

export default function CommunityPage() {
  const router  = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [profile,   setProfile]   = useState<Profile | null>(null)
  const [loading,   setLoading]   = useState(true)
  const [saving,    setSaving]    = useState(false)
  const [uploading, setUploading] = useState(false)
  const [toast,     setToast]     = useState('')

  const [phone,     setPhone]     = useState('')
  const [bio,       setBio]       = useState('')
  const [linkedin,  setLinkedin]  = useState('')
  const [waConsent, setWaConsent] = useState(false)
  const [plConsent, setPlConsent] = useState(false)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3500)
  }

  useEffect(() => {
    fetch('/api/community/profile')
      .then(r => { if (r.status === 401) router.push('/login'); return r.json() })
      .then((d: Profile) => {
        setProfile(d)
        setPhone(d.phone ?? '')
        setBio(d.bio ?? '')
        setLinkedin(d.linkedin_url ?? '')
        setWaConsent(d.whatsapp_consent ?? false)
        setPlConsent(d.placement_consent ?? false)
        setLoading(false)
      })
      .catch(() => router.push('/login'))
  }, [router])

  async function saveProfile() {
    setSaving(true)
    const res = await fetch('/api/community/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: phone || null,
        bio: bio || null,
        linkedin_url: linkedin || null,
        whatsapp_consent: waConsent,
        placement_consent: plConsent,
      }),
    })
    setSaving(false)
    if (res.ok) { const d = await res.json(); setProfile(d); showToast('Profile saved!') }
    else showToast('Save failed — please try again.')
  }

  async function uploadResume(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('resume', file)
    const res = await fetch('/api/community/upload-resume', { method: 'POST', body: fd })
    setUploading(false)
    if (res.ok) {
      setProfile(p => p ? { ...p, resume_name: file.name } : p)
      showToast('Resume uploaded!')
    } else {
      const d = await res.json()
      showToast(d.error || 'Upload failed.')
    }
    if (fileRef.current) fileRef.current.value = ''
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
        <div style={{ color: CORAL }} className="text-xl animate-pulse">Loading your space…</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ background: '#0A0A0A', color: '#F0EBE3' }}>
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0" style={{
        background: 'radial-gradient(ellipse 70% 40% at 60% 0%, rgba(207,106,62,0.10) 0%, transparent 65%)',
      }} />

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl text-sm font-medium shadow-lg"
          style={{ background: '#1E1208', border: `1px solid ${CORAL}`, color: CORAL_LIGHT }}
        >
          {toast}
        </div>
      )}

      {/* Nav bar */}
      <nav
        className="sticky top-0 z-40 flex items-center justify-between px-5 py-4"
        style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none" aria-label="SR mark">
            <defs>
              <linearGradient id="lg-comm-nav" gradientUnits="userSpaceOnUse" x1="4" y1="8" x2="96" y2="92">
                <stop offset="0%"   stopColor="#E8956A"/>
                <stop offset="45%"  stopColor="#CF6A3E"/>
                <stop offset="100%" stopColor="#A84B2A"/>
              </linearGradient>
            </defs>
            <path d="M 43,14 C 43,6 8,6 8,26 C 8,46 44,46 44,66 C 44,86 8,86 8,76"
                  fill="none" stroke="url(#lg-comm-nav)" strokeWidth="8.5" strokeLinecap="round"/>
            <path d="M 57,10 L 57,88"
                  fill="none" stroke="url(#lg-comm-nav)" strokeWidth="8.5" strokeLinecap="round"/>
            <path d="M 57,10 C 78,10 93,20 93,36 C 93,53 78,56 57,56"
                  fill="none" stroke="url(#lg-comm-nav)" strokeWidth="8.5" strokeLinecap="round"/>
            <path d="M 68,56 L 93,88"
                  fill="none" stroke="url(#lg-comm-nav)" strokeWidth="8.5" strokeLinecap="round"/>
          </svg>
          <span className="font-semibold text-sm" style={{ color: '#F0EBE3' }}>GenAI Community</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm hidden sm:block" style={{ color: 'rgba(240,235,227,0.5)' }}>
            {profile?.name}
          </span>
          <button
            onClick={logout}
            className="text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(240,235,227,0.5)' }}
          >
            Sign out
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* Welcome banner */}
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(207,106,62,0.18) 0%, rgba(168,75,42,0.08) 100%)',
            border: '1px solid rgba(207,106,62,0.25)',
          }}
        >
          <p className="text-xs font-medium tracking-widest uppercase mb-2" style={{ color: CORAL }}>
            Welcome back
          </p>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Hey {profile?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-sm" style={{ color: 'rgba(240,235,227,0.6)' }}>
            You&apos;re part of an exclusive group of GenAI practitioners. Connect, learn, and grow together.
          </p>
        </div>

        {/* WhatsApp community */}
        <section
          className="rounded-2xl p-6 md:p-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-start gap-4">
            <div
              className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: 'rgba(37,211,102,0.12)' }}
            >
              💬
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1">WhatsApp Community</h2>
              <p className="text-sm mb-4" style={{ color: 'rgba(240,235,227,0.55)' }}>
                Join our private WhatsApp group for daily AI insights, job opportunities, peer support, and direct access to Srinivasan.
              </p>
              <a
                href="https://whatsapp.com/channel/0029VaZ8b6A8vd1JIJUASq26"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: '#25D366', color: '#fff' }}
              >
                <span>Join WhatsApp Group →</span>
              </a>
              <p className="text-xs mt-3" style={{ color: 'rgba(240,235,227,0.3)' }}>
                Stay connected with daily AI insights and exclusive opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Opportunities board */}
        <section
          className="rounded-2xl p-6 md:p-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <span>🚀</span> Opportunities Board
          </h2>
          <p className="text-sm mb-5" style={{ color: 'rgba(240,235,227,0.55)' }}>
            Hand-picked roles from Srinivasan&apos;s network — updated regularly.
          </p>
          <div className="space-y-3">
            {[
              { role: 'AI/ML Engineer', company: 'Hexaware Technologies', type: 'Full-time', tag: 'Hot 🔥' },
              { role: 'GenAI Product Manager', company: 'Amdocs India', type: 'Full-time', tag: 'New' },
              { role: 'LLM Engineer (Contract)', company: 'Fichtner Consulting', type: 'Contract', tag: 'Remote' },
            ].map(opp => (
              <div
                key={opp.role}
                className="flex items-center justify-between rounded-xl px-4 py-3 gap-3"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div>
                  <p className="text-sm font-medium">{opp.role}</p>
                  <p className="text-xs" style={{ color: 'rgba(240,235,227,0.45)' }}>{opp.company} · {opp.type}</p>
                </div>
                <span
                  className="shrink-0 text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: 'rgba(207,106,62,0.15)', color: CORAL_LIGHT }}
                >
                  {opp.tag}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4" style={{ color: 'rgba(240,235,227,0.3)' }}>
            More opportunities shared exclusively in the WhatsApp group.
          </p>
        </section>

        {/* Resources */}
        <section
          className="rounded-2xl p-6 md:p-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <span>📚</span> Learning Resources
          </h2>
          <p className="text-sm mb-5" style={{ color: 'rgba(240,235,227,0.55)' }}>
            Curated reads, tools, and courses to keep you ahead of the curve.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'GenAI SDLC Playbook', desc: 'End-to-end AI product development framework', icon: '📋' },
              { title: 'Prompt Engineering Guide', desc: 'Advanced prompting patterns & templates', icon: '✨' },
              { title: 'Agentic AI Patterns', desc: 'Multi-agent architecture reference', icon: '🤖' },
              { title: 'AI Career Roadmap 2026', desc: 'Skills & certifications that matter', icon: '🗺️' },
            ].map(r => (
              <div
                key={r.title}
                className="flex items-start gap-3 rounded-xl p-4"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-xl">{r.icon}</span>
                <div>
                  <p className="text-sm font-medium">{r.title}</p>
                  <p className="text-xs" style={{ color: 'rgba(240,235,227,0.45)' }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4" style={{ color: 'rgba(240,235,227,0.3)' }}>
            Full resource library shared in the WhatsApp community.
          </p>
        </section>

        {/* Profile form */}
        <section
          className="rounded-2xl p-6 md:p-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <span>👤</span> Your Profile
          </h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(240,235,227,0.55)' }}>
            Complete your profile so Srinivasan can connect you with the right opportunities.
          </p>

          <div className="space-y-4">
            {/* Read-only fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wide mb-1.5 font-medium" style={{ color: 'rgba(240,235,227,0.45)' }}>Name</label>
                <div className="rounded-lg px-4 py-3 text-sm" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(240,235,227,0.7)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  {profile?.name}
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide mb-1.5 font-medium" style={{ color: 'rgba(240,235,227,0.45)' }}>Email</label>
                <div className="rounded-lg px-4 py-3 text-sm" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(240,235,227,0.7)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  {profile?.email}
                </div>
              </div>
            </div>

            {/* Editable: phone */}
            <div>
              <label className="block text-xs uppercase tracking-wide mb-1.5 font-medium" style={{ color: 'rgba(240,235,227,0.45)' }}>Phone number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#F0EBE3' }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(207,106,62,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(207,106,62,0.12)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-xs uppercase tracking-wide mb-1.5 font-medium" style={{ color: 'rgba(240,235,227,0.45)' }}>LinkedIn URL</label>
              <input
                type="url"
                value={linkedin}
                onChange={e => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/yourname"
                className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#F0EBE3' }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(207,106,62,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(207,106,62,0.12)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs uppercase tracking-wide mb-1.5 font-medium" style={{ color: 'rgba(240,235,227,0.45)' }}>Short bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="A sentence or two about yourself, your current role, and what you're building…"
                className="w-full rounded-lg px-4 py-3 text-sm outline-none resize-none transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#F0EBE3' }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(207,106,62,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(207,106,62,0.12)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
              />
            </div>

            {/* Consents */}
            <div className="space-y-3 pt-1">
              {[
                { id: 'wa', state: waConsent, setter: setWaConsent, label: 'Add me to the WhatsApp community', sub: 'I agree to receive messages from the cohort and Srinivasan via WhatsApp.' },
                { id: 'pl', state: plConsent, setter: setPlConsent, label: 'Open to placement referrals', sub: 'Srinivasan may refer me to relevant opportunities from his network.' },
              ].map(c => (
                <label key={c.id} className="flex items-start gap-3 cursor-pointer group">
                  <div
                    className="shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-all"
                    style={{
                      background: c.state ? `linear-gradient(135deg,${CORAL_LIGHT},${CORAL})` : 'rgba(255,255,255,0.06)',
                      border: c.state ? 'none' : '1px solid rgba(255,255,255,0.12)',
                    }}
                    onClick={() => c.setter(!c.state)}
                  >
                    {c.state && <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{c.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(240,235,227,0.45)' }}>{c.sub}</p>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={saveProfile}
              disabled={saving}
              className="w-full rounded-xl py-3 text-sm font-semibold transition-all"
              style={{
                background: saving ? 'rgba(207,106,62,0.5)' : `linear-gradient(135deg,${CORAL_LIGHT},${CORAL})`,
                color: '#fff',
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              {saving ? 'Saving…' : 'Save Profile'}
            </button>
          </div>
        </section>

        {/* Resume upload */}
        <section
          className="rounded-2xl p-6 md:p-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <span>📄</span> Resume
          </h2>
          <p className="text-sm mb-5" style={{ color: 'rgba(240,235,227,0.55)' }}>
            Upload your resume so Srinivasan can share it with relevant companies when opportunities arise.
          </p>

          {profile?.resume_name && (
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3 mb-4"
              style={{ background: 'rgba(207,106,62,0.08)', border: '1px solid rgba(207,106,62,0.2)' }}
            >
              <span>📎</span>
              <p className="text-sm font-medium" style={{ color: CORAL_LIGHT }}>{profile.resume_name}</p>
              <span className="ml-auto text-xs" style={{ color: CORAL }}>Uploaded ✓</span>
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={uploadResume}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all"
            style={{
              background: uploading ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: uploading ? 'rgba(240,235,227,0.4)' : '#F0EBE3',
              cursor: uploading ? 'not-allowed' : 'pointer',
            }}
          >
            {uploading ? '⏳ Uploading…' : profile?.resume_name ? '🔄 Replace Resume' : '⬆️ Upload Resume'}
          </button>
          <p className="text-xs mt-3" style={{ color: 'rgba(240,235,227,0.3)' }}>PDF, DOC or DOCX · Max 5 MB</p>
        </section>

      </div>

      <footer className="text-center py-8 text-xs" style={{ color: 'rgba(240,235,227,0.2)' }}>
        © 2026 Srinivasan Ramanujam · GenAI Community · All rights reserved
      </footer>
    </main>
  )
}
