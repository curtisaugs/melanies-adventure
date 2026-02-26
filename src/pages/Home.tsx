import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Plane, Ship, GraduationCap, MapPin, ArrowRight, Star, Sparkles } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const BIRTHDAY = new Date("2026-03-26T00:00:00");

const HERO_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/118915275/AUalUDGvKUnmAKsA.png";
const RHINE_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/118915275/dspOjTQxYYonioWF.png";

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = BIRTHDAY.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
      ].map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="countdown-num">{String(value).padStart(2, "0")}</div>
          <div className="font-accent text-[0.6rem] tracking-[0.2em] uppercase mt-1"
            style={{ color: "rgba(180,150,80,0.6)" }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

const overviewCards = [
  { icon: Ship, title: "River Cruises", subtitle: "Rhine & Danube", desc: "Unpack once, drift through castles, vineyards, and medieval towns. Three curated cruise packages from $4,349.", href: "/itineraries", color: "from-blue-900/30 to-blue-800/10" },
  { icon: MapPin, title: "Iberian Explorer", subtitle: "Spain & Portugal", desc: "Lisbon's azulejos, Porto's port wine, Seville's flamenco, and Madrid's world-class art. 10–14 days of wonder.", href: "/destinations", color: "from-amber-900/30 to-amber-800/10" },
  { icon: Plane, title: "Southern France", subtitle: "Provence & Riviera", desc: "Lavender fields, the Côte d'Azur, and a reunion with Annie in Paris. The art de vivre at its finest.", href: "/destinations", color: "from-purple-900/30 to-purple-800/10" },
  { icon: GraduationCap, title: "The Next Chapter", subtitle: "Graduate Schools & Relocation", desc: "INSEAD, HEC Paris, IE Madrid, Lisbon MBA — top executive programs. Plus visa pathways and cost of living guides.", href: "/grad-schools", color: "from-emerald-900/30 to-emerald-800/10" },
];

const highlights = [
  { num: "3", label: "Curated Itineraries" },
  { num: "10", label: "Destination Cities" },
  { num: "5", label: "Top Graduate Programs" },
  { num: "4", label: "Visa Pathways" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-navy text-ivory">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_IMG}')` }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(6,8,20,0.6) 0%, transparent 50%, rgba(6,8,20,0.3) 100%)" }} />

        <div className="relative z-10 container text-center py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            {/* Birthday badge with 60th→50th gag */}
            <div className="inline-flex items-center gap-3 glass-card-gold px-7 py-3 rounded-full mb-8">
              <Star size={14} className="text-gold fill-gold" style={{ color: "var(--gold)" }} />
              <span className="font-accent text-sm tracking-[0.2em] uppercase text-gold" style={{ color: "var(--gold)" }}>
                A{" "}
                <span className="relative inline-block">
                  <span style={{ color: "rgba(180,150,80,0.45)", fontSize: "1em" }}>60th</span>
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ top: "50%", transform: "translateY(-50%)" }}>
                    <svg viewBox="0 0 48 10" className="w-full" style={{ height: "10px", overflow: "visible" }}>
                      <path d="M2,5 Q10,2 20,6 Q30,10 38,4 Q42,2 46,5"
                        stroke="oklch(0.72 0.12 75)" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="font-handwriting absolute"
                    style={{ fontSize: "1.5rem", top: "-1.4rem", left: "50%", transform: "translateX(-40%) rotate(-8deg)", whiteSpace: "nowrap", color: "oklch(0.75 0.18 15)", textShadow: "0 0 16px oklch(0.75 0.18 15 / 0.5)" }}>
                    50th!
                  </span>
                </span>
                {" "}Birthday to Remember
              </span>
              <Star size={14} style={{ color: "var(--gold)" }} />
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-ivory mb-4 leading-none">
              Welcome, <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Melanie</span>
            </h1>
            <p className="font-display text-xl md:text-2xl font-light italic mb-2"
              style={{ color: "rgba(240,235,220,0.7)" }}>
              Your European Adventure Awaits
            </p>
            <p className="font-body text-sm md:text-base max-w-xl mx-auto mb-12 leading-relaxed"
              style={{ color: "rgba(240,235,220,0.5)" }}>
              From the Rhine's medieval castles to Lisbon's sun-drenched hills, from Provençal lavender fields to a reunion with Annie in Paris — this is your moment to explore, celebrate, and dream of what comes next.
            </p>

            {/* Countdown */}
            <div className="glass-card rounded-2xl p-6 md:p-8 max-w-lg mx-auto mb-10">
              <p className="font-accent text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: "rgba(180,150,80,0.7)" }}>
                Countdown to March 26, 2026
              </p>
              <Countdown />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/itineraries">
                <button className="inline-flex items-center gap-2 font-body font-medium px-6 py-3 rounded-full transition-all duration-300"
                  style={{ background: "var(--gold)", color: "var(--navy)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-light)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}>
                  Explore Itineraries <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/destinations">
                <button className="inline-flex items-center gap-2 glass-card font-body px-6 py-3 rounded-full transition-all duration-300 text-ivory"
                  style={{ color: "var(--ivory)" }}>
                  Browse Destinations
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "rgba(240,235,220,0.3)" }}>
          <span className="font-accent text-[0.6rem] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, rgba(240,235,220,0.3), transparent)" }} />
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {highlights.map(({ num, label }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-light mb-1" style={{ color: "var(--gold)" }}>{num}</div>
                <div className="font-accent text-[0.65rem] tracking-[0.15em] uppercase" style={{ color: "var(--muted)" }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Narrative */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="gold-divider mx-auto mb-8" />
              <h2 className="font-display text-4xl md:text-5xl font-light text-ivory mb-6">
                A New Chapter Begins in <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Europe</span>
              </h2>
              <p className="font-body text-base leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                Sixty is not an ending — it is the most sophisticated beginning. With Annie and Thomas already making their home in Paris, with the political winds shifting, and with a career that has taken you to the highest levels of real estate technology, the question isn't whether Europe is calling. It's which part of Europe to answer first.
              </p>
              <p className="font-body text-base leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
                This guide is Curtis's gift to you: a deeply researched, lovingly curated exploration of three travel packages, ten destination cities, five world-class graduate programs, and four visa pathways — all designed around your birthday, your expertise as a Chief Revenue Officer, and your vision for what the next chapter could look like.
              </p>
              <div className="gold-divider mx-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Margaux — AI Trip Builder (Prominent Feature) */}
      <section className="py-20" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 glass-card-gold px-4 py-2 rounded-full mb-6">
                <Sparkles size={14} style={{ color: "var(--gold)" }} />
                <span className="font-accent text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
                  New Feature
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-ivory mb-4">
                Meet <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Margaux</span>
              </h2>
              <p className="font-body text-base leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                Your personal AI travel concierge. Margaux asks the right questions — how long, which regions, what budget, what vibe — then researches and builds you a completely custom day-by-day European itinerary.
              </p>
              <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "rgba(180,150,80,0.7)", fontStyle: "italic" }}>
                "None of the pre-built packages are quite right? Let me build you something perfect. And yes — I will gently remind you that Bergamo to Positano is not an afternoon drive. Europe is not a road trip from LA to Tempe."
              </p>
              <p className="font-body text-sm leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
                Save your itinerary and share it with Curtis, a travel agent, or Annie in Paris with a single link.
              </p>
              <Link href="/trip-builder">
                <button className="inline-flex items-center gap-2 font-body font-semibold px-8 py-4 rounded-full transition-all duration-300 text-lg"
                  style={{ background: "var(--gold)", color: "var(--navy)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-light)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}>
                  <Sparkles size={18} />
                  Build My Trip with Margaux
                </button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-lg font-light"
                    style={{ background: "var(--gold)", color: "var(--navy)" }}>M</div>
                  <div>
                    <div className="font-display text-base font-light text-ivory">Margaux</div>
                    <div className="font-body text-xs" style={{ color: "var(--muted)" }}>Your European Travel Concierge</div>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="glass-card-dark rounded-xl p-4">
                    <p className="font-body text-sm text-ivory leading-relaxed">
                      Bonjour, Melanie! 🥂 Curtis has asked me to help you design your perfect European adventure. Let's start with the most important question...
                    </p>
                  </div>
                  <div className="glass-card-dark rounded-xl p-4">
                    <p className="font-body text-sm font-medium mb-3" style={{ color: "var(--gold)" }}>
                      How many days are you dreaming of?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["7–8 days", "10–11 days", "12–14 days", "2+ weeks"].map((opt) => (
                        <span key={opt} className="glass-card px-3 py-1.5 rounded-full font-body text-xs cursor-pointer transition-all"
                          style={{ color: "rgba(240,235,220,0.7)" }}>
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Link href="/trip-builder">
                  <button className="w-full font-body text-sm py-3 rounded-xl transition-all"
                    style={{ background: "rgba(180,150,80,0.15)", color: "var(--gold)", border: "1px solid rgba(180,150,80,0.3)" }}>
                    Start Planning with Margaux →
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="py-8 pb-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-12">
            <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>Your Journey</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ivory mt-2">Everything in One Place</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {overviewCards.map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link href={card.href}>
                  <div className={`glass-card package-card rounded-2xl p-8 cursor-pointer bg-gradient-to-br ${card.color}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="glass-card-gold p-3 rounded-xl">
                        <card.icon size={22} style={{ color: "var(--gold)" }} />
                      </div>
                      <ArrowRight size={18} style={{ color: "rgba(180,150,80,0.4)" }} className="mt-1" />
                    </div>
                    <h3 className="font-display text-2xl font-light text-ivory mb-1">{card.title}</h3>
                    <p className="font-accent text-xs tracking-[0.15em] uppercase mb-3" style={{ color: "rgba(180,150,80,0.7)" }}>{card.subtitle}</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{card.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rhine Teaser */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${RHINE_IMG}')` }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(6,8,20,0.9) 0%, rgba(6,8,20,0.6) 50%, rgba(6,8,20,0.3) 100%)" }} />
        <div className="relative z-10 container">
          <div className="max-w-xl">
            <span className="font-accent text-xs tracking-[0.2em] uppercase block mb-4" style={{ color: "var(--gold)" }}>
              Featured Package
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-light text-ivory mb-4 leading-tight">
              The Rhine<br />
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>River Cruise</span>
            </h2>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: "rgba(240,235,220,0.7)" }}>
              Drift past medieval castles, terraced vineyards, and charming villages. AmaWaterways' 7-night Enchanting Rhine takes you from Basel to Amsterdam — unpack once, experience everything. Your birthday falls on the March 26 departure date.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Basel → Amsterdam", "7 Nights", "All-Inclusive", "From $4,349"].map((tag) => (
                <span key={tag} className="glass-card-gold px-3 py-1.5 rounded-full font-accent text-xs tracking-widest uppercase"
                  style={{ color: "var(--gold)" }}>{tag}</span>
              ))}
            </div>
            <Link href="/itineraries">
              <button className="inline-flex items-center gap-2 font-body font-medium px-6 py-3 rounded-full transition-all duration-300"
                style={{ background: "var(--gold)", color: "var(--navy)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-light)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}>
                View All Packages <ArrowRight size={16} />
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
              <div className="glass-card package-card rounded-2xl p-6 cursor-pointer">
                <p className="font-accent text-xs tracking-[0.15em] uppercase mb-2" style={{ color: "rgba(180,150,80,0.7)" }}>Relocation Guide</p>
                <h3 className="font-display text-xl font-light text-ivory mb-2">Portugal D8 Visa</h3>
                <p className="font-body text-sm" style={{ color: "var(--muted)" }}>The easiest path for remote workers. Earn 4× Portugal's minimum wage and you qualify. Lisbon awaits.</p>
              </div>
            </Link>
            <Link href="/grad-schools">
              <div className="glass-card package-card rounded-2xl p-6 cursor-pointer">
                <p className="font-accent text-xs tracking-[0.15em] uppercase mb-2" style={{ color: "rgba(180,150,80,0.7)" }}>Graduate Schools</p>
                <h3 className="font-display text-xl font-light text-ivory mb-2">The Lisbon MBA</h3>
                <p className="font-body text-sm" style={{ color: "var(--muted)" }}>€39,500 for an Executive MBA with MIT Sloan immersion. Triple Crown accredited. The best value in Europe.</p>
              </div>
            </Link>
            <Link href="/flights">
              <div className="glass-card package-card rounded-2xl p-6 cursor-pointer">
                <p className="font-accent text-xs tracking-[0.15em] uppercase mb-2" style={{ color: "rgba(180,150,80,0.7)" }}>Flights from LAX</p>
                <h3 className="font-display text-xl font-light text-ivory mb-2">Paris from $923</h3>
                <p className="font-body text-sm" style={{ color: "var(--muted)" }}>Round-trip to Paris CDG from Los Angeles. See Annie first, then explore. Open-jaw tickets recommended.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
