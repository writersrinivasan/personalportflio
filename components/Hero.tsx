'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const floatingCards = [
  { emoji: '🚀', text: 'First AI App', sub: 'Day 1 of class', color: 'bg-orange-50 border-orange-200', pos: 'top-32 left-8 lg:left-16 xl:left-24', delay: '0s' },
  { emoji: '💼', text: '₹12–30 LPA', sub: 'Average placement', color: 'bg-amber-50 border-amber-200', pos: 'top-44 right-8 lg:right-16 xl:right-24', delay: '1.5s' },
  { emoji: '🏢', text: 'Corporate Clients', sub: 'Real projects', color: 'bg-[#FDF4EF] border-[#E8956A]', pos: 'bottom-36 left-8 lg:left-16 xl:left-24', delay: '0.8s' },
  { emoji: '🎮', text: 'Learn by Doing', sub: 'Not by watching', color: 'bg-emerald-50 border-emerald-200', pos: 'bottom-44 right-8 lg:right-16 xl:right-24', delay: '2s' },
]

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    heroRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />
      {/* Radial overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.15),transparent)]" />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Floating cards — hidden on small screens */}
      {floatingCards.map((card) => (
        <div
          key={card.text}
          className={`hidden lg:flex absolute items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl backdrop-blur-sm animate-float ${card.color} ${card.pos}`}
          style={{ animationDelay: card.delay }}
        >
          <span className="text-2xl">{card.emoji}</span>
          <div className="text-left">
            <div className="text-sm font-semibold text-gray-800">{card.text}</div>
            <div className="text-xs text-gray-500">{card.sub}</div>
          </div>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
        {/* Profile photo */}
        <div className="reveal flex justify-center mb-7">
          <div className="relative">
            {/* Coral glow ring */}
            <div className="absolute inset-[-4px] rounded-full"
              style={{ background: 'linear-gradient(135deg,#E8956A,#CF6A3E,#A84B2A)', filter: 'blur(6px)', opacity: 0.55 }} />
            {/* Photo */}
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden"
              style={{ boxShadow: '0 0 0 3px rgba(207,106,62,0.6), 0 8px 32px rgba(0,0,0,0.5)' }}>
              <Image
                src="/srinivasan.png"
                alt="Srinivasan Ramanujam"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>

        {/* Live batch badge */}
        <div className="reveal inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
          LIVE COURSE · NEW BATCH ENROLLING NOW
        </div>

        {/* Headline */}
        <h1 className="reveal reveal-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
          Stop learning AI.
          <br />
          <span className="text-white/90 italic font-light">Start</span>{' '}
          <span className="relative">
            building
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-brand-orange rounded-full" />
          </span>{' '}
          with it.
        </h1>

        {/* Sub */}
        <p className="reveal reveal-delay-2 text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          India&apos;s only GenAI &amp; Agentic AI course where you ship your first product on <strong className="text-white font-semibold">Day 1</strong> — then master the science behind it over 3 months of live, hands-on classes.
        </p>

        {/* CTAs */}
        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <a
            href="#book"
            className="bg-brand-orange hover:bg-brand-purple text-white font-bold px-8 py-4 rounded-full text-base transition-all hover:shadow-2xl hover:shadow-[#D4795A]/40 hover:-translate-y-1"
          >
            Book Your Free Discovery Call →
          </a>
          <a
            href="/curriculum"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:-translate-y-1"
          >
            ⬇ Download Curriculum
          </a>
        </div>

        {/* Trust strip */}
        <div className="reveal reveal-delay-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/65 text-sm font-medium">
          {[
            { icon: '👥', text: '40,000+ People Trained' },
            { icon: '🏛️', text: '50+ Institutions' },
            { icon: '📅', text: '3 Months · Live Classes' },
            { icon: '🏆', text: 'Real Industry Projects' },
          ].map((item) => (
            <span key={item.text} className="flex items-center gap-2">
              <span>{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-white/60 animate-[slideDown_1.5s_ease-in-out_infinite]" style={{ height: '40%' }} />
        </div>
      </div>
    </section>
  )
}
