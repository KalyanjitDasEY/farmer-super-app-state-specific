import { ConsentTokenPage } from "@/features/profile/ConsentPages";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";

export default async function Page() {
  const locale = await getRequestLocale();
  return (
    <ConsentTokenPage locale={locale} dictionary={getDictionary(locale)} />
  );
}
