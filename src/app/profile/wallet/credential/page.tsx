import { CredentialProofPage } from "@/features/profile/WalletPages";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";

export default async function Page() {
  const locale = await getRequestLocale();
  return (
    <CredentialProofPage locale={locale} dictionary={getDictionary(locale)} />
  );
}
