import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { getDictionary } from "@/i18n/dictionaries";
import { mockDashboard } from "@/mocks/data";

describe("BottomNavigation", () => {
  it("shows the five primary destinations and opens the profile drawer", async () => {
    const user = userEvent.setup();

    render(
      <BottomNavigation
        locale="en"
        dictionary={getDictionary("en")}
        active="home"
        snapshot={mockDashboard}
      />,
    );

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("navigation", { name: "Primary" }),
    ).toHaveTextContent("HomeMy FarmNearby MarketCrop DoctorProfile");
    expect(screen.getByRole("link", { name: "Nearby Market" })).toHaveAttribute(
      "href",
      "/nearby",
    );

    await user.click(screen.getByRole("button", { name: "Profile" }));

    expect(
      screen.getByRole("dialog", { name: "Farmer Profile" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Ramesh Kumar" })).toBeVisible();
  });

  it("localizes all profile drawer content in Hindi", async () => {
    const user = userEvent.setup();

    render(
      <BottomNavigation
        locale="hi"
        dictionary={getDictionary("hi")}
        active="home"
        snapshot={mockDashboard}
      />,
    );

    await user.click(screen.getByRole("button", { name: "प्रोफाइल" }));

    expect(
      screen.getByRole("dialog", { name: "किसान प्रोफाइल" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "रमेश कुमार" })).toBeVisible();
    expect(screen.getByText("जन आधार")).toBeVisible();
    expect(screen.getByText("भूमि सारांश")).toBeVisible();
    expect(screen.getByText("भू-अभिलेख सारांश")).toBeVisible();
    expect(screen.getByText("ई-केवाईसी स्थिति")).toBeVisible();
    expect(screen.getByText("पहचान सत्यापित")).toBeVisible();
    expect(screen.getByRole("button", { name: "बंद करें" })).toBeVisible();
    expect(
      screen.getByText(
        "सुरक्षित बैकएंड एकीकरण के बाद प्रोफाइल संपादन उपलब्ध होगा।",
      ),
    ).toBeVisible();
  });
});
