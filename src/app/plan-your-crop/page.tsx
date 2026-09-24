import type { Metadata } from "next";

import { CropPlannerForm } from "@/features/crop-planner/CropPlannerForm";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t("Plan Your Crop", "अपनी फसल की योजना बनाएं"),
    description: t(
      "Create a location-based crop plan and farming activity calendar.",
      "स्थान आधारित फसल योजना और कृषि गतिविधि कैलेंडर बनाएं।",
    ),
  };
}

export default function PlanYourCropPage() {
  return <CropPlannerForm />;
}
