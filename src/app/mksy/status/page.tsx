import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  ClipboardCheck,
  Download,
  Headphones,
  IndianRupee,
  RefreshCw,
  ShieldCheck,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";

import {
  Breadcrumbs,
  MksyLogo,
  Notice,
} from "@/features/mksy/components/mksy-components";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";
import styles from "@/features/mksy/components/mksy.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("MKSY Claim Status", "MKSY दावे की स्थिति") };
}

const approvalSteps = [
  [localized("Field Verification", "क्षेत्र सत्यापन"), UserRoundCheck],
  [localized("Departmental Scrutiny", "विभागीय जांच"), ClipboardCheck],
  [localized("Committee / Treasury", "समिति / कोषागार"), UsersRound],
  [localized("DBT / Payment", "DBT / भुगतान"), IndianRupee],
  [localized("Claim Closed", "दावा बंद"), CircleCheck],
] as const;

const timeline = [
  [
    localized("20 May 2024, 10:05 AM", "20 मई 2024, 10:05 पूर्वाह्न"),
    localized("Field Verification", "क्षेत्र सत्यापन"),
    localized("Field verification started.", "क्षेत्र सत्यापन शुरू हुआ।"),
  ],
  [
    localized("20 May 2024, 04:35 PM", "20 मई 2024, 04:35 अपराह्न"),
    localized("Field Verification", "क्षेत्र सत्यापन"),
    localized(
      "Incident location and documents verified.",
      "घटना स्थल और दस्तावेज़ सत्यापित किए गए।",
    ),
  ],
  [
    localized("21 May 2024, 11:20 AM", "21 मई 2024, 11:20 पूर्वाह्न"),
    localized("Field Verification", "क्षेत्र सत्यापन"),
    localized(
      "Witness statement collection in progress.",
      "गवाह का बयान दर्ज किया जा रहा है।",
    ),
  ],
  [
    "—",
    localized("Departmental Scrutiny", "विभागीय जांच"),
    localized("Pending", "लंबित"),
  ],
  [
    "—",
    localized("Committee / Treasury", "समिति / कोषागार"),
    localized("Pending", "लंबित"),
  ],
  [
    "—",
    localized("DBT / Payment", "DBT / भुगतान"),
    localized("Pending", "लंबित"),
  ],
] as const;

