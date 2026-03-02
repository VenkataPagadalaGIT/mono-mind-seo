import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ParticleCanvas from "@/components/ParticleCanvas";
import { Mail, MapPin, Linkedin } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only — no backend
    alert("Thanks for reaching out! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

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

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <ScrollReveal>
            <div className="space-y-6">
              <a href="mailto:vdepagadala@gmail.com" className="flex items-center gap-4 font-mono text-sm text-muted-foreground hover:text-foreground transition-all group">
                <Mail size={16} className="group-hover:text-foreground transition-all" />
                vdepagadala@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/venkata-pagadala/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 font-mono text-sm text-muted-foreground hover:text-foreground transition-all group">
                <Linkedin size={16} className="group-hover:text-foreground transition-all" />
                linkedin.com/in/venkata-pagadala
              </a>
              <a href="https://www.linkedin.com/in/venkata-pagadala/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 font-mono text-sm text-muted-foreground hover:text-foreground transition-all group">
                <Linkedin size={16} className="group-hover:text-foreground transition-all" />
                linkedin.com/in/venkata-pagadala
              </a>
              <div className="flex items-center gap-4 font-mono text-sm text-muted-foreground">
                <MapPin size={16} />
                Atlanta, GA
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={200}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-transparent border border-border px-4 py-3 font-mono text-sm text-foreground focus:outline-none focus:border-foreground/40 transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full bg-transparent border border-border px-4 py-3 font-mono text-sm text-foreground focus:outline-none focus:border-foreground/40 transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase block mb-2">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full bg-transparent border border-border px-4 py-3 font-mono text-sm text-foreground focus:outline-none focus:border-foreground/40 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full border border-foreground/60 px-6 py-3 font-mono text-xs tracking-widest uppercase text-foreground hover:bg-foreground hover:text-background transition-all"
              >
                Send Message
              </button>
            </form>
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
