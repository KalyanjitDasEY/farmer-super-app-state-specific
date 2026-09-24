import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { KrishiMitraChat } from "@/features/home/KrishiMitraChat";
import { getDictionary } from "@/i18n/dictionaries";

describe("KrishiMitraChat", () => {
  it("opens in Hindi and answers a sample question after typing", async () => {
    const user = userEvent.setup();

    render(<KrishiMitraChat locale="hi" dictionary={getDictionary("hi")} />);

    await user.click(screen.getByRole("button", { name: "कृषि मित्र" }));
    expect(
      screen.getByRole("dialog", { name: "कृषि मित्र से पूछें" }),
    ).toBeVisible();

    await user.click(
      screen.getByRole("button", { name: "क्या कल बारिश होगी?" }),
    );
    expect(screen.getByLabelText("कृषि मित्र जवाब लिख रहे हैं")).toBeVisible();

    await waitFor(() => {
      expect(
        screen.getByText(/कल जयपुर के आसपास हल्की बारिश की संभावना है/),
      ).toBeVisible();
    });
  });
});
