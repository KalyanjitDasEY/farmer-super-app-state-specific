import { RegistrationShell } from "@/components/layout/RegistrationShell";
import { IdentityForm } from "@/features/onboarding/IdentityForm";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";

export default async function IdentityPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  return (
    <RegistrationShell locale={locale} dictionary={dictionary}>
      <IdentityForm locale={locale} dictionary={dictionary} />
    </RegistrationShell>
  );
}
