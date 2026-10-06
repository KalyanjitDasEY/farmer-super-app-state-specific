import {
  BadgeCheck,
  Check,
  CheckCircle2,
  ClipboardCopy,
  Download,
  Eye,
  FileCheck2,
  History,
  Info,
  MessageCircle,
  QrCode,
  Share2,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import { routes } from "@/config/routes";
import type { Dictionary } from "@/i18n/dictionaries";
import { createTranslator } from "@/i18n/localized-text";
import styles from "@/styles/application.module.css";
import type { Locale } from "@/types/locale";

import {
  DefinitionGrid,
  FeaturePanel,
  HelpPanel,
  ProfileFeatureShell,
  QrVisual,
} from "./ProfileFeatureShell";

const selectableFields = [
  [
    "Personal Information",
    "Name, Date of Birth, Gender",
    "Name (First 2 letters)",
    false,
  ],
  [
    "Contact Information",
    "Mobile Number, Email Address",
    "Mobile (XXXXXX5678)",
    false,
  ],
  [
    "Land Records",
    "Khesra Number, Area, Land Ownership",
    "Partial (Last 4 digits)",
    true,
  ],
  ["Crop Details", "Crop Type, Sowing Area, Season", "As required", true],
  ["Aadhaar (demo)", "Masked Aadhaar Number", "Masked (XXXX XXXX 9012)", false],
  [
    "Banking Information",
    "Bank Name, Account Number, IFSC",
    "Account (XXXX 9012)",
    false,
  ],
] as const;

const includedData = [
  [
    "Personal Information",
    "Name, Date of Birth, Gender",
    "Name (First 2 letters)",
    "RAMESH KUMAR (RA***)",
  ],
  [
    "Land Records",
    "Khesra Number, Area, Land Ownership",
    "Partial (Last 4 digits)",
    "8 Khesra / Total Area: 3.62 Ha",
  ],
  [
    "Crop Details",
    "Crop Type, Sowing Area, Season",
    "As required",
    "Rice, Wheat / Seasons: Kharif & Rabi 2023-24",
  ],
] as const;

const consentHindi: Record<string, string> = {
  "Personal Information": "व्यक्तिगत जानकारी",
  "Name, Date of Birth, Gender": "नाम, जन्म तिथि, लिंग",
  "Name (First 2 letters)": "नाम (पहले 2 अक्षर)",
  "Contact Information": "संपर्क जानकारी",
  "Mobile Number, Email Address": "मोबाइल नंबर, ईमेल पता",
  "Mobile (XXXXXX5678)": "मोबाइल (XXXXXX5678)",
  "Land Records": "भूमि अभिलेख",
  "Khesra Number, Area, Land Ownership":
    "खेसरा नंबर, क्षेत्रफल, भूमि स्वामित्व",
  "Partial (Last 4 digits)": "आंशिक (अंतिम 4 अंक)",
  "Crop Details": "फसल विवरण",
  "Crop Type, Sowing Area, Season": "फसल प्रकार, बुवाई क्षेत्र, मौसम",
  "As required": "आवश्यकतानुसार",
  "Aadhaar (demo)": "आधार (डेमो)",
  "Masked Aadhaar Number": "छिपाया गया आधार नंबर",
  "Masked (XXXX XXXX 9012)": "छिपा हुआ (XXXX XXXX 9012)",
  "Banking Information": "बैंकिंग जानकारी",
  "Bank Name, Account Number, IFSC": "बैंक का नाम, खाता नंबर, आईएफएससी",
  "Account (XXXX 9012)": "खाता (XXXX 9012)",
  "RAMESH KUMAR (RA***)": "RAMESH KUMAR (RA***)",
  "8 Khesra / Total Area: 3.62 Ha": "8 खेसरा / कुल क्षेत्र: 3.62 हे.",
  "Rice, Wheat / Seasons: Kharif & Rabi 2023-24":
    "धान, गेहूं / मौसम: खरीफ और रबी 2023-24",
};

function ConsentHelpPanels({ locale }: { locale: Locale }) {
  const t = createTranslator(locale);

  return (
    <>
      <HelpPanel title={t("About Data Sharing", "डेटा साझा करने के बारे में")}>
        <p>
          {t(
            "Your consent ensures that data is shared securely, only for the stated purpose and selected duration.",
            "आपकी सहमति सुनिश्चित करती है कि डेटा सुरक्षित रूप से, केवल बताए गए उद्देश्य और चुनी गई अवधि के लिए साझा हो।",
          )}
        </p>
        <ul className={styles.profileCheckList}>
          {[
            [
              t("Purpose-bound", "उद्देश्य-आधारित"),
              t(
                "Data is used only for the stated purpose.",
                "डेटा केवल बताए गए उद्देश्य के लिए उपयोग होता है।",
              ),
            ],
            [
              t("Secure & Encrypted", "सुरक्षित और एन्क्रिप्टेड"),
              t(
                "Your data is transmitted securely.",
                "आपका डेटा सुरक्षित रूप से भेजा जाता है।",
              ),
            ],
            [
              t("Revocable", "रद्द करने योग्य"),
              t(
                "You can revoke this consent anytime.",
                "आप यह सहमति कभी भी रद्द कर सकते हैं।",
              ),
            ],
            [
              t("Transparent", "पारदर्शी"),
              t(
                "You always know what data is shared.",
                "आपको हमेशा पता रहता है कि कौन-सा डेटा साझा हुआ।",
              ),
            ],
          ].map(([title, description]) => (
            <li key={title}>
              <Check size={16} aria-hidden="true" />
              <span>
                <strong>{title}</strong>
                {description}
              </span>
            </li>
          ))}
        </ul>
      </HelpPanel>
      <HelpPanel title={t("Important Notes", "महत्वपूर्ण बातें")}>
        <ul>
          <li>
            {t(
              "Select only the data that is required.",
              "केवल आवश्यक डेटा चुनें।",
            )}
          </li>
          <li>
            {t(
              "Masked data is shared unless full access is allowed.",
              "पूर्ण पहुंच की अनुमति न होने पर छिपा हुआ डेटा साझा किया जाता है।",
            )}
          </li>
          <li>
            {t(
              "Your consent can be revoked at any time.",
              "आपकी सहमति कभी भी रद्द की जा सकती है।",
            )}
          </li>
          <li>
            {t(
              "Every sharing event is logged for your reference.",
              "आपके संदर्भ के लिए हर साझा करने की घटना दर्ज की जाती है।",
            )}
          </li>
        </ul>
      </HelpPanel>
    </>
  );
}

export function ConsentFieldsPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const t = createTranslator(locale);
  const tx = (value: string) => t(value, consentHindi[value] ?? value);

  return (
    <ProfileFeatureShell
      locale={locale}
      dictionary={dictionary}
      title={t("Selective Data Field Selection", "चुनिंदा डेटा फील्ड चयन")}
      subtitle={t(
        "Choose exactly which of your personal data may be shared.",
        "ठीक वही व्यक्तिगत डेटा चुनें जिसे साझा किया जा सकता है।",
      )}
      aside={<ConsentHelpPanels locale={locale} />}
    >
      <div className={styles.profileInfoStrip}>
        <ShieldCheck size={20} aria-hidden="true" />
        {t(
          "You are in control. Only the data you select below will be shared with the recipient for the stated purpose.",
          "नियंत्रण आपके पास है। नीचे चुना गया डेटा ही बताए गए उद्देश्य के लिए प्राप्तकर्ता से साझा होगा।",
        )}
      </div>

      <FeaturePanel title={t("1. Sharing Context", "1. साझा करने का संदर्भ")}>
        <div className={styles.profileFormGrid}>
          <label className={styles.profileField}>
            <span>
              {t(
                "Recipient / Department / Agency *",
                "प्राप्तकर्ता / विभाग / एजेंसी *",
              )}
            </span>
            <select className={styles.select} defaultValue="agri">
              <option value="agri">
                {t("Bihar Agriculture (demo)", "बिहार कृषि (डेमो)")}
              </option>
            </select>
          </label>
          <label className={styles.profileField}>
            <span>
              {t("Purpose of Data Sharing *", "डेटा साझा करने का उद्देश्य *")}
            </span>
            <select className={styles.select} defaultValue="drip">
              <option value="drip">
                {t(
                  "Application for Subsidy under Drip Irrigation Scheme",
                  "ड्रिप सिंचाई योजना के अंतर्गत सब्सिडी के लिए आवेदन",
                )}
              </option>
            </select>
          </label>
          <label className={styles.profileField}>
            <span>
              {t(
                "Reference / Application (Optional)",
                "संदर्भ / आवेदन (वैकल्पिक)",
              )}
            </span>
            <input
              className={styles.input}
              placeholder={t(
                "Enter application or reference number",
                "आवेदन या संदर्भ नंबर दर्ज करें",
              )}
            />
          </label>
          <label className={styles.profileField}>
            <span>{t("Mode of Sharing", "साझा करने का माध्यम")}</span>
            <input
              className={styles.input}
              value={t("Online (Secure)", "ऑनलाइन (सुरक्षित)")}
              readOnly
            />
          </label>
          <label className={styles.profileField}>
            <span>{t("Validity of Consent", "सहमति की वैधता")}</span>
            <input
              className={styles.input}
              value={t(
                "90 Days (Till 21 Aug 2024)",
                "90 दिन (21 अगस्त 2024 तक)",
              )}
              readOnly
            />
          </label>
        </div>
      </FeaturePanel>

      <FeaturePanel
        title={t(
          "2. Select Data Fields to Share",
          "2. साझा करने के लिए डेटा फील्ड चुनें",
        )}
      >
        <label className={styles.profileSelectAll}>
          <input type="checkbox" />
          {t("Select All", "सभी चुनें")}
        </label>
        <div className={styles.tableWrap}>
          <table className={`${styles.table} ${styles.profileDataTable}`}>
            <thead>
              <tr>
                <th>{t("Data Category", "डेटा श्रेणी")}</th>
                <th>{t("Details", "विवरण")}</th>
                <th>{t("Masking", "छिपाव")}</th>
                <th>{t("Select", "चुनें")}</th>
              </tr>
            </thead>
            <tbody>
              {selectableFields.map(([category, details, masking, checked]) => (
                <tr
                  className={checked ? styles.profileTableSelected : ""}
                  key={category}
                >
                  <td>
                    <strong>{tx(category)}</strong>
                  </td>
                  <td>{tx(details)}</td>
                  <td>{tx(masking)}</td>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={checked}
                      aria-label={t(
                        `Share ${category}`,
                        `${tx(category)} साझा करें`,
                      )}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.profileWarningText}>
          {t(
            "Unchecked data fields will not be shared under any circumstances.",
            "बिना चुने डेटा फील्ड किसी भी परिस्थिति में साझा नहीं किए जाएंगे।",
          )}
        </p>
      </FeaturePanel>

      <FeaturePanel
        title={t("3. Review Your Selection", "3. अपने चयन की समीक्षा करें")}
      >
        <DefinitionGrid
          items={[
            [
              t("Total Categories Selected", "चुनी गई कुल श्रेणियां"),
              t("2 of 6", "6 में से 2"),
            ],
            [t("Total Data Fields Selected", "चुने गए कुल डेटा फील्ड"), "5"],
            [
              t("Estimated Data to be Shared", "साझा होने वाला अनुमानित डेटा"),
              t("Minimum Necessary", "न्यूनतम आवश्यक"),
            ],
            [t("Masking Applied", "छिपाव लागू"), t("Yes", "हां")],
          ]}
        />
        <div className={styles.profileSelectedSummary}>
          <strong>
            {t("You have selected to share:", "आपने साझा करने के लिए चुना है:")}
          </strong>
          <ul>
            <li>
              {t(
                "Land Records (Khesra Number, Area, Land Ownership)",
                "भूमि अभिलेख (खेसरा नंबर, क्षेत्रफल, भूमि स्वामित्व)",
              )}
            </li>
            <li>
              {t(
                "Crop Details (Crop Type, Sowing Area, Season)",
                "फसल विवरण (फसल प्रकार, बुवाई क्षेत्र, मौसम)",
              )}
            </li>
          </ul>
        </div>
      </FeaturePanel>

      <div className={styles.profileInfoStrip}>
        <Info size={20} aria-hidden="true" />
        {t(
          "You can review a summary on the next screen before giving your final consent.",
          "अंतिम सहमति देने से पहले आप अगली स्क्रीन पर सारांश की समीक्षा कर सकते हैं।",
        )}
      </div>
      <div className={styles.profileActionRow}>
        <a
          className={`${styles.button} ${styles.buttonSecondary}`}
          href={routes.profile(locale)}
        >
          {t("Cancel", "रद्द करें")}
        </a>
        <button className={`${styles.button} ${styles.buttonSecondary}`}>
          {t("Save as Draft", "ड्राफ्ट के रूप में सहेजें")}
        </button>
        <a className={styles.button} href={routes.profileConsentReview(locale)}>
          {t("Next: Review & Confirm", "अगला: समीक्षा और पुष्टि")}
        </a>
      </div>
    </ProfileFeatureShell>
  );
}

export function ConsentReviewPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const t = createTranslator(locale);
  const tx = (value: string) => t(value, consentHindi[value] ?? value);
  const excludedData = [
    [
      "Contact Information",
      "Mobile Number, Email Address",
      "Not required for this purpose",
    ],
    ["Aadhaar (demo)", "Masked Aadhaar Number", "Not permitted"],
    [
      "Banking Information",
      "Bank Name, Account Number, IFSC",
      "Sensitive data not required",
    ],
  ] as const;

  return (
    <ProfileFeatureShell
      locale={locale}
      dictionary={dictionary}
      title={t(
        "Consent Review and Sharing Mode",
        "सहमति समीक्षा और साझा करने का माध्यम",
      )}
      subtitle={t(
        "Review the data you are sharing and choose how you want to share it.",
        "साझा किए जा रहे डेटा की समीक्षा करें और साझा करने का माध्यम चुनें।",
      )}
      backHref={routes.profileConsent(locale)}
      aside={
        <HelpPanel title={t("Need Help?", "मदद चाहिए?")}>
          <p>
            {t(
              "Review the included and excluded information before generating the consent token.",
              "सहमति टोकन बनाने से पहले शामिल और बाहर रखी गई जानकारी की समीक्षा करें।",
            )}
          </p>
          <a
            className={styles.profileHelpButton}
            href={`${routes.more(locale)}#help`}
          >
            <MessageCircle size={18} aria-hidden="true" />
            {t("Chat with Krishi Mitra", "कृषि मित्र से चैट करें")}
          </a>
        </HelpPanel>
      }
    >
      <div className={styles.profileInfoStrip}>
        <Eye size={20} aria-hidden="true" />
        {t(
          'Please review carefully. The consent token will be generated only for the data shown in "Included Data".',
          'कृपया ध्यान से समीक्षा करें। सहमति टोकन केवल "शामिल डेटा" में दिखाए गए डेटा के लिए बनेगा।',
        )}
      </div>

      <FeaturePanel title={t("Sharing Context", "साझा करने का संदर्भ")}>
        <DefinitionGrid
          items={[
            [
              t("Recipient / Department", "प्राप्तकर्ता / विभाग"),
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
              t("Reference / Application", "संदर्भ / आवेदन"),
              "BR-DRIP-2024-001234",
            ],
            [
              t("Validity of Consent", "सहमति की वैधता"),
              t("90 Days / Till 21 Aug 2024", "90 दिन / 21 अगस्त 2024 तक"),
            ],
            [
              t("Mode of Sharing", "साझा करने का माध्यम"),
              t("Online (Secure)", "ऑनलाइन (सुरक्षित)"),
            ],
            [
              t("Security", "सुरक्षा"),
              t("End-to-End Encrypted", "एंड-टू-एंड एन्क्रिप्टेड"),
            ],
            [t("Revocable", "रद्द करने योग्य"), t("Yes", "हां")],
          ]}
        />
      </FeaturePanel>

      <FeaturePanel
        title={t(
          "1. Included Data (Will Be Shared)",
          "1. शामिल डेटा (साझा किया जाएगा)",
        )}
      >
        <div className={styles.tableWrap}>
          <table className={`${styles.table} ${styles.profileDataTable}`}>
            <thead>
              <tr>
                <th>{t("Data Category", "डेटा श्रेणी")}</th>
                <th>{t("Details", "विवरण")}</th>
                <th>{t("Masking", "छिपाव")}</th>
                <th>{t("Preview", "पूर्वावलोकन")}</th>
              </tr>
            </thead>
            <tbody>
              {includedData.map(([category, details, masking, preview]) => (
                <tr className={styles.profileTableSelected} key={category}>
                  <td>
                    <strong>{tx(category)}</strong>
                  </td>
                  <td>{tx(details)}</td>
                  <td>{tx(masking)}</td>
                  <td>{tx(preview)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FeaturePanel>

      <FeaturePanel
        title={t(
          "2. Not Shared Data (Will Not Be Shared)",
          "2. साझा न किया गया डेटा (साझा नहीं होगा)",
        )}
      >
        <div className={styles.tableWrap}>
          <table className={`${styles.table} ${styles.profileDataTable}`}>
            <thead>
              <tr>
                <th>{t("Data Category", "डेटा श्रेणी")}</th>
                <th>{t("Details", "विवरण")}</th>
                <th>{t("Reason", "कारण")}</th>
              </tr>
            </thead>
            <tbody>
              {excludedData.map(([category, details, reason]) => (
                <tr key={category}>
                  <td>
                    <strong>{tx(category)}</strong>
                  </td>
                  <td>{tx(details)}</td>
                  <td>
                    {t(
                      reason,
                      {
                        "Not required for this purpose":
                          "इस उद्देश्य के लिए आवश्यक नहीं",
                        "Not permitted": "अनुमति नहीं है",
                        "Sensitive data not required":
                          "संवेदनशील डेटा आवश्यक नहीं",
                      }[reason] ?? reason,
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.profileWarningText}>
          {t(
            "Unselected data will not be transmitted in any form.",
            "बिना चुना डेटा किसी भी रूप में भेजा नहीं जाएगा।",
          )}
        </p>
      </FeaturePanel>

      <FeaturePanel
        title={t("3. Choose Sharing Mode", "3. साझा करने का माध्यम चुनें")}
      >
        <div className={styles.profileChoiceGrid}>
          {[
            [
              t("API (Secure)", "एपीआई (सुरक्षित)"),
              t(
                "Share directly via secure API to the department system.",
                "सुरक्षित एपीआई से सीधे विभागीय प्रणाली को साझा करें।",
              ),
            ],
            [
              t("Secure QR Code", "सुरक्षित क्यूआर कोड"),
              t(
                "Generate a secure QR code for offline or in-person verification.",
                "ऑफलाइन या व्यक्तिगत सत्यापन के लिए सुरक्षित क्यूआर कोड बनाएं।",
              ),
            ],
            [
              t("Encrypted PDF", "एन्क्रिप्टेड पीडीएफ"),
              t(
                "Download an encrypted PDF containing the consent payload.",
                "सहमति डेटा वाली एन्क्रिप्टेड पीडीएफ डाउनलोड करें।",
              ),
            ],
          ].map(([title, description], index) => (
            <label
              className={index === 1 ? styles.profileChoiceSelected : ""}
              key={title}
            >
              <input
                type="radio"
                name="sharing-mode"
                defaultChecked={index === 1}
              />
              <QrCode size={24} aria-hidden="true" />
              <strong>{title}</strong>
              <span>{description}</span>
            </label>
          ))}
        </div>
      </FeaturePanel>

      <FeaturePanel
        title={t("4. Consent Token (Preview)", "4. सहमति टोकन (पूर्वावलोकन)")}
      >
        <DefinitionGrid
          items={[
            [t("Consent Token", "सहमति टोकन"), "CON-2024-05-21-7F3A8B9C"],
            [
              t("Issued On", "जारी करने का समय"),
              t("21 May 2024, 11:22 AM", "21 मई 2024, सुबह 11:22 बजे"),
            ],
            [
              t("Valid Till", "तक वैध"),
              t("21 Aug 2024, 11:22 AM", "21 अगस्त 2024, सुबह 11:22 बजे"),
            ],
            [
              t("Status", "स्थिति"),
              <span className={styles.profileStatusDraft} key="draft">
                {t("Draft", "ड्राफ्ट")}
              </span>,
            ],
          ]}
        />
      </FeaturePanel>

      <FeaturePanel title={t("5. Consent Summary", "5. सहमति सारांश")}>
        <DefinitionGrid
          items={[
            [
              t("Total Categories Selected", "चुनी गई कुल श्रेणियां"),
              t("2 of 6", "6 में से 2"),
            ],
            [t("Total Data Fields Selected", "चुने गए कुल डेटा फील्ड"), "5"],
            [
              t("Estimated Data to be Shared", "साझा होने वाला अनुमानित डेटा"),
              t("Minimum Necessary", "न्यूनतम आवश्यक"),
            ],
            [t("Masking Applied", "छिपाव लागू"), t("Yes", "हां")],
            [
              t("Revocable by You", "आपके द्वारा रद्द करने योग्य"),
              t("Yes", "हां"),
            ],
            [t("Audit Logged", "ऑडिट दर्ज"), t("Yes", "हां")],
          ]}
        />
      </FeaturePanel>

      <label className={styles.profileConfirmation}>
        <input type="checkbox" defaultChecked />
        {t(
          "I have reviewed the included and not shared data above. I understand that only the included data will be shared for the stated purpose and duration. I can revoke this consent at any time.",
          "मैंने ऊपर शामिल और साझा न किए जाने वाले डेटा की समीक्षा कर ली है। मैं समझता/समझती हूं कि केवल शामिल डेटा बताए गए उद्देश्य और अवधि के लिए साझा होगा। मैं यह सहमति कभी भी रद्द कर सकता/सकती हूं।",
        )}
      </label>
      <div className={styles.profileActionRow}>
        <a
          className={`${styles.button} ${styles.buttonSecondary}`}
          href={routes.profileConsent(locale)}
        >
          {t("Cancel", "रद्द करें")}
        </a>
        <button className={`${styles.button} ${styles.buttonSecondary}`}>
          {t("Save as Draft", "ड्राफ्ट के रूप में सहेजें")}
        </button>
        <a className={styles.button} href={routes.profileConsentToken(locale)}>
          {t("Generate Consent Token", "सहमति टोकन बनाएं")}
        </a>
      </div>
    </ProfileFeatureShell>
  );
}

export function ConsentTokenPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const t = createTranslator(locale);
  const tx = (value: string) => t(value, consentHindi[value] ?? value);

  return (
    <ProfileFeatureShell
      locale={locale}
      dictionary={dictionary}
      title={t("Consent Token / Share Output", "सहमति टोकन / साझा आउटपुट")}
      subtitle={t(
        "Your consent has been granted successfully. Share the token or document with the recipient using your preferred mode.",
        "आपकी सहमति सफलतापूर्वक दे दी गई है। अपने पसंदीदा माध्यम से टोकन या दस्तावेज प्राप्तकर्ता के साथ साझा करें।",
      )}
      backHref={routes.profileConsentReview(locale)}
      aside={
        <>
          <HelpPanel
            title={t("Consent Status & Validity", "सहमति की स्थिति और वैधता")}
          >
            <span className={styles.profileStatusSuccess}>
              <BadgeCheck size={17} aria-hidden="true" />
              {t("Active", "सक्रिय")}
            </span>
            <DefinitionGrid
              items={[
                [
                  t("Issued On", "जारी करने का समय"),
                  t("21 May 2024, 11:22 AM", "21 मई 2024, सुबह 11:22 बजे"),
                ],
                [
                  t("Issued By", "जारीकर्ता"),
                  t("Bihar Farmer Demo", "बिहार किसान डेमो"),
                ],
                [
                  t("Revocable By", "रद्द करने वाला"),
                  t("You (Anytime)", "आप (कभी भी)"),
                ],
                [t("Validity", "वैधता"), t("90 Days", "90 दिन")],
                [
                  t("Auto Expiry On", "स्वतः समाप्ति"),
                  t("21 Aug 2024, 11:22 AM", "21 अगस्त 2024, सुबह 11:22 बजे"),
                ],
              ]}
            />
          </HelpPanel>
          <HelpPanel title={t("Scope of Data Shared", "साझा डेटा का दायरा")}>
            <DefinitionGrid
              items={[
                [tx("Personal Information"), t("3 Fields", "3 फील्ड")],
                [tx("Land Records"), t("2 Items", "2 मद")],
                [tx("Crop Details"), t("2 Items", "2 मद")],
                [
                  t("Total Categories", "कुल श्रेणियां"),
                  t("3 of 6", "6 में से 3"),
                ],
                [t("Total Data Fields", "कुल डेटा फील्ड"), "5"],
              ]}
            />
          </HelpPanel>
        </>
      }
    >
      <div className={styles.profileSuccessBanner}>
        <CheckCircle2 size={28} aria-hidden="true" />
        <span>
          <strong>
            {t("Consent granted successfully.", "सहमति सफलतापूर्वक दे दी गई।")}
          </strong>
          {t(
            "This token is valid for the selected purpose and duration.",
            "यह टोकन चुने गए उद्देश्य और अवधि के लिए वैध है।",
          )}
        </span>
      </div>

      <FeaturePanel
        title={t("1. Consent Token Summary", "1. सहमति टोकन सारांश")}
      >
        <div className={styles.consentTokenLayout}>
          <DefinitionGrid
            items={[
              [
                t("Consent Token / Reference", "सहमति टोकन / संदर्भ"),
                "CON-2024-05-21-7F3A8B9C",
              ],
              [
                t("Status", "स्थिति"),
                <span className={styles.profileStatusSuccess} key="active">
                  {t("Active", "सक्रिय")}
                </span>,
              ],
              [
                t("Valid From", "से वैध"),
                t("21 May 2024, 11:22 AM", "21 मई 2024, सुबह 11:22 बजे"),
              ],
              [
                t("Valid Till", "तक वैध"),
                t(
                  "21 Aug 2024, 11:22 AM (90 Days)",
                  "21 अगस्त 2024, सुबह 11:22 बजे (90 दिन)",
                ),
              ],
              [
                t("Recipient", "प्राप्तकर्ता"),
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
                t("Mode of Sharing", "साझा करने का माध्यम"),
                t("Secure QR Code", "सुरक्षित क्यूआर कोड"),
              ],
              [
                t("Security", "सुरक्षा"),
                t("End-to-End Encrypted", "एंड-टू-एंड एन्क्रिप्टेड"),
              ],
            ]}
          />
          <div className={styles.consentQrPanel}>
            <QrVisual
              label={t("Scan demo consent token", "डेमो सहमति टोकन स्कैन करें")}
              value="https://bihar-farmer-demo.invalid/verify/consent/CON-2024-05-21-7F3A8B9C"
            />
            <span>
              <BadgeCheck size={16} aria-hidden="true" />
              {t(
                "Sample token — not officially verified",
                "नमूना टोकन — आधिकारिक रूप से सत्यापित नहीं",
              )}
            </span>
          </div>
        </div>
      </FeaturePanel>

      <FeaturePanel title={t("2. Data Shared Summary", "2. साझा डेटा सारांश")}>
        <div className={styles.tableWrap}>
          <table className={`${styles.table} ${styles.profileDataTable}`}>
            <thead>
              <tr>
                <th>{t("Data Category", "डेटा श्रेणी")}</th>
                <th>{t("Details", "विवरण")}</th>
                <th>{t("Shared Value", "साझा मान")}</th>
              </tr>
            </thead>
            <tbody>
              {includedData.map(([category, details, , preview]) => (
                <tr className={styles.profileTableSelected} key={category}>
                  <td>
                    <strong>{tx(category)}</strong>
                  </td>
                  <td>{tx(details)}</td>
                  <td>{tx(preview)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.profileWarningText}>
          {t(
            "Data not selected above will not be shared with the recipient.",
            "ऊपर नहीं चुना गया डेटा प्राप्तकर्ता के साथ साझा नहीं होगा।",
          )}
        </p>
      </FeaturePanel>

      <FeaturePanel
        title={t("3. Share / Download Options", "3. साझा / डाउनलोड विकल्प")}
      >
        <div className={styles.profileOptionGrid}>
          {[
            [
              QrCode,
              t("Share QR Code", "क्यूआर कोड साझा करें"),
              t(
                "Show or share QR for verification",
                "सत्यापन के लिए क्यूआर दिखाएं या साझा करें",
              ),
            ],
            [
              Download,
              t("Download Encrypted PDF", "एन्क्रिप्टेड पीडीएफ डाउनलोड करें"),
              t(
                "Download consent as encrypted PDF",
                "सहमति को एन्क्रिप्टेड पीडीएफ के रूप में डाउनलोड करें",
              ),
            ],
            [
              ClipboardCopy,
              t("Copy Token", "टोकन कॉपी करें"),
              t("Copy token to clipboard", "टोकन क्लिपबोर्ड पर कॉपी करें"),
            ],
            [
              MessageCircle,
              t("Share via WhatsApp", "व्हाट्सऐप से साझा करें"),
              t(
                "Share token securely via WhatsApp",
                "व्हाट्सऐप से टोकन सुरक्षित रूप से साझा करें",
              ),
            ],
          ].map(([Icon, title, description]) => {
            const OptionIcon = Icon as typeof QrCode;
            return (
              <button type="button" key={title as string}>
                <OptionIcon size={25} aria-hidden="true" />
                <span>
                  <strong>{title as string}</strong>
                  <small>{description as string}</small>
                </span>
              </button>
            );
          })}
        </div>
      </FeaturePanel>

      <FeaturePanel title={t("4. Actions", "4. कार्रवाइयां")}>
        <div className={styles.profileActionRow}>
          <button className={`${styles.button} ${styles.buttonDanger}`}>
            <Trash2 size={18} aria-hidden="true" />
            {t("Revoke Consent", "सहमति रद्द करें")}
          </button>
          <a
            className={`${styles.button} ${styles.buttonSecondary}`}
            href={routes.profileAudit(locale)}
          >
            <History size={18} aria-hidden="true" />
            {t("View Consent History", "सहमति इतिहास देखें")}
          </a>
          <button className={`${styles.button} ${styles.buttonSecondary}`}>
            <Share2 size={18} aria-hidden="true" />
            {t("Share Token", "टोकन साझा करें")}
          </button>
        </div>
      </FeaturePanel>

      <div className={styles.profileInfoStrip}>
        <FileCheck2 size={20} aria-hidden="true" />
        {t(
          "Generation of this token and any external sharing are recorded as separate audit events.",
          "इस टोकन का बनना और कोई भी बाहरी साझा करना अलग-अलग ऑडिट घटनाओं के रूप में दर्ज होता है।",
        )}
      </div>
    </ProfileFeatureShell>
  );
}
