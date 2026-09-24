import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Bookmark,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleCheck,
  Clock3,
  Droplets,
  ExternalLink,
  Eye,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sprout,
  TriangleAlert,
} from "lucide-react";

import {
  PestContext,
  PestDiseaseHeader,
  RiskBadge,
  SectionTitle,
} from "@/features/pest-disease/components/pest-disease-components";
import styles from "@/features/pest-disease/components/pest-disease.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

const identificationImages = [
  {
    src: "/images/authenticated/pest-disease/adult-planthopper.jpg",
    title: "Adult",
    copy: "Brown body with transparent wings",
  },
  {
    src: "/images/authenticated/pest-disease/nymph-planthopper.jpg",
    title: "Nymph",
    copy: "Small, wingless and pale brown",
  },
  {
    src: "/images/authenticated/pest-disease/hopper-burn.jpg",
    title: "Hopper Burn",
    copy: "Yellowing and drying in patches",
  },
  {
    src: "/images/authenticated/pest-disease/damage-panicle.jpg",
    title: "Plant Damage",
    copy: "Weak plants and unfilled grains",
  },
] as const;

const managementSteps = [
  {
    icon: Eye,
    title: "Monitor Regularly",
    copy: "Inspect the base of plants twice a week, especially in dense crop patches.",
  },
  {
    icon: Droplets,
    title: "Drain Excess Water",
    copy: "Drain the field for 3–4 days to reduce humidity and pest multiplication.",
  },
  {
    icon: Sprout,
    title: "Avoid Excess Nitrogen",
    copy: "Do not apply additional urea when planthopper populations are present.",
  },
  {
    icon: Leaf,
    title: "Conserve Natural Enemies",
    copy: "Protect spiders and mirid bugs. Avoid unnecessary broad-spectrum sprays.",
  },
] as const;

