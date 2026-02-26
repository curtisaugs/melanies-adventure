import { motion } from "framer-motion";
import { Plane, Clock, DollarSign, Info } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const routes = [
  {
    destination: "Paris (CDG)",
    flag: "🇫🇷",
    airlines: ["Air France", "Delta", "United", "Norwegian"],
    direct: true,
    flightTime: "~10h 30min",
    priceRange: "$923–$1,400",
    bestTime: "Book 3–4 months ahead for March/April",
    tip: "Air France direct from LAX to CDG is the most comfortable option. Arrive in Paris, see Annie, then continue by TGV.",
    openJaw: "Fly into Paris, out of Lisbon or Madrid — saves backtracking",
  },
  {
    destination: "Lisbon (LIS)",
    flag: "🇵🇹",
    airlines: ["TAP Air Portugal", "United (via EWR)", "Iberia (via MAD)"],
    direct: false,
    flightTime: "~14–16h (1 stop)",
    priceRange: "$850–$1,300",
    bestTime: "Book 3–4 months ahead",
    tip: "TAP Air Portugal via Lisbon is the most direct. United via Newark is often cheapest. Consider flying into Madrid and taking the train to Lisbon (9h, scenic).",
    openJaw: "Fly into Lisbon, out of Madrid — covers the full Iberian route",
  },
  {
    destination: "Madrid (MAD)",
    flag: "🇪🇸",
    airlines: ["Iberia", "American", "Delta (via ATL)", "Level"],
    direct: true,
    flightTime: "~11h",
    priceRange: "$880–$1,350",
    bestTime: "Spring fares are competitive; book by December",
    tip: "Iberia direct from LAX to MAD is excellent. Level (Iberia's budget arm) sometimes has deals under $600 one-way.",
    openJaw: "Fly into Madrid, out of Lisbon — or vice versa",
  },
  {
    destination: "Nice (NCE)",
    flag: "🇫🇷",
    airlines: ["Air France (via CDG)", "British Airways (via LHR)", "Lufthansa (via FRA)"],
    direct: false,
    flightTime: "~14–16h (1 stop)",
    priceRange: "$950–$1,500",
    bestTime: "Book 4 months ahead for spring",
    tip: "Fly into Nice, take the TGV to Paris at the end. Or fly into Paris, take the TGV to Nice (5h30min) — often cheaper and more scenic.",
    openJaw: "Fly into Nice, out of Paris — the French Art de Vivre route",
  },
  {
    destination: "Athens (ATH)",
    flag: "🇬🇷",
    airlines: ["Lufthansa (via FRA)", "British Airways (via LHR)", "Air France (via CDG)"],
    direct: false,
    flightTime: "~15–17h (1 stop)",
    priceRange: "$900–$1,400",
    bestTime: "Book 3–4 months ahead",
    tip: "Combine with an Iberian or French trip: fly into Athens, explore Greece, then fly to Lisbon or Paris for the second leg.",
    openJaw: "Fly into Athens, out of Lisbon — a grand European loop",
  },
];

const trainRoutes = [
  { from: "Paris", to: "Nice", time: "5h 30min", operator: "TGV (SNCF)", price: "€45–120", note: "Book on SNCF.com — early booking gets best prices" },
  { from: "Paris", to: "Lisbon", time: "~10h (overnight)", operator: "Renfe + SNCF", price: "€80–150", note: "Overnight sleeper available; scenic through Spain" },
  { from: "Madrid", to: "Seville", time: "2h 30min", operator: "AVE (Renfe)", price: "€30–90", note: "Spain's high-speed rail is excellent" },
  { from: "Seville", to: "Lisbon", time: "~6h (bus or train)", operator: "Renfe + CP", price: "€25–60", note: "Slower but scenic; bus is often faster" },
  { from: "Lisbon", to: "Porto", time: "2h 45min", operator: "Alfa Pendular (CP)", price: "€20–40", note: "Portugal's intercity rail is comfortable and affordable" },
  { from: "Florence", to: "Rome", time: "1h 30min", operator: "Frecciarossa (Trenitalia)", price: "€20–60", note: "Italy's high-speed rail is one of Europe's best" },
  { from: "Naples", to: "Rome", time: "1h 10min", operator: "Frecciarossa (Trenitalia)", price: "€15–50", note: "Base for Amalfi Coast day trips" },
  { from: "Athens", to: "Thessaloniki", time: "4h 30min", operator: "Hellenic Train (OSE)", price: "€20–45", note: "Scenic route through Greek countryside" },
];

const budgetBreakdown = [
  { item: "Round-trip flights (2 people, economy)", low: "$1,846", mid: "$2,800", high: "$4,000", note: "LAX to primary destination and back" },
  { item: "Hotels (14 nights, 3–4★)", low: "$2,800", mid: "$4,200", high: "$7,000", note: "Boutique hotels; Airbnb saves 30–40%" },
  { item: "Internal transport (trains + local)", low: "$400", mid: "$700", high: "$1,200", note: "Eurail pass or point-to-point tickets" },
  { item: "Food & dining", low: "$1,400", mid: "$2,100", high: "$3,500", note: "Mix of markets, bistros, and one splurge dinner" },
  { item: "Activities & museums", low: "$300", mid: "$500", high: "$800", note: "Museum passes, tours, flamenco show" },
  { item: "Miscellaneous (shopping, tips, etc.)", low: "$500", mid: "$800", high: "$1,500", note: "Melanie's shoe budget not included" },
];

