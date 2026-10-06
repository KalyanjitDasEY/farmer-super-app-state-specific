import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Info,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import {
  BookingSteps,
  MachineSummary,
  MachineryPageHeader,
} from "@/features/machinery/components/machinery-components";
import styles from "@/features/machinery/components/machinery.module.css";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Booking Requirement", "बुकिंग आवश्यकता") };
}

export default async function BookingRequirementPage() {
  const t = createTranslator(await getRequestLocale());
  const preferences = [
    [localized("Operator Required", "ऑपरेटर आवश्यक"), localized("Yes", "हाँ")],
    [localized("Transport Required", "परिवहन आवश्यक"), localized("No", "नहीं")],
    [localized("Fuel", "ईंधन"), localized("Provider", "प्रदाता")],
    [
      localized("Payment Mode", "भुगतान माध्यम"),
      localized("Online Payment", "ऑनलाइन भुगतान"),
    ],
    [
      localized("Work Type", "काम का प्रकार"),
      localized("Regular Service", "नियमित सेवा"),
    ],
    [
      localized("Soil / Field Condition", "मिट्टी / खेत की स्थिति"),
      localized("Normal", "सामान्य"),
    ],
    [
      localized("Access to Field", "खेत तक पहुँच"),
      localized("Good (Tractor access easy)", "अच्छी (ट्रैक्टर की पहुँच आसान)"),
    ],
  ] as const;

  return (
    <div className={styles.stack}>
      <MachineryPageHeader
        backHref="/machinery/select"
        title={t("Booking Requirement", "बुकिंग आवश्यकता")}
        subtitle={t(
          "Provide service details so providers can give accurate offers",
          "सेवा का विवरण दें ताकि प्रदाता सटीक प्रस्ताव दे सकें",
        )}
      />
      <BookingSteps current={3} />
      <MachineSummary />

      <form className={styles.requirementForm}>
        <fieldset>
          <legend>
            <MapPin size={18} />{" "}
            {t("1. Where is the service required?", "1. सेवा कहाँ चाहिए?")}
          </legend>
          <div className={styles.formGrid}>
            <label>
              {t("Farm / Field", "फार्म / खेत")}
              <select defaultValue="Ram Prasad Farm">
                <option>Ram Prasad Farm</option>
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
              {t("Village", "गाँव")}
              <select defaultValue="Amhara">
                <option>Amhara</option>
              </select>
            </label>
            <label>
              {t("Block / Anchal", "प्रखंड / अंचल")}
              <select defaultValue="Bihta">
                <option>Bihta</option>
              </select>
            </label>
            <label>
              {t("District", "ज़िला")}
              <select defaultValue="Patna">
                <option>Patna</option>
              </select>
            </label>
            <label>
              {t("State", "राज्य")}
              <input defaultValue={t("Bihar", "बिहार")} />
            </label>
            <label>
              {t("PIN Code", "पिन कोड")}
              <input defaultValue="801103" />
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            {t("2. When do you need the service?", "2. आपको सेवा कब चाहिए?")}
          </legend>
          <div className={styles.formGrid}>
            <label>
              {t("Preferred Date", "पसंदीदा तिथि")}
              <input type="date" defaultValue="2024-05-24" />
            </label>
            <label>
              {t("Preferred Time Slot", "पसंदीदा समय स्लॉट")}
              <select defaultValue="08:00 AM – 12:00 PM">
                <option value="08:00 AM – 12:00 PM">
                  {t("08:00 AM – 12:00 PM", "08:00 पूर्वाह्न – 12:00 अपराह्न")}
                </option>
                <option value="01:00 PM – 05:00 PM">
                  {t("01:00 PM – 05:00 PM", "01:00 अपराह्न – 05:00 अपराह्न")}
                </option>
              </select>
            </label>
            <label>
              {t("Expected Duration", "अनुमानित अवधि")}
              <span>
                <input defaultValue="4" />
                <select defaultValue="Hours">
                  <option value="Hours">{t("Hours", "घंटे")}</option>
                  <option value="Days">{t("Days", "दिन")}</option>
                </select>
              </span>
            </label>
            <label>
              {t("Flexible?", "समय में बदलाव संभव?")}
              <span className={styles.radioRow}>
                <input defaultChecked name="flexible" type="radio" />{" "}
                {t("Yes, +/- 1 day", "हाँ, +/- 1 दिन")}
              </span>
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend>{t("3. Service Preferences", "3. सेवा प्राथमिकताएँ")}</legend>
          <div className={styles.preferenceGrid}>
            {preferences.map(([label, value]) => (
              <label key={t(label)}>
                {t(label)}
                <select defaultValue={value.en}>
                  <option value={value.en}>{t(value)}</option>
                </select>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>
            {t(
              "4. Additional Information (Optional)",
              "4. अतिरिक्त जानकारी (वैकल्पिक)",
            )}
          </legend>
          <div className={styles.additionalGrid}>
            <div>
              <strong>
                {t("Field Photos (Optional)", "खेत की तस्वीरें (वैकल्पिक)")}
              </strong>
              <p>
                {t(
                  "Add photos of field/area for better offers",
                  "बेहतर प्रस्तावों के लिए खेत/क्षेत्र की तस्वीरें जोड़ें",
                )}
              </p>
              <div className={styles.photoStrip}>
                {[1, 2, 3].map((item) => (
                  <Image
                    src={`/images/authenticated/machinery/field-${item}.jpg`}
                    alt=""
                    width={92}
                    height={78}
                    key={item}
                  />
                ))}
                <button type="button">
                  <Camera size={23} />
                  {t("Add More", "और जोड़ें")}
                </button>
              </div>
            </div>
            <label>
              {t("Special Instructions / Notes", "विशेष निर्देश / नोट्स")}
              <textarea
                maxLength={300}
                placeholder={t(
                  "Any specific instructions for the service provider...",
                  "सेवा प्रदाता के लिए कोई विशेष निर्देश...",
                )}
              />
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            {t("5. Advance Preferences", "5. उन्नत प्राथमिकताएँ")}
          </legend>
          <div className={styles.toggleGrid}>
            <label>
              {t(
                "Notify me if price changes",
                "मूल्य बदलने पर मुझे सूचित करें",
              )}
              <input defaultChecked type="checkbox" />
            </label>
            <label>
              {t(
                "Auto-accept best offer",
                "सर्वोत्तम प्रस्ताव स्वतः स्वीकार करें",
              )}
              <input type="checkbox" />
            </label>
          </div>
        </fieldset>
      </form>

      <aside className={styles.infoStrip}>
        <Info size={20} />
        <span>
          <strong>
            {t(
              "Providers will send offers based on your requirements.",
              "प्रदाता आपकी आवश्यकताओं के आधार पर प्रस्ताव भेजेंगे।",
            )}
          </strong>
          {t(
            "You can compare and choose the best offer.",
            "आप तुलना करके सर्वोत्तम प्रस्ताव चुन सकते हैं।",
          )}
        </span>
        <ShieldCheck size={20} />
        <span>
          <strong>
            {t("Your information is safe & secure", "आपकी जानकारी सुरक्षित है")}
          </strong>
          {t(
            "We share your details only with verified providers.",
            "हम आपका विवरण केवल सत्यापित प्रदाताओं के साथ साझा करते हैं।",
          )}
        </span>
      </aside>
      <div className={styles.pageActions}>
        <Link href="/machinery">
          {t("Save as Draft", "मसौदे के रूप में सहेजें")}
        </Link>
        <Link href="/machinery/select">
          <ArrowLeft size={18} /> {t("Previous", "पिछला")}
        </Link>
        <Link className={styles.primaryButton} href="/machinery/providers">
          {t("Review & Confirm", "समीक्षा और पुष्टि")} <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
