import { CloudSun, Leaf, Salad, ShoppingCart } from "lucide-react";

import { PageShell } from "@/components/layout/PageShell";
import { routes } from "@/config/routes";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";
import styles from "@/styles/application.module.css";

export default async function MorePage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const items = [
    [
      dictionary["home.service.weather"],
      CloudSun,
      "weather",
      routes.weather(locale),
    ],
    [
      dictionary["home.service.advisory"],
      Leaf,
      "advisories",
      routes.advisories(locale),
    ],
    [
      dictionary["home.service.inputs"],
      ShoppingCart,
      "marketplace",
      routes.marketplace(locale),
    ],
    [
      dictionary["home.service.nutriCheck"],
      Salad,
      "nutricheck",
      routes.nutricheck(locale),
    ],
  ] as const;
  return (
    <PageShell
      locale={locale}
      dictionary={dictionary}
      authenticated
      activeNavigation="more"
    >
      <div className={`${styles.container} ${styles.section}`}>
        <h1 className={styles.pageTitle}>{dictionary["more.title"]}</h1>
        <p className={styles.pageLead}>{dictionary["more.notice"]}</p>
        <div
          className={`${styles.grid} ${styles.serviceGrid} ${styles.sectionCompact}`}
        >
          {items.map(([label, Icon, id, href]) => (
            <a
              className={`${styles.card} ${styles.serviceCard}`}
              href={href}
              id={id}
              key={id}
            >
              <Icon size={36} aria-hidden="true" />
              <h2>{label}</h2>
              <p>{dictionary["common.viewDetails"]}</p>
            </a>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
