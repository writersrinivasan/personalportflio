'use client'

import { useEffect, useRef, useState } from 'react'

const months = [
  {
    month: 'Month 1',
    title: 'Build First. Learn Why.',
    color: 'from-[#CF6A3E] to-[#A84B2A]',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    weeks: [
      { week: 'Week 1', title: 'Ship your first AI app — Day 1', desc: 'Full dev environment setup, OpenAI/Claude API integration, and a deployed AI FAQ bot — all in one session. You ship before a single theory slide appears.' },
      { week: 'Week 2', title: 'How LLMs actually work', desc: 'Tokenization, transformer attention, pre-training vs fine-tuning, and temperature controls — explained through the app you already built. Includes a live model-audit comparing GPT-4o, Claude, and Gemini.' },
      { week: 'Week 3', title: 'Prompt engineering that works in production', desc: 'Zero-shot, few-shot, chain-of-thought, JSON structured output, and hallucination detection. You build a complete HR prompt library with automated validation.' },
      { week: 'Week 4', title: 'Build a production-grade chatbot', desc: 'Buffer/summary memory, context-window optimisation, rate limiting, and a React + FastAPI chat UI with WebSocket streaming. Real architecture, not a toy.' },
    ],
  },
  {
    month: 'Month 2',
    title: 'Agents, RAG & Real Intelligence.',
    color: 'from-amber-500 to-[#CF6A3E]',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    weeks: [
      { week: 'Week 5', title: 'Build your first AI Agent — before any theory', desc: 'The ReAct loop, tool use (web search, DB access, APIs), planning vs execution agents, and guardrails. You build a market research agent that works autonomously from a single prompt.' },
      { week: 'Week 6', title: 'RAG — make AI know your business data', desc: 'Document ingestion, chunking strategies, embeddings, vector DBs (Pinecone/ChromaDB), and hybrid search. You ship a "Chat with your Documents" app handling 500 docs in under a second.' },
      { week: 'Week 7', title: 'Multi-Agent systems & orchestration', desc: 'LangGraph stateful workflows, CrewAI role-based teams, parallel fan-out patterns, and LangSmith tracing. You build a 4-agent content pipeline from keyword to published post.' },
      { week: 'Week 8', title: 'Industry use cases — end to end', desc: 'Full-day sprint across Sales, HR, Finance, Legal, and Healthcare verticals. You choose your industry, build a deployable agentic solution, and walk away with your first portfolio piece.' },
    ],
  },
  {
    month: 'Month 3',
    title: 'Products, Portfolio & Career.',
    color: 'from-[#E8956A] to-[#D4795A]',
    bg: 'bg-[#FDF4EF]',
    border: 'border-[#E8956A]',
    weeks: [
      { week: 'Week 9', title: 'AI Product Architecture', desc: 'LLM selection matrix, semantic caching, streaming via SSE/WebSockets, automated evals, and production monitoring dashboards. You design a full SaaS architecture and model its costs at 1,000 users.' },
      { week: 'Week 10', title: 'Capstone project — real client brief', desc: 'A genuine brief from Srinivasan\'s industry network. Past projects: AI resume screener (used by 3 companies), legal contract analyser, D2C inventory prediction agent. 2-week build sprint.' },
      { week: 'Week 11', title: 'Deploy, demo and get feedback', desc: 'Deploy on Vercel/Railway, record a professional demo video, and present on Demo Day to Srinivasan + 2 industry guests from hiring companies. All sessions recorded and returned to you.' },
      { week: 'Week 12', title: 'Career strategy, salary negotiation & placement', desc: 'Portfolio audit, LinkedIn rewrite, mock technical interview (recorded), and analysis of 50+ real GenAI JDs. Direct introductions to Srinivasan\'s hiring network. Salary range: ₹8–30 LPA decoded.' },
    ],
  },
]

export default function Curriculum() {
  const ref = useRef<HTMLDivElement>(null)
  const [activeMonth, setActiveMonth] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleDownload = () => {
    window.open('/curriculum', '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="curriculum" ref={ref} className="bg-white section-pad border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="reveal flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-blue" />
              <span className="text-brand-blue text-xs font-bold tracking-widest uppercase">Curriculum</span>
            </div>
            <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              12 weeks.<br />
              <span className="gradient-text">One real product.</span>
            </h2>
          </div>
          <div className="reveal flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownload}
              className="bg-brand-gradient text-white font-semibold px-6 py-3 rounded-full text-sm hover:shadow-xl hover:shadow-violet-200 hover:-translate-y-0.5 transition-all"
            >
              ⬇ Download Full Curriculum (PDF)
            </button>
            <a
              href="#book"
              className="border-2 border-brand-orange text-brand-orange font-semibold px-6 py-3 rounded-full text-sm hover:bg-brand-orange hover:text-white transition-all text-center"
            >
              Book Free Call →
            </a>
          </div>
        </div>

        {/* Month tabs */}
        <div className="reveal flex flex-wrap gap-3 mb-10">
          {months.map((m, i) => (
            <button
              key={m.month}
              onClick={() => setActiveMonth(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeMonth === i
                  ? `bg-gradient-to-r ${m.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {m.month}: {m.title.split('.')[0]}
            </button>
          ))}
        </div>

        {/* Active month content */}
        {months.map((m, i) => (
          <div key={m.month} className={`${activeMonth === i ? 'block' : 'hidden'}`}>
            <div className={`rounded-3xl border ${m.border} ${m.bg} p-8 mb-8`}>
              <div className={`inline-block bg-gradient-to-r ${m.color} text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4`}>
                {m.month}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{m.title}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {m.weeks.map((w, j) => (
                <div
                  key={w.week}
                  className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-gray-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} text-white text-xs font-bold flex items-center justify-center`}>
                      W{(i * 4) + j + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 tracking-wide mb-1">{w.week}</div>
                      <h4 className="font-bold text-gray-900 mb-2 group-hover:text-brand-violet transition-colors">{w.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom note */}
        <div className="reveal mt-10 bg-brand-dark rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white font-semibold mb-1">Fee is discussed on the call — not here.</div>
            <div className="text-white/50 text-sm">We explain the full investment, payment options, and what you get during your free discovery call.</div>
          </div>
          <a
            href="#book"
            className="flex-shrink-0 bg-brand-orange hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full text-sm transition-all hover:shadow-lg hover:shadow-orange-400/30 hover:-translate-y-0.5"
          >
            Book Your Call →
          </a>
        </div>
      </div>
    </section>
  )
}
