import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Utensils, Home, TrendingUp } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

type Tab = "highlights" | "food" | "stay" | "relo";

interface City {
  id: string;
  country: string;
  flag: string;
  name: string;
  tagline: string;
  image: string;
  region: string;
  costIndex: string;
  highlights: string[];
  food: string[];
  stay: string[];
  relo: string[];
}

const cities: City[] = [
  {
    id: "lisbon", country: "Portugal", flag: "🇵🇹", name: "Lisbon", tagline: "Sun-drenched hills, azulejo tiles, and Europe's most livable capital",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    region: "Iberian Peninsula", costIndex: "$$",
    highlights: ["Alfama district & São Jorge Castle", "Belém Tower & Jerónimos Monastery", "LX Factory creative market", "Sintra day trip (UNESCO palaces)", "Tram 28 through historic neighborhoods", "Time Out Market food hall"],
    food: ["Pastéis de nata at Pastéis de Belém", "Bacalhau (salt cod) 1,001 ways", "Bifanas at Cervejaria Ramiro", "Ginjinha cherry liqueur in Rossio", "Wine tasting in Setúbal Peninsula", "Taberna da Rua das Flores for petiscos"],
    stay: ["Bairro Alto Hotel (5★ design hotel, from €350)", "The Lumiares (boutique, Bairro Alto, from €200)", "Palácio Belmonte (historic palace, from €450)", "Airbnb in Príncipe Real: 2BR from €120/night"],
    relo: ["Portugal D8 Digital Nomad Visa: earn 4× minimum wage (~€3,040/mo)", "NHR tax regime: 10% flat tax on foreign income for 10 years", "Average 2BR apartment: €1,800–2,500/mo in Príncipe Real", "English widely spoken; large expat community", "PropTech scene: Uniplaces, Casafari, Loft headquartered here"],
  },
  {
    id: "porto", country: "Portugal", flag: "🇵🇹", name: "Porto", tagline: "Port wine, baroque churches, and Europe's most charming riverside city",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
    region: "Iberian Peninsula", costIndex: "$",
    highlights: ["Ribeira waterfront (UNESCO)", "Livraria Lello — world's most beautiful bookshop", "Douro Valley wine cruise", "Palácio da Bolsa & São Bento station", "Foz do Douro beach neighborhood", "Serralves Contemporary Art Museum"],
    food: ["Francesinha sandwich (Porto's iconic dish)", "Port wine tasting at Graham's or Taylor's", "Tripas à moda do Porto (tripe stew — adventurous!)", "Bacalhau com natas at Adega São Nicolau", "Pastel de feijão at Confeitaria do Bolhão", "Seafood at Matosinhos fish market"],
    stay: ["The Yeatman (wine hotel, river views, from €300)", "Torel Avantgarde (boutique, from €180)", "Airbnb in Bonfim or Cedofeita: 2BR from €80/night"],
    relo: ["20% cheaper than Lisbon for equivalent quality of life", "Growing startup scene: Farfetch founded here", "Average 2BR: €1,200–1,800/mo", "Porto Business School: EMBA programs available", "High-speed train to Lisbon: 2h45min"],
  },
  {
    id: "seville", country: "Spain", flag: "🇪🇸", name: "Seville", tagline: "Flamenco, orange blossoms, and the soul of Andalusia",
    image: "https://images.unsplash.com/photo-1559564484-a9b4b8f0a0d0?w=800&q=80",
    region: "Iberian Peninsula", costIndex: "$",
    highlights: ["Real Alcázar (Game of Thrones filming location)", "Seville Cathedral & La Giralda tower", "Barrio de Santa Cruz (Jewish quarter)", "Flamenco show at Casa de la Memoria", "Triana neighborhood tapas crawl", "Plaza de España at golden hour"],
    food: ["Tapas at El Rinconcillo (Spain's oldest bar, 1670)", "Jamón ibérico de bellota at Bodega Santa Cruz", "Pescaíto frito (fried fish) in Triana", "Salmorejo (Córdoba-style gazpacho)", "Manzanilla sherry from Sanlúcar", "Churros con chocolate at Bar El Comercio"],
    stay: ["Hotel Alfonso XIII (grand historic, from €400)", "EME Catedral Hotel (cathedral views, from €200)", "Airbnb in Alameda de Hércules: 2BR from €70/night"],
    relo: ["Spain Non-Lucrative Visa: €27,115 annual passive income required", "One of Spain's most affordable major cities", "Average 2BR: €900–1,400/mo", "IE University has a Seville campus", "High-speed AVE train to Madrid: 2h30min"],
  },
  {
    id: "madrid", country: "Spain", flag: "🇪🇸", name: "Madrid", tagline: "World-class art, late nights, and Europe's most energetic capital",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
    region: "Iberian Peninsula", costIndex: "$$",
    highlights: ["Prado Museum (Velázquez, Goya, El Greco)", "Reina Sofía (Picasso's Guernica)", "Retiro Park & Crystal Palace", "Gran Vía architecture & shopping", "El Rastro Sunday flea market", "Barrio de las Letras literary quarter"],
    food: ["Cocido madrileño (chickpea stew) at La Bola", "Bocadillo de calamares at Plaza Mayor", "Tapas at Mercado de San Miguel", "Vermouth hour in Malasaña", "Suckling pig at Sobrino de Botín (world's oldest restaurant)", "Churros at San Ginés at 3am"],
    stay: ["Hotel Ritz by Belmond (iconic, from €500)", "Only YOU Boutique Hotel (design, from €200)", "Airbnb in Malasaña or Chueca: 2BR from €100/night"],
    relo: ["IE Business School: #1 EMBA in Spain, global ranking top 10", "Spain's startup visa: €1M investment or innovative project", "Average 2BR: €1,400–2,200/mo in central neighborhoods", "PropTech: Idealista, Housfy, Spotahome all based here", "Direct flights to LAX: ~11 hours"],
  },
  {
    id: "nice", country: "France", flag: "🇫🇷", name: "Nice", tagline: "The Côte d'Azur's crown jewel — Mediterranean glamour meets Provençal soul",
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80",
    region: "Southern France", costIndex: "$$$",
    highlights: ["Promenade des Anglais at sunrise", "Cours Saleya flower & food market", "Vieux-Nice (Old Town) labyrinth", "Monaco day trip (30 min by train)", "Eze village perched above the sea", "MAMAC contemporary art museum"],
    food: ["Socca (chickpea pancake) at Chez René Socca", "Salade niçoise at La Merenda", "Pissaladière (onion & anchovy tart)", "Bouillabaisse in Antibes", "Rosé from Provence vineyards", "Pan bagnat (Nice's iconic sandwich)"],
    stay: ["Hôtel Negresco (legendary Belle Époque, from €350)", "Le Grimaldi (boutique, from €180)", "Airbnb in Cimiez or Carré d'Or: 2BR from €120/night"],
    relo: ["French Tech Visa (Passeport Talent): for senior executives & investors", "Nice has Europe's 2nd largest tech cluster after Paris (Sophia Antipolis nearby)", "Average 2BR: €1,500–2,500/mo", "EDHEC Business School campus in Nice", "Train to Paris: 5h30min by TGV"],
  },
  {
    id: "paris", country: "France", flag: "🇫🇷", name: "Paris", tagline: "Annie & Thomas are already here — and the city of light never disappoints",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/118915275/AUalUDGvKUnmAKsA.png",
    region: "Northern France", costIndex: "$$$",
    highlights: ["Annie & Thomas's neighborhood exploration", "Musée d'Orsay & the Louvre", "Le Marais — galleries, falafel, fashion", "Montmartre & Sacré-Cœur at dawn", "INSEAD & HEC Paris campus visits (30 min by RER)", "Canal Saint-Martin Sunday stroll"],
    food: ["Croissants at Du Pain et des Idées", "Steak frites at Le Relais de l'Entrecôte", "Natural wine at Septime Cave", "Cheese tasting at Fromagerie Laurent Dubois", "Brasserie classics at Bofinger", "Dinner at Annie & Thomas's favorite local"],
    stay: ["Hôtel de Crillon (palace hotel, from €900)", "Hôtel du Petit Moulin (Marais boutique, from €250)", "Airbnb near Annie in the 11th: 2BR from €130/night"],
    relo: ["France's Passeport Talent visa: 4-year renewable, family included", "Paris has Europe's largest PropTech ecosystem", "Average 2BR: €2,200–3,500/mo in central arrondissements", "INSEAD (Fontainebleau, 45 min) & HEC Paris (30 min by RER B)", "Annie & Thomas are already here — built-in social network"],
  },
  // ITALY
  {
    id: "florence", country: "Italy", flag: "🇮🇹", name: "Florence", tagline: "The cradle of the Renaissance — art, architecture, and the world's best bistecca",
    image: "https://images.unsplash.com/photo-1541370976299-4d24be63e9d3?w=800&q=80",
    region: "Italy", costIndex: "$$",
    highlights: ["Uffizi Gallery (Botticelli's Birth of Venus)", "Duomo & Brunelleschi's dome climb", "Ponte Vecchio at golden hour", "Oltrarno artisan quarter", "Chianti wine country day trip", "Piazzale Michelangelo panoramic view"],
    food: ["Bistecca alla Fiorentina at Buca Mario", "Lampredotto (tripe sandwich) at Nerbone in Mercato Centrale", "Gelato at Gelateria dei Neri", "Ribollita (Tuscan bread soup) at Trattoria Mario", "Chianti Classico wine tasting in Greve", "Truffle dishes at Buca dell'Orafo"],
    stay: ["Portrait Firenze (5★ Lungarno, from €600)", "AdAstra (boutique Oltrarno, from €200)", "Airbnb in Oltrarno or San Frediano: 2BR from €100/night"],
    relo: ["Italy's Flat Tax Regime: €100,000/year flat tax on all foreign income", "Italy's Digital Nomad Visa: launched 2024, requires €28,000 annual income", "Average 2BR in Florence: €1,200–1,800/mo", "SDA Bocconi School of Management: top Italian business school (Milan campus)", "Florence has a thriving expat community; English widely spoken in professional circles"],
  },
  {
    id: "amalfi", country: "Italy", flag: "🇮🇹", name: "Amalfi Coast & Naples", tagline: "Cliffside villages, cerulean seas, and the birthplace of pizza",
    image: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=800&q=80",
    region: "Italy", costIndex: "$$$",
    highlights: ["Positano — the most photographed village in Italy", "Ravello — hilltop gardens above the clouds", "Amalfi town & its 9th-century cathedral", "Naples: Spaccanapoli, Cappella Sansevero, underground city", "Pompeii & Vesuvius day trip from Naples", "Boat trip to Capri & the Blue Grotto"],
    food: ["Pizza Margherita at L'Antica Pizzeria da Michele (Naples)", "Sfogliatella pastry at Pasticceria Attanasio", "Limoncello from Sorrento lemons", "Fresh mozzarella di bufala in Paestum", "Grilled fish at Lo Scoglio (Positano)", "Neapolitan ragù at Trattoria da Nennella"],
    stay: ["Le Sirenuse (Positano icon, from €700)", "Hotel Santa Caterina (Amalfi, from €400)", "Airbnb in Praiano (quieter, cheaper than Positano): 2BR from €150/night"],
    relo: ["⚠️ Note from Margaux: Positano is NOT an afternoon drive from Bergamo. The Amalfi Coast road is one of Europe's most dramatic — and slowest. Plan 3+ hours from Naples.", "Naples is one of Italy's most affordable major cities: 2BR from €700/mo", "Southern Italy's 7% flat tax: relocate to a town under 20,000 people, pay 7% on all foreign income", "Best as a holiday base rather than primary relocation target"],
  },
  // GREECE
  {
    id: "athens", country: "Greece", flag: "🇬🇷", name: "Athens", tagline: "The cradle of democracy — ancient wonders, vibrant neighborhoods, and incredible food",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80",
    region: "Greece", costIndex: "$",
    highlights: ["Acropolis & Parthenon at sunrise (beat the crowds)", "Acropolis Museum — world-class ancient artifacts", "Monastiraki flea market & Plaka neighborhood", "Syntagma Square & Changing of the Guard", "Koukaki & Exarchia neighborhoods for local life", "Cape Sounion & Temple of Poseidon day trip"],
    food: ["Souvlaki at Kostas in Monastiraki", "Spanakopita & tiropita at any neighborhood bakery", "Mezedes at Diporto Agoras (hidden basement taverna)", "Fresh seafood at Mikrolimano harbor (Piraeus)", "Greek coffee & loukoumades at Krinos", "Wine tasting: Assyrtiko from Santorini, Xinomavro from Naoussa"],
    stay: ["Hotel Grande Bretagne (grand dame, from €400)", "New Hotel (design hotel, from €180)", "Airbnb in Koukaki or Pangrati: 2BR from €70/night"],
    relo: ["Greece's Digital Nomad Visa: €3,500/mo income required, 50% tax discount for 7 years", "Greece's Golden Visa: €250,000 real estate investment (PropTech opportunity)", "Average 2BR in Athens: €800–1,400/mo — one of Europe's most affordable capitals", "Athens University of Economics and Business: EMBA programs available", "Direct flights from LAX via London or Frankfurt: ~13 hours total"],
  },
  {
    id: "santorini", country: "Greece", flag: "🇬🇷", name: "Santorini & Thessaloniki", tagline: "Volcanic caldera views and Greece's most underrated city",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    region: "Greece", costIndex: "$$–$$$",
    highlights: ["Oia sunset — the most photographed moment in Greece", "Caldera boat tour & hot springs", "Akrotiri archaeological site (Minoan Pompeii)", "Black sand beaches at Perissa & Perivolos", "Thessaloniki: Byzantine walls, White Tower, Ano Poli", "Thessaloniki food scene — Greece's unofficial food capital"],
    food: ["Fava (yellow split pea purée) at Selene (Santorini)", "Tomatokeftedes (tomato fritters) at Metaxy Mas", "Assyrtiko wine at Santo Wines (caldera views)", "Thessaloniki: Bougatsa (cream-filled pastry) at Bantis", "Thessaloniki: Grilled octopus at Myrsini", "Thessaloniki: Trigona Panoramatos (honey-cream pastry)"],
    stay: ["Canaves Oia Suites (infinity pool, from €600)", "Mystique (cave hotel, from €500)", "Thessaloniki: Electra Palace (from €180)", "Airbnb in Santorini's Firostefani: 2BR from €200/night"],
    relo: ["Santorini: Best as a holiday destination rather than primary relocation", "Thessaloniki: Greece's second city, much more affordable than Athens", "Thessaloniki 2BR: €600–1,000/mo", "Aristotle University of Thessaloniki: largest university in Greece", "Thessaloniki is 1h flight from Athens, 3h from Istanbul — strategic location"],
  },
];

