import { useEffect, useState, useCallback, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import NeuralNetBackground from "@/components/NeuralNetBackground";
import AIContributorsExplorer from "@/components/AIContributorsExplorer";
import AITimeline from "@/components/AITimeline";
import LearningPaths from "@/components/LearningPaths";
import ReadingProgress from "@/components/ReadingProgress";
import { aiContributors } from "@/data/aiContributors";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Brain, Sparkles, BookOpen, Clock, Map } from "lucide-react";

const STORAGE_KEY = "ai-contributors-explored";

const AIContributors = () => {
  const [exploredIds, setExploredIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [activeTab, setActiveTab] = useState<"explorer" | "paths" | "timeline">("explorer");
  const explorerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Top 100 AI Contributors 2026 | The Go-To Guide for AI Learners | Venkata Pagadala";
    const meta = document.querySelector('meta[name="description"]');
    const content = "The definitive interactive guide to the top 100 people shaping AI in 2026. Curated profiles, learning paths, milestone timelines, key resources, and personal insights — your go-to book for understanding AI's most influential minds.";
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
    setActiveTab("explorer");
    // Scroll to explorer
    setTimeout(() => {
      explorerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [handleExplore]);

  const tabs = [
    { id: "explorer" as const, label: "Explorer", icon: Users },
    { id: "paths" as const, label: "Learning Paths", icon: Map },
    { id: "timeline" as const, label: "Timeline", icon: Clock },
  ];

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
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">
            The Definitive Guide · 2026 Edition
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-glow mb-4">
            Top 100 AI Contributors
          </h1>
          <p className="font-mono text-xs text-muted-foreground/40 mb-6 tracking-wider uppercase">
            Your go-to book for understanding the people shaping artificial intelligence
          </p>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            An interactive, curated guide to the researchers, founders, and thinkers defining AI's future.
            Each profile includes personal insights, key resources, notable quotes, and relationship mapping.
            Track your progress as you explore — think of it as your AI learning companion.
          </p>
        </ScrollReveal>

        {/* Stats + Progress */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-4 mb-12">
            {[
              { icon: Users, label: "Contributors", value: String(aiContributors.length) },
              { icon: BookOpen, label: "Learning Paths", value: "6" },
              { icon: Sparkles, label: "AI Segments", value: "12" },
            ].map((stat) => (
              <div key={stat.label} className="border border-border p-4 text-center border-glow-hover">
                <stat.icon size={16} className="mx-auto mb-2 text-muted-foreground/60" />
                <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
                <p className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
            <div className="sm:w-56">
              <ReadingProgress exploredIds={exploredIds} />
            </div>
          </div>
        </ScrollReveal>

        {/* Tab Navigation */}
        <ScrollReveal delay={150}>
          <div className="flex gap-1 border border-border p-0.5 mb-8 w-fit" ref={explorerRef}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-all ${
                  activeTab === tab.id
                    ? "bg-foreground text-background"
                    : "text-muted-foreground/50 hover:text-foreground"
                }`}
              >
                <tab.icon size={12} />
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Tab Content */}
        <ScrollReveal delay={200}>
          {activeTab === "explorer" && (
            <AIContributorsExplorer onExplore={handleExplore} />
          )}

          {activeTab === "paths" && (
            <div>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                Curated learning paths grouping contributors by topic. Click any name to jump to their
                full profile. Your progress is tracked automatically as you explore.
              </p>
              <LearningPaths
                onSelectContributor={handleSelectFromOutside}
                exploredIds={exploredIds}
              />
            </div>
          )}

          {activeTab === "timeline" && (
            <div>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                Key milestones and breakthroughs by contributors on this list — from backpropagation to
                the open-source LLM revolution. Click any event to view the contributor's profile.
              </p>
              <AITimeline onSelectContributor={handleSelectFromOutside} />
            </div>
          )}
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="border border-border p-8 text-center mt-20 border-glow-hover">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">
              Explore more in The Lab
            </h3>
            <p className="font-mono text-xs text-muted-foreground mb-6 max-w-md mx-auto">
              Dive into published research, active AI systems, and interactive topic explorations.
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
