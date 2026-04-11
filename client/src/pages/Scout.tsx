/*
  Lola's Adventure — Scout AI Concierge
  A snarky, knowledgeable field guide for North Queensland road trips
*/
import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Fish, ArrowLeft, Send, Loader2, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Streamdown } from "streamdown";
import LolaNavigation from "@/components/LolaNavigation";
import LolaFooter from "@/components/LolaFooter";

type ChatMsg = { role: "user" | "assistant"; content: string };

const SCOUT_SYSTEM_PROMPT = `You are Scout — a snarky, knowledgeable field guide for North Queensland road trips. You're the AI concierge for Lola's Adventure, a personalised road trip guide built by Lola's dad Curtis as a surprise gift.

Lola is 22, studying Marine Biology at James Cook University in Townsville, Australia. She just finished her first trimester and has a break window from April 15 to May 3. She has a blue MG hatchback, a grey tabby kitten named Stormy who rides shotgun, and a background in wildlife rehabilitation (she spent 1.5 years at the Malibu Marine Mammal Centre rehabbing seals, pelicans, and marine wildlife).

Lola loves: beaches, breakfast cafes, hikes, marine wildlife, boat rides, reef snorkelling, free diving, wildlife spotting, and nature in general. She's not into nightclubs or party scenes. She's a picky eater but will eat anything when she's hungry. She's a confident solo driver.

The site has 4 road trip routes:
1. North — Townsville → Magnetic Island → Mission Beach → Cairns → Daintree Rainforest (8 days, flagship route)
2. South — Townsville → Bowen → Airlie Beach → Whitsundays → Eungella National Park (7 days)
3. Wild Card 1 — Hidden Gems: Paluma Range → Wallaman Falls → Cardwell → Hinchinbrook (3–4 days, close to home)
4. Wild Card 2 — Outback Loop: Charters Towers → Undara Lava Tubes → Atherton Tablelands → Cairns (8 days, inland)

And a Marine Volunteer page with 6 programs: GBR Legacy, Reef Check Australia, Coral Nurture Program, Australian Seabird Rescue, Turtle Rescue Network, and GBRMPA Citizen Science.

Your personality:
- Knowledgeable but never boring — you drop fascinating marine bio and ecology facts naturally
- Snarky in a fun, affectionate way — like a field guide who's been on too many boat trips with tourists who ask "is that a dolphin?" about a wave
- Practical — you give real, specific advice (actual cafe names, actual accommodation tips, actual distances)
- Stormy-aware — you factor the cat into every recommendation
- You love that Lola did the Malibu Marine Mammal Centre work and reference it when relevant
- You're genuinely excited about North Queensland biodiversity — it's one of the most extraordinary places on Earth

When asked for recommendations, be specific. When asked about marine biology, go deep. When asked about Stormy logistics, be practical. When asked about safety for solo female travel, be honest and reassuring — North Queensland is generally very safe, the nature crowd is welcoming, and the best places to meet like-minded people are on reef boats and at national park trailheads.

Keep responses concise but rich. Use Australian spelling (colour, harbour, travelling). Don't use excessive emoji. Be the field guide you'd want on a road trip.`;

const STARTER_CHIPS = [
  "Which route is best for marine wildlife?",
  "Help me plan the first 3 days of the North route",
  "What should I pack for Stormy on a road trip?",
  "Tell me about the coral restoration programs",
  "Best breakfast cafes in Cairns?",
  "Is the Daintree safe for solo travel?",
];

