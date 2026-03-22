/*
  Home — Birthday Week Edition
  Big Sur leads. Europe is the beautiful future. Margaux ties it together.
*/
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Truck, Waves, Dog, MapPin, Plane, Ship, GraduationCap,
  ArrowRight, Star, Sparkles, Calendar
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BIRTHDAY = new Date("2026-03-26T00:00:00");

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = BIRTHDAY.getTime() - now.getTime();
      if (diff <= 0) {
        setIsPast(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (isPast) {
    return (
      <p className="font-display text-2xl font-light text-ivory/70 italic">
        Happy Birthday, Melanie. 🥂
      </p>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4 md:gap-8 justify-center">
      {units.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="countdown-num">{String(value).padStart(2, "0")}</div>
          <div className="font-accent text-[0.6rem] tracking-[0.2em] uppercase text-gold/60 mt-1">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

const europeCards = [
  {
    icon: Ship,
    title: "River Cruises",
    subtitle: "Rhine & Danube",
    desc: "Unpack once, drift through castles, vineyards, and medieval towns. Three curated cruise packages from $2,699.",
    href: "/itineraries",
    color: "from-blue-900/30 to-blue-800/10",
    accentColor: "oklch(0.68 0.12 195)",
    iconBg: "rgba(104,196,210,0.12)",
  },
  {
    icon: MapPin,
    title: "Iberian Explorer",
    subtitle: "Spain & Portugal",
    desc: "Lisbon's azulejos, Porto's port wine, Seville's flamenco, and Madrid's world-class art. 10–14 days of wonder.",
    href: "/destinations",
    color: "from-amber-900/30 to-amber-800/10",
    accentColor: "oklch(0.72 0.18 28)",
    iconBg: "rgba(220,100,60,0.12)",
  },
  {
    icon: Plane,
    title: "Southern France",
    subtitle: "Provence & Riviera",
    desc: "Lavender fields, the Côte d'Azur, and a reunion with Annie in Paris. The art de vivre at its finest.",
    href: "/destinations",
    color: "from-purple-900/30 to-purple-800/10",
    accentColor: "oklch(0.72 0.12 295)",
    iconBg: "rgba(140,100,200,0.12)",
  },
  {
    icon: GraduationCap,
    title: "The Next Chapter",
    subtitle: "Graduate Schools & Relocation",
    desc: "INSEAD, HEC Paris, IE Madrid, Lisbon MBA. Top executive programs, visa pathways, and cost of living guides.",
    href: "/grad-schools",
    color: "from-emerald-900/30 to-emerald-800/10",
    accentColor: "oklch(0.72 0.12 75)",
    iconBg: "rgba(180,150,80,0.12)",
  },
];

// Teal accent for Big Sur
const TEAL = "oklch(0.75 0.12 185)";
const TEAL_BG = "rgba(100,210,200,0.10)";
const TEAL_BORDER = "rgba(100,210,200,0.25)";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* ── HERO — Birthday Week, Big Sur leads ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background: Big Sur coast */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/bigsur-hero-highway-8bE9w93WbGwcQ2SSvW4TQN.webp')`,
          }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-background/20" />

        <div className="relative z-10 container text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div
              className="rounded-3xl px-8 py-10 md:px-14 md:py-14 max-w-3xl mx-auto"
              style={{
                background: "rgba(8, 12, 28, 0.58)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(232, 224, 208, 0.10)",
                boxShadow: "0 8px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Birthday badge */}
              <div className="inline-flex items-center gap-3 glass-card-birthday px-6 py-3 rounded-full mb-8">
                <Star size={14} style={{ color: "oklch(0.78 0.16 355)", fill: "oklch(0.78 0.16 355)" }} />
                <span className="font-accent text-sm tracking-[0.2em] uppercase" style={{ color: "oklch(0.88 0.10 355)" }}>
                  A{" "}
                  <span className="relative inline-block">
                    <span style={{ color: "oklch(0.78 0.16 355 / 0.5)" }}>60th</span>
                    <span
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      style={{ top: "50%", transform: "translateY(-50%)" }}
                    >
                      <svg viewBox="0 0 48 10" className="w-full" style={{ height: "10px", overflow: "visible" }}>
                        <path
                          d="M2,5 Q10,2 20,6 Q30,10 38,4 Q42,2 46,5"
                          stroke="oklch(0.72 0.12 75)"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <span
                      className="font-handwriting absolute"
                      style={{
                        fontSize: "1.4rem",
                        top: "-1.3rem",
                        left: "50%",
                        transform: "translateX(-40%) rotate(-8deg)",
                        whiteSpace: "nowrap",
                        color: "oklch(0.82 0.20 28)",
                        textShadow: "0 0 16px oklch(0.82 0.20 28 / 0.6)",
                      }}
                    >
                      50th!
                    </span>
                  </span>
                  {" "}Birthday to Remember
                </span>
                <Star size={14} style={{ color: "oklch(0.78 0.16 355)", fill: "oklch(0.78 0.16 355)" }} />
              </div>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-ivory mb-4 leading-none">
                Welcome, <span className="text-gold italic">Melanie</span>
              </h1>

              {/* Updated subhead — Big Sur is the plan */}
              <p className="font-display text-xl md:text-2xl font-light italic mb-2" style={{ color: TEAL }}>
                The Dogs. The Coast. This Weekend.
              </p>
              <p className="font-body text-sm md:text-base text-ivory/50 max-w-xl mx-auto mb-10 leading-relaxed">
                Europe is still the dream. But March 26 is right now, and Big Sur is three hours up Highway 1, and PennyLu and Kota have been waiting their entire lives for a beach like Pfeiffer.
              </p>

              {/* Countdown */}
              <div
                className="glass-card rounded-2xl p-6 md:p-8 max-w-lg mx-auto mb-10"
                style={{ borderColor: `${TEAL.replace(')', ' / 0.25)')}` }}
              >
                <p className="font-accent text-xs tracking-[0.2em] uppercase mb-4" style={{ color: `${TEAL.replace(')', ' / 0.8)')}` }}>
                  Countdown to March 26, 2026
                </p>
                <Countdown />
              </div>

              {/* Primary CTA: Big Sur */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/rv-adventure">
                  <button
                    className="inline-flex items-center gap-2 font-body font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${TEAL}, oklch(0.65 0.14 200))`,
                      color: "oklch(0.09 0.015 260)",
                      boxShadow: `0 4px 24px ${TEAL.replace(')', ' / 0.35)')}`,
                    }}
                  >
                    <Truck size={16} />
                    Plan the Big Sur Trip
                    <ArrowRight size={16} />
                  </button>
                </Link>
                <Link href="/build-my-trip">
                  <button
                    className="inline-flex items-center gap-2 font-body px-6 py-3.5 rounded-full transition-all duration-300"
                    style={{
                      background: "rgba(232,116,138,0.10)",
                      border: "1px solid rgba(232,116,138,0.30)",
                      color: "#e8748a",
                    }}
                  >
                    <Sparkles size={15} />
                    Talk to Margaux
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/30">
          <span className="font-accent text-[0.6rem] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-ivory/30 to-transparent" />
        </div>
      </section>

      {/* ── BIG SUR FEATURE CARD ── */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section label */}
            <div className="flex items-center gap-3 mb-8">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: TEAL }}
              />
              <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: TEAL }}>
                This Weekend's Adventure
              </span>
            </div>

            {/* Feature card */}
            <div
              className="rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center"
              style={{
                background: "linear-gradient(135deg, rgba(100,210,200,0.07) 0%, rgba(8,12,28,0.6) 100%)",
                border: `1px solid ${TEAL_BORDER}`,
              }}
            >
              {/* Left: copy */}
              <div>
                <h2 className="font-display text-5xl md:text-6xl font-light text-ivory mb-3 leading-tight">
                  Big Sur <span className="italic" style={{ color: TEAL }}>&amp; the Dogs</span>
                </h2>
                <p className="font-body text-base text-ivory/60 leading-relaxed mb-6">
                  A first-class Class C RV, PennyLu and Kota riding shotgun in spirit, Annie and Mokin along for the adventure. Cambria's farmers market on Friday. The last Carmel winter market on Saturday. Pfeiffer Beach's purple sand. Fernwood Resort under the redwoods.
                </p>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Calendar, label: "March 27–29", sub: "or April 3–5" },
                    { icon: Truck, label: "Class C RV", sub: "~$200/night" },
                    { icon: Dog, label: "PennyLu + Kota", sub: "Doberman + Aussie" },
                    { icon: Waves, label: "Fernwood Resort", sub: "Redwoods + river" },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 rounded-xl p-3"
                      style={{ background: TEAL_BG, border: `1px solid ${TEAL_BORDER}` }}
                    >
                      <Icon size={16} style={{ color: TEAL, flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <p className="font-body text-sm font-medium text-ivory">{label}</p>
                        <p className="font-body text-xs text-ivory/40">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/rv-adventure">
                  <button
                    className="inline-flex items-center gap-2 font-body font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${TEAL}, oklch(0.65 0.14 200))`,
                      color: "oklch(0.09 0.015 260)",
                      boxShadow: `0 4px 20px ${TEAL.replace(')', ' / 0.3)')}`,
                    }}
                  >
                    See the Full Plan
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>

              {/* Right: Margaux quote card */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(8,12,28,0.5)",
                  border: "1px solid rgba(232,116,138,0.15)",
                }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(232,116,138,0.15)" }}
                  >
                    <Sparkles size={16} style={{ color: "#e8748a" }} />
                  </div>
                  <div>
                    <p className="font-accent text-xs tracking-widest uppercase mb-1" style={{ color: "#e8748a" }}>Margaux</p>
                    <div
                      className="rounded-2xl rounded-tl-none p-4"
                      style={{ background: "rgba(232,116,138,0.07)", border: "1px solid rgba(232,116,138,0.12)" }}
                    >
                      <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(232,224,208,0.85)" }}>
                        Europe will still be there. The Rhine isn't going anywhere. But March 26 is <em>this week</em>, and Big Sur is three hours up the coast, and PennyLu and Kota have been waiting their entire lives for a beach where they can actually run.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-start gap-3"
                >
                  <div className="w-9 flex-shrink-0" />
                  <div
                    className="rounded-2xl rounded-tl-none p-4 flex-1"
                    style={{ background: "rgba(232,116,138,0.07)", border: "1px solid rgba(232,116,138,0.12)" }}
                  >
                    <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(232,224,208,0.85)" }}>
                      Curtis has the whole thing planned. Two weekends to choose from, a campsite under the redwoods, and the Carmel farmers market on Saturday. <span style={{ color: "#e8748a" }}>This is the birthday that's actually happening.</span>
                    </p>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <Link href="/rv-adventure">
                    <button
                      className="w-full font-body text-xs tracking-widest uppercase py-2 rounded-xl transition-all"
                      style={{ color: TEAL, background: TEAL_BG }}
                    >
                      See the full plan →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── AIRBNB CABIN FEATURE CARD ── */}
      <section className="py-8 pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section label */}
            <div className="flex items-center gap-3 mb-8">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "oklch(0.72 0.14 145)" }}
              />
              <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "oklch(0.72 0.14 145)" }}>
                ✓ Confirmed Booking — VRBO
              </span>
            </div>

            {/* Airbnb Feature card */}
            <div
              className="rounded-3xl p-8 md:p-10 grid md:grid-cols-2 gap-10 items-center"
              style={{
                background: "linear-gradient(135deg, rgba(52,211,153,0.07) 0%, rgba(8,12,28,0.6) 100%)",
                border: "1px solid rgba(52,211,153,0.2)",
              }}
            >
              {/* Left: copy */}
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-light text-ivory mb-3 leading-tight">
                  Mountain <span className="italic" style={{ color: "oklch(0.72 0.14 145)" }}>Cabin Weekend</span>
                </h2>
                <p className="font-body text-base text-ivory/60 leading-relaxed mb-6">
                  Booked and confirmed. The Alpen Lodge in Lake Arrowhead — 5 bedrooms, 3 lakeview decks, BBQ, firepit, pool table, and lake rights. March 27–30, 3 nights. PennyLu gets a proper yard. You get a fireplace and a view.
                </p>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Calendar, label: "Mar 27–30", sub: "3 nights · 3 adults" },
                    { icon: Dog, label: "Dog-Friendly", sub: "2 dogs · $100 flat fee" },
                    { icon: MapPin, label: "Lake Arrowhead", sub: "2 hrs from LA" },
                    { icon: Star, label: "5 BR · 3 Decks", sub: "Lake views · BBQ · Firepit" },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 rounded-xl p-3"
                      style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}
                    >
                      <Icon size={16} style={{ color: "oklch(0.72 0.14 145)", flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <p className="font-body text-sm font-medium text-ivory">{label}</p>
                        <p className="font-body text-xs text-ivory/40">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/airbnb-getaway">
                  <button
                    className="inline-flex items-center gap-2 font-body font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.72 0.14 145), oklch(0.65 0.16 160))",
                      color: "oklch(0.09 0.015 260)",
                      boxShadow: "0 4px 20px rgba(52,211,153,0.25)",
                    }}
                  >
                    View Booking Details
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>

              {/* Right: listing preview */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(8,12,28,0.5)",
                  border: "1px solid rgba(52,211,153,0.15)",
                }}
              >
                <p className="font-accent text-[0.6rem] tracking-[0.2em] uppercase mb-4" style={{ color: "oklch(0.72 0.14 145)" }}>
                  Alpen Lodge Highlights
                </p>
                {[
                  { name: "3 Lakeview Decks", location: "BBQ & Firepit", rating: "✔", reviews: "Lake rights included", tag: "Outdoor", tagColor: "rgba(52,211,153,0.15)", tagBorder: "rgba(52,211,153,0.3)", tagText: "oklch(0.72 0.14 145)" },
                  { name: "Pool & Ping Pong", location: "Gourmet Kitchen", rating: "✔", reviews: "Bonus room + 3 fireplaces", tag: "Indoor", tagColor: "rgba(251,191,36,0.12)", tagBorder: "rgba(251,191,36,0.3)", tagText: "oklch(0.78 0.14 60)" },
                  { name: "Dog-Friendly", location: "2 dogs · $100 flat fee", rating: "✔", reviews: "Fenced yard", tag: "Pets OK", tagColor: "rgba(232,116,138,0.12)", tagBorder: "rgba(232,116,138,0.3)", tagText: "oklch(0.72 0.14 15)" },
                ].map((l) => (
                  <div
                    key={l.name}
                    className="flex items-center justify-between py-3 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <div>
                      <p className="font-body text-sm font-medium text-ivory">{l.name}</p>
                      <p className="font-body text-xs text-ivory/40">{l.location} · {l.rating} · {l.reviews}</p>
                    </div>
                    <span
                      className="font-accent text-[0.55rem] tracking-widest uppercase px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: l.tagColor, border: `1px solid ${l.tagBorder}`, color: l.tagText }}
                    >
                      {l.tag}
                    </span>
                  </div>
                ))}
                <div className="pt-4">
                  <Link href="/airbnb-getaway">
                    <button
                      className="w-full font-body text-xs tracking-widest uppercase py-2 rounded-xl transition-all"
                      style={{ color: "oklch(0.72 0.14 145)", background: "rgba(52,211,153,0.08)" }}
                    >
                      See all 4 listings →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARGAUX SECTION ── */}
      <section className="py-16 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(232,116,138,0.06) 0%, rgba(100,210,200,0.03) 50%, rgba(10,15,30,0) 100%)" }}
        />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
                style={{ background: "rgba(232,116,138,0.12)", border: "1px solid rgba(232,116,138,0.3)" }}
              >
                <Sparkles size={13} style={{ color: "#e8748a" }} />
                <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "#e8748a" }}>
                  Already here. Curtis introduced us.
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-ivory mb-3 leading-tight">
                Hi. I'm <span className="italic" style={{ color: "#e8748a" }}>Margaux</span>
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                Curtis thought we'd get along. He was right. I already know you're the kind of person who has very strong opinions about what you <em>don't</em> want, even if the rest is still deliciously open.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                Big Sur is the plan for this weekend. But when you're ready to think about Europe, I'm here to build you something that actually fits. Day by day, budget and all.
              </p>
              <p
                className="font-body text-sm leading-relaxed mb-6"
                style={{ fontStyle: "italic", color: "rgba(232,224,208,0.40)" }}
              >
                (I'll also gently mention that Bergamo to Positano is not quite the same as LA to Tempe. Even if the miles look similar on a map. We'll talk.)
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/build-my-trip">
                  <button
                    className="inline-flex items-center gap-2 font-body font-semibold px-6 py-3 rounded-full text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-lg"
                    style={{ background: "#e8748a", color: "#0a0f1e" }}
                  >
                    <Sparkles size={15} />
                    Talk to Margaux
                    <ArrowRight size={15} />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Margaux chat preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-card rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(232,116,138,0.2)" }}
                  >
                    <Sparkles size={16} style={{ color: "#e8748a" }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-accent text-xs tracking-widest uppercase mb-1.5" style={{ color: "#e8748a" }}>Margaux</p>
                    <div
                      className="rounded-2xl rounded-tl-none p-4"
                      style={{ background: "rgba(232,116,138,0.08)", border: "1px solid rgba(232,116,138,0.15)" }}
                    >
                      <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(232,224,208,0.85)" }}>
                        Melanie. Finally. Curtis has been telling me about you for months.{" "}
                        <span style={{ color: "#e8748a" }}>Happy birthday, by the way.</span> 50 looks extraordinary on you. 🥂
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(232,116,138,0.2)" }}
                  >
                    <Sparkles size={16} style={{ color: "#e8748a" }} />
                  </div>
                  <div className="flex-1">
                    <div
                      className="rounded-2xl rounded-tl-none p-4"
                      style={{ background: "rgba(232,116,138,0.08)", border: "1px solid rgba(232,116,138,0.15)" }}
                    >
                      <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(232,224,208,0.85)" }}>
                        Big Sur this weekend, Europe when you're ready. First question for the European trip:{" "}
                        <strong style={{ color: "rgba(232,224,208,1)" }}>how long do we have?</strong> Because Europe rewards the unhurried, and you deserve unhurried.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pl-12">
                  {["8 Days", "10 Days", "12 Days", "14 Days"].map((d) => (
                    <Link key={d} href="/build-my-trip">
                      <span
                        className="font-body text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all"
                        style={{ background: TEAL_BG, border: `1px solid ${TEAL_BORDER}`, color: TEAL }}
                      >
                        {d}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <Link href="/build-my-trip">
                    <button
                      className="w-full font-body text-xs tracking-widest uppercase py-2 rounded-xl transition-all"
                      style={{ color: "#e8748a", background: "rgba(232,116,138,0.06)" }}
                    >
                      Let's talk →
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FUTURE ADVENTURES — Europe ── */}
      <section className="pt-16 pb-8 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px flex-1 max-w-[60px]" style={{ background: "rgba(255,255,255,0.08)" }} />
              <span className="font-accent text-xs tracking-[0.2em] uppercase text-gold/60">When the time is right</span>
              <div className="h-px flex-1 max-w-[60px]" style={{ background: "rgba(255,255,255,0.08)" }} />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ivory">
              Future Adventures — <span className="text-gold italic">Europe</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-3 max-w-lg">
              All of this research is saved and waiting. The Rhine, the Iberian coast, Provence, graduate schools, visa pathways. It's not going anywhere.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {europeCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={card.href}>
                  <div
                    className={`glass-card package-card rounded-2xl p-8 cursor-pointer bg-gradient-to-br ${card.color}`}
                    style={{ borderColor: card.accentColor.replace(")", " / 0.20)") }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="p-3 rounded-xl"
                        style={{ background: card.iconBg, border: `1px solid ${card.accentColor.replace(")", " / 0.25)")}` }}
                      >
                        <card.icon size={22} style={{ color: card.accentColor }} />
                      </div>
                      <ArrowRight size={18} style={{ color: card.accentColor.replace(")", " / 0.45)") }} className="mt-1" />
                    </div>
                    <h3 className="font-display text-2xl font-light text-ivory mb-1">{card.title}</h3>
                    <p
                      className="font-accent text-xs tracking-[0.15em] uppercase mb-3"
                      style={{ color: card.accentColor.replace(")", " / 0.75)") }}
                    >
                      {card.subtitle}
                    </p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
