import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    title: "Editorial",
    pillarSlug: "editorial-seo-content-strategy",
    items: [
      "Topical Authority",
      "Persona Mapping & Strategy",
      "User Intent Research",
      "Market Gap Analysis",
      "High-Intent Topics",
      "High-Impact Content Briefs",
      "Premium Copywriting",
    ],
  },
  {
    title: "Technical",
    pillarSlug: "enterprise-technical-seo",
    items: [
      "Visibility Audits",
      "Internal Linking",
      "Architecture & Crawlability",
      "International SEO",
      "Site Migrations & Revamps",
    ],
  },
  {
    title: "Programmatic",
    pillarSlug: "ai-ml-search-optimization",
    items: [
      "Scalable Page Templates",
      "High-Volume Page Generation",
      "Indexation Logic",
      "Unique & Quality Content",
      "Title Tag Optimization",
    ],
  },
  {
    title: "AEO",
    pillarSlug: "answer-engine-optimization",
    items: [
      "AI Visibility Tracking",
      "AI Search Prioritization",
      "AI-Focused Content Strategy",
      "AI Citation Insights",
      "AI-Targeted Outreach Strategy",
    ],
  },
  {
    title: "Performance",
    pillarSlug: "seo-performance-analytics",
    items: [
      "Growth Forecasting",
      "Custom Reporting Dashboard",
      "KPI Tracking & Reporting",
      "Cohort Analysis",
      "CRO Audits & Optimization",
    ],
  },
];

interface ServicesGridProps {
  compact?: boolean;
}

const ServicesGrid = ({ compact = false }: ServicesGridProps) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 ${compact ? "" : "gap-6"}`}>
      {services.map((service, i) => (
        <ScrollReveal key={service.title} delay={i * 80}>
          <Link
            to={`/insights/${service.pillarSlug}`}
            className="group block border border-border p-5 sm:p-6 border-glow-hover hover:bg-secondary/20 transition-all h-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-foreground group-hover:text-glow transition-all">
                {service.title}
              </h3>
              <ArrowRight size={14} className="text-muted-foreground/30 group-hover:text-foreground transition-all flex-shrink-0" />
            </div>
            <div className="border-t border-border/50 pt-3">
              <ul className="space-y-2">
                {service.items.slice(0, compact ? 3 : undefined).map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[11px] text-muted-foreground leading-relaxed py-1.5 px-2 -mx-2 border border-transparent hover:border-border/50 transition-all"
                  >
                    {item}
                  </li>
                ))}
                {compact && service.items.length > 3 && (
                  <li className="font-mono text-[10px] text-muted-foreground/40 pt-1">
                    +{service.items.length - 3} more
                  </li>
                )}
              </ul>
            </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  );
};

export default ServicesGrid;
