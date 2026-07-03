const links = [
  { label: 'About', href: '#about' },
  { label: 'The Method', href: '#method' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Testimonials', href: '#proof' },
  { label: 'Book a Call', href: '#book' },
]

const social = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/writersrinivasan',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/writersrinivasan',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@srinivasanramanujam7534',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      {/* Top CTA strip */}
      <div className="border-b border-white/10 py-12 px-6 md:px-12 text-center">
        <p className="text-white/50 text-sm mb-3 font-medium tracking-wide uppercase">Still thinking about it?</p>
        <h3 className="text-2xl md:text-3xl font-extrabold mb-6">The best time to start was yesterday.<br />The second best time is right now.</h3>
        <a
          href="#book"
          className="inline-block bg-brand-orange hover:bg-brand-purple text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-xl hover:shadow-[#D4795A]/30 hover:-translate-y-0.5"
        >
          Book Your Free Call →
        </a>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-bold text-sm">SR</div>
              <span className="font-semibold">Srinivasan Ramanujam</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              GenAI &amp; Agentic AI — Product Developer, Consultant, Speaker, Corporate Trainer. Founder of Yoto.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Navigate</div>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/60 hover:text-white text-sm transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Contact</div>
            <div className="space-y-3">
              <a href="mailto:writersrinivasan@gmail.com" className="block text-white/60 hover:text-white text-sm transition-colors">
                writersrinivasan@gmail.com
              </a>
              <a href="https://www.oneyoto.in/#/founder" target="_blank" rel="noopener noreferrer" className="block text-white/60 hover:text-white text-sm transition-colors">
                oneyoto.in
              </a>
            </div>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">© 2026 Srinivasan Ramanujam. All rights reserved.</p>
          <p className="text-white/20 text-xs">Built with purpose. Powered by AI.</p>
        </div>
      </div>
    </footer>
  )
}
