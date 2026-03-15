import { useState, useCallback, useEffect } from "react";
import { Network, LayoutGrid } from "lucide-react";
import { AI_SEGMENTS, SEGMENT_COLORS, aiContributors, type AIContributor } from "@/data/aiContributors";
import AIContributorGraph from "./AIContributorGraph";
import AIContributorDirectory from "./AIContributorDirectory";
import AIContributorProfile from "./AIContributorProfile";

interface Props {
  onExplore?: (id: string) => void;
}

const AIContributorsExplorer = ({ onExplore }: Props) => {
  const [view, setView] = useState<"graph" | "directory">("graph");
  const [selectedContributor, setSelectedContributor] = useState<AIContributor | null>(null);
  const [filterSegment, setFilterSegment] = useState<string>("");

  const handleSelect = useCallback((contributor: AIContributor) => {
    setSelectedContributor((prev) => (prev?.id === contributor.id ? null : contributor));
    onExplore?.(contributor.id);
  }, [onExplore]);

  const handleSelectById = useCallback((id: string) => {
    const c = aiContributors.find((c) => c.id === id);
    if (c) {
      setSelectedContributor(c);
      onExplore?.(c.id);
    }
  }, [onExplore]);

  const handleClose = useCallback(() => {
    setSelectedContributor(null);
  }, []);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-1 border border-border p-0.5">
          <button
            onClick={() => setView("graph")}
            className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all ${
              view === "graph"
                ? "bg-foreground text-background"
                : "text-muted-foreground/50 hover:text-foreground"
            }`}
          >
            <Network size={12} />
            Graph
          </button>
          <button
            onClick={() => setView("directory")}
            className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all ${
              view === "directory"
                ? "bg-foreground text-background"
                : "text-muted-foreground/50 hover:text-foreground"
            }`}
          >
            <LayoutGrid size={12} />
            Directory
          </button>
        </div>

        <select
          value={filterSegment}
          onChange={(e) => setFilterSegment(e.target.value)}
          className="bg-background border border-border px-3 py-1.5 font-mono text-[10px] text-foreground focus:outline-none focus:border-foreground/30 transition-colors"
        >
          <option value="">All Segments</option>
          {AI_SEGMENTS.map((seg) => (
            <option key={seg} value={seg}>{seg}</option>
          ))}
        </select>
      </div>

      {/* Segment Legend */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(filterSegment ? [filterSegment] : [...new Set(AI_SEGMENTS)]).map((seg) => (
          <button
            key={seg}
            onClick={() => setFilterSegment(filterSegment === seg ? "" : seg)}
            className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground/50 hover:text-foreground transition-colors"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: SEGMENT_COLORS[seg] || "#888" }}
            />
            {seg}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        <div>
          {view === "graph" ? (
            <AIContributorGraph
              onSelect={handleSelect}
              selectedId={selectedContributor?.id}
              filterSegment={filterSegment || undefined}
            />
          ) : (
            <AIContributorDirectory
              onSelect={handleSelect}
              selectedId={selectedContributor?.id}
              filterSegment={filterSegment || undefined}
            />
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          {selectedContributor ? (
            <AIContributorProfile
              contributor={selectedContributor}
              onClose={handleClose}
              onSelectContributor={handleSelectById}
            />
          ) : (
            <div className="border border-border border-dashed p-8 text-center">
              <p className="font-mono text-xs text-muted-foreground/30">
                {view === "graph" ? "Click a node" : "Click a card"} to view profile
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIContributorsExplorer;
