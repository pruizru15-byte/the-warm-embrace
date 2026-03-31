import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, BookOpen } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const poems = [
  {
    title: "Código y Alma",
    lines: [
      "Entre llaves y puntos,",
      "se esconde un suspiro,",
      "cada línea que escribo",
      "es un verso que respiro.",
      "",
      "La pantalla ilumina",
      "lo que el alma dibuja,",
      "compilando emociones",
      "que ningún bug empuja.",
    ],
    reactions: { love: 12, spark: 8, book: 3 },
  },
  {
    title: "Letras de Medianoche",
    lines: [
      "Cuando el mundo duerme,",
      "mis dedos despiertan,",
      "tecleando verdades",
      "que los labios no aciertan.",
      "",
      "El cursor parpadea",
      "como estrella perdida,",
      "esperando una línea",
      "que le cambie la vida.",
    ],
    reactions: { love: 24, spark: 15, book: 7 },
  },
  {
    title: "Conexión Antigua",
    lines: [
      "No necesito WiFi",
      "para sentir tu señal,",
      "basta con tu mirada",
      "para un ping emocional.",
      "",
      "En este mundo binario",
      "de ceros y de unos,",
      "prefiero tus abrazos",
      "a un millón de puntos.",
    ],
    reactions: { love: 31, spark: 19, book: 11 },
  },
];

const PoemsSection = () => {
  const [reactionCounts, setReactionCounts] = useState(
    poems.map((p) => ({ ...p.reactions }))
  );

  const handleReaction = (poemIdx: number, type: "love" | "spark" | "book") => {
    setReactionCounts((prev) =>
      prev.map((r, i) => (i === poemIdx ? { ...r, [type]: r[type] + 1 } : r))
    );
  };

  return (
    <section id="poemas" className="py-24 sm:py-32 bg-cream-warm/30">
      <div className="section-container">
        <ScrollReveal>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-center mb-4 text-gradient">
            Rincón Literario
          </h2>
          <p className="text-center text-muted-foreground font-sans max-w-xl mx-auto mb-16">
            Palabras que nacen donde el código termina — mi espacio más íntimo.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {poems.map((poem, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="parchment rounded-2xl p-8 h-full flex flex-col">
                <h3 className="font-serif text-2xl font-bold text-burgundy mb-6 text-center italic">
                  {poem.title}
                </h3>
                <div className="flex-1 space-y-1 mb-6">
                  {poem.lines.map((line, j) => (
                    <p key={j} className="font-serif text-foreground/80 text-center text-sm leading-relaxed italic">
                      {line || <br />}
                    </p>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-burgundy/10">
                  {[
                    { type: "love" as const, icon: Heart, label: "Me encanta" },
                    { type: "spark" as const, icon: Sparkles, label: "Inspirador" },
                    { type: "book" as const, icon: BookOpen, label: "Profundo" },
                  ].map((reaction) => {
                    const Icon = reaction.icon;
                    return (
                      <button
                        key={reaction.type}
                        onClick={() => handleReaction(i, reaction.type)}
                        className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors group"
                        title={reaction.label}
                      >
                        <Icon size={18} className="group-hover:scale-110 transition-transform" />
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={reactionCounts[i][reaction.type]}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-xs font-sans font-medium"
                          >
                            {reactionCounts[i][reaction.type]}
                          </motion.span>
                        </AnimatePresence>
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoemsSection;
