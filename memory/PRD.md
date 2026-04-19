# Mono Mind SEO — Migration PRD

## Original Problem Statement
Migrate the Lovable.dev repo `https://github.com/VenkataPagadalaGIT/mono-mind-seo` to Emergent's stack.

User explicitly chose **Option A: Next.js + FastAPI + MongoDB** (not the default CRA stack) specifically so AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) and search engine crawlers can retrieve and rank the content — a key requirement given the project is SEO-focused.

## Source Project (as-is)
- **Repo**: VenkataPagadalaGIT/mono-mind-seo (public, TypeScript)
- **Stack**: Vite + React 18 + TypeScript + shadcn-ui + Tailwind + Three.js (+ react-three/fiber/drei) + framer-motion + react-router-dom + react-helmet-async + @tanstack/react-query
- **Purpose**: Personal portfolio / AI knowledge hub for Venkata Pagadala ("Mono Mind"): AI Contributors encyclopedia, Insights/Pillar pages, AI Updates, Research, Solutions, Notebook, Experience, Contact
- **Pages**: 19 routes (Home, About, Projects, Publications, Insights + slug + nested postSlug, Solutions + slug, Research, Notebook + ai/business/roadmap/encyclopedia, AI Updates + slug, AI Contributors + id, Experience, Contact)
- **Components**: 70+ including heavy 3D/canvas visualisations

## Target Stack (implemented)
- **Frontend**: Next.js 14 (App Router) + React 18 + TypeScript + Tailwind + shadcn-ui + Three.js + framer-motion
- **Backend**: FastAPI + Motor (async MongoDB) + Pydantic v2
- **DB**: MongoDB
- **SEO**: server-side-rendered HTML, per-page `metadata`, Person/WebSite JSON-LD in root layout, dynamic `sitemap.xml`, dynamic `robots.txt` that explicitly allows AI crawlers

## Architecture

### Frontend (`/app/frontend`)
```
app/
├── layout.tsx              # Root SSR layout (metadata, JSON-LD, Navbar, Footer, Providers)
├── providers.tsx           # QueryClient, TooltipProvider, Toasters
├── page.tsx                # Home
├── about/page.tsx
├── projects/page.tsx
├── publications/page.tsx
├── insights/page.tsx
│   └── [slug]/page.tsx              # PillarPage with generateMetadata
│       └── [postSlug]/page.tsx      # BlogPostPage
├── solutions/page.tsx
│   └── [slug]/page.tsx              # ServiceLanding
├── research/page.tsx
├── notebook/
│   ├── page.tsx
│   ├── ai/page.tsx + roadmap + encyclopedia
│   └── business/page.tsx
├── ai-updates/page.tsx
│   └── [slug]/page.tsx
├── ai-contributors/page.tsx
│   └── [id]/page.tsx
├── experience/page.tsx
├── contact/page.tsx
├── not-found.tsx
├── globals.css
├── sitemap.ts              # Dynamic sitemap listing every route
└── robots.ts               # Allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.

src/
├── components/             # All 70+ Lovable components (shadcn ui, 3D, animations)
├── pages/                  # Client page bodies (rendered from app/ server pages)
├── hooks/
└── lib/
    ├── router-shim.tsx     # react-router-dom → next/navigation compatibility shim
    ├── helmet-shim.tsx     # react-helmet-async no-op (metadata handled by Next)
    └── site.ts             # SITE_URL, SITE_NAME, API constants
```

### Backend (`/app/backend/server.py`)
All routes under `/api` prefix:
- `GET /api/` — service info
- `GET /api/health` — liveness + mongo ping
- `GET /api/stats` — counts
- `POST /api/contact` → `contact_submissions` collection
- `GET /api/contact/submissions?limit=N`
- `POST /api/newsletter` → `newsletter_subscribers` (idempotent, unique email index)
- `GET /api/newsletter/subscribers?limit=N`

Collections seeded with indexes on startup (email, created_at desc).

