import { useEffect, useState, useCallback, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import PageSidebar from "@/components/PageSidebar";
import StateOfAIEssay from "@/components/StateOfAIEssay";
import AIContributorsExplorer from "@/components/AIContributorsExplorer";
import AITimeline from "@/components/AITimeline";
import AIGlossary from "@/components/AIGlossary";
import CuratedReadingLists from "@/components/CuratedReadingLists";
import AILearningRoadmap from "@/components/AILearningRoadmap";
import AIEncyclopedia from "@/components/AIEncyclopedia";
import { aiContributors } from "@/data/aiContributors";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Clock, Brain, FileText, Library } from "lucide-react";

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
  { id: "contributors" as const, label: "📚 Top 100 Contributors", shortLabel: "Contributors" },
  { id: "roadmap" as const, label: "🗺️ Learning Roadmap", shortLabel: "Roadmap" },
  { id: "encyclopedia" as const, label: "🧠 Concepts Encyclopedia", shortLabel: "Encyclopedia" },
];

const contributorSections = [
  { id: "explorer", label: "Database", icon: Users },
  { id: "essay", label: "Overview", icon: FileText },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "glossary", label: "Glossary", icon: Brain },
  { id: "reading", label: "Reading Lists", icon: Library },
] as const;

const AIContributors = () => {
  const navigate = useNavigate();
  const [topTab, setTopTab] = useState<TopLevelTab>("contributors");
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
    document.title = "AI Notebook 2026 — Learning Roadmap, Encyclopedia & Top 100 Contributors | Venkata Pagadala";
    const meta = document.querySelector('meta[name="description"]');
    const content = "The definitive AI notebook for 2026: 23-topic learning roadmap, 110-concept encyclopedia, and top 100 AI contributors with narrative chapters, glossary, and curated reading lists.";
    if (meta) meta.setAttribute("content", content);
  }, []);

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
      <div className="max-w-5xl mx-auto relative z-10">
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
            <p className="font-mono text-xs text-muted-foreground/40 max-w-xl leading-relaxed">
              Your complete AI learning companion — from zero to hero. A roadmap with 90+ resources, 110 concepts explained, and 100 contributors profiled.
            </p>
          </div>
        </ScrollReveal>

        {/* Top-level tabs */}
        <ScrollReveal delay={50}>
          <div className="flex flex-wrap gap-0 border-b border-border mb-8">
            {topTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTopTab(tab.id)}
                className={`px-5 py-3 font-mono text-[11px] uppercase tracking-wider transition-all border-b-2 -mb-px ${
                  topTab === tab.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground/30 hover:text-muted-foreground/60"
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* === ROADMAP TAB === */}
        {topTab === "roadmap" && (
          <ScrollReveal>
            <div className="mb-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-1">
                🗺️ AI Learning Roadmap — Zero to Hero (2026)
              </h2>
              <p className="font-mono text-[11px] text-muted-foreground/40 max-w-2xl leading-relaxed">
                A structured 18-week curriculum with curated videos, courses, books, repos, and pro tips for each topic. Click any topic to explore all resources.
              </p>
            </div>
            <AILearningRoadmap />
          </ScrollReveal>
        )}

        {/* === ENCYCLOPEDIA TAB === */}
        {topTab === "encyclopedia" && (
          <div>
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
        )}

        {/* === CONTRIBUTORS TAB === */}
        {topTab === "contributors" && (
          <>
            {/* Stats */}
            <ScrollReveal delay={50}>
              <div className="flex flex-wrap gap-6 mb-10 pb-8 border-b border-border">
                {[
                  { label: "Contributors", value: String(aiContributors.length) },
                  { label: "Chapters", value: "6" },
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

            {/* Two-column layout */}
            <div className="lg:flex lg:gap-10">
              <PageSidebar sections={pageTocSections} shareTitle="Top 100 AI Contributors 2026 — The Definitive AI Notebook" />

              <div className="flex-1 min-w-0">
                {/* Section Tabs */}
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

                  {/* Section Content */}
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

                  <div id="chapters-section" className="scroll-mt-28">
                    {activeSection === "chapters" && (
                      <div>
                        <h2 className="font-display text-xl font-bold text-foreground mb-1">Narrative Chapters</h2>
                        <p className="font-mono text-[11px] text-muted-foreground/40 mb-8 max-w-2xl leading-relaxed">
                          Six stories that weave the top contributors into the narrative arcs defining AI's evolution.
                        </p>
                        <NarrativeChapters onSelectContributor={handleSelectFromOutside} />
                      </div>
                    )}
                  </div>

                  <div id="paths-section" className="scroll-mt-28">
                    {activeSection === "paths" && (
                      <div>
                        <h2 className="font-display text-xl font-bold text-foreground mb-1">Learning Paths</h2>
                        <p className="font-mono text-[11px] text-muted-foreground/40 mb-8 max-w-2xl leading-relaxed">
                          Curated paths grouping contributors by topic and skill level.
                        </p>
                        <LearningPaths onSelectContributor={handleSelectFromOutside} exploredIds={exploredIds} />
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIContributors;
