import { defineConfig, devices } from "@playwright/test";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath = configuredBasePath
  ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";
const testPort = basePath ? 3206 : 3205;
const testDistDirectory = basePath ? ".next-e2e-base" : ".next-e2e-root";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: `http://127.0.0.1:${testPort}`,
    trace: "on-first-retry",
  },
  webServer: {
    command: `npx next dev -p ${testPort}`,
    url: `http://127.0.0.1:${testPort}${basePath}/`,
    env: {
      NEXT_DIST_DIR: testDistDirectory,
    },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 5"], channel: "chrome" },
    },
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
});
