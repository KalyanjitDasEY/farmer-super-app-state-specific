"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calculator, CheckCircle2, Droplets, Send } from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";

import { useLocale } from "@/i18n/LocaleProvider";

import styles from "./app-pages.module.css";

export function DosageCalculator() {
  const { t } = useLocale();
  const [area, setArea] = useState("2.5");
  const [unit, setUnit] = useState("acre");
  const hectares = (Number(area) || 0) * (unit === "acre" ? 0.404686 : 1);
  const product = Math.round(hectares * 300);
  const water = Math.round(hectares * 500);

  return (
    <div className={styles.twoColumn}>
      <section className={styles.formCard}>
        <h2>{t("Calculate the right quantity", "सही मात्रा की गणना करें")}</h2>
        <p>
          {t(
            "Enter the area you plan to treat. Always follow the product label and local advisory.",
            "जिस क्षेत्र में उपचार करना है उसका क्षेत्रफल दर्ज करें। हमेशा उत्पाद लेबल और स्थानीय सलाह का पालन करें।",
          )}
        </p>
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label htmlFor="product">
              {t("Recommended product", "अनुशंसित उत्पाद")}
            </label>
            <select id="product" defaultValue="tricyclazole">
              <option value="tricyclazole">Tricyclazole 75% WP</option>
              <option value="mancozeb">Mancozeb 75% WP</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label htmlFor="area">{t("Field area", "खेत का क्षेत्रफल")}</label>
            <input
              id="area"
              min="0.1"
              step="0.1"
              type="number"
              value={area}
              onChange={(event) => setArea(event.target.value)}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="unit">{t("Area unit", "क्षेत्रफल इकाई")}</label>
            <select
              id="unit"
              value={unit}
              onChange={(event) => setUnit(event.target.value)}
            >
              <option value="acre">{t("Acre", "एकड़")}</option>
              <option value="hectare">{t("Hectare", "हेक्टेयर")}</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label htmlFor="tank">
              {t("Sprayer tank size", "स्प्रेयर टैंक का आकार")}
            </label>
            <select id="tank" defaultValue="15">
              <option value="15">{t("15 litre", "15 लीटर")}</option>
              <option value="16">{t("16 litre", "16 लीटर")}</option>
              <option value="20">{t("20 litre", "20 लीटर")}</option>
            </select>
          </div>
        </div>
      </section>
      <section className={styles.doseResult} aria-live="polite">
        <h2>
          <Calculator size={22} /> {t("Your dosage plan", "आपकी खुराक योजना")}
        </h2>
        <div className={styles.doseNumber}>
          <div>
            <strong>{product} g</strong>
            <small>{t("Total product", "कुल उत्पाद")}</small>
          </div>
          <div>
            <strong>{water} L</strong>
            <small>{t("Total water", "कुल पानी")}</small>
          </div>
          <div>
            <strong>{Math.ceil(water / 15)}</strong>
            <small>{t("15 L tanks", "15 लीटर के टैंक")}</small>
          </div>
        </div>
        <ul className={styles.checkList}>
          <li>
            <Droplets size={20} />{" "}
            {t(
              "Mix 9 g of product in each 15 litre tank.",
              "हर 15 लीटर टैंक में 9 ग्राम उत्पाद मिलाएं।",
            )}
          </li>
          <li>
            <CheckCircle2 size={20} />{" "}
            {t(
              "Spray evenly during calm, dry weather.",
              "शांत और शुष्क मौसम में समान रूप से छिड़काव करें।",
            )}
          </li>
        </ul>
        <Link className={styles.primaryButton} href="/crop-doctor/survey">
          {t("Continue to Field Impact Survey", "खेत प्रभाव सर्वेक्षण पर जाएं")}
        </Link>
      </section>
    </div>
  );
}

export function ImpactSurvey() {
  const { t } = useLocale();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [severity, setSeverity] = useState("some");
  const summary = useMemo(
    () =>
      severity === "many"
        ? t("High field impact", "खेत पर अधिक प्रभाव")
        : severity === "some"
          ? t("Moderate field impact", "खेत पर मध्यम प्रभाव")
          : t("Low field impact", "खेत पर कम प्रभाव"),
    [severity, t],
  );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => router.push("/crop-doctor/advisory"), 550);
  };

  return (
    <form className={styles.formCard} onSubmit={submit}>
      <div className={styles.stack}>
        <fieldset>
          <legend className={styles.fieldLabel}>
            {t(
              "How much of the field is affected?",
              "खेत का कितना हिस्सा प्रभावित है?",
            )}
          </legend>
          <div className={styles.choiceGrid}>
            {(
              [
                ["few", t("Few plants", "कुछ पौधे")],
                ["some", t("Several patches", "कई हिस्से")],
                ["many", t("Most of the field", "खेत का अधिकांश भाग")],
              ] as const
            ).map(([value, label]) => (
              <label className={styles.choiceCard} key={value}>
                <input
                  type="radio"
                  name="severity"
                  value={value}
                  checked={severity === value}
                  onChange={() => setSeverity(value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className={styles.fieldLabel}>
            {t(
              "Where are symptoms most visible?",
              "लक्षण सबसे अधिक कहां दिख रहे हैं?",
            )}
          </legend>
          <div className={styles.choiceGrid}>
            {[
              t("Lower leaves", "निचली पत्तियां"),
              t("Upper leaves", "ऊपरी पत्तियां"),
              t("Whole plant", "पूरा पौधा"),
            ].map((label, index) => (
              <label className={styles.choiceCard} key={label}>
                <input
                  type="radio"
                  name="location"
                  defaultChecked={index === 0}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label htmlFor="noticed">
              {t("When did you first notice it?", "आपने इसे पहली बार कब देखा?")}
            </label>
            <select id="noticed" defaultValue="3-7">
              <option value="1-2">{t("1–2 days ago", "1–2 दिन पहले")}</option>
              <option value="3-7">{t("3–7 days ago", "3–7 दिन पहले")}</option>
              <option value="7+">
                {t("More than a week ago", "एक सप्ताह से अधिक पहले")}
              </option>
            </select>
          </div>
          <div className={styles.formField}>
            <label htmlFor="trend">
              {t("Is it spreading?", "क्या यह फैल रहा है?")}
            </label>
            <select id="trend" defaultValue="slow">
              <option value="no">
                {t("Not visibly", "स्पष्ट रूप से नहीं")}
              </option>
              <option value="slow">{t("Slowly", "धीरे-धीरे")}</option>
              <option value="fast">{t("Quickly", "तेजी से")}</option>
            </select>
          </div>
        </div>
        <div className={styles.resultBanner}>
          <span className={styles.resultIcon}>
            <CheckCircle2 size={25} />
          </span>
          <div>
            <h2>{summary}</h2>
            <p>
              {t(
                "Your answers help us prioritize the recommended actions.",
                "आपके उत्तर अनुशंसित कार्यों को प्राथमिकता देने में मदद करते हैं।",
              )}
            </p>
          </div>
        </div>
        {submitted ? (
          <p role="status">
            {t(
              "Survey saved. Preparing your advisory...",
              "सर्वेक्षण सहेजा गया। आपकी सलाह तैयार की जा रही है...",
            )}
          </p>
        ) : null}
        <div className={styles.formActions}>
          <Link className={styles.outlineButton} href="/crop-doctor/diagnosis">
            {t("Skip for now", "अभी छोड़ें")}
          </Link>
          <button className={styles.primaryButton} type="submit">
            <Send size={18} /> {t("Save & Continue", "सहेजें और जारी रखें")}
          </button>
        </div>
      </div>
    </form>
  );
}
