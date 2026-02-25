/* 
  Design: The Modern European — Refined Glass & Gold
  Flights & Logistics: Flight options from LAS, open-jaw strategy, packing tips, travel insurance
*/
import { motion } from "framer-motion";
import { Plane, Clock, DollarSign, Luggage, Shield, ExternalLink, ArrowRight, Star, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const flightRoutes = [
  {
    route: "LAS → CDG (Paris)",
    airline: "United Airlines / Air France",
    stops: "1 stop (EWR or IAD)",
    duration: "~13–15 hrs",
    price: "$923–$1,400",
    bestFor: "French Art de Vivre package — see Annie first",
    tip: "Book United Polaris Business for the transatlantic leg if using miles",
    dates: "Late March / Early April 2026",
    color: "from-blue-950/40 to-blue-900/20",
    flag: "🇫🇷",
  },
  {
    route: "LAS → LIS (Lisbon)",
    airline: "TAP Air Portugal / Iberia",
    stops: "1 stop (JFK, ORD, or MAD)",
    duration: "~14–16 hrs",
    price: "$1,050–$1,600",
    bestFor: "Iberian Explorer — start in Lisbon, end in Madrid",
    tip: "TAP's stopover program lets you add a free Lisbon layover on transatlantic routes",
    dates: "Late March / Early April 2026",
    color: "from-green-950/40 to-emerald-900/20",
    flag: "🇵🇹",
  },
  {
    route: "LAS → NCE (Nice)",
    airline: "Air France / British Airways",
    stops: "1–2 stops (CDG or LHR)",
    duration: "~15–17 hrs",
    price: "$1,100–$1,700",
    bestFor: "French Art de Vivre — start in Nice, end in Paris",
    tip: "Open-jaw: fly into Nice, out of Paris CDG — saves backtracking",
    dates: "Late March / Early April 2026",
    color: "from-purple-950/40 to-indigo-900/20",
    flag: "🇫🇷",
  },
  {
    route: "LAS → BSL (Basel) for Rhine Cruise",
    airline: "Swiss / Lufthansa",
    stops: "1 stop (ZRH or FRA)",
    duration: "~14–16 hrs",
    price: "$1,200–$1,900",
    bestFor: "Rhine River Cruise — Basel embarkation point",
    tip: "Fly into Basel, cruise to Amsterdam, fly home from AMS — perfect open-jaw",
    dates: "April 4–29, 2026 (cruise departures)",
    color: "from-amber-950/40 to-orange-900/20",
    flag: "🇨🇭",
  },
];

const openJawStrategy = [
  {
    package: "Rhine River Cruise",
    flyIn: "Basel (BSL) or Zurich (ZRH)",
    flyOut: "Amsterdam (AMS)",
    savings: "Saves 8+ hours of backtracking",
    airlines: "Swiss + KLM",
    tip: "Book as two separate one-way tickets for maximum flexibility",
  },
  {
    package: "Iberian Explorer",
    flyIn: "Lisbon (LIS)",
    flyOut: "Madrid (MAD)",
    savings: "Saves 3+ hours of backtracking",
    airlines: "TAP + Iberia",
    tip: "Lisbon → Porto → Seville → Madrid is the natural flow",
  },
  {
    package: "French Art de Vivre",
    flyIn: "Nice (NCE)",
    flyOut: "Paris (CDG)",
    savings: "Saves 6+ hours of backtracking",
    airlines: "Air France",
    tip: "TGV from Nice to Paris is 5.5 hours — scenic and comfortable",
  },
];

const mileagePrograms = [
  { program: "United MileagePlus", partner: "Star Alliance (Lufthansa, Swiss, TAP)", bestFor: "Basel/Zurich routes", value: "~1.5¢/mile" },
  { program: "American AAdvantage", partner: "Oneworld (British Airways, Iberia)", bestFor: "Madrid/Lisbon routes", value: "~1.4¢/mile" },
  { program: "Chase Ultimate Rewards", partner: "Transfers to United, Air France, etc.", bestFor: "Flexible redemptions", value: "~1.5–2¢/point" },
  { program: "Amex Membership Rewards", partner: "Transfers to Air France/KLM, Avianca", bestFor: "Paris routes (Air France)", value: "~1.5–2¢/point" },
];

const packingTips = [
  { category: "The One-Bag Rule", items: ["For Rhine cruise: pack once, stay on the ship — one carry-on + personal item is ideal", "For self-guided trips: a 40L backpack (Osprey Farpoint 40 or Away Bigger Carry-On) covers 14 days", "European cobblestones are brutal on wheeled luggage — a backpack is your friend"] },
  { category: "Clothing Strategy", items: ["3 pairs of pants (1 dressy, 2 casual)", "5–7 tops that mix and match", "1 smart blazer or jacket for dinners", "Comfortable walking shoes (Allbirds or Ecco) — non-negotiable", "1 pair of dressier shoes for evenings", "Packable rain jacket (March can be unpredictable)"] },
  { category: "Tech & Documents", items: ["Universal power adapter (Type C for Europe)", "Unlocked phone + local SIM or T-Mobile International Plan", "Passport valid 6+ months beyond return date", "Printed copies of hotel confirmations and travel insurance", "VPN app installed (useful for streaming US content)", "Google Translate app downloaded offline"] },
  { category: "Health & Wellness", items: ["Travel health insurance (GeoBlue or IMG Global recommended)", "Any prescription medications + 2-week extra supply", "Melatonin for jet lag (Las Vegas to Europe is 9 hours ahead)", "Comfortable walking insoles", "Small first aid kit"] },
];

const travelInsurance = [
  { provider: "GeoBlue Voyager", coverage: "Medical + Emergency Evacuation", price: "~$150–250 for 2 weeks", recommended: true, note: "Best for medical coverage — highly recommended for Europe" },
  { provider: "Allianz Travel", coverage: "Comprehensive (cancel, delay, medical)", price: "~$200–350 for 2 weeks", recommended: true, note: "Best all-around coverage including trip cancellation" },
  { provider: "Credit Card Coverage", coverage: "Varies by card (Chase Sapphire Preferred/Reserve)", price: "Free with card", recommended: false, note: "Good supplemental coverage but check medical limits" },
];

export default function Flights() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-accent text-xs tracking-[0.2em] uppercase text-gold block mb-4">Getting There & Back</span>
            <h1 className="font-display text-5xl md:text-7xl font-light text-ivory mb-6">
              Flights & <span className="text-gold italic">Logistics</span>
            </h1>
            <div className="gold-divider mx-auto mb-6" />
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From Las Vegas to Europe — the smartest flight strategies, open-jaw routing, mileage programs, packing tips, and travel insurance recommendations. Everything you need to get there in style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Flight Routes */}
      <section className="pb-16">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h2 className="font-display text-3xl font-light text-ivory mb-2">
              Flights from <span className="text-gold italic">Las Vegas (LAS)</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-6">Prices are estimates for late March / early April 2026. Book 3–4 months in advance for best rates.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {flightRoutes.map((route, i) => (
              <motion.div
                key={route.route}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${route.color}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{route.flag}</span>
                      <span className="font-accent text-xs tracking-widest uppercase text-gold/70">{route.dates}</span>
                    </div>
                    <h3 className="font-display text-xl font-light text-ivory">{route.route}</h3>
                    <p className="font-body text-xs text-muted-foreground">{route.airline}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl text-gold">{route.price}</div>
                    <div className="font-accent text-[0.6rem] tracking-widest uppercase text-muted-foreground">Round-trip</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  {[
                    { icon: Plane, value: route.stops },
                    { icon: Clock, value: route.duration },
                  ].map((stat, j) => (
                    <div key={j} className="glass-card rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                      <stat.icon size={12} className="text-gold" />
                      <span className="font-body text-xs text-ivory/80">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="glass-card-gold rounded-xl p-3 mb-3">
                  <p className="font-accent text-[0.6rem] tracking-widest uppercase text-gold/60 mb-1">Best For</p>
                  <p className="font-body text-xs text-ivory/80">{route.bestFor}</p>
                </div>

                <div className="flex items-start gap-2">
                  <Zap size={12} className="text-gold mt-0.5 flex-shrink-0" />
                  <p className="font-body text-xs text-muted-foreground italic">{route.tip}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Search CTA */}
          <div className="text-center mb-16">
            <a href="https://www.google.com/travel/flights" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-navy font-body font-medium px-6 py-3 rounded-full hover:bg-gold-light transition-all">
              Search Current Prices on Google Flights <ExternalLink size={16} />
            </a>
            <p className="font-body text-xs text-muted-foreground mt-3">Also check: Kayak, Scott's Cheap Flights, and Google Flights price alerts</p>
          </div>

          {/* Open-Jaw Strategy */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="font-display text-3xl font-light text-ivory mb-2">
              The <span className="text-gold italic">Open-Jaw</span> Strategy
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-6">Fly into one city, out of another — save hours of backtracking and see more destinations without retracing your steps.</p>

            <div className="space-y-4">
              {openJawStrategy.map((item, i) => (
                <motion.div
                  key={item.package}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-5"
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <p className="font-accent text-xs tracking-widest uppercase text-gold/70 mb-1">{item.package}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-lg text-ivory">{item.flyIn}</span>
                        <ArrowRight size={16} className="text-gold" />
                        <span className="font-display text-lg text-ivory">{item.flyOut}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <div className="glass-card-gold px-3 py-1.5 rounded-full">
                        <span className="font-body text-xs text-gold">{item.savings}</span>
                      </div>
                      <div className="glass-card px-3 py-1.5 rounded-full">
                        <span className="font-body text-xs text-ivory/70">{item.airlines}</span>
                      </div>
                    </div>
                  </div>
                  <p className="font-body text-xs text-muted-foreground mt-3 italic">{item.tip}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mileage Programs */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="font-display text-3xl font-light text-ivory mb-6">
              Miles & <span className="text-gold italic">Points</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full glass-card rounded-2xl overflow-hidden">
                <thead>
                  <tr className="border-b border-white/8">
                    {["Program", "Alliance/Partners", "Best For", "Value"].map(h => (
                      <th key={h} className="text-left p-4 font-accent text-xs tracking-widest uppercase text-gold/70">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mileagePrograms.map((row, i) => (
                    <tr key={row.program} className={i < mileagePrograms.length - 1 ? "border-b border-white/5" : ""}>
                      <td className="p-4 font-display text-ivory text-sm">{row.program}</td>
                      <td className="p-4 font-body text-xs text-muted-foreground">{row.partner}</td>
                      <td className="p-4 font-body text-xs text-ivory/80">{row.bestFor}</td>
                      <td className="p-4 font-display text-gold">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Packing Tips */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="font-display text-3xl font-light text-ivory mb-6">
              Packing <span className="text-gold italic">Smart</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {packingTips.map((section, i) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Luggage size={16} className="text-gold" />
                    <h3 className="font-display text-lg font-light text-ivory">{section.category}</h3>
                  </div>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <Star size={10} className="text-gold mt-1 flex-shrink-0 fill-gold" />
                        <p className="font-body text-xs text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Travel Insurance */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-light text-ivory mb-6">
              Travel <span className="text-gold italic">Insurance</span>
            </h2>
            <div className="space-y-4">
              {travelInsurance.map((ins) => (
                <div key={ins.provider} className={`glass-card rounded-2xl p-5 ${ins.recommended ? "border-gold/20" : ""}`}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Shield size={14} className="text-gold" />
                        <h3 className="font-display text-lg font-light text-ivory">{ins.provider}</h3>
                        {ins.recommended && (
                          <span className="glass-card-gold px-2 py-0.5 rounded-full font-accent text-[0.6rem] tracking-widest uppercase text-gold">Recommended</span>
                        )}
                      </div>
                      <p className="font-body text-xs text-muted-foreground">{ins.coverage}</p>
                    </div>
                    <div className="font-display text-lg text-gold">{ins.price}</div>
                  </div>
                  <p className="font-body text-xs text-ivory/60 mt-2 italic">{ins.note}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
