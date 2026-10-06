"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  ClipboardCheck,
  FileCheck2,
  Headphones,
  HeartHandshake,
  Info,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";

import { useLocale } from "@/i18n/LocaleProvider";
import { localized } from "@/i18n/localized-text";

import styles from "./mksy.module.css";

export const claimSteps = [
  localized("Accident & Victim", "दुर्घटना और पीड़ित"),
  localized("Location & Narrative", "स्थान और विवरण"),
  localized("Documents & Demo ID", "दस्तावेज़ और डेमो आईडी"),
  localized("Review", "समीक्षा"),
  localized("Submit", "जमा करें"),
] as const;

export function MksyLogo() {
  const { t } = useLocale();

  return (
    <div className={styles.schemeLogo} aria-hidden="true">
      <strong>{t("BH DEMO", "बिहार डेमो")}</strong>
      <span>
        <HeartHandshake size={38} />
        <Leaf size={22} />
      </span>
    </div>
  );
}

export function Breadcrumbs({
  current,
  claim = false,
}: {
  current: string;
  claim?: boolean;
}) {
  const { t } = useLocale();

  return (
    <nav
      className={styles.breadcrumbs}
      aria-label={t("Breadcrumb", "ब्रेडक्रंब")}
    >
      <Link href="/home">{t("Home", "होम")}</Link>
      <span>›</span>
      <Link href={claim ? "/mksy" : "/schemes"}>
        {claim ? t("My Claims", "मेरे दावे") : t("Schemes", "योजनाएं")}
      </Link>
      <span>›</span>
      {claim ? (
        <>
          <Link href="/mksy">{t("Bihar demo", "बिहार डेमो")}</Link>
          <span>›</span>
        </>
      ) : (
        <>
          <span>{t("Bihar farmer demo", "बिहार किसान डेमो")}</span>
          <span>›</span>
        </>
      )}
      <strong>{current}</strong>
    </nav>
  );
}

export function SchemeHeading({
  backHref,
  backLabel,
  current,
  claim = false,
}: {
  backHref: string;
  backLabel: string;
  current: string;
  claim?: boolean;
}) {
  const { t } = useLocale();

  return (
    <>
      <div className={styles.topRow}>
        <Breadcrumbs current={current} claim={claim} />
        <Link className={styles.backLink} href={backHref}>
          <ArrowLeft size={18} />
          {backLabel}
        </Link>
      </div>
      <header className={styles.schemeHeading}>
        <MksyLogo />
        <div>
          <h1>
            {t(
              "Bihar Farmer Accident Support Demo",
              "बिहार किसान दुर्घटना सहायता डेमो",
            )}
          </h1>
          <p>
            {t(
              "Illustrative journey only · Not a Bihar government scheme or real claim portal.",
              "केवल सांकेतिक प्रक्रिया · बिहार सरकार की योजना या वास्तविक दावा पोर्टल नहीं।",
            )}
          </p>
        </div>
      </header>
    </>
  );
}

export function ClaimProgress({ current }: { current: number }) {
  const { t } = useLocale();

  return (
    <ol
      className={styles.claimProgress}
      aria-label={t("Claim application progress", "दावा आवेदन की प्रगति")}
    >
      {claimSteps.map((step, index) => {
        const number = index + 1;
        const complete = number < current;
        const active = number === current;

        return (
          <li
            className={
              active ? styles.activeStep : complete ? styles.completeStep : ""
            }
            key={step.en}
          >
            <span>{complete ? <Check size={20} /> : number}</span>
            <strong>{t(step)}</strong>
            <small>
              {complete
                ? t("Completed", "पूर्ण")
                : active
                  ? t("In Progress", "प्रगति पर")
                  : t("Pending", "लंबित")}
            </small>
          </li>
        );
      })}
    </ol>
  );
}

export function Notice({
  children,
  tone = "green",
}: {
  children: ReactNode;
  tone?: "green" | "blue" | "amber";
}) {
  return (
    <aside className={`${styles.notice} ${styles[tone]}`}>
      <Info size={20} />
      <span>{children}</span>
    </aside>
  );
}

export function FormSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.formSection}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}

export function Field({
  label,
  required = false,
  children,
  wide = false,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={wide ? styles.wideField : undefined}>
      <span>
        {label}
        {required ? <b aria-hidden="true"> *</b> : null}
      </span>
      {children}
    </label>
  );
}

