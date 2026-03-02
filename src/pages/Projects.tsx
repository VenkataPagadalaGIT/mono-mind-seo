import ScrollReveal from "@/components/ScrollReveal";

const projects = [
  {
    num: "01",
    title: "MCP Server Integrations",
    desc: "Built Model Context Protocol server integrations enabling AI agents to interact with enterprise search tools, crawl data, and analytics platforms in real-time.",
    tags: ["MCP", "AI Agents", "Python", "API Design"],
  },
  {
    num: "02",
    title: "A2A Agent Pipelines",
    desc: "Developed Agent-to-Agent communication pipelines allowing autonomous AI workflows for content optimization, technical audits, and competitive analysis.",
    tags: ["A2A Protocol", "Multi-Agent", "Orchestration"],
  },
  {
    num: "03",
    title: "Claude Code Pipelines",
    desc: "Implemented Claude Code-powered development pipelines for automated SEO tooling, data transformations, and report generation at enterprise scale.",
    tags: ["Claude", "Automation", "Code Generation"],
  },
  {
    num: "04",
    title: "RAG Search Engine",
    desc: "Built a Retrieval-Augmented Generation engine for internal knowledge bases, enabling natural language querying of SEO documentation and performance data.",
    tags: ["RAG", "Vector DB", "LLM", "Search"],
  },
  {
    num: "05",
    title: "Enterprise Topic Clustering",
    desc: "Python-based NLP system for automated topic clustering across 50M+ pages, generating content gap analysis and internal linking recommendations.",
    tags: ["NLP", "Python", "Clustering", "BigQuery"],
  },
  {
    num: "06",
    title: "Automated Crawl Intelligence",
    desc: "Real-time crawl monitoring and indexation system integrating Screaming Frog, Botify, and ContentKing data into unified dashboards.",
    tags: ["Crawl Ops", "Automation", "Data Pipelines"],
  },
  {
    num: "07",
    title: "Schema Markup at Scale",
    desc: "Programmatic schema markup generation and validation system deployed across millions of pages, improving rich result visibility by 35%.",
    tags: ["Schema.org", "JSON-LD", "Structured Data"],
  },
  {
    num: "08",
    title: "SEO Data Lake & Analytics",
    desc: "Built comprehensive SEO data lake in BigQuery with Looker Studio dashboards for real-time organic performance tracking and anomaly detection.",
    tags: ["BigQuery", "Looker", "Analytics", "SQL"],
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">
            {"{03}"} — Projects
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground text-glow mb-16">
            Technical Work
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.num} delay={i * 100}>
              <div className="border border-border p-6 sm:p-8 h-full flex flex-col border-glow-hover group transition-all hover:bg-secondary/20">
                <div className="font-mono text-xs text-muted-foreground/40 mb-4 tracking-widest">
                  {"{" + project.num + "}"}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-glow transition-all">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-6 flex-1">
                  {project.desc}
                </p>
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
      </div>
    </div>
  );
};

export default Projects;
