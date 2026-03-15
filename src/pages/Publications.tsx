import { useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import NeuralNetBackground from "@/components/NeuralNetBackground";
import { ExternalLink, ArrowRight, FlaskConical, Brain, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const publications = [
  {
    type: "journal",
    title: "AI-Assisted SEO: Leveraging Machine Learning for Search Engine Optimization",
    source: "International Journal of Scientific Research in Computer Science, Engineering and Information Technology",
    year: "2023",
    link: "#",
  },
  {
    type: "journal",
    title: "Google, SEO and Helpful Content: How AI Can Be Helpful for E-Commerce Websites",
    source: "Journal of Digital & Social Media Marketing",
    year: "2024",
    link: "#",
  },
];

const labProjects = [
  {
    title: "Omniscite",
    status: "Active",
    desc: "100+ neural agent orchestration pipeline — multi-agent system that autonomously coordinates technical audits, content optimization, and competitive analysis.",
    tags: ["AI Agents", "Neural Nets", "A2A Protocol", "MCP", "LLM Orchestration"],
  },
  {
    title: "Knowledge Graph Engine",
    status: "Production",
    desc: "5.3M keyword taxonomy across a 5-level hierarchy with <1ms classification speed. Powers topical authority analysis and semantic SEO.",
    tags: ["Knowledge Graphs", "Entity Resolution", "NLP", "Graph Embeddings"],
  },
  {
    title: "RAG Search Engine",
    status: "Active",
    desc: "Retrieval-Augmented Generation engine for enterprise knowledge bases — natural language querying across millions of documents.",
    tags: ["RAG", "Vector DB", "LLM", "Embeddings"],
  },
];

const researchInterests = [
  {
    icon: Brain,
    title: "AI Systems & Agent Architecture",
    desc: "Multi-agent orchestration, MCP servers, A2A pipelines, and autonomous AI workflows at enterprise scale.",
  },
  {
    icon: TrendingUp,
    title: "Business Intelligence & Market Systems",
    desc: "200 years of business evolution patterns, market disruption cycles, and how AI transforms competitive landscapes.",
  },
  {
    icon: FlaskConical,
    title: "Applied AI for Search & Discovery",
    desc: "RAG engines, knowledge graphs, answer engine optimization, and the future of information retrieval.",
  },
];

const Lab = () => {
  useEffect(() => {
    document.title = "Lab | AI Research & Systems | Venkata Pagadala";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Original AI research, production systems, and published papers. Exploring agent architectures, knowledge graphs, and business intelligence at enterprise scale.";
    if (meta) meta.setAttribute("content", content);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6 relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralNetBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">
            Research & Development
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-glow mb-6">
            The Lab
          </h1>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-16 max-w-2xl">
            Original research, production AI systems, and published work — building at the intersection of artificial intelligence, business strategy, and search.
          </p>
        </ScrollReveal>

        {/* Research Interests */}
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/40 uppercase mb-6">
            Research Interests
          </p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-3 gap-4 mb-20">
          {researchInterests.map((interest, i) => (
            <ScrollReveal key={interest.title} delay={i * 100}>
              <div className="border border-border p-6 border-glow-hover h-full">
                <interest.icon size={20} className="text-foreground/60 mb-4" />
                <h3 className="font-display text-base font-bold text-foreground mb-2">{interest.title}</h3>
                <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">{interest.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Published Research */}
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/40 uppercase mb-2">
            Published Research
          </p>
          <div className="border border-foreground/30 inline-block px-4 py-2 mb-8 border-glow">
            <span className="font-mono text-[10px] text-foreground tracking-widest uppercase">
              ★ Top Organic Search Voice — LinkedIn
            </span>
          </div>
        </ScrollReveal>

        <div className="space-y-6 mb-20">
          {publications.map((pub, i) => (
            <ScrollReveal key={pub.title} delay={i * 100}>
              <div className="border border-border p-8 border-glow-hover">
                <p className="font-mono text-[10px] text-muted-foreground/40 tracking-widest uppercase mb-4">
                  Peer-Reviewed Paper
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">
                  {pub.title}
                </h3>
                <p className="font-mono text-xs text-muted-foreground mb-4 leading-relaxed">
                  {pub.source}
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted-foreground/40">{pub.year}</span>
                  <a href={pub.link} className="inline-flex items-center gap-1 font-mono text-xs text-foreground hover:text-glow transition-all">
                    Read Paper <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Active Lab Projects */}
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/40 uppercase mb-6">
            Active Systems
          </p>
        </ScrollReveal>

        <div className="space-y-6 mb-16">
          {labProjects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 100}>
              <div className="border border-border p-8 border-glow-hover">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-display text-xl font-bold text-foreground">{project.title}</h3>
                  <span className="font-mono text-[10px] border border-border px-2 py-0.5 text-muted-foreground/50 uppercase tracking-widest">
                    {project.status}
                  </span>
                </div>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] border border-border px-2 py-1 text-muted-foreground/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="border border-foreground/30 p-8 text-center border-glow">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Interested in collaborating?</h3>
            <p className="font-mono text-xs text-muted-foreground mb-6 max-w-md mx-auto">
              Open to research partnerships, investment conversations, and building AI systems together.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-foreground px-6 py-3 font-mono text-xs text-foreground hover:bg-foreground hover:text-background transition-all tracking-widest uppercase"
            >
              Let's Talk <ArrowRight size={12} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Lab;
