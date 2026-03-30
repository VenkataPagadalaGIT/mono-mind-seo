import { Link } from "react-router-dom";
import { useState } from "react";
import { BookOpen, Users, GraduationCap, Lightbulb, Search, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const navNodes = [
  {
    id: "notebook",
    label: "AI Notebook",
    category: "CORE",
    icon: BookOpen,
    path: "/notebook/ai",
    description: "The complete AI knowledge hub",
    position: { x: 5, y: 15 },
    size: "md" as const,
  },
  {
    id: "contributors",
    label: "Top 100 Contributors",
    category: "DIRECTORY",
    icon: Users,
    path: "/ai-contributors",
    description: "2026 Edition · Definitive AI index",
    position: { x: 28, y: 5 },
    size: "lg" as const,
  },
  {
    id: "roadmap",
    label: "Free AI Roadmap",
    category: "LEARNING",
    icon: GraduationCap,
    path: "/notebook/ai/roadmap",
    description: "18-week zero to hero curriculum",
    position: { x: 55, y: 20 },
    size: "md" as const,
  },
  {
    id: "encyclopedia",
    label: "AI Encyclopedia",
    category: "REFERENCE",
    icon: Lightbulb,
    path: "/notebook/ai/encyclopedia",
    description: "110 concepts explained",
    position: { x: 18, y: 55 },
    size: "md" as const,
  },
  {
    id: "seo",
    label: "Best SEO",
    category: "SEARCH",
    icon: Search,
    path: "/solutions",
    description: "Enterprise search optimization",
    position: { x: 62, y: 50 },
    size: "sm" as const,
  },
];

// Connection lines between nodes
const connections = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 0, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 4 },
];

const sizeClasses = {
  sm: "w-44 sm:w-48",
  md: "w-52 sm:w-60",
  lg: "w-60 sm:w-72",
};

const SystemAssemblyNav = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-24 pb-20">
      <ScrollReveal>
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] tracking-[0.5em] text-muted-foreground/30 uppercase mb-3">
            [ System Assembly ]
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-glow mb-3">
            Knowledge Architecture
          </h2>
          <p className="font-mono text-[10px] text-muted-foreground/40 max-w-md mx-auto leading-relaxed">
            Navigate the interconnected modules — AI research, learning paths, and search intelligence.
          </p>
        </div>
      </ScrollReveal>

      {/* Assembly grid */}
      <div className="relative w-full" style={{ height: "420px" }}>
        {/* SVG connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {connections.map((conn, i) => {
            const from = navNodes[conn.from];
            const to = navNodes[conn.to];
            const isActive = hoveredId === from.id || hoveredId === to.id;
            return (
              <line
                key={i}
                x1={from.position.x + 10}
                y1={from.position.y + 10}
                x2={to.position.x + 10}
                y2={to.position.y + 10}
                stroke={isActive ? "hsl(var(--foreground) / 0.2)" : "hsl(var(--foreground) / 0.06)"}
                strokeWidth="0.15"
                className="transition-all duration-500"
              />
            );
          })}
          {/* Dot nodes at intersections */}
          {navNodes.map((node, i) => {
            const isActive = hoveredId === node.id;
            return (
              <circle
                key={i}
                cx={node.position.x + 10}
                cy={node.position.y + 10}
                r={isActive ? "0.8" : "0.4"}
                fill={isActive ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.3)"}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Cards */}
        {navNodes.map((node) => {
          const Icon = node.icon;
          const isHovered = hoveredId === node.id;

          return (
            <Link
              key={node.id}
              to={node.path}
              className={`absolute z-10 group ${sizeClasses[node.size]}`}
              style={{
                left: `${node.position.x}%`,
                top: `${node.position.y}%`,
              }}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={`
                  relative border rounded-lg p-5 sm:p-6 transition-all duration-500
                  ${isHovered
                    ? "bg-card/80 border-foreground/20 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.15)]"
                    : "bg-card/30 border-border/20 backdrop-blur-sm"
                  }
                `}
              >
                {/* Category label */}
                <p className={`font-mono text-[8px] tracking-[0.4em] uppercase mb-3 transition-colors duration-300 ${
                  isHovered ? "text-primary/70" : "text-muted-foreground/30"
                }`}>
                  {node.category}
                </p>

                {/* Icon */}
                <Icon
                  size={node.size === "lg" ? 22 : 18}
                  className={`mb-3 transition-all duration-300 ${
                    isHovered ? "text-foreground" : "text-muted-foreground/40"
                  }`}
                  strokeWidth={1.5}
                />

                {/* Title */}
                <h3 className={`font-display text-sm sm:text-base font-semibold mb-1 transition-colors duration-300 ${
                  isHovered ? "text-foreground" : "text-foreground/70"
                }`}>
                  {node.label}
                </h3>

                {/* Description */}
                <p className={`font-mono text-[9px] leading-relaxed transition-all duration-300 ${
                  isHovered ? "text-muted-foreground/60 opacity-100" : "text-muted-foreground/30 opacity-0"
                }`}>
                  {node.description}
                </p>

                {/* Arrow */}
                <ArrowRight
                  size={12}
                  className={`absolute bottom-4 right-4 transition-all duration-300 ${
                    isHovered
                      ? "text-foreground/50 translate-x-0 opacity-100"
                      : "text-foreground/10 -translate-x-1 opacity-0"
                  }`}
                />

                {/* Corner dot */}
                <div className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isHovered ? "bg-primary/60" : "bg-muted-foreground/15"
                }`} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SystemAssemblyNav;
