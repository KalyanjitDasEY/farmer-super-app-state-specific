import { GatewayPage } from "@/features/gateway/GatewayPage";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";

export default async function GatewayRoute() {
  const locale = await getRequestLocale();
  return <GatewayPage locale={locale} dictionary={getDictionary(locale)} />;
}
