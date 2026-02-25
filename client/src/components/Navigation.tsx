/* 
  Design: The Modern European — Refined Glass & Gold
  Navigation: Sticky top nav with glass morphism, Cinzel font labels, gold active states
*/
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", short: "Home" },
  { href: "/itineraries", label: "Itineraries", short: "Trips" },
  { href: "/destinations", label: "Destinations", short: "Places" },
  { href: "/relocation", label: "Relocation", short: "Relo" },
  { href: "/grad-schools", label: "Graduate Schools", short: "Schools" },
  { href: "/flights", label: "Flights & Logistics", short: "Flights" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-card border-b border-gold/20 py-3"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex flex-col cursor-pointer">
              <span className="font-accent text-xs tracking-[0.2em] text-gold uppercase">
                Melanie's
              </span>
              <span className="font-display text-lg font-light text-ivory leading-tight">
                European Adventure
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`nav-link transition-colors duration-300 ${
                    location === item.href ? "text-gold" : ""
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Birthday badge */}
          <div className="hidden lg:flex items-center gap-2 glass-card-gold px-3 py-1.5 rounded-full">
            <span className="text-gold text-xs font-accent tracking-widest uppercase">
              March 26, 2026
            </span>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-ivory/80 hover:text-gold transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 pt-20 glass-card md:hidden">
          <div className="container flex flex-col gap-6 py-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`font-display text-2xl font-light block transition-colors duration-300 ${
                    location === item.href ? "text-gold" : "text-ivory/80"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gold/20">
              <span className="text-gold text-sm font-accent tracking-widest uppercase">
                March 26, 2026 · Las Vegas → Europe
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
