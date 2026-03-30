import { Link } from "react-router-dom";
import { useState, useCallback, useRef } from "react";
import { BookOpen, Users, GraduationCap, Lightbulb, Search } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

interface NavNode {
  id: string;
  label: string;
  category: string;
  icon: string;
  path: string;
  description: string;
  position: { x: number; y: number; z: number; rotateX: number; rotateY: number; rotateZ: number; scale: number };
  delay: number;
}

const navNodes: NavNode[] = [
  {
    id: "notebook",
    label: "AI Notebook",
    category: "CORE",
    icon: "◇",
    path: "/notebook/ai",
    description: "Complete AI knowledge hub — research, frameworks, and deep dives.",
    position: { x: -180, y: -80, z: -40, rotateX: 20, rotateY: 25, rotateZ: -3, scale: 0.9 },
    delay: 0.05,
  },
  {
    id: "contributors",
    label: "Top 100 Contributors",
    category: "DIRECTORY",
    icon: "⬡",
    path: "/ai-contributors",
    description: "2026 Edition · The definitive index of AI researchers and leaders.",
    position: { x: 0, y: 0, z: 50, rotateX: 15, rotateY: -10, rotateZ: 0, scale: 1.1 },
    delay: 0,
  },
  {
    id: "roadmap",
    label: "Free AI Roadmap",
    category: "LEARNING",
    icon: "△",
    path: "/notebook/ai/roadmap",
    description: "18-week zero-to-hero AI curriculum. Foundations to applied engineering.",
    position: { x: 180, y: -80, z: -40, rotateX: 20, rotateY: -25, rotateZ: 3, scale: 0.9 },
    delay: 0.1,
  },
  {
    id: "encyclopedia",
    label: "AI Encyclopedia",
    category: "REFERENCE",
    icon: "◈",
    path: "/notebook/ai/encyclopedia",
    description: "110 core AI concepts — attention mechanisms to zero-shot learning.",
    position: { x: -280, y: 60, z: -120, rotateX: 12, rotateY: 35, rotateZ: -5, scale: 0.78 },
    delay: 0.15,
  },
  {
    id: "seo",
    label: "Best SEO",
    category: "SEARCH",
    icon: "◉",
    path: "/solutions",
    description: "Enterprise search optimization and AI-powered visibility strategies.",
    position: { x: 280, y: 60, z: -120, rotateX: 12, rotateY: -35, rotateZ: 5, scale: 0.78 },
    delay: 0.2,
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
  const parallaxX = useTransform(mouseX, (v: number) => (v + 0.5) * 25 - 12.5);
  const parallaxY = useTransform(mouseY, (v: number) => (v + 0.5) * 18 - 9);
  const smoothX = useSpring(parallaxX, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(parallaxY, { stiffness: 100, damping: 30 });
  const isHovered = hoveredId === node.id;

  return (
    <motion.div
      className="absolute"
      style={{ left: "50%", top: "50%", x: smoothX, y: smoothY }}
      initial={{
        translateX: pos.x - 110,
        translateY: pos.y - 75,
        translateZ: pos.z,
        rotateX: pos.rotateX,
        rotateY: pos.rotateY,
        rotateZ: pos.rotateZ,
        scale: pos.scale,
        opacity: 0,
      }}
      animate={{
        translateX: pos.x - 110,
        translateY: pos.y - 75,
        translateZ: pos.z,
        rotateX: pos.rotateX,
        rotateY: pos.rotateY,
        rotateZ: pos.rotateZ,
        scale: pos.scale,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 60, damping: 20, delay: node.delay + 0.3 }}
    >
      <Link to={node.path}>
        <motion.div
          className="relative w-[220px] h-[150px] cursor-pointer group/card"
          onMouseEnter={() => setHoveredId(node.id)}
          onMouseLeave={() => setHoveredId(null)}
          whileHover={{ scale: 1.08, z: 60 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Glow */}
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-sm" />

          {/* Card body */}
          <div className="relative h-full rounded-xl border border-border/20 bg-background/60 backdrop-blur-xl overflow-hidden group-hover/card:border-border/40 transition-colors duration-500">
            {/* Top shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent pointer-events-none" />

            {/* Scan line */}
            <motion.div
              className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent pointer-events-none"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: node.delay * 5 }}
            />

            {/* Content */}
            <div className="relative p-5 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-2xl opacity-50 group-hover/card:opacity-100 transition-opacity">{node.icon}</span>
                <motion.div
                  className="w-2 h-2 rounded-full bg-emerald-500/50"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: node.delay * 3 }}
                />
              </div>
              <div>
                <p className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground/30 uppercase mb-1">
                  {node.category}
                </p>
                <p className="text-xs font-medium text-foreground/70 group-hover/card:text-foreground transition-colors">
                  {node.label}
                </p>
              </div>
            </div>

            {/* Bottom prismatic line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.2), transparent)" }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Edge refraction on hover */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ boxShadow: "inset 1px 0 0 rgba(200,220,255,0.08), inset -1px 0 0 rgba(255,200,180,0.06), inset 0 1px 0 rgba(200,255,200,0.04)" }}
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

// Floating energy particles
const Particles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, hsla(${200 + p.id * 15}, 70%, 65%, 0.5), transparent)`,
          }}
          animate={{ y: [0, -15, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
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
            Five interconnected knowledge modules. Hover to inspect. Click to navigate.
            Each node links to a self-contained intelligence system.
          </motion.p>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-10 mt-8">
            {[
              { label: "Modules", value: "05" },
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

      {/* 3D Scene */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative mx-auto overflow-visible"
        style={{ height: "480px", perspective: "1200px", perspectiveOrigin: "50% 40%" }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(ellipse, hsl(220, 70%, 55%), transparent 70%)" }}
          />
        </div>

        <Particles />

        {/* 3D cards */}
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

        {/* Ground reflection */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[500px] h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.06), transparent)" }}
        />

        {/* Perspective grid */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[700px] h-[70px] pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, hsl(var(--foreground)) 0px, transparent 1px, transparent 60px),
              repeating-linear-gradient(0deg, hsl(var(--foreground)) 0px, transparent 1px, transparent 20px)
            `,
            maskImage: "linear-gradient(to bottom, transparent, white 30%, white 70%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, white 30%, white 70%, transparent)",
          }}
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
      <div className="mt-8 text-center">
        <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground/15 uppercase">
          5 modules · Interconnected Knowledge System
        </p>
      </div>
    </div>
  );
};

export default SystemAssemblyNav;
