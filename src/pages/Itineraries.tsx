import { Link } from "wouter";
import { motion } from "framer-motion";
import { Ship, Map, Palette, ArrowRight, Check, Star } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const packages = [
  {
    id: "rhine",
    icon: Ship,
    tag: "All-Inclusive Luxury",
    title: "AmaWaterways Enchanting Rhine",
    subtitle: "Basel, Switzerland → Amsterdam, Netherlands",
    duration: "7 nights / 8 days",
    price: "From $4,349 per person",
    departure: "March 26, 2026 — Melanie's Birthday Departure",
    color: "from-blue-900/30 to-blue-800/10",
    borderColor: "rgba(100,150,220,0.2)",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/118915275/dspOjTQxYYonioWF.png",
    highlights: [
      "Basel (Switzerland) → Breisach/Colmar (France) → Strasbourg → Heidelberg → Rüdesheim → Cologne → Amsterdam",
      "All meals, premium beverages, and shore excursions included",
      "AmaLucia ship: 156 guests, twin balcony suites, Chef's Table, spa",
      "Birthday departure: board in Basel on March 26th",
      "Relocation scout stops: Strasbourg (EU institutions), Amsterdam (expat hub)",
    ],
    inclusions: ["All meals & beverages", "Shore excursions daily", "Port charges & gratuities", "Wi-Fi onboard", "Complimentary bikes"],
    reloNote: "Strasbourg is home to the European Parliament. Amsterdam has one of Europe's largest expat communities and a thriving PropTech scene.",
    detailLink: "/rhine-cruise",
  },
  {
    id: "iberian",
    icon: Map,
    tag: "Self-Guided Boutique",
    title: "Iberian Explorer",
    subtitle: "Lisbon → Porto → Seville → Madrid",
    duration: "10–14 days",
    price: "~$3,500 per person",
    departure: "Flexible — April/May 2026 recommended",
    color: "from-amber-900/30 to-amber-800/10",
    borderColor: "rgba(220,160,80,0.2)",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/118915275/SuJtqqfJKhuEfqWd.jpg",
    highlights: [
      "Fly into Lisbon, out of Madrid — open-jaw ticket strategy",
      "Lisbon: Alfama, Belém Tower, Sintra day trip, NIF registration",
      "Porto: Douro Valley wine cruise, Livraria Lello, azulejo tiles",
      "Seville: Real Alcázar, flamenco show, tapas crawl in Triana",
      "Madrid: Prado Museum, Retiro Park, Gran Vía, Reina Sofía",
    ],
    inclusions: ["Boutique hotels (3–4★)", "High-speed train Seville→Madrid", "Key museum entries", "1 flamenco show", "Douro Valley wine tour"],
    reloNote: "Portugal's D8 Digital Nomad Visa is the easiest EU entry point for US remote workers. Lisbon's PropTech scene is booming. Spain's Non-Lucrative Visa suits CRO-level executives.",
    detailLink: "/itineraries",
  },
  {
    id: "france",
    icon: Palette,
    tag: "Cultural Immersion",
    title: "French Art de Vivre",
    subtitle: "Nice → Provence → Lyon → Paris",
    duration: "10–14 days",
    price: "~$3,200 per person",
    departure: "Flexible — April/May 2026 recommended",
    color: "from-purple-900/30 to-purple-800/10",
    borderColor: "rgba(160,100,200,0.2)",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/118915275/oMZyNBpgjjLicSRc.jpg",
    highlights: [
      "Fly into Nice CDG, end in Paris — reunion with Annie & Thomas",
      "Nice: Promenade des Anglais, Cours Saleya market, Monaco day trip",
      "Provence: Luberon villages, lavender fields (June peak), Gordes",
      "Lyon: UNESCO gastronomy capital, bouchon dining, Vieux-Lyon",
      "Paris: Annie's neighborhood, INSEAD/HEC campus visits, Marais",
    ],
    inclusions: ["Boutique hotels & chambres d'hôtes", "TGV Nice→Lyon→Paris", "Provence driving tour", "Lyon food tour", "Paris museum pass"],
    reloNote: "France's Tech Visa (Passeport Talent) suits senior executives. Paris has the highest concentration of PropTech startups in Europe. INSEAD and HEC Paris are 30 minutes from the city.",
    detailLink: "/itineraries",
  },
];

