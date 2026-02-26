/**
 * SharedItinerary — loads and displays a saved itinerary by shareId
 * Accessed via /trip/:shareId
 */

import { useState, useCallback } from "react";
import { Link, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Calendar,
  DollarSign,
  Plane,
  Star,
  MapPin,
  Heart,
  Home,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Download,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ItineraryDay {
  day: number;
  city: string;
  country: string;
  flag: string;
  headline: string;
  description: string;
  morning: string;
  afternoon: string;
  evening: string;
  accommodation?: { name: string; type: string; estimatedCost: string };
  transportFromPrevious?: string;
  reloNote?: string;
  curtisNote?: string;
}

interface CurtisGiftBreakdown {
  coverageNote?: string;
  baseCostForTwo?: string;
  breakdown?: { item: string; cost: string; coveredBy: string }[];
  upgradeOptions?: { item: string; additionalCost: string; margauxVerdict: string }[];
  margauxBudgetNote?: string;
}

interface FullItinerary {
  title: string;
  tagline: string;
  totalDays: number;
  curtisGiftBreakdown?: CurtisGiftBreakdown;
  estimatedBudget?: { baseForTwo?: string; withUpgrades?: string; perPerson?: string; forTwo?: string; notes?: string };
  flightSuggestion?: {
    flyInto?: string;
    flyOutOf?: string;
    estimatedCost?: string;
    airlines?: string[];
    tip?: string;
  };
  days: ItineraryDay[];
  highlights: string[];
  margauxNote: string;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const GOLD = "#c9a84c";
const NAVY = "#0a0f1e";
const IVORY = "#e8e0d0";
const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'Montserrat', sans-serif";
const NAV = { background: "rgba(10,15,30,0.92)", borderBottom: "1px solid rgba(201,168,76,0.15)" };

// ─── Day Card ─────────────────────────────────────────────────────────────────

function DayCard({ day, index }: { day: ItineraryDay; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: expanded ? "1px solid rgba(201,168,76,0.35)" : "1px solid rgba(201,168,76,0.1)", background: "rgba(255,255,255,0.02)" }}
    >
      <button className="w-full flex items-center gap-4 p-5 text-left" onClick={() => setExpanded(!expanded)}>
        <div className="flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center" style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)" }}>
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
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.875rem", lineHeight: 1.75, color: "rgba(232,224,208,0.7)" }}>{day.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[{ label: "Morning", content: day.morning }, { label: "Afternoon", content: day.afternoon }, { label: "Evening", content: day.evening }].map((slot) => (
                  <div key={slot.label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-xs tracking-widest uppercase mb-1.5" style={{ color: GOLD, fontFamily: FONT_BODY }}>{slot.label}</p>
                    <p className="text-xs" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.7)", lineHeight: 1.6 }}>{slot.content}</p>
                  </div>
                ))}
              </div>
              {day.accommodation && (
                <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)" }}>
                  <Home size={14} style={{ color: GOLD, flexShrink: 0 }} />
                  <div>
                    <span className="text-xs font-semibold" style={{ fontFamily: FONT_BODY, color: IVORY }}>{day.accommodation.name}</span>
                    <span className="text-xs ml-2" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.5)" }}>{day.accommodation.type} · {day.accommodation.estimatedCost}</span>
                  </div>
                </div>
              )}
              {day.transportFromPrevious && (
                <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: "rgba(100,180,255,0.04)", border: "1px solid rgba(100,180,255,0.1)" }}>
                  <Plane size={14} style={{ color: "#7ec8e3", flexShrink: 0 }} />
                  <p className="text-xs" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.65)" }}>{day.transportFromPrevious}</p>
                </div>
              )}
              {day.reloNote && (
                <div className="rounded-xl p-3 flex items-start gap-3" style={{ background: "rgba(100,200,150,0.04)", border: "1px solid rgba(100,200,150,0.12)" }}>
                  <MapPin size={14} style={{ color: "#7ecba0", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#7ecba0", fontFamily: FONT_BODY }}>Relocation Scout Note</p>
                    <p className="text-xs" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.65)", lineHeight: 1.6 }}>{day.reloNote}</p>
                  </div>
                </div>
              )}
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

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SharedItinerary() {
  const params = useParams<{ shareId: string }>();
  const shareId = params.shareId;
  const [copied, setCopied] = useState(false);

  const { data, isLoading, error } = trpc.tripBuilder.getByShareId.useQuery(
    { shareId: shareId || "" },
    { enabled: !!shareId }
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: NAVY }}>
        <div className="text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="inline-block mb-4">
            <Sparkles size={32} style={{ color: GOLD }} />
          </motion.div>
          <p style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.5)", fontSize: "0.875rem" }}>Loading your itinerary…</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: NAVY }}>
        <div className="text-center max-w-md px-6">
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: "2rem", color: IVORY, marginBottom: "1rem" }}>Itinerary Not Found</p>
          <p style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.5)", fontSize: "0.875rem", marginBottom: "2rem" }}>
            This itinerary may have expired or the link may be incorrect.
          </p>
          <Link href="/build-my-trip">
            <button className="px-6 py-3 rounded-full text-sm" style={{ background: GOLD, color: NAVY, fontFamily: FONT_BODY, fontWeight: 600 }}>
              Build a New Itinerary
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const itinerary = data.itinerary as FullItinerary;

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

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
        <div className="flex items-center gap-2 no-print">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 text-xs px-4 py-2 rounded-full transition-all hover:bg-amber-900/20"
            style={{ border: "1px solid rgba(201,168,76,0.3)", color: GOLD, fontFamily: FONT_BODY }}
            title="Download as PDF"
          >
            <Download size={12} />
            Download PDF
          </button>
          <button onClick={handleCopy} className="flex items-center gap-2 text-xs px-4 py-2 rounded-full transition-all" style={{ border: "1px solid rgba(201,168,76,0.3)", color: GOLD, fontFamily: FONT_BODY }}>
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Share Link"}
          </button>
        </div>
      </nav>

      {/* Print-only header — hidden on screen, shown in print */}
      <div className="print-only" style={{ display: "none" }}>
        <div className="print-header">
          <span className="print-title">Melanie's European Adventure</span>
          <span className="print-date">Crafted by Margaux &bull; {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Print-only footer watermark */}
      <div className="print-footer" style={{ display: "none" }}>
        Melanie's European Adventure &bull; Crafted with love by Margaux
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs tracking-widest uppercase" style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", color: GOLD, fontFamily: FONT_BODY }}>
            <Sparkles size={12} />
            Crafted by Margaux, just for Melanie
          </div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: IVORY, lineHeight: 1.1 }}>
            {itinerary.title}
          </h1>
          <p className="mt-3 text-lg italic" style={{ fontFamily: FONT_DISPLAY, color: GOLD }}>{itinerary.tagline}</p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { icon: <Calendar size={14} />, label: `${itinerary.totalDays} Days` },
              itinerary.estimatedBudget?.perPerson && { icon: <DollarSign size={14} />, label: `${itinerary.estimatedBudget.perPerson} per person` },
              itinerary.flightSuggestion?.flyInto && { icon: <Plane size={14} />, label: `Fly into ${itinerary.flightSuggestion.flyInto}` },
            ].filter(Boolean).map((stat: any) => (
              <div key={stat.label} className="flex items-center gap-2 text-sm" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.7)" }}>
                <span style={{ color: GOLD }}>{stat.icon}</span>
                {stat.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Highlights */}
        {itinerary.highlights?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl p-6 mb-10" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.18)" }}>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: GOLD, fontFamily: FONT_BODY }}>Trip Highlights</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {itinerary.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Star size={12} style={{ color: GOLD, flexShrink: 0, marginTop: "3px" }} />
                  <span className="text-sm" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.75)" }}>{h}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Flight Suggestion */}
        {itinerary.flightSuggestion && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-2xl p-6 mb-10" style={{ background: "rgba(100,180,255,0.04)", border: "1px solid rgba(100,180,255,0.12)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Plane size={16} style={{ color: "#7ec8e3" }} />
              <p className="text-xs tracking-widest uppercase" style={{ color: "#7ec8e3", fontFamily: FONT_BODY }}>Flight Plan from LAX</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Fly Into", value: itinerary.flightSuggestion.flyInto },
                { label: "Fly Out Of", value: itinerary.flightSuggestion.flyOutOf },
                { label: "Est. Cost", value: itinerary.flightSuggestion.estimatedCost },
                { label: "Airlines", value: itinerary.flightSuggestion.airlines?.join(", ") },
              ].filter((s) => s.value).map((s) => (
                <div key={s.label}>
                  <p className="text-xs" style={{ color: "rgba(232,224,208,0.4)", fontFamily: FONT_BODY }}>{s.label}</p>
                  <p className="text-sm font-medium mt-0.5" style={{ color: IVORY, fontFamily: FONT_BODY }}>{s.value}</p>
                </div>
              ))}
            </div>
            {itinerary.flightSuggestion.tip && (
              <p className="mt-3 text-xs" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.5)", fontStyle: "italic" }}>💡 {itinerary.flightSuggestion.tip}</p>
            )}
          </motion.div>
        )}

        {/* Day-by-Day */}
        <div className="mb-10">
          <h2 className="text-2xl mb-6" style={{ fontFamily: FONT_DISPLAY, color: IVORY, fontWeight: 300 }}>Day-by-Day Itinerary</h2>
          <div className="space-y-3">
            {itinerary.days.map((day, i) => <DayCard key={day.day} day={day} index={i} />)}
          </div>
        </div>

        {/* Curtis's Gift Breakdown */}
        {itinerary.curtisGiftBreakdown && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-6 mb-6 curtis-gift-section" style={{ background: "rgba(232,116,138,0.04)", border: "1px solid rgba(232,116,138,0.2)" }}>
            <div className="flex items-center gap-2 mb-4">
              <span style={{ fontSize: "1.2rem" }}>🎁</span>
              <p className="text-xs tracking-widest uppercase" style={{ color: "#e8748a", fontFamily: FONT_BODY }}>Curtis's Birthday Gift</p>
            </div>
            {itinerary.curtisGiftBreakdown.coverageNote && (
              <p className="text-sm italic mb-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.05rem", color: "rgba(232,224,208,0.8)", lineHeight: 1.7 }}>
                "{itinerary.curtisGiftBreakdown.coverageNote}"
              </p>
            )}
            {itinerary.curtisGiftBreakdown.breakdown && itinerary.curtisGiftBreakdown.breakdown.length > 0 && (
              <div className="mb-5">
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(232,224,208,0.4)", fontFamily: FONT_BODY }}>What Curtis Is Covering</p>
                <div className="space-y-2">
                  {itinerary.curtisGiftBreakdown.breakdown.map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl px-4 py-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="text-sm" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.75)" }}>{item.item}</span>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                        <span className="text-sm font-semibold" style={{ fontFamily: FONT_BODY, color: GOLD }}>{item.cost}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(232,116,138,0.15)", color: "#e8748a", fontFamily: FONT_BODY }}>{item.coveredBy}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {itinerary.curtisGiftBreakdown.baseCostForTwo && (
                  <div className="mt-3 flex items-center justify-between rounded-xl px-4 py-3" style={{ background: "rgba(232,116,138,0.08)", border: "1px solid rgba(232,116,138,0.25)" }}>
                    <span className="text-sm font-semibold" style={{ fontFamily: FONT_BODY, color: IVORY }}>Total Gift Value</span>
                    <span className="text-base font-bold" style={{ fontFamily: FONT_DISPLAY, color: "#e8748a" }}>{itinerary.curtisGiftBreakdown.baseCostForTwo}</span>
                  </div>
                )}
              </div>
            )}
            {itinerary.curtisGiftBreakdown.upgradeOptions && itinerary.curtisGiftBreakdown.upgradeOptions.length > 0 && (
              <div className="mb-4">
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(232,224,208,0.4)", fontFamily: FONT_BODY }}>Melanie's Upgrade Menu ✨</p>
                <div className="space-y-2">
                  {itinerary.curtisGiftBreakdown.upgradeOptions.map((opt, i) => (
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
            {itinerary.curtisGiftBreakdown.margauxBudgetNote && (
              <p className="text-xs italic mt-2" style={{ fontFamily: FONT_BODY, color: "rgba(232,224,208,0.5)", lineHeight: 1.7 }}>
                💌 {itinerary.curtisGiftBreakdown.margauxBudgetNote}
              </p>
            )}
          </motion.div>
        )}

        {/* Budget Summary */}
        {itinerary.estimatedBudget && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-6 mb-10" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.18)" }}>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: GOLD, fontFamily: FONT_BODY }}>Full Budget Summary</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Base (Curtis's Gift)", value: itinerary.estimatedBudget.baseForTwo || itinerary.estimatedBudget.forTwo },
                { label: "With Upgrades", value: itinerary.estimatedBudget.withUpgrades },
                { label: "Notes", value: itinerary.estimatedBudget.notes },
              ].filter((s) => s.value).map((s) => (
                <div key={s.label}>
                  <p className="text-xs mb-1" style={{ color: "rgba(232,224,208,0.4)", fontFamily: FONT_BODY }}>{s.label}</p>
                  <p className="text-sm" style={{ color: IVORY, fontFamily: FONT_BODY }}>{s.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Margaux Note */}
        {itinerary.margauxNote && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-6 mb-10" style={{ background: "rgba(232,116,138,0.05)", border: "1px solid rgba(232,116,138,0.15)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} style={{ color: "#e8748a" }} />
              <p className="text-xs tracking-widest uppercase" style={{ color: "#e8748a", fontFamily: FONT_BODY }}>A Note from Margaux</p>
            </div>
            <p className="text-sm italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "rgba(232,224,208,0.8)", lineHeight: 1.75 }}>
              "{itinerary.margauxNote}"
            </p>
          </motion.div>
        )}

        {/* CTAs — hidden in print */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
          <Link href="/build-my-trip">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase" style={{ background: GOLD, color: NAVY, fontFamily: FONT_BODY }}>
              <Sparkles size={14} />
              Build Your Own
            </button>
          </Link>
          <button onClick={handleCopy} className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-widest uppercase" style={{ border: "1px solid rgba(201,168,76,0.3)", color: GOLD, fontFamily: FONT_BODY }}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy Share Link"}
          </button>
        </div>
      </div>
    </div>
  );
}
