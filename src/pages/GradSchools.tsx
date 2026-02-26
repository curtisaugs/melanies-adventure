import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, DollarSign, Clock, Award, MapPin } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const programs = [
  {
    id: "insead",
    school: "INSEAD",
    location: "Fontainebleau, France (+ Singapore campus)",
    flag: "🇫🇷",
    program: "Executive MBA",
    ranking: "#1 in Europe, #3 Global (FT 2024)",
    tuition: "€115,000",
    duration: "14–17 months",
    format: "Modular — 8 intensive modules, can continue working",
    gmat: "Average 670 (waiver possible for senior executives)",
    language: "English",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    color: "from-blue-900/30 to-blue-800/10",
    why: "The gold standard for global executives. Melanie's CRO background at a tech company is exactly the profile INSEAD seeks. The Fontainebleau campus is 45 minutes from Paris — Annie could come for graduation.",
    highlights: ["Most international MBA in the world — 90+ nationalities", "Modules in France and Singapore", "PropTech and real estate electives available", "Alumni network: 65,000+ in 175 countries", "GMAT waiver available for executives with 10+ years experience"],
  },
  {
    id: "hec",
    school: "HEC Paris",
    location: "Jouy-en-Josas, France (30 min from Paris)",
    flag: "🇫🇷",
    program: "Executive MBA",
    ranking: "#2 in Europe, #5 Global (FT 2024)",
    tuition: "€89,000",
    duration: "18 months",
    format: "Part-time modular — every 6 weeks, continue working",
    gmat: "Average 640 (waiver common for senior executives)",
    language: "English",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    color: "from-purple-900/30 to-purple-800/10",
    why: "HEC's EMBA is the most Paris-integrated program — classes near Versailles, networking in the city. With Annie in Paris, Melanie would have a built-in support system. HEC has a strong real estate and PropTech track.",
    highlights: ["Strong real estate & PropTech specialization track", "Paris networking events included", "Certificate in Entrepreneurship available", "Ranked #1 for career progression (FT 2024)", "€89k is 23% cheaper than INSEAD for comparable quality"],
  },
  {
    id: "ie",
    school: "IE Business School",
    location: "Madrid, Spain",
    flag: "🇪🇸",
    program: "Executive MBA",
    ranking: "#5 in Europe, #8 Global (FT 2024)",
    tuition: "€72,000",
    duration: "15 months",
    format: "Blended — online + 4 in-person modules in Madrid",
    gmat: "Average 620 (flexible for executives)",
    language: "English",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    color: "from-amber-900/30 to-amber-800/10",
    why: "IE is the most entrepreneurial school in Europe. Their PropTech and real estate innovation programs are world-class. Madrid's startup ecosystem is booming, and IE's alumni network in Latin America is unmatched — relevant for Vid Tech's expansion.",
    highlights: ["#1 in Europe for entrepreneurship", "Real Estate Club and PropTech Innovation Lab", "Blended format: most flexible for working executives", "Strong US alumni network (IE has a New York campus)", "Madrid: one of Europe's most livable cities"],
  },
  {
    id: "lisbon-mba",
    school: "The Lisbon MBA",
    location: "Lisbon, Portugal",
    flag: "🇵🇹",
    program: "Executive MBA (MIT Sloan Partnership)",
    ranking: "Top 50 Global (FT 2024)",
    tuition: "€39,500",
    duration: "12 months",
    format: "Part-time — weekends, continue working",
    gmat: "Not required for executives",
    language: "English",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    color: "from-emerald-900/30 to-emerald-800/10",
    why: "The best value EMBA in Europe. Triple Crown accredited (AACSB, EQUIS, AMBA). The MIT Sloan immersion week in Boston is a remarkable differentiator. Lisbon's D8 visa makes relocation seamless, and Portugal's NHR tax regime means Melanie keeps more of what she earns.",
    highlights: ["MIT Sloan immersion week included in tuition", "Triple Crown accredited — rare distinction", "No GMAT required for executives", "Lisbon D8 visa + NHR tax: best financial package in Europe", "€39,500 is 66% cheaper than INSEAD for comparable outcomes"],
  },
  {
    id: "esade",
    school: "ESADE Business School",
    location: "Barcelona, Spain",
    flag: "🇪🇸",
    program: "Executive MBA",
    ranking: "#7 in Europe, #12 Global (FT 2024)",
    tuition: "€68,000",
    duration: "18 months",
    format: "Part-time — bi-weekly modules, continue working",
    gmat: "Average 620 (waiver available)",
    language: "English",
    image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&q=80",
    color: "from-rose-900/30 to-rose-800/10",
    why: "ESADE is the most socially conscious business school in Europe — a perfect fit for a leader who wants to build something meaningful. Barcelona is Europe's startup capital and has a thriving PropTech scene. The city itself is one of the most beautiful in the world.",
    highlights: ["Ranked #1 for ethics and social responsibility", "Barcelona's PropTech ecosystem: Housfy, Spotahome, Brickwise", "Strong real estate and urban innovation track", "Spain's Non-Lucrative Visa makes relocation straightforward", "Barcelona: Mediterranean climate, world-class food, direct LAX flights"],
  },
];

