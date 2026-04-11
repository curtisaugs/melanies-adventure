/*
  Lola's Adventure — Route South: Townsville → Bowen → Airlie Beach → Whitsundays → Eungella
  7-day drive south to the Whitsunday Islands and platypus country
*/
import { motion } from "framer-motion";
import { Waves, MapPin, Coffee, Fish, Cat, Clock, DollarSign, ArrowLeft, Star, AlertTriangle, Sunrise } from "lucide-react";
import { Link } from "wouter";
import LolaNavigation from "@/components/LolaNavigation";
import LolaFooter from "@/components/LolaFooter";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/lola-south-whitsundays-3DDytiHa9yJ8zhEesfcq3J.webp";

const days = [
  {
    day: 1,
    title: "Townsville → Bowen",
    drive: "2.5 hrs · 204 km",
    highlights: ["Stop at The Big Mango (yes, it's worth it)", "Snorkel at Horseshoe Bay", "Cape Edgecumbe Walking Trail", "Sunset on Bowen's quiet beach"],
    stay: "Bowen Holiday Park — pet-friendly, ~$150–250/night + AU$15 pet fee",
    eat: "Local bakeries and cafes in Bowen township",
    stormy: "Bowen Holiday Park allows 2 pets of any size. Stormy will be comfortable.",
    marineNote: "Horseshoe Bay is a sheltered snorkel spot with fringing reef — good visibility, calm water, reef fish galore. No certification needed.",
  },
  {
    day: 2,
    title: "Bowen → Airlie Beach",
    drive: "1 hr · 77 km",
    highlights: ["Bicentennial Boardwalk walk", "Airlie Beach Lagoon swim", "Explore the marina", "Sunset at Shingley Beach"],
    stay: "Pet-friendly Airbnb or BIG4 Whitsundays Tropical Eco Resort — pet-friendly cabins, ~$150–250/night",
    eat: "Garuma Breakfast Restaurant (coffee + homemade pies + vegan options), My Rainbow Bakery",
    stormy: "BIG4 has pet-friendly cabins. Airlie Beach Airbnbs often have fenced yards.",
    marineNote: null,
  },
  {
    day: 3,
    title: "Airlie Beach — Whitsundays Day Trip",
    drive: "Boat day",
    highlights: ["Ocean Rafting Northern Exposure or Viper tour", "Whitehaven Beach (silica sand, 98% pure)", "Hill Inlet Lookout — swirling sands", "Outer reef snorkelling", "Hardy Reef coral walls"],
    stay: "Airlie Beach (second night)",
    eat: "Cafe One 3 for brekky, pack lunch for the boat",
    stormy: "Stormy stays at the cabin. Leave food, water, and the AC on.",
    marineNote: "Ocean Rafting tours have Eco Hosts and Master Reef Guides on board. Ask about the 'Great Eight' — clownfish, giant clams, manta rays, Maori wrasse, potato cod, reef sharks, turtles, and whales (May migration starts).",
  },
  {
    day: 4,
    title: "Airlie Beach — Turtle Spotting",
    drive: "Local day",
    highlights: ["Honeyeater Lookout morning hike", "Whisper Cruises turtle spotting tour", "Afternoon at Four Mile Beach", "Explore Airlie Beach town"],
    stay: "Airlie Beach (third night)",
    eat: "Sidewalk Cafe, Boho Cafe (vegetarian options), Fat Frog Beach Cafe",
    stormy: "Another cabin day for Stormy. She's living her best life.",
    marineNote: "Whisper Cruises focuses specifically on sea turtle encounters — small boat, conservation-focused. April–May is a good time for green turtles in the Whitsundays.",
  },
  {
    day: 5,
    title: "Cape Hillsborough → Mackay",
    drive: "2 hrs · 130 km",
    highlights: ["Cape Hillsborough National Park at sunrise — kangaroos on the beach", "Drive to Mackay", "Mackay Botanic Gardens afternoon walk", "Explore the city"],
    stay: "Coral Cay Resort or Mackay Seabreeze Apartments — pet-friendly, ~$150–250/night",
    eat: "Jamaica Blue Cafe Mackay, Avenue Cafe, Botanical Gardens Café",
    stormy: "Coral Cay Resort has pet-friendly Queen rooms. Confirm cat policy.",
    marineNote: "Cape Hillsborough at sunrise is one of the most surreal wildlife moments in Queensland — kangaroos and wallabies come down to the beach as the tide goes out. Set your alarm.",
  },
  {
    day: 6,
    title: "Mackay → Eungella National Park",
    drive: "1.5 hrs · 99 km",
    highlights: ["Finch Hatton Gorge rainforest walk", "Gorge rock pools swim", "Afternoon rainforest exploration", "Broken River sunset walk"],
    stay: "Neem Hall (Finch Hatton) or nearby pet-friendly cabin — ~$150–250/night",
    eat: "Pack snacks from Mackay — Eungella has limited cafes",
    stormy: "Neem Hall is pet-friendly. Confirm cat policy when booking.",
    marineNote: "Eungella is a sky island — isolated rainforest on a plateau, cut off from other rainforests for so long it evolved unique species. The orange-sided skink is found nowhere else on Earth.",
  },
  {
    day: 7,
    title: "Eungella — Platypus Dawn",
    drive: "Return to Townsville ~4.5 hrs",
    highlights: ["Wake at 4:30 AM for platypus at Broken River", "Best viewing: 5–7 AM and 4–6 PM", "Wheel of Fire Track morning walk", "Cedar Grove Track", "Drive home along the coast"],
    stay: "Return to Townsville",
    eat: "Grab brekky in Mackay on the way back",
    stormy: "Platypus viewing is early and quiet — Stormy can come to the car park (not the platform).",
    marineNote: "Platypus are monotremes — egg-laying mammals. They're electroreceptive, detecting prey through electrical fields. The Broken River population is one of the most reliably viewable in Australia. Bring binoculars.",
  },
];

