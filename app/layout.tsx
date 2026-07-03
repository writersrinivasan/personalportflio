import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  title: 'Srinivasan Ramanujam — GenAI & Agentic AI Course',
  description: 'End to End Product Development using GenAI & Agentic AI. Live 3-month course by Srinivasan Ramanujam. 40,000+ trained. Book your free discovery call.',
  keywords: 'GenAI course, Agentic AI training, AI product development, Srinivasan Ramanujam, AI consultant India',
  authors: [{ name: 'Srinivasan Ramanujam', url: 'https://linkedin.com/in/writersrinivasan' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Srinivasan Ramanujam — GenAI & Agentic AI Course',
    description: 'Stop learning AI. Start building with it. 3-month live course. 40,000+ trained.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Srinivasan Ramanujam',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Srinivasan Ramanujam — GenAI & Agentic AI Course',
    description: 'Stop learning AI. Start building with it. 3-month live course. 40,000+ trained.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
