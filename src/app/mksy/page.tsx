import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  FolderOpen,
  Headphones,
  IndianRupee,
  ShieldCheck,
  Target,
  Umbrella,
  UsersRound,
} from "lucide-react";

import { ServiceImage as Image } from "@/components/media/ServiceImage";
import {
  Notice,
  SchemeHeading,
} from "@/features/mksy/components/mksy-components";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";
import styles from "@/features/mksy/components/mksy.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t(
      "Bihar Farmer Accident Support Demo",
      "बिहार किसान दुर्घटना सहायता डेमो",
    ),
    description: t(
      "Illustrative Bihar farmer accident support claim journey. Not an official government scheme or application.",
      "बिहार के किसानों के लिए दुर्घटना सहायता दावे का सांकेतिक डेमो। यह सरकारी योजना या आवेदन नहीं है।",
    ),
  };
}

const coveredAccidents = [
  localized("Road / Rail / Air accidents", "सड़क / रेल / हवाई दुर्घटनाएं"),
  localized("Drowning", "डूबना"),
  localized("Snake bite", "सांप का काटना"),
  localized("Electric shock", "बिजली का झटका"),
  localized("Fire / Burn", "आग / जलना"),
  localized("Other accidental incidents", "अन्य आकस्मिक घटनाएं"),
] as const;

const sampleProfile = [
  localized(
    "Sample applicant resides in Bihar",
    "नमूना आवेदक बिहार का निवासी है",
  ),
  localized(
    "Sample farmer record: Bihar land record / khata-khesra",
    "नमूना किसान रिकॉर्ड: बिहार भूमि अभिलेख / खाता-खेसरा",
  ),
  localized(
    "Example incident: accidental injury or death",
    "उदाहरण घटना: दुर्घटना में चोट या मृत्यु",
  ),
  localized("Example incident location: Bihar", "उदाहरण घटना स्थल: बिहार"),
] as const;

const documents = [
  localized(
    "Demo farmer ID of affected person / applicant",
    "प्रभावित व्यक्ति / आवेदक की डेमो किसान आईडी",
  ),
  localized(
    "Bihar land record / khata-khesra",
    "बिहार भूमि अभिलेख / खाता-खेसरा",
  ),
  localized(
    "Death Certificate / Disability Certificate",
    "मृत्यु प्रमाण पत्र / दिव्यांगता प्रमाण पत्र",
  ),
  localized(
    "FIR / Police Report (if applicable)",
    "FIR / पुलिस रिपोर्ट (यदि लागू हो)",
  ),
  localized(
    "Post-mortem Report (if applicable)",
    "पोस्टमार्टम रिपोर्ट (यदि लागू हो)",
  ),
  localized("Bank Passbook or cancelled cheque", "बैंक पासबुक या निरस्त चेक"),
] as const;

