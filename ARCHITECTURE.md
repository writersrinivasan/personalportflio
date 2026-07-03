# Website Architecture
**Srinivasan Ramanujam — GenAI & Agentic AI Course Website**

---

## Overview

A single-product marketing website built to convert visitors into appointment bookings for the *End to End Product Development Using GenAI & Agentic AI* course. Built on Next.js 14, deployed to Vercel or Netlify.

---

## Layer 01 — Visitor

Anyone who lands on the site, from any device.

| Entry point | Detail |
|---|---|
| LinkedIn | Profile shares and direct links |
| Google | Organic search results |
| Word of mouth | Direct URL |
| Device support | Desktop, tablet, mobile (fully responsive) |
| Browser support | Chrome, Safari, Firefox, Edge |

---

## Layer 02 — The Website (Next.js App)

### Pages

| Route | Purpose |
|---|---|
| `/` | Main website — hero, course info, all sections, booking form |
| `/curriculum` | Printable curriculum document — auto-triggers browser print/save-as-PDF dialog |

### Components (Building Blocks)

| Component | What it does | Status |
|---|---|---|
| `Nav` | Sticky navigation bar with Book Now button | ✅ Live |
| `Hero` | Full-screen opener with headline, CTAs, and trust strip | ✅ Live |
| `Stats` | Key numbers strip — 40K+ trained, 3 months, 50+ institutions | ✅ Live |
| `Method` | Explains the Reverse Engineering teaching approach | ✅ Live |
| `Audience` | Three audience cards — Fresh Grads, Career Switchers, Professionals | ✅ Live |
| `Curriculum` | Tabbed 12-week course breakdown with PDF download button | ✅ Live |
| `SocialProof` | Testimonials, corporate client logos, YouTube channel link | ✅ Live |
| `BookingForm` | Appointment request form — name, email, phone, role, time slot | ⚠️ Needs email wiring |
| `Footer` | Links, social icons, contact details, final CTA strip | ✅ Live |

---

## Layer 03 — Technology Stack

| Technology | Role |
|---|---|
| Next.js 14 | The framework that powers the entire site |
| TypeScript | Typed code — reduces bugs and makes future changes safer |
| Tailwind CSS | Visual styling system — controls all colours, spacing, and layout |
| Plus Jakarta Sans | Typeface used across the site (loaded via Google Fonts) |

---

## Layer 04 — External Connections

| Service | Purpose | Status |
|---|---|---|
| YouTube — `@srinivasanramanujam7534` | Video content, linked from Social Proof section | ✅ Connected |
| LinkedIn — `writersrinivasan` | Profile link in nav and footer | ✅ Connected |
| GitHub — `writersrinivasan` | Profile link in footer | ✅ Connected |
| Yoto Digital — `yoto.digital` | Company site linked in footer | ✅ Connected |
| Email / Form handler | Delivers booking form submissions to inbox | ⚠️ Not connected |
| Analytics | Tracks visitor count, source, and behaviour | ⚠️ Not connected |

### Pending: Booking Form Email
The booking form UI is complete. It needs to be connected to one of the following services to deliver submissions to your inbox:

- **Formspree** — paste one endpoint URL into `BookingForm.tsx`, done
- **EmailJS** — free tier, no backend needed
- **Netlify Forms** — free, built-in if deploying to Netlify (zero code changes)

---

## Layer 05 — Deployment

The site is ready to deploy. Choose one platform:

### Option A — Vercel (Recommended)
- Built by the same team that makes Next.js
- One-click deploy from GitHub
- Free tier available
- URL: vercel.com

### Option B — Netlify
- Equally capable alternative
- Free tier available
- Built-in form handling (removes the need for Formspree)
- URL: netlify.com

### What both give you automatically
- HTTPS (secure padlock in the browser)
- Fast loading globally via edge network (30+ countries)
- Auto-deploy every time code is pushed
- Zero server maintenance

---

## File Structure

```
Website-design/
├── app/
│   ├── layout.tsx          # Global HTML shell, fonts, metadata
│   ├── page.tsx            # Home page — assembles all components
│   ├── globals.css         # Base styles, Tailwind setup
│   └── curriculum/
│       └── page.tsx        # Printable curriculum page
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── Method.tsx
│   ├── Audience.tsx
│   ├── Curriculum.tsx
│   ├── SocialProof.tsx
│   ├── BookingForm.tsx
│   └── Footer.tsx
├── public/                 # Static assets (add images here)
├── ARCHITECTURE.md         # This file
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```

---

## Running the Project

```bash
# Install dependencies (first time only)
npm install

# Run locally in development mode
npm run dev
# → opens at http://localhost:3000

# Build for production
npm run build

# Start production server locally
npm start
```

---

## What's Left Before Going Live

| Task | Priority | Who |
|---|---|---|
| Add real student testimonials | High | Srinivasan |
| Add corporate client names/logos | High | Srinivasan |
| Wire booking form to email service | High | CTO |
| Add Google Analytics or Plausible | Medium | CTO |
| Connect custom domain | High | Both |
| Deploy to Vercel or Netlify | High | Both |

---

*Last updated: July 2026*
