/* 
  Design: The Modern European — Refined Glass & Gold
  Home: Full-bleed hero with birthday countdown, overview cards, and intro narrative
  Images: Provençal birthday dinner (hero), Rhine river (package preview)
*/
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Plane, Ship, GraduationCap, MapPin, ArrowRight, Star } from "lucide-react";
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
  },
  {
    icon: MapPin,
    title: "Iberian Explorer",
    subtitle: "Spain & Portugal",
    desc: "Lisbon's azulejos, Porto's port wine, Seville's flamenco, and Madrid's world-class art. 10–14 days of wonder.",
    href: "/destinations",
    color: "from-amber-900/30 to-amber-800/10",
  },
  {
    icon: Plane,
    title: "Southern France",
    subtitle: "Provence & Riviera",
    desc: "Lavender fields, the Côte d'Azur, and a reunion with Annie in Paris. The art de vivre at its finest.",
    href: "/destinations",
    color: "from-purple-900/30 to-purple-800/10",
  },
  {
    icon: GraduationCap,
    title: "The Next Chapter",
    subtitle: "Graduate Schools & Relocation",
    desc: "INSEAD, HEC Paris, IE Madrid, Lisbon MBA — top executive programs. Plus visa pathways and cost of living guides.",
    href: "/grad-schools",
    color: "from-emerald-900/30 to-emerald-800/10",
  },
];

const highlights = [
  { num: "3", label: "Curated Itineraries" },
  { num: "6", label: "Destination Cities" },
  { num: "5", label: "Top Graduate Programs" },
  { num: "4", label: "Visa Pathways" },
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
            <div className="inline-flex items-center gap-2 glass-card-gold px-4 py-2 rounded-full mb-8">
              <Star size={12} className="text-gold fill-gold" />
              <span className="font-accent text-xs tracking-[0.2em] uppercase text-gold">
                A 60th Birthday to Remember
              </span>
              <Star size={12} className="text-gold fill-gold" />
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
            <div className="glass-card rounded-2xl p-6 md:p-8 max-w-lg mx-auto mb-10">
              <p className="font-accent text-xs tracking-[0.2em] uppercase text-gold/70 mb-4">
                Countdown to March 26, 2026
              </p>
              <Countdown />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/itineraries">
                <button className="inline-flex items-center gap-2 bg-gold text-navy font-body font-medium px-6 py-3 rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20">
                  Explore Itineraries
                  <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/destinations">
                <button className="inline-flex items-center gap-2 glass-card text-ivory font-body px-6 py-3 rounded-full hover:border-gold/30 transition-all duration-300">
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
            {highlights.map(({ num, label }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-display text-4xl md:text-5xl font-light text-gold mb-1">
                  {num}
                </div>
                <div className="font-accent text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground">
                  {label}
                </div>
              </motion.div>
            ))}
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
                  <div className={`glass-card package-card rounded-2xl p-8 cursor-pointer bg-gradient-to-br ${card.color}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="glass-card-gold p-3 rounded-xl">
                        <card.icon size={22} className="text-gold" />
                      </div>
                      <ArrowRight size={18} className="text-gold/40 mt-1" />
                    </div>
                    <h3 className="font-display text-2xl font-light text-ivory mb-1">
                      {card.title}
                    </h3>
                    <p className="font-accent text-xs tracking-[0.15em] uppercase text-gold/70 mb-3">
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
              <div className="glass-card package-card rounded-2xl p-6 cursor-pointer border-gold/10 hover:border-gold/25 transition-all">
                <p className="font-accent text-xs tracking-[0.15em] uppercase text-gold/70 mb-2">Relocation Guide</p>
                <h3 className="font-display text-xl font-light text-ivory mb-2">Portugal D8 Visa</h3>
                <p className="font-body text-sm text-muted-foreground">The easiest path for remote workers. Earn 4× Portugal's minimum wage and you qualify. Lisbon awaits.</p>
              </div>
            </Link>
            <Link href="/grad-schools">
              <div className="glass-card package-card rounded-2xl p-6 cursor-pointer border-gold/10 hover:border-gold/25 transition-all">
                <p className="font-accent text-xs tracking-[0.15em] uppercase text-gold/70 mb-2">Graduate Schools</p>
                <h3 className="font-display text-xl font-light text-ivory mb-2">The Lisbon MBA</h3>
                <p className="font-body text-sm text-muted-foreground">€39,500 for an Executive MBA with MIT Sloan immersion. Triple Crown accredited. The best value in Europe.</p>
              </div>
            </Link>
            <Link href="/flights">
              <div className="glass-card package-card rounded-2xl p-6 cursor-pointer border-gold/10 hover:border-gold/25 transition-all">
                <p className="font-accent text-xs tracking-[0.15em] uppercase text-gold/70 mb-2">Flights from LAS</p>
                <h3 className="font-display text-xl font-light text-ivory mb-2">Paris from $923</h3>
                <p className="font-body text-sm text-muted-foreground">Round-trip to Paris CDG from Las Vegas. See Annie first, then explore. Open-jaw tickets recommended.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
