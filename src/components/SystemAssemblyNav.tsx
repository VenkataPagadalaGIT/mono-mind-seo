import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

interface NavCard {
  id: string;
  label: string;
  category: string;
  icon: string;
  path: string;
  description: string;
  cardNumber: string;
  network: string;
  schema: string;
  pages: string;
  keyword: string;
}

const navCards: NavCard[] = [
  {
    id: "notebook",
    label: "AI Notebook",
    category: "CORE MODULE",
    icon: "◎",
    path: "/notebook/ai",
    description: "Complete AI knowledge hub — research, frameworks, and deep dives.",
    cardNumber: "ART · COURSE · FAQ · BREAD",
    network: "MONO",
    schema: "Article + Course",
    pages: "50+",
    keyword: "Best AI Notebook 2026",
  },
  {
    id: "contributors",
    label: "Top 100 Contributors",
    category: "DIRECTORY",
    icon: "◇",
    path: "/ai-contributors",
    description: "2026 Edition · The definitive index of AI researchers and leaders.",
    cardNumber: "PROF · NEWS · BREAD · LIST",
    network: "MIND",
    schema: "ProfilePage",
    pages: "100",
    keyword: "Best 100 AI Contributors 2026",
  },
  {
    id: "roadmap",
    label: "Free AI Roadmap",
    category: "LEARNING",
    icon: "△",
    path: "/notebook/ai/roadmap",
    description: "18-week zero-to-hero AI curriculum. Foundations to applied engineering.",
    cardNumber: "COURSE · BREAD · HOW · FAQ",
    network: "MONO",
    schema: "Course (Free)",
    pages: "18 wks",
    keyword: "Free AI Roadmap March 2026",
  },
  {
    id: "encyclopedia",
    label: "AI Encyclopedia",
    category: "REFERENCE",
    icon: "▽",
    path: "/notebook/ai/encyclopedia",
    description: "110 core AI concepts — attention mechanisms to zero-shot learning.",
    cardNumber: "FAQ · DEFN · BREAD · ART",
    network: "MIND",
    schema: "FAQPage",
    pages: "110",
    keyword: "AI Encyclopedia Concepts",
  },
  {
    id: "solutions",
    label: "Solutions & SEO",
    category: "ENGINE",
    icon: "⬡",
    path: "/solutions",
    description: "Enterprise search optimization and AI-powered visibility strategies.",
    cardNumber: "SERV · OFFER · BREAD · ORG",
    network: "MONO",
    schema: "Service + Offer",
    pages: "8",
    keyword: "AI SEO Solutions",
  },
  {
    id: "experience",
    label: "Experience",
    category: "DRIVE",
    icon: "◈",
    path: "/experience",
    description: "10+ years scaling organic search for Fortune 500 brands and startups.",
    cardNumber: "PERSON · ORG · BREAD · EXP",
    network: "MIND",
    schema: "Person + Org",
    pages: "1",
    keyword: "AI SEO Consultant",
  },
  {
    id: "insights",
    label: "Insights & Blog",
    category: "SENSOR",
    icon: "◆",
    path: "/insights",
    description: "Essays, case studies, and thought leadership on AI and search.",
    cardNumber: "NEWS · ART · BREAD · BLOG",
    network: "MONO",
    schema: "NewsArticle",
    pages: "25+",
    keyword: "AI SEO Insights Blog",
  },
  {
    id: "research",
    label: "Research",
    category: "NAV",
    icon: "✦",
    path: "/research",
    description: "Published papers and ongoing research in AI systems and NLP.",
    cardNumber: "SCHOL · ART · CITE · BREAD",
    network: "MIND",
    schema: "ScholarlyArticle",
    pages: "12",
    keyword: "AI NLP Research Papers",
  },
  {
    id: "projects",
    label: "Projects",
    category: "WEAPON",
    icon: "✧",
    path: "/projects",
    description: "Production AI systems, tools, and open-source contributions.",
    cardNumber: "SOFT · CODE · BREAD · REPO",
    network: "MONO",
    schema: "SoftwareApp",
    pages: "10",
    keyword: "AI Open Source Projects",
  },
  {
    id: "contact",
    label: "Contact",
    category: "SHIELD",
    icon: "○",
    path: "/contact",
    description: "Get in touch for collaborations, speaking, or consulting.",
    cardNumber: "CONTACT · ORG · LOCAL · BREAD",
    network: "MIND",
    schema: "ContactPage",
    pages: "1",
    keyword: "Contact AI Consultant",
  },
];

