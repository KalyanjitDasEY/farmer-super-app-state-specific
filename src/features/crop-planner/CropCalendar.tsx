"use client";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileText,
  Leaf,
  Lightbulb,
  MapPin,
  Pencil,
  Sprout,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ServiceImage } from "@/components/media/ServiceImage";
import { useLocale } from "@/i18n/LocaleProvider";

import { type CropPlan, translateCropPlannerText } from "./crop-planner-data";
import styles from "./crop-planner.module.css";

export type CropCalendarSelection = {
  location: string;
  season: string;
  variety: string;
  sowingStart: string;
  sowingEnd: string;
  area: string;
  unit: string;
};

function displayDate(value: string, locale: "en" | "hi") {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
}

export function CropCalendar({
  plan,
  selection,
}: {
  plan: CropPlan;
  selection: CropCalendarSelection;
}) {
  const { locale, t } = useLocale();
  const currentStageIndex = plan.stages.findIndex(
    (stage) => stage.status === "current",
  );
  const [completedCount, setCompletedCount] = useState(currentStageIndex);
  const [expandedStage, setExpandedStage] = useState(currentStageIndex);
  const [showActivityDetails, setShowActivityDetails] = useState(false);

  const progress = Math.round(
    (Math.min(completedCount + 1, plan.stages.length) / plan.stages.length) *
      100,
  );

  return (
    <div className={styles.calendarPage}>
      <div className={styles.calendarTopbar}>
        <Link href="/plan-your-crop">
          <ArrowLeft size={22} aria-hidden="true" />
          {t("Crop Calendar", "फसल कैलेंडर")}
        </Link>
        <Link className={styles.editButton} href="/plan-your-crop">
          <Pencil size={18} aria-hidden="true" />
          {t("Edit Plan", "योजना संपादित करें")}
        </Link>
      </div>

      <section className={styles.cropHero}>
        <ServiceImage
          className={styles.cropImage}
          src={plan.image}
          alt={t(
            `${plan.name} crop`,
            `${translateCropPlannerText(t, plan.name)} की फसल`,
          )}
          width={136}
          height={136}
        />
        <div>
          <p>{t("Recommended crop plan", "सुझाई गई फसल योजना")}</p>
          <h1>{translateCropPlannerText(t, plan.name)}</h1>
          <span className={styles.varietyBadge}>{selection.variety}</span>
          <div className={styles.cropMeta}>
            <span>
              <CalendarDays size={19} aria-hidden="true" />
              {translateCropPlannerText(t, selection.season)}
            </span>
            <span>
              <MapPin size={19} aria-hidden="true" />
              {translateCropPlannerText(t, selection.location)}
            </span>
            <span>
              <Sprout size={19} aria-hidden="true" />
              {selection.area}{" "}
              {t(
                selection.unit,
                selection.unit === "Bigha"
                  ? "बीघा"
                  : selection.unit === "Acre"
                    ? "एकड़"
                    : "हेक्टेयर",
              )}
            </span>
          </div>
        </div>
      </section>

      <div className={styles.statusGrid}>
        <section className={styles.currentStage}>
          <h2>{t("Current Stage", "वर्तमान अवस्था")}</h2>
          <span className={styles.statusIcon}>
            <Sprout size={43} aria-hidden="true" />
          </span>
          <h3>{translateCropPlannerText(t, plan.stageName)}</h3>
          <p>
            <CalendarDays size={19} aria-hidden="true" />
            {displayDate(selection.sowingStart, locale)} -{" "}
            {displayDate(selection.sowingEnd, locale)}
          </p>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-label={t("Crop plan progress", "फसल योजना की प्रगति")}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <strong>
            {t("Progress:", "प्रगति:")} {progress}%
          </strong>
          <div className={styles.stageActions}>
            <Link href="/advisories">
              <FileText size={19} aria-hidden="true" />
              {t("View Advisory", "सलाह देखें")}
            </Link>
            <button
              type="button"
              onClick={() =>
                setCompletedCount((count) =>
                  Math.min(count + 1, plan.stages.length),
                )
              }
              disabled={completedCount >= plan.stages.length}
            >
              <CheckCircle2 size={19} aria-hidden="true" />
              {completedCount >= plan.stages.length
                ? t("Plan Completed", "योजना पूरी हुई")
                : t("Mark Complete", "पूरा चिह्नित करें")}
            </button>
          </div>
        </section>

        <section className={styles.nextActivity}>
          <h2>{t("Next Activity", "अगला कार्य")}</h2>
          <span className={styles.statusIcon}>
            <ClipboardList size={43} aria-hidden="true" />
          </span>
          <h3>{translateCropPlannerText(t, plan.nextActivity)}</h3>
          <p>
            <CalendarDays size={19} aria-hidden="true" />
            {t("Due in 3 Days", "3 दिनों में देय")}
          </p>
          <div className={styles.recommendation}>
            <span>{t("Recommended", "सुझाया गया")}</span>
            <strong>{translateCropPlannerText(t, plan.recommendation)}</strong>
          </div>
          <button
            className={styles.detailsButton}
            type="button"
            aria-expanded={showActivityDetails}
            onClick={() => setShowActivityDetails((visible) => !visible)}
          >
            {t("View Details", "विवरण देखें")}
            <ChevronRight size={21} aria-hidden="true" />
          </button>
          {showActivityDetails ? (
            <div className={styles.activityDetails} role="status">
              {t(
                "Apply only after checking soil moisture. Use protective equipment and follow the product label.",
                "मिट्टी की नमी जांचने के बाद ही प्रयोग करें। सुरक्षा उपकरण पहनें और उत्पाद के लेबल का पालन करें।",
              )}
            </div>
          ) : null}
        </section>
      </div>

      <section className={styles.journey}>
        <h2>{t("Crop Growth Journey", "फसल विकास यात्रा")}</h2>
        <ol>
          {plan.stages.map((stage, index) => {
            const isCompleted = index < completedCount;
            const isCurrent = index === completedCount;
            const isExpanded = expandedStage === index;
            const status = isCompleted
              ? t("Completed", "पूरा")
              : isCurrent
                ? t("Current Stage", "वर्तमान अवस्था")
                : t("Upcoming", "आगामी");

            return (
              <li
                className={isCurrent ? styles.currentJourneyStage : ""}
                key={stage.name}
              >
                <span
                  className={[
                    styles.timelineMarker,
                    isCompleted ? styles.completedMarker : "",
                    isCurrent ? styles.currentMarker : "",
                  ].join(" ")}
                >
                  {isCompleted ? <Check size={17} aria-hidden="true" /> : null}
                </span>
                <button
                  className={styles.stageRow}
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => setExpandedStage(isExpanded ? -1 : index)}
                >
                  <strong>
                    <span>{index + 1}.</span>{" "}
                    {translateCropPlannerText(t, stage.name)}
                  </strong>
                  <span
                    className={
                      isCompleted ? styles.completedBadge : styles.upcomingBadge
                    }
                  >
                    {status}
                  </span>
                  <time>{translateCropPlannerText(t, stage.dates)}</time>
                  <ChevronDown
                    className={isExpanded ? styles.chevronOpen : ""}
                    size={20}
                    aria-hidden="true"
                  />
                </button>
                {isExpanded ? (
                  <div className={styles.stageAdvice}>
                    <Lightbulb size={23} aria-hidden="true" />
                    <p>{translateCropPlannerText(t, stage.advice)}</p>
                    <ChevronRight size={22} aria-hidden="true" />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </section>

      <Link className={styles.departmentNote} href="/advisories">
        <CalendarDays size={24} aria-hidden="true" />
        <span>
          {t(
            "Calendar is based on Rajasthan Agriculture Department recommendations.",
            "कैलेंडर राजस्थान कृषि विभाग की सिफारिशों पर आधारित है।",
          )}
        </span>
        <ChevronRight size={23} aria-hidden="true" />
      </Link>

      <Link className={styles.advisoryButton} href="/advisories">
        <Leaf size={26} aria-hidden="true" />
        {t("View Today's Advisory", "आज की सलाह देखें")}
      </Link>
    </div>
  );
}
