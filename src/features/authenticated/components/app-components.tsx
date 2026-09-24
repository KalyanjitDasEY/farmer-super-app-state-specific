import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Sprout,
  Wheat,
} from "lucide-react";

import type { AppService } from "@/features/authenticated/data/app-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

import styles from "./authenticated.module.css";

export async function PageHeader({
  title,
  subtitle,
  backHref,
  action,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
  action?: React.ReactNode;
}) {
  const t = createTranslator(await getRequestLocale());
  return (
    <header className={styles.pageHeader}>
      <div className={styles.pageHeading}>
        {backHref ? (
          <Link
            className={styles.backButton}
            href={backHref}
            aria-label={t("Go back", "वापस जाएं")}
          >
            <ArrowLeft size={22} />
          </Link>
        ) : null}
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      {action ? <div className={styles.pageAction}>{action}</div> : null}
    </header>
  );
}

export async function SectionHeading({
  title,
  href,
  linkLabel = "View all",
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.sectionHeading}>
      <h2>{title}</h2>
      {href ? (
        <Link href={href}>
          {linkLabel === "View all" ? t("View all", "सभी देखें") : linkLabel}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}

export async function ServiceCards({
  services,
  compact = false,
}: {
  services: readonly AppService[];
  compact?: boolean;
}) {
  const t = createTranslator(await getRequestLocale());
  return (
    <div
      className={`${styles.serviceGrid} ${compact ? styles.compactServiceGrid : ""}`}
    >
      {services.map(
        ({
          id,
          title,
          description,
          href,
          icon: Icon,
          tone,
          featured,
          badge,
        }) => (
          <Link
            className={`${styles.serviceCard} ${styles[tone]} ${
              featured ? styles.featuredService : ""
            }`}
            href={href}
            id={id}
            key={t(title)}
          >
            <span className={styles.serviceIcon} aria-hidden="true">
              <Icon size={compact ? 24 : 29} />
            </span>
            <span>
              <strong>{t(title)}</strong>
              <small>{t(description)}</small>
            </span>
            {badge ? <em className={styles.serviceBadge}>{t(badge)}</em> : null}
            <ArrowRight
              className={styles.cardArrow}
              size={18}
              aria-hidden="true"
            />
          </Link>
        ),
      )}
    </div>
  );
}

export async function CropContext({
  captured = false,
}: {
  captured?: boolean;
}) {
  const t = createTranslator(await getRequestLocale());
  const context = [
    {
      label: t("Crop", "फसल"),
      value: t("Paddy (Dhan)", "धान"),
      detail: "Pusa Basmati 1121",
      icon: Wheat,
    },
    {
      label: t("Field", "खेत"),
      value: t("Field 1", "खेत 1"),
      detail: t("Ram Prasad Farm · 2.50 Acre", "राम प्रसाद फार्म · 2.50 एकड़"),
      icon: MapPin,
    },
    ...(captured
      ? [
          {
            label: t("Captured On", "कैप्चर किया"),
            value: t("28 May 2024", "28 मई 2024"),
            detail: t("10:24 AM", "10:24 पूर्वाह्न"),
            icon: CalendarDays,
          },
        ]
      : []),
    {
      label: t("Stage", "अवस्था"),
      value: t("Tillering Stage", "कल्ले निकलने की अवस्था"),
      detail: "25–30 DAT",
      icon: Sprout,
    },
  ];

  return (
    <section
      className={styles.cropContext}
      aria-label={t("Selected crop information", "चयनित फसल की जानकारी")}
    >
      {context.map(({ label, value, detail, icon: Icon }) => (
        <div key={label}>
          <span className={styles.contextIcon} aria-hidden="true">
            <Icon size={23} />
          </span>
          <span>
            <small>{label}</small>
            <strong>{value}</strong>
            <em>{detail}</em>
          </span>
        </div>
      ))}
    </section>
  );
}

export async function StepProgress({ current }: { current: number }) {
  const t = createTranslator(await getRequestLocale());
  const steps = [
    t("Capture", "कैप्चर"),
    t("Check", "जांच"),
    t("Analyze", "विश्लेषण"),
    t("Confirm", "पुष्टि"),
    t("Advice", "सलाह"),
  ];
  return (
    <ol
      className={styles.stepProgress}
      aria-label={t(
        `Step ${current} of ${steps.length}`,
        `चरण ${current}, कुल ${steps.length}`,
      )}
    >
      {steps.map((step, index) => {
        const number = index + 1;
        return (
          <li
            className={
              number < current
                ? styles.completeStep
                : number === current
                  ? styles.currentStep
                  : ""
            }
            key={step}
          >
            <span>{number < current ? <Check size={14} /> : number}</span>
            <small>{step}</small>
          </li>
        );
      })}
    </ol>
  );
}

export function PrimaryLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      className={`${styles.primaryLink} ${secondary ? styles.secondaryLink : ""}`}
      href={href}
    >
      {children}
      <ArrowRight size={20} aria-hidden="true" />
    </Link>
  );
}

export async function LeafImage({
  src = "/images/authenticated/diagnosis-leaf.jpg",
  alt = "",
  eager = false,
}: {
  src?: string;
  alt?: string;
  eager?: boolean;
}) {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.leafImage}>
      <Image
        src={src}
        alt={
          alt ||
          t(
            "Paddy leaf showing visible brown spots",
            "धान की पत्ती पर दिखाई देते भूरे धब्बे",
          )
        }
        fill
        sizes="(max-width: 640px) 92vw, 520px"
        loading={eager ? "eager" : "lazy"}
      />
    </div>
  );
}

export function StatCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className={styles.statCard}>
      {icon ? <span>{icon}</span> : null}
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        {detail ? <em>{detail}</em> : null}
      </div>
    </div>
  );
}

export async function FreshnessNote() {
  const t = createTranslator(await getRequestLocale());
  return (
    <p className={styles.freshnessNote}>
      <Clock3 size={16} aria-hidden="true" />
      {t("Updated just now", "अभी अपडेट किया गया")}
    </p>
  );
}
