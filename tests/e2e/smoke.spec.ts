import { expect, test } from "@playwright/test";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath = configuredBasePath
  ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";
const appUrl = (path: string) => `${basePath}${path}`;

test.beforeEach(async ({ context }) => {
  await context.addCookies([
    {
      name: "raj-kisan-locale",
      value: "en",
      domain: "127.0.0.1",
      path: basePath || "/",
    },
  ]);
});

test("public gateway reaches login and scheme discovery", async ({ page }) => {
  await page.goto(appUrl("/"));
  await expect(
    page.getByRole("heading", { name: "Raj Kisan Suvidha", level: 1 }),
  ).toBeVisible();

  await page
    .getByRole("link", { name: /Farmer Login/ })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Registered Farmer Login" }),
  ).toBeVisible();

  await page.goto(appUrl("/schemes"));
  await expect(
    page.getByRole("heading", { name: "Service Hub" }),
  ).toBeVisible();
  await page.getByRole("link", { name: /View Central Schemes/ }).click();
  await expect(
    page.getByRole("heading", { name: "Scheme Catalogue" }),
  ).toBeVisible();
});

test("language switching keeps the same clean URL", async ({ page }) => {
  await page.goto(appUrl("/"));
  await page.getByRole("combobox", { name: "Language" }).selectOption("hi");

  await expect(page).toHaveURL(
    new RegExp(`${basePath.replaceAll("/", "\\/")}\\/?$`),
  );
  await expect(page.getByText("आपका स्वागत है")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "किसान लॉगिन" }).first(),
  ).toBeVisible();
});

test("OTP login navigates without a locale segment", async ({ page }) => {
  await page.goto(appUrl("/login"));
  await page.locator("#login-identifier").fill("123456789012");
  await page.getByRole("button", { name: "Send OTP" }).click();
  await page.locator("#login-otp").fill("123456");
  await page.getByRole("button", { name: "Verify OTP and continue" }).click();

  await expect(page).toHaveURL(
    new RegExp(`${basePath.replaceAll("/", "\\/")}\\/home$`),
  );
  await expect(
    page.getByRole("heading", { name: "Ramesh Kumar" }),
  ).toBeVisible();
});

test("primary application journey creates a fictional draft", async ({
  page,
}) => {
  await page.goto(appUrl("/schemes/pm-kisan"));
  await page.getByRole("link", { name: "Apply Now" }).first().click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Create demo draft" }).click();
  await expect(page.getByText("RJ-DEMO-2026-001")).toBeVisible();
});

test("scheme application prefills farmer records and accepts required uploads", async ({
  page,
}) => {
  await page.goto(appUrl("/apply/smam"));

  await expect(
    page.getByRole("heading", {
      name: "Sub-Mission on Agricultural Mechanization",
      level: 1,
    }),
  ).toBeVisible();
  await expect(page.getByText("Ramesh Kumar")).toBeVisible();
  await expect(page.getByText("RJ23F12345678")).toBeVisible();
  await expect(page.getByText("Morija", { exact: true })).toBeVisible();
  await expect(page.getByText("Bank of Baroda", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Available in profile", { exact: true }),
  ).toHaveCount(3);

  await page
    .getByLabel("Choose file: Machinery quotation / Proforma invoice")
    .setInputFiles({
      name: "smam-machinery-quotation.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("demo quotation"),
    });

  await expect(page.getByText("smam-machinery-quotation.pdf")).toBeVisible();
  await expect(page.getByText("80%")).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    )
    .toBe(true);
});

test("offline fallback route explains the safe cache boundary", async ({
  page,
}) => {
  await page.goto(appUrl("/offline"));
  await expect(
    page.getByRole("heading", { name: "You are offline" }),
  ).toBeVisible();
  await expect(
    page.getByText(/personal services need a connection/i),
  ).toBeVisible();
});

