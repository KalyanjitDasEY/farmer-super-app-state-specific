import type { Metadata } from "next";

import { NearbyListing } from "@/features/nearby/NearbyListing";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Nearby Seed Suppliers", "आस-पास के बीज आपूर्तिकर्ता") };
}

export default function NearbySeedsPage() {
  return <NearbyListing serviceId="seeds" />;
}
