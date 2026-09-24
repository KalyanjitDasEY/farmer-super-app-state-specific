import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  Bell,
  Bookmark,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Droplets,
  Lightbulb,
  MessageCircle,
  Share2,
  ShieldCheck,
  SunMedium,
  TriangleAlert,
} from "lucide-react";

import {
  NutriCheckHeader,
  NutriContext,
  NutrientBadge,
} from "@/features/nutricheck/components/nutricheck-components";
import styles from "@/features/nutricheck/components/nutricheck.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Nutrient Recommendation", "पोषक तत्व सिफारिश") };
}

export default async function NutrientRecommendationPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <NutriCheckHeader
        subtitle={t(
          "Personalised Nutrient Recommendation",
          "व्यक्तिगत पोषक तत्व सिफारिश",
        )}
        backHref="/nutricheck"
      />
      <NutriContext />

      <section className={styles.deficiencyHero}>
        <div className={styles.deficiencyIdentity}>
          <NutrientBadge symbol="N" tone="nitrogen" />
          <div>
            <h2>{t("Current Nutrient Status", "वर्तमान पोषक स्थिति")}</h2>
            <p>
              <strong>{t("Nitrogen · Optimal", "नाइट्रोजन · उचित")}</strong>
              <br />
              {t(
                "LCC Value: 2.6 (2–4) · Observation: 20 May 2024",
                "LCC मान: 2.6 (2–4) · अवलोकन: 20 मई 2024",
              )}
            </p>
          </div>
        </div>
        <div className={styles.severityPanel}>
          <p>{t("Interpretation", "व्याख्या")}</p>
          <strong>
            {t(
              "Nitrogen is within the optimal range.",
              "नाइट्रोजन उचित सीमा में है।",
            )}
          </strong>
          <span>
            {t(
              "Maintain current nutrient management practices for better yield.",
              "बेहतर उपज के लिए वर्तमान पोषक प्रबंधन अभ्यास बनाए रखें।",
            )}
          </span>
        </div>
      </section>

      <section className={styles.recommendationPanel}>
        <header className={styles.recommendationHeader}>
          <h2>{t("Recommended Nutrient Action", "अनुशंसित पोषक कार्रवाई")}</h2>
          <span>
            <ShieldCheck size={17} />{" "}
            {t("Approved Recommendation", "अनुमोदित सिफारिश")}
          </span>
        </header>
        <div className={styles.recommendationOverview}>
          <div className={styles.bagImage}>
            <Image
              src="/images/authenticated/nutricheck/nitrogen-bag.jpg"
              alt={t(
                "Urea nitrogen fertilizer bag",
                "यूरिया नाइट्रोजन उर्वरक बैग",
              )}
              fill
              sizes="130px"
            />
          </div>
          <div>
            <h2>
              {t("Maintain Nitrogen Nutrition", "नाइट्रोजन पोषण बनाए रखें")}
            </h2>
            <p>
              {t(
                "Apply balanced nitrogen as Top Dress",
                "संतुलित नाइट्रोजन टॉप ड्रेस के रूप में दें",
              )}
            </p>
            <div className={styles.doseFacts}>
              <div>
                <small>{t("Nutrient", "पोषक तत्व")}</small>
                <strong>Urea (46% N)</strong>
              </div>
              <div>
                <small>{t("Dose", "खुराक")}</small>
                <strong>25 kg/acre</strong>
              </div>
              <div>
                <small>{t("Total Quantity", "कुल मात्रा")}</small>
                <strong>62.5 kg</strong>
              </div>
            </div>
          </div>
          <aside className={styles.balanceAdvice}>
            <h3>{t("Nutrient Balance Advice", "पोषक संतुलन सलाह")}</h3>
            <div className={styles.badgeRow}>
              <NutrientBadge symbol="N" tone="nitrogen" small />
              <NutrientBadge symbol="P" tone="phosphorus" small />
              <NutrientBadge symbol="K" tone="potassium" small />
            </div>
            <p>
              {t(
                "Maintain balanced NPK and use organic manures to improve soil health and yield.",
                "संतुलित NPK बनाए रखें और मिट्टी स्वास्थ्य व उपज सुधारने के लिए जैविक खाद उपयोग करें।",
              )}
            </p>
          </aside>
        </div>

        <section className={styles.recommendationSection}>
          <h2>{t("1. Application Details", "1. प्रयोग विवरण")}</h2>
          <div className={styles.applicationGrid}>
            <div>
              <CalendarDays size={20} />
              <small>{t("When to Apply", "कब लगाएं")}</small>
              <strong>{t("Within 7 Days", "7 दिनों के भीतर")}</strong>
            </div>
            <div>
              <Share2 size={20} />
              <small>{t("Method", "विधि")}</small>
              <strong>{t("Broadcasting or Drip", "छिड़काव या ड्रिप")}</strong>
            </div>
            <div>
              <SunMedium size={20} />
              <small>{t("Time of Day", "दिन का समय")}</small>
              <strong>
                {t("Morning, before 10 AM", "सुबह 10 बजे से पहले")}
              </strong>
            </div>
            <div>
              <Droplets size={20} />
              <small>{t("Irrigation", "सिंचाई")}</small>
              <strong>
                {t("Irrigate lightly after", "बाद में हल्की सिंचाई करें")}
              </strong>
            </div>
          </div>
        </section>

        <section className={styles.recommendationSection}>
          <div className={styles.reasonGrid}>
            <div>
              <h2>
                {t("2. Why this Recommendation?", "2. यह सिफारिश क्यों?")}
              </h2>
              <ul className={styles.iconList}>
                <li>
                  <CheckCircle2 size={18} />
                  {t(
                    "LCC value 2.6 is within the optimal range.",
                    "LCC मान 2.6 उचित सीमा में है।",
                  )}
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  {t(
                    "Crop is in tillering stage where nitrogen demand is moderate.",
                    "फसल कल्ले निकलने की अवस्था में है जहां नाइट्रोजन मांग मध्यम है।",
                  )}
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  {t(
                    "Previous management indicates no nitrogen stress.",
                    "पिछला प्रबंधन नाइट्रोजन तनाव नहीं दर्शाता।",
                  )}
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  {t(
                    "This dose supports tillering and panicle initiation.",
                    "यह खुराक कल्ले और बालियां बनने में सहायक है।",
                  )}
                </li>
              </ul>
            </div>
            <div className={styles.reasonImage}>
              <Image
                src="/images/authenticated/nutricheck/healthy-leaf-check.jpg"
                alt={t(
                  "Healthy paddy leaves being checked",
                  "स्वस्थ धान की पत्तियों की जांच",
                )}
                fill
                sizes="360px"
              />
            </div>
          </div>
        </section>

        <section className={styles.recommendationSection}>
          <div className={styles.informationGrid}>
            <div>
              <h2>{t("3. Precautions", "3. सावधानियां")}</h2>
              <ul className={styles.iconList}>
                <li>
                  <TriangleAlert size={17} />
                  {t("Do not over-apply nitrogen.", "नाइट्रोजन अधिक न दें।")}
                </li>
                <li>
                  <TriangleAlert size={17} />
                  {t(
                    "Avoid application before heavy rain.",
                    "तेज बारिश से पहले प्रयोग न करें।",
                  )}
                </li>
                <li>
                  <TriangleAlert size={17} />
                  {t(
                    "Use split doses for absorption.",
                    "अवशोषण के लिए विभाजित खुराक दें।",
                  )}
                </li>
              </ul>
            </div>
            <div>
              <h2>{t("4. Expected Benefit", "4. अपेक्षित लाभ")}</h2>
              <ul className={styles.iconList}>
                <li>
                  <CheckCircle2 size={17} />
                  {t(
                    "Improved tillering and panicle size",
                    "बेहतर कल्ले और बाली आकार",
                  )}
                </li>
                <li>
                  <CheckCircle2 size={17} />
                  {t(
                    "Better grain filling and higher yield",
                    "बेहतर दाना भराव और अधिक उपज",
                  )}
                </li>
                <li>
                  <CheckCircle2 size={17} />
                  {t(
                    "Improved leaf colour and vigor",
                    "बेहतर पत्ती रंग और पौधे की ताकत",
                  )}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.recommendationSection}>
          <div className={styles.informationGrid}>
            <div>
              <h2>{t("5. Reassess", "5. पुनः आकलन")}</h2>
              <p>
                <Clock3 size={17} /> {t("Reassess after", "पुनः आकलन")}{" "}
                <strong>{t("7 Days", "7 दिन")}</strong>
                <br />
                {t("Next assessment: 27 May 2024", "अगला आकलन: 27 मई 2024")}
              </p>
            </div>
            <div>
              <h2>{t("6. Source & Validation", "6. स्रोत और सत्यापन")}</h2>
              <p>
                <ShieldCheck size={17} />{" "}
                {t(
                  "Based on ICAR Nutrient Management for Rice and the Leaf Colour Chart method.",
                  "धान के लिए ICAR पोषक प्रबंधन और पत्ती रंग चार्ट विधि पर आधारित।",
                )}
              </p>
            </div>
          </div>
        </section>
      </section>

      <aside className={styles.tipBar}>
        <Lightbulb size={22} />
        {t(
          "Regular monitoring and timely nutrient management significantly improves yield.",
          "नियमित निगरानी और समय पर पोषक प्रबंधन उपज में काफी सुधार करता है।",
        )}
        <Link href="/more#help">
          <MessageCircle size={18} /> {t("Ask Bharati", "भारती से पूछें")}
        </Link>
      </aside>
      <div className={styles.bottomActions}>
        <Link href="/nutricheck/saved">
          <Bookmark size={18} /> {t("Save Recommendation", "सिफारिश सहेजें")}
        </Link>
        <Link href="/nutricheck/saved">
          <Share2 size={18} /> {t("Share Advice", "सलाह साझा करें")}
        </Link>
        <Link href="/nutricheck">
          <Bell size={18} /> {t("Set Reminder", "रिमाइंडर सेट करें")}
        </Link>
      </div>
    </div>
  );
}
