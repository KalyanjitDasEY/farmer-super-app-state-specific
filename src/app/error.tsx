"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLocale();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div>
        <h1>{t("We could not load this page", "यह पेज लोड नहीं हो सका")}</h1>
        <p>
          {t(
            "Your entries are preserved where possible. Please try again.",
            "जहां संभव है, आपकी दर्ज की गई जानकारी सुरक्षित है। कृपया फिर से प्रयास करें।",
          )}
        </p>
        <button type="button" onClick={reset}>
          {t("Try again", "फिर से प्रयास करें")}
        </button>
      </div>
    </main>
  );
}
