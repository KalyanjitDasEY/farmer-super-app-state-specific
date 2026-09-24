import {
  ArrowLeft,
  BadgeIndianRupee,
  CalendarDays,
  CircleCheckBig,
  ClipboardList,
  FileText,
  Flag,
  FolderOpen,
  Info,
  Landmark,
  Sprout,
  Target,
  UsersRound,
  UserRoundCheck,
} from "lucide-react";
import Image from "next/image";

import { PageShell } from "@/components/layout/PageShell";
import { withBasePath } from "@/config/base-path";
import { routes } from "@/config/routes";
import type { BeneficiaryStatus, SchemeDetail } from "@/domain/models";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatCurrency, formatDateTime, formatNumber } from "@/lib/format";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

export function SchemeDetailPage({
  locale,
  dictionary,
  scheme,
  beneficiary,
}: {
  locale: Locale;
  dictionary: Dictionary;
  scheme: SchemeDetail;
  beneficiary?: BeneficiaryStatus;
}) {
  return (
    <PageShell
      locale={locale}
      dictionary={dictionary}
      authenticated
      activeNavigation="schemes"
    >
      <div className={`${styles.container} ${styles.sectionCompact}`}>
        <nav
          className={styles.breadcrumb}
          aria-label={locale === "hi" ? "ब्रेडक्रंब" : "Breadcrumb"}
        >
          <a href={routes.home(locale)}>{dictionary["common.home"]}</a>
          <span>›</span>
          <a href={routes.schemeCatalogue(locale)}>
            {dictionary["common.schemes"]}
          </a>
          <span>›</span>
          <span>{scheme.title[locale]}</span>
          <a
            className={`${styles.button} ${styles.buttonSecondary} ${styles.breadcrumbBack}`}
            href={routes.schemeCatalogue(locale)}
          >
            <ArrowLeft size={18} />
            {dictionary["common.back"]}
          </a>
        </nav>

        <section className={`${styles.card} ${styles.detailHeader}`}>
          <div className={styles.detailSummary}>
            <span className={styles.badge}>
              {scheme.jurisdiction === "central"
                ? dictionary["schemes.central"]
                : dictionary["schemes.rajasthan"]}
            </span>
            <div className={styles.detailTitleRow}>
              <Image
                className={styles.detailSchemeLogo}
                src={withBasePath(
                  scheme.id === "pm-kisan"
                    ? "/images/central-government-emblem-v2.png"
                    : "/images/scheme-pm-kisan-icon-v2.png",
                )}
                alt=""
                width={110}
                height={110}
                priority
              />
              <div>
                <h1>{scheme.title[locale]}</h1>
                <span className={styles.detailCategory}>
                  <Sprout size={17} aria-hidden="true" />
                  {locale === "hi"
                    ? "आय सहायता योजना"
                    : "Income Support Scheme"}
                </span>
                <p>{scheme.summary[locale]}</p>
              </div>
            </div>
            <div className={styles.detailAgencyGrid}>
              <span>
                <Landmark size={19} aria-hidden="true" />
                {locale === "hi"
                  ? "कृषि एवं किसान कल्याण विभाग"
                  : "Department of Agriculture & Farmers Welfare"}
              </span>
              <span>
                <Flag size={19} aria-hidden="true" />
                {scheme.jurisdiction === "central"
                  ? locale === "hi"
                    ? "भारत सरकार"
                    : "Government of India"
                  : locale === "hi"
                    ? "राजस्थान सरकार"
                    : "Government of Rajasthan"}
              </span>
            </div>
          </div>
          <div className={styles.detailMetadata}>
            <div>
              <ClipboardList size={20} aria-hidden="true" />
              <span>{dictionary["scheme.code"]}</span>
              <strong>{scheme.code}</strong>
            </div>
            <div>
              <CalendarDays size={20} aria-hidden="true" />
              <span>{dictionary["scheme.launchYear"]}</span>
              <strong>{scheme.id === "pm-kisan" ? "2019" : "—"}</strong>
            </div>
            <div>
              <Landmark size={20} aria-hidden="true" />
              <span>{locale === "hi" ? "नोडल एजेंसी" : "Nodal Agency"}</span>
              <strong>
                {locale === "hi"
                  ? "कृषि एवं किसान कल्याण विभाग"
                  : "Department of Agriculture & Farmers Welfare"}
              </strong>
            </div>
            <div>
              <Sprout size={20} aria-hidden="true" />
              <span>{locale === "hi" ? "श्रेणी" : "Category"}</span>
              <strong>
                {locale === "hi" ? "आय सहायता" : "Income Support"}
              </strong>
            </div>
            <div>
              <UsersRound size={20} aria-hidden="true" />
              <span>
                {locale === "hi" ? "लक्षित लाभार्थी" : "Target Beneficiaries"}
              </span>
              <strong>{scheme.eligibility[0]?.[locale]}</strong>
            </div>
          </div>
        </section>

        <nav
          className={styles.tabs}
          aria-label={locale === "hi" ? "योजना अनुभाग" : "Scheme sections"}
        >
          <a className={styles.tab} href="#overview">
            <Target size={18} aria-hidden="true" />
            {dictionary["scheme.purpose"]}
          </a>
          <a className={styles.tab} href="#eligibility">
            <UserRoundCheck size={18} aria-hidden="true" />
            {dictionary["scheme.eligibility"]}
          </a>
          <a className={styles.tab} href="#benefits">
            <BadgeIndianRupee size={18} aria-hidden="true" />
            {dictionary["scheme.benefit"]}
          </a>
          <a className={styles.tab} href="#documents">
            <FileText size={18} aria-hidden="true" />
            {dictionary["scheme.documents"]}
          </a>
          <a className={styles.tab} href="#context">
            <ClipboardList size={18} aria-hidden="true" />
            {dictionary["scheme.context"]}
          </a>
          <a className={styles.tab} href="#important">
            <Info size={18} aria-hidden="true" />
            {dictionary["scheme.important"]}
          </a>
        </nav>

        <div className={styles.twoColumn}>
          <div className={styles.grid}>
            <section
              className={`${styles.card} ${styles.detailSection}`}
              id="overview"
            >
              <Target size={30} aria-hidden="true" />
              <h2>{dictionary["scheme.purpose"]}</h2>
              <p>{scheme.purpose[locale]}</p>
            </section>
            <section className={`${styles.card} ${styles.detailSection}`}>
              <FileText size={30} aria-hidden="true" />
              <h2>{dictionary["scheme.description"]}</h2>
              <p>{scheme.description[locale]}</p>
            </section>
            <section
              className={`${styles.card} ${styles.detailSection}`}
              id="benefits"
            >
              <BadgeIndianRupee size={30} aria-hidden="true" />
              <h2>{dictionary["scheme.benefit"]}</h2>
              <div className={styles.detailBenefitInline}>
                <div>
                  <strong>{scheme.benefit[locale]}</strong>
                  {scheme.id === "pm-kisan" ? (
                    <span>
                      {locale === "hi"
                        ? "(₹2,000 की 3 समान किस्तें)"
                        : "(₹2,000 in 3 equal installments)"}
                    </span>
                  ) : null}
                </div>
                <span>
                  <Landmark size={28} aria-hidden="true" />
                  {locale === "hi"
                    ? "आधार से जुड़े बैंक खाते में प्रत्यक्ष लाभ अंतरण"
                    : "Direct Benefit Transfer to Aadhaar-seeded bank account"}
                </span>
              </div>
            </section>
            <section
              className={`${styles.card} ${styles.detailSection}`}
              id="eligibility"
            >
              <UserRoundCheck size={30} aria-hidden="true" />
              <h2>{dictionary["scheme.eligibility"]}</h2>
              <ul>
                {scheme.eligibility.map((item) => (
                  <li key={item.en}>{item[locale]}</li>
                ))}
              </ul>
            </section>
            <section
              className={`${styles.card} ${styles.detailSection}`}
              id="documents"
            >
              <FolderOpen size={30} aria-hidden="true" />
              <h2>{dictionary["scheme.documents"]}</h2>
              <ul className={styles.documentGrid}>
                {scheme.documents.map((item) => (
                  <li key={item.en}>
                    <FileText size={19} aria-hidden="true" />
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </section>
            <section
              className={`${styles.card} ${styles.detailSection}`}
              id="context"
            >
              <Info size={30} aria-hidden="true" />
              <h2>{dictionary["scheme.context"]}</h2>
              <dl className={styles.statusList}>
                <div className={styles.statusRow}>
                  <dt>{dictionary["scheme.whoCanApply"]}</dt>
                  <dd>{scheme.eligibility[0]?.[locale]}</dd>
                </div>
                <div className={styles.statusRow}>
                  <dt>{dictionary["scheme.whereToApply"]}</dt>
                  <dd>{dictionary["brand.name"]}</dd>
                </div>
                <div className={styles.statusRow}>
                  <dt>{dictionary["scheme.modeOfBenefit"]}</dt>
                  <dd>{dictionary["scheme.dbt"]}</dd>
                </div>
                <div className={styles.statusRow}>
                  <dt>{dictionary["scheme.processingTime"]}</dt>
                  <dd>{dictionary["scheme.processingEstimate"]}</dd>
                </div>
              </dl>
            </section>
            <section
              className={`${styles.card} ${styles.detailSection}`}
              id="important"
            >
              <Info size={30} aria-hidden="true" />
              <h2>{dictionary["scheme.important"]}</h2>
              <ul>
                {scheme.features.map((feature) => (
                  <li key={feature.en}>{feature[locale]}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className={styles.detailSidebar}>
            {beneficiary ? (
              <>
                <section className={`${styles.card} ${styles.cardPad}`}>
                  <h2>{dictionary["scheme.beneficiary"]}</h2>
                  <dl className={styles.statusList}>
                    <div className={styles.statusRow}>
                      <dt>{dictionary["scheme.registration"]}</dt>
                      <dd>{beneficiary.registrationNumberMasked}</dd>
                    </div>
                    <div className={styles.statusRow}>
                      <dt>{dictionary["common.profile"]}</dt>
                      <dd>{beneficiary.farmerName}</dd>
                    </div>
                    <div className={styles.statusRow}>
                      <dt>{dictionary["scheme.aadhaarSeeding"]}</dt>
                      <dd>
                        <CircleCheckBig size={17} aria-hidden="true" />{" "}
                        {dictionary["register.verified"]}
                      </dd>
                    </div>
                    <div className={styles.statusRow}>
                      <dt>{dictionary["home.ekyc"]}</dt>
                      <dd>
                        {formatDateTime(beneficiary.ekycVerifiedAt, locale)}
                      </dd>
                    </div>
                    <div className={styles.statusRow}>
                      <dt>{dictionary["scheme.landSeeding"]}</dt>
                      <dd>
                        {formatNumber(beneficiary.landAreaHectares, locale)}{" "}
                        {dictionary["common.hectareShort"]} (
                        {formatNumber(beneficiary.khasraCount, locale)}{" "}
                        {dictionary["common.khasra"]})
                      </dd>
                    </div>
                  </dl>
                </section>
                <section className={`${styles.card} ${styles.cardPad}`}>
                  <h2>{dictionary["scheme.installments"]}</h2>
                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>{dictionary["scheme.installment"]}</th>
                          <th>{dictionary["scheme.amount"]}</th>
                          <th>{dictionary["scheme.date"]}</th>
                          <th>{dictionary["scheme.reference"]}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {beneficiary.installments.map((installment) => (
                          <tr key={installment.sequence}>
                            <td>{installment.sequence}</td>
                            <td>
                              {formatCurrency(installment.amount, locale)}
                            </td>
                            <td>
                              {formatDateTime(installment.paidAt, locale)}
                            </td>
                            <td>{installment.bankReferenceMasked}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </>
            ) : null}

            <section className={`${styles.card} ${styles.cardPad}`}>
              <h2>{dictionary["scheme.applicationStatus"]}</h2>
              <span className={styles.badge}>
                {dictionary["scheme.notApplied"]}
              </span>
              <p>
                {locale === "hi"
                  ? "आपने अभी तक इस योजना के लिए आवेदन नहीं किया है।"
                  : "You have not applied for this scheme yet."}
              </p>
              <div className={styles.formActions}>
                <a
                  className={styles.button}
                  href={routes.apply(locale, scheme.id)}
                >
                  {dictionary["common.applyNow"]}
                </a>
                <a
                  className={`${styles.button} ${styles.buttonSecondary}`}
                  href={routes.schemeCatalogue(locale)}
                >
                  {dictionary["common.back"]}
                </a>
              </div>
              <div className={styles.applicationHint}>
                <Info size={22} aria-hidden="true" />
                <span>
                  {locale === "hi"
                    ? "आवेदन करने से पहले दिशानिर्देश पढ़ें और पात्रता सुनिश्चित करें।"
                    : "Before applying, read the guidelines and confirm your eligibility."}
                </span>
              </div>
            </section>
          </aside>
        </div>
        <div className={styles.notice} id="important">
          <Landmark size={22} aria-hidden="true" />
          <span>{dictionary["scheme.unverified"]}</span>
        </div>
      </div>
    </PageShell>
  );
}
