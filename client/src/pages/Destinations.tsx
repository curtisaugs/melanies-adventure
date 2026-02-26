/* 
  Design: The Modern European — Refined Glass & Gold
  Destinations: City-by-city guide with attractions, food, hotels, and relocation notes
*/
import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Utensils, Building, Star, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const LISBON_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/118915275/BnQZZBGqisAUUcjJ.png";
const BARCELONA_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/118915275/zwPmeRfcAHjErEva.png";
const PARIS_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/118915275/oQGgonXVfWJSKIGn.png";

const cities = [
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    image: LISBON_IMG,
    tagline: "Europe's sunniest capital, where the Atlantic meets ancient hills",
    reloScore: 5,
    costOfLiving: "€€",
    climate: "Mild, 17°C avg in March",
    english: "Excellent",
    attractions: [
      { name: "Belém Tower & Jerónimos Monastery", desc: "UNESCO World Heritage, 16th-century Manueline architecture" },
      { name: "Alfama District", desc: "Lisbon's oldest neighborhood, Moorish roots, Fado music at night" },
      { name: "LX Factory", desc: "Industrial creative hub — markets, restaurants, bookshops" },
      { name: "Sintra Day Trip", desc: "Fairy-tale palaces 40 minutes by train, UNESCO-listed" },
      { name: "Time Out Market", desc: "The original food hall concept, 35 of Lisbon's best chefs" },
    ],
    food: "Pastéis de nata (custard tarts), Bacalhau (salt cod), Francesinha (Porto specialty), Ginjinha (cherry liqueur), Petiscos (Portuguese tapas). Budget: €25–60/day for excellent meals.",
    hotels: [
      { name: "Bairro Alto Hotel", stars: 5, area: "Bairro Alto", price: "€350–550/night" },
      { name: "Hotel da Baixa", stars: 4, area: "Baixa-Chiado", price: "€150–250/night" },
      { name: "Airbnb — Alfama Apartment", stars: 0, area: "Alfama", price: "€80–150/night" },
    ],
    reloNote: "Lisbon is the #1 destination for American expats in Europe. The D8 Digital Nomad Visa is straightforward for high earners. Monthly costs for a comfortable life: €2,500–4,000. The Príncipe Real and Chiado neighborhoods are particularly popular with international professionals.",
    visa: "Portugal D8 Digital Nomad Visa",
    color: "from-amber-950/40 to-orange-900/20",
    accent: "text-amber-300",
    tabActive: "bg-amber-400 text-navy",
    iconColor: "text-amber-300",
    statColor: "text-amber-300/60",
    reloCardClass: "glass-card rounded-xl p-4 border border-amber-400/20 bg-amber-950/30",
    hotelPriceColor: "text-amber-300",
  },
  {
    id: "porto",
    name: "Porto",
    country: "Portugal",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=80",
    tagline: "Gritty, gorgeous, and utterly authentic — Portugal's second city",
    reloScore: 4,
    costOfLiving: "€",
    climate: "Mild, 14°C avg in March",
    english: "Good",
    attractions: [
      { name: "Dom Luís I Bridge", desc: "Iconic iron bridge with panoramic views of the Douro" },
      { name: "Port Wine Caves (Vila Nova de Gaia)", desc: "Taylor's, Graham's, Sandeman — tastings and tours" },
      { name: "Livraria Lello", desc: "One of the world's most beautiful bookshops" },
      { name: "Douro Valley Day Trip", desc: "UNESCO wine region, quintas, and breathtaking scenery" },
      { name: "Serralves Museum", desc: "Contemporary art in a stunning Art Deco mansion and gardens" },
    ],
    food: "Francesinha (the iconic Porto sandwich), Bacalhau à Brás, Tripas à moda do Porto, Pastel de Nata, Vinho Verde. Budget: €20–45/day for excellent meals.",
    hotels: [
      { name: "The Yeatman", stars: 5, area: "Vila Nova de Gaia", price: "€300–500/night" },
      { name: "Torel Avantgarde", stars: 5, area: "Bonfim", price: "€200–350/night" },
      { name: "Airbnb — Ribeira Apartment", stars: 0, area: "Ribeira", price: "€60–120/night" },
    ],
    reloNote: "Porto is increasingly popular with remote workers and offers the same D8 Visa access as Lisbon at 20–30% lower cost. The Bonfim and Cedofeita neighborhoods are vibrant and walkable. Monthly comfortable living: €2,000–3,200.",
    visa: "Portugal D8 Digital Nomad Visa",
    color: "from-orange-950/40 to-red-900/20",
    accent: "text-orange-300",
    tabActive: "bg-orange-400 text-navy",
    iconColor: "text-orange-300",
    statColor: "text-orange-300/60",
    reloCardClass: "glass-card rounded-xl p-4 border border-orange-400/20 bg-orange-950/30",
    hotelPriceColor: "text-orange-300",
  },
  {
    id: "seville",
    name: "Seville",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&q=80",
    tagline: "Flamenco, orange blossoms, and the most beautiful old town in Spain",
    reloScore: 4,
    costOfLiving: "€€",
    climate: "Warm, 18°C avg in March",
    english: "Moderate",
    attractions: [
      { name: "Real Alcázar", desc: "Stunning Mudéjar palace — used as Dorne in Game of Thrones" },
      { name: "Seville Cathedral & La Giralda", desc: "World's largest Gothic cathedral; climb the tower for panoramic views" },
      { name: "Plaza de España", desc: "Magnificent semicircular plaza from the 1929 Ibero-American Exposition" },
      { name: "Santa Cruz Neighborhood", desc: "Former Jewish quarter, labyrinthine lanes, orange trees everywhere" },
      { name: "Flamenco Shows", desc: "Authentic tablao performances — Casa de la Memoria is exceptional" },
    ],
    food: "Salmorejo (cold tomato soup), Jamón ibérico, Croquetas, Patatas bravas, Pescaíto frito. Tapas culture is strongest here — many bars give free tapas with drinks. Budget: €20–50/day.",
    hotels: [
      { name: "Hotel Alfonso XIII", stars: 5, area: "Centro", price: "€300–600/night" },
      { name: "Hotel Murillo", stars: 3, area: "Santa Cruz", price: "€80–150/night" },
      { name: "Airbnb — Santa Cruz Apartment", stars: 0, area: "Santa Cruz", price: "€70–130/night" },
    ],
    reloNote: "Seville is one of Spain's most livable cities — warm, walkable, and culturally rich. The Non-Lucrative Visa is the primary pathway for Americans. Monthly comfortable living: €2,200–3,500. The Triana neighborhood across the Guadalquivir is beloved by expats.",
    visa: "Spain Non-Lucrative Visa",
    color: "from-red-950/40 to-orange-900/20",
    accent: "text-coral",
    tabActive: "bg-coral text-navy",
    iconColor: "text-coral",
    statColor: "text-coral/60",
    reloCardClass: "glass-card rounded-xl p-4 border border-coral/20 bg-red-950/30",
    hotelPriceColor: "text-coral",
  },
  {
    id: "madrid",
    name: "Madrid",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&q=80",
    tagline: "The world's greatest art museums and a nightlife that never sleeps",
    reloScore: 4,
    costOfLiving: "€€€",
    climate: "Cool, 12°C avg in March",
    english: "Good",
    attractions: [
      { name: "Museo del Prado", desc: "Velázquez, Goya, El Greco — one of the world's top art museums" },
      { name: "Reina Sofía Museum", desc: "Picasso's Guernica, Dalí, Miró — 20th-century Spanish masters" },
      { name: "Royal Palace of Madrid", desc: "Europe's largest royal palace, still used for state ceremonies" },
      { name: "El Retiro Park", desc: "The city's green lung — rowing boats, Crystal Palace, Sunday markets" },
      { name: "Mercado de San Miguel", desc: "Elegant iron-and-glass market with gourmet tapas and wine" },
    ],
    food: "Bocadillo de calamares (calamari sandwich), Cocido madrileño (chickpea stew), Churros con chocolate, Jamón ibérico, Patatas bravas. Budget: €25–60/day.",
    hotels: [
      { name: "Rosewood Villa Magna", stars: 5, area: "Paseo de la Castellana", price: "€400–800/night" },
      { name: "Catalonia Plaza España", stars: 4, area: "Plaza España", price: "€150–280/night" },
      { name: "Airbnb — Malasaña Apartment", stars: 0, area: "Malasaña", price: "€80–160/night" },
    ],
    reloNote: "Madrid is Spain's business capital and offers the most international job market. IE Business School is here, making it ideal for graduate study. Monthly comfortable living: €2,800–4,500. The Chamberí and Malasaña neighborhoods are popular with expats.",
    visa: "Spain Non-Lucrative Visa",
    color: "from-red-950/40 to-rose-900/20",
    accent: "text-rose-300",
    tabActive: "bg-rose-400 text-navy",
    iconColor: "text-rose-300",
    statColor: "text-rose-300/60",
    reloCardClass: "glass-card rounded-xl p-4 border border-rose-400/20 bg-rose-950/30",
    hotelPriceColor: "text-rose-300",
  },
  {
    id: "nice",
    name: "Nice",
    country: "France",
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1200&q=80",
    tagline: "The French Riviera capital — glamour, warmth, and Italian soul",
    reloScore: 4,
    costOfLiving: "€€€",
    climate: "Mild, 14°C avg in March",
    english: "Moderate",
    attractions: [
      { name: "Promenade des Anglais", desc: "The iconic 7km seafront boulevard — perfect for morning walks" },
      { name: "Vieux-Nice (Old Town)", desc: "Baroque churches, Cours Saleya market, Italian-influenced architecture" },
      { name: "Musée Matisse", desc: "Henri Matisse lived and worked in Nice — his largest collection" },
      { name: "Castle Hill (Colline du Château)", desc: "Free panoramic views over the Baie des Anges" },
      { name: "Day Trip to Monaco", desc: "25 minutes by train — the Casino, the Prince's Palace, the harbor" },
    ],
    food: "Socca (chickpea pancake), Salade Niçoise (the original), Pan Bagnat, Pissaladière (onion tart), Ratatouille. Budget: €35–80/day.",
    hotels: [
      { name: "Hôtel Negresco", stars: 5, area: "Promenade des Anglais", price: "€350–700/night" },
      { name: "Hôtel Windsor", stars: 3, area: "City Center", price: "€120–200/night" },
      { name: "Airbnb — Vieux-Nice Apartment", stars: 0, area: "Old Town", price: "€90–180/night" },
    ],
    reloNote: "Nice has the largest English-speaking expat community on the French Riviera. The French Tech Visa or a Long-Stay Visa are the primary pathways. Monthly comfortable living: €3,000–5,000. The Cimiez neighborhood (where Matisse lived) is elegant and quieter than the seafront.",
    visa: "French Long-Stay Visa / French Tech Visa",
    color: "from-blue-950/40 to-cyan-900/20",
    accent: "text-cyan-300",
    tabActive: "bg-cyan-400 text-navy",
    iconColor: "text-cyan-300",
    statColor: "text-cyan-300/60",
    reloCardClass: "glass-card rounded-xl p-4 border border-cyan-400/20 bg-cyan-950/30",
    hotelPriceColor: "text-cyan-300",
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    image: PARIS_IMG,
    tagline: "Where Annie lives — and where every birthday deserves to be celebrated",
    reloScore: 5,
    costOfLiving: "€€€€",
    climate: "Cool, 10°C avg in March",
    english: "Good",
    attractions: [
      { name: "Annie & Thomas's Paris", desc: "The real reason to visit — explore the city through local eyes" },
      { name: "Montmartre", desc: "The artist's village on the hill — Sacré-Cœur, Place du Tertre, Moulin Rouge" },
      { name: "Le Marais", desc: "Trendy, historic, Jewish quarter — galleries, boutiques, falafel" },
      { name: "Musée d'Orsay", desc: "Impressionism's greatest collection in a stunning Beaux-Arts train station" },
      { name: "Saint-Germain-des-Prés", desc: "Literary cafés, Café de Flore, Brasserie Lipp, bookshops" },
    ],
    food: "Croissants (the real ones), Steak frites, Croque monsieur, Soupe à l'oignon, Crème brûlée. Budget: €40–100/day (Paris is expensive but worth it).",
    hotels: [
      { name: "Hôtel Plaza Athénée", stars: 5, area: "8th Arrondissement", price: "€800–2,000/night" },
      { name: "Hôtel des Grands Boulevards", stars: 4, area: "2nd Arrondissement", price: "€200–400/night" },
      { name: "Stay with Annie & Thomas", stars: 0, area: "Annie's neighborhood", price: "Priceless" },
    ],
    reloNote: "Paris is where Annie is — which changes the calculus entirely. The French Long-Stay Visa is the first step. Monthly comfortable living in Paris: €4,000–7,000 (expensive but manageable on a CRO salary). HEC Paris and INSEAD (Fontainebleau, 45 min from Paris) are both within reach for graduate study.",
    visa: "French Long-Stay Visa / French Tech Visa",
    color: "from-purple-950/40 to-pink-900/20",
    accent: "text-lavender",
    tabActive: "bg-lavender text-navy",
    iconColor: "text-lavender",
    statColor: "text-lavender/60",
    reloCardClass: "glass-card rounded-xl p-4 border border-lavender/20 bg-purple-950/30",
    hotelPriceColor: "text-lavender",
  },
];

