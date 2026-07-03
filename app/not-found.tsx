import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-dark flex items-center justify-center px-6 text-center">
      <div>
        <div
          className="text-[120px] font-extrabold leading-none tracking-tighter mb-6"
          style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          404
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-white/50 text-base mb-10 max-w-sm mx-auto leading-relaxed">
          This page doesn&apos;t exist. You may have followed a broken link or mistyped the address.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all hover:shadow-lg hover:shadow-orange-400/30"
          >
            Back to home
          </Link>
          <Link
            href="/#book"
            className="border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-medium px-6 py-3 rounded-full text-sm transition-all"
          >
            Book a call
          </Link>
        </div>
      </div>
    </main>
  )
}
