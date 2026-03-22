/*
  Local Adventure: Airbnb Weekend Getaway — April 3–5, 2026
  Dog-friendly cabins with fenced yards across Big Bear, Lake Arrowhead, and Carmel/Big Sur.
  Same Margaux-styled design language as the RV Adventure page.
*/

import { useState, useRef, useEffect } from "react";
import { Streamdown } from "streamdown";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Dog,
  Home,
  Star,
  CalendarDays,
  DollarSign,
  Lock,
  ExternalLink,
  Send,
  Fence,
  Flame,
  Waves,
  TreePine,
  Mountain,
  CheckCircle2,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

// // ─── Confirmed Booking ──────────────────────────────────────────────────
const CONFIRMED_BOOKING = {
  propertyId: "5089227",
  reservationId: "56518539",
  propertyName: "Alpen Lodge",
  listingTitle: "Gorgeous+Cozy Lakeview Home, 3 Decks, AC, EV Chgr",
  location: "Lake Arrowhead, CA",
  locationDetail: "Blue Jay / Lake Arrowhead area · 2 hrs from LA",
  checkIn: "March 27, 2026",
  checkOut: "March 30, 2026",
  nights: 3,
  guests: "3 adults, 1 pet",
  vrboUrl: "https://www.vrbo.com/5089227",
  photoUrl: "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/alpen-lodge-main_5ffa1840.webp",
  highlights: [
    "5 bedrooms + children's bunks · 3.5 baths · sleeps 12",
    "3 lakeview decks with BBQ & firepit",
    "3 fireplaces throughout the home",
    "Gourmet kitchen + bonus room",
    "Pool table & ping pong table",
    "Lake rights — free guest access",
    "AC + EV charger",
    "Dog-friendly (2 dog limit, $100 flat fee)",
    "4 min to Blue Jay Village, 9 min to Lake Arrowhead Village",
  ],
  petPolicy: "2 dogs welcome · $100 flat pet fee",
  platform: "VRBO",
};

// ─── Airbnb Listings ──────────────────────────────────────────────────

