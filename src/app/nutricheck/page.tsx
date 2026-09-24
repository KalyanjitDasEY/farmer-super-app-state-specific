import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  ArrowRight,
  BotMessageSquare,
  ChevronRight,
  CirclePlay,
  Lightbulb,
  Sprout,
  Wheat,
} from "lucide-react";

import {
  NutriCheckHeader,
  NutriContext,
  NutrientBadge,
  SectionTitle,
} from "@/features/nutricheck/components/nutricheck-components";
import styles from "@/features/nutricheck/components/nutricheck.module.css";
import {
  deficiencies,
  nutriText,
  nutrients,
} from "@/features/nutricheck/data/nutricheck-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("NutriCheck", "न्यूट्रीचेक") };
}

const crops = [
  "Paddy (Dhan)",
  "Wheat",
  "Maize",
  "Cotton",
  "Sugarcane",
  "Mustard",
] as const;

export default async function NutriCheckPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <NutriCheckHeader
        subtitle={t(
          "Diagnose nutrient deficiencies. Improve crop health and yield.",
          "पोषक तत्वों की कमी पहचानें। फसल स्वास्थ्य और उपज सुधारें।",
        )}
      />
      <NutriContext />

      <section className={styles.nutritionHero}>
        <div className={styles.heroCopy}>
          <h2>
            {t(
              "Identify nutrient deficiencies early.",
              "पोषक तत्वों की कमी जल्दी पहचानें।",
            )}
          </h2>
          <p>
            {t(
              "Get crop-specific management advice to correct deficiencies and improve yield.",
              "कमी सुधारने और उपज बढ़ाने के लिए फसल-विशिष्ट प्रबंधन सलाह पाएं।",
            )}
          </p>
          <Link href="/nutricheck/library">
            {t("How NutriCheck Works", "न्यूट्रीचेक कैसे काम करता है")}{" "}
            <CirclePlay size={19} />
          </Link>
        </div>
        <div className={styles.heroVisual}>
          <Image
            src="/images/authenticated/nutricheck/hero-leaf.jpg"
            alt={t(
              "Paddy leaf with nutrient markers",
              "पोषक संकेतों वाली धान की पत्ती",
            )}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 60vw"
          />
        </div>
      </section>

      <section className={styles.panel}>
        <SectionTitle href="/nutricheck/library">
          {t("Browse by Crop", "फसल से देखें")}
        </SectionTitle>
        <div className={styles.cropScroller}>
          {crops.map((crop, index) => (
            <div className={styles.cropCard} key={crop}>
              <span>
                {index < 4 ? <Wheat size={38} /> : <Sprout size={38} />}
              </span>
              {t(
                crop,
                ["धान", "गेहूं", "मक्का", "कपास", "गन्ना", "सरसों"][index] ??
                  crop,
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.panel}>
        <SectionTitle href="/nutricheck/library">
          {t("Browse by Nutrient", "पोषक तत्व से देखें")}
        </SectionTitle>
        <div className={styles.nutrientScroller}>
          {nutrients.map((nutrient) => (
            <div className={styles.nutrientCard} key={nutrient.name}>
              <NutrientBadge symbol={nutrient.symbol} tone={nutrient.tone} />
              <span>
                <strong>{t(nutriText(nutrient.name))}</strong>
                <small>
                  {t("Problems", "समस्याएं")} ({nutrient.problems})
                </small>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.panel}>
        <SectionTitle href="/nutricheck/library">
          {t(
            "Common Nutrient Deficiency Problems",
            "सामान्य पोषक तत्व कमी समस्याएं",
          )}
        </SectionTitle>
        <div className={styles.deficiencyGrid}>
          {deficiencies.slice(0, 4).map((deficiency) => (
            <Link
              className={styles.deficiencyTile}
              href="/nutricheck/library/nitrogen"
              key={deficiency.title}
            >
              <div className={styles.deficiencyTileImage}>
                <NutrientBadge
                  symbol={deficiency.symbol}
                  tone={deficiency.tone}
                  small
                />
                <Image src={deficiency.image} alt="" fill sizes="220px" />
              </div>
              <div>
                <h3>{t(nutriText(deficiency.title))}</h3>
                <p>{t(nutriText(deficiency.description))}</p>
                <span className={styles.deficiencyFooter}>
                  {t("Affects Yield", "उपज प्रभावित करता है")}{" "}
                  <strong>{t(nutriText(deficiency.severity))}</strong>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <aside className={styles.tipBar}>
        <Lightbulb size={25} />
        <span>
          <strong>{t("Tip:", "सुझाव:")}</strong>{" "}
          {t(
            "Regular monitoring and timely correction can significantly improve crop health and yield.",
            "नियमित निगरानी और समय पर सुधार फसल स्वास्थ्य और उपज में काफी सुधार कर सकते हैं।",
          )}
        </span>
        <Link href="/more#help">
          <BotMessageSquare size={18} /> {t("Ask Bharati", "भारती से पूछें")}
        </Link>
      </aside>

      <section className={styles.panel}>
        <SectionTitle href="/nutricheck/saved">
          {t("Recent NutriCheck Assessments", "हाल के न्यूट्रीचेक आकलन")}
        </SectionTitle>
        <div className={styles.recentAssessment}>
          <div className={styles.recentImage}>
            <Image
              src="/images/authenticated/nutricheck/nitrogen.jpg"
              alt=""
              fill
              sizes="100px"
            />
          </div>
          <div>
            <h3>
              {t(
                "Paddy (Dhan) · Field 1 · Tillering Stage",
                "धान · खेत 1 · कल्ले निकलने की अवस्था",
              )}
            </h3>
            <p>20 May 2024 · 09:15 AM</p>
            <p>
              {t("Deficiencies:", "कमियां:")}{" "}
              <strong>{t("N (Low), Zn (Medium)", "N (कम), Zn (मध्यम)")}</strong>
            </p>
          </div>
          <div>
            <strong>{t("Action Taken", "की गई कार्रवाई")}</strong>
            {t("Urea 25 kg/acre", "यूरिया 25 किग्रा/एकड़")}
            <br />
            Zinc Sulphate 8 kg/acre
          </div>
          <Link
            href="/nutricheck/recommendation"
            aria-label={t("View recent assessment", "हाल का आकलन देखें")}
          >
            <ChevronRight size={22} />
          </Link>
        </div>
      </section>

      <div className={styles.bottomActions}>
        <Link href="/nutricheck/library">
          {t("Browse Library", "लाइब्रेरी देखें")}
        </Link>
        <Link href="/nutricheck/saved">
          {t("My Saved", "मेरी सहेजी सामग्री")}
        </Link>
        <Link href="/nutricheck/recommendation">
          {t("Start NutriCheck", "न्यूट्रीचेक शुरू करें")}{" "}
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
