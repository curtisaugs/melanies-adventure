/*
  Lola's Adventure — Navigation
  Design: Dark ocean with reef-teal accents, Space Grotesk type
  Mobile: Hamburger menu with full-screen overlay
*/
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Shell, Compass } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/lola" },
  { label: "North ↑", href: "/lola/north" },
  { label: "South ↓", href: "/lola/south" },
  { label: "Wild Card 1", href: "/lola/wildcard-rainforest" },
  { label: "Wild Card 2", href: "/lola/wildcard-outback" },
  { label: "Marine Volunteer", href: "/lola/marine-volunteer" },
  { label: "Ask Scout", href: "/lola/scout" },
];

export default function LolaNavigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[oklch(0.14_0.06_225/0.95)] backdrop-blur-xl border-b border-[oklch(0.62_0.18_195/0.2)] shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/lola">
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="glass-reef w-8 h-8 rounded-lg flex items-center justify-center">
                <Shell size={16} className="text-reef-teal" />
              </div>
              <div>
                <div className="font-lola-display text-sm font-700 text-sand leading-none tracking-tight">
                  Lola's Adventure
                </div>
                <div className="font-lola-mono text-[0.55rem] tracking-[0.18em] uppercase text-reef-teal/70 leading-none mt-0.5">
                  Queensland · April 2026
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location === link.href || location.startsWith(link.href + "/");
              return (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`font-lola-body text-xs tracking-[0.1em] uppercase transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "text-reef-teal"
                        : "text-sand/60 hover:text-sand"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden glass-ocean w-9 h-9 rounded-lg flex items-center justify-center text-sand/80 hover:text-reef-teal transition-colors"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col" style={{ background: "oklch(0.12 0.07 220)" }}>
          <div className="flex items-center justify-between px-6 h-16 border-b border-[oklch(0.62_0.18_195/0.2)]">
            <div className="flex items-center gap-2">
              <Shell size={18} className="text-reef-teal" />
              <span className="font-lola-display text-sm font-700 text-sand">Lola's Adventure</span>
            </div>
            <button
              className="glass-ocean w-9 h-9 rounded-lg flex items-center justify-center text-sand/80 hover:text-reef-teal transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center px-8 gap-6">
            {navLinks.map((link, i) => {
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <div
                    className={`flex items-center gap-3 py-3 border-b border-[oklch(0.62_0.18_195/0.12)] cursor-pointer group`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <Compass size={14} className={isActive ? "text-reef-teal" : "text-reef-teal/30 group-hover:text-reef-teal/60"} />
                    <span
                      className={`font-lola-display text-2xl font-600 transition-colors ${
                        isActive ? "text-reef-teal" : "text-sand/80 group-hover:text-sand"
                      }`}
                    >
                      {link.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="px-8 py-6 text-center">
            <p className="font-lola-mono text-xs text-reef-teal/40 tracking-widest uppercase">
              April 15 – May 3, 2026 · Townsville, QLD
            </p>
          </div>
        </div>
      )}
    </>
  );
}
