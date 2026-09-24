"use client";

import { Check, Home, Leaf, Sparkles } from "lucide-react";
import { useEffect } from "react";

import styles from "./feature-preview.module.css";

export function FeaturePreview({
  feature,
  homeHref,
  locale,
}: {
  feature: string;
  homeHref: string;
  locale: "en" | "hi";
}) {
  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      window.location.replace(homeHref);
    }, 2000);

    return () => window.clearTimeout(redirectTimer);
  }, [homeHref]);

  const isHindi = locale === "hi";

  return (
    <section
      className={styles.previewPage}
      aria-labelledby="feature-preview-title"
      aria-live="polite"
    >
      <div className={styles.ambientLeaf} aria-hidden="true">
        <Leaf size={44} />
      </div>

      <div className={styles.spinnerWrap} aria-hidden="true">
        <span className={styles.spinner} />
        <span className={styles.spinnerIcon}>
          <Sparkles size={34} />
        </span>
      </div>

      <p className={styles.featureName}>{feature}</p>
      <h1 id="feature-preview-title">
        {isHindi
          ? "यह सुविधा विकसित की जा रही है"
          : "This feature is under development"}
      </h1>
      <p className={styles.message}>
        {isHindi
          ? "हम आपके लिए इस अनुभव को और बेहतर बना रहे हैं। यह सुविधा जल्द उपलब्ध होगी।"
          : "We are thoughtfully building a better experience for you. This feature will be available soon."}
      </p>

      <div className={styles.positiveNote}>
        <Check size={19} aria-hidden="true" />
        <span>
          {isHindi
            ? "आपको 2 सेकंड में होम स्क्रीन पर वापस ले जाया जाएगा।"
            : "Taking you back to the home screen in 2 seconds."}
        </span>
      </div>

      <a className={styles.homeLink} href={homeHref}>
        <Home size={20} aria-hidden="true" />
        {isHindi ? "अभी होम पर जाएं" : "Go to Home now"}
      </a>
    </section>
  );
}
