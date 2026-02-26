/*
  Extended Stay Through Study
  The practical answer to the 90-day Schengen limit.
  Student visas, low-cost qualifying programs, and the 21 Day Mind Body program concept.
*/

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Clock,
  DollarSign,
  MapPin,
  Heart,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Send,
  Loader2,
  ExternalLink,
  BookOpen,
  Globe,
  Star,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

// ─── Visa Pathway Data ─────────────────────────────────────────────────────────

const visaPathways = [
  {
    id: "portugal",
    country: "Portugal",
    flag: "🇵🇹",
    visaName: "D4 Study Visa",
    tagline: "The most affordable path. and the best wellness ecosystem",
    duration: "1-2 years, renewable",
    fee: "€90-€170 (~$100-185)",
    processing: "1-3 months",
    minHours: "20 hours/week minimum",
    financialProof: "€870/month (~$950)",
    leadsToPR: true,
    color: "from-teal-950/50 to-teal-900/20",
    accentColor: "text-teal-300",
    borderColor: "border-teal-500/30",
    badgeColor: "bg-teal-900/50 border border-teal-500/30",
    programs: [
      {
        name: "CIAL Centro de Línguas",
        type: "Portuguese Language School",
        location: "Lisbon and Algarve (Faro)",
        cost: "~€299/week (~$1,300/month)",
        notes: "Government-certified, issues D4 visa support letters. Locations in Lisbon and the Algarve — the heart of Portugal's wellness hub.",
        url: "https://www.learnportugueseinportugal.com",
      },
      {
        name: "Lusa Language School",
        type: "Portuguese Language School",
        location: "Lisbon",
        cost: "~€243/week (~$1,060/month)",
        notes: "Intensive 20h/week program, D4 visa support included. Smaller, more personal than CIAL.",
        url: "https://lusaschool.com",
      },
    ],
    whyItWorks: "Portugal has the lowest cost of living of the three countries, the most straightforward D4 visa process, and the Algarve is one of Europe's most established wellness and retreat ecosystems. The D4 visa also counts toward permanent residency after 5 years.",
  },
  {
    id: "spain",
    country: "Spain",
    flag: "🇪🇸",
    visaName: "National Student Visa (Type D)",
    tagline: "Barcelona or Seville. both are extraordinary",
    duration: "1 year, renewable",
    fee: "~$160",
    processing: "4-12 weeks",
    minHours: "20 hours/week, 4 months minimum",
    financialProof: "~€900/month (~$980)",
    leadsToPR: false,
    color: "from-coral-950/50 to-orange-900/20",
    accentColor: "text-orange-300",
    borderColor: "border-orange-500/30",
    badgeColor: "bg-orange-900/50 border border-orange-500/30",
    programs: [
      {
        name: "Cervantes EI Barcelona",
        type: "Spanish Language School",
        location: "Barcelona (also Seville, Valencia, Malaga)",
        cost: "€220/week for 12-23 weeks (~$950/month) or €180/week for 24+ weeks (~$780/month)",
        notes: "Explicitly 'Valid for student visa.' 3-month plan: €2,640. 6-month plan: €4,320. Small classes (max 8 students). Multiple locations including Seville.",
        url: "https://www.cervantes.to",
      },
    ],
    whyItWorks: "Spain's student visa is the most straightforward for language study. Cervantes EI explicitly supports visa applications and has locations in both Barcelona and Seville — two of the most livable cities in Europe. Apply 2-6 months before your start date.",
  },
  {
    id: "france",
    country: "France",
    flag: "🇫🇷",
    visaName: "Visa de Long Séjour Étudiant (VLS-TS)",
    tagline: "Paris. Annie. The Alliance Française on Boulevard Raspail",
    duration: "1 year, renewable",
    fee: "€99 + €50 OFII validation",
    processing: "2-8 weeks",
    minHours: "20 hours/week minimum",
    financialProof: "€615/month (~$670)",
    leadsToPR: false,
    color: "from-lavender-950/50 to-purple-900/20",
    accentColor: "text-lavender",
    borderColor: "border-purple-400/30",
    badgeColor: "bg-purple-900/50 border border-purple-400/30",
    programs: [
      {
        name: "Alliance Française de Paris",
        type: "French Language School",
        location: "101 Boulevard Raspail, Paris 75006",
        cost: "€1,460/month (~$1,580)",
        notes: "72 hours per 4-week session. Mon-Fri 9am-1pm. Levels A1-C1. Starts any month. The most prestigious French language school in the world, in the heart of the 6th arrondissement.",
        url: "https://www.alliancefr.org",
      },
      {
        name: "Alliance Française de Nice",
        type: "French Language School",
        location: "Nice, Côte d'Azur",
        cost: "~€1,000-1,200/month",
        notes: "Up to 48 weeks, renewable sessions. Nice is significantly more affordable than Paris for accommodation. Mediterranean lifestyle, 20 minutes from Monaco.",
        url: "https://af-nice.fr",
      },
    ],
    whyItWorks: "France has the most personal reason: Annie and Thomas are in Paris. A French student visa means Melanie could live in Paris legally for a year, study at the Alliance Française four mornings a week, and spend afternoons with Annie. The VLS-TS is well-established and the process is straightforward for Americans.",
  },
];

