import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  ClipboardCheck,
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
  return { title: t("Bihar Demo Claim Status", "बिहार डेमो दावे की स्थिति") };
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
    localized(
      "Sample field verification started.",
      "नमूना क्षेत्र सत्यापन शुरू हुआ।",
    ),
  ],
  [
    localized("20 May 2024, 04:35 PM", "20 मई 2024, 04:35 अपराह्न"),
    localized("Field Verification", "क्षेत्र सत्यापन"),
    localized(
      "Sample incident location and files reviewed.",
      "नमूना घटना स्थल और फ़ाइलों की समीक्षा की गई।",
    ),
  ],
  [
    localized("21 May 2024, 11:20 AM", "21 मई 2024, 11:20 पूर्वाह्न"),
    localized("Field Verification", "क्षेत्र सत्यापन"),
    localized(
      "Sample witness statement in progress.",
      "नमूना गवाह का बयान प्रगति पर है।",
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
          <ArrowLeft size={18} /> {t("Back to Demo", "डेमो पर वापस जाएं")}
        </Link>
      </div>

      <header className={styles.schemeHeading}>
        <MksyLogo />
        <div>
          <h1>{t("Bihar Demo Claim Timeline", "बिहार डेमो दावा समयरेखा")}</h1>
          <p>
            {t(
              "Explore simulated review stages and payment status. No claim is processed or paid here.",
              "सांकेतिक समीक्षा चरण और भुगतान स्थिति देखें। यहां कोई दावा संसाधित या भुगतान नहीं होता।",
            )}
          </p>
        </div>
      </header>

      <section className={styles.statusSummary}>
        <div>
          <small>{t("Claim Reference No.", "दावा संदर्भ संख्या")}</small>
          <strong>BH-DEMO/2024-25/00012345</strong>
          <span>
            {t(
              "Sample incident: 12 May 2024, 03:15 PM",
              "नमूना घटना: 12 मई 2024, 03:15 अपराह्न",
            )}
          </span>
        </div>
        <div>
          <small>{t("Applicant", "आवेदक")}</small>
          <strong>RAMESH KUMAR</strong>
          <span>BR23F12345678</span>
        </div>
        <div>
          <small>{t("Demo", "डेमो")}</small>
          <strong>
            {t("Bihar farmer accident support", "बिहार किसान दुर्घटना सहायता")}
          </strong>
          <span>{t("Accidental Death", "दुर्घटना में मृत्यु")}</span>
        </div>
        <div>
          <small>{t("Benefit Amount", "लाभ राशि")}</small>
          <strong>{t("Not specified", "निर्दिष्ट नहीं")}</strong>
          <span>{t("Accidental Death", "दुर्घटना में मृत्यु")}</span>
        </div>
      </section>

      <Notice tone="blue">
        {t(
          "Illustrative Bihar demo only; not an official scheme or live claim. Timeline and DBT stages do not represent a real payment.",
          "केवल सांकेतिक बिहार डेमो; यह आधिकारिक योजना या वास्तविक दावा नहीं है। समयरेखा और DBT चरण वास्तविक भुगतान नहीं दर्शाते।",
        )}
      </Notice>

      <section className={styles.currentStatus}>
        <div>
          <small>{t("Current Status", "वर्तमान स्थिति")}</small>
          <h2>
            {t(
              "Sample Field Verification In Progress",
              "नमूना क्षेत्र सत्यापन प्रगति पर है",
            )}
          </h2>
          <p>
            {t(
              "This example shows what a field verification stage could look like; no office is processing this claim.",
              "यह उदाहरण दिखाता है कि क्षेत्र सत्यापन चरण कैसा हो सकता है; कोई कार्यालय इस दावे पर कार्रवाई नहीं कर रहा है।",
            )}
          </p>
        </div>
        <span>
          {t(
            "Sample update: 21 May 2024, 11:20 AM",
            "नमूना अपडेट: 21 मई 2024, 11:20 पूर्वाह्न",
          )}
        </span>
        <button className={styles.outlineButton} type="button">
          <RefreshCw size={17} /> {t("Sample Status", "नमूना स्थिति")}
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
                    "Sample review of incident location, documents and facts (not performed).",
                    "घटना स्थल, दस्तावेज़ों और तथ्यों की नमूना समीक्षा (वास्तव में नहीं हुई)।",
                  )}
                </p>
                <div className={styles.detailFacts}>
                  <div>
                    <small>
                      {t("Responsible Office", "जिम्मेदार कार्यालय")}
                    </small>
                    <strong>
                      {t("Demo field team, Bihta", "डेमो क्षेत्र टीम, बिहटा")}
                    </strong>
                  </div>
                  <div>
                    <small>{t("Field Officer", "क्षेत्र अधिकारी")}</small>
                    <strong>{t("Sample officer", "नमूना अधिकारी")}</strong>
                  </div>
                  <div>
                    <small>{t("Sample Start Date", "नमूना आरंभ तिथि")}</small>
                    <strong>{t("20 May 2024", "20 मई 2024")}</strong>
                  </div>
                  <div>
                    <small>{t("Sample Milestone", "नमूना चरण की तिथि")}</small>
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
                            "Demo field team, Bihta",
                            "डेमो क्षेत्र टीम, बिहटा",
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
                  "No notifications are sent by this demo.",
                  "यह डेमो कोई सूचना नहीं भेजता है।",
                )}
              </li>
              <li>
                {t(
                  "No payment is approved or credited through this demo.",
                  "इस डेमो से कोई भुगतान स्वीकृत या जमा नहीं होता।",
                )}
              </li>
              <li>
                {t(
                  "Ask Krishi Mitra for help navigating this example.",
                  "इस उदाहरण में सहायता के लिए कृषि मित्र से पूछें।",
                )}
              </li>
            </ul>
          </section>
          <section className={styles.sideCard}>
            <h2>{t("Quick Actions", "त्वरित कार्रवाइयां")}</h2>
            <div className={styles.quickActions}>
              <Link href="/mksy">
                <ClipboardCheck size={17} />{" "}
                {t("View Demo Overview", "डेमो अवलोकन देखें")}
              </Link>
              <Link href="/mksy/claim/review">
                <ClipboardCheck size={17} />{" "}
                {t("View Sample Details", "नमूना विवरण देखें")}
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
                "Ask Krishi Mitra for help with this demo.",
                "इस डेमो में सहायता के लिए कृषि मित्र से पूछें।",
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
          "Dates, offices and stages above are fictional examples, not Bihar government processing timelines.",
          "ऊपर दी गई तारीखें, कार्यालय और चरण काल्पनिक उदाहरण हैं, बिहार सरकार की प्रक्रिया की समय-सीमा नहीं।",
        )}
      </Notice>

      <div className={styles.overviewActions}>
        <Link className={styles.secondaryButton} href="/mksy">
          <ArrowLeft size={18} />{" "}
          {t("Back to Demo Overview", "डेमो अवलोकन पर वापस जाएं")}
        </Link>
        <Link className={styles.primaryButton} href="/track">
          {t("View in Tracking", "ट्रैकिंग में देखें")} <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
