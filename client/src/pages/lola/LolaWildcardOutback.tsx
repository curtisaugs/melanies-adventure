/*
  Lola's Adventure — Wild Card 2: Outback & Undara Lava Tubes
  8-day inland loop: Charters Towers → Undara → Atherton Tablelands → Cairns
*/
import { motion } from "framer-motion";
import { Mountain, MapPin, Coffee, Fish, Cat, Clock, DollarSign, ArrowLeft, Star, AlertTriangle, Flame } from "lucide-react";
import { Link } from "wouter";
import LolaNavigation from "@/components/LolaNavigation";
import LolaFooter from "@/components/LolaFooter";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/lola-wildcard-outback-6EDHRMEWs8UXbrAunTzp3W.webp";

const days = [
  {
    day: 1,
    title: "Townsville → Charters Towers",
    drive: "1.5 hrs · 135 km",
    highlights: [
      "Venus Gold Battery (historic gold processing plant)",
      "Towers Hill lookout at sunset",
      "Miner's Cottage gold panning experience",
      "Walk the historic main street",
    ],
    stay: "Hillview Motel — small cats allowed, $15 pet fee, ~$120–150/night",
    eat: "Local cafes in the historic town centre, ~$15–25",
    stormy: "Hillview allows small cats. Note: pets must not be left unattended in rooms here.",
    marineNote: null,
  },
  {
    day: 2,
    title: "Charters Towers → Mount Surprise",
    drive: "4–5 hrs · 380 km",
    highlights: [
      "Outback highway driving — vast, flat, extraordinary",
      "Gemfields country (sapphires, topaz)",
      "Arrive Mount Surprise by afternoon",
      "Sunset over the volcanic plains",
    ],
    stay: "Discovery Parks – Mount Surprise — pet minding services available, ~$100–180/night",
    eat: "Pack snacks and lunch — limited roadhouse options on this stretch",
    stormy: "Discovery Parks offers pet minding — essential for the Undara visit (pets not allowed in the national park). Book ahead.",
    marineNote: null,
  },
  {
    day: 3,
    title: "Undara Volcanic National Park",
    drive: "45 min from Mount Surprise",
    highlights: [
      "3-hour guided Undara Lava Tubes tour",
      "Walk through 160,000-year-old lava tunnels",
      "Insectivorous bat colonies in the tubes",
      "Unique subterranean ecosystems",
      "Savanna woodland wildlife at dusk",
    ],
    stay: "Mount Surprise (second night)",
    eat: "Undara Experience has a restaurant on-site for the tour day",
    stormy: "Stormy stays at Discovery Parks with pet minding. The tubes are no place for a cat — literally underground.",
    marineNote: "The Undara lava tubes are 160,000 years old — formed when lava flowed from a single shield volcano, the outer shell cooled and hardened while molten rock drained out, leaving hollow tunnels up to 20m wide. The ecosystem inside is unique: specialized invertebrates, insectivorous bats, and micro-climates that support species found nowhere else.",
  },
  {
    day: 4,
    title: "Mount Surprise → Mount Garnet",
    drive: "1.5 hrs · 90 km",
    highlights: [
      "Gemstone fossicking at Mount Garnet",
      "Explore the small outback town",
      "Afternoon drive through savanna country",
    ],
    stay: "Mount Garnet Travellers Park — explicitly allows cats, ~$100–150/night (cabins)",
    eat: "Local roadhouse or pub — basic but honest",
    stormy: "Mount Garnet Travellers Park explicitly allows cats. Confirm leaving-unattended policy.",
    marineNote: null,
  },
  {
    day: 5,
    title: "Mount Garnet → Atherton Tablelands",
    drive: "1.5 hrs · 80 km",
    highlights: [
      "Lake Eacham — crystal-clear volcanic crater lake, swimming",
      "Curtain Fig Tree — 500-year-old strangler fig",
      "Yungaburra village explore",
      "Platypus viewing at Yungaburra at dusk",
    ],
    stay: "Chilverton Cottages (Evelyn) — cat-friendly, pet-sitting service available, ~$200–300/night",
    eat: "Yungaburra village cafes and local produce markets",
    stormy: "Chilverton Cottages is genuinely cat-friendly and offers a pet-sitting service. Ideal base for national park days.",
    marineNote: "Lake Eacham is a maar crater lake — formed by a volcanic explosion, not a lava flow. The water is extraordinarily clear (visibility 10+ metres) and supports a unique freshwater ecosystem including 180+ bird species, freshwater turtles, and musky rat-kangaroos.",
  },
  {
    day: 6,
    title: "Atherton Tablelands — Waterfalls Circuit",
    drive: "Local day",
    highlights: [
      "Millaa Millaa Falls — the most photographed waterfall in Queensland",
      "Zillie Falls — walk through rainforest to the base",
      "Ellinjaa Falls — swimming hole",
      "Lake Barrine boat cruise (bull kauri pines)",
      "Lumholtz's tree-kangaroo spotlighting at dusk",
    ],
    stay: "Chilverton Cottages (second night)",
    eat: "Millaa Millaa pub for lunch, Yungaburra cafes for brekky",
    stormy: "Chilverton pet-sitting service covers this day. Stormy is in good hands.",
    marineNote: "The Atherton Tablelands is a biodiversity hotspot — the Wet Tropics Rainforest here is one of the oldest continuously surviving rainforests on Earth (100+ million years). Lumholtz's tree-kangaroo is endemic to this region and critically endangered.",
  },
  {
    day: 7,
    title: "Atherton Tablelands → Cairns",
    drive: "1.5 hrs · 80 km",
    highlights: [
      "Final Tablelands morning walk",
      "Drive down the range to Cairns",
      "Cairns Esplanade afternoon",
      "Cairns Aquarium evening",
    ],
    stay: "City Oasis Inn Cairns — pets stay free, ~$175/night",
    eat: "The Lillipad Cafe (Cairns), Waffle On Cairns",
    stormy: "City Oasis Inn is one of the most cat-friendly stays in North Queensland.",
    marineNote: null,
  },
  {
    day: 8,
    title: "Cairns — Outer Reef Day",
    drive: "Boat day, then drive home ~4.5 hrs",
    highlights: [
      "Down Under Cruise & Dive Marine Bio Snorkel Tour",
      "Outer Great Barrier Reef snorkelling",
      "Guided reef talk with marine biologists",
      "Drive back to Townsville via coastal highway",
    ],
    stay: "Return to Townsville",
    eat: "Pack snacks for the drive home",
    stormy: "Stormy at City Oasis Inn for the morning. Pick her up after the reef tour.",
    marineNote: "This is the payoff — after days of inland ecosystems, you hit the outer reef. The contrast between the volcanic outback, the ancient rainforest, and the coral reef is genuinely extraordinary. Three of the world's most biodiverse ecosystems in one week.",
  },
];

