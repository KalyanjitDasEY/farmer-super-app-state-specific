import { describe, expect, it } from "vitest";

import {
  MockIdentityRepository,
  MockLocationRepository,
  MockSchemeRepository,
} from "@/adapters/mock-repositories";
import { DomainError } from "@/domain/errors";

describe("mock repositories", () => {
  it("filters schemes through the same contract used by routes", async () => {
    const repository = new MockSchemeRepository();
    const result = await repository.list({
      locale: "en",
      jurisdiction: "central",
      query: "insurance",
      sort: "latest",
      page: 1,
      pageSize: 6,
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.id).toBe("fasal-bima");
  });

  it("returns a typed not-found domain error", async () => {
    const repository = new MockSchemeRepository();
    await expect(repository.getById("missing")).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });

  it("accepts only the documented demo OTP", async () => {
    const repository = new MockIdentityRepository();
    const challenge = await repository.requestOtp("123456789012");
    await expect(
      repository.verifyOtp(challenge.challengeId, "123456"),
    ).resolves.toBe(true);
    await expect(
      repository.verifyOtp(challenge.challengeId, "654321"),
    ).resolves.toBe(false);
  });

  it("rejects a Khasra outside the selected hierarchy", async () => {
    const repository = new MockLocationRepository();
    await expect(
      repository.resolve({
        districtId: "jaipur",
        tehsilId: "osian",
        villageId: "khetasar",
        anchorKhasra: "123/45",
      }),
    ).rejects.toBeInstanceOf(DomainError);
  });
});
