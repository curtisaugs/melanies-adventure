import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/itineraries", label: "Itineraries" },
  { href: "/destinations", label: "Destinations" },
  { href: "/relocation", label: "Relocation" },
  { href: "/grad-schools", label: "Graduate Schools" },
  { href: "/flights", label: "Flights & Logistics" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(6,8,20,0.95)"
          : "rgba(6,8,20,0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <div className="cursor-pointer">
              <div className="font-accent text-xs tracking-[0.25em] uppercase text-gold leading-none">
                Melanie's
              </div>
              <div className="font-display text-xl font-light text-ivory leading-tight">
                European Adventure
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="font-accent text-[0.65rem] tracking-[0.18em] uppercase cursor-pointer transition-colors duration-200"
                  style={{
                    color: location === link.href
                      ? "var(--gold)"
                      : "rgba(240,235,220,0.7)",
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Date badge + mobile toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block glass-card-gold px-3 py-1.5 rounded-full">
              <span className="font-accent text-[0.6rem] tracking-widest uppercase text-gold">
                March 26, 2026
              </span>
            </div>
            <button
              className="lg:hidden text-ivory/70 hover:text-ivory transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden"
          style={{ background: "rgba(6,8,20,0.97)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="container py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="font-accent text-xs tracking-[0.2em] uppercase block cursor-pointer"
                  style={{ color: location === link.href ? "var(--gold)" : "rgba(240,235,220,0.7)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
