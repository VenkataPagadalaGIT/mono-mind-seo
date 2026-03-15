import { X, ExternalLink, GraduationCap, Award, MapPin } from "lucide-react";
import { SEGMENT_COLORS, type AIContributor } from "@/data/aiContributors";

interface Props {
  contributor: AIContributor;
  onClose: () => void;
}

const AIContributorProfile = ({ contributor, onClose }: Props) => {
  const color = SEGMENT_COLORS[contributor.segment] || "#888";

  return (
    <div className="border border-border bg-background/98 backdrop-blur-md p-6 sm:p-8 relative animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-muted-foreground/40 hover:text-foreground transition-colors"
      >
        <X size={16} />
      </button>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="w-14 h-14 flex items-center justify-center font-mono text-sm font-bold text-background shrink-0"
          style={{ backgroundColor: color }}
        >
          {contributor.name.split(" ").map((w) => w[0]).join("")}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-muted-foreground/30">#{contributor.rank}</span>
            <span
              className="font-mono text-[9px] px-1.5 py-0.5 border uppercase tracking-wider"
              style={{ borderColor: `${color}40`, color }}
            >
              {contributor.expertType}
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground">{contributor.name}</h3>
          <p className="font-mono text-xs text-muted-foreground">{contributor.affiliation}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-6">{contributor.bio}</p>

      {/* Key Influence */}
      <div className="border border-foreground/10 p-4 mb-6">
        <p className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest mb-2">Key Influence</p>
        <p className="font-mono text-xs text-foreground/80 leading-relaxed">{contributor.keyInfluence}</p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Segment */}
        <div>
          <p className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest mb-1">AI Segment</p>
          <p className="font-mono text-xs" style={{ color }}>{contributor.segment}</p>
        </div>

        {/* Specialties */}
        <div>
          <p className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest mb-1">Specialty</p>
          <div className="flex flex-wrap gap-1">
            {contributor.specialty.map((s) => (
              <span key={s} className="font-mono text-[10px] border border-border px-1.5 py-0.5 text-muted-foreground/60">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Country */}
        <div>
          <p className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest mb-1">Country</p>
          <div className="flex items-center gap-1">
            <MapPin size={10} className="text-muted-foreground/40" />
            <span className="font-mono text-xs text-muted-foreground">{contributor.country}</span>
          </div>
        </div>

        {/* Education */}
        <div>
          <p className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest mb-1">Education</p>
          <div className="flex items-start gap-1">
            <GraduationCap size={10} className="text-muted-foreground/40 mt-0.5 shrink-0" />
            <span className="font-mono text-[10px] text-muted-foreground leading-relaxed">{contributor.education}</span>
          </div>
        </div>
      </div>

      {/* Awards */}
      {contributor.awards && (
        <div className="mb-6">
          <p className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest mb-1">Awards & Recognition</p>
          <div className="flex items-start gap-1">
            <Award size={10} className="text-muted-foreground/40 mt-0.5 shrink-0" />
            <span className="font-mono text-[10px] text-muted-foreground leading-relaxed">{contributor.awards}</span>
          </div>
        </div>
      )}

      {/* Links */}
      <div className="border-t border-border pt-4">
        <p className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest mb-3">Links</p>
        <div className="flex flex-wrap gap-2">
          {contributor.twitter && (
            <a href={contributor.twitter} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[10px] text-foreground/60 hover:text-foreground border border-border px-2 py-1 transition-colors">
              𝕏 / Twitter <ExternalLink size={8} />
            </a>
          )}
          {contributor.website && (
            <a href={contributor.website} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[10px] text-foreground/60 hover:text-foreground border border-border px-2 py-1 transition-colors">
              Website <ExternalLink size={8} />
            </a>
          )}
          {contributor.github && (
            <a href={contributor.github} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[10px] text-foreground/60 hover:text-foreground border border-border px-2 py-1 transition-colors">
              GitHub <ExternalLink size={8} />
            </a>
          )}
          {contributor.googleScholar && (
            <a href={contributor.googleScholar} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[10px] text-foreground/60 hover:text-foreground border border-border px-2 py-1 transition-colors">
              Scholar <ExternalLink size={8} />
            </a>
          )}
          {contributor.youtube && (
            <a href={contributor.youtube} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[10px] text-foreground/60 hover:text-foreground border border-border px-2 py-1 transition-colors">
              YouTube <ExternalLink size={8} />
            </a>
          )}
        </div>
      </div>

      {/* My Take placeholder */}
      <div className="border-t border-border pt-4 mt-4">
        <p className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest mb-2">My Take</p>
        <p className="font-mono text-[10px] text-muted-foreground/30 italic">
          Personal learnings and notes coming soon — follow along as I study each contributor's work.
        </p>
      </div>
    </div>
  );
};

export default AIContributorProfile;
