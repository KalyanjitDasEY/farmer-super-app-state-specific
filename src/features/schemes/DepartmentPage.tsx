import {
  Apple,
  ArrowLeft,
  ArrowRight,
  CircleCheckBig,
  CircleX,
  Clock3,
  Info,
  ShieldCheck,
  Sprout,
  Store,
  UsersRound,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

import { PageShell } from "@/components/layout/PageShell";
import { withBasePath } from "@/config/base-path";
import { routes } from "@/config/routes";
import type { Department } from "@/domain/models";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

const departmentIcons: Record<string, LucideIcon> = {
  agriculture: Sprout,
  horticulture: Apple,
  marketing: Store,
  "bihar-marketing": Wheat,
  "bihar-recruitment": UsersRound,
  "bihar-seeds": ShieldCheck,
};

export function DepartmentPage({
  locale,
  dictionary,
  departments,
}: {
  locale: Locale;
  dictionary: Dictionary;
  departments: Department[];
}) {
  return (
    <PageShell
      locale={locale}
      dictionary={dictionary}
      authenticated
      activeNavigation="schemes"
    >
      <div className={`${styles.container} ${styles.section}`}>
        <nav
          className={styles.breadcrumb}
          aria-label={locale === "hi" ? "ब्रेडक्रंब" : "Breadcrumb"}
        >
          <a href={routes.home(locale)}>{dictionary["common.home"]}</a>
          <span>›</span>
          <a href={routes.schemes(locale)}>{dictionary["schemes.hubTitle"]}</a>
          <span>›</span>
          <span>{dictionary["departments.title"]}</span>
        </nav>
        <div className={styles.departmentIntro}>
          <div>
            <h1 className={styles.pageTitle}>
              {dictionary["departments.title"]}
            </h1>
            <p className={styles.pageLead}>
              {dictionary["departments.subtitle"]}
            </p>
          </div>
          <Image
            className={styles.departmentIllustration}
            src={withBasePath("/images/department-building-reference-v2.png")}
            alt=""
            width={400}
            height={225}
            priority
          />
        </div>

        <div className={`${styles.card} ${styles.departmentPanel}`}>
          <h2 className={styles.sectionHeading}>
            {locale === "hi"
              ? "केंद्रीय या बिहार राज्य विभाग / एजेंसी चुनें"
              : "Choose from Central or Bihar State Departments / Agencies"}
          </h2>
          <p className={styles.departmentPanelLead}>
            {locale === "hi"
              ? "आपका चयन संबंधित योजनाएं और सेवाएं दिखाने में मदद करेगा।"
              : "Your selection will help us show you the relevant schemes and services."}
          </p>
          <section
            className={`${styles.grid} ${styles.departmentGrid} ${styles.sectionCompact}`}
          >
            {departments.map((department) => {
              const DepartmentIcon = departmentIcons[department.id] ?? Sprout;
              return (
                <article
                  className={`${styles.card} ${styles.departmentCard}`}
                  key={department.id}
                >
                  <div className={styles.departmentCardHeader}>
                    <span className={styles.softIcon}>
                      <DepartmentIcon size={32} aria-hidden="true" />
                    </span>
                    <div>
                      <h2>{department.name[locale]}</h2>
                      <span className={styles.badge}>
                        {department.type === "agency"
                          ? dictionary["common.agency"]
                          : dictionary["common.department"]}
                      </span>
                    </div>
                  </div>
                  <p>{department.description[locale]}</p>
                  <a
                    className={styles.departmentArrow}
                    aria-disabled={!department.available ? "true" : undefined}
                    href={`${routes.schemeCatalogue(locale)}?jurisdiction=bihar&agency=${department.id}`}
                  >
                    <span className="sr-only">
                      {department.available
                        ? dictionary["common.viewDetails"]
                        : dictionary["common.notAvailable"]}
                    </span>
                    <ArrowRight size={26} />
                  </a>
                </article>
              );
            })}
          </section>
          <div className={`${styles.notice} ${styles.noticeSuccess}`}>
            <Info size={26} aria-hidden="true" />
            <div>
              <strong>
                {locale === "hi" ? "महत्वपूर्ण सूचना" : "Important Note"}
              </strong>
              <p>{dictionary["departments.note"]}</p>
            </div>
          </div>
          <section
            className={`${styles.card} ${styles.departmentStatusLegend}`}
            aria-label={locale === "hi" ? "स्थिति संकेतक" : "Status indicators"}
          >
            <h2>{locale === "hi" ? "स्थिति संकेतक" : "Status Indicators"}</h2>
            <div>
              <CircleCheckBig aria-hidden="true" />
              <span>
                <strong>{locale === "hi" ? "उपलब्ध" : "Available"}</strong>
                {locale === "hi" ? "सेवा उपलब्ध है" : "Service is available"}
              </span>
            </div>
            <div>
              <Clock3 aria-hidden="true" />
              <span>
                <strong>{locale === "hi" ? "लोड हो रहा है" : "Loading"}</strong>
                {locale === "hi"
                  ? "विभाग प्राप्त किए जा रहे हैं"
                  : "Fetching departments or agencies"}
              </span>
            </div>
            <div>
              <CircleX aria-hidden="true" />
              <span>
                <strong>{dictionary["common.notAvailable"]}</strong>
                {locale === "hi"
                  ? "सेवा अभी उपलब्ध नहीं है"
                  : "Service is currently unavailable"}
              </span>
            </div>
          </section>
        </div>
        <a
          className={`${styles.button} ${styles.buttonSecondary} ${styles.backButton}`}
          href={routes.schemes(locale)}
        >
          <ArrowLeft size={18} />
          {dictionary["common.back"]}
        </a>
      </div>
    </PageShell>
  );
}
