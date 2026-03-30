import { Link } from "react-router-dom";
import { useState } from "react";
import { BookOpen, Users, GraduationCap, Brain, Search, ArrowRight, Briefcase, FileText, FlaskConical, FolderOpen, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

interface NavCard {
  id: string;
  label: string;
  category: string;
  icon: React.ReactNode;
  path: string;
  description: string;
  tags: string[];
}

const navCards: NavCard[] = [
  {
    id: "notebook",
    label: "AI Notebook",
    category: "CORE",
    icon: <BookOpen size={20} />,
    path: "/notebook/ai",
    description: "Complete AI knowledge hub — research, frameworks, and deep dives.",
    tags: ["Research", "Frameworks", "Deep Dives"],
  },
  {
    id: "contributors",
    label: "Top 100 Contributors",
    category: "DIRECTORY",
    icon: <Users size={20} />,
    path: "/ai-contributors",
    description: "2026 Edition · The definitive index of AI researchers and leaders.",
    tags: ["100 Profiles", "2026 Edition"],
  },
  {
    id: "roadmap",
    label: "Free AI Roadmap",
    category: "LEARNING",
    icon: <GraduationCap size={20} />,
    path: "/notebook/ai/roadmap",
    description: "18-week zero-to-hero AI curriculum. Foundations to applied engineering.",
    tags: ["18 Weeks", "Zero to Hero"],
  },
  {
    id: "encyclopedia",
    label: "AI Encyclopedia",
    category: "REFERENCE",
    icon: <Brain size={20} />,
    path: "/notebook/ai/encyclopedia",
    description: "110 core AI concepts — attention mechanisms to zero-shot learning.",
    tags: ["110 Concepts", "A–Z"],
  },
  {
    id: "solutions",
    label: "Solutions & SEO",
    category: "SERVICES",
    icon: <Search size={20} />,
    path: "/solutions",
    description: "Enterprise search optimization and AI-powered visibility strategies.",
    tags: ["SEO", "AI Strategy"],
  },
  {
    id: "experience",
    label: "Experience",
    category: "CAREER",
    icon: <Briefcase size={20} />,
    path: "/experience",
    description: "10+ years scaling organic search for Fortune 500 brands and startups.",
    tags: ["Fortune 500", "10+ Years"],
  },
  {
    id: "insights",
    label: "Insights & Blog",
    category: "CONTENT",
    icon: <FileText size={20} />,
    path: "/insights",
    description: "Essays, case studies, and thought leadership on AI and search.",
    tags: ["Essays", "Case Studies"],
  },
  {
    id: "research",
    label: "Research",
    category: "ACADEMIC",
    icon: <FlaskConical size={20} />,
    path: "/research",
    description: "Published papers and ongoing research in AI systems and NLP.",
    tags: ["Papers", "NLP"],
  },
  {
    id: "projects",
    label: "Projects",
    category: "PORTFOLIO",
    icon: <FolderOpen size={20} />,
    path: "/projects",
    description: "Production AI systems, tools, and open-source contributions.",
    tags: ["AI Tools", "Open Source"],
  },
  {
    id: "contact",
    label: "Contact",
    category: "CONNECT",
    icon: <Mail size={20} />,
    path: "/contact",
    description: "Get in touch for collaborations, speaking, or consulting.",
    tags: ["Consulting", "Speaking"],
  },
];

const SystemAssemblyNav = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-24 pb-20">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center mb-16">
          <motion.p
            className="font-mono text-[9px] tracking-[0.5em] text-muted-foreground/25 uppercase mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            [ System Assembly ]
          </motion.p>
          <motion.h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 tracking-tight"
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
            Ten interconnected modules. Click any card to explore.
          </motion.p>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-10 mt-8">
            {[
              { label: "Modules", value: "10" },
              { label: "Concepts", value: "110" },
              { label: "Contributors", value: "100" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-mono text-lg font-semibold text-foreground/70">{stat.value}</p>
                <p className="font-mono text-[8px] tracking-[0.3em] text-muted-foreground/20 uppercase mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {navCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 + 0.3, type: "spring", stiffness: 80, damping: 20 }}
          >
            <Link
              to={card.path}
              className="block group"
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-full rounded-xl border border-border/20 bg-background/60 backdrop-blur-sm overflow-hidden transition-all duration-400 hover:border-primary/40 hover:bg-primary/[0.04] hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.15)]">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border/30 to-transparent group-hover:via-primary/40 transition-all duration-500" />

                <div className="p-5 flex flex-col h-full min-h-[160px]">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-muted-foreground/40 group-hover:text-primary transition-colors duration-300">
                        {card.icon}
                      </div>
                      <span className="font-mono text-[8px] tracking-[0.25em] text-muted-foreground/25 uppercase group-hover:text-primary/50 transition-colors duration-300">
                        {card.category}
                      </span>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-muted-foreground/15 group-hover:text-primary/60 group-hover:translate-x-0.5 transition-all duration-300"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors duration-300 mb-2">
                    {card.label}
                  </h3>

                  {/* Description */}
                  <p className="font-mono text-[10px] text-muted-foreground/35 leading-relaxed mb-4 group-hover:text-muted-foreground/55 transition-colors duration-300">
                    {card.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[8px] tracking-wider px-2 py-0.5 rounded-full border border-border/15 text-muted-foreground/25 group-hover:border-primary/20 group-hover:text-primary/40 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-primary/30 transition-all duration-500" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground/15 uppercase">
          10 modules · Interconnected Knowledge System
        </p>
      </div>
    </div>
  );
};

export default SystemAssemblyNav;