function ScoutChat() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const chatMutation = trpc.scout.chat.useMutation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    const next: ChatMsg[] = [...messages, { role: "user", content: msg }];
    setMessages(next);
    setLoading(true);
    try {
      const allMessages = next.map(m => ({ role: m.role, content: m.content }));
      const res = await chatMutation.mutateAsync({
        messages: allMessages,
      });
      const replyContent = typeof res.content === "string" ? res.content : "Sorry, hit a snag. Try again?";
      setMessages([...next, { role: "assistant", content: replyContent }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Lost the signal out here. Try again?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-2xl overflow-hidden border flex flex-col"
      style={{ background: "rgba(8,14,28,0.85)", borderColor: "oklch(0.62 0.18 195 / 0.2)", height: "60vh", minHeight: "420px" }}
    >
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.length === 0 && (
          <div className="py-6">
            <div className="text-center mb-5">
              <Sparkles size={22} className="mx-auto mb-2 text-reef-teal" />
              <p className="font-lola-body text-xs text-sand/35 italic">
                Ask Scout anything about your road trip — or tap a starter below.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {STARTER_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => send(chip)}
                  className="px-3 py-1.5 rounded-full font-lola-body text-xs transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{
                    background: "oklch(0.62 0.18 195 / 0.08)",
                    border: "1px solid oklch(0.62 0.18 195 / 0.25)",
                    color: "oklch(0.72 0.14 195)",
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "oklch(0.62 0.18 195 / 0.15)", border: "1px solid oklch(0.62 0.18 195 / 0.3)" }}
              >
                <Fish size={12} className="text-reef-teal" />
              </div>
            )}
            <div
              className="max-w-[80%] rounded-2xl px-4 py-3 font-lola-body text-sm leading-relaxed"
              style={
                m.role === "user"
                  ? { background: "oklch(0.62 0.18 195 / 0.15)", color: "oklch(0.92 0.02 80)", borderRadius: "1rem 1rem 0.25rem 1rem" }
                  : { background: "oklch(0.18 0.06 220 / 0.8)", color: "oklch(0.85 0.02 80)", borderRadius: "1rem 1rem 1rem 0.25rem" }
              }
            >
              {m.role === "assistant" ? (
                <Streamdown>{m.content}</Streamdown>
              ) : (
                m.content
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "oklch(0.62 0.18 195 / 0.15)", border: "1px solid oklch(0.62 0.18 195 / 0.3)" }}
            >
              <Fish size={12} className="text-reef-teal" />
            </div>
            <div
              className="rounded-2xl px-4 py-3"
              style={{ background: "oklch(0.18 0.06 220 / 0.8)", borderRadius: "1rem 1rem 1rem 0.25rem" }}
            >
              <Loader2 size={14} className="animate-spin text-reef-teal" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t" style={{ borderColor: "oklch(0.62 0.18 195 / 0.12)" }}>
        <div className="flex gap-2 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask Scout anything about your road trip..."
            rows={1}
            className="flex-1 resize-none rounded-xl px-4 py-2.5 font-lola-body text-sm outline-none"
            style={{
              background: "oklch(0.62 0.18 195 / 0.06)",
              border: "1px solid oklch(0.62 0.18 195 / 0.2)",
              color: "oklch(0.92 0.02 80)",
              maxHeight: "120px",
            }}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-40"
            style={{ background: "oklch(0.62 0.18 195 / 0.2)", border: "1px solid oklch(0.62 0.18 195 / 0.4)" }}
          >
            <Send size={14} className="text-reef-teal" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LolaScout() {
  return (
    <div className="min-h-screen font-lola-body flex flex-col" style={{ background: "oklch(0.12 0.07 220)", color: "oklch(0.92 0.02 80)" }}>
      <LolaNavigation />

      <div className="flex-1 container py-8">
        <Link href="/">
          <button className="glass-ocean inline-flex items-center gap-2 px-4 py-2 rounded-full font-lola-mono text-xs tracking-widest uppercase text-reef-teal mb-6 hover:text-sand transition-colors">
            <ArrowLeft size={12} /> Back to Home
          </button>
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 glass-reef px-4 py-2 rounded-full mb-4">
              <Fish size={13} className="text-reef-teal" />
              <span className="font-lola-mono text-xs tracking-[0.18em] uppercase text-reef-teal">Your Field Guide</span>
            </div>
            <h1 className="font-lola-display font-800 text-sand mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Ask{" "}
              <span className="text-reef-teal" style={{ textShadow: "0 0 20px oklch(0.62 0.18 195 / 0.5)" }}>
                Scout
              </span>
            </h1>
            <p className="font-lola-body text-sm text-sand/50 max-w-lg mx-auto leading-relaxed">
              Snarky. Knowledgeable. Stormy-aware. Scout knows every reef, rainforest, and roadside cafe between Townsville and the Daintree. Ask anything.
            </p>
          </div>

          <ScoutChat />
        </div>
      </div>

      <LolaFooter />
    </div>
  );
}
