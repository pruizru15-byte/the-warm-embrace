import { useState } from "react";
import { Send, Github, Twitter, Linkedin, Instagram, Facebook, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "./ScrollReveal";
import { useSocials } from "@/hooks/useData";
import { supabase } from "@/lib/supabase";

const ICON_MAP: Record<string, any> = {
  Github, Twitter, Linkedin, Instagram, Facebook, Mail, Globe
};

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();
  const { data: socialsData, isLoading: socialsLoading } = useSocials();

  const socials = socialsData || [
    { icon: "Github", url: "#", label: "GitHub" },
    { icon: "Twitter", url: "#", label: "Twitter" },
    { icon: "Linkedin", url: "#", label: "LinkedIn" },
    { icon: "Instagram", url: "#", label: "Instagram" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Por favor completa todos los campos", variant: "destructive" });
      return;
    }
    
    setSending(true);

    try {
      // Guardamos el mensaje en Supabase
      const { error } = await supabase.from('mensajes').insert({
        nombre: form.name,
        email: form.email,
        mensaje: form.message
      });

      if (error) throw error;

      toast({ 
        title: "¡Mensaje recibido!", 
        description: "Se ha guardado en mi base de datos. Te responderé pronto a " + form.email 
      });
      
      setForm({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast({ 
        title: "Error al enviar", 
        description: "No pude guardar tu mensaje. Inténtalo de nuevo más tarde.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
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
            <br />
            <span className="text-xs italic opacity-70">Los mensajes se enviarán a rpieroalexandro@gmail.com</span>
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
                  required
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
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Tu mensaje..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-background/50 border-border font-sans min-h-[120px]"
                  maxLength={1000}
                  required
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
            <div className={`flex items-center justify-center gap-4 mt-10 ${socialsLoading ? 'animate-pulse' : ''}`}>
              {socials.map((social: any, i: number) => {
                const Icon = typeof social.icon === 'string' ? (ICON_MAP[social.icon] || Globe) : social.icon;
                return (
                  <a
                    key={i}
                    href={social.url || social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
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
