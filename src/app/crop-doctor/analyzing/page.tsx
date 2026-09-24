import type { Metadata } from "next";
import { ScanSearch } from "lucide-react";

import {
  CropContext,
  PageHeader,
  PrimaryLink,
  StepProgress,
} from "@/features/authenticated/components/app-components";
import styles from "@/features/authenticated/components/app-pages.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Analyzing Crop Image", "फसल की तस्वीर का विश्लेषण") };
}

export default async function AnalyzingPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <>
      <PageHeader
        title={t("Detecting Disease", "रोग की पहचान")}
        subtitle={t(
          "Analyzing visible crop symptoms",
          "दिखाई देने वाले फसल लक्षणों का विश्लेषण",
        )}
        backHref="/crop-doctor/quality"
      />
      <CropContext />
      <StepProgress current={3} />
      <section className={styles.analysisCard}>
        <div>
          <span className={styles.scanner}>
            <ScanSearch size={55} />
          </span>
          <h2>
            {t(
              "Analyzing your crop image...",
              "आपकी फसल की तस्वीर का विश्लेषण हो रहा है...",
            )}
          </h2>
          <p>
            {t(
              "Our system is comparing the visible symptoms with verified agricultural knowledge and similar crop conditions.",
              "हमारा सिस्टम दिखाई देने वाले लक्षणों की सत्यापित कृषि जानकारी और समान फसल स्थितियों से तुलना कर रहा है।",
            )}
          </p>
        </div>
        <div
          className={styles.progressBar}
          aria-label={t("Analysis progress", "विश्लेषण प्रगति")}
        >
          <span />
        </div>
        <div>
          <p>
            {t(
              "This usually takes only a few seconds.",
              "इसमें आमतौर पर केवल कुछ सेकंड लगते हैं।",
            )}
          </p>
          <PrimaryLink href="/crop-doctor/confirm">
            {t("View Analysis Result", "विश्लेषण परिणाम देखें")}
          </PrimaryLink>
        </div>
      </section>
    </>
  );
}
