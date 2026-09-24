import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  Check,
  Droplets,
  Leaf,
  PackageCheck,
  ShieldCheck,
  Sprout,
  Star,
  Truck,
} from "lucide-react";

import {
  MarketplaceTrustStrip,
  ProductCard,
  SectionTitle,
} from "@/features/marketplace/components/marketplace-components";
import { PurchasePanel } from "@/features/marketplace/components/marketplace-interactions";
import styles from "@/features/marketplace/components/marketplace.module.css";
import { marketplaceProducts } from "@/features/marketplace/data/marketplace-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("IFFCO Urea 46% N", "इफको यूरिया 46% N") };
}

export default async function ProductDetailsPage() {
  const t = createTranslator(await getRequestLocale());
  const product = marketplaceProducts[0];
  if (!product) {
    notFound();
  }

  return (
    <div className={styles.fullMarketPage}>
      <nav className={styles.breadcrumbs}>
        <Link href="/marketplace">
          {t("Marketplace Home", "मार्केटप्लेस होम")}
        </Link>
        <span>›</span>
        <Link href="/marketplace/search">{t("Fertilisers", "उर्वरक")}</Link>
        <span>›</span>
        <strong>{t(product.name)}</strong>
      </nav>
      <div className={styles.productDetailLayout}>
        <section className={styles.productVisual}>
          <div className={styles.thumbnailRail}>
            {[1, 2, 3, 4].map((item) => (
              <button type="button" key={item}>
                <Image
                  src={product.image}
                  alt={t(
                    "IFFCO Urea product view",
                    "इफको यूरिया उत्पाद का दृश्य",
                  )}
                  fill
                  sizes="58px"
                />
              </button>
            ))}
          </div>
          <div className={styles.largeProductImage}>
            <Image
              src={product.image}
              alt={t(product.name)}
              fill
              priority
              sizes="(max-width: 760px) 78vw, 440px"
            />
          </div>
          <span className={styles.approvedPill}>
            <ShieldCheck size={16} />{" "}
            {t("Government Approved", "सरकार द्वारा अनुमोदित")}
          </span>
        </section>
        <section className={styles.productIntro}>
          <h1>{t(product.name)}</h1>
          <span className={styles.bestseller}>
            ♛ {t("Bestseller", "सबसे अधिक बिकने वाला")}
          </span>
          <p>
            {t("Brand", "ब्रांड")}: <strong>IFFCO</strong>
          </p>
          <p>
            {t("Category", "श्रेणी")}: {t("Fertilisers", "उर्वरक")}{" "}
            <span>›</span> {t("Nitrogenous", "नाइट्रोजन युक्त")}
          </p>
          <div className={styles.detailRating}>
            <Star size={17} fill="currentColor" /> <strong>4.6</strong>{" "}
            {t("(2.3K", "(2.3 हज़ार")} {t("Ratings", "रेटिंग")}) <span>|</span>{" "}
            {t("1.8K+ Farmers bought this", "1.8K+ किसानों ने इसे खरीदा")}
          </div>
          <MarketplaceTrustStrip compact />
          <div className={styles.infoNote}>
            {t(
              "Essential nutrient for healthy growth and higher yield.",
              "स्वस्थ वृद्धि और अधिक उपज के लिए आवश्यक पोषक तत्व।",
            )}
          </div>
          <div className={styles.featuresGrid}>
            <div>
              <h2>{t("Key Features", "मुख्य विशेषताएं")}</h2>
              <ul>
                <li>
                  {t(
                    "High purity prilled urea with 46% Nitrogen",
                    "46% नाइट्रोजन वाला उच्च शुद्धता का प्रिल्ड यूरिया",
                  )}
                </li>
                <li>
                  {t(
                    "Uniform granules for better nutrient use efficiency",
                    "बेहतर पोषक उपयोग दक्षता के लिए एकसमान दाने",
                  )}
                </li>
                <li>
                  {t(
                    "Neem coated for better nitrogen retention",
                    "बेहतर नाइट्रोजन धारण के लिए नीम लेपित",
                  )}
                </li>
                <li>
                  {t(
                    "Suitable for all crops and soil types",
                    "सभी फसलों और मिट्टी के प्रकारों के लिए उपयुक्त",
                  )}
                </li>
              </ul>
            </div>
            <div>
              <h2>{t("Suitable For", "इनके लिए उपयुक्त")}</h2>
              <ul className={styles.greenList}>
                <li>
                  <Sprout size={15} />{" "}
                  {t("Cereals (Rice, Wheat)", "अनाज (चावल, गेहूं)")}
                </li>
                <li>
                  <Leaf size={15} /> {t("Pulses", "दलहन")}
                </li>
                <li>
                  <Droplets size={15} /> {t("Oilseeds", "तिलहन")}
                </li>
                <li>
                  <Check size={15} /> {t("All Crops", "सभी फसलें")}
                </li>
              </ul>
            </div>
          </div>
        </section>
        <PurchasePanel />
      </div>

      <section className={styles.productInformation}>
        <nav>
          <button className={styles.activeInfoTab} type="button">
            {t("Product Details", "उत्पाद विवरण")}
          </button>
          <button type="button">
            {t("Usage Guide", "उपयोग मार्गदर्शिका")}
          </button>
          <button type="button">{t("Specifications", "विशिष्टताएं")}</button>
          <button type="button">
            {t("Safety & Precautions", "सुरक्षा और सावधानियां")}
          </button>
          <button type="button">
            {t("Reviews (2.3K)", "समीक्षाएं (2.3K)")}
          </button>
        </nav>
        <div className={styles.productInfoGrid}>
          <article>
            <h2>{t("About this Product", "इस उत्पाद के बारे में")}</h2>
            <p>
              {t(
                "IFFCO Urea 46% N (Prilled) is a high-quality nitrogen fertiliser containing 46% nitrogen in amide form. It is 100% neem coated and BIS & FCO approved.",
                "इफको यूरिया 46% N (प्रिल्ड) एक उच्च गुणवत्ता वाला नाइट्रोजन उर्वरक है, जिसमें एमाइड रूप में 46% नाइट्रोजन होता है। यह 100% नीम लेपित और BIS व FCO अनुमोदित है।",
              )}
            </p>
          </article>
          <article className={styles.nutrientCard}>
            <h2>{t("Nutrient Content", "पोषक तत्व की मात्रा")}</h2>
            <dl>
              <div>
                <dt>{t("Nitrogen (N)", "नाइट्रोजन (N)")}</dt>
                <dd>46% ({t("Min", "न्यूनतम")})</dd>
              </div>
              <div>
                <dt>{t("Biuret (Max)", "बाययूरेट (अधिकतम)")}</dt>
                <dd>1.0%</dd>
              </div>
              <div>
                <dt>{t("Moisture (Max)", "नमी (अधिकतम)")}</dt>
                <dd>0.5%</dd>
              </div>
            </dl>
          </article>
          <article>
            <h2>{t("Benefits", "लाभ")}</h2>
            <ul className={styles.checkList}>
              <li>
                <Check size={15} />{" "}
                {t(
                  "Enhances green foliage and plant growth",
                  "हरी पत्तियों और पौधों की वृद्धि बढ़ाता है",
                )}
              </li>
              <li>
                <Check size={15} />{" "}
                {t(
                  "Improves tillering and branching",
                  "कल्ले और शाखाएं बढ़ाता है",
                )}
              </li>
              <li>
                <Check size={15} />{" "}
                {t(
                  "Increases yield and protein content",
                  "उपज और प्रोटीन की मात्रा बढ़ाता है",
                )}
              </li>
              <li>
                <Check size={15} />{" "}
                {t(
                  "Suitable for all irrigation and soil conditions",
                  "सभी सिंचाई और मिट्टी की स्थितियों के लिए उपयुक्त",
                )}
              </li>
            </ul>
          </article>
          <article>
            <h2>{t("Recommended Crops & Dose", "अनुशंसित फसलें और मात्रा")}</h2>
            <table>
              <thead>
                <tr>
                  <th>{t("Crop", "फसल")}</th>
                  <th>{t("Recommended Dose", "अनुशंसित मात्रा")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t("Paddy", "धान")}</td>
                  <td>{t("100–125 kg/acre", "100–125 किग्रा/एकड़")}</td>
                </tr>
                <tr>
                  <td>{t("Wheat", "गेहूं")}</td>
                  <td>{t("75–100 kg/acre", "75–100 किग्रा/एकड़")}</td>
                </tr>
                <tr>
                  <td>{t("Maize", "मक्का")}</td>
                  <td>{t("75–100 kg/acre", "75–100 किग्रा/एकड़")}</td>
                </tr>
                <tr>
                  <td>{t("Vegetables", "सब्जियां")}</td>
                  <td>{t("50–75 kg/acre", "50–75 किग्रा/एकड़")}</td>
                </tr>
              </tbody>
            </table>
          </article>
        </div>
      </section>

      <section className={styles.howToUse}>
        <SectionTitle>{t("How to Use", "उपयोग कैसे करें")}</SectionTitle>
        <div>
          <span>
            <Sprout size={27} />
            {t(
              "Broadcast uniformly in the field",
              "खेत में समान रूप से बिखेरें",
            )}
          </span>
          <span>
            <Leaf size={27} />
            {t(
              "Apply in early morning or evening",
              "सुबह जल्दी या शाम को डालें",
            )}
          </span>
          <span>
            <Droplets size={27} />
            {t(
              "Incorporate with irrigation",
              "सिंचाई के साथ मिट्टी में मिलाएं",
            )}
          </span>
          <span>
            <PackageCheck size={27} />
            {t(
              "Split dose for better results",
              "बेहतर परिणाम के लिए मात्रा बांटकर दें",
            )}
          </span>
        </div>
      </section>
      <section className={styles.certifications}>
        <SectionTitle>
          {t("Certifications & Approvals", "प्रमाणन और अनुमोदन")}
        </SectionTitle>
        <div>
          <span>
            <ShieldCheck size={28} />
            <b>
              FCO
              <small>
                {t("Fertiliser Control Order", "उर्वरक नियंत्रण आदेश")}
              </small>
            </b>
          </span>
          <span>
            <BadgeCheck size={28} />
            <b>
              BIS
              <small>
                {t("Bureau of Indian Standards", "भारतीय मानक ब्यूरो")}
              </small>
            </b>
          </span>
          <span>
            <Leaf size={28} />
            <b>
              {t("Neem Coated", "नीम लेपित")}
              <small>{t("Eco-friendly coating", "पर्यावरण-अनुकूल लेप")}</small>
            </b>
          </span>
          <span>
            <Truck size={28} />
            <b>
              IFFCO<small>{t("Trusted brand", "विश्वसनीय ब्रांड")}</small>
            </b>
          </span>
        </div>
      </section>

      <SectionTitle>
        {t("You may also like", "आपको ये भी पसंद आ सकते हैं")}
      </SectionTitle>
      <div className={styles.topPicks}>
        {marketplaceProducts.slice(1, 5).map((item) => (
          <ProductCard product={item} key={item.slug} />
        ))}
      </div>
    </div>
  );
}