const compareData = [
  { label: "Package", rhine: "Rhine River Cruise", iberian: "Iberian Explorer", france: "French Art de Vivre" },
  { label: "Duration", rhine: "7–8 nights", iberian: "10–14 days", france: "10–14 days" },
  { label: "Price (per person)", rhine: "$4,349+", iberian: "~$3,500", france: "~$3,200" },
  { label: "Style", rhine: "All-inclusive luxury", iberian: "Self-guided boutique", france: "Cultural immersion" },
  { label: "Best For", rhine: "Relaxation & romance", iberian: "Relocation scouting", france: "Annie reunion + schools" },
  { label: "Packing", rhine: "Unpack once", iberian: "4–5 hotels", france: "4–5 hotels" },
  { label: "Top Relo City", rhine: "Amsterdam / Strasbourg", iberian: "Lisbon / Porto", france: "Paris / Nice" },
];

export default function Itineraries() {
  

  return (
    <div className="min-h-screen bg-navy text-ivory">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>
              Three Paths Through Europe
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-light text-ivory mt-3 mb-6">
              Your <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Itineraries</span>
            </h1>
            <p className="font-body text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--muted)" }}>
              Three carefully curated packages, each designed to blend celebration with serious reconnaissance. Every route includes relocation scouting notes, graduate school proximity, and the best local experiences money can buy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="pb-20">
        <div className="container space-y-12">
          {packages.map((pkg, i) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className={`glass-card rounded-3xl overflow-hidden bg-gradient-to-br ${pkg.color}`}
                style={{ border: `1px solid ${pkg.borderColor}` }}>
                <div className="grid md:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${pkg.image}')` }} />
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to right, transparent, rgba(6,8,20,0.3))" }} />
                    <div className="absolute top-4 left-4">
                      <span className="glass-card-gold px-3 py-1.5 rounded-full font-accent text-xs tracking-widest uppercase"
                        style={{ color: "var(--gold)" }}>{pkg.tag}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="glass-card-gold p-2.5 rounded-xl">
                        <pkg.icon size={20} style={{ color: "var(--gold)" }} />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl font-light text-ivory">{pkg.title}</h2>
                        <p className="font-body text-xs" style={{ color: "var(--muted)" }}>{pkg.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-5">
                      <span className="glass-card px-3 py-1 rounded-full font-body text-xs" style={{ color: "var(--ivory)" }}>{pkg.duration}</span>
                      <span className="glass-card-gold px-3 py-1 rounded-full font-body text-xs font-semibold" style={{ color: "var(--gold)" }}>{pkg.price}</span>
                    </div>

                    <div className="glass-card rounded-xl p-3 mb-5">
                      <p className="font-body text-xs" style={{ color: "rgba(180,150,80,0.8)" }}>
                        <Star size={10} className="inline mr-1" style={{ color: "var(--gold)" }} />
                        {pkg.departure}
                      </p>
                    </div>

                    <ul className="space-y-2 mb-5">
                      {pkg.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                          <span className="font-body text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="glass-card rounded-xl p-4 mb-6" style={{ borderColor: "rgba(180,150,80,0.15)" }}>
                      <p className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>
                        Relocation Scout Note
                      </p>
                      <p className="font-body text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{pkg.reloNote}</p>
                    </div>

                    <div className="flex gap-3">
                      {pkg.detailLink === "/rhine-cruise" ? (
                        <Link href="/rhine-cruise">
                          <button className="inline-flex items-center gap-2 font-body text-sm font-medium px-5 py-2.5 rounded-full transition-all"
                            style={{ background: "var(--gold)", color: "var(--navy)" }}>
                            Full Day-by-Day Itinerary <ArrowRight size={14} />
                          </button>
                        </Link>
                      ) : (
                        <button className="inline-flex items-center gap-2 glass-card font-body text-sm px-5 py-2.5 rounded-full transition-all text-ivory">
                          Coming Soon
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Compare */}
      <section className="py-20" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-light text-ivory">Quick Compare</h2>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <th className="p-4 text-left font-accent text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>Feature</th>
                    <th className="p-4 text-left font-accent text-xs tracking-widest uppercase" style={{ color: "rgba(100,150,220,0.8)" }}>Rhine Cruise</th>
                    <th className="p-4 text-left font-accent text-xs tracking-widest uppercase" style={{ color: "rgba(220,160,80,0.8)" }}>Iberian</th>
                    <th className="p-4 text-left font-accent text-xs tracking-widest uppercase" style={{ color: "rgba(160,100,200,0.8)" }}>French</th>
                  </tr>
                </thead>
                <tbody>
                  {compareData.map((row, i) => (
                    <tr key={row.label} style={{ borderBottom: i < compareData.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                      <td className="p-4 font-accent text-xs tracking-wider uppercase" style={{ color: "var(--gold)" }}>{row.label}</td>
                      <td className="p-4 font-body text-sm text-ivory">{row.rhine}</td>
                      <td className="p-4 font-body text-sm text-ivory">{row.iberian}</td>
                      <td className="p-4 font-body text-sm text-ivory">{row.france}</td>
                    </tr>
                  ))}
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
