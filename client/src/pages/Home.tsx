/* 
  Design: The Modern European — Refined Glass & Gold
  Home: Full-bleed hero with birthday countdown, overview cards, and intro narrative
  Images: Provençal birthday dinner (hero), Rhine river (package preview)
*/
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Plane, Ship, GraduationCap, MapPin, ArrowRight, Star, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BIRTHDAY = new Date("2026-03-26T00:00:00");

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = BIRTHDAY.getTime() - now.getTime();
      if (diff <= 0) {
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

const overviewCards = [
  {
    icon: Ship,
    title: "River Cruises",
    subtitle: "Rhine & Danube",
    desc: "Unpack once, drift through castles, vineyards, and medieval towns. Three curated cruise packages from $2,699.",
    href: "/itineraries",
    color: "from-blue-900/30 to-blue-800/10",
    accentColor: "oklch(0.68 0.12 195)",  // teal
    iconBg: "rgba(104,196,210,0.12)",
  },
  {
    icon: MapPin,
    title: "Iberian Explorer",
    subtitle: "Spain & Portugal",
    desc: "Lisbon's azulejos, Porto's port wine, Seville's flamenco, and Madrid's world-class art. 10–14 days of wonder.",
    href: "/destinations",
    color: "from-amber-900/30 to-amber-800/10",
    accentColor: "oklch(0.72 0.18 28)",  // coral
    iconBg: "rgba(220,100,60,0.12)",
  },
  {
    icon: Plane,
    title: "Southern France",
    subtitle: "Provence & Riviera",
    desc: "Lavender fields, the Côte d'Azur, and a reunion with Annie in Paris. The art de vivre at its finest.",
    href: "/destinations",
    color: "from-purple-900/30 to-purple-800/10",
    accentColor: "oklch(0.72 0.12 295)",  // lavender
    iconBg: "rgba(140,100,200,0.12)",
  },
  {
    icon: GraduationCap,
    title: "The Next Chapter",
    subtitle: "Graduate Schools & Relocation",
    desc: "INSEAD, HEC Paris, IE Madrid, Lisbon MBA — top executive programs. Plus visa pathways and cost of living guides.",
    href: "/grad-schools",
    color: "from-emerald-900/30 to-emerald-800/10",
    accentColor: "oklch(0.72 0.12 75)",  // gold
    iconBg: "rgba(180,150,80,0.12)",
  },
];

const highlights = [
  { num: "3", label: "Curated Itineraries", color: "oklch(0.72 0.18 28)" },
  { num: "6", label: "Destination Cities", color: "oklch(0.72 0.12 75)" },
  { num: "5", label: "Top Graduate Programs", color: "oklch(0.72 0.12 295)" },
  { num: "4", label: "Visa Pathways", color: "oklch(0.68 0.12 195)" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://files.manuscdn.com/user_upload_by_module/session_file/118915275/AUalUDGvKUnmAKsA.png')`,
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/30" />

        {/* Content */}
        <div className="relative z-10 container text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 glass-card-birthday px-6 py-3 rounded-full mb-8">
              <Star size={14} className="text-rose-pink fill-rose-pink" style={{ color: "oklch(0.78 0.16 355)" }} />
              <span className="font-accent text-sm tracking-[0.2em] uppercase" style={{ color: "oklch(0.88 0.10 355)" }}>
                A{" "}
                <span className="relative inline-block">
                  <span style={{ color: "oklch(0.78 0.16 355 / 0.5)" }}>60th</span>
                  {/* Strikethrough line */}
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
                  {/* Handwritten 50th — rose pink for contrast */}
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
            <p className="font-display text-xl md:text-2xl font-light text-ivory/70 italic mb-2">
              Your European Adventure Awaits
            </p>
            <p className="font-body text-sm md:text-base text-ivory/50 max-w-xl mx-auto mb-12 leading-relaxed">
              From the Rhine's medieval castles to Lisbon's sun-drenched hills, from Provençal lavender fields to a reunion with Annie in Paris — this is your moment to explore, celebrate, and dream of what comes next.
            </p>

            {/* Countdown */}
            <div className="glass-card rounded-2xl p-6 md:p-8 max-w-lg mx-auto mb-10" style={{ borderColor: "oklch(0.78 0.16 355 / 0.2)" }}>
              <p className="font-accent text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "oklch(0.78 0.16 355 / 0.8)" }}>
                Countdown to March 26, 2026
              </p>
              <Countdown />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/itineraries">
                <button className="inline-flex items-center gap-2 font-body font-medium px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg" style={{ background: "linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.72 0.18 28))", color: "oklch(0.10 0.02 240)", boxShadow: "0 4px 20px oklch(0.72 0.18 28 / 0.3)" }}>
                  Explore Itineraries
                  <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/destinations">
                <button className="inline-flex items-center gap-2 glass-card text-ivory font-body px-6 py-3 rounded-full transition-all duration-300" style={{ borderColor: "oklch(0.72 0.12 295 / 0.4)", color: "oklch(0.82 0.09 295)" }}>
                  Browse Destinations
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/30">
          <span className="font-accent text-[0.6rem] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-ivory/30 to-transparent" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-white/8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {highlights.map((highlight) => {
              const { num, label } = highlight;
              return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-display text-4xl md:text-5xl font-light mb-1" style={{ color: highlight.color }}>
                  {num}
                </div>
                <div className="font-accent text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground">
                  {label}
                </div>
              </motion.div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Intro Narrative */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="gold-divider mx-auto mb-8" />
              <h2 className="font-display text-4xl md:text-5xl font-light text-ivory mb-6">
                A New Chapter Begins in <span className="text-gold italic">Europe</span>
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
                Sixty is not an ending — it is the most sophisticated beginning. With Annie and Thomas already making their home in Paris, with the political winds shifting, and with a career that has taken you to the highest levels of real estate technology, the question isn't whether Europe is calling. It's which part of Europe to answer first.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
                This guide is Curtis's gift to you: a deeply researched, lovingly curated exploration of three travel packages, six destination cities, five world-class graduate programs, and four visa pathways — all designed around your birthday, your expertise as a Chief Revenue Officer, and your vision for what the next chapter could look like.
              </p>
              <div className="gold-divider mx-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Margaux Feature Section — elevated above overview cards */}
      <section className="py-16 pb-8 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(232,116,138,0.06) 0%, rgba(201,168,76,0.04) 50%, rgba(10,15,30,0) 100%)" }} />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left: Margaux intro */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 glass-card-gold px-4 py-2 rounded-full mb-5">
                <Sparkles size={13} className="text-gold" />
                <span className="font-accent text-xs tracking-[0.2em] uppercase text-gold">Your Personal Concierge</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-ivory mb-3 leading-tight">
                Meet <span className="italic" style={{ color: "#e8748a" }}>Margaux</span>
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                None of the pre-built packages quite right? Margaux is your AI travel concierge — warm, witty, and deeply knowledgeable about European travel. She'll ask you a few smart questions, then build you a fully costed, day-by-day itinerary tailored exactly to you.
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6" style={{ fontStyle: "italic", color: "rgba(232,224,208,0.5)" }}>
                She'll also gently remind you that driving from Bergamo to Positano is not quite the same as a road trip from LA to Tempe — even if the miles look similar on a map.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/build-my-trip">
                  <button className="inline-flex items-center gap-2 font-body font-semibold px-6 py-3 rounded-full text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-lg" style={{ background: "#e8748a", color: "#0a0f1e" }}>
                    <Sparkles size={15} />
                    Start with Margaux
                    <ArrowRight size={15} />
                  </button>
                </Link>
                <Link href="/itineraries">
                  <button className="inline-flex items-center gap-2 glass-card font-body text-ivory px-6 py-3 rounded-full text-sm hover:border-gold/30 transition-all duration-300">
                    Browse Pre-Built Trips
                  </button>
                </Link>
              </div>
            </motion.div>
            {/* Right: Margaux chat preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-card rounded-2xl p-6 space-y-4">
                {/* Margaux greeting bubble */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(232,116,138,0.2)" }}>
                    <Sparkles size={16} style={{ color: "#e8748a" }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-accent text-xs tracking-widest uppercase mb-1.5" style={{ color: "#e8748a" }}>Margaux</p>
                    <div className="rounded-2xl rounded-tl-none p-4" style={{ background: "rgba(232,116,138,0.08)", border: "1px solid rgba(232,116,138,0.15)" }}>
                      <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(232,224,208,0.85)" }}>
                        Bonjour, Melanie! Curtis asked me to help you design the European adventure of your dreams — or as he put it, your <span style={{ color: "#e8748a" }}>'50th birthday trip.'</span> 😉
                      </p>
                    </div>
                  </div>
                </div>
                {/* Sample question */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(232,116,138,0.2)" }}>
                    <Sparkles size={16} style={{ color: "#e8748a" }} />
                  </div>
                  <div className="flex-1">
                    <div className="rounded-2xl rounded-tl-none p-4" style={{ background: "rgba(232,116,138,0.08)", border: "1px solid rgba(232,116,138,0.15)" }}>
                      <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(232,224,208,0.85)" }}>
                        Let's start simple: <strong style={{ color: "rgba(232,224,208,1)" }}>How long is this adventure?</strong> Europe rewards the unhurried.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Sample chips */}
                <div className="flex flex-wrap gap-2 pl-12">
                  {["8 Days", "10 Days", "12 Days", "14 Days"].map((d) => (
                    <Link key={d} href="/build-my-trip">
                      <span className="font-body text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all" style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "#c9a84c" }}>
                        {d}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <Link href="/build-my-trip">
                    <button className="w-full font-body text-xs tracking-widest uppercase py-2 rounded-xl transition-all" style={{ color: "#e8748a", background: "rgba(232,116,138,0.06)" }}>
                      Continue the conversation →
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="py-8 pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-accent text-xs tracking-[0.2em] uppercase text-gold">
              Your Journey
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ivory mt-2">
              Everything in One Place
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {overviewCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={card.href}>
                  <div className={`glass-card package-card rounded-2xl p-8 cursor-pointer bg-gradient-to-br ${card.color}`} style={{ borderColor: `${card.accentColor.replace(')', ' / 0.25)')}` }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl" style={{ background: card.iconBg, border: `1px solid ${card.accentColor.replace(')', ' / 0.3)')}` }}>
                        <card.icon size={22} style={{ color: card.accentColor }} />
                      </div>
                      <ArrowRight size={18} style={{ color: `${card.accentColor.replace(')', ' / 0.5)')}` }} className="mt-1" />
                    </div>
                    <h3 className="font-display text-2xl font-light text-ivory mb-1">
                      {card.title}
                    </h3>
                    <p className="font-accent text-xs tracking-[0.15em] uppercase mb-3" style={{ color: `${card.accentColor.replace(')', ' / 0.8)')}` }}>
                      {card.subtitle}
                    </p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rhine Teaser Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://files.manuscdn.com/user_upload_by_module/session_file/118915275/dspOjTQxYYonioWF.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/30" />
        <div className="relative z-10 container">
          <div className="max-w-xl">
            <span className="font-accent text-xs tracking-[0.2em] uppercase text-gold block mb-4">
              Featured Package
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-light text-ivory mb-4 leading-tight">
              The Rhine<br />
              <span className="text-gold italic">River Cruise</span>
            </h2>
            <p className="font-body text-base text-ivory/70 leading-relaxed mb-8">
              Drift past medieval castles, terraced vineyards, and charming villages. AmaWaterways' 7-night Enchanting Rhine takes you from Basel to Amsterdam — unpack once, experience everything. Prices from $4,349 per person for April 2026 departures.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Basel → Amsterdam", "7 Nights", "All-Inclusive", "From $4,349"].map((tag) => (
                <span key={tag} className="glass-card-gold px-3 py-1.5 rounded-full font-accent text-xs tracking-widest uppercase text-gold">
                  {tag}
                </span>
              ))}
            </div>
            <Link href="/itineraries">
              <button className="inline-flex items-center gap-2 bg-gold text-navy font-body font-medium px-6 py-3 rounded-full hover:bg-gold-light transition-all duration-300">
                View All Packages
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/relocation">
              <div className="glass-card package-card rounded-2xl p-6 cursor-pointer transition-all" style={{ borderColor: "oklch(0.72 0.18 28 / 0.2)" }}>
                <p className="font-accent text-xs tracking-[0.15em] uppercase mb-2" style={{ color: "oklch(0.72 0.18 28 / 0.9)" }}>Relocation Guide</p>
                <h3 className="font-display text-xl font-light text-ivory mb-2">Portugal D8 Visa</h3>
                <p className="font-body text-sm text-muted-foreground">The easiest path for remote workers. Earn 4× Portugal's minimum wage and you qualify. Lisbon awaits.</p>
              </div>
            </Link>
            <Link href="/grad-schools">
              <div className="glass-card package-card rounded-2xl p-6 cursor-pointer transition-all" style={{ borderColor: "oklch(0.72 0.12 295 / 0.2)" }}>
                <p className="font-accent text-xs tracking-[0.15em] uppercase mb-2" style={{ color: "oklch(0.72 0.12 295 / 0.9)" }}>Graduate Schools</p>
                <h3 className="font-display text-xl font-light text-ivory mb-2">The Lisbon MBA</h3>
                <p className="font-body text-sm text-muted-foreground">€39,500 for an Executive MBA with MIT Sloan immersion. Triple Crown accredited. The best value in Europe.</p>
              </div>
            </Link>
            <Link href="/flights">
              <div className="glass-card package-card rounded-2xl p-6 cursor-pointer transition-all" style={{ borderColor: "oklch(0.68 0.12 195 / 0.2)" }}>
                <p className="font-accent text-xs tracking-[0.15em] uppercase mb-2" style={{ color: "oklch(0.68 0.12 195 / 0.9)" }}>Flights from LAX</p>
                <h3 className="font-display text-xl font-light text-ivory mb-2">Paris from $923</h3>
                <p className="font-body text-sm text-muted-foreground">Round-trip to Paris CDG from Los Angeles. See Annie first, then explore. Open-jaw tickets recommended.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Margaux bottom reminder before footer */}

      <Footer />
    </div>
  );
}
