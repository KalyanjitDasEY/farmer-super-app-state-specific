"use client";

import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  Info,
  Lightbulb,
  SunMedium,
} from "lucide-react";
import { useState } from "react";

import {
  historyReadings,
  leafColourScale,
  leafText,
} from "@/features/leaf-colour-check/data/leaf-colour-data";
import { useLocale } from "@/i18n/LocaleProvider";

import {
  AssessmentThumbnail,
  CropContext,
  LeafChart,
  StatusPill,
} from "./leaf-colour-components";
import styles from "./leaf-colour.module.css";

export function ReadingCapture() {
  const { t } = useLocale();
  const router = useRouter();
  const [reading, setReading] = useState(1);
  const [selectedValue, setSelectedValue] = useState(2);
  const [notes, setNotes] = useState("");
  const progress = reading * 10;

  function continueReading() {
    if (reading === 10) {
      router.push("/leaf-colour-check/result");
      return;
    }
    setReading((current) => current + 1);
  }

  return (
    <>
      <div className={styles.captureHeading}>
        <h1>
          {t(`DLCC Reading ${reading} of 10`, `DLCC रीडिंग ${reading}, कुल 10`)}
        </h1>
        <p>
          {t("Capture leaf colour readings", "पत्ती रंग रीडिंग कैप्चर करें")}
        </p>
      </div>

      <CropContext
        finalLabel={t("Date & Time", "दिनांक और समय")}
        finalValue={t("28 May 2024", "28 मई 2024")}
        finalDetail={t("10:24 AM", "10:24 पूर्वाह्न")}
      />

      <aside className={styles.informationBanner}>
        <Info size={24} />
        <span>
          {t(
            "Take reading from the most recently fully expanded leaf.",
            "सबसे हाल में पूरी तरह खुली पत्ती से रीडिंग लें।",
          )}
          <br />
          {t(
            "Avoid leaves with spots, diseases or damage.",
            "धब्बे, रोग या क्षति वाली पत्तियों से बचें।",
          )}
        </span>
      </aside>

      <section className={styles.captureGrid}>
        <div className={styles.captureImage}>
          <Image
            src="/images/authenticated/nutricheck/healthy-leaf-check.jpg"
            alt={t(
              "Paddy leaf held against a digital leaf colour chart",
              "डिजिटल पत्ती रंग चार्ट के सामने रखी धान की पत्ती",
            )}
            fill
            loading="eager"
            sizes="(max-width: 800px) 100vw, 55vw"
          />
          <LeafChart />
          <button type="button">
            <Camera size={21} /> {t("Retake Photo", "फिर से फोटो लें")}
          </button>
        </div>

        <div className={styles.colourSelector}>
          <h2>{t("Select Matching Colour", "मिलता हुआ रंग चुनें")}</h2>
          {leafColourScale.map((option) => (
            <button
              className={
                selectedValue === option.value ? styles.selectedColour : ""
              }
              key={option.value}
              onClick={() => setSelectedValue(option.value)}
              type="button"
            >
              <i style={{ background: option.color }}>{option.value}</i>
              <span>
                <strong>{t(leafText(option.label))}</strong>
                {option.status ? (
                  <small>({t(leafText(option.status))})</small>
                ) : null}
              </span>
              <b>
                {selectedValue === option.value ? <Check size={18} /> : null}
              </b>
            </button>
          ))}
          <div className={styles.readingValue}>
            <small>{t("Reading Value", "रीडिंग मान")}</small>
            <strong>
              {selectedValue} (
              {leafColourScale.find((item) => item.value === selectedValue)
                ?.status
                ? t(
                    leafText(
                      leafColourScale.find(
                        (item) => item.value === selectedValue,
                      )!.status,
                    ),
                  )
                : t("Green", "हरा")}
              )
            </strong>
          </div>
        </div>
      </section>

      <section className={styles.captureNotes}>
        <div>
          <h2>
            <Lightbulb size={21} /> {t("Reading Tips", "रीडिंग सुझाव")}
          </h2>
          <p>
            {t(
              "Hold the chart behind the leaf in natural light.",
              "प्राकृतिक रोशनी में चार्ट को पत्ती के पीछे रखें।",
            )}
          </p>
          <p>
            {t(
              "Make sure both chart and leaf are in the same plane.",
              "सुनिश्चित करें कि चार्ट और पत्ती एक ही समतल में हों।",
            )}
          </p>
        </div>
        <label>
          <span>
            {t("Reading Notes", "रीडिंग नोट्स")}{" "}
            <small>{t("(Optional)", "(वैकल्पिक)")}</small>
          </span>
          <textarea
            maxLength={150}
            onChange={(event) => setNotes(event.target.value)}
            placeholder={t("Add notes...", "नोट्स जोड़ें...")}
            value={notes}
          />
          <small>{notes.length}/150</small>
        </label>
      </section>

      <section className={styles.progressPanel}>
        <span>
          <strong>{t("Progress", "प्रगति")}</strong>
          {t(
            `${reading} of 10 readings captured`,
            `${reading} में से 10 रीडिंग कैप्चर हुईं`,
          )}
        </span>
        <div>
          <i style={{ width: `${progress}%` }} />
        </div>
        <b>{progress}%</b>
      </section>

      <div className={styles.captureActions}>
        <button onClick={() => router.push("/leaf-colour-check")} type="button">
          {t("Cancel", "रद्द करें")}
        </button>
        <button
          onClick={() => router.push("/leaf-colour-check/history")}
          type="button"
        >
          {t("Save & Finish Later", "सहेजें और बाद में पूरा करें")}
        </button>
        <button
          className={styles.primaryButton}
          onClick={continueReading}
          type="button"
        >
          {reading === 10
            ? t("View Result", "परिणाम देखें")
            : t(
                `Next Reading (${reading + 1} of 10)`,
                `अगली रीडिंग (${reading + 1} / 10)`,
              )}
          <ArrowRight size={21} />
        </button>
      </div>
    </>
  );
}

