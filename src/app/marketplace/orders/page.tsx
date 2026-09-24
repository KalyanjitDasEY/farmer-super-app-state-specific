import type { Metadata } from "next";

import {
  MarketplacePage,
  MarketplaceTitle,
} from "@/features/marketplace/components/marketplace-components";
import { OrdersManager } from "@/features/marketplace/components/marketplace-interactions";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("My Marketplace Orders", "मेरे मार्केटप्लेस ऑर्डर") };
}

export default async function MarketplaceOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ placed?: string }>;
}) {
  const params = await searchParams;
  const t = createTranslator(await getRequestLocale());
  return (
    <MarketplacePage active="My Orders">
      <MarketplaceTitle
        title={t("My Orders", "मेरे ऑर्डर")}
        subtitle={t(
          "Track and manage all your input orders",
          "अपने सभी इनपुट ऑर्डर ट्रैक और प्रबंधित करें",
        )}
      />
      <OrdersManager showSuccess={params.placed === "1"} />
    </MarketplacePage>
  );
}
