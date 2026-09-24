"use server";

import { DomainError } from "@/domain/errors";
import { repositories } from "@/services/repositories";

export async function resolveDemoLocation(input: {
  districtId: string;
  tehsilId: string;
  villageId: string;
  anchorKhasra: string;
}): Promise<
  { ok: true; resolutionId: string } | { ok: false; messageKey: string }
> {
  try {
    const result = await repositories.locations.resolve(input);
    return { ok: true, ...result };
  } catch (error) {
    if (error instanceof DomainError) {
      return { ok: false, messageKey: error.messageKey };
    }
    throw error;
  }
}
