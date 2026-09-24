"use server";

import { DomainError } from "@/domain/errors";
import { repositories } from "@/services/repositories";

export type IdentityActionResult =
  | {
      ok: true;
      challengeId: string;
      maskedDestination: string;
    }
  | { ok: false; messageKey: string };

export async function requestDemoOtp(
  identifier: string,
): Promise<IdentityActionResult> {
  try {
    const result = await repositories.identity.requestOtp(identifier);
    return { ok: true, ...result };
  } catch (error) {
    if (error instanceof DomainError) {
      return { ok: false, messageKey: error.messageKey };
    }
    throw error;
  }
}

export async function verifyDemoOtp(challengeId: string, otp: string) {
  return repositories.identity.verifyOtp(challengeId, otp);
}
