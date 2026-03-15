import { useEffect, useState, useCallback, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import PageSidebar from "@/components/PageSidebar";
import AuthorSidebar from "@/components/AuthorSidebar";
import StateOfAIEssay from "@/components/StateOfAIEssay";
import AIContributorsExplorer from "@/components/AIContributorsExplorer";
import AITimeline from "@/components/AITimeline";
import AIGlossary from "@/components/AIGlossary";
import CuratedReadingLists from "@/components/CuratedReadingLists";
import AILearningRoadmap from "@/components/AILearningRoadmap";
import AIEncyclopedia from "@/components/AIEncyclopedia";
import { aiContributors } from "@/data/aiContributors";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Users, Clock, Brain, FileText, Library } from "lucide-react";
import authorPhoto from "@/assets/venkata-pagadala.jpeg";

const pageTocSections = [
  { label: "Database", id: "explorer-section" },
  { label: "Overview", id: "essay-section" },
  { label: "Timeline", id: "timeline-section" },
  { label: "Glossary", id: "glossary-section" },
  { label: "Reading Lists", id: "reading-section" },
];

const STORAGE_KEY = "ai-contributors-explored";

type TopLevelTab = "contributors" | "roadmap" | "encyclopedia";

const topTabs = [
  { id: "contributors" as TopLevelTab, path: "/notebook/ai", label: "📚 Top 100 Contributors", shortLabel: "Contributors" },
  { id: "roadmap" as TopLevelTab, path: "/notebook/ai/roadmap", label: "🗺️ Learning Roadmap", shortLabel: "Roadmap" },
  { id: "encyclopedia" as TopLevelTab, path: "/notebook/ai/encyclopedia", label: "🧠 Concepts Encyclopedia", shortLabel: "Encyclopedia" },
];

const TAB_META: Record<TopLevelTab, { title: string; description: string }> = {
  contributors: {
    title: "Top 100 AI Contributors 2026 — Definitive Directory | Venkata Pagadala",
    description: "The authoritative directory of 100 AI pioneers shaping the field in 2026. Explore profiles, research timelines, glossary, and curated reading lists — curated by Venkata Pagadala.",
  },
  roadmap: {
    title: "AI Learning Roadmap 2026 — Zero to Hero in 18 Weeks | Venkata Pagadala",
    description: "A structured 23-topic AI curriculum with 90+ curated resources — videos, courses, books, repos, and pro tips. Your complete path from beginner to advanced, curated by Venkata Pagadala.",
  },
  encyclopedia: {
    title: "AI Concepts Encyclopedia 2026 — 110 Concepts Explained | Venkata Pagadala",
    description: "110 AI concepts across 10 categories with key terms, prerequisites, difficulty levels, and curated learn-more links. The definitive AI reference guide by Venkata Pagadala.",
  },
};

const contributorSections = [
  { id: "explorer", label: "Database", icon: Users },
  { id: "essay", label: "Overview", icon: FileText },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "glossary", label: "Glossary", icon: Brain },
  { id: "reading", label: "Reading Lists", icon: Library },
] as const;

function getTabFromPath(pathname: string): TopLevelTab {
  if (pathname === "/notebook/ai/roadmap") return "roadmap";
  if (pathname === "/notebook/ai/encyclopedia") return "encyclopedia";
  return "contributors";
}

const AuthorByline = () => (
  <div className="flex items-center gap-3 mt-4">
    <img
      src={authorPhoto}
      alt="Venkata Pagadala"
      className="w-8 h-8 rounded-full object-cover border border-border"
    />
    <div>
      <p className="font-mono text-[11px] text-foreground/80">
        Curated by <span className="font-semibold text-foreground">Venkata Pagadala</span>
      </p>
      <p className="font-mono text-[9px] text-muted-foreground/40">AI Systems Architect & Researcher</p>
    </div>
  </div>
);

