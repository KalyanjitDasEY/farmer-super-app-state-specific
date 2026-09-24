import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import { Check, Filter, Lightbulb } from "lucide-react";

import {
  MachineryPageHeader,
  TrustStrip,
} from "@/features/machinery/components/machinery-components";
import { OperationSelector } from "@/features/machinery/components/machinery-interactions";
import styles from "@/features/machinery/components/machinery.module.css";
import { machines } from "@/features/machinery/data/machinery-data";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Select Machinery", "मशीनरी चुनें") };
}

export default async function MachinerySelectPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <div className={styles.stack}>
      <MachineryPageHeader
        backHref="/machinery"
        title={t("Select Operation / Machine", "कार्य / मशीन चुनें")}
        subtitle={t(
          "Tell us your work need and we'll show the right machines and providers for you",
          "हमें अपने काम की आवश्यकता बताएँ और हम आपके लिए सही मशीनें व प्रदाता दिखाएँगे",
        )}
      />
      <div className={styles.simpleSteps}>
        <span className={styles.active}>
          1 <b>{t("Select Need", "आवश्यकता चुनें")}</b>
        </span>
        <span>
          2 <b>{t("Choose Machine", "मशीन चुनें")}</b>
        </span>
        <span>
          3 <b>{t("Date & Time", "तिथि और समय")}</b>
        </span>
        <span>
          4 <b>{t("Location", "स्थान")}</b>
        </span>
        <span>
          5 <b>{t("Confirm", "पुष्टि करें")}</b>
        </span>
      </div>

      <section className={styles.selectionPanel}>
        <div className={styles.sectionTitle}>
          <h2>
            {t(
              "1. What work do you want to do?",
              "1. आप कौन-सा काम करना चाहते हैं?",
            )}
          </h2>
          <Link href="/more#help">
            <Lightbulb size={17} /> {t("Help Me Choose", "चुनने में मदद करें")}
          </Link>
        </div>
        <OperationSelector />
        <h2>
          {t("2. Add your farm context", "2. अपने खेत की जानकारी जोड़ें")}{" "}
          <small>
            {t(
              "(helps us suggest the right machines)",
              "(सही मशीन सुझाने में मदद करता है)",
            )}
          </small>
        </h2>
        <div className={styles.formGrid}>
          <label>
            {t("Crop", "फसल")}
            <select defaultValue="Rice (Paddy)">
              <option value="Rice (Paddy)">
                {t("Rice (Paddy)", "चावल (धान)")}
              </option>
              <option value="Wheat">{t("Wheat", "गेहूँ")}</option>
            </select>
          </label>
          <label>
            {t("Field / Plot", "खेत / प्लॉट")}
            <select defaultValue="Field 1 - North Side (2.5 Acre)">
              <option value="Field 1 - North Side (2.5 Acre)">
                {t(
                  "Field 1 - North Side (2.5 Acre)",
                  "खेत 1 - उत्तर दिशा (2.5 एकड़)",
                )}
              </option>
            </select>
          </label>
          <label>
            {t("Area to be Covered", "कवर किया जाने वाला क्षेत्र")}
            <span>
              <input defaultValue="2.5" />
              <select defaultValue="Acre">
                <option value="Acre">{t("Acre", "एकड़")}</option>
              </select>
            </span>
          </label>
          <label>
            {t("Crop Stage", "फसल की अवस्था")}
            <select defaultValue="Land Preparation">
              <option value="Land Preparation">
                {t("Land Preparation", "भूमि की तैयारी")}
              </option>
              <option value="Sowing">{t("Sowing", "बुवाई")}</option>
            </select>
          </label>
          <label>
            {t("Soil Type (Optional)", "मिट्टी का प्रकार (वैकल्पिक)")}
            <select defaultValue="Loam">
              <option value="Loam">{t("Loam", "दोमट")}</option>
              <option value="Clay">{t("Clay", "चिकनी मिट्टी")}</option>
            </select>
          </label>
          <label>
            {t("Residue on Field", "खेत में अवशेष")}
            <select defaultValue="Medium">
              <option value="Medium">{t("Medium", "मध्यम")}</option>
              <option value="Low">{t("Low", "कम")}</option>
              <option value="High">{t("High", "अधिक")}</option>
            </select>
          </label>
        </div>
        <p className={styles.matchNotice}>
          <Check size={16} />{" "}
          {t(
            "Based on your selection, we found 6 suitable machines and services.",
            "आपके चयन के आधार पर हमें 6 उपयुक्त मशीनें और सेवाएँ मिलीं।",
          )}
        </p>
      </section>

      <section>
        <div className={styles.sectionTitle}>
          <h2>
            {t(
              "3. Choose the right machine / service",
              "3. सही मशीन / सेवा चुनें",
            )}
          </h2>
          <button type="button">
            <Filter size={17} /> {t("Filter", "फ़िल्टर")}
          </button>
        </div>
        <div className={styles.machineList}>
          {machines.map((machine, index) => (
            <article key={t(machine.name)}>
              <div className={styles.listMachineImage}>
                <Image
                  src={machine.image}
                  alt={t(machine.name)}
                  fill
                  sizes="180px"
                />
                {index === 0 ? (
                  <b>{t("Best Match", "सर्वोत्तम मिलान")}</b>
                ) : null}
              </div>
              <div>
                <h2>{t(machine.name)}</h2>
                <span className={styles.categoryTag}>
                  {t(machine.category)}
                </span>
                <p>
                  {t(machine.coverage)} · {t("Fuel Efficient", "ईंधन कुशल")}
                </p>
                <small>{t(machine.description)}</small>
              </div>
              <div>
                <strong>{t("Specifications", "विशेष विवरण")}</strong>
                {machine.specifications.map((spec) => (
                  <span key={t(spec)}>
                    <Check size={14} /> {t(spec)}
                  </span>
                ))}
              </div>
              <div>
                <strong>{machine.provider}</strong>
                <span>
                  ★ {machine.rating} ({machine.reviews})
                </span>
                <small>{t(machine.distance)}</small>
                <b>
                  ₹{machine.price.toLocaleString("en-IN")}{" "}
                  {t("/ Hour", "/ घंटा")}
                </b>
                <Link href="/machinery/requirements">
                  {t("Select Machine", "मशीन चुनें")}
                </Link>
                <Link href="/machinery/machine">
                  {t("View Details", "विवरण देखें")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <TrustStrip />
    </div>
  );
}
