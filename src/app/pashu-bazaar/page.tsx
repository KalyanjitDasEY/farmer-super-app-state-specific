import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  ArrowRight,
  BadgeIndianRupee,
  BarChart3,
  Beef,
  BriefcaseBusiness,
  ClipboardList,
  Heart,
  Headphones,
  MapPin,
  MessageCircleMore,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Tags,
  Truck,
} from "lucide-react";

import {
  AnimalCard,
  PashuHeader,
  TrustStrip,
} from "@/features/pashu-bazaar/components/pashu-components";
import styles from "@/features/pashu-bazaar/components/pashu-bazaar.module.css";
import {
  animalCategories,
  animals,
} from "@/features/pashu-bazaar/data/pashu-data";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

const shortcuts = [
  {
    label: localized("Saved Animals", "सहेजे गए पशु"),
    icon: Heart,
    count: "12",
    href: "/pashu-bazaar/animals",
  },
  {
    label: localized("My Enquiries", "मेरी पूछताछ"),
    icon: MessageCircleMore,
    count: "5",
    href: "/pashu-bazaar/animals/hf-cow/enquiry",
  },
  {
    label: localized("My Listings", "मेरी लिस्टिंग"),
    icon: ClipboardList,
    count: "3",
    href: "/pashu-bazaar/listings",
  },
  {
    label: localized("My Purchases", "मेरी खरीद"),
    icon: ShoppingBag,
    href: "/pashu-bazaar/transactions/hf-cow",
  },
  {
    label: localized("My Sales", "मेरी बिक्री"),
    icon: BadgeIndianRupee,
    href: "/pashu-bazaar/transactions/hf-cow",
  },
  {
    label: localized("Price Trends", "मूल्य रुझान"),
    icon: BarChart3,
    href: "/pashu-bazaar/animals",
  },
  {
    label: localized("Transport", "परिवहन"),
    icon: Truck,
    href: "/pashu-bazaar/animals",
  },
  {
    label: localized("Help & Support", "मदद और सहायता"),
    icon: Headphones,
    href: "/more#help",
  },
] as const;

