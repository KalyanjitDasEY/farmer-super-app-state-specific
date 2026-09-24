"use client";

import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Cloud,
  CloudRain,
  CloudSun,
  Droplets,
  Gauge,
  House,
  Leaf,
  MapPin,
  RefreshCw,
  Sprout,
  Sun,
  Sunrise,
  Sunset,
  Wind,
  X,
} from "lucide-react";

import { withBasePath } from "@/config/base-path";
import type {
  ForecastDay,
  Suitability,
  WeatherKind,
} from "@/features/weather/data/weather-data";
import { translateWeatherText } from "@/features/weather/data/weather-data";
import { useLocale } from "@/i18n/LocaleProvider";

import styles from "./weather.module.css";

const weatherEmoji: Record<WeatherKind, string> = {
  storm: "⛈️",
  rain: "🌧️",
  cloudy: "☁️",
  "partly-cloudy": "🌤️",
  sunny: "☀️",
  night: "🌙",
};

export function WeatherPageHeader({
  title,
  subtitle,
  backHref,
}: {
  title: string;
  subtitle: string;
  backHref?: string;
}) {
  const { t } = useLocale();
  return (
    <div className={styles.pageHeader}>
      {backHref ? (
        <Link href={backHref} aria-label={t("Go back", "वापस जाएं")}>
          <ArrowLeft size={22} />
        </Link>
      ) : null}
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export function FarmContext({
  period,
  periodValue,
}: {
  period?: string;
  periodValue?: string;
}) {
  const { t } = useLocale();
  const resolvedPeriod = period ?? t("Last Updated", "अंतिम अपडेट");
  const resolvedPeriodValue =
    periodValue ?? t("20 May 2024\n09:30 AM", "20 मई 2024\nसुबह 09:30");
  const items = [
    {
      label: t("Selected Farm", "चुना गया खेत"),
      value: t(
        "Ram Prasad Farm\nField 1 • 2.50 Acre\nPusa Basmati 1121",
        "राम प्रसाद खेत\nखेत 1 • 2.50 एकड़\nपूसा बासमती 1121",
      ),
      icon: House,
    },
    {
      label: t("Location", "स्थान"),
      value: t(
        "Raipur, Deoria\nUttar Pradesh\n274 km away",
        "रायपुर, देवरिया\nउत्तर प्रदेश\n274 किमी दूर",
      ),
      icon: MapPin,
    },
    {
      label: t("Crop Stage", "फसल अवस्था"),
      value: t(
        "Tillering Stage\n25–30 DAT",
        "कल्ले निकलने की अवस्था\n25–30 DAT",
      ),
      icon: Sprout,
    },
    {
      label: resolvedPeriod,
      value: resolvedPeriodValue,
      icon: CalendarDays,
    },
  ];
  return (
    <section
      className={styles.farmContext}
      aria-label={t("Farm and forecast context", "खेत और पूर्वानुमान संदर्भ")}
    >
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label}>
          <Icon size={25} />
          <span>
            <small>{label}</small>
            {value.split("\n").map((line) => (
              <strong key={line}>{line}</strong>
            ))}
          </span>
        </div>
      ))}
    </section>
  );
}

export function CurrentWeatherHero({
  detailed = false,
}: {
  detailed?: boolean;
}) {
  const { t } = useLocale();
  return (
    <section
      className={styles.currentHero}
      style={
        {
          "--weather-field-image": `url("${withBasePath(
            "/images/authenticated/weather/weather-field.jpg",
          )}")`,
        } as CSSProperties
      }
    >
      <div className={styles.currentSummary}>
        <span>{detailed ? t("Right Now", "अभी") : t("Now", "अभी")}</span>
        <strong>32°C</strong>
        <b>{t("Partly Cloudy", "आंशिक बादल")}</b>
        <small>
          {t("Feels like 36°C", "महसूस 36°C")}{" "}
          {detailed
            ? ""
            : t(
                " ·  H: 34°C  ·  L: 24°C",
                " ·  अधिकतम: 34°C  ·  न्यूनतम: 24°C",
              )}
        </small>
      </div>
      <div className={styles.heroWeatherIcon}>🌤️</div>
      <dl className={styles.heroMetrics}>
        <div>
          <dt>
            <Droplets size={20} />
            {t("Humidity", "आर्द्रता")}
          </dt>
          <dd>68%</dd>
        </div>
        <div>
          <dt>
            <Wind size={20} />
            {t("Wind", "हवा")}
          </dt>
          <dd>12 km/h (SW)</dd>
        </div>
        {detailed ? (
          <div>
            <dt>
              <Gauge size={20} />
              {t("Visibility", "दृश्यता")}
            </dt>
            <dd>8 km</dd>
          </div>
        ) : (
          <div>
            <dt>
              <CloudRain size={20} />
              {t("Rainfall Today", "आज की वर्षा")}
            </dt>
            <dd>0.0 mm</dd>
          </div>
        )}
        <div>
          <dt>
            <Gauge size={20} />
            {t("Pressure", "वायुदाब")}
          </dt>
          <dd>1006 hPa</dd>
        </div>
      </dl>
    </section>
  );
}

