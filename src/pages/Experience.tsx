import ScrollReveal from "@/components/ScrollReveal";

const experiences = [
  {
    company: "AT&T",
    role: "AI Product Owner / Technical SEO Lead",
    period: "2022 — Present",
    location: "Dallas, TX (Remote)",
    achievements: [
      "Lead AI product initiatives: MCP server integrations, A2A agent pipelines, Claude Code pipelines, and RAG engine development",
      "Manage technical SEO for 50M+ indexed pages generating 40M+ monthly organic visits",
      "Built enterprise topic clustering and internal linking automation with Python & NLP",
      "Developed automated crawl monitoring and indexation systems using Screaming Frog, Botify, and ContentKing",
      "Created SEO data pipelines in BigQuery and Looker Studio for real-time performance tracking",
      "Implemented schema markup strategies improving rich result appearances by 35%",
    ],
  },
  {
    company: "CoStar Group (Apartments.com)",
    role: "Senior SEO Manager",
    period: "2019 — 2022",
    location: "Atlanta, GA",
    achievements: [
      "Scaled organic traffic from 8M to 25M+ monthly visits across apartment listing pages",
      "Led technical migration of 10M+ URLs preserving 95% of organic traffic",
      "Built automated content optimization pipelines using Python and Google NLP API",
      "Managed cross-functional teams of engineers, content strategists, and data analysts",
      "Developed programmatic SEO strategies for dynamic listing pages at massive scale",
    ],
  },
  {
    company: "American Addiction Centers",
    role: "SEO Manager",
    period: "2017 — 2019",
    location: "Nashville, TN",
    achievements: [
      "Grew organic traffic 180% YoY through technical SEO and content strategy overhaul",
      "Implemented HIPAA-compliant tracking and attribution frameworks",
      "Built automated reporting dashboards reducing manual reporting time by 70%",
      "Led site architecture redesign improving crawl efficiency and indexation rates",
    ],
  },
  {
    company: "Previous Roles",
    role: "SEO Analyst / Digital Marketing",
    period: "2014 — 2017",
    location: "Various",
    achievements: [
      "Progressive SEO roles building foundational expertise in technical optimization",
      "Managed SEO for e-commerce, healthcare, and SaaS verticals",
      "Developed early automation scripts for rank tracking and competitor analysis",
    ],
  },
];

const Experience = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">
            {"{02}"} — Experience
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground text-glow mb-16">
            Career Timeline
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.company} delay={i * 150}>
                <div className="relative pl-8 md:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-8 top-2 w-2 h-2 -translate-x-[3px] bg-foreground animate-pulse-glow" />

                  <div className="border border-border p-6 sm:p-8 border-glow-hover">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                          {exp.company}
                        </h3>
                        <p className="font-mono text-sm text-muted-foreground mt-1">
                          {exp.role}
                        </p>
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
      </div>
    </div>
  );
};

export default Experience;
