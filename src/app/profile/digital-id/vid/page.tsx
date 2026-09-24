import { VirtualIdPage } from "@/features/profile/DigitalIdentityPages";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";

export default async function Page() {
  const locale = await getRequestLocale();
  return <VirtualIdPage locale={locale} dictionary={getDictionary(locale)} />;
}
