import type { ReactNode } from "react";

import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";
import styles from "@/styles/application.module.css";

import type { BottomNavigationActive } from "./BottomNavigation";
import { PageShell } from "./PageShell";

export async function ServicePageLayout({
  activeNavigation,
  children,
}: {
  activeNavigation: BottomNavigationActive;
  children: ReactNode;
}) {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);

  return (
    <PageShell
      locale={locale}
      dictionary={dictionary}
      authenticated
      activeNavigation={activeNavigation}
    >
      <div className={`${styles.container} ${styles.serviceModulePage}`}>
        {children}
      </div>
    </PageShell>
  );
}
