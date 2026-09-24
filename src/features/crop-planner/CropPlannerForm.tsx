"use client";

import {
  BarChart3,
  CalendarClock,
  CalendarDays,
  ClipboardList,
  Info,
  Leaf,
  Lightbulb,
  MapPin,
  Package,
  Sprout,
} from "lucide-react";
import { useState } from "react";

import { withBasePath } from "@/config/base-path";
import { useLocale } from "@/i18n/LocaleProvider";

import {
  type CropId,
  cropPlans,
  locations,
  seasons,
  translateCropPlannerText,
} from "./crop-planner-data";
import styles from "./crop-planner.module.css";

const benefits = [
  {
    icon: Sprout,
    title: "Best Crop Recommendations",
    titleHi: "सर्वोत्तम फसल सुझाव",
    text: "Location and season based suitable crops",
    textHi: "स्थान और मौसम के आधार पर उपयुक्त फसलें",
  },
  {
    icon: CalendarClock,
    title: "Sowing Window & Calendar",
    titleHi: "बुवाई समय और कैलेंडर",
    text: "Right time for sowing and other activities",
    textHi: "बुवाई और अन्य कार्यों का सही समय",
  },
  {
    icon: Package,
    title: "Input Requirement",
    titleHi: "आदान आवश्यकता",
    text: "Seeds, fertilizers and other inputs details",
    textHi: "बीज, उर्वरक और अन्य आदानों का विवरण",
  },
  {
    icon: BarChart3,
    title: "Yield & Profit Expectation",
    titleHi: "उपज और लाभ का अनुमान",
    text: "Expected yield and profit estimation",
    textHi: "अपेक्षित उपज और लाभ का आकलन",
  },
] as const;

