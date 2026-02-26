/*
  Iberian Explorer — Full Day-by-Day Itinerary
  Lisbon → Porto → Seville → Madrid
  10–14 days, boutique self-guided
*/
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Home, Plane, Heart, ChevronDown, ChevronUp, Utensils } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const CITY_COLORS: Record<string, string> = {
  "Lisbon": "from-amber-900/40 to-amber-800/10",
  "Porto": "from-blue-900/40 to-blue-800/10",
  "Seville": "from-orange-900/40 to-orange-800/10",
  "Madrid": "from-red-900/40 to-red-800/10",
};

interface DayData {
  day: number;
  city: string;
  country: string;
  flag: string;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  restaurant: string;
  dish: string;
  housing: string;
  housingRate: string;
  transport?: string;
  curtisNote: string;
  reloNote?: string;
}

const days: DayData[] = [
  {
    day: 1,
    city: "Lisbon",
    country: "Portugal",
    flag: "🇵🇹",
    title: "Arrival & Alfama Magic",
    morning: "Fly into Lisbon Humberto Delgado Airport (LIS). LAX → LIS is ~11 hours direct on TAP Air Portugal or via London/Madrid. Check into your hotel in the Chiado neighborhood — the heart of literary Lisbon.",
    afternoon: "Walk the Alfama district: the oldest neighborhood in Lisbon, a labyrinth of narrow streets, azulejo-tiled facades, and the Castelo de São Jorge with panoramic views over the Tagus River. Visit the Sé Cathedral (Lisbon's oldest, built 1147).",
    evening: "Dinner in Alfama. Fado music is the soul of Lisbon — book a fado house for your first evening. The combination of haunting music, grilled fish, and Vinho Verde is unforgettable.",
    restaurant: "Tasca do Chico",
    dish: "Bacalhau à Brás (salted cod with eggs and crispy potatoes) — Portugal's national dish",
    housing: "Bairro Alto Hotel ★★★★★ — Chiado",
    housingRate: "~$350/night",
    curtisNote: "Melanie, Lisbon is everything Annie said it would be. The light here is unlike anywhere else in Europe — golden, warm, and impossibly romantic. You'll understand why half of Los Angeles is trying to move here.",
    reloNote: "Portugal's D8 Digital Nomad Visa: earn 4× minimum wage (~$4,400/month), apply at the SEF office on Rua São Sebastião da Pedreira. NHR tax regime: 10% flat on foreign income for 10 years. Lisbon 2BR apartments: €1,200–2,500/month in Chiado.",
  },
  {
    day: 2,
    city: "Lisbon",
    country: "Portugal",
    flag: "🇵🇹",
    title: "Belém, Sintra & Pastéis",
    morning: "Belém district: the Tower of Belém (UNESCO), the Jerónimos Monastery (Portugal's most magnificent building), and the Monument to the Discoveries. This is where Vasco da Gama set sail for India in 1497.",
    afternoon: "Day trip to Sintra (40 min by train from Rossio station, €2.25 each way). The Palácio Nacional da Pena — a Romantic-era palace painted in yellow and red perched above the clouds — is one of Europe's most surreal sights. Also visit the Quinta da Regaleira with its mysterious initiation well.",
    evening: "Return to Lisbon. Time Out Market Lisbon for dinner — 35 of Lisbon's best chefs under one roof. Grab a pastel de nata (custard tart) at the original Pastéis de Belém bakery on your way back.",
    restaurant: "Time Out Market Lisbon",
    dish: "Pastel de Nata at Pastéis de Belém — the original recipe since 1837, still warm from the oven with cinnamon",
    housing: "Bairro Alto Hotel ★★★★★ — Chiado",
    housingRate: "~$350/night",
    curtisNote: "The Pena Palace looks like something from a fairy tale — because it literally inspired Disney. You'll want to photograph every corner. Budget 4 hours minimum for Sintra.",
  },
  {
    day: 3,
    city: "Lisbon",
    country: "Portugal",
    flag: "🇵🇹",
    title: "LX Factory, NIF & Departure",
    morning: "LX Factory — a repurposed 19th-century industrial complex now home to design studios, restaurants, and the famous Sunday market. Browse the bookshop Ler Devagar (Reading Slowly), one of the world's most beautiful bookstores.",
    afternoon: "Practical afternoon: visit the Finanças office to begin your NIF (Portuguese tax number) registration — essential for any relocation or property purchase. Takes 30 minutes with your passport. Then explore the Príncipe Real neighborhood: antique shops, the Jardim do Príncipe Real, and the best cheese shop in Lisbon (Manteigaria Silva).",
    evening: "Farewell dinner in Chiado, then evening train to Porto (Alfa Pendular, 3 hours, ~€30). Arrive in Porto around 10pm.",
    restaurant: "Cervejaria Ramiro",
    dish: "Percebes (barnacles) and giant tiger prawns — Lisbon's legendary seafood institution since 1956",
    housing: "Bairro Alto Hotel ★★★★★ — Chiado",
    housingRate: "~$350/night",
    transport: "🚆 Lisbon Oriente → Porto Campanhã — Alfa Pendular — 3h — ~€30",
    curtisNote: "The NIF registration is the first concrete step toward making Portugal your home. Even if you're just exploring, having it opens every door — bank accounts, property purchases, the D8 visa application.",
  },
  {
    day: 4,
    city: "Porto",
    country: "Portugal",
    flag: "🇵🇹",
    title: "Ribeira, Port Wine & Livraria Lello",
    morning: "Porto's Ribeira district: a UNESCO World Heritage waterfront of colorful houses tumbling down to the Douro River. Walk across the Ponte Luís I (a double-deck iron bridge designed by a student of Gustave Eiffel) to the Vila Nova de Gaia side for port wine cellars.",
    afternoon: "Port wine tasting at Graham's Lodge — one of the oldest British port wine houses (founded 1820). The cellar tour is excellent. Then: Livraria Lello, the world's most beautiful bookshop (the inspiration for Hogwarts' library). Book tickets online — €8, redeemable against any purchase.",
    evening: "Dinner in the Foz do Douro neighborhood — Porto's most elegant district where the river meets the Atlantic. Sunset over the ocean.",
    restaurant: "DOP by Rui Paula",
    dish: "Francesinha — Porto's legendary sandwich: layers of cured meats, covered in melted cheese and a spicy tomato-beer sauce. Absolutely not diet food. Absolutely mandatory.",
    housing: "The Yeatman Hotel ★★★★★ — Vila Nova de Gaia",
    housingRate: "~$420/night",
    curtisNote: "The Yeatman has the best view in Porto — a panoramic terrace overlooking the entire city and the Douro River. The wine cellar has 25,000 bottles. You're welcome.",
    reloNote: "Porto is 30% cheaper than Lisbon. 2BR in Foz do Douro: €1,500–2,200/month. Porto's tech scene is growing fast — NOS, Farfetch, and Volkswagen Digital all have offices here.",
  },
  {
    day: 5,
    city: "Porto",
    country: "Portugal",
    flag: "🇵🇹",
    title: "Douro Valley Wine Cruise",
    morning: "Full-day Douro Valley wine cruise. Depart Porto at 9am by boat up the Douro River — the most beautiful river valley in Europe. Terraced vineyards, schist villages, and quintas (wine estates) line both banks.",
    afternoon: "Stop at Quinta do Crasto for a private wine tasting and lunch overlooking the river. The Douro produces some of the world's finest red wines (Touriga Nacional, Tinta Roriz) in addition to port.",
    evening: "Return to Porto by train (1.5 hours) or boat. Dinner in the Bonfim neighborhood — Porto's up-and-coming creative district.",
    restaurant: "Quinta do Crasto Restaurant",
    dish: "Roasted lamb with Douro red wine reduction — paired with their estate Reserva",
    housing: "The Yeatman Hotel ★★★★★ — Vila Nova de Gaia",
    housingRate: "~$420/night",
    curtisNote: "This is the day you'll talk about for years. The Douro Valley is one of the oldest wine regions in the world — and one of the most beautiful landscapes in Europe. Bring a good camera.",
  },
  {
    day: 6,
    city: "Seville",
    country: "Spain",
    flag: "🇪🇸",
    title: "Arrival & Real Alcázar",
    morning: "Morning flight Porto → Seville (TAP or Vueling, ~1.5 hours, ~€80). Check into your hotel in the Santa Cruz neighborhood — the old Jewish quarter, a labyrinth of orange-tree-lined streets.",
    afternoon: "Real Alcázar: the oldest royal palace still in use in Europe (since 913 AD). The Mudéjar architecture — a fusion of Islamic and Christian styles — is breathtaking. Game of Thrones fans: this is Dorne. Book tickets in advance.",
    evening: "Tapas crawl in Triana — Seville's most authentic neighborhood, across the Guadalquivir River. Triana is the birthplace of flamenco and home to the city's best tapas bars.",
    restaurant: "Bar El Comercio",
    dish: "Espinacas con garbanzos (spinach with chickpeas) and montaditos — the original Seville tapas experience",
    housing: "Hotel Alfonso XIII ★★★★★ — Santa Cruz",
    housingRate: "~$380/night",
    transport: "✈️ Porto (OPO) → Seville (SVQ) — TAP/Vueling — 1.5h — ~€80",
    curtisNote: "Hotel Alfonso XIII was built for the 1929 Ibero-American Exposition. It's one of the most beautiful hotels in Spain — a Moorish-Renaissance palace with a central courtyard. The king of Spain has stayed here. Now you will too.",
    reloNote: "Spain's Non-Lucrative Visa: prove €28,800/year in passive income (or savings). Seville 2BR: €900–1,400/month. Andalusia has a 10% flat income tax for new residents — the Beckham Law.",
  },
  {
    day: 7,
    city: "Seville",
    country: "Spain",
    flag: "🇪🇸",
    title: "Flamenco, Cathedral & Tapas",
    morning: "Seville Cathedral — the largest Gothic cathedral in the world. Climb the Giralda tower (originally a Moorish minaret) for panoramic views. Christopher Columbus is buried here.",
    afternoon: "Flamenco show at Casa de la Memoria — an intimate 17th-century palace with nightly performances. Book in advance (€22). This is not a tourist show — it's the real thing.",
    evening: "Dinner at the Mercado de Triana, then drinks at a rooftop bar overlooking the cathedral. Seville's nightlife doesn't start until 10pm — embrace the schedule.",
    restaurant: "Eslava",
    dish: "Croquetas de jamón ibérico and the legendary slow-cooked pork cheek — Eslava has won Spain's best tapas award multiple times",
    housing: "Hotel Alfonso XIII ★★★★★ — Santa Cruz",
    housingRate: "~$380/night",
    curtisNote: "Flamenco is not a performance — it's a conversation between the dancer, the guitarist, and the singer. At Casa de la Memoria, you'll be close enough to see the sweat and feel the emotion. It's one of the most powerful things you can experience in Europe.",
  },
  {
    day: 8,
    city: "Madrid",
    country: "Spain",
    flag: "🇪🇸",
    title: "High-Speed Train & Prado",
    morning: "High-speed AVE train Seville → Madrid (2.5 hours, €60–90, the world's most punctual train). Arrive at Madrid Atocha station — a Victorian iron-and-glass structure with a tropical garden inside.",
    afternoon: "Museo del Prado — one of the world's greatest art museums. Goya's Black Paintings, Velázquez's Las Meninas, and El Greco's masterpieces. Budget 3 hours minimum. Free after 6pm.",
    evening: "Dinner in the Malasaña neighborhood — Madrid's most creative district. Then: the Retiro Park at dusk (if timing allows).",
    restaurant: "Sobrino de Botín",
    dish: "Cochinillo asado (roast suckling pig) — Sobrino de Botín is the world's oldest restaurant (1725, Guinness World Record). The wood-fired oven has been burning continuously since the 18th century.",
    housing: "Hotel Urso ★★★★★ — Alonso Martínez",
    housingRate: "~$340/night",
    transport: "🚆 Seville Santa Justa → Madrid Atocha — AVE — 2.5h — ~€75",
    curtisNote: "The AVE is genuinely one of the great travel experiences. 2.5 hours, 300 km/h, and you arrive in the center of Madrid. No airport security theater, no baggage fees. This is how travel should work.",
    reloNote: "Madrid's IE Business School is 10 minutes from your hotel. The EMBA program is €88,000 — #5 in Europe. IE has the most diverse student body of any business school in the world.",
  },
  {
    day: 9,
    city: "Madrid",
    country: "Spain",
    flag: "🇪🇸",
    title: "IE Business School & Reina Sofía",
    morning: "IE Business School campus visit — arrange in advance through admissions. The campus is in the Salamanca neighborhood, a 10-minute walk from your hotel. The EMBA program is designed for executives like Melanie: 18 months, classes on weekends, taught in English.",
    afternoon: "Museo Reina Sofía — Spain's national museum of modern art. Picasso's Guernica (the most powerful anti-war painting ever made) is here. Also: Dalí, Miró, and the Spanish avant-garde.",
    evening: "Gran Vía at night — Madrid's Broadway. Dinner in the Chueca neighborhood, then a nightcap at a rooftop bar with views of the city.",
    restaurant: "DiverXO",
    dish: "The tasting menu at DiverXO (David Muñoz, 3 Michelin stars) — the most creative cooking in Spain. Book months in advance. This is the splurge of the trip.",
    housing: "Hotel Urso ★★★★★ — Alonso Martínez",
    housingRate: "~$340/night",
    curtisNote: "DiverXO is unlike any restaurant you've ever been to. David Muñoz serves 'dirty' fine dining — Asian-Spanish fusion with theatrical presentation. It's chaotic, brilliant, and completely unforgettable. Curtis has pre-booked this for your birthday celebration.",
  },
  {
    day: 10,
    city: "Madrid",
    country: "Spain",
    flag: "🇪🇸",
    title: "Retiro, El Rastro & Departure",
    morning: "Retiro Park — Madrid's answer to Central Park, but with a rowing lake, a crystal palace, and rose gardens. Sunday morning: El Rastro flea market in La Latina (one of Europe's best flea markets — go early).",
    afternoon: "Last afternoon in Madrid: the Mercado de San Miguel for lunch, then a final walk through the historic center — the Plaza Mayor, the Palacio Real, and the Almudena Cathedral.",
    evening: "Evening flight Madrid → LAX (Iberia direct, ~11 hours). Depart from Adolfo Suárez Madrid-Barajas Airport (MAD). Or extend your trip — Madrid rewards extra time.",
    restaurant: "Mercado de San Miguel",
    dish: "Jamón ibérico de bellota (acorn-fed Iberian ham) carved at the market — the finest cured meat in the world",
    housing: "Hotel Urso ★★★★★ — Alonso Martínez",
    housingRate: "~$340/night",
    transport: "✈️ Madrid (MAD) → Los Angeles (LAX) — Iberia direct — ~11h — ~$900 economy",
    curtisNote: "Melanie, you came to Europe to celebrate a birthday. You're leaving with a new vision for the next chapter. Whether it's Lisbon's golden light, Porto's wine terraces, Seville's flamenco, or Madrid's art — something here has already changed you. That's the point.",
  },
];

