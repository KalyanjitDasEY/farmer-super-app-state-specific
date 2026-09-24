"use client";

import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  Sprout,
  Wheat,
} from "lucide-react";

import { capturedReadings } from "@/features/leaf-colour-check/data/leaf-colour-data";
import { useLocale } from "@/i18n/LocaleProvider";

import styles from "./leaf-colour.module.css";

export function LeafPageHeader({
  title,
  subtitle,
  backHref,
}: {
  title: string;
  subtitle: string;
  backHref?: string;
}) {
  const { t } = useLocale();
  return (
    <div className={styles.pageHeader}>
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
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export function CropContext({
  finalLabel = "Next Assessment",
  finalValue = "In 7 Days",
  finalDetail = "02 Jun 2024",
}: {
  finalLabel?: string;
  finalValue?: string;
  finalDetail?: string;
}) {
  const { t } = useLocale();
  const items = [
    {
      label: t("Selected Crop", "चयनित फसल"),
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
    {
      label: t("Crop Stage", "फसल अवस्था"),
      value: t("Tillering Stage", "कल्ले निकलने की अवस्था"),
      detail: "25–30 DAT",
      icon: Sprout,
    },
    {
      label:
        finalLabel === "Next Assessment"
          ? t("Next Assessment", "अगला आकलन")
          : finalLabel,
      value:
        finalValue === "In 7 Days" ? t("In 7 Days", "7 दिनों में") : finalValue,
      detail: finalDetail,
      icon: CalendarDays,
    },
  ] as const;

  return (
    <section
      className={styles.cropContext}
      aria-label={t("Leaf colour assessment context", "पत्ती रंग आकलन संदर्भ")}
    >
      {items.map(({ label, value, detail, icon: Icon }) => (
        <div className={styles.contextItem} key={label}>
          <Icon size={25} aria-hidden="true" />
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

export function LeafChart({ compact = false }: { compact?: boolean }) {
  const { t } = useLocale();
  return (
    <div
      className={`${styles.leafChart} ${compact ? styles.compactChart : ""}`}
      aria-label={t("Digital leaf colour chart", "डिजिटल पत्ती रंग चार्ट")}
    >
      <strong>DLCC</strong>
      <small>{t("Leaf Colour Chart", "पत्ती रंग चार्ट")}</small>
      {[4, 3, 2, 1, 0].map((value) => (
        <div className={styles.chartRow} key={value}>
          <span>{value}</span>
          <i className={styles[`chartColour${value}`]} />
        </div>
      ))}
    </div>
  );
}

export function AssessmentThumbnail() {
  return (
    <div className={styles.assessmentThumbnail}>
      <Image
        src="/images/authenticated/nutricheck/healthy-leaf-check.jpg"
        alt=""
        fill
        sizes="120px"
      />
      <LeafChart compact />
    </div>
  );
}

export function StatusPill({
  status,
  children,
}: {
  status: "Optimal" | "Low" | "High" | "Medium";
  children: React.ReactNode;
}) {
  return (
    <span className={`${styles.statusPill} ${styles[`status${status}`]}`}>
      {children}
    </span>
  );
}

export function TrendChart({ extended = false }: { extended?: boolean }) {
  const { t } = useLocale();
  const values = extended
    ? [2.9, 2.3, 4.4, 2.6, 2.1, 2.8]
    : [2.2, 2.4, 2.6, 2.8];
  const labels = extended
    ? ["07 May", "12 May", "17 May", "20 May", "24 May", "28 May"]
    : ["10 May", "17 May", "24 May", "28 May"];
  const width = 520;
  const height = 190;
  const left = 42;
  const right = 18;
  const top = 22;
  const bottom = 34;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const points = values.map((value, index) => {
    const x = left + (index * chartWidth) / (values.length - 1);
    const y = top + ((5 - value) / 5) * chartHeight;
    return { x, y, value, label: labels[index] };
  });

  return (
    <svg
      className={styles.trendChart}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={t("Recent DLCC trend", "हाल का DLCC रुझान")}
    >
      {[0, 1, 2, 3, 4, 5].map((tick) => {
        const y = top + ((5 - tick) / 5) * chartHeight;
        return (
          <g key={tick}>
            <line x1={left} x2={width - right} y1={y} y2={y} />
            <text x={left - 18} y={y + 4}>
              {tick}
            </text>
          </g>
        );
      })}
      <polyline points={points.map(({ x, y }) => `${x},${y}`).join(" ")} />
      {points.map(({ x, y, value, label }) => (
        <g key={label}>
          <circle cx={x} cy={y} r="5" />
          <text className={styles.valueLabel} x={x} y={y - 12}>
            {value}
          </text>
          <text className={styles.dateLabel} x={x} y={height - 9}>
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ReadingSummary() {
  const { t } = useLocale();
  const facts = [
    [t("Average LCC Value", "औसत LCC मान"), "2.8"],
    [t("Highest", "अधिकतम"), "3.4"],
    [t("Lowest", "न्यूनतम"), "2.1"],
    [t("Std. Deviation", "मानक विचलन"), "0.37"],
    [t("Consistency", "संगति"), t("Good", "अच्छी")],
  ] as const;

  return (
    <section className={styles.panel}>
      <div className={styles.panelTitle}>
        <h2>{t("Reading Summary", "रीडिंग सारांश")}</h2>
        <span>{t("10 Readings Captured", "10 रीडिंग कैप्चर हुईं")}</span>
      </div>
      <div className={styles.summaryFacts}>
        {facts.map(([label, value], index) => (
          <div key={label}>
            <small>{label}</small>
            <strong className={index === 2 ? styles.warningText : ""}>
              {value}
              {value === t("Good", "अच्छी") ? <CheckCircle2 size={17} /> : null}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export function IndividualReadings() {
  const { t } = useLocale();
  return (
    <section className={styles.panel}>
      <div className={styles.panelTitle}>
        <h2>{t("Individual Readings", "व्यक्तिगत रीडिंग")}</h2>
        <span>{t("Tap to view details", "विवरण के लिए टैप करें")}</span>
      </div>
      <div className={styles.readingStrip}>
        {capturedReadings.map((value, index) => (
          <button
            type="button"
            key={`${value}-${index}`}
            aria-label={t(
              `Reading ${index + 1}: ${value}`,
              `रीडिंग ${index + 1}: ${value}`,
            )}
          >
            <span className={styles.readingPhoto}>
              <Image
                src="/images/authenticated/nutricheck/healthy-leaf-check.jpg"
                alt=""
                fill
                sizes="75px"
              />
              <b>{index + 1}</b>
            </span>
            <small>{index + 1}</small>
            <strong className={value < 2.2 ? styles.warningText : ""}>
              {value}
            </strong>
          </button>
        ))}
      </div>
    </section>
  );
}

export function RecentAssessmentRows() {
  const { t } = useLocale();
  return (
    <div className={styles.recentRows}>
      {(
        [
          [
            "28 May 2024 · 10:24 AM",
            "Tillering Stage (25–30 DAT)",
            "Level 2 (Medium)",
            "25 kg/acre",
          ],
          [
            "20 May 2024 · 09:15 AM",
            "Tillering Stage (20–25 DAT)",
            "Level 1 (Low)",
            "20 kg/acre",
          ],
          [
            "12 May 2024 · 08:40 AM",
            "Tillering Stage (15–20 DAT)",
            "Level 2 (Medium)",
            "20 kg/acre",
          ],
        ] as const
      ).map(([date, stage, level, dose]) => (
        <Link
          href="/leaf-colour-check/result"
          className={styles.recentRow}
          key={date}
        >
          <AssessmentThumbnail />
          <span className={styles.recentDetails}>
            <strong>{date}</strong>
            <small>
              {t("Field 1", "खेत 1")} ·{" "}
              {t(
                stage,
                stage.replace("Tillering Stage", "कल्ले निकलने की अवस्था"),
              )}
            </small>
            <StatusPill status={level.includes("Low") ? "Low" : "Medium"}>
              {level}
            </StatusPill>
          </span>
          <span className={styles.recentAction}>
            <strong>
              {t("Action Taken", "की गई कार्रवाई")} <CheckCircle2 size={15} />
            </strong>
            <small>{t("Urea Top Dress", "यूरिया टॉप ड्रेस")}</small>
            <small>{dose}</small>
          </span>
          <ChevronRight size={21} />
        </Link>
      ))}
    </div>
  );
}

export function AssessmentTime() {
  const { t } = useLocale();
  return (
    <span className={styles.inlineFact}>
      <Clock3 size={18} />
      {t("28 May 2024 · 10:31 AM", "28 मई 2024 · 10:31 पूर्वाह्न")}
    </span>
  );
}
