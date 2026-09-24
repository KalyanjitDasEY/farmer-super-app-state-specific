import { PageShell } from "@/components/layout/PageShell";
import { OfflineState } from "@/features/offline/OfflineState";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";

export default async function OfflinePage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  return (
    <PageShell locale={locale} dictionary={dictionary}>
      <OfflineState dictionary={dictionary} />
    </PageShell>
  );
}
