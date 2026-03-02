import { useState, useCallback, useMemo, useRef, useEffect, type MouseEvent as ReactMouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Network, Brain, List } from "lucide-react";
import { services } from "@/components/ServicesGrid";

type ViewMode = "graph" | "neural" | "structured";

const serviceColors: Record<string, string> = {
  "AI Product": "#3B82F6",
  "AEO": "#8B5CF6",
  "Technical": "#EF4444",
  "Programmatic": "#06B6D4",
  "Editorial": "#10B981",
  "Performance": "#F59E0B",
};

interface GraphNode {
  id: string;
  label: string;
  slug: string;
  tagline: string;
  items: string[];
  color: string;
  x: number;
  y: number;
  r: number;
  children: { label: string; x: number; y: number; r: number }[];
}

function buildServiceNodes(): GraphNode[] {
  const cx = 400, cy = 320, orbitR = 200;
  return services.map((s, i) => {
    const angle = (i / services.length) * Math.PI * 2 - Math.PI / 2;
    const jitter = (i % 2 === 0 ? 1 : -1) * 20;
    const x = cx + Math.cos(angle) * (orbitR + jitter);
    const y = cy + Math.sin(angle) * (orbitR + jitter);
    const r = 28 + s.items.length * 1.5;
    const color = serviceColors[s.title] || "#888";
    const children = s.items.map((item, ci) => {
      const cAngle = angle + ((ci - (s.items.length - 1) / 2) * 0.22);
      const cDist = r + 30 + ci * 6;
      return { label: item, x: x + Math.cos(cAngle) * cDist, y: y + Math.sin(cAngle) * cDist, r: 7 + Math.random() * 4 };
    });
    return { id: s.slug, label: s.title, slug: s.slug, tagline: s.tagline, items: s.items, color, x, y, r, children };
  });
}