export default async function MksyOverviewPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <div className={styles.page}>
      <SchemeHeading
        backHref="/schemes"
        backLabel={t("Back to Schemes", "योजनाओं पर वापस जाएं")}
        current={t("Bihar farmer demo", "बिहार किसान डेमो")}
      />

      <section className={styles.overviewHero}>
        <div className={styles.overviewCopy}>
          <span className={styles.schemeBadge}>
            {t(
              "Illustrative demo · Not a Bihar government scheme",
              "सांकेतिक डेमो · बिहार सरकार की योजना नहीं",
            )}
          </span>
          <h1>
            {t(
              "Bihar Farmer Accident Support Demo",
              "बिहार किसान दुर्घटना सहायता डेमो",
            )}
          </h1>
          <p>
            {t(
              "Explore a sample accident-support claim journey for a Bihar farmer family. No real application or benefit is offered here.",
              "बिहार के किसान परिवार के लिए दुर्घटना सहायता के नमूना दावा चरण देखें। यहां वास्तविक आवेदन या लाभ उपलब्ध नहीं है।",
            )}
          </p>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/images/scheme-bihar-farmers.jpg"
            alt={t(
              "Farm worker threshing a harvest in Bihar",
              "बिहार में फ़सल की मड़ाई करता खेत मज़दूर",
            )}
            fill
            loading="eager"
            sizes="(max-width: 680px) 100vw, 42vw"
          />
        </div>
      </section>

      <section
        className={styles.factGrid}
        aria-label={t("Bihar demo information", "बिहार डेमो की जानकारी")}
      >
        <article>
          <span>
            <IndianRupee size={25} />
          </span>
          <div>
            <small>{t("Funding", "वित्त पोषण")}</small>
            <strong>{t("Not specified", "निर्दिष्ट नहीं")}</strong>
            <p>
              {t(
                "No government funding claim is made",
                "सरकारी वित्त पोषण का कोई दावा नहीं",
              )}
            </p>
          </div>
        </article>
        <article>
          <span>
            <Umbrella size={25} />
          </span>
          <div>
            <small>{t("Cost", "शुल्क")}</small>
            <strong>{t("Demo only", "केवल डेमो")}</strong>
            <p>
              {t("No payment collected here", "यहां कोई भुगतान नहीं लिया जाता")}
            </p>
          </div>
        </article>
        <article>
          <span>
            <UsersRound size={25} />
          </span>
          <div>
            <small>{t("Example location", "उदाहरण स्थान")}</small>
            <strong>{t("Bihar farmer", "बिहार का किसान")}</strong>
            <p>{t("Patna district scenario", "पटना जिले का उदाहरण")}</p>
          </div>
        </article>
        <article>
          <span>
            <CalendarDays size={25} />
          </span>
          <div>
            <small>{t("Availability", "उपलब्धता")}</small>
            <strong>{t("Demo journey", "डेमो प्रक्रिया")}</strong>
            <p>
              {t(
                "No official application window",
                "कोई आधिकारिक आवेदन अवधि नहीं",
              )}
            </p>
          </div>
        </article>
      </section>

      <section className={styles.purposeCard}>
        <span>
          <Target size={27} />
        </span>
        <div>
          <h2>{t("Purpose", "उद्देश्य")}</h2>
          <p>
            {t(
              "Demonstrate how a farmer family might enter incident details, add supporting documents and follow a sample claim.",
              "दिखाना कि किसान परिवार घटना का विवरण, सहायक दस्तावेज़ और नमूना दावा कैसे दर्ज कर सकता है।",
            )}
          </p>
        </div>
      </section>

      <section className={styles.overviewGrid}>
        <article className={styles.overviewCard}>
          <h2>
            <ShieldCheck size={20} />{" "}
            {t("Example incident types", "उदाहरण घटना प्रकार")}
          </h2>
          <ul className={styles.checkList}>
            {coveredAccidents.map((item) => (
              <li key={item.en}>
                <CheckCircle2 size={16} /> {t(item)}
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.overviewCard}>
          <h2>
            <IndianRupee size={20} />{" "}
            {t("Demo incident categories", "डेमो घटना श्रेणियां")}
          </h2>
          <table className={styles.amountTable}>
            <thead>
              <tr>
                <th>{t("Incident Type", "घटना का प्रकार")}</th>
                <th>{t("Benefit amount", "लाभ राशि")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t("Accidental Death", "दुर्घटना में मृत्यु")}</td>
                <td>{t("Not specified", "निर्दिष्ट नहीं")}</td>
              </tr>
              <tr>
                <td>
                  {t("Permanent Total Disability", "स्थायी पूर्ण दिव्यांगता")}
                </td>
                <td>{t("Not specified", "निर्दिष्ट नहीं")}</td>
              </tr>
              <tr>
                <td>
                  {t(
                    "Loss of Two Limbs / Two Eyes",
                    "दो अंगों / दोनों आंखों की हानि",
                  )}
                </td>
                <td>{t("Not specified", "निर्दिष्ट नहीं")}</td>
              </tr>
              <tr>
                <td>
                  {t("Loss of One Limb or One Eye", "एक अंग या एक आंख की हानि")}
                </td>
                <td>{t("Not specified", "निर्दिष्ट नहीं")}</td>
              </tr>
            </tbody>
          </table>
        </article>

        <article className={styles.overviewCard}>
          <h2>
            <UsersRound size={20} />{" "}
            {t("Sample applicant profile", "नमूना आवेदक का विवरण")}
          </h2>
          <ul className={styles.checkList}>
            {sampleProfile.map((item) => (
              <li key={item.en}>
                <CheckCircle2 size={16} /> {t(item)}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <Notice tone="blue">
        {t(
          "These categories are for demonstration only. No Bihar government scheme, eligibility, amount or payment is implied.",
          "ये श्रेणियां केवल डेमो के लिए हैं। इनसे बिहार सरकार की किसी योजना, पात्रता, राशि या भुगतान का दावा नहीं होता।",
        )}
      </Notice>

      <section className={styles.overviewLower}>
        <article className={styles.contentCard}>
          <h2>
            <FolderOpen size={20} />{" "}
            {t("Sample supporting documents", "नमूना सहायक दस्तावेज़")}
          </h2>
          <ul className={styles.documentList}>
            {documents.map((item) => (
              <li key={item.en}>
                <FileText size={16} /> {t(item)}
              </li>
            ))}
          </ul>
        </article>

        <div className={styles.notesStack}>
          <article className={`${styles.contentCard} ${styles.importantCard}`}>
            <h2>
              <ShieldCheck size={20} />{" "}
              {t("Important Notes", "महत्वपूर्ण निर्देश")}
            </h2>
            <ul className={styles.bulletList}>
              <li>
                {t(
                  "This is an illustrative journey, not an official claim portal.",
                  "यह सांकेतिक प्रक्रिया है, आधिकारिक दावा पोर्टल नहीं।",
                )}
              </li>
              <li>
                {t(
                  "No financial assistance or other benefit is provided through this demo.",
                  "इस डेमो के माध्यम से वित्तीय सहायता या कोई अन्य लाभ नहीं दिया जाता।",
                )}
              </li>
              <li>
                {t(
                  "Use sample information only; do not enter sensitive personal details.",
                  "केवल नमूना जानकारी प्रयोग करें; संवेदनशील व्यक्तिगत विवरण दर्ज न करें।",
                )}
              </li>
            </ul>
          </article>
          <article className={styles.contentCard}>
            <h2>
              <Headphones size={20} /> {t("Need Help?", "सहायता चाहिए?")}
            </h2>
            <p>
              {t(
                "Ask Krishi Mitra for help navigating this demo.",
                "इस डेमो में नेविगेट करने के लिए कृषि मित्र से पूछें।",
              )}
            </p>
            <Link className={styles.outlineButton} href="/more#help">
              <Headphones size={18} />{" "}
              {t("Chat with Krishi Mitra", "कृषि मित्र से चैट करें")}
            </Link>
          </article>
        </div>
      </section>

      <div className={styles.overviewActions}>
        <Link className={styles.secondaryButton} href="/schemes">
          <ArrowLeft size={19} /> {t("Back to Schemes", "योजनाओं पर वापस जाएं")}
        </Link>
        <Link className={styles.primaryButton} href="/mksy/claim">
          {t("Start Demo Claim", "डेमो दावा शुरू करें")}{" "}
          <ArrowRight size={19} />
        </Link>
      </div>
    </div>
  );
}
