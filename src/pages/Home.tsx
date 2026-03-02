import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import WireframeGrid from "@/components/WireframeGrid";
import FloatingBlocks from "@/components/FloatingBlocks";
import TypewriterText from "@/components/TypewriterText";

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
      <WireframeGrid />
      <FloatingBlocks />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6 uppercase">
          [ Portfolio ]
        </p>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-foreground text-glow mb-6">
          Venkata Pagadala
        </h1>

        <div className="h-8 flex items-center justify-center">
          <TypewriterText
            words={[
              "AI Product Owner",
              "Technical SEO Lead",
              "Published Researcher",
              "Enterprise Search Strategist",
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
  );
};

export default Home;
