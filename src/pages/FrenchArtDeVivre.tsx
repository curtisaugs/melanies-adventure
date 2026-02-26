/*
  French Art de Vivre — Full Day-by-Day Itinerary
  Nice → Provence → Lyon → Paris
  12 days, cultural immersion, Annie reunion
*/
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Home, Plane, Heart, ChevronDown, ChevronUp, Utensils } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const CITY_COLORS: Record<string, string> = {
  "Nice": "from-blue-900/40 to-cyan-900/10",
  "Provence": "from-purple-900/40 to-purple-800/10",
  "Lyon": "from-amber-900/40 to-amber-800/10",
  "Paris": "from-slate-900/40 to-slate-800/10",
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
    city: "Nice",
    country: "France",
    flag: "🇫🇷",
    title: "Arrival on the Côte d'Azur",
    morning: "Fly into Nice Côte d'Azur Airport (NCE). LAX → NCE is typically via Paris CDG or London Heathrow (~14 hours total). Check into your hotel in the Vieux-Nice neighborhood — the old town, a baroque labyrinth of ochre and sienna facades.",
    afternoon: "Promenade des Anglais: the iconic 7km seafront promenade. Walk east to the Colline du Château for panoramic views of the Baie des Anges and the terracotta rooftops of Vieux-Nice. The castle itself was demolished in 1706, but the park is magnificent.",
    evening: "Cours Saleya: Nice's most beautiful square, lined with flower stalls by day and restaurants by night. The Socca (chickpea flour pancake) at Chez René Socca is the authentic local experience — eat it standing up, like the Niçois do.",
    restaurant: "Chez René Socca",
    dish: "Socca (crispy chickpea pancake) and pan bagnat (Nice's version of a salade niçoise sandwich) — the real Niçois street food",
    housing: "Hôtel Negresco ★★★★★ — Promenade des Anglais",
    housingRate: "~$450/night",
    curtisNote: "The Negresco is the most iconic hotel on the Riviera — a Belle Époque palace with a pink dome that has been a landmark since 1913. Every room is decorated with original art. You'll feel like a Fitzgerald character. That's the point.",
    reloNote: "Nice has a large expat community and excellent transport links to Monaco (20 min by train) and Italy (1 hour). 2BR in the Cimiez neighborhood: €1,400–2,200/month. France's Passeport Talent visa suits senior executives.",
  },
  {
    day: 2,
    city: "Nice",
    country: "France",
    flag: "🇫🇷",
    title: "Monaco & Èze Village",
    morning: "Day trip to Monaco (20 min by train, €4 each way). The Principality of Monaco: the Casino de Monte-Carlo (you don't have to gamble — the architecture alone is worth it), the Palais Princier, and the Oceanographic Museum founded by Prince Albert I.",
    afternoon: "Stop at Èze on the way back — a medieval village perched 429 meters above the sea on a rocky outcrop. The Jardin Exotique at the summit has views that will stop your heart. Fragonard perfume factory is here — the tour is free.",
    evening: "Return to Nice. Dinner in the Vieux-Nice. The old town comes alive at night — narrow streets, live music, and the smell of socca and pissaladière.",
    restaurant: "La Merenda",
    dish: "Daube niçoise (beef braised in red wine with olives and orange peel) — La Merenda has no phone, no credit cards, and no reservations. Show up at 7pm and wait. Worth it.",
    housing: "Hôtel Negresco ★★★★★ — Promenade des Anglais",
    housingRate: "~$450/night",
    curtisNote: "Monaco is the most densely populated country in the world and the second smallest. It has no income tax. 38,000 people live here, 10,000 of whom are millionaires. It's fascinating and slightly absurd — exactly the right amount of both.",
  },
  {
    day: 3,
    city: "Provence",
    country: "France",
    flag: "🇫🇷",
    title: "Into the Luberon",
    morning: "Rent a car in Nice (or take the train to Avignon, 2.5 hours, €35). Drive into the Luberon — the heart of Provence. The Luberon is a range of hills in the Vaucluse department, dotted with perched villages, lavender fields (peak: late June–July), and Roman ruins.",
    afternoon: "Gordes — the most beautiful village in Provence, perched on a cliff above the Luberon valley. The Renaissance château, the dry-stone bories (ancient shepherd huts), and the Abbey of Sénanque (surrounded by lavender) are all within 10 minutes of each other.",
    evening: "Check into a chambre d'hôte (bed and breakfast) in the Luberon. Dinner at a local restaurant — Provençal cuisine is simple, seasonal, and extraordinary: ratatouille, tapenade, and rosé wine from the Côtes du Luberon.",
    restaurant: "Le Mas Tourteron",
    dish: "Agneau de Sisteron (Sisteron lamb) with herbes de Provence and gratin dauphinois — the definitive Provençal main course",
    housing: "La Bastide de Gordes ★★★★★ — Gordes",
    housingRate: "~$520/night",
    transport: "🚗 Nice → Gordes — rental car or train to Avignon + car — 2.5h",
    curtisNote: "The Luberon is where Peter Mayle wrote 'A Year in Provence' — the book that made half of England want to move here. You'll understand why immediately. The light, the pace, the food — it's a different relationship with time.",
    reloNote: "The Luberon has a significant British and American expat community. Property prices are high but not Monaco-level: a restored mas (farmhouse) starts at €600,000. The lifestyle is extraordinary.",
  },
  {
    day: 4,
    city: "Provence",
    country: "France",
    flag: "🇫🇷",
    title: "Lavender, Markets & Roussillon",
    morning: "Apt market (Tuesday and Saturday) — one of the best markets in Provence. Lavender honey, truffles, goat cheese, and the most beautiful produce you've ever seen. The Luberon is also truffle country — the Vaucluse produces 70% of France's black truffles.",
    afternoon: "Roussillon — a village built entirely from ochre, painted in 17 shades of red, orange, and yellow. The Sentier des Ocres (Ochre Trail) winds through the old quarries — a landscape that looks like the American Southwest transplanted to France.",
    evening: "Sunset from the terrace of your bastide. Rosé wine from the Côtes de Provence. This is the art de vivre.",
    restaurant: "David & Loulia",
    dish: "Bouillabaisse Provençale — not the Marseille version (that requires a 2-hour drive), but a beautiful Luberon interpretation with local fish and rouille",
    housing: "La Bastide de Gordes ★★★★★ — Gordes",
    housingRate: "~$520/night",
    curtisNote: "Roussillon is one of those places that photographs can't capture. The ochre is so vivid, so warm, so unlike anything in the US. Bring the good camera and budget 2 hours minimum.",
  },
  {
    day: 5,
    city: "Lyon",
    country: "France",
    flag: "🇫🇷",
    title: "Gastronomic Capital of the World",
    morning: "Drive or train to Lyon (2 hours from Avignon by TGV, €35). Lyon is the gastronomic capital of the world — Paul Bocuse's city, the birthplace of nouvelle cuisine, and home to more Michelin stars per capita than anywhere else on earth.",
    afternoon: "Vieux-Lyon: the largest Renaissance neighborhood in France, a UNESCO World Heritage site. The traboules — secret passageways through the buildings — were used by the Resistance during WWII. The Fourvière basilica overlooks the city from a hill.",
    evening: "Dinner at a bouchon lyonnais — Lyon's traditional working-class restaurant. Tablecloths with red-and-white checks, communal tables, and food that is honest, generous, and extraordinary.",
    restaurant: "Daniel & Denise",
    dish: "Quenelles de brochet (pike dumplings in Nantua sauce) and tête de veau (calf's head) — the definitive bouchon experience. Joseph Viola is a Meilleur Ouvrier de France. This is serious cooking.",
    housing: "Cour des Loges ★★★★★ — Vieux-Lyon",
    housingRate: "~$390/night",
    transport: "🚆 Avignon TGV → Lyon Part-Dieu — TGV — 1h — ~€35",
    curtisNote: "Cour des Loges is built inside four Renaissance mansions connected by a glass-roofed courtyard. It's one of the most architecturally extraordinary hotels in France. Curtis chose it specifically because of the architecture — you'll understand why.",
    reloNote: "Lyon is France's second city and has a thriving tech scene (Biotech Valley, digital health). 2BR in the Presqu'île: €1,100–1,800/month. Less expensive than Paris, better food, and 2 hours from Paris by TGV.",
  },
  {
    day: 6,
    city: "Lyon",
    country: "France",
    flag: "🇫🇷",
    title: "Les Halles de Lyon & Confluence",
    morning: "Les Halles de Lyon Paul Bocuse — the covered market that Bocuse called 'the belly of Lyon.' 48 stalls of the finest food in France: Saint-Marcellin cheese, Bresse chicken, Charolais beef, and the most extraordinary charcuterie you've ever seen.",
    afternoon: "Confluence — Lyon's newest neighborhood, built on the peninsula where the Rhône and Saône rivers meet. A showcase of contemporary architecture: the Musée des Confluences (a deconstructivist crystal cloud) and the Confluence shopping center (designed by Rudy Ricciotti).",
    evening: "Dinner at a contemporary Lyon restaurant. Lyon's food scene has evolved beyond the bouchon — there's a new generation of chefs doing extraordinary things with local ingredients.",
    restaurant: "Têtedoie",
    dish: "The tasting menu at Têtedoie (1 Michelin star) — Christian Têtedoie's panoramic restaurant on the Fourvière hill with views over the entire city",
    housing: "Cour des Loges ★★★★★ — Vieux-Lyon",
    housingRate: "~$390/night",
    curtisNote: "The Musée des Confluences is one of the most remarkable buildings in France — a 3D puzzle of stainless steel and glass that seems to float above the confluence of the two rivers. Even if you don't go inside, walk around it.",
  },
  {
    day: 7,
    city: "Paris",
    country: "France",
    flag: "🇫🇷",
    title: "Annie & Thomas — Reunion in Paris",
    morning: "TGV Lyon → Paris Gare de Lyon (2 hours, €60). Arrive in Paris. Annie meets you at the station — this is the emotional heart of the trip.",
    afternoon: "Annie's Paris: she shows you her neighborhood, her favorite café, her boulangerie. This is not tourist Paris — this is the Paris that people who live here know. The Marais, the Canal Saint-Martin, the Île Saint-Louis.",
    evening: "Birthday dinner with Annie and Thomas. Curtis has arranged a special table at a restaurant that Annie has chosen — somewhere that means something to her in Paris.",
    restaurant: "Septime",
    dish: "The tasting menu at Septime (1 Michelin star, Bertrand Grébaut) — seasonal, biodynamic, and one of the most exciting restaurants in Paris. Book months in advance.",
    housing: "Hôtel du Marais ★★★★ — Le Marais",
    housingRate: "~$320/night",
    transport: "🚆 Lyon Part-Dieu → Paris Gare de Lyon — TGV — 2h — ~€60",
    curtisNote: "Melanie, seeing you reunite with Annie in Paris will be pure magic. Enjoy every moment. This is what the whole trip has been building toward.",
    reloNote: "Paris has Europe's largest PropTech ecosystem. INSEAD is 45 minutes from Paris by RER A (Fontainebleau-Avon station). HEC Paris is 30 minutes by RER B. The Passeport Talent visa for senior executives takes 2–3 months to process.",
  },
  {
    day: 8,
    city: "Paris",
    country: "France",
    flag: "🇫🇷",
    title: "Musée d'Orsay & Le Marais",
    morning: "Musée d'Orsay — the world's greatest collection of Impressionist art. Monet, Renoir, Degas, Van Gogh, Cézanne. The building itself is a converted Beaux-Arts railway station. Go early (9am) to beat the crowds.",
    afternoon: "Le Marais: Paris's most vibrant neighborhood. The Place des Vosges (Paris's oldest square, 1612), the Picasso Museum, and the best falafel in the world at L'As du Fallafel on Rue des Rosiers.",
    evening: "Evening walk along the Seine. The Pont des Arts, Notre-Dame (reopened December 2024 after the fire), and the Île de la Cité at night.",
    restaurant: "Frenchie",
    dish: "The 5-course menu at Frenchie (Gregory Marchand, 1 Michelin star) — French technique with global influences. One of Paris's most beloved restaurants.",
    housing: "Hôtel du Marais ★★★★ — Le Marais",
    housingRate: "~$320/night",
    curtisNote: "Notre-Dame reopened in December 2024 after 5 years of restoration. The interior is more beautiful than it was before the fire — the medieval stonework has been cleaned and the new art glass is extraordinary. You're arriving at exactly the right moment.",
  },
  {
    day: 9,
    city: "Paris",
    country: "France",
    flag: "🇫🇷",
    title: "INSEAD Campus Visit & Versailles",
    morning: "INSEAD campus visit — Fontainebleau campus, 45 minutes from Paris by RER A. The MBA program is €115,000 for 10 months — the most intense business school experience in the world. Arrange a campus tour through admissions.",
    afternoon: "Palace of Versailles — 30 minutes from Paris by RER C. The Hall of Mirrors, the Grand Trianon, and the gardens designed by Le Nôtre. Go on a weekday to avoid the worst crowds.",
    evening: "Return to Paris. Dinner in Saint-Germain-des-Prés — the intellectual heart of Paris. Café de Flore for a glass of wine and people-watching.",
    restaurant: "Café de Flore",
    dish: "Croque-monsieur and a glass of Sancerre — Sartre and Simone de Beauvoir's regular order. Some traditions are worth maintaining.",
    housing: "Hôtel du Marais ★★★★ — Le Marais",
    housingRate: "~$320/night",
    curtisNote: "INSEAD's 10-month MBA is the fastest path to a European executive network. The Fontainebleau forest is extraordinary — the campus is set in a 17th-century château. Even if you don't apply, the visit will clarify your thinking.",
  },
  {
    day: 10,
    city: "Paris",
    country: "France",
    flag: "🇫🇷",
    title: "Montmartre, HEC & Last Night",
    morning: "Montmartre: the Sacré-Cœur basilica, the Place du Tertre (artists' square), and the vineyard that still produces 1,500 bottles of Pinot Noir per year. The view of Paris from the steps of the Sacré-Cœur is one of the city's finest.",
    afternoon: "HEC Paris campus visit — Jouy-en-Josas, 30 minutes from Paris by RER B. The Executive MBA is €98,000 for 18 months, designed for senior executives. HEC is #1 in France and consistently top 5 in Europe.",
    evening: "Last night in Paris. Dinner at a restaurant that Annie has chosen — somewhere that means something to her in the city she now calls home.",
    restaurant: "Le Grand Véfour",
    dish: "The tasting menu at Le Grand Véfour (2 Michelin stars, Guy Martin) — a restaurant in the Palais-Royal arcade that has been serving since 1784. Napoleon, Hugo, Colette — they all ate here.",
    housing: "Hôtel du Marais ★★★★ — Le Marais",
    housingRate: "~$320/night",
    curtisNote: "Le Grand Véfour is one of the most beautiful restaurants in the world — a listed historical monument with painted glass panels and gilded columns. The food is extraordinary. This is your last night in Paris. Make it count.",
  },
  {
    day: 11,
    city: "Paris",
    country: "France",
    flag: "🇫🇷",
    title: "Final Morning & Departure",
    morning: "Final morning in Paris. A last café au lait and croissant at a neighborhood brasserie. Walk to the Tuileries Garden. Buy macarons at Ladurée on the Rue de Rivoli for the flight home.",
    afternoon: "Transfer to Charles de Gaulle Airport (CDG) — 45 minutes by RER B or 30 minutes by taxi. Check in for your flight home.",
    evening: "Evening flight Paris CDG → LAX (Air France direct, ~11 hours). Arrive in Los Angeles the same day (time zones work in your favor westbound).",
    restaurant: "Ladurée",
    dish: "Macarons in rose, pistachio, and salted caramel — buy a box for the flight. You've earned it.",
    housing: "Hôtel du Marais ★★★★ — Le Marais",
    housingRate: "~$320/night",
    transport: "✈️ Paris CDG → Los Angeles LAX — Air France direct — ~11h — ~$950 economy",
    curtisNote: "Melanie, you came to Europe to celebrate a birthday. You're leaving with a new relationship with the world — with Annie's Paris, with Provence's light, with Lyon's food, with the Côte d'Azur's warmth. Something has shifted. That's the gift.",
  },
];

