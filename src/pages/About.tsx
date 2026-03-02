import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "50M+", label: "Pages Managed" },
  { value: "40M+", label: "Monthly Organic Visits" },
  { value: "500+", label: "AI Pipelines Built" },
];

const skills = [
  "AI Product Strategy", "MCP Integrations", "A2A Pipelines", "Claude Code",
  "RAG Engines", "Knowledge Graphs", "Technical SEO", "Python", "SQL",
  "Crawl Optimization", "Schema Markup", "Topic Clustering",
  "Google Search Console", "Ahrefs", "Semrush", "Screaming Frog",
  "Botify", "ContentKing", "BigQuery", "Looker Studio",
  "LLM Optimization", "NLP", "Generative AI", "Data Engineering",
];

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">
            {"{01}"} — About
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground text-glow mb-12">
            About Me
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-12 mb-20">
          <ScrollReveal className="md:col-span-3">
            <p className="font-mono text-sm leading-relaxed text-muted-foreground mb-6">
              Strategic AI Product Owner and Technical SEO leader with over a decade of experience driving organic growth 
              for Fortune 500 companies. I specialize in building AI-powered search infrastructure, scaling technical SEO 
              across millions of pages, and integrating cutting-edge AI tooling into enterprise workflows.
            </p>
            <p className="font-mono text-sm leading-relaxed text-muted-foreground mb-6">
              Currently at AT&T, I lead AI product initiatives including MCP server integrations, A2A pipeline development, 
              and Claude Code implementation — while managing technical SEO strategy across 50M+ indexed pages generating 
              40M+ monthly organic visits.
            </p>
            <p className="font-mono text-sm leading-relaxed text-muted-foreground">
              Previously scaled organic search for CoStar Group (Apartments.com), American Addiction Centers, and other 
              major brands. Published researcher in AI-assisted SEO methodologies with work featured in the 
              International Journal of Scientific Research in Computer Science.
            </p>
          </ScrollReveal>

          <ScrollReveal className="md:col-span-2" delay={200}>
            <div className="aspect-[3/4] border border-border bg-secondary/30 flex items-center justify-center">
              <span className="font-mono text-xs text-muted-foreground tracking-widest">[PHOTO]</span>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div className="border border-border p-6 text-center border-glow-hover">
                <div className="font-display text-3xl sm:text-4xl font-bold text-foreground text-glow mb-2">
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-muted-foreground tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Skills */}
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6 uppercase">
            Core Competencies
          </p>
        </ScrollReveal>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill} delay={i * 30}>
              <span className="font-mono text-xs border border-border px-4 py-2 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all cursor-default border-glow-hover">
                {skill}
              </span>
            </ScrollReveal>
          ))}
        </div>

        {/* Education */}
        <ScrollReveal className="mt-20">
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6 uppercase">
            Education & Certifications
          </p>
          <div className="space-y-4">
            <div className="border border-border p-6 border-glow-hover">
              <div className="font-display text-lg font-semibold text-foreground">
                Master of Science in Information Technology
              </div>
              <div className="font-mono text-xs text-muted-foreground mt-1">
                University of the Cumberlands — Williamsburg, KY
              </div>
            </div>
            <div className="border border-border p-6 border-glow-hover">
              <div className="font-display text-lg font-semibold text-foreground">
                Bachelor of Technology in Computer Science
              </div>
              <div className="font-mono text-xs text-muted-foreground mt-1">
                JNTU — Hyderabad, India
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default About;
