import Link from "next/link";
import {
  CloudRain,
  CloudSun,
  Filter,
  Leaf,
  Lightbulb,
  Settings,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";

import {
  AdvisoryCard,
  AdvisoryContext,
  AdvisoryHeader,
} from "@/features/advisories/components/advisory-components";
import styles from "@/features/advisories/components/advisories.module.css";
import { advisoryFeed } from "@/features/advisories/data/advisory-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export default async function AdvisoriesPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <AdvisoryHeader
        title={t("My Advisories", "मेरी सलाह")}
        subtitle={t(
          "Personalised advice for your farm",
          "आपके खेत के लिए व्यक्तिगत सलाह",
        )}
      />
      <AdvisoryContext />

      <section className={styles.weatherOverview}>
        <div>
          <span>
            <h2>{t("Stay one step ahead", "एक कदम आगे रहें")}</h2>
            <p>
              {t(
                "Action the right advice at the right time to protect your crop and improve yield.",
                "अपनी फसल की रक्षा और उपज बढ़ाने के लिए सही समय पर सही सलाह पर कार्रवाई करें।",
              )}
            </p>
            <a href="#advisory-feed">
              {t("View Today's Summary", "आज का सारांश देखें")}{" "}
              <CloudSun size={18} />
            </a>
          </span>
        </div>
        <div>
          <CloudSun size={40} />
          <span>
            <strong>32°C</strong>
            <small>{t("Partly Cloudy", "आंशिक बादल")}</small>
          </span>
        </div>
        <div>
          <CloudRain size={36} />
          <span>
            <strong>0.0 mm</strong>
            <small>{t("Rainfall Today", "आज की बारिश")}</small>
          </span>
        </div>
        <div>
          <TrendingUp size={36} />
          <span>
            <strong>12 km/h</strong>
            <small>{t("SW Wind", "दक्षिण-पश्चिमी हवा")}</small>
          </span>
        </div>
      </section>

      <h2 className={styles.feedTitle} id="advisory-feed">
        {t("Advisory Feed", "सलाह फ़ीड")}
      </h2>
      <nav
        className={styles.filterBar}
        aria-label={t("Advisory filters", "सलाह फ़िल्टर")}
      >
        <button type="button">
          <SlidersHorizontal size={16} />
          {t("All (12)", "सभी (12)")}
        </button>
        <button type="button">
          <i className={styles.redDot} aria-hidden="true" />
          {t("High Priority (3)", "उच्च प्राथमिकता (3)")}
        </button>
        <button type="button">
          <Leaf size={16} />
          {t("Crop Care (5)", "फसल देखभाल (5)")}
        </button>
        <button type="button">
          <CloudRain size={16} />
          {t("Weather (3)", "मौसम (3)")}
        </button>
        <button type="button">
          <TrendingUp size={16} />
          {t("Market (1)", "बाजार (1)")}
        </button>
        <Link href="/advisories/categories">
          <Filter size={16} />
          {t("Filter", "फ़िल्टर")}
        </Link>
      </nav>

      <section
        className={styles.advisoryFeed}
        aria-label={t("Personalized advisory feed", "व्यक्तिगत सलाह फ़ीड")}
      >
        {advisoryFeed.map((advisory) => (
          <AdvisoryCard advisory={advisory} key={advisory.slug} />
        ))}
      </section>

      <aside className={styles.tipBar}>
        <Lightbulb size={19} />
        <span>
          <strong>{t("Tip:", "सुझाव:")}</strong>{" "}
          {t(
            "Follow advisories regularly for better crop health and higher yield.",
            "बेहतर फसल स्वास्थ्य और अधिक उपज के लिए नियमित रूप से सलाह का पालन करें।",
          )}
        </span>
        <Link href="/profile">
          <Settings size={17} />
          {t("Manage Preferences", "प्राथमिकताएं प्रबंधित करें")}
        </Link>
      </aside>
    </div>
  );
}
