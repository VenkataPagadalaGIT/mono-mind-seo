import { useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ParticleCanvas from "@/components/ParticleCanvas";
import { Mail, MapPin, Linkedin } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact | Venkata Pagadala — AI & SEO Consulting";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Get in touch with Venkata Pagadala for AI systems consulting, enterprise SEO, and technical product management.";
    if (meta) meta.setAttribute("content", content);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6 relative">
      <ParticleCanvas />

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">
            {"{05}"} — Contact
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground text-glow mb-16">
            Get in Touch
          </h2>
        </ScrollReveal>

        <div className="max-w-md mx-auto">
          <ScrollReveal>
            <div className="space-y-8">
              <a
                href="mailto:vdepagadala@gmail.com"
                className="flex items-center gap-4 font-mono text-sm text-muted-foreground hover:text-foreground transition-all group border border-border/40 hover:border-foreground/30 px-6 py-4"
              >
                <Mail size={18} className="group-hover:text-foreground transition-all" />
                <div>
                  <span className="block text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-1">Email</span>
                  vdepagadala@gmail.com
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/venkata-pagadala/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 font-mono text-sm text-muted-foreground hover:text-foreground transition-all group border border-border/40 hover:border-foreground/30 px-6 py-4"
              >
                <Linkedin size={18} className="group-hover:text-foreground transition-all" />
                <div>
                  <span className="block text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-1">Follow & Connect</span>
                  linkedin.com/in/venkata-pagadala
                </div>
              </a>

              <div className="flex items-center gap-4 font-mono text-sm text-muted-foreground border border-border/40 px-6 py-4">
                <MapPin size={18} />
                <div>
                  <span className="block text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-1">Location</span>
                  Atlanta, GA
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[10px] text-muted-foreground/40">
            © 2026 Venkata Pagadala. All rights reserved.
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/40">
            Built with precision.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
