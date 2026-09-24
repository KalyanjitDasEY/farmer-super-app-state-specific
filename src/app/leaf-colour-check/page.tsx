import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Camera,
  ChartNoAxesCombined,
  ChevronRight,
  History,
  Lightbulb,
  Scale,
} from "lucide-react";

import {
  CropContext,
  LeafChart,
  LeafPageHeader,
  RecentAssessmentRows,
} from "@/features/leaf-colour-check/components/leaf-colour-components";
import styles from "@/features/leaf-colour-check/components/leaf-colour.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Leaf Colour Check", "पत्ती रंग जांच") };
}

const shortcuts = [
  {
    title: "How it Works",
    description: "Learn how DLCC helps in crop nutrition",
    icon: BookOpen,
    href: "#best-practice",
  },
  {
    title: "Interpretation Guide",
    description: "Understand nitrogen status and action required",
    icon: ChartNoAxesCombined,
    href: "/leaf-colour-check/advice",
  },
  {
    title: "Nutrient Management",
    description: "Get recommended fertilizer and dosage based on reading",
    icon: Scale,
    href: "/leaf-colour-check/advice",
  },
  {
    title: "History",
    description: "View your previous DLCC readings and trends",
    icon: History,
    href: "/leaf-colour-check/history",
  },
] as const;

export default async function LeafColourCheckPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <LeafPageHeader
        title={t(
          "DLCC – Digital Leaf Colour Chart",
          "DLCC – डिजिटल पत्ती रंग चार्ट",
        )}
        subtitle={t(
          "Assess leaf colour. Manage nutrition. Improve yield.",
          "पत्ती का रंग जांचें। पोषण प्रबंधित करें। उपज बढ़ाएं।",
        )}
      />
      <CropContext />

      <section className={styles.homeHero}>
        <div className={styles.heroCopy}>
          <h2>
            {t("Get the right dose", "सही खुराक पाएं")}
            <br />
            {t("at the right time.", "सही समय पर।")}
          </h2>
          <p>
            {t(
              "Match your leaf colour with the DLCC chart to find crop nitrogen status and get recommendation.",
              "फसल की नाइट्रोजन स्थिति जानने और सिफारिश पाने के लिए पत्ती के रंग का DLCC चार्ट से मिलान करें।",
            )}
          </p>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/images/authenticated/nutricheck/healthy-leaf-check.jpg"
            alt={t(
              "Healthy paddy leaves ready for colour assessment",
              "रंग आकलन के लिए तैयार स्वस्थ धान की पत्तियां",
            )}
            fill
            loading="eager"
            sizes="(max-width: 800px) 100vw, 55vw"
          />
          <LeafChart />
        </div>
      </section>

      <Link
        className={styles.startAssessment}
        href="/leaf-colour-check/reading"
      >
        <span>
          <Camera size={29} />
        </span>
        <span>
          <strong>
            {t("Start Leaf Colour Assessment", "पत्ती रंग आकलन शुरू करें")}
          </strong>
          <small>
            {t(
              "Capture leaf and match with DLCC",
              "पत्ती कैप्चर कर DLCC से मिलाएं",
            )}
          </small>
        </span>
        <ChevronRight size={28} />
      </Link>

      <section className={styles.shortcutGrid}>
        {shortcuts.map(({ title, description, icon: Icon, href }) => (
          <Link href={href} key={title}>
            <span>
              <Icon size={27} />
            </span>
            <strong>
              {t(
                title,
                [
                  "यह कैसे काम करता है",
                  "व्याख्या मार्गदर्शिका",
                  "पोषक तत्व प्रबंधन",
                  "इतिहास",
                ][shortcuts.findIndex((item) => item.title === title)] ?? title,
              )}
            </strong>
            <small>
              {t(
                description,
                [
                  "जानें कि DLCC फसल पोषण में कैसे मदद करता है",
                  "नाइट्रोजन स्थिति और आवश्यक कार्रवाई समझें",
                  "रीडिंग के आधार पर अनुशंसित उर्वरक और खुराक पाएं",
                  "पिछली DLCC रीडिंग और रुझान देखें",
                ][shortcuts.findIndex((item) => item.title === title)] ??
                  description,
              )}
            </small>
            <ChevronRight size={18} />
          </Link>
        ))}
      </section>

      <section className={styles.panel}>
        <div className={styles.panelTitle}>
          <h2>{t("Recent Assessments", "हाल के आकलन")}</h2>
          <Link href="/leaf-colour-check/history">
            {t("View All", "सभी देखें")} <ChevronRight size={17} />
          </Link>
        </div>
        <RecentAssessmentRows />
      </section>

      <aside className={styles.bestPractice} id="best-practice">
        <Lightbulb size={25} />
        <span>
          <strong>{t("Best Practice", "सर्वोत्तम अभ्यास")}</strong>
          {t(
            "Take reading between 9 AM – 11 AM on a sunny day for accurate results.",
            "सटीक परिणामों के लिए धूप वाले दिन सुबह 9 से 11 बजे के बीच रीडिंग लें।",
          )}
        </span>
        <Link href="/leaf-colour-check/reading">
          {t("Start Now", "अभी शुरू करें")} <ArrowRight size={18} />
        </Link>
      </aside>
    </div>
  );
}