const flightInfo = {
  outbound: "LAX → NCE (Nice) — Air France via Paris CDG — ~14h total — ~$1,100 economy / ~$3,200 business",
  return: "CDG (Paris) → LAX — Air France direct — ~11h — ~$950 economy / ~$2,900 business",
  strategy: "Open-jaw ticket: fly into Nice, out of Paris. Saves backtracking across France and costs ~$100 more than a round-trip. Book 3–4 months ahead for best prices on Air France.",
  tip: "Consider business class on the outbound (overnight LAX→Paris→Nice) to arrive rested. Economy on the return is fine — it's a daytime departure from Paris.",
};

const budgetBreakdown = [
  { item: "✈️ Flights (2 people, economy)", cost: "~$4,100" },
  { item: "🏨 11 nights accommodation (avg $400/night)", cost: "~$4,400" },
  { item: "🍽️ Food & dining (11 days)", cost: "~$2,200" },
  { item: "🎭 Experiences & museum entries", cost: "~$700" },
  { item: "🚆 Internal transport (TGV + car rental)", cost: "~$600" },
  { item: "🛍️ Shopping & incidentals", cost: "~$500" },
];
const grandTotal = "~$12,500 for two";
const curtisGift = "~$5,000 (flights + 4 nights + experiences)";
const melanieUpgrade = "~$7,500 (remaining hotels + dining + Septime + Le Grand Véfour)";

