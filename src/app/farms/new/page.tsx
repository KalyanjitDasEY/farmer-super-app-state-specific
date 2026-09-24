import type { Metadata } from "next";

import { PageHeader } from "@/features/authenticated/components/app-components";
import { FarmForm } from "@/features/farms/components/farm-form";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Add Farm", "फार्म जोड़ें") };
}

export default async function AddFarmPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <>
      <PageHeader
        title={t("Add Farm / Field", "फार्म / खेत जोड़ें")}
        subtitle={t(
          "Tell us about your land for personalized services",
          "व्यक्तिगत सेवाओं के लिए हमें अपनी भूमि के बारे में बताएं",
        )}
        backHref="/farms"
      />
      <FarmForm />
    </>
  );
}
