import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    description: t(
      "Illustrative Bihar farmer accident support demo. Not an official Bihar government scheme, claim or benefit.",
      "बिहार किसान दुर्घटना सहायता का सांकेतिक डेमो। यह बिहार सरकार की आधिकारिक योजना, दावा या लाभ नहीं है।",
    ),
  };
}

export default function MksyLayout({ children }: { children: ReactNode }) {
  return (
    <ServicePageLayout activeNavigation="schemes">{children}</ServicePageLayout>
  );
}
