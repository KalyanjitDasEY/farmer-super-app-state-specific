import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CloudSun,
  Droplets,
  FlaskConical,
  Leaf,
  PackageCheck,
  ShieldCheck,
  ShoppingBasket,
  Sprout,
  SprayCan,
  Tractor,
  Truck,
  Wheat,
} from "lucide-react";

import {
  MarketplacePage,
  MarketplaceTrustStrip,
  ProductCard,
  SectionTitle,
} from "@/features/marketplace/components/marketplace-components";
import styles from "@/features/marketplace/components/marketplace.module.css";
import {
  marketplaceCategories,
  marketplaceProducts,
} from "@/features/marketplace/data/marketplace-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Krishi Input Marketplace", "कृषि इनपुट मार्केटप्लेस") };
}

const categoryIcons = [
  Wheat,
  FlaskConical,
  SprayCan,
  Leaf,
  Sprout,
  Droplets,
  PackageCheck,
  Tractor,
  ShoppingBasket,
  Boxes,
];

export default async function MarketplaceHomePage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <MarketplacePage active="Marketplace Home">
      <section className={styles.marketHero}>
        <div className={styles.heroCopy}>
          <h1>{t("Krishi Input Marketplace", "कृषि इनपुट मार्केटप्लेस")}</h1>
          <p>
            {t(
              "Approved inputs. Right quality. Right price. Right time.",
              "अनुमोदित इनपुट। सही गुणवत्ता। सही कीमत। सही समय।",
            )}
          </p>
          <div className={styles.heroBenefits}>
            <span>
              <ShieldCheck size={21} />
              <b>
                {t("100% Authentic", "100% असली")}
                <small>
                  {t("Government-approved", "सरकार द्वारा अनुमोदित")}
                </small>
              </b>
            </span>
            <span>
              <BadgeCheck size={21} />
              <b>
                {t("Best Prices", "सर्वोत्तम मूल्य")}
                <small>
                  {t("From trusted sellers", "विश्वसनीय विक्रेताओं से")}
                </small>
              </b>
            </span>
            <span>
              <Truck size={21} />
              <b>
                {t("Timely Delivery", "समय पर डिलीवरी")}
                <small>{t("Fast & safe", "तेज़ और सुरक्षित")}</small>
              </b>
            </span>
          </div>
        </div>
        <Image
          className={styles.heroFarmer}
          src="/images/authenticated/marketplace/hero-farmer.png"
          alt={t("Farmer in a field", "खेत में किसान")}
          width={223}
          height={228}
          priority
        />
      </section>

      <section className={styles.weatherStrip}>
        <div>
          <strong>{t("Weather at Your Farm", "आपके फार्म का मौसम")}</strong>
          <small>
            {t(
              "Raipur, Deoria, Uttar Pradesh",
              "रायपुर, देवरिया, उत्तर प्रदेश",
            )}
          </small>
        </div>
        <div className={styles.temperature}>
          <b>32°C</b>
          <CloudSun size={48} />
          <span>{t("Partly Cloudy", "आंशिक रूप से बादल")}</span>
        </div>
        <dl>
          <div>
            <dt>{t("Rainfall", "वर्षा")}</dt>
            <dd>{t("0.0 mm", "0.0 मिमी")}</dd>
          </div>
          <div>
            <dt>{t("Humidity", "आर्द्रता")}</dt>
            <dd>68%</dd>
          </div>
          <div>
            <dt>{t("Wind", "हवा")}</dt>
            <dd>{t("12 km/h", "12 किमी/घं.")}</dd>
          </div>
        </dl>
        <div>
          <strong>{t("Agro Advisory", "कृषि सलाह")}</strong>
          <small>
            {t(
              "Light rain expected after 4 PM.",
              "शाम 4 बजे के बाद हल्की बारिश की संभावना है।",
            )}
          </small>
          <Link href="/advisories">
            {t("View Details", "विवरण देखें")} <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <SectionTitle
        href="/marketplace/search"
        linkLabel={t("View All Categories", "सभी श्रेणियां देखें")}
      >
        {t("Shop by Category", "श्रेणी के अनुसार खरीदें")}
      </SectionTitle>
      <div className={styles.categoryGrid}>
        {marketplaceCategories.map((category, index) => {
          const Icon = categoryIcons[index] ?? ShoppingBasket;
          return (
            <Link
              className={styles.categoryCard}
              href={`/marketplace/search?category=${encodeURIComponent(category.name.en)}`}
              key={category.name.en}
            >
              <span
                className={`${styles.categoryIcon} ${styles[category.tone]}`}
              >
                <Icon size={38} />
              </span>
              <strong>{t(category.name)}</strong>
              <p>{t(category.detail)}</p>
              <b>
                {t("Shop Now", "अभी खरीदें")} <ArrowRight size={14} />
              </b>
            </Link>
          );
        })}
      </div>

      <section className={styles.offerGrid} id="offers">
        <article>
          <div>
            <strong>{t("Pre-Season Offer", "प्री-सीज़न ऑफ़र")}</strong>
            <span>{t("Up to 20% OFF", "20% तक की छूट")}</span>
            <Link href="/marketplace/search">
              {t("Shop Offers", "ऑफ़र खरीदें")}
            </Link>
          </div>
          <Wheat size={66} />
        </article>
        <article>
          <div>
            <strong>{t("Combo Deals", "कॉम्बो डील")}</strong>
            <span>
              {t(
                "Save more with special combos",
                "विशेष कॉम्बो से अधिक बचत करें",
              )}
            </span>
            <Link href="/marketplace/search">
              {t("View Combos", "कॉम्बो देखें")}
            </Link>
          </div>
          <ShoppingBasket size={66} />
        </article>
        <article>
          <div>
            <strong>{t("Bulk Orders", "थोक ऑर्डर")}</strong>
            <span>
              {t(
                "Best prices for large orders",
                "बड़े ऑर्डर के लिए सर्वोत्तम मूल्य",
              )}
            </span>
            <Link href="/more#help">{t("Request Quote", "भाव मांगें")}</Link>
          </div>
          <Boxes size={66} />
        </article>
      </section>

      <MarketplaceTrustStrip />

      <section className={styles.partnerPanel} id="partners">
        <SectionTitle>
          {t("Our Trusted Partners", "हमारे विश्वसनीय भागीदार")}
        </SectionTitle>
        <div>
          <strong>IFFCO</strong>
          <strong>Coromandel</strong>
          <strong>BAYER</strong>
          <strong>UPL</strong>
          <strong>RALLIS</strong>
          <strong>NUZIVEEDU</strong>
        </div>
      </section>

      <SectionTitle href="/marketplace/search">
        {t("Top Picks for You", "आपके लिए बेहतरीन विकल्प")}
      </SectionTitle>
      <div className={styles.topPicks}>
        {marketplaceProducts.slice(0, 5).map((product) => (
          <ProductCard product={product} key={product.slug} />
        ))}
      </div>

      <section className={styles.buyRightBanner}>
        <Sprout size={28} />
        <div>
          <strong>
            {t(
              "Buy Right. Use Right. Get Best Results.",
              "सही खरीदें। सही उपयोग करें। सर्वोत्तम परिणाम पाएं।",
            )}
          </strong>
          <small>
            {t(
              "Always follow label instructions and consult an advisory before use.",
              "हमेशा लेबल के निर्देशों का पालन करें और उपयोग से पहले सलाह लें।",
            )}
          </small>
        </div>
        <Link href="/more#help">{t("Input Advisory", "इनपुट सलाह")}</Link>
        <Link href="/more#help">{t("Ask Expert", "विशेषज्ञ से पूछें")}</Link>
      </section>
    </MarketplacePage>
  );
}
