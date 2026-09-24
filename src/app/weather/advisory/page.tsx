import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  Bell,
  CloudRain,
  Droplets,
  Leaf,
  ShieldCheck,
  Thermometer,
  Wind,
} from "lucide-react";

import {
  FarmContext,
  SuitabilityBadge,
  WeatherPageHeader,
} from "@/features/weather/components/weather-components";
import styles from "@/features/weather/components/weather.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Crop Impact Advisory", "फसल प्रभाव सलाह") };
}

const recommendations = [
  [
    "Preventive Measures",
    "Maintain proper field drainage.",
    "Avoid excessive nitrogen.",
    "Ensure good air circulation.",
    "Remove and destroy infected plant parts.",
  ],
  [
    "Monitoring",
    "Scout field once in 3 days.",
    "Check leaves, especially lower and middle canopy.",
    "Look for early spots or lesions.",
  ],
  [
    "Protective (If needed)",
    "Use certified seed.",
    "Follow recommended fungicide only if symptoms appear.",
    "View approved products before application.",
  ],
] as const;

const recommendationHindi: Readonly<Record<string, string>> = {
  "Preventive Measures": "निवारक उपाय",
  "Maintain proper field drainage.": "खेत में उचित जल निकासी बनाए रखें।",
  "Avoid excessive nitrogen.": "अत्यधिक नाइट्रोजन से बचें।",
  "Ensure good air circulation.": "अच्छा वायु संचार सुनिश्चित करें।",
  "Remove and destroy infected plant parts.":
    "संक्रमित पौध भागों को हटाकर नष्ट करें।",
  Monitoring: "निगरानी",
  "Scout field once in 3 days.": "हर 3 दिन में एक बार खेत का निरीक्षण करें।",
  "Check leaves, especially lower and middle canopy.":
    "पत्तियों, विशेषकर निचले और मध्य भाग की जांच करें।",
  "Look for early spots or lesions.": "शुरुआती धब्बे या घाव देखें।",
  "Protective (If needed)": "सुरक्षात्मक (यदि आवश्यक हो)",
  "Use certified seed.": "प्रमाणित बीज का उपयोग करें।",
  "Follow recommended fungicide only if symptoms appear.":
    "लक्षण दिखने पर ही सुझाए गए फफूंदनाशक का प्रयोग करें।",
  "View approved products before application.":
    "प्रयोग से पहले स्वीकृत उत्पाद देखें।",
};

