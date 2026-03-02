import ScrollReveal from "@/components/ScrollReveal";
import venkatPhoto from "@/assets/venkata-pagadala.jpeg";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "50M+", label: "Pages Managed" },
  { value: "25M+", label: "Pages Audited Bi-Weekly" },
  { value: "5.3M", label: "Keywords Classified" },
];

const skills = [
  "AI Product Strategy", "MCP Integrations", "A2A Pipelines", "Claude Code",
  "RAG Engines", "Knowledge Graphs", "Technical SEO", "Python", "SQL",
  "Crawl Optimization", "Schema Markup", "Topic Clustering",
  "Google Search Console", "Ahrefs", "Semrush", "Screaming Frog",
  "Botify", "ContentKing", "BigQuery", "Looker Studio", "PowerBI",
  "LLM Optimization", "NLP", "Generative AI", "Data Engineering",
  "GPT-4", "Adobe Analytics", "Google Analytics", "Akamai CDN",
  "Agile/Scrum", "Core Web Vitals", "JSON-LD", "International SEO",
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
              I build AI systems that automate SEO at a scale that manual execution can't match. Currently leading 
              AI & Automation at AT&T as Lead Technical Product Manager, shipping RAG pipelines, knowledge graphs, 
              and programmatic SEO infrastructure across 50M+ pages. Not strategy decks. Production systems.
            </p>
            <p className="font-mono text-sm leading-relaxed text-muted-foreground mb-6">
              AI integrations connecting LLMs to live SEO data for automated keyword research and content optimization. 
              A RAG-powered internal linking engine using vector embeddings and entity recognition. Automated pipelines 
              that run technical SEO audits at scale. A market share content tool with geo-segmentation that generates 
              3-year roadmaps.
            </p>
            <p className="font-mono text-sm leading-relaxed text-muted-foreground mb-6">
              10 years in Technical SEO — the fundamentals that power how Google ranks content today. Site migrations, 
              crawl budget optimization, structured data at enterprise scale, Core Web Vitals, international SEO. 
              Tools: Botify (50M+ crawls), Screaming Frog, Ahrefs, SEMrush, BigQuery, Python.
            </p>
            <p className="font-mono text-sm leading-relaxed text-muted-foreground">
              Previously scaled SEO for CoStar Group (Apartments.com, ApartmentFinders.com, ForRent.com) and built 
              technical SEO infrastructure across multiple verticals. Published researcher — "Google, SEO and Helpful Content: 
              How AI Can Be Helpful for E-Commerce Websites" in the Journal of Digital & Social Media Marketing, December 2024.
            </p>
          </ScrollReveal>

          <ScrollReveal className="md:col-span-2" delay={200}>
            <div className="aspect-[3/4] border border-border overflow-hidden">
              <img 
                src={venkatPhoto} 
                alt="Venkata Pagadala" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
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
                Disruptive Strategies — Business Administration & Management
              </div>
              <div className="font-mono text-xs text-muted-foreground mt-1">
                Harvard University — 2019
              </div>
            </div>
            <div className="border border-border p-6 border-glow-hover">
              <div className="font-display text-lg font-semibold text-foreground">
                Cybersecurity: Technology, Application and Policy
              </div>
              <div className="font-mono text-xs text-muted-foreground mt-1">
                Massachusetts Institute of Technology (MIT) — 2016
              </div>
            </div>
            <div className="border border-border p-6 border-glow-hover">
              <div className="font-display text-lg font-semibold text-foreground">
                Master's Degree in Computer Science
              </div>
              <div className="font-mono text-xs text-muted-foreground mt-1">
                New England College — 2015–2016
              </div>
            </div>
            <div className="border border-border p-6 border-glow-hover">
              <div className="font-display text-lg font-semibold text-foreground">
                MBA — Human Resources Development (Marketing Management)
              </div>
              <div className="font-mono text-xs text-muted-foreground mt-1">
                National Institute of Business Management (NIBM) — 2015–2016
              </div>
            </div>
            <div className="border border-border p-6 border-glow-hover">
              <div className="font-display text-lg font-semibold text-foreground">
                Bachelor's Degree in Computer Science
              </div>
              <div className="font-mono text-xs text-muted-foreground mt-1">
                KL University — 2011–2015
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default About;
