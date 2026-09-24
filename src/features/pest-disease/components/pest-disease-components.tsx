import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  Leaf,
  MapPin,
  Menu,
  Sprout,
  Wheat,
} from "lucide-react";

import type {
  PestRisk,
  RiskLevel,
} from "@/features/pest-disease/data/pest-disease-data";
import { pestText } from "@/features/pest-disease/data/pest-disease-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

import styles from "./pest-disease.module.css";

export async function PestDiseaseHeader({
  title = "Pest & Disease",
  subtitle,
  backHref,
  filter = false,
}: {
  title?: string;
  subtitle: string;
  backHref?: string;
  filter?: boolean;
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
        {filter ? (
          <button
            type="button"
            aria-label={t("Filter risks", "जोखिम फ़िल्टर करें")}
          >
            <span>2</span>
            <Bookmark size={21} />
          </button>
        ) : null}
      </div>
    </header>
  );
}

export async function PestContext() {
  const t = createTranslator(await getRequestLocale());
  return (
    <section
      className={styles.contextBar}
      aria-label={t("Pest and disease crop context", "कीट और रोग फसल संदर्भ")}
    >
      <div>
        <span className={styles.contextIcon}>
          <Wheat size={25} />
        </span>
        <span>
          <small>{t("Selected Crop", "चयनित फसल")}</small>
          <strong>{t("Paddy (Dhan)", "धान")}</strong>
          <em>Pusa Basmati 1121</em>
        </span>
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
          <small>{t("Last Updated", "अंतिम अपडेट")}</small>
          <strong>{t("20 May 2024", "20 मई 2024")}</strong>
          <em>{t("10:30 AM", "10:30 पूर्वाह्न")}</em>
        </span>
      </div>
    </section>
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

export async function RiskBadge({ risk }: { risk: RiskLevel }) {
  const t = createTranslator(await getRequestLocale());
  const tone =
    risk === "High Risk"
      ? styles.highRisk
      : risk === "Moderate Risk"
        ? styles.moderateRisk
        : styles.lowRisk;
  return (
    <span className={`${styles.riskBadge} ${tone}`}>
      <i />
      {t(pestText(risk))}
    </span>
  );
}

export async function PestRiskCard({ risk }: { risk: PestRisk }) {
  const t = createTranslator(await getRequestLocale());
  return (
    <article className={styles.riskCard}>
      <div className={styles.riskImage}>
        <Image
          src={risk.image}
          alt={t(pestText(risk.title))}
          fill
          sizes="180px"
        />
      </div>
      <div className={styles.riskContent}>
        <h2>
          {t(pestText(risk.title))}
          <span
            className={
              risk.category === "Disease" ? styles.diseaseTag : styles.insectTag
            }
          >
            {t(pestText(risk.category))}
          </span>
        </h2>
        <em>{risk.scientificName}</em>
        <p>{t(pestText(risk.description))}</p>
        <div className={styles.riskFacts}>
          <span>
            <Sprout size={16} />
            {t(pestText(risk.stage))}
          </span>
          <span>{t(pestText(risk.condition))}</span>
        </div>
      </div>
      <div className={styles.riskActions}>
        <RiskBadge risk={risk.risk} />
        <button type="button">
          <Bookmark size={20} />
          {t("Save", "सहेजें")}
        </button>
      </div>
      <Link
        href="/pest-disease/library/brown-planthopper"
        aria-label={t(`View ${risk.title}`, `${t(pestText(risk.title))} देखें`)}
      >
        <ChevronRight size={23} />
      </Link>
    </article>
  );
}