export function CropPlannerForm() {
  const { t } = useLocale();
  const [cropId, setCropId] = useState<CropId>("paddy");
  const [variety, setVariety] = useState(cropPlans.paddy.variety);

  const handleCropChange = (value: CropId) => {
    setCropId(value);
    setVariety(cropPlans[value].variety);
  };

  return (
    <div className={styles.plannerPage}>
      <section className={styles.plannerHero}>
        <span className={styles.heroIcon}>
          <CalendarDays size={44} aria-hidden="true" />
          <Sprout className={styles.heroSprout} size={25} aria-hidden="true" />
        </span>
        <div>
          <p className={styles.eyebrow}>
            {t("Smart seasonal planning", "स्मार्ट मौसमी योजना")}
          </p>
          <h1>{t("Plan Your Crop", "अपनी फसल की योजना बनाएं")}</h1>
          <p>
            {t(
              "Get location-based crop recommendations and plan your farming activities with a crop calendar.",
              "स्थान आधारित फसल सुझाव पाएं और फसल कैलेंडर से अपनी कृषि गतिविधियों की योजना बनाएं।",
            )}
          </p>
        </div>
        <span className={styles.heroArtwork} aria-hidden="true">
          <ClipboardList size={76} />
          <Sprout size={48} />
        </span>
      </section>

      <form
        className={styles.plannerForm}
        action={withBasePath("/plan-your-crop/calendar")}
        method="get"
      >
        <h2>{t("Enter Your Farming Details", "अपनी खेती का विवरण भरें")}</h2>
        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>{t("Select Location", "स्थान चुनें")}</span>
            <span className={styles.control}>
              <MapPin size={23} aria-hidden="true" />
              <select name="location" defaultValue={locations[0]}>
                {locations.map((location) => (
                  <option value={location} key={location}>
                    {translateCropPlannerText(t, location)}
                  </option>
                ))}
              </select>
            </span>
          </label>

          <label className={styles.field}>
            <span>{t("Select Season", "मौसम चुनें")}</span>
            <span className={styles.control}>
              <CalendarDays size={23} aria-hidden="true" />
              <select name="season" defaultValue={seasons[0]}>
                {seasons.map((season) => (
                  <option value={season} key={season}>
                    {translateCropPlannerText(t, season)}
                  </option>
                ))}
              </select>
            </span>
          </label>

          <label className={styles.field}>
            <span>{t("Select Crop Type", "फसल का प्रकार चुनें")}</span>
            <span className={styles.control}>
              <Leaf size={23} aria-hidden="true" />
              <select
                name="crop"
                value={cropId}
                onChange={(event) =>
                  handleCropChange(event.target.value as CropId)
                }
              >
                {Object.values(cropPlans).map((crop) => (
                  <option value={crop.id} key={crop.id}>
                    {translateCropPlannerText(t, crop.name)}
                  </option>
                ))}
              </select>
            </span>
          </label>

          <label className={styles.field}>
            <span>
              {t("Select Variety (Optional)", "किस्म चुनें (वैकल्पिक)")}
            </span>
            <span className={styles.control}>
              <Sprout size={23} aria-hidden="true" />
              <input
                name="variety"
                value={variety}
                onChange={(event) => setVariety(event.target.value)}
              />
            </span>
          </label>

          <label className={styles.field}>
            <span>
              {t(
                "Sowing Start Date (Expected)",
                "बुवाई शुरू होने की तिथि (अपेक्षित)",
              )}
            </span>
            <span className={styles.control}>
              <CalendarDays size={23} aria-hidden="true" />
              <input
                name="sowingStart"
                type="date"
                defaultValue="2026-06-15"
                required
              />
            </span>
          </label>

          <label className={styles.field}>
            <span>
              {t(
                "Sowing End Date (Expected)",
                "बुवाई समाप्त होने की तिथि (अपेक्षित)",
              )}
            </span>
            <span className={styles.control}>
              <CalendarDays size={23} aria-hidden="true" />
              <input
                name="sowingEnd"
                type="date"
                defaultValue="2026-06-30"
                required
              />
            </span>
          </label>

          <label className={styles.field}>
            <span>{t("Land Area", "भूमि क्षेत्र")}</span>
            <span className={styles.areaControl}>
              <input
                name="area"
                type="number"
                min="0.1"
                step="0.01"
                defaultValue="2.35"
                required
              />
              <select
                name="unit"
                defaultValue="Bigha"
                aria-label={t("Land unit", "भूमि की इकाई")}
              >
                <option value="Bigha">{t("Bigha", "बीघा")}</option>
                <option value="Acre">{t("Acre", "एकड़")}</option>
                <option value="Hectare">{t("Hectare", "हेक्टेयर")}</option>
              </select>
            </span>
          </label>
        </div>

        <aside className={styles.whyPlan}>
          <Info size={29} aria-hidden="true" />
          <div>
            <strong>
              {t("Why plan your crop?", "फसल की योजना क्यों बनाएं?")}
            </strong>
            <p>
              {t(
                "Get suitable crops, the right sowing time, input requirements and expected output for better planning and higher yield.",
                "बेहतर योजना और अधिक उपज के लिए उपयुक्त फसलें, सही बुवाई समय, आदान आवश्यकता और अपेक्षित उत्पादन जानें।",
              )}
            </p>
          </div>
          <Sprout size={56} aria-hidden="true" />
        </aside>

        <section className={styles.benefits} aria-labelledby="benefits-title">
          <h2 id="benefits-title">
            {t("What You Will Get", "आपको क्या मिलेगा")}
          </h2>
          <div className={styles.benefitGrid}>
            {benefits.map(({ icon: Icon, title, titleHi, text, textHi }) => (
              <article key={title}>
                <span>
                  <Icon size={34} aria-hidden="true" />
                </span>
                <strong>{t(title, titleHi)}</strong>
                <p>{t(text, textHi)}</p>
              </article>
            ))}
          </div>
          <p className={styles.tip}>
            <Lightbulb size={23} aria-hidden="true" />
            <span>
              <strong>{t("Tip:", "सुझाव:")}</strong>{" "}
              {t(
                "Plan your crop in advance to manage risks, reduce costs and increase productivity.",
                "जोखिम संभालने, लागत घटाने और उत्पादकता बढ़ाने के लिए फसल की योजना पहले बनाएं।",
              )}
            </span>
          </p>
        </section>

        <button className={styles.primaryButton} type="submit">
          <Leaf size={25} aria-hidden="true" />
          {t("Get Crop Recommendation", "फसल सुझाव पाएं")}
        </button>
      </form>
    </div>
  );
}
