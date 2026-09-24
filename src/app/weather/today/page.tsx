import type { Metadata } from "next";
import Link from "next/link";
import { CloudRain, Leaf, Sunrise, Sunset } from "lucide-react";

import {
  CurrentWeatherHero,
  FarmContext,
  RainfallBars,
  SourceBar,
  SuitabilityBadge,
  TemperatureTrend,
  WeatherActions,
  WeatherAlert,
  WeatherPageHeader,
} from "@/features/weather/components/weather-components";
import styles from "@/features/weather/components/weather.module.css";
import { forecastDays } from "@/features/weather/data/weather-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Today's Weather", "आज का मौसम") };
}

const dayParts = [
  ["Morning", "6 AM – 12 PM", "☀️", "28°C", "Sunny", "0%", "8 km/h (SW)"],
  [
    "Afternoon",
    "12 PM – 4 PM",
    "🌤️",
    "34°C",
    "Partly Cloudy",
    "10%",
    "14 km/h (SW)",
  ],
  [
    "Evening",
    "4 PM – 8 PM",
    "🌧️",
    "30°C",
    "Light Rain Likely",
    "60%",
    "10 km/h (SW)",
  ],
  ["Night", "8 PM – 6 AM", "🌙", "26°C", "Partly Cloudy", "10%", "8 km/h (SW)"],
] as const;

const dayPartHindi: Readonly<Record<string, string>> = {
  Morning: "सुबह",
  Afternoon: "दोपहर",
  Evening: "शाम",
  Night: "रात",
  "6 AM – 12 PM": "सुबह 6 बजे – दोपहर 12 बजे",
  "12 PM – 4 PM": "दोपहर 12 बजे – शाम 4 बजे",
  "4 PM – 8 PM": "शाम 4 बजे – रात 8 बजे",
  "8 PM – 6 AM": "रात 8 बजे – सुबह 6 बजे",
  Sunny: "धूप",
  "Partly Cloudy": "आंशिक बादल",
  "Light Rain Likely": "हल्की वर्षा की संभावना",
  "8 km/h (SW)": "8 किमी/घंटा (दक्षिण-पश्चिम)",
  "14 km/h (SW)": "14 किमी/घंटा (दक्षिण-पश्चिम)",
  "10 km/h (SW)": "10 किमी/घंटा (दक्षिण-पश्चिम)",
};