export default function FrenchArtDeVivre() {
  const [openDay, setOpenDay] = useState<number | null>(1);

  return (
    <div className="min-h-screen bg-navy text-ivory">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://files.manuscdn.com/user_upload_by_module/session_file/118915275/oMZyNBpgjjLicSRc.jpg')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,8,20,0.6), rgba(6,8,20,0.95))" }} />
        <div className="relative z-10 container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>
              Cultural Immersion · 11 Days · Annie Reunion
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-light text-ivory mt-3 mb-4 leading-none">
              French <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Art de Vivre</span>
            </h1>
            <p className="font-display text-xl font-light mb-2" style={{ color: "rgba(240,235,220,0.7)" }}>
              Nice · Provence · Lyon · Paris
            </p>
            <p className="font-body text-sm max-w-2xl mx-auto leading-relaxed mt-4" style={{ color: "var(--muted)" }}>
              The emotional heart of this trip is Paris — and Annie. But the journey there, through the Côte d'Azur, 
              the lavender fields of Provence, and the gastronomic capital of Lyon, is as extraordinary as the destination.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {["11 Days", "4 Regions", "~$12,500 for Two", "Open-Jaw LAX→NCE / CDG→LAX", "Annie Reunion"].map(tag => (
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

      {/* Day-by-Day */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl font-light text-ivory mb-10">
            Day-by-Day <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Itinerary</span>
          </h2>
          <div className="space-y-4">
            {days.map((day) => {
              const isOpen = openDay === day.day;
              const cityColor = CITY_COLORS[day.city] || "from-slate-900/40 to-slate-800/10";
              return (
                <motion.div key={day.day} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: day.day * 0.03 }}>
                  <div className={`glass-card rounded-2xl overflow-hidden bg-gradient-to-br ${cityColor}`}
                    style={{ border: isOpen ? "1px solid rgba(180,150,80,0.35)" : "1px solid rgba(255,255,255,0.07)" }}>
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
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                          <div className="px-6 pb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                            <div className="grid md:grid-cols-3 gap-4 mt-6 mb-6">
                              {[
                                { label: "MORNING", text: day.morning, color: "rgba(255,200,80,0.15)" },
                                { label: "AFTERNOON", text: day.afternoon, color: "rgba(180,150,80,0.1)" },
                                { label: "EVENING", text: day.evening, color: "rgba(100,80,180,0.15)" },
                              ].map(({ label, text, color }) => (
                                <div key={label} className="glass-card rounded-xl p-4" style={{ background: color }}>
                                  <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>{label}</div>
                                  <div className="font-body text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{text}</div>
                                </div>
                              ))}
                            </div>
                            <div className="glass-card rounded-xl p-4 mb-4 flex items-start gap-3">
                              <Utensils size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                              <div>
                                <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "rgba(180,150,80,0.7)" }}>Tonight's Restaurant</div>
                                <div className="font-body text-sm font-medium text-ivory">{day.restaurant}</div>
                                <div className="font-body text-xs mt-1" style={{ color: "var(--muted)" }}>Order: {day.dish}</div>
                              </div>
                            </div>
                            <div className="glass-card rounded-xl p-4 mb-4 flex items-start gap-3">
                              <Home size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                              <div className="flex-1">
                                <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "rgba(180,150,80,0.7)" }}>Tonight's Accommodation</div>
                                <div className="flex items-center justify-between">
                                  <div className="font-body text-sm text-ivory">{day.housing}</div>
                                  <div className="font-body text-sm font-medium" style={{ color: "var(--gold)" }}>{day.housingRate}</div>
                                </div>
                              </div>
                            </div>
                            <div className="glass-card rounded-xl p-4 mb-4 flex items-start gap-3"
                              style={{ borderColor: "rgba(220,100,100,0.2)", background: "rgba(220,100,100,0.05)" }}>
                              <Heart size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#f87171" }} />
                              <div>
                                <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "#f87171" }}>FROM CURTIS</div>
                                <div className="font-body text-xs leading-relaxed" style={{ color: "rgba(240,235,220,0.7)" }}>{day.curtisNote}</div>
                              </div>
                            </div>
                            {day.reloNote && (
                              <div className="glass-card rounded-xl p-4 flex items-start gap-3"
                                style={{ borderColor: "rgba(80,200,120,0.2)", background: "rgba(80,200,120,0.04)" }}>
                                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#4ade80" }} />
                                <div>
                                  <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "#4ade80" }}>RELOCATION SCOUT NOTE</div>
                                  <div className="font-body text-xs leading-relaxed" style={{ color: "rgba(240,235,220,0.6)" }}>{day.reloNote}</div>
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
              <div className="font-accent text-xs tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>💛 Curtis's Gift Covers</div>
              <div className="font-display text-2xl font-light text-ivory mb-1">~$5,000</div>
              <div className="font-body text-xs" style={{ color: "var(--muted)" }}>{curtisGift}</div>
            </div>
            <div className="glass-card rounded-2xl p-6" style={{ borderColor: "rgba(100,180,255,0.2)" }}>
              <div className="font-accent text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(100,180,255,0.8)" }}>✨ Melanie's Upgrade</div>
              <div className="font-display text-2xl font-light text-ivory mb-1">~$7,500</div>
              <div className="font-body text-xs" style={{ color: "var(--muted)" }}>{melanieUpgrade}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
