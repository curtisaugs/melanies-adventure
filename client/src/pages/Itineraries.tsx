/* 
  Design: The Modern European — Refined Glass & Gold
  Itineraries: Three curated packages with full details, pricing, and day-by-day breakdowns
*/
import { motion } from "framer-motion";
import { Ship, MapPin, Plane, Clock, DollarSign, Check, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const RHINE_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/118915275/dspOjTQxYYonioWF.png";
const LISBON_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/118915275/BnQZZBGqisAUUcjJ.png";
const PARIS_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/118915275/oQGgonXVfWJSKIGn.png";

const packages = [
  {
    id: "rhine",
    icon: Ship,
    badge: "Pack Once, See Everything",
    title: "The Rhine River Connoisseur",
    subtitle: "AmaWaterways · Basel to Amsterdam · 7 Nights",
    price: "From $4,349",
    priceNote: "per person, April 2026",
    duration: "7 nights / 8 days",
    image: RHINE_IMG,
    tagline: "Drift past 1,000 years of European history without unpacking twice.",
    description: "AmaWaterways' Enchanting Rhine is the gold standard of river cruising. From the Swiss city of Basel, you'll glide north through Alsace, the UNESCO Middle Rhine Valley, and the legendary Lorelei Rock before arriving in cosmopolitan Amsterdam. Every meal is included, every excursion is guided, and every evening you're moored in a new medieval town.",
    highlights: [
      "Basel, Switzerland — cosmopolitan gateway city",
      "Breisach & Colmar — the 'Little Venice' of Alsace",
      "Strasbourg — half-French, half-German, entirely magical",
      "Heidelberg — Germany's most romantic university city",
      "Rüdesheim — wine tastings in the Drosselgasse",
      "Cologne — the iconic twin-spired Gothic cathedral",
      "Amsterdam — canals, Rijksmuseum, and Dutch masters",
    ],
    included: [
      "Fine dining — breakfast, lunch, and dinner daily",
      "Unlimited wine, beer & soft drinks with meals",
      "All guided shore excursions",
      "Onboard Wi-Fi",
      "Bicycles for independent exploration",
      "Port taxes and fees",
    ],
    departures: [
      { date: "April 4, 2026", ship: "AmaViola", price: "$4,549" },
      { date: "April 18, 2026", ship: "AmaViola", price: "$5,049" },
      { date: "April 29, 2026", ship: "AmaPrima", price: "$4,349" },
    ],
    bookUrl: "https://www.amawaterways.com/river-cruises/europe/rhine/enchanting-rhine",
    relocationNote: "Strasbourg and Heidelberg are both exceptional relocation candidates — Strasbourg sits on the French-German border with EU institutions, while Heidelberg has one of Germany's top universities.",
    color: "from-blue-950/50 to-blue-900/20",
    accentColor: "text-blue-300",
  },
  {
    id: "iberian",
    icon: MapPin,
    badge: "Shoulder Season Perfection",
    title: "The Iberian Explorer",
    subtitle: "Portugal & Spain · 10–14 Days · Self-Guided",
    price: "From ~$3,500",
    priceNote: "per person, flights + hotels",
    duration: "10–14 days",
    image: LISBON_IMG,
    tagline: "Two countries, one peninsula, infinite possibilities for your next chapter.",
    description: "Late March is the sweet spot for the Iberian Peninsula — mild temperatures, manageable crowds, and spring blooms everywhere. This self-guided journey moves from Portugal's melancholic beauty to Spain's passionate grandeur, connecting by high-speed train and leaving time to linger wherever you feel most at home.",
    highlights: [
      "Lisbon — Alfama district, Belém Tower, Fado music at night",
      "Sintra — fairy-tale palaces in the hills above Lisbon",
      "Porto — Douro Valley wine, Dom Luís I Bridge, Livraria Lello",
      "Seville — Real Alcázar, Flamenco shows, Tapas culture",
      "Madrid — Prado Museum, Royal Palace, El Retiro park",
      "Toledo — medieval walled city, day trip from Madrid",
    ],
    included: [
      "Boutique hotel recommendations in each city",
      "Airbnb alternatives with local character",
      "High-speed train connections (AVE & Alfa Pendular)",
      "Restaurant recommendations from local sources",
      "Day trip logistics and timing",
      "Relocation scouting notes for each city",
    ],
    departures: [
      { date: "Fly into Lisbon (LIS)", ship: "From $1,157 round-trip", price: "KLM via AMS" },
      { date: "Fly out of Madrid (MAD)", ship: "Open-jaw recommended", price: "Saves backtracking" },
    ],
    bookUrl: "https://www.google.com/travel/flights",
    relocationNote: "Portugal's Digital Nomad D8 Visa is tailor-made for Melanie's profile. Lisbon and Porto are the two most popular American expat cities in Europe, with thriving English-speaking communities and costs roughly 40% lower than Paris.",
    color: "from-amber-950/50 to-amber-900/20",
    accentColor: "text-amber-300",
  },
  {
    id: "france",
    icon: Plane,
    badge: "Annie is Waiting in Paris",
    title: "The French Art de Vivre",
    subtitle: "Southern France & Paris · 10–14 Days",
    price: "From ~$3,200",
    priceNote: "per person, flights + hotels",
    duration: "10–14 days",
    image: PARIS_IMG,
    tagline: "Lavender, the Riviera, and a birthday dinner with Annie in Paris.",
    description: "This itinerary begins in the sun-drenched south and ends in the city where Annie and Thomas have made their home. Provence in late March is awakening — the lavender won't bloom until June, but the light is extraordinary, the markets are full, and the crowds haven't arrived yet. The French Riviera is glamorous year-round, and Paris in spring is, simply, Paris in spring.",
    highlights: [
      "Nice — the Promenade des Anglais, Old Town, Cours Saleya market",
      "Cannes — the Croisette, Île Sainte-Marguerite, glamour without the film festival crowds",
      "Aix-en-Provence — Cézanne's city, the Cours Mirabeau, exceptional restaurants",
      "Avignon — the Papal Palace, the famous broken bridge, Rhône Valley wines",
      "Lyon — France's gastronomic capital, UNESCO-listed old town",
      "Paris — Annie & Thomas, the Seine, Montmartre, and a birthday celebration",
    ],
    included: [
      "Hotel and Airbnb recommendations by city",
      "TGV high-speed train connections",
      "Michelin-starred and local restaurant picks",
      "Relocation scouting: Nice, Aix-en-Provence, Lyon",
      "Paris neighborhood guide (where Annie lives matters)",
      "HEC Paris and INSEAD campus visit opportunities",
    ],
    departures: [
      { date: "Fly into Nice (NCE)", ship: "Via Paris CDG or Amsterdam", price: "From ~$1,200" },
      { date: "Fly out of Paris (CDG)", ship: "United from $923 round-trip", price: "Best value" },
    ],
    bookUrl: "https://www.google.com/travel/flights",
    relocationNote: "Nice and Aix-en-Provence rank among the top 5 cities for American expats in France. Both offer excellent quality of life, strong English-speaking communities, and proximity to Annie in Paris (2.5 hours by TGV). The French Tech Visa could be a pathway given Melanie's tech industry background.",
    color: "from-purple-950/50 to-purple-900/20",
    accentColor: "text-purple-300",
  },
];

function PackageCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      className="mb-12"
    >
      <div className={`glass-card rounded-3xl overflow-hidden bg-gradient-to-br ${pkg.color}`}>
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="glass-card-gold px-3 py-1.5 rounded-full font-accent text-xs tracking-widest uppercase text-gold">
              {pkg.badge}
            </span>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="glass-card-gold p-2 rounded-lg">
                <pkg.icon size={18} className="text-gold" />
              </div>
              <span className="font-accent text-xs tracking-[0.15em] uppercase text-gold/80">
                {pkg.subtitle}
              </span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-light text-ivory">
              {pkg.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Price & Duration Row */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="glass-card-gold px-4 py-3 rounded-xl flex-1 min-w-[120px]">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign size={14} className="text-gold" />
                <span className="font-accent text-[0.6rem] tracking-widest uppercase text-gold/70">Price</span>
              </div>
              <div className="font-display text-xl text-ivory">{pkg.price}</div>
              <div className="text-xs text-muted-foreground">{pkg.priceNote}</div>
            </div>
            <div className="glass-card px-4 py-3 rounded-xl flex-1 min-w-[120px]">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={14} className="text-gold" />
                <span className="font-accent text-[0.6rem] tracking-widest uppercase text-gold/70">Duration</span>
              </div>
              <div className="font-display text-xl text-ivory">{pkg.duration}</div>
            </div>
          </div>

          {/* Tagline */}
          <p className="font-display text-lg italic text-gold/80 mb-4">"{pkg.tagline}"</p>

          {/* Description */}
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
            {pkg.description}
          </p>

          {/* Highlights */}
          <div className="mb-6">
            <h4 className="font-accent text-xs tracking-[0.15em] uppercase text-gold/70 mb-3">
              Destination Highlights
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {pkg.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2">
                  <Check size={14} className="text-gold mt-0.5 flex-shrink-0" />
                  <span className="font-body text-sm text-ivory/80">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expandable Details */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-gold/70 hover:text-gold transition-colors mb-4 font-body text-sm"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {expanded ? "Show less" : "Show departures, inclusions & relocation notes"}
          </button>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-6"
            >
              {/* What's Included */}
              <div>
                <h4 className="font-accent text-xs tracking-[0.15em] uppercase text-gold/70 mb-3">
                  What's Included
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {pkg.included.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <Check size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="font-body text-sm text-ivory/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Departures */}
              <div>
                <h4 className="font-accent text-xs tracking-[0.15em] uppercase text-gold/70 mb-3">
                  {pkg.id === "rhine" ? "Available Departures" : "Flight Strategy"}
                </h4>
                <div className="space-y-2">
                  {pkg.departures.map((dep) => (
                    <div key={dep.date} className="glass-card rounded-xl p-3 flex items-center justify-between">
                      <div>
                        <div className="font-body text-sm text-ivory">{dep.date}</div>
                        <div className="font-body text-xs text-muted-foreground">{dep.ship}</div>
                      </div>
                      <div className="font-display text-lg text-gold">{dep.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relocation Note */}
              <div className="glass-card-gold rounded-xl p-4">
                <h4 className="font-accent text-xs tracking-[0.15em] uppercase text-gold mb-2">
                  Relocation Scout's Note
                </h4>
                <p className="font-body text-sm text-ivory/80 leading-relaxed">
                  {pkg.relocationNote}
                </p>
              </div>
            </motion.div>
          )}

          {/* Book Button */}
          <div className="mt-6 pt-6 border-t border-white/8">
            <a
              href={pkg.bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-navy font-body font-medium px-5 py-2.5 rounded-full hover:bg-gold-light transition-all duration-300 text-sm"
            >
              {pkg.id === "rhine" ? "View on AmaWaterways" : "Search Flights on Google"}
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Itineraries() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Page Hero */}
      <section className="pt-32 pb-16">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-accent text-xs tracking-[0.2em] uppercase text-gold block mb-4">
              Three Ways to Celebrate
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-light text-ivory mb-6">
              Your <span className="text-gold italic">Itineraries</span>
            </h1>
            <div className="gold-divider mx-auto mb-6" />
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Three distinct packages, each designed around a different travel philosophy — from the pampered ease of a river cruise to the freedom of self-guided exploration. All researched for late March and early April 2026, all built around Melanie's birthday.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Package Cards */}
      <section className="pb-20">
        <div className="container max-w-4xl">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 border-t border-white/8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl md:text-4xl font-light text-ivory">
              Quick <span className="text-gold italic">Comparison</span>
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full glass-card rounded-2xl overflow-hidden">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left p-4 font-accent text-xs tracking-widest uppercase text-gold/70">Package</th>
                  <th className="text-left p-4 font-accent text-xs tracking-widest uppercase text-gold/70">Duration</th>
                  <th className="text-left p-4 font-accent text-xs tracking-widest uppercase text-gold/70">Price</th>
                  <th className="text-left p-4 font-accent text-xs tracking-widest uppercase text-gold/70">Style</th>
                  <th className="text-left p-4 font-accent text-xs tracking-widest uppercase text-gold/70">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Rhine River Cruise", dur: "7–8 nights", price: "$4,349+", style: "All-inclusive luxury", best: "Relaxation & romance" },
                  { name: "Iberian Explorer", dur: "10–14 days", price: "~$3,500", style: "Self-guided boutique", best: "Relocation scouting" },
                  { name: "French Art de Vivre", dur: "10–14 days", price: "~$3,200", style: "Cultural immersion", best: "Annie reunion + schools" },
                ].map((row, i) => (
                  <tr key={row.name} className={i < 2 ? "border-b border-white/5" : ""}>
                    <td className="p-4 font-display text-ivory">{row.name}</td>
                    <td className="p-4 font-body text-sm text-muted-foreground">{row.dur}</td>
                    <td className="p-4 font-display text-gold">{row.price}</td>
                    <td className="p-4 font-body text-sm text-muted-foreground">{row.style}</td>
                    <td className="p-4 font-body text-sm text-muted-foreground">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
