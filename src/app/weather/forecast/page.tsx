import type { Metadata } from "next";
import Link from "next/link";

import {
  FarmContext,
  RainfallBars,
  SourceBar,
  SuitabilityBadge,
  TemperatureTrend,
  WeatherActions,
  WeatherAlert,
  WeatherIcon,
  WeatherPageHeader,
} from "@/features/weather/components/weather-components";
import styles from "@/features/weather/components/weather.module.css";
import {
  forecastDays,
  operationRows,
  translateWeatherText,
} from "@/features/weather/data/weather-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Multi-Day Forecast", "बहु-दिवसीय पूर्वानुमान") };
}

export default async function MultiDayForecastPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <WeatherPageHeader
        title={t("Multi-Day Forecast", "बहु-दिवसीय पूर्वानुमान")}
        subtitle={t(
          "Plan ahead for better farm decisions",
          "बेहतर कृषि निर्णयों के लिए पहले से योजना बनाएं",
        )}
        backHref="/weather"
      />
      <FarmContext />
      <div className={styles.forecastControls}>
        <nav>
          <Link href="/weather/forecast">
            {t("7-Day Forecast", "7-दिन का पूर्वानुमान")}
          </Link>
          <Link href="/weather/forecast?range=10">
            {t("10-Day Outlook", "10-दिन का परिदृश्य")}
          </Link>
        </nav>
        <button type="button">
          ⇩ {t("Download Forecast", "पूर्वानुमान डाउनलोड करें")}
        </button>
      </div>
      <div className={styles.tableScroller}>
        <table className={`${styles.weatherTable} ${styles.forecastMatrix}`}>
          <thead>
            <tr>
              <th>{t("Date", "तिथि")}</th>
              {forecastDays.map((day) => (
                <th key={day.date}>
                  {translateWeatherText(t, day.day)}
                  <br />
                  <small>{translateWeatherText(t, day.date)}</small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{t("Weather", "मौसम")}</th>
              {forecastDays.map((day) => (
                <td key={day.date}>
                  <WeatherIcon kind={day.weather} />
                </td>
              ))}
            </tr>
            <tr>
              <th>{t("Max / Min (°C)", "अधिकतम / न्यूनतम (°C)")}</th>
              {forecastDays.map((day) => (
                <td key={day.date}>
                  <b>{day.high}°</b> / {day.low}°
                </td>
              ))}
            </tr>
            <tr>
              <th>{t("Rainfall Prob.", "वर्षा संभावना")}</th>
              {forecastDays.map((day) => (
                <td key={day.date}>💧 {day.rainChance}%</td>
              ))}
            </tr>
            <tr>
              <th>{t("Rainfall (mm)", "वर्षा (मिमी)")}</th>
              {forecastDays.map((day) => (
                <td key={day.date}>{day.rainfall.toFixed(1)} mm</td>
              ))}
            </tr>
            <tr>
              <th>{t("Humidity (%)", "आर्द्रता (%)")}</th>
              {forecastDays.map((day) => (
                <td key={day.date}>{day.humidity}%</td>
              ))}
            </tr>
            <tr>
              <th>{t("Wind (km/h)", "हवा (किमी/घंटा)")}</th>
              {forecastDays.map((day) => (
                <td key={day.date}>↗ {translateWeatherText(t, day.wind)}</td>
              ))}
            </tr>
            <tr>
              <th>{t("Crop Risk", "फसल जोखिम")}</th>
              {forecastDays.map((day) => (
                <td key={day.date}>
                  <SuitabilityBadge
                    value={
                      day.risk === "Low"
                        ? "suitable"
                        : day.risk === "Moderate"
                          ? "caution"
                          : "not-suitable"
                    }
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.chartColumns}>
        <section className={styles.metricPanel}>
          <h2>{t("Rainfall Trend (mm)", "वर्षा रुझान (मिमी)")}</h2>
          <RainfallBars values={forecastDays.map((day) => day.rainfall)} />
          <p>
            {t(
              "Total Expected Rainfall (7 Days):",
              "कुल अपेक्षित वर्षा (7 दिन):",
            )}{" "}
            <b>29.1 mm</b>
          </p>
        </section>
        <section className={styles.metricPanel}>
          <h2>{t("Temperature Trend (°C)", "तापमान रुझान (°C)")}</h2>
          <TemperatureTrend days={forecastDays} />
        </section>
      </div>
      <div className={styles.impactGrid}>
        <section className={styles.metricPanel}>
          <h2>{t("Crop Impact Outlook", "फसल प्रभाव परिदृश्य")}</h2>
          <div className={styles.riskList}>
            <div>
              <strong>{t("Leaf Blast", "पत्ती झुलसा")}</strong>
              <SuitabilityBadge value="caution" />
              <p>
                {t(
                  "Risk may increase from Wed due to high humidity.",
                  "अधिक आर्द्रता के कारण बुधवार से जोखिम बढ़ सकता है।",
                )}
              </p>
            </div>
            <div>
              <strong>{t("Bacterial Blight", "जीवाणु झुलसा")}</strong>
              <SuitabilityBadge value="not-suitable" />
              <p>
                {t(
                  "Favourable conditions Wed–Thu.",
                  "बुधवार–गुरुवार अनुकूल परिस्थितियां।",
                )}
              </p>
            </div>
            <div>
              <strong>{t("Sheath Blight", "शीथ झुलसा")}</strong>
              <SuitabilityBadge value="caution" />
              <p>
                {t(
                  "Monitor field after rainfall.",
                  "वर्षा के बाद खेत की निगरानी करें।",
                )}
              </p>
            </div>
          </div>
        </section>
        <section className={styles.metricPanel}>
          <h2>
            {t("Operation Planning Guide", "कृषि कार्य योजना मार्गदर्शिका")}
          </h2>
          <div className={styles.tableScroller}>
            <table
              className={`${styles.weatherTable} ${styles.operationMatrix}`}
            >
              <thead>
                <tr>
                  <th>{t("Operation", "कार्य")}</th>
                  {forecastDays.map((day) => (
                    <th key={day.date}>{translateWeatherText(t, day.date)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {operationRows.map((row) => (
                  <tr key={row.operation}>
                    <th>{translateWeatherText(t, row.operation)}</th>
                    {row.values.slice(0, 7).map((value, index) => (
                      <td key={`${row.operation}-${index}`}>
                        <SuitabilityBadge value={value} label={false} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <div className={styles.forecastConfidence}>
        <WeatherAlert />
        <section className={styles.confidenceCard}>
          <div className={styles.confidenceGauge}>85%</div>
          <span>
            <strong>
              {t("Forecast Confidence", "पूर्वानुमान विश्वसनीयता")}
            </strong>
            <small>
              {t(
                "High accuracy for the next 3 days.",
                "अगले 3 दिनों के लिए उच्च सटीकता।",
              )}
            </small>
          </span>
        </section>
      </div>
      <SourceBar />
      <WeatherActions />
    </div>
  );
}
