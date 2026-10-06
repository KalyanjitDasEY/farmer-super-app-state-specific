import type { Metadata } from "next";

import { AccidentVictimForm } from "@/features/mksy/components/mksy-forms";
import { ClaimLayout } from "@/features/mksy/components/mksy-components";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t(
      "Bihar Demo Claim - Accident and Victim",
      "बिहार डेमो दावा - दुर्घटना और पीड़ित",
    ),
  };
}

export default async function MksyClaimPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <ClaimLayout
      current={1}
      title={t("Accident and Victim Details", "दुर्घटना और पीड़ित का विवरण")}
      description={t(
        "Enter core accident information and claimant details.",
        "दुर्घटना की मुख्य जानकारी और दावेदार का विवरण दर्ज करें।",
      )}
      notice={t(
        "Use sample accident and farmer details. Fields marked with * are part of this demo.",
        "नमूना दुर्घटना और किसान विवरण दर्ज करें। * चिह्नित फ़ील्ड इस डेमो का भाग हैं।",
      )}
    >
      <AccidentVictimForm />
    </ClaimLayout>
  );
}
