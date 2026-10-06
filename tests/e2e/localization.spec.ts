import { expect, test } from "@playwright/test";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath = configuredBasePath
  ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";
const appUrl = (path: string) => `${basePath}${path}`;

const localizedRoutes = [
  "/",
  "/login",
  "/register/identity",
  "/register/location",
  "/register/complete",
  "/home",
  "/mandi",
  "/more",
  "/offline",
  "/track",
  "/feature-preview?feature=e-NAM",
  "/schemes",
  "/schemes/departments",
  "/schemes/catalogue",
  "/schemes/pm-kisan",
  "/apply/pm-kisan",
  "/profile",
  "/profile/audit",
  "/profile/consent/select-fields",
  "/profile/consent/review",
  "/profile/consent/token",
  "/profile/digital-id",
  "/profile/digital-id/vid",
  "/profile/representatives",
  "/profile/representatives/add",
  "/profile/wallet",
  "/profile/wallet/credential",
  "/advisories",
  "/advisories/categories",
  "/advisories/leaf-blast",
  "/advisories/leaf-blast/reminder",
  "/crop-doctor",
  "/crop-doctor/advisory",
  "/crop-doctor/analyzing",
  "/crop-doctor/capture",
  "/crop-doctor/confirm",
  "/crop-doctor/diagnosis",
  "/crop-doctor/dosage",
  "/crop-doctor/history",
  "/crop-doctor/low-confidence",
  "/crop-doctor/quality",
  "/crop-doctor/survey",
  "/farms",
  "/farms/new",
  "/farms/crops/new",
  "/leaf-colour-check",
  "/leaf-colour-check/advice",
  "/leaf-colour-check/history",
  "/leaf-colour-check/reading",
  "/leaf-colour-check/result",
  "/machinery",
  "/machinery/select",
  "/machinery/requirements",
  "/machinery/providers",
  "/machinery/machine",
  "/machinery/review",
  "/machinery/bookings/mch-240524-00078",
  "/machinery/bookings/mch-240524-00078/complete",
  "/marketplace",
  "/marketplace/cart",
  "/marketplace/checkout",
  "/marketplace/compare",
  "/marketplace/orders",
  "/marketplace/products/iffco-urea",
  "/marketplace/search",
  "/mksy",
  "/mksy/status",
  "/mksy/claim",
  "/mksy/claim/location",
  "/mksy/claim/documents",
  "/mksy/claim/review",
  "/nearby",
  "/nearby/crop-protection",
  "/nearby/fertilizers",
  "/nearby/seeds",
  "/nearby/warehouses",
  "/nutricheck",
  "/nutricheck/library",
  "/nutricheck/library/nitrogen",
  "/nutricheck/recommendation",
  "/nutricheck/saved",
  "/pashu-bazaar",
  "/pashu-bazaar/animals",
  "/pashu-bazaar/animals/hf-cow",
  "/pashu-bazaar/animals/hf-cow/enquiry",
  "/pashu-bazaar/listings",
  "/pashu-bazaar/listings/new",
  "/pashu-bazaar/listings/hf-cow/review",
  "/pashu-bazaar/transactions/hf-cow",
  "/pest-disease",
  "/pest-disease/library",
  "/pest-disease/library/brown-planthopper",
  "/plan-your-crop",
  "/plan-your-crop/calendar",
  "/soil-health",
  "/startups",
  "/weather",
  "/weather/advisory",
  "/weather/forecast",
  "/weather/hourly",
  "/weather/operations",
  "/weather/today",
] as const;

test.beforeEach(async ({ context }) => {
  await context.addCookies([
    {
      name: "bihar-kisan-locale",
      value: "hi",
      domain: "127.0.0.1",
      path: basePath || "/",
    },
  ]);
});

test("every screen renders substantial Hindi content", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-chromium",
    "The complete route audit only needs one browser profile.",
  );
  test.setTimeout(10 * 60 * 1_000);

  for (const route of localizedRoutes) {
    await test.step(route, async () => {
      const response = await page.goto(appUrl(route), {
        waitUntil: "domcontentloaded",
      });
      expect(
        response?.status(),
        `${route} should load successfully`,
      ).toBeLessThan(400);
      await expect(page.locator("html")).toHaveAttribute("lang", "hi");

      const main = page.locator("#main-content");
      await expect(main, `${route} should have a main region`).toBeVisible();
      const text = (await main.innerText()).replace(/\s+/g, " ").trim();
      const devanagariCount = text.match(/[\u0900-\u097f]/g)?.length ?? 0;
      const latinCount = text.match(/[A-Za-z]/g)?.length ?? 0;
      const localizedShare = devanagariCount / (devanagariCount + latinCount);

      expect(
        devanagariCount,
        `${route} should contain translated screen content`,
      ).toBeGreaterThan(20);
      expect(
        localizedShare,
        `${route} should not remain predominantly English`,
      ).toBeGreaterThan(0.12);
    });
  }
});
