import { Filter, Info, Search, SlidersHorizontal } from "lucide-react";

import {
  PestContext,
  PestDiseaseHeader,
  PestRiskCard,
} from "@/features/pest-disease/components/pest-disease-components";
import styles from "@/features/pest-disease/components/pest-disease.module.css";
import { pestRisks } from "@/features/pest-disease/data/pest-disease-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

const filters = [
  "All (6)",
  "Insect Pests (3)",
  "Diseases (3)",
  "High Risk (3)",
  "Saved Items",
];

export default async function PestDiseaseLibraryPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <PestDiseaseHeader
        title={t("Pest / Disease Listing", "कीट / रोग सूची")}
        subtitle={t(
          "Find problems affecting your crop",
          "अपनी फसल को प्रभावित करने वाली समस्याएं खोजें",
        )}
        backHref="/pest-disease"
        filter
      />
      <PestContext />

      <section
        className={styles.searchToolbar}
        aria-label={t(
          "Search and filter pest library",
          "कीट लाइब्रेरी खोजें और फ़िल्टर करें",
        )}
      >
        <label className={styles.searchBox}>
          <Search size={20} />
          <input
            type="search"
            placeholder={t(
              "Search pest or disease by name...",
              "नाम से कीट या रोग खोजें...",
            )}
          />
          <SlidersHorizontal size={19} />
        </label>
        <button className={styles.filterButton} type="button">
          <Filter size={18} />
          {t("Sort: Risk Level", "क्रम: जोखिम स्तर")}
        </button>
      </section>

      <nav
        className={styles.listingFilters}
        aria-label={t("Pest and disease categories", "कीट और रोग श्रेणियां")}
      >
        {filters.map((filter) => (
          <button type="button" key={filter}>
            {t(
              filter,
              filter
                .replace("All", "सभी")
                .replace("Insect Pests", "कीट")
                .replace("Diseases", "रोग")
                .replace("High Risk", "उच्च जोखिम")
                .replace("Saved Items", "सहेजी सामग्री"),
            )}
          </button>
        ))}
      </nav>

      <aside className={styles.infoBar}>
        <Info size={18} />
        <span>
          {t("Showing", "दिखा रहे हैं")}{" "}
          <strong>{t("6 potential risks", "6 संभावित जोखिम")}</strong>{" "}
          {t(
            "for Paddy at Tillering Stage in your area.",
            "आपके क्षेत्र में कल्ले निकलने की अवस्था वाले धान के लिए।",
          )}
        </span>
      </aside>

      <section
        className={styles.riskList}
        aria-label={t("Pest and disease risks", "कीट और रोग जोखिम")}
      >
        {pestRisks.map((risk) => (
          <PestRiskCard risk={risk} key={risk.slug} />
        ))}
      </section>

      <nav
        className={styles.pagination}
        aria-label={t("Pest library pages", "कीट लाइब्रेरी पृष्ठ")}
      >
        <button type="button" disabled>
          {t("Previous", "पिछला")}
        </button>
        <button type="button" aria-current="page">
          1
        </button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button">{t("Next", "अगला")}</button>
      </nav>
    </div>
  );
}
