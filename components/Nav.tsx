'use client'

import { useEffect, useState } from 'react'

const links = [
  { label: 'About',       href: '#about' },
  { label: 'The Method',  href: '#method' },
  { label: 'Curriculum',  href: '#curriculum' },
  { label: 'Testimonials',href: '#proof' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">

          {/* Logo */}
          <a href="#" onClick={close} className="flex items-center gap-3">
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
            <span className={`font-semibold text-sm tracking-tight hidden sm:block transition-colors ${
              scrolled || menuOpen ? 'text-gray-900' : 'text-white'
            }`}>
              Srinivasan Ramanujam
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-brand-orange ${
                    scrolled ? 'text-gray-600' : 'text-white/80'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + Mobile controls */}
          <div className="flex items-center gap-3">
            <a
              href="/community"
              className={`text-sm font-medium transition-colors hover:text-brand-orange ${
                scrolled ? 'text-gray-600' : 'text-white/80'
              }`}
            >
              Community
            </a>
            <a
              href="#book"
              className="bg-brand-orange hover:bg-brand-purple text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5"
            >
              Book Free Call
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 rounded-lg focus:outline-none"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${
                scrolled || menuOpen ? 'bg-gray-800' : 'bg-white'
              } ${menuOpen ? 'rotate-45 translate-y-[7px]' : 'w-6'}`} />
              <span className={`block h-0.5 rounded-full transition-all duration-300 ${
                scrolled || menuOpen ? 'bg-gray-800' : 'bg-white'
              } ${menuOpen ? 'opacity-0 w-0' : 'w-5'}`} />
              <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${
                scrolled || menuOpen ? 'bg-gray-800' : 'bg-white'
              } ${menuOpen ? '-rotate-45 -translate-y-[7px] w-6' : 'w-4'}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white border-t border-gray-100 px-6 pb-6 pt-2">
            <ul className="space-y-1 mb-4">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={close}
                    className="block py-3 text-gray-700 hover:text-brand-orange font-medium border-b border-gray-100 last:border-0 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/community"
              onClick={close}
              className="block py-3 text-gray-700 hover:text-brand-orange font-medium border-b border-gray-100 transition-colors"
            >
              Community
            </a>
            <a
              href="#book"
              onClick={close}
              className="block w-full bg-brand-orange hover:bg-brand-purple text-white text-center font-bold px-6 py-3.5 rounded-full transition-colors mt-4"
            >
              Book Your Free Discovery Call →
            </a>
          </div>
        </div>
      </nav>

      {/* Backdrop — closes menu when tapping outside */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}
    </>
  )
}
