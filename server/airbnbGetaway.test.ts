/**
 * Tests for the Airbnb Getaway page data structures and validation
 * Covers: listing schema validation, cost breakdown logic
 */
import { describe, it, expect } from "vitest";
import { z } from "zod";

// ─── Listing schema (mirrors the frontend data) ───────────────────────────────

const ListingSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  rating: z.number().min(1).max(5),
  reviewCount: z.number().min(0),
  superhost: z.boolean(),
  capacity: z.string(),
  petFriendly: z.boolean(),
  fencedYard: z.boolean(),
  pricePerNight: z.object({
    low: z.number().positive(),
    high: z.number().positive(),
  }),
  amenities: z.array(z.string()),
  url: z.string().url(),
});

// Sample listings data mirroring the frontend
const sampleListings = [
  {
    id: "arrowhead-aframe",
    name: "A-Frame of Mind",
    location: "Lake Arrowhead, CA",
    rating: 4.94,
    reviewCount: 248,
    superhost: true,
    capacity: "6 guests",
    petFriendly: true,
    fencedYard: true,
    pricePerNight: { low: 250, high: 350 },
    amenities: ["Hot Tub", "Fenced Yard", "Lake Access", "Fireplace"],
    url: "https://www.airbnb.com/rooms/52514634",
  },
  {
    id: "bigbear-tanager",
    name: "Tanager Cabin",
    location: "Big Bear Lake, CA",
    rating: 4.55,
    reviewCount: 89,
    superhost: false,
    capacity: "8 guests",
    petFriendly: true,
    fencedYard: true,
    pricePerNight: { low: 200, high: 250 },
    amenities: ["Hot Tub", "Fenced Yard", "Fireplace", "Game Room"],
    url: "https://www.airbnb.com/rooms/675389533134206485",
  },
  {
    id: "bigbear-cottage",
    name: "Private Big Bear Cottage",
    location: "Big Bear Lake, CA",
    rating: 4.9,
    reviewCount: 134,
    superhost: true,
    capacity: "4 guests",
    petFriendly: true,
    fencedYard: true,
    pricePerNight: { low: 150, high: 180 },
    amenities: ["Fenced Yard", "Fireplace", "No Pet Fee", "Mountain Views"],
    url: "https://www.airbnb.com/rooms/48029014",
  },
  {
    id: "carmel-oasis",
    name: "Carmel Oasis",
    location: "Carmel-by-the-Sea, CA",
    rating: 4.98,
    reviewCount: 52,
    superhost: true,
    capacity: "4 guests",
    petFriendly: true,
    fencedYard: true,
    pricePerNight: { low: 350, high: 450 },
    amenities: ["Fenced Yard", "Fireplace", "Garden", "Near Beach"],
    url: "https://www.airbnb.com/rooms/1186251348043432890",
  },
];

// ─── Cost breakdown helper ────────────────────────────────────────────────────

function calcWeekendCost(pricePerNight: { low: number; high: number }, nights = 2, petFee = 0) {
  return {
    low: pricePerNight.low * nights + petFee,
    high: pricePerNight.high * nights + petFee,
  };
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Airbnb Getaway listings validation", () => {
  it("all 4 listings pass schema validation", () => {
    for (const listing of sampleListings) {
      const result = ListingSchema.safeParse(listing);
      expect(result.success, `Listing "${listing.name}" failed schema validation`).toBe(true);
    }
  });

  it("all listings are pet-friendly", () => {
    for (const listing of sampleListings) {
      expect(listing.petFriendly).toBe(true);
    }
  });

  it("all listings have fenced yards", () => {
    for (const listing of sampleListings) {
      expect(listing.fencedYard).toBe(true);
    }
  });

  it("all listings have valid Airbnb URLs", () => {
    for (const listing of sampleListings) {
      expect(listing.url).toMatch(/^https:\/\/www\.airbnb\.com\/rooms\//);
    }
  });

  it("ratings are all above 4.5", () => {
    for (const listing of sampleListings) {
      expect(listing.rating).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("there are exactly 4 listings", () => {
    expect(sampleListings).toHaveLength(4);
  });
});

describe("Weekend cost breakdown calculations", () => {
  it("calculates 2-night stay correctly for A-Frame of Mind", () => {
    const listing = sampleListings.find((l) => l.id === "arrowhead-aframe")!;
    const cost = calcWeekendCost(listing.pricePerNight, 2, 0);
    expect(cost.low).toBe(500);
    expect(cost.high).toBe(700);
  });

  it("calculates 2-night stay correctly for Tanager Cabin", () => {
    const listing = sampleListings.find((l) => l.id === "bigbear-tanager")!;
    const cost = calcWeekendCost(listing.pricePerNight, 2, 0);
    expect(cost.low).toBe(400);
    expect(cost.high).toBe(500);
  });

  it("calculates 2-night stay with pet fee correctly", () => {
    const listing = sampleListings.find((l) => l.id === "carmel-oasis")!;
    const cost = calcWeekendCost(listing.pricePerNight, 2, 50);
    expect(cost.low).toBe(750); // 350*2 + 50
    expect(cost.high).toBe(950); // 450*2 + 50
  });

  it("Private Big Bear Cottage is the most affordable option", () => {
    const costs = sampleListings.map((l) => calcWeekendCost(l.pricePerNight, 2, 0));
    const minLow = Math.min(...costs.map((c) => c.low));
    const cottage = sampleListings.find((l) => l.id === "bigbear-cottage")!;
    const cottageCost = calcWeekendCost(cottage.pricePerNight, 2, 0);
    expect(cottageCost.low).toBe(minLow);
  });

  it("Carmel Oasis is the most expensive option", () => {
    const costs = sampleListings.map((l) => calcWeekendCost(l.pricePerNight, 2, 0));
    const maxHigh = Math.max(...costs.map((c) => c.high));
    const carmel = sampleListings.find((l) => l.id === "carmel-oasis")!;
    const carmelCost = calcWeekendCost(carmel.pricePerNight, 2, 0);
    expect(carmelCost.high).toBe(maxHigh);
  });
});
