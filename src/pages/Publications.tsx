import ScrollReveal from "@/components/ScrollReveal";
import { ExternalLink } from "lucide-react";

const publications = [
  {
    type: "journal",
    title: "AI-Assisted SEO: Leveraging Machine Learning for Search Engine Optimization",
    source: "International Journal of Scientific Research in Computer Science, Engineering and Information Technology",
    year: "2023",
    link: "#",
  },
];

const linkedinPosts = [
  {
    title: "Knowledge Graphs for Enterprise SEO",
    desc: "How we built a knowledge graph connecting 50M+ pages to improve topical authority and internal linking at scale.",
  },
  {
    title: "RAG Demo: Querying SEO Data with Natural Language",
    desc: "Live demo of our RAG engine allowing teams to ask natural language questions about organic performance.",
  },
  {
    title: "AI Agents in Enterprise Search",
    desc: "How A2A and MCP protocols are transforming how we approach technical SEO at Fortune 500 scale.",
  },
  {
    title: "The Future of LLM-Optimized Content",
    desc: "Exploring how generative AI is reshaping content strategy and what it means for organic search.",
  },
];

const Publications = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">
            {"{04}"} — Publications
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground text-glow mb-16">
            Thought Leadership
          </h2>
        </ScrollReveal>

        {/* Badge */}
        <ScrollReveal>
          <div className="border border-foreground/30 inline-block px-6 py-3 mb-12 border-glow">
            <span className="font-mono text-xs text-foreground tracking-widest uppercase">
              ★ Top Organic Search Voice — LinkedIn
            </span>
          </div>
        </ScrollReveal>

        {/* Featured publication */}
        <ScrollReveal delay={100}>
          <div className="border border-border p-8 mb-12 border-glow-hover">
            <p className="font-mono text-[10px] text-muted-foreground/40 tracking-widest uppercase mb-4">
              Featured Publication
            </p>
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">
              {publications[0].title}
            </h3>
            <p className="font-mono text-xs text-muted-foreground mb-4 leading-relaxed">
              {publications[0].source}
            </p>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-muted-foreground/40">{publications[0].year}</span>
              <a href={publications[0].link} className="inline-flex items-center gap-1 font-mono text-xs text-foreground hover:text-glow transition-all">
                Read Paper <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* LinkedIn thought leadership */}
        <ScrollReveal delay={200}>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6 uppercase">
            LinkedIn Insights
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {linkedinPosts.map((post, i) => (
            <ScrollReveal key={post.title} delay={250 + i * 80}>
              <div className="border border-border p-6 border-glow-hover group hover:bg-secondary/20 transition-all">
                <h4 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-glow transition-all">
                  {post.title}
                </h4>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                  {post.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publications;