export function HistoryList() {
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = historyReadings.filter((reading) => {
    const matchesQuery =
      !normalizedQuery ||
      Object.values(reading).join(" ").toLowerCase().includes(normalizedQuery);
    const matchesStatus =
      status === "All Statuses" || reading.status === status;
    return matchesQuery && matchesStatus;
  });

  return (
    <>
      <div className={styles.historyFilters}>
        <input
          aria-label={t("Search DLCC history", "DLCC इतिहास खोजें")}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t(
            "Search by date, LCC value, action, notes",
            "दिनांक, LCC मान, कार्रवाई या नोट्स से खोजें",
          )}
          type="search"
          value={query}
        />
        <select
          aria-label={t("Filter by period", "अवधि से फ़िल्टर करें")}
          defaultValue="All Time"
        >
          <option value="All Time">{t("All Time", "सभी समय")}</option>
          <option value="Last 30 Days">
            {t("Last 30 Days", "पिछले 30 दिन")}
          </option>
          <option value="Last 90 Days">
            {t("Last 90 Days", "पिछले 90 दिन")}
          </option>
        </select>
        <select
          aria-label={t("Filter by status", "स्थिति से फ़िल्टर करें")}
          onChange={(event) => setStatus(event.target.value)}
          value={status}
        >
          <option value="All Statuses">
            {t("All Statuses", "सभी स्थितियां")}
          </option>
          <option value="Optimal">{t("Optimal", "उचित")}</option>
          <option value="Low">{t("Low", "कम")}</option>
          <option value="High">{t("High", "अधिक")}</option>
        </select>
      </div>
      <section className={styles.historyTable}>
        <div className={styles.historyHeader}>
          <span>{t("Date & Time", "दिनांक और समय")}</span>
          <span>{t("LCC Value", "LCC मान")}</span>
          <span>{t("Status", "स्थिति")}</span>
          <span>{t("Reassessment", "पुनः आकलन")}</span>
          <span>{t("Action Taken", "की गई कार्रवाई")}</span>
        </div>
        {filtered.length ? (
          filtered.map((reading) => (
            <Link
              className={styles.historyRow}
              href="/leaf-colour-check/result"
              key={`${reading.date}-${reading.time}`}
            >
              <span className={styles.historyDate}>
                <AssessmentThumbnail />
                <span>
                  <strong>{t(leafText(reading.date))}</strong>
                  <small>{t(leafText(reading.time))}</small>
                  <small>
                    <SunMedium size={14} /> {t(leafText(reading.weather))}
                  </small>
                </span>
              </span>
              <span>
                <StatusPill status={reading.status}>{reading.value}</StatusPill>
                <small>(2 – 4)</small>
              </span>
              <span>
                <strong
                  className={`${styles.statusDot} ${styles[`dot${reading.status}`]}`}
                >
                  {t(leafText(reading.status))}
                </strong>
                <small>{t(leafText(reading.colour))}</small>
              </span>
              <span>
                <strong>
                  <CalendarDays size={17} /> {t("In 7 Days", "7 दिनों में")}
                </strong>
                <small>{t(leafText(reading.reassessment))}</small>
              </span>
              <span>
                <strong className={styles.actionTaken}>
                  <span className={styles.fertilizerBag}>N</span>
                  {t(leafText(reading.action))}
                </strong>
                <small>{t(leafText(reading.dose))}</small>
              </span>
              <ChevronRight size={20} />
            </Link>
          ))
        ) : (
          <p className={styles.emptyState}>
            {t(
              "No assessments match your filters.",
              "आपके फ़िल्टर से कोई आकलन मेल नहीं खाता।",
            )}
          </p>
        )}
      </section>
    </>
  );
}
