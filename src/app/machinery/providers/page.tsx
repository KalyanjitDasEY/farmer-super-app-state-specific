import type { Metadata } from "next";

import {
  MachineSummary,
  MachineryPageHeader,
  TrustStrip,
} from "@/features/machinery/components/machinery-components";
import { ProviderResults } from "@/features/machinery/components/machinery-interactions";
import styles from "@/features/machinery/components/machinery.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t("Nearby Machinery Providers", "आस-पास के मशीनरी प्रदाता"),
  };
}

export default async function MachineryProvidersPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <div className={styles.stack}>
      <MachineryPageHeader
        backHref="/machinery/requirements"
        title={t("Nearby Provider Results", "आस-पास के प्रदाता परिणाम")}
        subtitle={t(
          "Compare and choose the best provider for your requirement",
          "तुलना करें और अपनी आवश्यकता के लिए सर्वोत्तम प्रदाता चुनें",
        )}
      />
      <MachineSummary />
      <ProviderResults />
      <TrustStrip />
    </div>
  );
}
