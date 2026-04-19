/**
 * Vite plugin: prerender per-route static HTML with rich <noscript> fallbacks.
 *
 * What it does:
 *   At `vite build`, after Vite emits the SPA `index.html`, this plugin reads
 *   the codebase's data files and emits one HTML file per known route
 *   (e.g. `notebook/ai/roadmap/index.html`). Each emitted file is a clone of
 *   `index.html` with route-specific:
 *     - <title> and meta description
 *     - <link rel="canonical">
 *     - <noscript> body containing real, crawlable content
 *
 * Why:
 *   Lovable hosting serves a Vite SPA. Without this, every URL serves the same
 *   homepage <noscript>. With this, AI bots and crawlers (GPTBot, ClaudeBot,
 *   PerplexityBot, Bingbot, DuckDuckBot, Bingbot) hitting `/notebook/ai/roadmap`
 *   directly see the full Roadmap content in the initial HTML response — no
 *   JavaScript required. React still hydrates normally for human visitors.
 *
 * Limitations vs. true SSG:
 *   This is *not* full server-side rendering — interactive components, charts,
 *   3D scenes, etc. still hydrate client-side. But every key page now has
 *   substantive crawlable content in its initial HTML payload.
 */

import type { Plugin } from "vite";
import path from "node:path";
import fs from "node:fs/promises";

const SITE_URL = "https://venkatapagadala.com";

// Route definitions are loaded dynamically from the data files at build time.
type RouteSpec = {
  path: string; // e.g. "/notebook/ai/roadmap"
  title: string;
  description: string;
  noscriptHtml: string; // full <noscript> inner HTML (without the wrapping tag)
};

// Helpers ---------------------------------------------------------------

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const link = (href: string, text: string) =>
  `<a href="${escape(href)}">${escape(text)}</a>`;

// Build the per-route specs from local data --------------------------------

