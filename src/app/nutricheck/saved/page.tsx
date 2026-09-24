import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  Bookmark,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Download,
  Filter,
  Leaf,
  MoreVertical,
  Package,
  Search,
} from "lucide-react";

import { NutriCheckHeader } from "@/features/nutricheck/components/nutricheck-components";
import styles from "@/features/nutricheck/components/nutricheck.module.css";
import {
  nutriText,
  savedItems,
} from "@/features/nutricheck/data/nutricheck-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("NutriCheck Saved Items", "न्यूट्रीचेक सहेजी सामग्री") };
}

const stats = [
  ["Total Saved", "12", Bookmark],
  ["Deficiency Guides", "7", Leaf],
  ["Nutrient Recommendations", "4", Package],
  ["Crop References", "1", BookOpen],
] as const;

export default async function NutriCheckSavedPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <NutriCheckHeader
        subtitle={t(
          "Saved Items · Your bookmarked content and recommendations",
          "सहेजी सामग्री · आपकी बुकमार्क की गई सामग्री और सिफारिशें",
        )}
        backHref="/nutricheck"
        saved
      />
      <section className={styles.savedSummary}>
        {stats.map(([label, value, Icon]) => (
          <div className={styles.savedStat} key={label}>
            <span>
              <Icon size={22} />
            </span>
            <div>
              <small>
                {t(
                  label,
                  [
                    "कुल सहेजे",
                    "कमी मार्गदर्शिकाएं",
                    "पोषक सिफारिशें",
                    "फसल संदर्भ",
                  ][stats.findIndex((item) => item[0] === label)] ?? label,
                )}
              </small>
              <strong>{value}</strong>
            </div>
          </div>
        ))}
      </section>

      <div className={styles.searchToolbar}>
        <label className={styles.searchBox}>
          <Search size={20} />
          <span className="sr-only">
            {t("Search saved items", "सहेजी सामग्री खोजें")}
          </span>
          <input
            type="search"
            placeholder={t("Search saved items", "सहेजी सामग्री खोजें")}
          />
        </label>
        <button className={styles.filterButton} type="button">
          {t("All Types", "सभी प्रकार")} <ChevronDown size={17} />
        </button>
        <button className={styles.filterButton} type="button">
          <Filter size={17} /> {t("Filters", "फ़िल्टर")}
        </button>
      </div>

      <section className={styles.savedList}>
        <div className={styles.savedTabs}>
          <button type="button">{t("All (12)", "सभी (12)")}</button>
          <button type="button">
            {t("Deficiency Guides (7)", "कमी मार्गदर्शिकाएं (7)")}
          </button>
          <button type="button">
            {t("Recommendations (4)", "सिफारिशें (4)")}
          </button>
          <button type="button">{t("References (1)", "संदर्भ (1)")}</button>
        </div>
        {savedItems.map((item) => (
          <article className={styles.savedItem} key={item.title}>
            <div className={styles.savedImage}>
              <Image src={item.image} alt="" fill sizes="190px" />
            </div>
            <div>
              <h2>
                {t(nutriText(item.title))}
                <span className={styles.savedType}>
                  {t(nutriText(item.type))}
                </span>
              </h2>
              <p>{t(nutriText(item.description))}</p>
              <div className={styles.savedMeta}>
                <span>{t("Paddy (Dhan)", "धान")}</span>
                <span>
                  {t("Field 1 · Ram Prasad Farm", "खेत 1 · राम प्रसाद फार्म")}
                </span>
                <span>{t(nutriText(item.date))}</span>
              </div>
              <span className={styles.savedTag}>
                {t(nutriText(item.nutrient))}
              </span>
            </div>
            <div className={styles.savedActions}>
              <button
                type="button"
                aria-label={t(
                  `Remove ${item.title} from saved items`,
                  `${t(nutriText(item.title))} को सहेजी सामग्री से हटाएं`,
                )}
              >
                <Bookmark size={21} />
              </button>
              <button
                type="button"
                aria-label={t(
                  `More options for ${item.title}`,
                  `${t(nutriText(item.title))} के और विकल्प`,
                )}
              >
                <MoreVertical size={20} />
              </button>
              <Link
                href="/nutricheck/library/nitrogen"
                aria-label={t(
                  `Open ${item.title}`,
                  `${t(nutriText(item.title))} खोलें`,
                )}
              >
                <ChevronRight size={21} />
              </Link>
            </div>
          </article>
        ))}
        <aside className={styles.sourceBar}>
          <Download size={21} />
          {t(
            "Access your saved items anytime, even offline.",
            "अपनी सहेजी सामग्री कभी भी, ऑफलाइन भी, देखें।",
          )}
          <Link href="/nutricheck/saved">
            {t("Download All", "सभी डाउनलोड करें")}
          </Link>
        </aside>
      </section>
    </div>
  );
}
