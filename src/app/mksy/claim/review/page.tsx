import type { Metadata } from "next";
import { Check, ClipboardCheck, FileCheck2, ShieldCheck } from "lucide-react";

import { ReviewDeclaration } from "@/features/mksy/components/mksy-forms";
import {
  ClaimLayout,
  FormSection,
} from "@/features/mksy/components/mksy-components";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";
import styles from "@/features/mksy/components/mksy.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t(
      "MKSY Claim - Review and Submit",
      "MKSY दावा - समीक्षा और जमा करें",
    ),
  };
}

const summaryRows = [
  [localized("Scheme", "योजना"), "MKSY"],
  [
    localized("Claim Type", "दावे का प्रकार"),
    localized("Accidental Death", "दुर्घटना में मृत्यु"),
  ],
  [
    localized("Applicant", "आवेदक"),
    localized("RAMESH KUMAR (Self)", "RAMESH KUMAR (स्वयं)"),
  ],
  [localized("Jan Aadhaar No.", "जन आधार संख्या"), "XXXX XXXX 9012"],
  [
    localized("Date of Incident", "घटना की तिथि"),
    localized("12 May 2024, 03:15 PM", "12 मई 2024, 03:15 अपराह्न"),
  ],
  [localized("Total Assistance Amount", "कुल सहायता राशि"), "₹5,00,000"],
  [
    localized("Application Window", "आवेदन अवधि"),
    localized("Open All Year Round", "पूरे वर्ष खुला"),
  ],
] as const;

const verifiedDocuments = [
  [
    localized("FIR / Police Report", "FIR / पुलिस रिपोर्ट"),
    localized("Police Department", "पुलिस विभाग"),
  ],
  [
    localized(
      "Medical Report / Disability Certificate",
      "चिकित्सा रिपोर्ट / दिव्यांगता प्रमाण पत्र",
    ),
    localized("SMS Hospital, Jaipur", "SMS अस्पताल, जयपुर"),
  ],
  [
    localized("Jamabandi / Girdawari", "जमाबंदी / गिरदावरी"),
    localized("Revenue Department", "राजस्व विभाग"),
  ],
  [
    localized("Source Verification", "स्रोत सत्यापन"),
    localized("Field Verification Officer", "क्षेत्र सत्यापन अधिकारी"),
  ],
] as const;

export default async function MksyReviewPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <ClaimLayout
      current={4}
      title={t("Review, Submit and Receipt", "समीक्षा, जमा करना और रसीद")}
      description={t(
        "Review your claim details. Submit to generate a claim reference.",
        "अपने दावे के विवरण की समीक्षा करें। दावा संदर्भ बनाने के लिए जमा करें।",
      )}
      notice={t(
        "Please review all details carefully before final submission. Once submitted, changes cannot be made.",
        "अंतिम रूप से जमा करने से पहले सभी विवरण ध्यान से जांचें। जमा होने के बाद बदलाव नहीं किए जा सकते।",
      )}
    >
      <FormSection title={t("A. Claim Summary", "A. दावा सारांश")}>
        <div className={styles.documentTable}>
          {summaryRows.map(([label, value]) => (
            <div key={typeof label === "string" ? label : label.en}>
              <strong>{t(label)}</strong>
              <span>{t(value)}</span>
              <span />
              <span />
              <span />
            </div>
          ))}
        </div>
      </FormSection>

      <FormSection
        title={t("B. Incident Snapshot", "B. घटना की संक्षिप्त जानकारी")}
      >
        <div className={styles.factGrid}>
          <article>
            <span>
              <ClipboardCheck size={22} />
            </span>
            <div>
              <small>{t("Accident Type", "दुर्घटना का प्रकार")}</small>
              <strong>{t("Road Accident", "सड़क दुर्घटना")}</strong>
            </div>
          </article>
          <article>
            <span>
              <ShieldCheck size={22} />
            </span>
            <div>
              <small>{t("Location", "स्थान")}</small>
              <strong>{t("Village Mor, Chomu", "गांव मोर, चोमू")}</strong>
            </div>
          </article>
          <article>
            <span>
              <Check size={22} />
            </span>
            <div>
              <small>{t("Police Station", "पुलिस थाना")}</small>
              <strong>{t("Chomu Police Station", "चोमू पुलिस थाना")}</strong>
            </div>
          </article>
          <article>
            <span>
              <FileCheck2 size={22} />
            </span>
            <div>
              <small>{t("Hospital", "अस्पताल")}</small>
              <strong>{t("SMS Hospital, Jaipur", "SMS अस्पताल, जयपुर")}</strong>
            </div>
          </article>
        </div>
      </FormSection>

      <FormSection title={t("C. Documents Summary", "C. दस्तावेज़ सारांश")}>
        <div className={styles.documentTable}>
          <div className={styles.documentHead}>
            <span>{t("Document", "दस्तावेज़")}</span>
            <span>{t("Status", "स्थिति")}</span>
            <span>{t("Verified By", "सत्यापनकर्ता")}</span>
            <span />
            <span />
          </div>
          {verifiedDocuments.map(([document, office]) => (
            <div key={document.en}>
              <strong>{t(document)}</strong>
              <em>
                <Check size={15} /> {t("Verified", "सत्यापित")}
              </em>
              <span>{t(office)}</span>
              <span />
              <span />
            </div>
          ))}
        </div>
      </FormSection>

      <FormSection
        title={t(
          "D. e-KYC Verification (Jan Aadhaar)",
          "D. ई-केवाईसी सत्यापन (जन आधार)",
        )}
      >
        <div className={styles.factGrid}>
          <article>
            <div>
              <small>{t("Jan Aadhaar No.", "जन आधार संख्या")}</small>
              <strong>XXXX XXXX 9012</strong>
            </div>
          </article>
          <article>
            <div>
              <small>{t("e-KYC Mode", "ई-केवाईसी माध्यम")}</small>
              <strong>OTP</strong>
            </div>
          </article>
          <article>
            <div>
              <small>{t("e-KYC Status", "ई-केवाईसी स्थिति")}</small>
              <strong>{t("Verified", "सत्यापित")}</strong>
            </div>
          </article>
          <article>
            <div>
              <small>{t("Verified On", "सत्यापन का समय")}</small>
              <strong>
                {t("12 May 2024, 04:25 PM", "12 मई 2024, 04:25 अपराह्न")}
              </strong>
            </div>
          </article>
        </div>
      </FormSection>

      <ReviewDeclaration />
    </ClaimLayout>
  );
}
