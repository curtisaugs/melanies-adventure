/**
 * Rhine Cruise Detail Page — Melanie's European Adventure
 *
 * Design: The Modern European
 * - Midnight navy (#0a0f1e) background, champagne gold (#c9a84c) accents
 * - Cormorant Garamond for display headings, Montserrat for body/UI
 * - Glass morphism cards with subtle gold borders
 * - Vertical timeline layout for day-by-day itinerary
 * - Full-bleed hero with ship image overlay
 */

import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ship,
  MapPin,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Anchor,
  Wine,
  Utensils,
  Wifi,
  Dumbbell,
  Camera,
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  CheckCircle2,
  ExternalLink,
  Bike,
  Mountain,
  Coffee,
} from "lucide-react";

const RHINE_HERO =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85&fit=crop";
const SHIP_IMG =
  "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=900&q=80&fit=crop";
const BASEL_IMG =
  "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=700&q=80&fit=crop";
const COLMAR_IMG =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&fit=crop";
const STRASBOURG_IMG =
  "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=700&q=80&fit=crop";
const HEIDELBERG_IMG =
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=700&q=80&fit=crop";
const RUDESHEIM_IMG =
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=700&q=80&fit=crop";
const COLOGNE_IMG =
  "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=700&q=80&fit=crop";
const AMSTERDAM_IMG =
  "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=700&q=80&fit=crop";
const KINDERDIJK_IMG =
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=700&q=80&fit=crop";

interface DayData {
  day: number;
  port: string;
  country: string;
  flag: string;
  headline: string;
  tagline: string;
  description: string;
  excursions: { name: string; type: "walking" | "bike" | "scenic" | "tasting" | "hike" | "special"; duration?: string; highlight?: string }[];
  melanieTip: string;
  reloNote?: string;
  image: string;
  isEmbark?: boolean;
  isDisembark?: boolean;
}