const regionColors: Record<string, string> = {
  "Iberian Peninsula": "rgba(220,160,80,0.15)",
  "Southern France": "rgba(160,100,200,0.15)",
  "Northern France": "rgba(160,100,200,0.15)",
  "Italy": "rgba(200,80,80,0.15)",
  "Greece": "rgba(80,140,200,0.15)",
};

const regionBorders: Record<string, string> = {
  "Iberian Peninsula": "rgba(220,160,80,0.25)",
  "Southern France": "rgba(160,100,200,0.25)",
  "Northern France": "rgba(160,100,200,0.25)",
  "Italy": "rgba(200,80,80,0.25)",
  "Greece": "rgba(80,140,200,0.25)",
};

const tabIcons = { highlights: MapPin, food: Utensils, stay: Home, relo: TrendingUp };
const tabLabels = { highlights: "Highlights", food: "Food & Drink", stay: "Where to Stay", relo: "Relocation Notes" };

export default function Destinations() {
  const [activeCity, setActiveCity] = useState<string>("lisbon");
  const [activeTab, setActiveTab] = useState<Tab>("highlights");
  const [filterRegion, setFilterRegion] = useState<string>("all");

  const regions = ["all", "Iberian Peninsula", "Southern France", "Northern France", "Italy", "Greece"];
  const filteredCities = filterRegion === "all" ? cities : cities.filter(c => c.region === filterRegion);
  const selectedCity = cities.find(c => c.id === activeCity) || cities[0];

  return (
    <div className="min-h-screen bg-navy text-ivory">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>
              Ten Cities, Five Countries
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-light text-ivory mt-3 mb-6">
              Your <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Destinations</span>
            </h1>
            <p className="font-body text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--muted)" }}>
              From Lisbon's sun-drenched hills to Athens's ancient wonders, from Florence's Renaissance masterpieces to Santorini's volcanic caldera — ten cities, each a potential chapter in your next adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Region Filter */}
      <section className="pb-8">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-3">
            {regions.map((r) => (
              <button key={r} onClick={() => setFilterRegion(r)}
                className="font-accent text-xs tracking-widest uppercase px-4 py-2 rounded-full transition-all"
                style={{
                  background: filterRegion === r ? "var(--gold)" : "rgba(255,255,255,0.04)",
                  color: filterRegion === r ? "var(--navy)" : "rgba(240,235,220,0.6)",
                  border: `1px solid ${filterRegion === r ? "var(--gold)" : "rgba(255,255,255,0.08)"}`,
                }}>
                {r === "all" ? "All Destinations" : r}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* City Grid */}
      <section className="pb-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredCities.map((city) => (
              <motion.button key={city.id} onClick={() => setActiveCity(city.id)}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer text-left"
                style={{
                  border: activeCity === city.id ? "2px solid var(--gold)" : "1px solid rgba(255,255,255,0.08)",
                  height: "160px",
                }}>
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${city.image}')` }} />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(6,8,20,0.9) 0%, rgba(6,8,20,0.3) 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="font-body text-lg">{city.flag}</div>
                  <div className="font-display text-base font-light text-ivory">{city.name}</div>
                  <div className="font-body text-xs" style={{ color: "var(--muted)" }}>{city.country}</div>
                </div>
                {activeCity === city.id && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: "var(--gold)" }} />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* City Detail */}
      <section className="pb-20">
        <div className="container">
          <motion.div key={selectedCity.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="glass-card rounded-3xl overflow-hidden"
              style={{ background: regionColors[selectedCity.region] || "rgba(255,255,255,0.03)", border: `1px solid ${regionBorders[selectedCity.region] || "rgba(255,255,255,0.08)"}` }}>
              {/* Header */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${selectedCity.image}')` }} />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to right, rgba(6,8,20,0.8) 0%, rgba(6,8,20,0.4) 100%)" }} />
                <div className="relative z-10 p-8 flex items-end h-full">
                  <div>
                    <div className="font-body text-3xl mb-2">{selectedCity.flag}</div>
                    <h2 className="font-display text-4xl font-light text-ivory mb-1">{selectedCity.name}</h2>
                    <p className="font-body text-sm" style={{ color: "rgba(240,235,220,0.7)" }}>{selectedCity.tagline}</p>
                    <div className="flex gap-3 mt-3">
                      <span className="glass-card-gold px-3 py-1 rounded-full font-accent text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
                        {selectedCity.region}
                      </span>
                      <span className="glass-card px-3 py-1 rounded-full font-body text-xs text-ivory">
                        Cost: {selectedCity.costIndex}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                {(Object.keys(tabLabels) as Tab[]).map((tab) => {
                  const Icon = tabIcons[tab];
                  return (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className="flex-1 flex items-center justify-center gap-2 py-4 font-accent text-xs tracking-wider uppercase transition-all"
                      style={{
                        color: activeTab === tab ? "var(--gold)" : "rgba(240,235,220,0.5)",
                        borderBottom: activeTab === tab ? "2px solid var(--gold)" : "2px solid transparent",
                      }}>
                      <Icon size={13} />
                      <span className="hidden sm:inline">{tabLabels[tab]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                <ul className="grid md:grid-cols-2 gap-3">
                  {selectedCity[activeTab].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "var(--gold)" }} />
                      <span className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
