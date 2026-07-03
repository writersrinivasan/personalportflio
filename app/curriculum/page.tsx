'use client'

import { useEffect } from 'react'

// ─── Palette ─────────────────────────────────────────────────────────────────
const C = {
  coral:       '#CF6A3E',
  terracotta:  '#A84B2A',
  amber:       '#C8862A',
  amberDark:   '#A06A1A',
  peach:       '#E8956A',
  peachDark:   '#D4795A',
  dark:        '#150B08',
  lightBg:     '#FDF4EF',
  amberBg:     '#FDF8EE',
  peachBg:     '#FEF5F0',
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const months = [
  {
    label: 'Month 1',
    title: 'Build First. Learn Why.',
    accent: C.coral,
    accentDark: C.terracotta,
    bg: C.lightBg,
    num: 1,
    weeks: [
      {
        n: 1, title: 'Ship Your First AI App — Day 1',
        topics: [
          'Dev environment setup — Python 3.11+, VS Code, virtual envs, API keys',
          'OpenAI & Anthropic API integration — calls, streaming, cost management',
          'Building a chat interface with real-time streaming responses',
          'Understanding tokens, context windows, and API pricing models',
          'Deploying your first AI app live within a single session',
        ],
        handson: 'Build a fully functional AI customer FAQ bot for a fictional e-commerce brand — working chat UI, deployed and shareable in one day',
        industry: 'How Swiggy reduced customer support tickets by 40% with an AI FAQ bot handling order status, refunds, and delivery queries at scale',
        tools: ['Python', 'OpenAI API', 'Claude API', 'Streamlit', 'VS Code'],
      },
      {
        n: 2, title: 'How LLMs Actually Work',
        topics: [
          'Tokenization deep dive — BPE encoding, why "Bangalore" is 3 tokens',
          'Transformer architecture — attention mechanism explained via your Week 1 app',
          'Pre-training → fine-tuning → RLHF — the three stages of building a model',
          'Temperature, top-p, frequency penalty — controlling output predictability',
          'GPT-4o vs Claude 3.5 Sonnet vs Gemini 1.5 — real-world benchmarks & tradeoffs',
        ],
        handson: 'Model audit exercise — run 10 identical prompts across 3 models, document quality, latency, cost differences, and choose the right model for 3 business scenarios',
        industry: 'How Zepto\'s CTO chose between GPT-4 and Gemini for inventory prediction — a real cost-vs-accuracy decision tree used in production',
        tools: ['OpenAI Playground', 'Anthropic Console', 'Hugging Face Tokenizer', 'Spreadsheet (cost modelling)'],
      },
      {
        n: 3, title: 'Prompt Engineering That Works in Production',
        topics: [
          'Zero-shot, few-shot, chain-of-thought — when each technique wins',
          'System prompts and persona engineering for consistent AI behaviour',
          'Structured output: JSON mode, function calling, Instructor library',
          'Edge case handling: jailbreaks, out-of-scope queries, hallucination detection',
          'Prompt versioning, A/B testing, and quality measurement in production',
        ],
        handson: 'Build a complete HR prompt library — job description writer, interview question generator, performance review summarizer — all with validated JSON output',
        industry: 'How Notion AI maintains 98% output quality across 20+ document types using prompt templates, structured validation, and automated regression testing',
        tools: ['LangChain Prompt Templates', 'OpenAI Function Calling', 'Instructor Library', 'Promptfoo'],
      },
      {
        n: 4, title: 'Build a Production-Grade Chatbot',
        topics: [
          'Conversation state — what to keep, what to summarise, what to discard',
          'Memory types: Buffer, Summary, Token-buffer, Entity memory',
          'Context window optimisation — fitting 30+ turns into fewer tokens',
          'Rate limiting, exponential backoff, and graceful error recovery patterns',
          'Chat UI architecture: React frontend + FastAPI backend + WebSockets',
        ],
        handson: 'Build a WhatsApp-style AI assistant for a logistics company — remembers 30+ conversation turns, handles shipping queries, escalates to human when confidence is low',
        industry: 'HDFC Bank\'s EVA chatbot architecture — 3M+ queries/month with 95% resolution without human intervention; how they handle memory at scale',
        tools: ['LangChain ConversationBufferSummaryMemory', 'FastAPI', 'Redis', 'React', 'WebSockets'],
      },
    ],
  },
  {
    label: 'Month 2',
    title: 'Agents, RAG & Real Intelligence.',
    accent: C.amber,
    accentDark: C.amberDark,
    bg: C.amberBg,
    num: 2,
    weeks: [
      {
        n: 5, title: 'Build Your First AI Agent — Before Any Theory',
        topics: [
          'The agent loop: Observe → Think → Act → Repeat',
          'Tool use: web search, calculators, database access, external APIs',
          'ReAct (Reasoning + Acting) pattern — the foundation of all modern agents',
          'Planning agents vs execution agents — knowing the architectural difference',
          'Guardrails, safety checks, and stopping conditions for autonomous behaviour',
        ],
        handson: 'Build a market research agent that autonomously searches the web, reads competitor sites, extracts pricing data, and produces a formatted competitive analysis report — zero human input after launch',
        industry: 'How Salesforce Einstein automates lead qualification — an agent that checks LinkedIn, company revenue databases, and CRM history to score and route leads without human input',
        tools: ['LangChain AgentExecutor', 'Tavily Search API', 'DuckDuckGo Tool', 'Python REPL Tool'],
      },
      {
        n: 6, title: 'RAG — Make AI Know Your Business Data',
        topics: [
          'Why RAG exists: solving hallucinations + knowledge cutoff in one architecture',
          'Document ingestion: PDF, Word, CSV, web pages, SQL databases, APIs',
          'Chunking strategies: fixed-size, recursive, semantic, sentence-window — tradeoffs',
          'Embeddings explained: why similar meaning = similar vectors in high-dimensional space',
          'Vector DBs: Pinecone vs ChromaDB vs Weaviate vs PGVector — selection framework',
          'Hybrid search: dense vector + BM25 keyword search for maximum recall',
        ],
        handson: 'Build a "Chat with Your Policy Documents" app — upload any HR manual, legal document, or product catalog and query it in plain language. 500 documents, sub-second response, deployed live',
        industry: 'How Zomato built an internal knowledge base chatbot for 12,000+ employees that replaced 80% of IT helpdesk tickets in the first month of deployment',
        tools: ['LangChain RAG Pipeline', 'ChromaDB', 'OpenAI Embeddings', 'PyPDF2', 'Unstructured.io'],
      },
      {
        n: 7, title: 'Multi-Agent Systems & Orchestration',
        topics: [
          'Why single agents fail: context limits, task complexity, reliability at scale',
          'Agent roles — Planner, Researcher, Writer, Critic, Executor: a production taxonomy',
          'LangGraph: stateful multi-agent workflows with conditional routing and loops',
          'CrewAI: role-based agent teams with shared memory and task delegation',
          'Communication patterns: sequential pipelines, parallel fan-out, hierarchical supervision',
          'Observability: tracing what each agent did and why — debugging multi-agent bugs',
        ],
        handson: 'Build a 4-agent content pipeline: Research Agent → Outline Agent → Writer Agent → SEO Critic Agent — produces a fully optimised, publication-ready blog post from a single keyword input',
        industry: 'How a Big 4 consulting firm built a 6-agent M&A due diligence system that analyses target companies 10× faster than manual review teams, with audit-ready output',
        tools: ['LangGraph', 'CrewAI', 'LangSmith (tracing)', 'GPT-4o', 'AutoGen'],
      },
      {
        n: 8, title: 'Industry Use Cases — End to End',
        topics: [
          'Sales: AI SDR that researches prospects, writes personalised cold emails, books demos',
          'HR: Resume screening pipeline, interview scheduling agent, onboarding assistant',
          'Finance: Automated P&L analysis, expense anomaly detection, compliance checker',
          'Legal: Contract clause extraction, risk flagging, NDA comparison tool',
          'Healthcare: Clinical note summarization, appointment scheduling, drug interaction check',
        ],
        handson: 'Full-day sprint — choose your industry vertical and build a complete, deployable agentic solution solving a real business problem. This becomes your first portfolio piece.',
        industry: 'Live case study: how a 500-person manufacturing company cut procurement processing time by 70% using an AI agent that reads invoices, checks inventory, and raises purchase orders autonomously',
        tools: ['LangChain', 'LangGraph', 'Salesforce API', 'SAP connectors', 'JIRA & Slack integrations'],
      },
    ],
  },
  {
    label: 'Month 3',
    title: 'Products, Portfolio & Career.',
    accent: C.peachDark,
    accentDark: C.coral,
    bg: C.peachBg,
    num: 3,
    weeks: [
      {
        n: 9, title: 'AI Product Architecture',
        topics: [
          'System design for AI products: from Jupyter notebook to production SaaS',
          'LLM selection framework: latency vs cost vs accuracy decision matrix',
          'Caching: semantic caching, prompt caching, response caching — cost impact',
          'Streaming architecture: SSE and WebSockets for real-time AI output',
          'Evaluation frameworks: building automated evals for AI output quality',
          'Production monitoring: latency p99, token costs, hallucination rate dashboards',
        ],
        handson: 'Architect a complete production AI SaaS product — draw the system diagram, calculate monthly API costs at 1,000 users, define SLAs, identify and mitigate failure points',
        industry: 'How Anthropic serves 100M+ API calls per day — the infrastructure, caching, and routing decisions behind reliability and cost at scale',
        tools: ['LangSmith', 'Helicone', 'Redis (semantic caching)', 'Prometheus + Grafana', 'Pytest evals'],
      },
      {
        n: 10, title: 'Capstone Project with Real Client Brief',
        topics: [
          'Real client brief from Srinivasan\'s industry network (new brief every batch)',
          'Requirements gathering with an AI-first product mindset',
          'Scoping your MVP: what to build vs what to defer — prioritisation framework',
          'Data privacy and compliance: GDPR, India DPDP Act, and AI ethics basics',
          'Project management for AI products: iteration cycles, blockers, testing cadence',
        ],
        handson: '2-week sprint — build your complete capstone from scratch. Past projects: AI resume screener (now used by 3 companies), legal contract analyser for an LLP, inventory prediction agent for a D2C brand',
        industry: 'How past batch members landed their first AI role — the exact portfolio projects that got them interviews at Google, Infosys, TCS GenAI division, and Series B startups',
        tools: ['Your full-stack choice — this is your architecture, your decisions'],
      },
      {
        n: 11, title: 'Deploy, Demo & Get Feedback',
        topics: [
          'Deployment options and tradeoffs: Vercel, Railway, Fly.io, AWS Lambda, HF Spaces',
          'Environment variables, secrets management, and .env best practices',
          'Building a demo-ready product: polish, loading states, error handling',
          'Presenting AI products to non-technical stakeholders — a 5-minute framework',
          'Recording a professional product demo video for your portfolio',
        ],
        handson: 'Demo Day — present your capstone to Srinivasan + 2 industry guests from hiring companies. Receive structured recorded feedback on product quality, presentation, and hire-ability.',
        industry: 'The exact pitch format used by AI startups to close seed rounds — adapted for job interviews and freelance client pitches, with real examples from past batches',
        tools: ['Vercel', 'Railway', 'Loom', 'GitHub Pages', 'OBS Studio'],
      },
      {
        n: 12, title: 'Career Strategy, Salary Negotiation & Placement',
        topics: [
          '"AI Product Developer" vs "ML Engineer" — positioning yourself in the real hiring market',
          'GitHub portfolio construction for AI roles — what senior engineers look for',
          'LinkedIn profile optimisation: keywords, featured section, creator mode',
          'GenAI hiring reality: analysis of 50+ real JDs from top companies',
          'Technical interview prep: AI system design + LLM API coding questions',
          'Salary negotiation for AI roles — ₹8 LPA to ₹30 LPA range fully decoded',
        ],
        handson: 'Portfolio audit, LinkedIn profile rewrite, and mock technical interview — all recorded and returned to you. Direct introductions to Srinivasan\'s hiring network for qualified graduates.',
        industry: 'Real offer letters from past batch members + the negotiation tactics that moved one student from ₹6 LPA to ₹18 LPA in a single counteroffer conversation',
        tools: ['LinkedIn', 'GitHub', 'Notion (portfolio template provided)', 'Srinivasan\'s placement network'],
      },
    ],
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function CurriculumPage() {
  useEffect(() => { window.print() }, [])

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#fff', color: '#1a0e0a', maxWidth: '860px', margin: '0 auto', padding: '0 0 48px' }}>

      {/* ── On-screen controls ── */}
      <div className="print:hidden" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '20px 32px 0' }}>
        <button
          onClick={() => window.print()}
          style={{ background: C.coral, color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          Print / Save as PDF
        </button>
      </div>

      {/* ── Cover header ── */}
      <div style={{ background: `linear-gradient(135deg, ${C.dark} 0%, #261309 50%, #3D1C0A 100%)`, padding: '48px 40px 40px', marginBottom: '0' }}>
        {/* Claude-color accent bar */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '28px' }}>
          {[C.coral, C.amber, C.peach, C.terracotta, '#E8956A'].map((col, i) => (
            <div key={i} style={{ height: '4px', flex: 1, background: col, borderRadius: '2px' }} />
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `linear-gradient(135deg, ${C.coral}, ${C.terracotta})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>
            SR
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2px' }}>Course Curriculum</div>
            <div style={{ color: 'rgba(255,255,255,0.80)', fontSize: '12px', fontWeight: 500 }}>Srinivasan Ramanujam · GenAI &amp; Agentic AI</div>
          </div>
        </div>

        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 800, lineHeight: 1.15, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
          End to End Product Development<br />
          <span style={{ background: `linear-gradient(90deg, ${C.peach}, ${C.amber})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Using GenAI &amp; Agentic AI
          </span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', margin: '0 0 24px' }}>
          Reverse Engineering Method · Build first, understand second, master it always
        </p>

        {/* Stats strip */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {[
            { icon: '📅', label: '3 Months · 12 Weeks' },
            { icon: '🎓', label: 'Live Online Classes' },
            { icon: '👥', label: '40,000+ People Trained' },
            { icon: '🏛️', label: '50+ Institutions' },
            { icon: '⚡', label: '25+ Years Experience' },
            { icon: '💼', label: 'Placement Support' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', padding: '5px 12px', fontSize: '11px', color: 'rgba(255,255,255,0.80)', fontWeight: 500 }}>
              <span>{s.icon}</span> {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Months ── */}
      {months.map((m, mi) => (
        <div key={m.label} className={mi > 0 ? 'page-break' : ''} style={{ padding: '0 32px', marginTop: '36px' }}>

          {/* Month header */}
          <div style={{ background: `linear-gradient(135deg, ${m.accent}, ${m.accentDark})`, borderRadius: '14px', padding: '20px 24px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.60)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>
                {m.label} of 3
              </div>
              <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>{m.title}</h2>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '22px', fontWeight: 900, flexShrink: 0 }}>
              {m.num}
            </div>
          </div>

          {/* Week cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {m.weeks.map((w) => (
              <div key={w.n} style={{ border: `1.5px solid ${m.bg === C.lightBg ? '#F0D5C5' : m.bg === C.amberBg ? '#EDD8A0' : '#F0CDB8'}`, borderRadius: '12px', overflow: 'hidden' }}>

                {/* Week header */}
                <div style={{ background: m.bg, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: `1px solid rgba(0,0,0,0.06)` }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `linear-gradient(135deg, ${m.accent}, ${m.accentDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 800, flexShrink: 0 }}>
                    W{w.n}
                  </div>
                  <div>
                    <div style={{ color: m.accent, fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2px' }}>Week {w.n}</div>
                    <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#1a0e0a', lineHeight: 1.3 }}>{w.title}</h3>
                  </div>
                </div>

                {/* Week body */}
                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

                  {/* Topics */}
                  <div>
                    <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: m.accent, marginBottom: '8px' }}>Topics Covered</div>
                    <ul style={{ margin: 0, paddingLeft: '16px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {w.topics.map((t, ti) => (
                        <li key={ti} style={{ fontSize: '12px', color: '#3D2010', lineHeight: 1.5, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                          <span style={{ color: m.accent, fontWeight: 700, fontSize: '10px', marginTop: '2px', flexShrink: 0 }}>→</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hands-on + Industry side by side */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {/* Hands-on */}
                    <div style={{ background: `linear-gradient(135deg, ${m.accent}18, ${m.accentDark}10)`, border: `1px solid ${m.accent}40`, borderRadius: '8px', padding: '12px' }}>
                      <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: m.accentDark, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>🛠</span> Hands-On Project
                      </div>
                      <p style={{ margin: 0, fontSize: '11px', color: '#2D1008', lineHeight: 1.55 }}>{w.handson}</p>
                    </div>

                    {/* Industry example */}
                    <div style={{ background: '#F9F4F0', border: '1px solid #E8D5C5', borderRadius: '8px', padding: '12px' }}>
                      <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B4020', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>🏢</span> Industry Example
                      </div>
                      <p style={{ margin: 0, fontSize: '11px', color: '#2D1008', lineHeight: 1.55 }}>{w.industry}</p>
                    </div>
                  </div>

                  {/* Tools */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B6050', marginRight: '2px' }}>Tools:</span>
                    {w.tools.map((tool) => (
                      <span key={tool} style={{ background: m.bg, border: `1px solid ${m.accent}50`, color: m.accentDark, fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '100px' }}>
                        {tool}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ── Footer ── */}
      <div style={{ margin: '40px 32px 0', padding: '24px', borderTop: `2px solid ${C.coral}30`, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px' }}>
        {/* Claude color strip */}
        <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
          {[C.coral, C.amber, C.peach, C.terracotta, C.peachDark].map((col, i) => (
            <div key={i} style={{ width: '28px', height: '3px', background: col, borderRadius: '2px' }} />
          ))}
        </div>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#1a0e0a' }}>
          Ready to build? Book your free discovery call.
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: '#6B4030' }}>
          Fee is discussed on the call — not here.
        </p>
        <div style={{ display: 'flex', gap: '20px', fontSize: '11px', color: '#8B5540', marginTop: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span>🌐 linkedin.com/in/writersrinivasan</span>
          <span>✉️ writersrinivasan@gmail.com</span>
          <span>📺 youtube.com/@srinivasanramanujam7534</span>
        </div>
        <p style={{ margin: '8px 0 0', fontSize: '10px', color: '#B08070' }}>
          © 2026 Srinivasan Ramanujam · All rights reserved · Founder, Yoto
        </p>
      </div>

    </div>
  )
}
