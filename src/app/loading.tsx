"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export default function Loading() {
  const { t } = useLocale();

  return (
    <main aria-busy="true" aria-live="polite">
      <p className="sr-only">{t("Loading", "लोड हो रहा है")}</p>
    </main>
  );
}
