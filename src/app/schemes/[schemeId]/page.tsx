import { notFound } from "next/navigation";

import { DomainError } from "@/domain/errors";
import { SchemeDetailPage } from "@/features/schemes/SchemeDetailPage";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";
import { repositories } from "@/services/repositories";

export default async function SchemePage({
  params,
}: {
  params: Promise<{ schemeId: string }>;
}) {
  const { schemeId } = await params;
  const locale = await getRequestLocale();

  let scheme;
  let beneficiary;
  try {
    scheme = await repositories.schemes.getById(schemeId);
    beneficiary =
      schemeId === "pm-kisan"
        ? await repositories.beneficiary.getStatus(schemeId)
        : undefined;
  } catch (error) {
    if (error instanceof DomainError && error.code === "NOT_FOUND") notFound();
    throw error;
  }
  return (
    <SchemeDetailPage
      locale={locale}
      dictionary={getDictionary(locale)}
      scheme={scheme}
      {...(beneficiary ? { beneficiary } : {})}
    />
  );
}
