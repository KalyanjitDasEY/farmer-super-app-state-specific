import type { Metadata } from "next";

import {
  CropContext,
  PageHeader,
} from "@/features/authenticated/components/app-components";
import { ImpactSurvey } from "@/features/authenticated/components/doctor-interactions";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Field Impact Survey", "खेत प्रभाव सर्वेक्षण") };
}

export default async function SurveyPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <>
      <PageHeader
        title={t("Field Impact Survey", "खेत प्रभाव सर्वेक्षण")}
        subtitle={t(
          "Help us understand how widely symptoms have spread",
          "लक्षण कितने फैले हैं, यह समझने में हमारी मदद करें",
        )}
        backHref="/crop-doctor/dosage"
      />
      <CropContext />
      <ImpactSurvey />
    </>
  );
}
