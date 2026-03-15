import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ScrollReveal from "@/components/ScrollReveal";

import { aiContributors, SEGMENT_COLORS } from "@/data/aiContributors";
import {
  ArrowLeft, ArrowRight, ExternalLink, GraduationCap, Award, MapPin,
  Quote, BookOpen, Link2, Play, Clock, Linkedin, Github, Share2, Copy, Check
} from "lucide-react";
import { useState } from "react";

const RESOURCE_ICONS: Record<string, string> = {
  paper: "📄", talk: "🎤", interview: "🎙️", book: "📚", podcast: "🎧", project: "🔧",
};

const MEDIA_ICONS: Record<string, typeof Play> = {
  podcast: Play, interview: Play, documentary: Play, lecture: Play,
};

const AIContributorProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contributor = aiContributors.find((c) => c.id === id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCopied(false);
  }, [id]);

  if (!contributor) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-20 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-sm text-muted-foreground mb-4">Contributor not found</p>
          <Link to="/ai-contributors" className="font-mono text-xs text-foreground underline">
            ← Back to AI Notebook
          </Link>
        </div>
      </div>
    );
  }

  const color = SEGMENT_COLORS[contributor.segment] || "#888";
  const connectedContributors = (contributor.connections || [])
    .map((cId) => aiContributors.find((c) => c.id === cId))
    .filter(Boolean);

  // Find prev/next by rank
  const sorted = [...aiContributors].sort((a, b) => a.rank - b.rank);
  const currentIdx = sorted.findIndex((c) => c.id === contributor.id);
  const prev = currentIdx > 0 ? sorted[currentIdx - 1] : null;
  const next = currentIdx < sorted.length - 1 ? sorted[currentIdx + 1] : null;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: contributor.name,
    description: contributor.longBio || contributor.bio,
    jobTitle: contributor.expertType,
    affiliation: {
      "@type": "Organization",
      name: contributor.affiliation,
    },
    nationality: contributor.country,
    award: contributor.awards ? contributor.awards.split(", ") : undefined,
    url: contributor.website || undefined,
    sameAs: [
      contributor.twitter,
      contributor.linkedin,
      contributor.github,
      contributor.googleScholar,
      contributor.youtube,
    ].filter(Boolean),
    knowsAbout: contributor.specialty,
    alumniOf: contributor.education,
  };

  const pageTitle = `${contributor.name} — #${contributor.rank} Top AI Contributor 2026 | AI Notebook`;
  const pageDescription = contributor.longBio || `${contributor.bio} ${contributor.keyInfluence}`;
  const canonicalUrl = `https://mono-mind-seo.lovable.app/ai-contributors/${contributor.id}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription.slice(0, 160)} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription.slice(0, 160)} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription.slice(0, 160)} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <ScrollReveal>
            <nav className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-muted-foreground/40 mb-10">
              <Link to="/ai-contributors" className="hover:text-foreground transition-colors">
                AI Notebook
              </Link>
              <span>/</span>
              <span className="text-muted-foreground/60">{contributor.name}</span>
            </nav>
          </ScrollReveal>

          {/* ── Header ── */}
          <ScrollReveal>
            <div className="flex items-start gap-6 mb-8">
              <div className="shrink-0">
                {contributor.photoUrl ? (
                  <img
                    src={contributor.photoUrl}
                    alt={`Photo of ${contributor.name}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-sm"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center font-mono text-xl sm:text-2xl font-bold text-background"
                    style={{ backgroundColor: color }}
                  >
                    {contributor.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                )}
                {contributor.photoCredit && (
                  <p className="font-mono text-[8px] text-muted-foreground/25 mt-1 max-w-24 leading-tight">
                    {contributor.photoCredit}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="font-mono text-xs text-muted-foreground/30">#{contributor.rank}</span>
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 border uppercase tracking-wider"
                    style={{ borderColor: `${color}40`, color }}
                  >
                    {contributor.expertType}
                  </span>
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 border uppercase tracking-wider"
                    style={{ borderColor: `${color}20`, color: `${color}99` }}
                  >
                    {contributor.segment}
                  </span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-glow mb-2">
                  {contributor.name}
                </h1>
                <p className="font-mono text-sm text-muted-foreground">{contributor.affiliation}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Jump to Section + Share ── */}
          <ScrollReveal delay={30}>
            <div className="border border-border p-5 mb-8">
              <p className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest mb-3">Jump to Section</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  contributor.quote && { label: "Quote", id: "quote" },
                  { label: "Biography", id: "biography" },
                  contributor.whyTheyMatter && { label: "Why They Matter", id: "why" },
                  contributor.myTake && { label: "My Take", id: "my-take" },
                  { label: "Key Influence", id: "influence" },
                  contributor.featuredMedia?.length && { label: "Podcasts", id: "media" },
                  contributor.resources?.length && { label: "Resources", id: "resources" },
                  contributor.milestones?.length && { label: "Timeline", id: "timeline" },
                  { label: "Details", id: "details" },
                  contributor.awards && { label: "Awards", id: "awards" },
                  (contributor.connections?.length ?? 0) > 0 && { label: "Connections", id: "connections" },
                  { label: "Links", id: "links" },
                ].filter(Boolean).map((item: any) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="font-mono text-[10px] border border-border px-2.5 py-1.5 text-muted-foreground/50 hover:text-foreground hover:border-foreground/30 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="border-t border-border pt-4 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest mr-2">Share</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${contributor.name} — #${contributor.rank} Top AI Contributor 2026`)}&url=${encodeURIComponent(`https://mono-mind-seo.lovable.app/ai-contributors/${contributor.id}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] border border-border px-2.5 py-1.5 text-muted-foreground/50 hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  𝕏 Post
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://mono-mind-seo.lovable.app/ai-contributors/${contributor.id}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[10px] border border-border px-2.5 py-1.5 text-muted-foreground/50 hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <Linkedin size={10} /> LinkedIn
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://mono-mind-seo.lovable.app/ai-contributors/${contributor.id}`);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="inline-flex items-center gap-1 font-mono text-[10px] border border-border px-2.5 py-1.5 text-muted-foreground/50 hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  {copied ? <><Check size={10} /> Copied</> : <><Copy size={10} /> Copy Link</>}
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Quote ── */}
          {contributor.quote && (
            <ScrollReveal delay={50}>
              <div id="quote" className="border-l-2 border-foreground/20 pl-6 mb-10 scroll-mt-24">
                <Quote size={16} className="text-muted-foreground/15 mb-2" />
                <p className="font-mono text-sm text-foreground/70 italic leading-[1.9] max-w-2xl">
                  "{contributor.quote}"
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* ── Bio ── */}
          <ScrollReveal delay={100}>
            <div id="biography" className="mb-10 scroll-mt-24">
              <h2 className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest mb-4">Biography</h2>
              <p className="font-mono text-sm text-muted-foreground leading-[1.9] max-w-3xl">
                {contributor.longBio || contributor.bio}
              </p>
            </div>
          </ScrollReveal>

          {/* ── Why They Matter ── */}
          {contributor.whyTheyMatter && (
            <ScrollReveal delay={100}>
              <div id="why" className="border border-foreground/20 bg-foreground/[0.02] p-6 sm:p-8 mb-10 scroll-mt-24">
                <h2 className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-4">
                  Why They Matter
                </h2>
                <p className="font-mono text-sm text-foreground/70 leading-[1.9]">
                  {contributor.whyTheyMatter}
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* ── My Take ── */}
          {contributor.myTake && (
            <ScrollReveal delay={100}>
              <div id="my-take" className="border border-foreground/20 bg-foreground/[0.03] p-6 sm:p-8 mb-10 scroll-mt-24">
                <h2 className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-4">
                  💡 My Take
                </h2>
                <p className="font-mono text-sm text-foreground/70 leading-[1.9]">
                  {contributor.myTake}
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* ── Key Influence ── */}
          <ScrollReveal delay={100}>
            <div id="influence" className="border border-border p-6 mb-10 scroll-mt-24">
              <h2 className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest mb-3">Key Influence</h2>
              <p className="font-mono text-sm text-foreground/80 leading-relaxed">{contributor.keyInfluence}</p>
            </div>
          </ScrollReveal>

          {/* ── Featured Media (Podcasts/Interviews) ── */}
          {contributor.featuredMedia && contributor.featuredMedia.length > 0 && (
            <ScrollReveal delay={100}>
              <div id="media" className="mb-10 scroll-mt-24">
                <h2 className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest mb-6">
                  🎧 Podcasts & Interviews
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {contributor.featuredMedia.map((media, i) => (
                    <a
                      key={i}
                      href={media.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-border p-5 hover:border-foreground/20 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0 group-hover:border-foreground/30 transition-colors">
                          <Play size={14} className="text-muted-foreground/30 group-hover:text-foreground transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-sm font-bold text-foreground group-hover:text-glow transition-all mb-1 line-clamp-2">
                            {media.title}
                          </p>
                          <p className="font-mono text-[10px] text-muted-foreground/40 mb-1">
                            {media.host}
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[9px] text-muted-foreground/20 capitalize">{media.type}</span>
                            {media.duration && (
                              <span className="flex items-center gap-1 font-mono text-[9px] text-muted-foreground/20">
                                <Clock size={8} /> {media.duration}
                              </span>
                            )}
                            {media.year && (
                              <span className="font-mono text-[9px] text-muted-foreground/20">{media.year}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* ── Key Resources ── */}
          {contributor.resources && contributor.resources.length > 0 && (
            <ScrollReveal delay={100}>
              <div id="resources" className="mb-10 scroll-mt-24">
                <h2 className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest mb-6">
                  📄 Key Resources & Papers
                </h2>
                <div className="space-y-3">
                  {contributor.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block border border-border p-5 hover:border-foreground/20 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-sm mt-0.5">{RESOURCE_ICONS[res.type] || "📄"}</span>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="font-display text-sm font-bold text-foreground group-hover:text-glow transition-all">
                              {res.title}
                            </p>
                            <ExternalLink size={10} className="text-muted-foreground/20 group-hover:text-foreground/40 shrink-0 mt-1" />
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-[9px] text-muted-foreground/30 capitalize">{res.type}</span>
                            {res.year && <span className="font-mono text-[9px] text-muted-foreground/20">{res.year}</span>}
                          </div>
                          {res.description && (
                            <p className="font-mono text-[11px] text-muted-foreground/50 leading-relaxed group-hover:text-muted-foreground transition-colors">
                              {res.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* ── Milestones ── */}
          {contributor.milestones && contributor.milestones.length > 0 && (
            <ScrollReveal delay={100}>
              <div id="timeline" className="mb-10 scroll-mt-24">
                <h2 className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest mb-6">
                  Timeline
                </h2>
                <div className="relative pl-6">
                  <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
                  {contributor.milestones.map((m, i) => (
                    <div key={i} className="flex items-start gap-4 mb-4 relative">
                      <div
                        className="absolute left-[-16px] top-1.5 w-3 h-3 border-2 bg-background rounded-full"
                        style={{ borderColor: color }}
                      />
                      <span className="font-mono text-xs text-muted-foreground/30 shrink-0 w-10 font-bold">{m.year}</span>
                      <span className="font-mono text-sm text-muted-foreground leading-relaxed">{m.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* ── Details Grid ── */}
          <ScrollReveal delay={100}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <div className="border border-border p-5">
                <h3 className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-1.5">
                  {contributor.specialty.map((s) => (
                    <span key={s} className="font-mono text-[10px] border border-border px-2 py-1 text-muted-foreground/60">{s}</span>
                  ))}
                </div>
              </div>
              <div className="border border-border p-5">
                <h3 className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest mb-2">Location</h3>
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-muted-foreground/30" />
                  <span className="font-mono text-sm text-muted-foreground">{contributor.country}</span>
                </div>
              </div>
              <div className="border border-border p-5">
                <h3 className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest mb-2">Education</h3>
                <div className="flex items-start gap-2">
                  <GraduationCap size={12} className="text-muted-foreground/30 mt-0.5 shrink-0" />
                  <span className="font-mono text-[11px] text-muted-foreground leading-relaxed">{contributor.education}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Awards ── */}
          {contributor.awards && (
            <ScrollReveal delay={100}>
              <div className="border border-border p-5 mb-10">
                <h3 className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest mb-2">Awards & Recognition</h3>
                <div className="flex items-start gap-2">
                  <Award size={12} className="text-muted-foreground/30 mt-0.5 shrink-0" />
                  <span className="font-mono text-sm text-muted-foreground leading-relaxed">{contributor.awards}</span>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* ── Connected Contributors ── */}
          {connectedContributors.length > 0 && (
            <ScrollReveal delay={100}>
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-6">
                  <Link2 size={14} className="text-muted-foreground/30" />
                  <h2 className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest">
                    Connected Contributors
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {connectedContributors.map((c) => {
                    if (!c) return null;
                    const cColor = SEGMENT_COLORS[c.segment] || "#888";
                    return (
                      <Link
                        key={c.id}
                        to={`/ai-contributors/${c.id}`}
                        className="flex items-center gap-3 border border-border p-4 hover:border-foreground/20 transition-all group"
                      >
                        <div
                          className="w-10 h-10 flex items-center justify-center font-mono text-xs font-bold text-background shrink-0"
                          style={{ backgroundColor: cColor }}
                        >
                          {c.name.split(" ").map((w) => w[0]).join("")}
                        </div>
                        <div>
                          <p className="font-display text-sm font-bold text-foreground group-hover:text-glow transition-all">
                            {c.name}
                          </p>
                          <p className="font-mono text-[9px] text-muted-foreground/30">
                            #{c.rank} · {c.segment}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* ── External Links ── */}
          <ScrollReveal delay={100}>
            <div className="border border-border p-6 mb-10">
              <h2 className="font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest mb-4">Links & Profiles</h2>
              <div className="flex flex-wrap gap-2">
                {contributor.linkedin && (
                  <a href={contributor.linkedin} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-foreground/60 hover:text-foreground border border-border px-3 py-2 transition-colors">
                    <Linkedin size={12} /> LinkedIn <ExternalLink size={8} />
                  </a>
                )}
                {contributor.twitter && (
                  <a href={contributor.twitter} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-foreground/60 hover:text-foreground border border-border px-3 py-2 transition-colors">
                    𝕏 Twitter <ExternalLink size={8} />
                  </a>
                )}
                {contributor.website && (
                  <a href={contributor.website} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-foreground/60 hover:text-foreground border border-border px-3 py-2 transition-colors">
                    Website <ExternalLink size={8} />
                  </a>
                )}
                {contributor.github && (
                  <a href={contributor.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-foreground/60 hover:text-foreground border border-border px-3 py-2 transition-colors">
                    <Github size={12} /> GitHub <ExternalLink size={8} />
                  </a>
                )}
                {contributor.googleScholar && (
                  <a href={contributor.googleScholar} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-foreground/60 hover:text-foreground border border-border px-3 py-2 transition-colors">
                    Scholar <ExternalLink size={8} />
                  </a>
                )}
                {contributor.youtube && (
                  <a href={contributor.youtube} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-foreground/60 hover:text-foreground border border-border px-3 py-2 transition-colors">
                    YouTube <ExternalLink size={8} />
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* ── Prev/Next Navigation ── */}
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {prev ? (
                <Link
                  to={`/ai-contributors/${prev.id}`}
                  className="border border-border p-4 hover:border-foreground/20 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <ArrowLeft size={12} className="text-muted-foreground/30" />
                    <span className="font-mono text-[9px] text-muted-foreground/30 uppercase tracking-widest">Previous</span>
                  </div>
                  <p className="font-display text-sm font-bold text-foreground group-hover:text-glow transition-all">
                    {prev.name}
                  </p>
                  <p className="font-mono text-[9px] text-muted-foreground/30">#{prev.rank}</p>
                </Link>
              ) : <div />}
              {next ? (
                <Link
                  to={`/ai-contributors/${next.id}`}
                  className="border border-border p-4 hover:border-foreground/20 transition-all group text-right"
                >
                  <div className="flex items-center gap-2 mb-1 justify-end">
                    <span className="font-mono text-[9px] text-muted-foreground/30 uppercase tracking-widest">Next</span>
                    <ArrowRight size={12} className="text-muted-foreground/30" />
                  </div>
                  <p className="font-display text-sm font-bold text-foreground group-hover:text-glow transition-all">
                    {next.name}
                  </p>
                  <p className="font-mono text-[9px] text-muted-foreground/30">#{next.rank}</p>
                </Link>
              ) : <div />}
            </div>
          </ScrollReveal>

          {/* ── Back to Notebook ── */}
          <ScrollReveal>
            <div className="border border-border p-6 text-center border-glow-hover">
              <Link
                to="/ai-contributors"
                className="inline-flex items-center gap-2 font-mono text-xs text-foreground hover:text-glow transition-all tracking-widest uppercase"
              >
                <ArrowLeft size={12} /> Back to AI Notebook
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
};

export default AIContributorProfilePage;
