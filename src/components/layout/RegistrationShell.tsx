import { BarChart3, FileSearch, Leaf, UserRound } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { withBasePath } from "@/config/base-path";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

import { PageShell } from "./PageShell";

export function RegistrationShell({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  return (
    <PageShell locale={locale} dictionary={dictionary} footer>
      <div className={styles.authLayout}>
        <aside className={styles.authAside}>
          <div className={styles.authAsideCopy}>
            <p className={styles.authWelcome}>
              {locale === "hi" ? "आपका स्वागत है" : "Welcome to"}
            </p>
            <h1>{dictionary["brand.name"]}</h1>
            <p className={styles.authTagline}>{dictionary["brand.tagline"]}</p>
            <span className={styles.authRule} />
            <ul className={styles.authBenefits}>
              <li>
                <Leaf aria-hidden="true" />
                <span>
                  <strong>{dictionary["gateway.service.schemes"]}</strong>
                  {locale === "hi"
                    ? "कृषि योजनाएं खोजें और आवेदन करें"
                    : "Explore and apply for agriculture schemes"}
                </span>
              </li>
              <li>
                <BarChart3 aria-hidden="true" />
                <span>
                  <strong>{dictionary["gateway.service.market"]}</strong>
                  {locale === "hi"
                    ? "नवीनतम मंडी भाव और बाजार जानकारी"
                    : "Get the latest mandi prices and market insights"}
                </span>
              </li>
              <li>
                <FileSearch aria-hidden="true" />
                <span>
                  <strong>{dictionary["gateway.service.applications"]}</strong>
                  {locale === "hi"
                    ? "आवेदन की स्थिति वास्तविक समय में देखें"
                    : "Track applications and services in real time"}
                </span>
              </li>
              <li>
                <UserRound aria-hidden="true" />
                <span>
                  <strong>{dictionary["gateway.service.profile"]}</strong>
                  {locale === "hi"
                    ? "सभी सेवाएं एक स्थान पर"
                    : "Access multiple services in one place"}
                </span>
              </li>
            </ul>
          </div>
          <Image
            className={styles.authAsideImage}
            src={withBasePath("/images/auth-bihar-farmers.jpg")}
            alt=""
            width={490}
            height={430}
            priority
            sizes="(max-width: 700px) 100vw, 44vw"
          />
        </aside>
        <div className={styles.authMain}>{children}</div>
      </div>
    </PageShell>
  );
}
