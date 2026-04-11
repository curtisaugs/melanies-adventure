/*
  Lola's Adventure — Route North: Townsville → Cairns → Daintree
  8-day coastal drive up the Great Green Way
*/
import { motion } from "framer-motion";
import { Waves, MapPin, Coffee, Fish, Cat, Clock, DollarSign, ArrowLeft, Star, Leaf, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import LolaNavigation from "@/components/LolaNavigation";
import LolaFooter from "@/components/LolaFooter";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/lola-north-cairns-SZ3PxnRFuuYPAK5Fnmihvu.webp";

const days = [
  {
    day: 1,
    title: "Townsville → Cardwell",
    drive: "2.5 hrs · 180 km",
    highlights: ["The Strand morning walk", "Billabong Sanctuary (optional)", "Arrive Cardwell by afternoon", "Cardwell Spa Pool at sunset"],
    stay: "Cardwell Beachcomber Motel & Tourist Park — pet-friendly rooms, ~$125–180/night",
    eat: "Seabreeze Cafe Lounge for coffee; Brearley's Bakery for pies",
    stormy: "Pet-friendly room confirmed. Stormy can chill while you explore the Spa Pool.",
    marineNote: null,
  },
  {
    day: 2,
    title: "Cardwell → Mission Beach",
    drive: "1.5 hrs · 100 km",
    highlights: ["Hinchinbrook Channel views", "Cassowary spotting walk", "Mission Beach swim", "Bingil Bay Cafe lunch"],
    stay: "Litoria Mission Beach — cats allowed by request, ~$282/night",
    eat: "Bingil Bay Cafe (local legend), Shanti Cafe for simple honest food",
    stormy: "Secure fenced yard at Litoria. Stormy will love the tropical vibes.",
    marineNote: "Watch for cassowaries on the beach walk — they're a keystone species and critically endangered.",
  },
  {
    day: 3,
    title: "Mission Beach → Cairns",
    drive: "2 hrs · 145 km",
    highlights: ["Morning beach walk", "Drive the coastal highway", "Cairns Esplanade arrival", "Cairns Aquarium evening"],
    stay: "City Oasis Inn — pets stay free, ~$175/night",
    eat: "The Lillipad Cafe (hearty breakfasts), Mi Piace Espresso Bar",
    stormy: "City Oasis Inn is one of the most cat-friendly stays on the route.",
    marineNote: "Cairns Aquarium has a Turtle Rehabilitation Centre tour (A$20) — behind-the-scenes with injured turtles being rehabbed. Book ahead.",
  },
  {
    day: 4,
    title: "Cairns — Great Barrier Reef Day",
    drive: "Boat day",
    highlights: ["Down Under Cruise & Dive Marine Bio Snorkel Tour", "Guided reef talk with marine biologists", "CoralWatch citizen science participation", "Reef fish, turtles, coral gardens"],
    stay: "City Oasis Inn (second night)",
    eat: "Waffle On Cairns for brekky; grab a packed lunch from Mi Piace",
    stormy: "Stormy stays at the inn. Leave the Do Not Disturb sign up.",
    marineNote: "Down Under's Marine Bio Snorkel Tour ($45 add-on) is led by Phil Scott and Alistair Chegwidden — actual marine biologists who run CoralWatch surveys. This is the real deal.",
  },
  {
    day: 5,
    title: "Cairns → Port Douglas",
    drive: "1 hr · 65 km",
    highlights: ["Cairns Botanic Gardens morning walk", "Crystal Cascades swim", "Captain Cook Highway coastal drive", "Four Mile Beach arrival"],
    stay: "Pink Flamingo — private courtyard, pet-friendly, ~$150–250/night",
    eat: "Grant Street Kitchen (artisan bakery), The Little Larder (wild mushrooms on toast)",
    stormy: "Pink Flamingo has individual private courtyards — Stormy can sit outside safely.",
    marineNote: null,
  },
  {
    day: 6,
    title: "Port Douglas — Outer Reef",
    drive: "Boat day",
    highlights: ["Wavelength Reef Cruises — snorkel with marine biologists", "Exclusive reef sites (not the crowded ones)", "Guided reef talk", "Afternoon Four Mile Beach"],
    stay: "Pink Flamingo (second night)",
    eat: "The Little Larder for brekky (the tacos are wild), Macrossan Street cafes",
    stormy: "Stormy in the courtyard. Wavelength tours are small-group (max 30 pax).",
    marineNote: "Wavelength specialises in marine biology-led snorkel tours. Ask about the 'Great Eight' — clownfish, giant clams, manta rays, Maori wrasse, potato cod, reef sharks, turtles, and whales.",
  },
  {
    day: 7,
    title: "Port Douglas → Cape Tribulation",
    drive: "2.5 hrs (incl. Daintree Ferry) · 110 km",
    highlights: ["Daintree Ferry crossing", "Jindalba Circuit Track", "Dubuji Boardwalk", "Emmagen Creek swimming hole", "Cape Tribulation Beach at sunset"],
    stay: "Daintree Crocodylus Village — pet-friendly cabins (verify cat policy), ~$100–150/night",
    eat: "Crossroads Cafe (Daintree Village), Turtle Rock Cafe (Cape Trib)",
    stormy: "Confirm cat policy directly. The cabins are secluded — Stormy will be in rainforest paradise.",
    marineNote: "Emmagen Creek is the safe freshwater swim — no stingers, no crocs. The ocean at Cape Trib is stunning but has both. Swim in the creek.",
  },
  {
    day: 8,
    title: "Daintree — Full Exploration Day",
    drive: "Day in the rainforest",
    highlights: ["Daintree Discovery Centre (canopy tower)", "Kulki Boardwalk (Cape Trib lookout)", "Mount Alexandra Lookout", "Crocodile spotting from safe platforms", "Sunset drive back toward Cairns"],
    stay: "Return to Port Douglas or Cairns",
    eat: "Crossroads Cafe for brekky, pack snacks for the day",
    stormy: "Leave Stormy at the cabin with food and water for the day.",
    marineNote: "The Daintree is where the world's oldest rainforest meets the world's largest coral reef. Two World Heritage sites touching. Let that sink in.",
  },
];

const quickStats = [
  { icon: Clock, label: "Duration", value: "7–8 Days" },
  { icon: MapPin, label: "Distance", value: "~1,000 km" },
  { icon: DollarSign, label: "Est. Budget", value: "~$1,750–2,400 AUD" },
  { icon: Fish, label: "Reef Access", value: "Outer GBR + Fringing" },
];

export default function LolaNorth() {
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
            <span className="font-lola-mono text-xs tracking-[0.18em] uppercase text-reef-teal">Route North · 8 Days</span>
          </div>
          <h1 className="font-lola-display font-800 text-sand leading-none mb-3" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
            Cairns &{" "}
            <span className="text-reef-teal" style={{ textShadow: "0 0 30px oklch(0.62 0.18 195 / 0.5)" }}>
              the Daintree
            </span>
          </h1>
          <p className="font-lola-body text-sm text-sand/60 max-w-xl leading-relaxed">
            Drive the Great Green Way — 346 km of rainforest, reef, and cassowary country. Snorkel with marine biologists on the outer Great Barrier Reef, swim in Emmagen Creek, and stand where the world's oldest rainforest meets the world's largest coral reef.
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

      {/* Safety Note */}
      <section className="py-8">
        <div className="container">
          <div className="glass-coral-reef rounded-xl p-5 flex gap-4 items-start max-w-3xl mx-auto">
            <AlertTriangle size={18} className="text-coral-reef flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-lola-display font-600 text-coral-reef text-sm mb-1">April–May Safety Notes</div>
              <p className="font-lola-body text-xs text-sand/60 leading-relaxed">
                April–May is the dry season — excellent timing. Marine stingers (box jellyfish) are mostly gone, but always check local signage. Crocodiles are present in all waterways north of Cardwell — swim only in designated safe areas and freshwater holes like Emmagen Creek. Roads to Cape Tribulation are sealed but the Daintree beyond Cape Trib requires 4WD — the MG is fine to Cape Trib. Mobile coverage is patchy in the Daintree; download offline maps before you leave.
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
                {/* Day header */}
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
                  {/* Highlights */}
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

                  {/* Stay + Eat + Stormy */}
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

                {/* Marine Bio Note */}
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

      {/* Snack Pack Tip */}
      <section className="py-12 border-t" style={{ borderColor: "oklch(0.62 0.18 195 / 0.12)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto glass-ocean rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Leaf size={20} className="text-seafoam" />
              <h3 className="font-lola-display font-700 text-sand text-xl">Snack Pack Essentials</h3>
            </div>
            <p className="font-lola-body text-sm text-sand/60 leading-relaxed mb-4">
              You're a picky eater and some of these towns have limited options. Pack before you leave Townsville:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Muesli bars + trail mix for the long drives",
                "Instant coffee sachets (Daintree has patchy cafe hours)",
                "A small cooler for fruit and snacks",
                "Reusable water bottle — fill up at every town",
                "Stormy's food for the full trip (don't rely on finding it)",
                "A good playlist — the Captain Cook Highway deserves it",
              ].map((tip) => (
                <div key={tip} className="flex items-start gap-2">
                  <span className="text-reef-teal mt-1 flex-shrink-0">✓</span>
                  <span className="font-lola-body text-xs text-sand/65">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Route CTA */}
      <section className="py-16">
        <div className="container text-center">
          <p className="font-lola-mono text-xs tracking-widest uppercase text-reef-teal/60 mb-4">Or explore another route</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/lola/south">
              <button className="glass-ocean inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-lola-body text-sm text-sand/70 hover:text-reef-teal transition-colors">
                South ↓ Whitsundays
              </button>
            </Link>
            <Link href="/lola/wildcard-rainforest">
              <button className="glass-ocean inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-lola-body text-sm text-sand/70 hover:text-reef-teal transition-colors">
                Wild Card 1 · Eungella
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
