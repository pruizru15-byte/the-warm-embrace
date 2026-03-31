import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, BookOpen, X, Feather } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PoemCardProps {
  poem: {
    id?: string;
    title: string;
    lines: string[];
    reactions?: { love: number; spark: number; book: number };
  };
  index: number;
  reactionCounts: any;
  onReaction: (type: "love" | "spark" | "book") => void;
}

const PoemCard = ({ poem, index, reactionCounts, onReaction }: PoemCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const previewLines = poem.lines.slice(0, 4);
  const hasMore = poem.lines.length > 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="group relative h-full"
    >
      <div className="parchment rounded-2xl p-8 h-[380px] flex flex-col border border-border shadow-sm hover:shadow-md transition-all duration-300 bg-white/40 backdrop-blur-sm">
        <h3 className="font-serif text-xl font-bold text-burgundy mb-6 text-center italic line-clamp-2 min-h-[3rem]">
          {poem.title}
        </h3>
        
        <div className="flex-1 space-y-2 mb-4 relative overflow-hidden flex flex-col justify-center">
          {previewLines.map((line, j) => (
            <p key={j} className="font-serif text-foreground/70 text-center text-sm leading-relaxed italic line-clamp-1">
              {line || <br />}
            </p>
          ))}
          
          {hasMore && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-cream/80 to-transparent flex items-end justify-center pb-1">
              <span className="text-burgundy/20 font-serif">...</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-6 mt-auto">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="text-xs uppercase tracking-[0.15em] font-sans font-bold text-primary hover:text-burgundy transition-colors py-2 border-b border-transparent hover:border-primary">
                Leer Poema Completo
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-xl parchment-texture border-none shadow-2xl p-0 overflow-hidden rounded-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-8 md:p-14 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/10"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 text-muted-foreground hover:text-burgundy transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="text-center">
                  <header className="mb-10">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-3xl font-bold text-burgundy italic mb-4">
                        {poem.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="w-12 h-0.5 bg-primary/20 mx-auto" />
                  </header>

                  <div className="space-y-3 mb-10">
                    {poem.lines.map((line, j) => (
                      <p key={j} className="font-serif text-lg text-foreground/80 leading-relaxed italic">
                        {line || <br />}
                      </p>
                    ))}
                  </div>

                  <footer className="space-y-8 border-t border-border pt-8">
                    <div className="flex justify-center text-primary/30">
                      <Feather size={24} strokeWidth={1} className="rotate-45" />
                    </div>
                    
                    <div className="flex items-center justify-center gap-6">
                      {[
                        { type: "love" as const, icon: Heart, label: "Me encanta" },
                        { type: "spark" as const, icon: Sparkles, label: "Inspirador" },
                        { type: "book" as const, icon: BookOpen, label: "Profundo" },
                      ].map((reaction) => {
                        const Icon = reaction.icon;
                        const count = reactionCounts[reaction.type] || 0;
                        return (
                          <button
                            key={reaction.type}
                            onClick={() => onReaction(reaction.type)}
                            className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-all group"
                            title={reaction.label}
                          >
                            <Icon size={20} className="group-hover:scale-110 transition-transform" />
                            <AnimatePresence mode="popLayout">
                              <motion.span
                                key={count}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-[10px] font-sans font-bold"
                              >
                                {count}
                              </motion.span>
                            </AnimatePresence>
                          </button>
                        );
                      })}
                    </div>
                  </footer>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>

          {/* Mini Reactions Footer */}
          <div className="flex items-center gap-4 py-2 border-t border-border/30 w-full justify-center opacity-60 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1 text-primary">
              <Heart size={12} className="fill-current" />
              <span className="text-[10px] font-sans font-bold">{reactionCounts.love || 0}</span>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <Sparkles size={12} className="fill-current" />
              <span className="text-[10px] font-sans font-bold">{reactionCounts.spark || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PoemCard;
