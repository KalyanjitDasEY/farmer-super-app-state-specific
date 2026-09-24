import { ArrowLeft, ChevronRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import type { ReactNode } from "react";

import { PageShell } from "@/components/layout/PageShell";
import { routes } from "@/config/routes";
import type { Dictionary } from "@/i18n/dictionaries";
import { createTranslator } from "@/i18n/localized-text";
import styles from "@/styles/application.module.css";
import type { Locale } from "@/types/locale";

export function ProfileFeatureShell({
  locale,
  dictionary,
  title,
  subtitle,
  children,
  aside,
  backHref,
}: {
  locale: Locale;
  dictionary: Dictionary;
  title: string;
  subtitle: string;
  children: ReactNode;
  aside?: ReactNode;
  backHref?: string;
}) {
  const t = createTranslator(locale);

  return (
    <PageShell
      locale={locale}
      dictionary={dictionary}
      authenticated
      activeNavigation="profile"
    >
      <div className={`${styles.container} ${styles.profileFeaturePage}`}>
        <nav
          className={styles.profileBreadcrumb}
          aria-label={t("Breadcrumb", "ब्रेडक्रंब")}
        >
          <a href={routes.home(locale)}>{t("Home", "होम")}</a>
          <ChevronRight size={15} aria-hidden="true" />
          <a href={routes.profile(locale)}>
            {t("Farmer Profile", "किसान प्रोफाइल")}
          </a>
          <ChevronRight size={15} aria-hidden="true" />
          <span>{title}</span>
        </nav>

        <header className={styles.profileFeatureHeader}>
          <div>
            <span>{t("Raj Kisan Suvidha", "राज किसान सुविधा")}</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <a
            className={`${styles.button} ${styles.buttonSecondary}`}
            href={backHref ?? routes.profile(locale)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            {t("Back", "वापस")}
          </a>
        </header>

        <div
          className={
            aside
              ? styles.profileFeatureLayout
              : styles.profileFeatureSingleColumn
          }
        >
          <div className={styles.profileFeatureMain}>{children}</div>
          {aside ? (
            <aside className={styles.profileFeatureAside}>{aside}</aside>
          ) : null}
        </div>
      </div>
    </PageShell>
  );
}

export function FeaturePanel({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`${styles.profilePanel} ${className}`}>
      {title ? <h2>{title}</h2> : null}
      {children}
    </section>
  );
}

export function HelpPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.profileHelpPanel}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function DefinitionGrid({
  items,
}: {
  items: Array<[string, ReactNode]>;
}) {
  return (
    <dl className={styles.profileDefinitionGrid}>
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function QrVisual({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.profileQr}>
      <QRCodeSVG
        value={value}
        size={128}
        level="H"
        marginSize={4}
        bgColor="#ffffff"
        fgColor="#10231a"
        title={label}
      />
      <strong>{label}</strong>
    </div>
  );
}
