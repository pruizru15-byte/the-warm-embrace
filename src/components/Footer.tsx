import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="py-8 border-t border-border">
    <div className="section-container text-center">
      <p className="font-sans text-sm text-muted-foreground flex items-center justify-center gap-1">
        Hecho con <Heart size={14} className="text-primary" /> y mucho código — {new Date().getFullYear()}
      </p>
    </div>
  </footer>
);

export default Footer;
