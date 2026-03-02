import ScrollReveal from "@/components/ScrollReveal";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import NeuralNetBackground from "@/components/NeuralNetBackground";
import { useEffect } from "react";

const Research = () => {
  useEffect(() => {
    document.title = "Topic Explorer | AI & SEO Research Graph | Venkata Pagadala";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Explore an interactive topic graph across AI systems, SEO, machine learning, and enterprise automation — by Venkata Pagadala.";
    if (meta) meta.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6 relative overflow-hidden">
      {/* Animated neural net background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralNetBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">
            Topic Explorer
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-glow mb-6">
            Knowledge Graph
          </h1>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-12 max-w-2xl">
            An interactive map of topics across AI systems, enterprise SEO, and machine learning — hover to explore, click to drill down.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <KnowledgeGraph />
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Research;
