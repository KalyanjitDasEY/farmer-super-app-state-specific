import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Download, Leaf, Share2, ShieldCheck } from "lucide-react";

import {
  CropContext,
  LeafPageHeader,
  TrendChart,
} from "@/features/leaf-colour-check/components/leaf-colour-components";
import { HistoryList } from "@/features/leaf-colour-check/components/leaf-colour-interactions";
import styles from "@/features/leaf-colour-check/components/leaf-colour.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("DLCC History", "DLCC इतिहास") };
}

export default async function LeafColourHistoryPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <LeafPageHeader
        backHref="/leaf-colour-check"
        title={t("DLCC History", "DLCC इतिहास")}
        subtitle={t(
          "Review your past leaf colour observations",
          "पिछले पत्ती रंग अवलोकन देखें",
        )}
      />
      <CropContext
        finalLabel={t("Total Readings", "कुल रीडिंग")}
        finalValue="12"
        finalDetail={t("All Time", "सभी समय")}
      />

      <HistoryList />

      <section className={styles.historyTrend}>
        <div>
          <h2>{t("Your DLCC Trend", "आपका DLCC रुझान")}</h2>
          <TrendChart extended />
        </div>
        <div>
          <h2>{t("Trend Insights", "रुझान जानकारी")}</h2>
          <p>
            {t(
              "Overall nitrogen status is stable.",
              "कुल नाइट्रोजन स्थिति स्थिर है।",
            )}
            <br />
            {t("Continue monitoring weekly.", "साप्ताहिक निगरानी जारी रखें।")}
          </p>
          <Link href="/leaf-colour-check/result">
            {t("View Trend Details →", "रुझान विवरण देखें →")}
          </Link>
        </div>
      </section>

      <section className={styles.educationStrip}>
        <div>
          <Leaf size={31} />
          <span>
            <strong>{t("About DLCC", "DLCC के बारे में")}</strong>
            {t(
              "DLCC is an ICAR-standard method for leaf colour based nitrogen management.",
              "DLCC पत्ती रंग आधारित नाइट्रोजन प्रबंधन की ICAR-मानक विधि है।",
            )}
          </span>
        </div>
        <div>
          <ShieldCheck size={31} />
          <span>
            <strong>{t("Source & Validation", "स्रोत और सत्यापन")}</strong>
            {t(
              "Based on ICAR Leaf Colour Chart (LCC) for N management in rice.",
              "धान में नाइट्रोजन प्रबंधन के ICAR पत्ती रंग चार्ट (LCC) पर आधारित।",
            )}
          </span>
        </div>
      </section>

      <div className={styles.pageActions}>
        <button type="button">
          <Download size={19} /> {t("Export History", "इतिहास निर्यात करें")}
        </button>
        <button type="button">
          <Share2 size={19} /> {t("Share History", "इतिहास साझा करें")}
        </button>
        <Link
          className={styles.primaryButton}
          href="/leaf-colour-check/reading"
        >
          <Camera size={19} /> {t("New DLCC Assessment", "नया DLCC आकलन")}
        </Link>
      </div>
    </div>
  );
}
