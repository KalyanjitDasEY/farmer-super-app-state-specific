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
      "This ID is verified using Jan Aadhaar and land records.",
      "यह आईडी जन आधार और भूमि अभिलेखों के माध्यम से सत्यापित है।",
    ),
    t(
      "Locking your ID restricts access to applications and sensitive services.",
      "आईडी लॉक करने से आवेदनों और संवेदनशील सेवाओं तक पहुंच सीमित हो जाती है।",
    ),
    t(
      "Share the QR code for quick and secure verification.",
      "त्वरित और सुरक्षित सत्यापन के लिए क्यूआर कोड साझा करें।",
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
        "Your verified digital identity as per Raj Kisan Suvidha.",
        "राज किसान सुविधा के अनुसार आपकी सत्यापित डिजिटल पहचान।",
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
          {t("Verified", "सत्यापित")}
        </span>
        <span>
          {t(
            "Last Verified: 21 May 2024, 11:20 AM",
            "अंतिम सत्यापन: 21 मई 2024, सुबह 11:20 बजे",
          )}
        </span>
      </div>

      <section className={styles.digitalIdCard}>
        <div className={styles.digitalIdBrand}>
          <IdCard size={28} aria-hidden="true" />
          <div>
            <strong>{t("RAJ KISAN SUVIDHA", "राज किसान सुविधा")}</strong>
            <span>{t("DIGITAL FARMER ID", "डिजिटल किसान आईडी")}</span>
          </div>
          <ShieldCheck size={28} aria-hidden="true" />
        </div>

        <div className={styles.digitalIdIdentity}>
          <Image
            src={withBasePath("/images/farmer-avatar-reference-v2.png")}
            alt={t("Ramesh Kumar", "Ramesh Kumar")}
            width={112}
            height={112}
          />
          <div>
            <h2>RAMESH KUMAR</h2>
            <span>{t("Farmer / Kisan ID", "किसान आईडी")}</span>
            <strong>RKJAI2405123456</strong>
            <span>{t("Jan Aadhaar No.", "जन आधार संख्या")}</span>
            <strong>XXXX XXXX 9012</strong>
          </div>
          <QrVisual
            label={t("Scan to Verify", "सत्यापन के लिए स्कैन करें")}
            value="https://rajkisan.rajasthan.gov.in/verify/farmer/RKJAI2405123456"
          />
        </div>

        <div className={styles.digitalIdAddress}>
          <strong>{t("Address", "पता")}</strong>
          <span>{t("Village Mor, Tehsil Chomu", "गांव मोर, तहसील चोमू")}</span>
          <span>
            {t(
              "District Jaipur, Rajasthan - 303702",
              "जिला जयपुर, राजस्थान - 303702",
            )}
          </span>
        </div>

        <DefinitionGrid
          items={[
            [
              t("Total Land (Verified)", "कुल भूमि (सत्यापित)"),
              t("3.62 Ha (8 Khasra)", "3.62 हे. (8 खसरा)"),
            ],
            [t("Linked Parcels", "लिंक किए गए भूखंड"), t("8 Khasra", "8 खसरा")],
            [
              t("Irrigation Source", "सिंचाई स्रोत"),
              t("Tube Well", "ट्यूबवेल"),
            ],
            [
              t("Main Crops", "मुख्य फसलें"),
              t("Wheat, Mustard, Bajra", "गेहूं, सरसों, बाजरा"),
            ],
            [
              t("Identity Status", "पहचान की स्थिति"),
              <span className={styles.profileStatusSuccess} key="verified">
                {t("Verified Full Access", "सत्यापित पूर्ण पहुंच")}
              </span>,
            ],
          ]}
        />
        <p className={styles.digitalIdFooter}>
          <ShieldCheck size={17} aria-hidden="true" />
          {t(
            "This digital ID is issued based on your verified identity and land records.",
            "यह डिजिटल आईडी आपकी सत्यापित पहचान और भूमि अभिलेखों के आधार पर जारी की गई है।",
          )}
          <span>{t("Issued On: 12 May 2024", "जारी: 12 मई 2024")}</span>
        </p>
      </section>

      <FeaturePanel title={t("Land Summary", "भूमि सारांश")}>
        <a className={styles.profilePanelLink} href={routes.profile(locale)}>
          {t("View All Land Details", "भूमि का पूरा विवरण देखें")}
        </a>
        <DefinitionGrid
          items={[
            [
              t("Total Area (Verified)", "कुल क्षेत्र (सत्यापित)"),
              t("3.62 Ha", "3.62 हे."),
            ],
            [t("Total Khasra", "कुल खसरा"), "8"],
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
          "Your digital identity is digitally signed and can be verified by government departments. For any discrepancy, please contact the nearest agriculture office.",
          "आपकी डिजिटल पहचान डिजिटल रूप से हस्ताक्षरित है और सरकारी विभागों द्वारा सत्यापित की जा सकती है। किसी भी विसंगति के लिए निकटतम कृषि कार्यालय से संपर्क करें।",
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
          {t("Share / Verify QR", "क्यूआर साझा / सत्यापित करें")}
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
            "They do not expose your Jan Aadhaar number or another primary identifier.",
            "वे आपका जन आधार नंबर या कोई अन्य प्राथमिक पहचानकर्ता उजागर नहीं करतीं।",
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
            "This is a temporary identity. Your real Jan Aadhaar number or other primary identifiers are not shared.",
            "यह एक अस्थायी पहचान है। आपका वास्तविक जन आधार नंबर या अन्य प्राथमिक पहचानकर्ता साझा नहीं किए जाते।",
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
