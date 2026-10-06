import {
  BadgeCheck,
  Check,
  Download,
  FileBadge2,
  FileJson,
  KeyRound,
  LockKeyhole,
  MoreVertical,
  Share2,
  ShieldCheck,
  WalletCards,
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

const credentials = [
  {
    title: "Farmer Profile VC",
    titleHi: "किसान प्रोफाइल वीसी",
    issuer: "Bihar Farmer Demo",
    issuerHi: "बिहार किसान डेमो",
    id: "FPVC-2024-00012345",
    issued: "12 May 2024",
    issuedHi: "12 मई 2024",
    valid: "12 May 2027",
    validHi: "12 मई 2027",
  },
  {
    title: "Land Parcel VC",
    titleHi: "भूमि भूखंड वीसी",
    issuer: "Bihar Farmer Demo",
    issuerHi: "बिहार किसान डेमो",
    id: "LPVC-2024-00012345",
    issued: "10 May 2024",
    issuedHi: "10 मई 2024",
    valid: "10 May 2027",
    validHi: "10 मई 2027",
  },
  {
    title: "Crop Record VC",
    titleHi: "फसल रिकॉर्ड वीसी",
    issuer: "Bihar Farmer Demo",
    issuerHi: "बिहार किसान डेमो",
    id: "CGVC-2024-00054321",
    issued: "08 May 2024",
    issuedHi: "08 मई 2024",
    valid: "08 May 2025",
    validHi: "08 मई 2025",
  },
  {
    title: "Soil Health VC",
    titleHi: "मृदा स्वास्थ्य वीसी",
    issuer: "Bihar Farmer Demo",
    issuerHi: "बिहार किसान डेमो",
    id: "SHVC-2024-00098765",
    issued: "03 May 2024",
    issuedHi: "03 मई 2024",
    valid: "03 May 2026",
    validHi: "03 मई 2026",
  },
];

export function CredentialWalletPage({
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
        "Verifiable Credential Wallet",
        "सत्यापन योग्य क्रेडेंशियल वॉलेट",
      )}
      subtitle={t(
        "Sample Bihar credentials for demonstration; not official or digitally signed.",
        "प्रदर्शन के लिए नमूना बिहार क्रेडेंशियल; ये आधिकारिक या डिजिटल हस्ताक्षरित नहीं हैं।",
      )}
      aside={
        <>
          <HelpPanel title={t("Wallet Overview", "वॉलेट का अवलोकन")}>
            <div className={styles.walletTotal}>
              <WalletCards size={30} aria-hidden="true" />
              <strong>4</strong>
              <span>{t("Total Credentials", "कुल क्रेडेंशियल")}</span>
            </div>
            <DefinitionGrid
              items={[
                [t("Demo", "डेमो"), "4"],
                [t("Expired", "समाप्त"), "0"],
                [t("Invalid", "अमान्य"), "0"],
                [t("Unavailable", "अनुपलब्ध"), "0"],
              ]}
            />
          </HelpPanel>
          <HelpPanel title={t("Demo Wallet", "डेमो वॉलेट")}>
            <ul className={styles.profileCheckList}>
              {[
                t(
                  "Sample records, not signed credentials",
                  "नमूना रिकॉर्ड, हस्ताक्षरित क्रेडेंशियल नहीं",
                ),
                t("Not for official use", "आधिकारिक उपयोग के लिए नहीं"),
                t(
                  "Preview what the demo would share",
                  "डेमो में साझा होने वाली जानकारी देखें",
                ),
                t("Dates are illustrative", "तिथियां उदाहरण मात्र हैं"),
              ].map((item) => (
                <li key={item}>
                  <Check size={16} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </HelpPanel>
          <HelpPanel title={t("Quick Actions", "त्वरित कार्रवाइयां")}>
            <div className={styles.profileSideActions}>
              <button type="button">
                <Download size={18} aria-hidden="true" />
                {t("Export Offline Wallet", "ऑफलाइन वॉलेट निर्यात करें")}
              </button>
              <button type="button">
                <Share2 size={18} aria-hidden="true" />
                {t("Share Credential", "क्रेडेंशियल साझा करें")}
              </button>
            </div>
          </HelpPanel>
        </>
      }
    >
      <div className={styles.profileInfoStrip}>
        <ShieldCheck size={20} aria-hidden="true" />
        {t(
          "These are sample credentials for a demo. No government agency has issued or verified them.",
          "ये डेमो के नमूना क्रेडेंशियल हैं। किसी सरकारी एजेंसी ने इन्हें जारी या सत्यापित नहीं किया है।",
        )}
      </div>

      <FeaturePanel title={t("My Credentials", "मेरे क्रेडेंशियल")}>
        <div className={styles.profileToolbar}>
          <div className={styles.profileTabs}>
            <button className={styles.profileTabActive}>
              {t("All (4)", "सभी (4)")}
            </button>
            <button>{t("Demo (4)", "डेमो (4)")}</button>
            <button>{t("Expired (0)", "समाप्त (0)")}</button>
            <button>{t("Invalid (0)", "अमान्य (0)")}</button>
            <button>{t("Unavailable (0)", "अनुपलब्ध (0)")}</button>
          </div>
          <select className={styles.select} defaultValue="latest">
            <option value="latest">
              {t("Sort by: Latest First", "क्रम: नवीनतम पहले")}
            </option>
            <option value="oldest">
              {t("Sort by: Oldest First", "क्रम: सबसे पुराना पहले")}
            </option>
          </select>
        </div>

        <div className={styles.credentialGrid}>
          {credentials.map((credential, index) => (
            <article className={styles.credentialCard} key={credential.id}>
              <div className={styles.credentialCardHeader}>
                <span>
                  <FileBadge2 size={25} aria-hidden="true" />
                </span>
                <div>
                  <h3>{t(credential.title, credential.titleHi)}</h3>
                  <p>
                    {t("Demo source", "डेमो स्रोत")}{" "}
                    {t(credential.issuer, credential.issuerHi)}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={t("Credential options", "क्रेडेंशियल विकल्प")}
                >
                  <MoreVertical size={20} aria-hidden="true" />
                </button>
              </div>
              <DefinitionGrid
                items={[
                  [t("Credential ID", "क्रेडेंशियल आईडी"), credential.id],
                  [
                    t("Issued On", "जारी करने की तिथि"),
                    t(credential.issued, credential.issuedHi),
                  ],
                  [
                    t("Valid Upto", "तक वैध"),
                    t(credential.valid, credential.validHi),
                  ],
                ]}
              />
              <div className={styles.credentialCardFooter}>
                <span className={styles.profileStatusSuccess}>
                  <BadgeCheck size={16} aria-hidden="true" />
                  {t("Demo", "डेमो")}
                </span>
                <a
                  className={styles.button}
                  href={
                    index === 0
                      ? routes.profileCredential(locale)
                      : routes.profileCredential(locale)
                  }
                >
                  {t("Open Credential", "क्रेडेंशियल खोलें")}
                </a>
              </div>
            </article>
          ))}
        </div>
      </FeaturePanel>

      <div className={styles.profileWarningStrip}>
        <LockKeyhole size={20} aria-hidden="true" />
        <span>
          <strong>{t("Important Notes", "महत्वपूर्ण बातें")}</strong>
          {t(
            "Sample credentials do not provide proof of identity. Do not use them for official applications.",
            "नमूना क्रेडेंशियल पहचान का प्रमाण नहीं हैं। आधिकारिक आवेदनों में इनका उपयोग न करें।",
          )}
        </span>
      </div>
    </ProfileFeatureShell>
  );
}

export function CredentialProofPage({
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
      title={t("Credential Proof / JWT", "क्रेडेंशियल प्रमाण / जेडब्ल्यूटी")}
      subtitle={t(
        "Preview the sample proof fields; no real signature or government verification is provided.",
        "नमूना प्रमाण फील्ड देखें; कोई वास्तविक हस्ताक्षर या सरकारी सत्यापन उपलब्ध नहीं है।",
      )}
      backHref={routes.profileWallet(locale)}
    >
      <section className={styles.credentialProofHero}>
        <span>
          <FileBadge2 size={34} aria-hidden="true" />
        </span>
        <div>
          <h2>{t("Farmer Profile VC", "किसान प्रोफाइल वीसी")}</h2>
          <p>
            {t(
              "Credential ID FPVC-2024-00012345",
              "क्रेडेंशियल आईडी FPVC-2024-00012345",
            )}
          </p>
          <p>
            {t("Sample from Bihar Farmer Demo", "बिहार किसान डेमो का नमूना")}
          </p>
        </div>
        <DefinitionGrid
          items={[
            [
              t("Issued On", "जारी करने की तिथि"),
              t("12 May 2024", "12 मई 2024"),
            ],
            [
              t("Status", "स्थिति"),
              <span className={styles.profileStatusSuccess} key="valid">
                {t("Demo", "डेमो")}
              </span>,
            ],
            [t("Valid Upto", "तक वैध"), t("12 May 2027", "12 मई 2027")],
          ]}
        />
      </section>

      <FeaturePanel title={t("Credential Overview", "क्रेडेंशियल का अवलोकन")}>
        <DefinitionGrid
          items={[
            [
              t("Credential Type", "क्रेडेंशियल प्रकार"),
              t("Farmer Profile", "किसान प्रोफाइल"),
            ],
            [
              t("Purpose", "उद्देश्य"),
              t(
                "Sample identity and land information for agriculture services",
                "कृषि सेवाओं के लिए नमूना पहचान और भूमि जानकारी",
              ),
            ],
            [t("Subject", "विषय"), "RAMESH KUMAR"],
            [
              t("Covered Attributes", "शामिल विशेषताएं"),
              t(
                "Identity, Land Summary, Contact",
                "पहचान, भूमि सारांश, संपर्क",
              ),
            ],
            [t("Format", "प्रारूप"), "W3C Verifiable Credential (JWT) v2.0"],
            [
              t("Issuer DID", "जारीकर्ता डीआईडी"),
              "did:example:bihar-farmer-demo",
            ],
            [
              t("Credential Schema", "क्रेडेंशियल स्कीमा"),
              "https://bihar-farmer-demo.invalid/schemas/farmer-profile-v1.0.json",
            ],
          ]}
        />
      </FeaturePanel>

      <FeaturePanel title={t("Cryptographic Proof", "क्रिप्टोग्राफिक प्रमाण")}>
        <DefinitionGrid
          items={[
            [t("Proof Type", "प्रमाण प्रकार"), "Ed25519Signature2020"],
            [
              t("Verification Method", "सत्यापन विधि"),
              "did:example:bihar-farmer-demo#key-1",
            ],
            [
              t("Signature Status", "हस्ताक्षर स्थिति"),
              <span className={styles.profileStatusSuccess} key="signature">
                {t("Sample only — not verified", "केवल नमूना — सत्यापित नहीं")}
              </span>,
            ],
            [
              t("Signed At", "हस्ताक्षरित समय"),
              t(
                "12 May 2024, 11:20 AM IST",
                "12 मई 2024, सुबह 11:20 बजे आईएसटी",
              ),
            ],
            [
              t("Expires At", "समाप्ति समय"),
              t(
                "12 May 2027, 11:20 AM IST",
                "12 मई 2027, सुबह 11:20 बजे आईएसटी",
              ),
            ],
          ]}
        />
        <div className={styles.profileCodeBlock}>
          <div>
            <KeyRound size={18} aria-hidden="true" />
            <strong>
              {t(
                "Proof Value (JWS Compact)",
                "प्रमाण मान (जेडब्ल्यूएस कॉम्पैक्ट)",
              )}
            </strong>
          </div>
          <code>
            eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkaWQ6cmFqOmFncmk6ZGVwdDpyYWo6MTIzNDUiLCJzdWIiOiJSS0pBSTI0MDUxMjM0NTYifQ.gH8n5YtQKp4mL2sV7xA9Wc
          </code>
        </div>
      </FeaturePanel>

      <FeaturePanel
        title={t(
          "Credential Claims (Preview)",
          "क्रेडेंशियल दावे (पूर्वावलोकन)",
        )}
      >
        <pre className={styles.profileJsonPreview}>{`{
  "name": "RAMESH KUMAR",
  "aadhaarMaskedDemo": "XXXX XXXX 9012",
  "farmerId": "BR23F12345678",
  "totalLandAreaHa": 3.62,
  "totalKhesra": 8,
  "district": "Patna",
  "state": "Bihar",
  "issuedOn": "2024-05-12T05:50:00Z",
  "validUpto": "2027-05-12T05:50:00Z"
}`}</pre>
      </FeaturePanel>

      <FeaturePanel title={t("Verification Summary", "सत्यापन सारांश")}>
        <div className={styles.profileVerifiedSummary}>
          <BadgeCheck size={34} aria-hidden="true" />
          <div>
            <strong>
              {t(
                "This is a demo preview, not a cryptographically verified credential.",
                "यह डेमो पूर्वावलोकन है, क्रिप्टोग्राफिक रूप से सत्यापित क्रेडेंशियल नहीं।",
              )}
            </strong>
            <p>
              {t(
                "Sample date: 21 May 2024, 11:22 AM",
                "नमूना तिथि: 21 मई 2024, सुबह 11:22 बजे",
              )}
            </p>
            <p>
              {t(
                "Displayed by Bihar Farmer Demo",
                "बिहार किसान डेमो में प्रदर्शित",
              )}
            </p>
          </div>
        </div>
      </FeaturePanel>

      <div className={styles.profileInfoStrip}>
        <ShieldCheck size={20} aria-hidden="true" />
        {t(
          "The signature fields above are placeholders. No authority has signed or verified this sample credential.",
          "ऊपर के हस्ताक्षर फील्ड केवल नमूने हैं। किसी प्राधिकरण ने इस नमूना क्रेडेंशियल पर हस्ताक्षर या सत्यापन नहीं किया है।",
        )}
      </div>

      <div className={styles.profileActionRow}>
        <a
          className={`${styles.button} ${styles.buttonSecondary}`}
          href={routes.profileWallet(locale)}
        >
          {t("Close", "बंद करें")}
        </a>
        <button className={styles.button}>
          <FileJson size={18} aria-hidden="true" />
          {t("Export Credential (JSON)", "क्रेडेंशियल निर्यात करें (जेएसओएन)")}
        </button>
        <button className={`${styles.button} ${styles.buttonSecondary}`}>
          <Download size={18} aria-hidden="true" />
          {t("Export Offline Wallet", "ऑफलाइन वॉलेट निर्यात करें")}
        </button>
      </div>
    </ProfileFeatureShell>
  );
}
