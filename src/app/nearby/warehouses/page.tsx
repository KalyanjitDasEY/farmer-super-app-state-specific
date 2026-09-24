import type { Metadata } from "next";

import { NearbyListing } from "@/features/nearby/NearbyListing";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t("Nearby Warehouse Availability", "आस-पास गोदाम की उपलब्धता"),
  };
}

export default function NearbyWarehousesPage() {
  return <NearbyListing serviceId="warehouses" />;
}
