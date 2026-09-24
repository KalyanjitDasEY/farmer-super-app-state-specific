"use client";

import { useState } from "react";
import { Droplets, Leaf, Sprout, Wheat } from "lucide-react";

import { useLocale } from "@/i18n/LocaleProvider";

import styles from "./weather.module.css";

const operations = [
  {
    label: "Pesticide Spraying",
    labelHi: "कीटनाशक छिड़काव",
    icon: Sprout,
    window: "7:00 AM – 11:00 AM",
    windowHi: "सुबह 7:00 – 11:00",
    hours: "18 h 40 m",
    hoursHi: "18 घंटे 40 मिनट",
    reason:
      "Low wind, no rainfall expected and ideal temperature for effective pesticide application.",
    reasonHi:
      "कम हवा, वर्षा की संभावना नहीं और प्रभावी कीटनाशक प्रयोग के लिए आदर्श तापमान।",
  },
  {
    label: "Fertilizer Application",
    labelHi: "उर्वरक डालना",
    icon: Leaf,
    window: "6:00 AM – 10:00 AM",
    windowHi: "सुबह 6:00 – 10:00",
    hours: "21 h 10 m",
    hoursHi: "21 घंटे 10 मिनट",
    reason: "Cool soil and light wind provide a suitable application window.",
    reasonHi: "ठंडी मिट्टी और हल्की हवा प्रयोग के लिए उपयुक्त समय देती है।",
  },
  {
    label: "Irrigation",
    labelHi: "सिंचाई",
    icon: Droplets,
    window: "6:00 AM – 9:00 AM",
    windowHi: "सुबह 6:00 – 9:00",
    hours: "24 h 00 m",
    hoursHi: "24 घंटे 00 मिनट",
    reason:
      "Morning irrigation minimizes evaporation before afternoon cloud cover.",
    reasonHi:
      "सुबह की सिंचाई दोपहर में बादल छाने से पहले वाष्पीकरण कम करती है।",
  },
  {
    label: "Harvesting",
    labelHi: "कटाई",
    icon: Wheat,
    window: "8:00 AM – 12:00 PM",
    windowHi: "सुबह 8:00 – दोपहर 12:00",
    hours: "14 h 30 m",
    hoursHi: "14 घंटे 30 मिनट",
    reason:
      "Dry morning conditions support safe harvesting before evening rainfall.",
    reasonHi: "सूखी सुबह शाम की वर्षा से पहले सुरक्षित कटाई में सहायक है।",
  },
  {
    label: "Weeding",
    labelHi: "निराई",
    icon: Sprout,
    window: "7:00 AM – 1:00 PM",
    windowHi: "सुबह 7:00 – दोपहर 1:00",
    hours: "26 h 20 m",
    hoursHi: "26 घंटे 20 मिनट",
    reason: "Moderate temperature and dry foliage make field work comfortable.",
    reasonHi: "मध्यम तापमान और सूखी पत्तियां खेत का काम सुविधाजनक बनाती हैं।",
  },
] as const;

export function OperationSelector() {
  const { t } = useLocale();
  const [selected, setSelected] = useState<(typeof operations)[number]>(
    operations[0],
  );
  return (
    <>
      <section className={styles.operationSelector}>
        <div>
          <strong>{t("Operation Selector", "कृषि कार्य चुनें")}</strong>
          <button type="button">
            ⓘ {t("How it works?", "यह कैसे काम करता है?")}
          </button>
        </div>
        <nav aria-label={t("Select farm operation", "कृषि कार्य चुनें")}>
          {operations.map((operation) => {
            const Icon = operation.icon;
            return (
              <button
                className={
                  selected.label === operation.label
                    ? styles.selectedOperation
                    : ""
                }
                key={operation.label}
                onClick={() => setSelected(operation)}
                type="button"
              >
                <Icon size={19} />
                {t(operation.label, operation.labelHi)}
              </button>
            );
          })}
        </nav>
      </section>
      <section className={styles.bestWindow}>
        <h2>✓ {t("Best Overall Window", "सर्वोत्तम समग्र समय")}</h2>
        <div>
          <span>
            <small>{t("Recommended Window", "सुझाया गया समय")}</small>
            <strong>{t(selected.window, selected.windowHi)}</strong>
            <b>{t("21–22 May 2024", "21–22 मई 2024")}</b>
          </span>
          <p>{t(selected.reason, selected.reasonHi)}</p>
        </div>
        <aside>
          <small>{t("Total Suitable Hours", "कुल उपयुक्त घंटे")}</small>
          <strong>{t(selected.hours, selected.hoursHi)}</strong>
          <span>{t("out of 168 h", "168 घंटों में से")}</span>
        </aside>
      </section>
    </>
  );
}

export function TemperatureToggle() {
  const { t } = useLocale();
  const [unit, setUnit] = useState<"C" | "F">("C");
  return (
    <div
      className={styles.tempToggle}
      aria-label={t("Temperature unit", "तापमान इकाई")}
    >
      <button
        className={unit === "C" ? styles.activeToggle : ""}
        onClick={() => setUnit("C")}
        type="button"
      >
        °C
      </button>
      <button
        className={unit === "F" ? styles.activeToggle : ""}
        onClick={() => setUnit("F")}
        type="button"
      >
        °F
      </button>
    </div>
  );
}
