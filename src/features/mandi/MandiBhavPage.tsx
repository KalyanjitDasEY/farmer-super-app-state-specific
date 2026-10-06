"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BarChart3,
  Clock3,
  Headphones,
  Info,
  MapPin,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useLocale } from "@/i18n/LocaleProvider";

import styles from "./mandi.module.css";

type MarketRow = {
  name: string;
  nameHi: string;
  price: number;
  range: string;
  msp: number;
  change: number;
  percent: number;
  updatedAt: string;
  trend: "up" | "down";
};

const marketRows: readonly MarketRow[] = [
  {
    name: "Patna Mandi",
    nameHi: "पटना मंडी",
    price: 2275,
    range: "2,240 – 2,310",
    msp: 2275,
    change: 35,
    percent: 1.56,
    updatedAt: "11:25 AM",
    trend: "up",
  },
  {
    name: "Muzaffarpur Mandi",
    nameHi: "मुजफ्फरपुर मंडी",
    price: 2265,
    range: "2,230 – 2,300",
    msp: 2275,
    change: 25,
    percent: 1.12,
    updatedAt: "11:20 AM",
    trend: "up",
  },
  {
    name: "Gaya Mandi",
    nameHi: "गया मंडी",
    price: 2250,
    range: "2,210 – 2,290",
    msp: 2275,
    change: 10,
    percent: 0.45,
    updatedAt: "11:15 AM",
    trend: "up",
  },
  {
    name: "Bhagalpur Mandi",
    nameHi: "भागलपुर मंडी",
    price: 2280,
    range: "2,250 – 2,320",
    msp: 2275,
    change: 40,
    percent: 1.79,
    updatedAt: "11:10 AM",
    trend: "up",
  },
  {
    name: "Darbhanga Mandi",
    nameHi: "दरभंगा मंडी",
    price: 2260,
    range: "2,220 – 2,300",
    msp: 2275,
    change: -5,
    percent: -0.22,
    updatedAt: "11:05 AM",
    trend: "down",
  },
];

const cropFilters = [
  ["all", "All Crops", "सभी फसलें", "🌱"],
  ["wheat", "Wheat", "गेहूं", "🌾"],
  ["paddy", "Paddy", "धान", "🌾"],
  ["mustard", "Mustard", "सरसों", "🌼"],
  ["gram", "Gram", "चना", "🫛"],
  ["maize", "Maize", "मक्का", "🌽"],
] as const;

