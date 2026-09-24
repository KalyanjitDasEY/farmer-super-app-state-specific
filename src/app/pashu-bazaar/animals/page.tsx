import {
  Bookmark,
  ChevronDown,
  Filter,
  Map,
  MapPin,
  Mic,
  Search,
} from "lucide-react";

import {
  AnimalCard,
  PashuBreadcrumb,
  PashuHeader,
  TrustStrip,
} from "@/features/pashu-bazaar/components/pashu-components";
import styles from "@/features/pashu-bazaar/components/pashu-bazaar.module.css";
import { animals } from "@/features/pashu-bazaar/data/pashu-data";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

const filters = [
  localized("Within 25 km", "25 किमी के भीतर"),
  localized("Cow", "गाय"),
  localized("Breed", "नस्ल"),
  localized("Age", "आयु"),
  localized("Price", "मूल्य"),
  localized("More Filters", "और फ़िल्टर"),
];

export default async function AnimalSearchPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <div className={styles.stack}>
      <PashuHeader backHref="/pashu-bazaar" />
      <PashuBreadcrumb
        items={[localized("Animal Search & Listing", "पशु खोज और लिस्टिंग")]}
      />
      <div className={styles.pageHeading}>
        <div>
          <h1>{t("Animal Search & Listing", "पशु खोज और लिस्टिंग")}</h1>
          <p>
            {t(
              "Find healthy animals from verified sellers",
              "सत्यापित विक्रेताओं से स्वस्थ पशु खोजें",
            )}
          </p>
        </div>
      </div>

      <section className={styles.searchToolbar}>
        <label className={styles.searchBox}>
          <Search size={20} />
          <input
            type="search"
            placeholder={t(
              "Search by animal, breed, seller or location...",
              "पशु, नस्ल, विक्रेता या स्थान से खोजें...",
            )}
          />
          <Mic size={18} />
        </label>
        <button className={styles.secondaryButton} type="button">
          <Bookmark size={18} />
          {t("Save Search", "खोज सहेजें")}
        </button>
      </section>
      <nav
        className={styles.filterChips}
        aria-label={t("Animal search filters", "पशु खोज फ़िल्टर")}
      >
        {filters.map((filter) => (
          <button type="button" key={t(filter)}>
            {filter.en === "Within 25 km" ? <MapPin size={15} /> : null}
            {t(filter)}
            <ChevronDown size={15} />
          </button>
        ))}
      </nav>

      <section className={styles.catalogueLayout}>
        <aside className={styles.filterSidebar}>
          <h2>{t("Filters", "फ़िल्टर")}</h2>
          <FilterGroup
            title={t("Animal Type", "पशु का प्रकार")}
            options={[
              t("All Types", "सभी प्रकार"),
              t("Cattle (Cow/Bull)", "मवेशी (गाय/बैल)"),
              t("Buffalo", "भैंस"),
              t("Goat", "बकरी"),
              t("Sheep", "भेड़"),
              t("Poultry", "मुर्गी पालन"),
              t("Others", "अन्य"),
            ]}
          />
          <FilterGroup
            title={t("Purpose", "उद्देश्य")}
            radio
            options={[
              t("All", "सभी"),
              t("Milking", "दुधारू"),
              t("Breeding", "प्रजनन"),
              t("Draught", "भार ढोना"),
              t("Fattening", "मोटा करना"),
            ]}
          />
          <FilterGroup
            title={t("Breed", "नस्ल")}
            options={[
              "HF (32)",
              "Sahiwal (18)",
              "Gir (14)",
              "Jersey (12)",
              "Tharparkar (10)",
            ]}
          />
          <FilterGroup
            title={t("Age", "आयु")}
            options={[
              t("Up to 6 Months", "6 महीने तक"),
              t("6–12 Months", "6–12 महीने"),
              t("1–2 Years", "1–2 वर्ष"),
              t("2–5 Years", "2–5 वर्ष"),
              t("5+ Years", "5+ वर्ष"),
            ]}
          />
          <FilterGroup
            title={t("Seller Type", "विक्रेता का प्रकार")}
            options={[
              t("All Sellers", "सभी विक्रेता"),
              t("Verified Sellers", "सत्यापित विक्रेता"),
              t("Cooperatives / FPO", "सहकारी समितियाँ / FPO"),
              t("Commercial Breeders", "व्यावसायिक प्रजनक"),
            ]}
          />
          <button className={styles.primaryButton} type="button">
            <Filter size={16} />
            {t("Apply Filters", "फ़िल्टर लागू करें")}
          </button>
        </aside>
        <div className={styles.catalogueMain}>
          <div className={styles.catalogueMeta}>
            <strong>{t("128 animals found", "128 पशु मिले")}</strong>
            <div>
              <button type="button">
                {t("Sort by: Relevance", "क्रम: प्रासंगिकता")}
                <ChevronDown size={14} />
              </button>
              <button type="button">{t("Grid", "ग्रिड")}</button>
              <button type="button">
                <Map size={14} />
                {t("Map", "नक्शा")}
              </button>
            </div>
          </div>
          <div className={styles.animalGrid}>
            {animals.map((animal) => (
              <AnimalCard animal={animal} key={animal.slug} />
            ))}
          </div>
          <button className={styles.loadMore} type="button">
            {t("Load More Animals", "और पशु लोड करें")}
            <ChevronDown size={17} />
          </button>
        </div>
      </section>
      <TrustStrip />
    </div>
  );
}

function FilterGroup({
  title,
  options,
  radio = false,
}: {
  title: string;
  options: readonly string[];
  radio?: boolean;
}) {
  return (
    <section className={styles.filterGroup}>
      <strong>{title}</strong>
      {options.map((option, index) => (
        <label key={option}>
          <input
            type={radio ? "radio" : "checkbox"}
            name={title}
            defaultChecked={
              index === 0 ||
              (options[0]?.startsWith("HF") && index === 1) ||
              (options.length === 5 && options[0]?.includes("6") && index === 3)
            }
          />
          {option}
        </label>
      ))}
    </section>
  );
}
