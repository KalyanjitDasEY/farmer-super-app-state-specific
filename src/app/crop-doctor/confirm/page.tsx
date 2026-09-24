import type { Metadata } from "next";
import { BadgeCheck, CircleAlert, ShieldCheck } from "lucide-react";

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
  return { title: t("Confirm Diagnosis", "निदान की पुष्टि करें") };
}

export default async function ConfirmPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <>
      <PageHeader
        title={t("Confirm a Diagnosis", "निदान की पुष्टि करें")}
        subtitle={t(
          "Review the likely match before continuing",
          "आगे बढ़ने से पहले संभावित मिलान देखें",
        )}
        backHref="/crop-doctor/quality"
      />
      <CropContext captured />
      <StepProgress current={4} />
      <div className={styles.diagnosisGrid}>
        <LeafImage eager />
        <section className={styles.stack}>
          <div className={styles.resultBanner}>
            <span className={styles.resultIcon}>
              <BadgeCheck size={28} />
            </span>
            <div>
              <p className={styles.eyebrow}>
                {t("Likely diagnosis", "संभावित निदान")}
              </p>
              <h2>{t("Brown Spot", "भूरा धब्बा")}</h2>
              <p>{t("Fungal disease · Paddy", "फफूंद रोग · धान")}</p>
            </div>
            <div className={styles.confidence}>
              <strong>78%</strong>
              <small>{t("Confidence · Moderate", "विश्वसनीयता · मध्यम")}</small>
            </div>
          </div>
          <div className={styles.card}>
            <h2>
              {t("Do these symptoms match?", "क्या ये लक्षण मेल खाते हैं?")}
            </h2>
            <ul className={styles.checkList}>
              <li>
                <CircleAlert size={20} />{" "}
                {t(
                  "Oval brown spots with a grey or pale center",
                  "धूसर या फीके केंद्र वाले अंडाकार भूरे धब्बे",
                )}
              </li>
              <li>
                <CircleAlert size={20} />{" "}
                {t(
                  "Spots appearing on older leaves first",
                  "धब्बे पहले पुरानी पत्तियों पर दिखते हैं",
                )}
              </li>
              <li>
                <CircleAlert size={20} />{" "}
                {t(
                  "Yellowing around affected areas",
                  "प्रभावित हिस्सों के आसपास पीलापन",
                )}
              </li>
            </ul>
            <p>
              <ShieldCheck size={17} />{" "}
              {t(
                "Confirm only if the symptoms match what you see in the field.",
                "केवल तभी पुष्टि करें जब लक्षण खेत में दिखाई देने वाले लक्षणों से मेल खाते हों।",
              )}
            </p>
          </div>
        </section>
      </div>
      <div className={styles.actionBar}>
        <PrimaryLink href="/crop-doctor/low-confidence" secondary>
          {t("No, Get More Help", "नहीं, और सहायता लें")}
        </PrimaryLink>
        <PrimaryLink href="/crop-doctor/diagnosis">
          {t("Yes, Confirm Diagnosis", "हां, निदान की पुष्टि करें")}
        </PrimaryLink>
      </div>
    </>
  );
}
