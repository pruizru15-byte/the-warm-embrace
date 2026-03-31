import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, ChevronDown, Terminal, Cpu, Wifi, Activity } from "lucide-react";
import { useProfile } from "@/hooks/useData";

const useTypingEffect = (text: string, speed = 60, delay = 1000) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
};

const AnimatedCounter = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const TechHeroSection = () => {
  const { data: profile, isLoading } = useProfile();

  const name = profile?.name || "Poeta & Desarrollador";
  const typewriterText = profile?.description || "Donde el código se encuentra con la poesía.";
  const location = profile?.location || "Tu Ciudad, País";

  const { displayed, done } = useTypingEffect(
    typewriterText,
    Math.max(30, 100 - typewriterText.length / 5), // Adaptive speed
    1500
  );

  const stats = [
    { label: "Proyectos", value: 12, icon: Cpu },
    { label: "Tecnologías", value: 8, icon: Activity },
    { label: "Commits", value: 847, icon: Terminal },
  ];

  const renderName = () => {
    if (name.includes("&")) {
      const parts = name.split("&");
      return (
        <>
          <span className="text-gradient">{parts[0].trim()}</span>
          <br />
          <span className="text-foreground">&</span>{" "}
          <span className="text-navy">{parts[1].trim()}</span>
        </>
      );
    }
    return <span className="text-gradient">{name}</span>;
  };

  const codeLines = [
    { prefix: "const", content: ' developer = {', color: "text-primary" },
    { prefix: "  name:", content: ` "${name.split('&')[0].trim()}",`, color: "text-gold-warm" },
    { prefix: "  role:", content: ` "${name.split('&')[1]?.trim() || "Dev"}",`, color: "text-gold-warm" },
    { prefix: "  passion:", content: ' ["código", "poesía"],', color: "text-gold-warm" },
    { prefix: "  status:", content: ' "building..."', color: "text-emerald-400" },
    { prefix: "};", content: '', color: "text-primary" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Tech grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(220 55% 22%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 55% 22%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/15 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-navy/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-primary/20 blur-2xl"
      />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-sans text-xs text-muted-foreground tracking-wide">Disponible para proyectos</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className={`font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 ${isLoading ? 'animate-pulse' : ''}`}
              >
                {renderName()}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className={`font-sans text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed h-8 ${isLoading ? 'animate-pulse' : ''}`}
              >
                <span>{displayed}</span>
                {!done && <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-pulse" />}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className={`flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-8 ${isLoading ? 'animate-pulse' : ''}`}
              >
                <MapPin size={16} className="text-primary" />
                <span className="font-sans text-sm">{location}</span>
                <Wifi size={14} className="text-emerald-400 ml-2" />
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="flex items-center justify-center lg:justify-start gap-6"
              >
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <Icon size={14} className="text-primary" />
                        <span className="font-sans text-2xl font-bold text-foreground">
                          <AnimatedCounter target={stat.value} />
                        </span>
                      </div>
                      <span className="font-sans text-xs text-muted-foreground">{stat.label}</span>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="glass-card rounded-xl overflow-hidden border border-border/50 shadow-2xl">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-accent/5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-gold-warm/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">~/portafolio</span>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-sm space-y-1" style={{ background: "hsl(220 55% 8% / 0.9)" }}>
                <div className="text-muted-foreground/60 text-xs mb-3">// quien-soy.ts</div>
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.15 }}
                    className="flex"
                  >
                    <span className="text-primary/70 select-none mr-3 text-xs mt-0.5">{i + 1}</span>
                    <span className={line.color}>{line.prefix}</span>
                    <span className="text-muted-foreground/80">{line.content}</span>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                  className="flex items-center gap-1 mt-4 pt-3 border-t border-muted-foreground/10"
                >
                  <span className="text-emerald-400">❯</span>
                  <span className="text-muted-foreground/60">_</span>
                  <span className="w-2 h-4 bg-primary/60 animate-pulse" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown size={28} className="text-primary animate-bounce" />
      </motion.div>
    </section>
  );
};

export default TechHeroSection;
