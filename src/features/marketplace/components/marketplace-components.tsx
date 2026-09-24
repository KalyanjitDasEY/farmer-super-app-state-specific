"use client";

import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  BadgeCheck,
  ChevronRight,
  Headphones,
  Heart,
  Home,
  Leaf,
  MessageCircleMore,
  PackageCheck,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Sprout,
  Star,
  Store,
  Tags,
  Truck,
} from "lucide-react";

import {
  productFormLabels,
  productStockLabels,
  type MarketplaceProduct,
} from "@/features/marketplace/data/marketplace-data";
import { useLocale } from "@/i18n/LocaleProvider";

import { AddToCartButton } from "./marketplace-interactions";
import styles from "./marketplace.module.css";

const sidebarItems = [
  { label: "Marketplace Home", href: "/marketplace", icon: Home, exact: true },
  { label: "My Orders", href: "/marketplace/orders", icon: PackageCheck },
  { label: "My Cart", href: "/marketplace/cart", icon: ShoppingCart, count: 4 },
  { label: "Wish List", href: "/marketplace/search", icon: Heart },
  { label: "Offers & Deals", href: "/marketplace#offers", icon: Tags },
  { label: "Input Advisory", href: "/more#help", icon: Sparkles },
  { label: "Compare Products", href: "/marketplace/compare", icon: Scale },
  {
    label: "Credible Partners",
    href: "/marketplace#partners",
    icon: BadgeCheck,
  },
] as const;

export function MarketplaceSidebar({ active }: { active: string }) {
  const { t } = useLocale();
  return (
    <aside className={styles.marketSidebar}>
      <nav aria-label={t("Marketplace", "मार्केटप्लेस")}>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              className={active === item.label ? styles.sidebarActive : ""}
              href={item.href}
              key={item.label}
            >
              <Icon size={19} />
              <span>
                {t(
                  item.label,
                  {
                    "Marketplace Home": "मार्केटप्लेस होम",
                    "My Orders": "मेरे ऑर्डर",
                    "My Cart": "मेरी कार्ट",
                    "Wish List": "इच्छा सूची",
                    "Offers & Deals": "ऑफ़र और डील",
                    "Input Advisory": "इनपुट सलाह",
                    "Compare Products": "उत्पादों की तुलना",
                    "Credible Partners": "विश्वसनीय भागीदार",
                  }[item.label],
                )}
              </span>
              {"count" in item ? <b>{item.count}</b> : null}
            </Link>
          );
        })}
      </nav>
      <div className={styles.helpCard}>
        <Headphones size={25} />
        <strong>{t("Need Help?", "मदद चाहिए?")}</strong>
        <small>
          {t("Talk to our agri experts", "हमारे कृषि विशेषज्ञों से बात करें")}
        </small>
        <Link href="/more#help">
          {t("Contact Now", "अभी संपर्क करें")} <ChevronRight size={15} />
        </Link>
      </div>
    </aside>
  );
}

export function MarketplacePage({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.marketLayout}>
      <MarketplaceSidebar active={active} />
      <div className={styles.marketContent}>{children}</div>
    </div>
  );
}

export function MarketplaceTitle({
  title,
  subtitle,
  action,
  backHref,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  backHref?: string;
}) {
  const { t } = useLocale();
  return (
    <header className={styles.marketTitle}>
      <div>
        {backHref ? (
          <Link className={styles.backLink} href={backHref}>
            ← {t("Back", "वापस")}
          </Link>
        ) : null}
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {action ? <div className={styles.titleActions}>{action}</div> : null}
    </header>
  );
}

export function ProductCard({ product }: { product: MarketplaceProduct }) {
  const { t } = useLocale();
  const productName = t(product.name);
  return (
    <article className={styles.productCard}>
      {product.badge ? (
        <span className={styles.productBadge}>{t(product.badge)}</span>
      ) : null}
      <button
        className={styles.heartButton}
        aria-label={t(`Save ${productName}`, `${productName} सहेजें`)}
        type="button"
      >
        <Heart size={18} />
      </button>
      <Link
        className={styles.productImage}
        href="/marketplace/products/iffco-urea"
      >
        <Image
          src={product.image}
          alt={productName}
          fill
          sizes="(max-width: 640px) 45vw, 180px"
        />
      </Link>
      <Link
        className={styles.productName}
        href="/marketplace/products/iffco-urea"
      >
        {t(product.shortName)}
      </Link>
      <p>
        {t(productFormLabels[product.form])} ·{" "}
        {t(
          product.packSize,
          product.packSize.replace("kg", "किग्रा").replace("ml", "मि.ली."),
        )}
      </p>
      <div className={styles.rating}>
        <Star size={14} fill="currentColor" /> {product.rating}{" "}
        <span>({product.reviews})</span>
      </div>
      <div className={styles.productPrice}>
        ₹{product.price}{" "}
        <small>
          / {product.form === "Liquid" ? t("bottle", "बोतल") : t("bag", "बैग")}
        </small>{" "}
        <del>₹{product.mrp}</del>
      </div>
      <strong
        className={
          product.stock === "Limited Stock" ? styles.limited : styles.inStock
        }
      >
        {t(productStockLabels[product.stock])}
      </strong>
      <small className={styles.seller}>
        {t("Seller", "विक्रेता")}: {product.seller}
      </small>
      <small className={styles.delivery}>
        <Truck size={13} /> {t("Delivery by", "डिलीवरी की तारीख")}{" "}
        {t(product.delivery)}
      </small>
      <AddToCartButton />
    </article>
  );
}

