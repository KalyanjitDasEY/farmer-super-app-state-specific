import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  BotMessageSquare,
  ChevronDown,
  Info,
  Leaf,
  Search,
} from "lucide-react";

import {
  DeficiencyCard,
  NutriCheckHeader,
  NutriContext,
  NutrientBadge,
  SectionTitle,
} from "@/features/nutricheck/components/nutricheck-components";
import styles from "@/features/nutricheck/components/nutricheck.module.css";
import {
  deficiencies,
  nutriText,
  nutrients,
} from "@/features/nutricheck/data/nutricheck-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Crop Deficiency Library", "फसल कमी लाइब्रेरी") };
}

export default async function NutriCheckLibraryPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <NutriCheckHeader
        title={t("Crop Deficiency Library", "फसल कमी लाइब्रेरी")}
        subtitle={t(
          "Identify and understand nutrient deficiencies in your crop",
          "अपनी फसल में पोषक तत्वों की कमी पहचानें और समझें",
        )}
        backHref="/nutricheck"
      />
      <NutriContext selectable />

      <div className={styles.searchToolbar}>
        <label className={styles.searchBox}>
          <Search size={20} />
          <span className="sr-only">
            {t("Search deficiencies", "कमियां खोजें")}
          </span>
          <input
            type="search"
            placeholder={t(
              "Search by nutrient or symptom",
              "पोषक तत्व या लक्षण से खोजें",
            )}
          />
        </label>
        <button className={styles.filterButton} type="button">
          <BarChart3 size={19} />{" "}
          {t("Compare Nutrients", "पोषक तत्वों की तुलना करें")}
        </button>
        <button className={styles.filterButton} type="button">
          A to Z <ChevronDown size={17} />
        </button>
      </div>

      <div className={styles.nutrientFilters}>
        <button
          className={`${styles.nutrientFilter} ${styles.allFilter}`}
          type="button"
        >
          {t("All", "सभी")}
        </button>
        {nutrients.map((nutrient) => (
          <button
            className={styles.nutrientFilter}
            type="button"
            key={nutrient.name}
          >
            <NutrientBadge
              symbol={nutrient.symbol}
              tone={nutrient.tone}
              small
            />
            {t(nutriText(nutrient.name))}
          </button>
        ))}
        <button className={styles.nutrientFilter} type="button">
          <Leaf size={20} />
          {t("More Filters", "और फ़िल्टर")}
        </button>
      </div>

      <aside className={styles.infoBar}>
        <Info size={21} />
        {t(
          "These are nutrient deficiency problems commonly observed in Paddy (Rice).",
          "ये पोषक तत्व कमी की समस्याएं धान में सामान्यतः देखी जाती हैं।",
        )}
      </aside>

      <section className={styles.panel}>
        <SectionTitle>
          {t("Deficiency Library (18)", "कमी लाइब्रेरी (18)")}
        </SectionTitle>
        <div className={styles.libraryList}>
          {deficiencies.map((deficiency) => (
            <DeficiencyCard deficiency={deficiency} key={deficiency.title} />
          ))}
        </div>
      </section>

      <aside className={styles.sourceBar}>
        <Info size={22} />
        <span>
          <strong>
            {t(
              "Recommendations follow ICAR-approved nutrient management guidance.",
              "सिफारिशें ICAR-अनुमोदित पोषक प्रबंधन मार्गदर्शन का पालन करती हैं।",
            )}
          </strong>
          <br />
          {t(
            "Source: ICAR – Nutrient Management for Rice · Version 1.3 (2024)",
            "स्रोत: ICAR – धान के लिए पोषक प्रबंधन · संस्करण 1.3 (2024)",
          )}
        </span>
        <Link href="/nutricheck/library/nitrogen">
          {t("View Source", "स्रोत देखें")}
        </Link>
      </aside>
      <div className={styles.bottomActions}>
        <Link href="/nutricheck/saved">
          <Bookmark size={19} /> {t("My Saved", "मेरी सहेजी सामग्री")}
        </Link>
        <Link href="/more#help">
          <BotMessageSquare size={19} /> {t("Ask Bharati", "भारती से पूछें")}
        </Link>
        <Link href="/nutricheck/recommendation">
          {t("Start NutriCheck", "न्यूट्रीचेक शुरू करें")}{" "}
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
