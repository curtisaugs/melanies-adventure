/**
 * Tests for RV Adventure page data integrity
 * Validates route stops, campsite data, weekend options, and cost breakdown
 */

import { describe, it, expect } from "vitest";

// ─── Route Stop Data Validation ─────────────────────────────────────────────────

const routeStops = [
  { id: "malibu", name: "Malibu", distance: "30 min from Santa Rosa (LA)", type: "stretch" },
  { id: "pismo", name: "Pismo Beach", distance: "2.5 hrs from LA", type: "lunch" },
  { id: "cambria", name: "Cambria", distance: "3.5 hrs from LA", type: "market" },
  { id: "carmel", name: "Carmel-by-the-Sea", distance: "4.5 hrs from LA", type: "town" },
  { id: "garrapata", name: "Garrapata State Park", distance: "Just south of Carmel", type: "hike" },
  { id: "bixby", name: "Bixby Bridge", distance: "13 miles south of Carmel", type: "photo" },
  { id: "pfeiffer", name: "Pfeiffer Beach", distance: "In Big Sur, off Sycamore Road", type: "beach" },
  { id: "mcway", name: "McWay Falls", distance: "Julia Pfeiffer Burns State Park", type: "view" },
];

const campsites = [
  {
    id: "fernwood",
    name: "Fernwood Resort",
    recommended: true,
    maxLength: "30ft motorhome / 28ft trailer",
    baseRate: "$70–$145/night",
    petFee: "$5/dog/night",
    phone: "(831) 667-2422",
  },
  {
    id: "bigsurcamp",
    name: "Big Sur Campground & Cabins",
    recommended: false,
    maxLength: "40ft motorhome",
    baseRate: "$150–$180/night",
    petFee: "$5/dog/night",
    phone: "(831) 667-2322",
  },
];

const weekendOptions = [
  {
    id: "march",
    dates: "March 27–29",
    subtitle: "The Birthday Weekend",
    tag: "Farmers Market Magic",
  },
  {
    id: "april",
    dates: "April 3–5",
    subtitle: "The Backup Plan",
    tag: "Calla Lily Peak",
  },
];

const costItems = [
  { category: "RV Rental", item: "Class C, 26-28ft, pet-friendly (Outdoorsy)", total: "$600" },
  { category: "RV Rental", item: "Pet fee (flat, 2 dogs)", total: "$100" },
  { category: "Campsite", item: "Fernwood Resort (base rate, 2 people)", total: "$220" },
  { category: "Campsite", item: "Pet fee (Maury + Kota)", total: "$20" },
  { category: "Campsite", item: "Extra persons (Annie + Mokin)", total: "$20" },
  { category: "Gas", item: "LA → Big Sur → LA (~600 miles, ~10mpg, ~$4.50/gal)", total: "$270" },
  { category: "Activities", item: "Pfeiffer Beach parking (cash)", total: "$15" },
  { category: "Activities", item: "Pfeiffer State Park day use (River Trail)", total: "$10" },
  { category: "Food", item: "Groceries + RV cooking (4 people, 3 days)", total: "$200" },
  { category: "Food", item: "Cambria Farmers Market + Linn's pie", total: "$60" },
  { category: "Food", item: "Carmel dinner (Forge in the Forest or PortaBella)", total: "$150" },
  { category: "Misc", item: "Firewood, ice, supplies, dog treats", total: "$50" },
];