const flightInfo = {
  outbound: "LAX → LIS (Lisbon) — TAP Air Portugal direct — 11h — ~$850 economy / ~$2,800 business",
  return: "MAD (Madrid) → LAX — Iberia direct — 11h — ~$900 economy / ~$2,900 business",
  strategy: "Open-jaw ticket: fly into Lisbon, out of Madrid. Saves backtracking and costs ~$50 more than a round-trip. Book 3–4 months ahead for best prices.",
  tip: "Consider business class one-way (outbound) for the overnight flight — arrive in Lisbon rested. Economy on the return is fine since it's a daytime departure.",
};

const budgetBreakdown = [
  { item: "✈️ Flights (2 people, economy)", cost: "~$3,400" },
  { item: "🏨 10 nights accommodation (avg $370/night)", cost: "~$3,700" },
  { item: "🍽️ Food & dining (10 days)", cost: "~$1,800" },
  { item: "🎭 Experiences & museum entries", cost: "~$600" },
  { item: "🚆 Internal transport (trains + flights)", cost: "~$500" },
  { item: "🛍️ Shopping & incidentals", cost: "~$400" },
];
const grandTotal = "~$10,400 for two";
const curtisGift = "~$5,000 (flights + 5 nights + experiences)";
const melanieUpgrade = "~$5,400 (remaining hotels + dining + DiverXO)";

