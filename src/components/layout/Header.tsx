import { Bell, FileText, Headphones, Maximize } from "lucide-react";

import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

import { Brand } from "./Brand";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({
  locale,
  dictionary,
  authenticated = false,
  showFullscreen = true,
}: {
  locale: Locale;
  dictionary: Dictionary;
  authenticated?: boolean;
  showFullscreen?: boolean;
}) {
  return (
    <header className={styles.header}>
      <Brand locale={locale} dictionary={dictionary} />
      <div className={styles.headerActions}>
        <LanguageSwitcher locale={locale} dictionary={dictionary} />
        {authenticated ? (
          <button
            className={`${styles.headerButton} ${styles.headerIconOnly}`}
            type="button"
            aria-label={dictionary["common.notifications"]}
          >
            <Bell size={22} />
            <span className={styles.notificationBadge}>3</span>
          </button>
        ) : (
          <>
            {showFullscreen ? (
              <button className={styles.headerButton} type="button">
                <Maximize size={22} aria-hidden="true" />
                <span>{locale === "hi" ? "पूर्ण स्क्रीन" : "Fullscreen"}</span>
              </button>
            ) : null}
            <button
              className={`${styles.headerButton} ${styles.headerNotes}`}
              type="button"
            >
              <FileText size={22} aria-hidden="true" />
              <span>{locale === "hi" ? "नोट्स" : "Notes"}</span>
            </button>
          </>
        )}
        {authenticated ? (
          <a
            className={`${styles.headerButton} ${styles.headerHelp}`}
            href="#help"
          >
            <Headphones size={22} />
            <span>{dictionary["common.help"]}</span>
          </a>
        ) : null}
      </div>
    </header>
  );
}
