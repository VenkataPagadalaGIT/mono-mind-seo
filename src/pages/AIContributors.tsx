import { useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import NeuralNetBackground from "@/components/NeuralNetBackground";
import AIContributorsExplorer from "@/components/AIContributorsExplorer";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Brain, Sparkles } from "lucide-react";

const AIContributors = () => {
  useEffect(() => {
    document.title = "Top 100 AI Contributors 2026 | Interactive Explorer | Venkata Pagadala";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Explore the top 100 people shaping artificial intelligence in 2026 — researchers, founders, policy advocates. Interactive graph and directory with profiles, influence mapping, and personal insights.";
    if (meta) meta.setAttribute("content", content);
  }, []);

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
            Interactive Explorer · 2026 Edition
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-glow mb-6">
            Top 100 AI Contributors
          </h1>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            An interactive exploration of the people shaping artificial intelligence — from researchers
            pushing the boundaries of foundation models to founders building the next generation of AI
            companies. Switch between graph and directory views, click to explore each profile.
          </p>
        </ScrollReveal>

        {/* Stats bar */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-lg">
            {[
              { icon: Users, label: "Contributors", value: "100" },
              { icon: Brain, label: "AI Segments", value: "8+" },
              { icon: Sparkles, label: "Expert Types", value: "5" },
            ].map((stat) => (
              <div key={stat.label} className="border border-border p-4 text-center border-glow-hover">
                <stat.icon size={16} className="mx-auto mb-2 text-muted-foreground/60" />
                <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
                <p className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Explorer */}
        <ScrollReveal delay={200}>
          <AIContributorsExplorer />
        </ScrollReveal>

        {/* Related content CTA */}
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
