/*
  Local Adventure: Big Sur RV Birthday Weekend
  A first-class Class C RV, two dogs, four adults, and the Pacific Coast Highway.
  Margaux-styled hero, route stops, campsite options, two weekend options, and a Curtis-only cost breakdown.
*/

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Dog,
  Tent,
  Car,
  Coffee,
  ShoppingBag,
  Waves,
  Trees,
  Camera,
  DollarSign,
  Star,
  CalendarDays,
  Clock,
  ExternalLink,
  Lock,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// ─── Route Stops ────────────────────────────────────────────────────────────────

const routeStops = [
  {
    id: "malibu",
    name: "Malibu",
    distance: "30 min from Santa Rosa (LA)",
    type: "stretch",
    icon: Waves,
    color: "text-teal-300",
    accentColor: "oklch(0.75 0.12 195)",
    bg: "from-teal-950/50 to-teal-900/20",
    border: "border-teal-500/30",
    highlights: [
      "Zuma Beach — dogs on leash, wide open sand",
      "Coffee and breakfast before the long drive",
      "Fuel stop and RV systems check",
    ],
    dogNote: "Zuma Beach allows dogs on leash. Great first run for Maury and Kota before the highway.",
    duration: "45 min stop",
  },
  {
    id: "pismo",
    name: "Pismo Beach",
    distance: "2.5 hrs from LA",
    type: "lunch",
    icon: Coffee,
    color: "text-amber-300",
    accentColor: "oklch(0.78 0.14 60)",
    bg: "from-amber-950/50 to-amber-900/20",
    border: "border-amber-500/30",
    highlights: [
      "Pismo State Beach — dogs allowed on leash",
      "Famous clam chowder in a sourdough bowl",
      "Long beach walk to stretch everyone out",
    ],
    dogNote: "Pismo State Beach allows leashed dogs. Wide flat beach, easy for big dogs.",
    duration: "1 hr lunch stop",
  },
  {
    id: "cambria",
    name: "Cambria",
    distance: "3.5 hrs from LA",
    type: "market",
    icon: ShoppingBag,
    color: "text-rose-300",
    accentColor: "oklch(0.75 0.16 355)",
    bg: "from-rose-950/50 to-rose-900/20",
    border: "border-rose-500/30",
    highlights: [
      "Moonstone Beach Boardwalk — dogs on leash, stunning coastal views",
      "Cambria Farmers Market: Fridays 2:30–5:30pm at Veteran's Hall, 1000 Main St",
      "Linn's Restaurant — famous olallieberry pie (takeaway for the RV)",
    ],
    dogNote: "Moonstone Beach Boardwalk is fully dog-friendly on leash. One of the most scenic coastal walks in California.",
    duration: "1.5 hr stop",
    marketNote: "Weekend 1 only (March 27 departure): The Cambria Farmers Market runs every Friday 2:30–5:30pm. Perfect timing on the drive up.",
  },
  {
    id: "carmel",
    name: "Carmel-by-the-Sea",
    distance: "4.5 hrs from LA",
    type: "town",
    icon: Star,
    color: "text-gold",
    accentColor: "oklch(0.72 0.12 75)",
    bg: "from-yellow-950/50 to-yellow-900/20",
    border: "border-yellow-500/30",
    highlights: [
      "Rated #1 Dog Friendly Town in America",
      "Carmel Beach — dogs allowed OFF-LEASH before 10am and after 4pm",
      "Carmel Farmers Market: Saturdays 9am–Noon (March 28 = last day of winter market!)",
      "Dinner at Forge in the Forest or PortaBella — both have dog-friendly patios",
    ],
    dogNote: "Carmel Beach is one of the few beaches in California where dogs can run off-leash. Maury and Kota will lose their minds in the best way.",
    duration: "Half day / overnight option",
    marketNote: "Weekend 1 only (March 28): The Carmel Winter Farmers Market runs every Saturday 9am–Noon through March 28 — the last day of the season.",
  },
  {
    id: "garrapata",
    name: "Garrapata State Park",
    distance: "Just south of Carmel",
    type: "hike",
    icon: Trees,
    color: "text-emerald-300",
    accentColor: "oklch(0.72 0.14 145)",
    bg: "from-emerald-950/50 to-emerald-900/20",
    border: "border-emerald-500/30",
    highlights: [
      "Dogs allowed on leash at Gates 17–19",
      "Calla Lily Valley: wild calla lilies blooming January–April (PEAK in late March/early April)",
      "Stairway down to the beach",
      "Bixby Bridge viewpoint just south",
    ],
    dogNote: "Dogs are allowed on the trail and beach at Gates 17–19. The Calla Lily Valley is in peak bloom for both weekends — a muddy, magical, completely unforgettable stop.",
    duration: "1.5 hr stop",
    marketNote: "Both weekends: Calla Lily Valley is in peak bloom late March through early April. This is the timing.",
  },
  {
    id: "bixby",
    name: "Bixby Bridge",
    distance: "13 miles south of Carmel",
    type: "photo",
    icon: Camera,
    color: "text-sky-300",
    accentColor: "oklch(0.72 0.12 220)",
    bg: "from-sky-950/50 to-sky-900/20",
    border: "border-sky-500/30",
    highlights: [
      "Most iconic bridge view on Highway 1",
      "Pullout just before the bridge heading south",
      "Hurricane Point Vista just south — views back toward Bixby",
    ],
    dogNote: "Dogs can be at the pullout on leash for photos. The view is worth stopping for even if it's just 10 minutes.",
    duration: "20 min photo stop",
  },
  {
    id: "pfeiffer",
    name: "Pfeiffer Beach",
    distance: "In Big Sur, off Sycamore Road",
    type: "beach",
    icon: Waves,
    color: "text-violet-300",
    accentColor: "oklch(0.72 0.12 285)",
    bg: "from-violet-950/50 to-violet-900/20",
    border: "border-violet-500/30",
    highlights: [
      "Dogs allowed on leash",
      "Purple sand from manganese garnet washed down from the cliffs",
      "Sea caves and keyhole rock — waves crash through at high tide",
      "$15 parking fee — CASH ONLY",
      "Turn off Hwy 1 onto Sycamore Road (easy to miss, look carefully)",
    ],
    dogNote: "Dogs allowed on leash. This beach is genuinely unlike anywhere else in California. The purple sand is real. Bring cash for parking.",
    duration: "1.5 hr beach stop",
  },
  {
    id: "mcway",
    name: "McWay Falls",
    distance: "Julia Pfeiffer Burns State Park",
    type: "view",
    icon: Camera,
    color: "text-cyan-300",
    accentColor: "oklch(0.72 0.12 195)",
    bg: "from-cyan-950/50 to-cyan-900/20",
    border: "border-cyan-500/30",
    highlights: [
      "80-foot waterfall falling directly onto the beach",
      "View from the side of Hwy 1 — no trail needed",
      "Pullout is on the southbound side before the park entrance",
      "Dogs can be at the pullout (trail to falls: dogs not allowed)",
    ],
    dogNote: "The viewpoint pullout is accessible with dogs. The trail to the falls does not allow dogs, but the highway viewpoint is the better view anyway.",
    duration: "20 min stop",
  },
];

