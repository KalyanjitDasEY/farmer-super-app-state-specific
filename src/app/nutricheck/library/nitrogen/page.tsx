import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  CircleAlert,
  Droplets,
  ExternalLink,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sprout,
} from "lucide-react";

import {
  NutriCheckHeader,
  NutriContext,
  NutrientBadge,
} from "@/features/nutricheck/components/nutricheck-components";
import styles from "@/features/nutricheck/components/nutricheck.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Nitrogen Deficiency", "नाइट्रोजन की कमी") };
}

const symptoms = [
  [
    "symptom-yellow-tip.jpg",
    "Yellowing starts from the tip and moves towards the base.",
  ],
  ["symptom-pale.jpg", "Uniform pale green to yellow colour on older leaves."],
  ["symptom-stunted.jpg", "Stunted growth and reduced tillering."],
  ["symptom-severe.jpg", "In severe cases, leaves become yellow and may dry."],
] as const;

export default async function NitrogenDeficiencyPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <NutriCheckHeader
        subtitle={t("Deficiency Detail", "कमी विवरण")}
        backHref="/nutricheck/library"
      />
      <NutriContext selectable />

      <section className={styles.deficiencyHero}>
        <div className={styles.deficiencyIdentity}>
          <NutrientBadge symbol="N" tone="nitrogen" />
          <div>
            <h2>
              {t("Nitrogen Deficiency", "नाइट्रोजन की कमी")}{" "}
              <span className={styles.commonPill}>
                {t("Common", "सामान्य")}
              </span>
            </h2>
            <p>
              {t(
                "Yellowing of older leaves, stunted growth, poor tillering and low yield.",
                "पुरानी पत्तियों का पीलापन, कम वृद्धि, कम कल्ले और कम उपज।",
              )}
            </p>
          </div>
        </div>
        <div className={styles.severityPanel}>
          <p>{t("Severity in Your Field", "आपके खेत में गंभीरता")}</p>
          <span
            className={styles.severityDots}
            aria-label={t("Two of five severity", "पांच में से दो गंभीरता")}
          >
            <i />
            <i />
            <i className={styles.inactiveDot} />
            <i className={styles.inactiveDot} />
            <i className={styles.inactiveDot} />
          </span>
          <strong>{t("Low to Medium", "कम से मध्यम")}</strong>
        </div>
      </section>

      <section className={styles.symptomLayout}>
        <div className={styles.symptomGallery}>
          <h2 className={styles.subheading}>{t("1. Symptoms", "1. लक्षण")}</h2>
          <div className={styles.symptomGrid}>
            {symptoms.map(([image, caption], index) => (
              <figure className={styles.symptomCard} key={image}>
                <div className={styles.symptomImage}>
                  <Image
                    src={`/images/authenticated/nutricheck/${image}`}
                    alt=""
                    fill
                    sizes="180px"
                  />
                </div>
                <figcaption>
                  {t(
                    caption,
                    [
                      "पीलापन सिरे से शुरू होकर आधार की ओर बढ़ता है।",
                      "पुरानी पत्तियों पर समान हल्का हरा से पीला रंग।",
                      "रुकी हुई वृद्धि और कम कल्ले।",
                      "गंभीर स्थिति में पत्तियां पीली होकर सूख सकती हैं।",
                    ][index] ?? caption,
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <aside className={styles.affectedParts}>
          <h2 className={styles.subheading}>
            <Leaf size={19} />{" "}
            {t("Affected Plant Parts", "प्रभावित पौधे के हिस्से")}
          </h2>
          <div className={styles.plantDiagram}>
            <span className={styles.plantGraphic}>
              <Sprout size={86} />
            </span>
            <div className={styles.plantLabels}>
              <span>
                <strong>{t("Older Leaves", "पुरानी पत्तियां")}</strong>
                {t("Lower canopy", "निचला भाग")}
              </span>
              <span>
                <strong>{t("Stems", "तने")}</strong>
                {t("Reduced tillers", "कम कल्ले")}
              </span>
              <span>
                <strong>{t("Overall Plant", "पूरा पौधा")}</strong>
                {t("Stunted growth", "रुकी हुई वृद्धि")}
              </span>
            </div>
          </div>
        </aside>
      </section>

      <div className={styles.informationGrid}>
        <section className={styles.informationCard}>
          <h2>{t("2. Causes", "2. कारण")}</h2>
          <ul className={styles.iconList}>
            <li>
              <CircleAlert size={18} />
              {t(
                "Insufficient nitrogen in soil",
                "मिट्टी में अपर्याप्त नाइट्रोजन",
              )}
            </li>
            <li>
              <Droplets size={18} />
              {t(
                "Leaching losses due to heavy rain or irrigation",
                "तेज बारिश या सिंचाई से पोषक तत्व बहना",
              )}
            </li>
            <li>
              <CircleAlert size={18} />
              {t("Uneven fertilizer application", "उर्वरक का असमान प्रयोग")}
            </li>
            <li>
              <CircleAlert size={18} />
              {t(
                "High soil pH reduces nitrogen availability",
                "मिट्टी का अधिक pH नाइट्रोजन उपलब्धता घटाता है",
              )}
            </li>
            <li>
              <Leaf size={18} />
              {t("Low organic matter in soil", "मिट्टी में कम जैविक पदार्थ")}
            </li>
          </ul>
        </section>
        <section className={styles.informationCard}>
          <h2>
            {t(
              "3. Conditions That Aggravate the Problem",
              "3. समस्या बढ़ाने वाली स्थितियां",
            )}
          </h2>
          <ul className={styles.iconList}>
            <li>
              <Droplets size={18} />
              {t(
                "Waterlogged or poorly drained fields",
                "जलभराव या खराब जल निकासी वाले खेत",
              )}
            </li>
            <li>
              <CircleAlert size={18} />
              {t(
                "Sandy soils with low organic matter",
                "कम जैविक पदार्थ वाली रेतीली मिट्टी",
              )}
            </li>
            <li>
              <Droplets size={18} />
              {t(
                "High rainfall or excessive irrigation",
                "अधिक बारिश या अत्यधिक सिंचाई",
              )}
            </li>
            <li>
              <Sprout size={18} />
              {t(
                "Continuous cropping without nutrient replenishment",
                "पोषक तत्वों की भरपाई बिना लगातार खेती",
              )}
            </li>
            <li>
              <Leaf size={18} />
              {t(
                "Removal of crop residues from field",
                "खेत से फसल अवशेष हटाना",
              )}
            </li>
          </ul>
        </section>
      </div>

      <section className={styles.correctionPanel}>
        <div className={styles.correctionContent}>
          <div className={styles.bagImage}>
            <Image
              src="/images/authenticated/nutricheck/nitrogen-bag.jpg"
              alt={t("Nitrogen fertilizer bag", "नाइट्रोजन उर्वरक बैग")}
              fill
              sizes="120px"
            />
          </div>
          <div className={styles.correctionCopy}>
            <h2>{t("4. Recommended Correction", "4. अनुशंसित सुधार")}</h2>
            <p>
              <strong>
                {t("Apply Urea 25 kg/acre", "25 किग्रा/एकड़ यूरिया डालें")}
              </strong>
              <br />
              {t("(Contains 46% N)", "(46% N युक्त)")}
            </p>
            <div className={styles.correctionFacts}>
              <div>
                <small>{t("Apply at", "लगाने का समय")}</small>
                <strong>
                  {t("Tillering Stage", "कल्ले निकलने की अवस्था")}
                </strong>
              </div>
              <div>
                <small>{t("Method", "विधि")}</small>
                <strong>{t("Top Dress", "टॉप ड्रेस")}</strong>
              </div>
              <div>
                <small>{t("Reassess After", "पुनः आकलन")}</small>
                <strong>{t("7 Days", "7 दिन")}</strong>
              </div>
            </div>
          </div>
          <aside className={styles.balanceAdvice}>
            <h3>{t("Nutrient Balance Advice", "पोषक संतुलन सलाह")}</h3>
            <div className={styles.badgeRow}>
              <NutrientBadge symbol="N" tone="nitrogen" small />
              <NutrientBadge symbol="P" tone="phosphorus" small />
              <NutrientBadge symbol="K" tone="potassium" small />
            </div>
            <p>
              {t(
                "Maintain balanced NPK and use organic manures to improve soil health.",
                "संतुलित NPK बनाए रखें और मिट्टी स्वास्थ्य सुधारने के लिए जैविक खाद उपयोग करें।",
              )}
            </p>
          </aside>
        </div>
      </section>

      <div className={styles.informationGrid}>
        <section className={styles.informationCard}>
          <h2>
            <ShieldCheck size={20} /> {t("5. Precautions", "5. सावधानियां")}
          </h2>
          <ul className={styles.iconList}>
            <li>{t("Do not over-apply nitrogen.", "नाइट्रोजन अधिक न दें।")}</li>
            <li>
              {t(
                "Avoid application just before heavy rain.",
                "तेज बारिश से ठीक पहले प्रयोग न करें।",
              )}
            </li>
            <li>
              {t(
                "Use split doses for better absorption.",
                "बेहतर अवशोषण के लिए विभाजित खुराक दें।",
              )}
            </li>
          </ul>
        </section>
        <section className={styles.informationCard}>
          <h2>
            <Sprout size={20} /> {t("6. Expected Benefit", "6. अपेक्षित लाभ")}
          </h2>
          <ul className={styles.iconList}>
            <li>
              <CheckCircle2 size={17} />
              {t(
                "Improved leaf colour and plant vigor",
                "बेहतर पत्ती रंग और पौधे की ताकत",
              )}
            </li>
            <li>
              <CheckCircle2 size={17} />
              {t(
                "Increase in tillering and panicle size",
                "कल्लों और बाली आकार में वृद्धि",
              )}
            </li>
            <li>
              <CheckCircle2 size={17} />
              {t(
                "Better grain filling and higher yield",
                "बेहतर दाना भराव और अधिक उपज",
              )}
            </li>
          </ul>
        </section>
      </div>

      <div className={styles.validationGrid}>
        <div className={styles.validationCard}>
          <strong>{t("Source & Validation", "स्रोत और सत्यापन")}</strong>
          {t(
            "Based on ICAR Nutrient Management for Rice.",
            "धान के लिए ICAR पोषक प्रबंधन पर आधारित।",
          )}{" "}
          <ExternalLink size={14} />
        </div>
        <div className={styles.validationCard}>
          <strong>{t("Need Help?", "सहायता चाहिए?")}</strong>
          {t(
            "Talk to an expert for field-specific advice.",
            "खेत-विशिष्ट सलाह के लिए विशेषज्ञ से बात करें।",
          )}{" "}
          <Link href="/more#help">
            <MessageCircle size={15} /> {t("Ask Bharati", "भारती से पूछें")}
          </Link>
        </div>
        <div className={styles.validationCard}>
          <strong>{t("Related Actions", "संबंधित कार्रवाइयां")}</strong>
          {t(
            "View recommended products or start a NutriCheck assessment.",
            "अनुशंसित उत्पाद देखें या न्यूट्रीचेक आकलन शुरू करें।",
          )}
        </div>
      </div>
      <div className={styles.bottomActions}>
        <Link href="/nutricheck/saved">
          <Bookmark size={19} />{" "}
          {t("Save to My Library", "मेरी लाइब्रेरी में सहेजें")}
        </Link>
        <Link href="/nutricheck">
          {t("Back to NutriCheck Home", "न्यूट्रीचेक होम पर वापस जाएं")}
        </Link>
        <Link href="/nutricheck/recommendation">
          {t("View Recommendation", "सिफारिश देखें")} <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
