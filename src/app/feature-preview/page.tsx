import type { Metadata } from "next";

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { routes } from "@/config/routes";
import { FeaturePreview } from "@/features/feature-preview/FeaturePreview";
import { getRequestLocale } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Feature Coming Soon",
  description: "A new Raj Kisan Suvidha service is being developed.",
};

type SearchValue = string | string[] | undefined;

export default async function FeaturePreviewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, SearchValue>>;
}) {
  const locale = await getRequestLocale();
  const query = await searchParams;
  const requestedFeature = query.feature;
  const feature =
    typeof requestedFeature === "string" && requestedFeature.trim()
      ? requestedFeature
      : locale === "hi"
        ? "नई किसान सेवा"
        : "New Farmer Service";

  return (
    <ServicePageLayout activeNavigation="home">
      <FeaturePreview
        feature={feature}
        homeHref={routes.home(locale)}
        locale={locale}
      />
    </ServicePageLayout>
  );
}
