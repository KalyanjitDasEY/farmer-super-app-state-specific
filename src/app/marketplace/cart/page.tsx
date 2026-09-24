import type { Metadata } from "next";
import { Share2 } from "lucide-react";

import {
  MarketplaceTitle,
  MarketplaceTrustStrip,
} from "@/features/marketplace/components/marketplace-components";
import { CartManager } from "@/features/marketplace/components/marketplace-interactions";
import styles from "@/features/marketplace/components/marketplace.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("My Cart", "मेरी कार्ट") };
}

export default async function MarketplaceCartPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.fullMarketPage}>
      <MarketplaceTitle
        title={t("My Cart (4 Items)", "मेरी कार्ट (4 आइटम)")}
        subtitle={t(
          "Review your selected items before placing the order",
          "ऑर्डर देने से पहले चुने गए आइटम की समीक्षा करें",
        )}
        action={
          <button className={styles.outlineButton} type="button">
            <Share2 size={17} /> {t("Share Cart", "कार्ट साझा करें")}
          </button>
        }
      />
      <MarketplaceTrustStrip compact />
      <CartManager />
    </div>
  );
}
