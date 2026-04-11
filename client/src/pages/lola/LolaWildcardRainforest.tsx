/*
  Lola's Adventure — Wild Card 1: Hidden Gems Near Townsville
  3–4 day micro-adventure: Paluma Range, Wallaman Falls, Cardwell, Hinchinbrook
*/
import { motion } from "framer-motion";
import { Waves, MapPin, Coffee, Fish, Cat, Clock, DollarSign, ArrowLeft, Star, Zap } from "lucide-react";
import { Link } from "wouter";
import LolaNavigation from "@/components/LolaNavigation";
import LolaFooter from "@/components/LolaFooter";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/lola-wildcard-eungella-kuRJoLD53puA34GE2Ty8eV.webp";

const days = [
  {
    day: 1,
    title: "Townsville → Paluma Range",
    drive: "1.5–2 hrs · 80 km",
    highlights: [
      "Drive up the range into cloud forest",
      "Little Crystal Creek — stone bridge, swimming hole",
      "Big Crystal Creek — deeper pools, fewer crowds",
      "Hidden Valley walk",
      "Mahogany glider spotting at dusk",
    ],
    stay: "Paluma Rainforest Inn or nearby pet-friendly option (confirm cat policy)",
    eat: "Pack brekky from Townsville — Paluma has limited cafes",
    stormy: "Check pet policy with accommodation. Paluma is cool and quiet — perfect for a cat.",
    marineNote: "Paluma Range is a 'sky island' — isolated rainforest on a plateau. The mahogany glider is critically endangered and found only in a narrow coastal strip of North Queensland. Dusk spotlighting is your best chance.",
  },
  {
    day: 2,
    title: "Paluma → Wallaman Falls → Cardwell",
    drive: "2–2.5 hrs via Ingham · 120 km",
    highlights: [
      "Wallaman Falls — 268m single-drop (Australia's highest)",
      "Djyinda Trail to the base of the falls",
      "Lookout platform views",
      "Drive to Cardwell",
      "Cardwell Spa Pool at sunset",
    ],
    stay: "Cardwell Beachcomber Motel & Tourist Park — pet-friendly, ~$125–180/night",
    eat: "Seabreeze Cafe Lounge, Brearley's Bakery",
    stormy: "Cardwell Beachcomber is well-established pet-friendly. Stormy will be comfortable.",
    marineNote: "Wallaman Falls drops into Girringun National Park. The gorge below is home to freshwater turtles, platypus, and rare freshwater fish. The mist at the base creates a permanent micro-climate — look for mosses and ferns found nowhere else.",
  },
  {
    day: 3,
    title: "Cardwell — Hinchinbrook & Pelorus Island",
    drive: "Boat day",
    highlights: [
      "Hinchinbrook Channel scenic boat tour",
      "Pelorus Island snorkelling — magnificent fringing reef",
      "Dugong and marine bird spotting in the channel",
      "Mangrove ecosystem views",
      "Afternoon beach walk in Cardwell",
    ],
    stay: "Cardwell (second night) or drive back to Townsville",
    eat: "Cardwell Beachfront Motel & Cafe",
    stormy: "Stormy stays at the motel for the boat day. Leave food, water, and the fan on.",
    marineNote: "Pelorus Island has some of the best fringing reef in North Queensland — less visited than the Whitsundays, more pristine. The Hinchinbrook Channel is a critical dugong habitat. Keep eyes peeled.",
  },
];

const quickStats = [
  { icon: Clock, label: "Duration", value: "3–4 Days" },
  { icon: MapPin, label: "Distance", value: "~350 km" },
  { icon: DollarSign, label: "Est. Budget", value: "~$450–820 AUD" },
  { icon: Zap, label: "Best For", value: "Quick Escape" },
];

