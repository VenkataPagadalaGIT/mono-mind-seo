import HolographicCards from "@/components/HolographicCards";
import WireframeGrid from "@/components/WireframeGrid";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";

const Experience = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6 relative overflow-hidden">
      <SEO
        title="4D Experience | Holographic Systems | Venkata Pagadala"
        description="An immersive 4D holographic visualization of venture-ready AI systems — phase-shifted, interactive, and unlike anything you've seen."
        canonical="https://venkatapagadala.com/experience"
      />

      <WireframeGrid />

      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground/30 uppercase mb-4">
              [ Dimension W ]
            </p>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground text-glow mb-4 tracking-tight">
              4D Systems
            </h1>
            <p className="font-mono text-xs text-muted-foreground/50 max-w-lg mx-auto leading-relaxed">
              Venture-ready AI assets projected from 4-dimensional phase space.
              Hover to shift dimensions. Each card exists at a unique phase angle
              along the W-axis.
            </p>
          </div>
        </ScrollReveal>

        <HolographicCards />
      </div>
    </div>
  );
};

export default Experience;
