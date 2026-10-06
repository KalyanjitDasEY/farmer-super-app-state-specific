import {
  ArrowLeft,
  ArrowRight,
  Headphones,
  Lightbulb,
  MapPinned,
} from "lucide-react";
import Image from "next/image";

import { PageShell } from "@/components/layout/PageShell";
import { withBasePath } from "@/config/base-path";
import { routes } from "@/config/routes";
import type { SchemeSummary } from "@/domain/models";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

const popularSchemeIcons: Record<string, string> = {
  "pm-kisan": "/images/scheme-pm-kisan-icon-v2.png",
  "fasal-bima": "/images/scheme-fasal-bima-icon-v2.png",
  "bihar-irrigation": "/images/scheme-water-icon-v2.png",
  "bihar-crop-support": "/images/scheme-rupee-icon-v2.png",
};

export function ServiceHubPage({
  locale,
  dictionary,
  popularSchemes,
}: {
  locale: Locale;
  dictionary: Dictionary;
  popularSchemes: SchemeSummary[];
}) {
  return (
    <PageShell
      locale={locale}
      dictionary={dictionary}
      authenticated
      activeNavigation="schemes"
    >
      <section className={`${styles.pageHero} ${styles.serviceHubHero}`}>
        <div className={`${styles.container} ${styles.pageHeroInner}`}>
          <div>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <a href={routes.home(locale)}>{dictionary["common.home"]}</a>
              <span aria-hidden="true">›</span>
              <span>{dictionary["schemes.hubTitle"]}</span>
            </nav>
            <h1 className={styles.pageTitle}>
              {dictionary["schemes.hubTitle"]}
            </h1>
            <p className={styles.pageLead}>
              {dictionary["schemes.hubSubtitle"]}
            </p>
          </div>
          <Image
            className={styles.pageHeroImage}
            src={withBasePath("/images/scheme-bihar-farmers.jpg")}
            alt=""
            width={409}
            height={280}
            priority
          />
        </div>
      </section>

      <div
        className={`${styles.container} ${styles.section} ${styles.serviceHubContent}`}
      >
        <h2 className={styles.sectionHeading}>
          {dictionary["schemes.choose"]}
        </h2>
        <p className={styles.pageLead}>{dictionary["schemes.chooseHint"]}</p>
        <div
          className={`${styles.grid} ${styles.hubChoiceGrid} ${styles.sectionCompact}`}
        >
          <article className={`${styles.card} ${styles.catalogueChoice}`}>
            <Image
              className={styles.catalogueChoiceIcon}
              src={withBasePath("/images/central-government-emblem-v2.png")}
              alt=""
              width={110}
              height={110}
            />
            <h2>{dictionary["schemes.central"]}</h2>
            <p>{dictionary["schemes.centralDescription"]}</p>
            <a
              className={styles.button}
              href={`${routes.schemeCatalogue(locale)}?jurisdiction=central`}
            >
              {dictionary["schemes.viewCentral"]}
              <ArrowRight size={20} />
            </a>
          </article>
          <article className={`${styles.card} ${styles.catalogueChoice}`}>
            <MapPinned
              className={`${styles.catalogueChoiceIcon} ${styles.biharChoiceIcon}`}
              size={109}
              aria-hidden="true"
            />
            <h2>{dictionary["schemes.bihar"]}</h2>
            <p>{dictionary["schemes.biharDescription"]}</p>
            <a
              className={`${styles.button} ${styles.buttonBlue}`}
              href={`${routes.schemeDepartments(locale)}?jurisdiction=bihar`}
            >
              {dictionary["schemes.viewBihar"]}
              <ArrowRight size={20} />
            </a>
          </article>
        </div>

        <div className={`${styles.notice} ${styles.noticeSuccess}`} id="help">
          <Lightbulb size={34} aria-hidden="true" />
          <div>
            <strong>{dictionary["gateway.support"]}</strong>
            <p>{dictionary["gateway.aiDescription"]}</p>
          </div>
          <a
            className={`${styles.button} ${styles.buttonSecondary}`}
            href="#help"
          >
            <Headphones size={19} aria-hidden="true" />
            {dictionary["common.help"]}
          </a>
        </div>

        <section className={styles.sectionCompact}>
          <div className={styles.popularHeader}>
            <h2>{dictionary["schemes.popular"]}</h2>
            <a href={routes.schemeCatalogue(locale)}>
              {locale === "hi" ? "सभी योजनाएं देखें" : "View All Schemes"} →
            </a>
          </div>
          <div className={`${styles.grid} ${styles.schemeGrid}`}>
            {popularSchemes.map((scheme) => (
              <article
                className={`${styles.card} ${styles.schemeCard}`}
                key={scheme.id}
              >
                <span
                  className={`${styles.badge} ${
                    scheme.jurisdiction === "bihar" ? styles.badgeBlue : ""
                  }`}
                >
                  {scheme.jurisdiction === "central"
                    ? locale === "hi"
                      ? "केंद्रीय"
                      : "Central"
                    : locale === "hi"
                      ? "बिहार"
                      : "Bihar"}
                </span>
                <Image
                  className={styles.schemeIcon}
                  src={withBasePath(
                    popularSchemeIcons[scheme.id] ??
                      "/images/scheme-pm-kisan-icon-v2.png",
                  )}
                  alt=""
                  width={168}
                  height={168}
                />
                <h3>{scheme.title[locale]}</h3>
                <p>{scheme.summary[locale]}</p>
                <div className={styles.cardActions}>
                  <a href={routes.schemeDetail(locale, scheme.id)}>
                    {dictionary["common.viewDetails"]} →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className={styles.notice}>{dictionary["schemes.disclaimer"]}</div>
        <a
          className={`${styles.button} ${styles.buttonSecondary} ${styles.backButton}`}
          href={routes.home(locale)}
        >
          <ArrowLeft size={18} aria-hidden="true" />
          {locale === "hi" ? "होम पर वापस" : "Back to Home"}
        </a>
      </div>
    </PageShell>
  );
}
