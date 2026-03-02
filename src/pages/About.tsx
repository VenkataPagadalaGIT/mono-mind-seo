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

const experiences = [
  {
    company: "AT&T",
    role: "Lead Technical Product Manager — Automation, AI & SEO",
    period: "March 2025 — Present",
    location: "Atlanta, Georgia",
    achievements: [
      "AI Product Owner for technical SEO infrastructure across 50M+ pages — own product roadmap for AI-powered search optimization systems",
      "Built AI-powered metadata automation system with knowledge graphs, topical analysis, and content guardrails (legal, brand voice), scaling to 100K+ pages with multi-model LLM testing",
      "Shipped RAG-based internal linking recommendation engine using vector embeddings, cosine similarity, and entity recognition",
      "Created topic clustering system using vector embeddings to map content relationships for programmatic SEO recommendations",
      "Led AI-powered internal search chatbot development using RAG architecture for Answer Engine Optimization (AEO)",
      "Integrated AI agents with Screaming Frog for automated technical SEO auditing",
      "Architected unified JSON-LD structured data system across fragmented engineering teams with dynamic schema generation from CMS/catalog feeds",
      "Established enterprise crawl infrastructure (Botify 50M+ crawls) with SEO observability, Akamai CDN caching, and Core Web Vitals optimization",
      "Built market share content optimization tool with nationwide and geo-focused analysis (state, city, zip code) with L1-L6 hierarchical classification",
      "Launched programmatic pages at scale for local stores, brand pages, and commercial offers",
    ],
  },
  {
    company: "CoStar Group",
    role: "SEO Product Manager",
    period: "October 2022 — March 2025",
    location: "Atlanta Metropolitan Area",
    achievements: [
      "Conducted bi-weekly technical audits of over 25 million pages using Botify and Screaming Frog — crawl budget optimization, caching strategies, and Core Web Vitals",
      "Content strategy collaboration across Apartments.com, ApartmentFinders.com, ForRent.com, and CorporateHousing.com",
      "Partnered with Data Scientists to develop custom PowerBI and SQL reports for market share analysis and forecasting",
      "Collaborated with DevOps and Developers in sprint-based Agile environments to launch new features and SEO improvements",
      "Leveraged GPT-3.5 and GPT-4 models for large-scale content summarization and AI-driven programmatic SEO",
      "Developed in-house SEO indexation tool using Python and Google API indexing for automatic page discovery",
    ],
  },
  {
    company: "Senior SEO Software Developer",
    role: "Technical SEO & Development",
    period: "April 2019 — October 2022",
    location: "Greater San Diego Area",
    achievements: [
      "Conducted technical site audits — schema errors, XML errors, redirects, content duplication, indexability, crawl accessibility, and JSON-LD schema markup",
      "Implemented mobile-first design, indexing, optimization, and page speed techniques using Google PageSpeed, GTMetrix, Lighthouse, and Chrome DevTools",
      "Optimized images and layouts with alt tags, srcset attributes, and cloud hosting on AWS",
      "Created custom SEO strategies aligned with business requirements, pitching to C-suite, VP of Operations, and Directors",
    ],
  },
  {
    company: "DYAD Ventures",
    role: "SEO & Analytics Administrator",
    period: "January 2018 — February 2019",
    location: "Dallas/Fort Worth Area",
    achievements: [
      "Worked on Adobe Analytics workspace — eVar, Props, traffic analysis, custom dashboards, and data visualization",
      "Implemented Adobe Dynamic Tag Management for engagement and conversion tracking",
      "A/B testing with Adobe Target integrated with Adobe Analytics workspace",
      "Data layer management using Context Hub Tool — schema modifications and event-based rules",
    ],
  },
  {
    company: "Sprout for Business",
    role: "SEO Manager",
    period: "April 2016 — December 2017",
    location: "Concord, New Hampshire",
    achievements: [
      "Created strategy from scratch and designed website architecture from an SEO perspective",
      "Full-stack SEO: On-page, Off-page, Local, Technical SEO across 40+ accounts",
      "A/B testing and landing page optimization to improve conversion and engagement rates",
    ],
  },
  {
    company: "Visakhapatnam Steel Plant",
    role: "Software Developer",
    period: "October 2014 — June 2015",
    location: "Visakhapatnam, India",
    achievements: [
      "Developed Complaint Management System — implemented for widespread use in plant",
      "Worked on vizagsteel.com — image optimization, URL redirects, crawl error fixes, site architecture improvements",
    ],
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* ── About Section ── */}
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
        <div className="flex flex-wrap gap-3 mb-20">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill} delay={i * 30}>
              <span className="font-mono text-xs border border-border px-4 py-2 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all cursor-default border-glow-hover">
                {skill}
              </span>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Experience Section ── */}
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">
            {"{02}"} — Experience
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground text-glow mb-16">
            Career Timeline
          </h2>
        </ScrollReveal>

        <div className="relative mb-20">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.company} delay={i * 150}>
                <div className="relative pl-8 md:pl-20">
                  <div className="absolute left-0 md:left-8 top-2 w-2 h-2 -translate-x-[3px] bg-foreground animate-pulse-glow" />
                  <div className="border border-border p-6 sm:p-8 border-glow-hover">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                          {exp.company}
                        </h3>
                        <p className="font-mono text-sm text-muted-foreground mt-1">{exp.role}</p>
                      </div>
                      <div className="font-mono text-xs text-muted-foreground/60 mt-2 sm:mt-0 tracking-wider">
                        {exp.period}
                      </div>
                    </div>
                    <p className="font-mono text-[10px] text-muted-foreground/40 mb-4 tracking-wider uppercase">
                      {exp.location}
                    </p>
                    <ul className="space-y-2">
                      {exp.achievements.map((a, j) => (
                        <li key={j} className="font-mono text-xs text-muted-foreground leading-relaxed flex gap-3">
                          <span className="text-foreground/30 mt-0.5 shrink-0">▸</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Education */}
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6 uppercase">
            Education & Certifications
          </p>
          <div className="space-y-4">
            {[
              { title: "Disruptive Strategies — Business Administration & Management", sub: "Harvard University — 2019" },
              { title: "Cybersecurity: Technology, Application and Policy", sub: "Massachusetts Institute of Technology (MIT) — 2016" },
              { title: "Master's Degree in Computer Science", sub: "New England College — 2015–2016" },
              { title: "MBA — Human Resources Development (Marketing Management)", sub: "National Institute of Business Management (NIBM) — 2015–2016" },
              { title: "Bachelor's Degree in Computer Science", sub: "KL University — 2011–2015" },
            ].map((edu) => (
              <div key={edu.title} className="border border-border p-6 border-glow-hover">
                <div className="font-display text-lg font-semibold text-foreground">{edu.title}</div>
                <div className="font-mono text-xs text-muted-foreground mt-1">{edu.sub}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default About;