// ─── Campsite Options ────────────────────────────────────────────────────────────

const campsites = [
  {
    id: "fernwood",
    name: "Fernwood Resort",
    tagline: "Under the redwoods, on the Big Sur River",
    recommended: true,
    address: "47200 CA-1, Big Sur, CA 93920",
    phone: "(831) 667-2422",
    url: "https://fernwoodbigsur.com",
    maxLength: "30ft motorhome / 28ft trailer",
    hookups: "Water + 30-amp electric at each site",
    baseRate: "$70–$145/night",
    petFee: "$5/dog/night",
    extraPersonFee: "$5/person/night",
    dumpStation: "$20 if used",
    amenities: [
      "Tavern Bar & Grill on-site",
      "General Store with espresso and ice cream",
      "Big Sur River access directly from campground",
      "Hiking trail access",
      "Bathhouse with hot showers",
      "Laundry facility",
    ],
    dogPolicy: "Dogs welcome in campground on leash. Never left unattended.",
    checkIn: "12pm–10pm",
    checkOut: "11am",
    color: "from-emerald-950/50 to-emerald-900/20",
    accentColor: "text-emerald-300",
    borderColor: "border-emerald-500/30",
    note: "Call to book RV sites — online reservations available but calling is recommended. This is the one.",
  },
  {
    id: "bigsurcamp",
    name: "Big Sur Campground & Cabins",
    tagline: "Redwoods and river, slightly more space",
    recommended: false,
    address: "47000 Highway 1, Big Sur, CA 93920",
    phone: "(831) 667-2322",
    url: "https://www.bigsurcamp.com",
    maxLength: "40ft motorhome",
    hookups: "Water + electric at site, central dump station",
    baseRate: "$150–$180/night",
    petFee: "$5/dog/night",
    extraPersonFee: "$5/person/night",
    dumpStation: "Included (central station)",
    amenities: [
      "Picnic table and firepit at each site",
      "Central dump station",
      "Larger sites — better for a 30ft+ Class C",
    ],
    dogPolicy: "Dogs welcome in campground.",
    checkIn: "12pm",
    checkOut: "11am",
    color: "from-teal-950/50 to-teal-900/20",
    accentColor: "text-teal-300",
    borderColor: "border-teal-500/30",
    note: "Highway 1 is fully open as of January 14, 2026. Good backup if Fernwood is full.",
  },
];

