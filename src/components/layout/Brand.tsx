import Image from "next/image";

import { withBasePath } from "@/config/base-path";
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
      <Image
        className={styles.brandLogo}
        src={withBasePath("/images/brand-logo.png")}
        alt=""
        width={280}
        height={110}
        priority
      />
    </a>
  );
}