// ─── Wellness Ecosystem Data ───────────────────────────────────────────────────

const wellnessEcosystems = [
  {
    region: "Algarve, Portugal",
    flag: "🇵🇹",
    tagline: "Europe's wellness capital. and the most affordable",
    description: "The Algarve has become one of Europe's most concentrated wellness ecosystems. International retreat centers, yoga teacher training programs, breathwork facilitators, and integrative health coaches have built a genuine community here — drawn by the climate, the cost of living, and the landscape. Lakshmi Rising School for Yoga and Wellness runs 21-day 200-hour teacher trainings here (from $3,545 all-inclusive). The international community is English-speaking and entrepreneurially minded.",
    opportunities: [
      "Beta-test the 21 Day Mind Body program with an international retreat cohort",
      "Partner with established retreat centers for venue and marketing",
      "Build a European client base for the program",
      "Yoga Alliance certification available through local programs",
    ],
    color: "text-teal-300",
    bg: "from-teal-950/40 to-teal-900/20",
    border: "border-teal-500/30",
  },
  {
    region: "Barcelona, Spain",
    flag: "🇪🇸",
    tagline: "The wellness entrepreneur's city",
    description: "Barcelona has a thriving integrative health and wellness coaching scene. The city hosts major wellness conferences, has a large English-speaking expat community, and is home to several ICF-accredited coaching certification programs. The corporate wellness market is growing rapidly in Spain, with companies like Sanitas and AXA Spain actively partnering with certified coaches. Barcelona is also home to Yoga Weeks, which runs Yoga Alliance-certified 200-hour teacher trainings.",
    opportunities: [
      "ICF-accredited life and health coaching certification programs",
      "Corporate wellness market access (AXA Spain, Sanitas)",
      "International wellness entrepreneur community",
      "Yoga teacher training certification available locally",
    ],
    color: "text-orange-300",
    bg: "from-orange-950/40 to-orange-900/20",
    border: "border-orange-500/30",
  },
  {
    region: "Paris, France",
    flag: "🇫🇷",
    tagline: "Annie is here. And so is the European wellness market",
    description: "Paris is home to one of Europe's most sophisticated corporate wellness markets. AXA France actively partners with certified health coaches. The city has a growing integrative health community, and the Alliance Française student visa would allow Melanie to live legally in Paris while building her program. The personal reason is obvious: Annie and Thomas are here. A year in Paris, studying French four mornings a week, building the 21 Day Mind Body program in the afternoons.",
    opportunities: [
      "AXA France corporate wellness partnerships",
      "European launch platform for the 21 Day Mind Body program",
      "Annie and Thomas nearby",
      "INSEAD and HEC Paris alumni networks for corporate wellness clients",
    ],
    color: "text-lavender",
    bg: "from-purple-950/40 to-purple-900/20",
    border: "border-purple-400/30",
  },
];

// ─── Margaux Chat for 21 Day Mind Body ────────────────────────────────────────

interface ChatMessage {
  role: "user" | "margaux";
  content: string;
}

