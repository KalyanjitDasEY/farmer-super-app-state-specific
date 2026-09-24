import type { Metadata } from "next";
import {
  AlertTriangle,
  CalendarCheck,
  Calculator,
  CheckCircle2,
  ShieldCheck,
  Sprout,
} from "lucide-react";

import {
  CropContext,
  PageHeader,
  PrimaryLink,
  StepProgress,
} from "@/features/authenticated/components/app-components";
import styles from "@/features/authenticated/components/app-pages.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Treatment & Advisory", "उपचार और सलाह") };
}

export default async function AdvisoryPage() {
  const t = createTranslator(await getRequestLocale());
  const actions = [
    [
      t("Remove heavily affected leaves", "अत्यधिक प्रभावित पत्तियां हटाएं"),
      t(
        "Collect and safely dispose of severely affected leaves. Do not leave them in the field.",
        "गंभीर रूप से प्रभावित पत्तियों को इकट्ठा कर सुरक्षित रूप से नष्ट करें। उन्हें खेत में न छोड़ें।",
      ),
    ],
    [
      t("Apply the recommended treatment", "अनुशंसित उपचार करें"),
      t(
        "Use Tricyclazole 75% WP at the label-approved dose after confirming local guidance.",
        "स्थानीय सलाह की पुष्टि के बाद लेबल-अनुमोदित खुराक में Tricyclazole 75% WP का उपयोग करें।",
      ),
    ],
    [
      t("Correct crop nutrition", "फसल पोषण सुधारें"),
      t(
        "Avoid excess nitrogen. Apply balanced potassium based on soil and crop recommendations.",
        "अधिक नाइट्रोजन से बचें। मिट्टी और फसल की सिफारिशों के अनुसार संतुलित पोटाश दें।",
      ),
    ],
    [
      t("Monitor after 5–7 days", "5–7 दिनों बाद निगरानी करें"),
      t(
        "Check new leaves and record whether spots are reducing, stable or spreading.",
        "नई पत्तियां जांचें और दर्ज करें कि धब्बे घट रहे हैं, स्थिर हैं या फैल रहे हैं।",
      ),
    ],
  ] as const;
  return (
    <>
      <PageHeader
        title={t("Treatment & Advisory", "उपचार और सलाह")}
        subtitle={t(
          "A practical action plan for Brown Spot",
          "भूरे धब्बे के लिए व्यावहारिक कार्य योजना",
        )}
        backHref="/crop-doctor/diagnosis"
      />
      <CropContext captured />
      <StepProgress current={5} />
      <div className={styles.twoColumn}>
        <section className={styles.card}>
          <h2>
            <Sprout size={21} />{" "}
            {t("Recommended Action Plan", "अनुशंसित कार्य योजना")}
          </h2>
          {actions.map(([title, detail], index) => (
            <article className={styles.advisoryStep} key={title}>
              <span>{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            </article>
          ))}
        </section>
        <div className={styles.stack}>
          <section className={styles.doseResult}>
            <h2>{t("Suggested product", "सुझाया गया उत्पाद")}</h2>
            <p>
              <strong>Tricyclazole 75% WP</strong>
            </p>
            <div className={styles.diagnosisFacts}>
              <div className={styles.fact}>
                <small>{t("Base dose", "मूल खुराक")}</small>
                <strong>{t("0.6 g / litre", "0.6 ग्राम / लीटर")}</strong>
              </div>
              <div className={styles.fact}>
                <small>{t("Timing", "समय")}</small>
                <strong>{t("Dry, calm morning", "शुष्क, शांत सुबह")}</strong>
              </div>
            </div>
            <PrimaryLink href="/crop-doctor/dosage">
              <Calculator size={18} />{" "}
              {t("Calculate Exact Dosage", "सटीक खुराक की गणना करें")}
            </PrimaryLink>
          </section>
          <section className={`${styles.resultBanner} ${styles.warning}`}>
            <span className={styles.resultIcon}>
              <AlertTriangle size={24} />
            </span>
            <div>
              <h2>{t("Safety first", "सुरक्षा पहले")}</h2>
              <p>
                {t(
                  "Wear protective clothing, keep children and animals away, and observe the label waiting period.",
                  "सुरक्षात्मक कपड़े पहनें, बच्चों और पशुओं को दूर रखें और लेबल पर दी प्रतीक्षा अवधि का पालन करें।",
                )}
              </p>
            </div>
          </section>
          <section className={styles.card}>
            <h2>
              <ShieldCheck size={20} /> {t("Prevention", "रोकथाम")}
            </h2>
            <ul className={styles.checkList}>
              <li>
                <CheckCircle2 size={19} />{" "}
                {t(
                  "Use certified, disease-free seed.",
                  "प्रमाणित, रोग-मुक्त बीज का उपयोग करें।",
                )}
              </li>
              <li>
                <CheckCircle2 size={19} />{" "}
                {t(
                  "Maintain balanced field nutrition.",
                  "खेत में संतुलित पोषण बनाए रखें।",
                )}
              </li>
              <li>
                <CalendarCheck size={19} />{" "}
                {t(
                  "Monitor weekly in humid weather.",
                  "नमी वाले मौसम में साप्ताहिक निगरानी करें।",
                )}
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div className={styles.actionBar}>
        <PrimaryLink href="/crop-doctor/history" secondary>
          {t("Save & View History", "सहेजें और इतिहास देखें")}
        </PrimaryLink>
        <PrimaryLink href="/home">
          {t("Done, Go to Home", "पूर्ण, होम पर जाएं")}
        </PrimaryLink>
      </div>
    </>
  );
}
