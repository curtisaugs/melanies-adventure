import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, ArrowLeft, ArrowRight, Copy, Check, Gift } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

// ── Types ──────────────────────────────────────────────────────────────────
interface Message { role: "assistant" | "user"; content: string; }

interface TripPrefs {
  duration: string;
  regions: string[];
  style: string;
  budget: string;
  priorities: string[];
  special: string;
}

// ── Constants ──────────────────────────────────────────────────────────────
const DURATION_OPTIONS = ["7–8 days", "10–11 days", "12–14 days", "2+ weeks", "Surprise me"];
const REGION_OPTIONS = ["Portugal & Spain", "Southern France", "Northern France (Paris)", "Italy", "Greece", "Rhine River Cruise", "Mix it up"];
const STYLE_OPTIONS = ["Luxury & Relaxed", "Cultural Deep Dive", "Food & Wine Focus", "Adventure & Active", "Relocation Scouting", "All of the above"];
const BUDGET_OPTIONS = [
  { label: "Just the Gift (~$5k)", desc: "Curtis's base gift — flights + hotels + experiences", value: "gift_base" },
  { label: "A Little Extra (~$8k)", desc: "Upgrade a few hotels, add a special dinner", value: "gift_plus" },
  { label: "Upgrade Mode (~$12k)", desc: "Business class one-way, boutique hotels throughout", value: "upgrade" },
  { label: "No Ceiling (Curtis can find out later 😉)", desc: "The trip of a lifetime, no compromises", value: "no_ceiling" },
];
const PRIORITY_OPTIONS = ["Annie reunion in Paris", "Relocation scouting", "Graduate school visits", "Wine & gastronomy", "Art & museums", "Beaches & coast", "Medieval history", "Spa & wellness"];

const MARGAUX_SYSTEM = `You are Margaux, a witty, charming, and deeply knowledgeable European travel concierge. You are helping Melanie — a 60-year-old Chief Revenue Officer at a drone tech company, celebrating her birthday on March 26, 2026 — plan her perfect European adventure.

Key context:
- Melanie's daughter Annie lives in Paris with her partner Thomas
- Melanie's other daughter Lola is at John Cabot University in Rome
- Melanie's husband Curtis is a VP of Production at Exo Sphere and a Columbia Architecture grad
- Curtis is covering ~$5,000 as a birthday gift; Melanie can upgrade
- Flights are from LAX (Los Angeles International Airport), NOT Las Vegas
- Melanie is a CRO-level executive who appreciates quality, culture, and authenticity
- She is also seriously considering European relocation and/or a graduate program

Your personality:
- Warm, cheeky, and occasionally funny — but always professional
- You gently correct geographic misconceptions (e.g., "Bergamo to Positano is NOT an afternoon drive — Europe is not a road trip from LA to Tempe")
- You give specific, researched recommendations, not generic tourist advice
- You know that Lola is at JCU in Rome, so Italy trips can include a visit
- You always mention Annie in Paris when France is part of the itinerary
- You use European flair: "Bonjour!", "Magnifique!", "Allora..." but not excessively

When generating an itinerary:
- Be specific: name actual hotels, restaurants, train routes, and experiences
- Include a "Relocation Scout Note" for each city if relevant
- Include a "Curtis's Gift Covers" section showing what's included in the $5k base
- Format the itinerary clearly with Day X headers
- End with a warm, personal note to Melanie

Keep responses conversational and under 800 words unless generating a full itinerary.`;

