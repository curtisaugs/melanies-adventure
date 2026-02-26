/**
 * Trip Builder — Melanie's European Adventure
 *
 * A guided, conversational AI concierge that helps Melanie build her own
 * custom European itinerary. Multi-step wizard → AI generation → save & share.
 *
 * Persona: Margaux — warm, witty, slightly cheeky travel concierge
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  Heart,
  Zap,
  Users,
  Mountain,
  Share2,
  Copy,
  Check,
  Loader2,
  ChevronDown,
  ChevronUp,
  Star,
  Plane,
  Ship,
  Wine,
  GraduationCap,
  Home,
  Camera,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import type { TripPreferences } from "../../../server/tripBuilder";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WizardStep {
  id: string;
  question: string;
  subtext: string;
  field: keyof TripPreferences;
  type: "single" | "multi" | "text";
  options?: { label: string; value: string; icon?: React.ReactNode; desc?: string }[];
  placeholder?: string;
}

interface CurtisGiftBreakdown {
  coverageNote?: string;
  baseCostForTwo?: string;
  breakdown?: { item: string; cost: string; coveredBy: string }[];
  upgradeOptions?: { item: string; additionalCost: string; margauxVerdict: string }[];
  margauxBudgetNote?: string;
}

interface GeneratedItinerary {
  title: string;
  tagline: string;
  totalDays: number;
  curtisGiftBreakdown?: CurtisGiftBreakdown;
  estimatedBudget?: {
    baseForTwo?: string;
    withUpgrades?: string;
    perPerson?: string;
    forTwo?: string;
    notes?: string;
  };
  flightSuggestion?: {
    departure?: string;
    flyInto?: string;
    flyOutOf?: string;
    estimatedCost?: string;
    airlines?: string[];
    tip?: string;
  };
  days: {
    day: number;
    city: string;
    country: string;
    flag: string;
    headline: string;
    description: string;
    morning: string;
    afternoon: string;
    evening: string;
    accommodation?: {
      name: string;
      type: string;
      estimatedCost: string;
    };
    transportFromPrevious?: string;
    reloNote?: string;
    curtisNote?: string;
  }[];
  highlights: string[];
  margauxNote: string;
}

// ─── Wizard Steps ─────────────────────────────────────────────────────────────

const steps: WizardStep[] = [
  {
    id: "duration",
    question: "How long is this adventure?",
    subtext: "Europe rewards the unhurried. What's your window?",
    field: "duration",
    type: "single",
    options: [
      { label: "8 Days", value: "8 days", icon: <Calendar size={18} />, desc: "A tight but beautiful sprint" },
      { label: "10 Days", value: "10 days", icon: <Calendar size={18} />, desc: "The sweet spot for most trips" },
      { label: "12 Days", value: "12 days", icon: <Calendar size={18} />, desc: "Room to breathe and linger" },
      { label: "14 Days", value: "14 days", icon: <Calendar size={18} />, desc: "The full European immersion" },
    ],
  },
  {
    id: "regions",
    question: "Which corners of Europe are calling?",
    subtext: "Pick as many as you like — Margaux will make them flow.",
    field: "regions",
    type: "multi",
    options: [
      { label: "Rhine River Cruise", value: "Rhine River", icon: <Ship size={18} />, desc: "Basel → Amsterdam, 4 countries, 0 repacking" },
      { label: "Portugal", value: "Portugal", icon: <MapPin size={18} />, desc: "Lisbon, Porto — sun, tiles, and the best wine you've never heard of" },
      { label: "Spain", value: "Spain", icon: <MapPin size={18} />, desc: "Seville, Madrid, Barcelona — flamenco, Gaudí, and jamón" },
      { label: "Southern France", value: "Southern France", icon: <MapPin size={18} />, desc: "Provence, the Riviera, lavender fields in bloom" },
      { label: "Paris", value: "Paris", icon: <Heart size={18} />, desc: "Annie & Thomas are there — enough said" },
      { label: "Switzerland", value: "Switzerland", icon: <Mountain size={18} />, desc: "Basel or Lucerne — chocolate, watches, and jaw-dropping Alps" },
      { label: "Netherlands", value: "Netherlands", icon: <MapPin size={18} />, desc: "Amsterdam, Kinderdijk windmills, tulip fields" },
      { label: "Germany", value: "Germany", icon: <MapPin size={18} />, desc: "Heidelberg, Cologne, the Rhine Gorge" },
    ],
  },
  {
    id: "travelStyle",
    question: "How do you like to travel?",
    subtext: "No wrong answers. Margaux has seen it all.",
    field: "travelStyle",
    type: "single",
    options: [
      { label: "River Cruise", value: "River cruise", icon: <Ship size={18} />, desc: "Unpack once. Let the river do the driving. All meals included." },
      { label: "Self-Guided", value: "Self-guided", icon: <MapPin size={18} />, desc: "Trains, boutique hotels, your own pace. Maximum freedom." },
      { label: "Mix of Both", value: "Mix of both", icon: <Zap size={18} />, desc: "Start on a cruise, then break free. Best of both worlds." },
      { label: "Guided Tour", value: "Small group guided tour", icon: <Users size={18} />, desc: "Expert guide, curated experiences, built-in community." },
    ],
  },
  {
    id: "budget",
    question: "Now — about the budget...",
    subtext: "Curtis has already covered the base trip (~$5k for two: flights + hotels + one special experience 🎁). How much do YOU want to add on top?",
    field: "budget",
    type: "single",
    options: [
      { label: "Just the Gift", value: "Curtis's gift covers it — base $5,000 for two (flights + hotels + one special experience)", icon: <Heart size={18} />, desc: "Flights + mid-range hotels + one special experience. Fully covered. ❤️" },
      { label: "A Little Extra", value: "$1,000–$2,000 extra for upgrades and splurges on top of Curtis's base gift", icon: <DollarSign size={18} />, desc: "A nicer hotel here, a Michelin dinner there. Totally worth it." },
      { label: "Upgrade Mode", value: "$3,000–$5,000 extra for boutique hotels, fine dining, and business class on top of Curtis's base", icon: <Star size={18} />, desc: "Business class, 5-star hotels, the full European royalty experience." },
      { label: "No Ceiling", value: "No budget limit — best of everything. Curtis can find out later.", icon: <Sparkles size={18} />, desc: "This is a 60th birthday. What he doesn't know won't hurt him. 😉" },
    ],
  },
  {
    id: "priorities",
    question: "What matters most on this trip?",
    subtext: "Pick up to 4. These shape everything.",
    field: "priorities",
    type: "multi",
    options: [
      { label: "Relocation Scouting", value: "Relocation scouting", icon: <Home size={18} />, desc: "Neighborhoods, expat life, cost of living" },
      { label: "Graduate Schools", value: "Graduate school visits", icon: <GraduationCap size={18} />, desc: "Campus tours, program research, MBA intel" },
      { label: "Food & Wine", value: "Food & wine", icon: <Wine size={18} />, desc: "Michelin stars, local markets, wine country" },
      { label: "Art & Culture", value: "Art & culture", icon: <Camera size={18} />, desc: "Museums, architecture, history" },
      { label: "Relaxation", value: "Relaxation & spa", icon: <Heart size={18} />, desc: "Slow mornings, thermal baths, no agenda" },
      { label: "Adventure", value: "Active adventures", icon: <Mountain size={18} />, desc: "Hiking, cycling, getting off the tourist trail" },
      { label: "Annie & Paris", value: "Time with Annie in Paris", icon: <Heart size={18} />, desc: "Quality time with your daughter and Thomas" },
      { label: "Nightlife & Music", value: "Nightlife & live music", icon: <Sparkles size={18} />, desc: "Jazz clubs, flamenco shows, rooftop bars" },
    ],
  },
  {
    id: "travelCompanion",
    question: "Who's joining the adventure?",
    subtext: "This shapes the whole vibe.",
    field: "travelCompanion",
    type: "single",
    options: [
      { label: "With Curtis", value: "With Curtis (partner)", icon: <Heart size={18} />, desc: "The two of you — romantic, flexible, perfect" },
      { label: "Solo", value: "Solo", icon: <Star size={18} />, desc: "Your trip, your rules, your pace. Powerful." },
      { label: "With Annie", value: "With Annie (daughter)", icon: <Users size={18} />, desc: "Mother-daughter adventure — unforgettable" },
      { label: "Small Group", value: "Small group of friends", icon: <Users size={18} />, desc: "3–6 people — the more the merrier" },
    ],
  },
  {
    id: "fitnessLevel",
    question: "How active do you want to be?",
    subtext: "Europe has something for every pace.",
    field: "fitnessLevel",
    type: "single",
    options: [
      { label: "Leisurely", value: "Easy walks only — leisurely pace", icon: <Heart size={18} />, desc: "Cafés, museums, gentle strolls. Bliss." },
      { label: "Moderate", value: "Moderate activity — some walking and light hikes", icon: <MapPin size={18} />, desc: "A few miles a day, some stairs, no problem" },
      { label: "Active", value: "Active — hiking, cycling, exploring on foot", icon: <Mountain size={18} />, desc: "Bike tours, vineyard hikes, castle climbs" },
      { label: "Mix", value: "Mix — active days balanced with rest days", icon: <Zap size={18} />, desc: "Push hard some days, recover in style others" },
    ],
  },
  {
    id: "mustSee",
    question: "Anything specific you absolutely must see?",
    subtext: "A city, a restaurant, a vineyard, a museum — tell Margaux everything.",
    field: "mustSee",
    type: "text",
    placeholder: "e.g. 'The Alhambra in Granada', 'A Michelin-starred dinner in Lyon', 'The Lorelei Rock on the Rhine'...",
  },
];

// ─── Styles ───────────────────────────────────────────────────────────────────

const NAV = { background: "rgba(10,15,30,0.92)", borderBottom: "1px solid rgba(201,168,76,0.15)" };
const GOLD = "#c9a84c";
const NAVY = "#0a0f1e";
const IVORY = "#e8e0d0";
const CARD = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.12)" };
const CARD_ACTIVE = { background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.5)" };
const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'Montserrat', sans-serif";

// ─── Sub-components ───────────────────────────────────────────────────────────

function OptionCard({
  option,
  selected,
  onClick,
}: {
  option: { label: string; value: string; icon?: React.ReactNode; desc?: string };
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full text-left rounded-2xl p-4 transition-all"
      style={selected ? CARD_ACTIVE : CARD}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
          style={{ background: selected ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.05)", color: selected ? GOLD : "rgba(232,224,208,0.5)" }}
        >
          {option.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm" style={{ fontFamily: FONT_BODY, color: selected ? IVORY : "rgba(232,224,208,0.8)" }}>
            {option.label}
          </p>
          {option.desc && (
            <p className="text-xs mt-0.5" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.45)" }}>
              {option.desc}
            </p>
          )}
        </div>
        {selected && (
          <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: GOLD }}>
            <Check size={11} style={{ color: NAVY }} />
          </div>
        )}
      </div>
    </motion.button>
  );
}

function DayCard({ day, index }: { day: GeneratedItinerary["days"][0]; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: expanded ? "1px solid rgba(201,168,76,0.35)" : "1px solid rgba(201,168,76,0.1)", background: "rgba(255,255,255,0.02)" }}
    >
      <button
        className="w-full flex items-center gap-4 p-5 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center"
          style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)" }}
        >
          <span className="text-xs" style={{ color: GOLD, fontFamily: FONT_BODY, fontWeight: 600 }}>DAY</span>
          <span className="text-lg font-bold leading-none" style={{ color: GOLD, fontFamily: FONT_DISPLAY }}>{day.day}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold" style={{ fontFamily: FONT_BODY, color: IVORY, fontSize: "0.95rem" }}>
            {day.flag} {day.city}, {day.country}
          </p>
          <p className="text-sm mt-0.5" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.55)" }}>{day.headline}</p>
        </div>
        <div style={{ color: GOLD, flexShrink: 0 }}>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-5 pb-6 space-y-4">
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.875rem", lineHeight: 1.75, color: "rgba(232,224,208,0.7)" }}>
                {day.description}
              </p>

              {/* Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Morning", content: day.morning },
                  { label: "Afternoon", content: day.afternoon },
                  { label: "Evening", content: day.evening },
                ].map((slot) => (
                  <div key={slot.label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-xs tracking-widest uppercase mb-1.5" style={{ color: GOLD, fontFamily: FONT_BODY }}>{slot.label}</p>
                    <p className="text-xs" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.7)", lineHeight: 1.6 }}>{slot.content}</p>
                  </div>
                ))}
              </div>

              {/* Accommodation */}
              {day.accommodation && (
                <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)" }}>
                  <Home size={14} style={{ color: GOLD, flexShrink: 0 }} />
                  <div>
                    <span className="text-xs font-semibold" style={{ fontFamily: FONT_BODY, color: IVORY }}>{day.accommodation.name}</span>
                    <span className="text-xs ml-2" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.5)" }}>
                      {day.accommodation.type} · {day.accommodation.estimatedCost}
                    </span>
                  </div>
                </div>
              )}

              {/* Transport */}
              {day.transportFromPrevious && (
                <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: "rgba(100,180,255,0.04)", border: "1px solid rgba(100,180,255,0.1)" }}>
                  <Plane size={14} style={{ color: "#7ec8e3", flexShrink: 0 }} />
                  <p className="text-xs" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.65)" }}>{day.transportFromPrevious}</p>
                </div>
              )}

              {/* Relo Note */}
              {day.reloNote && (
                <div className="rounded-xl p-3 flex items-start gap-3" style={{ background: "rgba(100,200,150,0.04)", border: "1px solid rgba(100,200,150,0.12)" }}>
                  <MapPin size={14} style={{ color: "#7ecba0", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#7ecba0", fontFamily: FONT_BODY }}>Relocation Scout Note</p>
                    <p className="text-xs" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.65)", lineHeight: 1.6 }}>{day.reloNote}</p>
                  </div>
                </div>
              )}

              {/* Curtis Note */}
              {day.curtisNote && (
                <div className="rounded-xl p-3 flex items-start gap-3" style={{ background: "rgba(232,116,138,0.05)", border: "1px solid rgba(232,116,138,0.15)" }}>
                  <Heart size={14} style={{ color: "#e8748a", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#e8748a", fontFamily: FONT_BODY }}>From Curtis</p>
                    <p className="text-xs" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.65)", lineHeight: 1.6 }}>{day.curtisNote}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TripBuilder() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<TripPreferences>>({
    regions: [],
    priorities: [],
  });
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMutation = trpc.tripBuilder.generate.useMutation();
  const saveMutation = trpc.tripBuilder.save.useMutation();

  const step = steps[currentStep];
  const totalSteps = steps.length;
  const progress = ((currentStep) / totalSteps) * 100;

  const currentValue = answers[step?.field as keyof TripPreferences];

  const isStepComplete = () => {
    if (!step) return false;
    if (step.type === "text") return true; // optional
    if (step.type === "multi") {
      const val = answers[step.field] as string[] | undefined;
      return Array.isArray(val) && val.length > 0;
    }
    return !!answers[step.field];
  };

  const handleSingleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step.field]: value }));
  };

  const handleMultiSelect = (value: string) => {
    const field = step.field as "regions" | "priorities";
    const current = (answers[field] as string[]) || [];
    if (current.includes(value)) {
      setAnswers((prev) => ({ ...prev, [field]: current.filter((v) => v !== value) }));
    } else {
      setAnswers((prev) => ({ ...prev, [field]: [...current, value] }));
    }
  };

  const handleTextChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step.field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const prefs: TripPreferences = {
        duration: answers.duration || "10 days",
        regions: answers.regions || [],
        travelStyle: answers.travelStyle || "Self-guided",
        budget: answers.budget || "$5,000–$8,000 per person",
        priorities: answers.priorities || [],
        mustSee: answers.mustSee,
        startCity: answers.startCity,
        endCity: answers.endCity,
        travelCompanion: answers.travelCompanion || "With Curtis (partner)",
        fitnessLevel: answers.fitnessLevel || "Moderate activity — some walking and light hikes",
      };

      const result = await generateMutation.mutateAsync(prefs);
      setGeneratedItinerary(result.itinerary as unknown as GeneratedItinerary);
    } catch (err) {
      setError("Margaux ran into a snag. Please try again!");
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedItinerary) return;
    try {
      const result = await saveMutation.mutateAsync({
        title: generatedItinerary.title,
        itineraryJson: JSON.stringify(generatedItinerary),
        preferencesJson: JSON.stringify(answers),
      });
      setShareId(result.shareId);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleCopyLink = () => {
    if (!shareId) return;
    const url = `${window.location.origin}/trip/${shareId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ── Generating Screen ──
  if (generating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: NAVY }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md px-6"
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={32} style={{ color: GOLD }} />
            </motion.div>
          </div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "2rem", fontWeight: 300, color: IVORY, marginBottom: "1rem" }}>
            Margaux is crafting your itinerary…
          </h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.875rem", color: "rgba(232,224,208,0.55)", lineHeight: 1.7 }}>
            She's consulting her Rolodex of hidden restaurants, checking the train schedules, and picking the best rooms with river views. This takes about 20–30 seconds.
          </p>
          <div className="mt-8 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                className="w-2 h-2 rounded-full"
                style={{ background: GOLD }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Generated Itinerary View ──
  if (generatedItinerary) {
    return (
      <div className="min-h-screen" style={{ background: NAVY, color: IVORY }}>
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={NAV}>
          <button
            onClick={() => setGeneratedItinerary(null)}
            className="flex items-center gap-2 text-sm"
            style={{ color: GOLD, fontFamily: FONT_BODY }}
          >
            <ArrowLeft size={16} />
            Build Another
          </button>
          <Link href="/">
            <span className="text-xs tracking-widest uppercase cursor-pointer" style={{ color: "rgba(232,224,208,0.5)", fontFamily: FONT_BODY }}>
              Melanie's European Adventure
            </span>
          </Link>
        </nav>

        <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs tracking-widest uppercase" style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", color: GOLD, fontFamily: FONT_BODY }}>
              <Sparkles size={12} />
              Crafted by Margaux, just for you
            </div>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: IVORY, lineHeight: 1.1 }}>
              {generatedItinerary.title}
            </h1>
            <p className="mt-3 text-lg italic" style={{ fontFamily: FONT_DISPLAY, color: GOLD }}>
              {generatedItinerary.tagline}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { icon: <Calendar size={14} />, label: `${generatedItinerary.totalDays} Days` },
                generatedItinerary.estimatedBudget?.perPerson && { icon: <DollarSign size={14} />, label: `${generatedItinerary.estimatedBudget.perPerson} per person` },
                generatedItinerary.flightSuggestion?.flyInto && { icon: <Plane size={14} />, label: `Fly into ${generatedItinerary.flightSuggestion.flyInto}` },
              ].filter(Boolean).map((stat: any) => (
                <div key={stat.label} className="flex items-center gap-2 text-sm" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.7)" }}>
                  <span style={{ color: GOLD }}>{stat.icon}</span>
                  {stat.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          {generatedItinerary.highlights?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl p-6 mb-10"
              style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.18)" }}
            >
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: GOLD, fontFamily: FONT_BODY }}>Trip Highlights</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {generatedItinerary.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Star size={12} style={{ color: GOLD, flexShrink: 0, marginTop: "3px" }} />
                    <span className="text-sm" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.75)" }}>{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Flight Suggestion */}
          {generatedItinerary.flightSuggestion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl p-6 mb-10"
              style={{ background: "rgba(100,180,255,0.04)", border: "1px solid rgba(100,180,255,0.12)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Plane size={16} style={{ color: "#7ec8e3" }} />
                <p className="text-xs tracking-widest uppercase" style={{ color: "#7ec8e3", fontFamily: FONT_BODY }}>Flight Plan from LAX</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Fly Into", value: generatedItinerary.flightSuggestion.flyInto },
                  { label: "Fly Out Of", value: generatedItinerary.flightSuggestion.flyOutOf },
                  { label: "Est. Cost", value: generatedItinerary.flightSuggestion.estimatedCost },
                  { label: "Airlines", value: generatedItinerary.flightSuggestion.airlines?.join(", ") },
                ].filter(s => s.value).map((s) => (
                  <div key={s.label}>
                    <p className="text-xs" style={{ color: "rgba(232,224,208,0.4)", fontFamily: FONT_BODY }}>{s.label}</p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: IVORY, fontFamily: FONT_BODY }}>{s.value}</p>
                  </div>
                ))}
              </div>
              {generatedItinerary.flightSuggestion.tip && (
                <p className="mt-3 text-xs" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.5)", fontStyle: "italic" }}>
                  💡 {generatedItinerary.flightSuggestion.tip}
                </p>
              )}
            </motion.div>
          )}

          {/* Day-by-Day */}
          <div className="mb-10">
            <h2 className="text-2xl mb-6" style={{ fontFamily: FONT_DISPLAY, color: IVORY, fontWeight: 300 }}>
              Day-by-Day Itinerary
            </h2>
            <div className="space-y-3">
              {generatedItinerary.days.map((day, i) => (
                <DayCard key={day.day} day={day} index={i} />
              ))}
            </div>
          </div>

          {/* Curtis's Gift Breakdown */}
          {generatedItinerary.curtisGiftBreakdown && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-6 mb-6"
              style={{ background: "rgba(232,116,138,0.04)", border: "1px solid rgba(232,116,138,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span style={{ fontSize: "1.2rem" }}>🎁</span>
                <p className="text-xs tracking-widest uppercase" style={{ color: "#e8748a", fontFamily: FONT_BODY }}>Curtis's Birthday Gift</p>
              </div>
              {generatedItinerary.curtisGiftBreakdown.coverageNote && (
                <p className="text-sm italic mb-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.05rem", color: "rgba(232,224,208,0.8)", lineHeight: 1.7 }}>
                  "{generatedItinerary.curtisGiftBreakdown.coverageNote}"
                </p>
              )}
              {/* What's covered */}
              {generatedItinerary.curtisGiftBreakdown.breakdown && generatedItinerary.curtisGiftBreakdown.breakdown.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(232,224,208,0.4)", fontFamily: FONT_BODY }}>What Curtis Is Covering</p>
                  <div className="space-y-2">
                    {generatedItinerary.curtisGiftBreakdown.breakdown.map((item, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl px-4 py-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <span className="text-sm" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.75)" }}>{item.item}</span>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                          <span className="text-sm font-semibold" style={{ fontFamily: FONT_BODY, color: GOLD }}>{item.cost}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(232,116,138,0.15)", color: "#e8748a", fontFamily: FONT_BODY }}>{item.coveredBy}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {generatedItinerary.curtisGiftBreakdown.baseCostForTwo && (
                    <div className="mt-3 flex items-center justify-between rounded-xl px-4 py-3" style={{ background: "rgba(232,116,138,0.08)", border: "1px solid rgba(232,116,138,0.25)" }}>
                      <span className="text-sm font-semibold" style={{ fontFamily: FONT_BODY, color: IVORY }}>Total Gift Value</span>
                      <span className="text-base font-bold" style={{ fontFamily: FONT_DISPLAY, color: "#e8748a" }}>{generatedItinerary.curtisGiftBreakdown.baseCostForTwo}</span>
                    </div>
                  )}
                </div>
              )}
              {/* Upgrade options */}
              {generatedItinerary.curtisGiftBreakdown.upgradeOptions && generatedItinerary.curtisGiftBreakdown.upgradeOptions.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(232,224,208,0.4)", fontFamily: FONT_BODY }}>Melanie's Upgrade Menu ✨</p>
                  <div className="space-y-2">
                    {generatedItinerary.curtisGiftBreakdown.upgradeOptions.map((opt, i) => (
                      <div key={i} className="rounded-xl p-3" style={{ background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.12)" }}>
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-sm" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.75)" }}>{opt.item}</span>
                          <span className="text-sm font-semibold flex-shrink-0" style={{ fontFamily: FONT_BODY, color: GOLD }}>{opt.additionalCost}</span>
                        </div>
                        <p className="text-xs mt-1 italic" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.45)" }}>Margaux says: {opt.margauxVerdict}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {generatedItinerary.curtisGiftBreakdown.margauxBudgetNote && (
                <p className="text-xs italic mt-2" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.5)", lineHeight: 1.7 }}>
                  💌 {generatedItinerary.curtisGiftBreakdown.margauxBudgetNote}
                </p>
              )}
            </motion.div>
          )}
          {/* Budget Summary */}
          {generatedItinerary.estimatedBudget && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-6 mb-10"
              style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.18)" }}
            >
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: GOLD, fontFamily: FONT_BODY }}>Full Budget Summary</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Base (Curtis's Gift)", value: generatedItinerary.estimatedBudget.baseForTwo || generatedItinerary.estimatedBudget.forTwo },
                  { label: "With Upgrades", value: generatedItinerary.estimatedBudget.withUpgrades },
                  { label: "Notes", value: generatedItinerary.estimatedBudget.notes },
                ].filter(s => s.value).map((s) => (
                  <div key={s.label}>
                    <p className="text-xs mb-1" style={{ color: "rgba(232,224,208,0.4)", fontFamily: FONT_BODY }}>{s.label}</p>
                    <p className="text-sm" style={{ color: IVORY, fontFamily: FONT_BODY }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Margaux's Note */}
          {generatedItinerary.margauxNote && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-6 mb-10"
              style={{ background: "rgba(232,116,138,0.05)", border: "1px solid rgba(232,116,138,0.15)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} style={{ color: "#e8748a" }} />
                <p className="text-xs tracking-widest uppercase" style={{ color: "#e8748a", fontFamily: FONT_BODY }}>A Note from Margaux</p>
              </div>
              <p className="text-sm italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "rgba(232,224,208,0.8)", lineHeight: 1.75 }}>
                "{generatedItinerary.margauxNote}"
              </p>
            </motion.div>
          )}

          {/* Save & Share */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!shareId ? (
              <button
                onClick={handleSave}
                disabled={saveMutation.isPending}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase transition-all"
                style={{ background: GOLD, color: NAVY, fontFamily: FONT_BODY }}
              >
                {saveMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Share2 size={16} />}
                Save & Get Shareable Link
              </button>
            ) : (
              <div className="flex items-center gap-3 px-6 py-4 rounded-full" style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)" }}>
                <Check size={16} style={{ color: GOLD }} />
                <span className="text-sm" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.7)" }}>
                  {`${window.location.origin}/trip/${shareId}`}
                </span>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-all"
                  style={{ background: GOLD, color: NAVY, fontFamily: FONT_BODY, fontWeight: 600 }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            )}
            <button
              onClick={() => { setGeneratedItinerary(null); setShareId(null); setCurrentStep(0); setAnswers({ regions: [], priorities: [] }); }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-widest uppercase"
              style={{ border: "1px solid rgba(201,168,76,0.3)", color: GOLD, fontFamily: FONT_BODY }}
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Wizard ──
  return (
    <div className="min-h-screen" style={{ background: NAVY, color: IVORY }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={NAV}>
        <Link href="/">
          <span className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: GOLD, fontFamily: FONT_BODY }}>
            <ArrowLeft size={16} />
            Melanie's European Adventure
          </span>
        </Link>
        <span className="text-xs" style={{ color: "rgba(232,224,208,0.4)", fontFamily: FONT_BODY }}>
          Step {currentStep + 1} of {totalSteps}
        </span>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(201,168,76,0.1)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(to right, ${GOLD}, #e8c56a)` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Margaux Intro (first step only) */}
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 mb-8"
            style={{ background: "rgba(232,116,138,0.05)", border: "1px solid rgba(232,116,138,0.15)" }}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(232,116,138,0.15)" }}>
                <Sparkles size={18} style={{ color: "#e8748a" }} />
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#e8748a", fontFamily: FONT_BODY }}>Margaux, Your Travel Concierge</p>
                <p className="text-sm" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.75)", lineHeight: 1.7 }}>
                  Bonjour, Melanie! Curtis asked me to help you design the European adventure of your dreams — or as he put it, your "50th birthday trip." 😉 I'll ask you a few questions, then build you a fully costed, day-by-day itinerary you can save and share. Let's begin, shall we?
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 300, color: IVORY, marginBottom: "0.5rem" }}>
              {step.question}
            </h2>
            <p className="mb-8 text-sm" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.5)" }}>
              {step.subtext}
            </p>

            {/* Options */}
            {step.type !== "text" && step.options && (
              <div className={`grid gap-3 ${step.options.length <= 4 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
                {step.options.map((option) => {
                  const isSelected =
                    step.type === "multi"
                      ? ((answers[step.field] as string[]) || []).includes(option.value)
                      : answers[step.field] === option.value;
                  return (
                    <OptionCard
                      key={option.value}
                      option={option}
                      selected={isSelected}
                      onClick={() =>
                        step.type === "multi"
                          ? handleMultiSelect(option.value)
                          : handleSingleSelect(option.value)
                      }
                    />
                  );
                })}
              </div>
            )}

            {/* Text Input */}
            {step.type === "text" && (
              <textarea
                value={(answers[step.field] as string) || ""}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={step.placeholder}
                rows={4}
                className="w-full rounded-2xl p-4 text-sm resize-none outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  color: IVORY,
                  fontFamily: FONT_BODY,
                  lineHeight: 1.7,
                }}
              />
            )}

            {/* Multi-select count hint */}
            {step.type === "multi" && (
              <p className="mt-3 text-xs" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.35)" }}>
                {((answers[step.field] as string[]) || []).length} selected
                {step.id === "priorities" ? " (up to 4 recommended)" : ""}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Error */}
        {error && (
          <div className="mt-4 p-4 rounded-xl text-sm" style={{ background: "rgba(255,100,100,0.08)", border: "1px solid rgba(255,100,100,0.2)", color: "#ff8a8a", fontFamily: FONT_BODY }}>
            {error}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-full text-sm transition-all"
            style={{
              border: "1px solid rgba(201,168,76,0.2)",
              color: currentStep === 0 ? "rgba(232,224,208,0.2)" : GOLD,
              fontFamily: FONT_BODY,
              cursor: currentStep === 0 ? "not-allowed" : "pointer",
            }}
          >
            <ArrowLeft size={14} />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepComplete() && step.type !== "text"}
            className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold transition-all"
            style={{
              background: isStepComplete() || step.type === "text" ? GOLD : "rgba(201,168,76,0.2)",
              color: isStepComplete() || step.type === "text" ? NAVY : "rgba(232,224,208,0.3)",
              fontFamily: FONT_BODY,
              cursor: isStepComplete() || step.type === "text" ? "pointer" : "not-allowed",
            }}
          >
            {currentStep === totalSteps - 1 ? (
              <>
                <Sparkles size={14} />
                Build My Itinerary
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
