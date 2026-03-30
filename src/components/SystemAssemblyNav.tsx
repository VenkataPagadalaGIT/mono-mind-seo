import { Link } from "react-router-dom";
import { useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

interface NavNode {
  id: string;
  label: string;
  category: string;
  icon: string;
  path: string;
  description: string;
  position: { x: number; y: number; z: number; scale: number };
  delay: number;
}

const navNodes: NavNode[] = [
  {
    id: "notebook",
    label: "AI Notebook",
    category: "CORE",
    icon: "◎",
    path: "/notebook/ai",
    description: "Complete AI knowledge hub — research, frameworks, and deep dives.",
    position: { x: -38, y: 20, z: -60, scale: 0.88 },
    delay: 0.05,
  },
  {
    id: "roadmap",
    label: "Free AI Roadmap",
    category: "LEARNING",
    icon: "△",
    path: "/notebook/ai/roadmap",
    description: "18-week zero-to-hero AI curriculum. Foundations to applied engineering.",
    position: { x: -18, y: -15, z: -20, scale: 0.92 },
    delay: 0.1,
  },
  {
    id: "contributors",
    label: "Top 100 Contributors",
    category: "DIRECTORY",
    icon: "◇",
    path: "/ai-contributors",
    description: "2026 Edition · The definitive index of AI researchers and leaders.",
    position: { x: 0, y: 15, z: 40, scale: 1.05 },
    delay: 0,
  },
  {
    id: "encyclopedia",
    label: "AI Encyclopedia",
    category: "REFERENCE",
    icon: "▽",
    path: "/notebook/ai/encyclopedia",
    description: "110 core AI concepts — attention mechanisms to zero-shot learning.",
    position: { x: 18, y: -10, z: -10, scale: 0.94 },
    delay: 0.15,
  },
  {
    id: "solutions",
    label: "Solutions & SEO",
    category: "ENGINE",
    icon: "⬡",
    path: "/solutions",
    description: "Enterprise search optimization and AI-powered visibility strategies.",
    position: { x: -20, y: 38, z: -30, scale: 0.86 },
    delay: 0.12,
  },
  {
    id: "experience",
    label: "Experience",
    category: "DRIVE",
    icon: "◈",
    path: "/experience",
    description: "10+ years scaling organic search for Fortune 500 brands and startups.",
    position: { x: 22, y: 35, z: -50, scale: 0.84 },
    delay: 0.18,
  },
  {
    id: "insights",
    label: "Insights & Blog",
    category: "SENSOR",
    icon: "◆",
    path: "/insights",
    description: "Essays, case studies, and thought leadership on AI and search.",
    position: { x: 38, y: 10, z: -70, scale: 0.82 },
    delay: 0.2,
  },
  {
    id: "research",
    label: "Research",
    category: "NAV",
    icon: "✦",
    path: "/research",
    description: "Published papers and ongoing research in AI systems and NLP.",
    position: { x: -35, y: -5, z: -80, scale: 0.8 },
    delay: 0.22,
  },
  {
    id: "projects",
    label: "Projects",
    category: "WEAPON",
    icon: "✧",
    path: "/projects",
    description: "Production AI systems, tools, and open-source contributions.",
    position: { x: 36, y: -12, z: -90, scale: 0.78 },
    delay: 0.25,
  },
  {
    id: "contact",
    label: "Contact",
    category: "SHIELD",
    icon: "○",
    path: "/contact",
    description: "Get in touch for collaborations, speaking, or consulting.",
    position: { x: 0, y: 42, z: -40, scale: 0.85 },
    delay: 0.16,
  },
];

const NavCard3D = ({
  node,
  mouseX,
  mouseY,
  hoveredId,
  setHoveredId,
}: {
  node: NavNode;
  mouseX: ReturnType<typeof useMotionValue>;
  mouseY: ReturnType<typeof useMotionValue>;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) => {
  const pos = node.position;
  const isHovered = hoveredId === node.id;

  // Parallax based on card depth
  const depthFactor = (100 + pos.z) / 200;
  const parallaxX = useTransform(mouseX, (v: number) => v * 30 * depthFactor);
  const parallaxY = useTransform(mouseY, (v: number) => v * 20 * depthFactor);
  const smoothX = useSpring(parallaxX, { stiffness: 120, damping: 30 });
  const smoothY = useSpring(parallaxY, { stiffness: 120, damping: 30 });

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${50 + pos.x}%`,
        top: `${45 + pos.y}%`,
        x: smoothX,
        y: smoothY,
        zIndex: Math.round(pos.z + 100),
      }}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: pos.scale, y: 0 }}
      transition={{ type: "spring", stiffness: 60, damping: 18, delay: node.delay + 0.4 }}
    >
      <Link to={node.path} className="block">
        <motion.div
          className="relative cursor-pointer group/card"
          style={{ width: 200, height: 140 }}
          onMouseEnter={() => setHoveredId(node.id)}
          onMouseLeave={() => setHoveredId(null)}
          whileHover={{ scale: 1.12, zIndex: 200, y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Card body */}
          <div
            className="relative h-full rounded-lg overflow-hidden transition-all duration-500"
            style={{
              background: isHovered
                ? "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--foreground) / 0.06))"
                : "linear-gradient(135deg, hsl(var(--foreground) / 0.04), hsl(var(--foreground) / 0.02))",
              border: `1px solid ${isHovered ? "hsl(var(--primary) / 0.3)" : "hsl(var(--foreground) / 0.08)"}`,
              backdropFilter: "blur(12px)",
              boxShadow: isHovered
                ? "0 8px 32px -8px hsl(var(--primary) / 0.15), inset 0 1px 0 hsl(var(--foreground) / 0.06)"
                : "inset 0 1px 0 hsl(var(--foreground) / 0.04)",
            }}
          >
            {/* Top edge line */}
            <div
              className="absolute top-0 left-0 right-0 h-[1px] transition-all duration-500"
              style={{
                background: isHovered
                  ? "linear-gradient(90deg, transparent 10%, hsl(var(--primary) / 0.4) 50%, transparent 90%)"
                  : "linear-gradient(90deg, transparent 20%, hsl(var(--foreground) / 0.08) 50%, transparent 80%)",
              }}
            />

            {/* Status dot */}
            <motion.div
              className="absolute top-3 right-3 rounded-full"
              style={{
                width: 6,
                height: 6,
                background: isHovered ? "hsl(160, 60%, 50%)" : "hsl(160, 40%, 40%)",
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: node.delay * 3 }}
            />

            {/* Content */}
            <div className="relative p-4 h-full flex flex-col justify-between">
              {/* Icon */}
              <span
                className="text-xl transition-all duration-300"
                style={{
                  color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.3)",
                }}
              >
                {node.icon}
              </span>

              {/* Text */}
              <div>
                <p
                  className="font-mono tracking-[0.25em] uppercase mb-1 transition-colors duration-300"
                  style={{
                    fontSize: 8,
                    color: isHovered ? "hsl(var(--primary) / 0.6)" : "hsl(var(--foreground) / 0.2)",
                  }}
                >
                  {node.category}
                </p>
                <p
                  className="font-mono text-xs font-medium transition-colors duration-300"
                  style={{
                    color: isHovered ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.55)",
                  }}
                >
                  {node.label}
                </p>
              </div>
            </div>

            {/* Scan line */}
            <motion.div
              className="absolute inset-x-0 h-[1px] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.06), transparent)",
              }}
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: node.delay * 5 }}
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const SystemAssemblyNav = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-24 pb-20">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center mb-12">
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
            Ten interconnected knowledge modules. Hover to inspect. Click to navigate.
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

      {/* 3D Card Scene */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative mx-auto overflow-visible"
        style={{ height: 520, perspective: "1000px", perspectiveOrigin: "50% 45%" }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full opacity-[0.03]"
            style={{ background: "radial-gradient(ellipse, hsl(var(--primary)), transparent 70%)" }}
          />
        </div>

        {/* Connector lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]">
          <line x1="30%" y1="50%" x2="50%" y2="55%" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
          <line x1="50%" y1="55%" x2="70%" y2="45%" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
          <line x1="40%" y1="35%" x2="55%" y2="55%" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
          <line x1="55%" y1="55%" x2="65%" y2="70%" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
          <line x1="25%" y1="60%" x2="50%" y2="75%" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
        </svg>

        {/* Cards */}
        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          {navNodes.map((node) => (
            <NavCard3D
              key={node.id}
              node={node}
              mouseX={mouseX}
              mouseY={mouseY}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ))}
        </div>

        {/* Ground line */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[600px] h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.05), transparent)" }}
        />
      </div>

      {/* Hovered description */}
      <div className="h-12 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {hoveredId && (
            <motion.p
              key={hoveredId}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="font-mono text-[10px] text-muted-foreground/40 text-center max-w-md"
            >
              {navNodes.find((n) => n.id === hoveredId)?.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground/15 uppercase">
          10 modules · Interconnected Knowledge System
        </p>
      </div>
    </div>
  );
};

export default SystemAssemblyNav;
