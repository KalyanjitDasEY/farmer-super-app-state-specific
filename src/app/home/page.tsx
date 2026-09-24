import { DashboardPage } from "@/features/home/DashboardPage";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";
import { repositories } from "@/services/repositories";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const locale = await getRequestLocale();
  const snapshot = await repositories.dashboard.getSnapshot();
  return (
    <DashboardPage
      locale={locale}
      dictionary={getDictionary(locale)}
      snapshot={snapshot}
    />
  );
}
