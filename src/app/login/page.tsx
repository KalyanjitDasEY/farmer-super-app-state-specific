import { RegistrationShell } from "@/components/layout/RegistrationShell";
import { LoginForm } from "@/features/auth/LoginForm";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";

export default async function LoginPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  return (
    <RegistrationShell locale={locale} dictionary={dictionary}>
      <LoginForm locale={locale} dictionary={dictionary} />
    </RegistrationShell>
  );
}
