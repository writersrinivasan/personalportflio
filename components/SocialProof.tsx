'use client'

import { useEffect, useRef } from 'react'

const testimonials = [
  {
    name: 'Likhitha Doddoji',
    role: 'Professional @ Hexaware',
    text: 'Through this GenAI & Agentic AI course, I learnt how to develop an end-to-end product in an AI SDLC environment in the most easiest and efficient way.',
    avatar: 'LD',
    color: 'bg-[#CF6A3E]',
  },
  {
    name: 'Archana G',
    role: 'Professional @ Hexaware',
    text: "The journey has been a pleasant experience. I recommend every fresher and even experienced professionals who want to learn GenAI in depth — choose Srinivasan Ramanujam's course. You won't regret it.",
    avatar: 'AG',
    color: 'bg-[#A84B2A]',
  },
  {
    name: 'Sanjan Sunil',
    role: 'Professional @ Hexaware',
    text: "For any query related to AI, GenAI, or Agentic AI — from now on I will reach out to Srinivasan Ramanujam. I liked this session a lot. Highly recommended.",
    avatar: 'SS',
    color: 'bg-[#C8862A]',
  },
]

const corporateClients = [
  { name: 'Hexaware',            initials: 'HX', bg: '#1E40AF' },
  { name: 'Fichtner Consulting', initials: 'FC', bg: '#065F46' },
  { name: 'AstraZeneca',         initials: 'AZ', bg: '#4338CA' },
  { name: 'Amdocs',              initials: 'AM', bg: '#7C3AED' },
  { name: 'Timken',              initials: 'TK', bg: '#B91C1C' },
  { name: 'John Deere',          initials: 'JD', bg: '#15803D' },
  { name: 'Toshiba',             initials: 'TO', bg: '#DC2626' },
  { name: 'People Inc.',         initials: 'PI', bg: '#EA580C' },
  { name: 'E&Y',                 initials: 'EY', bg: '#CA8A04' },
]

const academicClients = [
  { name: 'GLA University',                     location: 'Mathura',        initials: 'GLA'  },
  { name: 'Karpagam College of Engineering',    location: 'Coimbatore',     initials: 'KCE'  },
  { name: 'Kalasalingam University',            location: 'Srivilliputhur', initials: 'KU'   },
  { name: 'SRM University',                     location: 'Chennai',        initials: 'SRM'  },
  { name: 'Dhanalakshmi Srinivasan University', location: 'Perambalur',     initials: 'DSU'  },
  { name: 'StarEx University',                  location: '',               initials: 'SEU'  },
  { name: 'St Joseph College of Engineering',   location: 'OMR, Chennai',   initials: 'SJC'  },
  { name: 'UPES University',                    location: 'Dehradun',       initials: 'UPES' },
  { name: 'IILM',                               location: 'Noida',          initials: 'IILM' },
  { name: 'Mohan Babu University',              location: 'Tirupati',       initials: 'MBU'  },
  { name: 'Vidya Pratishthan',                  location: 'Pune',           initials: 'VP'   },
  { name: 'Sri Sai University',                 location: 'Pathankot',      initials: 'SSU'  },
  { name: 'Sri Sri University',                 location: '',               initials: 'SS'   },
  { name: 'Yenepoya University',                location: 'Mangalore',      initials: 'YU'   },
]

const FADE_MASK = {
  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
  maskImage:       'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
}

