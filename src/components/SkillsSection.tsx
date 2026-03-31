import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Code, Palette, Server, Smartphone, Database, Globe, Layout, Terminal, Zap, GitBranch, Cloud, Shield } from "lucide-react";

const skills = [
  { name: "React", icon: Code, level: 90, color: "from-primary to-rose-deep" },
  { name: "TypeScript", icon: Terminal, level: 85, color: "from-navy to-accent" },
  { name: "Node.js", icon: Server, level: 80, color: "from-burgundy to-rose-deep" },
  { name: "Tailwind CSS", icon: Palette, level: 92, color: "from-primary to-gold-warm" },
  { name: "Bases de Datos", icon: Database, level: 75, color: "from-navy to-burgundy" },
  { name: "Responsive", icon: Smartphone, level: 95, color: "from-primary to-navy" },
  { name: "UI/UX", icon: Layout, level: 82, color: "from-gold-warm to-primary" },
  { name: "APIs REST", icon: Globe, level: 88, color: "from-navy to-primary" },
];

const techMetrics = [
  { label: "Líneas de código", value: "50K+", icon: Code },
  { label: "Uptime", value: "99.9%", icon: Zap },
  { label: "Repos activos", value: "15+", icon: GitBranch },
  { label: "Deploy Cloud", value: "24/7", icon: Cloud },
];

const services = [
  { title: "Desarrollo Web", desc: "Sitios y aplicaciones web modernas con React y tecnologías de vanguardia.", icon: Globe, tech: ["React", "Next.js", "Vite"] },
  { title: "Diseño UI/UX", desc: "Interfaces elegantes, intuitivas y centradas en la experiencia del usuario.", icon: Palette, tech: ["Figma", "Tailwind", "Framer"] },
  { title: "Backend & APIs", desc: "Arquitectura de servidor robusta, segura y escalable.", icon: Server, tech: ["Node.js", "PostgreSQL", "REST"] },
  { title: "Seguridad", desc: "Prácticas de seguridad modernas para proteger datos y aplicaciones.", icon: Shield, tech: ["Auth", "JWT", "HTTPS"] },
];

const SkillBar = ({ name, level, icon: Icon, color, index }: { name: string; level: number; icon: any; color: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="glass-card p-4 group hover:scale-[1.02] transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
            <Icon size={16} className="text-primary" />
          </div>
          <span className="font-sans text-sm font-medium text-foreground">{name}</span>
        </div>
        <span className="font-mono text-xs text-primary font-semibold">
          {isInView ? level : 0}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay: index * 0.08 + 0.3, duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="habilidades" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle, hsl(220 55% 22%) 1px, transparent 1px)`,
        backgroundSize: "30px 30px"
      }} />

      <div className="section-container relative z-10">
        <ScrollReveal>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-center mb-4 text-gradient">
            Tech Stack
          </h2>
          <p className="text-center text-muted-foreground font-sans max-w-xl mx-auto mb-6">
            Las herramientas con las que construyo y los servicios que ofrezco.
          </p>
        </ScrollReveal>

        {/* Tech Metrics Bar */}
        <ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
            {techMetrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card px-4 py-3 flex items-center gap-3 group"
                >
                  <Icon size={16} className="text-primary shrink-0" />
                  <div>
                    <div className="font-mono text-sm font-bold text-foreground">{metric.value}</div>
                    <div className="font-sans text-[10px] text-muted-foreground uppercase tracking-wider">{metric.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Skills with progress */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-20">
          {skills.map((skill, i) => (
            <SkillBar key={i} {...skill} index={i} />
          ))}
        </div>

        {/* Services */}
        <ScrollReveal>
          <h3 className="font-serif text-2xl font-bold text-center mb-10 text-navy">Servicios</h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card p-6 group hover:-translate-y-2 transition-all duration-300 h-full relative overflow-hidden">
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">{service.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.tech.map((t, j) => (
                        <span key={j} className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
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
