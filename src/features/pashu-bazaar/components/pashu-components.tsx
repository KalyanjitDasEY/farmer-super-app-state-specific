"use client";

import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  ArrowLeft,
  Beef,
  Bell,
  ChevronDown,
  ChevronRight,
  Heart,
  MapPin,
  MessageCircleMore,
  Phone,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";

import type { AnimalListing } from "@/features/pashu-bazaar/data/pashu-data";
import { useLocale } from "@/i18n/LocaleProvider";
import type { LocalizedText } from "@/i18n/localized-text";

import styles from "./pashu-bazaar.module.css";

export function PashuHeader({
  backHref,
  role = "Buyer",
}: {
  backHref?: string;
  role?: "Buyer" | "Seller";
}) {
  const { t } = useLocale();

  return (
    <header className={styles.moduleHeader}>
      <div className={styles.pashuBrand}>
        {backHref ? (
          <Link href={backHref} aria-label={t("Go back", "वापस जाएँ")}>
            <ArrowLeft size={26} />
          </Link>
        ) : null}
        <Link
          href="/pashu-bazaar"
          aria-label={t("Pashu Bazaar home", "पशु बाज़ार होम")}
        >
          <span className={styles.brandMark}>
            <Beef size={29} />
          </span>
          <span>
            <strong>Bihar Kisan</strong>
            <strong>SUVIDHA</strong>
            <small>{t("Pashu Bazaar", "पशु बाज़ार")}</small>
          </span>
        </Link>
      </div>
      <button className={styles.farmSelector} type="button">
        <MapPin size={22} />
        <span>
          <strong>Ram Prasad Farm</strong>
          <small>
            {t("Amhara, Bihta, Patna, Bihar", "अमहरा, बिहटा, पटना, बिहार")}
          </small>
        </span>
        <ChevronDown size={18} />
      </button>
      <div className={styles.headerActions}>
        <Link className={styles.askButton} href="/more#help">
          <MessageCircleMore size={18} />
          {t("Ask Krishi Mitra", "कृषि मित्र से पूछें")}
        </Link>
        <Link
          className={styles.notification}
          href="/home"
          aria-label={t("Notifications", "सूचनाएँ")}
        >
          <Bell size={23} />
          <b>3</b>
        </Link>
        <Link className={styles.profileLink} href="/profile">
          <Image
            src="/images/authenticated/profile-avatar.jpg"
            alt=""
            width={38}
            height={38}
          />
          <span>
            <strong>Ramesh Kumar</strong>
            <small>
              {role === "Buyer"
                ? t("Buyer", "खरीदार")
                : t("Seller", "विक्रेता")}
            </small>
          </span>
          <ChevronDown size={17} />
        </Link>
      </div>
    </header>
  );
}

export function PashuBreadcrumb({
  items,
}: {
  items: readonly (LocalizedText | string)[];
}) {
  const { t } = useLocale();

  return (
    <nav
      className={styles.breadcrumb}
      aria-label={t("Breadcrumb", "ब्रेडक्रंब")}
    >
      <Link href="/pashu-bazaar">{t("Pashu Bazaar", "पशु बाज़ार")}</Link>
      {items.map((item) => (
        <span key={t(item)}>
          <ChevronRight size={14} />
          {t(item)}
        </span>
      ))}
    </nav>
  );
}

export function AnimalCard({ animal }: { animal: AnimalListing }) {
  const { t } = useLocale();
  const animalName = t(animal.name);

  return (
    <article className={styles.animalCard}>
      <Link className={styles.animalImage} href="/pashu-bazaar/animals/hf-cow">
        <Image
          src={animal.image}
          alt={animalName}
          fill
          sizes="(max-width: 720px) 46vw, 220px"
        />
      </Link>
      <button
        className={styles.favoriteButton}
        type="button"
        aria-label={t(`Save ${animalName}`, `${animalName} सहेजें`)}
      >
        <Heart size={19} />
      </button>
      <div className={styles.animalSummary}>
        <h2>
          {animalName}
          <span>{t(animal.category)}</span>
        </h2>
        <p>
          <b>{t("Age:", "आयु:")}</b> {t(animal.age)}
        </p>
        <p>
          <b>
            {animal.category.en === "Milking"
              ? t("Milk:", "दूध:")
              : t("Weight:", "वज़न:")}
          </b>{" "}
          {t(animal.production)}
        </p>
        <p>{t(animal.extra)}</p>
        <strong className={styles.price}>{animal.price}</strong>
        <small>
          <UserRound size={14} />
          {animal.seller}
        </small>
        <small className={styles.rating}>
          <Star size={14} fill="currentColor" />
          {animal.rating} ({animal.reviews})
        </small>
      </div>
      <div className={styles.cardActions}>
        <Link
          href="/pashu-bazaar/animals/hf-cow/enquiry"
          aria-label={t(
            `Call about ${animalName}`,
            `${animalName} के बारे में कॉल करें`,
          )}
        >
          <Phone size={17} />
        </Link>
        <Link
          href="/pashu-bazaar/animals/hf-cow/enquiry"
          aria-label={t(
            `Message about ${animalName}`,
            `${animalName} के बारे में संदेश भेजें`,
          )}
        >
          <MessageCircleMore size={17} />
        </Link>
        <label>
          <input type="checkbox" />
          {t("Compare", "तुलना करें")}
        </label>
      </div>
    </article>
  );
}

