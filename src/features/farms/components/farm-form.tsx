"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import styles from "@/features/authenticated/components/app-pages.module.css";
import { useLocale } from "@/i18n/LocaleProvider";

function Field({
  label,
  name,
  placeholder,
  type = "text",
  options,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  options?: readonly string[];
}) {
  return (
    <div className={styles.formField}>
      <label htmlFor={name}>{label}</label>
      {type === "select" ? (
        <select id={name} name={name} defaultValue="" required>
          <option value="" disabled>
            {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          required
        />
      )}
    </div>
  );
}

export function FarmForm({ crop = false }: { crop?: boolean }) {
  const router = useRouter();
  const { t } = useLocale();
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setError(
        t(
          "Please complete all required fields.",
          "कृपया सभी आवश्यक फ़ील्ड भरें।",
        ),
      );
      form.reportValidity();
      return;
    }

    router.push(crop ? "/farms" : "/farms/crops/new");
  };

  return (
    <form className={styles.formCard} noValidate onSubmit={submit}>
      <div className={styles.formGrid}>
        {crop ? (
          <>
            <Field
              label={t("Crop name", "फसल का नाम")}
              name="crop"
              placeholder={t("Select crop", "फसल चुनें")}
              type="select"
              options={[
                t("Paddy (Dhan)", "धान"),
                t("Wheat", "गेहूं"),
                t("Mustard", "सरसों"),
                t("Bajra", "बाजरा"),
              ]}
            />
            <Field
              label={t("Variety", "किस्म")}
              name="variety"
              placeholder={t("e.g. Pusa Basmati 1121", "जैसे पूसा बासमती 1121")}
            />
            <Field
              label={t("Sowing date", "बुवाई की तारीख")}
              name="sowingDate"
              type="date"
            />
            <Field
              label={t("Crop stage", "फसल की अवस्था")}
              name="stage"
              placeholder={t("Select stage", "अवस्था चुनें")}
              type="select"
              options={[
                t("Sowing", "बुवाई"),
                t("Vegetative", "वानस्पतिक अवस्था"),
                t("Tillering", "कल्ले निकलना"),
                t("Flowering", "फूल आना"),
                t("Harvest", "कटाई"),
              ]}
            />
            <Field
              label={t("Field", "खेत")}
              name="field"
              placeholder={t("Select field", "खेत चुनें")}
              type="select"
              options={[
                t("Field 1 · 2.50 Acre", "खेत 1 · 2.50 एकड़"),
                t("Field 2 · 1.25 Acre", "खेत 2 · 1.25 एकड़"),
              ]}
            />
            <Field
              label={t("Irrigation source", "सिंचाई का स्रोत")}
              name="irrigation"
              placeholder={t("Select source", "स्रोत चुनें")}
              type="select"
              options={[
                t("Tube well", "ट्यूबवेल"),
                t("Canal", "नहर"),
                t("Rain-fed", "वर्षा आधारित"),
                t("Drip irrigation", "ड्रिप सिंचाई"),
              ]}
            />
          </>
        ) : (
          <>
            <Field
              label={t("Farm name", "फार्म का नाम")}
              name="farmName"
              placeholder={t("e.g. Ram Prasad Farm", "जैसे राम प्रसाद फार्म")}
            />
            <Field
              label={t("Village / Locality", "गांव / इलाका")}
              name="village"
              placeholder={t("Enter village", "गांव दर्ज करें")}
            />
            <Field
              label={t("District", "जिला")}
              name="district"
              placeholder={t("Jaipur", "जयपुर")}
            />
            <Field
              label={t("State", "राज्य")}
              name="state"
              placeholder={t("Rajasthan", "राजस्थान")}
            />
            <Field
              label={t("Field name", "खेत का नाम")}
              name="fieldName"
              placeholder={t("e.g. Field 1", "जैसे खेत 1")}
            />
            <Field
              label={t("Field area", "खेत का क्षेत्रफल")}
              name="area"
              placeholder="2.50"
              type="number"
            />
            <Field
              label={t("Area unit", "क्षेत्रफल की इकाई")}
              name="unit"
              placeholder={t("Select unit", "इकाई चुनें")}
              type="select"
              options={[
                t("Acre", "एकड़"),
                t("Hectare", "हेक्टेयर"),
                t("Bigha", "बीघा"),
              ]}
            />
            <Field
              label={t("Soil type", "मिट्टी का प्रकार")}
              name="soil"
              placeholder={t("Select soil type", "मिट्टी का प्रकार चुनें")}
              type="select"
              options={[
                t("Loamy", "दोमट"),
                t("Clay", "चिकनी"),
                t("Sandy", "रेतीली"),
                t("Black soil", "काली मिट्टी"),
              ]}
            />
          </>
        )}
      </div>
      {error ? (
        <p role="alert" className={styles.formError}>
          {error}
        </p>
      ) : null}
      <div className={styles.formActions}>
        <Link className={styles.outlineButton} href="/farms">
          {t("Cancel", "रद्द करें")}
        </Link>
        <button className={styles.primaryButton} type="submit">
          {crop
            ? t("Save Crop", "फसल सहेजें")
            : t("Save & Add Crop", "सहेजें और फसल जोड़ें")}
        </button>
      </div>
    </form>
  );
}