function CityCard({ city, index }: { city: typeof cities[0]; index: number }) {
  const [tab, setTab] = useState<"attractions" | "food" | "hotels" | "relo">("attractions");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7 }}
      className={`glass-card rounded-3xl overflow-hidden bg-gradient-to-br ${city.color} mb-8`}
    >
      {/* Image Header */}
      <div className="relative h-56 overflow-hidden">
        <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-accent text-xs tracking-[0.15em] uppercase ${city.accent} opacity-80`}>{city.country}</p>
              <h3 className="font-display text-3xl font-light text-ivory">{city.name}</h3>
              <p className="font-body text-sm text-ivory/60 italic mt-1">{city.tagline}</p>
            </div>
            <div className="text-right">
              <div className="flex gap-0.5 justify-end mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className={i < city.reloScore ? "text-gold fill-gold" : "text-white/20"} />
                ))}
              </div>
              <p className={`font-accent text-[0.6rem] tracking-widest uppercase ${city.accent} opacity-60`}>Relo Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-4 border-b border-white/8 flex flex-wrap gap-4">
        {[
          { label: "Cost of Living", value: city.costOfLiving },
          { label: "March Climate", value: city.climate },
          { label: "English", value: city.english },
          { label: "Visa Path", value: city.visa },
        ].map((stat) => (
          <div key={stat.label} className="flex-1 min-w-[120px]">
            <p className={`font-accent text-[0.6rem] tracking-widest uppercase ${city.statColor} mb-0.5`}>{stat.label}</p>
            <p className="font-body text-xs text-ivory/80">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-6 pt-4">
        <div className="flex gap-1 mb-4 flex-wrap">
          {(["attractions", "food", "hotels", "relo"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-full font-accent text-[0.65rem] tracking-widest uppercase transition-all ${
                tab === t
                  ? city.tabActive
                  : "glass-card text-muted-foreground hover:text-ivory"
              }`}
            >
              {t === "relo" ? "Relocation" : t === "food" ? "Food & Drink" : t === "hotels" ? "Stay" : "See & Do"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="pb-6">
          {tab === "attractions" && (
            <div className="space-y-3">
              {city.attractions.map((a) => (
                <div key={a.name} className="flex items-start gap-3">
                  <MapPin size={14} className={`${city.iconColor} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="font-body text-sm text-ivory font-medium">{a.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "food" && (
            <div className="flex items-start gap-3">
              <Utensils size={14} className={`${city.iconColor} mt-0.5 flex-shrink-0`} />
              <p className="font-body text-sm text-ivory/80 leading-relaxed">{city.food}</p>
            </div>
          )}

          {tab === "hotels" && (
            <div className="space-y-3">
              {city.hotels.map((h) => (
                <div key={h.name} className="glass-card rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Building size={12} className={city.iconColor} />
                      <p className="font-body text-sm text-ivory">{h.name}</p>
                    </div>
                    <p className="font-body text-xs text-muted-foreground ml-5">{h.area} {h.stars > 0 ? `· ${h.stars}★` : ""}</p>
                  </div>
                  <p className={`font-display text-sm ${city.hotelPriceColor}`}>{h.price}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "relo" && (
            <div className={city.reloCardClass}>
              <p className="font-body text-sm text-ivory/80 leading-relaxed">{city.reloNote}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Destinations() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-accent text-xs tracking-[0.2em] uppercase text-coral block mb-4">Six Cities, One Journey</span>
            <h1 className="font-display text-5xl md:text-7xl font-light text-ivory mb-6">
              Your <span className="text-coral italic">Destinations</span>
            </h1>
            <div className="mx-auto mb-6 w-16 h-px bg-gradient-to-r from-transparent via-coral to-transparent" />
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Each city has been researched not just as a tourist destination, but as a potential home. Explore the attractions, taste the food, find the right hotel — and read the relocation notes that matter most.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            {cities.map((city, i) => (
              <CityCard key={city.id} city={city} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
