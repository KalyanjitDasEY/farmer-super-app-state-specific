import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Beaker,
  CalendarDays,
  CircleGauge,
  FileUp,
  FileText,
  FlaskConical,
  Info,
  Leaf,
  MapPin,
  Microscope,
  Sprout,
} from "lucide-react";

import { SoilHealthActions } from "@/features/soil-health/SoilHealthActions";
import {
  keyRecommendations,
  nutrientRecommendations,
  soilText,
  soilParameters,
} from "@/features/soil-health/soil-health-data";
import styles from "@/features/soil-health/soil-health.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t("Soil Health Card / Report", "मिट्टी स्वास्थ्य कार्ड / रिपोर्ट"),
    description: t(
      "Parcel-linked soil health analysis and recommendations.",
      "भूखंड से जुड़ा मिट्टी स्वास्थ्य विश्लेषण और सिफारिशें।",
    ),
  };
}

export default async function SoilHealthPage() {
  const t = createTranslator(await getRequestLocale());
  const statusLabel = {
    normal: t("Normal", "सामान्य"),
    low: t("Low", "कम"),
    medium: t("Medium", "मध्यम"),
    high: t("High", "अधिक"),
    sufficient: t("Sufficient", "पर्याप्त"),
  } as const;
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <nav
          className={styles.breadcrumbs}
          aria-label={t("Breadcrumb", "ब्रेडक्रंब")}
        >
          <Link href="/home">{t("Home", "होम")}</Link>
          <span>›</span>
          <Link href="/profile">{t("Profile", "प्रोफाइल")}</Link>
          <span>›</span>
          <strong>
            {t("Soil Health Card / Report", "मिट्टी स्वास्थ्य कार्ड / रिपोर्ट")}
          </strong>
        </nav>
        <Link className={styles.backButton} href="/home">
          <ArrowLeft size={18} aria-hidden="true" />
          {t("Back to Home", "होम पर वापस जाएं")}
        </Link>
      </div>

      <header className={styles.titleRow}>
        <span className={styles.titleIcon}>
          <Sprout size={39} aria-hidden="true" />
        </span>
        <div>
          <h1>
            {t("Soil Health Card / Report", "मिट्टी स्वास्थ्य कार्ड / रिपोर्ट")}
          </h1>
          <p>
            {t(
              "View parcel-linked soil health analysis and recommendations.",
              "भूखंड से जुड़ा मिट्टी स्वास्थ्य विश्लेषण और सिफारिशें देखें।",
            )}
          </p>
        </div>
        <aside className={styles.reportAvailable}>
          <strong>
            <span /> {t("Report Available", "रिपोर्ट उपलब्ध")}
          </strong>
          <p>
            {t(
              "Demo report with sample soil results; not an official test record.",
              "नमूना मिट्टी परिणामों वाली डेमो रिपोर्ट; यह आधिकारिक जांच रिकॉर्ड नहीं है।",
            )}
          </p>
        </aside>
      </header>

      <section
        className={styles.reportSummary}
        aria-label={t("Report summary", "रिपोर्ट सारांश")}
      >
        <article>
          <MapPin size={28} aria-hidden="true" />
          <div>
            <small>{t("Khesra / Parcel", "खेसरा / भूखंड")}</small>
            <strong>123/1</strong>
            <span>{t("Village: Amhara", "गांव: अमहरा")}</span>
            <span>{t("Block: Bihta", "प्रखंड: बिहटा")}</span>
          </div>
        </article>
        <article>
          <CalendarDays size={28} aria-hidden="true" />
          <div>
            <small>{t("Test Date", "जांच दिनांक")}</small>
            <strong>{t("15 May 2024", "15 मई 2024")}</strong>
          </div>
        </article>
        <article>
          <FlaskConical size={28} aria-hidden="true" />
          <div>
            <small>{t("Soil Type", "मिट्टी का प्रकार")}</small>
            <strong>{t("Loamy Soil", "दोमट मिट्टी")}</strong>
          </div>
        </article>
        <article>
          <FileText size={28} aria-hidden="true" />
          <div>
            <small>{t("Report Reference", "रिपोर्ट संदर्भ")}</small>
            <strong>SHC-BR-24-05-1231</strong>
            <span>{t("Sample ID", "नमूना आईडी")}: BR24/PTN/1231</span>
          </div>
        </article>
      </section>

      <div className={styles.reportLayout}>
        <main className={styles.mainColumn}>
          <section
            className={styles.panel}
            id="soil-parameter-summary"
            tabIndex={-1}
          >
            <h2>{t("Soil Parameter Summary", "मिट्टी मापदंड सारांश")}</h2>
            <div className={styles.tableScroller}>
              <table className={styles.parameterTable}>
                <thead>
                  <tr>
                    <th>{t("Parameter", "मापदंड")}</th>
                    <th>{t("Result", "परिणाम")}</th>
                    <th>{t("Unit", "इकाई")}</th>
                    <th>{t("Status", "स्थिति")}</th>
                    <th>{t("Recommended Range", "अनुशंसित सीमा")}</th>
                  </tr>
                </thead>
                <tbody>
                  {soilParameters.map((parameter) => (
                    <tr key={parameter.parameter}>
                      <td>
                        <span
                          className={`${styles.parameterSymbol} ${styles[parameter.tone]}`}
                        >
                          {parameter.symbol}
                        </span>
                        {t(soilText(parameter.parameter))}
                      </td>
                      <td>
                        <strong>{parameter.result}</strong>
                      </td>
                      <td>{parameter.unit}</td>
                      <td>
                        <span
                          className={`${styles.status} ${styles[parameter.status]}`}
                        >
                          {statusLabel[parameter.status]}
                        </span>
                      </td>
                      <td>{parameter.recommendedRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.tableNote}>
              <Info size={16} aria-hidden="true" />
              {t(
                "Status is indicative. Follow soil health recommendations for better crop productivity.",
                "स्थिति संकेतात्मक है। बेहतर फसल उत्पादकता के लिए मिट्टी स्वास्थ्य सिफारिशों का पालन करें।",
              )}
            </div>
          </section>

          <section className={styles.panel}>
            <h2>
              {t(
                "Nutrient Use Recommendations (Indicative)",
                "पोषक तत्व उपयोग सिफारिशें (संकेतात्मक)",
              )}
            </h2>
            <div className={styles.nutrientGrid}>
              {nutrientRecommendations.map((recommendation) => (
                <article key={recommendation.formula}>
                  <span
                    className={`${styles.nutrientFormula} ${styles[recommendation.tone]}`}
                  >
                    {recommendation.formula}
                  </span>
                  <strong>{recommendation.amount}</strong>
                  <span>{recommendation.unit}</span>
                  <small>({t(soilText(recommendation.note))})</small>
                </article>
              ))}
            </div>
            <div className={styles.importantNote}>
              <Info size={22} aria-hidden="true" />
              <div>
                <strong>{t("Important Note", "महत्वपूर्ण सूचना")}</strong>
                <p>
                  {t(
                    "This is a sample Soil Health Card, not a verified laboratory result. Test your soil locally every 2–3 years for better results.",
                    "यह नमूना मिट्टी स्वास्थ्य कार्ड है, सत्यापित प्रयोगशाला परिणाम नहीं। बेहतर परिणामों के लिए हर 2–3 वर्ष में स्थानीय स्तर पर मिट्टी की जांच कराएं।",
                  )}
                </p>
              </div>
            </div>
          </section>
        </main>

        <aside className={styles.sideColumn}>
          <section className={`${styles.panel} ${styles.healthPanel}`}>
            <h2>
              {t("Soil Health at a Glance", "एक नजर में मिट्टी स्वास्थ्य")}
            </h2>
            <div className={styles.gauge}>
              <svg
                aria-label={t(
                  "Overall soil health is good",
                  "कुल मिट्टी स्वास्थ्य अच्छा है",
                )}
                role="img"
                viewBox="0 0 240 135"
              >
                <defs>
                  <linearGradient id="soil-health-gradient">
                    <stop offset="0%" stopColor="#ff7a00" />
                    <stop offset="48%" stopColor="#ffc400" />
                    <stop offset="100%" stopColor="#21a62f" />
                  </linearGradient>
                </defs>
                <path
                  d="M25 115 A95 95 0 0 1 215 115"
                  fill="none"
                  stroke="url(#soil-health-gradient)"
                  strokeLinecap="butt"
                  strokeWidth="22"
                />
              </svg>
              <div>
                <Leaf size={25} aria-hidden="true" />
                <strong>{t("Good", "अच्छा")}</strong>
                <span>{t("Overall Soil Health", "कुल मिट्टी स्वास्थ्य")}</span>
              </div>
            </div>
          </section>

          <section className={styles.panel}>
            <h2>{t("Key Recommendations", "मुख्य सिफारिशें")}</h2>
            <ul className={styles.recommendationList}>
              {keyRecommendations.map((recommendation) => (
                <li key={recommendation.symbol}>
                  <span
                    className={`${styles.parameterSymbol} ${styles[recommendation.tone]}`}
                  >
                    {recommendation.symbol}
                  </span>
                  {t(soilText(recommendation.text))}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.panel}>
            <h2>{t("Report Details", "रिपोर्ट विवरण")}</h2>
            <dl className={styles.reportDetails}>
              <div>
                <Microscope size={19} aria-hidden="true" />
                <dt>{t("Lab Name", "प्रयोगशाला नाम")}</dt>
                <dd>
                  {t(
                    "Demo Soil Testing Lab, Patna",
                    "डेमो मिट्टी जांच प्रयोगशाला, पटना",
                  )}
                </dd>
              </div>
              <div>
                <Beaker size={19} aria-hidden="true" />
                <dt>{t("Test Method", "जांच विधि")}</dt>
                <dd>{t("ICAR Recommended", "ICAR अनुशंसित")}</dd>
              </div>
              <div>
                <CalendarDays size={19} aria-hidden="true" />
                <dt>{t("Tested On", "जांच की गई")}</dt>
                <dd>{t("15 May 2024", "15 मई 2024")}</dd>
              </div>
              <div>
                <FileUp size={19} aria-hidden="true" />
                <dt>{t("Uploaded On", "अपलोड किया")}</dt>
                <dd>
                  {t("18 May 2024, 10:30 AM", "18 मई 2024, 10:30 पूर्वाह्न")}
                </dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>

      <SoilHealthActions />

      <p className={styles.disclaimer}>
        <CircleGauge size={16} aria-hidden="true" />
        {t(
          "Recommendations are indicative and should be used with local agricultural guidance.",
          "सिफारिशें संकेतात्मक हैं और स्थानीय कृषि मार्गदर्शन के साथ उपयोग की जानी चाहिए।",
        )}
      </p>
    </div>
  );
}
