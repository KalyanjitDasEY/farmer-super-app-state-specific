// @vitest-environment node

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("service worker cache policy", () => {
  it("excludes personal and transactional routes", async () => {
    const worker = await readFile(resolve("public/sw.js"), "utf8");
    expect(worker).toContain("login|register|profile|apply|track|home");
    expect(worker).toContain('request.method !== "GET"');
  });

  it("uses versioned caches and an offline fallback", async () => {
    const worker = await readFile(resolve("public/sw.js"), "utf8");
    expect(worker).toContain('const CACHE_VERSION = "bihar-kisan-v1"');
    expect(worker).toContain("self.registration.scope");
    expect(worker).toContain('const OFFLINE_URL = withBasePath("/offline")');
  });

  it("does not cache Next.js client bundles", async () => {
    const worker = await readFile(resolve("public/sw.js"), "utf8");
    expect(worker).not.toContain('url.pathname.startsWith("/_next/static/")');
  });
});