const CreditCard = ({
  card,
  index,
  hoveredId,
  setHoveredId,
}: {
  card: NavCard;
  index: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) => {
  const isHovered = hoveredId === card.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 60, damping: 18, delay: index * 0.06 }}
    >
      <Link to={card.path} className="block">
        <motion.div
          className="relative cursor-pointer"
          onMouseEnter={() => setHoveredId(card.id)}
          onMouseLeave={() => setHoveredId(null)}
          whileHover={{ scale: 1.03, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Card body — sharp corners, monochrome */}
          <div
            className="relative overflow-hidden transition-all duration-300"
            style={{
              aspectRatio: "86 / 54",
              background: isHovered
                ? "hsl(var(--card))"
                : "hsl(0 0% 5%)",
              border: `1px solid ${isHovered ? "hsl(var(--foreground) / 0.2)" : "hsl(var(--border) / 0.5)"}`,
              boxShadow: isHovered
                ? "0 8px 30px -10px hsl(0 0% 0% / 0.6), inset 0 1px 0 hsl(var(--foreground) / 0.06)"
                : "inset 0 1px 0 hsl(var(--foreground) / 0.03)",
            }}
          >
            {/* Top edge line */}
            <div
              className="absolute top-0 inset-x-0 h-[1px] transition-all duration-300"
              style={{
                background: isHovered
                  ? "linear-gradient(90deg, transparent 5%, hsl(var(--foreground) / 0.25) 50%, transparent 95%)"
                  : "linear-gradient(90deg, transparent 15%, hsl(var(--foreground) / 0.05) 50%, transparent 85%)",
              }}
            />

            <div className="relative p-3 h-full flex flex-col justify-between">
              {/* Row 1: Category + Network */}
              <div className="flex items-start justify-between">
                <span className="font-mono tracking-[0.3em] uppercase text-muted-foreground/40 transition-colors duration-300"
                  style={{ fontSize: 7, color: isHovered ? "hsl(var(--muted-foreground))" : undefined }}
                >
                  {card.category}
                </span>
                <span className="font-mono font-bold tracking-[0.15em] text-muted-foreground/20 transition-colors duration-300"
                  style={{ fontSize: 8, color: isHovered ? "hsl(var(--muted-foreground) / 0.6)" : undefined }}
                >
                  {card.network}
                </span>
              </div>

              {/* Row 2: Chip + Schema */}
              <div className="flex items-center gap-2 mt-1.5">
                {/* Monochrome chip */}
                <div
                  className="relative flex-shrink-0 transition-all duration-300"
                  style={{
                    width: 26,
                    height: 18,
                    background: isHovered
                      ? "linear-gradient(135deg, hsl(0 0% 35%), hsl(0 0% 22%))"
                      : "linear-gradient(135deg, hsl(0 0% 18%), hsl(0 0% 12%))",
                    border: `1px solid hsl(0 0% ${isHovered ? 30 : 16}%)`,
                  }}
                >
                  <div className="absolute inset-[2px] border border-foreground/10" />
                  <div className="absolute top-1/2 left-[2px] right-[2px] h-[1px] bg-foreground/10" />
                  <div className="absolute left-1/2 top-[2px] bottom-[2px] w-[1px] bg-foreground/10" />
                </div>

                <span className="font-mono text-muted-foreground/30 transition-colors duration-300"
                  style={{ fontSize: 7, letterSpacing: "0.08em", color: isHovered ? "hsl(var(--muted-foreground) / 0.7)" : undefined }}
                >
                  {card.schema}
                </span>
              </div>

              {/* Row 3: Schema codes */}
              <p className="font-mono tracking-[0.2em] text-foreground/15 mt-1 transition-colors duration-300"
                style={{ fontSize: 8, color: isHovered ? "hsl(var(--foreground) / 0.5)" : undefined }}
              >
                {card.cardNumber}
              </p>

              {/* Row 4: Name + Pages */}
              <div className="flex items-end justify-between mt-auto">
                <div className="min-w-0">
                  <p className="font-mono text-foreground/10 truncate transition-colors duration-300 mb-px"
                    style={{ fontSize: 6, letterSpacing: "0.04em", color: isHovered ? "hsl(var(--muted-foreground) / 0.5)" : undefined }}
                  >
                    {card.keyword}
                  </p>
                  <p className="font-mono font-semibold tracking-wide text-foreground/45 transition-colors duration-300"
                    style={{ fontSize: 10, color: isHovered ? "hsl(var(--foreground) / 0.95)" : undefined }}
                  >
                    {card.label}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="font-mono uppercase text-foreground/8 transition-colors duration-300"
                    style={{ fontSize: 5, letterSpacing: "0.12em", color: isHovered ? "hsl(var(--foreground) / 0.25)" : undefined }}
                  >
                    PAGES
                  </p>
                  <p className="font-mono text-foreground/15 transition-colors duration-300"
                    style={{ fontSize: 9, color: isHovered ? "hsl(var(--foreground) / 0.5)" : undefined }}
                  >
                    {card.pages}
                  </p>
                </div>
              </div>
            </div>

            {/* Watermark icon */}
            <div
              className="absolute bottom-3 right-3 text-foreground/[0.02] transition-all duration-300 pointer-events-none"
              style={{ fontSize: 22, color: isHovered ? "hsl(var(--foreground) / 0.06)" : undefined }}
            >
              {card.icon}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const SystemAssemblyNav = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-16 pb-12">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center mb-8">
          <p className="font-mono text-[9px] tracking-[0.5em] text-muted-foreground/25 uppercase mb-3">
            [ System Assembly ]
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 tracking-tight">
            Knowledge Architecture
          </h2>
          <p className="font-mono text-[10px] text-muted-foreground/35 max-w-lg mx-auto leading-relaxed">
            Ten interconnected knowledge modules. Hover to inspect. Click to navigate.
          </p>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-8 mt-5">
            {[
              { label: "Modules", value: "10" },
              { label: "Concepts", value: "110" },
              { label: "Contributors", value: "100" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-mono text-base font-semibold text-foreground/70">{stat.value}</p>
                <p className="font-mono text-[8px] tracking-[0.3em] text-muted-foreground/20 uppercase mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Credit Card Grid — 5 columns on xl */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {navCards.map((card, i) => (
          <CreditCard
            key={card.id}
            card={card}
            index={i}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        ))}
      </div>

      {/* Hovered description */}
      <div className="h-10 flex items-center justify-center mt-4">
        <AnimatePresence mode="wait">
          {hoveredId && (
            <motion.p
              key={hoveredId}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="font-mono text-[10px] text-muted-foreground/40 text-center max-w-md"
            >
              {navCards.find((n) => n.id === hoveredId)?.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-2 text-center">
        <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground/15 uppercase">
          10 modules · Interconnected Knowledge System
        </p>
      </div>
    </div>
  );
};

export default SystemAssemblyNav;
