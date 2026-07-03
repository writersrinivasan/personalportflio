'use client'

import { useEffect, useRef } from 'react'

const profiles = [
  {
    icon: '🎓',
    title: 'Fresh Graduates',
    tags: ['BE', 'BTech', 'BCA', 'BSc'],
    desc: 'Just finished college and wondering how to stand out? This course gives you a real AI product portfolio and the skills companies are desperately hiring for right now.',
    outcome: 'Land your first high-paying AI role',
    color: 'from-violet-500 to-purple-600',
    light: 'bg-violet-50 border-violet-200',
  },
  {
    icon: '🔄',
    title: 'Career Switchers',
    tags: ['Non-tech', 'Other field', 'Ready for change'],
    desc: 'Already working but AI feels like a locked door? You don\'t need a Computer Science degree. You need the right hands-on training — and a guide who\'s done it.',
    outcome: 'Switch careers with confidence and proof',
    color: 'from-orange-400 to-red-500',
    light: 'bg-orange-50 border-orange-200',
  },
  {
    icon: '💼',
    title: 'Working Professionals',
    tags: ['Managers', 'Engineers', 'Analysts', 'Founders'],
    desc: 'Your company is talking about AI but nothing is happening. Learn to build and implement real Agentic AI solutions on your actual job — and become the person who makes it happen.',
    outcome: 'Become the AI champion in your organisation',
    color: 'from-blue-500 to-cyan-500',
    light: 'bg-blue-50 border-blue-200',
  },
]

export default function Audience() {
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
    <section id="about" ref={ref} className="bg-white section-pad">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-brand-orange" />
          <span className="text-brand-orange text-xs font-bold tracking-widest uppercase">Who It&apos;s For</span>
        </div>

        <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
          This course was
          <br />
          <span className="gradient-text">built for you.</span>
        </h2>
        <p className="reveal reveal-delay-2 text-gray-500 text-lg max-w-xl mb-14 leading-relaxed">
          Whether you&apos;re starting fresh, switching lanes, or levelling up at work — there&apos;s a place for you here.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {profiles.map((p, i) => (
            <div
              key={p.title}
              className={`reveal border ${p.light} rounded-3xl p-8 flex flex-col hover:shadow-xl transition-all hover:-translate-y-1`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} text-3xl mb-6 shadow-lg`}>
                {p.icon}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs font-semibold text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>

              {/* Outcome */}
              <div className={`rounded-2xl bg-gradient-to-r ${p.color} p-4 text-white text-sm font-semibold`}>
                🎯 {p.outcome}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
