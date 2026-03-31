import { ExternalLink, GitBranch, Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    name: "portafolio-personal",
    description: "Mi sitio web personal construido con React, Vite y Tailwind CSS. Donde el código se encuentra con la poesía.",
    language: "TypeScript",
    stars: 12,
    url: "#",
  },
  {
    name: "api-poemas",
    description: "API REST para gestionar una colección de poemas con autenticación y búsqueda avanzada.",
    language: "Node.js",
    stars: 8,
    url: "#",
  },
  {
    name: "chat-literario",
    description: "Aplicación de chat en tiempo real con temática literaria y rooms temáticos.",
    language: "React",
    stars: 15,
    url: "#",
  },
  {
    name: "gestor-tareas-cli",
    description: "Herramienta CLI para gestión de tareas con interfaz minimalista en terminal.",
    language: "Python",
    stars: 5,
    url: "#",
  },
];

const langColors: Record<string, string> = {
  TypeScript: "bg-navy",
  "Node.js": "bg-burgundy",
  React: "bg-primary",
  Python: "bg-gold-warm",
};

const ProjectsSection = () => {
  return (
    <section id="proyectos" className="py-24 sm:py-32">
      <div className="section-container">
        <ScrollReveal>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-center mb-4 text-gradient">
            Proyectos
          </h2>
          <p className="text-center text-muted-foreground font-sans max-w-xl mx-auto mb-16">
            Lo que he construido — cada repositorio cuenta una historia.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <a href={project.url} className="glass-card p-6 block group hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <GitBranch size={18} className="text-primary" />
                    <h3 className="font-sans text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="font-sans text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${langColors[project.language] || "bg-muted"}`} />
                    <span className="font-sans text-xs text-muted-foreground">{project.language}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star size={14} />
                    <span className="font-sans text-xs">{project.stars}</span>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