const quickStats = [
  { icon: Clock, label: "Duration", value: "7 Days" },
  { icon: MapPin, label: "Distance", value: "~800 km" },
  { icon: DollarSign, label: "Est. Budget", value: "~$1,850–2,960 AUD" },
  { icon: Sunrise, label: "Highlight", value: "Platypus at Dawn" },
];

export default function LolaSouth() {
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
            <Waves size={13} className="text-reef-teal" />
            <span className="font-lola-mono text-xs tracking-[0.18em] uppercase text-reef-teal">Route South · 7 Days</span>
          </div>
          <h1 className="font-lola-display font-800 text-sand leading-none mb-3" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
            Whitsundays &{" "}
            <span className="text-reef-teal" style={{ textShadow: "0 0 30px oklch(0.62 0.18 195 / 0.5)" }}>
              Eungella
            </span>
          </h1>
          <p className="font-lola-body text-sm text-sand/60 max-w-xl leading-relaxed">
            Drive south to the most photographed beach on Earth, snorkel the outer Whitsunday reef, spot sea turtles from a small boat — then head inland to a sky island rainforest and wake before dawn to watch platypus in the wild.
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

      {/* Airlie Beach Note */}
      <section className="py-8">
        <div className="container">
          <div className="glass-ocean rounded-xl p-5 flex gap-4 items-start max-w-3xl mx-auto">
            <AlertTriangle size={18} className="text-coral-reef flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-lola-display font-600 text-coral-reef text-sm mb-1">Airlie Beach Vibe Check</div>
              <p className="font-lola-body text-xs text-sand/60 leading-relaxed">
                Airlie Beach has a party reputation but it's easy to sidestep. Stay at BIG4 or an Airbnb slightly out of town, eat at the quieter cafes (Garuma, Sidewalk), and you'll find the nature crowd — boat people, reef nerds, and solo travellers who are there for the same reasons you are. The Whitsundays day trips attract a genuinely interesting mix of people.
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
            <Link href="/lola/wildcard-rainforest">
              <button className="glass-ocean inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-lola-body text-sm text-sand/70 hover:text-reef-teal transition-colors">
                Wild Card 1 · Eungella Close-Up
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