## Personas
- **Venkata Pagadala (owner)** — publishes insights/updates, gets contact enquiries + newsletter subs
- **Human visitors** — read insights, explore AI Contributors encyclopedia, send enquiries
- **AI crawlers (GPTBot, ClaudeBot, Perplexity, Google-Extended, etc.)** — retrieve SSR HTML for AI search answers ← **THE KEY REASON FOR NEXT.JS**
- **Search engine bots (Googlebot, Bingbot)** — rank pages via sitemap + structured data

## Core Requirements (static)
1. Every page delivers fully-rendered SSR HTML with real `<h1>`, semantic sections, meta tags
2. Each page exports a proper Next.js `metadata` block (title, description, canonical, OG, Twitter)
3. Global JSON-LD for Person + WebSite; per-page can add Article/Breadcrumb/FAQ
4. `robots.txt` explicitly ALLOWS all major AI crawlers
5. `sitemap.xml` lists all top-level routes (dynamic content routes can be added later)
6. Contact + Newsletter forms persist to MongoDB via FastAPI
7. Preserve original Lovable UI (typography, 3D, animations, layout, shadcn)

## What's Been Implemented (2026-04-19)
- Cloned source repo, wiped CRA, scaffolded Next.js 14 App Router with TypeScript
- Migrated all 19 routes into `app/` (thin SSR server-component pages → client page bodies)
- Compatibility shims: `router-shim` (maps react-router-dom APIs to Next.js) + `helmet-shim` (no-op; metadata handled natively)
- Added `"use client"` directives to 100+ component files that use hooks / browser APIs / Radix / shadcn
- Fixed hydration mismatch in `PageSidebar` (window.location.href moved inside useEffect)
- Fixed `ScrollReveal` to default visible for SSR crawlers (so bots never see opacity:0)
- Global JSON-LD in root layout (Person + WebSite)
- Per-page `metadata` exports + dynamic `generateMetadata` for slug routes
- Dynamic `app/sitemap.ts` covering all main routes
- Dynamic `app/robots.ts` allowing GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Bytespider, Amazonbot, Meta-ExternalAgent, DuckAssistBot
- FastAPI backend rewritten: contact + newsletter with Pydantic v2, unique email index, idempotent subscribe
- `ContactForm` + `NewsletterForm` components wired to backend
- Contact page redesigned to include the new message form alongside email/LinkedIn/Newsletter blocks
- All 26 backend tests pass (contact, newsletter, stats, validation, idempotency, index handling) → 100%
- Screenshots confirm Home, Contact, AI Contributors, AI Updates all render beautifully with original Lovable design intact

## Backlog / Future

### P1 — Content to MongoDB (real CMS)
Move hardcoded data (AI Contributors array, AI Updates articles, Insights posts) into MongoDB, so the owner can add/edit without redeploying and so detail pages get proper per-slug `generateMetadata`.

### P1 — Expand sitemap
Pull slugs from MongoDB and append every AI contributor, AI update, insight, solution to the sitemap.

### P2 — Article JSON-LD per post
When posts move to MongoDB, emit `Article` / `BlogPosting` JSON-LD with author, dates, image per detail page.

### P2 — Admin UI
Simple `/admin` (JWT-protected) to view contact submissions + newsletter subscribers, and CRUD content.

### P2 — Email notifications
On new contact submission, email the owner (Resend/SendGrid).

### P3 — Analytics + per-bot telemetry
Log which AI/search bot hits which pages (UA parsing) so the owner can see AI retrieval growth.

### P3 — RSS feed generator
Dynamic `/rss.xml` from MongoDB (current one is static).

### P3 — Pre-rendering slug routes
`generateStaticParams` for slug routes once content is in MongoDB — fully static HTML for even better bot retrieval & speed.

## Key Files
- Frontend entry: `/app/frontend/app/layout.tsx`
- Backend entry: `/app/backend/server.py`
- Compatibility shims: `/app/frontend/src/lib/router-shim.tsx`, `/app/frontend/src/lib/helmet-shim.tsx`
- Site constants: `/app/frontend/src/lib/site.ts`
- Forms: `/app/frontend/src/components/ContactForm.tsx`, `NewsletterForm.tsx`
