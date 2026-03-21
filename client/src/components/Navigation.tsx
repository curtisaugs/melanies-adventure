/*
  Navigation — Reorganized for Birthday Week
  Big Sur RV leads. Europe collapses into a dropdown. Build My Trip stays as CTA.
*/
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";

// European sub-links — all content preserved, grouped under one nav item
const europeLinks = [
  { href: "/itineraries", label: "Itineraries" },
  { href: "/destinations", label: "Destinations" },
  { href: "/relocation", label: "Relocation" },
  { href: "/grad-schools", label: "Graduate Schools" },
  { href: "/extended-stay", label: "Extended Stay" },
  { href: "/flights", label: "Flights & Logistics" },
];

const europeHrefs = europeLinks.map((l) => l.href);

export default function Navigation() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [europeOpen, setEuropeOpen] = useState(false);
  const europeRef = useRef<HTMLDivElement>(null);

  const isEuropePage = europeHrefs.includes(location);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setEuropeOpen(false);
  }, [location]);

  // Close Europe dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (europeRef.current && !europeRef.current.contains(e.target as Node)) {
        setEuropeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-gold/20 py-3" : "border-b border-white/10 py-5"
        }`}
        style={{
          background: scrolled
            ? "oklch(0.09 0.015 260 / 0.95)"
            : "oklch(0.09 0.015 260 / 0.72)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="container flex items-center justify-between">

          {/* Logo */}
          <Link href="/">
            <div className="flex flex-col cursor-pointer">
              <span className="font-accent text-xs tracking-[0.2em] text-gold uppercase">
                Melanie's
              </span>
              <span className="font-display text-lg font-light text-ivory leading-tight">
                Adventure
              </span>
            </div>
          </Link>

          {/* Desktop Nav — 3 clean items */}
          <div className="hidden md:flex items-center gap-8">

            {/* Big Sur RV — highlighted as the "now" item */}
            <Link href="/rv-adventure">
              <span
                className={`nav-link transition-all duration-300 flex items-center gap-1.5 ${
                  location === "/rv-adventure" ? "" : ""
                }`}
                style={{
                  color: location === "/rv-adventure"
                    ? "oklch(0.75 0.12 185)"
                    : "oklch(0.75 0.12 185)",
                  fontWeight: 500,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "oklch(0.75 0.12 185)", flexShrink: 0 }}
                />
                Big Sur RV
              </span>
            </Link>

            {/* Airbnb Cabin — second local option */}
            <Link href="/airbnb-getaway">
              <span
                className="nav-link transition-all duration-300 flex items-center gap-1.5"
                style={{
                  color: location === "/airbnb-getaway"
                    ? "oklch(0.72 0.14 145)"
                    : "oklch(0.72 0.14 145 / 0.85)",
                  fontWeight: 500,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "oklch(0.72 0.14 145)", flexShrink: 0 }}
                />
                Cabin Airbnb
              </span>
            </Link>

            {/* Europe dropdown */}
            <div className="relative" ref={europeRef}>
              <button
                onClick={() => setEuropeOpen(!europeOpen)}
                className={`nav-link transition-colors duration-300 flex items-center gap-1 ${
                  isEuropePage ? "text-gold" : ""
                }`}
              >
                Europe
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${europeOpen ? "rotate-180" : ""}`}
                />
              </button>

              {europeOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-2xl overflow-hidden z-50"
                  style={{
                    background: "oklch(0.11 0.02 260 / 0.97)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="px-3 pt-3 pb-1">
                    <p className="font-accent text-[0.55rem] tracking-[0.2em] uppercase text-gold/50 px-2 mb-2">
                      Future Adventures
                    </p>
                  </div>
                  {europeLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <div
                        className={`px-5 py-2.5 font-body text-sm transition-colors duration-150 cursor-pointer ${
                          location === link.href
                            ? "text-gold"
                            : "text-ivory/70 hover:text-ivory hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </div>
                    </Link>
                  ))}
                  <div className="px-3 pb-3 pt-1">
                    <div className="border-t border-white/8 pt-2">
                      <p className="font-body text-xs text-ivory/30 italic px-2">
                        All content saved for when the time is right.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Build My Trip CTA */}
          <Link href="/build-my-trip">
            <div
              className="hidden lg:flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full transition-all hover:opacity-90"
              style={{ background: "rgba(232,116,138,0.15)", border: "1px solid rgba(232,116,138,0.35)", color: "#e8748a" }}
            >
              <span className="text-xs font-accent tracking-widest uppercase font-semibold">
                ✦ Talk to Margaux
              </span>
            </div>
          </Link>

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
        <div
          className="fixed inset-0 z-40 pt-20 md:hidden"
          style={{ background: "oklch(0.09 0.015 260 / 0.97)", backdropFilter: "blur(20px)" }}
        >
          <div className="container flex flex-col gap-1 py-8">

            {/* Big Sur RV — primary */}
            <Link href="/rv-adventure">
              <div className="flex items-center gap-3 py-4 border-b border-white/8">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "oklch(0.75 0.12 185)" }}
                />
                <span
                  className="font-display text-3xl font-light"
                  style={{ color: "oklch(0.75 0.12 185)" }}
                >
                  Big Sur RV
                </span>
                <span className="font-accent text-[0.6rem] tracking-widest uppercase ml-auto" style={{ color: "oklch(0.75 0.12 185 / 0.6)" }}>
                  Now
                </span>
              </div>
            </Link>

            {/* Cabin Airbnb — new option */}
            <Link href="/airbnb-getaway">
              <div className="flex items-center gap-3 py-4 border-b border-white/8">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "oklch(0.72 0.14 145)" }}
                />
                <span
                  className="font-display text-3xl font-light"
                  style={{ color: "oklch(0.72 0.14 145)" }}
                >
                  Cabin Airbnb
                </span>
                <span className="font-accent text-[0.6rem] tracking-widest uppercase ml-auto" style={{ color: "oklch(0.72 0.14 145 / 0.6)" }}>
                  April 3–5
                </span>
              </div>
            </Link>

            {/* Europe section */}
            <div className="py-4 border-b border-white/8">
              <p className="font-accent text-[0.6rem] tracking-[0.2em] uppercase text-gold/50 mb-4">
                Future Adventures — Europe
              </p>
              <div className="flex flex-col gap-4">
                {europeLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span
                      className={`font-display text-xl font-light block transition-colors duration-300 ${
                        location === link.href ? "text-gold" : "text-ivory/60"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Margaux CTA */}
            <div className="pt-6">
              <Link href="/build-my-trip">
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full"
                  style={{ background: "rgba(232,116,138,0.15)", border: "1px solid rgba(232,116,138,0.35)", color: "#e8748a" }}
                >
                  <span className="font-accent text-xs tracking-widest uppercase">✦ Talk to Margaux</span>
                </div>
              </Link>
            </div>

            <div className="mt-6 pt-4 border-t border-white/8">
              <span className="text-ivory/30 text-xs font-accent tracking-widest uppercase">
                March 26, 2026 · Melanie's Birthday
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
