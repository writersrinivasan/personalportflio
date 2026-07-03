'use client'

import { useEffect, useRef } from 'react'

const testimonials = [
  {
    name: 'Add Student Name',
    role: 'Software Engineer @ Company',
    text: 'This course changed everything for me. I went from knowing nothing about AI to building my first Agentic AI product in week one. The reverse engineering method is genius.',
    avatar: 'AS',
    color: 'bg-violet-600',
  },
  {
    name: 'Add Student Name',
    role: 'Career Switcher → AI Developer',
    text: 'I was in a completely different field. Three months later I have a portfolio, a new job, and a salary I didn\'t think was possible. The teaching style just clicks.',
    avatar: 'AS',
    color: 'bg-blue-600',
  },
  {
    name: 'Add Student Name',
    role: 'Product Manager, MNC',
    text: 'I took this as a working professional. Now I\'m the go-to person for AI implementation in my entire department. The real-world use cases were exactly what I needed.',
    avatar: 'AS',
    color: 'bg-orange-500',
  },
]

const corporateClients = [
  'Add Client 1',
  'Add Client 2',
  'Add Client 3',
  'Add Client 4',
  'Add Client 5',
  'Add Client 6',
]

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

  return (
    <section id="proof" ref={ref} className="bg-brand-light section-pad border-t border-violet-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="reveal flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-brand-violet" />
          <span className="text-brand-violet text-xs font-bold tracking-widest uppercase">Social Proof</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            40,000+ people<br />
            <span className="gradient-text">can&apos;t be wrong.</span>
          </h2>
          <a
            href="https://www.youtube.com/@srinivasanramanujam7534"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal reveal-delay-2 flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-200 self-start lg:self-auto"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch on YouTube
          </a>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <div
              key={t.name + i}
              className={`reveal bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1`}
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
              {/* Stars */}
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

        {/* Corporate clients */}
        <div className="reveal">
          <div className="text-center text-sm font-bold text-gray-400 tracking-widest uppercase mb-8">
            Trusted by companies including
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {corporateClients.map((c) => (
              <div
                key={c}
                className="bg-white border border-gray-200 rounded-2xl h-16 flex items-center justify-center text-xs font-semibold text-gray-400 hover:border-brand-violet hover:text-brand-violet transition-colors px-3 text-center"
              >
                {c}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4 italic">
            * Replace placeholder names with your actual corporate clients
          </p>
        </div>
      </div>
    </section>
  )
}
