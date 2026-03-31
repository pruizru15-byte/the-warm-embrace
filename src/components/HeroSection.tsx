import { motion } from "framer-motion";
import { MapPin, ChevronDown } from "lucide-react";
import { useProfile } from "@/hooks/useData";

const HeroSection = () => {
  const { data: profile, isLoading } = useProfile();

  // Fallback values while loading or if data is empty
  const name = profile?.name || "Poeta & Desarrollador";
  const greeting = profile?.greeting || "Bienvenido a mi mundo";
  const description = profile?.description || "Un desarrollador apasionado por la tecnología, pero amante de las formas antiguas de conectar. Donde el código se encuentra con la poesía.";
  const location = profile?.location || "Tu Ciudad, País";

  // Split name for potential <br /> logic if needed, 
  // or just render it directly
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-rose-soft/30 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cream-warm/50 blur-3xl" />

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`text-muted-foreground font-sans text-sm tracking-[0.3em] uppercase mb-6 ${isLoading ? 'animate-pulse' : ''}`}
          >
            {greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`font-serif text-5xl sm:text-7xl lg:text-8xl font-bold leading-tight mb-6 ${isLoading ? 'animate-pulse' : ''}`}
          >
            {renderName()}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className={`font-sans text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto mb-8 leading-relaxed ${isLoading ? 'animate-pulse' : ''}`}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-muted-foreground"
          >
            <MapPin size={16} className="text-primary" />
            <span className={`font-sans text-sm ${isLoading ? 'animate-pulse' : ''}`}>Ubicación actual — {location}</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown size={28} className="text-primary animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
