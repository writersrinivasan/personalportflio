'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <svg width="36" height="36" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="SR mark">
            <defs>
              <linearGradient id="navGrad" gradientUnits="userSpaceOnUse" x1="4" y1="8" x2="96" y2="92">
                <stop offset="0%"   stopColor="#E8956A"/>
                <stop offset="45%"  stopColor="#CF6A3E"/>
                <stop offset="100%" stopColor="#A84B2A"/>
              </linearGradient>
            </defs>
            <path d="M 43,14 C 43,6 8,6 8,26 C 8,46 44,46 44,66 C 44,86 8,86 8,76"
                  fill="none" stroke="url(#navGrad)" strokeWidth="8.5" strokeLinecap="round"/>
            <path d="M 57,10 L 57,88"
                  fill="none" stroke="url(#navGrad)" strokeWidth="8.5" strokeLinecap="round"/>
            <path d="M 57,10 C 78,10 93,20 93,36 C 93,53 78,56 57,56"
                  fill="none" stroke="url(#navGrad)" strokeWidth="8.5" strokeLinecap="round"/>
            <path d="M 68,56 L 93,88"
                  fill="none" stroke="url(#navGrad)" strokeWidth="8.5" strokeLinecap="round"/>
          </svg>
          <span className={`font-semibold text-sm tracking-tight hidden sm:block transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            Srinivasan Ramanujam
          </span>
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-8">
          {[
            { label: 'About', href: '#about' },
            { label: 'The Method', href: '#method' },
            { label: 'Curriculum', href: '#curriculum' },
            { label: 'Testimonials', href: '#proof' },
          ].map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-violet ${
                  scrolled ? 'text-gray-600' : 'text-white/80'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#book"
          className="bg-brand-orange hover:bg-brand-purple text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5"
        >
          Book Free Call
        </a>
      </div>
    </nav>
  )
}