// ── LLM Call ──────────────────────────────────────────────────────────────
async function callMargaux(messages: Message[], prefs: TripPrefs): Promise<string> {
  const apiUrl = import.meta.env.VITE_FRONTEND_FORGE_API_URL;
  const apiKey = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;

  if (!apiUrl || !apiKey) {
    return generateFallbackItinerary(prefs);
  }

  const contextMsg = prefs.duration ? `
User preferences:
- Duration: ${prefs.duration}
- Regions: ${prefs.regions.join(", ")}
- Travel style: ${prefs.style}
- Budget: ${BUDGET_OPTIONS.find(b => b.value === prefs.budget)?.label || prefs.budget}
- Priorities: ${prefs.priorities.join(", ")}
- Special requests: ${prefs.special || "None"}
` : "";

  try {
    const response = await fetch(`${apiUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: MARGAUX_SYSTEM + (contextMsg ? "\n\nCurrent trip preferences:\n" + contextMsg : "") },
          ...messages.map(m => ({ role: m.role, content: m.content })),
        ],
        max_tokens: 1500,
        temperature: 0.8,
      }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return data.choices?.[0]?.message?.content || generateFallbackItinerary(prefs);
  } catch (e) {
    console.error("LLM error:", e);
    return generateFallbackItinerary(prefs);
  }
}

function generateFallbackItinerary(prefs: TripPrefs): string {
  const hasItaly = prefs.regions.some(r => r.includes("Italy"));
  const hasFrance = prefs.regions.some(r => r.includes("France"));
  const hasIberian = prefs.regions.some(r => r.includes("Portugal") || r.includes("Spain"));
  const hasGreece = prefs.regions.some(r => r.includes("Greece"));
  const hasRhine = prefs.regions.some(r => r.includes("Rhine"));

  let itinerary = `Bonjour, Melanie! 🥂 

I've designed your perfect European adventure. Here's what I've put together:

`;

  if (hasRhine) {
    itinerary += `**🚢 AmaWaterways Enchanting Rhine (7 nights)**
*Basel, Switzerland → Amsterdam, Netherlands*

**Day 1 — March 26: Basel (Embarkation — Happy Birthday!)**
Board the AmaLucia in Basel. Explore the Kunstmuseum and the Rhine promenade before your birthday dinner in the Chef's Table restaurant. Champagne reception at sunset.

**Day 2 — Colmar, France**
The most fairy-tale town in Europe. Petite Venise, the Unterlinden Museum, and Alsatian wine tasting. Colmar is the inspiration for Beauty and the Beast — and it shows.

**Day 3 — Strasbourg, France**
The capital of Europe. The astronomical clock at Notre-Dame Cathedral performs at 12:30pm. La Petite France neighborhood is unmissable. *Relocation note: Strasbourg has EU institutions and a strong expat community.*

**Day 4 — Heidelberg, Germany**
Germany's most romantic city. The ruined castle above the Neckar River, the Old Bridge, and the Philosophers' Walk. Best at sunset.

**Day 5 — Rüdesheim & the Rhine Gorge**
The most scenic stretch of the cruise. UNESCO World Heritage cliffs, medieval castles, and the Lorelei Rock. Rheingau Riesling tasting in Rüdesheim.

**Day 6 — Cologne, Germany**
The Gothic cathedral (632 years in construction) dominates the skyline. Museum Ludwig for Picasso and Warhol. Kölsch beer at a traditional Brauhaus.

**Day 7 — Kinderdijk & Rotterdam, Netherlands**
19 windmills in a row at Kinderdijk (UNESCO). Rotterdam's Cube Houses and Markthal — Europe's most architecturally adventurous city.

**Day 8 — Amsterdam (Disembarkation)**
Rijksmuseum, the Anne Frank House (book ahead!), and the Jordaan neighborhood. Stay 2–3 extra days — Amsterdam deserves it.

`;
  }

  if (hasItaly) {
    itinerary += `**🇮🇹 Italy Highlights**

**Florence (3 nights)**
The Uffizi Gallery (Botticelli's Birth of Venus), Brunelleschi's dome, and the Oltrarno artisan quarter. Stay at AdAstra boutique hotel. Bistecca alla Fiorentina at Buca Mario is non-negotiable.

**Amalfi Coast (2 nights)**
⚠️ *Margaux's note: Positano is NOT an afternoon drive from Florence. Plan for a 4-hour journey via Naples. The Amalfi road is one of Europe's most dramatic — and slowest. Worth every minute, but plan accordingly.*

Positano at sunrise, Ravello's hilltop gardens, and a boat trip to Capri. Stay at Le Sirenuse if the budget allows.

**Rome (2 nights + Lola visit!)**
Lola is at John Cabot University — this is a built-in family reunion! The Colosseum, the Vatican, and dinner with Lola in Trastevere. *Relocation note: Italy's Flat Tax Regime (€100k/year flat) is worth exploring.*

`;
  }

  if (hasFrance) {
    itinerary += `**🇫🇷 France Highlights**

**Nice & the Côte d'Azur (2 nights)**
Promenade des Anglais at sunrise, Cours Saleya market, and a Monaco day trip. Socca at Chez René Socca is the authentic local experience.

**Paris (3 nights — Annie & Thomas!)**
This is the emotional heart of the trip. Annie's neighborhood, the Marais, Musée d'Orsay, and a proper Parisian dinner. *Relocation note: Paris has Europe's largest PropTech ecosystem. INSEAD is 45 minutes away by RER.*

`;
  }

  if (hasIberian) {
    itinerary += `**🇵🇹🇪🇸 Iberian Peninsula Highlights**

**Lisbon (3 nights)**
Alfama, Belém Tower, and the LX Factory. Time Out Market for a food hall feast. *Relocation note: Portugal's D8 Digital Nomad Visa is the easiest EU entry for US remote workers. NHR tax: 10% flat on foreign income for 10 years.*

**Porto (2 nights)**
Livraria Lello (the world's most beautiful bookshop), a Douro Valley wine cruise, and port wine tasting at Graham's.

**Seville (2 nights)**
The Real Alcázar, flamenco at Casa de la Memoria, and tapas in Triana. Spain's most beautiful city.

**Madrid (2 nights)**
The Prado, Retiro Park, and IE Business School campus visit. *Relocation note: IE's EMBA is #5 in Europe.*

`;
  }

  if (hasGreece) {
    itinerary += `**🇬🇷 Greece Highlights**

**Athens (3 nights)**
The Acropolis at sunrise (beat the crowds!), the Acropolis Museum, and mezedes at Diporto Agoras. *Relocation note: Greece's Digital Nomad Visa offers a 50% income tax discount for 7 years — the best tax deal in Europe.*

**Santorini (3 nights)**
Oia sunset, caldera boat tour, and Assyrtiko wine at Santo Wines. The most photographed moment in Greece for a reason.

`;
  }

  itinerary += `---

**💛 Curtis's Gift Covers (~$5,000)**
- Round-trip flights from LAX: ~$1,800 for two (economy)
- 7 nights accommodation (mid-range boutique): ~$2,100
- Key experiences & museum entries: ~$600
- Internal transport: ~$500

**✨ Melanie's Upgrade Menu**
- Business class one-way (LAX→Europe): +$2,500
- Upgrade to 4–5★ hotels: +$1,500–3,000
- Private wine tour in Douro Valley: +$400
- Le Sirenuse in Positano: +$700/night
- Chef's Table dinner in Paris: +$300

*Made with love by Margaux, your personal European travel concierge. Have questions? Ask me anything — I'm here to make this trip perfect. 🥂*`;

  return itinerary;
}

// ── Step Wizard ───────────────────────────────────────────────────────────
const STEPS = ["Duration", "Regions", "Style", "Budget", "Priorities", "Special Requests", "Generate"];

export default function TripBuilder() {
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState<TripPrefs>({
    duration: "", regions: [], style: "", budget: "", priorities: [], special: "",
  });
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Bonjour, Melanie! 🥂 I'm Margaux, your personal European travel concierge. Curtis has asked me to help you design the perfect birthday adventure.\n\nLet's start with the most important question — how many days are you dreaming of?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"wizard" | "chat" | "result">("wizard");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleWizardNext = async () => {
    if (step < STEPS.length - 2) {
      setStep(step + 1);
    } else {
      // Generate itinerary
      setMode("result");
      setIsGenerating(true);
      const userMsg = `Please create a detailed day-by-day itinerary for me based on my preferences:
- Duration: ${prefs.duration}
- Regions: ${prefs.regions.join(", ")}
- Travel style: ${prefs.style}
- Budget: ${BUDGET_OPTIONS.find(b => b.value === prefs.budget)?.label}
- Priorities: ${prefs.priorities.join(", ")}
- Special requests: ${prefs.special || "None"}

Please include specific hotel recommendations, restaurant suggestions, and a Curtis's Gift Breakdown at the end.`;

      const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
      const response = await callMargaux(newMessages, prefs);
      setGeneratedItinerary(response);
      setMessages([...newMessages, { role: "assistant", content: response }]);
      setIsGenerating(false);
    }
  };

  const handleChatSend = async () => {
    if (!chatInput.trim() || isGenerating) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setIsGenerating(true);
    const response = await callMargaux(newMessages, prefs);
    setMessages([...newMessages, { role: "assistant", content: response }]);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedItinerary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canProceed = () => {
    if (step === 0) return !!prefs.duration;
    if (step === 1) return prefs.regions.length > 0;
    if (step === 2) return !!prefs.style;
    if (step === 3) return !!prefs.budget;
    if (step === 4) return prefs.priorities.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-navy text-ivory">
      <Navigation />

      <section className="pt-32 pb-8">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 glass-card-gold px-4 py-2 rounded-full mb-6">
              <Sparkles size={14} style={{ color: "var(--gold)" }} />
              <span className="font-accent text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
                AI Trip Concierge
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-light text-ivory mb-4">
              Build My Trip with <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Margaux</span>
            </h1>
            <p className="font-body text-base max-w-xl mx-auto leading-relaxed" style={{ color: "var(--muted)" }}>
              Answer a few questions and Margaux will design a completely custom European itinerary — with specific hotels, restaurants, and a Curtis gift breakdown.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container max-w-3xl">

          {/* Mode Toggle */}
          {mode !== "result" && (
            <div className="flex justify-center gap-3 mb-8">
              <button onClick={() => setMode("wizard")}
                className="px-5 py-2.5 rounded-full font-body text-sm transition-all"
                style={{ background: mode === "wizard" ? "var(--gold)" : "rgba(255,255,255,0.04)", color: mode === "wizard" ? "var(--navy)" : "rgba(240,235,220,0.7)", border: `1px solid ${mode === "wizard" ? "var(--gold)" : "rgba(255,255,255,0.08)"}` }}>
                Step-by-Step Wizard
              </button>
              <button onClick={() => setMode("chat")}
                className="px-5 py-2.5 rounded-full font-body text-sm transition-all"
                style={{ background: mode === "chat" ? "var(--gold)" : "rgba(255,255,255,0.04)", color: mode === "chat" ? "var(--navy)" : "rgba(240,235,220,0.7)", border: `1px solid ${mode === "chat" ? "var(--gold)" : "rgba(255,255,255,0.08)"}` }}>
                Chat with Margaux
              </button>
            </div>
          )}

          {/* WIZARD MODE */}
          {mode === "wizard" && (
            <motion.div key="wizard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {STEPS.slice(0, -1).map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center font-body text-xs transition-all"
                      style={{
                        background: i < step ? "var(--gold)" : i === step ? "rgba(180,150,80,0.3)" : "rgba(255,255,255,0.06)",
                        color: i < step ? "var(--navy)" : i === step ? "var(--gold)" : "rgba(240,235,220,0.3)",
                        border: i === step ? "1px solid var(--gold)" : "none",
                      }}>
                      {i < step ? "✓" : i + 1}
                    </div>
                    {i < STEPS.length - 2 && <div className="flex-1 h-px" style={{ background: i < step ? "var(--gold)" : "rgba(255,255,255,0.08)", minWidth: "20px" }} />}
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-3xl p-8">
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>

                    {/* Step 0: Duration */}
                    {step === 0 && (
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-lg font-light" style={{ background: "var(--gold)", color: "var(--navy)" }}>M</div>
                          <div>
                            <div className="font-display text-base font-light text-ivory">Margaux</div>
                            <div className="font-body text-xs" style={{ color: "var(--muted)" }}>Your European Travel Concierge</div>
                          </div>
                        </div>
                        <p className="font-body text-base text-ivory mb-6 leading-relaxed">
                          Bonjour, Melanie! 🥂 Curtis has asked me to design your perfect European adventure. Let's start with the most important question...
                        </p>
                        <h3 className="font-display text-2xl font-light text-ivory mb-6">How many days are you dreaming of?</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {DURATION_OPTIONS.map((opt) => (
                            <button key={opt} onClick={() => setPrefs({ ...prefs, duration: opt })}
                              className="p-4 rounded-xl font-body text-sm transition-all text-center"
                              style={{ background: prefs.duration === opt ? "rgba(180,150,80,0.2)" : "rgba(255,255,255,0.04)", color: prefs.duration === opt ? "var(--gold)" : "rgba(240,235,220,0.7)", border: `1px solid ${prefs.duration === opt ? "var(--gold)" : "rgba(255,255,255,0.08)"}` }}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 1: Regions */}
                    {step === 1 && (
                      <div>
                        <h3 className="font-display text-2xl font-light text-ivory mb-2">Which regions call to you?</h3>
                        <p className="font-body text-sm mb-6" style={{ color: "var(--muted)" }}>Select all that interest you. I'll design a logical route.</p>
                        <div className="grid grid-cols-2 gap-3">
                          {REGION_OPTIONS.map((opt) => (
                            <button key={opt} onClick={() => setPrefs({ ...prefs, regions: prefs.regions.includes(opt) ? prefs.regions.filter(r => r !== opt) : [...prefs.regions, opt] })}
                              className="p-4 rounded-xl font-body text-sm transition-all text-left"
                              style={{ background: prefs.regions.includes(opt) ? "rgba(180,150,80,0.2)" : "rgba(255,255,255,0.04)", color: prefs.regions.includes(opt) ? "var(--gold)" : "rgba(240,235,220,0.7)", border: `1px solid ${prefs.regions.includes(opt) ? "var(--gold)" : "rgba(255,255,255,0.08)"}` }}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 2: Style */}
                    {step === 2 && (
                      <div>
                        <h3 className="font-display text-2xl font-light text-ivory mb-2">What's your travel style?</h3>
                        <p className="font-body text-sm mb-6" style={{ color: "var(--muted)" }}>This shapes the pace, activities, and hotel choices.</p>
                        <div className="grid grid-cols-2 gap-3">
                          {STYLE_OPTIONS.map((opt) => (
                            <button key={opt} onClick={() => setPrefs({ ...prefs, style: opt })}
                              className="p-4 rounded-xl font-body text-sm transition-all text-left"
                              style={{ background: prefs.style === opt ? "rgba(180,150,80,0.2)" : "rgba(255,255,255,0.04)", color: prefs.style === opt ? "var(--gold)" : "rgba(240,235,220,0.7)", border: `1px solid ${prefs.style === opt ? "var(--gold)" : "rgba(255,255,255,0.08)"}` }}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 3: Budget */}
                    {step === 3 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Gift size={18} style={{ color: "var(--gold)" }} />
                          <h3 className="font-display text-2xl font-light text-ivory">Curtis's Gift & Your Budget</h3>
                        </div>
                        <p className="font-body text-sm mb-6" style={{ color: "var(--muted)" }}>Curtis is covering the base gift. You can upgrade from there — he'll find out eventually. 😉</p>
                        <div className="space-y-3">
                          {BUDGET_OPTIONS.map((opt) => (
                            <button key={opt.value} onClick={() => setPrefs({ ...prefs, budget: opt.value })}
                              className="w-full p-5 rounded-xl font-body text-left transition-all"
                              style={{ background: prefs.budget === opt.value ? "rgba(180,150,80,0.2)" : "rgba(255,255,255,0.04)", border: `1px solid ${prefs.budget === opt.value ? "var(--gold)" : "rgba(255,255,255,0.08)"}` }}>
                              <div className="font-body text-sm font-medium" style={{ color: prefs.budget === opt.value ? "var(--gold)" : "var(--ivory)" }}>{opt.label}</div>
                              <div className="font-body text-xs mt-1" style={{ color: "var(--muted)" }}>{opt.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 4: Priorities */}
                    {step === 4 && (
                      <div>
                        <h3 className="font-display text-2xl font-light text-ivory mb-2">What matters most to you?</h3>
                        <p className="font-body text-sm mb-6" style={{ color: "var(--muted)" }}>Select your top priorities. I'll weight the itinerary accordingly.</p>
                        <div className="grid grid-cols-2 gap-3">
                          {PRIORITY_OPTIONS.map((opt) => (
                            <button key={opt} onClick={() => setPrefs({ ...prefs, priorities: prefs.priorities.includes(opt) ? prefs.priorities.filter(p => p !== opt) : [...prefs.priorities, opt] })}
                              className="p-4 rounded-xl font-body text-sm transition-all text-left"
                              style={{ background: prefs.priorities.includes(opt) ? "rgba(180,150,80,0.2)" : "rgba(255,255,255,0.04)", color: prefs.priorities.includes(opt) ? "var(--gold)" : "rgba(240,235,220,0.7)", border: `1px solid ${prefs.priorities.includes(opt) ? "var(--gold)" : "rgba(255,255,255,0.08)"}` }}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 5: Special */}
                    {step === 5 && (
                      <div>
                        <h3 className="font-display text-2xl font-light text-ivory mb-2">Any special requests?</h3>
                        <p className="font-body text-sm mb-6" style={{ color: "var(--muted)" }}>Dietary needs, accessibility, must-see places, or anything else. Or just say "surprise me."</p>
                        <textarea
                          value={prefs.special}
                          onChange={(e) => setPrefs({ ...prefs, special: e.target.value })}
                          placeholder="e.g., I'd love to visit Lola at JCU in Rome, I need gluten-free options, I want to see the Uffizi no matter what..."
                          className="w-full glass-card rounded-xl p-4 font-body text-sm text-ivory resize-none outline-none"
                          style={{ minHeight: "120px", color: "var(--ivory)", background: "rgba(255,255,255,0.04)" }}
                        />
                        <p className="font-body text-xs mt-3 italic" style={{ color: "rgba(180,150,80,0.7)" }}>
                          "Leave it blank and I'll surprise you. I've been doing this for years — you're in good hands." — Margaux
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <button onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 font-body text-sm px-5 py-2.5 rounded-full transition-all"
                    style={{ opacity: step === 0 ? 0.3 : 1, background: "rgba(255,255,255,0.04)", color: "rgba(240,235,220,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button onClick={handleWizardNext}
                    disabled={!canProceed()}
                    className="inline-flex items-center gap-2 font-body text-sm font-medium px-6 py-2.5 rounded-full transition-all"
                    style={{ background: canProceed() ? "var(--gold)" : "rgba(180,150,80,0.2)", color: canProceed() ? "var(--navy)" : "rgba(180,150,80,0.4)" }}>
                    {step === 5 ? (
                      <><Sparkles size={14} /> Generate My Itinerary</>
                    ) : (
                      <>Next <ArrowRight size={14} /></>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* CHAT MODE */}
          {mode === "chat" && (
            <motion.div key="chat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="glass-card rounded-3xl overflow-hidden">
                {/* Chat Header */}
                <div className="flex items-center gap-3 p-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-lg font-light" style={{ background: "var(--gold)", color: "var(--navy)" }}>M</div>
                  <div>
                    <div className="font-display text-base font-light text-ivory">Margaux</div>
                    <div className="font-body text-xs" style={{ color: "var(--muted)" }}>Your European Travel Concierge · Online</div>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-5 space-y-4 overflow-y-auto" style={{ maxHeight: "400px" }}>
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] rounded-2xl p-4 font-body text-sm leading-relaxed whitespace-pre-wrap`}
                        style={{
                          background: msg.role === "user" ? "rgba(180,150,80,0.2)" : "rgba(255,255,255,0.06)",
                          color: msg.role === "user" ? "var(--gold)" : "var(--ivory)",
                          border: `1px solid ${msg.role === "user" ? "rgba(180,150,80,0.3)" : "rgba(255,255,255,0.08)"}`,
                        }}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isGenerating && (
                    <div className="flex justify-start">
                      <div className="glass-card rounded-2xl p-4">
                        <div className="flex gap-1">
                          {[0, 1, 2].map(i => (
                            <div key={i} className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--gold)", animationDelay: `${i * 0.15}s` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex gap-3">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleChatSend()}
                      placeholder="Ask Margaux anything about your trip..."
                      className="flex-1 glass-card rounded-xl px-4 py-3 font-body text-sm text-ivory outline-none"
                      style={{ background: "rgba(255,255,255,0.04)", color: "var(--ivory)" }}
                    />
                    <button onClick={handleChatSend} disabled={!chatInput.trim() || isGenerating}
                      className="p-3 rounded-xl transition-all"
                      style={{ background: chatInput.trim() ? "var(--gold)" : "rgba(255,255,255,0.04)", color: chatInput.trim() ? "var(--navy)" : "rgba(240,235,220,0.3)" }}>
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* RESULT MODE */}
          {mode === "result" && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {isGenerating ? (
                <div className="glass-card rounded-3xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center font-display text-3xl font-light mx-auto mb-6" style={{ background: "var(--gold)", color: "var(--navy)" }}>M</div>
                  <h3 className="font-display text-2xl font-light text-ivory mb-3">Margaux is designing your trip...</h3>
                  <p className="font-body text-sm" style={{ color: "var(--muted)" }}>Researching hotels, checking train schedules, and consulting her little black book of European contacts.</p>
                  <div className="flex justify-center gap-2 mt-6">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-3 h-3 rounded-full animate-bounce" style={{ background: "var(--gold)", animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-3xl font-light text-ivory">Your Custom Itinerary</h2>
                    <div className="flex gap-3">
                      <button onClick={handleCopy}
                        className="inline-flex items-center gap-2 font-body text-sm px-4 py-2 rounded-full transition-all"
                        style={{ background: "rgba(255,255,255,0.04)", color: "rgba(240,235,220,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
                      </button>
                      <button onClick={() => { setMode("wizard"); setStep(0); setGeneratedItinerary(""); }}
                        className="inline-flex items-center gap-2 font-body text-sm px-4 py-2 rounded-full transition-all"
                        style={{ background: "rgba(180,150,80,0.15)", color: "var(--gold)", border: "1px solid rgba(180,150,80,0.3)" }}>
                        Start Over
                      </button>
                    </div>
                  </div>

                  <div className="glass-card rounded-3xl p-8 mb-6">
                    <div className="font-body text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "var(--muted)" }}>
                      {generatedItinerary}
                    </div>
                  </div>

                  {/* Follow-up chat */}
                  <div className="glass-card rounded-2xl p-5">
                    <p className="font-body text-sm mb-4" style={{ color: "var(--muted)" }}>
                      Have questions or want to refine the itinerary? Ask Margaux:
                    </p>
                    <div className="flex gap-3">
                      <input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleChatSend()}
                        placeholder="Can we add a day in Cinque Terre? What about upgrading the Paris hotel?"
                        className="flex-1 glass-card rounded-xl px-4 py-3 font-body text-sm text-ivory outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", color: "var(--ivory)" }}
                      />
                      <button onClick={handleChatSend} disabled={!chatInput.trim() || isGenerating}
                        className="p-3 rounded-xl transition-all"
                        style={{ background: chatInput.trim() ? "var(--gold)" : "rgba(255,255,255,0.04)", color: chatInput.trim() ? "var(--navy)" : "rgba(240,235,220,0.3)" }}>
                        <Send size={16} />
                      </button>
                    </div>
                    {messages.length > 2 && (
                      <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
                        {messages.slice(2).map((msg, i) => (
                          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className="max-w-[85%] rounded-xl p-3 font-body text-xs leading-relaxed whitespace-pre-wrap"
                              style={{ background: msg.role === "user" ? "rgba(180,150,80,0.15)" : "rgba(255,255,255,0.04)", color: msg.role === "user" ? "var(--gold)" : "var(--muted)" }}>
                              {msg.content}
                            </div>
                          </div>
                        ))}
                        {isGenerating && (
                          <div className="flex justify-start">
                            <div className="glass-card rounded-xl p-3">
                              <div className="flex gap-1">
                                {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--gold)", animationDelay: `${i * 0.15}s` }} />)}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