export default function GradSchools() {
  const [activeProgram, setActiveProgram] = useState("insead");
  const selected = programs.find(p => p.id === activeProgram) || programs[0];

  return (
    <div className="min-h-screen bg-navy text-ivory">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-accent text-xs tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>
              The Next Chapter
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-light text-ivory mt-3 mb-6">
              Graduate <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Schools</span>
            </h1>
            <p className="font-body text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--muted)" }}>
              Five of Europe's finest Executive MBA programs, selected for their relevance to a Chief Revenue Officer in real estate technology — with relocation pathways, tuition comparisons, and honest assessments of fit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Selector */}
      <section className="pb-8">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {programs.map((p) => (
              <button key={p.id} onClick={() => setActiveProgram(p.id)}
                className="flex items-center gap-2 px-5 py-3 rounded-full font-body text-sm transition-all"
                style={{
                  background: activeProgram === p.id ? "var(--gold)" : "rgba(255,255,255,0.04)",
                  color: activeProgram === p.id ? "var(--navy)" : "rgba(240,235,220,0.7)",
                  border: `1px solid ${activeProgram === p.id ? "var(--gold)" : "rgba(255,255,255,0.08)"}`,
                }}>
                <span>{p.flag}</span> {p.school}
              </button>
            ))}
          </div>

          <motion.div key={selected.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className={`glass-card rounded-3xl overflow-hidden bg-gradient-to-br ${selected.color}`}>
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${selected.image}')` }} />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to right, rgba(6,8,20,0.85) 0%, rgba(6,8,20,0.4) 100%)" }} />
                <div className="relative z-10 p-8 flex items-end h-full">
                  <div>
                    <div className="font-body text-2xl mb-1">{selected.flag}</div>
                    <h2 className="font-display text-3xl font-light text-ivory">{selected.school}</h2>
                    <p className="font-body text-sm" style={{ color: "rgba(240,235,220,0.7)" }}>{selected.location}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { icon: Award, label: "Ranking", value: selected.ranking },
                    { icon: DollarSign, label: "Tuition", value: selected.tuition },
                    { icon: Clock, label: "Duration", value: selected.duration },
                    { icon: MapPin, label: "Format", value: selected.format },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="glass-card rounded-xl p-4">
                      <Icon size={14} className="mb-2" style={{ color: "var(--gold)" }} />
                      <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "rgba(180,150,80,0.7)" }}>{label}</div>
                      <div className="font-body text-xs text-ivory leading-snug">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-accent text-xs tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Program Highlights</h3>
                    <ul className="space-y-2">
                      {selected.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <GraduationCap size={12} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                          <span className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-accent text-xs tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>GMAT & Language</h3>
                    <div className="glass-card rounded-xl p-4 mb-4">
                      <div className="font-body text-sm text-ivory mb-1">GMAT Requirement</div>
                      <div className="font-body text-sm" style={{ color: "var(--muted)" }}>{selected.gmat}</div>
                    </div>
                    <div className="glass-card rounded-xl p-4">
                      <div className="font-body text-sm text-ivory mb-1">Language of Instruction</div>
                      <div className="font-body text-sm" style={{ color: "var(--muted)" }}>{selected.language}</div>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6" style={{ borderColor: "rgba(180,150,80,0.2)" }}>
                  <p className="font-accent text-[0.6rem] tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>
                    Why This Works for Melanie
                  </p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{selected.why}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="container">
          <h2 className="font-display text-4xl font-light text-ivory text-center mb-12">
            Quick <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Comparison</span>
          </h2>
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    {["School", "Location", "Ranking", "Tuition", "Duration", "GMAT"].map(h => (
                      <th key={h} className="p-4 text-left font-accent text-xs tracking-widest uppercase whitespace-nowrap"
                        style={{ color: "var(--gold)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {programs.map((p, i) => (
                    <tr key={p.id} onClick={() => setActiveProgram(p.id)} className="cursor-pointer transition-colors"
                      style={{
                        borderBottom: i < programs.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                        background: activeProgram === p.id ? "rgba(180,150,80,0.08)" : "transparent",
                      }}>
                      <td className="p-4">
                        <span className="font-body text-base mr-2">{p.flag}</span>
                        <span className="font-body text-sm text-ivory font-medium">{p.school}</span>
                      </td>
                      <td className="p-4 font-body text-sm" style={{ color: "var(--muted)" }}>{p.location.split(",")[0]}</td>
                      <td className="p-4 font-body text-sm" style={{ color: "var(--muted)" }}>{p.ranking.split(",")[0]}</td>
                      <td className="p-4 font-body text-sm font-medium" style={{ color: "var(--gold)" }}>{p.tuition}</td>
                      <td className="p-4 font-body text-sm" style={{ color: "var(--muted)" }}>{p.duration}</td>
                      <td className="p-4 font-body text-sm" style={{ color: "var(--muted)" }}>{p.gmat.split("(")[0].trim()}</td>
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