export async function buildRouteSpecs(): Promise<RouteSpec[]> {
  // Dynamic imports so this plugin file works even if data files change shape.
  const [{ roadmapTopics, PHASES }, { encyclopediaConcepts, ENCYCLOPEDIA_CATEGORIES }, { aiContributors }, { aiUpdates }, { pillarPages }] =
    await Promise.all([
      import("../src/data/aiRoadmap"),
      import("../src/data/aiEncyclopedia"),
      import("../src/data/aiContributors"),
      import("../src/data/aiUpdates"),
      import("../src/data/insights"),
    ]);

  const routes: RouteSpec[] = [];

  // ----- Static brand pages (high-level summaries) -----
  routes.push(
    {
      path: "/about",
      title: "About — Venkata Pagadala | AI Product Owner & Technical SEO Lead",
      description: "AI Product Manager — Search (SEO, GEO) at AT&T. 10+ years scaling organic search for Fortune 500 brands.",
      noscriptHtml: `
        <h1>About Venkata Pagadala</h1>
        <p>AI Product Manager — Search (SEO, GEO) at AT&amp;T. Lead Technical Product Manager (Automation, AI &amp; SEO) since March 2025. 10+ years scaling organic search for Fortune 500 brands. Managing 50M+ pages, 5.3M keywords classified, 100+ neural agent pipelines.</p>
        <p>${link("/experience", "View experience")} · ${link("/projects", "View projects")} · ${link("/contact", "Contact")}</p>
      `,
    },
    {
      path: "/experience",
      title: "Experience — Venkata Pagadala | 10+ Years Scaling Organic Search",
      description: "10+ years of experience in technical SEO and AI product leadership across Fortune 500 brands and high-growth startups.",
      noscriptHtml: `
        <h1>Experience</h1>
        <p>Lead Technical Product Manager (Automation, AI &amp; SEO) at AT&amp;T (March 2025 – Present, Atlanta). Managing AI-powered search optimization across AT&amp;T's digital properties, building automation workflows using AI agents, MCP servers, and A2A pipelines, overseeing enterprise technical SEO infrastructure at 50M+ page scale.</p>
        <p>${link("/about", "About")} · ${link("/projects", "Projects")} · ${link("/solutions", "Solutions")}</p>
      `,
    },
    {
      path: "/projects",
      title: "Projects — Production AI Systems & Open Source",
      description: "Production AI systems including Omniscite (100+ neural agent orchestration), Knowledge Graph Engine (5.3M keywords), and Context Graph for Solutions.",
      noscriptHtml: `
        <h1>Projects</h1>
        <h2>Omniscite</h2>
        <p>100+ neural agent orchestration pipeline for SEO automation. Multi-agent system that coordinates technical audits, content optimization, and competitive analysis autonomously.</p>
        <h2>Knowledge Graph Engine</h2>
        <p>5.3M keyword taxonomy system structured into a 5-level hierarchy (Categories → Subcategories → Intents → Topics → Keywords). 913 L1 categories with &lt;1ms classification speed.</p>
        <h2>Context Graph for Solutions</h2>
        <p>Interactive service domain visualization using Canvas-based constellation map with jellyfish physics, radial burst reveal patterns, and ambient particle effects.</p>
      `,
    },
    {
      path: "/solutions",
      title: "Solutions & SEO — Enterprise AI Search Optimization",
      description: "Enterprise search optimization and AI-powered visibility strategies. AI Product, AEO, Technical SEO, Programmatic, Editorial, and Performance services.",
      noscriptHtml: `
        <h1>Solutions &amp; Services</h1>
        <ul>
          <li>${link("/solutions/ai-product", "AI Product")} — AI agents, workflow automation, RAG engines, knowledge graphs, MCP servers, A2A pipelines</li>
          <li>${link("/solutions/aeo", "Answer Engine Optimization (AEO)")} — AI visibility tracking, AI search prioritization, citation insights</li>
          <li>${link("/solutions/technical", "Technical SEO")} — Audits, internal linking, architecture, crawlability, international SEO, migrations</li>
          <li>${link("/solutions/programmatic", "Programmatic SEO")} — Scalable templates, high-volume generation, indexation logic</li>
          <li>${link("/solutions/editorial", "Editorial SEO")} — Topical authority, persona mapping, user intent research</li>
          <li>${link("/solutions/performance", "Performance Analytics")} — SEO performance, attribution, dashboards, KPIs</li>
        </ul>
      `,
    },
    {
      path: "/insights",
      title: "Insights & Blog — AI, SEO, and Search",
      description: "Essays, case studies, and thought leadership on AI agents, technical SEO, answer engine optimization, and editorial strategy.",
      noscriptHtml: `
        <h1>Insights &amp; Blog</h1>
        <ul>
          ${pillarPages.map((p) => `<li>${link(`/insights/${p.slug}`, p.title)} — ${escape(p.description.slice(0, 160))}…</li>`).join("\n          ")}
        </ul>
      `,
    },
    {
      path: "/research",
      title: "Research — Published Papers in NLP & AI Systems",
      description: "Published research in NLP, AI systems, and information retrieval.",
      noscriptHtml: `<h1>Research</h1><p>Published research in NLP, AI systems, and information retrieval. ${link("/publications", "View publications")}.</p>`,
    },
    {
      path: "/publications",
      title: "Publications — Venkata Pagadala",
      description: "Published articles, papers, and writing.",
      noscriptHtml: `<h1>Publications</h1><p>Published articles, papers, and writing on AI, SEO, and search.</p>`,
    },
    {
      path: "/contact",
      title: "Contact — Venkata Pagadala",
      description: "Get in touch for collaborations, speaking engagements, or consulting.",
      noscriptHtml: `<h1>Contact</h1><p>Get in touch for collaborations, speaking engagements, or consulting work.</p>`,
    },
    {
      path: "/notebook",
      title: "Notebook — AI & Business Knowledge Hubs",
      description: "AI Notebook and Business Notebook — comprehensive knowledge hubs.",
      noscriptHtml: `
        <h1>Notebook</h1>
        <ul>
          <li>${link("/notebook/ai", "AI Notebook")} — Complete AI knowledge hub</li>
          <li>${link("/notebook/business", "Business Notebook")} — Strategy and operations</li>
        </ul>
      `,
    },
    {
      path: "/notebook/business",
      title: "Business Notebook — Strategy and Operations",
      description: "Business strategy, operations, and product management notes.",
      noscriptHtml: `<h1>Business Notebook</h1><p>Strategy, operations, and product management. ${link("/notebook/ai", "View AI Notebook")}.</p>`,
    },
  );

  // ----- AI Notebook hub -----
  routes.push({
    path: "/notebook/ai",
    title: "AI Notebook — Complete AI Knowledge Hub | Venkata Pagadala",
    description: "Complete AI knowledge hub — research, frameworks, deep dives, the Free AI Roadmap 2026, the AI Encyclopedia, and the Top 100 AI Contributors directory.",
    noscriptHtml: `
      <h1>AI Notebook</h1>
      <p>Complete AI knowledge hub — research, frameworks, and deep dives.</p>
      <ul>
        <li>${link("/notebook/ai/roadmap", "Free AI Roadmap 2026")} — 18-week zero-to-hero curriculum (${roadmapTopics.length} topics)</li>
        <li>${link("/notebook/ai/encyclopedia", "AI Encyclopedia")} — ${encyclopediaConcepts.length} core AI concepts</li>
        <li>${link("/ai-contributors", "Top 100 AI Contributors 2026")} — ${aiContributors.length} researcher profiles</li>
        <li>${link("/ai-updates", "AI Updates")} — Latest news and announcements</li>
      </ul>
    `,
  });

  // ----- AI Roadmap (full content of all weeks) -----
  const roadmapByPhase = PHASES.map((phase) => ({
    phase,
    topics: roadmapTopics.filter((t) => t.phase === phase.label || t.phase.includes(phase.id)),
  }));

  routes.push({
    path: "/notebook/ai/roadmap",
    title: "Free AI Roadmap March 2026 | 18 Weeks Zero-to-Hero | Venkata Pagadala",
    description: "Free 18-week AI curriculum with 90+ curated resources. Foundations to applied engineering. Videos, courses, books, GitHub repos, and pro tips.",
    noscriptHtml: `
      <h1>Free AI Roadmap — March 2026</h1>
      <p>A free, structured 18-week AI curriculum with curated resources spanning videos, courses, books, GitHub repositories, and pro tips. From foundations through machine learning, deep learning, transformers, large language models, and applied AI engineering.</p>
      ${roadmapByPhase
        .map(
          ({ phase, topics }) => `
        <h2>${escape(phase.label)}</h2>
        <ol>
          ${topics
            .map(
              (t) => `<li><strong>Week ${t.week}: ${escape(t.topic)}</strong> — ${escape(t.description.slice(0, 220))}</li>`
            )
            .join("\n          ")}
        </ol>
      `
        )
        .join("\n      ")}
      <p>Total topics: ${roadmapTopics.length}. ${link("/notebook/ai/encyclopedia", "Browse the AI Encyclopedia")} · ${link("/ai-contributors", "View Top 100 AI Contributors")}.</p>
    `,
  });

  // ----- AI Encyclopedia (all 110 concepts grouped by category) -----
  const conceptsByCategory = ENCYCLOPEDIA_CATEGORIES.map((cat) => ({
    cat,
    concepts: encyclopediaConcepts.filter((c) => c.category === cat.label),
  }));

  routes.push({
    path: "/notebook/ai/encyclopedia",
    title: `AI Encyclopedia — ${encyclopediaConcepts.length} Core AI Concepts | Venkata Pagadala`,
    description: `${encyclopediaConcepts.length} core AI concepts across 10 categories — from attention mechanisms to zero-shot learning. Descriptions, key terms, prerequisites, and curated learn-more links.`,
    noscriptHtml: `
      <h1>AI Concepts Encyclopedia</h1>
      <p>${encyclopediaConcepts.length} AI concepts across 10 categories. Each entry includes a clear description, key terms, prerequisites, and curated learn-more links.</p>
      ${conceptsByCategory
        .map(
          ({ cat, concepts }) => `
        <h2>${escape(cat.label)} (${concepts.length})</h2>
        <ul>
          ${concepts
            .map((c) => `<li><strong>${escape(c.concept)}</strong> — ${escape(c.description.slice(0, 200))}</li>`)
            .join("\n          ")}
        </ul>
      `
        )
        .join("\n      ")}
    `,
  });

  // ----- Top 100 AI Contributors (index) -----
  const contributorsSorted = [...aiContributors].sort((a, b) => a.rank - b.rank);
  routes.push({
    path: "/ai-contributors",
    title: `Top ${aiContributors.length} AI Contributors 2026 — The Definitive Directory | Venkata Pagadala`,
    description: `The definitive 2026 directory of ${aiContributors.length} AI pioneers — researchers, founders, engineers, and thought leaders shaping the field.`,
    noscriptHtml: `
      <h1>Top ${aiContributors.length} AI Contributors — 2026 Edition</h1>
      <p>The definitive 2026 directory of ${aiContributors.length} AI pioneers. Each profile includes research timelines, key contributions, glossary, and curated reading lists.</p>
      <ol>
        ${contributorsSorted
          .map(
            (c) =>
              `<li>${link(`/ai-contributors/${c.id}`, c.name)} — ${escape(c.affiliation)} (${escape(c.segment)}). ${escape(c.bio.slice(0, 180))}</li>`
          )
          .join("\n        ")}
      </ol>
    `,
  });

  // ----- Per-contributor pages (one route each) -----
  for (const c of aiContributors) {
    routes.push({
      path: `/ai-contributors/${c.id}`,
      title: `${c.name} — AI Contributor Profile | Top ${aiContributors.length} AI 2026`,
      description: c.bio.slice(0, 160),
      noscriptHtml: `
        <h1>${escape(c.name)}</h1>
        <p><strong>Rank #${c.rank}</strong> · ${escape(c.affiliation)} · ${escape(c.segment)} · ${escape(c.country)}</p>
        <p>${escape(c.longBio || c.bio)}</p>
        ${c.keyInfluence ? `<p><strong>Key influence:</strong> ${escape(c.keyInfluence)}</p>` : ""}
        ${c.awards ? `<p><strong>Awards:</strong> ${escape(c.awards)}</p>` : ""}
        ${c.education ? `<p><strong>Education:</strong> ${escape(c.education)}</p>` : ""}
        ${
          c.milestones && c.milestones.length
            ? `<h2>Milestones</h2><ul>${c.milestones
                .map((m) => `<li><strong>${escape(m.year)}:</strong> ${escape(m.event)}</li>`)
                .join("")}</ul>`
            : ""
        }
        ${
          c.connections && c.connections.length
            ? `<p><strong>Connected to:</strong> ${c.connections
                .map((id) => link(`/ai-contributors/${id}`, id))
                .join(", ")}</p>`
            : ""
        }
        <p>${link("/ai-contributors", `Back to all ${aiContributors.length} contributors`)}</p>
      `,
    });
  }

  // ----- AI Updates (index + per article) -----
  routes.push({
    path: "/ai-updates",
    title: "AI Updates — Latest News & Announcements | Venkata Pagadala",
    description: "Latest AI industry news, product launches, research breakthroughs, and policy updates.",
    noscriptHtml: `
      <h1>AI Updates</h1>
      <p>Latest AI industry news, product launches, research breakthroughs, and policy updates.</p>
      <ul>
        ${aiUpdates
          .map(
            (u) =>
              `<li>${link(`/ai-updates/${u.slug}`, u.title)} — ${escape(u.company)} · ${escape(u.date)}. ${escape(u.summary.slice(0, 200))}</li>`
          )
          .join("\n        ")}
      </ul>
    `,
  });

  for (const u of aiUpdates) {
    routes.push({
      path: `/ai-updates/${u.slug}`,
      title: `${u.title} | AI Updates`,
      description: u.summary.slice(0, 160),
      noscriptHtml: `
        <h1>${escape(u.title)}</h1>
        <p><strong>${escape(u.company)}</strong> · ${escape(u.date)} · ${escape(u.category)}</p>
        <p>${escape(u.summary)}</p>
        <h2>Key Takeaways</h2>
        <ul>${u.takeaways.map((t) => `<li>${escape(t)}</li>`).join("")}</ul>
        <p>${link("/ai-updates", "Back to all AI Updates")}</p>
      `,
    });
  }

  // ----- Insight pillar pages -----
  for (const p of pillarPages) {
    routes.push({
      path: `/insights/${p.slug}`,
      title: p.metaTitle,
      description: p.metaDescription,
      noscriptHtml: `
        <h1>${escape(p.headline)}</h1>
        <p>${escape(p.description)}</p>
        ${p.sections
          .map(
            (s) => `<h2>${escape(s.heading)}</h2><p>${escape(s.body)}</p>`
          )
          .join("\n        ")}
        <p>${link("/insights", "Back to Insights")}</p>
      `,
    });
  }

  return routes;
}

