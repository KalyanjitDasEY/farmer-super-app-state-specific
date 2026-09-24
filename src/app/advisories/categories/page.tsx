import Link from "next/link";
import {
  Bug,
  ChevronRight,
  CloudRain,
  Filter,
  FlaskConical,
  MessageCircleMore,
  Search,
  Sprout,
} from "lucide-react";

import {
  AdvisoryContext,
  AdvisoryHeader,
} from "@/features/advisories/components/advisory-components";
import styles from "@/features/advisories/components/advisories.module.css";
import {
  advisoryText,
  advisoryCategories,
  advisoryFeed,
} from "@/features/advisories/data/advisory-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

const trendingIcons = [Bug, Sprout, CloudRain, FlaskConical, Bug] as const;

export default async function AdvisoryCategoriesPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <AdvisoryHeader
        title={t("Advisory Categories", "सलाह श्रेणियां")}
        subtitle={t(
          "Find the right advice for your need",
          "अपनी जरूरत के लिए सही सलाह पाएं",
        )}
        backHref="/advisories"
      />
      <AdvisoryContext />

      <section
        className={styles.searchRow}
        aria-label={t("Search advisory categories", "सलाह श्रेणियां खोजें")}
      >
        <label className={styles.searchBox}>
          <Search size={20} />
          <input
            type="search"
            placeholder={t(
              "Search categories, e.g., irrigation, leaf blast, nitrogen...",
              "श्रेणियां खोजें, जैसे सिंचाई, पत्ती झुलसा, नाइट्रोजन...",
            )}
          />
        </label>
        <button type="button">
          <Filter size={18} />
          {t("Filter", "फ़िल्टर")}
        </button>
      </section>

      <h2 className={styles.sectionHeading}>
        {t("Browse by Category", "श्रेणी से देखें")}
      </h2>
      <section className={styles.categoryGrid}>
        {advisoryCategories.map(
          ({ title, description, count, tone, icon: Icon }) => (
            <Link
              className={`${styles.categoryCard} ${styles[tone]}`}
              href="/advisories"
              key={title}
            >
              <span>
                <Icon size={28} />
              </span>
              <span>
                <h2>{t(advisoryText(title))}</h2>
                <p>{t(advisoryText(description))}</p>
              </span>
              <strong>
                {count} {t("Advisories", "सलाह")}
              </strong>
              <ChevronRight size={20} />
            </Link>
          ),
        )}
      </section>

      <h2 className={styles.sectionHeading}>
        {t("Trending Right Now", "अभी प्रचलित")}
      </h2>
      <section className={styles.trendingRow}>
        {advisoryFeed.slice(0, 5).map((advisory, index) => {
          const Icon = trendingIcons[index] ?? Bug;
          return (
            <Link
              className={`${styles.trendingCard} ${styles[advisory.tone]}`}
              href={index === 0 ? "/advisories/leaf-blast" : "/advisories"}
              key={advisory.slug}
            >
              <span>
                <Icon size={20} />
              </span>
              <span>
                <strong>{t(advisoryText(advisory.title))}</strong>
                <small>{t(advisoryText(advisory.label))}</small>
              </span>
            </Link>
          );
        })}
      </section>

      <aside className={styles.askBanner}>
        <span>
          <h2>
            {t("Can't find what you need?", "आपको जो चाहिए वह नहीं मिला?")}
          </h2>
          <p>
            {t(
              "Ask Bharati for personalised guidance for your crop and field.",
              "अपनी फसल और खेत के लिए व्यक्तिगत मार्गदर्शन हेतु भारती से पूछें।",
            )}
          </p>
        </span>
        <Link href="/more#help">
          <MessageCircleMore size={20} />
          {t("Ask Bharati", "भारती से पूछें")}
          <ChevronRight size={19} />
        </Link>
      </aside>
    </div>
  );
}
