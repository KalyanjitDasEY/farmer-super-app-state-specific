import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Leaf,
  MapPin,
  Menu,
  Sprout,
  Wheat,
} from "lucide-react";

import type {
  Deficiency,
  NutrientTone,
} from "@/features/nutricheck/data/nutricheck-data";
import { nutriText } from "@/features/nutricheck/data/nutricheck-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

import styles from "./nutricheck.module.css";

export async function NutriCheckHeader({
  title = "NutriCheck",
  subtitle,
  backHref,
  saved = false,
}: {
  title?: string;
  subtitle: string;
  backHref?: string;
  saved?: boolean;
}) {
  const t = createTranslator(await getRequestLocale());
  return (
    <header className={styles.moduleHeader}>
      <div className={styles.headerBrand}>
        {backHref ? (
          <Link href={backHref} aria-label={t("Go back", "वापस जाएं")}>
            <ArrowLeft size={25} />
          </Link>
        ) : (
          <button type="button" aria-label={t("Open menu", "मेन्यू खोलें")}>
            <Menu size={25} />
          </button>
        )}
        <Link
          className={styles.serviceBrand}
          href="/home"
          aria-label={t("Raj Kisan Suvidha home", "राज किसान सुविधा होम")}
        >
          <Leaf size={27} />
          <span>{t("Raj Kisan Suvidha", "राज किसान सुविधा")}</span>
        </Link>
      </div>
      <div className={styles.moduleTitle}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className={styles.moduleActions}>
        <Link href="/more#help">
          <CircleHelp size={20} />
          <span>{t("Help", "सहायता")}</span>
        </Link>
        {saved ? (
          <button
            type="button"
            aria-label={t("Filter saved items", "सहेजी सामग्री फ़िल्टर करें")}
          >
            <Bookmark size={21} />
          </button>
        ) : null}
      </div>
    </header>
  );
}

export async function NutriContext({
  selectable = false,
}: {
  selectable?: boolean;
}) {
  const t = createTranslator(await getRequestLocale());
  return (
    <section
      className={styles.contextBar}
      aria-label={t("NutriCheck crop context", "न्यूट्रीचेक फसल संदर्भ")}
    >
      <div>
        <span className={styles.contextIcon}>
          <Wheat size={25} />
        </span>
        <span>
          <small>
            {selectable ? t("Selected Crop", "चयनित फसल") : t("Crop", "फसल")}
          </small>
          <strong>{t("Paddy (Dhan)", "धान")}</strong>
          <em>Pusa Basmati 1121</em>
        </span>
        {selectable ? <ChevronDown size={18} /> : null}
      </div>
      <div>
        <span className={styles.contextIcon}>
          <MapPin size={24} />
        </span>
        <span>
          <small>{t("Field", "खेत")}</small>
          <strong>{t("Field 1", "खेत 1")}</strong>
          <em>
            {t("Ram Prasad Farm · 2.50 Acre", "राम प्रसाद फार्म · 2.50 एकड़")}
          </em>
        </span>
      </div>
      <div>
        <span className={styles.contextIcon}>
          <Sprout size={24} />
        </span>
        <span>
          <small>{t("Crop Stage", "फसल अवस्था")}</small>
          <strong>{t("Tillering Stage", "कल्ले निकलने की अवस्था")}</strong>
          <em>{t("25–30 DAT", "25–30 दिन बाद")}</em>
        </span>
      </div>
      <div>
        <span className={styles.contextIcon}>
          <CalendarDays size={23} />
        </span>
        <span>
          <small>{t("Last NutriCheck", "पिछला न्यूट्रीचेक")}</small>
          <strong>{t("20 May 2024", "20 मई 2024")}</strong>
          <em>
            {t("LCC Value", "LCC मान")}: 2.6 <b>{t("(Optimal)", "(उचित)")}</b>
          </em>
        </span>
      </div>
    </section>
  );
}

export function NutrientBadge({
  symbol,
  tone,
  small = false,
}: {
  symbol: string;
  tone: NutrientTone;
  small?: boolean;
}) {
  return (
    <span
      className={`${styles.nutrientBadge} ${styles[tone]} ${small ? styles.smallBadge : ""}`}
    >
      {symbol}
    </span>
  );
}

export async function SectionTitle({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.sectionTitle}>
      <h2>{children}</h2>
      {href ? (
        <Link href={href}>
          {t("View All", "सभी देखें")} <ChevronRight size={18} />
        </Link>
      ) : null}
    </div>
  );
}

export async function DeficiencyCard({
  deficiency,
}: {
  deficiency: Deficiency;
}) {
  const t = createTranslator(await getRequestLocale());
  return (
    <article className={styles.libraryCard}>
      <div className={styles.libraryImage}>
        <Image
          src={deficiency.image}
          alt={t(
            `${deficiency.title} symptoms`,
            `${t(nutriText(deficiency.title))} के लक्षण`,
          )}
          fill
          sizes="180px"
        />
      </div>
      <NutrientBadge symbol={deficiency.symbol} tone={deficiency.tone} />
      <div className={styles.librarySummary}>
        <h3>{t(nutriText(deficiency.title))}</h3>
        <p>{t(nutriText(deficiency.description))}</p>
        <Link href="/nutricheck/library/nitrogen">
          {t("View Recommendation", "सिफारिश देखें")} <ArrowRight size={18} />
        </Link>
      </div>
      <div className={styles.libraryMeta}>
        <button
          type="button"
          aria-label={t(
            `Save ${deficiency.title}`,
            `${t(nutriText(deficiency.title))} सहेजें`,
          )}
        >
          <Bookmark size={20} />
        </button>
        <span>
          <small>{t("Severity", "गंभीरता")}</small>
          <i
            className={
              deficiency.severity === "High"
                ? styles.highDots
                : styles.mediumDots
            }
          />
          {t(nutriText(deficiency.severity))}
        </span>
        <span>
          <small>{t("Affected Part", "प्रभावित हिस्सा")}</small>
          <Leaf size={18} /> {t(nutriText(deficiency.affectedPart))}
        </span>
      </div>
      <Link
        className={styles.cardChevron}
        href="/nutricheck/library/nitrogen"
        aria-label={t(
          `View ${deficiency.title}`,
          `${t(nutriText(deficiency.title))} देखें`,
        )}
      >
        <ChevronRight size={23} />
      </Link>
    </article>
  );
}
