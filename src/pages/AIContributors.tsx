import { useEffect, useState, useCallback, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import NeuralNetBackground from "@/components/NeuralNetBackground";
import StateOfAIEssay from "@/components/StateOfAIEssay";
import NarrativeChapters from "@/components/NarrativeChapters";
import AIContributorsExplorer from "@/components/AIContributorsExplorer";
import AITimeline from "@/components/AITimeline";
import LearningPaths from "@/components/LearningPaths";
import AIGlossary from "@/components/AIGlossary";
import CuratedReadingLists from "@/components/CuratedReadingLists";
import ReadingProgress from "@/components/ReadingProgress";
import { aiContributors } from "@/data/aiContributors";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, BookOpen, Clock, Map, Brain, FileText, Library, Sparkles } from "lucide-react";

const STORAGE_KEY = "ai-contributors-explored";

const sections = [
  { id: "essay", label: "Overview", icon: FileText },
  { id: "chapters", label: "Chapters", icon: BookOpen },
  { id: "explorer", label: "Explorer", icon: Users },
  { id: "paths", label: "Paths", icon: Map },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "glossary", label: "Glossary", icon: Brain },
  { id: "reading", label: "Reading Lists", icon: Library },
] as const;

const AIContributors = () => {
  const [exploredIds, setExploredIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [activeSection, setActiveSection] = useState<string>("essay");
  const explorerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Top 100 AI Contributors 2026 | The Definitive AI Notebook | Venkata Pagadala";
    const meta = document.querySelector('meta[name="description"]');
    const content = "The definitive interactive notebook on the top 100 people shaping AI in 2026. Narrative chapters, curated learning paths, glossary, reading lists, timeline, and personal insights — the go-to book for AI learners.";
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
    handleExplore(id);
    setActiveSection("explorer");
    setTimeout(() => {
      explorerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [handleExplore]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6 relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralNetBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <ScrollReveal>
          <Link
            to="/publications"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={12} /> Back to Lab
          </Link>
        </ScrollReveal>

        {/* Hero */}
        <ScrollReveal>
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">
              The AI Notebook · 2026 Edition
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground text-glow mb-3">
              Top 100 AI
            </h1>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground/40 mb-6">
              Contributors
            </h1>
            <p className="font-mono text-xs text-muted-foreground/50 tracking-wider uppercase mb-8">
              The go-to book for understanding the people shaping artificial intelligence
            </p>

            {/* Table of contents */}
            <div className="border border-border p-6 mb-8 max-w-md">
              <p className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest mb-4">Table of Contents</p>
              <div className="space-y-2">
                {sections.map((section, i) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      explorerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="w-full flex items-center gap-3 py-1.5 group text-left"
                  >
                    <span className="font-mono text-[10px] text-muted-foreground/20 w-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <section.icon size={12} className="text-muted-foreground/20 group-hover:text-foreground/40 transition-colors" />
                    <span className="font-mono text-xs text-muted-foreground/50 group-hover:text-foreground transition-colors">
                      {section.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats + Progress */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
            {[
              { icon: Users, label: "Contributors", value: String(aiContributors.length) },
              { icon: BookOpen, label: "Chapters", value: "6" },
              { icon: Brain, label: "Concepts", value: "20" },
              { icon: Sparkles, label: "Resources", value: "25+" },
            ].map((stat) => (
              <div key={stat.label} className="border border-border p-3 text-center border-glow-hover">
                <stat.icon size={14} className="mx-auto mb-1.5 text-muted-foreground/40" />
                <p className="font-display text-lg font-bold text-foreground">{stat.value}</p>
                <p className="font-mono text-[8px] text-muted-foreground/30 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Reading Progress */}
        <ScrollReveal delay={150}>
          <div className="mb-12">
            <ReadingProgress exploredIds={exploredIds} />
          </div>
        </ScrollReveal>

        {/* Section Navigation */}
        <div ref={explorerRef}>
          <ScrollReveal delay={200}>
            <div className="flex flex-wrap gap-1 border border-border p-0.5 mb-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest transition-all ${
                    activeSection === section.id
                      ? "bg-foreground text-background"
                      : "text-muted-foreground/40 hover:text-foreground"
                  }`}
                >
                  <section.icon size={11} />
                  <span className="hidden sm:inline">{section.label}</span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Section Content */}
          <ScrollReveal>
            {activeSection === "essay" && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  The State of AI, 2026
                </h2>
                <p className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest mb-8">
                  An introduction
                </p>
                <StateOfAIEssay />
              </div>
            )}

            {activeSection === "chapters" && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Narrative Chapters
                </h2>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                  Six stories that weave the top contributors into the narrative arcs defining AI's evolution.
                  Click any chapter to read the full story and explore the people behind it.
                </p>
                <NarrativeChapters onSelectContributor={handleSelectFromOutside} />
              </div>
            )}

            {activeSection === "explorer" && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Interactive Explorer
                </h2>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                  Graph and directory views of all contributors. Click profiles to explore quotes,
                  key resources, relationship maps, and personal insights.
                </p>
                <AIContributorsExplorer onExplore={handleExplore} />
              </div>
            )}

            {activeSection === "paths" && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Learning Paths
                </h2>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                  Curated paths grouping contributors by topic and skill level.
                  Track your progress as you explore each profile.
                </p>
                <LearningPaths
                  onSelectContributor={handleSelectFromOutside}
                  exploredIds={exploredIds}
                />
              </div>
            )}

            {activeSection === "timeline" && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  AI Timeline
                </h2>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                  Key milestones from 1986 to today — the breakthroughs, launches, and moments that defined the field.
                </p>
                <AITimeline onSelectContributor={handleSelectFromOutside} />
              </div>
            )}

            {activeSection === "glossary" && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  AI Concepts Glossary
                </h2>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                  20 essential AI concepts — each linked to the contributors who pioneered them.
                  Click any name to jump to their full profile.
                </p>
                <AIGlossary onSelectContributor={handleSelectFromOutside} />
              </div>
            )}

            {activeSection === "reading" && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Curated Reading Lists
                </h2>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                  The papers, podcasts, and talks that matter most — organized by depth level with
                  context on why each one is essential.
                </p>
                <CuratedReadingLists />
              </div>
            )}
          </ScrollReveal>
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="border border-border p-8 text-center mt-20 border-glow-hover">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">
              Explore more in The Lab
            </h3>
            <p className="font-mono text-xs text-muted-foreground mb-6 max-w-md mx-auto">
              Published research, active AI systems, and interactive topic explorations.
            </p>
            <Link
              to="/publications"
              className="inline-flex items-center gap-2 border border-foreground px-6 py-3 font-mono text-xs text-foreground hover:bg-foreground hover:text-background transition-all tracking-widest uppercase"
            >
              Visit The Lab <ArrowLeft size={12} className="rotate-180" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default AIContributors;
