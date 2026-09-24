import type { Metadata } from "next";
import {
  AlertTriangle,
  BadgeCheck,
  CalendarDays,
  Leaf,
  ShieldCheck,
} from "lucide-react";

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
  return { title: t("Diagnosis Detail", "निदान विवरण") };
}

export default async function DiagnosisPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <>
      <PageHeader
        title={t("Diagnosis Detail", "निदान विवरण")}
        subtitle={t(
          "Confirmed crop health result",
          "पुष्ट फसल स्वास्थ्य परिणाम",
        )}
        backHref="/crop-doctor/confirm"
      />
      <CropContext captured />
      <StepProgress current={5} />
      <div className={styles.diagnosisGrid}>
        <LeafImage eager />
        <section className={styles.stack}>
          <div className={styles.resultBanner}>
            <span className={styles.resultIcon}>
              <BadgeCheck size={28} />
            </span>
            <div>
              <p className={styles.eyebrow}>
                {t("Diagnosis confirmed", "निदान की पुष्टि हुई")}
              </p>
              <h2>{t("Brown Spot", "भूरा धब्बा")}</h2>
              <p>
                {t(
                  "Bipolaris oryzae · Fungal disease",
                  "Bipolaris oryzae · फफूंद रोग",
                )}
              </p>
            </div>
            <div className={styles.confidence}>
              <strong>78%</strong>
              <small>{t("Confidence", "विश्वसनीयता")}</small>
            </div>
          </div>
          <div className={styles.diagnosisFacts}>
            <div className={styles.fact}>
              <small>{t("Risk Level", "जोखिम स्तर")}</small>
              <strong>
                {t(
                  "Moderate — act within 2 days",
                  "मध्यम — 2 दिनों के भीतर कार्रवाई करें",
                )}
              </strong>
            </div>
            <div className={styles.fact}>
              <small>{t("Affected Crop", "प्रभावित फसल")}</small>
              <strong>
                {t("Paddy · Tillering stage", "धान · कल्ले निकलने की अवस्था")}
              </strong>
            </div>
            <div className={styles.fact}>
              <small>{t("Common Cause", "सामान्य कारण")}</small>
              <strong>
                {t(
                  "High humidity and nutrient stress",
                  "अधिक नमी और पोषक तत्व तनाव",
                )}
              </strong>
            </div>
            <div className={styles.fact}>
              <small>{t("Spread", "फैलाव")}</small>
              <strong>
                {t(
                  "Airborne spores and infected seed",
                  "हवा से फैलने वाले बीजाणु और संक्रमित बीज",
                )}
              </strong>
            </div>
          </div>
          <div className={styles.card}>
            <h2>
              <AlertTriangle size={20} />{" "}
              {t("What this means", "इसका क्या अर्थ है")}
            </h2>
            <p>
              {t(
                "Brown Spot can reduce leaf area and grain quality. Early action, balanced nutrition and field monitoring can limit its spread.",
                "भूरा धब्बा पत्ती क्षेत्र और दाने की गुणवत्ता घटा सकता है। समय पर कार्रवाई, संतुलित पोषण और खेत की निगरानी इसका फैलाव सीमित कर सकती है।",
              )}
            </p>
          </div>
        </section>
      </div>
      <div className={styles.actionBar}>
        <PrimaryLink href="/crop-doctor/history" secondary>
          <CalendarDays size={18} /> {t("Save to History", "इतिहास में सहेजें")}
        </PrimaryLink>
        <PrimaryLink href="/crop-doctor/advisory">
          <Leaf size={18} />{" "}
          {t("View Treatment & Advisory", "उपचार और सलाह देखें")}
        </PrimaryLink>
      </div>
      <p className={styles.emptyHint}>
        <ShieldCheck size={16} />{" "}
        {t(
          "Verify label instructions and local recommendations before applying any crop protection product.",
          "कोई भी फसल सुरक्षा उत्पाद लगाने से पहले लेबल निर्देश और स्थानीय सिफारिशें जांचें।",
        )}
      </p>
    </>
  );
}
