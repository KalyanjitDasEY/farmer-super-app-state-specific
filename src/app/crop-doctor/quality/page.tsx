import type { Metadata } from "next";
import { CheckCircle2, Focus, SunMedium, ZoomIn } from "lucide-react";

import {
  CropContext,
  LeafImage,
  PageHeader,
  PrimaryLink,
  StepProgress,
} from "@/features/authenticated/components/app-components";
import styles from "@/features/authenticated/components/app-pages.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Image Quality Check", "तस्वीर गुणवत्ता जांच") };
}

export default async function QualityPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <>
      <PageHeader
        title={t("Image Quality Check", "तस्वीर गुणवत्ता जांच")}
        subtitle={t(
          "Make sure the affected area is clear",
          "सुनिश्चित करें कि प्रभावित हिस्सा साफ है",
        )}
        backHref="/crop-doctor/capture"
      />
      <CropContext />
      <StepProgress current={2} />
      <div className={styles.reviewGrid}>
        <LeafImage eager />
        <section className={styles.card}>
          <div className={styles.resultBanner}>
            <span className={styles.resultIcon}>
              <CheckCircle2 size={27} />
            </span>
            <div>
              <h2>{t("Good quality image", "अच्छी गुणवत्ता की तस्वीर")}</h2>
              <p>
                {t(
                  "The affected area is visible and ready for analysis.",
                  "प्रभावित हिस्सा दिखाई दे रहा है और विश्लेषण के लिए तैयार है।",
                )}
              </p>
            </div>
          </div>
          <ul className={styles.checkList}>
            <li>
              <Focus size={21} />{" "}
              {t("Image is sharp and in focus.", "तस्वीर साफ और फोकस में है।")}
            </li>
            <li>
              <SunMedium size={21} />{" "}
              {t(
                "Lighting is sufficient and even.",
                "रोशनी पर्याप्त और समान है।",
              )}
            </li>
            <li>
              <ZoomIn size={21} />{" "}
              {t(
                "Symptoms are large enough to examine.",
                "लक्षण जांच के लिए पर्याप्त बड़े हैं।",
              )}
            </li>
          </ul>
          <div className={styles.formActions}>
            <PrimaryLink href="/crop-doctor/capture" secondary>
              {t("Retake Photo", "फिर से फोटो लें")}
            </PrimaryLink>
            <PrimaryLink href="/crop-doctor/analyzing">
              {t("Analyze Image", "तस्वीर का विश्लेषण करें")}
            </PrimaryLink>
          </div>
        </section>
      </div>
    </>
  );
}