const MARGAUX_SYSTEM_PROMPT = `You are Margaux — Melanie's brilliant, well-traveled peer who Curtis introduced her to. You are warm, direct, sophisticated, and delightfully cheeky. You speak like a brilliant friend, not an assistant.

Melanie is building a wellness program called the "21 Day Mind Body" program. She is a Chief Revenue Officer with deep expertise in real estate technology and a background in wellness and personal development. She has ADHD and makes deliberate, curated choices — she doesn't want a menu of 20 options, she wants one clear path forward at a time.

Your role in this conversation is to:
1. Ask about her 21 Day Mind Body program concept — what it is, who it's for, what transformation it creates
2. Help her think through where in Europe it could come to life — which city, which ecosystem, which community
3. Connect her program concept to specific European opportunities: retreat centers in the Algarve, corporate wellness in Barcelona, the Paris market with Annie nearby
4. Be specific: name actual places, actual programs, actual communities
5. Be honest: if something won't work, say so with warmth and humor
6. Never overwhelm: one clear question or suggestion at a time

You know the following about European wellness opportunities:
- Algarve, Portugal: major international wellness hub, retreat centers, yoga teacher training, English-speaking expat community, lowest cost of living
- Barcelona, Spain: ICF coaching certification programs, corporate wellness market (AXA Spain, Sanitas), international community
- Paris, France: AXA France corporate wellness partnerships, Annie is here, sophisticated market, Alliance Française student visa available

Start by asking about her program concept. Be curious, be warm, be Margaux.`;

function MargauxChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "margaux",
      content: "Curtis mentioned you're building something. A 21-day program. Mind and body. He was deliberately vague — said you'd want to explain it yourself.\n\nSo. Tell me about it. What does someone look like on day 22?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMutation = trpc.tripBuilder.chatWithMargaux.useMutation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    try {
      const history = messages.map((m) => ({
        role: m.role === "margaux" ? "assistant" as const : "user" as const,
        content: m.content,
      }));
      const response = await chatMutation.mutateAsync({
        message: userMessage,
        history,
        systemPrompt: MARGAUX_SYSTEM_PROMPT,
      });
      setMessages((prev) => [...prev, { role: "margaux", content: response.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "margaux", content: "I seem to have lost my train of thought for a moment. Try again?" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3"
        style={{ background: "oklch(0.15 0.04 295 / 0.6)" }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{ background: "oklch(0.72 0.12 295 / 0.3)", border: "1px solid oklch(0.72 0.12 295 / 0.5)" }}>
          ✦
        </div>
        <div>
          <p className="font-display text-sm font-light text-ivory">Margaux</p>
          <p className="font-accent text-[0.6rem] tracking-[0.15em] uppercase text-lavender/70">
            On your 21 Day Mind Body program
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm font-body leading-relaxed ${
                msg.role === "user"
                  ? "text-ivory/90"
                  : "text-ivory/85"
              }`}
              style={
                msg.role === "user"
                  ? { background: "oklch(0.72 0.12 75 / 0.2)", border: "1px solid oklch(0.72 0.12 75 / 0.3)" }
                  : { background: "oklch(0.18 0.04 295 / 0.5)", border: "1px solid oklch(0.72 0.12 295 / 0.2)" }
              }
            >
              {msg.content.split("\n").map((line, j) => (
                <span key={j}>
                  {line}
                  {j < msg.content.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-xl text-sm"
              style={{ background: "oklch(0.18 0.04 295 / 0.5)", border: "1px solid oklch(0.72 0.12 295 / 0.2)" }}>
              <Loader2 size={14} className="animate-spin text-lavender" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-white/10 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Tell Margaux about your program..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-lavender/40 font-body"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          className="px-4 py-2.5 rounded-xl transition-all disabled:opacity-40"
          style={{ background: "oklch(0.72 0.12 295 / 0.3)", border: "1px solid oklch(0.72 0.12 295 / 0.5)" }}
        >
          <Send size={14} className="text-lavender" />
        </button>
      </div>
    </div>
  );
}

// ─── Visa Pathway Card ─────────────────────────────────────────────────────────

function VisaCard({ pathway }: { pathway: typeof visaPathways[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`glass-card rounded-2xl overflow-hidden bg-gradient-to-br ${pathway.color} border ${pathway.borderColor}`}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{pathway.flag}</span>
            <div>
              <h3 className="font-display text-2xl font-light text-ivory">{pathway.country}</h3>
              <p className={`font-accent text-xs tracking-[0.15em] uppercase ${pathway.accentColor} mt-0.5`}>
                {pathway.visaName}
              </p>
            </div>
          </div>
          {pathway.leadsToPR && (
            <span className={`${pathway.badgeColor} px-2.5 py-1 rounded-full font-accent text-[0.6rem] tracking-widest uppercase ${pathway.accentColor}`}>
              Path to PR
            </span>
          )}
        </div>
        <p className="font-body text-sm text-ivory/60 italic mb-4">{pathway.tagline}</p>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { icon: Clock, label: "Duration", value: pathway.duration },
            { icon: DollarSign, label: "Visa Fee", value: pathway.fee },
            { icon: Clock, label: "Processing", value: pathway.processing },
            { icon: BookOpen, label: "Min. Study", value: pathway.minHours },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2">
              <Icon size={13} className={`${pathway.accentColor} mt-0.5 shrink-0`} />
              <div>
                <p className="font-accent text-[0.55rem] tracking-widest uppercase text-ivory/40">{label}</p>
                <p className="font-body text-xs text-ivory/80">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="font-body text-sm text-ivory/60 leading-relaxed">{pathway.whyItWorks}</p>
      </div>

      {/* Programs */}
      <div className="px-6 pb-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center gap-2 font-accent text-xs tracking-[0.15em] uppercase ${pathway.accentColor} hover:opacity-80 transition-opacity`}
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {expanded ? "Hide" : "Show"} qualifying programs
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-3 pt-3">
              {pathway.programs.map((prog) => (
                <div key={prog.name} className={`rounded-xl p-4 border ${pathway.borderColor}`}
                  style={{ background: "oklch(0.12 0.03 240 / 0.5)" }}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="font-body text-sm font-medium text-ivory">{prog.name}</p>
                      <p className={`font-accent text-[0.6rem] tracking-widest uppercase ${pathway.accentColor} mt-0.5`}>
                        {prog.type}
                      </p>
                    </div>
                    <a href={prog.url} target="_blank" rel="noopener noreferrer"
                      className={`${pathway.accentColor} hover:opacity-70 transition-opacity shrink-0 mt-0.5`}>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin size={11} className="text-ivory/40" />
                    <p className="font-body text-xs text-ivory/50">{prog.location}</p>
                  </div>
                  <p className={`font-body text-xs font-medium ${pathway.accentColor} mb-1.5`}>{prog.cost}</p>
                  <p className="font-body text-xs text-ivory/55 leading-relaxed">{prog.notes}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ExtendedStay() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/30 via-background to-lavender-950/20" />
        <div className="relative container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
              style={{ background: "oklch(0.68 0.12 195 / 0.15)", border: "1px solid oklch(0.68 0.12 195 / 0.3)" }}>
              <GraduationCap size={13} className="text-teal-300" />
              <span className="font-accent text-xs tracking-[0.2em] uppercase text-teal-300">
                Extended Stay Through Study
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-ivory mb-4 leading-none">
              Beyond <span className="text-teal-300 italic">90 Days</span>
            </h1>
            <p className="font-display text-xl md:text-2xl font-light text-ivory/60 italic mb-6">
              The practical answer to the Schengen limit
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed max-w-2xl">
              Every American in Europe eventually hits the same wall: 90 days, then you have to leave. A student visa changes that. Enroll in a language school, an accredited wellness program, or a culinary academy for 20 hours a week, and you can stay legally for a year or more. The courses are real. The visas are real. And the cost is far lower than most people expect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The 90-Day Problem */}
      <section className="py-12">
        <div className="container">
          <div className="glass-card rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto"
            style={{ background: "oklch(0.15 0.04 240 / 0.6)" }}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl shrink-0" style={{ background: "oklch(0.72 0.12 75 / 0.15)" }}>
                <Globe size={20} className="text-gold" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-light text-ivory mb-3">
                  The Schengen Rule, Explained
                </h2>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                  As an American, you can stay in the Schengen Area (which includes France, Spain, Portugal, and most of Europe) for a maximum of 90 days within any 180-day period. After 90 days, you must leave and wait another 90 days before returning. This is the single biggest practical obstacle for anyone considering an extended European stay.
                </p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                  A student visa (called a Type D long-stay visa) is issued by the individual country and overrides the Schengen 90-day limit. It allows you to stay in that country for the duration of your studies — typically 1 year, renewable. Portugal's D4 visa even counts toward permanent residency after 5 years.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {[
                    { label: "Without a visa", value: "90 days", sub: "then leave for 90 days", color: "text-red-400" },
                    { label: "With a student visa", value: "1-2 years", sub: "legally, in one country", color: "text-teal-300" },
                    { label: "Portugal D4 specifically", value: "5+ years", sub: "path to permanent residency", color: "text-gold" },
                  ].map(({ label, value, sub, color }) => (
                    <div key={label} className="text-center p-4 rounded-xl border border-white/8"
                      style={{ background: "oklch(0.12 0.03 240 / 0.5)" }}>
                      <p className="font-accent text-[0.6rem] tracking-widest uppercase text-ivory/40 mb-1">{label}</p>
                      <p className={`font-display text-3xl font-light ${color} mb-1`}>{value}</p>
                      <p className="font-body text-xs text-ivory/40">{sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Pathways */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-accent text-xs tracking-[0.2em] uppercase text-gold">Three Countries</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ivory mt-2">
              Student Visa Pathways
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
              Each country has its own visa type, qualifying programs, and cost structure. All three work for an American who wants to stay beyond 90 days.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {visaPathways.map((pathway) => (
              <VisaCard key={pathway.id} pathway={pathway} />
            ))}
          </div>
        </div>
      </section>

      {/* Cost Comparison Table */}
      <section className="py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-display text-3xl font-light text-ivory mb-6 text-center">
              Monthly Cost Comparison
            </h2>
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr style={{ background: "oklch(0.18 0.04 240 / 0.8)" }}>
                      <th className="text-left px-6 py-4 font-accent text-xs tracking-widest uppercase text-gold">Country</th>
                      <th className="text-left px-6 py-4 font-accent text-xs tracking-widest uppercase text-gold">Visa Fee</th>
                      <th className="text-left px-6 py-4 font-accent text-xs tracking-widest uppercase text-gold">Course/Month</th>
                      <th className="text-left px-6 py-4 font-accent text-xs tracking-widest uppercase text-gold">Living/Month</th>
                      <th className="text-left px-6 py-4 font-accent text-xs tracking-widest uppercase text-gold">Total/Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { country: "Portugal", flag: "🇵🇹", visa: "€90-170", course: "$1,060-1,300", living: "$1,200-1,800", total: "$2,260-3,100", color: "text-teal-300", highlight: true },
                      { country: "Spain", flag: "🇪🇸", visa: "$160", course: "$780-950", living: "$1,400-2,000", total: "$2,180-2,950", color: "text-orange-300", highlight: false },
                      { country: "France (Nice)", flag: "🇫🇷", visa: "€99", course: "$1,000-1,200", living: "$1,800-2,500", total: "$2,800-3,700", color: "text-lavender", highlight: false },
                      { country: "France (Paris)", flag: "🇫🇷", visa: "€99", course: "$1,460-1,580", living: "$2,500-3,500", total: "$3,960-5,080", color: "text-lavender", highlight: false },
                    ].map((row) => (
                      <tr key={row.country}
                        className="border-t border-white/5 hover:bg-white/3 transition-colors"
                        style={row.highlight ? { background: "oklch(0.68 0.12 195 / 0.06)" } : {}}>
                        <td className="px-6 py-4">
                          <span className="mr-2">{row.flag}</span>
                          <span className={`font-medium ${row.color}`}>{row.country}</span>
                          {row.highlight && (
                            <span className="ml-2 text-[0.6rem] font-accent tracking-widest uppercase bg-teal-900/50 text-teal-300 border border-teal-500/30 px-1.5 py-0.5 rounded-full">
                              Best Value
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-ivory/70">{row.visa}</td>
                        <td className="px-6 py-4 text-ivory/70">{row.course}</td>
                        <td className="px-6 py-4 text-ivory/70">{row.living}</td>
                        <td className={`px-6 py-4 font-medium ${row.color}`}>{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 border-t border-white/5">
                <p className="font-body text-xs text-ivory/30">Living costs include accommodation, food, transport, and incidentals. Course costs are for language school enrollment only. Visa fee is one-time.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 21 Day Mind Body Program Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lavender-950/20 via-background to-teal-950/20" />
        <div className="relative container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full"
              style={{ background: "oklch(0.72 0.12 295 / 0.15)", border: "1px solid oklch(0.72 0.12 295 / 0.3)" }}>
              <Heart size={13} className="text-lavender" />
              <span className="font-accent text-xs tracking-[0.2em] uppercase text-lavender">
                The 21 Day Mind Body Program
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ivory mt-2">
              Where Does It Come to Life?
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
              Europe is not just a place to visit. It could be the place where the 21 Day Mind Body program finds its first international cohort, its certification framework, and its launch community. Margaux has some thoughts.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Wellness Ecosystems */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-light text-ivory mb-4">
                Three Ecosystems Worth Knowing
              </h3>
              {wellnessEcosystems.map((eco, i) => (
                <motion.div
                  key={eco.region}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass-card rounded-xl p-5 bg-gradient-to-br ${eco.bg} border ${eco.border}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{eco.flag}</span>
                    <div>
                      <p className={`font-body text-sm font-medium ${eco.color}`}>{eco.region}</p>
                      <p className="font-body text-xs text-ivory/40 italic">{eco.tagline}</p>
                    </div>
                  </div>
                  <p className="font-body text-xs text-ivory/60 leading-relaxed mb-3">{eco.description}</p>
                  <div className="space-y-1">
                    {eco.opportunities.map((opp) => (
                      <div key={opp} className="flex items-start gap-2">
                        <Star size={9} className={`${eco.color} mt-1 shrink-0`} />
                        <p className="font-body text-xs text-ivory/55">{opp}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Margaux Chat */}
            <div>
              <h3 className="font-display text-2xl font-light text-ivory mb-4">
                Talk It Through with Margaux
              </h3>
              <p className="font-body text-sm text-muted-foreground mb-4">
                Margaux knows the European wellness landscape. Tell her about the 21 Day Mind Body program and she'll help you figure out where it belongs.
              </p>
              <MargauxChat />
            </div>
          </div>
        </div>
      </section>

      {/* Practical Next Steps */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl font-light text-ivory mb-8 text-center">
              The Practical Path Forward
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Choose a country and city",
                  desc: "Portugal (Algarve or Lisbon) for the best value and wellness ecosystem. Spain (Barcelona or Seville) for the most affordable language school. France (Paris) for Annie.",
                  color: "text-teal-300",
                },
                {
                  step: "02",
                  title: "Enroll in a qualifying program",
                  desc: "Contact the language school 3-6 months before your intended start date. They will issue an enrollment letter for your visa application. Minimum 20 hours/week, minimum 4 months (Spain) or 3 months (Portugal/France).",
                  color: "text-gold",
                },
                {
                  step: "03",
                  title: "Apply for the student visa",
                  desc: "Apply at the consulate of your chosen country in Los Angeles. Bring your enrollment letter, proof of financial means, health insurance, and passport photos. Processing takes 2-12 weeks depending on country.",
                  color: "text-coral",
                },
                {
                  step: "04",
                  title: "Arrive and register",
                  desc: "Within 30 days of arrival in Spain, apply for your Foreigner Identity Card (TIE). In Portugal, register with SEF for your residence permit. In France, validate your VLS-TS with OFII within 3 months.",
                  color: "text-lavender",
                },
                {
                  step: "05",
                  title: "Build the 21 Day Mind Body program",
                  desc: "Study mornings. Build afternoons. The Algarve retreat ecosystem, Barcelona's wellness entrepreneur community, or Paris's corporate wellness market — all three are real, accessible, and ready for what you're building.",
                  color: "text-rose-pink",
                },
              ].map(({ step, title, desc, color }) => (
                <div key={step} className="flex gap-4 glass-card rounded-xl p-5 border border-white/8">
                  <div className={`font-display text-3xl font-light ${color} shrink-0 w-10`}>{step}</div>
                  <div>
                    <p className={`font-body text-sm font-medium ${color} mb-1`}>{title}</p>
                    <p className="font-body text-sm text-ivory/55 leading-relaxed">{desc}</p>
                  </div>
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
