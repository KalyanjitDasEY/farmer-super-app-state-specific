import { describe, expect, it } from "vitest";

import {
  getStartup,
  startupCategories,
  startups,
} from "@/features/startups/data/startup-data";

describe("startup directory data", () => {
  it("contains the six startups shown in the directory design", () => {
    expect(startups.slice(0, 6).map(({ name }) => name)).toEqual([
      "AgroTech Solutions",
      "JalRakshak Innovations",
      "NutriCare Biotech",
      "GreenVolt Energy",
      "KisanConnect IoT",
      "DroneKrishi",
    ]);
  });

  it("provides unique category identifiers", () => {
    const ids = startupCategories.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("resolves startup details by slug", () => {
    expect(getStartup("agrotech-solutions")).toMatchObject({
      products: 7,
      reviews: 28,
      statesCovered: 8,
    });
    expect(getStartup("unknown-startup")).toBeUndefined();
  });
});