const AIContributors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const topTab = getTabFromPath(location.pathname);

  const [exploredIds, setExploredIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [activeSection, setActiveSection] = useState<string>("explorer");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const meta = TAB_META[topTab];
    document.title = meta.title;
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute("content", meta.description);

    let jsonLd = document.querySelector('script[data-ai-notebook-ld]');
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.setAttribute("type", "application/ld+json");
      jsonLd.setAttribute("data-ai-notebook-ld", "true");
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: meta.title.split(" | ")[0],
      description: meta.description,
      author: {
        "@type": "Person",
        name: "Venkata Pagadala",
        url: "https://mono-mind-seo.lovable.app/about",
      },
      publisher: {
        "@type": "Person",
        name: "Venkata Pagadala",
      },
      datePublished: "2026-01-15",
      dateModified: "2026-03-15",
    });

    return () => {
      const el = document.querySelector('script[data-ai-notebook-ld]');
      if (el) el.remove();
    };
  }, [topTab]);

  const handleExplore = useCallback((id: string) => {
    setExploredIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const handleSelectFromOutside = useCallback((id: string) => {
    navigate(`/ai-contributors/${id}`);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <ScrollReveal>
          <Link
            to="/notebook"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-muted-foreground/40 hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft size={12} /> Back to Notebooks
          </Link>
        </ScrollReveal>

        {/* Hero */}
        <ScrollReveal>
          <div className="mb-8">
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/30 mb-3 uppercase">
              The AI Notebook · 2026 Edition
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              AI Notebook
            </h1>
            <p className="font-mono text-xs text-muted-foreground/60 max-w-xl leading-relaxed">
              Your complete AI learning companion — from zero to hero. A roadmap with 90+ resources, 110 concepts explained, and 100 contributors profiled.
            </p>
            <AuthorByline />
          </div>
        </ScrollReveal>

        {/* Top-level tabs */}
        <ScrollReveal delay={50}>
          <div className="flex flex-wrap gap-0 border-b border-border mb-8">
            {topTabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={`px-5 py-3 font-mono text-[11px] uppercase tracking-wider transition-all border-b-2 -mb-px ${
                  topTab === tab.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground/30 hover:text-muted-foreground/60"
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* === ROADMAP TAB === */}
        {topTab === "roadmap" && (
          <div className="flex gap-10">
            <div className="flex-1 min-w-0">
              <div className="mb-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-1">
                  🗺️ AI Learning Roadmap — Zero to Hero (2026)
                </h2>
                <p className="font-mono text-[11px] text-muted-foreground/40 max-w-2xl leading-relaxed">
                  A structured 18-week curriculum with curated videos, courses, books, repos, and pro tips for each topic. Click any topic to explore all resources.
                </p>
              </div>
              <AILearningRoadmap />
            </div>
            <AuthorSidebar />
          </div>
        )}

        {/* === ENCYCLOPEDIA TAB === */}
        {topTab === "encyclopedia" && (
          <div className="flex gap-10">
            <div className="flex-1 min-w-0">
              <div className="mb-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-1">
                  🧠 AI Concepts Encyclopedia — Zero to Hero (2026)
                </h2>
                <p className="font-mono text-[11px] text-muted-foreground/40 max-w-2xl leading-relaxed">
                  110 concepts across 10 categories with descriptions, key terms, prerequisites, and curated learn-more links. Filter by category and difficulty.
                </p>
              </div>
              <AIEncyclopedia />
            </div>
            <AuthorSidebar />
          </div>
        )}

        {/* === CONTRIBUTORS TAB === */}
        {topTab === "contributors" && (
          <>
            {/* Stats */}
            <ScrollReveal delay={50}>
              <div className="flex flex-wrap gap-6 mb-10 pb-8 border-b border-border">
                {[
                  { label: "Contributors", value: String(aiContributors.length) },
                  { label: "Concepts", value: "20" },
                  { label: "Resources", value: "25+" },
                  { label: "Explored", value: `${exploredIds.size}/${aiContributors.length}` },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-mono text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="font-mono text-[9px] text-muted-foreground/25 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Three-column layout: left sidebar | content | author sidebar */}
            <div className="lg:flex lg:gap-10">
              <PageSidebar sections={pageTocSections} shareTitle="Top 100 AI Contributors 2026 — The Definitive AI Notebook" />

              <div className="flex-1 min-w-0">
                <div ref={contentRef}>
                  <ScrollReveal delay={100}>
                    <div className="flex flex-wrap gap-0 border-b border-border mb-8">
                      {contributorSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`flex items-center gap-1.5 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest transition-all border-b-2 -mb-px ${
                            activeSection === section.id
                              ? "border-foreground text-foreground"
                              : "border-transparent text-muted-foreground/30 hover:text-muted-foreground/60"
                          }`}
                        >
                          <section.icon size={11} />
                          <span className="hidden sm:inline">{section.label}</span>
                        </button>
                      ))}
                    </div>
                  </ScrollReveal>

                  <div id="explorer-section" className="scroll-mt-28">
                    {activeSection === "explorer" && (
                      <AIContributorsExplorer onExplore={handleExplore} />
                    )}
                  </div>

                  <div id="essay-section" className="scroll-mt-28">
                    {activeSection === "essay" && (
                      <div>
                        <h2 className="font-display text-xl font-bold text-foreground mb-1">The State of AI, 2026</h2>
                        <p className="font-mono text-[10px] text-muted-foreground/25 uppercase tracking-widest mb-8">An introduction</p>
                        <StateOfAIEssay />
                      </div>
                    )}
                  </div>

                  <div id="timeline-section" className="scroll-mt-28">
                    {activeSection === "timeline" && (
                      <div>
                        <h2 className="font-display text-xl font-bold text-foreground mb-1">AI Timeline</h2>
                        <p className="font-mono text-[11px] text-muted-foreground/40 mb-8 max-w-2xl leading-relaxed">
                          Key milestones from 1986 to today.
                        </p>
                        <AITimeline onSelectContributor={handleSelectFromOutside} />
                      </div>
                    )}
                  </div>

                  <div id="glossary-section" className="scroll-mt-28">
                    {activeSection === "glossary" && (
                      <div>
                        <h2 className="font-display text-xl font-bold text-foreground mb-1">AI Concepts Glossary</h2>
                        <p className="font-mono text-[11px] text-muted-foreground/40 mb-8 max-w-2xl leading-relaxed">
                          20 essential AI concepts linked to the contributors who pioneered them.
                        </p>
                        <AIGlossary onSelectContributor={handleSelectFromOutside} />
                      </div>
                    )}
                  </div>

                  <div id="reading-section" className="scroll-mt-28">
                    {activeSection === "reading" && (
                      <div>
                        <h2 className="font-display text-xl font-bold text-foreground mb-1">Curated Reading Lists</h2>
                        <p className="font-mono text-[11px] text-muted-foreground/40 mb-8 max-w-2xl leading-relaxed">
                          The papers, podcasts, and talks that matter most.
                        </p>
                        <CuratedReadingLists />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <AuthorSidebar />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIContributors;
