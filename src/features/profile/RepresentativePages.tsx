import {
  BadgeCheck,
  CalendarDays,
  Check,
  FileCheck2,
  Info,
  LockKeyhole,
  ShieldCheck,
  UserCheck,
  UserPlus,
  UsersRound,
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
} from "./ProfileFeatureShell";

const permissions = [
  [
    "View Farm & Land Details",
    "खेत और भूमि विवरण देखें",
    "View your farm, land and related information",
    "अपने खेत, भूमि और संबंधित जानकारी देखें",
  ],
  [
    "Apply for Schemes",
    "योजनाओं के लिए आवेदन करें",
    "Apply for government schemes on your behalf",
    "आपकी ओर से सरकारी योजनाओं के लिए आवेदन करें",
  ],
  [
    "Upload Documents",
    "दस्तावेज अपलोड करें",
    "Upload and manage documents",
    "दस्तावेज अपलोड और प्रबंधित करें",
  ],
  [
    "Track Applications",
    "आवेदन ट्रैक करें",
    "Track status of applications and claims",
    "आवेदनों और दावों की स्थिति ट्रैक करें",
  ],
  [
    "Transactions & Payments",
    "लेनदेन और भुगतान",
    "Make payments and track transactions",
    "भुगतान करें और लेनदेन ट्रैक करें",
  ],
  [
    "Manage Consent",
    "सहमति प्रबंधित करें",
    "Create and manage data sharing consents",
    "डेटा साझा करने की सहमतियां बनाएं और प्रबंधित करें",
  ],
] as const;

