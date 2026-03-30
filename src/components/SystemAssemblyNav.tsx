import { Link } from "react-router-dom";
import { useState } from "react";
import { BookOpen, Users, GraduationCap, Lightbulb, Search, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const navNodes = [
  {
    id: "notebook",
    label: "AI Notebook",
    category: "CORE",
    icon: BookOpen,
    path: "/notebook/ai",
    description: "The complete AI knowledge hub — curated research, frameworks, and deep dives into modern AI systems.",
    tech: ["Research", "Frameworks", "Deep Dives"],
  },
  {
    id: "contributors",
    label: "Top 100 Contributors",
    category: "DIRECTORY",
    icon: Users,
    path: "/ai-contributors",
    description: "2026 Edition · The definitive index of researchers, engineers, and leaders shaping the AI landscape.",
    tech: ["2026 Edition", "100 Profiles", "Ranked"],
  },
  {
    id: "roadmap",
    label: "Free AI Roadmap",
    category: "LEARNING",
    icon: GraduationCap,
    path: "/notebook/ai/roadmap",
    description: "An 18-week zero-to-hero curriculum covering foundations, architecttic, and applied AI engineering.",
    tech: ["18 Weeks", "Zero to Hero", "Free"],
  },
  {
    id: "encyclopedia",
    label: "AI Encyclopedia",
    category: "REFERENCE",
    icon: Lightbulb,
    path: "/notebook/ai/encyclopedia",
    description: "110 core AI concepts explained with precision — from attention mechanisms to zero-shot learning.",
    tech: ["110 Concepts", "Searchable", "Cross-linked"],
  },
  {
    id: "seo",
    label: "Best SEO",
    category: "SEARCH",
    icon: Search,
    path: "/solutions",
    description: "Enterprise search optimization and AI-powered visibility strategies for maximum organic growth.",
    tech: ["Enterprise", "AI-Powered", "Growth"],
  },
];

const SystemAssemblyNav = () => {
  const [expandedId, setExpandedId] = useState<string | null>("contributors");

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-24 pb-20">
      {/* Section header */}
      <ScrollReveal>
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-border/20" />
            <p className="font-mono text-[9px] tracking-[0.5em] text-muted-foreground/25 uppercase">
              System Assembly
            </p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
            Knowledge Architecture
          </h2>
          <p className="font-mono text-xs text-muted-foreground/40 max-w-lg leading-relaxed">
            Navigate the interconnected modules — AI research, learning paths,
            and search intelligence. Each node links to a self-contained knowledge system.
          </p>

          {/* Stats bar */}
          <div className="flex items-center gap-8 mt-8 pt-6 border-t border-border/10">
            {[
              { label: "Modules", value: String(navNodes.length).padStart(2, "0") },
              { label: "Concepts", value: "110" },
              { label: "Contributors", value: "100" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-lg font-semibold text-foreground/80">{stat.value}</p>
                <p className="font-mono text-[8px] tracking-[0.3em] text-muted-foreground/25 uppercase mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Node list */}
      <div className="space-y-16">
        {navNodes.map((node, index) => {
          const Icon = node.icon;
          const isExpanded = expandedId === node.id;

          return (
            <ScrollReveal key={node.id}>
              <div className="relative">
                {/* Connector line */}
                {index > 0 && (
                  <div className="absolute left-6 -top-10 w-[1px] h-10 bg-gradient-to-b from-transparent via-border/20 to-border/10" />
                )}

                {/* Node header */}
                <div className="flex items-start gap-4 mb-6">
                  {/* Index marker */}
                  <div className="flex-shrink-0 w-12 h-12 border border-border/20 flex items-center justify-center font-mono text-[10px] text-muted-foreground/40">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1.5">
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground tracking-tight">
                        {node.label}
                      </h3>
                      <span className="font-mono text-[8px] tracking-[0.3em] text-muted-foreground/25 uppercase border border-border/15 px-2 py-0.5">
                        {node.category}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-muted-foreground/40 leading-relaxed max-w-xl">
                      {node.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {node.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[8px] tracking-wider text-muted-foreground/20 uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Toggle */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : node.id)}
                    className="flex-shrink-0 font-mono text-[9px] tracking-[0.2em] text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors uppercase border border-border/10 px-3 py-1.5 hover:border-border/25"
                  >
                    {isExpanded ? "Collapse" : "Expand"}
                  </button>
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Link to={node.path} className="block group">
                    <div className="relative border border-border/10 rounded-sm overflow-hidden">
                      {/* Top bar */}
                      <div className="flex items-center justify-between px-4 py-2 border-b border-border/10 bg-background/50">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
                          <span className="font-mono text-[8px] tracking-[0.3em] text-muted-foreground/20 uppercase">
                            {node.id}
                          </span>
                        </div>
                        <span className="font-mono text-[8px] text-muted-foreground/15 uppercase">
                          Navigate →
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-8 flex items-center gap-6 group-hover:bg-card/30 transition-colors duration-300">
                        <div className="flex-shrink-0 w-16 h-16 border border-border/15 flex items-center justify-center group-hover:border-foreground/20 transition-colors duration-300">
                          <Icon
                            size={24}
                            className="text-muted-foreground/30 group-hover:text-foreground/60 transition-colors duration-300"
                            strokeWidth={1.5}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-[8px] tracking-[0.4em] text-muted-foreground/25 uppercase mb-2">
                            {node.category}
                          </p>
                          <h4 className="font-display text-xl sm:text-2xl font-bold text-foreground/80 group-hover:text-foreground tracking-tight transition-colors duration-300 mb-1">
                            {node.label}
                          </h4>
                          <p className="font-mono text-[10px] text-muted-foreground/35 leading-relaxed max-w-md">
                            {node.description}
                          </p>
                        </div>

                        <ArrowRight
                          size={16}
                          className="flex-shrink-0 text-muted-foreground/15 group-hover:text-foreground/40 group-hover:translate-x-1 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-border/10 text-center">
        <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground/15 uppercase">
          {navNodes.length} modules · Interconnected Knowledge System
        </p>
      </div>
    </div>
  );
};

export default SystemAssemblyNav;
