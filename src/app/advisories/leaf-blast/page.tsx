import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  Bell,
  Bookmark,
  Bug,
  Calculator,
  CalendarClock,
  CheckCircle2,
  CloudRain,
  FileCheck2,
  FlaskConical,
  Leaf,
  MessageCircleMore,
  PackageSearch,
  Share2,
  ShieldCheck,
  Sprout,
  Sun,
} from "lucide-react";

import {
  AdvisoryContext,
  AdvisoryHeader,
} from "@/features/advisories/components/advisory-components";
import styles from "@/features/advisories/components/advisories.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

const products = [
  {
    name: "Tricyclazole 75% WP",
    dose: "0.6 g per litre of water",
    volume: "500 litre/acre",
  },
  {
    name: "Isoprothiolane 40% EC",
    dose: "1.0 ml per litre of water",
    volume: "500 litre/acre",
  },
] as const;

export default async function LeafBlastAdvisoryPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.stack}>
      <AdvisoryHeader
        title={t("Advisory Detail", "सलाह विवरण")}
        subtitle={t(
          "Follow the right action at the right time",
          "सही समय पर सही कार्रवाई करें",
        )}
        backHref="/advisories"
      />
      <AdvisoryContext detail />

      <section className={styles.detailHero}>
        <span className={styles.detailIcon}>
          <Leaf size={34} />
        </span>
        <div className={styles.detailIntro}>
          <span className={styles.priorityPill}>
            {t("High Priority", "उच्च प्राथमिकता")}
          </span>
          <h1>
            {t("Leaf Blast Risk Increasing", "पत्ती झुलसा का जोखिम बढ़ रहा है")}
          </h1>
          <p>
            {t(
              "Warm and humid conditions with expected rainfall can increase risk of Leaf Blast in your paddy.",
              "गर्म और नम मौसम तथा संभावित बारिश आपके धान में पत्ती झुलसा का जोखिम बढ़ा सकती है।",
            )}
          </p>
          <div className={styles.detailTags}>
            <span>
              <Sprout size={16} />
              {t("Paddy (Dhan)", "धान")}
            </span>
            <span>
              <Leaf size={16} />
              {t(
                "Tillering Stage (25–30 DAT)",
                "कल्ले निकलने की अवस्था (25–30 DAT)",
              )}
            </span>
            <span>{t("Field 1", "खेत 1")}</span>
          </div>
        </div>
        <div className={styles.detailImage}>
          <Image
            src="/images/authenticated/advisories/leaf-blast.jpg"
            alt={t(
              "Leaf Blast symptoms on paddy leaves",
              "धान की पत्तियों पर पत्ती झुलसा के लक्षण",
            )}
            fill
            priority
            sizes="(max-width: 720px) 100vw, 360px"
          />
        </div>
      </section>

      <aside className={styles.whyBar}>
        <span>
          <CloudRain size={26} />
        </span>
        <div>
          <strong>{t("Why this advisory?", "यह सलाह क्यों?")}</strong>
          <p>
            {t(
              "High humidity (above 70%) and forecasted light to moderate rainfall create favourable conditions for Leaf Blast development and spread.",
              "अधिक नमी (70% से ऊपर) और हल्की से मध्यम बारिश का पूर्वानुमान पत्ती झुलसा के विकास और फैलाव के लिए अनुकूल स्थिति बनाते हैं।",
            )}
          </p>
        </div>
      </aside>

      <section className={styles.detailColumns}>
        <div className={styles.detailColumn}>
          <article className={styles.detailPanel}>
            <div className={styles.actionIntro}>
              <span>
                <FlaskConical size={23} />
              </span>
              <div>
                <h2>{t("Recommended Action", "अनुशंसित कार्रवाई")}</h2>
                <p>
                  {t(
                    "Apply recommended fungicide to manage Leaf Blast and protect yield.",
                    "पत्ती झुलसा नियंत्रित करने और उपज बचाने के लिए अनुशंसित फफूंदनाशक लगाएं।",
                  )}
                </p>
                <span className={styles.actionType}>
                  {t("Action Type: Preventive", "कार्रवाई प्रकार: निवारक")}
                </span>
              </div>
            </div>
            <hr />
            <h3>{t("What to Do", "क्या करें")}</h3>
            <ol className={styles.numberList}>
              <li>
                {t(
                  "Use the recommended fungicide from approved list.",
                  "अनुमोदित सूची से अनुशंसित फफूंदनाशक उपयोग करें।",
                )}
              </li>
              <li>
                {t(
                  "Apply in the early morning or late afternoon.",
                  "सुबह जल्दी या देर दोपहर लगाएं।",
                )}
              </li>
              <li>
                {t(
                  "Ensure thorough coverage of leaves.",
                  "पत्तियों पर पूरा आवरण सुनिश्चित करें।",
                )}
              </li>
              <li>
                {t(
                  "Avoid application if heavy rain is expected within 4 hours.",
                  "यदि 4 घंटे के भीतर तेज बारिश की संभावना हो तो प्रयोग न करें।",
                )}
              </li>
            </ol>
          </article>

          <article className={styles.detailPanel}>
            <h2>{t("Recommended Products", "अनुशंसित उत्पाद")}</h2>
            <div className={styles.productList}>
              {products.map((product, index) => (
                <div className={styles.product} key={product.name}>
                  <i>{index + 1}</i>
                  <strong>{product.name}</strong>
                  <span>{t("Approved", "अनुमोदित")}</span>
                  <small>
                    {t("Dose", "खुराक")}:{" "}
                    {t(
                      product.dose,
                      index === 0
                        ? "0.6 ग्राम प्रति लीटर पानी"
                        : "1.0 मिली प्रति लीटर पानी",
                    )}
                  </small>
                  <small>
                    {t("Spray Volume", "छिड़काव मात्रा")}:{" "}
                    {t(product.volume, "500 लीटर/एकड़")}
                  </small>
                </div>
              ))}
            </div>
            <p>
              <ShieldCheck size={14} />{" "}
              {t(
                "Use only approved products. Follow label instructions and safety precautions.",
                "केवल अनुमोदित उत्पाद उपयोग करें। लेबल निर्देशों और सुरक्षा सावधानियों का पालन करें।",
              )}
            </p>
          </article>
        </div>

        <div className={styles.detailColumn}>
          <article className={`${styles.detailPanel} ${styles.deadline}`}>
            <span>
              <p>{t("Apply within next", "अगले समय में लगाएं")}</p>
              <strong>{t("24 Hours", "24 घंटे")}</strong>
              <p>
                {t(
                  "Valid till: 21 May 2024, 08:30 AM",
                  "मान्य: 21 मई 2024, 08:30 पूर्वाह्न तक",
                )}
              </p>
            </span>
            <span>
              <CalendarClock size={27} />
            </span>
          </article>
          <article className={styles.detailPanel}>
            <div className={styles.actionIntro}>
              <span>
                <ShieldCheck size={22} />
              </span>
              <div>
                <h2>{t("Expected Benefit", "अपेक्षित लाभ")}</h2>
                <p>
                  {t(
                    "Timely action reduces disease incidence and helps protect yield potential.",
                    "समय पर कार्रवाई रोग का प्रकोप घटाती है और संभावित उपज की रक्षा करती है।",
                  )}
                </p>
              </div>
            </div>
          </article>
          <article className={styles.detailPanel}>
            <h2>{t("Best Time to Apply", "लगाने का सर्वोत्तम समय")}</h2>
            <div className={styles.bestTime}>
              <Sun size={30} />
              <span>
                <h3>{t("Early Morning", "सुबह जल्दी")}</h3>
                <p>6:00 AM – 10:00 AM</p>
              </span>
            </div>
            <div className={styles.bestTime}>
              <Sun size={30} />
              <span>
                <h3>{t("Late Afternoon", "देर दोपहर")}</h3>
                <p>4:00 PM – 6:00 PM</p>
              </span>
            </div>
          </article>
          <article className={`${styles.detailPanel} ${styles.avoidPanel}`}>
            <div className={styles.actionIntro}>
              <span>
                <CloudRain size={22} />
              </span>
              <div>
                <h2>{t("Avoid Application", "प्रयोग से बचें")}</h2>
                <p>
                  {t(
                    "Do not spray if rain is expected within 4 hours or during strong winds.",
                    "यदि 4 घंटे में बारिश की संभावना हो या तेज हवा चल रही हो तो छिड़काव न करें।",
                  )}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.metaGrid}>
        <article className={styles.metaCard}>
          <CloudRain size={22} />
          <div>
            <h2>{t("Weather Summary", "मौसम सारांश")}</h2>
            <p>
              {t("Rainfall (Next 24h)", "बारिश (अगले 24 घंटे)")}
              <br />
              0.0 – 2.0 mm
              <br />
              <br />
              {t("Humidity", "आर्द्रता")}
              <br />
              75 – 85%
            </p>
          </div>
        </article>
        <article className={styles.metaCard}>
          <ShieldCheck size={22} />
          <div>
            <h2>{t("Risk Level", "जोखिम स्तर")}</h2>
            <p>
              <b>{t("High", "अधिक")}</b>
              <br />
              {t("(Next 3 Days)", "(अगले 3 दिन)")}
            </p>
          </div>
        </article>
        <article className={styles.metaCard}>
          <FileCheck2 size={22} />
          <div>
            <h2>{t("Advisory Source", "सलाह स्रोत")}</h2>
            <p>
              IMD Forecast +<br />
              ICAR Agromet
              <br />
              {t("Advisory Service", "सलाह सेवा")}
              <br />
              <br />
              {t("Version: 1.2", "संस्करण: 1.2")}
            </p>
          </div>
        </article>
        <article className={styles.metaCard}>
          <FileCheck2 size={22} />
          <div>
            <h2>{t("Advisory ID", "सलाह आईडी")}</h2>
            <p>
              ADV-WX-240520-001
              <br />
              <br />
              {t("Language", "भाषा")}
              <br />
              {t("English", "हिन्दी")}
            </p>
          </div>
        </article>
      </section>

      <h2 className={styles.sectionHeading}>
        {t("Related Actions & Tools", "संबंधित कार्रवाइयां और उपकरण")}
      </h2>
      <section className={styles.relatedGrid}>
        <Link href="/more#help">
          <Bug size={20} />
          {t("View Disease Details", "रोग विवरण देखें")}
        </Link>
        <Link href="/more#help">
          <Calculator size={20} />
          {t("Product & Dosage Calculator", "उत्पाद और खुराक कैलकुलेटर")}
        </Link>
        <Link href="/marketplace">
          <PackageSearch size={20} />
          {t("Book Input (Nearby)", "इनपुट बुक करें (पास में)")}
        </Link>
        <Link href="/advisories/leaf-blast/reminder">
          <Bell size={20} />
          {t("Set Reminder", "रिमाइंडर सेट करें")}
        </Link>
        <Link href="/more#help">
          <MessageCircleMore size={20} />
          {t("Ask Expert Now", "अभी विशेषज्ञ से पूछें")}
        </Link>
      </section>

      <section className={styles.detailActions}>
        <button type="button">
          <Bookmark size={19} />
          {t("Save Advisory", "सलाह सहेजें")}
        </button>
        <button type="button">
          <Share2 size={19} />
          {t("Share Advisory", "सलाह साझा करें")}
        </button>
        <button type="button">
          <CheckCircle2 size={19} />
          {t("Mark as Done", "पूर्ण चिह्नित करें")}
        </button>
      </section>
    </div>
  );
}
