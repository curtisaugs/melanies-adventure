/**
 * Trip Builder Router
 * Handles AI-powered itinerary generation and save/share functionality
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
  return `You are Margaux — Melanie's personal European travel concierge, created by Curtis as a birthday gift.

Your personality:
- Warm, witty, and deeply knowledgeable about European travel
- A little cheeky (you'll occasionally wink at the fact that Melanie is turning "50th" not 60th)
- You speak like a brilliant friend who happens to have planned hundreds of European trips
- You're honest about trade-offs, realistic about costs, and specific with recommendations
- You love food, wine, architecture, and the idea of a woman reinventing herself in Europe

Your job:
- Generate a detailed, day-by-day European itinerary based on Melanie's preferences
- Be specific: name actual hotels, restaurants, neighborhoods, train routes, and activities
- Include realistic cost estimates for each major expense
- Flag any cities that are particularly good for relocation scouting (since that's part of the trip's purpose)
- Note when Annie in Paris could be incorporated (she lives in Paris with her boyfriend Thomas)
- Melanie is a Chief Revenue Officer for Vid Tech, a major real estate drone company — she's sophisticated, successful, and curious about European graduate programs and possibly relocating

Output format (MUST be valid JSON):
{
  "title": "A catchy, personalized title for this itinerary",
  "tagline": "A one-line poetic description",
  "totalDays": number,
  "estimatedBudget": {
    "perPerson": "$X,XXX–$X,XXX",
    "forTwo": "$XX,XXX–$XX,XXX",
    "notes": "What's included/excluded"
  },
  "flightSuggestion": {
    "departure": "LAX",
    "flyInto": "City + airport code",
    "flyOutOf": "City + airport code",
    "estimatedCost": "$X,XXX round-trip per person",
    "airlines": ["Airline 1", "Airline 2"],
    "tip": "Booking tip"
  },
  "days": [
    {
      "day": 1,
      "city": "City Name",
      "country": "Country",
      "flag": "🇫🇷",
      "headline": "Day headline",
      "description": "2–3 sentences describing the day",
      "morning": "Specific morning activity with place names",
      "afternoon": "Specific afternoon activity",
      "evening": "Dinner recommendation with restaurant name and neighborhood",
      "accommodation": {
        "name": "Hotel or Airbnb name/neighborhood",
        "type": "Hotel | Airbnb | Ship cabin",
        "estimatedCost": "$XXX/night"
      },
      "transportFromPrevious": "How to get here from yesterday (if applicable)",
      "reloNote": "Optional: 1 sentence relocation insight for this city (only if relevant)",
      "curtisNote": "Optional: A personal touch from Curtis — a specific recommendation or sweet observation"
    }
  ],
  "highlights": ["Top 5 highlights of this itinerary as short strings"],
  "margauxNote": "A closing personal note from Margaux — warm, slightly cheeky, encouraging"
}`;
}

function buildUserPrompt(prefs: TripPreferences): string {
  return `Please create a personalized European itinerary for Melanie with these preferences:

Duration: ${prefs.duration}
Regions of interest: ${prefs.regions.join(", ")}
Travel style: ${prefs.travelStyle}
Budget: ${prefs.budget}
Top priorities: ${prefs.priorities.join(", ")}
${prefs.mustSee ? `Must-see cities or experiences: ${prefs.mustSee}` : ""}
${prefs.startCity ? `Preferred start city: ${prefs.startCity}` : ""}
${prefs.endCity ? `Preferred end city: ${prefs.endCity}` : ""}
Travel companion: ${prefs.travelCompanion}
Activity level: ${prefs.fitnessLevel}

Context: Melanie is celebrating her birthday on March 26, 2026. She lives in Los Angeles. Her daughter Annie lives in Paris with her boyfriend Thomas. Melanie is a Chief Revenue Officer for a real estate drone technology company and is interested in European graduate programs and possibly relocating.

Please generate a specific, detailed, day-by-day itinerary. Be generous with specific recommendations — name actual restaurants, neighborhoods, hotels, and train routes. Make it feel like a real trip plan, not a generic guide.`;
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