export default function Flights() {
  return (
    <div className="min-h-screen bg-navy text-ivory">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>
              From Los Angeles to Europe
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-light text-ivory mt-3 mb-6">
              Flights & <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Logistics</span>
            </h1>
            <p className="font-body text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--muted)" }}>
              Everything you need to get from LAX to your European adventure — flight options, train connections, and a full budget breakdown. All prices are estimates for March–May 2026 travel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* LAX Notice */}
      <section className="pb-8">
        <div className="container max-w-3xl">
          <div className="glass-card-gold rounded-2xl p-5 flex items-start gap-4">
            <Info size={18} className="flex-shrink-0 mt-0.5" style={{ color: "var(--gold)" }} />
            <div>
              <p className="font-accent text-xs tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>Departure Airport</p>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                All flights are from <strong className="text-ivory">Los Angeles International Airport (LAX)</strong>. LAX has excellent connections to all major European hubs. Terminal B (Tom Bradley International) handles most international departures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flight Routes */}
      <section className="pb-16">
        <div className="container">
          <h2 className="font-display text-3xl font-light text-ivory mb-8">
            Direct & Connecting <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Flights</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {routes.map((route, i) => (
              <motion.div key={route.destination} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="glass-card rounded-2xl p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="font-body text-2xl mr-2">{route.flag}</span>
                      <span className="font-display text-xl font-light text-ivory">{route.destination}</span>
                    </div>
                    <span className="glass-card px-2 py-1 rounded-full font-accent text-[0.6rem] tracking-widest uppercase"
                      style={{ color: route.direct ? "#4ade80" : "rgba(240,235,220,0.5)" }}>
                      {route.direct ? "Direct Available" : "1 Stop"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="glass-card rounded-xl p-3 text-center">
                      <Clock size={12} className="mx-auto mb-1" style={{ color: "var(--gold)" }} />
                      <div className="font-body text-xs text-ivory">{route.flightTime}</div>
                    </div>
                    <div className="glass-card rounded-xl p-3 text-center">
                      <DollarSign size={12} className="mx-auto mb-1" style={{ color: "var(--gold)" }} />
                      <div className="font-body text-xs text-ivory">{route.priceRange}</div>
                    </div>
                    <div className="glass-card rounded-xl p-3 text-center">
                      <Plane size={12} className="mx-auto mb-1" style={{ color: "var(--gold)" }} />
                      <div className="font-body text-xs text-ivory">{route.airlines[0]}</div>
                    </div>
                  </div>

                  <p className="font-body text-xs leading-relaxed mb-3" style={{ color: "var(--muted)" }}>{route.tip}</p>

                  <div className="glass-card rounded-lg p-3" style={{ borderColor: "rgba(180,150,80,0.15)" }}>
                    <p className="font-accent text-[0.55rem] tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>Open-Jaw Strategy</p>
                    <p className="font-body text-xs" style={{ color: "var(--muted)" }}>{route.openJaw}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Train Routes */}
      <section className="py-16" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="container">
          <h2 className="font-display text-3xl font-light text-ivory mb-8">
            Getting Around by <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Train</span>
          </h2>
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    {["Route", "Journey Time", "Operator", "Price", "Booking Tip"].map(h => (
                      <th key={h} className="p-4 text-left font-accent text-xs tracking-widest uppercase whitespace-nowrap"
                        style={{ color: "var(--gold)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trainRoutes.map((r, i) => (
                    <tr key={`${r.from}-${r.to}`} style={{ borderBottom: i < trainRoutes.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                      <td className="p-4 font-body text-sm text-ivory whitespace-nowrap">{r.from} → {r.to}</td>
                      <td className="p-4 font-body text-sm text-ivory">{r.time}</td>
                      <td className="p-4 font-body text-sm" style={{ color: "var(--muted)" }}>{r.operator}</td>
                      <td className="p-4 font-body text-sm font-medium" style={{ color: "var(--gold)" }}>{r.price}</td>
                      <td className="p-4 font-body text-xs" style={{ color: "var(--muted)" }}>{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Breakdown */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-3xl font-light text-ivory mb-4">
            Full Trip <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Budget</span>
          </h2>
          <p className="font-body text-sm mb-8" style={{ color: "var(--muted)" }}>
            Estimates for 2 people, 14 nights. Curtis's gift covers the base tier — Melanie can upgrade from there.
          </p>
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    {["Item", "Budget", "Mid-Range", "Luxury", "Notes"].map(h => (
                      <th key={h} className="p-4 text-left font-accent text-xs tracking-widest uppercase whitespace-nowrap"
                        style={{ color: "var(--gold)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {budgetBreakdown.map((row, i) => (
                    <tr key={row.item} style={{ borderBottom: i < budgetBreakdown.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                      <td className="p-4 font-body text-sm text-ivory">{row.item}</td>
                      <td className="p-4 font-body text-sm" style={{ color: "#4ade80" }}>{row.low}</td>
                      <td className="p-4 font-body text-sm" style={{ color: "var(--gold)" }}>{row.mid}</td>
                      <td className="p-4 font-body text-sm" style={{ color: "#f87171" }}>{row.high}</td>
                      <td className="p-4 font-body text-xs" style={{ color: "var(--muted)" }}>{row.note}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: "2px solid rgba(180,150,80,0.3)", background: "rgba(180,150,80,0.05)" }}>
                    <td className="p-4 font-body text-sm font-bold text-ivory">TOTAL (2 people)</td>
                    <td className="p-4 font-body text-sm font-bold" style={{ color: "#4ade80" }}>~$7,246</td>
                    <td className="p-4 font-body text-sm font-bold" style={{ color: "var(--gold)" }}>~$11,100</td>
                    <td className="p-4 font-body text-sm font-bold" style={{ color: "#f87171" }}>~$19,000</td>
                    <td className="p-4 font-body text-xs" style={{ color: "var(--muted)" }}>Curtis covers ~$5k base</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