export function WeatherAlert({ compact = false }: { compact?: boolean }) {
  const { t } = useLocale();
  return (
    <section
      className={`${styles.alertCard} ${compact ? styles.compactAlert : ""}`}
    >
      <AlertTriangle size={28} />
      <div>
        <strong>{t("Weather Alert", "मौसम चेतावनी")}</strong>
        <p>
          {t(
            "Thunderstorm with lightning likely this evening (4 PM – 8 PM). Avoid spraying pesticides and irrigation during this time.",
            "आज शाम (4 बजे – 8 बजे) बिजली के साथ आंधी की संभावना है। इस दौरान कीटनाशक छिड़काव और सिंचाई से बचें।",
          )}
        </p>
      </div>
      <Link href="/weather/today">
        {t("View Alert Details", "चेतावनी विवरण देखें")}{" "}
        <ArrowRight size={18} />
      </Link>
    </section>
  );
}

export function ForecastStrip({
  days,
  heading,
}: {
  days: readonly ForecastDay[];
  heading?: string;
}) {
  const { t } = useLocale();
  const resolvedHeading =
    heading ?? t("7-Day Weather Forecast", "7-दिन का मौसम पूर्वानुमान");
  return (
    <section className={styles.panel}>
      <div className={styles.sectionHeading}>
        <h2>{resolvedHeading}</h2>
        <Link href="/weather/forecast">
          {t("View Full Forecast", "पूरा पूर्वानुमान देखें")}{" "}
          <ArrowRight size={17} />
        </Link>
      </div>
      <div className={styles.forecastStrip}>
        {days.map((day, index) => (
          <article
            className={index === 0 ? styles.activeForecast : ""}
            key={day.date}
          >
            <strong>{translateWeatherText(t, day.day)}</strong>
            <small>{translateWeatherText(t, day.date)}</small>
            <span
              className={styles.weatherEmoji}
              aria-label={weatherKindLabel(t, day.weather)}
            >
              {weatherEmoji[day.weather]}
            </span>
            <b>
              {day.high}° <em>{day.low}°</em>
            </b>
            <span>
              <Droplets size={14} /> {day.rainChance}%
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SuitabilityBadge({
  value,
  label = true,
}: {
  value: Suitability;
  label?: boolean;
}) {
  const { t } = useLocale();
  const text =
    value === "suitable"
      ? t("Suitable", "उपयुक्त")
      : value === "caution"
        ? t("Use Caution", "सावधानी रखें")
        : t("Not Suitable", "अनुपयुक्त");
  return (
    <span className={`${styles.suitability} ${styles[value]}`} title={text}>
      {value === "suitable" ? (
        <Check size={12} />
      ) : value === "caution" ? (
        <AlertTriangle size={12} />
      ) : (
        <X size={12} />
      )}
      {label ? text : null}
    </span>
  );
}

export function SourceBar({ advisory = false }: { advisory?: boolean }) {
  const { t } = useLocale();
  return (
    <div className={styles.sourceBar}>
      <span>
        {t("Source:", "स्रोत:")}{" "}
        {advisory
          ? t(
              "IMD + ICAR Agromet Advisory Service",
              "IMD + ICAR कृषि मौसम सलाह सेवा",
            )
          : t(
              "IMD (India Meteorological Department)",
              "IMD (भारत मौसम विज्ञान विभाग)",
            )}
      </span>
      <span>
        {t(
          "Last updated: 20 May 2024, 08:30 AM",
          "अंतिम अपडेट: 20 मई 2024, सुबह 08:30",
        )}
      </span>
      <span>
        <RefreshCw size={15} />{" "}
        {t("Auto refresh in 59 min", "59 मिनट में स्वतः रीफ्रेश")}
      </span>
    </div>
  );
}

export function WeatherActions({ advisory = true }: { advisory?: boolean }) {
  const { t } = useLocale();
  return (
    <div className={styles.actionRow}>
      <Link href="/weather/forecast">
        <CalendarDays size={19} />
        {t("7-Day Forecast", "7-दिन का पूर्वानुमान")}
      </Link>
      <Link href="/weather/hourly">
        <Gauge size={19} />
        {t("Hourly Forecast", "प्रति घंटा पूर्वानुमान")}
      </Link>
      <Link href="/more">
        <Bell size={19} />
        {t("Weather Alerts", "मौसम चेतावनियां")}
      </Link>
      {advisory ? (
        <Link className={styles.primaryAction} href="/weather/advisory">
          <Leaf size={19} />
          {t("View Agro Advisory", "कृषि मौसम सलाह देखें")}{" "}
          <ArrowRight size={18} />
        </Link>
      ) : null}
    </div>
  );
}

export function RainfallBars({
  values = [0, 8.5, 12.3, 5, 2.1, 0.7],
}: {
  values?: readonly number[];
}) {
  const { t } = useLocale();
  const max = Math.max(...values, 1);
  const labels = ["Today", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className={styles.barChart}>
      {values.map((value, index) => (
        <span key={`${labels[index]}-${value}`}>
          <b style={{ height: `${Math.max((value / max) * 100, 5)}%` }} />
          <strong>{value}</strong>
          <small>{translateWeatherText(t, labels[index] ?? "")}</small>
        </span>
      ))}
    </div>
  );
}

export function TemperatureTrend({ days }: { days: readonly ForecastDay[] }) {
  const { t } = useLocale();
  const chartWidth = 700;
  const horizontalPadding = 42;
  const plotTop = 22;
  const plotBottom = 112;
  const minimumTemperature = 20;
  const maximumTemperature = 40;
  const xForIndex = (index: number) =>
    days.length === 1
      ? chartWidth / 2
      : horizontalPadding +
        (index * (chartWidth - horizontalPadding * 2)) / (days.length - 1);
  const yForTemperature = (temperature: number) =>
    plotTop +
    ((maximumTemperature - temperature) /
      (maximumTemperature - minimumTemperature)) *
      (plotBottom - plotTop);
  const maximumPoints = days
    .map((day, index) => `${xForIndex(index)},${yForTemperature(day.high)}`)
    .join(" ");
  const minimumPoints = days
    .map((day, index) => `${xForIndex(index)},${yForTemperature(day.low)}`)
    .join(" ");

  return (
    <div className={styles.temperatureTrend}>
      <svg
        viewBox={`0 0 ${chartWidth} 170`}
        role="img"
        aria-label={t(
          "Maximum and minimum temperature trend",
          "अधिकतम और न्यूनतम तापमान का रुझान",
        )}
      >
        <polyline className={styles.maximumTrendLine} points={maximumPoints} />
        <polyline className={styles.minimumTrendLine} points={minimumPoints} />
        {days.map((day, index) => {
          const x = xForIndex(index);
          const maximumY = yForTemperature(day.high);
          const minimumY = yForTemperature(day.low);
          return (
            <g key={day.date}>
              <text
                className={styles.maximumTrendLabel}
                x={x}
                y={maximumY - 11}
              >
                {day.high}°
              </text>
              <circle
                className={styles.maximumTrendPoint}
                cx={x}
                cy={maximumY}
                r="5"
              />
              <circle
                className={styles.minimumTrendPoint}
                cx={x}
                cy={minimumY}
                r="5"
              />
              <text
                className={styles.minimumTrendLabel}
                x={x}
                y={minimumY + 18}
              >
                {day.low}°
              </text>
              <text className={styles.trendDayLabel} x={x} y="158">
                {translateWeatherText(t, day.day)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function WeatherIcon({ kind }: { kind: WeatherKind }) {
  const { t } = useLocale();
  return (
    <span
      className={styles.weatherEmoji}
      aria-label={weatherKindLabel(t, kind)}
    >
      {weatherEmoji[kind]}
    </span>
  );
}

export function OverviewQuickLinks() {
  const { t } = useLocale();
  return (
    <div className={styles.quickLinks}>
      <Link href="/weather/hourly">
        <Image
          src="/images/authenticated/weather/radar-preview.jpg"
          width={56}
          height={72}
          alt=""
        />
        <span>
          <strong>{t("Radar Map", "रडार मानचित्र")}</strong>
          <small>
            {t("See live rainfall movement", "वर्षा की लाइव गतिविधि देखें")}
          </small>
        </span>
        <ChevronRight />
      </Link>
      <Link href="/weather/forecast">
        <CloudRain />
        <span>
          <strong>{t("Rainfall History", "वर्षा इतिहास")}</strong>
          <small>
            {t(
              "View past rainfall in your area",
              "अपने क्षेत्र की पिछली वर्षा देखें",
            )}
          </small>
        </span>
        <ChevronRight />
      </Link>
      <Link href="/weather/operations">
        <CalendarDays />
        <span>
          <strong>{t("Weather & Crop Calendar", "मौसम और फसल कैलेंडर")}</strong>
          <small>
            {t(
              "Plan farm operations with weather",
              "मौसम के अनुसार कृषि कार्यों की योजना बनाएं",
            )}
          </small>
        </span>
        <ChevronRight />
      </Link>
      <Link href="/more">
        <Bell />
        <span>
          <strong>{t("My Alerts", "मेरी चेतावनियां")}</strong>
          <small>
            {t("Manage weather alerts", "मौसम चेतावनियां प्रबंधित करें")}
          </small>
        </span>
        <ChevronRight />
      </Link>
    </div>
  );
}

export const iconSet = {
  Cloud,
  CloudRain,
  CloudSun,
  Droplets,
  Gauge,
  Leaf,
  Sun,
  Sunrise,
  Sunset,
  Wind,
};

function weatherKindLabel(
  t: ReturnType<typeof useLocale>["t"],
  kind: WeatherKind,
) {
  const labels: Record<WeatherKind, [string, string]> = {
    storm: ["Storm", "आंधी"],
    rain: ["Rain", "वर्षा"],
    cloudy: ["Cloudy", "बादल"],
    "partly-cloudy": ["Partly cloudy", "आंशिक बादल"],
    sunny: ["Sunny", "धूप"],
    night: ["Night", "रात"],
  };
  return t(...labels[kind]);
}