const trustItems = [
  { title: "100% Authentic", detail: "Government approved", icon: ShieldCheck },
  {
    title: "Quality Assured",
    detail: "Lab tested & certified",
    icon: BadgeCheck,
  },
  {
    title: "Safe Packaging",
    detail: "Damage-proof delivery",
    icon: PackageCheck,
  },
  { title: "Timely Delivery", detail: "Fast & reliable", icon: Truck },
  { title: "Easy Returns", detail: "7-day easy return", icon: Sparkles },
] as const;

export function MarketplaceTrustStrip({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { t } = useLocale();
  return (
    <section
      className={`${styles.trustStrip} ${compact ? styles.trustCompact : ""}`}
      aria-label={t("Marketplace guarantees", "मार्केटप्लेस की गारंटी")}
    >
      {trustItems.map(({ title, detail, icon: Icon }) => (
        <div key={title}>
          <Icon size={compact ? 19 : 24} />
          <span>
            <strong>
              {t(
                title,
                {
                  "100% Authentic": "100% असली",
                  "Quality Assured": "गुणवत्ता सुनिश्चित",
                  "Safe Packaging": "सुरक्षित पैकेजिंग",
                  "Timely Delivery": "समय पर डिलीवरी",
                  "Easy Returns": "आसान वापसी",
                }[title],
              )}
            </strong>
            <small>
              {t(
                detail,
                {
                  "Government approved": "सरकार द्वारा अनुमोदित",
                  "Lab tested & certified": "प्रयोगशाला में जांचा और प्रमाणित",
                  "Damage-proof delivery": "क्षति-रोधी डिलीवरी",
                  "Fast & reliable": "तेज़ और भरोसेमंद",
                  "7-day easy return": "7 दिन में आसान वापसी",
                }[detail],
              )}
            </small>
          </span>
        </div>
      ))}
    </section>
  );
}

export function ContextStrip() {
  const { t } = useLocale();
  return (
    <section className={styles.contextStrip}>
      <div>
        <Home size={22} />
        <span>
          <small>{t("Farm", "फार्म")}</small>
          <strong>{t("Ram Prasad Farm", "राम प्रसाद फार्म")}</strong>
          <em>{t("Field 1", "खेत 1")}</em>
        </span>
      </div>
      <div>
        <Store size={22} />
        <span>
          <small>{t("Location", "स्थान")}</small>
          <strong>{t("Raipur, Deoria", "रायपुर, देवरिया")}</strong>
          <em>{t("Uttar Pradesh", "उत्तर प्रदेश")}</em>
        </span>
      </div>
      <div>
        <Sprout size={22} />
        <span>
          <small>{t("Crop", "फसल")}</small>
          <strong>{t("Paddy (Dhan)", "धान")}</strong>
          <em>{t("Tillering Stage", "कल्ले निकलने की अवस्था")}</em>
        </span>
      </div>
      <div>
        <Leaf size={22} />
        <span>
          <small>{t("Season", "मौसम")}</small>
          <strong>{t("Kharif 2024", "खरीफ 2024")}</strong>
          <em>{t("Current season", "वर्तमान मौसम")}</em>
        </span>
      </div>
    </section>
  );
}

export function PriceSummary({ checkout = false }: { checkout?: boolean }) {
  const { t } = useLocale();
  return (
    <section className={styles.summaryCard}>
      <h2>
        {checkout
          ? t("Order Summary", "ऑर्डर सारांश")
          : t("Price Details", "मूल्य विवरण")}
      </h2>
      <dl>
        <div>
          <dt>{t("Subtotal (4 items)", "उप-योग (4 आइटम)")}</dt>
          <dd>₹1,595</dd>
        </div>
        <div>
          <dt>{t("Discount on MRP", "MRP पर छूट")}</dt>
          <dd className={styles.saving}>− ₹92</dd>
        </div>
        <div>
          <dt>{t("Shipping Charges", "शिपिंग शुल्क")}</dt>
          <dd className={styles.saving}>{t("FREE", "मुफ़्त")}</dd>
        </div>
        <div>
          <dt>{t("Handling Charges", "हैंडलिंग शुल्क")}</dt>
          <dd>₹25</dd>
        </div>
      </dl>
      <div className={styles.totalSaving}>
        <Tags size={17} /> {t("Total Savings", "कुल बचत")} <strong>₹92</strong>
      </div>
      <div className={styles.totalPayable}>
        <span>
          {t("Total Payable", "कुल देय")}
          <small>{t("Inclusive of all taxes", "सभी करों सहित")}</small>
        </span>
        <strong>₹1,528</strong>
      </div>
    </section>
  );
}

export function SectionTitle({
  children,
  href,
  linkLabel = "View all",
}: {
  children: React.ReactNode;
  href?: string;
  linkLabel?: string;
}) {
  const { t } = useLocale();
  return (
    <div className={styles.sectionTitle}>
      <h2>{children}</h2>
      {href ? (
        <Link href={href}>
          {linkLabel === "View all" ? t("View all", "सभी देखें") : linkLabel}{" "}
          <ChevronRight size={17} />
        </Link>
      ) : null}
    </div>
  );
}

export function AdviceBanner() {
  const { t } = useLocale();
  return (
    <section className={styles.adviceBanner}>
      <MessageCircleMore size={25} />
      <div>
        <strong>
          {t(
            "Need help choosing the right input?",
            "सही इनपुट चुनने में मदद चाहिए?",
          )}
        </strong>
        <small>
          {t(
            "Ask Bharati or connect with our agri experts for the best recommendation.",
            "सर्वोत्तम सुझाव के लिए भारती से पूछें या हमारे कृषि विशेषज्ञों से जुड़ें।",
          )}
        </small>
      </div>
      <Link href="/more#help">{t("Ask Bharati", "भारती से पूछें")}</Link>
      <Link href="/more#help">
        {t("Talk to Expert", "विशेषज्ञ से बात करें")}
      </Link>
    </section>
  );
}
