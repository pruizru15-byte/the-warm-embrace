import ScrollReveal from "./ScrollReveal";
import { GraduationCap, Target, BookOpen, Rocket } from "lucide-react";

const timeline = [
  { year: "2020", title: "Inicio en Programación", desc: "Primeros pasos con HTML, CSS y JavaScript", icon: BookOpen },
  { year: "2021", title: "Estudios Formales", desc: "Ingeniería en Sistemas / Desarrollo de Software", icon: GraduationCap },
  { year: "2023", title: "Especialización", desc: "Desarrollo Full-Stack con React y tecnologías modernas", icon: Target },
  { year: "2025", title: "Futuro", desc: "Inteligencia Artificial, contribuir al open source y crear impacto", icon: Rocket },
];

const AboutSection = () => {
  return (
    <section id="sobre-mi" className="py-24 sm:py-32">
      <div className="section-container">
        <ScrollReveal>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-center mb-4 text-gradient">
            Sobre Mí
          </h2>
          <p className="text-center text-muted-foreground font-sans max-w-2xl mx-auto mb-16">
            Mi camino entre letras y líneas de código — una línea de tiempo de aprendizaje y crecimiento.
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border sm:-translate-x-px" />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;
              return (
                <ScrollReveal key={i} delay={i * 0.15} direction={isLeft ? "left" : "right"}>
                  <div className={`relative flex items-start gap-6 sm:gap-0 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                    {/* Dot */}
                    <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1.5 mt-2 z-10 ring-4 ring-background" />

                    {/* Content */}
                    <div className={`ml-12 sm:ml-0 sm:w-1/2 ${isLeft ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                      <div className="glass-card p-6 inline-block">
                        <div className={`flex items-center gap-3 mb-2 ${isLeft ? "sm:justify-end" : ""}`}>
                          <Icon size={20} className="text-primary" />
                          <span className="text-sm font-sans font-medium text-primary">{item.year}</span>
                        </div>
                        <h3 className="font-serif text-xl font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="font-sans text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Goals Roadmap */}
        <ScrollReveal className="mt-24">
          <h3 className="font-serif text-3xl font-bold text-center mb-10 text-navy">Mis Metas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Corto Plazo", items: ["Dominar TypeScript", "Contribuir a OSS", "Crear mi portafolio definitivo"] },
              { title: "Mediano Plazo", items: ["Trabajar en producto propio", "Aprender IA/ML", "Mentorar a otros"] },
              { title: "Largo Plazo", items: ["Fundar un startup", "Publicar un libro", "Impacto social con tech"] },
            ].map((goal, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card p-6 h-full hover:scale-[1.02] transition-transform duration-300">
                  <h4 className="font-serif text-lg font-semibold text-primary mb-4">{goal.title}</h4>
                  <ul className="space-y-2">
                    {goal.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 font-sans text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
