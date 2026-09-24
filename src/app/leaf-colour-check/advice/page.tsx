import type { Metadata } from "next";
import Link from "next/link";
import {
  Bookmark,
  CalendarDays,
  Camera,
  Check,
  Droplets,
  Info,
  Leaf,
  Share2,
  ShieldCheck,
  SunMedium,
} from "lucide-react";

import {
  CropContext,
  LeafPageHeader,
  TrendChart,
} from "@/features/leaf-colour-check/components/leaf-colour-components";
import styles from "@/features/leaf-colour-check/components/leaf-colour.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("DLCC Advice", "DLCC सलाह") };
}

export default async function LeafColourAdvicePage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <LeafPageHeader
        backHref="/leaf-colour-check/result"
        title={t("DLCC Advice", "DLCC सलाह")}
        subtitle={t("Approved nutrient action", "अनुमोदित पोषक कार्रवाई")}
      />
      <CropContext
        finalLabel={t("DLCC Result", "DLCC परिणाम")}
        finalValue="2.8"
        finalDetail={t("Green (Optimal)", "हरा (उचित)")}
      />

      <section className={styles.advicePanel}>
        <div className={styles.adviceOverview}>
          <div className={styles.adviceStatus}>
            <span>
              <Check size={23} />
            </span>
            <div>
              <h2>
                {t("Nitrogen Status:", "नाइट्रोजन स्थिति:")}{" "}
                <strong>{t("OPTIMAL", "उचित")}</strong>
              </h2>
              <p>
                {t(
                  "Your crop is in the optimal nitrogen range.",
                  "आपकी फसल उचित नाइट्रोजन सीमा में है।",
                )}
              </p>
              <p>
                {t(
                  "Maintain current nutrient management practices.",
                  "वर्तमान पोषक तत्व प्रबंधन अभ्यास बनाए रखें।",
                )}
              </p>
            </div>
          </div>
          <div className={styles.rangeChart}>
            <small>
              {t("Optimal Range (LCC)", "उचित सीमा (LCC)")}
              <strong>2 – 4</strong>
            </small>
            <div>
              <i />
              <b>2.8</b>
            </div>
            <span>
              <small>
                0<br />
                {t("(Low)", "(कम)")}
              </small>
              <small>2</small>
              <small>4</small>
              <small>
                5<br />
                {t("(High)", "(अधिक)")}
              </small>
            </span>
          </div>
        </div>

        <h2 className={styles.sectionHeading}>
          {t("Recommended Nutrient Action", "अनुशंसित पोषक कार्रवाई")}
        </h2>
        <div className={styles.nutrientAction}>
          <span className={styles.fertilizerBag}>N</span>
          <div>
            <strong>
              {t("No immediate top dress", "अभी टॉप ड्रेस की जरूरत नहीं")}
            </strong>
            <p>
              {t("Do not apply urea right now.", "अभी यूरिया न डालें।")}
              <br />
              {t("Reassess in 7 days.", "7 दिनों में पुनः आकलन करें।")}
            </p>
          </div>
          <div>
            <CalendarDays size={24} />
            <span>
              <small>{t("Reassess After", "पुनः आकलन")}</small>
              <strong>{t("7 Days", "7 दिन")}</strong>
              <p>
                {t("Next assessment on", "अगला आकलन")}
                <br />
                04 Jun 2024
              </p>
            </span>
          </div>
        </div>
        <aside className={styles.notice}>
          <Info size={18} />{" "}
          {t(
            "Over-application of nitrogen can reduce yield and increase lodging & pest risk.",
            "नाइट्रोजन के अधिक उपयोग से उपज घट सकती है और फसल गिरने व कीट का जोखिम बढ़ सकता है।",
          )}
        </aside>

        <h2 className={styles.sectionHeading}>
          {t("Nutrient Management Guidance", "पोषक तत्व प्रबंधन मार्गदर्शन")}
        </h2>
        <div className={styles.guidanceGrid}>
          <div>
            <span className={styles.fertilizerBag}>N</span>
            <p>
              <strong>
                {t("If DLCC falls below 2", "यदि DLCC 2 से नीचे हो")}
              </strong>
              {t(
                "Apply urea 25 kg/acre (46% N) as top dress and reassess in 7 days.",
                "25 किग्रा/एकड़ यूरिया (46% N) टॉप ड्रेस के रूप में दें और 7 दिनों में पुनः आकलन करें।",
              )}
            </p>
          </div>
          <div>
            <span className={styles.fertilizerBag}>N</span>
            <p>
              <strong>
                {t("If DLCC remains 2 – 4", "यदि DLCC 2 – 4 रहे")}
              </strong>
              {t(
                "Maintain current management and reassess periodically.",
                "वर्तमान प्रबंधन बनाए रखें और समय-समय पर पुनः आकलन करें।",
              )}
            </p>
          </div>
          <div>
            <span className={styles.fertilizerBag}>N</span>
            <p>
              <strong>{t("If DLCC above 4", "यदि DLCC 4 से ऊपर हो")}</strong>
              {t(
                "Do not apply nitrogen. Check other nutrients and irrigation.",
                "नाइट्रोजन न दें। अन्य पोषक तत्व और सिंचाई जांचें।",
              )}
            </p>
          </div>
        </div>
        <aside className={styles.guidelineBar}>
          <ShieldCheck size={22} />{" "}
          {t(
            "All recommendations are as per ICAR – Leaf Colour Chart (LCC) Management guidelines.",
            "सभी सिफारिशें ICAR – पत्ती रंग चार्ट (LCC) प्रबंधन दिशानिर्देशों के अनुसार हैं।",
          )}
        </aside>
      </section>

      <section className={styles.panel}>
        <h2>{t("Supporting Practices", "सहायक अभ्यास")}</h2>
        <div className={styles.practiceGrid}>
          <div>
            <Droplets size={31} />
            {t("Maintain adequate irrigation", "पर्याप्त सिंचाई बनाए रखें")}
          </div>
          <div>
            <Leaf size={31} />
            {t(
              "Keep field weed free for better nutrient uptake",
              "बेहतर पोषक अवशोषण के लिए खेत को खरपतवार मुक्त रखें",
            )}
          </div>
          <div>
            <Leaf size={31} />
            {t(
              "Balanced nutrition improves tillering and yield",
              "संतुलित पोषण कल्ले और उपज बढ़ाता है",
            )}
          </div>
          <div>
            <SunMedium size={31} />
            {t(
              "Best time to read DLCC between 9 AM – 11 AM",
              "DLCC पढ़ने का सर्वोत्तम समय सुबह 9 – 11 बजे",
            )}
          </div>
        </div>
      </section>

      <div className={styles.adviceInsights}>
        <section className={styles.panel}>
          <h2>{t("Recent DLCC Trend", "हाल का DLCC रुझान")}</h2>
          <TrendChart />
          <p className={styles.goodTrend}>
            {t(
              "Good trend. Keep monitoring.",
              "अच्छा रुझान। निगरानी जारी रखें।",
            )}
          </p>
        </section>
        <section className={styles.panel}>
          <h2>
            {t("Suggested Products", "सुझाए गए उत्पाद")}{" "}
            <small>
              {t("(If Required Later)", "(यदि बाद में आवश्यकता हो)")}
            </small>
          </h2>
          <div className={styles.productRow}>
            <span className={styles.fertilizerBag}>N</span>
            <p>
              <strong>Urea 46% N</strong>
              {t("Top dress (If DLCC < 2)", "टॉप ड्रेस (यदि DLCC < 2)")}
            </p>
            <Link href="/marketplace/search?q=urea">
              {t("View Details →", "विवरण देखें →")}
            </Link>
          </div>
          <div className={styles.productRow}>
            <span className={styles.fertilizerBag}>N</span>
            <p>
              <strong>{t("Neem Coated Urea", "नीम लेपित यूरिया")}</strong>
              {t("Better N use efficiency", "बेहतर नाइट्रोजन उपयोग दक्षता")}
            </p>
            <Link href="/marketplace/search?q=urea">
              {t("View Details →", "विवरण देखें →")}
            </Link>
          </div>
        </section>
      </div>

      <aside className={styles.sourceBar}>
        <ShieldCheck size={20} />{" "}
        {t(
          "Source & Validation: Based on ICAR guidelines for Leaf Colour Chart (LCC) based N management.",
          "स्रोत और सत्यापन: पत्ती रंग चार्ट (LCC) आधारित नाइट्रोजन प्रबंधन के ICAR दिशानिर्देशों पर आधारित।",
        )}
      </aside>
      <div className={styles.pageActions}>
        <Link href="/leaf-colour-check/history">
          <Bookmark size={18} /> {t("Save Advice", "सलाह सहेजें")}
        </Link>
        <button type="button">
          <Share2 size={18} /> {t("Share Advice", "सलाह साझा करें")}
        </button>
        <Link
          className={styles.primaryButton}
          href="/leaf-colour-check/reading"
        >
          <Camera size={19} /> {t("Reassess Now", "अभी पुनः आकलन करें")}
        </Link>
      </div>
    </div>
  );
}
