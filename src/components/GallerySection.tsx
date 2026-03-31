import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  images: string[];
  span: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Mi café favorito",
    description: "Donde nacen las ideas entre el aroma del café y el sonido de las teclas.",
    images: ["https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80"],
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    title: "La biblioteca",
    description: "Refugio de conocimiento donde el tiempo se detiene entre páginas.",
    images: ["https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80"],
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "El parque al atardecer",
    description: "Donde la naturaleza me recuerda la belleza de lo simple.",
    images: ["https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&q=80"],
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    title: "Mi escritorio",
    description: "El lugar donde la magia sucede — entre monitores y libretas.",
    images: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80"],
    span: "col-span-1 row-span-1",
  },
  {
    id: 5,
    title: "Caminatas nocturnas",
    description: "Las luces de la ciudad cuentan historias que inspiran código y poesía.",
    images: ["https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80"],
    span: "col-span-1 row-span-1",
  },
];

const GallerySection = () => {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [currentImg, setCurrentImg] = useState(0);

  return (
    <section id="galeria" className="py-24 sm:py-32">
      <div className="section-container">
        <ScrollReveal>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-center mb-4 text-gradient">
            Momentos & Frecuencia
          </h2>
          <p className="text-center text-muted-foreground font-sans max-w-xl mx-auto mb-16">
            Los lugares que frecuento, los rincones que me inspiran.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.08} className={item.span}>
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => { setSelected(item); setCurrentImg(0); }}
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-lg font-semibold text-primary-foreground">{item.title}</h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 backdrop-blur-sm p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card max-w-2xl w-full overflow-hidden bg-background"
              >
                <div className="relative aspect-video">
                  <img
                    src={selected.images[currentImg]}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                  />
                  {selected.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImg((p) => (p - 1 + selected.images.length) % selected.images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => setCurrentImg((p) => (p + 1) % selected.images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">{selected.title}</h3>
                  <p className="font-sans text-muted-foreground">{selected.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;
