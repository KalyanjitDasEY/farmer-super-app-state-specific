import type { Metadata } from "next";
import {
  Camera,
  CheckCircle2,
  History,
  ScanSearch,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import {
  PageHeader,
  PrimaryLink,
  SectionHeading,
} from "@/features/authenticated/components/app-components";
import styles from "@/features/authenticated/components/app-pages.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Crop Doctor", "फसल डॉक्टर") };
}

export default async function CropDoctorPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <>
      <PageHeader
        title={t("Crop Doctor", "फसल डॉक्टर")}
        subtitle={t(
          "Identify crop problems and get trusted advice",
          "फसल की समस्याएं पहचानें और भरोसेमंद सलाह पाएं",
        )}
      />
      <section className={styles.doctorHero}>
        <div>
          <p className={styles.eyebrow}>
            {t("AI-powered crop care", "एआई-संचालित फसल देखभाल")}
          </p>
          <h2>
            {t(
              "What problem are you seeing in your crop?",
              "आप अपनी फसल में क्या समस्या देख रहे हैं?",
            )}
          </h2>
          <p>
            {t(
              "Take a clear photo of the affected leaf or plant. Crop Doctor will analyze it and guide you toward the safest next step.",
              "प्रभावित पत्ती या पौधे की साफ फोटो लें। फसल डॉक्टर इसका विश्लेषण करके आपको सबसे सुरक्षित अगले कदम की सलाह देगा।",
            )}
          </p>
        </div>
        <div className={styles.doctorHeroActions}>
          <PrimaryLink href="/crop-doctor/capture">
            <Camera size={20} />{" "}
            {t("Start New Diagnosis", "नया निदान शुरू करें")}
          </PrimaryLink>
          <PrimaryLink href="/crop-doctor/history" secondary>
            <History size={20} />{" "}
            {t("View Diagnosis History", "निदान इतिहास देखें")}
          </PrimaryLink>
        </div>
      </section>
      <SectionHeading
        title={t("How Crop Doctor Works", "फसल डॉक्टर कैसे काम करता है")}
      />
      <div className={styles.howGrid}>
        <article className={styles.howCard}>
          <b>1</b>
          <span>
            <Camera size={26} />
          </span>
          <h3>{t("Capture", "कैप्चर")}</h3>
          <p>
            {t(
              "Take clear photos of the affected crop part.",
              "फसल के प्रभावित हिस्से की साफ फोटो लें।",
            )}
          </p>
        </article>
        <article className={styles.howCard}>
          <b>2</b>
          <span>
            <ScanSearch size={26} />
          </span>
          <h3>{t("Analyze", "विश्लेषण")}</h3>
          <p>
            {t(
              "AI compares visible symptoms with verified crop data.",
              "एआई दिखाई देने वाले लक्षणों की सत्यापित फसल डेटा से तुलना करता है।",
            )}
          </p>
        </article>
        <article className={styles.howCard}>
          <b>3</b>
          <span>
            <Stethoscope size={26} />
          </span>
          <h3>{t("Get Advice", "सलाह पाएं")}</h3>
          <p>
            {t(
              "Review diagnosis, treatment and safe-use guidance.",
              "निदान, उपचार और सुरक्षित उपयोग की सलाह देखें।",
            )}
          </p>
        </article>
      </div>
      <SectionHeading title={t("Before You Begin", "शुरू करने से पहले")} />
      <ul className={styles.instructionList}>
        <li>
          <strong>
            {t("Use natural light", "प्राकृतिक रोशनी का उपयोग करें")}
          </strong>
          {t("Avoid harsh shadows and flash.", "तेज छाया और फ्लैश से बचें।")}
        </li>
        <li>
          <strong>{t("Keep it in focus", "फोकस बनाए रखें")}</strong>
          {t(
            "Tap the affected area before capture.",
            "कैप्चर से पहले प्रभावित हिस्से पर टैप करें।",
          )}
        </li>
        <li>
          <strong>{t("Move closer", "पास जाएं")}</strong>
          {t("Make symptoms clearly visible.", "लक्षण साफ दिखाई देने दें।")}
        </li>
        <li>
          <strong>{t("Capture more angles", "अधिक कोणों से फोटो लें")}</strong>
          {t(
            "Add multiple photos when possible.",
            "संभव हो तो कई फोटो जोड़ें।",
          )}
        </li>
      </ul>
      <section className={styles.card}>
        <div className={styles.listItem}>
          <span className={styles.listIcon}>
            <ShieldCheck size={22} />
          </span>
          <div>
            <strong>{t("Safe and private", "सुरक्षित और निजी")}</strong>
            <small>
              {t(
                "Your crop images are used only to provide the requested advisory.",
                "आपकी फसल की तस्वीरों का उपयोग केवल मांगी गई सलाह देने के लिए किया जाता है।",
              )}
            </small>
          </div>
          <CheckCircle2 color="#217637" size={22} />
        </div>
      </section>
    </>
  );
}
