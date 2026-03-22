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
  UtensilsCrossed,
  ShoppingBag,
  BookOpen,
  ShoppingCart,
  Coffee,
  Footprints,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { MapView } from "@/components/Map";

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
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  const activeListing = listings.find((l) => l.id === selectedListing)!;
  const activeCost = costBreakdowns[selectedListing as keyof typeof costBreakdowns];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/118915275/i3aBqyUeBtoiGkHs9yqP6w/lake-arrowhead-sunset-fiery_9537f5b9.jpg')` }}
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

      {/* Local Adventure Guide */}
      <section className="py-16" style={{ background: "rgba(8,10,20,0.6)" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Footprints size={16} style={{ color: "oklch(0.72 0.14 145)" }} />
                <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "oklch(0.72 0.14 145)" }}>Lake Arrowhead</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-ivory mb-3">
                Your Local <span className="text-gold italic">Adventure Guide</span>
              </h2>
              <p className="font-body text-sm text-ivory/60 max-w-xl mx-auto">
                Dog-friendly hikes, lakeside eats, village shops, and everything you need for a perfect long weekend with PennyLu and Kota.
              </p>
            </div>

            {/* Adventure Categories Grid */}
            <div className="space-y-8">

              {/* Hikes */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg" style={{ background: "rgba(52,211,153,0.12)" }}>
                    <TreePine size={18} style={{ color: "oklch(0.72 0.14 145)" }} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-light text-ivory">Dog-Friendly Hikes</h3>
                    <p className="font-body text-xs text-ivory/50">Leashes required · Bag stations at most trailheads</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { name: "Will Abell Memorial Trail", desc: "1.9-mile wooded loop near the lake — easy and shaded", tag: "Easy · 1.9 mi", url: "https://www.alltrails.com/trail/us/california/will-abell-memorial-trail" },
                    { name: "Heaps Peak Arboretum", desc: "Gentle 1-mile interpretive trail through a 30-acre arboretum with sequoias", tag: "Easy · 1 mi", url: "https://hparboretum.com/visit/" },
                    { name: "Heart Rock Trail (Seeley Creek)", desc: "1-mile each way to a heart-shaped waterfall pool in Crestline", tag: "Easy · 2 mi RT", url: "https://www.alltrails.com/trail/us/california/heart-rock" },
                    { name: "Castle Rock Trail", desc: "2.2-mile out-and-back with panoramic views of the lake", tag: "Moderate · 2.2 mi", url: "https://www.alltrails.com/trail/us/california/castle-rock-trail" },
                    { name: "Deep Creek Hot Springs Trail", desc: "Longer 8-mile hike to natural hot springs — bring water", tag: "Strenuous · 8 mi", url: "https://www.alltrails.com/trail/us/california/deep-creek-hot-springs-trail" },
                    { name: "MacKay Bark Park", desc: "Off-leash dog park in Blue Jay — great for a morning run", tag: "Off-leash · Free", url: "https://www.bringfido.com/attraction/trails/city/lake_arrowhead_ca_us/" },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/5"
                    >
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-ivory/20 group-hover:text-emerald-400 transition-colors" />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-body text-sm text-ivory group-hover:text-ivory/90">{item.name}</span>
                          <span className="font-accent text-[0.6rem] tracking-widest uppercase px-1.5 py-0.5 rounded-full" style={{ background: "rgba(52,211,153,0.12)", color: "oklch(0.72 0.14 145)" }}>{item.tag}</span>
                        </div>
                        <p className="font-body text-xs text-ivory/50 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Restaurants & Cafes */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg" style={{ background: "rgba(212,175,55,0.12)" }}>
                    <UtensilsCrossed size={18} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-light text-ivory">Dog-Friendly Restaurants & Cafés</h3>
                    <p className="font-body text-xs text-ivory/50">Patio seating · Water bowls often provided · Leashes required</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { name: "Jetties Waterfront Kitchen + Drink", desc: "Relaxed lakeside hangout with a dog-friendly deck and great cocktails", tag: "Lakefront", url: "https://www.jettiesla.com/" },
                    { name: "The Lakefront Taproom Bar & Kitchen", desc: "Scenic lake views, craft beer, and a welcoming dog-friendly patio", tag: "Patio · Bar", url: "https://www.lftaproom.com/" },
                    { name: "Belgian Waffle Works", desc: "Famous Belgian waffles with great views — leashed dogs welcome outdoors", tag: "Breakfast", url: "https://www.yelp.com/biz/belgian-waffle-works-lake-arrowhead" },
                    { name: "Lake Arrowhead Brewing Company", desc: "Craft beer, fire pits, dog bowls on the patio — a local favorite", tag: "Brewery · Patio", url: "https://www.yelp.com/biz/lake-arrowhead-brewing-company-lake-arrowhead" },
                    { name: "Papagayos Mexican Restaurant", desc: "Tasty tacos and margaritas with a patio perfect for leashed pups", tag: "Mexican · Patio", url: "https://www.yelp.com/biz/papagayos-lake-arrowhead" },
                    { name: "Saddleback Inn", desc: "Historic mountain charm with pet-welcoming patio dining", tag: "Historic · Brunch", url: "https://www.yelp.com/biz/saddleback-inn-lake-arrowhead" },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/5"
                    >
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-ivory/20 group-hover:text-gold transition-colors" />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-body text-sm text-ivory group-hover:text-ivory/90">{item.name}</span>
                          <span className="font-accent text-[0.6rem] tracking-widest uppercase px-1.5 py-0.5 rounded-full" style={{ background: "rgba(212,175,55,0.1)", color: "oklch(0.72 0.12 75)" }}>{item.tag}</span>
                        </div>
                        <p className="font-body text-xs text-ivory/50 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Shopping & Village */}
              <div className="grid sm:grid-cols-2 gap-6">

                {/* Village Shopping & Gifts */}
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg" style={{ background: "rgba(139,92,246,0.12)" }}>
                      <ShoppingBag size={18} style={{ color: "oklch(0.72 0.15 290)" }} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-light text-ivory">Village Shopping & Gifts</h3>
                      <p className="font-body text-xs text-ivory/50">Lake Arrowhead Village · Dog-friendly paths</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "Dorothy's at The Lake", desc: "Charming home décor & gift shop in the Village", url: "https://www.thelakearrowheadvillage.com/dorothys-at-the-lake-gift-shop" },
                      { name: "Pendleton Woolen Mills", desc: "Classic blankets, flannels, and mountain apparel", url: "https://www.thelakearrowheadvillage.com/shopping-2" },
                      { name: "Alexandra's Emporium", desc: "Eclectic gifts, art, and local finds", url: "https://www.thelakearrowheadvillage.com/books-gifts" },
                      { name: "Big on Bears", desc: "Whimsical bear-themed gifts and collectibles", url: "https://www.thelakearrowheadvillage.com/books-gifts" },
                      { name: "Mountain Arts Gallery", desc: "Local art, photography, and mountain-inspired pieces", url: "https://www.thelakearrowheadvillage.com/books-gifts" },
                      { name: "Mr. G's for Toys", desc: "Fun toy shop — great if kids are along for the trip", url: "https://www.thelakearrowheadvillage.com/books-gifts" },
                    ].map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-2 p-2 rounded-lg transition-all duration-200 hover:bg-white/5"
                      >
                        <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-ivory/20 group-hover:text-purple-400 transition-colors" />
                        <div>
                          <span className="font-body text-sm text-ivory group-hover:text-ivory/90 block">{item.name}</span>
                          <span className="font-body text-xs text-ivory/45">{item.desc}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Bookstores & Coffee */}
                <div className="space-y-6">
                  <div
                    className="rounded-2xl p-6"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg" style={{ background: "rgba(251,146,60,0.12)" }}>
                        <BookOpen size={18} style={{ color: "oklch(0.72 0.15 55)" }} />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-light text-ivory">Books & Coffee</h3>
                        <p className="font-body text-xs text-ivory/50">Cozy mountain reads</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "The Next Chapter Bookstore", desc: "Beloved local indie bookshop — 5-star rated", url: "https://www.yelp.com/biz/the-next-chapter-bookstore-lake-arrowhead" },
                        { name: "Jurassic Fossils", desc: "Unique science & nature shop in the Village", url: "https://www.thelakearrowheadvillage.com/books-gifts" },
                        { name: "Spade and Spatula", desc: "Cozy café with great coffee and dog-friendly patio", url: "https://www.yelp.com/biz/spade-and-spatula-lake-arrowhead" },
                        { name: "Lake Arrowhead Pizza", desc: "Laid-back family pizzeria with outdoor seating", url: "https://www.yelp.com/search?find_desc=Lake+Arrowhead+Pizza&find_loc=Lake+Arrowhead%2C+CA" },
                      ].map((item) => (
                        <a
                          key={item.name}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-2 p-2 rounded-lg transition-all duration-200 hover:bg-white/5"
                        >
                          <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-ivory/20 group-hover:text-orange-400 transition-colors" />
                          <div>
                            <span className="font-body text-sm text-ivory group-hover:text-ivory/90 block">{item.name}</span>
                            <span className="font-body text-xs text-ivory/45">{item.desc}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Groceries */}
                  <div
                    className="rounded-2xl p-6"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg" style={{ background: "rgba(52,211,153,0.12)" }}>
                        <ShoppingCart size={18} style={{ color: "oklch(0.72 0.14 145)" }} />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-light text-ivory">Groceries & Supplies</h3>
                        <p className="font-body text-xs text-ivory/50">Stock up before or after arrival</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "Stater Bros. Markets", desc: "28100 CA-189, Lake Arrowhead · Open 6am–11pm daily", url: "https://www.staterbros.com/stores/92/" },
                        { name: "Jensen's Foods (Blue Jay)", desc: "27264 Hwy 189, Blue Jay · Local grocery, open 6am–9pm", url: "https://palmdesert.jensensfoods.com/locations/blue-jay/" },
                        { name: "Cedar Glen Fine Foods", desc: "Specialty local market with artisan goods", url: "https://www.yelp.com/search?find_desc=Cedar+Glen+Fine+Foods&find_loc=Lake+Arrowhead%2C+CA" },
                        { name: "Grocery Outlet (Crestline)", desc: "Budget-friendly options 15 min down the mountain", url: "https://www.groceryoutlet.com/" },
                      ].map((item) => (
                        <a
                          key={item.name}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-2 p-2 rounded-lg transition-all duration-200 hover:bg-white/5"
                        >
                          <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-ivory/20 group-hover:text-emerald-400 transition-colors" />
                          <div>
                            <span className="font-body text-sm text-ivory group-hover:text-ivory/90 block">{item.name}</span>
                            <span className="font-body text-xs text-ivory/45">{item.desc}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Activities & Extras */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg" style={{ background: "rgba(59,130,246,0.12)" }}>
                    <Waves size={18} style={{ color: "oklch(0.65 0.15 240)" }} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-light text-ivory">Activities & Extras</h3>
                    <p className="font-body text-xs text-ivory/50">Beyond the cabin</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { name: "Lake Arrowhead Village", desc: "50+ waterfront shops, restaurants, and boutiques — leashed dogs welcome on all paths", tag: "Free · Dog-friendly", url: "https://www.thelakearrowheadvillage.com/" },
                    { name: "Lake Gregory Regional Park", desc: "15 min away — dog-friendly paths and water access, great for a morning walk", tag: "15 min away", url: "https://www.sbcounty.gov/parks/" },
                    { name: "Lake Arrowhead Queen Tour Boat", desc: "Scenic 50-min narrated lake tour — check pet policy before booking", tag: "Boat Tour", url: "https://www.thelakearrowheadvillage.com/activities" },
                    { name: "Mountain History Museum", desc: "Small local museum in the Village — interesting for a rainy afternoon", tag: "Indoor", url: "https://www.thelakearrowheadvillage.com/activities" },
                    { name: "WildHaven Ranch", desc: "Wildlife sanctuary nearby — educational and family-friendly", tag: "Nature", url: "https://www.thelakearrowheadvillage.com/activities" },
                    { name: "Stargazing from the Decks", desc: "At 5,000 ft elevation, the night sky is spectacular — bring a blanket and s'mores", tag: "At the cabin", url: "#" },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/5"
                    >
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-ivory/20 group-hover:text-blue-400 transition-colors" />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-body text-sm text-ivory group-hover:text-ivory/90">{item.name}</span>
                          <span className="font-accent text-[0.6rem] tracking-widest uppercase px-1.5 py-0.5 rounded-full" style={{ background: "rgba(59,130,246,0.1)", color: "oklch(0.65 0.15 240)" }}>{item.tag}</span>
                        </div>
                        <p className="font-body text-xs text-ivory/50 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

            </div>{/* end space-y-8 */}
          </div>
        </div>
      </section>

      {/* Treasure Map */}
      <section className="py-16" style={{ background: "rgba(6,8,18,0.8)" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-3">
                <MapPin size={15} style={{ color: "oklch(0.72 0.12 75)" }} />
                <span className="font-accent text-xs tracking-[0.2em] uppercase text-gold">Home Base: Alpen Lodge</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-ivory mb-2">
                Your <span className="text-gold italic">Adventure Map</span>
              </h2>
              <p className="font-body text-sm text-ivory/55 max-w-lg mx-auto">
                All the highlights from the guide, pinned relative to your cabin. Click any marker to explore.
              </p>
            </div>

            {/* Map Container */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
              <MapView
                className="w-full h-[520px]"
                initialCenter={{ lat: 34.2439, lng: -117.1889 }}
                initialZoom={13}
                onMapReady={(map) => {
                  mapRef.current = map;

                  const infoWindow = new window.google.maps.InfoWindow();

                  const pins = [
                    // Home base
                    { lat: 34.2439, lng: -117.1889, label: "🏡 Alpen Lodge", desc: "Your home base · VRBO #5089227 · 3 decks, lake views, fenced yard", color: "#c9a84c", category: "Home Base" },
                    // Hikes
                    { lat: 34.2510, lng: -117.1840, label: "🥾 Will Abell Trail", desc: "1.9-mile wooded loop · Easy · Dog-friendly", color: "#34d399", category: "Hike" },
                    { lat: 34.2280, lng: -117.2100, label: "🌲 Heaps Peak Arboretum", desc: "1-mile interpretive trail · Sequoias · Easy", color: "#34d399", category: "Hike" },
                    { lat: 34.2350, lng: -117.1600, label: "🏔️ Castle Rock Trail", desc: "2.2-mile panoramic views of the lake · Moderate", color: "#34d399", category: "Hike" },
                    { lat: 34.2650, lng: -117.1750, label: "🐾 MacKay Bark Park", desc: "Off-leash dog park in Blue Jay · Free", color: "#34d399", category: "Dog Park" },
                    // Restaurants
                    { lat: 34.2470, lng: -117.1920, label: "🍽️ Jetties Waterfront", desc: "Lakeside dining · Dog-friendly deck · Great cocktails", color: "#c9a84c", category: "Restaurant" },
                    { lat: 34.2460, lng: -117.1870, label: "🍺 Lake Arrowhead Brewing Co.", desc: "Craft beer · Fire pits · Dog bowls on patio", color: "#c9a84c", category: "Restaurant" },
                    { lat: 34.2480, lng: -117.1910, label: "🧇 Belgian Waffle Works", desc: "Famous waffles · Leashed dogs welcome outdoors", color: "#c9a84c", category: "Restaurant" },
                    // Village & Shopping
                    { lat: 34.2455, lng: -117.1895, label: "🛍️ Lake Arrowhead Village", desc: "50+ waterfront shops & restaurants · Dog-friendly paths", color: "#a78bfa", category: "Village" },
                    { lat: 34.2620, lng: -117.1780, label: "📚 The Next Chapter Bookstore", desc: "Beloved indie bookshop · 5-star rated", color: "#a78bfa", category: "Shop" },
                    // Groceries
                    { lat: 34.2580, lng: -117.1830, label: "🛒 Stater Bros.", desc: "28100 CA-189 · Open 6am–11pm daily", color: "#60a5fa", category: "Grocery" },
                    { lat: 34.2640, lng: -117.1760, label: "🛒 Jensen's Foods", desc: "Blue Jay · Local grocery · Open 6am–9pm", color: "#60a5fa", category: "Grocery" },
                  ];

                  pins.forEach((pin) => {
                    const markerEl = document.createElement("div");
                    markerEl.style.cssText = `
                      background: ${pin.color};
                      border: 2px solid rgba(255,255,255,0.3);
                      border-radius: 50%;
                      width: ${pin.category === "Home Base" ? "20px" : "13px"};
                      height: ${pin.category === "Home Base" ? "20px" : "13px"};
                      box-shadow: 0 0 ${pin.category === "Home Base" ? "12px" : "6px"} ${pin.color}80;
                      cursor: pointer;
                    `;

                    const marker = new window.google.maps.marker.AdvancedMarkerElement({
                      map,
                      position: { lat: pin.lat, lng: pin.lng },
                      title: pin.label,
                      content: markerEl,
                    });

                    marker.addListener("gmp-click", () => {
                      infoWindow.setContent(`
                        <div style="font-family: sans-serif; padding: 4px 2px; max-width: 220px;">
                          <div style="font-size: 13px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px;">${pin.label}</div>
                          <div style="font-size: 11px; color: #555; line-height: 1.5;">${pin.desc}</div>
                          <div style="font-size: 10px; color: ${pin.color}; margin-top: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${pin.category}</div>
                        </div>
                      `);
                      infoWindow.open(map, marker);
                    });
                  });
                }}
              />
            </div>

            {/* Map Legend */}
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              {[
                { color: "#c9a84c", label: "Home Base & Restaurants" },
                { color: "#34d399", label: "Hikes & Dog Parks" },
                { color: "#a78bfa", label: "Village & Shopping" },
                { color: "#60a5fa", label: "Groceries" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}80` }} />
                  <span className="font-body text-xs text-ivory/50">{item.label}</span>
                </div>
              ))}
            </div>
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
            <h2 className="font-display text-4xl font-light mt-2" style={{ color: "#e8e0d0" }}>Ask Margaux About the Trip</h2>
            <p className="font-body text-sm mt-3" style={{ color: "rgba(232,224,208,0.5)" }}>She knows the Alpen Lodge inside and out. Ask about packing, hikes for the dogs, what to cook, where to eat, or how to spend each day.</p>
          </motion.div>
          <MargauxChatEmbed />
        </div>
      </section>

      {/* Other Options — Accordion */}
      <section className="py-10" style={{ background: "rgba(8,10,20,0.7)" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Accordion Header */}
            <button
              onClick={() => setShowOtherOptions(!showOtherOptions)}
              className="w-full flex items-center justify-between gap-4 p-5 rounded-2xl transition-all duration-200 hover:bg-white/4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ background: "rgba(201,168,76,0.1)" }}>
                  <Home size={15} className="text-gold" />
                </div>
                <div className="text-left">
                  <p className="font-display text-lg font-light text-ivory">Other Cabin Options</p>
                  <p className="font-body text-xs text-ivory/45 italic">4 dog-friendly alternatives · For reference or future trips</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-accent text-[0.6rem] tracking-widest uppercase px-2.5 py-1 rounded-full" style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c" }}>
                  {showOtherOptions ? "Collapse" : "Expand"}
                </span>
                {showOtherOptions
                  ? <ChevronUp size={16} className="text-gold" />
                  : <ChevronDown size={16} className="text-gold" />}
              </div>
            </button>

            {/* Accordion Content */}
            <AnimatePresence>
              {showOtherOptions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6">
                    {/* Note */}
                    <div
                      className="rounded-xl p-4 mb-6 flex items-start gap-3"
                      style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)" }}
                    >
                      <CalendarDays size={14} style={{ color: "oklch(0.72 0.14 145)" }} className="mt-0.5 shrink-0" />
                      <p className="font-body text-xs text-ivory/60 leading-relaxed">
                        You've booked the Alpen Lodge (VRBO #5089227) for March 27–30. These listings are kept for reference — great options for a future trip or if plans change. All are dog-friendly with fenced yards.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 mb-8">
                      {listings.map((listing) => (
                        <ListingCard
                          key={listing.id}
                          listing={listing}
                          isSelected={selectedListing === listing.id}
                          onSelect={() => setSelectedListing(listing.id)}
                        />
                      ))}
                    </div>

                    {/* Comparison Table */}
                    <div
                      className="glass-card rounded-2xl overflow-hidden border"
                      style={{ borderColor: "rgba(201,168,76,0.2)" }}
                    >
                      <div className="px-5 py-3 border-b flex items-center gap-2" style={{ borderColor: "rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.04)" }}>
                        <Star size={13} className="text-gold" />
                        <p className="font-accent text-xs tracking-widest uppercase text-gold/70">Side-by-Side Comparison</p>
                      </div>
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
                </motion.div>
              )}
            </AnimatePresence>
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

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
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
        systemPrompt: `You are Margaux, a warm, witty, and knowledgeable travel advisor who helped plan this trip. The booking is CONFIRMED: the Alpen Lodge in Lake Arrowhead, California (VRBO Property #5089227, Reservation #56518539). The trip is March 27-30, 2026 — 3 nights, 3 adults, 1 pet.

About the Alpen Lodge: A gorgeous 5-bedroom, 3-bathroom lakeview home with 3 private decks, 3 fireplaces, a fully fenced yard, BBQ grill, firepit, pool table, ping pong table, AC, EV charger, and lake rights. Sleeps 10. Dog-friendly (2 dog max, $100 flat fee already paid). Located at Lake Arrowhead, CA — about 2 hours from Los Angeles via I-10 to Hwy 138 or Hwy 18.

The guests: Melanie (celebrating her 50th birthday on March 26!), Curtis (her partner who planned and gifted this trip), and Annie. The dogs are PennyLu (Doberman) and Kota (Aussie).

Local adventure highlights you know well:
- Dog-friendly hikes: Will Abell Loop (easy, 2.5mi), Heaps Peak Arboretum (paved, dog-friendly), Heart Rock Trail (3mi, waterfall), Castle Rock Trail (2mi, panoramic views), Deep Creek Hot Springs (advanced, 8mi RT), MacKay Bark Park (off-leash dog park)
- Restaurants: Jetties (waterfront, dog-friendly patio), Lakefront Taproom (craft beer, lake views), Belgian Waffle Works (Village classic), Lake Arrowhead Brewing Co, Papagayos (Mexican, patio), Saddleback Inn (upscale)
- Shopping: The Village at Lake Arrowhead, Dorothy's of Lake Arrowhead (gifts), Pendleton (outdoor/apparel), Alexandra's Emporium (antiques), Big on Bears (local art), Mountain Arts Gallery
- Groceries: Stater Bros Blue Jay (6am-11pm, closest), Jensen's Foods Blue Jay (specialty/deli), Cedar Glen Fine Foods (artisan), Grocery Outlet Rim of the World
- Activities: Lake Arrowhead Village, Lake Gregory Regional Park, Queen Arrowhead boat tour, Lake Arrowhead Historical Museum, WildHaven Ranch (wolf sanctuary), stargazing from the 3 decks

You know this trip is a birthday gift from Curtis to Melanie. Be warm, celebratory, and practical. Help with packing lists, day-by-day itinerary ideas, restaurant recommendations, hike suggestions for the dogs, grocery lists, driving directions, or anything else about the trip. Be witty but never over the top.`,
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
              Ask about packing for the Alpen Lodge, hikes for PennyLu and Kota, the best restaurants in the Village, what to stock the kitchen with, or how to plan each day of the trip.
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
          placeholder="Ask about packing, hikes, restaurants, day plans..."
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
