/*
  Lola's Adventure — Home Page
  Design: Dark ocean, teal & coral accents, Space Grotesk + Syne typography
  Hero: Full-bleed coastal highway image, countdown to April 15, Dad's message
*/
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Waves, TreePine, Mountain, Heart, Cat, Fish, Star } from "lucide-react";
import LolaNavigation from "@/components/LolaNavigation";
import LolaFooter from "@/components/LolaFooter";

const TRIP_START = new Date("2026-04-15T00:00:00");

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/lola-hero-main-hoXwcA8Uyf75JRwHJsdyfW.webp";
const LOLA_BOAT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/lola-boat-ocean_6dca7f23.jpg";
const LOLA_DAD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/lola-dad-townsville_a3ef2b74.jpg";
const MG_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/lola-mg-front_b3b3dde7.webp";
const STORMY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/stormy-sleeping_6b6898e0.jpg";

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = TRIP_START.getTime() - now.getTime();
      if (diff <= 0) {
        setStarted(true);
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

  if (started) {
    return (
      <div className="text-center">
        <div className="font-lola-display text-2xl font-700 text-reef-teal">Adventure is ON! 🐚</div>
        <div className="font-lola-body text-sm text-sand/60 mt-1">The road is calling, Lola.</div>
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4 md:gap-6 justify-center">
      {units.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div
            className="font-lola-display font-700 text-reef-teal leading-none"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}
          >
            {String(value).padStart(2, "0")}
          </div>
          <div className="font-lola-mono text-[0.58rem] tracking-[0.18em] uppercase text-reef-teal/50 mt-1">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

const adventures = [
  {
    icon: Waves,
    title: "North ↑",
    subtitle: "Cairns & the Daintree",
    desc: "Drive the Great Green Way to the world's oldest rainforest, snorkel the outer reef, and watch the Daintree River at dawn. 5–7 days of pure wild north.",
    href: "/north",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/lola-north-cairns-SZ3PxnRFuuYPAK5Fnmihvu.webp",
    color: "from-[oklch(0.20_0.10_205/0.6)] to-[oklch(0.14_0.06_225/0.3)]",
    accent: "text-reef-teal",
    badge: "4.5 hrs · 346 km",
  },
  {
    icon: Star,
    title: "South ↓",
    subtitle: "Airlie Beach & the Whitsundays",
    desc: "Whitehaven Beach — the whitest sand on Earth. Sail the 74 islands, snorkel Heart Reef, and find the kind of people who also choose boats over bars.",
    href: "/south",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/lola-south-whitsundays-3DDytiHa9yJ8zhEesfcq3J.webp",
    color: "from-[oklch(0.22_0.08_200/0.6)] to-[oklch(0.14_0.06_225/0.3)]",
    accent: "text-seafoam",
    badge: "3.5 hrs · 275 km",
  },
  {
    icon: TreePine,
    title: "Wild Card 1",
    subtitle: "Eungella & Conway NP",
    desc: "The platypus capital of Australia. Misty rainforest, hidden waterfalls, and a mountain retreat where the only nightlife is a platypus at dusk.",
    href: "/wildcard-rainforest",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/lola-wildcard-eungella-kuRJoLD53puA34GE2Ty8eV.webp",
    color: "from-[oklch(0.18_0.08_155/0.6)] to-[oklch(0.14_0.06_225/0.3)]",
    accent: "text-seafoam",
    badge: "3 hrs · 240 km",
  },
  {
    icon: Mountain,
    title: "Wild Card 2",
    subtitle: "Undara Lava Tubes",
    desc: "190,000-year-old volcanic tunnels stretching 160 km underground. Wallabies at sunrise, bats at dusk, and a sky so dark you'll see the Milky Way like a river.",
    href: "/wildcard-outback",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/lola-wildcard-outback-6EDHRMEWs8UXbrAunTzp3W.webp",
    color: "from-[oklch(0.22_0.06_50/0.5)] to-[oklch(0.14_0.06_225/0.3)]",
    accent: "text-coral-reef",
    badge: "4 hrs · 320 km",
  },
];

const highlights = [
  { num: "4", label: "Road Trip Routes" },
  { num: "18", label: "Days to Explore" },
  { num: "1,200+", label: "km of Coastline" },
  { num: "1", label: "Very Good Cat" },
];

export default function LolaHome() {
  return (
    <div
      className="min-h-screen font-lola-body"
      style={{ background: "oklch(0.12 0.07 220)", color: "oklch(0.92 0.02 80)" }}
    >
      <LolaNavigation />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div className="absolute inset-0 lola-hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.14_0.06_225/0.5)] via-transparent to-[oklch(0.14_0.06_225/0.25)]" />

        <div className="relative z-10 container text-center py-32 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-reef px-5 py-2.5 rounded-full mb-8">
              <Cat size={13} className="text-coral-reef" />
              <span className="font-lola-mono text-xs tracking-[0.18em] uppercase text-reef-teal">
                Stormy rides shotgun
              </span>
              <Cat size={13} className="text-coral-reef" />
            </div>

            <h1
              className="font-lola-display font-800 text-sand leading-none mb-3"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
            >
              Go Explore,{" "}
              <span
                className="text-reef-teal"
                style={{ textShadow: "0 0 40px oklch(0.62 0.18 195 / 0.5)" }}
              >
                Lola
              </span>
            </h1>
            <p
              className="font-lola-display font-400 text-sand/70 italic mb-3"
              style={{ fontSize: "clamp(1.1rem, 3vw, 1.8rem)" }}
            >
              Music cranked. Wind in your hair. The Coral Sea on your left.
            </p>
            <p className="font-lola-body text-sm text-sand/50 max-w-xl mx-auto mb-12 leading-relaxed">
              Finals are done. The MG is gassed up. Stormy is ready. You've got 18 days and the most extraordinary stretch of coastline on Earth outside your door — so where does your heart lead?
            </p>

            {/* Countdown */}
            <div className="glass-ocean rounded-2xl p-6 md:p-8 max-w-md mx-auto mb-10">
              <p className="font-lola-mono text-xs tracking-[0.18em] uppercase text-reef-teal/60 mb-4">
                Countdown to April 15, 2026
              </p>
              <Countdown />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/north">
                <button className="btn-reef inline-flex items-center gap-2 px-6 py-3 rounded-full font-lola-body font-500 text-sm">
                  Start Exploring
                  <ArrowRight size={15} />
                </button>
              </Link>
              <Link href="/marine-volunteer">
                <button className="glass-ocean inline-flex items-center gap-2 px-6 py-3 rounded-full font-lola-body text-sm text-sand/80 hover:text-reef-teal transition-colors">
                  <Fish size={14} />
                  Marine Volunteer Ops
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sand/30">
          <span className="font-lola-mono text-[0.55rem] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-sand/30 to-transparent" />
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="py-12 border-y" style={{ borderColor: "oklch(0.62 0.18 195 / 0.12)" }}>
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
                <div
                  className="font-lola-display font-700 text-reef-teal leading-none mb-1"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                  {num}
                </div>
                <div className="font-lola-mono text-[0.6rem] tracking-[0.15em] uppercase text-sand/40">
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dad's Letter ── */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="reef-divider mb-8" />
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="flex-1">
                  <span className="font-lola-mono text-xs tracking-[0.18em] uppercase text-reef-teal block mb-4">
                    A note from Dad
                  </span>
                  <h2
                    className="font-lola-display font-700 text-sand mb-5 leading-tight"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
                  >
                    You just crushed your first trimester.
                    <span className="text-reef-teal"> Now go be wild.</span>
                  </h2>
                  <p className="font-lola-body text-sm text-sand/60 leading-relaxed mb-4">
                    You moved to the other side of the world, started a marine biology degree, got yourself a car, adopted a tiny hurricane named Stormy, and survived your first round of JCU finals — all in the same semester. That's not just impressive. That's extraordinary.
                  </p>
                  <p className="font-lola-body text-sm text-sand/60 leading-relaxed mb-4">
                    You're sitting in one of the most biodiverse corners of the planet. The Great Barrier Reef is literally in your backyard. The Daintree — the oldest rainforest on Earth — is a day's drive north. The Whitsundays are south. And you've got 18 days, a blue MG, a co-pilot named Stormy, and a dad who wants to see you go find something that makes your heart race.
                  </p>
                  <p className="font-lola-body text-sm text-sand/60 leading-relaxed">
                    I built this for you. Four routes, fully researched, with the best breakfasts, the best reef snorkels, the best hikes, and a few marine conservation programs that I think might be the most meaningful thing you do all year. Pick one. Or all four. I've got the accommodation.
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <Heart size={14} className="text-coral-reef fill-coral-reef" />
                    <span className="font-lola-display font-600 text-sand/80 text-lg italic">— Dad</span>
                  </div>
                </div>

                {/* Photo stack */}
                <div className="flex-shrink-0 w-full md:w-56 space-y-3">
                  <div className="rounded-xl overflow-hidden aspect-[4/3]">
                    <img src={LOLA_DAD_IMG} alt="Lola and Dad in Townsville" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-[4/3]">
                    <img src={LOLA_BOAT_IMG} alt="Lola on the boat" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-video">
                    <img src={STORMY_IMG} alt="Stormy sleeping" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="reef-divider mt-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Adventure Cards ── */}
      <section className="py-8 pb-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-lola-mono text-xs tracking-[0.18em] uppercase text-reef-teal">
              Choose Your Adventure
            </span>
            <h2
              className="font-lola-display font-700 text-sand mt-2"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              Four Roads Out of Townsville
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {adventures.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={card.href}>
                  <div className="lola-card glass-ocean rounded-2xl overflow-hidden cursor-pointer group">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-b ${card.color}`} />
                      <div className="absolute top-3 right-3 glass-ocean px-3 py-1 rounded-full">
                        <span className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-reef-teal/80">
                          {card.badge}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="glass-reef p-2.5 rounded-xl">
                          <card.icon size={18} className="text-reef-teal" />
                        </div>
                        <ArrowRight size={16} className="text-reef-teal/30 group-hover:text-reef-teal mt-1 transition-colors" />
                      </div>
                      <h3
                        className={`font-lola-display font-700 ${card.accent} mb-0.5`}
                        style={{ fontSize: "1.4rem" }}
                      >
                        {card.title}
                      </h3>
                      <p className="font-lola-mono text-[0.65rem] tracking-[0.15em] uppercase text-sand/50 mb-3">
                        {card.subtitle}
                      </p>
                      <p className="font-lola-body text-sm text-sand/60 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MG Feature ── */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${MG_IMG}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.07_220/0.92)] via-[oklch(0.12_0.07_220/0.65)] to-[oklch(0.12_0.07_220/0.3)]" />
        <div className="relative z-10 container">
          <div className="max-w-lg">
            <span className="font-lola-mono text-xs tracking-[0.18em] uppercase text-reef-teal block mb-4">
              Your Ride
            </span>
            <h2
              className="font-lola-display font-700 text-sand mb-4 leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              The Blue MG.
              <br />
              <span className="text-reef-teal">Your freedom machine.</span>
            </h2>
            <p className="font-lola-body text-sm text-sand/65 leading-relaxed mb-8">
              You picked it yourself, drove it off the lot, and already know it handles North Queensland like it was built for it. Every route in this guide has been mapped to keep legs under 5 hours — so you're never stuck in the car when you could be in the water.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Fuel stops mapped", "Cat-friendly stays", "Snack pack essentials", "Offline maps tip"].map((tag) => (
                <span key={tag} className="glass-reef px-3 py-1.5 rounded-full font-lola-mono text-xs tracking-widest uppercase text-reef-teal">
                  {tag}
                </span>
              ))}
            </div>
            <Link href="/north">
              <button className="btn-reef inline-flex items-center gap-2 px-6 py-3 rounded-full font-lola-body font-500 text-sm">
                <Compass size={14} />
                Pick a Route
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Marine Volunteer Teaser ── */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="glass-reef rounded-2xl p-8 md:p-12">
              <div className="glass-coral-reef w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Fish size={26} className="text-coral-reef" />
              </div>
              <span className="font-lola-mono text-xs tracking-[0.18em] uppercase text-reef-teal block mb-3">
                For the Marine Bio in You
              </span>
              <h2
                className="font-lola-display font-700 text-sand mb-4"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
              >
                Coral Restoration. Sea Turtle Programs.
                <span className="text-reef-teal"> Real Field Work.</span>
              </h2>
              <p className="font-lola-body text-sm text-sand/60 leading-relaxed mb-8 max-w-xl mx-auto">
                You spent a year and a half rehabbing seals and pelicans in Malibu. There are programs right here in North Queensland — coral reef monitoring, turtle nesting patrols, citizen science reef surveys — that would love someone with your hands-on background. This could be the most meaningful week of your break.
              </p>
              <Link href="/marine-volunteer">
                <button className="btn-coral-reef inline-flex items-center gap-2 px-6 py-3 rounded-full font-lola-body font-500 text-sm">
                  Explore Volunteer Ops
                  <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <LolaFooter />
    </div>
  );
}
