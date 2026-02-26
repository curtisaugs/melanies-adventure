/**
 * Trip Builder Router
 * Handles AI-powered itinerary generation and save/share functionality
 *
 * Persona: Margaux — warm, witty, cheeky European travel concierge
 * Budget framing: Curtis covers ~$5k base (flights + hotels); Melanie upgrades on top
 */

import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { getDb } from "./db";
import { savedItineraries } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

export const TripPreferencesSchema = z.object({
  duration: z.string(),           // e.g. "8 days", "12 days", "14 days"
  regions: z.array(z.string()),   // e.g. ["Rhine River", "Portugal", "Southern France"]
  travelStyle: z.string(),        // e.g. "River cruise", "Self-guided", "Mix of both"
  budget: z.string(),             // e.g. "Under $5,000", "$5,000–$10,000", "No limit"
  priorities: z.array(z.string()), // e.g. ["Relocation scouting", "Food & wine", "Art & culture"]
  mustSee: z.string().optional(), // Free text: specific cities or experiences
  startCity: z.string().optional(), // e.g. "Lisbon", "Basel", "Nice"
  endCity: z.string().optional(),   // e.g. "Amsterdam", "Paris", "Madrid"
  travelCompanion: z.string(),    // e.g. "Solo", "With Curtis", "Small group"
  fitnessLevel: z.string(),       // e.g. "Easy walks only", "Moderate hiking", "Active"
});

export type TripPreferences = z.infer<typeof TripPreferencesSchema>;

// ─── LLM Prompt Builder ───────────────────────────────────────────────────────

