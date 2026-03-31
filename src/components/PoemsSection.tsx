import { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { usePoems } from "@/hooks/useData";
import PoemCard from "./PoemCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const PoemsSection = () => {
  const { data: poemsData, isLoading } = usePoems();
  const [reactionCounts, setReactionCounts] = useState<any[]>([]);
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (poemsData) {
      setReactionCounts(
        poemsData.map((p: any) => ({
          love: p.reactions_love || 0,
          spark: p.reactions_spark || 0,
          book: p.reactions_book || 0,
        }))
      );
    }
  }, [poemsData]);

  const handleReaction = (poemIdx: number, type: "love" | "spark" | "book") => {
    setReactionCounts((prev) =>
      prev.map((r, i) => (i === poemIdx ? { ...r, [type]: r[type] + 1 } : r))
    );
    // TODO: Implement Supabase mutation to persist reactions if needed
  };

  const defaultPoems = [
    {
      title: "Código y Alma",
      lines: ["Entre llaves y puntos,", "se esconde un suspiro,", "cada línea que escribo", "es un verso que respiro."],
      reactions: { love: 12, spark: 8, book: 3 },
    },
    {
      title: "Silencio Digital",
      lines: ["En el vacío del bit,", "busco el latido,", "donde el cero y el uno", "cobran sentido."],
      reactions: { love: 5, spark: 10, book: 2 },
    },
    {
      title: "La Danza del Compilador",
      lines: ["Errores que bailan,", "bugs que se van,", "líneas que riman,", "sueños que están."],
      reactions: { love: 8, spark: 12, book: 4 },
    },
    {
      title: "Memoria del Mañana",
      lines: ["Almaceno suspiros,", "cacheo emociones,", "limpio mis dudas,", "creo ilusiones."],
      reactions: { love: 20, spark: 5, book: 15 },
    },
  ];

  const displayPoems = poemsData || (isLoading ? [] : defaultPoems);

  return (
    <section id="poemas" className="py-24 sm:py-32 bg-cream-warm/30 overflow-hidden">
      <div className="section-container">
        <ScrollReveal>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-center mb-4 text-gradient">
            Rincón Literario
          </h2>
          <p className="text-center text-muted-foreground font-sans max-w-xl mx-auto mb-16">
            Palabras que nacen donde el código termina — mi espacio más íntimo.
          </p>
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
              slidesToScroll: 1,
              breakpoints: {
                "(min-width: 1024px)": { slidesToScroll: 3 }, // 3 fits better for poems with text
              },
            }}
          >
            <CarouselContent className="-ml-6">
              {displayPoems.map((poem: any, i: number) => (
                <CarouselItem key={poem.id || i} className="pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                  <PoemCard 
                    poem={poem}
                    index={i}
                    reactionCounts={reactionCounts[i] || { love: 0, spark: 0, book: 0 }}
                    onReaction={(type) => handleReaction(i, type)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Arrows revealed on hover */}
            <CarouselPrevious className="hidden lg:flex -left-12 opacity-0 group-hover/carousel:opacity-100 transition-opacity border-none bg-transparent hover:bg-transparent text-primary hover:scale-125" />
            <CarouselNext className="hidden lg:flex -right-12 opacity-0 group-hover/carousel:opacity-100 transition-opacity border-none bg-transparent hover:bg-transparent text-primary hover:scale-125" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default PoemsSection;