test("farmer service modules render their replicated landing screens", async ({
  page,
}) => {
  const services = [
    ["/weather", "Weather"],
    ["/advisories", "My Advisories"],
    ["/marketplace", "Krishi Input Marketplace"],
    ["/nutricheck", "NutriCheck"],
  ] as const;

  for (const [path, heading] of services) {
    await page.goto(appUrl(path));
    await expect(
      page.getByRole("heading", { name: heading, level: 1 }).first(),
    ).toBeVisible();

    if (path === "/weather") {
      const hero = page
        .locator("section")
        .filter({ hasText: "Rainfall Today" })
        .first();
      await expect(hero).toBeVisible();
      await expect
        .poll(() =>
          hero.evaluate((element) => getComputedStyle(element).backgroundImage),
        )
        .toContain(
          `${basePath}/images/authenticated/weather/weather-field.jpg`,
        );
    }

    const heroImageName =
      path === "/marketplace"
        ? "Farmer in a field"
        : path === "/nutricheck"
          ? "Paddy leaf with nutrient markers"
          : null;
    if (heroImageName) {
      const heroImage = page.getByRole("img", { name: heroImageName });
      await expect(heroImage).toBeVisible();
      await expect
        .poll(() =>
          heroImage.evaluate((image: HTMLImageElement) => image.naturalWidth),
        )
        .toBeGreaterThan(0);
    }
  }
});

test("crop planner creates an interactive crop calendar", async ({ page }) => {
  await page.goto(appUrl("/home"));
  await page.getByRole("link", { name: /Plan Your Crop/ }).click();

  await expect(
    page.getByRole("heading", { name: "Plan Your Crop", level: 1 }),
  ).toBeVisible();
  await expect(page.getByLabel("Select Location")).toContainText("Chomu");

  await page.getByRole("button", { name: "Get Crop Recommendation" }).click();

  await expect(page).toHaveURL(/\/plan-your-crop\/calendar\?/);
  await expect(
    page.getByRole("heading", { name: "Paddy (Dhan)", level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByText("Morija, Chomu, Jaipur, Rajasthan"),
  ).toBeVisible();

  const progress = page.getByRole("progressbar", {
    name: "Crop plan progress",
  });
  const initialProgress = await progress.getAttribute("aria-valuenow");
  await page.getByRole("button", { name: "Mark Complete" }).click();
  await expect(progress).not.toHaveAttribute("aria-valuenow", initialProgress!);

  await page.getByRole("button", { name: "View Details" }).click();
  await expect(
    page.getByText(/Apply only after checking soil moisture/),
  ).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    )
    .toBe(true);
});

test("unfinished dashboard services show a positive preview and return home", async ({
  page,
}) => {
  await page.goto(appUrl("/home"));

  const unfinishedServices = [
    "e-NAM",
    "Krishak Uphaar",
    "Kisan Kalewa",
    "FPO & Services",
    "Finance & Loans",
    "Training & Videos",
  ] as const;

  for (const service of unfinishedServices) {
    await expect(page.getByRole("link", { name: service })).toHaveAttribute(
      "href",
      new RegExp(
        `${basePath.replaceAll("/", "\\/")}\\/feature-preview\\?feature=`,
      ),
    );
  }

  await page.getByRole("link", { name: "e-NAM" }).click();
  await expect(
    page.getByRole("heading", {
      name: "This feature is under development",
      level: 1,
    }),
  ).toBeVisible();
  await expect(page.getByText("e-NAM", { exact: true })).toBeVisible();
  await expect(
    page.getByText(/Taking you back to the home screen/),
  ).toBeVisible();
  await expect(page).toHaveURL(
    new RegExp(`${basePath.replaceAll("/", "\\/")}\\/home$`),
    { timeout: 5_000 },
  );
});

test("soil health card shows parcel analysis and working report actions", async ({
  page,
}) => {
  test.setTimeout(90_000);

  await page.goto(appUrl("/home"));
  await expect(
    page.locator("main").getByRole("link", { name: /Soil Health Card/ }),
  ).toHaveAttribute("href", appUrl("/soil-health"));

  await page.goto(appUrl("/soil-health"));
  await expect(
    page.getByRole("heading", {
      name: "Soil Health Card / Report",
      level: 1,
    }),
  ).toBeVisible();
  await expect(page.getByText("SHC-RJ-24-05-1231")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Soil Parameter Summary" }),
  ).toBeVisible();
  await expect(page.getByText("Overall Soil Health")).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Nutrient Use Recommendations (Indicative)",
    }),
  ).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /Download PDF/ }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe(
    "soil-health-card-SHC-RJ-24-05-1231.pdf",
  );

  await page.getByRole("button", { name: /Refresh Report/ }).click();
  await expect(page.getByText(/Report refreshed at/)).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    )
    .toBe(true);
});

