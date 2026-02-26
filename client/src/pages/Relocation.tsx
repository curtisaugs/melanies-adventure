/* 
  Design: The Modern European. Refined Glass & Gold
  Relocation: Visa pathways, cost of living, expat communities, practical steps
*/
import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, DollarSign, Users, Heart, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const visas = [
  {
    id: "portugal-d8",
    country: "Portugal",
    flag: "🇵🇹",
    name: "Digital Nomad Visa (D8)",
    tagline: "The easiest path for high-earning remote workers",
    difficulty: "Easy",
    difficultyColor: "text-green-400",
    duration: "2-year residence permit (renewable)",
    income: "€3,680/month minimum (4× Portuguese minimum wage)",
    processingTime: "2–4 months",
    pros: [
      "Clear pathway to permanent residency and citizenship (5 years)",
      "Access to the entire Schengen Area",
      "Portugal's NHR tax regime can significantly reduce taxes",
      "Thriving English-speaking expat community in Lisbon & Porto",
      "Relatively low cost of living vs. Western Europe",
      "Family members can be included",
    ],
    cons: [
      "Must stay 183+ days/year to maintain residency",
      "Processing times can be slow (AIMA appointments)",
      "Must open a Portuguese bank account before appointment",
      "Income must come from outside Portugal",
    ],
    steps: [
      "Gather documents: passport, proof of income (12 months), health insurance, accommodation proof",
      "Apply at the Portuguese Consulate in Los Angeles or San Francisco",
      "Obtain NIF (Portuguese Tax Number). can be done via representative",
      "Travel to Portugal on the issued visa",
      "Attend AIMA appointment to finalize 2-year residence permit",
      "Open Portuguese bank account",
    ],
    reloNote: "Melanie's CRO income at Vid Tech comfortably exceeds the €3,680/month minimum. This is the most straightforward visa for her situation if she continues working remotely.",
    url: "https://vistos.mne.gov.pt/en/national-visas/specific-visas/digital-nomad",
    color: "from-green-950/40 to-emerald-900/20",
  },
  {
    id: "spain-nlv",
    country: "Spain",
    flag: "🇪🇸",
    name: "Non-Lucrative Visa (NLV)",
    tagline: "For those with passive income who want to live the Spanish life",
    difficulty: "Moderate",
    difficultyColor: "text-yellow-400",
    duration: "1 year (renewable for 2-year periods)",
    income: "~€2,400/month passive income (400% IPREM)",
    processingTime: "1–3 months",
    pros: [
      "Allows long-term residency in Spain",
      "Does not require significant investment",
      "Path to permanent residency after 5 years",
      "Excellent quality of life, warm climate",
      "Strong expat communities in Barcelona, Madrid, Seville",
    ],
    cons: [
      "Prohibits any work in Spain (including remote work for Spanish companies)",
      "Must prove passive income (investments, rental income, savings)",
      "Requires comprehensive Spanish health insurance",
      "Documents must be apostilled and translated to Spanish",
    ],
    steps: [
      "Confirm passive income sources meet the threshold",
      "Obtain comprehensive Spanish health insurance",
      "Gather apostilled documents: criminal record, medical certificate, bank statements",
      "Apply at the Spanish Consulate in Los Angeles",
      "Enter Spain within 3 months of visa issuance",
      "Apply for Foreigner Identity Card (TIE) within 30 days of arrival",
    ],
    reloNote: "The NLV works if Melanie has investment income or savings. If she plans to continue working remotely for Vid Tech, she should consult a Spanish immigration lawyer. some remote workers use the NLV but this is technically a gray area.",
    url: "https://www.exteriores.gob.es/Consulados/losangeles/en/ServiciosConsulares/Pages/Consular/Non-lucrative-residence-visa.aspx",
    color: "from-red-950/40 to-orange-900/20",
  },
  {
    id: "france-tech",
    country: "France",
    flag: "🇫🇷",
    name: "French Tech Visa (Talent Passport)",
    tagline: "For tech executives, founders, and investors. Annie's country",
    difficulty: "Moderate",
    difficultyColor: "text-yellow-400",
    duration: "4-year renewable residence permit",
    income: "Varies by category (employee, founder, investor)",
    processingTime: "2–4 months",
    pros: [
      "4-year permit. the longest initial duration in Europe",
      "No separate work permit required for employees",
      "Family members included",
      "Annie is already in Paris. built-in support network",
      "Access to HEC Paris, INSEAD, and top French universities",
      "EU's 2nd largest economy with strong tech sector",
    ],
    cons: [
      "Strict eligibility. must work for a recognized innovative company",
      "Investor category requires €300,000 minimum investment",
      "French bureaucracy is notoriously complex",
      "Higher cost of living, especially in Paris",
      "French language skills become important for daily life",
    ],
    steps: [
      "Determine eligibility category (employee of innovative startup, founder, or investor)",
      "For employee: employer must be recognized as innovative by French Ministry",
      "Apply at the French Consulate in Los Angeles",
      "Obtain the 'Talent Passport' residence permit upon arrival",
      "Register with local prefecture within 3 months",
      "Consider enrolling in French language classes",
    ],
    reloNote: "Given Melanie's background in real estate drone technology, the French Tech Visa's investor or employee categories could be viable. The proximity to Annie in Paris makes this particularly compelling. Curtis's architecture background could also open doors in France's innovative urban development sector.",
    url: "https://www.welcometofrance.com/en/french-tech-visa",
    color: "from-blue-950/40 to-indigo-900/20",
  },
  {
    id: "germany-freelance",
    country: "Germany",
    flag: "🇩🇪",
    name: "Freelance / Self-Employment Visa",
    tagline: "For entrepreneurs and consultants in Germany's powerhouse economy",
    difficulty: "Hard",
    difficultyColor: "text-red-400",
    duration: "1–3 years (renewable)",
    income: "Must demonstrate viable business plan and sufficient income",
    processingTime: "3–6 months",
    pros: [
      "Germany is Europe's largest economy",
      "Strong tech and real estate sectors",
      "Excellent healthcare and infrastructure",
      "Path to permanent residency (Blue Card or Niederlassungserlaubnis)",
      "Rhine cruise embarkation point. great base for European travel",
    ],
    cons: [
      "Most complex visa process of the four options",
      "Requires proof of viable freelance business in Germany",
      "German language skills increasingly important",
      "Higher tax rates than Portugal or Spain",
      "Bureaucracy is extensive",
    ],
    steps: [
      "Develop a detailed business plan for German market",
      "Gather proof of qualifications and professional experience",
      "Apply at the German Consulate in Los Angeles",
      "Demonstrate financial stability and health insurance",
      "Register with local Einwohnermeldeamt (residents' office) upon arrival",
    ],
    reloNote: "Germany is less likely as a primary relocation destination given the complexity, but worth considering if Melanie wants to be near the Rhine cruise region (Cologne, Frankfurt, Basel) or pursue studies at a German university.",
    url: "https://www.make-it-in-germany.com/en/visa-residence/types/self-employed",
    color: "from-gray-950/40 to-slate-900/20",
  },
];

