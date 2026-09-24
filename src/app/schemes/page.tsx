import { ServiceHubPage } from "@/features/schemes/ServiceHubPage";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";
import { repositories } from "@/services/repositories";

export default async function SchemesPage() {
  const locale = await getRequestLocale();
  const popularSchemes = await repositories.schemes.listPopular();
  return (
    <ServiceHubPage
      locale={locale}
      dictionary={getDictionary(locale)}
      popularSchemes={popularSchemes}
    />
  );
}
