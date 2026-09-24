import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/PageShell";
import { DomainError } from "@/domain/errors";
import { ApplicationStart } from "@/features/applications/ApplicationStart";
import { buildFarmerApplicationProfile } from "@/features/applications/application-data";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";
import { repositories } from "@/services/repositories";
import styles from "@/styles/application.module.css";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ schemeId: string }>;
}) {
  const { schemeId } = await params;
  const locale = await getRequestLocale();
  let scheme;
  const dashboard = await repositories.dashboard.getSnapshot();
  try {
    scheme = await repositories.schemes.getById(schemeId);
  } catch (error) {
    if (error instanceof DomainError && error.code === "NOT_FOUND") notFound();
    throw error;
  }
  const dictionary = getDictionary(locale);
  return (
    <PageShell
      locale={locale}
      dictionary={dictionary}
      authenticated
      activeNavigation="apply"
    >
      <div className={`${styles.container} ${styles.section}`}>
        <ApplicationStart
          locale={locale}
          dictionary={dictionary}
          scheme={scheme}
          farmerProfile={buildFarmerApplicationProfile(dashboard)}
        />
      </div>
    </PageShell>
  );
}
