import ScrollReveal from "./ScrollReveal";
import { Code, Palette, Server, Smartphone, Database, Globe, Layout, Terminal } from "lucide-react";

const skills = [
  { name: "React", icon: Code, color: "text-primary" },
  { name: "TypeScript", icon: Terminal, color: "text-navy" },
  { name: "Node.js", icon: Server, color: "text-burgundy" },
  { name: "Tailwind CSS", icon: Palette, color: "text-primary" },
  { name: "Bases de Datos", icon: Database, color: "text-navy" },
  { name: "Responsive", icon: Smartphone, color: "text-burgundy" },
  { name: "UI/UX", icon: Layout, color: "text-primary" },
  { name: "APIs REST", icon: Globe, color: "text-navy" },
];

const services = [
  { title: "Desarrollo Web", desc: "Sitios y aplicaciones web modernas con React y tecnologías de vanguardia.", icon: Globe },
  { title: "Diseño UI/UX", desc: "Interfaces elegantes, intuitivas y centradas en la experiencia del usuario.", icon: Palette },
  { title: "Backend & APIs", desc: "Arquitectura de servidor robusta, segura y escalable.", icon: Server },
];

const SkillsSection = () => {
  return (
    <section id="habilidades" className="py-24 sm:py-32 bg-cream-warm/30">
      <div className="section-container">
        <ScrollReveal>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-center mb-4 text-gradient">
            Habilidades & Servicios
          </h2>
          <p className="text-center text-muted-foreground font-sans max-w-xl mx-auto mb-16">
            Las herramientas con las que construyo y los servicios que ofrezco.
          </p>
        </ScrollReveal>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="glass-card p-5 text-center group hover:scale-105 transition-all duration-300 cursor-default">
                  <Icon size={32} className={`mx-auto mb-3 ${skill.color} group-hover:scale-110 transition-transform duration-300`} />
                  <span className="font-sans text-sm font-medium text-foreground">{skill.name}</span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card p-8 group hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
