import { ServiceImage as Image } from "@/components/media/ServiceImage";
import {
  CheckCircle2,
  FileUp,
  LockKeyhole,
  Send,
  ShieldCheck,
} from "lucide-react";

import {
  PashuBreadcrumb,
  PashuHeader,
  SellerCard,
} from "@/features/pashu-bazaar/components/pashu-components";
import styles from "@/features/pashu-bazaar/components/pashu-bazaar.module.css";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export default async function AnimalEnquiryPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <div className={styles.stack}>
      <PashuHeader backHref="/pashu-bazaar/animals/hf-cow" />
      <PashuBreadcrumb
        items={[
          localized("Animal Details", "पशु विवरण"),
          localized("Animal Enquiry / Offer", "पशु पूछताछ / प्रस्ताव"),
        ]}
      />
      <aside className={styles.safeBar}>
        <LockKeyhole size={19} />
        {t(
          "Your communication is secure and private. Contact details are shared only after mutual agreement.",
          "आपका संवाद सुरक्षित और निजी है। संपर्क विवरण आपसी सहमति के बाद ही साझा किए जाते हैं।",
        )}
      </aside>

      <section className={styles.enquiryLayout}>
        <div className={styles.stack}>
          <article className={styles.animalCompact}>
            <div className={styles.animalCompactImage}>
              <Image
                src="/images/authenticated/pashu-bazaar/hf-cow-detail.jpg"
                alt={t("HF Cow", "HF गाय")}
                fill
                loading="eager"
                sizes="280px"
              />
            </div>
            <div>
              <h2>{t("HF Cow (Milking)", "HF गाय (दुधारू)")}</h2>
              <p>{t("Animal ID:", "पशु ID:")} BV-AN-2400518-0456</p>
              <p>
                {t(
                  "Age: 3 Years 2 Months · Milk Yield: 22–25 Ltr/Day",
                  "आयु: 3 वर्ष 2 महीने · दूध उत्पादन: 22–25 लीटर/दिन",
                )}
              </p>
              <p>
                {t("Breed:", "नस्ल:")} HF (Holstein Friesian) ·{" "}
                {t("450–480 kg", "450–480 किग्रा")}
              </p>
              <strong className={styles.price}>₹78,000</strong>
            </div>
          </article>

          <form className={styles.formPanel}>
            <nav className={styles.tabBar}>
              <button type="button">
                {t("Send Enquiry / Offer", "पूछताछ / प्रस्ताव भेजें")}
              </button>
              <button type="button">
                {t("Inspection Request", "निरीक्षण अनुरोध")}
              </button>
              <button type="button">
                {t("Documents Request", "दस्तावेज़ अनुरोध")}
              </button>
            </nav>
            <section className={styles.formSection}>
              <h2>{t("1. Type", "1. प्रकार")}</h2>
              <div className={styles.choiceCards}>
                <label className={styles.choiceCard}>
                  <input type="radio" name="type" defaultChecked />
                  <span>
                    <strong>{t("Enquiry", "पूछताछ")}</strong>
                    <small>
                      {t(
                        "Ask questions or request more details",
                        "प्रश्न पूछें या अधिक विवरण माँगें",
                      )}
                    </small>
                  </span>
                </label>
                <label className={styles.choiceCard}>
                  <input type="radio" name="type" />
                  <span>
                    <strong>{t("Make an Offer", "प्रस्ताव दें")}</strong>
                    <small>
                      {t(
                        "Propose a price and terms",
                        "मूल्य और शर्तें प्रस्तावित करें",
                      )}
                    </small>
                  </span>
                </label>
              </div>
            </section>
            <section className={styles.formSection}>
              <h2>
                {t("2. Your Message / Questions", "2. आपका संदेश / प्रश्न")}
              </h2>
              <div className={styles.fieldGrid}>
                <label className={styles.fieldFull}>
                  <textarea
                    placeholder={t(
                      "Write your questions or message to the seller...",
                      "विक्रेता के लिए अपने प्रश्न या संदेश लिखें...",
                    )}
                    maxLength={500}
                  />
                </label>
              </div>
              <div className={styles.quickQuestions}>
                {[
                  localized(
                    "Is the animal vaccinated?",
                    "क्या पशु का टीकाकरण हुआ है?",
                  ),
                  localized(
                    "Any diseases in the past?",
                    "पहले कोई बीमारी हुई है?",
                  ),
                  localized(
                    "Can I visit the farm?",
                    "क्या मैं फार्म आ सकता हूँ?",
                  ),
                  localized(
                    "Is the price negotiable?",
                    "क्या मूल्य पर बातचीत संभव है?",
                  ),
                ].map((question) => (
                  <button type="button" key={t(question)}>
                    {t(question)}
                  </button>
                ))}
              </div>
            </section>
            <section className={styles.formSection}>
              <h2>{t("3. Attachments (Optional)", "3. संलग्नक (वैकल्पिक)")}</h2>
              <button className={styles.secondaryButton} type="button">
                <FileUp size={18} />
                {t(
                  "Upload documents, references or requirements",
                  "दस्तावेज़, संदर्भ या आवश्यकताएँ अपलोड करें",
                )}
              </button>
            </section>
            <section className={styles.formSection}>
              <h2>
                {t(
                  "4. Offer Details (Optional)",
                  "4. प्रस्ताव विवरण (वैकल्पिक)",
                )}
              </h2>
              <div className={styles.fieldGrid}>
                <label>
                  {t("Your Offer", "आपका प्रस्ताव")}
                  <input
                    placeholder={t("₹ Enter Amount", "₹ राशि दर्ज करें")}
                  />
                </label>
                <label>
                  {t("Payment Mode Preferred", "पसंदीदा भुगतान माध्यम")}
                  <select>
                    <option>{t("Select", "चुनें")}</option>
                    <option>UPI</option>
                    <option>{t("Bank Transfer", "बैंक ट्रांसफ़र")}</option>
                  </select>
                </label>
                <label>
                  {t("Advance Amount", "अग्रिम राशि")}
                  <input
                    placeholder={t("₹ Enter Amount", "₹ राशि दर्ज करें")}
                  />
                </label>
                <label>
                  {t("Offer Valid Till", "प्रस्ताव मान्य तिथि")}
                  <input type="date" />
                </label>
                <label className={styles.fieldFull}>
                  {t("Additional Terms", "अतिरिक्त शर्तें")}
                  <textarea
                    placeholder={t(
                      "Transport, veterinary checkup, delivery timeline...",
                      "परिवहन, पशु चिकित्सा जाँच, डिलीवरी समय-सीमा...",
                    )}
                  />
                </label>
              </div>
              <label className={styles.choiceCard}>
                <input type="checkbox" />
                {t(
                  "I agree to the marketplace terms",
                  "मैं बाज़ार की शर्तों से सहमत हूँ",
                )}
              </label>
              <button className={styles.primaryButton} type="submit">
                <Send size={18} />
                {t("Send Enquiry / Offer", "पूछताछ / प्रस्ताव भेजें")}
              </button>
            </section>
          </form>

          <article className={styles.panel}>
            <h2>{t("Recent Conversation", "हाल की बातचीत")}</h2>
            <p>
              <b>Krishna Dairy Farm:</b>{" "}
              {t(
                "Yes, all vaccinations are up to date. Milk record attached.",
                "हाँ, सभी टीकाकरण अद्यतन हैं। दूध का रिकॉर्ड संलग्न है।",
              )}
            </p>
          </article>
        </div>
        <aside className={styles.sideStack}>
          <article>
            <h2>{t("Enquiry Status", "पूछताछ की स्थिति")}</h2>
            <p>
              {t("Enquiry Initiated", "पूछताछ शुरू हुई")}
              <br />
              ENQ-2400518-00021
              <br />
              <br />
              {t("Valid Till:", "मान्य तिथि:")}{" "}
              <b>{t("26 May 2024", "26 मई 2024")}</b>
            </p>
          </article>
          <SellerCard compact />
          <article>
            <h2>{t("Enquiry Timeline", "पूछताछ समयरेखा")}</h2>
            <ol className={styles.timeline}>
              <li>
                <strong>
                  {t("Enquiry Initiated by You", "आपने पूछताछ शुरू की")}
                </strong>
                <small>
                  {t("19 May 2024, 10:30 AM", "19 मई 2024, 10:30 पूर्वाह्न")}
                </small>
              </li>
              <li>
                <strong>
                  {t("Seller Acknowledged", "विक्रेता ने स्वीकार किया")}
                </strong>
                <small>
                  {t("Seller will respond soon.", "विक्रेता जल्द जवाब देगा।")}
                </small>
              </li>
              <li>
                <strong>
                  {t(
                    "Awaiting Seller Response",
                    "विक्रेता के उत्तर की प्रतीक्षा",
                  )}
                </strong>
                <small>
                  {t(
                    "Typically responds within 24 hrs",
                    "आमतौर पर 24 घंटे में उत्तर मिलता है",
                  )}
                </small>
              </li>
            </ol>
          </article>
          <article>
            <h2>{t("Safe Trade Tips", "सुरक्षित व्यापार सुझाव")}</h2>
            <ul className={styles.checkList}>
              {[
                localized(
                  "Visit the farm and verify the animal",
                  "फार्म जाएँ और पशु का सत्यापन करें",
                ),
                localized(
                  "Check health, age and documents",
                  "स्वास्थ्य, आयु और दस्तावेज़ जाँचें",
                ),
                localized(
                  "Do not share OTP or bank details",
                  "OTP या बैंक विवरण साझा न करें",
                ),
                localized(
                  "Use secure payments and receipts",
                  "सुरक्षित भुगतान और रसीदों का उपयोग करें",
                ),
              ].map((tip) => (
                <li key={t(tip)}>
                  <CheckCircle2 size={15} />
                  {t(tip)}
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </section>
      <aside className={styles.safeBar}>
        <ShieldCheck size={22} />
        <strong>
          {t(
            "Raj Kisan Suvidha ensures safe, transparent and trusted livestock trading",
            "Raj Kisan Suvidha सुरक्षित, पारदर्शी और भरोसेमंद पशुधन व्यापार सुनिश्चित करता है",
          )}
        </strong>
      </aside>
    </div>
  );
}
