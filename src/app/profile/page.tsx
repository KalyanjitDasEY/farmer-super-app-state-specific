import { PageShell } from "@/components/layout/PageShell";
import { FarmerProfileOverview } from "@/features/profile/FarmerProfileOverview";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";
import { repositories } from "@/services/repositories";
import styles from "@/styles/application.module.css";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const snapshot = await repositories.dashboard.getSnapshot();

  return (
    <PageShell
      locale={locale}
      dictionary={dictionary}
      authenticated
      activeNavigation="profile"
    >
      <div className={`${styles.container} ${styles.sectionCompact}`}>
        <h1 className={styles.pageTitle}>{dictionary["profile.title"]}</h1>
        <FarmerProfileOverview
          locale={locale}
          dictionary={dictionary}
          snapshot={snapshot}
        />
      </div>
    </PageShell>
  );
}
