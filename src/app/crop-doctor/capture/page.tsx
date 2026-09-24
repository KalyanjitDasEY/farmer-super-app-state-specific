import type { Metadata } from "next";
import { Camera, Focus, ImagePlus, ScanLine } from "lucide-react";
import type { CSSProperties } from "react";

import { withBasePath } from "@/config/base-path";
import {
  CropContext,
  PageHeader,
  StepProgress,
} from "@/features/authenticated/components/app-components";
import { CaptureActions } from "@/features/authenticated/components/capture-actions";
import styles from "@/features/authenticated/components/app-pages.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Capture Crop Image", "फसल की तस्वीर लें") };
}

export default async function CapturePage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <>
      <PageHeader
        title={t("Crop & Image Capture", "फसल और तस्वीर कैप्चर")}
        subtitle={t(
          "Capture the affected part clearly",
          "प्रभावित हिस्से को साफ कैप्चर करें",
        )}
        backHref="/crop-doctor"
      />
      <CropContext />
      <StepProgress current={1} />
      <div className={styles.reviewGrid}>
        <div
          className={styles.captureFrame}
          style={
            {
              "--capture-image": `url("${withBasePath(
                "/images/authenticated/diagnosis-leaf.jpg",
              )}")`,
            } as CSSProperties
          }
        >
          <span>
            {t(
              "Place the affected leaf inside the frame",
              "प्रभावित पत्ती को फ्रेम के अंदर रखें",
            )}
          </span>
        </div>
        <section className={styles.card}>
          <h2>{t("Take a useful crop photo", "उपयोगी फसल फोटो लें")}</h2>
          <ul className={styles.checkList}>
            <li>
              <Camera size={21} />{" "}
              {t(
                "Use natural daylight and avoid flash.",
                "प्राकृतिक दिन की रोशनी का उपयोग करें और फ्लैश से बचें।",
              )}
            </li>
            <li>
              <Focus size={21} />{" "}
              {t(
                "Hold steady and tap the affected area to focus.",
                "स्थिर रहें और फोकस के लिए प्रभावित हिस्से पर टैप करें।",
              )}
            </li>
            <li>
              <ScanLine size={21} />{" "}
              {t(
                "Fill the frame with one clear leaf or affected part.",
                "फ्रेम में एक साफ पत्ती या प्रभावित हिस्सा भरें।",
              )}
            </li>
            <li>
              <ImagePlus size={21} />{" "}
              {t(
                "Capture multiple angles if symptoms differ.",
                "लक्षण अलग हों तो कई कोणों से फोटो लें।",
              )}
            </li>
          </ul>
          <CaptureActions />
        </section>
      </div>
    </>
  );
}