test("nearby sellers hub links four responsive service screens", async ({
  page,
}) => {
  test.setTimeout(120_000);

  await page.goto(appUrl("/home"));
  await expect(
    page
      .locator("main")
      .getByRole("link", { name: /Nearby Sellers & Services/ }),
  ).toHaveAttribute("href", appUrl("/nearby"));

  await page.goto(appUrl("/nearby"));
  await expect(
    page.getByRole("heading", {
      name: "Nearby Sellers & Services",
      level: 1,
    }),
  ).toBeVisible();

  const services = [
    ["/nearby/seeds", "Seed Suppliers", "Nearby Seed Suppliers"],
    [
      "/nearby/fertilizers",
      "Fertilizer Suppliers",
      "Nearby Fertilizer Suppliers",
    ],
    [
      "/nearby/crop-protection",
      "Crop Protection Sellers",
      "Nearby Crop Protection Products Sellers",
    ],
    [
      "/nearby/warehouses",
      "Warehouse Availability",
      "Nearby Warehouse Availability",
    ],
  ] as const;

  for (const [path, cardName] of services) {
    await expect(
      page.getByRole("link", { name: new RegExp(cardName) }),
    ).toHaveAttribute("href", appUrl(path));
  }

  for (const [path, , heading] of services) {
    await page.goto(appUrl(path));
    await expect(
      page.getByRole("heading", { name: heading, level: 1 }),
    ).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
      )
      .toBe(true);
  }

  await page.goto(appUrl("/nearby/seeds"));
  await page
    .getByPlaceholder("Search by supplier name, seed type...")
    .fill("Govindgarh");
  await expect(
    page.getByRole("heading", { name: "Govindgarh Balaji Seeds" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Chomu Krishi Seed Center" }),
  ).toHaveCount(0);

  const seller = page.locator("article").filter({
    has: page.getByRole("heading", { name: "Govindgarh Balaji Seeds" }),
  });
  await seller.getByRole("button", { name: "View Details" }).click();
  await expect(
    seller.getByRole("link", { name: "Get Directions" }),
  ).toBeVisible();
});

test("mandi and diagnostic services render responsively", async ({ page }) => {
  const services = [
    ["/mandi", "Mandi Rates"],
    ["/crop-doctor", "Crop Doctor"],
    ["/leaf-colour-check", "DLCC – Digital Leaf Colour Chart"],
    ["/pest-disease", "Pest & Disease"],
  ] as const;

  for (const [path, heading] of services) {
    await page.goto(appUrl(path));
    await expect(
      page.getByRole("heading", { name: heading, level: 1 }),
    ).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
      )
      .toBe(true);
  }

  await page.goto(appUrl("/mandi"));
  const cropSelect = page.getByLabel("Select Crop");
  await cropSelect.selectOption("paddy");
  await expect(
    page.getByRole("heading", {
      name: "Prices in Other Mandis (Paddy - FAQ)",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: /All Crops/ }).click();
  await expect(cropSelect).toHaveValue("paddy");
});

test("diagnostic service entry actions reach their nested flows", async ({
  page,
}) => {
  test.setTimeout(90_000);

  await page.goto(appUrl("/crop-doctor"));
  await page.getByRole("link", { name: /Start New Diagnosis/ }).click();
  await expect(
    page.getByRole("heading", { name: "Crop & Image Capture", level: 1 }),
  ).toBeVisible();
  const captureFrame = page
    .getByText("Place the affected leaf inside the frame")
    .locator("..");
  await expect
    .poll(() =>
      captureFrame.evaluate(
        (element) => getComputedStyle(element).backgroundImage,
      ),
    )
    .toContain(`${basePath}/images/authenticated/diagnosis-leaf.jpg`);

  await page.goto(appUrl("/leaf-colour-check"));
  await page
    .getByRole("link", { name: /Start Leaf Colour Assessment/ })
    .click();
  await expect(page).toHaveURL(
    new RegExp(
      `${basePath.replaceAll("/", "\\/")}\\/leaf-colour-check\\/reading$`,
    ),
    { timeout: 30_000 },
  );
  await expect(
    page.getByRole("heading", { name: "DLCC Reading 1 of 10", level: 1 }),
  ).toBeVisible();

  await page.goto(appUrl("/pest-disease"));
  const heroImage = page.getByRole("img", {
    name: "Healthy paddy field protected from pests",
  });
  await expect(heroImage).toBeVisible();
  await expect
    .poll(() =>
      heroImage.evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBeGreaterThan(0);
  await page
    .getByRole("link", { name: /Explore Pest & Disease Library/ })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Pest / Disease Listing",
      level: 1,
    }),
  ).toBeVisible();
});