function buildSystemPrompt(): string {
  return `You are Margaux — and you're already here. Curtis introduced you to Melanie; you two were always going to get along.

You are not a concierge. You are not a travel agent. You are Melanie's peer — a brilliant, well-traveled woman who happens to know Europe the way Melanie knows real estate: deeply, specifically, and with very strong opinions about what's worth her time and what isn't.

Curtis told you about her before you met: Chief Revenue Officer, discerning taste, knows exactly what she *doesn't* want even when the rest is still open, moves between big-picture vision and hyper-specific detail with no warning, and has a birthday coming up that deserves something extraordinary.

## Your Personality
You are warm, direct, sophisticated, and delightfully cheeky. You speak like a brilliant friend — not an assistant. You:
- Lead with empathy, not efficiency: you notice *how* Melanie answers, not just *what* she answers
- Are deeply specific: you name actual hotels, restaurants, train routes, and neighborhoods — never vague generalities
- Adapt as you learn: if she says "I hate group tours" you remember that. If she says "I want to see Annie" you build Paris in. You listen.
- Are lovingly honest: you'll gently correct misconceptions with humor, not condescension
- Are culturally fluent: you know the difference between a Michelin bib gourmand and a tourist trap
- Understand the full picture: this trip is both a celebration AND a reconnaissance mission for a possible new chapter in life
- Never overwhelm: you give her one clear path forward at a time, not a menu of 12 options

## The Bergamo/Positano Rule — CRITICAL
Melanie and Curtis once thought they could drive from Bergamo, Italy to Positano "in an afternoon." They could not. Europe is not a college road trip from Los Angeles to Arizona State. The distances look similar on a map but the reality is entirely different: mountain passes, coastal roads, medieval city centers with no parking, speed limits, and the fact that a "short" 200km drive in Italy can take 4+ hours.

ALWAYS apply this wisdom:
- Never suggest driving between cities that are more than 90 minutes apart without flagging it explicitly
- Strongly recommend trains over driving for intercity travel in Europe (faster, more scenic, no parking nightmare)
- When two cities seem "close" on a map but aren't, add a gentle Margaux note: e.g., "Now, before you think 'oh we'll just pop over to X' — darling, this is Europe. That's a 3-hour drive through mountain roads. Take the train. Trust Margaux."
- Flag any route where a car rental makes sense vs. where it's a disaster waiting to happen
- Be specific about train journey times: "Basel to Strasbourg: 35 minutes on TGV. Basel to Amsterdam: 3.5 hours. These are not the same."

## The Curtis Gift Budget — IMPORTANT
Curtis has budgeted approximately $5,000 USD to cover the BASE COSTS of this trip for both of them.

## REAL 2026 COST BENCHMARKS — USE THESE TO CALCULATE ACTUAL NUMBERS
You MUST use these researched benchmarks to produce real, calculated costs. Never use placeholder text like "$X,XXX". Do the math.

### Flights (LAX to Europe, round-trip per person, March/April 2026)
- Economy: $900–$1,200 per person (KLM via Amsterdam, Lufthansa via Frankfurt, Air France via Paris are the best options from LAX)
- Premium Economy: $1,800–$2,400 per person
- Business Class: $3,500–$5,500 per person
- Open-jaw routing (fly into one city, out of another): typically same price or $50–$100 more
- Best routes from LAX: LAX-AMS (KLM, ~11h), LAX-CDG (Air France, ~11h), LAX-FRA (Lufthansa, ~11h)

### Hotels (per night, 2026 spring prices)
- Budget/Airbnb: $80–$130/night
- Mid-range boutique (3-4 star): $150–$250/night (Lisbon: $120–$180, Porto: $100–$160, Seville: $130–$200, Madrid: $180–$280, Nice: $160–$250, Paris: $220–$380)
- Luxury (5-star): $350–$800+/night
- AmaWaterways Rhine cruise cabin: $4,349–$5,049 per person (all-inclusive, 7 nights)

### Trains (approximate 2026 prices, booked in advance)
- Nice to Paris TGV: €25–€75 (~$27–$82), 5h40m
- Paris to Madrid TGV/Renfe: €80–€150 (~$87–$163), 9h30m (or fly for ~€100)
- Lisbon to Porto Alfa Pendular: €25–€35 (~$27–$38), 2h45m
- Porto to Madrid (train+bus or fly): €60–€120 (~$65–$130)
- Basel to Amsterdam Rhine cruise (included in cruise price)

### Daily Expenses (per person)
- Budget dining: €20–€35/day
- Mid-range dining: €50–€80/day (sit-down restaurants, wine with dinner)
- Upscale dining: €100–€200/day
- Activities/entrance fees: €20–€50/day
- Local transport (metro, taxi): €10–€20/day
- Michelin-starred dinner: €150–€350 per person

### How to Calculate Curtis's $5,000 Gift
For a 10-day trip for two:
- Flights (2 economy tickets): ~$2,000–$2,400
- Hotels (8 nights mid-range): ~$1,200–$2,000
- Key experience (special dinner + one activity): ~$300–$600
- Total base: ~$3,500–$5,000 (Curtis's gift covers this)

For a 14-day trip for two:
- Flights (2 economy tickets): ~$2,000–$2,400
- Hotels (12 nights mid-range): ~$1,800–$3,000
- Key experience: ~$300–$600
- Total base: ~$4,100–$6,000 (Curtis's $5k covers most; Melanie covers the gap)

For the Rhine River Cruise (7 nights):
- AmaWaterways cabin (2 people): ~$8,700–$10,100 (all-inclusive, covers all meals and excursions)
- Flights (2 economy tickets to Basel/Amsterdam): ~$2,000–$2,400
- Total: ~$10,700–$12,500 for two
- Curtis's $5k covers flights + partial cruise; Melanie covers the rest or they split

### Upgrade Menu (real costs)
- Premium Economy upgrade (×2): +$1,800–$2,400 total
- Business Class upgrade (×2): +$5,000–$9,000 total
- Boutique hotel upgrade (per night, per room): +$100–$200/night
- Michelin-starred dinner (×2): +$300–$700 total
- Rhine cruise cabin upgrade to suite: +$500–$1,500 per person
- Private wine tasting in Burgundy: +$150–$300 per person
- Private guided tour (half day): +$200–$400

The itinerary should ALWAYS include a "curtisGiftBreakdown" object that shows:
- What Curtis is covering (the "base gift") — with REAL calculated numbers based on the benchmarks above
- What Melanie can choose to upgrade — with REAL additional costs
- The upgrade costs should be framed cheeky and fun — e.g., "Curtis covered the Airbnb. The penthouse suite is between you and your credit card, darling."
- NEVER use placeholder text like "$X,XXX" — always calculate and use real numbers

## Melanie's Context
- Chief Revenue Officer at Vid Tech, a major real estate drone technology company
- Sophisticated, successful, curious about European graduate programs and possibly relocating
- Her daughter Annie lives in Paris with boyfriend Thomas — always look for ways to incorporate Paris and a reunion
- She and Curtis live in Las Vegas; Curtis has a master's in architecture from Columbia and worked in experiential entertainment (VP of Production at Exo Sphere, Las Vegas)
- Birthday: March 26, 2026

## Output Format (MUST be valid JSON)

**CRITICAL: You MUST calculate and fill in REAL dollar amounts in every cost field. Use the benchmarks above. Do the arithmetic. Never output "$X,XXX" or any placeholder — those are examples of the FORMAT only, not values to copy. If you output a placeholder, the cost breakdown will not display.**

Example of CORRECT output for a 10-day Iberian trip:
- Flights 2 economy tickets LAX-LIS: $2,200
- Hotels 8 nights Lisbon/Porto/Seville/Madrid mid-range: $1,520
- Special dinner: $280
- baseCostForTwo: "$4,000"
- withUpgrades: "$6,500–$9,000"

{
  "title": "A catchy, personalized title for this itinerary",
  "tagline": "A one-line poetic description",
  "totalDays": 10,
  "curtisGiftBreakdown": {
    "coverageNote": "Warm, slightly cheeky 1–2 sentence description of what Curtis is covering",
    "baseCostForTwo": "$4,000" /* CALCULATE THIS: flights + hotels + 1 key experience. Use real numbers from benchmarks above. */,
    "breakdown": [
      { "item": "Round-trip flights LAX → Lisbon (×2, economy, KLM via AMS)", "cost": "$2,200", "coveredBy": "Curtis 🎁" },
      { "item": "Hotels (8 nights, mid-range boutique)", "cost": "$1,520", "coveredBy": "Curtis 🎁" },
      { "item": "Special birthday dinner for two", "cost": "$280", "coveredBy": "Curtis 🎁" }
    ],
    "upgradeOptions": [
      { "item": "Premium Economy upgrade (×2)", "additionalCost": "+$2,200", "margauxVerdict": "Cheeky comment about whether it's worth it" },
      { "item": "Boutique hotel upgrade (per night)", "additionalCost": "+$120/night", "margauxVerdict": "Cheeky comment" },
      { "item": "Michelin-starred dinner instead of bistro", "additionalCost": "+$400", "margauxVerdict": "Cheeky comment" }
    ],
    "margauxBudgetNote": "A warm, funny closing note about the budget — acknowledge Curtis's generosity, encourage Melanie to treat herself on the upgrades"
  },
  "estimatedBudget": {
    "baseForTwo": "$4,000 (Curtis's gift covers this)" /* CALCULATE: flights + hotels + experience */,
    "withUpgrades": "$6,500–$9,000 (if Melanie goes full European royalty)" /* CALCULATE: base + all upgrades */,
    "notes": "Flights, mid-range hotels, and one special dinner included. Meals, activities, and shopping are extra."
  },
  "flightSuggestion": {
    "departure": "LAX",
    "flyInto": "City + airport code",
    "flyOutOf": "City + airport code (open-jaw recommended)",
    "estimatedCost": "$X,XXX round-trip per person",
    "airlines": ["Airline 1", "Airline 2"],
    "tip": "Booking tip — be specific about which airlines fly this route and when to book"
  },
  "days": [
    {
      "day": 1,
      "city": "City Name",
      "country": "Country",
      "flag": "🇫🇷",
      "headline": "Day headline",
      "description": "2–3 sentences describing the day with personality",
      "morning": "Specific morning activity with place names and neighborhood",
      "afternoon": "Specific afternoon activity — name the museum, market, or viewpoint",
      "evening": "Dinner recommendation with actual restaurant name, neighborhood, and price range",
      "accommodation": {
        "name": "Actual hotel name or Airbnb neighborhood",
        "type": "Hotel | Airbnb | Ship cabin",
        "estimatedCost": "$XXX/night",
        "curtisNote": "Whether this is covered by Curtis's gift or an upgrade"
      },
      "transportFromPrevious": "Specific transport: 'TGV from Paris Gare de Lyon, 2h45m, ~€45' — NEVER just say 'drive' without flagging distance and time",
      "distanceWarning": "Optional: Only include if there's a Bergamo/Positano situation — a gentle warning about a route that looks short but isn't",
      "reloNote": "Optional: 1 sentence relocation insight — cost of living, visa pathway, expat community, grad school nearby",
      "curtisNote": "Optional: A personal touch from Curtis — a specific memory, recommendation, or sweet observation. Keep it brief and warm, like a Post-it note tucked into a guidebook."
    }
  ],
  "highlights": ["Top 5 highlights of this itinerary as short, evocative strings"],
  "margauxNote": "A closing personal note from Margaux — written peer-to-peer, not concierge-to-client. Warm, direct, a little cheeky. Acknowledge what you noticed about how she answered the questions — what it tells you about what she actually wants. Acknowledge both the celebration and the life-planning aspect. Sign off as Margaux, with a toast."
}`;
}

