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
  validThru: string;
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
    validThru: "∞/26",
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
    validThru: "∞/26",
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
    validThru: "∞/26",
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
    validThru: "∞/26",
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
    validThru: "∞/26",
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
    validThru: "∞/26",
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
    validThru: "∞/26",
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
    validThru: "∞/26",
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
    validThru: "∞/26",
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
    validThru: "∞/26",
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
      initial={{ opacity: 0, y: 40, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 16, delay: index * 0.08 }}
    >
      <Link to={card.path} className="block">
        <motion.div
          className="relative cursor-pointer"
          onMouseEnter={() => setHoveredId(card.id)}
          onMouseLeave={() => setHoveredId(null)}
          whileHover={{ scale: 1.04, y: -8, rotateY: 3, rotateX: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{ perspective: "800px" }}
        >
          {/* Credit card body — 86:54 aspect ratio */}
          <div
            className="relative overflow-hidden rounded-xl transition-all duration-500"
            style={{
              aspectRatio: "86 / 54",
              background: isHovered
                ? "linear-gradient(145deg, hsl(var(--foreground) / 0.10), hsl(var(--foreground) / 0.04), hsl(var(--primary) / 0.06))"
                : "linear-gradient(145deg, hsl(var(--foreground) / 0.06), hsl(var(--foreground) / 0.02), hsl(var(--foreground) / 0.04))",
              border: `1px solid ${isHovered ? "hsl(var(--primary) / 0.25)" : "hsl(var(--foreground) / 0.08)"}`,
              backdropFilter: "blur(20px)",
              boxShadow: isHovered
                ? "0 20px 60px -15px hsl(var(--primary) / 0.12), 0 4px 20px -5px hsl(0 0% 0% / 0.4), inset 0 1px 0 hsl(var(--foreground) / 0.08)"
                : "0 4px 20px -5px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(var(--foreground) / 0.04)",
            }}
          >
            {/* Top highlight line */}
            <div
              className="absolute top-0 inset-x-0 h-[1px] transition-all duration-500"
              style={{
                background: isHovered
                  ? "linear-gradient(90deg, transparent 5%, hsl(var(--primary) / 0.4) 50%, transparent 95%)"
                  : "linear-gradient(90deg, transparent 10%, hsl(var(--foreground) / 0.06) 50%, transparent 90%)",
              }}
            />

            {/* Holographic stripe across top */}
            <div
              className="absolute top-0 right-0 w-[60%] h-[3px] transition-all duration-500"
              style={{
                background: isHovered
                  ? "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.15), transparent)"
                  : "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.03), transparent)",
              }}
            />

            <div className="relative p-3 h-full flex flex-col justify-between">
              {/* Row 1: Category + Network */}
              <div className="flex items-start justify-between">
                <p
                  className="font-mono tracking-[0.3em] uppercase transition-colors duration-300"
                  style={{
                    fontSize: 7,
                    color: isHovered ? "hsl(var(--primary) / 0.6)" : "hsl(var(--foreground) / 0.18)",
                  }}
                >
                  {card.category}
                </p>
                <p
                  className="font-mono font-bold tracking-[0.15em] transition-colors duration-300"
                  style={{
                    fontSize: 9,
                    color: isHovered ? "hsl(var(--primary) / 0.5)" : "hsl(var(--foreground) / 0.12)",
                  }}
                >
                  {card.network}
                </p>
              </div>

              {/* Row 2: EMV Chip + Schema type */}
              <div className="flex items-center gap-3 mt-2">
                {/* Chip */}
                <div
                  className="relative rounded-md transition-all duration-500 flex-shrink-0"
                  style={{
                    width: 32,
                    height: 24,
                    background: isHovered
                      ? "linear-gradient(135deg, hsl(45, 60%, 55%), hsl(40, 50%, 40%))"
                      : "linear-gradient(135deg, hsl(45, 20%, 30%), hsl(40, 15%, 22%))",
                    border: `1px solid ${isHovered ? "hsl(45, 40%, 45%)" : "hsl(45, 10%, 20%)"}`,
                  }}
                >
                  <div className="absolute inset-[3px] border border-current opacity-20 rounded-sm" 
                    style={{ color: isHovered ? "hsl(45, 60%, 60%)" : "hsl(45, 10%, 35%)" }}
                  />
                  <div className="absolute top-1/2 left-[3px] right-[3px] h-[1px]" 
                    style={{ background: isHovered ? "hsl(45, 40%, 50% / 0.3)" : "hsl(45, 10%, 30% / 0.2)" }}
                  />
                  <div className="absolute left-1/2 top-[3px] bottom-[3px] w-[1px]" 
                    style={{ background: isHovered ? "hsl(45, 40%, 50% / 0.3)" : "hsl(45, 10%, 30% / 0.2)" }}
                  />
                </div>

                {/* Schema type label */}
                <p
                  className="font-mono transition-colors duration-300"
                  style={{
                    fontSize: 8,
                    color: isHovered ? "hsl(var(--primary) / 0.55)" : "hsl(var(--foreground) / 0.15)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {card.schema}
                </p>
              </div>

              {/* Row 3: JSON-LD schemas as card number */}
              <p
                className="font-mono tracking-[0.2em] mt-2 transition-colors duration-300"
                style={{
                  fontSize: 10,
                  color: isHovered ? "hsl(var(--foreground) / 0.6)" : "hsl(var(--foreground) / 0.18)",
                }}
              >
                {card.cardNumber}
              </p>

              {/* Row 4: Card name + SEO stats */}
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <p
                    className="font-mono transition-colors duration-300 mb-0.5"
                    style={{
                      fontSize: 7,
                      color: isHovered ? "hsl(var(--foreground) / 0.35)" : "hsl(var(--foreground) / 0.12)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {card.keyword}
                  </p>
                  <p
                    className="font-mono font-semibold tracking-wide transition-colors duration-300"
                    style={{
                      fontSize: 12,
                      color: isHovered ? "hsl(var(--foreground) / 0.95)" : "hsl(var(--foreground) / 0.5)",
                    }}
                  >
                    {card.label}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="font-mono uppercase transition-colors duration-300"
                    style={{
                      fontSize: 5,
                      color: isHovered ? "hsl(var(--foreground) / 0.3)" : "hsl(var(--foreground) / 0.1)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    INDEXED PAGES
                  </p>
                  <p
                    className="font-mono transition-colors duration-300"
                    style={{
                      fontSize: 10,
                      color: isHovered ? "hsl(var(--foreground) / 0.5)" : "hsl(var(--foreground) / 0.18)",
                    }}
                  >
                    {card.pages}
                  </p>
                </div>
              </div>
            </div>

            {/* Animated scan line */}
            <motion.div
              className="absolute inset-x-0 h-[1px] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.08), transparent)",
              }}
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
            />

            {/* Corner icon watermark */}
            <div
              className="absolute bottom-4 right-5 transition-all duration-300"
              style={{
                fontSize: 28,
                color: isHovered ? "hsl(var(--primary) / 0.12)" : "hsl(var(--foreground) / 0.03)",
              }}
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
          <motion.p
            className="font-mono text-[9px] tracking-[0.5em] text-muted-foreground/25 uppercase mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            [ System Assembly ]
          </motion.p>
          <motion.h2
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            Knowledge Architecture
          </motion.h2>
          <motion.p
            className="font-mono text-[10px] text-muted-foreground/35 max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Ten interconnected knowledge modules. Hover to inspect. Click to navigate.
          </motion.p>

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

      {/* Credit Card Grid */}
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
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="font-mono text-[11px] text-muted-foreground/40 text-center max-w-md"
            >
              {navCards.find((n) => n.id === hoveredId)?.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground/15 uppercase">
          10 modules · Interconnected Knowledge System
        </p>
      </div>
    </div>
  );
};

export default SystemAssemblyNav;
