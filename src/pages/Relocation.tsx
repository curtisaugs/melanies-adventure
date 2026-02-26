import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, DollarSign, Home, CheckCircle, AlertCircle } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const visas = [
  {
    id: "portugal-d8",
    country: "Portugal", flag: "🇵🇹",
    name: "D8 Digital Nomad Visa",
    tagline: "Europe's most welcoming visa for remote professionals",
    difficulty: "Easy",
    timeline: "4–8 weeks",
    income: "~$3,040/mo (4× minimum wage)",
    duration: "1 year, renewable → permanent residency after 5 years",
    color: "from-emerald-900/30 to-emerald-800/10",
    pros: ["Lowest income threshold of any EU digital nomad visa", "NHR tax regime: 10% flat tax on foreign income for 10 years", "Path to EU citizenship in 5 years", "English widely spoken; large US expat community", "Annie's Paris is 2h by plane"],
    cons: ["Portugal's cost of living rising fast (still cheaper than France/Germany)", "Bureaucracy can be slow — hire a local lawyer", "Healthcare requires private insurance initially"],
    steps: ["Gather documents: passport, proof of income, health insurance, clean criminal record", "Apply at Portuguese consulate in Los Angeles", "Receive D8 visa (allows entry)", "Register at local Câmara Municipal within 3 days of arrival", "Apply for residence permit at SEF/AIMA office", "Register for NHR tax status within 6 months"],
    bestFor: "Melanie's CRO role at Vid Tech qualifies easily. Remote work for a US company is perfect.",
  },
  {
    id: "spain-nlv",
    country: "Spain", flag: "🇪🇸",
    name: "Non-Lucrative Visa (NLV)",
    tagline: "For those with passive income or savings who want the Spanish lifestyle",
    difficulty: "Moderate",
    timeline: "2–3 months",
    income: "$27,115/year + $6,778/year per dependent",
    duration: "1 year, renewable → permanent residency after 5 years",
    color: "from-amber-900/30 to-amber-800/10",
    pros: ["Access to Spain's excellent public healthcare after 1 year", "Incredible quality of life: food, climate, culture", "IE Business School in Madrid: top global EMBA", "Spain's startup visa available if launching a PropTech venture"],
    cons: ["Cannot work for Spanish companies on NLV (remote work for US companies is a grey area)", "Higher income requirement than Portugal", "Spanish bureaucracy is notoriously slow"],
    steps: ["Obtain FBI background check (apostilled)", "Prove financial means: bank statements showing $27k+", "Get private health insurance covering Spain", "Apply at Spanish consulate in Los Angeles", "Travel to Spain within 90 days of visa issuance", "Apply for TIE (residence card) within 30 days of arrival"],
    bestFor: "Best if Melanie wants to slow down and enjoy life. Not ideal if she wants to continue active CRO work.",
  },
  {
    id: "france-tech",
    country: "France", flag: "🇫🇷",
    name: "Passeport Talent — Salarié Qualifié",
    tagline: "For senior executives and highly qualified professionals",
    difficulty: "Moderate",
    timeline: "2–4 months",
    income: "€38,616/year (1.5× average French salary)",
    duration: "4 years, renewable → permanent residency",
    color: "from-purple-900/30 to-purple-800/10",
    pros: ["4-year multi-entry visa (most generous in Europe)", "Annie and Thomas are already in Paris", "INSEAD & HEC Paris within 30–45 minutes", "Europe's largest PropTech ecosystem", "Family members get matching visa automatically"],
    cons: ["Highest income threshold", "French bureaucracy (préfecture) is notoriously complex", "French language helpful but not required at executive level"],
    steps: ["Secure a French employer or prove senior executive status", "Gather: passport, diplomas, employment contract or proof of status", "Apply at French consulate in Los Angeles", "Receive visa; travel to France", "Register at préfecture within 3 months for titre de séjour", "Consider hiring a relocation specialist — worth every euro"],
    bestFor: "Best if Melanie pursues INSEAD or HEC, or joins a French PropTech company. Annie nearby is a huge bonus.",
  },
  {
    id: "greece-dnv",
    country: "Greece", flag: "🇬🇷",
    name: "Digital Nomad Visa + 50% Tax Incentive",
    tagline: "Europe's most generous tax deal for remote workers",
    difficulty: "Easy–Moderate",
    timeline: "4–8 weeks",
    income: "€3,500/month minimum",
    duration: "1 year, renewable",
    color: "from-blue-900/30 to-blue-800/10",
    pros: ["50% income tax exemption for 7 years — the best tax deal in Europe", "Athens is one of Europe's most affordable capitals", "Greece's Golden Visa: €250k real estate investment for permanent residency", "Incredible quality of life: Mediterranean climate, food, history", "Growing startup scene in Athens"],
    cons: ["Greece's bureaucracy can be challenging", "Less developed PropTech ecosystem than Portugal/Spain/France", "Healthcare quality varies; private insurance recommended"],
    steps: ["Prove income: €3,500/mo from non-Greek sources", "Apply at Greek consulate in Los Angeles", "Arrive in Greece; register with local municipality", "Apply for tax incentive at Greek tax authority (AADE)", "Enjoy 50% tax discount for 7 years"],
    bestFor: "Best for Melanie if she wants maximum tax efficiency and a Mediterranean lifestyle. Athens's real estate market is also interesting for a PropTech professional.",
  },
];

