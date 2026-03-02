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
    title: "MCP + A2A: The Future of AI Agent Communication",
    desc: "Breaking down how Model Context Protocol and Agent-to-Agent pipelines are transforming enterprise AI workflows.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7433168439763972096/",
  },
  {
    title: "Building RAG Engines for Enterprise SEO",
    desc: "How we built a Retrieval-Augmented Generation engine that lets teams query organic performance data in natural language.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7432885401087848448/",
  },
  {
    title: "Claude Code Pipelines in Production",
    desc: "Real-world implementation of Claude Code for automating technical SEO audits and content optimization at scale.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7431551666157613057/",
  },
  {
    title: "AI Agents Reshaping Enterprise Search",
    desc: "How A2A and MCP protocols are transforming technical SEO at Fortune 500 scale — from crawl optimization to content intelligence.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7431104751594803200/",
  },
  {
    title: "Knowledge Graph: 1 Industry, 5 Million+ Queries",
    desc: "Structured 5.3M raw queries into a 5-level taxonomy (Categories → Subcategories → Intents → Topics → Keywords). 913 L1 categories, <1ms classification speed. Manual: 1,000 keywords = 2 hours. This system: 5.3M keywords = instant.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7421367234754756608/",
  },
  {
    title: "Topic Clustering with AI at Scale",
    desc: "Using NLP and machine learning to automate topic clustering across millions of pages for content strategy.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7386425381697888256/",
  },
  {
    title: "LLM-Optimized Content Strategy",
    desc: "Exploring how generative AI is reshaping content strategy and what it means for the future of organic search.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7321763491848019968/",
  },
  {
    title: "Technical SEO at Scale: Lessons from 50M+ Pages",
    desc: "Key learnings from managing crawl optimization, indexation, and site architecture across massive enterprise sites.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7314825890108964864/",
  },
  {
    title: "The Intersection of AI and Search",
    desc: "How machine learning is fundamentally changing how we approach search engine optimization and content discovery.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7298815756568281088/",
  },
  {
    title: "Programmatic SEO with Python & AI",
    desc: "Building automated SEO pipelines using Python, BigQuery, and AI to drive organic growth at enterprise scale.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7264875407047380992/",
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
              <a 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block border border-border p-6 border-glow-hover group hover:bg-secondary/20 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-glow transition-all">
                      {post.title}
                    </h4>
                    <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                      {post.desc}
                    </p>
                  </div>
                  <ExternalLink size={14} className="text-muted-foreground group-hover:text-foreground transition-all mt-1 flex-shrink-0" />
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publications;
