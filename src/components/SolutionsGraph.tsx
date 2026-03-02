import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "@/components/ServicesGrid";

// Map services to graph nodes with colors
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
  const cx = 400;
  const cy = 320;
  const orbitR = 200;

  return services.map((s, i) => {
    const angle = (i / services.length) * Math.PI * 2 - Math.PI / 2;
    const jitter = (i % 2 === 0 ? 1 : -1) * 20;
    const x = cx + Math.cos(angle) * (orbitR + jitter);
    const y = cy + Math.sin(angle) * (orbitR + jitter);
    const r = 28 + s.items.length * 1.5;
    const color = serviceColors[s.title] || "#888";

    const children = s.items.map((item, ci) => {
      const cAngle = angle + ((ci - (s.items.length - 1) / 2) * 0.22);
      const cDist = r + 25 + ci * 6;
      return {
        label: item,
        x: x + Math.cos(cAngle) * cDist,
        y: y + Math.sin(cAngle) * cDist,
        r: 4 + Math.random() * 5,
      };
    });

    return {
      id: s.slug,
      label: s.title,
      slug: s.slug,
      tagline: s.tagline,
      items: s.items,
      color,
      x,
      y,
      r,
      children,
    };
  });
}

const SolutionsGraph = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const nodes = useMemo(() => buildServiceNodes(), []);
  const cx = 400;
  const cy = 320;

  const isActive = useCallback(
    (id: string) => hoveredNode === id || selectedNode?.id === id,
    [hoveredNode, selectedNode]
  );

  const totalServices = services.reduce((s, c) => s + c.items.length, 0);

  return (
    <div className="w-full">
      {/* Stats bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 border border-border p-4 gap-4">
        <h2 className="font-display text-xl font-bold text-foreground">
          <span className="text-muted-foreground">Solutions</span> Graph
        </h2>
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
                  style={{
                    borderLeft: active ? `2px solid ${node.color}` : "2px solid transparent",
                  }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0 transition-all duration-300"
                    style={{
                      backgroundColor: active ? node.color : "hsl(var(--muted-foreground) / 0.2)",
                    }}
                  />
                  <span
                    className="font-mono text-[11px] flex-1 transition-all duration-300"
                    style={{ color: active ? node.color : "hsl(var(--muted-foreground) / 0.5)" }}
                  >
                    {node.label}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground/20">{node.items.length}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Graph */}
        <div className="flex-1 border border-border relative overflow-hidden" style={{ minHeight: 640 }}>
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <svg
            viewBox="0 0 800 640"
            className="w-full h-full relative z-10"
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Ambient floating dots */}
            {Array.from({ length: 20 }).map((_, i) => (
              <circle
                key={`dot-${i}`}
                cx={50 + Math.random() * 700}
                cy={50 + Math.random() * 540}
                r={1 + Math.random() * 1.5}
                fill="hsl(var(--muted-foreground))"
                fillOpacity={0.06}
              />
            ))}

            {/* Connection lines to center */}
            {nodes.map((node) => (
              <line
                key={`line-${node.id}`}
                x1={cx}
                y1={cy}
                x2={node.x}
                y2={node.y}
                stroke={isActive(node.id) ? node.color : "hsl(var(--border))"}
                strokeWidth={isActive(node.id) ? 2 : 0.5}
                strokeOpacity={isActive(node.id) ? 0.7 : 0.12}
                className="transition-all duration-500"
              />
            ))}

            {/* Child connection lines */}
            {nodes.map((node) =>
              node.children?.map((child, ci) => (
                <line
                  key={`child-line-${node.id}-${ci}`}
                  x1={node.x}
                  y1={node.y}
                  x2={child.x}
                  y2={child.y}
                  stroke={isActive(node.id) ? node.color : "hsl(var(--border))"}
                  strokeWidth={isActive(node.id) ? 1 : 0.3}
                  strokeOpacity={isActive(node.id) ? 0.35 : 0.06}
                  className="transition-all duration-500"
                />
              ))
            )}

            {/* Center node — pulsing ring */}
            <circle
              cx={cx}
              cy={cy}
              r={36}
              fill="none"
              stroke={selectedNode ? selectedNode.color : "hsl(var(--muted-foreground) / 0.15)"}
              strokeWidth={1.5}
              className="transition-all duration-700"
            >
              <animate attributeName="r" values="34;38;34" dur="4s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle
              cx={cx}
              cy={cy}
              r={5}
              fill={selectedNode ? selectedNode.color : "hsl(var(--muted-foreground) / 0.3)"}
              className="transition-all duration-500"
            />
            <text
              x={cx}
              y={cy - 2}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-mono text-[7px] fill-muted-foreground/30 uppercase tracking-[0.3em]"
            >
              Solutions
            </text>
            <text
              x={cx}
              y={cy + 52}
              textAnchor="middle"
              className="font-mono text-[7px] fill-muted-foreground/20 uppercase tracking-widest"
            >
              Context Graph
            </text>

            {/* Child nodes */}
            {nodes.map((node) =>
              node.children?.map((child, ci) => (
                <g key={`child-${node.id}-${ci}`}>
                  <circle
                    cx={child.x}
                    cy={child.y}
                    r={child.r}
                    fill={isActive(node.id) ? node.color : "hsl(var(--muted-foreground) / 0.08)"}
                    fillOpacity={isActive(node.id) ? 0.45 : 0.4}
                    stroke={isActive(node.id) ? node.color : "transparent"}
                    strokeWidth={0.5}
                    className="transition-all duration-500"
                  />
                  {isActive(node.id) && child.r > 5 && (
                    <text
                      x={child.x}
                      y={child.y + child.r + 9}
                      textAnchor="middle"
                      className="font-mono text-[5px] pointer-events-none"
                      fill={node.color}
                      fillOpacity={0.6}
                    >
                      {child.label.length > 18 ? child.label.slice(0, 18) + "…" : child.label}
                    </text>
                  )}
                </g>
              ))
            )}

            {/* Main nodes */}
            {nodes.map((node) => {
              const active = isActive(node.id);
              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedNode(active && selectedNode?.id === node.id ? null : node)}
                  className="cursor-pointer"
                >
                  {/* Outer glow ring */}
                  {active && (
                    <>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.r + 12}
                        fill={node.color}
                        fillOpacity={0.04}
                      />
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.r + 4}
                        fill="none"
                        stroke={node.color}
                        strokeWidth={0.5}
                        strokeOpacity={0.3}
                      />
                    </>
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r}
                    fill={active ? node.color : "hsl(var(--muted-foreground) / 0.06)"}
                    fillOpacity={active ? 0.2 : 1}
                    stroke={active ? node.color : "hsl(var(--muted-foreground) / 0.15)"}
                    strokeWidth={active ? 2 : 0.8}
                    className="transition-all duration-500"
                  />
                  <text
                    x={node.x}
                    y={node.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-mono text-[8px] pointer-events-none uppercase tracking-wider"
                    fill={active ? node.color : "hsl(var(--muted-foreground) / 0.4)"}
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + node.r + 14}
                    textAnchor="middle"
                    className="font-mono text-[6px] pointer-events-none"
                    fill={active ? node.color : "hsl(var(--muted-foreground) / 0.2)"}
                  >
                    {node.items.length} capabilities
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Details panel */}
        <div className="hidden xl:block w-72 flex-shrink-0 border border-border p-4">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold text-foreground">{selectedNode.label}</h3>
                  <span
                    className="font-mono text-[9px] px-2 py-0.5"
                    style={{ backgroundColor: selectedNode.color + "15", color: selectedNode.color }}
                  >
                    DOMAIN
                  </span>
                </div>
                <p className="font-mono text-[11px] text-muted-foreground/60 mb-4 leading-relaxed">
                  {selectedNode.tagline}
                </p>
                <div className="border-t border-border pt-4 mb-4">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/40 uppercase mb-3">
                    Capabilities ({selectedNode.items.length})
                  </p>
                  <div className="space-y-1.5">
                    {selectedNode.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 py-1.5 px-2 -mx-2 border border-transparent hover:border-border/50 transition-all"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: selectedNode.color }}
                        />
                        <span className="font-mono text-[10px] text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  to={`/solutions/${selectedNode.slug}`}
                  className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase mt-4 py-2 px-3 border border-border hover:bg-secondary/20 transition-all group"
                  style={{ color: selectedNode.color }}
                >
                  Explore <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-20"
              >
                <div className="w-8 h-8 border border-border rounded-full flex items-center justify-center mb-4">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
                </div>
                <p className="font-mono text-[10px] text-muted-foreground/30 tracking-widest uppercase mb-2">
                  Select a domain
                </p>
                <p className="font-mono text-[10px] text-muted-foreground/20 leading-relaxed max-w-[180px]">
                  Click any node to explore capabilities and services
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SolutionsGraph;
