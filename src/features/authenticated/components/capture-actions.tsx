"use client";

import { Camera, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLocale } from "@/i18n/LocaleProvider";

import componentStyles from "./authenticated.module.css";
import styles from "./app-pages.module.css";

export function CaptureActions() {
  const { t } = useLocale();
  const router = useRouter();
  const [fileName, setFileName] = useState("");

  return (
    <div className={styles.captureActions}>
      <label className={styles.captureButton}>
        <Camera size={26} />
        <span>
          <strong>{t("Take a Photo", "फोटो लें")}</strong>
          <small>{t("Use your camera", "अपने कैमरे का उपयोग करें")}</small>
        </span>
        <input
          accept="image/*"
          capture="environment"
          type="file"
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? "");
            if (event.target.files?.length) {
              window.setTimeout(() => router.push("/crop-doctor/quality"), 300);
            }
          }}
        />
      </label>
      <label className={styles.uploadButton}>
        <Upload size={24} />
        <span>
          <strong>{t("Upload from Gallery", "गैलरी से अपलोड करें")}</strong>
          <small>{fileName || t("JPG or PNG", "JPG या PNG")}</small>
        </span>
        <input
          accept="image/jpeg,image/png"
          type="file"
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? "");
            if (event.target.files?.length) {
              window.setTimeout(() => router.push("/crop-doctor/quality"), 300);
            }
          }}
        />
      </label>
      <Link className={componentStyles.primaryLink} href="/crop-doctor/quality">
        {t("Continue with sample image", "नमूना चित्र के साथ जारी रखें")}
      </Link>
    </div>
  );
}
