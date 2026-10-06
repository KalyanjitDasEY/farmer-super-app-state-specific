import {
  ArrowLeft,
  ArrowRight,
  BadgeIndianRupee,
  Boxes,
  Droplets,
  Grid2X2,
  Info,
  List,
  MapPinned,
  PawPrint,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Tractor,
  Wheat,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

import { PageShell } from "@/components/layout/PageShell";
import { withBasePath } from "@/config/base-path";
import { routes } from "@/config/routes";
import type {
  Jurisdiction,
  Page,
  SchemeCategory,
  SchemeDetail,
  SchemeSummary,
} from "@/domain/models";
import type { Dictionary, TranslationKey } from "@/i18n/dictionaries";
import { formatDateTime } from "@/lib/format";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

const categories: Array<{
  value: SchemeCategory;
  label: TranslationKey;
}> = [
  { value: "income", label: "catalogue.category.income" },
  { value: "irrigation", label: "catalogue.category.irrigation" },
  { value: "equipment", label: "catalogue.category.equipment" },
  { value: "production", label: "catalogue.category.production" },
  { value: "livestock", label: "catalogue.category.livestock" },
  { value: "marketing", label: "catalogue.category.marketing" },
  { value: "soil", label: "catalogue.category.soil" },
  { value: "insurance", label: "catalogue.category.insurance" },
  { value: "other", label: "catalogue.category.other" },
];

const categoryIcons: Record<SchemeCategory, LucideIcon> = {
  income: BadgeIndianRupee,
  irrigation: Droplets,
  equipment: Tractor,
  insurance: ShieldCheck,
  livestock: PawPrint,
  production: Wheat,
  marketing: ShoppingCart,
  soil: Sprout,
  other: Boxes,
};

const schemeImageIcons: Record<string, string> = {
  "pm-kisan": "/images/scheme-pm-kisan-icon-v2.png",
  "fasal-bima": "/images/scheme-rupee-icon-v2.png",
  "bihar-irrigation": "/images/scheme-water-icon-v2.png",
  "bihar-crop-support": "/images/scheme-fasal-bima-icon-v2.png",
};

export interface CatalogueFilters {
  jurisdiction?: Jurisdiction;
  category?: SchemeCategory;
  query?: string;
  sort: "latest" | "title";
}

export function CataloguePage({
  locale,
  dictionary,
  result,
  filters,
  preview,
}: {
  locale: Locale;
  dictionary: Dictionary;
  result: Page<SchemeSummary>;
  filters: CatalogueFilters;
  preview: SchemeDetail | undefined;
}) {
  const createHref = (updates: Record<string, string | undefined>) => {
    const parameters = new URLSearchParams();
    if (filters.jurisdiction) {
      parameters.set("jurisdiction", filters.jurisdiction);
    }
    if (filters.category) parameters.set("category", filters.category);
    if (filters.query) parameters.set("q", filters.query);
    parameters.set("sort", filters.sort);
    for (const [key, value] of Object.entries(updates)) {
      if (value) parameters.set(key, value);
      else parameters.delete(key);
    }
    return `${routes.schemeCatalogue(locale)}?${parameters.toString()}`;
  };
  return (
    <PageShell
      locale={locale}
      dictionary={dictionary}
      authenticated
      activeNavigation="schemes"
    >
      <section className={`${styles.pageHero} ${styles.catalogueHero}`}>
        <div className={`${styles.container} ${styles.pageHeroInner}`}>
          <div>
            <nav
              className={styles.breadcrumb}
              aria-label={locale === "hi" ? "ब्रेडक्रंब" : "Breadcrumb"}
            >
              <a href={routes.home(locale)}>{dictionary["common.home"]}</a>
              <span>›</span>
              <a href={routes.schemes(locale)}>
                {dictionary["common.schemes"]}
              </a>
            </nav>
            <h1 className={styles.pageTitle}>
              {dictionary["catalogue.title"]}
            </h1>
            <p className={styles.pageLead}>
              {dictionary["catalogue.subtitle"]}
            </p>
          </div>
          <Image
            className={styles.pageHeroImage}
            src={withBasePath("/images/scheme-bihar-farmers.jpg")}
            alt=""
            width={524}
            height={293}
            priority
          />
        </div>
      </section>

      <div
        className={`${styles.container} ${styles.sectionCompact} ${styles.catalogueContent}`}
      >
        <div className={styles.catalogueLayout}>
          <aside
            className={`${styles.card} ${styles.cardPad} ${styles.filterPanel}`}
          >
            <h2>{dictionary["catalogue.filter"]}</h2>
            <nav
              className={styles.filterList}
              aria-label={dictionary["catalogue.filter"]}
            >
              <a
                className={`${styles.filterLink} ${
                  !filters.category ? styles.filterLinkActive : ""
                }`}
                href={createHref({ category: undefined, page: "1" })}
              >
                <span className={styles.filterLabel}>
                  <Grid2X2 size={19} aria-hidden="true" />
                  {dictionary["catalogue.all"]}
                </span>
                <span>{result.totalItems}</span>
              </a>
              {categories.map((category) => {
                const CategoryIcon = categoryIcons[category.value];
                return (
                  <a
                    className={`${styles.filterLink} ${
                      filters.category === category.value
                        ? styles.filterLinkActive
                        : ""
                    }`}
                    href={createHref({ category: category.value, page: "1" })}
                    key={category.value}
                  >
                    <span className={styles.filterLabel}>
                      <CategoryIcon size={19} aria-hidden="true" />
                      {dictionary[category.label]}
                    </span>
                  </a>
                );
              })}
            </nav>
            <div className={styles.filterHelp}>
              <span className={styles.softIcon}>
                <Search size={22} aria-hidden="true" />
              </span>
              <div>
                <strong>
                  {locale === "hi"
                    ? "जो खोज रहे हैं वह नहीं मिला?"
                    : "Can't find what you're looking for?"}
                </strong>
                <a href="#results">
                  {locale === "hi"
                    ? "कृषि मित्र से पूछें"
                    : "Ask Krishi Mitra (AI)"}{" "}
                  →
                </a>
              </div>
            </div>
          </aside>

          <section className={styles.catalogueResults} id="results">
            <form className={styles.catalogueToolbar} method="get">
              {filters.jurisdiction ? (
                <input
                  type="hidden"
                  name="jurisdiction"
                  value={filters.jurisdiction}
                />
              ) : null}
              {filters.category ? (
                <input type="hidden" name="category" value={filters.category} />
              ) : null}
              <label className={styles.field}>
                <span className="sr-only">
                  {dictionary["catalogue.search"]}
                </span>
                <span>
                  <Search size={18} aria-hidden="true" />
                </span>
                <input
                  className={styles.input}
                  type="search"
                  name="q"
                  defaultValue={filters.query}
                  placeholder={dictionary["catalogue.search"]}
                />
              </label>
              <label className={styles.field}>
                <span className="sr-only">{dictionary["catalogue.sort"]}</span>
                <select
                  className={styles.select}
                  name="sort"
                  defaultValue={filters.sort}
                >
                  <option value="latest">
                    {dictionary["catalogue.latest"]}
                  </option>
                  <option value="title">{dictionary["catalogue.az"]}</option>
                </select>
              </label>
              <button
                className={`${styles.button} ${styles.catalogueSearchButton}`}
                type="submit"
                aria-label={dictionary["catalogue.search"]}
              >
                <Search size={20} aria-hidden="true" />
              </button>
            </form>

            <nav
              className={styles.catalogueChips}
              aria-label={
                locale === "hi"
                  ? "त्वरित योजना फ़िल्टर"
                  : "Quick scheme filters"
              }
            >
              <a
                className={
                  !filters.jurisdiction && !filters.category
                    ? styles.catalogueChipActive
                    : ""
                }
                href={createHref({
                  jurisdiction: undefined,
                  category: undefined,
                  page: "1",
                })}
              >
                {dictionary["catalogue.all"]}
              </a>
              <a
                className={
                  filters.jurisdiction === "central"
                    ? styles.catalogueChipActive
                    : ""
                }
                href={createHref({
                  jurisdiction: "central",
                  category: undefined,
                  page: "1",
                })}
              >
                {dictionary["schemes.central"]}
              </a>
              <a
                className={
                  filters.jurisdiction === "bihar"
                    ? styles.catalogueChipActive
                    : ""
                }
                href={createHref({
                  jurisdiction: "bihar",
                  category: undefined,
                  page: "1",
                })}
              >
                {dictionary["schemes.bihar"]}
              </a>
              <a
                className={
                  filters.category === "irrigation"
                    ? styles.catalogueChipActive
                    : ""
                }
                href={createHref({ category: "irrigation", page: "1" })}
              >
                {dictionary["catalogue.category.irrigation"]}
              </a>
              <a
                className={
                  filters.category === "production"
                    ? styles.catalogueChipActive
                    : ""
                }
                href={createHref({ category: "production", page: "1" })}
              >
                {dictionary["catalogue.category.production"]}
              </a>
            </nav>

            <div className={styles.catalogueResultsBar}>
              <p aria-live="polite">
                <strong>{result.totalItems}</strong>{" "}
                {dictionary["catalogue.results"]}
              </p>
              <div aria-hidden="true">
                <Grid2X2 size={19} />
                <List size={19} />
              </div>
            </div>
            {result.items.length ? (
              <div className={styles.resultList}>
                {result.items.map((scheme) => {
                  const iconSource = schemeImageIcons[scheme.id];
                  const SchemeIcon = categoryIcons[scheme.category];
                  return (
                    <article
                      className={`${styles.card} ${styles.resultCard}`}
                      key={scheme.id}
                    >
                      <div className={styles.resultMain}>
                        <span className={styles.resultSchemeIcon}>
                          {iconSource ? (
                            <Image
                              src={withBasePath(iconSource)}
                              alt=""
                              width={168}
                              height={168}
                            />
                          ) : (
                            <SchemeIcon size={34} aria-hidden="true" />
                          )}
                        </span>
                        <div className={styles.resultCopy}>
                          <span
                            className={`${styles.badge} ${
                              scheme.jurisdiction === "bihar"
                                ? styles.badgeBlue
                                : ""
                            }`}
                          >
                            {scheme.jurisdiction === "central"
                              ? dictionary["schemes.central"]
                              : dictionary["schemes.bihar"]}
                          </span>
                          <h2>{scheme.title[locale]}</h2>
                          <span className={styles.resultCategory}>
                            <Sprout size={15} aria-hidden="true" />
                            {
                              dictionary[
                                categories.find(
                                  (category) =>
                                    category.value === scheme.category,
                                )?.label ?? "catalogue.category.other"
                              ]
                            }
                          </span>
                          <p>{scheme.summary[locale]}</p>
                          <div className={styles.cardActions}>
                            <a
                              className={`${styles.button} ${styles.buttonSecondary}`}
                              href={routes.schemeDetail(locale, scheme.id)}
                            >
                              {dictionary["common.viewDetails"]}
                              <ArrowRight size={16} aria-hidden="true" />
                            </a>
                            <a
                              className={styles.button}
                              href={routes.apply(locale, scheme.id)}
                            >
                              {dictionary["common.applyNow"]}
                              <ArrowRight size={16} aria-hidden="true" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className={styles.resultBenefit}>
                        <strong>{dictionary["scheme.benefit"]}</strong>
                        <p>{scheme.benefit[locale]}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className={`${styles.card} ${styles.cardPad}`}>
                <h2>{dictionary["catalogue.noResults"]}</h2>
                <a
                  className={styles.button}
                  href={routes.schemeCatalogue(locale)}
                >
                  {dictionary["catalogue.reset"]}
                </a>
              </div>
            )}

            <nav
              className={styles.pagination}
              aria-label={locale === "hi" ? "पृष्ठ नेविगेशन" : "Pagination"}
            >
              <a
                className={`${styles.button} ${styles.buttonSecondary}`}
                href={createHref({
                  page: String(Math.max(1, result.page - 1)),
                })}
                aria-disabled={result.page <= 1 ? "true" : undefined}
              >
                <ArrowLeft size={18} />
                {dictionary["catalogue.previous"]}
              </a>
              <strong>
                {result.page} / {result.totalPages}
              </strong>
              <a
                className={`${styles.button} ${styles.buttonSecondary}`}
                href={createHref({
                  page: String(Math.min(result.totalPages, result.page + 1)),
                })}
                aria-disabled={
                  result.page >= result.totalPages ? "true" : undefined
                }
              >
                {dictionary["catalogue.next"]}
                <ArrowRight size={18} />
              </a>
            </nav>
          </section>

          <aside
            className={`${styles.card} ${styles.cardPad} ${styles.previewPanel}`}
          >
            <div className={styles.previewHeading}>
              <h2>{dictionary["catalogue.preview"]}</h2>
              <X size={20} aria-hidden="true" />
            </div>
            {preview ? (
              <>
                <span className={styles.badge}>{preview.code}</span>
                <div className={styles.previewIdentity}>
                  <span className={styles.resultSchemeIcon}>
                    {(() => {
                      const iconSource = schemeImageIcons[preview.id];
                      if (iconSource) {
                        return (
                          <Image
                            src={withBasePath(iconSource)}
                            alt=""
                            width={168}
                            height={168}
                          />
                        );
                      }
                      const PreviewIcon = categoryIcons[preview.category];
                      return <PreviewIcon size={34} aria-hidden="true" />;
                    })()}
                  </span>
                  <div>
                    <h3>{preview.title[locale]}</h3>
                    <span className={styles.resultCategory}>
                      <MapPinned size={15} aria-hidden="true" />
                      {
                        dictionary[
                          categories.find(
                            (category) => category.value === preview.category,
                          )?.label ?? "catalogue.category.other"
                        ]
                      }
                    </span>
                  </div>
                </div>
                <p>{preview.summary[locale]}</p>
                <section className={styles.previewBenefit}>
                  <BadgeIndianRupee size={26} aria-hidden="true" />
                  <div>
                    <strong>{preview.benefit[locale]}</strong>
                    <span>{dictionary["scheme.dbt"]}</span>
                  </div>
                </section>
                <section className={styles.previewFacts}>
                  <h3>{dictionary["scheme.eligibility"]}</h3>
                  <ul>
                    {preview.eligibility.map((item) => (
                      <li key={item.en}>{item[locale]}</li>
                    ))}
                  </ul>
                </section>
                <section className={styles.previewFacts}>
                  <h3>
                    {locale === "hi" ? "मुख्य विशेषताएं" : "Key Features"}
                  </h3>
                  <ul>
                    {preview.features.map((item) => (
                      <li key={item.en}>{item[locale]}</li>
                    ))}
                  </ul>
                </section>
                <section className={styles.previewFacts}>
                  <h3>{dictionary["scheme.documents"]}</h3>
                  <ul>
                    {preview.documents.map((item) => (
                      <li key={item.en}>{item[locale]}</li>
                    ))}
                  </ul>
                </section>
                <section className={styles.previewFacts}>
                  <h3>
                    {locale === "hi" ? "आवेदन कैसे करें" : "How to Apply"}
                  </h3>
                  <p>
                    {locale === "hi"
                      ? "बिहार किसान सुविधा डेमो में आवेदन प्रक्रिया देखें।"
                      : "Explore the application process in this Bihar Kisan Suvidha demo."}
                  </p>
                </section>
                <div className={styles.previewDisclaimer}>
                  <strong>{locale === "hi" ? "अस्वीकरण" : "Disclaimer"}</strong>
                  <span>{dictionary["scheme.unverified"]}</span>
                </div>
                <div className={styles.formActions}>
                  <a
                    className={styles.button}
                    href={routes.apply(locale, preview.id)}
                  >
                    {dictionary["common.applyNow"]}
                  </a>
                  <a
                    className={`${styles.button} ${styles.buttonSecondary}`}
                    href={routes.schemeDetail(locale, preview.id)}
                  >
                    {dictionary["common.viewDetails"]}
                  </a>
                </div>
              </>
            ) : null}
          </aside>
        </div>
        <div className={styles.notice}>
          <Info size={22} aria-hidden="true" />
          <span>
            {dictionary["scheme.unverified"]} {dictionary["common.lastUpdated"]}
            : {formatDateTime(result.updatedAt, locale)}
          </span>
        </div>
      </div>
    </PageShell>
  );
}
