import ScrollReveal from "@/components/ScrollReveal";

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
      "Mentored new hires and hosted weekly SEO seminars for all employees",
      "Collaborated with cross-functional teams including DevOps, Content, Development, and Project Management",
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
      "Sprint-based work with Epic-level requirements, user stories, and acceptance criteria",
      "Data layer management using Context Hub Tool — schema modifications and event-based rules",
      "Worked with mobile development teams (iOS and APK) for tag creation and management",
    ],
  },
  {
    company: "Sprout for Business",
    role: "SEO Manager",
    period: "April 2016 — December 2017",
    location: "Concord, New Hampshire",
    achievements: [
      "Created strategy from scratch and designed website architecture from an SEO perspective",
      "Ran web audits using SEMrush, WooRank, Screaming Frog — ON page, OFF page, and Technical audits",
      "Tracked traffic and engagement using Google Analytics, GTM, Google Webmaster Tools, and Hotjar for heat maps and behavior analysis",
      "Full-stack SEO: On-page, Off-page, Local, Technical SEO across 40+ accounts",
      "A/B testing and landing page optimization to improve conversion and engagement rates",
      "Email marketing campaigns using Mailchimp and Canva; PPC on Google AdWords, Facebook, Amazon, Instagram, LinkedIn",
    ],
  },
  {
    company: "Visakhapatnam Steel Plant",
    role: "Software Developer",
    period: "October 2014 — June 2015",
    location: "Visakhapatnam, India",
    achievements: [
      "Developed Complaint Management System to enhance quality — implemented for widespread use in plant",
      "Designed front-end using HTML5, JavaScript, CSS3; connected to MySQL via Apache/XAMPP",
      "Worked on vizagsteel.com — image optimization, URL redirects, crawl error fixes, site architecture improvements",
      "Developed SEO strategies based on keyword research, competitive analysis, domain authority, and current rankings",
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
