import type { ReactNode } from "react";

import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

import type { BottomNavigationActive } from "./BottomNavigation";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ProfileNavigation } from "./ProfileNavigation";

export function PageShell({
  locale,
  dictionary,
  children,
  authenticated = false,
  activeNavigation,
  footer = false,
  showFullscreen = true,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
  authenticated?: boolean;
  activeNavigation?: BottomNavigationActive;
  footer?: boolean;
  showFullscreen?: boolean;
}) {
  return (
    <div className={styles.site}>
      <a className={styles.skipLink} href="#main-content">
        {dictionary["common.skipToMainContent"]}
      </a>
      <Header
        locale={locale}
        dictionary={dictionary}
        authenticated={authenticated}
        showFullscreen={showFullscreen}
      />
      <main className={styles.main} id="main-content">
        {children}
      </main>
      {footer ? <Footer dictionary={dictionary} locale={locale} /> : null}
      {activeNavigation ? (
        <ProfileNavigation
          locale={locale}
          dictionary={dictionary}
          active={activeNavigation}
        />
      ) : null}
    </div>
  );
}
