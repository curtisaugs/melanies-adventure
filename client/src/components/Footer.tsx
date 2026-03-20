/*
  Footer — Updated for Birthday Week
  Simplified nav to match the new 3-item structure.
  Tagline updated: Los Angeles → Big Sur → Europe (someday)
*/
import { Link } from "wouter";
import { Heart } from "lucide-react";

const TEAL = "oklch(0.75 0.12 185)";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">

          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-display text-xl font-light text-ivory/80">
              Melanie's Adventure
            </p>
            <p className="text-sm text-muted-foreground mt-1 font-body flex items-center gap-1.5 flex-wrap">
              A{" "}
              <span className="relative inline-flex items-center">
                <span style={{ color: "rgba(232,224,208,0.35)", textDecoration: "line-through", textDecorationColor: "rgba(201,168,76,0.6)", textDecorationThickness: "2px" }}>60th</span>
                <span
                  style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-40%) rotate(-6deg)",
                    fontFamily: "'Caveat', cursive",
                    fontSize: "0.95rem",
                    color: "#e8748a",
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                    pointerEvents: "none",
                  }}
                >
                  50th!
                </span>
              </span>
              {" "}Birthday Journey of Celebration & Discovery
            </p>
          </div>

          {/* Nav — two columns: Now + Future */}
          <div className="flex gap-12">
            <div>
              <p className="font-accent text-[0.6rem] tracking-[0.2em] uppercase mb-3" style={{ color: `${TEAL.replace(")", " / 0.6)")}` }}>
                Now
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/rv-adventure">
                  <span className="font-body text-sm transition-colors" style={{ color: TEAL }}>
                    Big Sur RV
                  </span>
                </Link>
                <Link href="/build-my-trip">
                  <span className="nav-link text-muted-foreground hover:text-gold transition-colors text-sm">
                    Talk to Margaux
                  </span>
                </Link>
              </div>
            </div>

            <div>
              <p className="font-accent text-[0.6rem] tracking-[0.2em] uppercase mb-3 text-gold/50">
                Future Adventures
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { href: "/itineraries", label: "Itineraries" },
                  { href: "/destinations", label: "Destinations" },
                  { href: "/relocation", label: "Relocation" },
                  { href: "/grad-schools", label: "Schools" },
                  { href: "/extended-stay", label: "Extended Stay" },
                  { href: "/flights", label: "Flights" },
                ].map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span className="nav-link text-muted-foreground hover:text-gold transition-colors text-sm">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-body">
            Made with <Heart size={10} className="inline text-gold mx-1" /> by Curtis, for Melanie · March 26, 2026
          </p>
          <p className="text-xs font-accent tracking-widest uppercase" style={{ color: "rgba(232,224,208,0.25)" }}>
            Los Angeles → Big Sur → Europe someday
          </p>
        </div>
      </div>
    </footer>
  );
}
