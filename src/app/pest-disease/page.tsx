import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  Bug,
  Camera,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  Flower2,
  Leaf,
  MessageCircle,
  Microscope,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  PestContext,
  PestDiseaseHeader,
  RiskBadge,
  SectionTitle,
} from "@/features/pest-disease/components/pest-disease-components";
import styles from "@/features/pest-disease/components/pest-disease.module.css";
import {
  cropOptions,
  pestText,
  pestRisks,
} from "@/features/pest-disease/data/pest-disease-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

const categories = [
  { title: "Insect Pests", detail: "45 common pests", icon: Bug },
  { title: "Diseases", detail: "38 crop diseases", icon: Microscope },
  { title: "Weeds", detail: "24 weed types", icon: Flower2 },
  { title: "Mites", detail: "12 mite species", icon: CircleDot },
  { title: "Nematodes", detail: "10 nematodes", icon: ScanSearch },
  { title: "Other Problems", detail: "Birds, rodents & more", icon: Leaf },
] as const;

export default async function PestDiseasePage() {
  const t = createTranslator(await getRequestLocale());
  const highRisk = pestRisks.filter((risk) => risk.risk === "High Risk");

  return (
    <div className={styles.stack}>
      <PestDiseaseHeader
        subtitle={t(
          "Protect your crop. Secure your yield.",
          "अपनी फसल बचाएं। अपनी उपज सुरक्षित करें।",
        )}
      />
      <PestContext />

      <section className={styles.pestHero}>
        <div className={styles.heroCopy}>
          <h2>
            {t("Identify Early.", "जल्दी पहचानें।")}
            <br />
            {t("Act on Time.", "समय पर कार्रवाई करें।")}
          </h2>
          <p>
            {t(
              "Detect crop pests and diseases, assess the risk, and get proven protection advice for your field.",
              "फसल के कीट और रोग पहचानें, जोखिम का आकलन करें और अपने खेत के लिए प्रमाणित सुरक्षा सलाह पाएं।",
            )}
          </p>
          <Link href="/pest-disease/library">
            {t("Explore Pest & Disease Library", "कीट और रोग लाइब्रेरी देखें")}{" "}
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className={styles.heroVisual}>
          <Image
            src="/images/authenticated/pest-disease/hero-paddy.jpg"
            alt={t(
              "Healthy paddy field protected from pests",
              "कीटों से सुरक्षित स्वस्थ धान का खेत",
            )}
            fill
            loading="eager"
            sizes="(max-width: 720px) 100vw, 60vw"
          />
        </div>
      </section>

      <section className={styles.section}>
        <SectionTitle href="/pest-disease/library">
          {t("Browse by Crop", "फसल से देखें")}
        </SectionTitle>
        <div className={styles.cropGrid}>
          {cropOptions.map((crop) => (
            <Link
              className={styles.cropCard}
              href="/pest-disease/library"
              key={crop.name}
            >
              <div className={styles.cropImage}>
                <Image
                  src={crop.image}
                  alt={t(pestText(crop.name))}
                  fill
                  sizes="150px"
                />
              </div>
              <strong>{t(pestText(crop.name))}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionTitle href="/pest-disease/library">
          {t("Browse by Category", "श्रेणी से देखें")}
        </SectionTitle>
        <div className={styles.categoryGrid}>
          {categories.map(({ title, detail, icon: Icon }) => (
            <Link
              className={styles.categoryCard}
              href="/pest-disease/library"
              key={title}
            >
              <span className={styles.categoryIcon}>
                <Icon size={25} />
              </span>
              <span>
                <strong>
                  {t(
                    title,
                    [
                      "कीट",
                      "रोग",
                      "खरपतवार",
                      "माइट",
                      "नेमाटोड",
                      "अन्य समस्याएं",
                    ][categories.findIndex((item) => item.title === title)] ??
                      title,
                  )}
                </strong>
                <small>
                  {t(
                    detail,
                    [
                      "45 सामान्य कीट",
                      "38 फसल रोग",
                      "24 खरपतवार प्रकार",
                      "12 माइट प्रजातियां",
                      "10 नेमाटोड",
                      "पक्षी, चूहे और अन्य",
                    ][categories.findIndex((item) => item.title === title)] ??
                      detail,
                  )}
                </small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionTitle href="/pest-disease/library">
          {t("High Risk for Your Crop", "आपकी फसल के लिए उच्च जोखिम")}
        </SectionTitle>
        <div className={styles.alertGrid}>
          {highRisk.map((risk) => (
            <Link
              className={styles.alertCard}
              href="/pest-disease/library/brown-planthopper"
              key={risk.slug}
            >
              <div className={styles.alertImage}>
                <Image
                  src={risk.image}
                  alt={t(pestText(risk.title))}
                  fill
                  sizes="100px"
                />
              </div>
              <span>
                <strong>{t(pestText(risk.title))}</strong>
                <small>{t(pestText(risk.category))}</small>
                <em>
                  <RiskBadge risk={risk.risk} />
                </em>
                <small>{risk.stage}</small>
              </span>
              <ChevronRight size={20} />
            </Link>
          ))}
        </div>
      </section>

      <aside className={styles.tipBar}>
        <Sparkles size={22} />
        <span>
          <strong>{t("Farmer Tip:", "किसान सुझाव:")}</strong>{" "}
          {t(
            "Inspect your paddy field twice a week. Early identification can prevent major yield loss.",
            "सप्ताह में दो बार धान के खेत की जांच करें। जल्दी पहचान से बड़ी उपज हानि रोकी जा सकती है।",
          )}
        </span>
        <Link href="/crop-doctor">
          <Camera size={17} />
          {t("Check My Crop", "मेरी फसल जांचें")}
        </Link>
      </aside>

      <section className={styles.section}>
        <SectionTitle href="/pest-disease/library">
          {t("Recently Viewed", "हाल में देखे गए")}
        </SectionTitle>
        <div className={styles.recentGrid}>
          {pestRisks.slice(0, 5).map((risk) => (
            <article className={styles.recentCard} key={risk.slug}>
              <div className={styles.recentImage}>
                <Image
                  src={risk.image}
                  alt={t(pestText(risk.title))}
                  fill
                  sizes="180px"
                />
              </div>
              <strong>{t(pestText(risk.title))}</strong>
              <small>{t(pestText(risk.category))}</small>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.quickActions}
        aria-label={t(
          "Pest and disease quick actions",
          "कीट और रोग त्वरित कार्रवाइयां",
        )}
      >
        <Link href="/crop-doctor">
          <Camera size={20} />
          {t("Check My Crop", "मेरी फसल जांचें")}
        </Link>
        <Link href="/pest-disease/library">
          <BookOpen size={20} />
          {t("Pest Library", "कीट लाइब्रेरी")}
        </Link>
        <Link href="/pest-disease/library">
          <Bookmark size={20} />
          {t("Saved Items", "सहेजी सामग्री")}
        </Link>
        <Link href="/more#help">
          <MessageCircle size={20} />
          {t("Ask Bharati", "भारती से पूछें")}
        </Link>
      </section>

      <section className={styles.bottomActions}>
        <Link href="/crop-doctor">
          <ClipboardCheck size={20} />
          {t("Start Crop Diagnosis", "फसल निदान शुरू करें")}
        </Link>
        <Link href="/pest-disease/library">
          <ShieldCheck size={20} />
          {t("See Protection Recommendations", "सुरक्षा सिफारिशें देखें")}
        </Link>
      </section>
    </div>
  );
}
