# Mono Mind SEO — Migration PRD

## Original Problem Statement
Migrate the Lovable.dev repo `https://github.com/VenkataPagadalaGIT/mono-mind-seo` to Emergent's stack.

User explicitly chose **Option A: Next.js + FastAPI + MongoDB** so AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) and search engine crawlers can retrieve and rank content — the project is SEO-focused.

## Source Project (as-is)
- **Repo**: VenkataPagadalaGIT/mono-mind-seo (public, TypeScript)
- **Stack**: Vite + React 18 + TypeScript + shadcn-ui + Tailwind + Three.js + framer-motion + react-router-dom + react-helmet-async + @tanstack/react-query
- **Purpose**: Personal portfolio / AI knowledge hub for Venkata Pagadala ("Mono Mind")

## Target Stack (implemented)
- **Frontend**: Next.js 14 (App Router) + React 18 + TypeScript + Tailwind + shadcn + Three.js + framer-motion
- **Backend**: FastAPI + Motor (async Mongo) + Pydantic v2 + bcrypt + PyJWT + Resend
- **DB**: MongoDB (collections: contact_submissions, newsletter_subscribers, admin_users, contributors, ai_updates, pillars, posts)

## Personas
- **Owner (Venkata Pagadala)** — uses /admin to monitor contacts, subscribers, content stats; receives contact emails via Resend
- **Human visitors** — read insights, AI Contributors encyclopedia, send enquiries, subscribe
- **AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.)** — retrieve SSR HTML + per-page JSON-LD for AI search answers
- **Search engine bots (Googlebot, Bingbot)** — crawl dynamic sitemap (160+ URLs) with per-post Article JSON-LD

## What's Been Implemented

### Iteration 6 — Holographic photo treatment (2026-04-26)
- New reusable `<HoloPhoto>` component (`/app/frontend/src/components/HoloPhoto.tsx`) — neutralizes vendor-branded image halos and applies the brand's terminal/glow aesthetic
- Effects (CSS in `app/globals.css`): grayscale + low-saturation base, cyan ambient glow + magenta accent gradient corners, animated scanlines, terminal corner brackets that grow on hover, hover state lifts the card and reveals full-color photo with cyan halo + chromatic-aberration on the speaker name
- Applied site-wide to every speaker image: conference detail speakers grid (39 cards), inline session speaker chips (40), Grid view tiles (40 large hologram squares), SpeakerProfile hero (square 260px), SessionDetail speaker hero (square 120px)
- All existing flows untouched — same hrefs, same testids; pure visual upgrade

### Iteration 5 — Per-session pages + hero CTAs (2026-04-26)
- New SSG dynamic route `/notebook/conference/[slug]/sessions/[sessionId]` — **61 pages pre-rendered**, one per speech
- New view `SessionDetail.tsx` with: session hero (type pill, time, day, theme) + speaker hero (photo, bio, LinkedIn, podcast, "Open profile" link) + Abstract + Suggested takeaways + **My Notes** long-form editor (rows=16, autosave 1.2s, status pills, publish toggle, takeaway chips) + Prev/Next session nav + JSON-LD `Event` schema
- Logged-out visitors see Notes Locked card (or published field notes if available)
- Conference detail page hero now shows prominent CTAs: **VIEW AGENDA** · **BROWSE SPEAKERS · 39** · **SIGN IN TO TAKE NOTES** (changes to TAKE NOTES when logged in)
- Every non-structural session card on the agenda has a clear **"Open session →"** button to its dedicated page (44 buttons total). The inline "Quick note" toggle is preserved alongside for fast capture.
- Grid view tiles now link to the per-session page (was: speaker profile) — better fit for note-taking flow
- Testing: 23/23 backend pytest pass · 100% frontend Playwright (autosave, publish, logout-public-render, prev/next, SSG, regression)

### Iteration 4 — Speaker profiles + publish toggle (2026-04-26)
- New `/app/frontend/src/data/speakers.ts` — 39 SEO Week 2026 speakers with photo (hot-linked from seoweek.org), bio, role, company, day track, LinkedIn, podcast URL
- New SSG route `/notebook/conference/speakers/[slug]` — 39 pre-rendered profile pages (Hero photo + bio + talks timeline + JSON-LD `Person`)
- Speaker model is **reusable across conferences**: `getSpeakerTalks(name)` aggregates all sessions a speaker has across `conferences.ts`. Future conferences will surface speakers' full timelines automatically.
- ConferenceDetail upgraded: speaker chip cloud → photo cards linking to profile pages; inline session speaker chip now also has photo + profile link
- New Timeline / Grid view toggle in the agenda — Grid view shows day-by-day photo tiles
- Backend: added `is_public` field to `conference_notes` + new public endpoint `GET /api/notebook/notes/public/{slug}` (no auth) returning only published notes
- Note editor now has a **Public/Private toggle** — flip a session's notes to public and they render inline on the conference detail page AND on the speaker's profile page
- PUT upsert preserves existing `is_public`/`status`/`takeaways` when those fields are omitted from payload (no accidental resets)
- Testing: 23/23 backend pytests pass; frontend Playwright verified all flows including end-to-end publish + public render after logout

