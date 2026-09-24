import type { Metadata } from "next";

import {
  AdviceBanner,
  ContextStrip,
  MarketplaceTrustStrip,
  MarketplaceTitle,
} from "@/features/marketplace/components/marketplace-components";
import { ProductResults } from "@/features/marketplace/components/marketplace-interactions";
import styles from "@/features/marketplace/components/marketplace.module.css";
import { marketplaceProducts } from "@/features/marketplace/data/marketplace-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Search Krishi Inputs", "कृषि इनपुट खोजें") };
}

export default async function MarketplaceSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const t = createTranslator(await getRequestLocale());
  const query =
    params.q || params.category || t("urea fertilizer", "यूरिया उर्वरक");

  return (
    <div className={styles.fullMarketPage}>
      <MarketplaceTitle
        title={t(`Results for “${query}”`, `“${query}” के परिणाम`)}
        subtitle={t(
          "120+ approved products found",
          "120+ अनुमोदित उत्पाद मिले",
        )}
        backHref="/marketplace"
      />
      <ContextStrip />
      <ProductResults products={marketplaceProducts} />
      <MarketplaceTrustStrip />
      <AdviceBanner />
    </div>
  );
}
