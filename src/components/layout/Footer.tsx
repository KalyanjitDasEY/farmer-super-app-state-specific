import type { Dictionary } from "@/i18n/dictionaries";
import styles from "@/styles/application.module.css";

export function Footer({ dictionary }: { dictionary: Dictionary }) {
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
        </nav>
        <small>{dictionary["common.version"]} 0.1.0</small>
      </div>
    </footer>
  );
}
