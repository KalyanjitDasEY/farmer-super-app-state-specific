import type { Metadata } from "next";
import Link from "next/link";
import {
  Bookmark,
  Check,
  CheckCircle2,
  Leaf,
  Share2,
  SunMedium,
} from "lucide-react";

import {
  CropContext,
  IndividualReadings,
  LeafPageHeader,
  ReadingSummary,
  TrendChart,
} from "@/features/leaf-colour-check/components/leaf-colour-components";
import styles from "@/features/leaf-colour-check/components/leaf-colour.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("DLCC Result", "DLCC परिणाम") };
}

export default async function LeafColourResultPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <LeafPageHeader
        backHref="/leaf-colour-check"
        title={t("DLCC Result", "DLCC परिणाम")}
        subtitle={t(
          "Digital Leaf Colour Chart Analysis",
          "डिजिटल पत्ती रंग चार्ट विश्लेषण",
        )}
      />
      <CropContext
        finalLabel={t("Date & Time", "दिनांक और समय")}
        finalValue={t("28 May 2024", "28 मई 2024")}
        finalDetail={t("10:31 AM", "10:31 पूर्वाह्न")}
      />

      <section className={styles.resultHero}>
        <div className={styles.resultStatus}>
          <small>
            {t("Estimated Nitrogen Status", "अनुमानित नाइट्रोजन स्थिति")}
          </small>
          <strong>
            {t("Optimal", "उचित")} <CheckCircle2 size={27} />
          </strong>
          <p>
            {t(
              "The nitrogen level in your crop is within the optimal range.",
              "आपकी फसल में नाइट्रोजन का स्तर उचित सीमा में है।",
            )}
          </p>
        </div>
        <div className={styles.gaugePanel}>
          <small>
            {t("Optimal Range", "उचित सीमा")}
            <br />
            <strong>2 – 4</strong>
          </small>
          <div className={styles.gauge}>
            <span>2.8</span>
          </div>
          <strong>{t("Green (Optimal)", "हरा (उचित)")}</strong>
        </div>
        <div className={styles.resultRecommendation}>
          <h2>{t("Recommendation", "सिफारिश")}</h2>
          <Leaf size={28} />
          <p>
            {t(
              "Maintain the current nutrient management practices.",
              "वर्तमान पोषक तत्व प्रबंधन अभ्यास बनाए रखें।",
            )}
          </p>
          <Link href="/leaf-colour-check/advice">
            {t("View Advisory", "सलाह देखें")} <span>→</span>
          </Link>
        </div>
      </section>

      <ReadingSummary />
      <IndividualReadings />

      <div className={styles.resultDetails}>
        <section className={styles.panel}>
          <h2>{t("Trend", "रुझान")}</h2>
          <TrendChart />
        </section>
        <section className={styles.panel}>
          <h2>{t("Guidance", "मार्गदर्शन")}</h2>
          <ul className={styles.checkList}>
            <li>
              <Check size={16} />{" "}
              {t(
                "Nitrogen level is optimal. Continue current fertilizer management.",
                "नाइट्रोजन स्तर उचित है। वर्तमान उर्वरक प्रबंधन जारी रखें।",
              )}
            </li>
            <li>
              <Check size={16} />{" "}
              {t(
                "Monitor crop regularly once a week.",
                "सप्ताह में एक बार नियमित रूप से फसल की निगरानी करें।",
              )}
            </li>
            <li>
              <Check size={16} />{" "}
              {t(
                "Maintain proper irrigation and weed management.",
                "उचित सिंचाई और खरपतवार प्रबंधन बनाए रखें।",
              )}
            </li>
            <li>
              <Check size={16} />{" "}
              {t(
                "Re-test if new symptoms appear or after heavy rain.",
                "नए लक्षण दिखने या तेज बारिश के बाद फिर जांच करें।",
              )}
            </li>
          </ul>
        </section>
      </div>

      <section className={styles.educationStrip}>
        <div>
          <SunMedium size={31} />
          <span>
            <strong>{t("Best Time to Read", "रीडिंग का सर्वोत्तम समय")}</strong>
            {t(
              "Between 9 AM – 11 AM on a sunny day",
              "धूप वाले दिन सुबह 9 – 11 बजे के बीच",
            )}
          </span>
        </div>
        <div>
          <Leaf size={31} />
          <span>
            <strong>{t("How DLCC Helps", "DLCC कैसे मदद करता है")}</strong>
            {t(
              "Helps in timely nitrogen management to improve yield and save input costs.",
              "समय पर नाइट्रोजन प्रबंधन से उपज बढ़ाने और इनपुट लागत बचाने में मदद करता है।",
            )}
          </span>
        </div>
        <div>
          <Bookmark size={31} />
          <span>
            <strong>{t("About DLCC", "DLCC के बारे में")}</strong>
            {t(
              "Standardised method by ICAR for leaf colour based N management.",
              "पत्ती रंग आधारित नाइट्रोजन प्रबंधन के लिए ICAR की मानकीकृत विधि।",
            )}
          </span>
        </div>
      </section>

      <aside className={styles.sourceBar}>
        {t(
          "Source: ICAR – Leaf Colour Chart (LCC) based N Management",
          "स्रोत: ICAR – पत्ती रंग चार्ट (LCC) आधारित नाइट्रोजन प्रबंधन",
        )}
        <span>
          {t(
            "Record ID: DLCC/240528/1031 · Synced",
            "रिकॉर्ड आईडी: DLCC/240528/1031 · सिंक किया गया",
          )}{" "}
          <CheckCircle2 size={15} />
        </span>
        <button type="button">
          <Share2 size={18} /> {t("Share Result", "परिणाम साझा करें")}
        </button>
      </aside>

      <div className={styles.pageActions}>
        <Link href="/leaf-colour-check/history">
          <Bookmark size={19} /> {t("Save & Record", "सहेजें और रिकॉर्ड करें")}
        </Link>
        <Link href="/leaf-colour-check/history">
          {t("Compare Trend", "रुझान की तुलना करें")}
        </Link>
        <Link className={styles.primaryButton} href="/leaf-colour-check">
          <CheckCircle2 size={20} /> {t("Done", "पूर्ण")}
        </Link>
      </div>
    </div>
  );
}