const days: DayData[] = [
  {
    day: 1,
    port: "Basel",
    country: "Switzerland",
    flag: "🇨🇭",
    headline: "Embarkation Day — The Journey Begins",
    tagline: "Board your ship and set sail on the Rhine",
    description:
      "Arrive in Basel, Switzerland — one of Europe's great art cities, straddling the Rhine at the point where Switzerland, Germany, and France converge. Spend the afternoon exploring the medieval Altstadt (Old Town), the striking red sandstone Rathaus (Town Hall), and the world-class Fondation Beyeler or Kunstmuseum Basel if time allows. Board the AmaLucia in the late afternoon, settle into your stateroom, and meet fellow travelers at the festive Welcome Dinner as the ship glides north into the evening.",
    excursions: [
      { name: "Basel Old Town Walking Tour", type: "walking", duration: "2 hrs", highlight: "Rathaus, Münster Cathedral, Rhine promenade" },
      { name: "Fondation Beyeler Art Museum", type: "special", duration: "2–3 hrs", highlight: "World-class modern art — Monet, Picasso, Warhol" },
      { name: "Kunstmuseum Basel", type: "special", duration: "2 hrs", highlight: "Largest public art collection in Switzerland" },
    ],
    melanieTip:
      "Arrive a day early to explore Basel properly — the Art Basel fair has made this city a serious cultural destination. The Tinguely Fountain near the theater is a whimsical delight.",
    reloNote:
      "Basel is home to several major pharmaceutical companies (Novartis, Roche) and has a thriving expat community. Cost of living is high but quality of life is exceptional.",
    image: BASEL_IMG,
    isEmbark: true,
  },
  {
    day: 2,
    port: "Breisach",
    country: "Germany",
    flag: "🇩🇪",
    headline: "Vineyards & Villages — Colmar Awaits",
    tagline: "Step into Alsace's fairy-tale streets and sunlit Rhine countryside",
    description:
      "Dock at Breisach, a small German town perched on a volcanic outcrop above the Rhine, and use it as your gateway to the Alsace region. The star excursion is Colmar, France — arguably the most perfectly preserved medieval town in all of Europe. Its pastel half-timbered houses, flower-draped canals (earning it the nickname 'Little Venice'), and world-class Unterlinden Museum (home to Grünewald's Isenheim Altarpiece) make it utterly unforgettable. Alternatively, active guests can hike or cycle through the Kaiserstuhl, a volcanic plateau of vineyards producing some of Germany's finest Pinot Noir and Riesling.",
    excursions: [
      { name: "Colmar Walking Tour", type: "walking", duration: "3–4 hrs", highlight: "La Petite Venise, Unterlinden Museum, Pfister House" },
      { name: "Kaiserstuhl Vineyard Hike", type: "hike", duration: "3 hrs", highlight: "Volcanic terroir, panoramic Rhine views, Pinot Noir tastings" },
      { name: "Breisach Wine Country Bike Tour", type: "bike", duration: "3 hrs", highlight: "Flat riverside cycling through vineyards and villages" },
    ],
    melanieTip:
      "Don't miss Colmar's Unterlinden Museum — the Isenheim Altarpiece is one of the most powerful works of art in existence. And the Alsatian tarte flambée (flammkuchen) at any local brasserie is mandatory.",
    image: COLMAR_IMG,
  },
  {
    day: 3,
    port: "Strasbourg",
    country: "France",
    flag: "🇫🇷",
    headline: "Strasbourg — Where France Meets Germany",
    tagline: "The Gem of Alsace: cathedrals, canals, and cultural crossroads",
    description:
      "Strasbourg is one of the great cities of Europe — the seat of the European Parliament, a UNESCO World Heritage city, and a place where French elegance and German precision have fused into something entirely unique. The Gothic Cathédrale Notre-Dame de Strasbourg, with its famous astronomical clock (one of the most complex mechanical clocks ever built), dominates the skyline. La Petite France — the tanner's quarter with its 16th-century half-timbered houses reflected in the Ill River — is the most photogenic neighborhood in Alsace. The Palais Rohan houses three exceptional museums in one building.",
    excursions: [
      { name: '"The Gem of Alsace" Walking Tour', type: "walking", duration: "3 hrs", highlight: "Cathedral, La Petite France, Palais Rohan, European Quarter" },
      { name: "Strasbourg Bike Tour", type: "bike", duration: "3 hrs", highlight: "Cycle through the European Quarter and along the Ill canals" },
      { name: "European Parliament Visit", type: "special", duration: "2 hrs", highlight: "Tour the seat of EU democracy — fascinating for anyone considering relocation" },
    ],
    melanieTip:
      "The astronomical clock in the cathedral performs at 12:30pm daily — arrive early for a seat. For dinner ashore, Maison Kammerzell (in the shadow of the cathedral) is a once-in-a-lifetime Alsatian dining experience.",
    reloNote:
      "Strasbourg is a bilingual city (French/German) with a large expat population due to EU institutions. Excellent quality of life, strong healthcare, and more affordable than Paris.",
    image: STRASBOURG_IMG,
  },
  {
    day: 4,
    port: "Ludwigshafen / Heidelberg",
    country: "Germany",
    flag: "🇩🇪",
    headline: "Romantic Heidelberg — Germany's Most Beautiful City",
    tagline: "Castles, the Philosopher's Path, and the soul of German Romanticism",
    description:
      "The ship docks at Ludwigshafen — a functional industrial city — but the destination is Heidelberg, 15 km away, which is anything but. Heidelberg is the archetypal German Romantic city: a ruined red sandstone castle looming over the Neckar River, a perfectly preserved baroque Altstadt, and the oldest university in Germany (founded 1386). The Philosopher's Path (Philosophenweg) — a hillside promenade above the city where Hegel, Goethe, and countless others walked — offers the most beautiful view in the Rhine Valley. Alternatively, explore the medieval town of Speyer with its magnificent Romanesque cathedral, or cycle through the charming town of Ladenburg.",
    excursions: [
      { name: '"Romantic Heidelberg" Excursion', type: "walking", duration: "4 hrs", highlight: "Heidelberg Castle, Altstadt, Karl-Theodor Bridge" },
      { name: "Heidelberg Philosopher's Path Hike", type: "hike", duration: "3 hrs", highlight: "Panoramic views, the Heiligenberg, contemplative walking route" },
      { name: '"Secrets of Speyer" Tour', type: "walking", duration: "4 hrs", highlight: "Speyer Cathedral (UNESCO), Jewish Bath, historic wine cellar" },
      { name: "Ladenburg Bike Tour", type: "bike", duration: "3 hrs", highlight: "Charming Roman-founded town along the Neckar" },
    ],
    melanieTip:
      "Heidelberg Castle at sunset is one of the great European views. If you can, take the Philosopher's Path in the morning and the castle in the afternoon — the light on the ruins is extraordinary. The Zum Roten Ochsen tavern (est. 1703) is where Mark Twain drank.",
    image: HEIDELBERG_IMG,
  },
  {
    day: 5,
    port: "Rüdesheim",
    country: "Germany",
    flag: "🇩🇪",
    headline: "The Rhine Gorge — Legends, Castles & Riesling",
    tagline: "Gondola rides, the Lorelei, and Germany's greatest wine country",
    description:
      "This is the day the Rhine becomes legendary. Rüdesheim sits at the northern entrance to the Rhine Gorge — a 65-km stretch of river so dramatic, so castle-studded, and so steeped in mythology that UNESCO designated it a World Heritage Site. A gondola ride to the Niederwalddenkmal statue offers sweeping views over the vine-terraced valley. The afternoon cruise through the Gorge itself — past Bacharach, Oberwesel, the Lorelei rock, and a procession of medieval castles — is the emotional peak of the entire journey. In the evening, the ship docks at Lahnstein for an exclusive visit to Burg Lahneck, a 13th-century castle.",
    excursions: [
      { name: "Gondola Ride & Wine Tasting", type: "tasting", duration: "2 hrs", highlight: "Panoramic Rhine Valley views + Rüdesheimer Riesling" },
      { name: "Vineyard Hike through the Rheingau", type: "hike", duration: "3 hrs", highlight: "World-class Riesling terroir, village stops, castle views" },
      { name: "Guided Bike Tour of the Rheingau", type: "bike", duration: "3 hrs", highlight: "Flat riverside cycling through Germany's premier wine region" },
      { name: "Castles Along the Rhine Scenic Cruising", type: "scenic", duration: "Afternoon", highlight: "Lorelei Rock, Marksburg Castle, Pfalzgrafenstein — from the sun deck" },
      { name: "Exclusive Burg Lahneck Visit", type: "special", duration: "2 hrs", highlight: "Private evening access to a 13th-century castle — AmaWaterways exclusive" },
    ],
    melanieTip:
      "Spend the afternoon on the sun deck with a glass of Riesling as the ship glides through the Gorge — this is the moment the Rhine earns its reputation. The Lorelei rock at dusk, with the light fading over the castles, is genuinely one of the most beautiful things in Europe.",
    image: RUDESHEIM_IMG,
  },
  {
    day: 6,
    port: "Monheim / Cologne",
    country: "Germany",
    flag: "🇩🇪",
    headline: "Cologne — Gothic Splendor & Modern Energy",
    tagline: "The great cathedral, Roman history, and Germany's most vibrant city",
    description:
      "The ship docks at Monheim, a short drive from Cologne — Germany's fourth-largest city and one of its most culturally rich. The Kölner Dom (Cologne Cathedral) is the undisputed star: a Gothic masterpiece that took 632 years to complete, soaring 157 meters above the Rhine, and housing the Shrine of the Three Kings — the largest reliquary in the Western world. The Roman-Germanic Museum next door displays extraordinary artifacts from Cologne's 2,000-year history. The Hohenzollern Bridge, festooned with over a million love locks, is one of Europe's most photographed sights. Cologne's Altstadt (Old Town) is lively, welcoming, and full of Kölsch beer halls.",
    excursions: [
      { name: "Cologne Half-Day Walking Tour", type: "walking", duration: "4 hrs", highlight: "Cologne Cathedral, Roman-Germanic Museum, Hohenzollern Bridge, Altstadt" },
      { name: "Cologne Chocolate Museum", type: "special", duration: "2 hrs", highlight: "The world's most-visited chocolate museum — on the Rhine waterfront" },
      { name: "Cologne Perfume Museum (4711)", type: "special", duration: "1.5 hrs", highlight: "Eau de Cologne was invented here in 1709 — the original 4711 shop" },
    ],
    melanieTip:
      "The Cathedral is free to enter but the Treasury and tower climb cost a few euros — both are worth it. For lunch, Früh am Dom (right next to the cathedral) is the quintessential Cologne Kölsch experience. Don't leave without trying a Halve Hahn — a rye roll with Gouda, despite the name meaning 'half chicken.'",
    reloNote:
      "Cologne has a significant English-speaking expat community, excellent international schools, and a lower cost of living than Munich or Frankfurt. Germany's Freelance Visa is a strong option for independent professionals.",
    image: COLOGNE_IMG,
  },
  {
    day: 7,
    port: "Amsterdam / Kinderdijk",
    country: "Netherlands",
    flag: "🇳🇱",
    headline: "Kinderdijk Windmills & Amsterdam's Canals",
    tagline: "UNESCO windmills, Dutch cheese, and the world's most beautiful canal city",
    description:
      "The final full day begins with a morning stop at Kinderdijk — a UNESCO World Heritage Site where 19 perfectly preserved 18th-century windmills stand sentinel over the Dutch polder landscape. It is one of the most iconic images in all of Europe, and in late March the surrounding fields are beginning to bloom. In the afternoon, the ship arrives in Amsterdam for a canal cruise through the city's historic waterways — 165 canals, 1,500 bridges, and 17th-century merchant houses that lean at improbable angles. The evening is free to explore Amsterdam's world-class museums, restaurants, and the legendary Jordaan neighborhood.",
    excursions: [
      { name: "Kinderdijk Windmills & Dutch Cheese Making", type: "scenic", duration: "3 hrs", highlight: "19 UNESCO windmills, cheese tasting, Dutch countryside" },
      { name: "Amsterdam Canal Cruise", type: "scenic", duration: "1.5 hrs", highlight: "Historic canal ring, Anne Frank House exterior, Jordaan" },
      { name: "Rijksmuseum Visit", type: "special", duration: "2–3 hrs", highlight: "Rembrandt's Night Watch, Vermeer, Dutch Golden Age masterpieces" },
      { name: "Van Gogh Museum", type: "special", duration: "2 hrs", highlight: "The world's largest Van Gogh collection — book in advance" },
    ],
    melanieTip:
      "Book the Rijksmuseum or Van Gogh Museum online before the trip — they sell out weeks in advance. The Jordaan neighborhood for dinner is magical: Café 't Smalle on Egelantiersgracht is one of the most beautiful brown cafés in Amsterdam.",
    reloNote:
      "Amsterdam has a massive English-speaking expat community — nearly everyone speaks English. The Netherlands offers a 30% tax ruling for highly skilled migrants, and Amsterdam's tech/startup scene is one of Europe's strongest.",
    image: AMSTERDAM_IMG,
  },
  {
    day: 8,
    port: "Amsterdam",
    country: "Netherlands",
    flag: "🇳🇱",
    headline: "Disembarkation — Until Next Time",
    tagline: "Say goodbye to the AmaLucia and begin your journey home — or extend your stay",
    description:
      "Disembark in Amsterdam after breakfast. For those extending the trip, Amsterdam rewards extra days generously — the Anne Frank House, the Stedelijk Museum, the Albert Cuyp Market, and a bike ride through Vondelpark are all within easy reach. Alternatively, a short train ride connects Amsterdam to the tulip fields of Keukenhof (open late March through May) — one of the great horticultural spectacles in the world, with 7 million bulbs in bloom. Fly home from Amsterdam Schiphol (AMS), or continue south to Paris to visit Annie and Thomas.",
    excursions: [
      { name: "Anne Frank House", type: "special", duration: "2 hrs", highlight: "One of the most moving historical sites in Europe — book months ahead" },
      { name: "Keukenhof Tulip Gardens", type: "scenic", duration: "Half day", highlight: "7 million tulips in bloom — open late March to May, 30 min by bus" },
      { name: "Bike Rental — Vondelpark & Jordaan", type: "bike", duration: "2–3 hrs", highlight: "The quintessential Amsterdam experience — flat, safe, beautiful" },
    ],
    melanieTip:
      "If the dates align, Keukenhof is absolutely worth the detour — it's only open 8 weeks a year and the tulip fields in late March are extraordinary. From Amsterdam, a direct Thalys train to Paris takes 3h15 — the perfect way to end the trip with Annie.",
    reloNote:
      "Amsterdam Schiphol is one of Europe's best-connected airports — direct flights to LAX with KLM/Delta are frequent and well-priced. Consider flying home via Paris CDG for a final reunion with Annie.",
    image: KINDERDIJK_IMG,
    isDisembark: true,
  },
];

