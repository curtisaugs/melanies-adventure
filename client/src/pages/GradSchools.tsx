/* 
  Design: The Modern European. Refined Glass & Gold
  Graduate Schools: Top European programs for Melanie's executive profile
*/
import { motion } from "framer-motion";
import { useState } from "react";
import { GraduationCap, DollarSign, Clock, Star, ExternalLink, BookOpen, Award, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const programs = [
  {
    id: "insead",
    school: "INSEAD",
    location: "Fontainebleau, France (45 min from Paris)",
    flag: "🇫🇷",
    program: "Executive MBA (EMBA)",
    tagline: "The Business School for the World. and the closest to Annie",
    ranking: "#1 in Europe, #3 Global (FT 2024)",
    tuition: "€115,000",
    duration: "14–17 months (weekends + 5 residencies)",
    format: "Part-time / Executive",
    gmat: "Not required for EMBA (experience-based)",
    avgAge: "38 years",
    avgExp: "14 years",
    language: "English",
    accreditation: "AACSB, EQUIS, AMBA (Triple Crown)",
    highlights: [
      "Most diverse MBA program in the world. 90+ nationalities",
      "Campuses in Fontainebleau, Singapore, Abu Dhabi, San Francisco",
      "Strong real estate, tech, and entrepreneurship tracks",
      "Alumni network of 67,000+ in 175 countries",
      "Fontainebleau campus is 45 minutes from Paris by train",
      "Cohort includes senior executives from Fortune 500 companies",
    ],
    relevance: "INSEAD's EMBA is designed for executives like Melanie. senior leaders who continue working while studying. The real estate and technology tracks align perfectly with her CRO background at Vid Tech. The Fontainebleau campus means she could be near Annie in Paris on weekends.",
    applicationUrl: "https://www.insead.edu/executive-education/emba",
    color: "from-blue-950/40 to-teal-900/30",
    accentColor: "text-teal-300",
    badgeColor: "bg-teal-900/60 border border-teal-500/40",
    iconColor: "text-teal-300",
    highlightColor: "text-teal-300",
  },
  {
    id: "hec",
    school: "HEC Paris",
    location: "Jouy-en-Josas, France (30 min from Paris)",
    flag: "🇫🇷",
    program: "Executive MBA",
    tagline: "France's most prestigious business school, steps from Paris",
    ranking: "#2 in Europe (FT 2024)",
    tuition: "€89,000",
    duration: "18 months (alternating weeks)",
    format: "Part-time / Executive",
    gmat: "Optional (GMAT/GRE or HEC test)",
    avgAge: "37 years",
    avgExp: "13 years",
    language: "English",
    accreditation: "AACSB, EQUIS, AMBA (Triple Crown)",
    highlights: [
      "Ranked #2 European business school by Financial Times",
      "Strong real estate and luxury management programs",
      "Entrepreneurship & Innovation track. ideal for tech executives",
      "Exceptional alumni network in French and European business",
      "Campus in Jouy-en-Josas. 30 minutes from Paris by RER",
      "Partnerships with Columbia Business School (Curtis's alma mater!)",
    ],
    relevance: "HEC Paris has a notable connection to Columbia University, where Curtis earned his architecture degree. The Entrepreneurship track and real estate management specialization make it an excellent fit for Melanie's background in real estate technology. The campus is accessible from Paris on weekends.",
    applicationUrl: "https://www.hec.edu/en/executive-education/emba",
    color: "from-indigo-950/40 to-purple-900/30",
    accentColor: "text-lavender",
    badgeColor: "bg-purple-900/60 border border-purple-400/40",
    iconColor: "text-lavender",
    highlightColor: "text-lavender",
  },
  {
    id: "ie",
    school: "IE Business School",
    location: "Madrid, Spain",
    flag: "🇪🇸",
    program: "Global Executive MBA",
    tagline: "Innovation-first, entrepreneurship-driven, Madrid's crown jewel",
    ranking: "#4 in Europe (FT 2024)",
    tuition: "€79,900",
    duration: "15 months (blended online + residencies)",
    format: "Part-time / Executive / Blended",
    gmat: "Optional (IE Admissions Test available)",
    avgAge: "36 years",
    avgExp: "12 years",
    language: "English",
    accreditation: "AACSB, EQUIS, AMBA (Triple Crown)",
    highlights: [
      "Ranked #1 in Europe for entrepreneurship and innovation",
      "Blended format. most flexible for working executives",
      "Strong tech, proptech, and real estate management focus",
      "Global residencies in Madrid, New York, São Paulo, and more",
      "IE Real Estate Club. one of Europe's most active",
      "Strong US alumni network. 75,000 alumni in 170 countries",
    ],
    relevance: "IE's blended format is the most flexible. ideal if Melanie wants to test living in Madrid before fully committing. The Real Estate and Proptech tracks are directly relevant to her work at Vid Tech. The New York residency means she could visit the US during the program.",
    applicationUrl: "https://www.ie.edu/business-school/programs/mba/global-executive-mba/",
    color: "from-red-950/40 to-orange-900/30",
    accentColor: "text-coral",
    badgeColor: "bg-red-900/60 border border-coral/40",
    iconColor: "text-coral",
    highlightColor: "text-coral",
  },
  {
    id: "lisbon-mba",
    school: "The Lisbon MBA",
    location: "Lisbon, Portugal",
    flag: "🇵🇹",
    program: "Executive MBA (with MIT Sloan immersion)",
    tagline: "Best value in Europe. MIT Sloan partnership included",
    ranking: "Top 100 Global (FT 2024)",
    tuition: "€39,500",
    duration: "12 months (weekends)",
    format: "Part-time / Executive",
    gmat: "Not required",
    avgAge: "35 years",
    avgExp: "10 years",
    language: "English",
    accreditation: "AACSB, EQUIS, AMBA (Triple Crown)",
    highlights: [
      "Partnership with MIT Sloan School of Management",
      "One-week immersion at MIT in Cambridge, Massachusetts",
      "Most affordable Triple Crown accredited EMBA in Europe",
      "Weekend format. ideal for working professionals",
      "Lisbon's startup ecosystem. one of Europe's fastest growing",
      "Portugal's D8 Visa makes residency straightforward",
    ],
    relevance: "The Lisbon MBA offers extraordinary value. €39,500 for a Triple Crown accredited program with MIT Sloan immersion. For Melanie, this could be the perfect combination: study in Lisbon, live on the D8 Visa, and build a network in one of Europe's most exciting startup ecosystems. The MIT week in Boston is a bonus US connection.",
    applicationUrl: "https://www.thelisbonmba.com/executive-mba/",
    color: "from-green-950/40 to-emerald-900/30",
    accentColor: "text-emerald-300",
    badgeColor: "bg-emerald-900/60 border border-emerald-400/40",
    iconColor: "text-emerald-300",
    highlightColor: "text-emerald-300",
  },
  {
    id: "esade",
    school: "ESADE Business School",
    location: "Barcelona, Spain",
    flag: "🇪🇸",
    program: "Executive MBA",
    tagline: "Barcelona's ethical, humanistic approach to business leadership",
    ranking: "#6 in Europe (FT 2024)",
    tuition: "€68,000",
    duration: "18 months (alternating Fridays & Saturdays)",
    format: "Part-time / Executive",
    gmat: "Optional",
    avgAge: "37 years",
    avgExp: "13 years",
    language: "English / Spanish",
    accreditation: "AACSB, EQUIS, AMBA (Triple Crown)",
    highlights: [
      "Consistently ranked among Europe's most ethical business schools",
      "Strong focus on leadership, sustainability, and social impact",
      "Barcelona campus. one of Europe's most livable cities",
      "Excellent real estate and urban development programs",
      "Strong ties to Catalan and Spanish business communities",
      "Alumni network of 60,000 in 120 countries",
    ],
    relevance: "ESADE's emphasis on ethical leadership and social impact resonates with the values of a CRO who has navigated the intersection of technology and real estate. Barcelona's quality of life is exceptional, and the city has a thriving tech and real estate innovation scene.",
    applicationUrl: "https://www.esade.edu/executive-education/emba",
    color: "from-amber-950/40 to-yellow-900/30",
    accentColor: "text-gold",
    badgeColor: "bg-amber-900/60 border border-gold/40",
    iconColor: "text-gold",
    highlightColor: "text-gold",
  },
];

const programComparison = [
  { school: "INSEAD", location: "France", tuition: "€115,000", duration: "14–17 mo", format: "Part-time", ranking: "#1 Europe" },
  { school: "HEC Paris", location: "France", tuition: "€89,000", duration: "18 mo", format: "Part-time", ranking: "#2 Europe" },
  { school: "IE Business School", location: "Spain", tuition: "€79,900", duration: "15 mo", format: "Blended", ranking: "#4 Europe" },
  { school: "The Lisbon MBA", location: "Portugal", tuition: "€39,500", duration: "12 mo", format: "Part-time", ranking: "Top 100" },
  { school: "ESADE", location: "Spain", tuition: "€68,000", duration: "18 mo", format: "Part-time", ranking: "#6 Europe" },
];

function ProgramCard({ prog, index }: { prog: typeof programs[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7 }}
      className={`glass-card rounded-3xl overflow-hidden bg-gradient-to-br ${prog.color} mb-8 border border-white/10`}
    >
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">{prog.flag}</span>
              <div className={`${prog.badgeColor} px-3 py-1 rounded-full`}>
                <span className={`font-accent text-xs tracking-widest uppercase ${prog.accentColor}`}>{prog.ranking}</span>
              </div>
            </div>
            <h3 className="font-display text-3xl font-light text-ivory">{prog.school}</h3>
            <p className="font-body text-sm text-gold/80 italic">{prog.program}</p>
            <p className="font-body text-xs text-muted-foreground mt-1">{prog.location}</p>
          </div>
          <div className="text-right">
            <div className={`font-display text-3xl ${prog.accentColor}`}>{prog.tuition}</div>
            <div className="font-accent text-xs tracking-widest uppercase text-muted-foreground">Total Tuition</div>
          </div>
        </div>

        <p className="font-display text-lg italic text-ivory/70 mb-4">"{prog.tagline}"</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { icon: Clock, label: "Duration", value: prog.duration },
            { icon: BookOpen, label: "Format", value: prog.format },
            { icon: Users, label: "Avg Age", value: prog.avgAge },
            { icon: Award, label: "Language", value: prog.language },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-3 text-center">
              <stat.icon size={14} className={`${prog.iconColor} mx-auto mb-1`} />
              <p className={`font-accent text-[0.6rem] tracking-widest uppercase ${prog.iconColor} opacity-60`}>{stat.label}</p>
              <p className="font-body text-xs text-ivory/80">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <h4 className={`font-accent text-xs tracking-[0.15em] uppercase ${prog.highlightColor} opacity-80 mb-3`}>Program Highlights</h4>
          <div className="grid sm:grid-cols-2 gap-2">
            {prog.highlights.map((h) => (
              <div key={h} className="flex items-start gap-2">
                <Star size={12} className={`${prog.highlightColor} mt-0.5 flex-shrink-0`} />
                <span className="font-body text-xs text-ivory/80">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`${prog.accentColor} opacity-70 hover:opacity-100 transition-opacity font-body text-sm mb-4`}
        >
          {expanded ? "▲ Hide details" : "▼ Why this program fits Melanie"}
        </button>

        {expanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className={`rounded-xl p-4 border ${prog.badgeColor}`}>
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap size={14} className={prog.iconColor} />
                <span className={`font-accent text-xs tracking-widest uppercase ${prog.accentColor}`}>Why This Fits</span>
              </div>
              <p className="font-body text-sm text-ivory/80 leading-relaxed">{prog.relevance}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="glass-card rounded-xl px-3 py-2">
                <p className={`font-accent text-[0.6rem] tracking-widest uppercase ${prog.accentColor} opacity-50`}>GMAT/GRE</p>
                <p className="font-body text-xs text-ivory/80">{prog.gmat}</p>
              </div>
              <div className="glass-card rounded-xl px-3 py-2">
                <p className={`font-accent text-[0.6rem] tracking-widest uppercase ${prog.accentColor} opacity-50`}>Accreditation</p>
                <p className="font-body text-xs text-ivory/80">{prog.accreditation}</p>
              </div>
              <div className="glass-card rounded-xl px-3 py-2">
                <p className={`font-accent text-[0.6rem] tracking-widest uppercase ${prog.accentColor} opacity-50`}>Avg Experience</p>
                <p className="font-body text-xs text-ivory/80">{prog.avgExp}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-4 pt-4 border-t border-white/8">
          <a href={prog.applicationUrl} target="_blank" rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-navy font-body font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-all text-sm bg-gradient-to-r ${prog.id === 'insead' ? 'from-teal to-cyan-400' : prog.id === 'hec' ? 'from-lavender to-purple-400' : prog.id === 'ie' ? 'from-coral to-rose-400' : prog.id === 'lisbon-mba' ? 'from-emerald-400 to-teal-400' : 'from-gold to-amber-400'}`}>
            View Program Details <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function GradSchools() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-accent text-xs tracking-[0.2em] uppercase text-lavender block mb-4">The Academic Horizon</span>
            <h1 className="font-display text-5xl md:text-7xl font-light text-ivory mb-6">
              Graduate <span className="text-lavender italic">Schools</span>
            </h1>
            <div className="mx-auto mb-6 w-16 h-px bg-gradient-to-r from-transparent via-lavender to-transparent" />
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Five of Europe's finest executive MBA programs, each evaluated for Melanie's specific background as a Chief Revenue Officer in real estate technology. All are Triple Crown accredited, all are taught in English, and all are designed for working executives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Melanie's Profile Box */}
      <section className="pb-12">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-card rounded-2xl p-6 mb-10 border border-lavender/30 bg-purple-950/40">
              <h3 className="font-display text-xl font-light text-ivory mb-3">Melanie's Applicant Profile</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Current Role", value: "Chief Revenue Officer, Vid Tech (Real Estate Drone Technology)" },
                  { label: "Industry", value: "Real Estate Technology / PropTech / Aerial Media" },
                  { label: "Ideal Program", value: "Executive MBA with Real Estate, Tech, or Entrepreneurship focus" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="font-accent text-[0.6rem] tracking-widest uppercase text-lavender/70 mb-1">{item.label}</p>
                    <p className="font-body text-sm text-ivory/80">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Cards */}
      <section className="pb-16">
        <div className="container max-w-4xl">
          {programs.map((prog, i) => (
            <ProgramCard key={prog.id} prog={prog} index={i} />
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 border-t border-white/8">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-light text-ivory mb-8">
              Side-by-Side <span className="text-lavender italic">Comparison</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full glass-card rounded-2xl overflow-hidden">
                <thead>
                  <tr className="border-b border-white/8">
                    {["School", "Country", "Tuition", "Duration", "Format", "Ranking"].map(h => (
                      <th key={h} className="text-left p-4 font-accent text-xs tracking-widest uppercase text-coral/80">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {programComparison.map((row, i) => (
                    <tr key={row.school} className={i < programComparison.length - 1 ? "border-b border-white/5" : ""}>
                      <td className="p-4 font-display text-ivory">{row.school}</td>
                      <td className="p-4 font-body text-sm text-muted-foreground">{row.location}</td>
                      <td className="p-4 font-display text-teal-300">{row.tuition}</td>
                      <td className="p-4 font-body text-sm text-muted-foreground">{row.duration}</td>
                      <td className="p-4 font-body text-sm text-muted-foreground">{row.format}</td>
                      <td className="p-4 font-body text-sm text-ivory/80">{row.ranking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Doctoral Programs Note */}
      <section className="py-12 border-t border-white/8">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap size={20} className="text-lavender" />
                <h3 className="font-display text-2xl font-light text-ivory">Doctoral Programs (DBA)</h3>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                For those interested in a doctorate rather than an MBA, the <strong className="text-ivory">Doctor of Business Administration (DBA)</strong> is the practitioner-focused alternative to a PhD. Several European institutions offer excellent DBA programs designed for senior executives:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { school: "INSEAD DBA", detail: "4 years, research-intensive, Fontainebleau" },
                  { school: "IE Business School DBA", detail: "3 years, blended format, Madrid" },
                  { school: "ESADE DBA", detail: "3–4 years, Barcelona, strong social impact focus" },
                  { school: "Lisbon School of Economics DBA", detail: "3 years, Lisbon, affordable tuition" },
                ].map((item) => (
                  <div key={item.school} className="flex items-start gap-2">
                    <Star size={12} className="text-coral mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-body text-sm text-ivory font-medium">{item.school}</p>
                      <p className="font-body text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