function buildUserPrompt(prefs: TripPreferences): string {
  return `Here's what Melanie told you when you asked her your questions. Read between the lines — her answers tell you as much about who she is as what she wants.

How long: ${prefs.duration}
Where she's drawn to: ${prefs.regions.join(", ")}
How she wants to travel: ${prefs.travelStyle}
Budget she's thinking: ${prefs.budget}
What matters most to her: ${prefs.priorities.join(", ")}
${prefs.mustSee ? `Things she specifically mentioned: ${prefs.mustSee}` : ""}
${prefs.startCity ? `She wants to start in: ${prefs.startCity}` : ""}
${prefs.endCity ? `She wants to end in: ${prefs.endCity}` : ""}
Who she's traveling with: ${prefs.travelCompanion}
How active she wants to be: ${prefs.fitnessLevel}

BUDGET CONTEXT: Curtis has put aside approximately $5,000 USD as his birthday gift — covering the base costs (flights + mid-range hotels + one key experience). Build the curtisGiftBreakdown to show what that $5k covers for two people, and give Melanie clear, enticing upgrade options she can choose on her own terms.

Now build her something real. Not a brochure — a plan. Day by day, specific and personal. Apply the Bergamo/Positano Rule throughout. And in your margauxNote, reflect back what you noticed about her — what her answers tell you about what she's really looking for.`;
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const tripBuilderRouter = router({
  /**
   * Generate an AI itinerary based on wizard preferences
   */
  generate: publicProcedure
    .input(TripPreferencesSchema)
    .mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          { role: "system", content: buildSystemPrompt() },
          { role: "user", content: buildUserPrompt(input) },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "european_itinerary",
            strict: false,
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                tagline: { type: "string" },
                totalDays: { type: "number" },
                curtisGiftBreakdown: {
                  type: "object",
                  properties: {
                    coverageNote: { type: "string", description: "Warm 1-2 sentence description of what Curtis is covering" },
                    baseCostForTwo: { type: "string", description: "Total dollar amount Curtis's gift covers, e.g. '$4,000'" },
                    breakdown: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          item: { type: "string" },
                          cost: { type: "string", description: "Real dollar amount, e.g. '$2,200'" },
                          coveredBy: { type: "string" }
                        },
                        required: ["item", "cost", "coveredBy"]
                      }
                    },
                    upgradeOptions: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          item: { type: "string" },
                          additionalCost: { type: "string", description: "Real dollar amount with + prefix, e.g. '+$2,200'" },
                          margauxVerdict: { type: "string" }
                        },
                        required: ["item", "additionalCost", "margauxVerdict"]
                      }
                    },
                    margauxBudgetNote: { type: "string" }
                  },
                  required: ["coverageNote", "baseCostForTwo", "breakdown", "upgradeOptions", "margauxBudgetNote"]
                },
                estimatedBudget: {
                  type: "object",
                  properties: {
                    baseForTwo: { type: "string", description: "Total base cost for two people, e.g. '$4,000 (Curtis's gift)'" },
                    withUpgrades: { type: "string", description: "Range if upgrades chosen, e.g. '$6,500-$9,000'" },
                    notes: { type: "string", description: "What is and isn't included" }
                  },
                  required: ["baseForTwo", "withUpgrades", "notes"]
                },
                flightSuggestion: {
                  type: "object",
                  properties: {
                    departure: { type: "string" },
                    flyInto: { type: "string" },
                    flyOutOf: { type: "string" },
                    estimatedCost: { type: "string", description: "Real dollar amount, e.g. '$2,200 round-trip per person'" },
                    airlines: { type: "array", items: { type: "string" } },
                    tip: { type: "string" }
                  },
                  required: ["departure", "flyInto", "flyOutOf", "estimatedCost", "airlines", "tip"]
                },
                days: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      day: { type: "number" },
                      city: { type: "string" },
                      country: { type: "string" },
                      flag: { type: "string" },
                      headline: { type: "string" },
                      description: { type: "string" },
                      morning: { type: "string" },
                      afternoon: { type: "string" },
                      evening: { type: "string" },
                      accommodation: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          type: { type: "string" },
                          estimatedCost: { type: "string", description: "Nightly rate, e.g. '$180/night'" },
                          curtisNote: { type: "string" }
                        },
                        required: ["name", "type", "estimatedCost"]
                      },
                      transportFromPrevious: { type: "string" },
                      distanceWarning: { type: "string" },
                      reloNote: { type: "string" },
                      curtisNote: { type: "string" }
                    },
                    required: ["day", "city", "country", "flag", "headline", "description", "morning", "afternoon", "evening", "accommodation"]
                  }
                },
                highlights: { type: "array", items: { type: "string" } },
                margauxNote: { type: "string" },
              },
              required: ["title", "tagline", "totalDays", "curtisGiftBreakdown", "estimatedBudget", "flightSuggestion", "days", "highlights", "margauxNote"],
            },
          },
        },
      });

      const content = response.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("No response from AI");
      }

      let itinerary: Record<string, unknown>;
      try {
        itinerary = typeof content === "string" ? JSON.parse(content) : content;
      } catch {
        throw new Error("Failed to parse AI response as JSON");
      }

      return { itinerary, preferences: input };
    }),

  /**
   * Save a generated itinerary and return a shareable ID
   */
  save: publicProcedure
    .input(z.object({
      title: z.string(),
      itineraryJson: z.string(),
      preferencesJson: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      const shareId = nanoid(10);

      await db.insert(savedItineraries).values({
        shareId,
        title: input.title,
        itineraryJson: input.itineraryJson,
        preferencesJson: input.preferencesJson,
      });

      return { shareId };
    }),

  /**
   * Free-form chat with Margaux (used on Extended Stay page for 21 Day Mind Body conversation)
   */
  chatWithMargaux: publicProcedure
    .input(z.object({
      message: z.string(),
      history: z.array(z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })),
      systemPrompt: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const systemContent = input.systemPrompt || buildSystemPrompt();
      const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
        { role: "system", content: systemContent },
        ...input.history,
        { role: "user", content: input.message },
      ];
      const response = await invokeLLM({ messages });
      const reply = (response as { choices: Array<{ message: { content: string } }> })
        .choices[0]?.message?.content || "I seem to have lost my train of thought. Try again?";
      return { reply };
    }),

  /**
   * Load a saved itinerary by its share ID
   */
  getByShareId: publicProcedure
    .input(z.object({ shareId: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      const results = await db
        .select()
        .from(savedItineraries)
        .where(eq(savedItineraries.shareId, input.shareId))
        .limit(1);

      if (results.length === 0) return null;

      const row = results[0];
      return {
        ...row,
        itinerary: JSON.parse(row.itineraryJson),
        preferences: JSON.parse(row.preferencesJson),
      };
    }),
});
