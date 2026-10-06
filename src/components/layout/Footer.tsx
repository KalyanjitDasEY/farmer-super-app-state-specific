import { routes } from "@/config/routes";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

export function Footer({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <strong>{dictionary["footer.department"]}</strong>
          <small>{dictionary["footer.demo"]}</small>
        </div>
        <nav
          className={styles.footerLinks}
          aria-label={dictionary["common.legal"]}
        >
          <a href="#privacy">{dictionary["footer.privacy"]}</a>
          <a href="#terms">{dictionary["footer.terms"]}</a>
          <a href="#help">{dictionary["footer.contact"]}</a>
          <a href={routes.imageCredits(locale)}>
            {locale === "hi" ? "चित्र श्रेय" : "Image credits"}
          </a>
        </nav>
        <small>{dictionary["common.version"]} 0.1.0</small>
      </div>
    </footer>
  );
}
