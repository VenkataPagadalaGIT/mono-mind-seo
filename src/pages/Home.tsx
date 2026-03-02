import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import WireframeGrid from "@/components/WireframeGrid";
import FloatingBlocks from "@/components/FloatingBlocks";
import TypewriterText from "@/components/TypewriterText";
import SolutionsGraph from "@/components/SolutionsGraph";
import ScrollReveal from "@/components/ScrollReveal";

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      <div className="relative min-h-screen flex flex-col items-center justify-center">
      <WireframeGrid />
      <FloatingBlocks />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6 uppercase">
          [ Portfolio ]
        </p>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-foreground text-glow mb-4">
          Venkata Pagadala
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-6">
          {[
            { label: "Impressions", value: "404K+" },
            { label: "Followers", value: "18K+" },
            { label: "Connections", value: "500+" },
            { label: "Reach", value: "132K+" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-1.5">
              <span className="font-mono text-sm sm:text-base font-bold text-foreground">{stat.value}</span>
              <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="h-8 flex items-center justify-center">
          <TypewriterText
            words={[
              "AI Product Manager — Search",
              "Lead Technical Product Manager",
              "Published Researcher",
              "Enterprise SEO & Automation",
            ]}
            className="font-mono text-sm sm:text-base text-muted-foreground"
          />
        </div>

        <div className="mt-16">
          <Link
            to="/about"
            className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="font-mono text-xs tracking-widest uppercase">Explore</span>
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Bottom coordinates */}
      <div className="absolute bottom-8 left-8 font-mono text-[10px] text-muted-foreground/40">
        33.7490° N, 84.3880° W
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[10px] text-muted-foreground/40">
        ATLANTA, GA
      </div>
      </div>

      {/* Services Section */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-24 pb-20">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/40 uppercase mb-3">
              What I Do
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-glow mb-3">
              Enterprise to Startup — Full-Stack SEO & AI
            </h2>
            <p className="font-mono text-xs text-muted-foreground max-w-xl mx-auto">
              From Fortune 500 search programs to growth-stage consulting — strategy, execution, and everything in between.
            </p>
          </div>
        </ScrollReveal>
        <SolutionsGraph />
      </div>
    </div>
  );
};

export default Home;
