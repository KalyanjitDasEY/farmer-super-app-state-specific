import { Sprout } from "lucide-react";

import { routes } from "@/config/routes";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

export function Brand({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <a
      className={styles.brand}
      href={routes.gateway(locale)}
      aria-label={dictionary["brand.name"]}
    >
      <span className={styles.brandMark} aria-hidden="true">
        <Sprout size={28} />
      </span>
      <span className={styles.brandText}>{dictionary["brand.name"]}</span>
    </a>
  );
}
