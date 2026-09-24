import { AddRepresentativePage } from "@/features/profile/RepresentativePages";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";

export default async function Page() {
  const locale = await getRequestLocale();
  return (
    <AddRepresentativePage locale={locale} dictionary={getDictionary(locale)} />
  );
}