const inclusions = [
  { icon: <Utensils size={18} />, label: "All meals onboard", detail: "Breakfast, lunch & dinner daily" },
  { icon: <Wine size={18} />, label: "Unlimited wine & beer", detail: "With lunch & dinner, plus daily Sip & Sail cocktail hour" },
  { icon: <Ship size={18} />, label: "All shore excursions", detail: "One guided excursion per port, included" },
  { icon: <Wifi size={18} />, label: "Wi-Fi throughout", detail: "Complimentary onboard internet" },
  { icon: <Dumbbell size={18} />, label: "Fitness center & pool", detail: "Sun deck pool with swim-up bar, gym, walking track" },
  { icon: <Coffee size={18} />, label: "Coffee & soft drinks", detail: "Complimentary all day" },
  { icon: <Camera size={18} />, label: "Guided city tours", detail: "Expert local guides at every port" },
  { icon: <Anchor size={18} />, label: "Port charges & taxes", detail: "All included — no hidden fees" },
];

const cabinTypes = [
  { name: "Category E — Standard Stateroom", size: "170 sq ft", balcony: "French balcony", price: "From $4,349 pp", notes: "Lower deck, window, most affordable" },
  { name: "Category D — Stateroom", size: "170 sq ft", balcony: "French balcony", price: "From $4,799 pp", notes: "Middle deck, twin balcony doors" },
  { name: "Category C — Stateroom", size: "170 sq ft", balcony: "French balcony", price: "From $5,199 pp", notes: "Upper deck, twin balcony doors" },
  { name: "Category B — Suite", size: "235 sq ft", balcony: "French + outside balcony", price: "From $6,299 pp", notes: "Upper deck, dual balcony system, sitting area" },
  { name: "Category A — Grand Suite", size: "350 sq ft", balcony: "French + outside balcony", price: "From $7,499 pp", notes: "Largest stateroom, premium location, butler service" },
];

