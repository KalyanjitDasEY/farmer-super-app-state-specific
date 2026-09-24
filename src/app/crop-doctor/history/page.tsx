import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  Camera,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  TriangleAlert,
  UserRoundCheck,
} from "lucide-react";

import {
  PageHeader,
  StatCard,
} from "@/features/authenticated/components/app-components";
import styles from "@/features/authenticated/components/app-pages.module.css";
import { diagnosisRecords } from "@/features/authenticated/data/app-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Diagnosis History", "निदान इतिहास") };
}

export default async function HistoryPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <>
      <PageHeader
        title={t("Diagnosis History & Record", "निदान इतिहास और रिकॉर्ड")}
        subtitle={t(
          "Review your past diagnoses and actions",
          "पिछले निदान और कार्रवाइयां देखें",
        )}
        backHref="/crop-doctor"
        action={
          <Link className={styles.primaryButton} href="/crop-doctor/capture">
            <Camera size={18} /> {t("New Diagnosis", "नया निदान")}
          </Link>
        }
      />
      <div className={styles.fourColumn}>
        <StatCard
          label={t("Total", "कुल")}
          value="24"
          detail={t("All time", "अब तक")}
          icon={<ClipboardList size={22} />}
        />
        <StatCard
          label={t("Confirmed", "पुष्टि हुई")}
          value="16"
          icon={<CheckCircle2 size={22} />}
        />
        <StatCard
          label={t("Low Confidence", "कम विश्वसनीयता")}
          value="5"
          icon={<TriangleAlert size={22} />}
        />
        <StatCard
          label={t("Expert Consulted", "विशेषज्ञ से परामर्श")}
          value="3"
          icon={<UserRoundCheck size={22} />}
        />
      </div>
      <div className={styles.toolbar}>
        <label className={styles.searchField}>
          <span aria-hidden="true">⌕</span>
          <input
            aria-label={t("Search diagnosis history", "निदान इतिहास खोजें")}
            placeholder={t(
              "Search by crop, problem or field",
              "फसल, समस्या या खेत से खोजें",
            )}
            type="search"
          />
        </label>
        <button className={styles.filterButton} type="button">
          {t("All Crops", "सभी फसलें")}
        </button>
        <button className={styles.filterButton} type="button">
          {t("Newest First", "नवीनतम पहले")}
        </button>
      </div>
      <div className={styles.stack}>
        {diagnosisRecords.map((record) => (
          <article className={styles.historyItem} key={t(record.disease)}>
            <div className={styles.historyImage}>
              <Image src={record.image} alt="" fill sizes="160px" />
            </div>
            <div>
              <h2>
                {t(record.disease)}{" "}
                <span className={styles.pill}>{t(record.status)}</span>
              </h2>
              <p>{t(record.crop)}</p>
              <p>{t(record.date)}</p>
              <p>
                {t("Confidence", "विश्वसनीयता")}: {record.confidence} ·{" "}
                <strong>{t(record.level)}</strong>
              </p>
            </div>
            <div className={styles.treatment}>
              <strong>
                {record.status.en === "Low Confidence"
                  ? t("Action Suggested", "सुझाई गई कार्रवाई")
                  : t(record.status)}
              </strong>
              {t(record.treatment)}
            </div>
            <Link
              className={styles.iconButton}
              href={
                record.status.en === "Low Confidence"
                  ? "/crop-doctor/low-confidence"
                  : "/crop-doctor/diagnosis"
              }
              aria-label={t(
                `View ${record.disease.en}`,
                `${record.disease.hi} देखें`,
              )}
            >
              <ChevronRight size={21} />
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