export function SellerCard({ compact = false }: { compact?: boolean }) {
  const { t } = useLocale();

  return (
    <article
      className={`${styles.sellerCard} ${compact ? styles.sellerCompact : ""}`}
    >
      <div className={styles.sellerIdentity}>
        <Image
          src="/images/authenticated/profile-avatar.jpg"
          alt={t("Krishna Dairy Farm seller", "Krishna Dairy Farm विक्रेता")}
          width={48}
          height={48}
        />
        <span>
          <h2>Krishna Dairy Farm</h2>
          <small>
            <ShieldCheck size={14} />
            {t("Demo Seller", "डेमो विक्रेता")}
          </small>
        </span>
      </div>
      <p>
        <Star size={17} fill="currentColor" />
        <b>4.6</b> ★★★★★ <span>(128)</span>
      </p>
      <p>
        <MapPin size={17} />
        {t("Bihta, Patna, Bihar", "बिहटा, पटना, बिहार")}
        <br />
        {t("12 km from your location", "आपके स्थान से 12 किमी")}
      </p>
      <div className={styles.sellerStats}>
        <span>
          <b>128+</b>
          {t("Animals Sold", "पशु बेचे गए")}
        </span>
        <span>
          <b>98%</b>
          {t("Positive Feedback", "सकारात्मक प्रतिक्रिया")}
        </span>
        <span>
          <b>{t("2.5 Years", "2.5 वर्ष")}</b>
          {t("On Bihar Kisan Suvidha", "बिहार किसान सुविधा पर")}
        </span>
      </div>
      <Link href="/pashu-bazaar/listings">
        {t("View Seller Profile", "विक्रेता प्रोफ़ाइल देखें")}
      </Link>
      <Link href="/pashu-bazaar/animals/hf-cow/enquiry">
        <MessageCircleMore size={17} />
        {t("Chat with Seller", "विक्रेता से चैट करें")}
      </Link>
    </article>
  );
}

export function TrustStrip() {
  const { t } = useLocale();

  return (
    <aside className={styles.trustStrip}>
      <div>
        <ShieldCheck size={25} />
        <span>
          <strong>{t("Sample Listings", "नमूना सूचियां")}</strong>
          <small>
            {t(
              "Confirm health records with the seller.",
              "स्वास्थ्य रिकॉर्ड की पुष्टि विक्रेता से करें।",
            )}
          </small>
        </span>
      </div>
      <div>
        <ShieldCheck size={25} />
        <span>
          <strong>{t("Discuss Payment", "भुगतान पर चर्चा करें")}</strong>
          <small>
            {t(
              "Agree on terms directly with the seller.",
              "शर्तें सीधे विक्रेता से तय करें।",
            )}
          </small>
        </span>
      </div>
      <div>
        <ShieldCheck size={25} />
        <span>
          <strong>{t("Before You Buy", "खरीदने से पहले")}</strong>
          <small>
            {t(
              "Inspect the animal and confirm the terms.",
              "पशु देखें और शर्तों की पुष्टि करें।",
            )}
          </small>
        </span>
      </div>
      <div>
        <MessageCircleMore size={25} />
        <span>
          <strong>{t("Animal Care", "पशु देखभाल")}</strong>
          <small>
            {t(
              "Ask a local vet for health advice.",
              "स्वास्थ्य सलाह के लिए स्थानीय पशु चिकित्सक से पूछें।",
            )}
          </small>
        </span>
      </div>
    </aside>
  );
}
