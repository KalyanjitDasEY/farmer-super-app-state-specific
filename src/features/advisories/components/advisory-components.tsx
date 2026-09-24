import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  ChevronRight,
  House,
  Leaf,
  MapPin,
  MessageCircleMore,
  MoreVertical,
  RefreshCw,
  Sprout,
  Wheat,
} from "lucide-react";

import {
  advisoryText,
  type AdvisoryItem,
} from "@/features/advisories/data/advisory-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

import styles from "./advisories.module.css";

export async function AdvisoryHeader({
  title,
  subtitle,
  backHref,
}: {
  title: string;
  subtitle: string;
  backHref?: string;
}) {
  const t = createTranslator(await getRequestLocale());
  return (
    <header className={styles.moduleHeader}>
      <div className={styles.headerBrand}>
        {backHref ? (
          <Link href={backHref} aria-label={t("Go back", "वापस जाएं")}>
            <ArrowLeft size={27} />
          </Link>
        ) : null}
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
          <MessageCircleMore size={20} />
          <span>{t("Ask Bharati", "भारती से पूछें")}</span>
        </Link>
        <Link
          className={styles.notificationLink}
          href="/more"
          aria-label={t("Notifications", "सूचनाएं")}
        >
          <Bell size={23} />
          <b>3</b>
        </Link>
      </div>
    </header>
  );
}

export async function AdvisoryContext({
  reminder = false,
  detail = false,
}: {
  reminder?: boolean;
  detail?: boolean;
}) {
  const t = createTranslator(await getRequestLocale());
  if (reminder) {
    return (
      <section
        className={`${styles.contextBar} ${styles.reminderContext}`}
        aria-label={t("Reminder context", "रिमाइंडर संदर्भ")}
      >
        <ContextItem
          icon={Sprout}
          label={t("Advisory", "सलाह")}
          value={t(
            "Leaf Blast Risk Increasing",
            "पत्ती झुलसा का जोखिम बढ़ रहा है",
          )}
          detail={t("High Priority", "उच्च प्राथमिकता")}
          alert
        />
        <ContextItem
          icon={House}
          label={t("Farm", "फार्म")}
          value="Ram Prasad Farm"
          detail={t("Field 1", "खेत 1")}
        />
        <ContextItem
          icon={Wheat}
          label={t("Crop", "फसल")}
          value={t("Paddy (Dhan)", "धान")}
          detail="Pusa Basmati 1121"
        />
        <ContextItem
          icon={Sprout}
          label={t("Stage", "अवस्था")}
          value={t("Tillering Stage", "कल्ले निकलने की अवस्था")}
          detail="25–30 DAT"
        />
        <ContextItem
          icon={CalendarDays}
          label={t("Issued On", "जारी किया")}
          value={t("20 May 2024", "20 मई 2024")}
          detail={t("08:30 AM", "08:30 पूर्वाह्न")}
        />
      </section>
    );
  }

  return (
    <section
      className={styles.contextBar}
      aria-label={t("Advisory farm context", "सलाह का खेत संदर्भ")}
    >
      <ContextItem
        icon={House}
        label={t("Selected Farm", "चयनित फार्म")}
        value="Ram Prasad Farm"
        detail={t(
          "Field 1  •  2.50 Acre|Pusa Basmati 1121",
          "खेत 1  •  2.50 एकड़|पूसा बासमती 1121",
        )}
      />
      <ContextItem
        icon={MapPin}
        label={t("Location", "स्थान")}
        value="Raipur, Deoria"
        detail={t("Uttar Pradesh|274 km away", "उत्तर प्रदेश|274 किमी दूर")}
      />
      <ContextItem
        icon={Sprout}
        label={t("Crop Stage", "फसल अवस्था")}
        value={t("Tillering Stage", "कल्ले निकलने की अवस्था")}
        detail="25–30 DAT"
      />
      <ContextItem
        icon={CalendarDays}
        label={
          detail
            ? t("Issued On", "जारी किया")
            : t("Last Updated", "अंतिम अपडेट")
        }
        value={t("20 May 2024", "20 मई 2024")}
        detail={t("08:30 AM", "08:30 पूर्वाह्न")}
      />
      {detail ? (
        <button type="button" aria-label={t("More options", "और विकल्प")}>
          <MoreVertical size={22} />
        </button>
      ) : (
        <RefreshCw
          size={19}
          aria-label={t("Refresh advisories", "सलाह रीफ्रेश करें")}
        />
      )}
    </section>
  );
}

function ContextItem({
  icon: Icon,
  label,
  value,
  detail,
  alert = false,
}: {
  icon: typeof Sprout;
  label: string;
  value: string;
  detail: string;
  alert?: boolean;
}) {
  return (
    <div className={styles.contextItem}>
      <span className={styles.contextIcon}>
        <Icon size={24} />
      </span>
      <span>
        <small>{label}</small>
        <strong>{value}</strong>
        {detail.split("|").map((line) => (
          <em className={alert ? styles.alertText : undefined} key={line}>
            {line}
          </em>
        ))}
      </span>
    </div>
  );
}

export async function AdvisoryCard({ advisory }: { advisory: AdvisoryItem }) {
  const t = createTranslator(await getRequestLocale());
  const Icon = advisory.icon;
  const href =
    advisory.slug === "leaf-blast" ? "/advisories/leaf-blast" : "/advisories";

  return (
    <article className={`${styles.advisoryCard} ${styles[advisory.tone]}`}>
      <span className={styles.cardIcon}>
        <Icon size={28} />
      </span>
      <div className={styles.cardSummary}>
        <h2>{t(advisoryText(advisory.title))}</h2>
        <span className={styles.cardLabel}>
          {t(advisoryText(advisory.label))}
        </span>
        <p>{t(advisoryText(advisory.description))}</p>
        <div className={styles.cardScope}>
          {advisory.scope.map((scope) => (
            <span key={scope}>
              <Sprout size={14} />
              {t(advisoryText(scope))}
            </span>
          ))}
        </div>
      </div>
      <time>
        <CalendarDays size={16} />
        {t(advisoryText(advisory.date))}
      </time>
      <aside>
        <strong>{t(advisoryText(advisory.actionLabel))}</strong>
        <p>{t(advisoryText(advisory.action))}</p>
        <Link href={href}>
          {t(advisoryText(advisory.buttonLabel))}
          <ChevronRight size={18} />
        </Link>
      </aside>
      <button
        className={styles.moreButton}
        type="button"
        aria-label={t(
          `More options for ${advisory.title}`,
          `${t(advisoryText(advisory.title))} के और विकल्प`,
        )}
      >
        <MoreVertical size={20} />
      </button>
    </article>
  );
}
