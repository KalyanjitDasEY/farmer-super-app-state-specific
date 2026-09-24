import type { Metadata } from "next";

import { NearbyListing } from "@/features/nearby/NearbyListing";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t(
      "Nearby Crop Protection Products Sellers",
      "आस-पास के फसल सुरक्षा उत्पाद विक्रेता",
    ),
  };
}

export default function NearbyCropProtectionPage() {
  return <NearbyListing serviceId="crop-protection" />;
}