const quickStats = [
  { icon: Clock, label: "Duration", value: "8 Days" },
  { icon: MapPin, label: "Distance", value: "~1,200 km" },
  { icon: DollarSign, label: "Est. Budget", value: "~$2,500–3,500 AUD" },
  { icon: Flame, label: "Vibe", value: "Off the Beaten Track" },
];

export default function LolaWildcardOutback() {
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
            <Flame size={13} className="text-coral-reef" />
            <span className="font-lola-mono text-xs tracking-[0.18em] uppercase text-coral-reef">Wild Card 2 · 8 Days</span>
          </div>
          <h1 className="font-lola-display font-800 text-sand leading-none mb-3" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
            Outback &{" "}
            <span className="text-coral-reef" style={{ textShadow: "0 0 30px oklch(0.65 0.22 30 / 0.5)" }}>
              Lava Tubes
            </span>
          </h1>
          <p className="font-lola-body text-sm text-sand/60 max-w-xl leading-relaxed">
            The route no tourist takes. Drive inland through gold rush country to 160,000-year-old lava tunnels, then climb into ancient rainforest on the Atherton Tablelands — platypus at dawn, tree-kangaroos at dusk — before dropping down to the reef for the finale.
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

      {/* MG Note */}
      <section className="py-8">
        <div className="container">
          <div className="glass-ocean rounded-xl p-5 flex gap-4 items-start max-w-3xl mx-auto">
            <AlertTriangle size={18} className="text-coral-reef flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-lola-display font-600 text-coral-reef text-sm mb-1">MG Road Note</div>
              <p className="font-lola-body text-xs text-sand/60 leading-relaxed">
                The MG handles this route fine — all roads to Undara and the Tablelands are sealed. Beyond Cape Tribulation in the Daintree requires 4WD but that's not on this route. Carry extra water (2L minimum per person), check tyre pressure before leaving Townsville, and download offline maps for the Mount Surprise stretch where mobile coverage is patchy. The Undara Experience road is sealed and well-maintained.
              </p>
            </div>
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
                        <span className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-reef-teal/70">Bio Note</span>
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
            <Link href="/lola/wildcard-rainforest">
              <button className="glass-ocean inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-lola-body text-sm text-sand/70 hover:text-reef-teal transition-colors">
                Wild Card 1 · Hidden Gems
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