const costComparison = [
  { city: "Las Vegas", country: "USA", rent1br: "$1,400", dining: "$50", total: "$4,500", totalUSD: 4500, flag: "🇺🇸" },
  { city: "Lisbon", country: "Portugal", rent1br: "€900", dining: "€25", total: "~$2,950", totalUSD: 2950, flag: "🇵🇹" },
  { city: "Porto", country: "Portugal", rent1br: "€700", dining: "€20", total: "~$2,320", totalUSD: 2320, flag: "🇵🇹" },
  { city: "Barcelona", country: "Spain", rent1br: "€1,100", dining: "€30", total: "~$3,370", totalUSD: 3370, flag: "🇪🇸" },
  { city: "Seville", country: "Spain", rent1br: "€800", dining: "€25", total: "~$2,740", totalUSD: 2740, flag: "🇪🇸" },
  { city: "Nice", country: "France", rent1br: "€1,300", dining: "€40", total: "~$4,000", totalUSD: 4000, flag: "🇫🇷" },
  { city: "Paris", country: "France", rent1br: "€1,800", dining: "€45", total: "~$5,480", totalUSD: 5480, flag: "🇫🇷" },
];

export default function Relocation() {
  const [activeVisa, setActiveVisa] = useState("portugal-d8");
  const selectedVisa = visas.find(v => v.id === activeVisa)!;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-accent text-xs tracking-[0.2em] uppercase text-teal block mb-4">The Next Chapter</span>
            <h1 className="font-display text-5xl md:text-7xl font-light text-ivory mb-6">
              European <span className="text-teal italic">Relocation</span>
            </h1>
            <div className="mx-auto mb-6 w-16 h-px bg-gradient-to-r from-transparent via-teal to-transparent" />
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Four visa pathways, seven cities compared, and the practical steps to make the move. This is the reconnaissance mission. the birthday trip is the scouting expedition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visa Selector */}
      <section className="pb-16">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h2 className="font-display text-3xl font-light text-ivory mb-6">
              <span className="text-teal">Visa</span> Pathways
            </h2>
            <div className="flex flex-wrap gap-3 mb-8">
              {visas.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVisa(v.id)}
                  className={`px-4 py-2 rounded-full font-body text-sm transition-all ${
                    activeVisa === v.id
                      ? "bg-teal text-navy font-medium"
                      : "glass-card text-muted-foreground hover:text-ivory"
                  }`}
                >
                  {v.flag} {v.country}
                </button>
              ))}
            </div>

            {/* Selected Visa Detail */}
            <motion.div
              key={selectedVisa.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass-card rounded-3xl p-6 md:p-8 bg-gradient-to-br ${selectedVisa.color}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{selectedVisa.flag}</span>
                    <div>
                      <h3 className="font-display text-2xl font-light text-ivory">{selectedVisa.name}</h3>
                      <p className="font-body text-sm italic text-teal/80">{selectedVisa.tagline}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Difficulty", value: selectedVisa.difficulty, color: selectedVisa.difficultyColor },
                    { label: "Duration", value: selectedVisa.duration, color: "text-ivory" },
                    { label: "Processing", value: selectedVisa.processingTime, color: "text-ivory" },
                  ].map((stat) => (
                    <div key={stat.label} className="glass-card px-3 py-2 rounded-xl text-center">
                      <p className="font-accent text-[0.6rem] tracking-widest uppercase text-teal/50">{stat.label}</p>
                      <p className={`font-body text-xs font-medium ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={14} className="text-teal" />
                  <span className="font-accent text-xs tracking-widest uppercase text-teal/70">Income Requirement</span>
                </div>
                <p className="font-body text-sm text-ivory/80">{selectedVisa.income}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle size={14} className="text-green-400" />
                    <span className="font-accent text-xs tracking-widest uppercase text-green-400/70">Pros</span>
                  </div>
                  <div className="space-y-2">
                    {selectedVisa.pros.map((p) => (
                      <div key={p} className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="font-body text-xs text-ivory/80">{p}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle size={14} className="text-amber-400" />
                    <span className="font-accent text-xs tracking-widest uppercase text-amber-400/70">Considerations</span>
                  </div>
                  <div className="space-y-2">
                    {selectedVisa.cons.map((c) => (
                      <div key={c} className="flex items-start gap-2">
                        <AlertCircle size={12} className="text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="font-body text-xs text-ivory/80">{c}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={14} className="text-teal" />
                  <span className="font-accent text-xs tracking-widest uppercase text-teal/70">Application Steps</span>
                </div>
                <div className="space-y-2">
                  {selectedVisa.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="font-accent text-xs text-teal/60 mt-0.5 w-4 flex-shrink-0">{i + 1}.</span>
                      <p className="font-body text-xs text-ivory/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-xl p-4 mb-4 border border-teal/20 bg-teal/5">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={14} className="text-rose" />
                  <span className="font-accent text-xs tracking-widest uppercase text-rose">Melanie's Note</span>
                </div>
                <p className="font-body text-sm text-ivory/80 leading-relaxed">{selectedVisa.reloNote}</p>
              </div>

              <a href={selectedVisa.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-teal hover:opacity-80 transition-colors font-body text-sm">
                Official Visa Information <ExternalLink size={14} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cost of Living Comparison */}
      <section className="py-16 border-t border-white/8">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-light text-ivory mb-2">
              Cost of Living <span className="text-coral italic">Comparison</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-8">Monthly estimates for a comfortable single-person lifestyle (1BR apartment, dining out regularly, transport, entertainment)</p>

            <div className="overflow-x-auto">
              <table className="w-full glass-card rounded-2xl overflow-hidden">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left p-4 font-accent text-xs tracking-widest uppercase text-coral/70">City</th>
                    <th className="text-left p-4 font-accent text-xs tracking-widest uppercase text-coral/70">1BR Rent</th>
                    <th className="text-left p-4 font-accent text-xs tracking-widest uppercase text-coral/70">Dining Out</th>
                    <th className="text-left p-4 font-accent text-xs tracking-widest uppercase text-coral/70">Monthly Total</th>
                    <th className="text-left p-4 font-accent text-xs tracking-widest uppercase text-coral/70">vs. Las Vegas</th>
                  </tr>
                </thead>
                <tbody>
                  {costComparison.map((row, i) => {
                    const lvTotal = 4500;
                    const rowTotal = row.totalUSD;
                    const diff = Math.round(((rowTotal - lvTotal) / lvTotal) * 100);
                    const isLV = row.city === "Las Vegas";
                    return (
                      <tr key={row.city} className={i < costComparison.length - 1 ? "border-b border-white/5" : ""}>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span>{row.flag}</span>
                            <div>
                              <p className="font-display text-ivory text-sm">{row.city}</p>
                              <p className="font-body text-xs text-muted-foreground">{row.country}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-body text-sm text-ivory/80">{row.rent1br}/mo</td>
                        <td className="p-4 font-body text-sm text-ivory/80">{row.dining}/meal</td>
                        <td className="p-4 font-display text-coral">{row.total}/mo</td>
                        <td className="p-4">
                          {isLV ? (
                            <span className="font-accent text-xs text-muted-foreground">Baseline</span>
                          ) : (
                            <span className={`font-body text-xs font-medium ${diff < 0 ? "text-green-400" : "text-amber-400"}`}>
                              {diff < 0 ? `${Math.abs(diff)}% cheaper` : `${diff}% more`}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expat Community Notes */}
      <section className="py-16 border-t border-white/8">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-light text-ivory mb-8">
              Expat <span className="text-lavender italic">Community</span> Notes
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  city: "Lisbon & Porto",
                  flag: "🇵🇹",
                  note: "Portugal has the most welcoming expat infrastructure in Europe. Internations Lisbon has 10,000+ members. The American community is particularly strong in Príncipe Real (Lisbon) and Bonfim (Porto). English is widely spoken, especially in tech and business circles.",
                },
                {
                  city: "Barcelona & Madrid",
                  flag: "🇪🇸",
                  note: "Spain's expat communities are large and well-established. Barcelona's Gràcia and Eixample neighborhoods are expat hubs. Madrid's Chamberí is popular with professionals. Both cities have active American Chambers of Commerce and English-language social networks.",
                },
                {
                  city: "Paris & Nice",
                  flag: "🇫🇷",
                  note: "France has the most complex bureaucracy but the most personal reward. especially with Annie already in Paris. The American Community in France (ACF) is the oldest American organization in Europe. Nice's English-speaking community is large and active, particularly among retirees and remote workers.",
                },
              ].map((item) => (
                <div key={item.city} className="glass-card rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{item.flag}</span>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-lavender" />
                      <h3 className="font-display text-lg font-light text-ivory">{item.city}</h3>
                    </div>
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.note}</p>
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
