import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { TrackingForm } from "@/features/tracking/TrackingForm";
import { getDictionary } from "@/i18n/dictionaries";

describe("TrackingForm", () => {
  it("validates and displays the fictional matching application", async () => {
    const user = userEvent.setup();
    render(<TrackingForm dictionary={getDictionary("en")} />);

    await user.type(
      screen.getByLabelText("Application reference"),
      "RJ-DEMO-2026-001",
    );
    await user.type(
      screen.getByLabelText("Registered mobile number"),
      "9876543210",
    );
    await user.click(screen.getByRole("button", { name: "Track application" }));

    expect(await screen.findByText("Application found")).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(
      <TrackingForm dictionary={getDictionary("en")} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
