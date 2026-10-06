import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Stepper } from "@/components/layout/Stepper";
import { getDictionary } from "@/i18n/dictionaries";

describe("Stepper", () => {
  it("exposes the current registration step semantically", () => {
    render(<Stepper dictionary={getDictionary("en")} current={2} />);
    expect(
      screen.getByText("Location & Anchor Khesra").closest("li"),
    ).toHaveAttribute("aria-current", "step");
  });
});