// ─── Weekend Options ─────────────────────────────────────────────────────────────

const weekendOptions = [
  {
    id: "march",
    label: "Weekend 1",
    dates: "March 27–29",
    subtitle: "The Birthday Weekend",
    tag: "Farmers Market Magic",
    tagColor: "oklch(0.75 0.16 355)",
    tagBg: "rgba(232,116,138,0.12)",
    tagBorder: "rgba(232,116,138,0.3)",
    highlights: [
      "Cambria Farmers Market on Friday afternoon (2:30–5:30pm) — perfect timing on the drive up",
      "Carmel Winter Farmers Market on Saturday March 28 — the last day of the season",
      "Calla Lily Valley at Garrapata in peak bloom",
      "Melanie's actual birthday is March 26 — this is the celebration weekend",
    ],
    note: "This is the birthday weekend. The timing is almost suspiciously perfect — the Cambria market on Friday, the last Carmel winter market on Saturday, and calla lilies in full bloom.",
    color: "from-rose-950/50 to-rose-900/20",
    border: "border-rose-500/30",
    accentColor: "oklch(0.75 0.16 355)",
  },
  {
    id: "april",
    label: "Weekend 2",
    dates: "April 3–5",
    subtitle: "The Backup Plan",
    tag: "Calla Lily Peak",
    tagColor: "oklch(0.72 0.14 145)",
    tagBg: "rgba(94,234,212,0.10)",
    tagBorder: "rgba(94,234,212,0.3)",
    highlights: [
      "Calla Lily Valley still in peak bloom (late March through April)",
      "Slightly warmer weather and longer daylight",
      "No farmers markets on Saturday (Carmel summer market starts May 3)",
      "Less competition for campsite reservations",
    ],
    note: "A solid option if the March weekend doesn't come together. The calla lilies will still be blooming, the weather will be a touch warmer, and Big Sur will be slightly less crowded.",
    color: "from-teal-950/50 to-teal-900/20",
    border: "border-teal-500/30",
    accentColor: "oklch(0.68 0.12 195)",
  },
];

// ─── Cost Breakdown (Curtis Only) ────────────────────────────────────────────────

const costItems = [
  { category: "RV Rental", item: "Class C, 26-28ft, pet-friendly (Outdoorsy)", nights: "3 days", unitCost: "$200/night", total: "$600" },
  { category: "RV Rental", item: "Pet fee (flat, 2 dogs)", nights: "—", unitCost: "—", total: "$100" },
  { category: "Campsite", item: "Fernwood Resort (base rate, 2 people)", nights: "2 nights", unitCost: "~$110/night", total: "$220" },
  { category: "Campsite", item: "Pet fee (Maury + Kota)", nights: "2 nights", unitCost: "$10/night", total: "$20" },
  { category: "Campsite", item: "Extra persons (Annie + Mokin)", nights: "2 nights", unitCost: "$10/night", total: "$20" },
  { category: "Gas", item: "LA → Big Sur → LA (~600 miles, ~10mpg, ~$4.50/gal)", nights: "—", unitCost: "—", total: "$270" },
  { category: "Activities", item: "Pfeiffer Beach parking (cash)", nights: "—", unitCost: "—", total: "$15" },
  { category: "Activities", item: "Pfeiffer State Park day use (River Trail)", nights: "—", unitCost: "—", total: "$10" },
  { category: "Food", item: "Groceries + RV cooking (4 people, 3 days)", nights: "—", unitCost: "—", total: "$200" },
  { category: "Food", item: "Cambria Farmers Market + Linn's pie", nights: "—", unitCost: "—", total: "$60" },
  { category: "Food", item: "Carmel dinner (Forge in the Forest or PortaBella)", nights: "—", unitCost: "—", total: "$150" },
  { category: "Misc", item: "Firewood, ice, supplies, dog treats", nights: "—", unitCost: "—", total: "$50" },
];