export default async function BrownPlanthopperPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <PestDiseaseHeader
        title={t("Brown Planthopper", "भूरा फुदका")}
        subtitle={t("Pest Identification & Management", "कीट पहचान और प्रबंधन")}
        backHref="/pest-disease/library"
        filter
      />
      <PestContext />

      <nav
        className={styles.detailTabs}
        aria-label={t(
          "Brown planthopper guide sections",
          "भूरा फुदका मार्गदर्शिका अनुभाग",
        )}
      >
        <a href="#overview">{t("Overview", "अवलोकन")}</a>
        <a href="#identification">{t("Identification", "पहचान")}</a>
        <a href="#symptoms">{t("Symptoms", "लक्षण")}</a>
        <a href="#management">{t("Management", "प्रबंधन")}</a>
        <a href="#chemical-control">
          {t("Chemical Control", "रासायनिक नियंत्रण")}
        </a>
      </nav>

      <section className={styles.detailHero} id="overview">
        <div className={styles.detailHeroImage}>
          <Image
            src="/images/authenticated/pest-disease/brown-planthopper.jpg"
            alt={t(
              "Brown planthopper on a paddy plant",
              "धान के पौधे पर भूरा फुदका",
            )}
            fill
            loading="eager"
            sizes="(max-width: 720px) 100vw, 36vw"
          />
        </div>
        <div className={styles.detailHeroCopy}>
          <div className={styles.detailTitle}>
            <span>
              <small>{t("Insect Pest", "कीट")}</small>
              <h1>{t("Brown Planthopper", "भूरा फुदका")}</h1>
              <em>Nilaparvata lugens</em>
            </span>
            <button type="button">
              <Bookmark size={20} />
              {t("Save", "सहेजें")}
            </button>
          </div>
          <p>
            {t(
              "A major sucking pest of paddy. Nymphs and adults remain near the plant base and suck sap, causing rapid yellowing and drying known as hopper burn.",
              "धान का प्रमुख रस चूसने वाला कीट। निम्फ और वयस्क पौधे के आधार के पास रहकर रस चूसते हैं, जिससे तेजी से पीलापन और सूखना होता है जिसे हॉपर बर्न कहते हैं।",
            )}
          </p>
          <div className={styles.detailFacts}>
            <div>
              <span>{t("Current Risk", "वर्तमान जोखिम")}</span>
              <RiskBadge risk="High Risk" />
            </div>
            <div>
              <span>{t("Crop Stage", "फसल अवस्था")}</span>
              <strong>
                {t("Tillering to Flowering", "कल्ले निकलने से फूल आने तक")}
              </strong>
            </div>
            <div>
              <span>{t("Favourable Weather", "अनुकूल मौसम")}</span>
              <strong>{t("Warm & Humid", "गर्म और नम")}</strong>
            </div>
            <div>
              <span>{t("Yield Loss", "उपज हानि")}</span>
              <strong>Up to 60%</strong>
            </div>
          </div>
          <aside>
            <TriangleAlert size={20} />
            <span>
              <strong>
                {t("High Risk in Your Area", "आपके क्षेत्र में उच्च जोखिम")}
              </strong>{" "}
              —{" "}
              {t(
                "Scout your field today, especially near the plant base.",
                "आज अपने खेत की जांच करें, विशेषकर पौधे के आधार के पास।",
              )}
            </span>
          </aside>
        </div>
      </section>

      <section className={styles.section} id="identification">
        <SectionTitle>{t("How to Identify", "कैसे पहचानें")}</SectionTitle>
        <p className={styles.sectionIntro}>
          {t(
            "Check the lower portion of paddy plants and gently tap them. Look for these key signs:",
            "धान के पौधों के निचले हिस्से की जांच करें और धीरे से थपथपाएं। ये प्रमुख संकेत देखें:",
          )}
        </p>
        <div className={styles.identificationGrid}>
          {identificationImages.map((item, index) => (
            <article key={item.title}>
              <div>
                <Image
                  src={item.src}
                  alt={t(
                    item.title,
                    ["वयस्क", "निम्फ", "हॉपर बर्न", "पौधे की क्षति"][index] ??
                      item.title,
                  )}
                  fill
                  sizes="260px"
                />
              </div>
              <strong>
                {t(
                  item.title,
                  ["वयस्क", "निम्फ", "हॉपर बर्न", "पौधे की क्षति"][index] ??
                    item.title,
                )}
              </strong>
              <p>
                {t(
                  item.copy,
                  [
                    "पारदर्शी पंखों वाला भूरा शरीर",
                    "छोटा, बिना पंख का और हल्का भूरा",
                    "टुकड़ों में पीलापन और सूखना",
                    "कमजोर पौधे और अधभरे दाने",
                  ][index] ?? item.copy,
                )}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.twoColumn} id="symptoms">
        <article className={styles.section}>
          <SectionTitle>
            {t("Symptoms & Damage", "लक्षण और क्षति")}
          </SectionTitle>
          <ul className={styles.checkList}>
            <li>
              <CheckCircle2 size={18} />
              {t(
                "Nymphs and adults cluster at the plant base.",
                "निम्फ और वयस्क पौधे के आधार पर समूह बनाते हैं।",
              )}
            </li>
            <li>
              <CheckCircle2 size={18} />
              {t(
                "Leaves first turn yellow, then brown and dry.",
                "पत्तियां पहले पीली, फिर भूरी होकर सूखती हैं।",
              )}
            </li>
            <li>
              <CheckCircle2 size={18} />
              {t(
                "Circular dried patches appear in the field.",
                "खेत में गोल सूखे धब्बे दिखाई देते हैं।",
              )}
            </li>
            <li>
              <CheckCircle2 size={18} />
              {t(
                "Plants lodge and panicles produce unfilled grains.",
                "पौधे गिरते हैं और बालियों में अधभरे दाने बनते हैं।",
              )}
            </li>
            <li>
              <CheckCircle2 size={18} />
              {t(
                "Honeydew may cause black sooty mould.",
                "हनीड्यू से काली कालिख जैसी फफूंद हो सकती है।",
              )}
            </li>
          </ul>
        </article>
        <article className={styles.section}>
          <SectionTitle>{t("Life Cycle", "जीवन चक्र")}</SectionTitle>
          <div className={styles.lifeCycle}>
            <div>
              <Image
                src="/images/authenticated/pest-disease/life-cycle.jpg"
                alt={t(
                  "Brown planthopper life cycle",
                  "भूरे फुदके का जीवन चक्र",
                )}
                fill
                sizes="420px"
              />
            </div>
            <ul>
              <li>
                <strong>{t("Egg:", "अंडा:")}</strong>{" "}
                {t("7–9 days inside leaf sheath", "पत्ती आवरण के अंदर 7–9 दिन")}
              </li>
              <li>
                <strong>{t("Nymph:", "निम्फ:")}</strong>{" "}
                {t("13–15 days, five stages", "13–15 दिन, पांच अवस्थाएं")}
              </li>
              <li>
                <strong>{t("Adult:", "वयस्क:")}</strong>{" "}
                {t("Lives for 10–20 days", "10–20 दिन जीवित रहता है")}
              </li>
              <li>
                <strong>{t("Total cycle:", "कुल चक्र:")}</strong>{" "}
                {t("About 25–30 days", "लगभग 25–30 दिन")}
              </li>
            </ul>
          </div>
        </article>
      </section>

      <section className={styles.section} id="management">
        <SectionTitle>
          {t("Integrated Pest Management", "एकीकृत कीट प्रबंधन")}
        </SectionTitle>
        <p className={styles.sectionIntro}>
          {t(
            "Follow these steps in order. Chemical control should be used only when the economic threshold is crossed.",
            "इन चरणों का क्रम से पालन करें। रासायनिक नियंत्रण केवल आर्थिक सीमा पार होने पर उपयोग करें।",
          )}
        </p>
        <div className={styles.managementGrid}>
          {managementSteps.map(({ icon: Icon, title, copy }, index) => (
            <article key={title}>
              <span className={styles.stepNumber}>{index + 1}</span>
              <span className={styles.managementIcon}>
                <Icon size={23} />
              </span>
              <div>
                <strong>
                  {t(
                    title,
                    [
                      "नियमित निगरानी करें",
                      "अतिरिक्त पानी निकालें",
                      "अधिक नाइट्रोजन से बचें",
                      "प्राकृतिक शत्रुओं को बचाएं",
                    ][index] ?? title,
                  )}
                </strong>
                <p>
                  {t(
                    copy,
                    [
                      "सप्ताह में दो बार पौधों के आधार की जांच करें, विशेषकर घनी फसल वाले हिस्सों में।",
                      "नमी और कीट वृद्धि घटाने के लिए खेत से 3–4 दिनों तक पानी निकालें।",
                      "फुदके मौजूद होने पर अतिरिक्त यूरिया न दें।",
                      "मकड़ियों और मिरिड कीटों को बचाएं। अनावश्यक व्यापक-स्पेक्ट्रम छिड़काव से बचें।",
                    ][index] ?? copy,
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="chemical-control">
        <SectionTitle>
          {t(
            "Chemical Control — Only When Needed",
            "रासायनिक नियंत्रण — केवल आवश्यकता पर",
          )}
        </SectionTitle>
        <aside className={styles.warningBar}>
          <AlertTriangle size={19} />
          <span>
            {t(
              "Use pesticides only after the economic threshold is reached. Always follow the registered product label and local agricultural advisory.",
              "कीटनाशक केवल आर्थिक सीमा पहुंचने के बाद उपयोग करें। हमेशा पंजीकृत उत्पाद लेबल और स्थानीय कृषि सलाह का पालन करें।",
            )}
          </span>
        </aside>
        <div className={styles.tableWrap}>
          <table className={styles.chemicalTable}>
            <thead>
              <tr>
                <th>{t("Active Ingredient", "सक्रिय घटक")}</th>
                <th>{t("Formulation", "फॉर्मुलेशन")}</th>
                <th>{t("Application Guidance", "प्रयोग मार्गदर्शन")}</th>
                <th>{t("Waiting Period", "प्रतीक्षा अवधि")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pymetrozine</td>
                <td>50 WG</td>
                <td>
                  {t(
                    "Use the label-approved dose; direct spray to plant base",
                    "लेबल-अनुमोदित खुराक उपयोग करें; पौधे के आधार पर छिड़कें",
                  )}
                </td>
                <td>{t("Follow label", "लेबल का पालन करें")}</td>
              </tr>
              <tr>
                <td>Dinotefuran</td>
                <td>20 SG</td>
                <td>
                  {t(
                    "Use only if locally registered for paddy planthopper",
                    "धान फुदका के लिए स्थानीय पंजीकरण होने पर ही उपयोग करें",
                  )}
                </td>
                <td>{t("Follow label", "लेबल का पालन करें")}</td>
              </tr>
              <tr>
                <td>Flonicamid</td>
                <td>50 WG</td>
                <td>
                  {t(
                    "Apply with calibrated equipment as per product label",
                    "उत्पाद लेबल के अनुसार अंशांकित उपकरण से लगाएं",
                  )}
                </td>
                <td>{t("Follow label", "लेबल का पालन करें")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.safetyGrid}>
        <article className={styles.safetyCard}>
          <span>
            <ShieldCheck size={24} />
          </span>
          <div>
            <h2>{t("Safety Precautions", "सुरक्षा सावधानियां")}</h2>
            <ul>
              <li>
                {t(
                  "Wear gloves, mask and protective clothing.",
                  "दस्ताने, मास्क और सुरक्षात्मक कपड़े पहनें।",
                )}
              </li>
              <li>
                {t(
                  "Keep people and animals away during spraying.",
                  "छिड़काव के दौरान लोगों और पशुओं को दूर रखें।",
                )}
              </li>
              <li>
                {t(
                  "Do not mix products unless the label allows it.",
                  "लेबल अनुमति न दे तो उत्पाद न मिलाएं।",
                )}
              </li>
            </ul>
          </div>
        </article>
        <article className={styles.etlCard}>
          <span>
            <CalendarClock size={24} />
          </span>
          <div>
            <h2>
              {t("Economic Threshold Level (ETL)", "आर्थिक सीमा स्तर (ETL)")}
            </h2>
            <strong>{t("10 insects per hill", "प्रति पौध समूह 10 कीट")}</strong>
            <p>
              {t(
                "or one hopper per tiller during the crop stage",
                "या फसल अवस्था में प्रति कल्ले एक फुदका",
              )}
            </p>
          </div>
        </article>
        <article className={styles.etlCard}>
          <span>
            <Clock3 size={24} />
          </span>
          <div>
            <h2>{t("Reassess After Action", "कार्रवाई के बाद पुनः आकलन")}</h2>
            <strong>{t("Check after 3–5 days", "3–5 दिनों बाद जांचें")}</strong>
            <p>
              {t(
                "Record pest count and watch for new hopper-burn patches.",
                "कीट संख्या दर्ज करें और नए हॉपर-बर्न धब्बों पर नजर रखें।",
              )}
            </p>
          </div>
        </article>
      </section>

      <aside className={styles.sourceBar}>
        <CircleCheck size={21} />
        <span>
          <strong>
            {t("Expert-verified guidance", "विशेषज्ञ-सत्यापित मार्गदर्शन")}
          </strong>
          <small>
            {t(
              "Based on integrated pest management recommendations. Always confirm locally approved products before use.",
              "एकीकृत कीट प्रबंधन सिफारिशों पर आधारित। उपयोग से पहले स्थानीय रूप से अनुमोदित उत्पादों की पुष्टि करें।",
            )}
          </small>
        </span>
        <a href="https://icar.org.in/" target="_blank" rel="noreferrer">
          {t("View Source", "स्रोत देखें")} <ExternalLink size={15} />
        </a>
      </aside>

      <section className={styles.detailActions}>
        <Link href="/crop-doctor">
          <Leaf size={19} />
          {t("Check My Crop", "मेरी फसल जांचें")}
        </Link>
        <Link href="/more#help">
          <MessageCircle size={19} />
          {t("Ask Bharati", "भारती से पूछें")}
        </Link>
        <Link href="/pest-disease/library">
          {t("Explore Other Problems", "अन्य समस्याएं देखें")}{" "}
          <ChevronRight size={19} />
        </Link>
        <Link href="/nutricheck/recommendation">
          {t("Get Personalized Recommendation", "व्यक्तिगत सिफारिश पाएं")}{" "}
          <ArrowRight size={19} />
        </Link>
      </section>
    </div>
  );
}
