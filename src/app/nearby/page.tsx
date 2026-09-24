import type { Metadata } from "next";

import { NearbyHub } from "@/features/nearby/NearbyHub";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t("Nearby Sellers & Services", "आस-पास के विक्रेता और सेवाएं"),
    description: t(
      "Find verified agricultural suppliers and storage facilities near Chomu.",
      "चौमूं के पास सत्यापित कृषि आपूर्तिकर्ता और भंडारण सुविधाएं खोजें।",
    ),
  };
}

export default function NearbyPage() {
  return <NearbyHub />;
}
