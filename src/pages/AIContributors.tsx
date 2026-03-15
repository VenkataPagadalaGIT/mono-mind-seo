import { useEffect, useState, useCallback, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import PageSidebar from "@/components/PageSidebar";
import StateOfAIEssay from "@/components/StateOfAIEssay";
import NarrativeChapters from "@/components/NarrativeChapters";
import AIContributorsExplorer from "@/components/AIContributorsExplorer";
import AITimeline from "@/components/AITimeline";
import LearningPaths from "@/components/LearningPaths";
import AIGlossary from "@/components/AIGlossary";
import CuratedReadingLists from "@/components/CuratedReadingLists";
import ReadingProgress from "@/components/ReadingProgress";
import { aiContributors } from "@/data/aiContributors";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, BookOpen, Clock, Map, Brain, FileText, Library, Sparkles } from "lucide-react";

const pageTocSections = [
  { label: "Database", id: "explorer-section" },
  { label: "Overview", id: "essay-section" },
  { label: "Chapters", id: "chapters-section" },
  { label: "Paths", id: "paths-section" },
  { label: "Timeline", id: "timeline-section" },
  { label: "Glossary", id: "glossary-section" },
  { label: "Reading Lists", id: "reading-section" },
];

const STORAGE_KEY = "ai-contributors-explored";

const sections = [
  { id: "explorer", label: "Database", icon: Users },
  { id: "essay", label: "Overview", icon: FileText },
  { id: "chapters", label: "Chapters", icon: BookOpen },
  { id: "paths", label: "Paths", icon: Map },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "glossary", label: "Glossary", icon: Brain },
  { id: "reading", label: "Reading Lists", icon: Library },
] as const;

const AIContributors = () => {
  const navigate = useNavigate();
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
    document.title = "Top 100 AI Contributors 2026 | The Definitive AI Notebook | Venkata Pagadala";
    const meta = document.querySelector('meta[name="description"]');
    const content = "The definitive interactive notebook on the top 100 people shaping AI in 2026. Narrative chapters, curated learning paths, glossary, reading lists, timeline, and personal insights.";
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
              to="/publications"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-muted-foreground/40 hover:text-foreground transition-colors mb-10"
            >
              <ArrowLeft size={12} /> Back to Lab
            </Link>
          </ScrollReveal>

          {/* Hero */}
          <ScrollReveal>
            <div className="mb-12">
              <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/30 mb-3 uppercase">
                The AI Notebook · 2026 Edition
              </p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                Top 100 AI Contributors
              </h1>
              <p className="font-mono text-xs text-muted-foreground/40 max-w-xl leading-relaxed">
                The definitive reference for understanding the people shaping artificial intelligence.
                Browse the database, read narrative chapters, or explore by topic.
              </p>
              <p className="font-mono text-[10px] text-muted-foreground/30 mt-3 italic">
                Note: This list is not a ranking and is not sorted by any metric. Contributors are listed in no particular order.
              </p>
            </div>
          </ScrollReveal>

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
                    {sections.map((section) => (
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
        </div>
      </div>
  );
};

export default AIContributors;