const totalCost = "$1,715";
const budgetBuffer = "~$785 buffer under $2,500";

// ─── Stop Card ───────────────────────────────────────────────────────────────────

function StopCard({ stop, index }: { stop: typeof routeStops[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = stop.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex gap-4"
    >
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10"
          style={{ background: `${stop.accentColor.replace('oklch', 'oklch').replace(')', ' / 0.15)')}`, border: `1px solid ${stop.accentColor.replace(')', ' / 0.4)')}` }}
        >
          <Icon size={16} style={{ color: stop.accentColor }} />
        </div>
        {index < routeStops.length - 1 && (
          <div className="w-px flex-1 mt-2" style={{ background: "rgba(255,255,255,0.08)", minHeight: "24px" }} />
        )}
      </div>

      {/* Card */}
      <div
        className={`flex-1 glass-card rounded-2xl overflow-hidden bg-gradient-to-br ${stop.bg} border ${stop.border} mb-4`}
      >
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-display text-xl font-light text-ivory">{stop.name}</h3>
              <p className={`font-accent text-xs tracking-[0.15em] uppercase ${stop.color} mt-0.5`}>
                {stop.distance}
              </p>
            </div>
            <span className="font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40 mt-1">
              {stop.duration}
            </span>
          </div>

          <ul className="space-y-1.5 mb-3">
            {stop.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <span style={{ color: stop.accentColor }} className="mt-1 shrink-0">·</span>
                <span className="font-body text-sm text-ivory/70 leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>

          {/* Market note if applicable */}
          {stop.marketNote && (
            <div
              className="rounded-xl px-3 py-2 mb-3 text-xs font-body leading-relaxed"
              style={{ background: "rgba(232,116,138,0.08)", border: "1px solid rgba(232,116,138,0.2)", color: "rgba(232,224,208,0.7)" }}
            >
              <span style={{ color: "#e8748a" }}>✦ </span>{stop.marketNote}
            </div>
          )}

          {/* Dog note toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex items-center gap-2 font-accent text-xs tracking-[0.15em] uppercase ${stop.color} hover:opacity-80 transition-opacity`}
          >
            <Dog size={12} />
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            Maury & Kota note
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div
                  className="mt-3 rounded-xl px-4 py-3 text-sm font-body leading-relaxed"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(232,224,208,0.75)" }}
                >
                  <Dog size={13} className="inline mr-2 opacity-50" />
                  {stop.dogNote}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Campsite Card ───────────────────────────────────────────────────────────────

function CampsiteCard({ site }: { site: typeof campsites[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`glass-card rounded-2xl overflow-hidden bg-gradient-to-br ${site.color} border ${site.borderColor} relative`}
    >
      {site.recommended && (
        <div
          className="absolute top-4 right-4 px-2.5 py-1 rounded-full font-accent text-[0.6rem] tracking-widest uppercase"
          style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.35)", color: "#c9a84c" }}
        >
          Recommended
        </div>
      )}
      <div className="p-6">
        <h3 className="font-display text-2xl font-light text-ivory mb-1">{site.name}</h3>
        <p className={`font-accent text-xs tracking-[0.15em] uppercase ${site.accentColor} mb-1`}>{site.tagline}</p>
        <p className="font-body text-xs text-ivory/40 mb-4">{site.address}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: "Base Rate", value: site.baseRate },
            { label: "Max RV Length", value: site.maxLength },
            { label: "Hookups", value: site.hookups },
            { label: "Pet Fee", value: site.petFee },
            { label: "Extra Person", value: site.extraPersonFee },
            { label: "Check-in", value: site.checkIn },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-accent text-[0.55rem] tracking-widest uppercase text-ivory/40">{label}</p>
              <p className="font-body text-xs text-ivory/80">{value}</p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <p className="font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40 mb-2">Amenities</p>
          <ul className="space-y-1">
            {site.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <span className={`${site.accentColor} text-xs`}>·</span>
                <span className="font-body text-xs text-ivory/65">{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-xl px-3 py-2 mb-4 text-xs font-body leading-relaxed"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(232,224,208,0.65)" }}
        >
          <Dog size={12} className="inline mr-1.5 opacity-50" />
          {site.dogPolicy}
        </div>

        <p className="font-body text-xs text-ivory/50 italic mb-4">{site.note}</p>

        <div className="flex gap-3">
          <a
            href={`tel:${site.phone}`}
            className={`flex items-center gap-1.5 font-accent text-xs tracking-widest uppercase ${site.accentColor} hover:opacity-70 transition-opacity`}
          >
            {site.phone}
          </a>
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 font-accent text-xs tracking-widest uppercase ${site.accentColor} hover:opacity-70 transition-opacity`}
          >
            Website <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────────

export default function RVAdventure() {
  const [selectedWeekend, setSelectedWeekend] = useState<"march" | "april">("march");
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);

  const activeWeekend = weekendOptions.find((w) => w.id === selectedWeekend)!;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero — Margaux Overview */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Full-bleed Big Sur hero image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/bigsur-hero-highway-8bE9w93WbGwcQ2SSvW4TQN.webp')` }}
        />
        {/* Dark overlay matching European pages */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,10,20,0.85) 0%, rgba(8,10,20,0.65) 50%, rgba(8,10,20,0.45) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,10,20,0.7) 0%, transparent 50%)" }} />

        <div className="relative container">
          <div className="max-w-4xl">

            {/* Page label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
              style={{ background: "rgba(94,234,212,0.08)", border: "1px solid rgba(94,234,212,0.2)" }}
            >
              <Car size={13} style={{ color: "oklch(0.75 0.12 185)" }} />
              <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "oklch(0.75 0.12 185)" }}>
                Local Adventure
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-light leading-none mb-4"
              style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", color: "#e8e0d0" }}
            >
              Big Sur{" "}
              <span style={{ color: "oklch(0.75 0.12 185)", fontStyle: "italic" }}>& the Dogs</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display font-light italic mb-10"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "rgba(232,224,208,0.5)" }}
            >
              A first-class RV, the Pacific Coast Highway, and the birthday weekend that's actually this year
            </motion.p>

            {/* Margaux overview card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="rounded-2xl p-6 mb-10"
              style={{ background: "rgba(232,116,138,0.05)", border: "1px solid rgba(232,116,138,0.18)" }}
            >
              <div className="flex items-start gap-4">
                {/* Margaux avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                  style={{ background: "rgba(232,116,138,0.15)", border: "1px solid rgba(232,116,138,0.3)" }}
                >
                  <Sparkles size={18} style={{ color: "#e8748a" }} />
                </div>
                <div className="flex-1">
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#e8748a", fontFamily: "'Montserrat', sans-serif" }}>Margaux</p>
                  <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.8)", lineHeight: 1.8 }}>
                    Europe will still be there. The Rhine isn't going anywhere. INSEAD will still be accepting applications in October. But March 26 is <em>this</em> week, and Big Sur is three hours up the coast, and Maury and Kota have been waiting their entire lives for a beach where they can actually run.
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.8)", lineHeight: 1.8 }}>
                    Curtis found a first-class Class C — kitchen, queen bed, the whole thing. You pack everything and the kitchen sink (you will), Annie and Mokin come, the dogs ride shotgun in spirit, and you drive up Highway 1 with the windows down. Cambria has a farmers market on Friday afternoons. Carmel is the most dog-friendly town in America. Pfeiffer Beach has purple sand. I'm not making any of this up.
                  </p>
                  {/* Quick-scan chips */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: "🚐", label: "Class C RV", note: "~$200/night · pet-friendly", color: "rgba(94,234,212,0.12)", border: "rgba(94,234,212,0.3)", text: "rgb(94,234,212)" },
                      { icon: "🐕", label: "Maury + Kota", note: "Doberman + Aussie · all welcome", color: "rgba(232,116,138,0.10)", border: "rgba(232,116,138,0.3)", text: "rgb(232,116,138)" },
                      { icon: "🌊", label: "Big Sur", note: "Fernwood Resort · redwoods + river", color: "rgba(196,181,253,0.10)", border: "rgba(196,181,253,0.3)", text: "rgb(196,181,253)" },
                      { icon: "📅", label: "Two Options", note: "March 27–29 or April 3–5", color: "rgba(201,168,76,0.10)", border: "rgba(201,168,76,0.3)", text: "rgb(201,168,76)" },
                    ].map((chip) => (
                      <div
                        key={chip.label}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                        style={{ background: chip.color, border: `1px solid ${chip.border}` }}
                      >
                        <span>{chip.icon}</span>
                        <span className="font-semibold" style={{ color: chip.text, fontFamily: "'Montserrat', sans-serif" }}>{chip.label}</span>
                        <span style={{ color: "rgba(232,224,208,0.55)", fontFamily: "'Montserrat', sans-serif" }}>·</span>
                        <span style={{ color: "rgba(232,224,208,0.55)", fontFamily: "'Montserrat', sans-serif" }}>{chip.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Weekend Options Toggle */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <CalendarDays size={16} className="text-gold" />
              <h2 className="font-display text-2xl font-light text-ivory">Choose Your Weekend</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {weekendOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedWeekend(option.id as "march" | "april")}
                  className={`glass-card rounded-2xl p-5 text-left transition-all duration-300 bg-gradient-to-br ${option.color} border ${option.border} ${
                    selectedWeekend === option.id ? "ring-2 ring-offset-1 ring-offset-transparent" : "opacity-70 hover:opacity-90"
                  }`}
                  style={selectedWeekend === option.id ? { outline: `2px solid ${option.accentColor}`, outlineOffset: "2px" } : {}}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-accent text-xs tracking-[0.15em] uppercase text-ivory/50 mb-0.5">{option.label}</p>
                      <p className="font-display text-xl font-light text-ivory">{option.dates}</p>
                      <p className="font-body text-sm text-ivory/60 italic">{option.subtitle}</p>
                    </div>
                    <div
                      className="px-2.5 py-1 rounded-full font-accent text-[0.6rem] tracking-widest uppercase shrink-0"
                      style={{ background: option.tagBg, border: `1px solid ${option.tagBorder}`, color: option.tagColor }}
                    >
                      {option.tag}
                    </div>
                  </div>
                  {selectedWeekend === option.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 pt-3 border-t border-white/10"
                    >
                      <p className="font-body text-xs text-ivory/60 italic mb-2">{option.note}</p>
                      <ul className="space-y-1">
                        {option.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2">
                            <span style={{ color: option.accentColor }} className="mt-0.5 shrink-0 text-xs">✓</span>
                            <span className="font-body text-xs text-ivory/65">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RV Rental Guidance */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Car size={16} className="text-gold" />
              <h2 className="font-display text-2xl font-light text-ivory">The RV</h2>
            </div>

            <div
              className="glass-card rounded-2xl p-6 border"
              style={{ background: "oklch(0.13 0.03 240 / 0.6)", borderColor: "oklch(0.72 0.12 75 / 0.2)" }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-display text-xl font-light text-ivory mb-2">Outdoorsy — Best Option</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                    Search for a 2020 or newer Class C, 26–28ft, pet-friendly listing with 4.8+ stars near Los Angeles. Outdoorsy is the most trusted peer-to-peer RV marketplace and has the widest selection of quality vehicles in the LA area. Target price: around $200/night.
                  </p>
                  <div className="space-y-2">
                    {[
                      { label: "Size", value: "26–28ft Class C (fits 4 adults comfortably, queen bed, full kitchen)" },
                      { label: "Pet policy", value: "Filter for 'pet-friendly' — most owners allow dogs with a flat fee (~$75–$150)" },
                      { label: "Book", value: "2–3 weeks in advance for a weekend departure" },
                      { label: "Pickup", value: "Many owners are in the San Fernando Valley or Ventura area — easy from Santa Rosa" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex gap-3">
                        <span className="font-accent text-[0.6rem] tracking-widest uppercase text-gold/70 mt-0.5 shrink-0 w-16">{label}</span>
                        <span className="font-body text-xs text-ivory/70">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-light text-ivory mb-2">Road Bear RV — Premium Alternative</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                    Road Bear operates a professional fleet out of Los Angeles. Consistent quality, 24/7 roadside assistance, and a Class C 26–28ft option. Higher fees (preparation fee ~$225–$295, essentials kit ~$150) but guaranteed fleet vehicle.
                  </p>
                  <div className="space-y-2">
                    {[
                      { label: "Website", value: "roadbearrv.com/rv-rental-locations/los-angeles-california" },
                      { label: "Price", value: "~$185–$250/night + $225–$295 prep fee + $150 essentials kit" },
                      { label: "Best for", value: "If you want a guaranteed fleet vehicle and don't want to vet individual listings" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex gap-3">
                        <span className="font-accent text-[0.6rem] tracking-widest uppercase text-gold/70 mt-0.5 shrink-0 w-16">{label}</span>
                        <span className="font-body text-xs text-ivory/70">{value}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://www.roadbearrv.com/rv-rental-locations/los-angeles-california"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 font-accent text-xs tracking-widest uppercase text-gold hover:opacity-70 transition-opacity"
                  >
                    View Road Bear LA <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href="https://www.outdoorsy.com/rv-rental/california/los-angeles/class-c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:opacity-90"
                  style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.09 0.015 260)" }}
                >
                  Browse Class C RVs on Outdoorsy
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Route */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <MapPin size={16} className="text-gold" />
              <h2 className="font-display text-2xl font-light text-ivory">The Route</h2>
              <span className="font-body text-sm text-muted-foreground italic">Santa Rosa (LA) → Big Sur, Highway 1</span>
            </div>

            <div className="relative">
              {routeStops.map((stop, i) => (
                <StopCard key={stop.id} stop={stop} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pfeiffer Beach Full-Bleed Teaser */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/bigsur-pfeiffer-beach-M7hbZyYk7ei4TKfjTsV3N5.webp')` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,10,20,0.80) 0%, rgba(8,10,20,0.50) 60%, rgba(8,10,20,0.30) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,10,20,0.6) 0%, transparent 60%)" }} />
        <div className="relative container">
          <div className="max-w-xl">
            <span className="font-accent text-xs tracking-[0.2em] uppercase block mb-3" style={{ color: "oklch(0.75 0.12 185)" }}>Highlight Stop</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ivory mb-4 leading-tight">
              Pfeiffer Beach<br />
              <span className="italic" style={{ color: "oklch(0.75 0.12 185)" }}>Purple Sand</span>
            </h2>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: "rgba(232,224,208,0.70)" }}>
              Manganese garnet washes down from the cliffs and tints the sand violet at the water's edge. The keyhole rock arch frames the sunset perfectly. Dogs are allowed on leash. Maury and Kota will lose their minds.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Dogs on leash", "Cash parking · $12", "Sunset views", "No reservations needed"].map((tag) => (
                <span key={tag} className="font-accent text-xs tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: "rgba(94,234,212,0.10)", border: "1px solid rgba(94,234,212,0.25)", color: "oklch(0.75 0.12 185)" }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Campsites */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Tent size={16} className="text-gold" />
              <h2 className="font-display text-2xl font-light text-ivory">Where to Camp</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {campsites.map((site) => (
                <CampsiteCard key={site.id} site={site} />
              ))}
            </div>

            <div
              className="mt-6 rounded-2xl p-5 border"
              style={{ background: "rgba(201,168,76,0.06)", borderColor: "rgba(201,168,76,0.2)" }}
            >
              <div className="flex items-start gap-3">
                <Clock size={14} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="font-accent text-xs tracking-widest uppercase text-gold mb-1">Booking Note</p>
                  <p className="font-body text-sm text-ivory/65 leading-relaxed">
                    Fernwood Resort RV sites can be reserved by calling (831) 667-2422. Online booking is available but calling is recommended for RV-specific sites. Book as soon as the weekend is confirmed — Big Sur fills up, especially in spring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* McWay Falls Full-Bleed Teaser */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/bigsur-mcway-falls-F7aD5xHjknGXaJEnNhLUTs.webp')` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to left, rgba(8,10,20,0.80) 0%, rgba(8,10,20,0.50) 60%, rgba(8,10,20,0.30) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,10,20,0.6) 0%, transparent 60%)" }} />
        <div className="relative container">
          <div className="max-w-xl ml-auto text-right">
            <span className="font-accent text-xs tracking-[0.2em] uppercase block mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>Must-See</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ivory mb-4 leading-tight">
              McWay Falls<br />
              <span className="italic" style={{ color: "oklch(0.72 0.12 75)" }}>The Untouchable Cove</span>
            </h2>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: "rgba(232,224,208,0.70)" }}>
              An 80-foot waterfall drops directly onto a beach no one can reach. You watch it from the cliff trail above. Turquoise water, golden sand, the Pacific stretching to the horizon. It's the most photographed view in Big Sur for a reason.
            </p>
            <div className="flex flex-wrap gap-2 justify-end">
              {["Julia Pfeiffer Burns SP", "Free with park pass", "10-min cliff walk", "Dogs on leash on trail"].map((tag) => (
                <span key={tag} className="font-accent text-xs tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: "rgba(201,168,76,0.10)", border: "1px solid rgba(201,168,76,0.25)", color: "oklch(0.72 0.12 75)" }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curtis-Only Cost Breakdown */}
      <section className="relative py-12 overflow-hidden">
        {/* Subtle redwoods background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/bigsur-redwoods-2kia7bjQqt7HdMFjFwtMx8.webp')` }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(8,10,20,0.7)" }} />
        <div className="relative container">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setShowCostBreakdown(!showCostBreakdown)}
              className="flex items-center gap-3 mb-6 group"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)" }}
              >
                <Lock size={13} style={{ color: "#c9a84c" }} />
              </div>
              <div className="text-left">
                <p className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "#c9a84c" }}>
                  Curtis Only — Cost Breakdown
                </p>
                <p className="font-body text-xs text-ivory/40 italic">
                  {showCostBreakdown ? "Click to hide" : "Click to reveal — not visible to Melanie"}
                </p>
              </div>
              {showCostBreakdown ? <ChevronUp size={14} className="text-gold ml-auto" /> : <ChevronDown size={14} className="text-gold ml-auto" />}
            </button>

            <AnimatePresence>
              {showCostBreakdown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    className="glass-card rounded-2xl overflow-hidden border"
                    style={{ borderColor: "rgba(201,168,76,0.25)", background: "oklch(0.11 0.03 60 / 0.4)" }}
                  >
                    {/* Header */}
                    <div
                      className="px-6 py-4 border-b"
                      style={{ borderColor: "rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.06)" }}
                    >
                      <div className="flex items-center gap-2">
                        <DollarSign size={14} style={{ color: "#c9a84c" }} />
                        <p className="font-accent text-xs tracking-widest uppercase" style={{ color: "#c9a84c" }}>
                          Full Cost Breakdown — 3-Day Weekend (2 Nights)
                        </p>
                      </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                            <th className="px-6 py-3 text-left font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40">Category</th>
                            <th className="px-4 py-3 text-left font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40">Item</th>
                            <th className="px-4 py-3 text-right font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {costItems.map((item, i) => (
                            <tr
                              key={i}
                              className="border-b"
                              style={{ borderColor: "rgba(255,255,255,0.04)" }}
                            >
                              <td className="px-6 py-2.5">
                                <span className="font-accent text-[0.6rem] tracking-widest uppercase text-gold/60">{item.category}</span>
                              </td>
                              <td className="px-4 py-2.5">
                                <span className="font-body text-xs text-ivory/65">{item.item}</span>
                              </td>
                              <td className="px-4 py-2.5 text-right">
                                <span className="font-body text-xs text-ivory/80 font-medium">{item.total}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr style={{ borderTop: "1px solid rgba(201,168,76,0.2)" }}>
                            <td className="px-6 py-4" colSpan={2}>
                              <p className="font-display text-lg font-light" style={{ color: "#c9a84c" }}>Total Estimated Cost</p>
                              <p className="font-body text-xs text-ivory/40 italic mt-0.5">{budgetBuffer}</p>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <p className="font-display text-2xl font-light" style={{ color: "#c9a84c" }}>{totalCost}</p>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {/* Notes */}
                    <div className="px-6 py-4 border-t" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
                      <p className="font-body text-xs text-ivory/50 leading-relaxed mb-2">
                        <strong className="text-ivory/70">Buffer of ~$785</strong> under the $2,500 target. This can go toward a nicer RV (Road Bear fleet vehicle), a proper dinner at Ventana Big Sur, or a bottle of champagne at Carmel Beach for the birthday.
                      </p>
                      <p className="font-body text-xs text-ivory/40 leading-relaxed">
                        Gas estimate assumes ~600 miles round trip at 10mpg and $4.50/gallon. RV rental assumes Outdoorsy peer-to-peer at ~$200/night. Campsite at Fernwood assumes ~$110 base rate. All estimates; actual costs may vary slightly.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
