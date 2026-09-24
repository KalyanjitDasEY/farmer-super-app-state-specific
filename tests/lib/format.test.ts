import { describe, expect, it } from "vitest";

import { formatCurrency, formatDateTime, formatNumber } from "@/lib/format";

describe("locale formatters", () => {
  it("formats Indian currency without decimals", () => {
    expect(formatCurrency(6000, "en")).toContain("6,000");
    expect(formatCurrency(6000, "en")).toContain("₹");
  });

  it("formats numbers using the selected locale", () => {
    expect(formatNumber(123456, "en")).toBe("1,23,456");
    expect(formatNumber(123456, "hi")).toContain("1,23,456");
  });

  it("formats valid ISO dates", () => {
    expect(formatDateTime("2026-09-22T09:15:00+05:30", "en")).toContain("2026");
  });

  it("uses a localized 24-hour time for Hindi dates", () => {
    const formatted = formatDateTime("2026-09-22T09:15:00+05:30", "hi");

    expect(formatted).not.toMatch(/\b(?:am|pm)\b/i);
  });
});