const listings = [
  {
    id: "arrowhead-aframe",
    name: "A-Frame of Mind",
    tagline: "Fenced Yard · Lake Access · AC",
    location: "Lake Arrowhead, CA",
    locationDetail: "2 hrs from LA",
    recommended: true,
    recommendedLabel: "Top Pick",
    url: "https://www.airbnb.com/rooms/52514634",
    rating: 4.94,
    reviewCount: 248,
    superhost: true,
    capacity: "6 guests",
    bedrooms: "4 bedrooms",
    beds: "6 beds",
    baths: "2 baths",
    priceRange: "$250–$350/night",
    estimatedTotal: "~$600–$800",
    petPolicy: "Dogs welcome · max 3 dogs",
    petFee: "Pet fee applies",
    fencedYard: true,
    fenceNote: "Fully fenced yard, perfect for dogs to roam safely",
    amenities: [
      { icon: Fence, label: "Fully Fenced Yard", highlight: true },
      { icon: Waves, label: "Lake Access (fee)" },
      { icon: Flame, label: "Stone Fireplace" },
      { icon: Mountain, label: "Lake & Forest Views" },
      { icon: TreePine, label: "A-Frame Architecture" },
      { icon: Star, label: "BBQ Grill" },
    ],
    highlights: [
      "3-story A-frame with wall-of-glass windows and sweeping lake views",
      "2,100 sq ft — plenty of space for 4 adults and 2 big dogs",
      "10% discount to Sky Park at Santa's Village nearby",
      "Hiking trails, Lake Arrowhead Village, and Rim of the World Scenic Byway all close by",
      "Backup generator — no worries about mountain power outages",
      "Fast WiFi (326 Mbps) if anyone needs to work remotely",
    ],
    dogHighlights: [
      "Fully fenced yard — PennyLu and Kota can run freely",
      "Up to 3 dogs allowed",
      "Lake Arrowhead area has dog-friendly trails throughout",
      "Grass yard with space to play",
    ],
    color: "from-sky-950/50 to-sky-900/20",
    accentColor: "oklch(0.72 0.12 220)",
    accentRgb: "rgba(94,180,234,0.15)",
    accentBorder: "rgba(94,180,234,0.3)",
    borderColor: "border-sky-500/30",
    textColor: "text-sky-300",
    nearbyAttractions: [
      "Sky Park at Santa's Village — 10 min",
      "Lake Arrowhead Village — 5 min",
      "Rim of the World Scenic Byway — 5 min",
      "Deep Creek Hot Springs — 45 min hike",
    ],
  },
  {
    id: "bigbear-tanager",
    name: "Tanager Cabin",
    tagline: "Hot Tub · Fenced Yard · 3BR",
    location: "Big Bear Lake, CA",
    locationDetail: "2 hrs from LA",
    recommended: false,
    recommendedLabel: "",
    url: "https://www.airbnb.com/rooms/1234196568804725258",
    rating: 4.55,
    reviewCount: 29,
    superhost: false,
    capacity: "8 guests",
    bedrooms: "3 bedrooms",
    beds: "5 beds",
    baths: "2 baths",
    priceRange: "$200–$250/night",
    estimatedTotal: "~$480–$600",
    petPolicy: "Dogs welcome",
    petFee: "Pet fee applies",
    fencedYard: true,
    fenceNote: "Fully fenced yard",
    amenities: [
      { icon: Fence, label: "Fully Fenced Yard", highlight: true },
      { icon: Waves, label: "Private Hot Tub", highlight: true },
      { icon: Flame, label: "Indoor Fireplace" },
      { icon: Star, label: "Gas Grill" },
      { icon: Mountain, label: "Mountain Setting" },
      { icon: TreePine, label: "Pine Forest" },
    ],
    highlights: [
      "Private hot tub — perfect for cold April mountain evenings",
      "5 min to Big Bear Village, slopes, and grocery store",
      "Garage parking included",
      "Washer/dryer on-site",
      "3 bedrooms — comfortable for 4 adults",
      "Good value for the Big Bear area",
    ],
    dogHighlights: [
      "Fully fenced yard — dogs can play off-leash",
      "Big Bear has excellent dog-friendly hiking trails",
      "Castle Rock Trail nearby allows leashed dogs",
      "Big Bear Lake shoreline is dog-friendly",
    ],
    color: "from-amber-950/50 to-amber-900/20",
    accentColor: "oklch(0.78 0.14 60)",
    accentRgb: "rgba(251,191,36,0.12)",
    accentBorder: "rgba(251,191,36,0.3)",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-300",
    nearbyAttractions: [
      "Big Bear Village — 5 min",
      "Big Bear Lake Shoreline — 10 min",
      "Castle Rock Trail — 15 min",
      "Bear Mountain Ski Resort — 10 min",
    ],
  },
  {
    id: "bigbear-cottage",
    name: "Private Big Bear Cottage",
    tagline: "Dog Friendly · Fenced · No Pet Fee",
    location: "Big Bear Lake, CA",
    locationDetail: "2 hrs from LA",
    recommended: false,
    recommendedLabel: "Best for 2",
    url: "https://www.airbnb.com/rooms/42586193",
    rating: 4.9,
    reviewCount: 63,
    superhost: true,
    capacity: "3 guests",
    bedrooms: "1 bedroom",
    beds: "2 beds",
    baths: "1 bath",
    priceRange: "$150–$180/night",
    estimatedTotal: "~$360–$430",
    petPolicy: "Dogs welcome — NO extra charge",
    petFee: "FREE for dogs",
    fencedYard: true,
    fenceNote: "Fully fenced, surrounded by pine trees",
    amenities: [
      { icon: Fence, label: "Fully Fenced Yard", highlight: true },
      { icon: Dog, label: "No Pet Fee", highlight: true },
      { icon: Flame, label: "Indoor Fireplace" },
      { icon: Star, label: "Private Patio" },
      { icon: TreePine, label: "Pine Tree Setting" },
      { icon: Mountain, label: "Walk to Village" },
    ],
    highlights: [
      "Walking distance from Big Bear Village restaurants and shops",
      "Minutes from the slopes and lake",
      "Baby gate provided — thoughtful for dog owners",
      "4.9★ rating with 63 reviews — consistently excellent",
      "Superhost Kathy has 10 years of hosting experience",
      "Best value option — no surprise pet fees",
    ],
    dogHighlights: [
      "Fully fenced yard surrounded by pine trees",
      "NO extra pet charge — rare for dog-friendly rentals",
      "Baby gate included for managing dogs in the space",
      "Pine forest setting dogs will love",
    ],
    color: "from-emerald-950/50 to-emerald-900/20",
    accentColor: "oklch(0.72 0.14 145)",
    accentRgb: "rgba(52,211,153,0.10)",
    accentBorder: "rgba(52,211,153,0.3)",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-300",
    nearbyAttractions: [
      "Big Bear Village — walking distance",
      "Big Bear Lake — 5 min",
      "Snow Summit Ski Resort — 10 min",
      "Alpine Pedal Path — 5 min",
    ],
  },
  {
    id: "carmel-oasis",
    name: "Carmel Oasis",
    tagline: "Private & Secure · Dog & EV Friendly",
    location: "Carmel-by-the-Sea, CA",
    locationDetail: "5.5 hrs from LA · 30 min to Big Sur",
    recommended: false,
    recommendedLabel: "Luxury Option",
    url: "https://www.airbnb.com/rooms/1186986425058912540",
    rating: 4.98,
    reviewCount: 52,
    superhost: true,
    capacity: "6 guests",
    bedrooms: "3 bedrooms",
    beds: "4 beds",
    baths: "2 baths",
    priceRange: "$350–$450/night",
    estimatedTotal: "~$840–$1,080",
    petPolicy: "Dogs welcome",
    petFee: "Pet fee applies",
    fencedYard: true,
    fenceNote: "Fully fenced and gated with motorized gate",
    amenities: [
      { icon: Fence, label: "Fully Fenced + Gated", highlight: true },
      { icon: Flame, label: "Fireplace + Fire Pit" },
      { icon: Star, label: "EV Charger" },
      { icon: Mountain, label: "Open-Beam Living" },
      { icon: TreePine, label: "Sun-Drenched Patio" },
      { icon: Waves, label: "2 min to Downtown Carmel" },
    ],
    highlights: [
      "4.98★ rating — one of the highest-rated properties in Carmel",
      "2 min walk to downtown Carmel-by-the-Sea",
      "5 min to Carmel Beach (dogs off-leash before 10am and after 4pm)",
      "30 min drive to Big Sur, Pfeiffer Beach, and McWay Falls",
      "Luxury rebuild with Sleep Number mattresses and induction stovetop",
      "EV charger on-site",
    ],
    dogHighlights: [
      "Fully fenced and gated with motorized gate — maximum security for dogs",
      "5 min to Carmel Beach — dogs allowed OFF-LEASH before 10am and after 4pm",
      "Carmel is rated #1 Dog Friendly Town in America",
      "Sun-drenched patio with firepit for evening relaxation",
    ],
    color: "from-purple-950/50 to-purple-900/20",
    accentColor: "oklch(0.72 0.12 285)",
    accentRgb: "rgba(167,139,250,0.10)",
    accentBorder: "rgba(167,139,250,0.3)",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-300",
    nearbyAttractions: [
      "Carmel Beach (off-leash dogs) — 5 min",
      "Carmel-by-the-Sea Village — 2 min walk",
      "Point Lobos State Reserve — 10 min",
      "Big Sur / Pfeiffer Beach — 30 min",
    ],
  },
];