export default async function MksyStatusPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <Breadcrumbs current={t("Claim Status", "दावे की स्थिति")} claim />
        <Link className={styles.backLink} href="/mksy">
          <ArrowLeft size={18} /> {t("Back to Search", "खोज पर वापस जाएं")}
        </Link>
      </div>

      <header className={styles.schemeHeading}>
        <MksyLogo />
        <div>
          <h1>
            {t("MKSY Claim Approval Pipeline", "MKSY दावा अनुमोदन प्रक्रिया")}
          </h1>
          <p>
            {t(
              "Track your claim from field verification through departmental approval to final DBT.",
              "क्षेत्र सत्यापन से विभागीय अनुमोदन और अंतिम DBT तक अपने दावे को ट्रैक करें।",
            )}
          </p>
        </div>
      </header>

      <section className={styles.statusSummary}>
        <div>
          <small>{t("Claim Reference No.", "दावा संदर्भ संख्या")}</small>
          <strong>MKSY/2024-25/00012345</strong>
          <span>
            {t(
              "Incident: 12 May 2024, 03:15 PM",
              "घटना: 12 मई 2024, 03:15 अपराह्न",
            )}
          </span>
        </div>
        <div>
          <small>{t("Applicant", "आवेदक")}</small>
          <strong>RAMESH KUMAR</strong>
          <span>XXXX XXXX 9012</span>
        </div>
        <div>
          <small>{t("Scheme", "योजना")}</small>
          <strong>MKSY</strong>
          <span>{t("Accidental Death", "दुर्घटना में मृत्यु")}</span>
        </div>
        <div>
          <small>{t("Total Assistance Amount", "कुल सहायता राशि")}</small>
          <strong>₹5,00,000</strong>
          <span>{t("Accidental Death", "दुर्घटना में मृत्यु")}</span>
        </div>
      </section>

      <Notice tone="blue">
        {t(
          "Administrative stages are separate from final DBT. Disbursement will be shown after approval and payment.",
          "प्रशासनिक चरण अंतिम DBT से अलग हैं। अनुमोदन और भुगतान के बाद राशि वितरण दिखाया जाएगा।",
        )}
      </Notice>

      <section className={styles.currentStatus}>
        <div>
          <small>{t("Current Status", "वर्तमान स्थिति")}</small>
          <h2>
            {t(
              "Field Verification In Progress",
              "क्षेत्र सत्यापन प्रगति पर है",
            )}
          </h2>
          <p>
            {t(
              "Field verification is being carried out by the concerned office.",
              "संबंधित कार्यालय द्वारा क्षेत्र सत्यापन किया जा रहा है।",
            )}
          </p>
        </div>
        <span>
          {t(
            "Last Updated: 21 May 2024, 11:20 AM",
            "अंतिम अपडेट: 21 मई 2024, 11:20 पूर्वाह्न",
          )}
        </span>
        <button className={styles.outlineButton} type="button">
          <RefreshCw size={17} /> {t("Refresh Status", "स्थिति रीफ्रेश करें")}
        </button>
      </section>

      <h2>{t("Claim Approval Pipeline", "दावा अनुमोदन प्रक्रिया")}</h2>
      <ol className={styles.approvalProgress}>
        {approvalSteps.map(([label, Icon], index) => (
          <li key={label.en}>
            <span>
              <Icon size={22} />
            </span>
            <strong>{t(label)}</strong>
            <small>
              {index === 0
                ? t("In Progress", "प्रगति पर")
                : t("Pending", "लंबित")}
            </small>
          </li>
        ))}
      </ol>

      <div className={styles.statusLayout}>
        <main className={styles.statusMain}>
          <section className={styles.statusCard}>
            <h2>{t("1. Field Verification", "1. क्षेत्र सत्यापन")}</h2>
            <div className={styles.verificationGrid}>
              <div>
                <p>
                  {t(
                    "Physical verification of the incident location, documents and facts by the field officer.",
                    "क्षेत्र अधिकारी द्वारा घटना स्थल, दस्तावेज़ों और तथ्यों का भौतिक सत्यापन।",
                  )}
                </p>
                <div className={styles.detailFacts}>
                  <div>
                    <small>
                      {t("Responsible Office", "जिम्मेदार कार्यालय")}
                    </small>
                    <strong>
                      {t(
                        "Agriculture Supervisor, Chomu",
                        "कृषि पर्यवेक्षक, चोमू",
                      )}
                    </strong>
                  </div>
                  <div>
                    <small>{t("Field Officer", "क्षेत्र अधिकारी")}</small>
                    <strong>Suresh Chand</strong>
                  </div>
                  <div>
                    <small>
                      {t(
                        "Verification Start Date",
                        "सत्यापन शुरू होने की तिथि",
                      )}
                    </small>
                    <strong>{t("20 May 2024", "20 मई 2024")}</strong>
                  </div>
                  <div>
                    <small>
                      {t("Expected Completion", "अपेक्षित पूर्णता")}
                    </small>
                    <strong>{t("24 May 2024", "24 मई 2024")}</strong>
                  </div>
                </div>
              </div>
              <div>
                <h2>{t("Verification Checklist", "सत्यापन जांच सूची")}</h2>
                <ul className={styles.checkList}>
                  <li>
                    <Check size={16} />{" "}
                    {t("Incident Location Visit", "घटना स्थल का दौरा")}
                  </li>
                  <li>
                    <Check size={16} />{" "}
                    {t(
                      "Document Cross Verification",
                      "दस्तावेज़ों का परस्पर सत्यापन",
                    )}
                  </li>
                  <li>
                    <Check size={16} /> {t("Witness Statement", "गवाह का बयान")}
                  </li>
                  <li>
                    ○ {t("Verification Report Upload", "सत्यापन रिपोर्ट अपलोड")}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.statusCard}>
            <h2>{t("Claim Activity Timeline", "दावा गतिविधि समयरेखा")}</h2>
            <table className={styles.timeline}>
              <thead>
                <tr>
                  <th>{t("Date & Time", "तिथि और समय")}</th>
                  <th>{t("Stage", "चरण")}</th>
                  <th>{t("Event / Description", "घटना / विवरण")}</th>
                  <th>{t("Responsible Office", "जिम्मेदार कार्यालय")}</th>
                </tr>
              </thead>
              <tbody>
                {timeline.map(([date, stage, event]) => (
                  <tr
                    key={`${typeof date === "string" ? date : date.en}-${stage.en}-${event.en}`}
                  >
                    <td>{t(date)}</td>
                    <td>{t(stage)}</td>
                    <td>{t(event)}</td>
                    <td>
                      {date === "—"
                        ? "—"
                        : t(
                            "Agriculture Supervisor, Chomu",
                            "कृषि पर्यवेक्षक, चोमू",
                          )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>

        <aside className={styles.sidebar}>
          <section className={styles.sideCard}>
            <h2>
              <ShieldCheck size={20} />{" "}
              {t("Important Information", "महत्वपूर्ण जानकारी")}
            </h2>
            <ul className={styles.bulletList}>
              <li>
                {t(
                  "You will be notified at each processing stage.",
                  "प्रत्येक प्रक्रिया चरण पर आपको सूचना दी जाएगी।",
                )}
              </li>
              <li>
                {t(
                  "Payment will be credited after DBT approval.",
                  "DBT अनुमोदन के बाद भुगतान जमा किया जाएगा।",
                )}
              </li>
              <li>
                {t(
                  "Contact Krishi Mitra or your agriculture office for help.",
                  "सहायता के लिए कृषि मित्र या अपने कृषि कार्यालय से संपर्क करें।",
                )}
              </li>
            </ul>
          </section>
          <section className={styles.sideCard}>
            <h2>{t("Quick Actions", "त्वरित कार्रवाइयां")}</h2>
            <div className={styles.quickActions}>
              <Link href="/mksy">
                <Download size={17} /> {t("View Receipt", "रसीद देखें")}
              </Link>
              <Link href="/mksy">
                <Download size={17} />{" "}
                {t("Download Claim Details", "दावे का विवरण डाउनलोड करें")}
              </Link>
              <Link href="/track">
                <ClipboardCheck size={17} />{" "}
                {t("View in Tracking", "ट्रैकिंग में देखें")}
              </Link>
            </div>
          </section>
          <section className={styles.sideCard}>
            <h2>
              <Headphones size={20} /> {t("Need Help?", "सहायता चाहिए?")}
            </h2>
            <p>
              {t(
                "Ask Krishi Mitra for help related to the MKSY claim.",
                "MKSY दावे से जुड़ी सहायता के लिए कृषि मित्र से पूछें।",
              )}
            </p>
            <Link className={styles.outlineButton} href="/more#help">
              <Headphones size={17} />{" "}
              {t("Chat with Krishi Mitra", "कृषि मित्र से चैट करें")}
            </Link>
          </section>
        </aside>
      </div>

      <Notice tone="amber">
        {t(
          "Estimated timelines are indicative and may vary based on verification and departmental processes.",
          "अनुमानित समय-सीमा सांकेतिक है और सत्यापन तथा विभागीय प्रक्रियाओं के आधार पर बदल सकती है।",
        )}
      </Notice>

      <div className={styles.overviewActions}>
        <Link className={styles.secondaryButton} href="/mksy">
          <ArrowLeft size={18} />{" "}
          {t("Back to Claim Details", "दावे के विवरण पर वापस जाएं")}
        </Link>
        <Link className={styles.primaryButton} href="/track">
          {t("View in Tracking", "ट्रैकिंग में देखें")} <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
