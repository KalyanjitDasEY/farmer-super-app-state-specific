import type { Metadata } from "next";
import {
  BookOpen,
  Camera,
  CircleAlert,
  ImagePlus,
  MessageSquareText,
  Send,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import {
  CropContext,
  LeafImage,
  PageHeader,
  PrimaryLink,
} from "@/features/authenticated/components/app-components";
import styles from "@/features/authenticated/components/app-pages.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Expert Help", "विशेषज्ञ सहायता") };
}

export default async function LowConfidencePage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <>
      <PageHeader
        title={t(
          "Low Confidence / Expert Help",
          "कम विश्वसनीयता / विशेषज्ञ सहायता",
        )}
        subtitle={t(
          "We need more information to confirm the diagnosis",
          "निदान की पुष्टि के लिए हमें और जानकारी चाहिए",
        )}
        backHref="/crop-doctor/confirm"
      />
      <CropContext captured />
      <div className={`${styles.resultBanner} ${styles.warning}`}>
        <span className={styles.resultIcon}>
          <CircleAlert size={28} />
        </span>
        <div>
          <h2>
            {t(
              "We’re not fully confident about this diagnosis.",
              "हमें इस निदान पर पूरी तरह विश्वास नहीं है।",
            )}
          </h2>
          <p>
            {t(
              "The image may be unclear, symptoms may be early, or multiple problems may look similar.",
              "तस्वीर अस्पष्ट हो सकती है, लक्षण शुरुआती हो सकते हैं या कई समस्याएं समान दिख सकती हैं।",
            )}
          </p>
        </div>
        <div className={styles.confidence}>
          <strong>42%</strong>
          <small>{t("Confidence · Low", "विश्वसनीयता · कम")}</small>
        </div>
      </div>
      <div className={styles.reviewGrid}>
        <div>
          <h2>{t("Captured Image", "कैप्चर की गई तस्वीर")}</h2>
          <LeafImage eager />
        </div>
        <section className={styles.card}>
          <h2>{t("What you can do next", "आप आगे क्या कर सकते हैं")}</h2>
          <ul className={styles.checkList}>
            <li>
              <Camera size={20} />{" "}
              {t(
                "Retake with better lighting and focus.",
                "बेहतर रोशनी और फोकस के साथ फिर से फोटो लें।",
              )}
            </li>
            <li>
              <ImagePlus size={20} />{" "}
              {t(
                "Upload another image or affected part.",
                "दूसरी तस्वीर या प्रभावित हिस्सा अपलोड करें।",
              )}
            </li>
            <li>
              <BookOpen size={20} />{" "}
              {t(
                "Browse common problems manually.",
                "सामान्य समस्याएं स्वयं देखें।",
              )}
            </li>
            <li>
              <MessageSquareText size={20} />{" "}
              {t(
                "Ask Bharati in your language.",
                "अपनी भाषा में भारती से पूछें।",
              )}
            </li>
          </ul>
        </section>
      </div>
      <section className={styles.expertCard}>
        <span>
          <UserRoundCheck size={34} />
        </span>
        <div>
          <h2>{t("Connect with an Expert", "विशेषज्ञ से जुड़ें")}</h2>
          <p>
            {t(
              "Share your query with an agricultural expert. Typical response time is within 24 hours.",
              "अपना प्रश्न कृषि विशेषज्ञ के साथ साझा करें। सामान्यतः 24 घंटे के भीतर उत्तर मिलता है।",
            )}
          </p>
        </div>
        <PrimaryLink href="/more#help">
          <Send size={18} /> {t("Send to Expert", "विशेषज्ञ को भेजें")}
        </PrimaryLink>
      </section>
      <section className={styles.card}>
        <div className={styles.listItem}>
          <span className={styles.listIcon}>
            <ShieldCheck size={22} />
          </span>
          <div>
            <strong>
              {t(
                "Until you confirm, keep your crop safe",
                "पुष्टि होने तक अपनी फसल सुरक्षित रखें",
              )}
            </strong>
            <small>
              {t(
                "Avoid chemical treatment based on an uncertain diagnosis.",
                "अनिश्चित निदान के आधार पर रासायनिक उपचार से बचें।",
              )}
            </small>
          </div>
        </div>
      </section>
      <div className={styles.actionBar}>
        <PrimaryLink href="/crop-doctor/capture" secondary>
          {t("Retake Photo", "फिर से फोटो लें")}
        </PrimaryLink>
        <PrimaryLink href="/crop-doctor">
          {t("Go to Crop Doctor Home", "फसल डॉक्टर होम पर जाएं")}
        </PrimaryLink>
      </div>
    </>
  );
}
