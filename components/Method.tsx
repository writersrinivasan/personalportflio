'use client'

import { useEffect, useRef } from 'react'

const steps = [
  {
    step: '01',
    icon: '🎮',
    title: 'Play',
    desc: 'You build a real AI product on day one. No theory. No slides. Just you and the tools. It feels like a game because it is.',
    color: 'from-[#CF6A3E] to-[#A84B2A]',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
  {
    step: '02',
    icon: '🔍',
    title: 'Discover',
    desc: 'Now that you\'ve done it, we reverse-engineer exactly why it worked. The science clicks because you\'ve already lived it.',
    color: 'from-amber-500 to-[#CF6A3E]',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  {
    step: '03',
    icon: '🏆',
    title: 'Own it',
    desc: 'You build it again — better, faster, with full control. This is the moment concepts become instinct. This is mastery.',
    color: 'from-[#E8956A] to-[#D4795A]',
    bg: 'bg-[#FDF4EF]',
    border: 'border-[#E8956A]',
  },
]

const comparison = [
  { label: 'Traditional courses', items: ['Watch 10 hours of videos', 'Take a quiz', 'Hope to remember it', 'Never build anything real', 'Freeze in an interview'], bad: true },
  { label: 'The Reverse Engineering Method', items: ['Ship a product on day 1', 'Learn why it works', 'Rebuild with full understanding', 'Graduate with a portfolio', 'Walk into interviews with confidence'], bad: false },
]

export default function Method() {
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
    <section id="method" ref={ref} className="bg-brand-light section-pad">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="reveal flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-brand-violet" />
          <span className="text-brand-violet text-xs font-bold tracking-widest uppercase">The Method</span>
        </div>

        {/* Headline */}
        <div className="reveal reveal-delay-1 mb-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            We flipped<br />
            <span className="gradient-text">the classroom.</span>
          </h2>
        </div>
        <p className="reveal reveal-delay-2 text-gray-500 text-lg max-w-xl mb-16 leading-relaxed">
          Every other course makes you watch, then maybe practice. We make you build first — so when we explain the science, it already makes sense.
        </p>

        {/* 3 Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`reveal border ${s.border} ${s.bg} rounded-3xl p-8 hover:shadow-xl transition-all hover:-translate-y-1`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} text-white text-xl mb-6 shadow-lg`}>
                {s.icon}
              </div>
              <div className="text-xs font-bold tracking-widest text-gray-400 mb-2">STEP {s.step}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="reveal grid md:grid-cols-2 gap-6">
          {comparison.map((col) => (
            <div
              key={col.label}
              className={`rounded-3xl p-8 ${col.bad ? 'bg-gray-100 border border-gray-200' : 'bg-brand-gradient text-white'}`}
            >
              <div className={`text-sm font-bold tracking-wide mb-6 ${col.bad ? 'text-gray-500' : 'text-white/80'}`}>
                {col.bad ? '❌' : '✅'} {col.label}
              </div>
              <ul className="space-y-4">
                {col.items.map((item) => (
                  <li key={item} className={`flex items-start gap-3 text-sm font-medium ${col.bad ? 'text-gray-500 line-through' : 'text-white'}`}>
                    <span className="mt-0.5 text-base">{col.bad ? '·' : '→'}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
