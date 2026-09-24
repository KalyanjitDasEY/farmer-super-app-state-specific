import { AuditLedgerPage } from "@/features/profile/AuditLedgerPage";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";

export default async function Page() {
  const locale = await getRequestLocale();
  return <AuditLedgerPage locale={locale} dictionary={getDictionary(locale)} />;
}
