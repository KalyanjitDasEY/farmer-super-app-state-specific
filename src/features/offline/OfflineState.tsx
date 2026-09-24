"use client";

import { RefreshCw, WifiOff } from "lucide-react";

import type { Dictionary } from "@/i18n/dictionaries";
import styles from "@/styles/application.module.css";

export function OfflineState({ dictionary }: { dictionary: Dictionary }) {
  return (
    <div className={styles.centeredState}>
      <div>
        <WifiOff className={styles.softIcon} size={38} aria-hidden="true" />
        <h1 className={styles.pageTitle}>{dictionary["offline.title"]}</h1>
        <p>{dictionary["offline.text"]}</p>
        <button
          className={styles.button}
          type="button"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={18} />
          {dictionary["offline.retry"]}
        </button>
      </div>
    </div>
  );
}
