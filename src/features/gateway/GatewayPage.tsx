import {
  ArrowRight,
  BarChart3,
  CloudSun,
  FileSearch,
  Gift,
  Headphones,
  Landmark,
  Leaf,
  Link2,
  LockKeyhole,
  LogIn,
  ShieldCheck,
  UserPlus,
  UserRound,
} from "lucide-react";
import Image from "next/image";

import { PageShell } from "@/components/layout/PageShell";
import { withBasePath } from "@/config/base-path";
import { routes } from "@/config/routes";
import type { Dictionary, TranslationKey } from "@/i18n/dictionaries";
import { createTranslator } from "@/i18n/localized-text";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

const actions = [
  {
    title: "gateway.login",
    description: "gateway.loginDescription",
    route: "login",
    icon: LogIn,
    tone: "",
  },
  {
    title: "gateway.sso",
    description: "gateway.ssoDescription",
    route: "sso",
    icon: Landmark,
    tone: styles.toneBlue,
  },
  {
    title: "gateway.register",
    description: "gateway.registerDescription",
    route: "register",
    icon: UserPlus,
    tone: styles.toneOrange,
  },
  {
    title: "gateway.track",
    description: "gateway.trackDescription",
    route: "track",
    icon: FileSearch,
    tone: styles.tonePurple,
  },
] as const;

const services = [
  [
    "gateway.service.schemes",
    Gift,
    "Explore and apply for agriculture schemes",
    "कृषि योजनाएं देखें और आवेदन करें",
  ],
  [
    "gateway.service.market",
    BarChart3,
    "Explore indicative mandi prices across Bihar",
    "बिहार के सांकेतिक मंडी भाव देखें",
  ],
  [
    "gateway.service.applications",
    FileSearch,
    "Track your applications in real time",
    "अपने आवेदनों की स्थिति तुरंत देखें",
  ],
  [
    "gateway.service.profile",
    UserRound,
    "View and manage your farmer profile",
    "अपनी किसान प्रोफाइल देखें और प्रबंधित करें",
  ],
  [
    "gateway.service.weather",
    CloudSun,
    "Get district-wise forecasts and alerts",
    "जिलेवार पूर्वानुमान और चेतावनियां पाएं",
  ],
  [
    "gateway.service.identity",
    ShieldCheck,
    "Access secure digital credentials",
    "सुरक्षित डिजिटल प्रमाण-पत्र देखें",
  ],
] as const;

export function GatewayPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const t = createTranslator(locale);
  const actionHref = (route: (typeof actions)[number]["route"]) => {
    if (route === "login") return routes.login(locale);
    if (route === "register") return routes.registerIdentity(locale);
    if (route === "track") return routes.tracking(locale);
    return "#department-sso";
  };

  return (
    <PageShell
      locale={locale}
      dictionary={dictionary}
      footer
      showFullscreen={false}
    >
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>
              {dictionary["gateway.eyebrow"]}
            </p>
            <h1 className={styles.heroTitle}>{dictionary["gateway.title"]}</h1>
            <p className={styles.heroDescription}>
              {dictionary["gateway.description"]}
            </p>
          </div>
          <Image
            className={styles.heroImage}
            src={withBasePath("/images/gateway-bihar-farmer.jpg")}
            alt=""
            width={524}
            height={464}
            priority
            sizes="(max-width: 760px) 62vw, 50vw"
          />
        </div>
      </section>

      <div className={`${styles.container} ${styles.actionsOverlap}`}>
        <div className={`${styles.grid} ${styles.actionGrid}`}>
          {actions.map((action) => (
            <article
              className={`${styles.card} ${styles.actionCard} ${action.tone}`}
              key={action.title}
              id={action.route === "sso" ? "department-sso" : undefined}
            >
              <span className={styles.roundIcon} aria-hidden="true">
                <action.icon size={34} />
              </span>
              <h2>{dictionary[action.title]}</h2>
              <p>{dictionary[action.description]}</p>
              <a
                className={styles.button}
                href={actionHref(action.route)}
                aria-disabled={action.route === "sso" ? "true" : undefined}
              >
                {dictionary[action.title]}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>

      <section className={`${styles.container} ${styles.section}`}>
        <h2 className={styles.sectionHeading}>
          <Leaf size={26} aria-hidden="true" />{" "}
          {dictionary["gateway.keyServices"]}
        </h2>
        <div className={`${styles.grid} ${styles.serviceGrid}`}>
          {services.map(([key, Icon, description, hindiDescription]) => (
            <article
              className={`${styles.card} ${styles.serviceCard}`}
              key={key}
            >
              <Icon size={36} aria-hidden="true" />
              <h3>{dictionary[key]}</h3>
              <p>{t(description, hindiDescription)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.container} ${styles.sectionCompact}`}>
        <div className={styles.notice}>
          <ShieldCheck size={26} aria-hidden="true" />
          <strong>{dictionary["gateway.official"]}</strong>
        </div>
      </section>

      <section
        className={`${styles.container} ${styles.sectionCompact}`}
        id="help"
      >
        <div className={`${styles.grid} ${styles.supportGrid}`}>
          <article
            className={`${styles.card} ${styles.cardPad} ${styles.supportCard}`}
          >
            <LockKeyhole size={30} aria-hidden="true" />
            <h2>{dictionary["gateway.security"]}</h2>
            <ul>
              {(
                [
                  "gateway.securityPoint1",
                  "gateway.securityPoint2",
                  "gateway.securityPoint3",
                ] as TranslationKey[]
              ).map((key) => (
                <li key={key}>{dictionary[key]}</li>
              ))}
              <li>
                {t(
                  "Demo: do not enter real identity or payment details",
                  "डेमो: वास्तविक पहचान या भुगतान विवरण दर्ज न करें",
                )}
              </li>
              <li>
                {t(
                  "Bihar-focused demonstration, not an official government service",
                  "बिहार पर केंद्रित डेमो, आधिकारिक सरकारी सेवा नहीं",
                )}
              </li>
            </ul>
          </article>
          <article
            className={`${styles.card} ${styles.cardPad} ${styles.supportCard}`}
          >
            <Link2 size={30} aria-hidden="true" />
            <h2>{dictionary["gateway.links"]}</h2>
            <ul>
              <li>
                <a href={routes.schemes(locale)}>
                  {dictionary["gateway.service.schemes"]}
                </a>
              </li>
              <li>
                <a href={routes.tracking(locale)}>
                  {dictionary["gateway.service.applications"]}
                </a>
              </li>
              <li>
                <a href={routes.more(locale)}>
                  {dictionary["gateway.service.market"]}
                </a>
              </li>
              <li>
                <a href="#help">{dictionary["gateway.support"]}</a>
              </li>
            </ul>
          </article>
          <article
            className={`${styles.card} ${styles.cardPad} ${styles.supportCard}`}
          >
            <Headphones size={30} aria-hidden="true" />
            <h2>{dictionary["gateway.support"]}</h2>
            <p>{dictionary["gateway.supportText"]}</p>
            <p>
              {t(
                "For official assistance, consult the Bihar Agriculture Department website.",
                "आधिकारिक सहायता के लिए बिहार कृषि विभाग की वेबसाइट देखें।",
              )}
            </p>
            <a href="https://dbtagriculture.bihar.gov.in/">
              {t("Bihar Agriculture DBT portal", "बिहार कृषि डीबीटी पोर्टल")}
            </a>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