export default async function PashuBazaarPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <div className={styles.stack}>
      <PashuHeader />

      <section className={styles.marketHero}>
        <div className={styles.heroCopy}>
          <h1>
            {t("Pashu Bazaar", "पशु बाज़ार")} <ShieldCheck size={27} />
          </h1>
          <p>
            {t(
              "Trusted livestock marketplace for healthy animals and fair deals",
              "स्वस्थ पशुओं और उचित सौदों के लिए भरोसेमंद पशुधन बाज़ार",
            )}
          </p>
          <div className={styles.heroPromises}>
            <span>
              <ShieldCheck size={20} />
              {t("Demo Animal Listings", "डेमो पशु लिस्टिंग")}
            </span>
            <span>
              <BriefcaseBusiness size={20} />
              {t("Trusted Sellers", "भरोसेमंद विक्रेता")}
            </span>
            <span>
              <Tags size={20} />
              {t("Fair Prices", "उचित मूल्य")}
            </span>
            <span>
              <PackageCheck size={20} />
              {t("Safe Deals", "सुरक्षित सौदे")}
            </span>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/images/authenticated/pashu-bazaar/cattle-hero.jpg"
            alt={t("Cow and calf", "गाय और बछड़ा")}
            fill
            loading="eager"
            sizes="(max-width: 720px) 100vw, 60vw"
          />
        </div>
      </section>

      <section className={styles.marketActions}>
        <article className={styles.marketAction}>
          <div>
            <h2>{t("Buy Animal", "पशु खरीदें")}</h2>
            <p>
              {t(
                "Explore illustrative animal listings; confirm details with sellers",
                "सांकेतिक पशु लिस्टिंग देखें; विवरण विक्रेता से जांचें",
              )}
            </p>
            <Link href="/pashu-bazaar/animals">
              {t("Browse Animals", "पशु देखें")}
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className={styles.marketActionImage}>
            <Image
              src="/images/authenticated/pashu-bazaar/buy-animals.jpg"
              alt={t("Cow and calf", "गाय और बछड़ा")}
              fill
              sizes="240px"
            />
          </div>
        </article>
        <article className={styles.marketAction}>
          <div>
            <h2>{t("Sell Animal", "पशु बेचें")}</h2>
            <p>
              {t(
                "List your animals and reach genuine buyers",
                "अपने पशु सूचीबद्ध करें और वास्तविक खरीदारों तक पहुँचें",
              )}
            </p>
            <Link href="/pashu-bazaar/listings/new">
              {t("List Your Animal", "अपना पशु सूचीबद्ध करें")}
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className={styles.marketActionImage}>
            <Image
              src="/images/authenticated/pashu-bazaar/sell-goat.jpg"
              alt={t("Goat for sale", "बिक्री के लिए बकरी")}
              fill
              sizes="240px"
            />
          </div>
        </article>
      </section>

      <nav
        className={styles.shortcutGrid}
        aria-label={t("Pashu Bazaar shortcuts", "पशु बाज़ार शॉर्टकट")}
      >
        {shortcuts.map((shortcut) => {
          const Icon = shortcut.icon;
          return (
            <Link href={shortcut.href} key={t(shortcut.label)}>
              <Icon size={24} />
              {t(shortcut.label)}
              {"count" in shortcut ? <b>{shortcut.count}</b> : null}
            </Link>
          );
        })}
      </nav>

      <section>
        <div className={styles.sectionTitle}>
          <h2>
            {t("Nearby Animals", "आस-पास के पशु")}{" "}
            <p>
              <MapPin size={15} />
              {t("Within 25 km", "25 किमी के भीतर")}
            </p>
          </h2>
          <Link href="/pashu-bazaar/animals">
            {t("View All", "सभी देखें")}
            <ArrowRight size={17} />
          </Link>
        </div>
        <div className={styles.nearbyGrid}>
          {animals.slice(0, 4).map((animal) => (
            <AnimalCard animal={animal} key={animal.slug} />
          ))}
        </div>
      </section>

      <section className={styles.marketInfoGrid}>
        <article className={styles.infoPanel}>
          <div className={styles.sectionTitle}>
            <h2>{t("Livestock Categories", "पशुधन श्रेणियाँ")}</h2>
            <Link href="/pashu-bazaar/animals">
              {t("View All", "सभी देखें")}
            </Link>
          </div>
          <div className={styles.categoryCircles}>
            {animalCategories.map((category) => (
              <Link
                className={styles.categoryCircle}
                href="/pashu-bazaar/animals"
                key={category.name}
              >
                <span>
                  <Image src={category.image} alt="" fill sizes="60px" />
                </span>
                <strong>{t(category.label)}</strong>
                <small>{category.count}</small>
              </Link>
            ))}
          </div>
        </article>
        <article className={styles.infoPanel}>
          <div className={styles.sectionTitle}>
            <h2>{t("Popular Breeds", "लोकप्रिय नस्लें")}</h2>
            <Link href="/pashu-bazaar/animals">
              {t("View All", "सभी देखें")}
            </Link>
          </div>
          <div className={styles.breedPills}>
            {[
              "HF",
              "Sahiwal",
              "Murrah",
              "Beetal",
              "Jamunapari",
              "Kadaknath",
            ].map((breed) => (
              <Link href="/pashu-bazaar/animals" key={breed}>
                <Beef size={16} />
                {breed}
              </Link>
            ))}
          </div>
        </article>
      </section>

      <TrustStrip />

      <section className={styles.dualBanners}>
        <article className={styles.helpBanner}>
          <h2>{t("Looking for the right animal?", "सही पशु खोज रहे हैं?")}</h2>
          <p>
            {t(
              "Ask Krishi Mitra for breed, feeding and health advice.",
              "नस्ल, आहार और स्वास्थ्य सलाह के लिए कृषि मित्र से पूछें।",
            )}
          </p>
          <Link href="/more#help">
            {t("Ask Krishi Mitra", "कृषि मित्र से पूछें")}
            <ArrowRight size={17} />
          </Link>
        </article>
        <article className={styles.tipsPanel}>
          <h2>{t("Safe Trade Tips", "सुरक्षित व्यापार सुझाव")}</h2>
          <ul className={styles.checkList}>
            <li>
              <ShieldCheck size={16} />
              {t(
                "Meet seller and verify animal physically",
                "विक्रेता से मिलें और पशु का प्रत्यक्ष सत्यापन करें",
              )}
            </li>
            <li>
              <ShieldCheck size={16} />
              {t(
                "Check age, weight and health of animal",
                "पशु की आयु, वज़न और स्वास्थ्य जाँचें",
              )}
            </li>
            <li>
              <ShieldCheck size={16} />
              {t(
                "Use secure payments only",
                "केवल सुरक्षित भुगतान का उपयोग करें",
              )}
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
