import { describe, expect, it } from "vitest";

import {
  animalCategories,
  animals,
} from "@/features/pashu-bazaar/data/pashu-data";

describe("Pashu Bazaar catalogue data", () => {
  it("contains the twelve supplied animal cards", () => {
    expect(animals).toHaveLength(12);
    expect(animals[0]).toMatchObject({
      slug: "hf-cow",
      price: "₹78,000",
    });
  });

  it("contains all primary livestock categories", () => {
    expect(animalCategories.map(({ name }) => name)).toEqual([
      "Cattle",
      "Buffalo",
      "Goat",
      "Sheep",
      "Poultry",
    ]);
  });
});
