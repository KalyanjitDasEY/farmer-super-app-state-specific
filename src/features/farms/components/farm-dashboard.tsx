"use client";

import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDownUp,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  EllipsisVertical,
  Filter,
  House,
  Leaf,
  MapPin,
  Plus,
  Search,
  Sprout,
  Wheat,
} from "lucide-react";

import {
  farmStageLabels,
  farms,
  type Farm,
  type FarmField,
} from "@/features/farms/data/farm-data";
import { useLocale } from "@/i18n/LocaleProvider";

import styles from "./farms.module.css";

const stageClass = {
  Growing: styles.growing,
  Tillering: styles.tillering,
  Flowering: styles.flowering,
  "Grand Growth": styles.growing,
  Vegetative: styles.vegetative,
} as const;

function FarmFieldRow({ field }: { field: FarmField }) {
  const { t } = useLocale();
  return (
    <Link className={styles.fieldRow} href="/advisories">
      <Image
        src={field.image}
        width={110}
        height={70}
        alt={t(
          `${t(field.crop)} in ${t(field.name)}`,
          `${t(field.name)} में ${t(field.crop)}`,
        )}
      />
      <span className={styles.fieldIdentity}>
        <strong>{t(field.name)}</strong>
        <small>{t(field.khasra)}</small>
      </span>
      <span className={styles.cropIdentity}>
        <Wheat size={23} />
        <span>
          <strong>{t(field.crop)}</strong>
          <small>{t(field.activity)}</small>
        </span>
      </span>
      <span className={`${styles.stageBadge} ${stageClass[field.stage]}`}>
        {t(farmStageLabels[field.stage])}
      </span>
      <b className={styles.fieldArea}>
        {field.area.toFixed(2)} {t("acres", "एकड़")}
      </b>
      <ChevronRight className={styles.rowArrow} size={19} />
    </Link>
  );
}

function FarmActions({ farmId }: { farmId: string }) {
  const { t } = useLocale();
  return (
    <nav
      className={styles.farmActions}
      aria-label={t(`Actions for ${farmId}`, `${farmId} के लिए कार्रवाइयां`)}
    >
      <Link href="/farms">
        <House size={18} />
        {t("Farm Details", "फार्म का विवरण")}
      </Link>
      <Link href="/farms/new">
        <Plus size={18} />
        {t("Add Field", "खेत जोड़ें")}
      </Link>
      <Link href="/advisories">
        <Leaf size={18} />
        {t("Farm Advisory", "फार्म सलाह")}
      </Link>
      <Link href="/advisories">
        <ClipboardList size={18} />
        {t("Activity Log", "गतिविधि रिकॉर्ड")}
      </Link>
      <button type="button">
        <EllipsisVertical size={18} />
        {t("More", "और")}
      </button>
    </nav>
  );
}

function FarmCard({
  farm,
  initiallyExpanded,
}: {
  farm: Farm;
  initiallyExpanded: boolean;
}) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const { t } = useLocale();
  const farmName = t(farm.name);
  return (
    <article className={styles.farmCard}>
      <header className={styles.farmCardHeader}>
        <Image
          src={farm.image}
          width={120}
          height={76}
          alt={t(`${farmName} landscape`, `${farmName} का दृश्य`)}
          loading={farm.primary ? "eager" : "lazy"}
        />
        <div>
          <span className={styles.nameLine}>
            <h2>{farmName}</h2>
            {farm.primary ? <em>{t("Primary Farm", "मुख्य फार्म")}</em> : null}
          </span>
          <p>
            <MapPin size={15} />
            {t(farm.location)}
          </p>
        </div>
        <strong>
          {farm.area.toFixed(2)} {t("acres", "एकड़")}
        </strong>
        <button
          onClick={() => setExpanded((value) => !value)}
          type="button"
          aria-expanded={expanded}
          aria-label={t(
            `${expanded ? "Collapse" : "Expand"} ${farmName}`,
            `${farmName} ${expanded ? "समेटें" : "खोलें"}`,
          )}
        >
          {expanded ? (
            <EllipsisVertical size={21} />
          ) : (
            <ChevronDown size={21} />
          )}
        </button>
      </header>
      {expanded ? (
        <>
          <div className={styles.fieldCount}>
            {farm.fields.length} {t("Fields", "खेत")}
          </div>
          <div className={styles.fieldList}>
            {farm.fields.map((field) => (
              <FarmFieldRow field={field} key={field.id} />
            ))}
          </div>
          <FarmActions farmId={farmName} />
        </>
      ) : null}
    </article>
  );
}

