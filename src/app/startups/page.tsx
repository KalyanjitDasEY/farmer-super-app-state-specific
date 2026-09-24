import type { Metadata } from "next";

import { StartupDirectory } from "@/features/startups/components/startup-pages";
import type { StartupCategory } from "@/features/startups/data/startup-data";
import { startupCategories } from "@/features/startups/data/startup-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Startups", "स्टार्टअप") };
}

export default async function StartupsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string | string[];
    q?: string | string[];
  }>;
}) {
  const query = await searchParams;
  const requestedCategory = query.category;
  const category =
    typeof requestedCategory === "string" &&
    startupCategories.some((item) => item.id === requestedCategory)
      ? (requestedCategory as StartupCategory)
      : "all";
  const initialQuery = typeof query.q === "string" ? query.q : "";

  return (
    <StartupDirectory initialCategory={category} initialQuery={initialQuery} />
  );
}
