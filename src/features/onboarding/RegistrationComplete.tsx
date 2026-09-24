"use client";

import { CircleCheckBig, Copy } from "lucide-react";
import { useState } from "react";

import { Stepper } from "@/components/layout/Stepper";
import { routes } from "@/config/routes";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

const demoFarmerId = "RJ-DEMO-260922";

export function RegistrationComplete({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <section className={`${styles.card} ${styles.formCard}`}>
      <CircleCheckBig
        className={styles.softIcon}
        size={36}
        aria-hidden="true"
      />
      <h1>{dictionary["register.completeTitle"]}</h1>
      <p>{dictionary["register.completeText"]}</p>
      <Stepper dictionary={dictionary} current={3} />
      <div className={`${styles.notice} ${styles.noticeSuccess}`}>
        <div>
          <strong>{dictionary["register.farmerId"]}</strong>
          <p>{demoFarmerId}</p>
        </div>
        <button
          className={styles.iconButton}
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(demoFarmerId);
            setCopied(true);
          }}
          aria-label={
            copied ? dictionary["common.copied"] : dictionary["common.copy"]
          }
        >
          <Copy size={18} />
        </button>
      </div>
      <div className={styles.formActions}>
        <a className={styles.button} href={routes.home(locale)}>
          {dictionary["register.toDashboard"]}
        </a>
        <a
          className={`${styles.button} ${styles.buttonSecondary}`}
          href={routes.login(locale)}
        >
          {dictionary["gateway.login"]}
        </a>
      </div>
    </section>
  );
}
