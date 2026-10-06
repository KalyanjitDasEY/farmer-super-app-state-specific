import { ServiceImage as Image } from "@/components/media/ServiceImage";
import {
  Camera,
  CheckCircle2,
  Eye,
  ImagePlus,
  Save,
  ShieldCheck,
  Upload,
} from "lucide-react";

import {
  PashuBreadcrumb,
  PashuHeader,
} from "@/features/pashu-bazaar/components/pashu-components";
import styles from "@/features/pashu-bazaar/components/pashu-bazaar.module.css";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

const steps = [
  [
    localized("Animal Photos", "पशु की तस्वीरें"),
    localized("Add clear photos", "स्पष्ट तस्वीरें जोड़ें"),
  ],
  [
    localized("Basic Information", "मूल जानकारी"),
    localized("Species, breed & age", "प्रजाति, नस्ल और आयु"),
  ],
  [
    localized("Animal Details", "पशु विवरण"),
    localized(
      "Health, production & other details",
      "स्वास्थ्य, उत्पादन और अन्य विवरण",
    ),
  ],
  [
    localized("Health & Records", "स्वास्थ्य और रिकॉर्ड"),
    localized(
      "Vaccination, tests & certificates",
      "टीकाकरण, परीक्षण और प्रमाणपत्र",
    ),
  ],
  [
    localized("Seller & Location", "विक्रेता और स्थान"),
    localized("Your details & animal location", "आपका विवरण और पशु का स्थान"),
  ],
  [
    localized("Price & Terms", "मूल्य और शर्तें"),
    localized(
      "Asking price & sale terms",
      "माँगा गया मूल्य और बिक्री की शर्तें",
    ),
  ],
  [
    localized("Review & Submit", "समीक्षा और जमा करें"),
    localized(
      "Preview and submit for verification",
      "पूर्वावलोकन कर सत्यापन के लिए जमा करें",
    ),
  ],
] as const;

