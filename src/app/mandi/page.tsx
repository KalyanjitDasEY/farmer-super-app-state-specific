import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { routes } from "@/config/routes";
import { MandiBhavPage } from "@/features/mandi/MandiBhavPage";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Mandi Bhav",
};

export default async function MandiPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);

  return (
    <PageShell
      locale={locale}
      dictionary={dictionary}
      authenticated
      activeNavigation="nearbyMarket"
    >
      <MandiBhavPage
        homeHref={routes.home(locale)}
        title={dictionary["mandi.title"]}
        subtitle={dictionary["mandi.subtitle"]}
      />
    </PageShell>
  );
}
