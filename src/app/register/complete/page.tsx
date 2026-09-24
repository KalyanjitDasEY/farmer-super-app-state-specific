import { RegistrationShell } from "@/components/layout/RegistrationShell";
import { RegistrationComplete } from "@/features/onboarding/RegistrationComplete";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";

export default async function CompletePage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  return (
    <RegistrationShell locale={locale} dictionary={dictionary}>
      <RegistrationComplete locale={locale} dictionary={dictionary} />
    </RegistrationShell>
  );
}
