import { useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts, pillarPages } from "@/data/insights";

const publications = [
  {
    type: "journal",
    title: "AI-Assisted SEO: Leveraging Machine Learning for Search Engine Optimization",
    source: "International Journal of Scientific Research in Computer Science, Engineering and Information Technology",
    year: "2023",
    link: "#",
  },
  {
    type: "journal",
    title: "Google, SEO and Helpful Content: How AI Can Be Helpful for E-Commerce Websites",
    source: "Journal of Digital & Social Media Marketing",
    year: "2024",
    link: "#",
  },
];

const Publications = () => {
  useEffect(() => {
    document.title = "Publications & Research | Venkata Pagadala";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Published research on AI-assisted SEO and machine learning for search optimization. Journal publications and thought leadership.";
    if (meta) meta.setAttribute("content", content);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">
            {"{04}"} — Publications
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground text-glow mb-16">
            Thought Leadership
          </h2>
        </ScrollReveal>

        {/* Badge */}
        <ScrollReveal>
          <div className="border border-foreground/30 inline-block px-6 py-3 mb-12 border-glow">
            <span className="font-mono text-xs text-foreground tracking-widest uppercase">
              ★ Top Organic Search Voice — LinkedIn
            </span>
          </div>
        </ScrollReveal>

        {/* Featured publications */}
        {publications.map((pub, i) => (
          <ScrollReveal key={pub.title} delay={i * 100}>
            <div className="border border-border p-8 mb-6 border-glow-hover">
              <p className="font-mono text-[10px] text-muted-foreground/40 tracking-widest uppercase mb-4">
                Featured Publication
              </p>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                {pub.title}
              </h3>
              <p className="font-mono text-xs text-muted-foreground mb-4 leading-relaxed">
                {pub.source}
              </p>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-muted-foreground/40">{pub.year}</span>
                <a href={pub.link} className="inline-flex items-center gap-1 font-mono text-xs text-foreground hover:text-glow transition-all">
                  Read Paper <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </ScrollReveal>
        ))}

        {/* Pillar Pages CTA */}
        <ScrollReveal delay={200}>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6 mt-16 uppercase">
            In-Depth Guides
          </p>
        </ScrollReveal>

        <div className="space-y-4 mb-16">
          {pillarPages.map((pillar, i) => (
            <ScrollReveal key={pillar.slug} delay={250 + i * 80}>
              <Link
                to={`/insights/${pillar.slug}`}
                className="block border border-border p-6 border-glow-hover group hover:bg-secondary/20 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground/40 tracking-widest uppercase mb-2">
                      Pillar Guide
                    </p>
                    <h4 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-glow transition-all">
                      {pillar.headline}
                    </h4>
                    <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                      {pillar.description.slice(0, 150)}...
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-muted-foreground group-hover:text-foreground transition-all mt-1 flex-shrink-0" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Blog posts */}
        <ScrollReveal delay={200}>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6 uppercase">
            Latest Insights
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={250 + i * 80}>
              <Link
                to={`/insights/${post.pillarSlug}/${post.slug}`}
                className="block border border-border p-6 border-glow-hover group hover:bg-secondary/20 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground/40 mb-2">{post.date}</p>
                    <h4 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-glow transition-all">
                      {post.title}
                    </h4>
                    <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-muted-foreground group-hover:text-foreground transition-all mt-1 flex-shrink-0" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publications;