export default async function CropImpactAdvisoryPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <WeatherPageHeader
        title={t("Crop Impact Advisory", "फसल प्रभाव सलाह")}
        subtitle={t(
          "Weather insights translated into crop-specific action",
          "मौसम जानकारी को फसल-विशिष्ट कार्यों में बदलें",
        )}
        backHref="/weather"
      />
      <FarmContext
        period={t("Forecast Period", "पूर्वानुमान अवधि")}
        periodValue={t("20–26 May 2024\n7 Days", "20–26 मई 2024\n7 दिन")}
      />
      <section className={styles.panel}>
        <div className={styles.sectionHeading}>
          <h2>
            {t("Weather Outlook", "मौसम परिदृश्य")}{" "}
            <small>{t("(20–26 May 2024)", "(20–26 मई 2024)")}</small>
          </h2>
          <span>{t("View Forecast", "पूर्वानुमान देखें")} →</span>
        </div>
        <div className={styles.advisoryStats}>
          <div>
            <CloudRain />
            <small>{t("Rainfall", "वर्षा")}</small>
            <strong>29.1 mm</strong>
            <small>{t("(Moderate)", "(मध्यम)")}</small>
          </div>
          <div>
            <Thermometer />
            <small>{t("Max Temp", "अधिकतम तापमान")}</small>
            <strong>36°C</strong>
            <small>{t("(High)", "(उच्च)")}</small>
          </div>
          <div>
            <Thermometer />
            <small>{t("Min Temp", "न्यूनतम तापमान")}</small>
            <strong>24°C</strong>
            <small>{t("(Normal)", "(सामान्य)")}</small>
          </div>
          <div>
            <Droplets />
            <small>{t("Humidity", "आर्द्रता")}</small>
            <strong>65–85%</strong>
            <small>{t("(High)", "(उच्च)")}</small>
          </div>
          <div>
            <Wind />
            <small>{t("Wind", "हवा")}</small>
            <strong>8–16 km/h</strong>
            <small>{t("(SW)", "(दक्षिण-पश्चिम)")}</small>
          </div>
          <div>
            <ShieldCheck />
            <small>{t("Key Risk", "मुख्य जोखिम")}</small>
            <strong>{t("High", "उच्च")}</strong>
            <small>
              {t("Leaf Blast, Bacterial Blight", "पत्ती झुलसा, जीवाणु झुलसा")}
            </small>
          </div>
        </div>
      </section>
      <section className={styles.cropStatus}>
        <Image
          src="/images/authenticated/weather/paddy-field.jpg"
          width={82}
          height={82}
          alt={t("Paddy crop", "धान की फसल")}
        />
        <div>
          <h2>{t("Paddy (Dhan)", "धान")}</h2>
          <p>
            {t("Variety:", "किस्म:")} Pusa Basmati 1121 &nbsp; | &nbsp;{" "}
            {t("Sowing Date:", "बुवाई तिथि:")}{" "}
            {t("25 Apr 2024", "25 अप्रैल 2024")}
          </p>
          <p>
            {t("Current Stage:", "वर्तमान अवस्था:")}{" "}
            {t("Tillering (25–30 DAT)", "कल्ले निकलना (25–30 DAT)")}
          </p>
        </div>
        <aside>
          {t("Stage Sensitivity", "अवस्था संवेदनशीलता")}
          <strong>{t("High", "उच्च")}</strong>
          {t("This is a critical stage.", "यह एक महत्वपूर्ण अवस्था है।")}
          <br />
          {t("Follow advisories closely.", "सलाह का ध्यान से पालन करें।")}
        </aside>
      </section>
      <section className={styles.panel}>
        <div className={styles.sectionHeading}>
          <h2>
            {t(
              "Weather Impact & Advisory for Next 7 Days",
              "अगले 7 दिनों के लिए मौसम प्रभाव और सलाह",
            )}
          </h2>
        </div>
        <div className={styles.impactRows}>
          <article className={styles.impactRow}>
            <h3>
              <Leaf size={17} /> 1. {t("Disease Risk", "रोग जोखिम")}
              <br />
              <SuitabilityBadge value="not-suitable" />
            </h3>
            <p>
              {t(
                "Warm and humid conditions with expected rainfall can increase risk of",
                "अपेक्षित वर्षा के साथ गर्म और नम परिस्थितियां जोखिम बढ़ा सकती हैं:",
              )}{" "}
              <b>
                {t(
                  "Leaf Blast and Bacterial Blight.",
                  "पत्ती झुलसा और जीवाणु झुलसा।",
                )}
              </b>
            </p>
            <aside>
              <b>{t("Action", "कार्य")}</b>
              <br />
              {t(
                "Strengthen preventive measures and monitor field regularly.",
                "निवारक उपाय मजबूत करें और खेत की नियमित निगरानी करें।",
              )}
            </aside>
          </article>
          <article className={styles.impactRow}>
            <h3>
              ☀ 2. {t("Nutrient Management", "पोषक तत्व प्रबंधन")}
              <br />
              <SuitabilityBadge value="caution" />
            </h3>
            <p>
              {t(
                "High humidity may reduce nitrogen use efficiency. Avoid top dressing if heavy rain is expected.",
                "अधिक आर्द्रता नाइट्रोजन उपयोग दक्षता घटा सकती है। भारी वर्षा की संभावना हो तो ऊपरी खुराक से बचें।",
              )}
            </p>
            <aside>
              <b>{t("Action", "कार्य")}</b>
              <br />
              {t(
                "Apply nitrogen in split doses. Prefer basal application.",
                "नाइट्रोजन को विभाजित मात्रा में दें। आधार प्रयोग को प्राथमिकता दें।",
              )}
            </aside>
          </article>
          <article className={styles.impactRow}>
            <h3>
              <Droplets size={17} /> 3. {t("Irrigation", "सिंचाई")}
              <br />
              <SuitabilityBadge value="suitable" />
            </h3>
            <p>
              {t(
                "Soil moisture is likely adequate due to upcoming rainfall.",
                "आगामी वर्षा के कारण मिट्टी की नमी पर्याप्त रहने की संभावना है।",
              )}
            </p>
            <aside>
              <b>{t("Action", "कार्य")}</b>
              <br />
              {t(
                "Avoid irrigation unless field shows signs of moisture stress.",
                "खेत में नमी की कमी के संकेत न हों तो सिंचाई से बचें।",
              )}
            </aside>
          </article>
        </div>
      </section>
      <section className={styles.panel}>
        <div className={styles.sectionHeading}>
          <h2>{t("Detailed Recommendations", "विस्तृत सिफारिशें")}</h2>
        </div>
        <div className={styles.recommendationTabs}>
          <span>🛡 {t("Disease Management", "रोग प्रबंधन")}</span>
          <span>♨ {t("Nutrient Management", "पोषक तत्व प्रबंधन")}</span>
          <span>💧 {t("Irrigation", "सिंचाई")}</span>
          <span>♻ {t("Other Practices", "अन्य पद्धतियां")}</span>
        </div>
        <div className={styles.recommendationColumns}>
          {recommendations.map(([title, ...items]) => (
            <div key={title}>
              <h3>{t(title, recommendationHindi[title] ?? title)}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>
                    {t(item, recommendationHindi[item] ?? item)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.panel}>
        <div className={styles.sectionHeading}>
          <h2>
            {t("Action Schedule", "कार्य अनुसूची")}{" "}
            <small>{t("(Suggested)", "(सुझाई गई)")}</small>
          </h2>
        </div>
        <div className={styles.schedule}>
          <div>
            <strong>{t("20–21 May", "20–21 मई")}</strong>
            <small>
              {t("Monitor field", "खेत की निगरानी")}
              <br />
              {t("Scouting", "निरीक्षण")}
            </small>
          </div>
          <div>
            <strong>{t("22–23 May", "22–23 मई")}</strong>
            <small>
              {t("Preventive Spray", "निवारक छिड़काव")}
              <br />
              {t(
                "(If forecast remains favourable for disease)",
                "(यदि पूर्वानुमान रोग के लिए अनुकूल रहे)",
              )}
            </small>
          </div>
          <div>
            <strong>{t("24–26 May", "24–26 मई")}</strong>
            <small>
              {t("Follow-up", "अनुवर्ती कार्य")}
              <br />
              {t(
                "Monitor & manage as needed",
                "आवश्यकतानुसार निगरानी और प्रबंधन करें",
              )}
            </small>
          </div>
          <div>
            <strong>{t("After Rainfall", "वर्षा के बाद")}</strong>
            <small>
              {t(
                "Re-scout field and take action if required",
                "खेत का दोबारा निरीक्षण करें और जरूरत हो तो कार्रवाई करें",
              )}
            </small>
          </div>
        </div>
      </section>
      <div className={styles.actionRow}>
        <a href="#reminder">
          <Bell size={18} />
          {t("Set Reminder", "रिमाइंडर सेट करें")}
        </a>
        <a href="#share">⌯ {t("Share Advisory", "सलाह साझा करें")}</a>
        <Link className={styles.primaryAction} href="/more">
          ⚠ {t("View Field Alerts", "खेत चेतावनियां देखें")}
        </Link>
      </div>
    </div>
  );
}