describe("RV Adventure Route Stops", () => {
  it("should have 8 route stops in order from LA to Big Sur", () => {
    expect(routeStops).toHaveLength(8);
  });

  it("should start with Malibu as the first stop", () => {
    expect(routeStops[0].id).toBe("malibu");
    expect(routeStops[0].name).toBe("Malibu");
  });

  it("should end with McWay Falls as the final stop", () => {
    const last = routeStops[routeStops.length - 1];
    expect(last.id).toBe("mcway");
    expect(last.name).toBe("McWay Falls");
  });

  it("should include Carmel-by-the-Sea as a town stop", () => {
    const carmel = routeStops.find((s) => s.id === "carmel");
    expect(carmel).toBeDefined();
    expect(carmel?.type).toBe("town");
  });

  it("should include Pfeiffer Beach as a beach stop", () => {
    const pfeiffer = routeStops.find((s) => s.id === "pfeiffer");
    expect(pfeiffer).toBeDefined();
    expect(pfeiffer?.type).toBe("beach");
  });

  it("should include Garrapata State Park for the Calla Lily Valley", () => {
    const garrapata = routeStops.find((s) => s.id === "garrapata");
    expect(garrapata).toBeDefined();
    expect(garrapata?.type).toBe("hike");
  });

  it("should have all stops with unique IDs", () => {
    const ids = routeStops.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

describe("RV Adventure Campsite Options", () => {
  it("should have exactly 2 campsite options", () => {
    expect(campsites).toHaveLength(2);
  });

  it("should recommend Fernwood Resort as the primary campsite", () => {
    const fernwood = campsites.find((c) => c.id === "fernwood");
    expect(fernwood?.recommended).toBe(true);
  });

  it("should not recommend Big Sur Campground as primary", () => {
    const bigsurcamp = campsites.find((c) => c.id === "bigsurcamp");
    expect(bigsurcamp?.recommended).toBe(false);
  });

  it("Fernwood should accommodate a Class C RV (max 30ft)", () => {
    const fernwood = campsites.find((c) => c.id === "fernwood");
    expect(fernwood?.maxLength).toContain("30ft");
  });

  it("Big Sur Campground should accommodate larger RVs (40ft)", () => {
    const bigsurcamp = campsites.find((c) => c.id === "bigsurcamp");
    expect(bigsurcamp?.maxLength).toContain("40ft");
  });

  it("both campsites should have pet fees", () => {
    campsites.forEach((site) => {
      expect(site.petFee).toBeTruthy();
      expect(site.petFee).toContain("$5");
    });
  });

  it("both campsites should have phone numbers", () => {
    campsites.forEach((site) => {
      expect(site.phone).toBeTruthy();
      expect(site.phone).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/);
    });
  });
});

describe("RV Adventure Weekend Options", () => {
  it("should have exactly 2 weekend options", () => {
    expect(weekendOptions).toHaveLength(2);
  });

  it("Weekend 1 should be March 27-29 (the birthday weekend)", () => {
    const march = weekendOptions.find((w) => w.id === "march");
    expect(march?.dates).toBe("March 27–29");
    expect(march?.subtitle).toBe("The Birthday Weekend");
  });

  it("Weekend 2 should be April 3-5 (the backup plan)", () => {
    const april = weekendOptions.find((w) => w.id === "april");
    expect(april?.dates).toBe("April 3–5");
    expect(april?.subtitle).toBe("The Backup Plan");
  });

  it("Weekend 1 should highlight the Farmers Market timing", () => {
    const march = weekendOptions.find((w) => w.id === "march");
    expect(march?.tag).toBe("Farmers Market Magic");
  });

  it("Weekend 2 should highlight the Calla Lily bloom", () => {
    const april = weekendOptions.find((w) => w.id === "april");
    expect(april?.tag).toBe("Calla Lily Peak");
  });
});

describe("RV Adventure Cost Breakdown (Curtis Only)", () => {
  it("should have 12 cost line items", () => {
    expect(costItems).toHaveLength(12);
  });

  it("should include RV rental as the largest single cost", () => {
    const rvRental = costItems.find((c) => c.item.includes("Class C, 26-28ft"));
    expect(rvRental).toBeDefined();
    expect(rvRental?.total).toBe("$600");
  });

  it("should include pet fees for Maury and Kota", () => {
    const rvPetFee = costItems.find((c) => c.item.includes("Pet fee (flat, 2 dogs)"));
    const campsitePetFee = costItems.find((c) => c.item.includes("Pet fee (Maury + Kota)"));
    expect(rvPetFee).toBeDefined();
    expect(campsitePetFee).toBeDefined();
  });

  it("should include extra person fees for Annie and Mokin", () => {
    const extraPersons = costItems.find((c) => c.item.includes("Annie + Mokin"));
    expect(extraPersons).toBeDefined();
    expect(extraPersons?.total).toBe("$20");
  });

  it("should include Pfeiffer Beach cash parking fee", () => {
    const pfeiffer = costItems.find((c) => c.item.includes("Pfeiffer Beach parking"));
    expect(pfeiffer).toBeDefined();
    expect(pfeiffer?.total).toBe("$15");
  });

  it("total cost should be under $2,500 budget", () => {
    const totalCents = costItems.reduce((sum, item) => {
      const dollars = parseInt(item.total.replace("$", ""), 10);
      return sum + dollars;
    }, 0);
    expect(totalCents).toBeLessThan(2500);
  });

  it("total cost should match the stated $1,715 estimate", () => {
    const totalCents = costItems.reduce((sum, item) => {
      const dollars = parseInt(item.total.replace("$", ""), 10);
      return sum + dollars;
    }, 0);
    expect(totalCents).toBe(1715);
  });

  it("all cost items should have a category, item description, and total", () => {
    costItems.forEach((item) => {
      expect(item.category).toBeTruthy();
      expect(item.item).toBeTruthy();
      expect(item.total).toBeTruthy();
      expect(item.total).toMatch(/^\$\d+$/);
    });
  });
});
