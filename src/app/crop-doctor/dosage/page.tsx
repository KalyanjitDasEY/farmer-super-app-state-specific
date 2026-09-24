import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import {
  CropContext,
  PageHeader,
} from "@/features/authenticated/components/app-components";
import { DosageCalculator } from "@/features/authenticated/components/doctor-interactions";
import styles from "@/features/authenticated/components/app-pages.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Dosage Calculator", "खुराक कैलकुलेटर") };
}

export default async function DosagePage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <>
      <PageHeader
        title={t("Product & Dosage Calculator", "उत्पाद और खुराक कैलकुलेटर")}
        subtitle={t(
          "Calculate a field-specific quantity",
          "खेत के अनुसार मात्रा की गणना करें",
        )}
        backHref="/crop-doctor/advisory"
      />
      <CropContext />
      <div className={`${styles.resultBanner} ${styles.warning}`}>
        <span className={styles.resultIcon}>
          <AlertTriangle size={25} />
        </span>
        <div>
          <h2>
            {t(
              "Use crop protection products responsibly",
              "फसल सुरक्षा उत्पादों का जिम्मेदारी से उपयोग करें",
            )}
          </h2>
          <p>
            {t(
              "Confirm the product registration, expiry date, label dose and local expert guidance before use.",
              "उपयोग से पहले उत्पाद पंजीकरण, समाप्ति तिथि, लेबल खुराक और स्थानीय विशेषज्ञ सलाह की पुष्टि करें।",
            )}
          </p>
        </div>
      </div>
      <DosageCalculator />
    </>
  );
}
