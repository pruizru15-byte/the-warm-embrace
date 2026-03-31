import { useRef } from "react";
import { ExternalLink, Github, Terminal, Cpu } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useProjects } from "@/hooks/useData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const ProjectsSection = () => {
  const { data: projects, isLoading } = useProjects();
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const defaultProjects = [
    { title: "portafolio-personal", description: "Sitio web personal con React y Tailwind.", language: "TypeScript", stars: 12, url: "#" },
    { title: "api-poemas", description: "API REST para gestión de poemas.", language: "Node.js", stars: 8, url: "#" },
    { title: "nexus-chat", description: "Chat en tiempo real con WebSockets.", language: "React", stars: 15, url: "#" },
    { title: "zen-editor", description: "Editor de texto minimalista.", language: "JavaScript", stars: 20, url: "#" },
    { title: "solar-system", description: "Simulador 3D del sistema solar.", language: "Three.js", stars: 30, url: "#" },
  ];

  const displayProjects = projects || (isLoading ? [] : defaultProjects);

  return (
    <section id="proyectos" className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="section-container relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4 text-gradient">
                Proyectos
              </h2>
              <p className="text-muted-foreground font-sans max-w-xl">
                Una selección de mis creaciones donde el código cobra vida y transforma ideas en realidad.
              </p>
            </div>
            <a 
              href="https://github.com/pruizru15-byte/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-sans font-bold text-primary hover:text-burgundy transition-colors"
            >
              Ver más en GitHub
              <Github size={16} className="group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </ScrollReveal>

        <div className="relative group/carousel">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1, // Default mobile
              breakpoints: {
                "(min-width: 1024px)": { slidesToScroll: 4 }, // Scroll 4 on desktop
              },
            }}
          >
            <CarouselContent className="-ml-4">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                    <div className="glass-card p-8 h-[240px] animate-pulse bg-muted/20" />
                  </CarouselItem>
                ))
              ) : (
                displayProjects.map((project: any, i: number) => (
                  <CarouselItem key={project.id || i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                    <ScrollReveal delay={i * 0.1}>
                      <div className="glass-card p-8 h-[240px] flex flex-col group/card hover:border-primary/40 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover/card:scale-110 transition-transform">
                            {i % 2 === 0 ? <Terminal size={20} /> : <Cpu size={20} />}
                          </div>
                          <a 
                            href={project.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ExternalLink size={18} />
                          </a>
                        </div>
                        <h3 className="font-serif text-xl font-bold mb-2 group-hover/card:text-primary transition-colors line-clamp-1">
                          {project.name || project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-sans line-clamp-3 mb-4 flex-1">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs font-mono text-primary/70">{project.language}</span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-warm" />
                            {project.stars} stars
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
            
            {/* Minimalist Arrows on hover */}
            <CarouselPrevious className="hidden lg:flex -left-12 opacity-0 group-hover/carousel:opacity-100 transition-opacity border-none bg-transparent hover:bg-transparent text-primary hover:scale-125" />
            <CarouselNext className="hidden lg:flex -right-12 opacity-0 group-hover/carousel:opacity-100 transition-opacity border-none bg-transparent hover:bg-transparent text-primary hover:scale-125" />
          </Carousel>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-3xl -z-10 rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-burgundy/5 blur-3xl -z-10 rounded-full" />
    </section>
  );
};

export default ProjectsSection;
