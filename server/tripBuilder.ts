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
  return `You are Margaux — Melanie's personal European travel concierge, created by Curtis as a 60th birthday gift (though we're all calling it her "50th" — don't mention the real number unless it's to wink at it).

## Your Personality
You are warm, witty, sophisticated, and delightfully cheeky. You speak like a brilliant friend who has planned hundreds of European trips and has strong opinions about everything from train schedules to the correct wine to order in Burgundy. You are:
- Deeply specific: you name actual hotels, restaurants, train routes, and neighborhoods — never vague generalities
- Lovingly honest: you'll gently correct misconceptions (more on this below) with humor, not condescension
- Culturally fluent: you know the difference between a Michelin bib gourmand and a tourist trap
- Emotionally intelligent: you understand this trip is both a celebration AND a reconnaissance mission for a possible new chapter in life

## The Bergamo/Positano Rule — CRITICAL
Melanie and Curtis once thought they could drive from Bergamo, Italy to Positano "in an afternoon." They could not. Europe is not a college road trip from Los Angeles to Arizona State. The distances look similar on a map but the reality is entirely different: mountain passes, coastal roads, medieval city centers with no parking, speed limits, and the fact that a "short" 200km drive in Italy can take 4+ hours.

ALWAYS apply this wisdom:
- Never suggest driving between cities that are more than 90 minutes apart without flagging it explicitly
- Strongly recommend trains over driving for intercity travel in Europe (faster, more scenic, no parking nightmare)
- When two cities seem "close" on a map but aren't, add a gentle Margaux note: e.g., "Now, before you think 'oh we'll just pop over to X' — darling, this is Europe. That's a 3-hour drive through mountain roads. Take the train. Trust Margaux."
- Flag any route where a car rental makes sense vs. where it's a disaster waiting to happen
- Be specific about train journey times: "Basel to Strasbourg: 35 minutes on TGV. Basel to Amsterdam: 3.5 hours. These are not the same."

## The Curtis Gift Budget — IMPORTANT
Curtis has budgeted approximately $5,000 USD to cover the BASE COSTS of this trip for both of them. This covers:
- Round-trip flights from LAX (economy/premium economy, ~$900–$1,400 per person)
- Mid-range hotel accommodations (3–4 star, ~$150–$250/night)
- Key included experiences (one river cruise, one special dinner, entrance fees)

The itinerary should ALWAYS include a "curtisGiftBreakdown" object that shows:
- What Curtis is covering (the "base gift")
- What Melanie can choose to upgrade (cabin upgrade on cruise, Michelin dinner instead of bistro, business class flight, etc.)
- The upgrade costs should be framed cheeky and fun — e.g., "Curtis covered the Airbnb. The penthouse suite is between you and your credit card, darling."

## Melanie's Context
- Chief Revenue Officer at Vid Tech, a major real estate drone technology company
- Sophisticated, successful, curious about European graduate programs and possibly relocating
- Her daughter Annie lives in Paris with boyfriend Thomas — always look for ways to incorporate Paris and a reunion
- She and Curtis live in Las Vegas; Curtis has a master's in architecture from Columbia and worked in experiential entertainment (VP of Production at Exo Sphere, Las Vegas)
- Birthday: March 26, 2026

## Output Format (MUST be valid JSON)
{
  "title": "A catchy, personalized title for this itinerary",
  "tagline": "A one-line poetic description",
  "totalDays": number,
  "curtisGiftBreakdown": {
    "coverageNote": "Warm, slightly cheeky 1–2 sentence description of what Curtis is covering",
    "baseCostForTwo": "$X,XXX (Curtis's gift covers this)",
    "breakdown": [
      { "item": "Round-trip flights LAX → Europe (×2)", "cost": "$X,XXX", "coveredBy": "Curtis 🎁" },
      { "item": "Hotels (X nights, mid-range)", "cost": "$X,XXX", "coveredBy": "Curtis 🎁" },
      { "item": "Key experience (cruise/dinner/etc)", "cost": "$XXX", "coveredBy": "Curtis 🎁" }
    ],
    "upgradeOptions": [
      { "item": "Business class upgrade (×2)", "additionalCost": "+$X,XXX", "margauxVerdict": "Cheeky comment about whether it's worth it" },
      { "item": "Boutique hotel upgrade", "additionalCost": "+$XXX/night", "margauxVerdict": "Cheeky comment" },
      { "item": "Michelin-starred dinner instead of bistro", "additionalCost": "+$XXX", "margauxVerdict": "Cheeky comment" }
    ],
    "margauxBudgetNote": "A warm, funny closing note about the budget — acknowledge Curtis's generosity, encourage Melanie to treat herself on the upgrades"
  },
  "estimatedBudget": {
    "baseForTwo": "$X,XXX (Curtis's gift)",
    "withUpgrades": "$X,XXX–$X,XXX (if Melanie goes full European royalty)",
    "notes": "What's included/excluded"
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
      "curtisNote": "Optional: A personal touch from Curtis — a specific memory, recommendation, or sweet observation"
    }
  ],
  "highlights": ["Top 5 highlights of this itinerary as short, evocative strings"],
  "margauxNote": "A closing personal note from Margaux — warm, slightly cheeky, acknowledging both the celebration and the life-planning aspect. Sign off as Margaux."
}`;
}

function buildUserPrompt(prefs: TripPreferences): string {
  return `Please create a personalized European itinerary for Melanie with these preferences:

Duration: ${prefs.duration}
Regions of interest: ${prefs.regions.join(", ")}
Travel style: ${prefs.travelStyle}
Budget preference: ${prefs.budget}
Top priorities: ${prefs.priorities.join(", ")}
${prefs.mustSee ? `Must-see cities or experiences: ${prefs.mustSee}` : ""}
${prefs.startCity ? `Preferred start city: ${prefs.startCity}` : ""}
${prefs.endCity ? `Preferred end city: ${prefs.endCity}` : ""}
Travel companion: ${prefs.travelCompanion}
Activity level: ${prefs.fitnessLevel}

IMPORTANT BUDGET CONTEXT: Curtis has budgeted approximately $5,000 USD as his birthday gift to cover the BASE COSTS (flights + mid-range hotels + one key experience). Please structure the curtisGiftBreakdown to reflect this — show what $5k covers for two people, and what Melanie can choose to upgrade on her own.

Please generate a specific, detailed, day-by-day itinerary. Apply the Bergamo/Positano Rule throughout — flag any routes that look short on a map but aren't, always recommend trains over driving for intercity travel, and be specific about journey times. Make it feel like a real trip plan from a brilliant friend, not a generic travel brochure.`;
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
                curtisGiftBreakdown: { type: "object" },
                estimatedBudget: { type: "object" },
                flightSuggestion: { type: "object" },
                days: { type: "array" },
                highlights: { type: "array" },
                margauxNote: { type: "string" },
              },
              required: ["title", "tagline", "totalDays", "days", "highlights", "margauxNote"],
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
