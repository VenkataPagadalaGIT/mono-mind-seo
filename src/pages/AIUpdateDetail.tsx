import { useParams, Link, Navigate } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { aiUpdates, CATEGORY_META } from "@/data/aiUpdates";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";

const AIUpdateDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const update = aiUpdates.find((u) => u.slug === slug);

  if (!update) return <Navigate to="/ai-updates" replace />;

  const catMeta = CATEGORY_META[update.category];

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <SEO
        title={`${update.title} | AI Updates | Venkata Pagadala`}
        description={update.summary}
        canonical={`https://venkatapagadala.com/ai-updates/${update.slug}`}
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: update.title,
          description: update.summary,
          datePublished: update.date,
          dateModified: update.date,
          author: { "@type": "Person", name: "Venkata Pagadala" },
          publisher: { "@type": "Person", name: "Venkata Pagadala" },
          url: `https://venkatapagadala.com/ai-updates/${update.slug}`,
        }}
      />
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <Link
            to="/ai-updates"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={12} /> All AI Updates
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border"
              style={{ borderColor: catMeta.color, color: catMeta.color }}
            >
              {catMeta.label}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/40 flex items-center gap-1">
              <Calendar size={10} />
              {new Date(update.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/30">{update.company}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            {update.title}
          </h1>

          <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8 border-l-2 border-foreground/20 pl-4">
            {update.summary}
          </p>

          <div
            className="prose prose-sm prose-invert max-w-none font-mono text-sm leading-[1.9] text-muted-foreground
              [&_h3]:text-foreground [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3
              [&_ul]:space-y-2 [&_li]:text-muted-foreground [&_strong]:text-foreground/80
              [&_p]:mb-4"
            dangerouslySetInnerHTML={{ __html: update.body }}
          />

          <div className="flex flex-wrap gap-1.5 mt-8 mb-8">
            {update.tags.map((tag) => (
              <span key={tag} className="font-mono text-[9px] text-muted-foreground/40 border border-border/50 px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>

          <a
            href={update.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-foreground/60 hover:text-foreground border border-border px-4 py-2 transition-colors"
          >
            <ExternalLink size={12} /> View Original Source
          </a>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default AIUpdateDetail;
