"use client";

import { Download, Eye, RefreshCw } from "lucide-react";
import { useState } from "react";

import styles from "@/features/soil-health/soil-health.module.css";
import { useLocale } from "@/i18n/LocaleProvider";

const pdfLines = [
  "RAJ KISAN SUVIDHA - SOIL HEALTH CARD",
  "Report Reference: SHC-RJ-24-05-1231",
  "Farmer: Ramesh Kumar",
  "Khasra / Parcel: 123/1, Morija, Chomu, Jaipur",
  "Test Date: 15 May 2024",
  "Soil Type: Loamy Sand",
  "",
  "pH: 7.6 (Normal)",
  "EC: 0.42 dS/m (Normal)",
  "Nitrogen: 248 kg/ha (Low)",
  "Phosphorus: 18 kg/ha (Medium)",
  "Potassium: 312 kg/ha (High)",
  "Sulphur: 14 ppm (Medium)",
  "Zinc: 0.65 ppm (Low)",
  "Iron: 4.8 ppm (Sufficient)",
  "Organic Carbon: 0.62% (Low)",
  "",
  "Overall Soil Health: Good",
];

const escapePdfText = (value: string) =>
  value.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");

function createReportPdf() {
  const commands = [
    "BT",
    "/F1 12 Tf",
    "50 790 Td",
    ...pdfLines.flatMap((line, index) => [
      index === 0 ? "/F1 16 Tf" : index === 1 ? "/F1 12 Tf" : "",
      `(${escapePdfText(line)}) Tj`,
      "0 -24 Td",
    ]),
    "ET",
  ]
    .filter(Boolean)
    .join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${commands.length} >>\nstream\n${commands}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let document = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(document.length);
    document += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = document.length;
  document += `xref\n0 ${objects.length + 1}\n`;
  document += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    document += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  document += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  document += `startxref\n${xrefOffset}\n%%EOF`;

  return new Blob([document], { type: "application/pdf" });
}

export function SoilHealthActions() {
  const { locale, t } = useLocale();
  const [lastRefreshed, setLastRefreshed] = useState<string>();
  const [refreshing, setRefreshing] = useState(false);

  const downloadReport = () => {
    const url = URL.createObjectURL(createReportPdf());
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "soil-health-card-SHC-RJ-24-05-1231.pdf";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const refreshReport = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setLastRefreshed(
        new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
      );
      setRefreshing(false);
    }, 500);
  };

  return (
    <>
      <div className={styles.reportActions}>
        <a className={styles.outlineAction} href="#soil-parameter-summary">
          <Eye size={20} aria-hidden="true" />
          <span>
            <strong>{t("View Soil Report", "मिट्टी रिपोर्ट देखें")}</strong>
            <small>
              {t("See detailed soil analysis", "विस्तृत मिट्टी विश्लेषण देखें")}
            </small>
          </span>
        </a>
        <button
          className={styles.outlineAction}
          type="button"
          onClick={downloadReport}
        >
          <Download size={20} aria-hidden="true" />
          <span>
            <strong>{t("Download PDF", "PDF डाउनलोड करें")}</strong>
            <small>
              {t(
                "Download Soil Health Card",
                "मिट्टी स्वास्थ्य कार्ड डाउनलोड करें",
              )}
            </small>
          </span>
        </button>
        <button
          className={styles.primaryAction}
          type="button"
          disabled={refreshing}
          onClick={refreshReport}
        >
          <RefreshCw
            className={refreshing ? styles.spinning : undefined}
            size={20}
            aria-hidden="true"
          />
          <span>
            <strong>
              {refreshing
                ? t("Refreshing…", "रीफ्रेश हो रहा है…")
                : t("Refresh Report", "रिपोर्ट रीफ्रेश करें")}
            </strong>
            <small>
              {lastRefreshed
                ? t(`Updated at ${lastRefreshed}`, `${lastRefreshed} पर अपडेट`)
                : t("Check for latest updates", "नवीनतम अपडेट जांचें")}
            </small>
          </span>
        </button>
      </div>
      <p className={styles.refreshStatus} aria-live="polite">
        {lastRefreshed
          ? t(
              `Report refreshed at ${lastRefreshed}.`,
              `रिपोर्ट ${lastRefreshed} पर रीफ्रेश हुई।`,
            )
          : ""}
      </p>
    </>
  );
}