export default async function TodayWeatherPage() {
  const t = createTranslator(await getRequestLocale());
  const dayText = (value: string) => t(value, dayPartHindi[value] ?? value);
  return (
    <div className={styles.stack}>
      <WeatherPageHeader
        title={t("Today's Weather", "आज का मौसम")}
        subtitle={t(
          "Detailed conditions for your field today",
          "आज आपके खेत की विस्तृत मौसम स्थिति",
        )}
        backHref="/weather"
      />
      <FarmContext
        period={t("Date", "तिथि")}
        periodValue={t("20 May 2024\nTuesday", "20 मई 2024\nमंगलवार")}
      />
      <CurrentWeatherHero detailed />
      <section>
        <div className={styles.sectionHeading}>
          <h2>{t("Today at a Glance", "आज एक नज़र में")}</h2>
        </div>
        <div className={styles.dayPartGrid}>
          {dayParts.map(
            ([name, time, icon, temperature, condition, rain, wind]) => (
              <article key={name}>
                <h3>{dayText(name)}</h3>
                <p>{dayText(time)}</p>
                <span className={styles.weatherEmoji}>{icon}</span>
                <b>{temperature}</b>
                <p>{dayText(condition)}</p>
                <p>💧 {rain}</p>
                <p>≋ {dayText(wind)}</p>
              </article>
            ),
          )}
        </div>
      </section>
      <div className={styles.todayAnalytics}>
        <section className={styles.metricPanel}>
          <h2>{t("Temperature Trend", "तापमान रुझान")}</h2>
          <TemperatureTrend days={forecastDays.slice(0, 6)} />
        </section>
        <section className={styles.metricPanel}>
          <h2>{t("Rainfall Prediction", "वर्षा पूर्वानुमान")}</h2>
          <strong>6.8 mm</strong>
          <RainfallBars values={[2, 1.5, 2.3, 1]} />
          <small>
            {t("Rain likely between", "वर्षा की संभावना")}{" "}
            <b>{t("2 PM – 8 PM", "दोपहर 2 बजे – रात 8 बजे")}</b>
          </small>
        </section>
        <section className={styles.metricPanel}>
          <h2>{t("Sun & Moon", "सूर्य और चंद्रमा")}</h2>
          <div className={styles.sunMoonList}>
            <div>
              <Sunrise />
              <span>
                {t("Sunrise", "सूर्योदय")}
                <strong>{t("05:28 AM", "सुबह 05:28")}</strong>
              </span>
            </div>
            <div>
              <Sunset />
              <span>
                {t("Sunset", "सूर्यास्त")}
                <strong>{t("06:42 PM", "शाम 06:42")}</strong>
              </span>
            </div>
            <div>
              <CloudRain />
              <span>
                {t("Moonrise", "चंद्रोदय")}
                <strong>{t("09:18 PM", "रात 09:18")}</strong>
              </span>
            </div>
          </div>
        </section>
      </div>
      <WeatherAlert />
      <div className={styles.impactOperations}>
        <section className={styles.metricPanel}>
          <h2>
            <Leaf size={18} /> {t("Crop Impact", "फसल पर प्रभाव")}
          </h2>
          <p>
            {t(
              "Warm day with evening rain may increase risk of",
              "गर्म दिन और शाम की वर्षा से जोखिम बढ़ सकता है:",
            )}{" "}
            <b>
              {t(
                "Leaf Blast and Bacterial Blight.",
                "पत्ती झुलसा और जीवाणु झुलसा।",
              )}
            </b>
          </p>
          <div className={styles.tagList}>
            <span>
              {t("Ensure proper field drainage", "खेत में उचित जल निकासी रखें")}
            </span>
            <span>
              {t(
                "Avoid late nitrogen top dressing",
                "देर से नाइट्रोजन की ऊपरी खुराक न दें",
              )}
            </span>
            <span>
              {t(
                "Monitor crop after rainfall",
                "वर्षा के बाद फसल की निगरानी करें",
              )}
            </span>
          </div>
        </section>
        <section className={styles.metricPanel}>
          <h2>
            {t("Farming Operations Suitability", "कृषि कार्यों की उपयुक्तता")}
          </h2>
          <div className={styles.operationList}>
            <div>
              {t("Irrigation", "सिंचाई")} <SuitabilityBadge value="suitable" />
            </div>
            <div>
              {t("Fertilizer Application", "उर्वरक डालना")}{" "}
              <SuitabilityBadge value="caution" />
            </div>
            <div>
              {t("Pesticide Spraying", "कीटनाशक छिड़काव")}{" "}
              <SuitabilityBadge value="not-suitable" />
            </div>
            <div>
              {t("Harvesting", "कटाई")} <SuitabilityBadge value="suitable" />
            </div>
            <div>
              {t("Weeding", "निराई")} <SuitabilityBadge value="suitable" />
            </div>
          </div>
        </section>
      </div>
      <SourceBar />
      <WeatherActions />
      <Link className={styles.callout} href="/weather/hourly">
        <span>
          <strong>{t("Plan hour by hour", "हर घंटे की योजना बनाएं")}</strong>
          <small>
            {t(
              "See detailed conditions and operation suitability.",
              "विस्तृत स्थिति और कार्य की उपयुक्तता देखें।",
            )}
          </small>
        </span>
        {t("View Hourly Forecast", "प्रति घंटा पूर्वानुमान देखें")} →
      </Link>
    </div>
  );
}