### Iteration 3 — Conference Notebook (2026-04-26)
- Implemented SEO Week 2026 Conference Notebook template (user attending Apr 26–30, NYC)
- Refactored `/notebook/conference` index → uses real `conferences.ts` data (featured + upcoming + field notes)
- New SSG route `/notebook/conference/[slug]` with `generateStaticParams` (1 conference pre-rendered today, scales to N)
- New view `ConferenceDetail.tsx`: hero + stats, Why It Matters, Venues, 5-day sticky-tab timeline (61 sessions), 39-speaker chip cloud with anchors back to sessions, JSON-LD `Event` schema with sub-events
- Backend: collection `conference_notes`, unique index `(conference_slug, session_id)`, 3 admin-protected endpoints `GET/PUT/DELETE /api/notebook/notes/{slug}/{session_id}`
- Frontend live note editor (admin-only): per-session inline textarea with 1.2s debounced autosave, status pills (attended/skipped/revisit), takeaway chip input, `Last saved` indicator
- Public visitors see clean SSG agenda + JSON-LD; admin sees the editor on every non-structural session
- Testing: 16/16 backend pytest pass, frontend Playwright verified (39 chips, 101 cards, 44 editor toggles, end-to-end PUT + reload persistence)

### Iteration 1 — Migration (2026-04-19 early)
- Cloned source, wiped CRA, scaffolded Next.js 14 App Router with TypeScript
- Migrated all 19 routes into `app/` (server components → client page bodies)
- Shims: `src/lib/router-shim.tsx` (react-router-dom → next/navigation), `src/lib/helmet-shim.tsx` (no-op, metadata via Next API)
- Added `"use client"` to 100+ interactive components
- Fixed hydration mismatches (PageSidebar, ScrollReveal)
- Per-page `metadata` exports + global JSON-LD (Person + WebSite) in root layout
- Dynamic `sitemap.xml` + `robots.txt` (allows GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Bytespider, Amazonbot, Meta-ExternalAgent, DuckAssistBot)
- FastAPI backend with contact + newsletter endpoints, unique email index, idempotent subscribe
- Backend tests: 26/26 pass (100%)

### Iteration 2 — Content + Auth + Admin + Email (2026-04-19 late)
- **Content → MongoDB**: seeded 100 AI contributors + 7 AI updates + 6 pillars + 21 blog posts via `/app/backend/seed_data/content.json` (generated from TS data files with `tsx` script)
- **Content API endpoints**: `/api/content/contributors[/id]`, `/api/content/updates[/slug]`, `/api/content/pillars[/slug]`, `/api/content/posts[/slug]`, `/api/content/sitemap`
- **Per-post metadata & JSON-LD**: slug pages (`/insights/[slug]/[postSlug]`, `/ai-updates/[slug]`, `/ai-contributors/[id]`, `/insights/[slug]`) now fetch from MongoDB in `generateMetadata` and render Article/Person + BreadcrumbList JSON-LD server-side
- **Expanded sitemap**: now includes 16 static + 7 updates + 100 contributors + 6 pillars + 21 posts = **150 URLs**
- **JWT auth**: `/api/auth/login` (bcrypt + JWT), `/api/auth/me`, `/api/auth/logout`; seeds admin user on startup (`admin@monomind.com`/`MonoMind2026!` from env)
- **Protected admin endpoints**: `/api/admin/overview`, `/api/admin/contact-submissions`, `/api/admin/newsletter-subscribers` (legacy `/api/contact/submissions`, `/api/newsletter/subscribers` also now require auth)
- **Admin UI** (`/admin/login` + `/admin`): login form, dashboard with 6 overview tiles, tabs for contacts/subscribers with expandable message rows, CSV export, sign-out. Stores token in localStorage, uses `Authorization: Bearer` header via `src/lib/admin-client.ts`
- **Resend email**: on contact submission fires async email to `CONTACT_NOTIFICATION_EMAIL` (defaults to `vdepagadala@gmail.com`) via Resend. Gracefully no-ops when `RESEND_API_KEY` is empty (contact still saves)
- **Backend tests iteration 2**: 64/64 pass (100%) including bcrypt format verification