const departures2026 = [
  { date: "March 26, 2026", note: "🎂 Melanie's Birthday Departure — Basel embarkation on her actual birthday!", highlight: true },
  { date: "April 2, 2026", note: "Spring wildflowers beginning along the Rhine Gorge", highlight: false },
  { date: "April 9, 2026", note: "Ideal spring weather, Keukenhof tulips in full bloom at journey's end", highlight: false },
  { date: "April 16, 2026", note: "Peak spring — Rhine Valley at its most beautiful", highlight: false },
  { date: "April 23, 2026", note: "Late April — warm, long days, fewer crowds", highlight: false },
];

const excursionIcon = (type: DayData["excursions"][0]["type"]) => {
  switch (type) {
    case "walking": return <MapPin size={14} />;
    case "bike": return <Bike size={14} />;
    case "scenic": return <Camera size={14} />;
    case "tasting": return <Wine size={14} />;
    case "hike": return <Mountain size={14} />;
    case "special": return <Star size={14} />;
  }
};

const excursionColor = (type: DayData["excursions"][0]["type"]) => {
  switch (type) {
    case "walking": return "text-blue-300 bg-blue-900/30 border-blue-700/40";
    case "bike": return "text-green-300 bg-green-900/30 border-green-700/40";
    case "scenic": return "text-purple-300 bg-purple-900/30 border-purple-700/40";
    case "tasting": return "text-amber-300 bg-amber-900/30 border-amber-700/40";
    case "hike": return "text-emerald-300 bg-emerald-900/30 border-emerald-700/40";
    case "special": return "text-rose-300 bg-rose-900/30 border-rose-700/40";
  }
};

