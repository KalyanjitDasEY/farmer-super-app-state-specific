import { describe, expect, it } from "vitest";

import { advisoryCategories, advisoryFeed } from "./advisory-data";

describe("My Advisories reference data", () => {
  it("contains the six supplied feed advisories", () => {
    expect(advisoryFeed.map(({ title }) => title)).toEqual([
      "Leaf Blast Risk Increasing",
      "Nitrogen Top Dressing Advisory",
      "Rainfall Expected Tomorrow",
      "Irrigation Advisory",
      "Paddy Market Update",
      "Spray Window Available",
    ]);
  });

  it("contains all twelve supplied advisory categories", () => {
    expect(advisoryCategories).toHaveLength(12);
    expect(advisoryCategories.map(({ title }) => title)).toContain(
      "Pest & Disease",
    );
    expect(advisoryCategories.map(({ title }) => title)).toContain(
      "Livestock Care",
    );
  });
});
