"use client";

import { Globe2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";

import { appBasePath } from "@/config/base-path";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

export function LanguageSwitcher({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const router = useRouter();

  const switchLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    localStorage.setItem("bihar-kisan-locale", nextLocale);
    document.cookie = `bihar-kisan-locale=${nextLocale}; Path=${appBasePath || "/"}; Max-Age=31536000; SameSite=Lax`;
    router.refresh();
  };

  return (
    <label className={styles.languageForm}>
      <span className="sr-only">{dictionary["common.language"]}</span>
      <Globe2 size={22} aria-hidden="true" />
      <select value={locale} onChange={switchLanguage}>
        <option value="hi">{dictionary["common.hindi"]}</option>
        <option value="en">{dictionary["common.english"]}</option>
      </select>
    </label>
  );
}
