import { describe, expect, it } from "vitest";

import {
  cropOptions,
  pestRisks,
} from "@/features/pest-disease/data/pest-disease-data";

describe("Pest & Disease reference data", () => {
  it("contains the six supplied crop options", () => {
    expect(cropOptions.map(({ name }) => name)).toEqual([
      "Paddy (Dhan)",
      "Wheat",
      "Maize",
      "Cotton",
      "Sugarcane",
      "Mustard",
    ]);
  });

  it("contains the six supplied paddy risks with unique slugs", () => {
    expect(pestRisks.map(({ title }) => title)).toEqual([
      "Yellow Stem Borer",
      "Blast (Leaf)",
      "Brown Planthopper",
      "Bacterial Leaf Blight",
      "Gall Midge",
      "Sheath Blight",
    ]);
    expect(new Set(pestRisks.map(({ slug }) => slug)).size).toBe(
      pestRisks.length,
    );
  });
});
