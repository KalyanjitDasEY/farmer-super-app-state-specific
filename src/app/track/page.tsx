import { PageShell } from "@/components/layout/PageShell";
import { TrackingForm } from "@/features/tracking/TrackingForm";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";
import styles from "@/styles/application.module.css";

export default async function TrackPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  return (
    <PageShell
      locale={locale}
      dictionary={dictionary}
      authenticated
      activeNavigation="tracking"
      footer
    >
      <div className={`${styles.container} ${styles.section}`}>
        <TrackingForm dictionary={dictionary} />
      </div>
    </PageShell>
  );
}
