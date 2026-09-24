import { describe, expect, it } from "vitest";

import { deficiencies, nutrients, savedItems } from "./nutricheck-data";

describe("NutriCheck reference data", () => {
  it("provides the nutrients and content required by the supplied screens", () => {
    expect(nutrients.map(({ symbol }) => symbol)).toEqual([
      "N",
      "P",
      "K",
      "S",
      "Zn",
      "Fe",
    ]);
    expect(deficiencies).toHaveLength(5);
    expect(savedItems).toHaveLength(6);
  });
});
