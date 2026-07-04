const stats = [
  { number: '40,000+', label: 'People Trained', icon: '👥' },
  { number: '1,000+', label: 'Educators Trained', icon: '🎓' },
  { number: '3', label: 'Months · Live Classes', icon: '📅' },
  { number: '50+', label: 'Institutions Spoken At', icon: '🏛️' },
  { number: '25+', label: 'Years of Industry Experience', icon: '⚡' },
]

export default function Stats() {
  return (
    <section className="bg-brand-dark py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`bg-brand-dark2 px-8 py-10 text-center hover:bg-[#3D1C0A] transition-colors group ${
                i === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{s.icon}</div>
              <div className="text-4xl md:text-5xl font-extrabold bg-brand-gradient bg-clip-text text-transparent mb-2 tracking-tight">
                {s.number}
              </div>
              <div className="text-white/50 text-sm font-medium tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