function pauseOnHover(e: React.MouseEvent<HTMLDivElement>) {
  (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'
}
function resumeOnLeave(e: React.MouseEvent<HTMLDivElement>) {
  (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'
}

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const doubled = <T,>(arr: T[]) => [...arr, ...arr]

  return (
    <section id="proof" ref={ref} className="bg-brand-light section-pad border-t border-orange-100">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="reveal flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-brand-orange" />
          <span className="text-brand-orange text-xs font-bold tracking-widest uppercase">Social Proof</span>
        </div>
        <div className="mb-14">
          <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            40,000+ people<br />
            <span className="gradient-text">can&apos;t be wrong.</span>
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="reveal bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-full ${t.color} text-white text-sm font-bold flex items-center justify-center`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>

        {/* ── YouTube Widget ── */}
        <div className="reveal mb-14">
          <div
            className="group relative flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-brand-dark rounded-3xl overflow-hidden px-8 py-10 md:px-14 md:py-12"
            style={{ boxShadow: '0 24px 64px rgba(21,11,8,0.25), 0 0 0 1px rgba(207,106,62,0.12)' }}
          >
            {/* Ambient warm glow behind play button */}
            <div className="absolute left-0 top-0 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(239,68,68,0.12) 0%, transparent 70%)', transform: 'translate(-20%, -20%)' }} />

            {/* Right side geometric decoration */}
            <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none overflow-hidden hidden md:block">
              <div className="absolute right-[-60px] top-[-60px] w-64 h-64 rounded-full border border-white/5" />
              <div className="absolute right-[-30px] top-[-30px] w-40 h-40 rounded-full border border-white/5" />
              <div className="absolute right-[20px] bottom-[-40px] w-48 h-48 rounded-full border border-white/5" />
            </div>

            {/* Play button with pulse rings */}
            <a
              href="https://www.youtube.com/@srinivasanramanujam7534"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex-shrink-0 flex items-center justify-center w-24 h-24 md:w-28 md:h-28"
            >
              {/* Ring 1 */}
              <div className="absolute inset-0 rounded-full bg-red-600"
                style={{ animation: 'ytPulse 2.2s ease-out infinite' }} />
              {/* Ring 2 */}
              <div className="absolute inset-0 rounded-full bg-red-600"
                style={{ animation: 'ytPulse 2.2s ease-out infinite 0.7s' }} />
              {/* Ring 3 */}
              <div className="absolute inset-0 rounded-full bg-red-600"
                style={{ animation: 'ytPulse 2.2s ease-out infinite 1.4s' }} />
              {/* Button face */}
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition-transform duration-300"
                style={{ boxShadow: '0 0 40px rgba(239,68,68,0.5), 0 8px 32px rgba(0,0,0,0.4)' }}>
                <svg className="w-9 h-9 md:w-11 md:h-11 text-white ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </a>

            {/* Text content */}
            <div className="relative z-10 flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-red-500 text-xs font-bold tracking-widest uppercase">YouTube Channel</span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-2 tracking-tight">
                Free GenAI lessons.<br className="hidden md:block" />
                <span style={{ background: 'linear-gradient(90deg,#E8956A,#CF6A3E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  No paywalls.
                </span>
              </h3>
              <p className="text-white/45 text-sm leading-relaxed max-w-md mb-5">
                Tutorials, project walkthroughs, agent breakdowns, and career strategy — all free. 40,000+ learners already watching.
              </p>
              {/* Stats row */}
              <div className="flex items-center justify-center md:justify-start gap-6 mb-6">
                {[
                  { value: '40K+', label: 'Learners' },
                  { value: '50+',  label: 'Videos' },
                  { value: '25+',  label: 'Yrs Exp.' },
                ].map(s => (
                  <div key={s.label} className="text-center md:text-left">
                    <div className="text-lg font-extrabold text-white leading-none">{s.value}</div>
                    <div className="text-[10px] text-white/35 uppercase tracking-widest font-semibold">{s.label}</div>
                  </div>
                ))}
              </div>
              {/* CTA pills */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="https://www.youtube.com/@srinivasanramanujam7534"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-colors"
                  style={{ boxShadow: '0 4px 16px rgba(239,68,68,0.4)' }}
                >
                  Watch Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@srinivasanramanujam7534/shorts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-red-500/40 hover:border-red-500 hover:bg-red-600/10 text-red-400 hover:text-red-300 text-sm font-bold px-6 py-2.5 rounded-full transition-all"
                >
                  {/* Shorts lightning icon */}
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 2l-4 13h6l-1 7 9-13h-6l3-7z"/>
                  </svg>
                  Shorts
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Corporate clients marquee ── */}
        <div className="reveal mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-brand-orange" />
            <span className="text-xs font-bold tracking-widest uppercase text-brand-orange">Corporate Clients</span>
          </div>
          <div className="overflow-hidden" style={FADE_MASK}>
            <div
              className="flex gap-4 w-max"
              style={{ animation: 'marqueeLeft 22s linear infinite' }}
              onMouseEnter={pauseOnHover}
              onMouseLeave={resumeOnLeave}
            >
              {doubled(corporateClients).map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-3 hover:border-brand-orange hover:shadow-md transition-all group flex-shrink-0 cursor-default"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: c.bg }}
                  >
                    {c.initials}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-brand-orange transition-colors whitespace-nowrap">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Academic institutions marquee (opposite direction) ── */}
        <div className="reveal">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-brand-orange" />
            <span className="text-xs font-bold tracking-widest uppercase text-brand-orange">
              Academic Institutions &amp; Universities
            </span>
          </div>
          <div className="overflow-hidden" style={FADE_MASK}>
            <div
              className="flex gap-4 w-max"
              style={{ animation: 'marqueeRight 38s linear infinite' }}
              onMouseEnter={pauseOnHover}
              onMouseLeave={resumeOnLeave}
            >
              {doubled(academicClients).map((a, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-3 hover:border-brand-orange hover:shadow-md transition-all group flex-shrink-0 cursor-default"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0 leading-none text-center">
                    {a.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-700 group-hover:text-brand-orange transition-colors whitespace-nowrap leading-tight">
                      {a.name}
                    </div>
                    {a.location && (
                      <div className="text-[11px] text-gray-400 whitespace-nowrap leading-tight mt-0.5">
                        {a.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
