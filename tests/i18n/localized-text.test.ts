import { describe, expect, it } from "vitest";

import { createTranslator, localized, localize } from "@/i18n/localized-text";

describe("localized text", () => {
  const title = localized("My Farm", "मेरा खेत");

  it("selects the requested locale", () => {
    expect(localize("en", title)).toBe("My Farm");
    expect(localize("hi", title)).toBe("मेरा खेत");
  });

  it("supports inline bilingual copy", () => {
    expect(createTranslator("en")("Back", "वापस")).toBe("Back");
    expect(createTranslator("hi")("Back", "वापस")).toBe("वापस");
  });

  it("preserves non-localized values such as names and identifiers", () => {
    expect(createTranslator("hi")("RJ-123")).toBe("RJ-123");
  });
});