export default function IberianExplorer() {
  const [openDay, setOpenDay] = useState<number | null>(1);

  return (
    <div className="min-h-screen bg-navy text-ivory">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://files.manuscdn.com/user_upload_by_module/session_file/118915275/SuJtqqfJKhuEfqWd.jpg')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,8,20,0.6), rgba(6,8,20,0.95))" }} />
        <div className="relative z-10 container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>
              Self-Guided Boutique · 10 Days
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-light text-ivory mt-3 mb-4 leading-none">
              Iberian <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Explorer</span>
            </h1>
            <p className="font-display text-xl font-light mb-2" style={{ color: "rgba(240,235,220,0.7)" }}>
              Lisbon · Porto · Seville · Madrid
            </p>
            <p className="font-body text-sm max-w-2xl mx-auto leading-relaxed mt-4" style={{ color: "var(--muted)" }}>
              Four of Europe's most captivating cities. Portugal's golden light and Atlantic soul, Spain's fire and passion. 
              Open-jaw from LAX: fly into Lisbon, out of Madrid. Relocation scouting, wine, flamenco, and the world's oldest restaurant.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {["10 Days", "4 Cities", "~$10,400 for Two", "Open-Jaw LAX→LIS / MAD→LAX"].map(tag => (
                <span key={tag} className="glass-card-gold px-4 py-2 rounded-full font-accent text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Flights Section */}
      <section className="py-16" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="glass-card-gold p-3 rounded-xl">
              <Plane size={20} style={{ color: "var(--gold)" }} />
            </div>
            <h2 className="font-display text-3xl font-light text-ivory">
              ✈️ Flights from <span style={{ color: "var(--gold)", fontStyle: "italic" }}>LAX</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="font-accent text-xs tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>Outbound</div>
              <div className="font-body text-sm text-ivory leading-relaxed">{flightInfo.outbound}</div>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="font-accent text-xs tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>Return</div>
              <div className="font-body text-sm text-ivory leading-relaxed">{flightInfo.return}</div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 mb-4" style={{ borderColor: "rgba(180,150,80,0.2)" }}>
            <div className="font-accent text-xs tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>Open-Jaw Strategy</div>
            <div className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{flightInfo.strategy}</div>
          </div>
          <div className="glass-card rounded-2xl p-6" style={{ borderColor: "rgba(180,150,80,0.15)" }}>
            <div className="font-accent text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(180,150,80,0.7)" }}>Margaux's Tip</div>
            <div className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{flightInfo.tip}</div>
          </div>
        </div>
      </section>

      {/* Day-by-Day Itinerary */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl font-light text-ivory mb-10">
            Day-by-Day <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Itinerary</span>
          </h2>

          <div className="space-y-4">
            {days.map((day) => {
              const isOpen = openDay === day.day;
              const cityColor = CITY_COLORS[day.city] || "from-amber-900/30 to-amber-800/10";

              return (
                <motion.div key={day.day} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: day.day * 0.03 }}>
                  <div className={`glass-card rounded-2xl overflow-hidden bg-gradient-to-br ${cityColor}`}
                    style={{ border: isOpen ? "1px solid rgba(180,150,80,0.35)" : "1px solid rgba(255,255,255,0.07)" }}>

                    {/* Header — always visible */}
                    <button className="w-full text-left p-6 flex items-center gap-4"
                      onClick={() => setOpenDay(isOpen ? null : day.day)}>
                      <div className="w-14 h-14 rounded-full flex flex-col items-center justify-center flex-shrink-0 font-body"
                        style={{ background: isOpen ? "var(--gold)" : "rgba(255,255,255,0.08)", color: isOpen ? "var(--navy)" : "rgba(240,235,220,0.5)" }}>
                        <span className="text-[0.55rem] font-bold tracking-widest uppercase">DAY</span>
                        <span className="text-lg font-bold leading-none">{day.day}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-body text-base">{day.flag}</span>
                          <span className="font-display text-lg font-light text-ivory">{day.city}, {day.country}</span>
                        </div>
                        <div className="font-body text-sm" style={{ color: "var(--muted)" }}>{day.title}</div>
                        {day.transport && (
                          <div className="font-body text-xs mt-1" style={{ color: "rgba(180,150,80,0.7)" }}>{day.transport}</div>
                        )}
                      </div>
                      <div className="flex-shrink-0" style={{ color: "var(--gold)" }}>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </button>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                          <div className="px-6 pb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>

                            {/* Morning / Afternoon / Evening */}
                            <div className="grid md:grid-cols-3 gap-4 mt-6 mb-6">
                              {[
                                { label: "MORNING", text: day.morning, color: "rgba(255,200,80,0.15)" },
                                { label: "AFTERNOON", text: day.afternoon, color: "rgba(180,150,80,0.1)" },
                                { label: "EVENING", text: day.evening, color: "rgba(100,80,180,0.15)" },
                              ].map(({ label, text, color }) => (
                                <div key={label} className="glass-card rounded-xl p-4" style={{ background: color }}>
                                  <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>
                                    {label}
                                  </div>
                                  <div className="font-body text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{text}</div>
                                </div>
                              ))}
                            </div>

                            {/* Restaurant */}
                            <div className="glass-card rounded-xl p-4 mb-4 flex items-start gap-3">
                              <Utensils size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                              <div>
                                <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "rgba(180,150,80,0.7)" }}>
                                  Tonight's Restaurant
                                </div>
                                <div className="font-body text-sm font-medium text-ivory">{day.restaurant}</div>
                                <div className="font-body text-xs mt-1" style={{ color: "var(--muted)" }}>Order: {day.dish}</div>
                              </div>
                            </div>

                            {/* Housing */}
                            <div className="glass-card rounded-xl p-4 mb-4 flex items-start gap-3">
                              <Home size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                              <div className="flex-1">
                                <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "rgba(180,150,80,0.7)" }}>
                                  Tonight's Accommodation
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="font-body text-sm text-ivory">{day.housing}</div>
                                  <div className="font-body text-sm font-medium" style={{ color: "var(--gold)" }}>{day.housingRate}</div>
                                </div>
                              </div>
                            </div>

                            {/* From Curtis */}
                            <div className="glass-card rounded-xl p-4 mb-4 flex items-start gap-3"
                              style={{ borderColor: "rgba(220,100,100,0.2)", background: "rgba(220,100,100,0.05)" }}>
                              <Heart size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#f87171" }} />
                              <div>
                                <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "#f87171" }}>
                                  FROM CURTIS
                                </div>
                                <div className="font-body text-xs leading-relaxed" style={{ color: "rgba(240,235,220,0.7)" }}>
                                  {day.curtisNote}
                                </div>
                              </div>
                            </div>

                            {/* Relo Note */}
                            {day.reloNote && (
                              <div className="glass-card rounded-xl p-4 flex items-start gap-3"
                                style={{ borderColor: "rgba(80,200,120,0.2)", background: "rgba(80,200,120,0.04)" }}>
                                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#4ade80" }} />
                                <div>
                                  <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "#4ade80" }}>
                                    RELOCATION SCOUT NOTE
                                  </div>
                                  <div className="font-body text-xs leading-relaxed" style={{ color: "rgba(240,235,220,0.6)" }}>
                                    {day.reloNote}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Budget Breakdown */}
      <section className="py-16" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="container max-w-4xl">
          <h2 className="font-display text-3xl font-light text-ivory mb-8">
            💰 Budget <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Breakdown</span>
          </h2>
          <div className="glass-card rounded-2xl overflow-hidden">
            {budgetBreakdown.map((row, i) => (
              <div key={i} className="flex items-center justify-between p-5"
                style={{ borderBottom: i < budgetBreakdown.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <span className="font-body text-sm" style={{ color: "var(--muted)" }}>{row.item}</span>
                <span className="font-body text-sm font-medium text-ivory">{row.cost}</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-5" style={{ borderTop: "2px solid rgba(180,150,80,0.3)", background: "rgba(180,150,80,0.08)" }}>
              <span className="font-display text-lg font-light text-ivory">Grand Total</span>
              <span className="font-display text-xl font-light" style={{ color: "var(--gold)" }}>{grandTotal}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="glass-card rounded-2xl p-6" style={{ borderColor: "rgba(180,150,80,0.25)" }}>
              <div className="font-accent text-xs tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>
                💛 Curtis's Gift Covers
              </div>
              <div className="font-display text-2xl font-light text-ivory mb-1">~$5,000</div>
              <div className="font-body text-xs" style={{ color: "var(--muted)" }}>{curtisGift}</div>
            </div>
            <div className="glass-card rounded-2xl p-6" style={{ borderColor: "rgba(100,180,255,0.2)" }}>
              <div className="font-accent text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(100,180,255,0.8)" }}>
                ✨ Melanie's Upgrade
              </div>
              <div className="font-display text-2xl font-light text-ivory mb-1">~$5,400</div>
              <div className="font-body text-xs" style={{ color: "var(--muted)" }}>{melanieUpgrade}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
