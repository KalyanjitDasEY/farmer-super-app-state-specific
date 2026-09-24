import type { Metadata } from "next";

import {
  FarmContext,
  SourceBar,
  SuitabilityBadge,
  WeatherActions,
  WeatherIcon,
  WeatherPageHeader,
} from "@/features/weather/components/weather-components";
import { OperationSelector } from "@/features/weather/components/weather-interactions";
import styles from "@/features/weather/components/weather.module.css";
import {
  dailySuitability,
  hourlyForecast,
  translateWeatherText,
} from "@/features/weather/data/weather-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t("Spray / Field Operation Window", "छिड़काव / कृषि कार्य का समय"),
  };
}

export default async function OperationWindowPage() {
  const t = createTranslator(await getRequestLocale());
  const samples = hourlyForecast
    .filter((_, index) => index % 2 === 0)
    .slice(0, 8);
  return (
    <div className={styles.stack}>
      <WeatherPageHeader
        title={t(
          "Spray / Field Operation Window",
          "छिड़काव / कृषि कार्य का समय",
        )}
        subtitle={t(
          "Choose the best time for safe and effective operations",
          "सुरक्षित और प्रभावी कार्यों के लिए सर्वोत्तम समय चुनें",
        )}
        backHref="/weather"
      />
      <FarmContext
        period={t("Date Range", "तिथि सीमा")}
        periodValue={t("20 – 26 May 2024\n7 Days", "20 – 26 मई 2024\n7 दिन")}
      />
      <OperationSelector />
      <section className={styles.panel}>
        <div className={styles.sectionHeading}>
          <h2>{t("Hourly Suitability View", "प्रति घंटा उपयुक्तता")}</h2>
          <span>
            ● {t("Suitable", "उपयुक्त")} &nbsp; ⚠{" "}
            {t("Use Caution", "सावधानी रखें")} &nbsp; ×{" "}
            {t("Not Suitable", "अनुपयुक्त")}
          </span>
        </div>
        <div className={styles.tableScroller}>
          <table className={styles.weatherTable}>
            <thead>
              <tr>
                <th>{t("Time", "समय")}</th>
                {samples.map((hour) => (
                  <th key={hour.time}>{translateWeatherText(t, hour.time)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{t("Weather", "मौसम")}</th>
                {samples.map((hour) => (
                  <td key={hour.time}>
                    <WeatherIcon kind={hour.weather} />
                  </td>
                ))}
              </tr>
              <tr>
                <th>{t("Temp (°C)", "तापमान (°C)")}</th>
                {samples.map((hour) => (
                  <td key={hour.time}>{hour.temperature}°</td>
                ))}
              </tr>
              <tr>
                <th>{t("Rainfall Prob.", "वर्षा संभावना")}</th>
                {samples.map((hour) => (
                  <td key={hour.time}>{hour.rainChance}%</td>
                ))}
              </tr>
              <tr>
                <th>{t("Wind (km/h)", "हवा (किमी/घंटा)")}</th>
                {samples.map((hour) => (
                  <td key={hour.time}>{translateWeatherText(t, hour.wind)}</td>
                ))}
              </tr>
              <tr>
                <th>{t("Humidity (%)", "आर्द्रता (%)")}</th>
                {samples.map((hour) => (
                  <td key={hour.time}>{hour.humidity}%</td>
                ))}
              </tr>
              <tr>
                <th>{t("Suitability", "उपयुक्तता")}</th>
                {samples.map((hour, index) => (
                  <td key={hour.time}>
                    <SuitabilityBadge
                      value={
                        index < 2 || index > 5
                          ? "not-suitable"
                          : index < 4
                            ? "suitable"
                            : "caution"
                      }
                      label={false}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          💡{" "}
          {t(
            "Avoid spraying 2 hours before and after expected rainfall and when wind speed > 15 km/h.",
            "अपेक्षित वर्षा से 2 घंटे पहले और बाद में तथा हवा की गति 15 किमी/घंटा से अधिक होने पर छिड़काव से बचें।",
          )}
        </p>
      </section>
      <section className={styles.panel}>
        <div className={styles.sectionHeading}>
          <h2>{t("7-Day Suitability Summary", "7-दिन की उपयुक्तता सारांश")}</h2>
        </div>
        <div className={styles.tableScroller}>
          <table className={styles.weatherTable}>
            <thead>
              <tr>
                <th>{t("Date", "तिथि")}</th>
                <th>{t("Suitable Window", "उपयुक्त समय")}</th>
                <th>{t("Suitable Hours", "उपयुक्त घंटे")}</th>
                <th>{t("Rainfall (mm)", "वर्षा (मिमी)")}</th>
                <th>{t("Max Wind (km/h)", "अधिकतम हवा (किमी/घंटा)")}</th>
                <th>{t("Overall", "समग्र")}</th>
              </tr>
            </thead>
            <tbody>
              {dailySuitability.map((day) => (
                <tr key={day.date}>
                  <th>{translateWeatherText(t, day.date)}</th>
                  <td>{translateWeatherText(t, day.window)}</td>
                  <td>{translateWeatherText(t, day.hours)}</td>
                  <td>{day.rainfall}</td>
                  <td>{day.wind}</td>
                  <td>
                    <SuitabilityBadge value={day.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className={styles.operationTips}>
        <section>
          <h2>{t("Key Conditions for Spraying", "छिड़काव की मुख्य शर्तें")}</h2>
          <ul>
            <li>
              {t(
                "Wind speed: 3 – 15 km/h (Ideal)",
                "हवा की गति: 3 – 15 किमी/घंटा (आदर्श)",
              )}
            </li>
            <li>
              {t("Temperature: 20 – 32°C (Ideal)", "तापमान: 20 – 32°C (आदर्श)")}
            </li>
            <li>
              {t("Humidity: 40 – 80% (Ideal)", "आर्द्रता: 40 – 80% (आदर्श)")}
            </li>
            <li>
              {t(
                "No rainfall expected for at least 2 hours",
                "कम से कम 2 घंटे वर्षा की संभावना न हो",
              )}
            </li>
            <li>
              {t(
                "Prefer morning or late afternoon",
                "सुबह या देर दोपहर को प्राथमिकता दें",
              )}
            </li>
          </ul>
        </section>
        <section>
          <h2>{t("Why Timing Matters", "सही समय क्यों महत्वपूर्ण है")}</h2>
          <ul>
            <li>
              {t(
                "Improves effectiveness of pesticide",
                "कीटनाशक की प्रभावशीलता बढ़ाता है",
              )}
            </li>
            <li>
              {t(
                "Reduces drift and crop damage",
                "बहाव और फसल नुकसान घटाता है",
              )}
            </li>
            <li>
              {t(
                "Ensures safety for operator and environment",
                "कार्यकर्ता और पर्यावरण की सुरक्षा सुनिश्चित करता है",
              )}
            </li>
            <li>
              {t(
                "Avoids wash-off due to rain",
                "वर्षा से दवा बहने से बचाता है",
              )}
            </li>
          </ul>
        </section>
        <section>
          <h2>{t("Weather Alert", "मौसम चेतावनी")}</h2>
          <p>
            ⛈️{" "}
            {t(
              "Thunderstorm with lightning likely on 22 May afternoon.",
              "22 मई की दोपहर बिजली के साथ आंधी की संभावना है।",
            )}
          </p>
          <p>
            {t(
              "Avoid spraying during rain and high winds.",
              "वर्षा और तेज हवा के दौरान छिड़काव से बचें।",
            )}
          </p>
        </section>
      </div>
      <SourceBar advisory />
      <WeatherActions />
    </div>
  );
}
