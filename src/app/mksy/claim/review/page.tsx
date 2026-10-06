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
    title: t("Bihar Demo Claim - Review", "बिहार डेमो दावा - समीक्षा"),
  };
}

const summaryRows = [
  [
    localized("Demo", "डेमो"),
    localized("Bihar farmer accident support", "बिहार किसान दुर्घटना सहायता"),
  ],
  [
    localized("Claim Type", "दावे का प्रकार"),
    localized("Accidental Death", "दुर्घटना में मृत्यु"),
  ],
  [
    localized("Applicant", "आवेदक"),
    localized("RAMESH KUMAR (Self)", "RAMESH KUMAR (स्वयं)"),
  ],
  [localized("Demo Farmer ID", "डेमो किसान आईडी"), "BR23F12345678"],
  [
    localized("Date of Incident", "घटना की तिथि"),
    localized("12 May 2024, 03:15 PM", "12 मई 2024, 03:15 अपराह्न"),
  ],
  [
    localized("Benefit Amount", "लाभ राशि"),
    localized("Not specified (demo)", "निर्दिष्ट नहीं (डेमो)"),
  ],
  [
    localized("Application Window", "आवेदन अवधि"),
    localized(
      "No official application window (demo)",
      "कोई आधिकारिक आवेदन अवधि नहीं (डेमो)",
    ),
  ],
] as const;

const sampleDocuments = [
  [
    localized("FIR / Police Report", "FIR / पुलिस रिपोर्ट"),
    localized("Sample police report", "नमूना पुलिस रिपोर्ट"),
  ],
  [
    localized(
      "Medical Report / Disability Certificate",
      "चिकित्सा रिपोर्ट / दिव्यांगता प्रमाण पत्र",
    ),
    localized(
      "Patna Medical College and Hospital",
      "पटना मेडिकल कॉलेज और अस्पताल",
    ),
  ],
  [
    localized(
      "Bihar land record / khata-khesra",
      "बिहार भूमि अभिलेख / खाता-खेसरा",
    ),
    localized("Sample land record", "नमूना भूमि अभिलेख"),
  ],
  [
    localized("Sample incident photo", "नमूना घटना चित्र"),
    localized("Sample incident photo", "नमूना घटना चित्र"),
  ],
] as const;

export default async function MksyReviewPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <ClaimLayout
      current={4}
      title={t("Review Sample Claim", "नमूना दावे की समीक्षा")}
      description={t(
        "Review the sample details, then view a demo claim reference and status.",
        "नमूना विवरण जांचें, फिर डेमो दावा संदर्भ और स्थिति देखें।",
      )}
      notice={t(
        "This is a static example; continuing does not submit or store an application.",
        "यह स्थिर उदाहरण है; आगे बढ़ने से आवेदन जमा या संग्रहित नहीं होता।",
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
              <strong>{t("Village Amhara, Bihta", "गांव अमहरा, बिहटा")}</strong>
            </div>
          </article>
          <article>
            <span>
              <Check size={22} />
            </span>
            <div>
              <small>{t("Police Station", "पुलिस थाना")}</small>
              <strong>{t("Bihta Police Station", "बिहटा पुलिस थाना")}</strong>
            </div>
          </article>
          <article>
            <span>
              <FileCheck2 size={22} />
            </span>
            <div>
              <small>{t("Hospital", "अस्पताल")}</small>
              <strong>
                {t(
                  "Patna Medical College and Hospital",
                  "पटना मेडिकल कॉलेज और अस्पताल",
                )}
              </strong>
            </div>
          </article>
        </div>
      </FormSection>

      <FormSection title={t("C. Documents Summary", "C. दस्तावेज़ सारांश")}>
        <div className={styles.documentTable}>
          <div className={styles.documentHead}>
            <span>{t("Document", "दस्तावेज़")}</span>
            <span>{t("Status", "स्थिति")}</span>
            <span>{t("Example source", "उदाहरण स्रोत")}</span>
            <span />
            <span />
          </div>
          {sampleDocuments.map(([document, office]) => (
            <div key={document.en}>
              <strong>{t(document)}</strong>
              <em>
                <Check size={15} /> {t("Sample", "नमूना")}
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
          "D. Demo Identity Check (Farmer ID)",
          "D. डेमो पहचान जांच (किसान आईडी)",
        )}
      >
        <div className={styles.factGrid}>
          <article>
            <div>
              <small>{t("Demo Farmer ID", "डेमो किसान आईडी")}</small>
              <strong>BR23F12345678</strong>
            </div>
          </article>
          <article>
            <div>
              <small>{t("Demo check mode", "डेमो जांच माध्यम")}</small>
              <strong>OTP</strong>
            </div>
          </article>
          <article>
            <div>
              <small>{t("Identity status", "पहचान स्थिति")}</small>
              <strong>
                {t("Not verified (demo)", "सत्यापित नहीं (डेमो)")}
              </strong>
            </div>
          </article>
          <article>
            <div>
              <small>{t("Verification date", "सत्यापन तिथि")}</small>
              <strong>{t("Not applicable", "लागू नहीं")}</strong>
            </div>
          </article>
        </div>
      </FormSection>

      <ReviewDeclaration />
    </ClaimLayout>
  );
}
