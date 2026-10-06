import { withBasePath } from "@/config/base-path";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export default async function NotFound() {
  const t = createTranslator(await getRequestLocale());

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
        <h1>{t("Page not found", "पेज नहीं मिला")}</h1>
        <p>
          {t(
            "The requested page or scheme is not available.",
            "अनुरोधित पेज या योजना उपलब्ध नहीं है।",
          )}
        </p>
        <a href={withBasePath("/")}>
          {t("Return to Bihar Kisan Suvidha", "बिहार किसान सुविधा पर लौटें")}
        </a>
      </div>
    </main>
  );
}