// Plugin ----------------------------------------------------------------

export function prerenderNoscriptPlugin(): Plugin {
  let outDir = "dist";

  return {
    name: "vite-plugin-prerender-noscript",
    apply: "build",

    configResolved(config) {
      outDir = config.build.outDir || "dist";
    },

    async closeBundle() {
      const root = process.cwd();
      const distDir = path.resolve(root, outDir);
      const indexPath = path.join(distDir, "index.html");

      // Index.html may not exist if build failed earlier — bail gracefully.
      let template: string;
      try {
        template = await fs.readFile(indexPath, "utf-8");
      } catch {
        // eslint-disable-next-line no-console
        console.warn(`[prerender-noscript] no index.html at ${indexPath} — skipping`);
        return;
      }

      let routes: RouteSpec[];
      try {
        routes = await buildRouteSpecs();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(`[prerender-noscript] failed to load route data — skipping`, err);
        return;
      }

      let written = 0;

      for (const route of routes) {
        const html = injectRouteIntoTemplate(template, route);
        const cleanPath = route.path.replace(/^\//, "");
        const targetDir = path.join(distDir, cleanPath);
        const targetFile = path.join(targetDir, "index.html");

        await fs.mkdir(targetDir, { recursive: true });
        await fs.writeFile(targetFile, html, "utf-8");
        written++;
      }

      // eslint-disable-next-line no-console
      console.log(`[prerender-noscript] wrote ${written} route HTML files to ${outDir}/`);
    },
  };
}

function injectRouteIntoTemplate(template: string, route: RouteSpec): string {
  const canonical = `${SITE_URL}${route.path}`;

  // Replace <title>
  let html = template.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escape(route.title)}</title>`
  );

  // Replace <meta name="description">
  html = html.replace(
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escape(route.description)}">`
  );

  // Replace canonical
  html = html.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${canonical}" />`
  );

  // Replace og:url
  html = html.replace(
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${canonical}" />`
  );

  // Replace og:title + twitter:title
  html = html.replace(
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escape(route.title)}">`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${escape(route.title)}">`
  );

  // Replace og:description + twitter:description
  html = html.replace(
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${escape(route.description)}">`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${escape(route.description)}">`
  );

  // Replace the <noscript>...</noscript> block in <body>.
  // The home page already has a comprehensive <noscript> block; we replace it
  // with this route's payload (still keeping nav links inside).
  const noscriptPayload = `<noscript>${route.noscriptHtml}</noscript>`;
  if (/<noscript>[\s\S]*?<\/noscript>/i.test(html)) {
    html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, noscriptPayload);
  } else {
    // Fallback: insert before </body>
    html = html.replace(/<\/body>/i, `${noscriptPayload}\n</body>`);
  }

  return html;
}