### Iteration 3 — SSG pre-rendering (2026-04-19 final)
- Added `generateStaticParams` + `revalidate = 3600` (ISR) to all 5 slug routes: `/ai-contributors/[id]` (100), `/ai-updates/[slug]` (7), `/insights/[slug]` (6), `/insights/[slug]/[postSlug]` (21), `/solutions/[slug]` (6) — **140 slug pages pre-rendered as static HTML at build time**
- `dynamicParams = true` on each so unknown slugs still render on-demand (no 404 for freshly-added content)
- Wrapped `{children}` in root-layout Suspense + fixed router-shim `useLocation` to stop calling `useSearchParams()` — eliminates CSR bail-out that was breaking SSG
- Renamed `src/pages/` → `src/views/` to prevent Next.js from auto-registering legacy Pages Router routes (removes duplicate `/About`, `/Home`, etc. URLs)
- Fixed `BlogPostPage` param mismatch (`pillarSlug` → `slug` to match `/insights/[slug]/[postSlug]` route)
- Production `next build` now completes cleanly: **163 static pages generated (140 SSG slug + 23 static)** with zero errors
- Sitemap-aware ISR: every hour Next.js refreshes `sitemap.xml` + slug HTML from MongoDB, so new content propagates without redeploy


## Backlog / Future

### P1 — Enable email notifications in production
Set `RESEND_API_KEY` in `/app/backend/.env` (get at https://resend.com/api-keys). If the `SENDER_EMAIL` domain isn't verified in Resend, emails only deliver to the verified owner's email — which is what we want here.

### P1 — Switch supervisor to `next start` for production
Currently supervisor runs `next dev` (hot-reload). Once you're happy with the content, switch the `start` script in `package.json` to `next start -p 3000 -H 0.0.0.0` and deploy; you'll serve the pre-rendered static HTML from `.next/` for maximum speed + perfect crawlability.

### P1 — Pre-render slug routes with `generateStaticParams` ✅ DONE (iteration 3)

### P2 — Admin CRUD for content
Currently admin only reads submissions. Extend UI + endpoints to edit contributors/updates/posts so owner doesn't need to redeploy to publish.

### P2 — Migrate remaining content files to DB
`aiEncyclopedia.ts` (1211 lines), `aiRoadmap.ts` (860 lines), `aiNotebook.ts` (269 lines), `crossLinks.ts` (209 lines). These are mostly taxonomy/static so lower SEO value than what's already migrated, but good for editability.

### P3 — Analytics + per-bot telemetry
Log UA parsing on every page hit so owner can see which AI/search bots are pulling what.

### P3 — Slack/Telegram contact webhook
Alongside email, fire a Slack or Telegram message per new contact submission.

### P3 — RSS feed from MongoDB
Current `/rss.xml` is static. Replace with dynamic route reading from `ai_updates` + `posts` collections.

## Key Files
| File | Role |
|------|------|
| `/app/backend/server.py` | FastAPI app (auth, content, admin, contact, newsletter, email) |
| `/app/backend/seed_data/content.json` | Extracted 100/7/6/21 records |
| `/app/backend/.env` | MONGO_URL, JWT_SECRET, ADMIN_*, RESEND_API_KEY, CONTACT_NOTIFICATION_EMAIL |
| `/app/frontend/app/layout.tsx` | Root SSR layout + global JSON-LD + metadata |
| `/app/frontend/app/sitemap.ts` | Dynamic sitemap (fetches all slugs from API) |
| `/app/frontend/app/robots.ts` | Allows all AI crawlers |
| `/app/frontend/app/admin/login/LoginClient.tsx` | Admin login form |
| `/app/frontend/app/admin/DashboardClient.tsx` | Admin dashboard |
| `/app/frontend/src/lib/admin-client.ts` | Axios + token store + useRequireAdmin hook |
| `/app/frontend/src/lib/content-fetch.ts` | Server-side content fetchers + JSON-LD builders |
| `/app/frontend/src/lib/router-shim.tsx` | react-router-dom → next/navigation |
| `/app/frontend/src/lib/helmet-shim.tsx` | react-helmet-async no-op (renders JSON-LD inline) |
| `/app/frontend/src/lib/site.ts` | SITE_URL, BACKEND_URL constants |
| `/app/frontend/src/data/conferences.ts` | SEO Week 2026 + future conferences (timeline, speakers, venues) |
| `/app/frontend/src/views/ConferenceNotebook.tsx` | Index — featured + upcoming + field notes |
| `/app/frontend/src/views/ConferenceDetail.tsx` | Detail template — agenda timeline + speakers + admin live note editor |
| `/app/frontend/app/notebook/conference/[slug]/page.tsx` | Dynamic SSG route with `generateStaticParams` |
| `/app/backend/tests/test_conference_notebook.py` | Pytest suite (16/16 passing) |
| `/app/memory/test_credentials.md` | Admin credentials + auth endpoints reference |
