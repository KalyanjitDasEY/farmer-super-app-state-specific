import type { Metadata } from "next";
import Link from "next/link";
import {
  CloudRain,
  Droplets,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
} from "lucide-react";

import {
  CurrentWeatherHero,
  FarmContext,
  ForecastStrip,
  OverviewQuickLinks,
  RainfallBars,
  WeatherAlert,
  WeatherPageHeader,
} from "@/features/weather/components/weather-components";
import styles from "@/features/weather/components/weather.module.css";
import { forecastDays } from "@/features/weather/data/weather-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Weather", "मौसम") };
}

export default async function WeatherPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <WeatherPageHeader
        title={t("Weather", "मौसम")}
        subtitle={t(
          "Field-aware weather insights for better farm decisions",
          "बेहतर कृषि निर्णयों के लिए खेत-आधारित मौसम जानकारी",
        )}
      />
      <FarmContext />
      <CurrentWeatherHero />
      <WeatherAlert compact />
      <ForecastStrip days={forecastDays} />

      <div className={styles.overviewColumns}>
        <section className={styles.rainPanel}>
          <h2>☂ {t("Rainfall Outlook", "वर्षा परिदृश्य")}</h2>
          <div className={styles.rainSummary}>
            <div>
              <small>{t("Next 5 Days", "अगले 5 दिन")}</small>
              <p>{t("Moderate Rain", "मध्यम वर्षा")}</p>
              <small>{t("Total Expected", "कुल अपेक्षित")}</small>
              <strong>28.6 mm</strong>
            </div>
            <RainfallBars values={[8.5, 12.3, 5, 2.1, 0.7]} />
          </div>
        </section>
        <section className={styles.advisoryPanel}>
          <h2>♨ {t("Agro Advisory", "कृषि मौसम सलाह")}</h2>
          <p>
            {t(
              "High humidity and warm conditions are favourable for leaf blast and bacterial blight.",
              "अधिक आर्द्रता और गर्म परिस्थितियां पत्ती झुलसा और जीवाणु झुलसा के लिए अनुकूल हैं।",
            )}
          </p>
          <ul>
            <li>
              {t("Ensure proper field drainage", "खेत में उचित जल निकासी रखें")}
            </li>
            <li>
              {t(
                "Avoid nitrogen top dressing",
                "नाइट्रोजन की ऊपरी खुराक से बचें",
              )}
            </li>
            <li>{t("Monitor crop regularly", "फसल की नियमित निगरानी करें")}</li>
          </ul>
          <Link href="/weather/advisory">
            {t("More advisory", "और सलाह")} →
          </Link>
        </section>
      </div>

      <section className={styles.highlights}>
        <h2>{t("Today's Key Highlights", "आज की मुख्य बातें")}</h2>
        <div>
          <CloudRain />
          <span>
            {t("Rain Chance", "वर्षा की संभावना")}
            <strong>60%</strong>
            {t("Evening", "शाम")}
          </span>
        </div>
        <div>
          <Thermometer />
          <span>
            {t("Max Temp", "अधिकतम तापमान")}
            <strong>34°C</strong>
            {t("2 PM", "दोपहर 2 बजे")}
          </span>
        </div>
        <div>
          <Droplets />
          <span>
            {t("Min Temp", "न्यूनतम तापमान")}
            <strong>24°C</strong>
            {t("5 AM", "सुबह 5 बजे")}
          </span>
        </div>
        <div>
          <Wind />
          <span>
            {t("Wind", "हवा")}
            <strong>12 km/h</strong>
            {t("SW", "दक्षिण-पश्चिम")}
          </span>
        </div>
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
      </section>
      <OverviewQuickLinks />
    </div>
  );
}