export default function LolaWildcardRainforest() {
  return (
    <div className="min-h-screen font-lola-body" style={{ background: "oklch(0.12 0.07 220)", color: "oklch(0.92 0.02 80)" }}>
      <LolaNavigation />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${HERO}')` }} />
        <div className="absolute inset-0 lola-hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.14_0.06_225/0.6)] to-transparent" />
        <div className="relative z-10 container pb-16 pt-32">
          <Link href="/lola">
            <button className="glass-ocean inline-flex items-center gap-2 px-4 py-2 rounded-full font-lola-mono text-xs tracking-widest uppercase text-reef-teal mb-8 hover:text-sand transition-colors">
              <ArrowLeft size={12} /> Back to Home
            </button>
          </Link>
          <div className="inline-flex items-center gap-2 glass-reef px-4 py-2 rounded-full mb-4">
            <Zap size={13} className="text-coral-reef" />
            <span className="font-lola-mono text-xs tracking-[0.18em] uppercase text-coral-reef">Wild Card 1 · 3–4 Days</span>
          </div>
          <h1 className="font-lola-display font-800 text-sand leading-none mb-3" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
            Hidden Gems{" "}
            <span className="text-reef-teal" style={{ textShadow: "0 0 30px oklch(0.62 0.18 195 / 0.5)" }}>
              Close to Home
            </span>
          </h1>
          <p className="font-lola-body text-sm text-sand/60 max-w-xl leading-relaxed">
            Most tourists drive straight past these places. A 3–4 day micro-adventure that packs in Australia's highest waterfall, a sky island rainforest, pristine fringing reef, and a channel full of dugongs — all within 2 hours of Townsville.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-10 border-b" style={{ borderColor: "oklch(0.62 0.18 195 / 0.12)" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickStats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass-ocean rounded-xl p-4 text-center">
                <Icon size={18} className="text-reef-teal mx-auto mb-2" />
                <div className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-sand/40 mb-1">{label}</div>
                <div className="font-lola-display font-600 text-sand text-lg">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Route */}
      <section className="py-10">
        <div className="container">
          <div className="max-w-3xl mx-auto glass-ocean rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Zap size={18} className="text-coral-reef" />
              <h3 className="font-lola-display font-700 text-sand text-xl">Why This Route is Special</h3>
            </div>
            <p className="font-lola-body text-sm text-sand/60 leading-relaxed mb-4">
              This is the route for when you want to feel like you've discovered something. Paluma Range is one of Queensland's least-visited national parks despite being extraordinary. Wallaman Falls is genuinely jaw-dropping and usually has almost no one there. Pelorus Island has better snorkelling than many Whitsunday spots and a fraction of the crowds.
            </p>
            <p className="font-lola-body text-sm text-sand/60 leading-relaxed">
              It's also the most Stormy-friendly route — shorter drives, quieter accommodation, and the kind of places where a cat in the car park is charming rather than a problem.
            </p>
          </div>
        </div>
      </section>

      {/* Day by Day */}
      <section className="py-12 pb-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="font-lola-mono text-xs tracking-[0.18em] uppercase text-reef-teal">The Journey</span>
            <h2 className="font-lola-display font-700 text-sand mt-2" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}>
              Day by Day
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {days.map((d, i) => (
              <motion.div
                key={d.day}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-ocean rounded-2xl overflow-hidden"
              >
                <div className="flex items-center gap-4 p-5 border-b" style={{ borderColor: "oklch(0.62 0.18 195 / 0.15)" }}>
                  <div className="glass-reef w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-lola-display font-700 text-reef-teal text-sm">{d.day}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-lola-display font-700 text-sand text-lg leading-tight">{d.title}</div>
                    <div className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-reef-teal/60 mt-0.5">{d.drive}</div>
                  </div>
                </div>

                <div className="p-5 grid sm:grid-cols-2 gap-5">
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Star size={12} className="text-reef-teal" />
                      <span className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-reef-teal/70">Highlights</span>
                    </div>
                    <ul className="space-y-1.5">
                      {d.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <span className="text-reef-teal/40 mt-1 flex-shrink-0">·</span>
                          <span className="font-lola-body text-xs text-sand/70">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <MapPin size={11} className="text-coral-reef" />
                        <span className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-coral-reef/70">Stay</span>
                      </div>
                      <p className="font-lola-body text-xs text-sand/60 leading-relaxed">{d.stay}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Coffee size={11} className="text-sand/50" />
                        <span className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-sand/40">Eat</span>
                      </div>
                      <p className="font-lola-body text-xs text-sand/60 leading-relaxed">{d.eat}</p>
                    </div>
                    <div className="glass-reef rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Cat size={11} className="text-coral-reef" />
                        <span className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-coral-reef/70">Stormy</span>
                      </div>
                      <p className="font-lola-body text-xs text-sand/60 leading-relaxed">{d.stormy}</p>
                    </div>
                  </div>
                </div>

                {d.marineNote && (
                  <div className="px-5 pb-5">
                    <div className="glass-reef rounded-lg p-3 border-l-2" style={{ borderColor: "oklch(0.62 0.18 195 / 0.6)" }}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Fish size={11} className="text-reef-teal" />
                        <span className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-reef-teal/70">Marine Bio Note</span>
                      </div>
                      <p className="font-lola-body text-xs text-sand/70 leading-relaxed italic">{d.marineNote}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Route CTA */}
      <section className="py-16 border-t" style={{ borderColor: "oklch(0.62 0.18 195 / 0.12)" }}>
        <div className="container text-center">
          <p className="font-lola-mono text-xs tracking-widest uppercase text-reef-teal/60 mb-4">Or explore another route</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/lola/north">
              <button className="glass-ocean inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-lola-body text-sm text-sand/70 hover:text-reef-teal transition-colors">
                North ↑ Cairns & Daintree
              </button>
            </Link>
            <Link href="/lola/south">
              <button className="glass-ocean inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-lola-body text-sm text-sand/70 hover:text-reef-teal transition-colors">
                South ↓ Whitsundays
              </button>
            </Link>
            <Link href="/lola/wildcard-outback">
              <button className="glass-ocean inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-lola-body text-sm text-sand/70 hover:text-reef-teal transition-colors">
                Wild Card 2 · Lava Tubes
              </button>
            </Link>
            <Link href="/lola/marine-volunteer">
              <button className="btn-reef inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-lola-body text-sm">
                <Fish size={13} /> Marine Volunteer
              </button>
            </Link>
          </div>
        </div>
      </section>

      <LolaFooter />
    </div>
  );
}