// ─── Cost Breakdown ───────────────────────────────────────────────────────────────

const costBreakdowns = {
  "arrowhead-aframe": {
    items: [
      { category: "Lodging", item: "A-Frame of Mind, Lake Arrowhead — 2 nights @ ~$300/night", total: "$600" },
      { category: "Lodging", item: "Airbnb service fee (est. 14%)", total: "$84" },
      { category: "Lodging", item: "Cleaning fee (est.)", total: "$75" },
      { category: "Lodging", item: "Pet fee (est.)", total: "$50" },
      { category: "Transport", item: "Gas — LA to Lake Arrowhead, round trip (~200 miles @ $4.50/gal, 28mpg)", total: "$32" },
      { category: "Food", item: "Groceries for 4 adults, 2 nights (dinners + breakfasts)", total: "$120" },
      { category: "Food", item: "Dining out — 1 dinner, 1 lunch at Lake Arrowhead Village", total: "$100" },
      { category: "Activities", item: "Sky Park at Santa's Village (optional, 10% discount with listing)", total: "$60" },
      { category: "Misc", item: "Dog supplies, snacks, incidentals", total: "$40" },
    ],
    total: "~$1,161",
    buffer: "Well under the $2,500 target — $1,339 buffer",
    notes: "Closest to LA of all options — only 2 hours. Best architecture and lake views. Highest rating with 248 reviews gives strong confidence.",
  },
  "bigbear-tanager": {
    items: [
      { category: "Lodging", item: "Tanager Cabin, Big Bear Lake — 2 nights @ ~$225/night", total: "$450" },
      { category: "Lodging", item: "Airbnb service fee (est. 14%)", total: "$63" },
      { category: "Lodging", item: "Cleaning fee (est.)", total: "$75" },
      { category: "Lodging", item: "Pet fee (est.)", total: "$50" },
      { category: "Transport", item: "Gas — LA to Big Bear, round trip (~200 miles @ $4.50/gal, 28mpg)", total: "$32" },
      { category: "Food", item: "Groceries for 4 adults, 2 nights", total: "$120" },
      { category: "Food", item: "Dining out — Big Bear Village", total: "$100" },
      { category: "Activities", item: "Hiking, lake activities, incidentals", total: "$50" },
    ],
    total: "~$940",
    buffer: "$1,560 buffer under the $2,500 target",
    notes: "Most affordable option with hot tub. 29 reviews is fewer than ideal — verify recent reviews before booking. Best value per square foot.",
  },
  "bigbear-cottage": {
    items: [
      { category: "Lodging", item: "Private Big Bear Cottage — 2 nights @ ~$165/night", total: "$330" },
      { category: "Lodging", item: "Airbnb service fee (est. 14%)", total: "$46" },
      { category: "Lodging", item: "Cleaning fee (est.)", total: "$60" },
      { category: "Lodging", item: "Pet fee", total: "$0 (FREE)" },
      { category: "Transport", item: "Gas — LA to Big Bear, round trip (~200 miles @ $4.50/gal, 28mpg)", total: "$32" },
      { category: "Food", item: "Groceries for 2 adults, 2 nights", total: "$80" },
      { category: "Food", item: "Dining out — Big Bear Village (walking distance)", total: "$80" },
      { category: "Activities", item: "Hiking, lake, incidentals", total: "$40" },
    ],
    total: "~$668",
    buffer: "$1,832 buffer — best value of all options",
    notes: "Best for just Melanie and Curtis (1 bedroom). No pet fee is a genuine rarity. 4.9★ with 63 reviews from a Superhost — extremely reliable.",
  },
  "carmel-oasis": {
    items: [
      { category: "Lodging", item: "Carmel Oasis — 2 nights @ ~$400/night", total: "$800" },
      { category: "Lodging", item: "Airbnb service fee (est. 14%)", total: "$112" },
      { category: "Lodging", item: "Cleaning fee (est.)", total: "$100" },
      { category: "Lodging", item: "Pet fee (est.)", total: "$75" },
      { category: "Transport", item: "Gas — LA to Carmel, round trip (~700 miles @ $4.50/gal, 28mpg)", total: "$113" },
      { category: "Food", item: "Groceries for 4 adults, 2 nights", total: "$120" },
      { category: "Food", item: "Dining in Carmel — Forge in the Forest, PortaBella (dog-friendly patios)", total: "$160" },
      { category: "Activities", item: "Point Lobos, Big Sur day trip, incidentals", total: "$60" },
    ],
    total: "~$1,540",
    buffer: "$960 buffer under the $2,500 target",
    notes: "The luxury option — combines Big Sur access with Carmel's dog-friendly culture. 5.5 hrs from LA is a longer drive. Verify April 3–5 availability directly on Airbnb.",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────────

function ListingCard({ listing, isSelected, onSelect }: {
  listing: typeof listings[0];
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={onSelect}
        className={`w-full text-left glass-card rounded-2xl overflow-hidden transition-all duration-300 bg-gradient-to-br ${listing.color} border ${listing.borderColor} ${
          isSelected ? "ring-2 ring-offset-1 ring-offset-transparent" : "opacity-75 hover:opacity-95"
        }`}
        style={isSelected ? { outline: `2px solid ${listing.accentColor}`, outlineOffset: "2px" } : {}}
      >
        {/* Card Header */}
        <div className="p-5 pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {listing.recommended && (
                  <span
                    className="font-accent text-[0.55rem] tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{ background: listing.accentRgb, border: `1px solid ${listing.accentBorder}`, color: listing.accentColor }}
                  >
                    {listing.recommendedLabel}
                  </span>
                )}
                {listing.superhost && (
                  <span className="font-accent text-[0.55rem] tracking-widest uppercase px-2 py-0.5 rounded-full bg-gold/10 border border-gold/25 text-gold">
                    Superhost
                  </span>
                )}
              </div>
              <h3 className="font-display text-xl font-light text-ivory">{listing.name}</h3>
              <p className="font-accent text-[0.65rem] tracking-[0.15em] uppercase text-ivory/50 mt-0.5">{listing.tagline}</p>
            </div>
            <div className="text-right shrink-0 ml-4">
              <div className="flex items-center gap-1 justify-end mb-0.5">
                <Star size={11} className="text-gold fill-gold" />
                <span className="font-body text-sm font-medium text-ivory">{listing.rating}</span>
              </div>
              <p className="font-body text-[0.65rem] text-ivory/40">{listing.reviewCount} reviews</p>
            </div>
          </div>

          {/* Location + capacity */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5">
              <MapPin size={11} style={{ color: listing.accentColor }} />
              <span className="font-body text-xs text-ivory/60">{listing.location}</span>
            </div>
            <span className="font-body text-xs text-ivory/35">·</span>
            <span className="font-body text-xs text-ivory/60">{listing.locationDetail}</span>
          </div>

          {/* Specs row */}
          <div className="flex flex-wrap gap-3 mb-3">
            {[listing.capacity, listing.bedrooms, listing.beds, listing.baths].map((spec) => (
              <span key={spec} className="font-body text-xs text-ivory/55">{spec}</span>
            ))}
          </div>

          {/* Fenced yard badge */}
          {listing.fencedYard && (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 w-fit"
              style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.25)" }}
            >
              <Fence size={11} style={{ color: "oklch(0.72 0.14 145)" }} />
              <span className="font-accent text-[0.6rem] tracking-widest uppercase" style={{ color: "oklch(0.72 0.14 145)" }}>
                Fenced Yard
              </span>
              <span className="font-body text-[0.65rem] text-ivory/50">· {listing.fenceNote}</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-display text-lg font-light" style={{ color: listing.accentColor }}>{listing.priceRange}</span>
              <span className="font-body text-xs text-ivory/40 ml-2">est. total {listing.estimatedTotal}</span>
            </div>
            <div className="flex items-center gap-1.5" style={{ color: listing.accentColor }}>
              <span className="font-body text-xs">View on Airbnb</span>
              <ExternalLink size={11} />
            </div>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 border-t border-white/8 pt-4">
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Highlights */}
                  <div>
                    <p className="font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40 mb-2">Why This One</p>
                    <ul className="space-y-1.5">
                      {listing.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <CheckCircle2 size={11} style={{ color: listing.accentColor }} className="mt-0.5 shrink-0" />
                          <span className="font-body text-xs text-ivory/65 leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dog highlights */}
                  <div>
                    <p className="font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40 mb-2">
                      <Dog size={10} className="inline mr-1" />For PennyLu + Kota
                    </p>
                    <ul className="space-y-1.5 mb-4">
                      {listing.dogHighlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <span style={{ color: "oklch(0.75 0.16 355)" }} className="mt-0.5 shrink-0 text-xs">🐾</span>
                          <span className="font-body text-xs text-ivory/65 leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40 mb-2">Nearby</p>
                    <ul className="space-y-1">
                      {listing.nearbyAttractions.map((a) => (
                        <li key={a} className="flex items-center gap-2">
                          <MapPin size={9} style={{ color: listing.accentColor }} className="shrink-0" />
                          <span className="font-body text-xs text-ivory/55">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-4 pt-4 border-t border-white/8 flex items-center justify-between">
                  <div>
                    <p className="font-body text-xs text-ivory/40">{listing.petPolicy}</p>
                    <p className="font-body text-xs text-ivory/40">{listing.petFee}</p>
                  </div>
                  <a
                    href={listing.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs font-medium transition-all duration-200 hover:opacity-90"
                    style={{ background: listing.accentRgb, border: `1px solid ${listing.accentBorder}`, color: listing.accentColor }}
                  >
                    Book on Airbnb
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────────

export default function AirbnbGetaway() {
  const [selectedListing, setSelectedListing] = useState<string>("arrowhead-aframe");
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);

  const activeListing = listings.find((l) => l.id === selectedListing)!;
  const activeCost = costBreakdowns[selectedListing as keyof typeof costBreakdowns];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/airbnb-cabin-hero-diXqJi7m4UQdKy3TBWNS2H.webp')` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,10,20,0.88) 0%, rgba(8,10,20,0.65) 55%, rgba(8,10,20,0.45) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,10,20,0.75) 0%, transparent 50%)" }} />

        <div className="relative container">
          <div className="max-w-4xl">

            {/* Page label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
              style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}
            >
              <Home size={13} style={{ color: "oklch(0.72 0.14 145)" }} />
              <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "oklch(0.72 0.14 145)" }}>
                Local Adventure · Airbnb Option
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
              Mountain{" "}
              <span style={{ color: "oklch(0.72 0.14 145)", fontStyle: "italic" }}>Cabin Weekend</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display font-light italic mb-10"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "rgba(232,224,208,0.5)" }}
            >
              Dog-friendly cabins with fenced yards — Lake Arrowhead, March 27–30
            </motion.p>

            {/* ✓ CONFIRMED BOOKING BANNER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-2xl p-5 mb-8 flex flex-col sm:flex-row gap-5 items-start"
              style={{ background: "rgba(52,211,153,0.07)", border: "2px solid rgba(52,211,153,0.35)" }}
            >
              {/* Property photo */}
              <div className="w-full sm:w-40 h-28 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={CONFIRMED_BOOKING.photoUrl}
                  alt={CONFIRMED_BOOKING.propertyName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={15} style={{ color: "oklch(0.72 0.14 145)" }} />
                  <span className="font-accent text-xs tracking-[0.2em] uppercase font-bold" style={{ color: "oklch(0.72 0.14 145)" }}>
                    Confirmed Booking — VRBO
                  </span>
                  <span className="font-accent text-[0.6rem] tracking-widest uppercase px-2 py-0.5 rounded-full" style={{ background: "rgba(52,211,153,0.15)", color: "oklch(0.72 0.14 145)" }}>
                    Res #{CONFIRMED_BOOKING.reservationId}
                  </span>
                </div>
                <h3 className="font-display text-xl font-light mb-1" style={{ color: "#e8e0d0" }}>
                  {CONFIRMED_BOOKING.propertyName}
                  <span className="font-body text-sm font-normal ml-2" style={{ color: "rgba(232,224,208,0.5)" }}>— {CONFIRMED_BOOKING.location}</span>
                </h3>
                <p className="font-body text-xs mb-3" style={{ color: "rgba(232,224,208,0.55)" }}>
                  {CONFIRMED_BOOKING.listingTitle}
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Check-in", value: CONFIRMED_BOOKING.checkIn },
                    { label: "Check-out", value: CONFIRMED_BOOKING.checkOut },
                    { label: "Nights", value: `${CONFIRMED_BOOKING.nights} nights` },
                    { label: "Guests", value: CONFIRMED_BOOKING.guests },
                  ].map((item) => (
                    <div key={item.label} className="text-xs" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      <span style={{ color: "rgba(232,224,208,0.4)" }}>{item.label}: </span>
                      <span className="font-semibold" style={{ color: "rgba(232,224,208,0.9)" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a
                href={CONFIRMED_BOOKING.vrboUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all hover:opacity-80"
                style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.4)", color: "oklch(0.72 0.14 145)", fontFamily: "'Montserrat', sans-serif" }}
              >
                <ExternalLink size={12} />
                View on VRBO
              </a>
            </motion.div>

            {/* Margaux overview card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="rounded-2xl p-6 mb-10"
              style={{ background: "rgba(232,116,138,0.05)", border: "1px solid rgba(232,116,138,0.18)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                  style={{ background: "rgba(232,116,138,0.15)", border: "1px solid rgba(232,116,138,0.3)" }}
                >
                  <Sparkles size={18} style={{ color: "#e8748a" }} />
                </div>
                <div className="flex-1">
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#e8748a", fontFamily: "'Montserrat', sans-serif" }}>Margaux</p>
                  <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.8)", lineHeight: 1.8 }}>
                    You booked it. The Alpen Lodge in Lake Arrowhead — March 27–30, 3 nights, 3 adults and one very lucky dog. Five bedrooms, three lakeview decks, a firepit, pool table, and lake rights. Camping fell through, and honestly? This is a significant upgrade.
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.8)", lineHeight: 1.8 }}>
                    The other listings below are still here for reference — or for next time. But the Alpen Lodge is confirmed, paid, and waiting. Two hours from LA, lake views from every deck, and PennyLu gets a proper yard. This is going to be a great birthday weekend.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: "✅", label: "Alpen Lodge — BOOKED", note: "Lake Arrowhead, CA", color: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)", text: "rgb(52,211,153)" },
                      { icon: "🐕", label: "PennyLu + Kota", note: "Dog-friendly · $100 flat pet fee", color: "rgba(232,116,138,0.10)", border: "rgba(232,116,138,0.3)", text: "rgb(232,116,138)" },
                      { icon: "📅", label: "Mar 27–30", note: "3 nights · 3 adults", color: "rgba(201,168,76,0.10)", border: "rgba(201,168,76,0.3)", text: "rgb(201,168,76)" },
                      { icon: "🏠", label: "5 BR · 3 Decks", note: "Lake views · BBQ · Firepit", color: "rgba(94,180,234,0.12)", border: "rgba(94,180,234,0.3)", text: "rgb(94,180,234)" },
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

      {/* ── ALPEN LODGE PHOTO GALLERY ── */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-2 h-2 rounded-full" style={{ background: "oklch(0.72 0.14 145)" }} />
              <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "oklch(0.72 0.14 145)" }}>
                Alpen Lodge — Your Home This Weekend
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  url: "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/alpen-deck-lake_58d9f956.png",
                  alt: "Alpen Lodge deck with umbrella and lake view",
                  caption: "Deck · Lake View",
                  featured: true,
                },
                {
                  url: "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/alpen-covered-deck_fc47d01b.png",
                  alt: "Alpen Lodge covered deck with mountain and lake view",
                  caption: "Covered Deck · Mountains",
                  featured: false,
                },
                {
                  url: "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/alpen-dining-view2_f90e7f90.png",
                  alt: "Alpen Lodge dining room with lake view through windows",
                  caption: "Dining Room · Lake View",
                  featured: false,
                },
                {
                  url: "https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/alpen-dining-view1_4aa9ffd7.png",
                  alt: "Alpen Lodge dining room with forest view and deck",
                  caption: "Open Kitchen · Forest View",
                  featured: false,
                },
              ].map((photo) => (
                <motion.div
                  key={photo.url}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-xl overflow-hidden group cursor-pointer"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-accent text-[0.6rem] tracking-widest uppercase text-white/90">{photo.caption}</p>
                  </div>
                  {photo.featured && (
                    <div
                      className="absolute top-2 left-2 px-2 py-0.5 rounded-full font-accent text-[0.55rem] tracking-widest uppercase"
                      style={{ background: "rgba(52,211,153,0.85)", color: "oklch(0.09 0.015 260)" }}
                    >
                      Hero View
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Home size={16} className="text-gold" />
              <h2 className="font-display text-2xl font-light text-ivory">Other Options</h2>
              <span className="font-body text-sm text-muted-foreground italic">For reference or future trips</span>
            </div>

            {/* Availability note */}
            <div
              className="rounded-xl p-4 mb-6 flex items-start gap-3"
              style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)" }}
            >
              <CalendarDays size={14} style={{ color: "oklch(0.72 0.14 145)" }} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-accent text-xs tracking-widest uppercase mb-1" style={{ color: "oklch(0.72 0.14 145)" }}>
                  Alpen Lodge is Confirmed — Other Listings for Reference
                </p>
                <p className="font-body text-xs text-ivory/60 leading-relaxed">
                  You've booked the Alpen Lodge (VRBO #5089227) for March 27–30. The listings below are kept for reference — great options for a future trip or if plans change. All are dog-friendly with fenced yards.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  isSelected={selectedListing === listing.id}
                  onSelect={() => setSelectedListing(listing.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Star size={16} className="text-gold" />
              <h2 className="font-display text-2xl font-light text-ivory">Side-by-Side Comparison</h2>
            </div>

            <div
              className="glass-card rounded-2xl overflow-hidden border"
              style={{ borderColor: "rgba(201,168,76,0.2)" }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(201,168,76,0.05)" }}>
                      <th className="px-5 py-3 text-left font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40">Listing</th>
                      <th className="px-4 py-3 text-left font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40">Location</th>
                      <th className="px-4 py-3 text-center font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40">Rating</th>
                      <th className="px-4 py-3 text-center font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40">Size</th>
                      <th className="px-4 py-3 text-center font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40">Fenced</th>
                      <th className="px-4 py-3 text-center font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40">Dogs</th>
                      <th className="px-4 py-3 text-right font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40">Est. Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map((l, i) => (
                      <tr
                        key={l.id}
                        className={`border-b cursor-pointer transition-colors hover:bg-white/3 ${selectedListing === l.id ? "bg-white/5" : ""}`}
                        style={{ borderColor: "rgba(255,255,255,0.05)" }}
                        onClick={() => setSelectedListing(l.id)}
                      >
                        <td className="px-5 py-3">
                          <p className="font-body text-xs font-medium text-ivory/80">{l.name}</p>
                          {l.recommended && (
                            <span className="font-accent text-[0.55rem] tracking-widest uppercase" style={{ color: l.accentColor }}>
                              {l.recommendedLabel}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-body text-xs text-ivory/60">{l.location}</p>
                          <p className="font-body text-[0.65rem] text-ivory/35">{l.locationDetail}</p>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star size={10} className="text-gold fill-gold" />
                            <span className="font-body text-xs text-ivory/80">{l.rating}</span>
                          </div>
                          <p className="font-body text-[0.6rem] text-ivory/35">{l.reviewCount} reviews</p>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <p className="font-body text-xs text-ivory/60">{l.bedrooms}</p>
                          <p className="font-body text-[0.6rem] text-ivory/35">{l.capacity}</p>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-emerald-400 text-sm">✓</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-emerald-400 text-sm">✓</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <p className="font-body text-xs font-medium text-ivory/80">{l.estimatedTotal}</p>
                          <p className="font-body text-[0.6rem] text-ivory/35">2 nights</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed A-Frame teaser */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/airbnb-cabin-hero-diXqJi7m4UQdKy3TBWNS2H.webp')` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,10,20,0.85) 0%, rgba(8,10,20,0.55) 60%, rgba(8,10,20,0.30) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,10,20,0.6) 0%, transparent 60%)" }} />
        <div className="relative container">
          <div className="max-w-xl">
            <span className="font-accent text-xs tracking-[0.2em] uppercase block mb-3" style={{ color: "oklch(0.72 0.14 145)" }}>Top Pick</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ivory mb-4 leading-tight">
              A-Frame of Mind<br />
              <span className="italic" style={{ color: "oklch(0.72 0.14 145)" }}>Lake Arrowhead</span>
            </h2>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: "rgba(232,224,208,0.70)" }}>
              A 3-story A-frame with a wall of glass windows, sweeping lake and forest views, a fully fenced yard for the dogs, and 248 five-star reviews. Two hours from LA. The kind of place that makes you forget you ever considered camping.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["4.94★ · 248 Reviews", "Fully Fenced Yard", "Lake Access", "2 hrs from LA", "Dogs Welcome"].map((tag) => (
                <span key={tag} className="font-accent text-xs tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: "rgba(52,211,153,0.10)", border: "1px solid rgba(52,211,153,0.25)", color: "oklch(0.72 0.14 145)" }}>{tag}</span>
              ))}
            </div>
            <a
              href="https://www.airbnb.com/rooms/52514634"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 hover:opacity-90"
              style={{ background: "oklch(0.72 0.14 145)", color: "#0a0f1e" }}
            >
              View on Airbnb
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Curtis-Only Cost Breakdown */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "rgba(8,10,20,0.85)" }} />
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
                  {/* Listing selector for cost */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listings.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setSelectedListing(l.id)}
                        className="px-3 py-1.5 rounded-full font-accent text-[0.6rem] tracking-widest uppercase transition-all"
                        style={selectedListing === l.id
                          ? { background: l.accentRgb, border: `1px solid ${l.accentBorder}`, color: l.accentColor }
                          : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(232,224,208,0.4)" }
                        }
                      >
                        {l.name}
                      </button>
                    ))}
                  </div>

                  <div
                    className="glass-card rounded-2xl overflow-hidden border"
                    style={{ borderColor: "rgba(201,168,76,0.25)", background: "oklch(0.11 0.03 60 / 0.4)" }}
                  >
                    <div
                      className="px-6 py-4 border-b"
                      style={{ borderColor: "rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.06)" }}
                    >
                      <div className="flex items-center gap-2">
                        <DollarSign size={14} style={{ color: "#c9a84c" }} />
                        <p className="font-accent text-xs tracking-widest uppercase" style={{ color: "#c9a84c" }}>
                          {activeListing.name} — Full Cost Breakdown (2 Nights, April 3–5)
                        </p>
                      </div>
                    </div>

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
                          {activeCost.items.map((item, i) => (
                            <tr key={i} className="border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
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
                              <p className="font-body text-xs text-ivory/40 italic mt-0.5">{activeCost.buffer}</p>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <p className="font-display text-2xl font-light" style={{ color: "#c9a84c" }}>{activeCost.total}</p>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    <div className="px-6 py-4 border-t" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
                      <p className="font-body text-xs text-ivory/50 leading-relaxed">
                        {activeCost.notes}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Margaux Chat Section */}
      <section className="py-20" style={{ background: "rgba(10,15,30,0.95)" }}>
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "oklch(0.72 0.14 145)" }}>Ask Margaux</span>
            <h2 className="font-display text-4xl font-light mt-2" style={{ color: "#e8e0d0" }}>Questions About the Cabins?</h2>
            <p className="font-body text-sm mt-3" style={{ color: "rgba(232,224,208,0.5)" }}>She knows the mountains. Ask her anything about Big Bear, Lake Arrowhead, or Carmel.</p>
          </motion.div>
          <MargauxChatEmbed />
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ─── Margaux Chat Embed ───────────────────────────────────────────────────────────────────

interface ChatMsg { role: "user" | "assistant"; content: string; }

function MargauxChatEmbed() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const chatMutation = trpc.tripBuilder.chatWithMargaux.useMutation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const next: ChatMsg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);
    try {
      const history = next.slice(0, -1);
      const res = await chatMutation.mutateAsync({
        message: text,
        history,
        systemPrompt: "You are Margaux, a sophisticated and witty travel advisor helping plan a dog-friendly weekend cabin getaway in the California mountains (Big Bear, Lake Arrowhead, or Carmel). You know the listings: A-Frame of Mind in Lake Arrowhead (4.94★, fenced yard, lake views, $250-350/night), Tanager Cabin in Big Bear (hot tub, fenced, $200-250/night), Private Big Bear Cottage (no pet fee, 4.9★, $150-180/night), and Carmel Oasis near Big Sur (4.98★, luxury, $350-450/night). The trip is April 3-5, 2026. The dogs are PennyLu (Doberman) and Kota (Aussie). Be helpful, warm, and occasionally witty.",
      });
      setMessages([...next, { role: "assistant", content: res.reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "I seem to have lost my train of thought. Try again?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ background: "rgba(8,12,25,0.8)", borderColor: "rgba(52,211,153,0.2)" }}
    >
      {/* Messages */}
      <div className="p-5 space-y-4 min-h-[200px] max-h-[400px] overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Sparkles size={24} style={{ color: "oklch(0.72 0.14 145)" }} className="mx-auto mb-3" />
            <p className="font-body text-sm text-ivory/40 italic">
              Ask about the best cabin for your group, dog-friendly hikes nearby, or what to pack for a mountain weekend.
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${m.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm"}`}
              style={m.role === "user"
                ? { background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.2)" }
                : { background: "rgba(232,116,138,0.08)", border: "1px solid rgba(232,116,138,0.15)" }
              }
            >
              {m.role === "assistant" ? (
                <Streamdown className="font-body text-sm text-ivory/80 leading-relaxed">{m.content}</Streamdown>
              ) : (
                <p className="font-body text-sm text-ivory/80">{m.content}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm" style={{ background: "rgba(232,116,138,0.08)", border: "1px solid rgba(232,116,138,0.15)" }}>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-rose-400/60"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t px-4 py-3 flex gap-3" style={{ borderColor: "rgba(52,211,153,0.15)" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Ask Margaux about the cabins..."
          className="flex-1 bg-transparent font-body text-sm text-ivory/80 placeholder:text-ivory/25 outline-none"
        />
        <button
          onClick={send}
          disabled={!input.trim() || loading}
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30"
          style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)" }}
        >
          <Send size={13} style={{ color: "oklch(0.72 0.14 145)" }} />
        </button>
      </div>
    </div>
  );
}
