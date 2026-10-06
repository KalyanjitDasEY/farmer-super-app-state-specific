import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { getDictionary } from "@/i18n/dictionaries";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";
import styles from "@/styles/application.module.css";

export const metadata: Metadata = {
  title: "Image Credits",
};

const credits = [
  {
    title: "Indian farmer sitting on his farm",
    creator: "Gadhiyajatinb",
    source:
      "https://commons.wikimedia.org/wiki/File:Indian_farmer_are_sitting_and_relaxing_his_own_agricultural_farm.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    usage: "Gateway and marketplace portraits; cropped and resized.",
    usageHindi: "मुख्य पृष्ठ और बाज़ार के चित्र; काटकर आकार बदला गया।",
    note: "The photo does not identify the farmer's state.",
    noteHindi: "इस चित्र में किसान का राज्य निर्दिष्ट नहीं है।",
  },
  {
    title: "Somewhere in Bihar 06 threshing",
    creator: "juggadery",
    source:
      "https://commons.wikimedia.org/wiki/File:Somewhere_in_Bihar_06_threshing_(32126379105).jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    usage: "Scheme and demo walkthrough banners; cropped and resized.",
    usageHindi: "योजना और डेमो बैनर; काटकर आकार बदला गया।",
    note: "Described by the uploader as a threshing scene in Bihar.",
    noteHindi: "अपलोडकर्ता के अनुसार यह बिहार में मड़ाई का दृश्य है।",
  },
  {
    title: "Farm workers Bihar",
    creator: "Manoj nav",
    source: "https://commons.wikimedia.org/wiki/File:Farm_workers_Bihar.JPG",
    license: "Public domain",
    licenseUrl:
      "https://commons.wikimedia.org/wiki/File:Farm_workers_Bihar.JPG#Licensing",
    usage: "Registration and login scene; cropped, flipped and resized.",
    usageHindi: "पंजीकरण और लॉगिन दृश्य; काटकर, पलटकर आकार बदला गया।",
    note: "Identified on Commons as farm workers in Bihar.",
    noteHindi: "विकिमीडिया कॉमन्स पर बिहार के खेत मज़दूरों के रूप में वर्णित।",
  },
] as const;

export default async function ImageCreditsPage() {
  const locale = await getRequestLocale();
  const t = createTranslator(locale);

  return (
    <PageShell locale={locale} dictionary={getDictionary(locale)} footer>
      <section className={`${styles.container} ${styles.section}`}>
        <h1>{t("Image credits", "चित्र श्रेय")}</h1>
        <p>
          {t(
            "Photographs illustrate a demo app, not verified identities or official Bihar government services. The sample digital-ID avatar is an original illustration.",
            "ये चित्र डेमो ऐप के लिए हैं, सत्यापित पहचान या बिहार सरकार की आधिकारिक सेवाओं के लिए नहीं। नमूना डिजिटल आईडी का चित्र मौलिक है।",
          )}
        </p>
        <div className={styles.grid}>
          {credits.map((credit) => (
            <article
              className={`${styles.card} ${styles.cardPad}`}
              key={credit.source}
            >
              <h2>{credit.title}</h2>
              <p>
                {t("Photo by", "चित्र")}: {credit.creator} ·{" "}
                <a href={credit.source}>{t("Original photo", "मूल चित्र")}</a> ·{" "}
                <a href={credit.licenseUrl}>{credit.license}</a>
              </p>
              <p>{locale === "hi" ? credit.usageHindi : credit.usage}</p>
              <p>{locale === "hi" ? credit.noteHindi : credit.note}</p>
            </article>
          ))}
        </div>
        <p>
          {t(
            "Cropped and resized photos remain available under their respective Creative Commons ShareAlike licenses.",
            "काटकर आकार बदले गए चित्र अपने संबंधित क्रिएटिव कॉमन्स शेयरअलाइक लाइसेंस के तहत उपलब्ध हैं।",
          )}
        </p>
      </section>
    </PageShell>
  );
}
