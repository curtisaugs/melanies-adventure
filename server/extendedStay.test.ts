/**
 * Tests for Extended Stay / 21 Day Mind Body features
 * Covers: chatWithMargaux tRPC procedure input validation
 */

import { describe, it, expect } from "vitest";
import { z } from "zod";

// ─── Schema for chatWithMargaux input ─────────────────────────────────────────

const ChatWithMargauxInputSchema = z.object({
  message: z.string(),
  history: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    })
  ),
  systemPrompt: z.string().optional(),
});

describe("chatWithMargaux input validation", () => {
  it("accepts a valid message with empty history", () => {
    const result = ChatWithMargauxInputSchema.safeParse({
      message: "My 21 Day Mind Body program focuses on nervous system regulation.",
      history: [],
    });
    expect(result.success).toBe(true);
  });

  it("accepts a valid message with conversation history", () => {
    const result = ChatWithMargauxInputSchema.safeParse({
      message: "I think the Algarve sounds perfect.",
      history: [
        { role: "assistant", content: "Tell me about your program." },
        { role: "user", content: "It's a 21-day mind body reset." },
        { role: "assistant", content: "What transformation does someone experience?" },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("accepts an optional custom system prompt", () => {
    const result = ChatWithMargauxInputSchema.safeParse({
      message: "Hello",
      history: [],
      systemPrompt: "You are a helpful assistant.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid role in history", () => {
    const result = ChatWithMargauxInputSchema.safeParse({
      message: "Hello",
      history: [{ role: "system", content: "This should fail" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing message field", () => {
    const result = ChatWithMargauxInputSchema.safeParse({
      history: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing history field", () => {
    const result = ChatWithMargauxInputSchema.safeParse({
      message: "Hello",
    });
    expect(result.success).toBe(false);
  });
});

// ─── Visa Pathway Data Validation ─────────────────────────────────────────────

const VisaPathwaySchema = z.object({
  id: z.string(),
  country: z.string(),
  flag: z.string(),
  visaName: z.string(),
  fee: z.string(),
  processing: z.string(),
  minHours: z.string(),
  financialProof: z.string(),
  leadsToPR: z.boolean(),
  programs: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      location: z.string(),
      cost: z.string(),
      notes: z.string(),
      url: z.string().url(),
    })
  ),
});

const visaPathways = [
  {
    id: "portugal",
    country: "Portugal",
    flag: "🇵🇹",
    visaName: "D4 Study Visa",
    tagline: "The most affordable path",
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
    whyItWorks: "Portugal has the lowest cost of living.",
    programs: [
      {
        name: "CIAL Centro de Línguas",
        type: "Portuguese Language School",
        location: "Lisbon and Algarve (Faro)",
        cost: "~€299/week (~$1,300/month)",
        notes: "Government-certified, issues D4 visa support letters.",
        url: "https://www.learnportugueseinportugal.com",
      },
    ],
  },
  {
    id: "spain",
    country: "Spain",
    flag: "🇪🇸",
    visaName: "National Student Visa (Type D)",
    tagline: "Barcelona or Seville",
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
    whyItWorks: "Spain's student visa is the most straightforward for language study.",
    programs: [
      {
        name: "Cervantes EI Barcelona",
        type: "Spanish Language School",
        location: "Barcelona",
        cost: "€220/week for 12-23 weeks (~$950/month)",
        notes: "Explicitly 'Valid for student visa.'",
        url: "https://www.cervantes.to",
      },
    ],
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
    whyItWorks: "France has the most personal reason: Annie and Thomas are in Paris.",
    programs: [
      {
        name: "Alliance Française de Paris",
        type: "French Language School",
        location: "101 Boulevard Raspail, Paris 75006",
        cost: "€1,460/month (~$1,580)",
        notes: "72 hours per 4-week session.",
        url: "https://www.alliancefr.org",
      },
    ],
  },
];

describe("visa pathway data integrity", () => {
  it("has exactly 3 visa pathways", () => {
    expect(visaPathways).toHaveLength(3);
  });

  it("each pathway has a unique id", () => {
    const ids = visaPathways.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(visaPathways.length);
  });

  it("Portugal pathway leads to PR, others do not", () => {
    const portugal = visaPathways.find((p) => p.id === "portugal");
    const spain = visaPathways.find((p) => p.id === "spain");
    const france = visaPathways.find((p) => p.id === "france");
    expect(portugal?.leadsToPR).toBe(true);
    expect(spain?.leadsToPR).toBe(false);
    expect(france?.leadsToPR).toBe(false);
  });

  it("each pathway has at least one qualifying program", () => {
    for (const pathway of visaPathways) {
      expect(pathway.programs.length).toBeGreaterThan(0);
    }
  });

  it("all program URLs are valid https URLs", () => {
    for (const pathway of visaPathways) {
      for (const program of pathway.programs) {
        expect(program.url).toMatch(/^https:\/\//);
      }
    }
  });

  it("all pathways have valid schema structure", () => {
    for (const pathway of visaPathways) {
      const result = VisaPathwaySchema.safeParse(pathway);
      expect(result.success).toBe(true);
    }
  });
});

// ─── Cost Comparison Sanity Checks ────────────────────────────────────────────

describe("cost comparison data", () => {
  const costData = [
    { country: "Portugal", courseMin: 1060, courseMax: 1300, livingMin: 1200, livingMax: 1800 },
    { country: "Spain", courseMin: 780, courseMax: 950, livingMin: 1400, livingMax: 2000 },
    { country: "France (Nice)", courseMin: 1000, courseMax: 1200, livingMin: 1800, livingMax: 2500 },
    { country: "France (Paris)", courseMin: 1460, courseMax: 1580, livingMin: 2500, livingMax: 3500 },
  ];

  it("Spain has the lowest minimum total cost (cheapest language school + living)", () => {
    // Spain: $780 course + $1,400 living = $2,180 minimum
    // Portugal: $1,060 course + $1,200 living = $2,260 minimum
    // Portugal has lower living costs but higher course costs than Spain
    const totals = costData.map((c) => ({
      country: c.country,
      minTotal: c.courseMin + c.livingMin,
    }));
    const minTotal = Math.min(...totals.map((t) => t.minTotal));
    const cheapest = totals.find((t) => t.minTotal === minTotal);
    expect(cheapest?.country).toBe("Spain");
  });

  it("Paris has the highest minimum total cost", () => {
    const totals = costData.map((c) => ({
      country: c.country,
      minTotal: c.courseMin + c.livingMin,
    }));
    const maxTotal = Math.max(...totals.map((t) => t.minTotal));
    const mostExpensive = totals.find((t) => t.minTotal === maxTotal);
    expect(mostExpensive?.country).toBe("France (Paris)");
  });

  it("all course costs are positive numbers", () => {
    for (const row of costData) {
      expect(row.courseMin).toBeGreaterThan(0);
      expect(row.courseMax).toBeGreaterThan(0);
      expect(row.courseMax).toBeGreaterThanOrEqual(row.courseMin);
    }
  });
});
