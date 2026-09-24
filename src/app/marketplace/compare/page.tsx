import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import { Check, Scale, Share2, ShoppingCart, Star } from "lucide-react";

import {
  MarketplacePage,
  MarketplaceTitle,
} from "@/features/marketplace/components/marketplace-components";
import styles from "@/features/marketplace/components/marketplace.module.css";
import {
  comparisonRows,
  marketplaceProducts,
  productFormLabels,
  productStockLabels,
} from "@/features/marketplace/data/marketplace-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Compare Products", "उत्पादों की तुलना") };
}

export default async function CompareProductsPage() {
  const t = createTranslator(await getRequestLocale());
  const products = marketplaceProducts.slice(0, 4);
  return (
    <MarketplacePage active="Compare Products">
      <MarketplaceTitle
        title={t("Product Comparison", "उत्पाद तुलना")}
        subtitle={t(
          "Compare products side by side and choose the best for your crop.",
          "उत्पादों की साथ-साथ तुलना करें और अपनी फसल के लिए सर्वोत्तम चुनें।",
        )}
        backHref="/marketplace/search"
        action={
          <>
            <button className={styles.outlineButton} type="button">
              {t("Clear All", "सभी हटाएं")}
            </button>
            <button className={styles.outlineButton} type="button">
              <Share2 size={17} /> {t("Share Comparison", "तुलना साझा करें")}
            </button>
          </>
        }
      />
      <div className={styles.comparisonScroll}>
        <div className={styles.comparisonGrid}>
          <div className={styles.comparisonLabel}>
            <strong>{t("Products", "उत्पाद")}</strong>
            <span>{t("4 items selected", "4 आइटम चुने गए")}</span>
            <Link href="/marketplace/search">
              {t("Add / Remove", "जोड़ें / हटाएं")}
            </Link>
          </div>
          {products.map((product) => (
            <article className={styles.comparisonProduct} key={product.slug}>
              <div>
                <Image
                  src={product.image}
                  alt={t(product.name)}
                  fill
                  sizes="150px"
                />
              </div>
              <strong>{t(product.shortName)}</strong>
              <span>
                {t(productFormLabels[product.form])} ·{" "}
                {t(
                  product.packSize,
                  product.packSize
                    .replace("kg", "किग्रा")
                    .replace("ml", "मि.ली."),
                )}
              </span>
              <b>
                ₹{product.price} / {t("bag", "बैग")}
              </b>
              <small>
                <Star size={14} fill="currentColor" /> {product.rating} (
                {product.reviews})
              </small>
              <em
                className={
                  product.stock === "Limited Stock"
                    ? styles.limited
                    : styles.inStock
                }
              >
                {t(productStockLabels[product.stock])}
              </em>
            </article>
          ))}
          <div className={styles.attributeLabel}>
            {t("Attribute", "विशेषता")}
          </div>
          {products.map((product) => (
            <div className={styles.attributeSpacer} key={product.slug} />
          ))}
          {comparisonRows.map((row) => (
            <div className={styles.comparisonRow} key={row.label.en}>
              <strong>{t(row.label)}</strong>
              {row.values.map((value, index) => (
                <span
                  className={
                    "highlight" in row && row.highlight
                      ? styles.comparisonHighlight
                      : ""
                  }
                  key={`${row.label.en}-${products[index]?.slug ?? index}`}
                >
                  {row.label.en === "Government Approved" ? (
                    <Check size={16} />
                  ) : null}
                  {t(value)}
                </span>
              ))}
            </div>
          ))}
          <div className={styles.recommendationLabel}>
            {t("Our Recommendation", "हमारी सिफारिश")}
          </div>
          {[
            "Best Value",
            "Best Performance",
            "Balanced Choice",
            "Budget Friendly",
          ].map((label) => (
            <div className={styles.recommendation} key={label}>
              <strong>
                {t(
                  label,
                  {
                    "Best Value": "सर्वोत्तम मूल्य",
                    "Best Performance": "सर्वोत्तम प्रदर्शन",
                    "Balanced Choice": "संतुलित विकल्प",
                    "Budget Friendly": "बजट अनुकूल",
                  }[label] ?? label,
                )}
              </strong>
              <span>
                {t(
                  "Trusted quality with competitive pricing.",
                  "प्रतिस्पर्धी मूल्य पर विश्वसनीय गुणवत्ता।",
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.comparisonActions}>
        <Link href="/marketplace/cart">
          <ShoppingCart size={18} />{" "}
          {t("Add All to Cart", "सभी को कार्ट में जोड़ें")}
        </Link>
        <Link href="/marketplace/search">
          <Scale size={18} />{" "}
          {t("Compare More Products", "और उत्पादों की तुलना करें")}
        </Link>
        <Link className={styles.primaryAction} href="/marketplace/search">
          {t("View Recommendations", "सिफारिशें देखें")} →
        </Link>
      </div>
    </MarketplacePage>
  );
}
