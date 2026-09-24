import type { Metadata } from "next";

import { LocationNarrativeForm } from "@/features/mksy/components/mksy-forms";
import { ClaimLayout } from "@/features/mksy/components/mksy-components";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t(
      "MKSY Claim - Location and Narrative",
      "MKSY दावा - स्थान और विवरण",
    ),
  };
}

export default async function MksyLocationPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <ClaimLayout
      current={2}
      title={t("Location and Incident Narrative", "स्थान और घटना का विवरण")}
      description={t(
        "Enter incident location details and provide a brief description.",
        "घटना के स्थान का विवरण और संक्षिप्त वर्णन दर्ज करें।",
      )}
      notice={t(
        "Please provide correct location details and a brief description of the incident. All fields marked with * are mandatory.",
        "कृपया स्थान का सही विवरण और घटना का संक्षिप्त वर्णन दें। * से चिह्नित सभी फ़ील्ड अनिवार्य हैं।",
      )}
    >
      <LocationNarrativeForm />
    </ClaimLayout>
  );
}