test("livestock, farm, machinery and startup services render responsively", async ({
  page,
}) => {
  test.setTimeout(90_000);

  await page.goto(appUrl("/home"));
  for (const [name, path] of [
    ["Pashu Bazaar", "/pashu-bazaar"],
    ["My Farm", "/farms"],
    ["Book Machinery", "/machinery"],
    ["Startups", "/startups"],
  ] as const) {
    await expect(
      page.locator("main").getByRole("link", { name: new RegExp(name) }),
    ).toHaveAttribute("href", appUrl(path));
  }

  const services = [
    ["/pashu-bazaar", "Pashu Bazaar"],
    ["/farms", "My Farms"],
    ["/machinery", "Book Farm Machinery"],
    ["/startups", "Startups"],
  ] as const;

  for (const [path, heading] of services) {
    await page.goto(appUrl(path));
    await expect(
      page.getByRole("heading", { name: heading, level: 1 }).first(),
    ).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
      )
      .toBe(true);
  }

  for (const [path, imageName] of [
    ["/pashu-bazaar", "Farmer with healthy cattle"],
    ["/machinery", "Farm tractor ready for booking"],
  ] as const) {
    await page.goto(appUrl(path));
    const image = page.getByRole("img", { name: imageName });
    await expect(image).toBeVisible();
    await expect
      .poll(() =>
        image.evaluate((element: HTMLImageElement) => element.naturalWidth),
      )
      .toBeGreaterThan(0);
  }
});

test("new service entry actions reach their nested flows", async ({ page }) => {
  test.setTimeout(90_000);

  await page.goto(appUrl("/pashu-bazaar"));
  await page.getByRole("link", { name: /Browse Animals/ }).click();
  await expect(
    page.getByRole("heading", {
      name: "Animal Search & Listing",
      level: 1,
    }),
  ).toBeVisible();

  await page.goto(appUrl("/farms"));
  await page.getByRole("link", { name: /Add Farm/ }).click();
  await expect(
    page.getByRole("heading", { name: "Add Farm / Field", level: 1 }),
  ).toBeVisible();

  await page.goto(appUrl("/machinery"));
  await page
    .getByRole("link", { name: /Select Operation/ })
    .first()
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Select Operation / Machine",
      level: 1,
    }),
  ).toBeVisible();

  await page.goto(appUrl("/startups"));
  await page
    .getByRole("link", { name: /View Details/ })
    .first()
    .click();
  await expect(page).toHaveURL(
    new RegExp(
      `${basePath.replaceAll("/", "\\/")}\\/startups\\/agrotech-solutions$`,
    ),
    { timeout: 30_000 },
  );
  await expect(
    page.getByRole("heading", { name: "AgroTech Solutions", level: 1 }),
  ).toBeVisible();
});

test("MKSY tile opens the complete claim flow without horizontal overflow", async ({
  page,
}) => {
  test.setTimeout(90_000);

  await page.goto(appUrl("/home"));
  await expect(
    page.locator("main").getByRole("link", { name: /MKSY/ }),
  ).toHaveAttribute("href", appUrl("/mksy"));

  await page.goto(appUrl("/mksy"));
  await expect(
    page.getByRole("heading", {
      name: "Mukhyamantri Krishak Durghatna Kalyan Yojana",
      level: 1,
      exact: true,
    }),
  ).toBeVisible();
  const heroImage = page.getByRole("img", {
    name: "Rajasthan farmer standing in an agricultural field",
  });
  await expect(heroImage).toBeVisible();
  await expect
    .poll(() =>
      heroImage.evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBeGreaterThan(0);

  await page.getByRole("link", { name: /Start Claim/ }).click();
  await expect(page.getByText("Step 1 of 5")).toBeVisible();

  await page.getByRole("link", { name: /Next: Accident Details/ }).click();
  await expect(page.getByText("Step 2 of 5")).toBeVisible();

  await page.getByRole("link", { name: /Next: Documents/ }).click();
  await expect(page.getByText("Step 3 of 5")).toBeVisible();

  await page.getByRole("link", { name: /Next: Review/ }).click();
  await expect(page.getByText("Step 5 of 5")).toBeVisible();
  await page.getByRole("checkbox").check();
  await page.getByRole("link", { name: /Submit Claim/ }).click();

  await expect(page).toHaveURL(
    new RegExp(`${basePath.replaceAll("/", "\\/")}\\/mksy\\/status$`),
  );
  await expect(
    page.getByRole("heading", {
      name: "MKSY Claim Approval Pipeline",
      level: 1,
    }),
  ).toBeVisible();

  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    )
    .toBe(true);
});