export default async function CreateAnimalListingPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <div className={styles.stack}>
      <PashuHeader role="Seller" />
      <PashuBreadcrumb
        items={[
          localized("My Listings", "मेरी लिस्टिंग"),
          localized("Create Animal Listing", "पशु लिस्टिंग बनाएँ"),
        ]}
      />
      <div className={styles.pageHeading}>
        <div>
          <h1>
            {t("Create Animal Listing", "पशु लिस्टिंग बनाएँ")}{" "}
            <ShieldCheck size={22} />
          </h1>
          <p>
            {t(
              "Provide accurate information to build buyer trust and faster sale",
              "खरीदार का भरोसा और तेज़ बिक्री पाने के लिए सटीक जानकारी दें",
            )}
          </p>
        </div>
      </div>

      <section className={styles.threeColumnLayout}>
        <aside className={styles.stepSidebar}>
          <ol className={styles.stepList}>
            {steps.map(([title, detail]) => (
              <li key={t(title)}>
                <strong>{t(title)}</strong>
                <small>{t(detail)}</small>
              </li>
            ))}
          </ol>
          <article className={styles.panel}>
            <h2>{t("Need Help?", "मदद चाहिए?")}</h2>
            <p>
              {t(
                "Follow our safe listing guidelines or contact our support team.",
                "हमारे सुरक्षित लिस्टिंग दिशानिर्देशों का पालन करें या सहायता टीम से संपर्क करें।",
              )}
            </p>
          </article>
        </aside>

        <form className={styles.formPanel}>
          <section className={styles.formSection}>
            <h2>{t("1. Animal Photos", "1. पशु की तस्वीरें")}</h2>
            <div className={styles.photoUpload}>
              <label className={styles.uploadMain}>
                <Camera size={30} />
                <strong>{t("Upload Photos", "तस्वीरें अपलोड करें")}</strong>
                <small>
                  {t(
                    "Drag & drop or tap to upload",
                    "खींचकर छोड़ें या अपलोड करने के लिए टैप करें",
                  )}
                  <br />
                  {t(
                    "JPG, PNG up to 10 MB each",
                    "प्रत्येक JPG, PNG अधिकतम 10 MB",
                  )}
                </small>
                <input type="file" accept="image/*" hidden />
              </label>
              <div className={styles.uploadSlots}>
                {[1, 2, 3, 4].map((slot) => (
                  <button
                    className={styles.uploadSlot}
                    type="button"
                    key={slot}
                  >
                    <ImagePlus size={20} />
                    {t("Add Photo", "तस्वीर जोड़ें")}
                  </button>
                ))}
              </div>
            </div>
          </section>
          <section className={styles.formSection}>
            <h2>{t("2. Basic Information", "2. मूल जानकारी")}</h2>
            <div className={styles.fieldGrid}>
              <label>
                {t("Species", "प्रजाति")} *
                <select defaultValue="">
                  <option value="" disabled>
                    {t("Select Species", "प्रजाति चुनें")}
                  </option>
                  <option>{t("Cow", "गाय")}</option>
                  <option>{t("Buffalo", "भैंस")}</option>
                  <option>{t("Goat", "बकरी")}</option>
                </select>
              </label>
              <label>
                {t("Breed", "नस्ल")} *
                <select defaultValue="">
                  <option value="" disabled>
                    {t("Select Breed", "नस्ल चुनें")}
                  </option>
                  <option>HF (Holstein Friesian)</option>
                  <option>Sahiwal</option>
                </select>
              </label>
              <label>
                {t("Category", "श्रेणी")}
                <select>
                  <option>{t("Milking", "दुधारू")}</option>
                  <option>{t("Breeding", "प्रजनन")}</option>
                </select>
              </label>
              <label>
                {t("Age", "आयु")} *
                <input defaultValue={t("3 Years 2 Months", "3 वर्ष 2 महीने")} />
              </label>
              <label>
                {t("Gender", "लिंग")} *
                <span className={styles.optionButtons}>
                  <button type="button">{t("Male", "नर")}</button>
                  <button type="button">{t("Female", "मादा")}</button>
                  <button type="button">{t("Other", "अन्य")}</button>
                </span>
              </label>
              <label>
                {t("Animal Tag / ID", "पशु टैग / ID")}
                <input
                  placeholder={t(
                    "Enter tag or ID number",
                    "टैग या ID नंबर दर्ज करें",
                  )}
                />
              </label>
            </div>
          </section>
          <section className={styles.formSection}>
            <h2>{t("3. Animal Details", "3. पशु विवरण")}</h2>
            <div className={styles.fieldGrid}>
              <label>
                {t("Body Weight (Approx.)", "शरीर का वज़न (लगभग)")} *
                <input defaultValue={t("450 kg", "450 किग्रा")} />
              </label>
              <label>
                {t("Milk Yield", "दूध उत्पादन")}
                <input defaultValue={t("20 Ltr/Day", "20 लीटर/दिन")} />
              </label>
              <label>
                {t("Pregnant", "गर्भवती")}
                <span className={styles.optionButtons}>
                  <button type="button">{t("Yes", "हाँ")}</button>
                  <button type="button">{t("No", "नहीं")}</button>
                  <button type="button">{t("Not Sure", "निश्चित नहीं")}</button>
                </span>
              </label>
              <label>
                {t("Calving / Due Date", "ब्याने / नियत तिथि")}
                <input type="date" />
              </label>
              <label>
                {t("Coat Colour", "त्वचा का रंग")}
                <select>
                  <option>{t("Black & White", "काला और सफेद")}</option>
                </select>
              </label>
              <label>
                {t("Horn", "सींग")}
                <span className={styles.optionButtons}>
                  <button type="button">{t("Yes", "हाँ")}</button>
                  <button type="button">{t("No", "नहीं")}</button>
                  <button type="button">{t("Small", "छोटे")}</button>
                </span>
              </label>
              <label>
                {t("Temperament", "स्वभाव")}
                <select>
                  <option>{t("Calm", "शांत")}</option>
                </select>
              </label>
              <label>
                {t("Feed / Fodder", "आहार / चारा")}
                <select>
                  <option>
                    {t(
                      "Green Fodder + Balanced Feed",
                      "हरा चारा + संतुलित आहार",
                    )}
                  </option>
                </select>
              </label>
              <label className={styles.fieldFull}>
                {t("Animal Description", "पशु का विवरण")}
                <textarea
                  placeholder={t(
                    "Describe the animal's special qualities, habits and strengths...",
                    "पशु के विशेष गुण, आदतें और खूबियाँ बताएँ...",
                  )}
                  maxLength={300}
                />
              </label>
            </div>
          </section>
          <section className={styles.formSection}>
            <h2>{t("4. Health & Records", "4. स्वास्थ्य और रिकॉर्ड")}</h2>
            <ul className={styles.recordList}>
              {[
                localized(
                  "FMD, HS, BQ & Brucellosis Vaccinated",
                  "FMD, HS, BQ और ब्रुसेलोसिस का टीका लगा",
                ),
                localized("Dewormed on 10 May 2024", "10 मई 2024 को कृमिनाशन"),
                localized(
                  "Health Certificate issued 15 May 2024",
                  "स्वास्थ्य प्रमाणपत्र 15 मई 2024 को जारी",
                ),
                localized(
                  "Milk Test: 22.8 Ltr/Day",
                  "दूध परीक्षण: 22.8 लीटर/दिन",
                ),
                localized(
                  "Pregnancy Test: Positive",
                  "गर्भावस्था परीक्षण: पॉज़िटिव",
                ),
              ].map((record) => (
                <li key={t(record)}>
                  <CheckCircle2 size={16} />
                  <span>{t(record)}</span>
                  <button type="button">{t("Manage", "प्रबंधित करें")}</button>
                </li>
              ))}
            </ul>
            <button className={styles.secondaryButton} type="button">
              <Upload size={17} />
              {t("Upload Files", "फ़ाइलें अपलोड करें")}
            </button>
          </section>
          <section className={styles.formSection}>
            <h2>{t("5. Seller & Location", "5. विक्रेता और स्थान")}</h2>
            <div className={styles.fieldGrid}>
              <label>
                {t("Location", "स्थान")} *
                <input
                  defaultValue={t(
                    "Ram Prasad Farm, Amhara, Bihta, Patna, Bihar",
                    "राम प्रसाद फार्म, अमहरा, बिहटा, पटना, बिहार",
                  )}
                />
              </label>
              <label>
                {t("Distance from Buyer", "खरीदार से दूरी")}
                <select>
                  <option>{t("Within 25 km", "25 किमी के भीतर")}</option>
                </select>
              </label>
              <label>
                {t("Preferred Contact Time", "पसंदीदा संपर्क समय")}
                <select>
                  <option>{t("Anytime", "कभी भी")}</option>
                </select>
              </label>
            </div>
          </section>
          <section className={styles.formSection}>
            <h2>{t("6. Price & Terms", "6. मूल्य और शर्तें")}</h2>
            <div className={styles.fieldGrid}>
              <label>
                {t("Asking Price", "माँगा गया मूल्य")} *
                <input defaultValue="₹78,000" />
              </label>
              <label>
                {t("Minimum Acceptable Price", "न्यूनतम स्वीकार्य मूल्य")}
                <input defaultValue="₹72,000" />
              </label>
              <label>
                {t("Payment Preference", "भुगतान प्राथमिकता")}
                <select>
                  <option>
                    {t("Bank Transfer / UPI", "बैंक ट्रांसफ़र / UPI")}
                  </option>
                </select>
              </label>
              <label>
                {t("Other Terms", "अन्य शर्तें")}
                <textarea
                  defaultValue={t(
                    "Transport by buyer. Veterinary checkup allowed.",
                    "परिवहन खरीदार द्वारा। पशु चिकित्सा जाँच की अनुमति है।",
                  )}
                />
              </label>
            </div>
          </section>
        </form>

        <aside className={styles.sideStack}>
          <article>
            <h2>{t("Listing Preview", "लिस्टिंग पूर्वावलोकन")}</h2>
            <div className={styles.previewImage}>
              <Image
                src="/images/authenticated/pashu-bazaar/hf-cow-detail.jpg"
                alt={t("HF Cow listing preview", "HF गाय लिस्टिंग पूर्वावलोकन")}
                fill
                sizes="300px"
              />
            </div>
            <h2>{t("HF Cow (Milking)", "HF गाय (दुधारू)")}</h2>
            <p>
              <b>₹78,000</b>
              <br />
              {t("Age: 3 Years 2 Months", "आयु: 3 वर्ष 2 महीने")}
              <br />
              {t("Milk Yield: 22–25 Ltr/Day", "दूध उत्पादन: 22–25 लीटर/दिन")}
              <br />
              {t("Location: Amhara, Bihta", "स्थान: अमहरा, बिहटा")}
            </p>
          </article>
          <article>
            <h2>{t("Seller Information", "विक्रेता की जानकारी")}</h2>
            <p>
              Ramesh Kumar
              <br />
              {t("Demo Seller", "डेमो विक्रेता")}
              <br />
              {t(
                "68 Listings · 98% Positive Feedback",
                "68 लिस्टिंग · 98% सकारात्मक प्रतिक्रिया",
              )}
            </p>
          </article>
          <article>
            <h2>{t("Safe Listing Tips", "सुरक्षित लिस्टिंग सुझाव")}</h2>
            <ul className={styles.checkList}>
              {[
                localized(
                  "Upload original and clear photos",
                  "मूल और स्पष्ट तस्वीरें अपलोड करें",
                ),
                localized(
                  "Provide correct age and details",
                  "सही आयु और विवरण दें",
                ),
                localized(
                  "Share all health records",
                  "सभी स्वास्थ्य रिकॉर्ड साझा करें",
                ),
                localized(
                  "Set a fair and realistic price",
                  "उचित और वास्तविक मूल्य रखें",
                ),
              ].map((tip) => (
                <li key={t(tip)}>
                  <CheckCircle2 size={15} />
                  {t(tip)}
                </li>
              ))}
            </ul>
          </article>
          <article>
            <h2>{t("What happens next?", "आगे क्या होगा?")}</h2>
            <p>
              {t(
                "Your listing will be reviewed by our team. Once approved, it will be live for buyers.",
                "हमारी टीम आपकी लिस्टिंग की समीक्षा करेगी। स्वीकृत होने पर यह खरीदारों के लिए लाइव हो जाएगी।",
              )}
            </p>
          </article>
        </aside>
      </section>
      <section className={styles.formFooter}>
        <button type="button">
          <Save size={17} />
          {t("Save as Draft", "मसौदे के रूप में सहेजें")}
        </button>
        <button type="button">
          <Eye size={17} />
          {t("Preview Listing", "लिस्टिंग का पूर्वावलोकन")}
        </button>
        <button type="submit">
          <ShieldCheck size={17} />
          {t("Submit for Verification", "सत्यापन के लिए जमा करें")}
        </button>
      </section>
      <aside className={styles.safeBar}>
        <ShieldCheck size={21} />
        {t(
          "Listings in this Bihar Kisan Suvidha demo are illustrative and are not published for trade.",
          "बिहार किसान सुविधा डेमो की लिस्टिंग सांकेतिक हैं और व्यापार के लिए प्रकाशित नहीं होतीं।",
        )}
      </aside>
    </div>
  );
}