export function RepresentativesPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const t = createTranslator(locale);

  return (
    <ProfileFeatureShell
      locale={locale}
      dictionary={dictionary}
      title={t("Representative Management", "प्रतिनिधि प्रबंधन")}
      subtitle={t(
        "View and manage the representatives you have authorized to act on your behalf.",
        "उन प्रतिनिधियों को देखें और प्रबंधित करें जिन्हें आपने अपनी ओर से कार्य करने की अनुमति दी है।",
      )}
      aside={
        <>
          <HelpPanel title={t("About Representative", "प्रतिनिधि के बारे में")}>
            <ul className={styles.profileCheckList}>
              {[
                [
                  t("Scope Based", "दायरा-आधारित"),
                  t(
                    "Define exactly what your representative can do.",
                    "स्पष्ट रूप से तय करें कि आपका प्रतिनिधि क्या कर सकता है।",
                  ),
                ],
                [
                  t("Time Bound", "समयबद्ध"),
                  t(
                    "Set a validity period for authorization.",
                    "प्राधिकरण के लिए वैधता अवधि तय करें।",
                  ),
                ],
                [
                  t("Revocable", "रद्द करने योग्य"),
                  t(
                    "Revoke the authorization anytime.",
                    "प्राधिकरण कभी भी रद्द करें।",
                  ),
                ],
                [
                  t("Secure", "सुरक्षित"),
                  t(
                    "All actions are logged and audited.",
                    "सभी कार्रवाइयां दर्ज और ऑडिट की जाती हैं।",
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
          <HelpPanel title={t("Quick Actions", "त्वरित कार्रवाइयां")}>
            <div className={styles.profileSideActions}>
              <a href={routes.profileRepresentativeAdd(locale)}>
                <UserPlus size={18} aria-hidden="true" />
                {t("Add Representative", "प्रतिनिधि जोड़ें")}
              </a>
              <button type="button">
                <LockKeyhole size={18} aria-hidden="true" />
                {t("Revoke Delegation", "प्रतिनिधित्व रद्द करें")}
              </button>
            </div>
          </HelpPanel>
        </>
      }
    >
      <div className={styles.profileWarningStrip}>
        <Info size={20} aria-hidden="true" />
        <span>
          <strong>{t("Important", "महत्वपूर्ण")}</strong>
          {t(
            "Authorization allows a representative to act on your behalf. Ownership of records and benefits remains with you.",
            "प्राधिकरण प्रतिनिधि को आपकी ओर से कार्य करने की अनुमति देता है। अभिलेखों और लाभों का स्वामित्व आपके पास ही रहता है।",
          )}
        </span>
      </div>

      <div className={styles.profileMetricGrid}>
        {[
          [t("Active Representatives", "सक्रिय प्रतिनिधि"), "1", "success"],
          [t("Expired", "समाप्त"), "0", "warning"],
          [t("Revoked", "रद्द"), "0", "danger"],
          [
            t("No Representative", "कोई प्रतिनिधि नहीं"),
            t("No", "नहीं"),
            "neutral",
          ],
        ].map(([label, value, tone]) => (
          <article
            className={styles.profileMetric}
            data-tone={tone}
            key={label}
          >
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>

      <FeaturePanel title={t("Active Representatives", "सक्रिय प्रतिनिधि")}>
        <article className={styles.representativeCard}>
          <div className={styles.representativeIdentity}>
            <span>
              <UserCheck size={28} aria-hidden="true" />
            </span>
            <div>
              <h3>Suresh Kumar</h3>
              <p>{t("Relationship: Brother", "संबंध: भाई")}</p>
              <p>{t("Mobile: 98XXXXXX21", "मोबाइल: 98XXXXXX21")}</p>
              <p>
                {t(
                  "Aadhaar (masked demo): XXXX XXXX 9012",
                  "आधार (छिपाया गया डेमो): XXXX XXXX 9012",
                )}
              </p>
            </div>
            <span className={styles.profileStatusSuccess}>
              <BadgeCheck size={16} aria-hidden="true" />
              {t("Active", "सक्रिय")}
            </span>
          </div>
          <div>
            <strong>{t("Scope of Authorization", "प्राधिकरण का दायरा")}</strong>
            <div className={styles.permissionChips}>
              {[
                t("View Farm & Land Details", "खेत और भूमि विवरण देखें"),
                t("Apply for Schemes", "योजनाओं के लिए आवेदन करें"),
                t("Upload Documents", "दस्तावेज अपलोड करें"),
                t("Track Applications", "आवेदन ट्रैक करें"),
              ].map((item) => (
                <span key={item}>
                  <Check size={14} aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <p className={styles.representativeValidity}>
            <CalendarDays size={17} aria-hidden="true" />
            {t(
              "Validity: 21 May 2024 to 21 May 2026",
              "वैधता: 21 मई 2024 से 21 मई 2026",
            )}
          </p>
        </article>
      </FeaturePanel>

      <div className={styles.profileEmptyGrid}>
        <FeaturePanel title={t("Expired Representatives", "समाप्त प्रतिनिधि")}>
          <UsersRound size={32} aria-hidden="true" />
          <strong>
            {t("No expired representatives.", "कोई समाप्त प्रतिनिधि नहीं है।")}
          </strong>
          <p>
            {t(
              "Expired authorizations will appear here.",
              "समाप्त प्राधिकरण यहां दिखाई देंगे।",
            )}
          </p>
        </FeaturePanel>
        <FeaturePanel title={t("Revoked Representatives", "रद्द प्रतिनिधि")}>
          <UsersRound size={32} aria-hidden="true" />
          <strong>
            {t("No revoked representatives.", "कोई रद्द प्रतिनिधि नहीं है।")}
          </strong>
          <p>
            {t(
              "Revoked authorizations will appear here.",
              "रद्द प्राधिकरण यहां दिखाई देंगे।",
            )}
          </p>
        </FeaturePanel>
      </div>

      <FeaturePanel title={t("Add New Representative", "नया प्रतिनिधि जोड़ें")}>
        <div className={styles.profilePanelCta}>
          <div>
            <p>
              {t(
                "Authorize someone you trust to act on your behalf for specific purposes.",
                "विशिष्ट उद्देश्यों के लिए अपनी ओर से कार्य करने हेतु किसी विश्वसनीय व्यक्ति को अधिकृत करें।",
              )}
            </p>
            <small>
              {t(
                "Representatives can only act within the scope and validity period you define.",
                "प्रतिनिधि केवल आपके द्वारा तय दायरे और वैधता अवधि में कार्य कर सकते हैं।",
              )}
            </small>
          </div>
          <a
            className={styles.button}
            href={routes.profileRepresentativeAdd(locale)}
          >
            <UserPlus size={18} aria-hidden="true" />
            {t("Add Representative", "प्रतिनिधि जोड़ें")}
          </a>
        </div>
      </FeaturePanel>

      <div className={styles.profileInfoStrip}>
        <ShieldCheck size={20} aria-hidden="true" />
        {t(
          "Authorization does not transfer ownership of your records, land or benefits. You can revoke or modify it at any time.",
          "प्राधिकरण आपके अभिलेखों, भूमि या लाभों का स्वामित्व हस्तांतरित नहीं करता। आप इसे कभी भी रद्द या संशोधित कर सकते हैं।",
        )}
      </div>
    </ProfileFeatureShell>
  );
}

export function AddRepresentativePage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const t = createTranslator(locale);

  return (
    <ProfileFeatureShell
      locale={locale}
      dictionary={dictionary}
      title={t("Add Representative", "प्रतिनिधि जोड़ें")}
      subtitle={t(
        "Authorize someone you trust to act on your behalf for specific purposes.",
        "विशिष्ट उद्देश्यों के लिए अपनी ओर से कार्य करने हेतु किसी विश्वसनीय व्यक्ति को अधिकृत करें।",
      )}
      backHref={routes.profileRepresentatives(locale)}
      aside={
        <>
          <HelpPanel title={t("About Authorization", "प्राधिकरण के बारे में")}>
            <ul>
              <li>
                {t(
                  "Authorization does not transfer ownership.",
                  "प्राधिकरण स्वामित्व हस्तांतरित नहीं करता।",
                )}
              </li>
              <li>
                {t(
                  "The representative acts only within the allowed scope.",
                  "प्रतिनिधि केवल अनुमत दायरे में कार्य करता है।",
                )}
              </li>
              <li>
                {t(
                  "You can revoke or modify authorization anytime.",
                  "आप प्राधिकरण को कभी भी रद्द या संशोधित कर सकते हैं।",
                )}
              </li>
              <li>
                {t(
                  "All actions are logged and audited.",
                  "सभी कार्रवाइयां दर्ज और ऑडिट की जाती हैं।",
                )}
              </li>
            </ul>
          </HelpPanel>
          <HelpPanel title={t("Verification Steps", "सत्यापन के चरण")}>
            <ol className={styles.profileNumberList}>
              <li>
                {t(
                  "Enter a sample Aadhaar number for the demo.",
                  "डेमो के लिए नमूना आधार नंबर दर्ज करें।",
                )}
              </li>
              <li>
                {t(
                  "Complete e-KYC using OTP or biometric.",
                  "ओटीपी या बायोमेट्रिक से ई-केवाईसी पूरी करें।",
                )}
              </li>
              <li>
                {t(
                  "Select relationship, validity and scope.",
                  "संबंध, वैधता और दायरा चुनें।",
                )}
              </li>
              <li>
                {t(
                  "Review details and confirm.",
                  "विवरण की समीक्षा करके पुष्टि करें।",
                )}
              </li>
              <li>
                {t(
                  "Authorization is issued and activated.",
                  "प्राधिकरण जारी और सक्रिय किया जाता है।",
                )}
              </li>
            </ol>
          </HelpPanel>
        </>
      }
    >
      <div className={styles.profileInfoStrip}>
        <ShieldCheck size={20} aria-hidden="true" />
        {t(
          "Representative will be able to act only within the scope and validity you define below.",
          "प्रतिनिधि केवल नीचे तय किए गए दायरे और वैधता में कार्य कर सकेगा।",
        )}
      </div>

      <FeaturePanel
        title={t(
          "1. Representative Identity Verification",
          "1. प्रतिनिधि की पहचान का सत्यापन",
        )}
      >
        <div className={styles.profileVerifyRow}>
          <label className={styles.profileField}>
            <span>{t("Aadhaar Number (demo) *", "आधार नंबर (डेमो) *")}</span>
            <input
              className={styles.input}
              inputMode="numeric"
              placeholder={t(
                "Enter a 12 digit sample Aadhaar number",
                "12 अंकों का नमूना आधार नंबर दर्ज करें",
              )}
            />
          </label>
          <button className={styles.button} type="button">
            {t("Verify Identity", "पहचान सत्यापित करें")}
          </button>
        </div>
        <div className={styles.profileFormGrid}>
          <label className={styles.profileField}>
            <span>
              {t("Representative Name (demo)", "प्रतिनिधि का नाम (डेमो)")}
            </span>
            <input
              className={styles.input}
              placeholder={t(
                "Will be auto-filled after verification",
                "सत्यापन के बाद स्वतः भर जाएगा",
              )}
              readOnly
            />
          </label>
          <label className={styles.profileField}>
            <span>{t("Date of Birth", "जन्म तिथि")}</span>
            <input
              className={styles.input}
              placeholder={t("DD / MM / YYYY", "दिन / माह / वर्ष")}
            />
          </label>
          <label className={styles.profileField}>
            <span>{t("Gender", "लिंग")}</span>
            <select className={styles.select} defaultValue="">
              <option value="" disabled>
                {t("Select", "चुनें")}
              </option>
              <option>{t("Male", "पुरुष")}</option>
              <option>{t("Female", "महिला")}</option>
              <option>{t("Other", "अन्य")}</option>
            </select>
          </label>
          <label className={styles.profileField}>
            <span>{t("Mobile Number", "मोबाइल नंबर")}</span>
            <input
              className={styles.input}
              inputMode="numeric"
              placeholder={t("Enter mobile number", "मोबाइल नंबर दर्ज करें")}
            />
          </label>
        </div>
        <div className={styles.profilePendingStatus}>
          <span>{t("e-KYC Status", "ई-केवाईसी स्थिति")}</span>
          <strong>
            {t("Identity not verified yet.", "पहचान अभी सत्यापित नहीं हुई है।")}
          </strong>
          <em>{t("Pending", "लंबित")}</em>
        </div>
      </FeaturePanel>

      <FeaturePanel
        title={t(
          "2. Relationship with Representative",
          "2. प्रतिनिधि के साथ संबंध",
        )}
      >
        <div className={styles.profileChoiceGrid}>
          {[
            t("Son / Daughter", "पुत्र / पुत्री"),
            t("Spouse", "पति / पत्नी"),
            t("Other Family Member", "परिवार का अन्य सदस्य"),
            t("VLE / CSC", "वीएलई / सीएससी"),
            t("Other (Please Specify)", "अन्य (कृपया बताएं)"),
          ].map((item) => (
            <label key={item}>
              <input type="radio" name="relationship" />
              <UsersRound size={22} aria-hidden="true" />
              <strong>{item}</strong>
            </label>
          ))}
        </div>
      </FeaturePanel>

      <FeaturePanel
        title={t("3. Authorization Validity", "3. प्राधिकरण की वैधता")}
      >
        <div className={styles.profileChoiceGrid}>
          {[
            t("6 Months", "6 महीने"),
            t("1 Year", "1 वर्ष"),
            t(
              "Single Scheme (Up to closure of scheme)",
              "एकल योजना (योजना बंद होने तक)",
            ),
            t("Custom", "अपनी अवधि चुनें"),
          ].map((item) => (
            <label key={item}>
              <input type="radio" name="validity" />
              <CalendarDays size={22} aria-hidden="true" />
              <strong>{item}</strong>
            </label>
          ))}
        </div>
        <div className={styles.profileDateRange}>
          <input
            className={styles.input}
            placeholder={t("DD/MM/YYYY", "दिन/माह/वर्ष")}
          />
          <span>{t("to", "से")}</span>
          <input
            className={styles.input}
            placeholder={t("DD/MM/YYYY", "दिन/माह/वर्ष")}
          />
        </div>
      </FeaturePanel>

      <FeaturePanel
        title={t("4. Scope of Authorization", "4. प्राधिकरण का दायरा")}
      >
        <div className={styles.tableWrap}>
          <table className={`${styles.table} ${styles.profileDataTable}`}>
            <thead>
              <tr>
                <th>{t("Scope / Permission", "दायरा / अनुमति")}</th>
                <th>{t("Description", "विवरण")}</th>
                <th>{t("Allow", "अनुमति दें")}</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map(
                (
                  [permission, permissionHi, description, descriptionHi],
                  index,
                ) => (
                  <tr
                    className={index < 4 ? styles.profileTableSelected : ""}
                    key={permission}
                  >
                    <td>
                      <strong>{t(permission, permissionHi)}</strong>
                    </td>
                    <td>{t(description, descriptionHi)}</td>
                    <td>
                      <input
                        type="checkbox"
                        defaultChecked={index < 4}
                        aria-label={t(
                          `Allow ${permission}`,
                          `${permissionHi} की अनुमति दें`,
                        )}
                      />
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
        <p className={styles.profileWarningText}>
          {t(
            "You can modify scope anytime. Representative will only act within allowed permissions.",
            "आप दायरा कभी भी बदल सकते हैं। प्रतिनिधि केवल अनुमत अधिकारों के भीतर कार्य करेगा।",
          )}
        </p>
      </FeaturePanel>

      <FeaturePanel
        title={t(
          "5. Review and Issue Authorization",
          "5. समीक्षा करके प्राधिकरण जारी करें",
        )}
      >
        <DefinitionGrid
          items={[
            [
              t("Representative", "प्रतिनिधि"),
              t("Not Verified", "सत्यापित नहीं"),
            ],
            [t("Relationship", "संबंध"), t("Not Selected", "चुना नहीं गया")],
            [t("Validity", "वैधता"), t("Not Selected", "चुना नहीं गया")],
            [t("Scope", "दायरा"), t("Not Selected", "चुना नहीं गया")],
          ]}
        />
        <label className={styles.profileConfirmation}>
          <input type="checkbox" />
          {t(
            "I confirm that the above details are correct and I want to issue this authorization.",
            "मैं पुष्टि करता/करती हूं कि ऊपर दिए गए विवरण सही हैं और मैं यह प्राधिकरण जारी करना चाहता/चाहती हूं।",
          )}
        </label>
      </FeaturePanel>

      <div className={styles.profileActionRow}>
        <a
          className={`${styles.button} ${styles.buttonSecondary}`}
          href={routes.profileRepresentatives(locale)}
        >
          {t("Cancel", "रद्द करें")}
        </a>
        <button className={`${styles.button} ${styles.buttonSecondary}`}>
          {t("Save as Draft", "ड्राफ्ट के रूप में सहेजें")}
        </button>
        <button className={styles.button}>
          <FileCheck2 size={18} aria-hidden="true" />
          {t("Issue Authorization", "प्राधिकरण जारी करें")}
        </button>
      </div>
    </ProfileFeatureShell>
  );
}