const costData = [
  { city: "Lisbon", flag: "🇵🇹", rent2br: "$1,800–2,500", groceries: "$350", dining: "$600", transport: "$80", utilities: "$120", total: "$2,950–3,650", vsLV: "-18%" },
  { city: "Porto", flag: "🇵🇹", rent2br: "$1,200–1,800", groceries: "$300", dining: "$500", transport: "$70", utilities: "$110", total: "$2,180–2,780", vsLV: "-35%" },
  { city: "Seville", flag: "🇪🇸", rent2br: "$900–1,400", groceries: "$320", dining: "$550", transport: "$75", utilities: "$130", total: "$1,975–2,475", vsLV: "-42%" },
  { city: "Madrid", flag: "🇪🇸", rent2br: "$1,400–2,200", groceries: "$380", dining: "$700", transport: "$90", utilities: "$140", total: "$2,710–3,510", vsLV: "-20%" },
  { city: "Nice", flag: "🇫🇷", rent2br: "$1,500–2,500", groceries: "$420", dining: "$800", transport: "$85", utilities: "$160", total: "$2,965–3,965", vsLV: "-8%" },
  { city: "Paris", flag: "🇫🇷", rent2br: "$2,200–3,500", groceries: "$450", dining: "$900", transport: "$100", utilities: "$180", total: "$3,830–5,130", vsLV: "+15%" },
  { city: "Florence", flag: "🇮🇹", rent2br: "$1,200–1,800", groceries: "$360", dining: "$650", transport: "$75", utilities: "$130", total: "$2,415–3,015", vsLV: "-30%" },
  { city: "Athens", flag: "🇬🇷", rent2br: "$800–1,400", groceries: "$290", dining: "$480", transport: "$65", utilities: "$110", total: "$1,745–2,345", vsLV: "-46%" },
];

const LV_BASELINE = 3350; // Average monthly spend for couple in Las Vegas

