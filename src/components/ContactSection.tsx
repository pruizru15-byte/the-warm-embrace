import { useState } from "react";
import { Send, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "./ScrollReveal";

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Por favor completa todos los campos", variant: "destructive" });
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast({ title: "¡Mensaje enviado!", description: "Gracias por escribirme. Te responderé pronto." });
      setForm({ name: "", email: "", message: "" });
      setSending(false);
    }, 1000);
  };

  return (
    <section id="contacto" className="py-24 sm:py-32 bg-cream-warm/30">
      <div className="section-container">
        <ScrollReveal>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-center mb-4 text-gradient">
            Contacto
          </h2>
          <p className="text-center text-muted-foreground font-sans max-w-xl mx-auto mb-16">
            ¿Tienes un proyecto en mente o simplemente quieres saludar? Escríbeme.
          </p>
        </ScrollReveal>

        <div className="max-w-xl mx-auto">
          <ScrollReveal>
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <div>
                <Input
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-background/50 border-border font-sans"
                  maxLength={100}
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Tu email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-background/50 border-border font-sans"
                  maxLength={255}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Tu mensaje..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-background/50 border-border font-sans min-h-[120px]"
                  maxLength={1000}
                />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans"
              >
                {sending ? "Enviando..." : "Enviar mensaje"}
                <Send size={16} className="ml-2" />
              </Button>
            </form>
          </ScrollReveal>

          {/* Social */}
          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-center gap-4 mt-10">
              {socials.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