export function FarmDashboard() {
  const { locale, t } = useLocale();
  const [query, setQuery] = useState("");
  const [primaryOnly, setPrimaryOnly] = useState(false);
  const [descending, setDescending] = useState(true);
  const visibleFarms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return farms
      .filter((farm) => !primaryOnly || farm.primary)
      .filter(
        (farm) =>
          !normalizedQuery ||
          t(farm.name).toLocaleLowerCase(locale).includes(normalizedQuery) ||
          t(farm.location)
            .toLocaleLowerCase(locale)
            .includes(normalizedQuery) ||
          farm.fields.some((field) =>
            `${t(field.name)} ${t(field.crop)} ${t(field.khasra)}`
              .toLocaleLowerCase(locale)
              .includes(normalizedQuery),
          ),
      )
      .toSorted((left, right) =>
        descending ? right.area - left.area : left.area - right.area,
      );
  }, [descending, locale, primaryOnly, query, t]);

  return (
    <div className={styles.dashboard}>
      <section className={styles.statsGrid}>
        <div>
          <span>
            <House size={25} />
          </span>
          <small>{t("Total Farms", "कुल फार्म")}</small>
          <strong>3</strong>
        </div>
        <div>
          <span>
            <Sprout size={25} />
          </span>
          <small>{t("Total Fields", "कुल खेत")}</small>
          <strong>7</strong>
        </div>
        <div>
          <span>
            <ArrowDownUp size={25} />
          </span>
          <small>{t("Total Area", "कुल क्षेत्रफल")}</small>
          <strong>
            18.40 <em>{t("acres", "एकड़")}</em>
          </strong>
        </div>
        <div>
          <span>
            <Leaf size={25} />
          </span>
          <small>{t("Active Crops", "सक्रिय फसलें")}</small>
          <strong>5</strong>
        </div>
        <div>
          <span>
            <CalendarDays size={25} />
          </span>
          <small>{t("Upcoming Activities", "आगामी गतिविधियां")}</small>
          <strong>4</strong>
        </div>
      </section>

      <section className={styles.toolbar}>
        <label>
          <Search size={21} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder={t(
              "Search farms or fields...",
              "फार्म या खेत खोजें...",
            )}
          />
        </label>
        <button
          className={primaryOnly ? styles.activeControl : ""}
          onClick={() => setPrimaryOnly((value) => !value)}
          type="button"
        >
          <Filter size={19} />
          {t("Filter", "फ़िल्टर")}
        </button>
        <button onClick={() => setDescending((value) => !value)} type="button">
          <ArrowDownUp size={19} />
          {t("Sort", "क्रमबद्ध करें")}
        </button>
      </section>

      <section className={styles.farmList} aria-live="polite">
        {visibleFarms.map((farm, index) => (
          <FarmCard farm={farm} initiallyExpanded={index < 2} key={farm.id} />
        ))}
        {visibleFarms.length === 0 ? (
          <p className={styles.emptyState}>
            {t(
              "No farms or fields match your search.",
              "आपकी खोज से कोई फार्म या खेत मेल नहीं खाता।",
            )}
          </p>
        ) : null}
      </section>

      <section className={styles.recordsReminder}>
        <span>
          <Sprout size={31} />
        </span>
        <div>
          <strong>
            {t(
              "Keep your farm records updated",
              "अपने फार्म के रिकॉर्ड अद्यतन रखें",
            )}
          </strong>
          <p>
            {t(
              "Accurate farm and field details help us provide better advisories and recommendations.",
              "फार्म और खेत की सही जानकारी हमें बेहतर सलाह और सिफारिशें देने में मदद करती है।",
            )}
          </p>
        </div>
        <Link href="/farms/new">{t("Update Now", "अभी अपडेट करें")}</Link>
      </section>
    </div>
  );
}
