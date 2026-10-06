import {
  Activity,
  BadgeCheck,
  FileText,
  IdCard,
  Landmark,
  Map,
  ShieldCheck,
  UsersRound,
  WalletCards,
} from "lucide-react";
import Image from "next/image";

import { withBasePath } from "@/config/base-path";
import { routes } from "@/config/routes";
import type { DashboardSnapshot } from "@/domain/models";
import type { Dictionary } from "@/i18n/dictionaries";
import { createTranslator } from "@/i18n/localized-text";
import { formatCurrency, formatNumber } from "@/lib/format";
import styles from "@/styles/application.module.css";
import type { Locale } from "@/types/locale";

export function FarmerProfileOverview({
  locale,
  dictionary,
  snapshot,
}: {
  locale: Locale;
  dictionary: Dictionary;
  snapshot: DashboardSnapshot;
}) {
  const t = createTranslator(locale);
  const profileServices = [
    {
      title: dictionary["profile.digitalId"],
      description: t(
        "View your sample farmer ID and its QR code.",
        "अपनी नमूना किसान आईडी और उसका क्यूआर कोड देखें।",
      ),
      href: routes.profileDigitalId(locale),
      icon: IdCard,
    },
    {
      title: dictionary["profile.wallet"],
      description: t(
        "Explore sample credentials for the demo.",
        "डेमो के नमूना क्रेडेंशियल देखें।",
      ),
      href: routes.profileWallet(locale),
      icon: WalletCards,
    },
    {
      title: dictionary["profile.consent"],
      description: dictionary["profile.consentDescription"],
      href: routes.profileConsent(locale),
      icon: ShieldCheck,
    },
    {
      title: dictionary["profile.representatives"],
      description: dictionary["profile.representativesDescription"],
      href: routes.profileRepresentatives(locale),
      icon: UsersRound,
    },
    {
      title: dictionary["profile.audit"],
      description: dictionary["profile.auditDescription"],
      href: routes.profileAudit(locale),
      icon: Activity,
    },
  ];

  return (
    <div className={styles.profileOverview}>
      <section className={`${styles.card} ${styles.dashboardWelcome}`}>
        <Image
          className={styles.avatar}
          src={withBasePath("/images/farmer-avatar-bihar.svg")}
          alt={t("Illustrative farmer avatar", "किसान का सांकेतिक चित्र")}
          width={122}
          height={122}
          priority
        />
        <div>
          <p>{dictionary["home.welcome"]}</p>
          <h2 className={styles.profileName}>{snapshot.farmerName[locale]}</h2>
          <p>{snapshot.farmerId}</p>
          <span className={styles.badge}>
            <BadgeCheck size={16} aria-hidden="true" />
            {t("Demo Profile", "डेमो प्रोफाइल")}
          </span>
        </div>
        <div className={styles.summaryPair}>
          <div>
            <strong>
              {dictionary["home.aadhaar"]}{" "}
              {t("(masked demo)", "(छिपाया गया डेमो)")}
            </strong>
            <p>{snapshot.aadhaarMasked}</p>
          </div>
          <div>
            <strong>{dictionary["home.landSummary"]}</strong>
            <p>
              {formatNumber(snapshot.landAreaHectares, locale)}{" "}
              {dictionary["common.hectareShort"]} (
              {formatNumber(snapshot.khasraCount, locale)}{" "}
              {dictionary["common.khasra"]})
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.grid} ${styles.dashboardGrid}`}>
        <article className={`${styles.card} ${styles.metricCard}`}>
          <Landmark size={30} aria-hidden="true" />
          <h2>{dictionary["home.benefit"]}</h2>
          <p className={styles.metricValue}>
            {formatCurrency(snapshot.benefitAmount, locale)}
          </p>
          <a href={routes.schemeDetail(locale, "pm-kisan")}>
            {dictionary["common.viewDetails"]}
          </a>
        </article>
        <article className={`${styles.card} ${styles.metricCard}`}>
          <Map size={30} aria-hidden="true" />
          <h2>{dictionary["home.cadastral"]}</h2>
          <p className={styles.metricValue}>
            {formatNumber(snapshot.khasraCount, locale)}{" "}
            {dictionary["common.khasra"]}
          </p>
          <p>
            {formatNumber(snapshot.landAreaHectares, locale)}{" "}
            {dictionary["common.hectareShort"]}
          </p>
        </article>
        <article className={`${styles.card} ${styles.metricCard}`}>
          <ShieldCheck size={30} aria-hidden="true" />
          <h2>{dictionary["home.ekyc"]}</h2>
          <p className={styles.metricValue}>{t("Demo only", "केवल डेमो")}</p>
        </article>
        <article className={`${styles.card} ${styles.metricCard}`}>
          <FileText size={30} aria-hidden="true" />
          <h2>{dictionary["home.applications"]}</h2>
          <p className={styles.metricValue}>
            {formatNumber(snapshot.applicationCount, locale)}
          </p>
          <a href={routes.tracking(locale)}>
            {dictionary["common.viewDetails"]}
          </a>
        </article>
      </section>

      <section>
        <h2 className={styles.profileServicesTitle}>
          {dictionary["profile.services"]}
        </h2>
        <div className={styles.profileFeatureTiles}>
          {profileServices.map(({ title, description, href, icon: Icon }) => (
            <a className={styles.profileFeatureTile} href={href} key={href}>
              <span>
                <Icon size={25} aria-hidden="true" />
              </span>
              <div>
                <strong>{title}</strong>
                <small>{description}</small>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className={`${styles.notice} ${styles.noticeSuccess}`}>
        <ShieldCheck size={24} aria-hidden="true" />
        <span>{dictionary["profile.notice"]}</span>
      </div>
    </div>
  );
}
