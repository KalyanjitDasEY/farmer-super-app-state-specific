import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StartupDetail } from "@/features/startups/components/startup-pages";
import { getStartup, startups } from "@/features/startups/data/startup-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export function generateStaticParams() {
  return startups.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const startup = getStartup((await params).slug);
  const t = createTranslator(await getRequestLocale());
  return {
    title: startup?.name ?? t("Startup Details", "स्टार्टअप विवरण"),
  };
}

export default async function StartupDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const startup = getStartup((await params).slug);
  if (!startup) notFound();

  return <StartupDetail slug={startup.slug} />;
}