// ── Neural Net Canvas ──
const NeuralSolutionsCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const activeLayerRef = useRef<number>(-1);
  const hoveredChildRef = useRef<string | null>(null);
  const [activeService, setActiveService] = useState<{ title: string; tagline: string; items: string[]; color: string; highlightItem?: string } | null>(null);
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number; r: number; layer: number; label: string; color: string; isMain: boolean }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
      activeLayerRef.current = -1;
      setActiveService(null);
    };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const layers = services.length;
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;
    const nodes: typeof nodesRef.current = [];

    services.forEach((s, li) => {
      const color = serviceColors[s.title] || "#888";
      const xBase = (cw / (layers + 1)) * (li + 1);
      const yBase = ch * 0.22;
      nodes.push({ x: xBase, y: yBase, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15, r: 10, layer: li, label: s.title, color, isMain: true });
      s.items.forEach((item, ci) => {
        const yItem = ch * 0.40 + ci * (ch * 0.06);
        const xItem = xBase + (Math.random() - 0.5) * 50;
        nodes.push({ x: xItem, y: yItem, vx: (Math.random() - 0.5) * 0.1, vy: (Math.random() - 0.5) * 0.1, r: 4.5, layer: li, label: item, color, isMain: false });
      });
    });
    nodesRef.current = nodes;

    let lastCheck = 0;

    const draw = () => {
      const dpr = window.devicePixelRatio;
      const rw = canvas.offsetWidth;
      const rh = canvas.offsetHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rw, rh);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;
      const aLayer = activeLayerRef.current;

      // Mouse interaction — DON'T repel nodes in the active layer
      for (const n of nodes) {
        if (mouseActive) {
          const isActiveLayer = activeLayerRef.current === n.layer;
          // Freeze active layer nodes so user can hover them
          if (isActiveLayer) {
            n.vx *= 0.9;
            n.vy *= 0.9;
          } else {
            const dx = n.x - mx;
            const dy = n.y - my;
            const dist = Math.hypot(dx, dy);
            if (dist < 120 && dist > 1 && n.isMain) {
              const strength = (1 - dist / 120) * -0.06;
              n.vx += (dx / dist) * strength;
              n.vy += (dy / dist) * strength;
            }
          }
        }
        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.996;
        n.vy *= 0.996;
        n.vx += (Math.random() - 0.5) * 0.015;
        n.vy += (Math.random() - 0.5) * 0.015;
        if (n.x < 20 || n.x > rw - 20) n.vx *= -1;
        if (n.y < 20 || n.y > rh - 20) n.vy *= -1;
      }

      // Detect hovered node (main OR child)
      const now = Date.now();
      if (mouseActive && now - lastCheck > 50) {
        lastCheck = now;
        let foundLayer = -1;
        let foundChild: string | null = null;

        // Check main nodes first
        for (const n of nodes) {
          if (!n.isMain) continue;
          if (Math.hypot(n.x - mx, n.y - my) < 40) {
            foundLayer = n.layer;
            break;
          }
        }
        // If no main node, check child nodes
        if (foundLayer < 0) {
          for (const n of nodes) {
            if (n.isMain) continue;
            if (Math.hypot(n.x - mx, n.y - my) < 20) {
              foundLayer = n.layer;
              foundChild = n.label;
              break;
            }
          }
        }

        if (foundLayer !== activeLayerRef.current || foundChild !== hoveredChildRef.current) {
          activeLayerRef.current = foundLayer;
          hoveredChildRef.current = foundChild;
          if (foundLayer >= 0) {
            const s = services[foundLayer];
            setActiveService({ title: s.title, tagline: s.tagline, items: s.items, color: serviceColors[s.title] || "#888", highlightItem: foundChild || undefined });
          } else {
            setActiveService(null);
          }
        }
      }

      // ── Draw connections ──
      // Same-layer connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          if (a.layer !== b.layer) continue;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > 220) continue;
          const isActive = aLayer === a.layer;
          const alpha = (1 - dist / 220) * (isActive ? 0.4 : (aLayer >= 0 ? 0.05 : 0.2));
          ctx.strokeStyle = a.color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = isActive ? 1.2 : 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Cross-layer connections
      for (const a of nodes) {
        for (const b of nodes) {
          if (Math.abs(b.layer - a.layer) !== 1) continue;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > 350) continue;
          const isActive = aLayer === a.layer || aLayer === b.layer;
          const alpha = (1 - dist / 350) * (isActive ? 0.15 : (aLayer >= 0 ? 0.02 : 0.06));
          ctx.strokeStyle = "#fff";
          ctx.globalAlpha = alpha;
          ctx.lineWidth = a.isMain && b.isMain ? 0.8 : 0.3;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // ── Draw nodes ──
      ctx.globalAlpha = 1;
      const hChild = hoveredChildRef.current;
      for (const n of nodes) {
        const isActive = aLayer === n.layer;
        const isDimmed = aLayer >= 0 && !isActive;
        const isHoveredChild = !n.isMain && hChild === n.label && isActive;

        // Glow
        ctx.fillStyle = n.color;
        ctx.globalAlpha = isHoveredChild ? 0.2 : (isActive ? 0.1 : (isDimmed ? 0.01 : 0.04));
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (isHoveredChild ? 8 : 5), 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        const nodeScale = isHoveredChild ? 1.8 : (isActive && n.isMain ? 1.3 : 1);
        ctx.globalAlpha = n.isMain
          ? (isActive ? 0.9 : (isDimmed ? 0.15 : 0.7))
          : (isHoveredChild ? 0.9 : (isActive ? 0.7 : (isDimmed ? 0.08 : 0.35)));
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * nodeScale, 0, Math.PI * 2);
        ctx.fill();

        // Hovered child ring
        if (isHoveredChild) {
          ctx.strokeStyle = n.color;
          ctx.globalAlpha = 0.6;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 2.5, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Main node labels (always)
        if (n.isMain) {
          ctx.globalAlpha = isActive ? 0.95 : (isDimmed ? 0.15 : 0.6);
          ctx.fillStyle = n.color;
          ctx.font = `700 ${isActive ? 11 : 10}px 'JetBrains Mono', monospace`;
          ctx.textAlign = "center";
          ctx.fillText(n.label.toUpperCase(), n.x, n.y - 20);
          const count = services[n.layer]?.items.length || 0;
          ctx.globalAlpha = isActive ? 0.5 : (isDimmed ? 0.08 : 0.25);
          ctx.font = "400 8px 'JetBrains Mono', monospace";
          ctx.fillText(`${count} capabilities`, n.x, n.y - 9);
        }

        // Child node labels — show ALL when layer is active, bold the hovered one
        if (!n.isMain && isActive) {
          ctx.globalAlpha = isHoveredChild ? 1 : 0.65;
          ctx.fillStyle = n.color;
          ctx.font = `${isHoveredChild ? '700' : '500'} ${isHoveredChild ? 9 : 8}px 'JetBrains Mono', monospace`;
          ctx.textAlign = "left";
          ctx.fillText(n.label, n.x + n.r * nodeScale + 6, n.y + 3);
        }
      }
      ctx.globalAlpha = 1;

      // Data signal particles
      const time = Date.now() * 0.001;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!a.isMain) continue;
        const isActive = aLayer === a.layer;
        if (aLayer >= 0 && !isActive) continue;
        for (let j = 0; j < nodes.length; j++) {
          const b = nodes[j];
          if (b.layer !== a.layer || b.isMain || i === j) continue;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > 180) continue;
          const t = ((time * 0.5 + i * 0.3 + j * 0.1) % 1);
          ctx.fillStyle = a.color;
          ctx.globalAlpha = isActive ? 0.7 : 0.35;
          ctx.beginPath();
          ctx.arc(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, isActive ? 2 : 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-full" style={{ minHeight: 640 }}>
      <canvas ref={canvasRef} className="w-full h-full" style={{ minHeight: 640 }} />
      {/* Info panel when hovering a domain */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            key={activeService.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 left-4 z-50 pointer-events-none max-w-xs border border-border bg-background/90 backdrop-blur-md p-5"
            style={{ borderColor: activeService.color + "30" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: activeService.color }} />
              <h3 className="font-display text-lg font-bold" style={{ color: activeService.color }}>
                {activeService.title}
              </h3>
            </div>
            <p className="font-mono text-[10px] text-muted-foreground/60 mb-3 leading-relaxed">
              {activeService.tagline}
            </p>
            <div className="border-t border-border pt-3 space-y-1">
              {activeService.items.map((item, i) => {
                const isHighlighted = activeService.highlightItem === item;
                return (
                  <div key={item} className={`flex items-center gap-2 py-0.5 px-1 -mx-1 rounded-sm transition-all ${isHighlighted ? 'bg-foreground/5' : ''}`}>
                    <span className="font-mono text-[9px] w-4" style={{ color: isHighlighted ? activeService.color : undefined, opacity: isHighlighted ? 0.8 : 0.3 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={`font-mono text-[11px] ${isHighlighted ? 'font-bold' : ''}`} style={{ color: isHighlighted ? activeService.color : undefined, opacity: isHighlighted ? 1 : 0.7 }}>{item}</span>
                    {isHighlighted && <span className="font-mono text-[8px] ml-auto" style={{ color: activeService.color, opacity: 0.6 }}>◄</span>}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Legend */}
      <div className="absolute top-4 right-4 z-40 pointer-events-none flex flex-wrap gap-3 max-w-sm justify-end">
        {services.map((s) => (
          <span
            key={s.slug}
            className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider"
            style={{ color: serviceColors[s.title], opacity: activeService ? (activeService.title === s.title ? 1 : 0.25) : 0.6 }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: serviceColors[s.title] }} />
            {s.title} ({s.items.length})
          </span>
        ))}
      </div>
    </div>
  );
};

// ── Structured View ──
const StructuredView = () => (
  <div className="space-y-6">
    {services.map((service, i) => (
      <motion.div
        key={service.slug}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.08, duration: 0.4 }}
      >
        <Link
          to={`/solutions/${service.slug}`}
          className="group block border border-border p-6 sm:p-8 border-glow-hover hover:bg-secondary/20 transition-all"
        >
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <span
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: serviceColors[service.title] }}
                />
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground group-hover:text-glow transition-all">
                  {service.title}
                </h3>
              </div>
              <p className="font-mono text-xs text-muted-foreground/50 mb-4 ml-7">{service.tagline}</p>
              <div className="flex flex-wrap gap-2 ml-7">
                {service.items.map((item) => (
                  <span key={item} className="font-mono text-[10px] border border-border px-3 py-1 text-muted-foreground/60">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <ArrowRight size={16} className="text-muted-foreground/30 group-hover:text-foreground transition-all mt-2 flex-shrink-0" />
          </div>
        </Link>
      </motion.div>
    ))}
  </div>
);

// ── JSON-LD for SEO ──
const JsonLdScript = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Venkata Pagadala — Enterprise Solutions",
    "provider": {
      "@type": "Person",
      "name": "Venkata Pagadala",
      "url": "https://venkatapagadala.com",
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Solutions",
      "itemListElement": services.map((s, i) => ({
        "@type": "Offer",
        "position": i + 1,
        "itemOffered": {
          "@type": "Service",
          "name": s.title,
          "description": s.tagline,
          "serviceType": s.items,
        },
      })),
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// ── Main Component ──
const SolutionsGraph = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("graph");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredChild, setHoveredChild] = useState<{ label: string; x: number; y: number; parentColor: string } | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodes = useMemo(() => buildServiceNodes(), []);
  const cx = 400, cy = 320;

  const handleChildHover = useCallback((e: ReactMouseEvent<SVGElement>, label: string, color: string) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoveredChild({ label, x, y, parentColor: color });
  }, []);

  const isActive = useCallback(
    (id: string) => hoveredNode === id || selectedNode?.id === id,
    [hoveredNode, selectedNode]
  );

  const totalServices = services.reduce((s, c) => s + c.items.length, 0);

  const views: { mode: ViewMode; icon: typeof Network; label: string }[] = [
    { mode: "graph", icon: Network, label: "Context Graph" },
    { mode: "neural", icon: Brain, label: "Neural Net" },
    { mode: "structured", icon: List, label: "Structured" },
  ];

  return (
    <div className="w-full">
      <JsonLdScript />

      {/* Stats bar + View toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 border border-border p-4 gap-4">
        <div className="flex items-center gap-6">
          <h2 className="font-display text-xl font-bold text-foreground">
            <span className="text-muted-foreground">Solutions</span> Graph
          </h2>
          {/* View toggle */}
          <div className="flex border border-border">
            {views.map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase transition-all ${
                  viewMode === mode
                    ? "bg-foreground text-background"
                    : "text-muted-foreground/50 hover:text-foreground hover:bg-secondary/20"
                }`}
                title={label}
              >
                <Icon size={12} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-6 sm:gap-8">
          {[
            { value: services.length.toString(), label: "DOMAINS" },
            { value: totalServices.toString(), label: "CAPABILITIES" },
            { value: "Enterprise", label: "SCALE" },
          ].map((stat) => (
            <div key={stat.label} className="text-right">
              <p className="font-mono text-sm font-bold text-foreground">{stat.value}</p>
              <p className="font-mono text-[9px] tracking-widest text-muted-foreground/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "structured" && (
          <motion.div key="structured" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <StructuredView />
          </motion.div>
        )}

        {viewMode === "neural" && (
          <motion.div key="neural" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="border border-border relative overflow-hidden" style={{ minHeight: 640 }}>
              <NeuralSolutionsCanvas />
              {/* Overlay labels */}
              <div className="absolute bottom-4 left-4 font-mono text-[9px] text-muted-foreground/30 tracking-widest uppercase">
                Neural Network Mode — {services.length} Layers × {totalServices} Nodes
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === "graph" && (
          <motion.div key="graph" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex gap-6">
              {/* Categories panel */}
              <div className="hidden lg:block w-56 flex-shrink-0 border border-border p-4">
                <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/50 uppercase mb-4">
                  Domains ▾
                </p>
                <div className="space-y-1">
                  {nodes.map((node) => {
                    const active = isActive(node.id);
                    return (
                      <button
                        key={node.id}
                        className="w-full flex items-center gap-3 py-2.5 px-2 hover:bg-secondary/20 transition-all text-left"
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => setSelectedNode(active && selectedNode?.id === node.id ? null : node)}
                        style={{ borderLeft: active ? `2px solid ${node.color}` : "2px solid transparent" }}
                      >
                        <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0 transition-all duration-300" style={{ backgroundColor: active ? node.color : "hsl(var(--muted-foreground) / 0.2)" }} />
                        <span className="font-mono text-[11px] flex-1 transition-all duration-300" style={{ color: active ? node.color : "hsl(var(--muted-foreground) / 0.5)" }}>{node.label}</span>
                        <span className="font-mono text-[9px] text-muted-foreground/20">{node.items.length}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Graph SVG */}
              <div className="flex-1 border border-border relative overflow-hidden" style={{ minHeight: 640 }}>
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <svg ref={svgRef} viewBox="0 0 800 640" className="w-full h-full relative z-10" onMouseLeave={() => { setHoveredNode(null); setHoveredChild(null); }}>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <circle key={`dot-${i}`} cx={50 + Math.random() * 700} cy={50 + Math.random() * 540} r={1 + Math.random() * 1.5} fill="hsl(var(--muted-foreground))" fillOpacity={0.06} />
                  ))}
                  {nodes.map((node) => (
                    <line key={`line-${node.id}`} x1={cx} y1={cy} x2={node.x} y2={node.y} stroke={isActive(node.id) ? node.color : "hsl(var(--border))"} strokeWidth={isActive(node.id) ? 2 : 0.5} strokeOpacity={isActive(node.id) ? 0.7 : 0.12} className="transition-all duration-500" />
                  ))}
                  {nodes.map((node) => node.children?.map((child, ci) => (
                    <line key={`child-line-${node.id}-${ci}`} x1={node.x} y1={node.y} x2={child.x} y2={child.y} stroke={isActive(node.id) ? node.color : "hsl(var(--border))"} strokeWidth={isActive(node.id) ? 1.2 : 0.4} strokeOpacity={isActive(node.id) ? 0.5 : 0.08} className="transition-all duration-500" />
                  )))}
                  <circle cx={cx} cy={cy} r={36} fill="none" stroke={selectedNode ? selectedNode.color : "hsl(var(--muted-foreground) / 0.15)"} strokeWidth={1.5} className="transition-all duration-700">
                    <animate attributeName="r" values="34;38;34" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={cx} cy={cy} r={5} fill={selectedNode ? selectedNode.color : "hsl(var(--muted-foreground) / 0.3)"} className="transition-all duration-500" />
                  <text x={cx} y={cy - 2} textAnchor="middle" dominantBaseline="middle" className="font-mono text-[7px] fill-muted-foreground/30 uppercase tracking-[0.3em]">Solutions</text>
                  <text x={cx} y={cy + 52} textAnchor="middle" className="font-mono text-[7px] fill-muted-foreground/20 uppercase tracking-widest">Context Graph</text>
                  {nodes.map((node) => node.children?.map((child, ci) => (
                    <g
                      key={`child-${node.id}-${ci}`}
                      className="cursor-pointer"
                      onMouseEnter={(e) => handleChildHover(e, child.label, node.color)}
                      onMouseMove={(e) => handleChildHover(e, child.label, node.color)}
                      onMouseLeave={() => setHoveredChild(null)}
                    >
                      <circle cx={child.x} cy={child.y} r={child.r + 4} fill="transparent" />
                      <circle cx={child.x} cy={child.y} r={child.r} fill={isActive(node.id) ? node.color : "hsl(var(--muted-foreground) / 0.12)"} fillOpacity={isActive(node.id) ? 0.55 : 0.5} stroke={isActive(node.id) ? node.color : "hsl(var(--muted-foreground) / 0.15)"} strokeWidth={isActive(node.id) ? 1 : 0.5} className="transition-all duration-500 hover:fill-opacity-80" />
                      {isActive(node.id) && (
                        <text x={child.x} y={child.y + child.r + 10} textAnchor="middle" className="font-mono text-[5.5px] pointer-events-none" fill={node.color} fillOpacity={0.7}>
                          {child.label.length > 20 ? child.label.slice(0, 20) + "…" : child.label}
                        </text>
                      )}
                    </g>
                  )))}
                  {nodes.map((node) => {
                    const active = isActive(node.id);
                    return (
                      <g key={node.id} onMouseEnter={() => setHoveredNode(node.id)} onMouseLeave={() => setHoveredNode(null)} onClick={() => setSelectedNode(active && selectedNode?.id === node.id ? null : node)} className="cursor-pointer">
                        {active && (<><circle cx={node.x} cy={node.y} r={node.r + 12} fill={node.color} fillOpacity={0.04} /><circle cx={node.x} cy={node.y} r={node.r + 4} fill="none" stroke={node.color} strokeWidth={0.5} strokeOpacity={0.3} /></>)}
                        <circle cx={node.x} cy={node.y} r={node.r} fill={active ? node.color : "hsl(var(--muted-foreground) / 0.06)"} fillOpacity={active ? 0.2 : 1} stroke={active ? node.color : "hsl(var(--muted-foreground) / 0.15)"} strokeWidth={active ? 2 : 0.8} className="transition-all duration-500" />
                        <text x={node.x} y={node.y + 1} textAnchor="middle" dominantBaseline="middle" className="font-mono text-[8px] pointer-events-none uppercase tracking-wider" fill={active ? node.color : "hsl(var(--muted-foreground) / 0.4)"}>{node.label}</text>
                        <text x={node.x} y={node.y + node.r + 14} textAnchor="middle" className="font-mono text-[6px] pointer-events-none" fill={active ? node.color : "hsl(var(--muted-foreground) / 0.2)"}>{node.items.length} capabilities</text>
                      </g>
                    );
                  })}
                </svg>
                {/* Hover tooltip for child nodes */}
                {hoveredChild && (
                  <div
                    className="absolute z-50 pointer-events-none px-3 py-2 border border-border bg-background/95 backdrop-blur-sm shadow-lg"
                    style={{
                      left: hoveredChild.x + 12,
                      top: hoveredChild.y - 8,
                      borderColor: hoveredChild.parentColor + "40",
                    }}
                  >
                    <p className="font-mono text-[11px] text-foreground whitespace-nowrap" style={{ color: hoveredChild.parentColor }}>
                      {hoveredChild.label}
                    </p>
                  </div>
                )}
              </div>

              {/* Details panel */}
              <div className="hidden xl:block w-72 flex-shrink-0 border border-border p-4">
                <AnimatePresence mode="wait">
                  {selectedNode ? (
                    <motion.div key={selectedNode.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display text-lg font-bold text-foreground">{selectedNode.label}</h3>
                        <span className="font-mono text-[9px] px-2 py-0.5" style={{ backgroundColor: selectedNode.color + "15", color: selectedNode.color }}>DOMAIN</span>
                      </div>
                      <p className="font-mono text-[11px] text-muted-foreground/60 mb-4 leading-relaxed">{selectedNode.tagline}</p>
                      <div className="border-t border-border pt-4 mb-4">
                        <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/40 uppercase mb-3">Capabilities ({selectedNode.items.length})</p>
                        <div className="space-y-1.5">
                          {selectedNode.items.map((item) => (
                            <div key={item} className="flex items-center gap-2 py-1.5 px-2 -mx-2 border border-transparent hover:border-border/50 transition-all">
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: selectedNode.color }} />
                              <span className="font-mono text-[10px] text-muted-foreground">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Link to={`/solutions/${selectedNode.slug}`} className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase mt-4 py-2 px-3 border border-border hover:bg-secondary/20 transition-all group" style={{ color: selectedNode.color }}>
                        Explore <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center py-20">
                      <div className="w-8 h-8 border border-border rounded-full flex items-center justify-center mb-4">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
                      </div>
                      <p className="font-mono text-[10px] text-muted-foreground/30 tracking-widest uppercase mb-2">Select a domain</p>
                      <p className="font-mono text-[10px] text-muted-foreground/20 leading-relaxed max-w-[180px]">Click any node to explore capabilities and services</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden semantic content for SEO/AI crawlers */}
      <div className="sr-only" aria-label="Solutions structured data">
        <h2>Solutions by Venkata Pagadala</h2>
        {services.map((s) => (
          <section key={s.slug} aria-label={s.title}>
            <h3>{s.title} — {s.tagline}</h3>
            <ul>
              {s.items.map((item) => (<li key={item}>{item}</li>))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default SolutionsGraph;
