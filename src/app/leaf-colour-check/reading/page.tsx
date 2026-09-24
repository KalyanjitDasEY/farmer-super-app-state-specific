import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

import { ReadingCapture } from "@/features/leaf-colour-check/components/leaf-colour-interactions";
import styles from "@/features/leaf-colour-check/components/leaf-colour.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("DLCC Reading", "DLCC रीडिंग") };
}

export default async function LeafColourReadingPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <ReadingCapture />
      <aside className={styles.sourceBar}>
        <ShieldCheck size={19} />
        {t(
          "DLCC readings help estimate leaf nitrogen status and guide fertilizer recommendations.",
          "DLCC रीडिंग पत्ती की नाइट्रोजन स्थिति का अनुमान लगाने और उर्वरक सिफारिशों में मार्गदर्शन करती है।",
        )}
      </aside>
    </div>
  );
}