export function ClaimSidebar({ current }: { current: number }) {
  const { t } = useLocale();

  return (
    <aside className={styles.sidebar}>
      <section className={styles.sideCard}>
        <h2>
          <ClipboardCheck size={20} />
          {t("Application Summary", "आवेदन सारांश")}
        </h2>
        <dl className={styles.summaryList}>
          <div>
            <dt>{t("Demo", "डेमो")}</dt>
            <dd>
              {t(
                "Bihar farmer accident support",
                "बिहार किसान दुर्घटना सहायता",
              )}
            </dd>
          </div>
          <div>
            <dt>{t("Applicant", "आवेदक")}</dt>
            <dd>RAMESH KUMAR</dd>
          </div>
          <div>
            <dt>{t("Demo Farmer ID", "डेमो किसान आईडी")}</dt>
            <dd>BR23F12345678</dd>
          </div>
          <div>
            <dt>{t("Sample incident date", "नमूना घटना तिथि")}</dt>
            <dd>{t("12 May 2024, 03:15 PM", "12 मई 2024, 03:15 अपराह्न")}</dd>
          </div>
        </dl>
        <button className={styles.outlineButton} type="button">
          {t("View Summary", "सारांश देखें")}
        </button>
      </section>

      <section className={styles.sideCard}>
        <h2>{t("Claim Progress", "दावे की प्रगति")}</h2>
        <ol className={styles.sideProgress}>
          {claimSteps.map((step, index) => {
            const number = index + 1;
            const complete = number < current;
            const active = number === current;
            return (
              <li className={active ? styles.sideActive : ""} key={step.en}>
                <span>{complete ? <Check size={14} /> : number}</span>
                <div>
                  <strong>{t(step)}</strong>
                  <small>
                    {complete
                      ? t("Completed", "पूर्ण")
                      : active
                        ? t("In Progress", "प्रगति पर")
                        : t("Pending", "लंबित")}
                  </small>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className={styles.sideCard}>
        <h2>
          <ShieldCheck size={20} />
          {t("Important Notes", "महत्वपूर्ण निर्देश")}
        </h2>
        <ul className={styles.bulletList}>
          <li>
            {t(
              "Provide correct and complete information.",
              "सही और पूरी जानकारी प्रदान करें।",
            )}
          </li>
          <li>
            {t(
              "Use sample data; do not enter real identity or bank details.",
              "नमूना डेटा प्रयोग करें; वास्तविक पहचान या बैंक विवरण न भरें।",
            )}
          </li>
          <li>
            {t(
              "No official eligibility or benefit amount is represented here.",
              "यहां आधिकारिक पात्रता या लाभ राशि नहीं दर्शाई गई है।",
            )}
          </li>
        </ul>
      </section>

      <section className={`${styles.sideCard} ${styles.helpCard}`}>
        <h2>
          <Headphones size={21} />
          {t("Need Help?", "सहायता चाहिए?")}
        </h2>
        <p>
          {t(
            "Ask Krishi Mitra for help with this sample claim journey.",
            "इस नमूना दावा प्रक्रिया में सहायता के लिए कृषि मित्र से पूछें।",
          )}
        </p>
        <Link className={styles.outlineButton} href="/more#help">
          <Headphones size={18} />
          {t("Chat with Krishi Mitra", "कृषि मित्र से चैट करें")}
        </Link>
      </section>
    </aside>
  );
}

export function ClaimLayout({
  current,
  title,
  description,
  notice,
  children,
}: {
  current: number;
  title: string;
  description: string;
  notice: string;
  children: ReactNode;
}) {
  const { t } = useLocale();

  return (
    <div className={styles.page}>
      <SchemeHeading
        backHref={current === 1 ? "/mksy" : "/mksy"}
        backLabel={
          current === 1
            ? t("Back to Schemes", "योजनाओं पर वापस जाएं")
            : t("Back to Claim Overview", "दावा अवलोकन पर वापस जाएं")
        }
        current={title}
        claim
      />
      <ClaimProgress current={current} />
      <Notice tone="amber">
        {t(
          "Illustrative Bihar demo only. This is not an official government scheme or submission; no benefit or verification is provided.",
          "केवल सांकेतिक बिहार डेमो। यह सरकारी योजना या वास्तविक आवेदन नहीं है; कोई लाभ या सत्यापन उपलब्ध नहीं है।",
        )}
      </Notice>
      <Notice>{notice}</Notice>
      <div className={styles.claimLayout}>
        <main className={styles.claimCard}>
          <p className={styles.stepLabel}>
            {t("Step", "चरण")} {current === 4 ? 5 : current} {t("of", "में से")}{" "}
            5
          </p>
          <h2>{title}</h2>
          <p className={styles.cardIntro}>{description}</p>
          {children}
        </main>
        <ClaimSidebar current={current} />
      </div>
    </div>
  );
}

export function ClaimActions({
  backHref,
  nextHref,
  nextLabel,
  submit = false,
}: {
  backHref: string;
  nextHref: string;
  nextLabel: string;
  submit?: boolean;
}) {
  const { t } = useLocale();

  return (
    <div className={styles.claimActions}>
      <Link className={styles.secondaryButton} href={backHref}>
        <ArrowLeft size={18} />
        {t("Back", "वापस")}
      </Link>
      <button className={styles.secondaryButton} type="button">
        <FileCheck2 size={18} />
        {t("Sample Draft", "नमूना ड्राफ्ट")}
      </button>
      <Link className={styles.primaryButton} href={nextHref}>
        {nextLabel}
        {submit ? <CircleCheck size={18} /> : <ArrowRight size={18} />}
      </Link>
    </div>
  );
}
