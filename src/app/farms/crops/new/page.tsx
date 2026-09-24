import type { Metadata } from "next";

import { PageHeader } from "@/features/authenticated/components/app-components";
import { FarmForm } from "@/features/farms/components/farm-form";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Crop Setup", "फसल सेटअप") };
}

export default async function CropSetupPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <>
      <PageHeader
        title={t("Crop Instance Setup", "फसल विवरण सेटअप")}
        subtitle={t(
          "Add the crop currently growing in your field",
          "अपने खेत में अभी उग रही फसल जोड़ें",
        )}
        backHref="/farms"
      />
      <FarmForm crop />
    </>
  );
}
