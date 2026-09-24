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
    issuer: "Agriculture Department, Rajasthan",
    issuerHi: "कृषि विभाग, राजस्थान",
    id: "FPVC-2024-00012345",
    issued: "12 May 2024",
    issuedHi: "12 मई 2024",
    valid: "12 May 2027",
    validHi: "12 मई 2027",
  },
  {
    title: "Land Parcel VC",
    titleHi: "भूमि भूखंड वीसी",
    issuer: "Revenue Department, Rajasthan",
    issuerHi: "राजस्व विभाग, राजस्थान",
    id: "LPVC-2024-00012345",
    issued: "10 May 2024",
    issuedHi: "10 मई 2024",
    valid: "10 May 2027",
    validHi: "10 मई 2027",
  },
  {
    title: "Crop / Girdawari VC",
    titleHi: "फसल / गिरदावरी वीसी",
    issuer: "Agriculture Department, Rajasthan",
    issuerHi: "कृषि विभाग, राजस्थान",
    id: "CGVC-2024-00054321",
    issued: "08 May 2024",
    issuedHi: "08 मई 2024",
    valid: "08 May 2025",
    validHi: "08 मई 2025",
  },
  {
    title: "Soil Health VC",
    titleHi: "मृदा स्वास्थ्य वीसी",
    issuer: "Soil Health Card Scheme, Rajasthan",
    issuerHi: "मृदा स्वास्थ्य कार्ड योजना, राजस्थान",
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
        "Your verified and signed credentials issued by trusted authorities.",
        "विश्वसनीय प्राधिकरणों द्वारा जारी आपके सत्यापित और हस्ताक्षरित क्रेडेंशियल।",
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
                [t("Valid", "वैध"), "4"],
                [t("Expired", "समाप्त"), "0"],
                [t("Invalid", "अमान्य"), "0"],
                [t("Unavailable", "अनुपलब्ध"), "0"],
              ]}
            />
          </HelpPanel>
          <HelpPanel title={t("Security & Trust", "सुरक्षा और भरोसा")}>
            <ul className={styles.profileCheckList}>
              {[
                t(
                  "Digitally signed by issuer",
                  "जारीकर्ता द्वारा डिजिटल रूप से हस्ताक्षरित",
                ),
                t("Tamper-proof & immutable", "छेड़छाड़-रोधी और अपरिवर्तनीय"),
                t(
                  "You control what to share",
                  "क्या साझा करना है, इसका नियंत्रण आपके पास",
                ),
                t("Time-bound & revocable", "समयबद्ध और रद्द करने योग्य"),
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
          "These credentials are digitally signed, tamper-proof and can be shared securely with your consent.",
          "ये क्रेडेंशियल डिजिटल रूप से हस्ताक्षरित, छेड़छाड़-रोधी हैं और आपकी सहमति से सुरक्षित रूप से साझा किए जा सकते हैं।",
        )}
      </div>

      <FeaturePanel title={t("My Credentials", "मेरे क्रेडेंशियल")}>
        <div className={styles.profileToolbar}>
          <div className={styles.profileTabs}>
            <button className={styles.profileTabActive}>
              {t("All (4)", "सभी (4)")}
            </button>
            <button>{t("Valid (4)", "वैध (4)")}</button>
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
                    {t("Issued by", "जारीकर्ता")}{" "}
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
                  {t("Valid", "वैध")}
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
            "Credentials cannot be altered after issue. Always share them only with trusted departments or agencies.",
            "जारी होने के बाद क्रेडेंशियल बदले नहीं जा सकते। इन्हें हमेशा केवल विश्वसनीय विभागों या एजेंसियों के साथ साझा करें।",
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
        "View cryptographic proof and verification details of this credential.",
        "इस क्रेडेंशियल का क्रिप्टोग्राफिक प्रमाण और सत्यापन विवरण देखें।",
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
            {t(
              "Issued by Agriculture Department, Rajasthan",
              "कृषि विभाग, राजस्थान द्वारा जारी",
            )}
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
                {t("Valid", "वैध")}
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
                "Identity and land based verification for agriculture services",
                "कृषि सेवाओं के लिए पहचान और भूमि-आधारित सत्यापन",
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
              "did:raj:agri:dept:raj:12345",
            ],
            [
              t("Credential Schema", "क्रेडेंशियल स्कीमा"),
              "https://rajkisan.rajasthan.gov.in/schemas/farmer-profile-v1.0.json",
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
              "did:raj:agri:dept:raj:12345#key-1",
            ],
            [
              t("Signature Status", "हस्ताक्षर स्थिति"),
              <span className={styles.profileStatusSuccess} key="signature">
                {t("Signature Verified", "हस्ताक्षर सत्यापित")}
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
  "janAadhaarMasked": "XXXX XXXX 9012",
  "farmerId": "RKJAI2405123456",
  "totalLandAreaHa": 3.62,
  "totalKhasra": 8,
  "district": "Jaipur",
  "state": "Rajasthan",
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
                "This credential is cryptographically valid and has not been revoked.",
                "यह क्रेडेंशियल क्रिप्टोग्राफिक रूप से वैध है और रद्द नहीं किया गया है।",
              )}
            </strong>
            <p>
              {t(
                "Verified On 21 May 2024, 11:22 AM",
                "सत्यापन: 21 मई 2024, सुबह 11:22 बजे",
              )}
            </p>
            <p>
              {t(
                "Verified By Raj Kisan Suvidha System",
                "राज किसान सुविधा प्रणाली द्वारा सत्यापित",
              )}
            </p>
          </div>
        </div>
      </FeaturePanel>

      <div className={styles.profileInfoStrip}>
        <ShieldCheck size={20} aria-hidden="true" />
        {t(
          "This credential is digitally signed by the issuing authority. Any tampering with the data will invalidate the signature.",
          "यह क्रेडेंशियल जारीकर्ता प्राधिकरण द्वारा डिजिटल रूप से हस्ताक्षरित है। डेटा में किसी भी छेड़छाड़ से हस्ताक्षर अमान्य हो जाएगा।",
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
