import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

import {
  CurrentWeatherHero,
  FarmContext,
  SourceBar,
  SuitabilityBadge,
  WeatherActions,
  WeatherAlert,
  WeatherIcon,
  WeatherPageHeader,
} from "@/features/weather/components/weather-components";
import { TemperatureToggle } from "@/features/weather/components/weather-interactions";
import styles from "@/features/weather/components/weather.module.css";
import {
  hourlyForecast,
  operationRows,
  translateWeatherText,
} from "@/features/weather/data/weather-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Hourly Forecast", "प्रति घंटा पूर्वानुमान") };
}

export default async function HourlyForecastPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <WeatherPageHeader
        title={t("Hourly Forecast", "प्रति घंटा पूर्वानुमान")}
        subtitle={t(
          "Plan your farm operations hour by hour",
          "अपने कृषि कार्यों की हर घंटे योजना बनाएं",
        )}
        backHref="/weather"
      />
      <FarmContext
        period={t("Date", "तिथि")}
        periodValue={t("20 May 2024\nTuesday", "20 मई 2024\nमंगलवार")}
      />
      <CurrentWeatherHero />
      <div className={styles.hourlyToolbar}>
        <nav>
          <Link href="/weather/hourly">
            {t("Hourly Forecast", "प्रति घंटा पूर्वानुमान")}
          </Link>
          <Link href="/weather/forecast">{t("Comparison", "तुलना")}</Link>
        </nav>
        <TemperatureToggle />
      </div>
      <div className={styles.tableScroller}>
        <table className={styles.weatherTable}>
          <thead>
            <tr>
              <th>{t("Time", "समय")}</th>
              {hourlyForecast.map((hour) => (
                <th key={hour.time}>{translateWeatherText(t, hour.time)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{t("Weather", "मौसम")}</th>
              {hourlyForecast.map((hour) => (
                <td key={hour.time}>
                  <WeatherIcon kind={hour.weather} />
                </td>
              ))}
            </tr>
            <tr>
              <th>{t("Temp (°C)", "तापमान (°C)")}</th>
              {hourlyForecast.map((hour) => (
                <td
                  className={`${styles.hourlyTemp} ${hour.temperature >= 34 ? styles.hourlyTempHot : ""}`}
                  key={hour.time}
                >
                  {hour.temperature}°
                </td>
              ))}
            </tr>
            <tr>
              <th>{t("Feels Like", "महसूस तापमान")}</th>
              {hourlyForecast.map((hour) => (
                <td key={hour.time}>{hour.feelsLike}°</td>
              ))}
            </tr>
            <tr>
              <th>{t("Rainfall Prob.", "वर्षा संभावना")}</th>
              {hourlyForecast.map((hour) => (
                <td key={hour.time}>{hour.rainChance}%</td>
              ))}
            </tr>
            <tr>
              <th>{t("Rainfall (mm)", "वर्षा (मिमी)")}</th>
              {hourlyForecast.map((hour) => (
                <td key={hour.time}>{hour.rainfall}</td>
              ))}
            </tr>
            <tr>
              <th>{t("Humidity (%)", "आर्द्रता (%)")}</th>
              {hourlyForecast.map((hour) => (
                <td key={hour.time}>{hour.humidity}%</td>
              ))}
            </tr>
            <tr>
              <th>{t("Wind (km/h)", "हवा (किमी/घंटा)")}</th>
              {hourlyForecast.map((hour) => (
                <td key={hour.time}>{translateWeatherText(t, hour.wind)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <section className={`${styles.panel} ${styles.suitabilityTable}`}>
        <div className={styles.sectionHeading}>
          <h2>
            {t("Operation Suitability", "कार्य उपयुक्तता")}{" "}
            <small>
              {t(
                "(Based on weather conditions)",
                "(मौसम की स्थिति के आधार पर)",
              )}
            </small>
          </h2>
        </div>
        <div className={styles.tableScroller}>
          <table className={styles.weatherTable}>
            <tbody>
              {operationRows.map((row) => (
                <tr key={row.operation}>
                  <th>{translateWeatherText(t, row.operation)}</th>
                  {row.values.map((value, index) => (
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
      <div className={styles.callout}>
        <span>
          <strong>
            {t(
              "Best time for pesticide spraying: 7:00 AM – 11:00 AM",
              "कीटनाशक छिड़काव का सर्वोत्तम समय: सुबह 7:00 – 11:00",
            )}
          </strong>
          <small>
            {t(
              "Low wind speed and no rainfall expected.",
              "हवा की गति कम है और वर्षा की संभावना नहीं है।",
            )}
          </small>
        </span>
        <Link href="/weather/operations">
          <Leaf size={18} />
          {t("View Agro Advisory", "कृषि मौसम सलाह देखें")}{" "}
          <ArrowRight size={18} />
        </Link>
      </div>
      <WeatherAlert />
      <SourceBar />
      <WeatherActions advisory={false} />
    </div>
  );
}