export default function RhineCruise() {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<"itinerary" | "ship" | "inclusions" | "departures">("itinerary");

  return (
    <div className="min-h-screen" style={{ background: "#0a0f1e", color: "#e8e0d0" }}>
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(10,15,30,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}
      >
        <Link href="/">
          <span className="flex items-center gap-2 cursor-pointer" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c" }}>
            <ArrowLeft size={16} />
            <span className="text-sm tracking-widest uppercase">Melanie's European Adventure</span>
          </span>
        </Link>
        <Link href="/itineraries">
          <span className="text-xs tracking-widest uppercase cursor-pointer" style={{ color: "#c9a84c", fontFamily: "'Montserrat', sans-serif" }}>
            ← All Itineraries
          </span>
        </Link>
      </nav>

      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${RHINE_HERO})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,15,30,1) 0%, rgba(10,15,30,0.5) 50%, rgba(10,15,30,0.2) 100%)" }} />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16">
          <div className="mb-4">
            <span
              className="inline-block px-4 py-1.5 text-xs tracking-widest uppercase rounded-full mb-4"
              style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", color: "#c9a84c", fontFamily: "'Montserrat', sans-serif" }}
            >
              🚢 AmaWaterways · Basel to Amsterdam · 7 Nights
            </span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, lineHeight: 1.1, color: "#fff" }}>
            The Rhine River
            <br />
            <em style={{ color: "#c9a84c" }}>Connoisseur</em>
          </h1>
          <p className="mt-4 text-lg max-w-2xl" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.8)", fontWeight: 300 }}>
            Drift past 1,000 years of European history without unpacking twice. Four countries, eight days, one legendary river — and the perfect birthday gift.
          </p>
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { icon: <Calendar size={16} />, label: "8 Days / 7 Nights" },
              { icon: <MapPin size={16} />, label: "Basel → Amsterdam" },
              { icon: <DollarSign size={16} />, label: "From $4,349 per person" },
              { icon: <Users size={16} />, label: "Max 156 guests" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.9)", fontSize: "0.85rem" }}>
                <span style={{ color: "#c9a84c" }}>{stat.icon}</span>
                {stat.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-[65px] z-40" style={{ background: "rgba(10,15,30,0.97)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
        <div className="max-w-5xl mx-auto px-6 flex gap-0 overflow-x-auto">
          {(["itinerary", "ship", "inclusions", "departures"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-6 py-4 text-xs tracking-widest uppercase whitespace-nowrap transition-all"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: activeTab === tab ? "#c9a84c" : "rgba(232,224,208,0.5)",
                borderBottom: activeTab === tab ? "2px solid #c9a84c" : "2px solid transparent",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              {tab === "itinerary" ? "Day-by-Day Itinerary" : tab === "ship" ? "The Ship" : tab === "inclusions" ? "What's Included" : "Departures & Pricing"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* ITINERARY TAB */}
        {activeTab === "itinerary" && (
          <div>
            <div className="mb-12 text-center">
              <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#c9a84c", fontFamily: "'Montserrat', sans-serif" }}>
                Switzerland · France · Germany · Netherlands
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#e8e0d0" }}>
                Eight Days on the Rhine
              </h2>
              <p className="mt-4 max-w-2xl mx-auto" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.65)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                Each day brings a new city, a new culture, and a new set of choices — guided tours, active adventures, or simply watching the castle-lined banks drift past from the sun deck with a glass of Riesling. The ship is your hotel; you unpack once.
              </p>
            </div>

            {/* Route Map Visual */}
            <div
              className="rounded-2xl p-6 mb-12 overflow-x-auto"
              style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.15)" }}
            >
              <div className="flex items-center gap-0 min-w-max mx-auto justify-center">
                {days.map((d, i) => (
                  <div key={d.day} className="flex items-center">
                    <button
                      onClick={() => { setExpandedDay(d.day); setActiveTab("itinerary"); }}
                      className="flex flex-col items-center gap-1 px-3 group"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                        style={{
                          background: expandedDay === d.day ? "#c9a84c" : "rgba(201,168,76,0.15)",
                          color: expandedDay === d.day ? "#0a0f1e" : "#c9a84c",
                          border: "1px solid rgba(201,168,76,0.4)",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {d.day}
                      </div>
                      <span className="text-xs text-center whitespace-nowrap" style={{ color: "rgba(232,224,208,0.6)", fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem" }}>
                        {d.flag} {d.port.split(" / ")[0]}
                      </span>
                    </button>
                    {i < days.length - 1 && (
                      <div className="w-6 h-px" style={{ background: "rgba(201,168,76,0.3)" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Day Cards */}
            <div className="space-y-4">
              {days.map((day) => (
                <motion.div
                  key={day.day}
                  layout
                  className="rounded-2xl overflow-hidden"
                  style={{ border: expandedDay === day.day ? "1px solid rgba(201,168,76,0.4)" : "1px solid rgba(201,168,76,0.12)", background: "rgba(255,255,255,0.02)" }}
                >
                  {/* Day Header */}
                  <button
                    className="w-full flex items-center gap-4 p-5 text-left"
                    onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center"
                      style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)" }}
                    >
                      <span className="text-xs" style={{ color: "#c9a84c", fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>DAY</span>
                      <span className="text-lg font-bold leading-none" style={{ color: "#c9a84c", fontFamily: "'Cormorant Garamond', serif" }}>{day.day}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: "#e8e0d0" }}>
                          {day.flag} {day.port}
                        </span>
                        {day.isEmbark && (
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(201,168,76,0.2)", color: "#c9a84c", fontFamily: "'Montserrat', sans-serif" }}>
                            Embarkation
                          </span>
                        )}
                        {day.isDisembark && (
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(201,168,76,0.2)", color: "#c9a84c", fontFamily: "'Montserrat', sans-serif" }}>
                            Disembarkation
                          </span>
                        )}
                      </div>
                      <p className="text-sm" style={{ color: "rgba(232,224,208,0.6)", fontFamily: "'Montserrat', sans-serif" }}>{day.tagline}</p>
                    </div>
                    <div style={{ color: "#c9a84c", flexShrink: 0 }}>
                      {expandedDay === day.day ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedDay === day.day && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-6">
                          {/* Image + Description */}
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
                            <div className="md:col-span-2 rounded-xl overflow-hidden" style={{ height: "220px" }}>
                              <img src={day.image} alt={day.port} className="w-full h-full object-cover" />
                            </div>
                            <div className="md:col-span-3">
                              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, color: "#e8e0d0", marginBottom: "0.75rem" }}>
                                {day.headline}
                              </h3>
                              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem", lineHeight: 1.75, color: "rgba(232,224,208,0.75)" }}>
                                {day.description}
                              </p>
                            </div>
                          </div>

                          {/* Shore Excursions */}
                          <div className="mb-5">
                            <h4 className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c9a84c", fontFamily: "'Montserrat', sans-serif" }}>
                              Shore Excursions
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {day.excursions.map((exc) => (
                                <div
                                  key={exc.name}
                                  className="rounded-lg p-3"
                                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                                >
                                  <div className="flex items-start gap-2">
                                    <span className={`flex-shrink-0 mt-0.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${excursionColor(exc.type)}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                      {excursionIcon(exc.type)}
                                      {exc.type}
                                    </span>
                                  </div>
                                  <p className="mt-1.5 text-sm font-medium" style={{ fontFamily: "'Montserrat', sans-serif", color: "#e8e0d0" }}>{exc.name}</p>
                                  {exc.highlight && (
                                    <p className="text-xs mt-0.5" style={{ color: "rgba(232,224,208,0.5)", fontFamily: "'Montserrat', sans-serif" }}>{exc.highlight}</p>
                                  )}
                                  {exc.duration && (
                                    <div className="flex items-center gap-1 mt-1">
                                      <Clock size={11} style={{ color: "#c9a84c" }} />
                                      <span className="text-xs" style={{ color: "rgba(201,168,76,0.8)", fontFamily: "'Montserrat', sans-serif" }}>{exc.duration}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Melanie's Tip */}
                          <div
                            className="rounded-xl p-4 mb-4"
                            style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)" }}
                          >
                            <div className="flex items-start gap-3">
                              <Star size={16} style={{ color: "#c9a84c", flexShrink: 0, marginTop: "2px" }} />
                              <div>
                                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#c9a84c", fontFamily: "'Montserrat', sans-serif" }}>
                                  Curtis's Tip for Melanie
                                </p>
                                <p className="text-sm" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.8)", lineHeight: 1.65 }}>
                                  {day.melanieTip}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Relocation Note */}
                          {day.reloNote && (
                            <div
                              className="rounded-xl p-4"
                              style={{ background: "rgba(100,180,255,0.05)", border: "1px solid rgba(100,180,255,0.15)" }}
                            >
                              <div className="flex items-start gap-3">
                                <MapPin size={16} style={{ color: "#7ec8e3", flexShrink: 0, marginTop: "2px" }} />
                                <div>
                                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#7ec8e3", fontFamily: "'Montserrat', sans-serif" }}>
                                    Relocation Scout Note
                                  </p>
                                  <p className="text-sm" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.75)", lineHeight: 1.65 }}>
                                    {day.reloNote}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SHIP TAB */}
        {activeTab === "ship" && (
          <div>
            <div className="mb-10 text-center">
              <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#c9a84c", fontFamily: "'Montserrat', sans-serif" }}>AmaWaterways Fleet</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#e8e0d0" }}>
                Your Home on the River: <em>AmaLucia</em>
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
              <img src={SHIP_IMG} alt="AmaLucia" className="w-full object-cover" style={{ height: "320px" }} />
              <div className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: "Length", value: "443 ft" },
                    { label: "Passengers", value: "156 max" },
                    { label: "Staterooms", value: "78" },
                    { label: "Crew", value: "51" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-2xl font-light mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c" }}>{s.value}</p>
                      <p className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.5)" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(232,224,208,0.75)" }}>
                  The AmaLucia is one of AmaWaterways' newest and most sophisticated river ships, purpose-built for the Rhine. Its hallmark is the innovative twin-balcony system — a French balcony (floor-to-ceiling sliding glass doors) and a small outside balcony in the same stateroom — giving guests the best of both worlds. The Main Lounge serves tapas throughout the day, the Chef's Table restaurant offers an intimate alternative dining experience, and the sun deck features a heated pool with a swim-up bar. With a maximum of 156 guests and 51 crew, the staff-to-guest ratio is exceptional.
                </p>
              </div>
            </div>

            {/* Cabin Types */}
            <h3 className="text-xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e8e0d0" }}>Stateroom Categories</h3>
            <div className="space-y-3 mb-10">
              {cabinTypes.map((cabin) => (
                <div
                  key={cabin.name}
                  className="rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.12)" }}
                >
                  <div className="flex-1">
                    <p className="font-medium mb-1" style={{ fontFamily: "'Montserrat', sans-serif", color: "#e8e0d0", fontSize: "0.9rem" }}>{cabin.name}</p>
                    <p className="text-xs" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.5)" }}>{cabin.notes}</p>
                  </div>
                  <div className="flex gap-6 flex-shrink-0">
                    <div className="text-center">
                      <p className="text-sm font-medium" style={{ fontFamily: "'Montserrat', sans-serif", color: "#c9a84c" }}>{cabin.size}</p>
                      <p className="text-xs" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.4)" }}>Size</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium" style={{ fontFamily: "'Montserrat', sans-serif", color: "#c9a84c" }}>{cabin.price}</p>
                      <p className="text-xs" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.4)" }}>Per person</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl p-5"
              style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)" }}
            >
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#c9a84c", fontFamily: "'Montserrat', sans-serif" }}>Curtis's Recommendation</p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(232,224,208,0.8)" }}>
                For a birthday trip of this significance, the <strong style={{ color: "#e8e0d0" }}>Category B Suite</strong> is the sweet spot — the dual balcony system means you can have the French balcony open for the Rhine Gorge passage while also stepping outside for photos. The extra space (235 sq ft vs 170 sq ft) makes a real difference on a 7-night cruise. If budget allows, the Grand Suite (Category A) is genuinely extraordinary.
              </p>
            </div>
          </div>
        )}

        {/* INCLUSIONS TAB */}
        {activeTab === "inclusions" && (
          <div>
            <div className="mb-10 text-center">
              <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#c9a84c", fontFamily: "'Montserrat', sans-serif" }}>Everything Covered</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#e8e0d0" }}>
                What's Included in the Fare
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-sm" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.6)", lineHeight: 1.7 }}>
                AmaWaterways is an all-inclusive river cruise line. The headline price covers nearly everything — the main exceptions are gratuities (suggested €12–15/day per person), travel insurance, and optional premium excursions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {inclusions.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-5 flex items-start gap-4"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.12)" }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(201,168,76,0.12)", color: "#c9a84c" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif", color: "#e8e0d0" }}>{item.label}</p>
                    <p className="text-xs" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.5)" }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* What's Not Included */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-lg mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e8e0d0" }}>Not Included (Plan For These)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { item: "Gratuities", note: "Suggested €12–15 per person per day" },
                  { item: "Travel Insurance", note: "Strongly recommended — ~$200–400 pp" },
                  { item: "International Flights", note: "LAX → Basel, Amsterdam → LAX" },
                  { item: "Premium Shore Excursions", note: "Some optional tours have an extra cost" },
                  { item: "Spa Treatments", note: "Massages, salon services" },
                  { item: "Premium Spirits & Cocktails", note: "Beer/wine included; premium spirits extra" },
                ].map((n) => (
                  <div key={n.item} className="flex items-start gap-2">
                    <CheckCircle2 size={14} style={{ color: "rgba(232,224,208,0.3)", flexShrink: 0, marginTop: "3px" }} />
                    <div>
                      <span className="text-sm" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.7)" }}>{n.item}</span>
                      <span className="text-xs block" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.4)" }}>{n.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DEPARTURES TAB */}
        {activeTab === "departures" && (
          <div>
            <div className="mb-10 text-center">
              <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#c9a84c", fontFamily: "'Montserrat', sans-serif" }}>Spring 2026</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#e8e0d0" }}>
                Available Departures
              </h2>
            </div>

            <div className="space-y-3 mb-12">
              {departures2026.map((dep) => (
                <div
                  key={dep.date}
                  className="rounded-xl p-5 flex items-center gap-4"
                  style={{
                    background: dep.highlight ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.02)",
                    border: dep.highlight ? "1px solid rgba(201,168,76,0.4)" : "1px solid rgba(201,168,76,0.1)",
                  }}
                >
                  <Calendar size={18} style={{ color: dep.highlight ? "#c9a84c" : "rgba(201,168,76,0.5)", flexShrink: 0 }} />
                  <div className="flex-1">
                    <p className="font-medium" style={{ fontFamily: "'Montserrat', sans-serif", color: dep.highlight ? "#c9a84c" : "#e8e0d0", fontSize: "0.95rem" }}>
                      {dep.date}
                    </p>
                    <p className="text-xs mt-0.5" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.55)" }}>{dep.note}</p>
                  </div>
                  {dep.highlight && (
                    <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: "#c9a84c", color: "#0a0f1e", fontFamily: "'Montserrat', sans-serif" }}>
                      Melanie's Birthday!
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Pricing Summary */}
            <div className="rounded-2xl p-8 mb-8" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)" }}>
              <h3 className="text-xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e8e0d0" }}>Estimated Total Budget (2 Guests)</h3>
              <div className="space-y-3">
                {[
                  { item: "Rhine Cruise — Category B Suite (2 guests)", cost: "$12,598–$14,000" },
                  { item: "Flights LAX → Basel + Amsterdam → LAX (2 guests)", cost: "$2,400–$3,800" },
                  { item: "Pre-cruise: 2 nights Zurich + 2 nights Lucerne (optional)", cost: "$800–$1,400" },
                  { item: "Gratuities (7 nights × $14/day × 2 guests)", cost: "~$196" },
                  { item: "Travel Insurance (recommended)", cost: "$400–$600" },
                  { item: "Personal spending, premium excursions, spa", cost: "$500–$1,000" },
                ].map((line) => (
                  <div key={line.item} className="flex items-start justify-between gap-4 py-2" style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
                    <span className="text-sm" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.7)" }}>{line.item}</span>
                    <span className="text-sm font-medium flex-shrink-0" style={{ fontFamily: "'Montserrat', sans-serif", color: "#c9a84c" }}>{line.cost}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-4 pt-3">
                  <span className="font-semibold" style={{ fontFamily: "'Montserrat', sans-serif", color: "#e8e0d0" }}>Estimated Total (2 guests)</span>
                  <span className="text-xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c" }}>$16,900–$20,800</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a
                href="https://www.amawaterways.com/river-cruises/europe/rhine/enchanting-rhine"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all hover:opacity-90"
                style={{ background: "#c9a84c", color: "#0a0f1e", fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
              >
                Book on AmaWaterways
                <ExternalLink size={14} />
              </a>
              <p className="mt-3 text-xs" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.4)" }}>
                Prices are estimates. Book directly with AmaWaterways or through a travel advisor for current availability.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t py-8 text-center" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
        <p className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(232,224,208,0.3)" }}>
          Melanie's European Adventure · A Birthday Gift from Curtis · March 26, 2026
        </p>
      </div>
    </div>
  );
}
