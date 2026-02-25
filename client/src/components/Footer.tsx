/* 
  Design: The Modern European — Refined Glass & Gold
  Footer: Minimal, elegant, dark with gold accents
*/
import { Link } from "wouter";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 py-12 mt-20">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display text-xl font-light text-ivory/80">
              Melanie's European Adventure
            </p>
            <p className="text-sm text-muted-foreground mt-1 font-body">
              A 60th Birthday Journey of Celebration & Discovery
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { href: "/", label: "Home" },
              { href: "/itineraries", label: "Itineraries" },
              { href: "/destinations", label: "Destinations" },
              { href: "/relocation", label: "Relocation" },
              { href: "/grad-schools", label: "Schools" },
              { href: "/flights", label: "Flights" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <span className="nav-link text-muted-foreground hover:text-gold transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-body">
            Made with <Heart size={10} className="inline text-gold mx-1" /> by Curtis, for Melanie · March 26, 2026
          </p>
            <p className="text-xs text-muted-foreground font-accent tracking-widest uppercase">
            Los Angeles → Europe
          </p>
        </div>
      </div>
    </footer>
  );
}
