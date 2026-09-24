import { ServiceImage as Image } from "@/components/media/ServiceImage";
import {
  CheckCircle2,
  Edit3,
  Headphones,
  Save,
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

const checks = [
  [
    localized("Animal Identity", "पशु की पहचान"),
    localized("Photo & basic details", "तस्वीर और मूल विवरण"),
    localized("Verified", "सत्यापित"),
  ],
  [
    localized("Age Verification", "आयु सत्यापन"),
    localized("Teeth / Birth record", "दाँत / जन्म रिकॉर्ड"),
    localized("Verified", "सत्यापित"),
  ],
  [
    localized("Breed Verification", "नस्ल सत्यापन"),
    localized("Breed characteristics", "नस्ल की विशेषताएँ"),
    localized("Verified", "सत्यापित"),
  ],
  [
    localized("Health Records", "स्वास्थ्य रिकॉर्ड"),
    localized("Vaccination & tests", "टीकाकरण और परीक्षण"),
    localized("Verified", "सत्यापित"),
  ],
  [
    localized("Milk Record", "दूध रिकॉर्ड"),
    localized("Milk test / Yield", "दूध परीक्षण / उत्पादन"),
    localized("Verified", "सत्यापित"),
  ],
  [
    localized("Pregnancy Status", "गर्भावस्था स्थिति"),
    localized("Test report", "परीक्षण रिपोर्ट"),
    localized("Verified", "सत्यापित"),
  ],
  [
    localized("Ownership Proof", "स्वामित्व प्रमाण"),
    localized("Seller identity", "विक्रेता की पहचान"),
    localized("Verified", "सत्यापित"),
  ],
  [
    localized("Price Validity", "मूल्य की वैधता"),
    localized("Market range check", "बाज़ार सीमा जाँच"),
    localized("Within Range", "सीमा के भीतर"),
  ],
  [
    localized("Photos Quality", "तस्वीरों की गुणवत्ता"),
    localized("Clear & authentic", "स्पष्ट और प्रामाणिक"),
    localized("Good", "अच्छी"),
  ],
  [
    localized("Information Accuracy", "जानकारी की सटीकता"),
    localized("Details cross-checked", "विवरण की दोबारा जाँच"),
    localized("In Review", "समीक्षाधीन"),
  ],
] as const;

export default async function ListingReviewPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <div className={styles.stack}>
      <PashuHeader role="Seller" />
      <PashuBreadcrumb
        items={[
          localized("My Listings", "मेरी लिस्टिंग"),
          localized("HF Cow (Milking)", "HF गाय (दुधारू)"),
          localized(
            "Listing Preview & Verification",
            "लिस्टिंग पूर्वावलोकन और सत्यापन",
          ),
        ]}
      />

      <section className={styles.progressSteps}>
        <div className={styles.complete}>
          <b>✓</b>
          <span>{t("Submitted", "जमा किया")}</span>
          <small>{t("19 May 2024", "19 मई 2024")}</small>
        </div>
        <div className={styles.current}>
          <b>2</b>
          <span>{t("Under Review", "समीक्षाधीन")}</span>
          <small>{t("In Progress", "प्रगति पर")}</small>
        </div>
        <div>
          <b>3</b>
          <span>{t("Verified", "सत्यापित")}</span>
          <small>{t("Pending", "लंबित")}</small>
        </div>
        <div>
          <b>4</b>
          <span>{t("Published", "प्रकाशित")}</span>
          <small>{t("Pending", "लंबित")}</small>
        </div>
        <div>
          <b>5</b>
          <span>{t("Expected Decision", "अपेक्षित निर्णय")}</span>
          <small>{t("Within 24 Hours", "24 घंटों के भीतर")}</small>
        </div>
      </section>

      <section className={styles.reviewLayout}>
        <div className={styles.stack}>
          <article className={styles.animalCompact}>
            <div className={styles.animalCompactImage}>
              <Image
                src="/images/authenticated/pashu-bazaar/hf-cow-detail.jpg"
                alt={t("HF Cow listing preview", "HF गाय लिस्टिंग पूर्वावलोकन")}
                fill
                loading="eager"
                sizes="320px"
              />
            </div>
            <div>
              <h2>{t("HF Cow (Milking)", "HF गाय (दुधारू)")}</h2>
              <strong className={styles.price}>₹78,000</strong>
              <p>{t("Price Negotiable", "मूल्य पर बातचीत संभव")}</p>
              <p>
                {t("Age: 3 Years 2 Months", "आयु: 3 वर्ष 2 महीने")}
                <br />
                {t("Milk Yield: 22–25 Ltr/Day", "दूध उत्पादन: 22–25 लीटर/दिन")}
                <br />
                {t("Pregnant: 3 Months", "गर्भवती: 3 महीने")}
                <br />
                {t("Breed:", "नस्ल:")} HF (Holstein Friesian)
                <br />
                {t("Location: Raipur, Deoria", "स्थान: रायपुर, देवरिया")}
              </p>
            </div>
          </article>
          <section className={styles.panelGrid}>
            <article className={styles.panel}>
              <h2>{t("Animal Details", "पशु विवरण")}</h2>
              <ul className={styles.detailList}>
                {(
                  [
                    [localized("Species", "प्रजाति"), localized("Cow", "गाय")],
                    [
                      localized("Category", "श्रेणी"),
                      localized("Milking", "दुधारू"),
                    ],
                    [
                      localized("Coat Colour", "त्वचा का रंग"),
                      localized("Black & White", "काला और सफेद"),
                    ],
                    [localized("Horn", "सींग"), localized("Small", "छोटे")],
                    [
                      localized("Temperament", "स्वभाव"),
                      localized("Calm", "शांत"),
                    ],
                    [
                      localized("Feed", "आहार"),
                      localized(
                        "Green Fodder + Balanced Feed",
                        "हरा चारा + संतुलित आहार",
                      ),
                    ],
                    [
                      localized("Suitable For", "उपयुक्त"),
                      localized("Dairy Farming", "डेयरी पालन"),
                    ],
                  ] as const
                ).map(([label, value]) => (
                  <li key={t(label)}>
                    <b>{t(label)}</b>
                    <span>{t(value)}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className={styles.panel}>
              <h2>{t("Production Information", "उत्पादन जानकारी")}</h2>
              <ul className={styles.detailList}>
                {(
                  [
                    [
                      localized("Milk Yield", "दूध उत्पादन"),
                      localized("22–25 Ltr/Day", "22–25 लीटर/दिन"),
                    ],
                    [
                      localized("Lactation No.", "दुग्धकाल संख्या"),
                      localized("2nd", "दूसरा"),
                    ],
                    [
                      localized("Calving Date", "ब्याने की तिथि"),
                      localized("10 Feb 2024", "10 फ़रवरी 2024"),
                    ],
                    [
                      localized("Days in Milk", "दूध देने के दिन"),
                      localized("98 Days", "98 दिन"),
                    ],
                    [
                      localized("Last Milk Test", "अंतिम दूध परीक्षण"),
                      localized("22.8 Ltr/Day", "22.8 लीटर/दिन"),
                    ],
                  ] as const
                ).map(([label, value]) => (
                  <li key={t(label)}>
                    <b>{t(label)}</b>
                    <span>{t(value)}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className={styles.panel}>
              <h2>{t("Health & Records", "स्वास्थ्य और रिकॉर्ड")}</h2>
              <ul className={styles.recordList}>
                {[
                  localized("Vaccination", "टीकाकरण"),
                  localized("Deworming", "कृमिनाशन"),
                  localized("Health Certificate", "स्वास्थ्य प्रमाणपत्र"),
                  localized("Milk Test", "दूध परीक्षण"),
                  localized("Pregnancy Test", "गर्भावस्था परीक्षण"),
                ].map((item) => (
                  <li key={t(item)}>
                    <CheckCircle2 size={15} />
                    <span>{t(item)}</span>
                    <b>{t("Verified", "सत्यापित")}</b>
                  </li>
                ))}
              </ul>
            </article>
            <article className={styles.panel}>
              <h2>{t("Documents Provided", "दिए गए दस्तावेज़")}</h2>
              <ul className={styles.recordList}>
                {[
                  localized("Health Certificate", "स्वास्थ्य प्रमाणपत्र"),
                  localized("Vaccination Record", "टीकाकरण रिकॉर्ड"),
                  localized("Milk Test Report", "दूध परीक्षण रिपोर्ट"),
                  localized(
                    "Pregnancy Test Report",
                    "गर्भावस्था परीक्षण रिपोर्ट",
                  ),
                  localized("Owner ID Proof", "मालिक का ID प्रमाण"),
                ].map((item) => (
                  <li key={t(item)}>
                    <CheckCircle2 size={15} />
                    <span>{t(item)}</span>
                    <b>{t("View", "देखें")}</b>
                  </li>
                ))}
              </ul>
            </article>
            <SellerCard compact />
            <article className={styles.panel}>
              <h2>{t("Location & Delivery", "स्थान और डिलीवरी")}</h2>
              <p>
                Ram Prasad Farm, Pusa Basmati 1121
                <br />
                {t(
                  "Raipur, Deoria, Uttar Pradesh – 274001",
                  "रायपुर, देवरिया, उत्तर प्रदेश – 274001",
                )}
              </p>
              <p>
                {t("Distance from buyer: 12 km", "खरीदार से दूरी: 12 किमी")}
                <br />
                {t(
                  "Delivery: Buyer Pickup / Farm Delivery",
                  "डिलीवरी: खरीदार पिकअप / फार्म डिलीवरी",
                )}
              </p>
            </article>
          </section>
        </div>
        <aside className={styles.sideStack}>
          <article>
            <h2>{t("Verification Checklist", "सत्यापन चेकलिस्ट")}</h2>
            <ul className={styles.recordList}>
              {checks.map(([title, detail, status]) => (
                <li key={t(title)}>
                  <CheckCircle2 size={16} />
                  <span>
                    <b>{t(title)}</b>
                    <br />
                    {t(detail)}
                  </span>
                  <strong>{t(status)}</strong>
                </li>
              ))}
            </ul>
          </article>
          <article>
            <h2>{t("Verifier Notes", "सत्यापनकर्ता के नोट्स")}</h2>
            <p>
              <b>{t("Verifier:", "सत्यापनकर्ता:")} Sandeep Singh</b>
              <br />
              {t("Livestock Verification Officer", "पशुधन सत्यापन अधिकारी")}
            </p>
            <p>
              {t(
                "All details look good. Minor corrections required in description and photos.",
                "सभी विवरण ठीक हैं। विवरण और तस्वीरों में मामूली सुधार आवश्यक हैं।",
              )}
            </p>
            <h2>{t("Corrections Requested (2)", "माँगे गए सुधार (2)")}</h2>
            <p>
              {t(
                "1. Add close-up photo of udder from side.",
                "1. थन की बगल से नज़दीकी तस्वीर जोड़ें।",
              )}
              <br />
              {t(
                "2. Upload clearer vaccination certificate.",
                "2. अधिक स्पष्ट टीकाकरण प्रमाणपत्र अपलोड करें।",
              )}
            </p>
          </article>
          <article>
            <h2>{t("Audit Trail", "ऑडिट ट्रेल")}</h2>
            <ol className={styles.timeline}>
              <li>
                <strong>{t("Listing Submitted", "लिस्टिंग जमा हुई")}</strong>
                <small>
                  {t("19 May 2024, 10:45 AM", "19 मई 2024, 10:45 पूर्वाह्न")}
                </small>
              </li>
              <li>
                <strong>{t("Under Review", "समीक्षाधीन")}</strong>
                <small>
                  {t("19 May 2024, 11:05 AM", "19 मई 2024, 11:05 पूर्वाह्न")}
                </small>
              </li>
              <li>
                <strong>{t("Action Pending", "कार्रवाई लंबित")}</strong>
                <small>
                  {t(
                    "Awaiting seller response",
                    "विक्रेता के उत्तर की प्रतीक्षा",
                  )}
                </small>
              </li>
            </ol>
          </article>
          <article>
            <h2>{t("Publication Readiness", "प्रकाशन की तैयारी")}</h2>
            <p>
              <b>{t("80% — Almost Ready!", "80% — लगभग तैयार!")}</b>
              <br />
              {t(
                "Address the requested corrections to publish.",
                "प्रकाशित करने के लिए माँगे गए सुधार पूरे करें।",
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
          <Edit3 size={17} />
          {t("Edit Listing", "लिस्टिंग संपादित करें")}
        </button>
        <button type="button">
          <Headphones size={17} />
          {t("Need Help?", "मदद चाहिए?")}
        </button>
        <button type="button">
          <Send size={17} />
          {t("Resubmit for Review", "समीक्षा के लिए पुनः जमा करें")}
        </button>
      </section>
      <aside className={styles.safeBar}>
        <ShieldCheck size={21} />
        {t(
          "Verified listings build trust and get more enquiries.",
          "सत्यापित लिस्टिंग भरोसा बढ़ाती हैं और अधिक पूछताछ लाती हैं।",
        )}
      </aside>
    </div>
  );
}
