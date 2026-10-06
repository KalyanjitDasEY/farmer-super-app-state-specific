import {
  BadgeCheck,
  CalendarDays,
  Check,
  Copy,
  Download,
  IdCard,
  Info,
  LockKeyhole,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

import { withBasePath } from "@/config/base-path";
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

export function DigitalIdPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const t = createTranslator(locale);
  const aboutItems = [
    t(
      "This sample ID is for demonstration only; it is not government-verified.",
      "यह नमूना आईडी केवल डेमो के लिए है; यह सरकारी सत्यापित नहीं है।",
    ),
    t(
      "Locking your ID restricts access to applications and sensitive services.",
      "आईडी लॉक करने से आवेदनों और संवेदनशील सेवाओं तक पहुंच सीमित हो जाती है।",
    ),
    t(
      "Scan the QR code to view the demo identifier; it cannot verify identity.",
      "डेमो पहचानकर्ता देखने के लिए क्यूआर कोड स्कैन करें; इससे पहचान सत्यापित नहीं होती।",
    ),
    t(
      "Keep your profile and land records updated for accurate information.",
      "सटीक जानकारी के लिए अपनी प्रोफाइल और भूमि अभिलेख अपडेट रखें।",
    ),
  ];

  return (
    <ProfileFeatureShell
      locale={locale}
      dictionary={dictionary}
      title={t("Digital Farmer ID Card", "डिजिटल किसान आईडी कार्ड")}
      subtitle={t(
        "A sample Bihar farmer ID for this demo, not a government-issued identity.",
        "इस डेमो के लिए नमूना बिहार किसान आईडी, सरकारी जारी पहचान नहीं।",
      )}
      aside={
        <>
          <HelpPanel title={t("Quick Actions", "त्वरित कार्रवाइयां")}>
            <div className={styles.profileSideActions}>
              <button type="button">
                <LockKeyhole size={18} aria-hidden="true" />
                {t("Lock ID", "आईडी लॉक करें")}
              </button>
              <a href={routes.profileVirtualId(locale)}>
                <Sparkles size={18} aria-hidden="true" />
                {t("Generate VID", "वीआईडी बनाएं")}
              </a>
              <button type="button">
                <Download size={18} aria-hidden="true" />
                {t("Download ID", "आईडी डाउनलोड करें")}
              </button>
            </div>
          </HelpPanel>
          <HelpPanel title={t("About Digital ID", "डिजिटल आईडी के बारे में")}>
            <ul className={styles.profileCheckList}>
              {aboutItems.map((item) => (
                <li key={item}>
                  <Check size={16} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </HelpPanel>
        </>
      }
    >
      <div className={styles.profileStatusLine}>
        <span className={styles.profileStatusSuccess}>
          <BadgeCheck size={17} aria-hidden="true" />
          {t("Demo ID", "डेमो आईडी")}
        </span>
        <span>
          {t(
            "Sample record: 21 May 2024, 11:20 AM",
            "नमूना रिकॉर्ड: 21 मई 2024, सुबह 11:20 बजे",
          )}
        </span>
      </div>

      <section className={styles.digitalIdCard}>
        <div className={styles.digitalIdBrand}>
          <IdCard size={28} aria-hidden="true" />
          <div>
            <strong>{t("BIHAR FARMER DEMO", "बिहार किसान डेमो")}</strong>
            <span>{t("DIGITAL FARMER ID", "डिजिटल किसान आईडी")}</span>
          </div>
          <ShieldCheck size={28} aria-hidden="true" />
        </div>

        <div className={styles.digitalIdIdentity}>
          <Image
            src={withBasePath("/images/farmer-avatar-bihar.svg")}
            alt={t("Illustrative farmer avatar", "किसान का सांकेतिक चित्र")}
            width={112}
            height={112}
          />
          <div>
            <h2>RAMESH KUMAR</h2>
            <span>{t("Farmer / Kisan ID", "किसान आईडी")}</span>
            <strong>BR23F12345678</strong>
            <span>{t("Aadhaar (masked demo)", "आधार (छिपाया गया डेमो)")}</span>
            <strong>XXXX XXXX 9012</strong>
          </div>
          <QrVisual
            label={t("Scan demo ID", "डेमो आईडी स्कैन करें")}
            value="https://bihar-farmer-demo.invalid/verify/farmer/BR23F12345678"
          />
        </div>

        <div className={styles.digitalIdAddress}>
          <strong>{t("Address", "पता")}</strong>
          <span>
            {t("Village Amhara, Block Bihta", "गांव अमहरा, प्रखंड बिहटा")}
          </span>
          <span>
            {t("District Patna, Bihar - 801103", "जिला पटना, बिहार - 801103")}
          </span>
        </div>

        <DefinitionGrid
          items={[
            [
              t("Total Land (Demo)", "कुल भूमि (डेमो)"),
              t("3.62 Ha (8 Khesra)", "3.62 हे. (8 खेसरा)"),
            ],
            [
              t("Linked Parcels", "लिंक किए गए भूखंड"),
              t("8 Khesra", "8 खेसरा"),
            ],
            [
              t("Irrigation Source", "सिंचाई स्रोत"),
              t("Tube Well", "ट्यूबवेल"),
            ],
            [
              t("Main Crops", "मुख्य फसलें"),
              t("Rice, Wheat, Maize", "धान, गेहूं, मक्का"),
            ],
            [
              t("Identity Status", "पहचान की स्थिति"),
              <span className={styles.profileStatusSuccess} key="verified">
                {t("Demo Profile", "डेमो प्रोफाइल")}
              </span>,
            ],
          ]}
        />
        <p className={styles.digitalIdFooter}>
          <ShieldCheck size={17} aria-hidden="true" />
          {t(
            "This sample ID is not proof of identity or land ownership.",
            "यह नमूना आईडी पहचान या भूमि स्वामित्व का प्रमाण नहीं है।",
          )}
          <span>{t("Demo date: 12 May 2024", "डेमो तिथि: 12 मई 2024")}</span>
        </p>
      </section>

      <FeaturePanel title={t("Land Summary", "भूमि सारांश")}>
        <a className={styles.profilePanelLink} href={routes.profile(locale)}>
          {t("View All Land Details", "भूमि का पूरा विवरण देखें")}
        </a>
        <DefinitionGrid
          items={[
            [
              t("Total Area (Demo)", "कुल क्षेत्र (डेमो)"),
              t("3.62 Ha", "3.62 हे."),
            ],
            [t("Total Khesra", "कुल खेसरा"), "8"],
            [t("Irrigated Area", "सिंचित क्षेत्र"), t("3.10 Ha", "3.10 हे.")],
            [
              t("Rainfed Area", "वर्षा सिंचित क्षेत्र"),
              t("0.52 Ha", "0.52 हे."),
            ],
          ]}
        />
      </FeaturePanel>

      <div className={styles.profileInfoStrip}>
        <Info size={20} aria-hidden="true" />
        {t(
          "This demo ID is not digitally signed or verified by a government department. The QR code contains only a sample identifier.",
          "यह डेमो आईडी डिजिटल हस्ताक्षरित या किसी सरकारी विभाग द्वारा सत्यापित नहीं है। क्यूआर कोड में केवल एक नमूना पहचानकर्ता है।",
        )}
      </div>
      <div className={styles.profileWarningStrip}>
        <LockKeyhole size={20} aria-hidden="true" />
        {t(
          "If your ID is locked, you will not be able to apply for new schemes or access certain services. You can unlock it anytime from here.",
          "यदि आपकी आईडी लॉक है, तो आप नई योजनाओं के लिए आवेदन या कुछ सेवाओं का उपयोग नहीं कर पाएंगे। आप इसे यहां से कभी भी अनलॉक कर सकते हैं।",
        )}
      </div>

      <div className={styles.profileActionRow}>
        <button className={`${styles.button} ${styles.buttonSecondary}`}>
          <LockKeyhole size={18} aria-hidden="true" />
          {t("Lock ID", "आईडी लॉक करें")}
        </button>
        <a className={styles.button} href={routes.profileVirtualId(locale)}>
          <Sparkles size={18} aria-hidden="true" />
          {t("Generate VID", "वीआईडी बनाएं")}
        </a>
        <button className={`${styles.button} ${styles.buttonSecondary}`}>
          <Download size={18} aria-hidden="true" />
          {t("Download ID", "आईडी डाउनलोड करें")}
        </button>
        <button className={`${styles.button} ${styles.buttonSecondary}`}>
          <Share2 size={18} aria-hidden="true" />
          {t("Share demo QR", "डेमो क्यूआर साझा करें")}
        </button>
      </div>
    </ProfileFeatureShell>
  );
}

export function VirtualIdPage({
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
      title={t(
        "Purpose-bound Virtual ID (VID)",
        "उद्देश्य-आधारित वर्चुअल आईडी (वीआईडी)",
      )}
      subtitle={t(
        "Generate a limited-purpose temporary identity to share only what is required.",
        "केवल आवश्यक जानकारी साझा करने के लिए सीमित-उद्देश्य वाली अस्थायी पहचान बनाएं।",
      )}
      backHref={routes.profileDigitalId(locale)}
      aside={
        <>
          <HelpPanel
            title={t(
              "About Virtual ID (VID)",
              "वर्चुअल आईडी (वीआईडी) के बारे में",
            )}
          >
            <p>
              {t(
                "A Virtual ID is a temporary, revocable identity created for a specific purpose and duration.",
                "वर्चुअल आईडी किसी विशेष उद्देश्य और अवधि के लिए बनाई गई अस्थायी, रद्द की जा सकने वाली पहचान है।",
              )}
            </p>
            <ul className={styles.profileCheckList}>
              <li>
                <Check size={16} aria-hidden="true" />
                <span>
                  <strong>{t("Purpose-bound", "उद्देश्य-आधारित")}</strong>
                  {t(
                    "Use again and again as per your need.",
                    "अपनी आवश्यकता के अनुसार बार-बार उपयोग करें।",
                  )}
                </span>
              </li>
              <li>
                <CalendarDays size={16} aria-hidden="true" />
                <span>
                  <strong>{t("Time-limited", "समय-सीमित")}</strong>
                  {t(
                    "Automatically expires after the validity period.",
                    "वैधता अवधि के बाद स्वतः समाप्त हो जाती है।",
                  )}
                </span>
              </li>
              <li>
                <ShieldCheck size={16} aria-hidden="true" />
                <span>
                  <strong>{t("Secure & Private", "सुरक्षित और निजी")}</strong>
                  {t(
                    "Your underlying identifiers are never exposed.",
                    "आपके मूल पहचानकर्ता कभी उजागर नहीं होते।",
                  )}
                </span>
              </li>
            </ul>
          </HelpPanel>
          <HelpPanel title={t("Important Notes", "महत्वपूर्ण बातें")}>
            <ul>
              <li>
                {t(
                  "Use the VID only for the selected purpose.",
                  "वीआईडी का उपयोग केवल चुने गए उद्देश्य के लिए करें।",
                )}
              </li>
              <li>
                {t(
                  "You can revoke it from the Manage VID section.",
                  "आप इसे वीआईडी प्रबंधन अनुभाग से रद्द कर सकते हैं।",
                )}
              </li>
              <li>
                {t(
                  "Expired VIDs cannot be used.",
                  "समाप्त वीआईडी का उपयोग नहीं किया जा सकता।",
                )}
              </li>
            </ul>
          </HelpPanel>
        </>
      }
    >
      <div className={styles.profileInfoStrip}>
        <ShieldCheck size={20} aria-hidden="true" />
        <span>
          <strong>
            {t(
              "VIDs are purpose-bound, time-limited and revocable.",
              "वीआईडी उद्देश्य-आधारित, समय-सीमित और रद्द की जा सकने वाली होती हैं।",
            )}
          </strong>
          {t(
            "This demo VID contains no real Aadhaar number or other primary identifier.",
            "इस डेमो वीआईडी में कोई वास्तविक आधार नंबर या अन्य प्राथमिक पहचानकर्ता नहीं है।",
          )}
        </span>
      </div>

      <FeaturePanel title={t("1. Select Purpose", "1. उद्देश्य चुनें")}>
        <label className={styles.profileField}>
          <span>
            {t("Purpose for generating VID", "वीआईडी बनाने का उद्देश्य")}
          </span>
          <select className={styles.select} defaultValue="scheme">
            <option value="scheme">
              {t("Agriculture Scheme Application", "कृषि योजना आवेदन")}
            </option>
            <option value="bank">
              {t(
                "Kisan Credit Card Verification",
                "किसान क्रेडिट कार्ड सत्यापन",
              )}
            </option>
            <option value="land">
              {t("Land Record Verification", "भूमि अभिलेख सत्यापन")}
            </option>
          </select>
          <small>
            {t(
              "Use: Apply for government scheme / subsidy",
              "उपयोग: सरकारी योजना / सब्सिडी के लिए आवेदन",
            )}
          </small>
        </label>
      </FeaturePanel>

      <FeaturePanel title={t("2. Generate VID", "2. वीआईडी बनाएं")}>
        <button className={styles.button} type="button">
          <Sparkles size={18} aria-hidden="true" />
          {t("Generate VID", "वीआईडी बनाएं")}
        </button>
        <span className={styles.profileSuccessMessage}>
          <Check size={17} aria-hidden="true" />
          {t(
            "VID generated successfully. 21 May 2024, 11:22 AM",
            "वीआईडी सफलतापूर्वक बन गई। 21 मई 2024, सुबह 11:22 बजे",
          )}
        </span>
      </FeaturePanel>

      <FeaturePanel
        title={t("3. Your Virtual ID Details", "3. आपकी वर्चुअल आईडी का विवरण")}
      >
        <div className={styles.virtualIdValue}>
          <span>
            {t("Your Virtual ID (VID)", "आपकी वर्चुअल आईडी (वीआईडी)")}
          </span>
          <strong>VID 1987 4321 5678 9012</strong>
          <button type="button" aria-label={t("Copy VID", "वीआईडी कॉपी करें")}>
            <Copy size={18} aria-hidden="true" />
          </button>
        </div>
        <p>
          {t(
            "This sample VID is for the demo only; it does not share a real Aadhaar number or other primary identifier.",
            "यह नमूना वीआईडी केवल डेमो के लिए है; इसमें वास्तविक आधार नंबर या अन्य प्राथमिक पहचानकर्ता साझा नहीं होते।",
          )}
        </p>
        <DefinitionGrid
          items={[
            [
              t("Validity", "वैधता"),
              t("21 May 2024 to 21 Jun 2024", "21 मई 2024 से 21 जून 2024"),
            ],
            [
              t("Validity Period", "वैधता अवधि"),
              t("30 Days (Upto 11:22 AM)", "30 दिन (सुबह 11:22 बजे तक)"),
            ],
            [
              t("Status", "स्थिति"),
              <span className={styles.profileStatusSuccess} key="active">
                {t("Active", "सक्रिय")}
              </span>,
            ],
          ]}
        />
        <div className={styles.profileActionRow}>
          <button className={styles.button}>
            <Copy size={18} aria-hidden="true" />
            {t("Copy VID", "वीआईडी कॉपी करें")}
          </button>
          <button className={`${styles.button} ${styles.buttonSecondary}`}>
            <Download size={18} aria-hidden="true" />
            {t("Download PDF", "पीडीएफ डाउनलोड करें")}
          </button>
          <button className={`${styles.button} ${styles.buttonSecondary}`}>
            <Share2 size={18} aria-hidden="true" />
            {t("Share VID", "वीआईडी साझा करें")}
          </button>
        </div>
      </FeaturePanel>

      <FeaturePanel title={t("How to use VID?", "वीआईडी का उपयोग कैसे करें?")}>
        <ol className={styles.profileNumberList}>
          <li>
            {t(
              "Share this VID with the concerned department or agency for the selected purpose only.",
              "इस वीआईडी को संबंधित विभाग या एजेंसी के साथ केवल चुने गए उद्देश्य के लिए साझा करें।",
            )}
          </li>
          <li>
            {t(
              "Use it only within the validity period shown above.",
              "इसका उपयोग केवल ऊपर दिखाई गई वैधता अवधि में करें।",
            )}
          </li>
          <li>
            {t(
              "Generate a new VID anytime for another purpose.",
              "किसी अन्य उद्देश्य के लिए कभी भी नई वीआईडी बनाएं।",
            )}
          </li>
        </ol>
      </FeaturePanel>

      <div className={styles.profileWarningStrip}>
        <Info size={20} aria-hidden="true" />
        {t(
          "For security, your VID is not stored on this device. Keep it safe and share responsibly.",
          "सुरक्षा के लिए आपकी वीआईडी इस डिवाइस पर संग्रहीत नहीं होती। इसे सुरक्षित रखें और जिम्मेदारी से साझा करें।",
        )}
      </div>
    </ProfileFeatureShell>
  );
}
