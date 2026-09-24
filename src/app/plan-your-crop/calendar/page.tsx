import type { Metadata } from "next";

import {
  CropCalendar,
  type CropCalendarSelection,
} from "@/features/crop-planner/CropCalendar";
import {
  cropPlans,
  isCropId,
  locations,
  seasons,
} from "@/features/crop-planner/crop-planner-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t("Crop Calendar", "फसल कैलेंडर"),
    description: t(
      "Review your recommended crop activities and progress.",
      "सुझाई गई फसल गतिविधियों और प्रगति की समीक्षा करें।",
    ),
  };
}

type SearchValue = string | string[] | undefined;

function firstValue(value: SearchValue, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

export default async function CropCalendarPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, SearchValue>>;
}) {
  const query = await searchParams;
  const cropId = firstValue(query.crop, "paddy");
  const plan = cropPlans[isCropId(cropId) ? cropId : "paddy"];
  const selection: CropCalendarSelection = {
    location: firstValue(query.location, locations[0]),
    season: firstValue(query.season, seasons[0]),
    variety: firstValue(query.variety, plan.variety),
    sowingStart: firstValue(query.sowingStart, "2026-06-15"),
    sowingEnd: firstValue(query.sowingEnd, "2026-06-30"),
    area: firstValue(query.area, "2.35"),
    unit: firstValue(query.unit, "Bigha"),
  };

  return <CropCalendar plan={plan} selection={selection} />;
}