const cropLabels: Record<string, readonly [string, string]> = {
  all: ["Wheat", "गेहूं"],
  wheat: ["Wheat", "गेहूं"],
  paddy: ["Paddy", "धान"],
  mustard: ["Mustard", "सरसों"],
  gram: ["Gram", "चना"],
  maize: ["Maize", "मक्का"],
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function TrendSparkline({ direction }: { direction: "up" | "down" }) {
  const { t } = useLocale();
  const points =
    direction === "up"
      ? "2,24 11,15 19,20 29,8 39,14 50,3"
      : "2,8 12,20 22,10 32,23 42,16 50,19";

  return (
    <svg
      className={direction === "up" ? styles.trendUp : styles.trendDown}
      viewBox="0 0 52 27"
      role="img"
      aria-label={
        direction === "up"
          ? t("Rising price trend", "बढ़ती कीमत का रुझान")
          : t("Falling price trend", "घटती कीमत का रुझान")
      }
    >
      <polyline points={points} />
      {direction === "up" ? <path d="M44 3h6v6" /> : null}
    </svg>
  );
}

export function MandiBhavPage({
  homeHref,
  title,
  subtitle,
}: {
  homeHref: string;
  title: string;
  subtitle: string;
}) {
  const { t } = useLocale();
  const [market, setMarket] = useState(marketRows[0]?.name ?? "");
  const [crop, setCrop] = useState("wheat");
  const [activeCropFilter, setActiveCropFilter] = useState("all");
  const [quality, setQuality] = useState("faq");

  const selectedMarket = useMemo(
    () => marketRows.find((item) => item.name === market) ?? marketRows[0],
    [market],
  );

  if (!selectedMarket) {
    throw new Error("No mandi market data is configured.");
  }

  const selectedCropLabel = cropLabels[crop] ?? ["Wheat", "गेहूं"];
  const cropLabel = t(selectedCropLabel[0], selectedCropLabel[1]);
  const isPositive = selectedMarket.change >= 0;

  return (
    <div className={styles.page}>
      <nav
        className={styles.breadcrumbs}
        aria-label={t("Breadcrumb", "ब्रेडक्रंब")}
      >
        <a href={homeHref}>{t("Home", "होम")}</a>
        <span>›</span>
        <span>{t("Market", "बाजार")}</span>
        <span>›</span>
        <strong>{title}</strong>
        <a className={styles.backHome} href={homeHref}>
          <ArrowLeft size={18} aria-hidden="true" />
          {t("Back to Home", "होम पर वापस")}
        </a>
      </nav>

      <section className={styles.titleRow}>
        <div className={styles.titleBlock}>
          <span className={styles.titleIcon}>
            <BarChart3 size={40} aria-hidden="true" />
          </span>
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <span>
              {t(
                "Illustrative Bihar market data • Not live rates",
                "बिहार मंडियों के सांकेतिक आंकड़े • लाइव भाव नहीं",
              )}
            </span>
          </div>
        </div>
        <aside className={styles.liveCard}>
          <strong>
            <i aria-hidden="true" />
            {t("Demo Prices", "डेमो भाव")}
          </strong>
          <span>
            {t(
              "Compare sample mandi prices; confirm current rates officially",
              "नमूना मंडी भाव देखें; वर्तमान भाव आधिकारिक स्रोत से जांचें",
            )}
          </span>
          <p>
            <b>{t("Sample date:", "नमूना तिथि:")}</b>{" "}
            {t("21 May 2024", "21 मई 2024")}
          </p>
        </aside>
      </section>

      <section
        className={styles.filters}
        aria-label={t("Market filters", "बाजार फिल्टर")}
      >
        <label>
          {t("Select Market (Mandi)", "बाजार (मंडी) चुनें")}
          <select
            value={market}
            onChange={(event) => setMarket(event.target.value)}
          >
            {marketRows.map((item) => (
              <option key={item.name} value={item.name}>
                {t(item.name, item.nameHi)}, {t("Bihar", "बिहार")}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t("Select Crop", "फसल चुनें")}
          <select
            value={crop}
            onChange={(event) => {
              setCrop(event.target.value);
              setActiveCropFilter(event.target.value);
            }}
          >
            {cropFilters.slice(1).map(([value, label, hindiLabel]) => (
              <option key={value} value={value}>
                {t(label, hindiLabel)}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t("Select Quality", "गुणवत्ता चुनें")}
          <select
            value={quality}
            onChange={(event) => setQuality(event.target.value)}
          >
            <option value="faq">
              {t("FAQ (Fair Average Quality)", "एफएक्यू (उचित औसत गुणवत्ता)")}
            </option>
            <option value="premium">
              {t("Premium Quality", "प्रीमियम गुणवत्ता")}
            </option>
            <option value="standard">
              {t("Standard Quality", "मानक गुणवत्ता")}
            </option>
          </select>
        </label>
        <a href="https://agmarknet.gov.in/">
          {t("Check Official Rates", "आधिकारिक भाव देखें")}
        </a>
      </section>

      <section
        className={styles.summaryGrid}
        aria-label={t(
          `${cropLabel} price summary`,
          `${cropLabel} की कीमत का सारांश`,
        )}
      >
        <article>
          <span className={`${styles.summaryIcon} ${styles.priceIcon}`}>₹</span>
          <div>
            <small>{t("Current Price", "वर्तमान कीमत")}</small>
            <strong>
              ₹ {formatPrice(selectedMarket.price)}{" "}
              <em>{t("/ Quintal", "/ क्विंटल")}</em>
            </strong>
            <span>{t("(Indicative)", "(सांकेतिक)")}</span>
          </div>
        </article>
        <article>
          <span className={styles.summaryIcon}>
            <ArrowUp size={29} aria-hidden="true" />
            <ArrowDown size={29} aria-hidden="true" />
          </span>
          <div>
            <small>{t("Price Range", "कीमत सीमा")}</small>
            <strong>₹ {selectedMarket.range}</strong>
            <span>{t("/ Quintal", "/ क्विंटल")}</span>
          </div>
        </article>
        <article>
          <span className={`${styles.summaryIcon} ${styles.mspIcon}`}>₹</span>
          <div>
            <small>
              {t(
                "Example wheat MSP (2024-25)",
                "गेहूं का उदाहरण एमएसपी (2024-25)",
              )}
            </small>
            <strong>
              {crop === "wheat" ? `₹ ${formatPrice(selectedMarket.msp)}` : "—"}
            </strong>
            <span>{t("/ Quintal", "/ क्विंटल")}</span>
          </div>
        </article>
        <article>
          <span className={styles.summaryIcon}>
            <TrendingUp size={31} aria-hidden="true" />
          </span>
          <div>
            <small>{t("Price Movement", "कीमत में बदलाव")}</small>
            <strong className={isPositive ? styles.positive : styles.negative}>
              {isPositive ? "▲" : "▼"} {Math.abs(selectedMarket.change)} (
              {Math.abs(selectedMarket.percent).toFixed(2)}%)
            </strong>
            <span>{t("vs Yesterday", "कल की तुलना में")}</span>
          </div>
        </article>
      </section>

      <aside className={styles.infoBanner}>
        <Info size={21} aria-hidden="true" />
        <span>
          {t(
            "Prices are indicative and may vary at the time of actual transaction.",
            "कीमतें सांकेतिक हैं और वास्तविक लेन-देन के समय बदल सकती हैं।",
          )}
          <strong>
            {t(
              "Always check with the respective mandi before selling.",
              "बेचने से पहले संबंधित मंडी से कीमत अवश्य जांच लें।",
            )}
          </strong>
        </span>
      </aside>

      <section className={styles.marketTableCard}>
        <h2>
          {t("Prices in Other Mandis", "अन्य मंडियों में कीमतें")} ({cropLabel}{" "}
          -{" "}
          {quality === "faq"
            ? t("FAQ", "एफएक्यू")
            : quality === "premium"
              ? t("Premium", "प्रीमियम")
              : t("Standard", "मानक")}
          )
        </h2>
        <div className={styles.tableScroll}>
          <table>
            <thead>
              <tr>
                <th>{t("Mandi (Market)", "मंडी (बाजार)")}</th>
                <th>
                  {t("Current Price", "वर्तमान कीमत")}
                  <br />
                  {t("(₹/Quintal)", "(₹/क्विंटल)")}
                </th>
                <th>
                  {t("Price Range", "कीमत सीमा")}
                  <br />
                  {t("(₹/Quintal)", "(₹/क्विंटल)")}
                </th>
                <th>
                  {t("Example wheat MSP", "गेहूं का उदाहरण एमएसपी")}
                  <br />
                  {t("(₹/Quintal)", "(₹/क्विंटल)")}
                </th>
                <th>
                  {t("Movement", "बदलाव")}
                  <br />
                  {t("(vs Yesterday)", "(कल की तुलना में)")}
                </th>
                <th>{t("Sample Time", "नमूना समय")}</th>
                <th>{t("Trend", "रुझान")}</th>
              </tr>
            </thead>
            <tbody>
              {marketRows.map((row) => (
                <tr
                  className={
                    row.name === selectedMarket.name ? styles.selectedRow : ""
                  }
                  key={row.name}
                >
                  <td>
                    <MapPin size={18} aria-hidden="true" />
                    {t(row.name, row.nameHi)}
                  </td>
                  <td>
                    <strong>₹ {formatPrice(row.price)}</strong>
                  </td>
                  <td>{row.range}</td>
                  <td>{crop === "wheat" ? formatPrice(row.msp) : "—"}</td>
                  <td
                    className={
                      row.change >= 0 ? styles.positive : styles.negative
                    }
                  >
                    {row.change >= 0 ? "▲" : "▼"} {Math.abs(row.change)} (
                    {Math.abs(row.percent).toFixed(2)}%)
                  </td>
                  <td>{row.updatedAt}</td>
                  <td>
                    <TrendSparkline direction={row.trend} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className={styles.moreMandis} type="button">
          {t("View More Mandis", "और मंडियां देखें")}
          <span aria-hidden="true">⌄</span>
        </button>
      </section>

      <section className={styles.supportGrid}>
        <article className={styles.aboutCard}>
          <h2>{t("About Prices", "कीमतों के बारे में")}</h2>
          <ul>
            <li>
              <span>₹</span>
              {t(
                "Prices shown are fictional examples, not collected from ",
                "दिखाए गए भाव काल्पनिक उदाहरण हैं, इनसे प्राप्त नहीं किए गए हैं: ",
              )}
              <strong>
                {t(
                  "AGMARKNET & State Mandi Boards.",
                  "एगमार्कनेट और राज्य मंडी बोर्ड।",
                )}
              </strong>
            </li>
            <li>
              <Clock3 size={18} aria-hidden="true" />
              {t(
                "Sample prices do not update automatically.",
                "नमूना भाव अपने आप अपडेट नहीं होते।",
              )}
            </li>
            <li>
              <ShieldCheck size={18} aria-hidden="true" />
              {t(
                "The example wheat MSP is historical; consult official sources for current crop-specific MSP.",
                "उदाहरण के गेहूं एमएसपी का आंकड़ा पुराना है; वर्तमान फसल-विशिष्ट एमएसपी आधिकारिक स्रोत से जांचें।",
              )}
            </li>
            <li>
              <Info size={18} aria-hidden="true" />
              {t(
                "Actual prices may vary based on quality, demand, supply and other factors.",
                "वास्तविक कीमतें गुणवत्ता, मांग, आपूर्ति और अन्य कारकों के आधार पर बदल सकती हैं।",
              )}
            </li>
          </ul>
        </article>

        <article className={styles.quickFilters}>
          <h2>{t("Quick Filters", "त्वरित फिल्टर")}</h2>
          <div>
            {cropFilters.map(([value, label, hindiLabel, emoji]) => (
              <button
                className={activeCropFilter === value ? styles.activeCrop : ""}
                key={value}
                type="button"
                onClick={() => {
                  setActiveCropFilter(value);
                  if (value !== "all") {
                    setCrop(value);
                  }
                }}
              >
                <span aria-hidden="true">{emoji}</span>
                {t(label, hindiLabel)}
              </button>
            ))}
          </div>
        </article>

        <article className={styles.helpCard} id="help">
          <Headphones size={28} aria-hidden="true" />
          <h2>{t("Need Help?", "सहायता चाहिए?")}</h2>
          <p>
            {t(
              "Ask Krishi Mitra for any help related to mandi prices.",
              "मंडी कीमतों से जुड़ी किसी भी सहायता के लिए कृषि मित्र से पूछें।",
            )}
          </p>
          <a href="#help">
            <Headphones size={18} aria-hidden="true" />
            {t("Chat with Krishi Mitra", "कृषि मित्र से चैट करें")}
          </a>
        </article>
      </section>
    </div>
  );
}
