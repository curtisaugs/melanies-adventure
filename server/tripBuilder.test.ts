import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock the database and LLM so tests run without real connections
vi.mock("./db", () => ({
  getDb: vi.fn(),
}));

vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

vi.mock("nanoid", () => ({
  nanoid: vi.fn(() => "test-share-id"),
}));

import { getDb } from "./db";
import { invokeLLM } from "./_core/llm";
import { tripBuilderRouter } from "./tripBuilder";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

const samplePreferences = {
  duration: "10 days",
  regions: ["Rhine River", "Paris"],
  travelStyle: "Mix of both",
  budget: "$5,000–$8,000 per person",
  priorities: ["Food & wine", "Time with Annie in Paris"],
  mustSee: "The Lorelei Rock",
  travelCompanion: "With Curtis (partner)",
  fitnessLevel: "Moderate activity — some walking and light hikes",
};

const sampleItinerary = {
  title: "Rhine & Paris Birthday Escape",
  tagline: "Castles, wine, and Annie",
  totalDays: 10,
  days: [{ day: 1, city: "Basel", country: "Switzerland", flag: "🇨🇭", headline: "Arrival", description: "Arrive in Basel.", morning: "Fly in", afternoon: "Check in", evening: "Dinner" }],
  highlights: ["Rhine cruise", "Paris reunion"],
  margauxNote: "Bon voyage, Melanie!",
};

describe("tripBuilder.generate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls invokeLLM and returns parsed itinerary", async () => {
    const mockInvokeLLM = vi.mocked(invokeLLM);
    mockInvokeLLM.mockResolvedValueOnce({
      choices: [{ message: { content: JSON.stringify(sampleItinerary) } }],
    } as any);

    const caller = tripBuilderRouter.createCaller(createPublicContext());
    const result = await caller.generate(samplePreferences);

    expect(mockInvokeLLM).toHaveBeenCalledOnce();
    expect(result.itinerary).toMatchObject({ title: "Rhine & Paris Birthday Escape" });
    expect(result.preferences).toMatchObject({ duration: "10 days" });
  });

  it("throws if LLM returns no content", async () => {
    const mockInvokeLLM = vi.mocked(invokeLLM);
    mockInvokeLLM.mockResolvedValueOnce({ choices: [] } as any);

    const caller = tripBuilderRouter.createCaller(createPublicContext());
    await expect(caller.generate(samplePreferences)).rejects.toThrow("No response from AI");
  });
});

describe("tripBuilder.save", () => {
  it("inserts a row and returns the shareId", async () => {
    const mockInsert = vi.fn().mockReturnValue({ values: vi.fn().mockResolvedValue(undefined) });
    const mockDb = { insert: mockInsert };
    vi.mocked(getDb).mockResolvedValueOnce(mockDb as any);

    const caller = tripBuilderRouter.createCaller(createPublicContext());
    const result = await caller.save({
      title: "Rhine & Paris Birthday Escape",
      itineraryJson: JSON.stringify(sampleItinerary),
      preferencesJson: JSON.stringify(samplePreferences),
    });

    expect(result.shareId).toBe("test-share-id");
    expect(mockInsert).toHaveBeenCalledOnce();
  });

  it("throws if database is unavailable", async () => {
    vi.mocked(getDb).mockResolvedValueOnce(null as any);

    const caller = tripBuilderRouter.createCaller(createPublicContext());
    await expect(
      caller.save({ title: "Test", itineraryJson: "{}", preferencesJson: "{}" })
    ).rejects.toThrow("Database unavailable");
  });
});

describe("tripBuilder.getByShareId", () => {
  it("returns null when no row is found", async () => {
    const mockSelect = vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue([]),
        }),
      }),
    });
    vi.mocked(getDb).mockResolvedValueOnce({ select: mockSelect } as any);

    const caller = tripBuilderRouter.createCaller(createPublicContext());
    const result = await caller.getByShareId({ shareId: "nonexistent" });
    expect(result).toBeNull();
  });

  it("returns parsed itinerary when row is found", async () => {
    const row = {
      id: 1,
      shareId: "abc123",
      title: "Rhine & Paris Birthday Escape",
      itineraryJson: JSON.stringify(sampleItinerary),
      preferencesJson: JSON.stringify(samplePreferences),
      userId: null,
      createdAt: new Date(),
    };

    const mockSelect = vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue([row]),
        }),
      }),
    });
    vi.mocked(getDb).mockResolvedValueOnce({ select: mockSelect } as any);

    const caller = tripBuilderRouter.createCaller(createPublicContext());
    const result = await caller.getByShareId({ shareId: "abc123" });

    expect(result).not.toBeNull();
    expect(result?.title).toBe("Rhine & Paris Birthday Escape");
    expect(result?.itinerary).toMatchObject({ title: "Rhine & Paris Birthday Escape" });
  });
});