export default function Relocation() {
  const [activeVisa, setActiveVisa] = useState("portugal-d8");
  const selectedVisa = visas.find(v => v.id === activeVisa) || visas[0];

  return (
    <div className="min-h-screen bg-navy text-ivory">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>
              Your Path to Europe
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-light text-ivory mt-3 mb-6">
              Relocation <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Guide</span>
            </h1>
            <p className="font-body text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--muted)" }}>
              Four visa pathways, eight cost-of-living comparisons, and everything you need to know about making Europe your home base. All researched specifically for a senior executive with remote income.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visa Selector */}
      <section className="pb-8">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {visas.map((v) => (
              <button key={v.id} onClick={() => setActiveVisa(v.id)}
                className="flex items-center gap-2 px-5 py-3 rounded-full font-body text-sm transition-all"
                style={{
                  background: activeVisa === v.id ? "var(--gold)" : "rgba(255,255,255,0.04)",
                  color: activeVisa === v.id ? "var(--navy)" : "rgba(240,235,220,0.7)",
                  border: `1px solid ${activeVisa === v.id ? "var(--gold)" : "rgba(255,255,255,0.08)"}`,
                }}>
                <span>{v.flag}</span> {v.name.split("—")[0].trim()}
              </button>
            ))}
          </div>

          {/* Visa Detail */}
          <motion.div key={selectedVisa.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}>
            <div className={`glass-card rounded-3xl overflow-hidden bg-gradient-to-br ${selectedVisa.color}`}>
              <div className="p-8 md:p-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="font-body text-3xl mb-2">{selectedVisa.flag}</div>
                    <h2 className="font-display text-3xl font-light text-ivory mb-1">{selectedVisa.name}</h2>
                    <p className="font-body text-sm" style={{ color: "var(--muted)" }}>{selectedVisa.tagline}</p>
                  </div>
                  <span className="glass-card-gold px-3 py-1.5 rounded-full font-accent text-xs tracking-widest uppercase"
                    style={{ color: "var(--gold)" }}>{selectedVisa.difficulty}</span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: FileText, label: "Processing Time", value: selectedVisa.timeline },
                    { icon: DollarSign, label: "Income Requirement", value: selectedVisa.income },
                    { icon: Home, label: "Duration", value: selectedVisa.duration },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="glass-card rounded-xl p-4">
                      <Icon size={16} className="mb-2" style={{ color: "var(--gold)" }} />
                      <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "rgba(180,150,80,0.7)" }}>{label}</div>
                      <div className="font-body text-sm text-ivory">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-accent text-xs tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Pros</h3>
                    <ul className="space-y-2">
                      {selectedVisa.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle size={13} className="mt-0.5 flex-shrink-0" style={{ color: "#4ade80" }} />
                          <span className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-accent text-xs tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Cons</h3>
                    <ul className="space-y-2">
                      {selectedVisa.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <AlertCircle size={13} className="mt-0.5 flex-shrink-0" style={{ color: "#f87171" }} />
                          <span className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-accent text-xs tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Step-by-Step Process</h3>
                  <div className="space-y-3">
                    {selectedVisa.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-body text-xs font-bold"
                          style={{ background: "rgba(180,150,80,0.2)", color: "var(--gold)", border: "1px solid rgba(180,150,80,0.3)" }}>
                          {i + 1}
                        </div>
                        <span className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-xl p-5" style={{ borderColor: "rgba(180,150,80,0.2)" }}>
                  <p className="font-accent text-[0.6rem] tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>
                    Why This Works for Melanie
                  </p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{selectedVisa.bestFor}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cost of Living */}
      <section className="py-20" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-light text-ivory mb-4">
              Cost of Living <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Comparison</span>
            </h2>
            <p className="font-body text-sm" style={{ color: "var(--muted)" }}>
              Monthly estimates for a couple. Las Vegas baseline: ~$3,350/month. All figures in USD equivalent.
            </p>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    {["City", "2BR Rent", "Groceries", "Dining Out", "Transport", "Utilities", "Monthly Total", "vs. Las Vegas"].map((h) => (
                      <th key={h} className="p-4 text-left font-accent text-xs tracking-widest uppercase whitespace-nowrap"
                        style={{ color: "var(--gold)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costData.map((row, i) => {
                    const isPositive = row.vsLV.startsWith("+");
                    return (
                      <tr key={row.city} style={{ borderBottom: i < costData.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                        <td className="p-4">
                          <span className="font-body text-base mr-2">{row.flag}</span>
                          <span className="font-body text-sm text-ivory font-medium">{row.city}</span>
                        </td>
                        <td className="p-4 font-body text-sm text-ivory">{row.rent2br}</td>
                        <td className="p-4 font-body text-sm text-ivory">{row.groceries}</td>
                        <td className="p-4 font-body text-sm text-ivory">{row.dining}</td>
                        <td className="p-4 font-body text-sm text-ivory">{row.transport}</td>
                        <td className="p-4 font-body text-sm text-ivory">{row.utilities}</td>
                        <td className="p-4 font-body text-sm font-medium text-ivory">{row.total}</td>
                        <td className="p-4">
                          <span className="font-body text-sm font-bold px-2 py-1 rounded-full"
                            style={{
                              color: isPositive ? "#f87171" : "#4ade80",
                              background: isPositive ? "rgba(248,113,113,0.1)" : "rgba(74,222,128,0.1)",
                            }}>
                            {row.vsLV}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className="font-body text-xs text-center mt-4" style={{ color: "rgba(240,235,220,0.3)" }}>
            * Paris shows +15% vs Las Vegas due to higher rent in central arrondissements. Outer neighborhoods are comparable.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
