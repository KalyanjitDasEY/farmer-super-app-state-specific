import {
  BadgeCheck,
  CalendarRange,
  Download,
  Eye,
  Filter,
  History,
  Search,
  Share2,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import type { Dictionary } from "@/i18n/dictionaries";
import { createTranslator } from "@/i18n/localized-text";
import styles from "@/styles/application.module.css";
import type { Locale } from "@/types/locale";

import {
  DefinitionGrid,
  FeaturePanel,
  HelpPanel,
  ProfileFeatureShell,
} from "./ProfileFeatureShell";

const activities = [
  {
    agency: ["Bihar Agriculture (demo)", "बिहार कृषि (डेमो)"],
    purpose: [
      "Application for Subsidy under Drip Irrigation Scheme",
      "ड्रिप सिंचाई योजना के अंतर्गत सब्सिडी के लिए आवेदन",
    ],
    token: "CON-2024-05-21-7F3A8B9C",
    date: ["21 May 2024, 11:22 AM", "21 मई 2024, सुबह 11:22 बजे"],
    status: "active",
    result: [
      "Accessed 21 May 2024, 11:25 AM",
      "21 मई 2024, सुबह 11:25 बजे एक्सेस किया गया",
    ],
  },
  {
    agency: [
      "State Bank of India (KCC Cell)",
      "भारतीय स्टेट बैंक (केसीसी प्रकोष्ठ)",
    ],
    purpose: [
      "Kisan Credit Card Eligibility Check",
      "किसान क्रेडिट कार्ड पात्रता जांच",
    ],
    token: "CON-2024-04-10-2B7D6E1F",
    date: ["10 Apr 2024, 03:45 PM", "10 अप्रैल 2024, दोपहर 03:45 बजे"],
    status: "active",
    result: [
      "Accessed 10 Apr 2024, 03:47 PM",
      "10 अप्रैल 2024, दोपहर 03:47 बजे एक्सेस किया गया",
    ],
  },
  {
    agency: ["Bihar Farmer Assistance (demo)", "बिहार किसान सहायता (डेमो)"],
    purpose: ["Accident Claim Verification", "दुर्घटना दावा सत्यापन"],
    token: "CON-2024-03-18-9C1A2D4E",
    date: ["18 Mar 2024, 09:15 AM", "18 मार्च 2024, सुबह 09:15 बजे"],
    status: "expired",
    result: [
      "Accessed 18 Mar 2024, 09:18 AM",
      "18 मार्च 2024, सुबह 09:18 बजे एक्सेस किया गया",
    ],
  },
  {
    agency: ["CSC Service Provider (demo)", "सीएससी सेवा प्रदाता (डेमो)"],
    purpose: [
      "Land Record View & Download",
      "भूमि अभिलेख देखें और डाउनलोड करें",
    ],
    token: "CON-2024-02-05-5E9F0A3B",
    date: ["05 Feb 2024, 01:10 PM", "05 फरवरी 2024, दोपहर 01:10 बजे"],
    status: "revoked",
    result: [
      "Access Blocked 20 Feb 2024, 02:05 PM",
      "20 फरवरी 2024, दोपहर 02:05 बजे पहुंच अवरुद्ध",
    ],
  },
  {
    agency: ["Agriculture Marketing Board", "कृषि विपणन बोर्ड"],
    purpose: ["Market Rate Information", "बाजार भाव की जानकारी"],
    token: "CON-2024-01-25-7D3B5C1A",
    date: ["25 Jan 2024, 04:30 PM", "25 जनवरी 2024, शाम 04:30 बजे"],
    status: "active",
    result: [
      "Accessed 25 Jan 2024, 04:31 PM",
      "25 जनवरी 2024, शाम 04:31 बजे एक्सेस किया गया",
    ],
  },
  {
    agency: ["Private Agri Input Company", "निजी कृषि इनपुट कंपनी"],
    purpose: ["Product Recommendation", "उत्पाद अनुशंसा"],
    token: "CON-2024-01-12-1A2B3C4D",
    date: ["12 Jan 2024, 11:55 AM", "12 जनवरी 2024, सुबह 11:55 बजे"],
    status: "revoked",
    result: [
      "Access Blocked 15 Feb 2024, 11:56 AM",
      "15 फरवरी 2024, सुबह 11:56 बजे पहुंच अवरुद्ध",
    ],
  },
] as const;

export function AuditLedgerPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const t = createTranslator(locale);
  const statusLabel = {
    active: t("Active", "सक्रिय"),
    expired: t("Expired", "समाप्त"),
    revoked: t("Revoked", "रद्द"),
  };

  return (
    <ProfileFeatureShell
      locale={locale}
      dictionary={dictionary}
      title={t(
        "Data Activity and Consent Ledger",
        "डेटा गतिविधि और सहमति खाता",
      )}
      subtitle={t(
        "View and manage all data access, consent and sharing activities related to your information.",
        "अपनी जानकारी से संबंधित सभी डेटा पहुंच, सहमति और साझा करने की गतिविधियां देखें और प्रबंधित करें।",
      )}
      aside={
        <>
          <HelpPanel title={t("Activity Details", "गतिविधि विवरण")}>
            <span className={styles.profileStatusSuccess}>
              <BadgeCheck size={16} aria-hidden="true" />
              {t("Active", "सक्रिय")}
            </span>
            <DefinitionGrid
              items={[
                [
                  t("Agency", "एजेंसी"),
                  t("Bihar Agriculture (demo)", "बिहार कृषि (डेमो)"),
                ],
                [
                  t("Purpose", "उद्देश्य"),
                  t(
                    "Application for Subsidy under Drip Irrigation Scheme",
                    "ड्रिप सिंचाई योजना के अंतर्गत सब्सिडी के लिए आवेदन",
                  ),
                ],
                [
                  t("Token / Reference", "टोकन / संदर्भ"),
                  "CON-2024-05-21-7F3A8B9C",
                ],
                [
                  t("Mode of Sharing", "साझा करने का माध्यम"),
                  t("Secure QR Code", "सुरक्षित क्यूआर कोड"),
                ],
                [
                  t("Security", "सुरक्षा"),
                  t("End-to-End Encrypted", "एंड-टू-एंड एन्क्रिप्टेड"),
                ],
                [
                  t("Validity", "वैधता"),
                  t(
                    "21 May 2024 to 21 Aug 2024 (90 Days)",
                    "21 मई 2024 से 21 अगस्त 2024 (90 दिन)",
                  ),
                ],
                [
                  t("Granted On", "अनुमति की तिथि"),
                  t("21 May 2024, 11:22 AM", "21 मई 2024, सुबह 11:22 बजे"),
                ],
                [
                  t("Granted By", "अनुमति देने वाला"),
                  "RAMESH KUMAR (RA***9012)",
                ],
              ]}
            />
            <button className={styles.button} type="button">
              <Eye size={18} aria-hidden="true" />
              {t("Open Full Details", "पूरा विवरण खोलें")}
            </button>
          </HelpPanel>
          <HelpPanel title={t("Quick Actions", "त्वरित कार्रवाइयां")}>
            <div className={styles.profileSideActions}>
              <button type="button">
                <Trash2 size={18} aria-hidden="true" />
                {t("Revoke Consent", "सहमति रद्द करें")}
              </button>
              <button type="button">
                <Download size={18} aria-hidden="true" />
                {t("Download Consent PDF", "सहमति पीडीएफ डाउनलोड करें")}
              </button>
              <button type="button">
                <Share2 size={18} aria-hidden="true" />
                {t("Share Consent Token", "सहमति टोकन साझा करें")}
              </button>
              <button type="button">
                <ShieldCheck size={18} aria-hidden="true" />
                {t("View Consent Proof", "सहमति प्रमाण देखें")}
              </button>
            </div>
          </HelpPanel>
          <HelpPanel
            title={t("Your Privacy Matters", "आपकी गोपनीयता महत्वपूर्ण है")}
          >
            <p>
              {t(
                "Aadhaar, bank details and other sensitive identifiers are always masked. Only authorized agencies with your consent can access data for the stated purpose.",
                "आधार, बैंक विवरण और अन्य संवेदनशील पहचानकर्ता हमेशा छिपाए जाते हैं। केवल आपकी सहमति वाली अधिकृत एजेंसियां बताए गए उद्देश्य के लिए डेटा देख सकती हैं।",
              )}
            </p>
          </HelpPanel>
        </>
      }
    >
      <div className={styles.profileInfoStrip}>
        <History size={20} aria-hidden="true" />
        {t(
          "This ledger shows who accessed your data, for what purpose and when. You remain in control.",
          "यह खाता दिखाता है कि आपके डेटा को किसने, किस उद्देश्य से और कब देखा। नियंत्रण आपके पास रहता है।",
        )}
      </div>

      <div className={styles.profileMetricGrid}>
        {[
          [
            t("Active Consents", "सक्रिय सहमतियां"),
            "3",
            t("Currently valid", "वर्तमान में वैध"),
            "success",
          ],
          [
            t("Expired Consents", "समाप्त सहमतियां"),
            "1",
            t("No longer active", "अब सक्रिय नहीं"),
            "warning",
          ],
          [
            t("Revoked Consents", "रद्द सहमतियां"),
            "1",
            t("Revoked by you", "आपके द्वारा रद्द"),
            "danger",
          ],
          [
            t("Total Access Events", "कुल पहुंच घटनाएं"),
            "12",
            t("All time", "सभी समय"),
            "neutral",
          ],
          [
            t("Successful Access", "सफल पहुंच"),
            "10",
            t("This year", "इस वर्ष"),
            "success",
          ],
          [
            t("Failed Access", "विफल पहुंच"),
            "2",
            t("This year", "इस वर्ष"),
            "danger",
          ],
        ].map(([label, value, note, tone]) => (
          <article
            className={styles.profileMetric}
            data-tone={tone}
            key={label}
          >
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{note}</small>
          </article>
        ))}
      </div>

      <FeaturePanel>
        <div className={styles.profileTabs}>
          <button className={styles.profileTabActive}>
            {t("All Activities", "सभी गतिविधियां")}
          </button>
          <button>{t("Active", "सक्रिय")}</button>
          <button>{t("Expired", "समाप्त")}</button>
          <button>{t("Revoked", "रद्द")}</button>
          <button>{t("Access Events", "पहुंच घटनाएं")}</button>
        </div>

        <div className={styles.auditFilters}>
          <label>
            <Search size={18} aria-hidden="true" />
            <input
              className={styles.input}
              placeholder={t(
                "Search by agency, purpose or token",
                "एजेंसी, उद्देश्य या टोकन से खोजें",
              )}
            />
          </label>
          <button type="button">
            <CalendarRange size={18} aria-hidden="true" />
            {t("Select date range", "तिथि सीमा चुनें")}
          </button>
          <button type="button">
            <Filter size={18} aria-hidden="true" />
            {t("Filters", "फिल्टर")}
          </button>
        </div>

        <div className={styles.tableWrap}>
          <table className={`${styles.table} ${styles.auditTable}`}>
            <thead>
              <tr>
                <th>{t("Agency / Department", "एजेंसी / विभाग")}</th>
                <th>{t("Purpose", "उद्देश्य")}</th>
                <th>{t("Token / Reference", "टोकन / संदर्भ")}</th>
                <th>{t("Date & Time", "तिथि और समय")}</th>
                <th>{t("Status", "स्थिति")}</th>
                <th>{t("Access Result", "पहुंच परिणाम")}</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(
                ({ agency, purpose, token, date, status, result }, index) => (
                  <tr
                    className={index === 0 ? styles.auditRowActive : ""}
                    key={token}
                  >
                    <td>
                      <strong>{t(agency[0], agency[1])}</strong>
                    </td>
                    <td>{t(purpose[0], purpose[1])}</td>
                    <td>
                      <code>{token}</code>
                    </td>
                    <td>{t(date[0], date[1])}</td>
                    <td>
                      <span
                        className={
                          status === "active"
                            ? styles.profileStatusSuccess
                            : status === "expired"
                              ? styles.profileStatusDraft
                              : styles.profileStatusDanger
                        }
                      >
                        {statusLabel[status]}
                      </span>
                    </td>
                    <td>{t(result[0], result[1])}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.auditPagination}>
          <span>
            {t(
              "Showing 1 to 6 of 12 activities",
              "12 गतिविधियों में से 1 से 6 दिखाई जा रही हैं",
            )}
          </span>
          <div>
            <button className={styles.profileTabActive}>1</button>
            <button>2</button>
          </div>
        </div>
      </FeaturePanel>

      <div className={styles.profileInfoStrip}>
        <ShieldCheck size={20} aria-hidden="true" />
        {t(
          "Every time your data is accessed or shared using your consent, an entry is created in this ledger. You can review any entry and revoke consent at any time.",
          "आपकी सहमति से जब भी आपका डेटा देखा या साझा किया जाता है, इस खाते में एक प्रविष्टि बनती है। आप किसी भी प्रविष्टि की समीक्षा करके सहमति कभी भी रद्द कर सकते हैं।",
        )}
      </div>
    </ProfileFeatureShell>
  );
}
