import { Link } from "wouter";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/itineraries", label: "Itineraries" },
  { href: "/destinations", label: "Destinations" },
  { href: "/relocation", label: "Relocation" },
  { href: "/grad-schools", label: "Schools" },
  { href: "/flights", label: "Flights" },
];

export default function Footer() {
  return (
    <footer
      className="py-16 border-t"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="container">
        <div className="text-center mb-10">
          <div className="font-display text-2xl font-light text-ivory mb-2">
            Melanie's European Adventure
          </div>
          {/* 60th → 50th gag in footer */}
          <div className="font-body text-sm" style={{ color: "var(--muted)" }}>
            A{" "}
            <span className="relative inline-block">
              <span style={{ color: "rgba(180,150,80,0.4)" }}>60th</span>
              <span
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                <svg viewBox="0 0 40 8" className="w-full" style={{ height: "8px", overflow: "visible" }}>
                  <path
                    d="M2,4 Q10,1 18,5 Q26,9 34,3 Q37,1 38,4"
                    stroke="oklch(0.72 0.12 75)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span
                className="font-handwriting absolute"
                style={{
                  fontSize: "1rem",
                  top: "-1rem",
                  left: "50%",
                  transform: "translateX(-40%) rotate(-8deg)",
                  whiteSpace: "nowrap",
                  color: "oklch(0.75 0.18 15)",
                }}
              >
                50th!
              </span>
            </span>{" "}
            Birthday Journey of Celebration &amp; Discovery
          </div>
        </div>

        <div className="gold-divider mx-auto mb-10" />

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="font-accent text-[0.6rem] tracking-[0.2em] uppercase cursor-pointer transition-colors duration-200"
                style={{ color: "rgba(240,235,220,0.5)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,235,220,0.5)")}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <p className="font-body text-xs" style={{ color: "rgba(240,235,220,0.3)" }}>
            Made with ♡ by Curtis, for Melanie · March 26, 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
