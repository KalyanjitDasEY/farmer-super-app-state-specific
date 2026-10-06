import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  ArrowRight,
  Beef,
  CalendarDays,
  CheckCircle2,
  CircleGauge,
  Clock3,
  Heart,
  MapPin,
  Scale,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  PashuBreadcrumb,
  PashuHeader,
  SellerCard,
  TrustStrip,
} from "@/features/pashu-bazaar/components/pashu-components";
import styles from "@/features/pashu-bazaar/components/pashu-bazaar.module.css";
import { animals } from "@/features/pashu-bazaar/data/pashu-data";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export default async function AnimalDetailPage() {
  const t = createTranslator(await getRequestLocale());
  const animal = animals[0];

  if (!animal) {
    throw new Error(
      t(
        "The featured Pashu Bazaar animal is not configured.",
        "प्रमुख पशु बाज़ार पशु कॉन्फ़िगर नहीं किया गया है।",
      ),
    );
  }

  return (
    <div className={styles.stack}>
      <PashuHeader backHref="/pashu-bazaar/animals" />
      <PashuBreadcrumb
        items={[
          localized("Animal Details", "पशु विवरण"),
          localized("HF Cow (Milking)", "HF गाय (दुधारू)"),
        ]}
      />

      <section className={styles.animalDetailHero}>
        <div>
          <div className={styles.galleryMain}>
            <Image
              src="/images/authenticated/pashu-bazaar/hf-cow-detail.jpg"
              alt={t("Sample HF milking cow", "नमूना दुधारू HF गाय")}
              fill
              loading="eager"
              sizes="(max-width: 720px) 100vw, 50vw"
            />
          </div>
          <div className={styles.galleryThumbs}>
            {[
              animal.image,
              "/images/authenticated/pashu-bazaar/hf-cow-2.jpg",
              "/images/authenticated/pashu-bazaar/sahiwal-cow.jpg",
              animal.image,
            ].map((image, index) => (
              <span key={`${image}-${index}`}>
                <Image src={image} alt="" fill sizes="90px" />
              </span>
            ))}
            <span>
              +6
              <br />
              {t("More", "और")}
            </span>
          </div>
        </div>
        <div className={styles.detailSummary}>
          <h1>
            {t("HF Cow (Milking)", "HF गाय (दुधारू)")}
            <span>{t("Milking", "दुधारू")}</span>
          </h1>
          <p>{t("Animal ID:", "पशु ID:")} BV-AN-2400518-0456</p>
          <p>{t("Listed on 18 May 2024", "18 मई 2024 को सूचीबद्ध")}</p>
          <div className={styles.detailPrice}>
            <strong>₹78,000</strong>
            <span>{t("Price Negotiable", "मूल्य पर बातचीत संभव")}</span>
          </div>
          <div className={styles.taxBar}>
            {t("Inclusive of all applicable taxes", "सभी लागू कर शामिल")}
          </div>
          <div className={styles.specGrid}>
            <Spec
              icon={CalendarDays}
              label={t("Age", "आयु")}
              value={t("3 Years 2 Months", "3 वर्ष 2 महीने")}
            />
            <Spec
              icon={CircleGauge}
              label={t("Milk Yield", "दूध उत्पादन")}
              value={t("22–25 Ltr/Day", "22–25 लीटर/दिन")}
            />
            <Spec
              icon={Sparkles}
              label={t("Pregnant", "गर्भवती")}
              value={t("3 Months", "3 महीने")}
            />
            <Spec
              icon={Beef}
              label={t("Breed", "नस्ल")}
              value="HF (Holstein Friesian)"
            />
            <Spec
              icon={Scale}
              label={t("Body Weight", "शरीर का वज़न")}
              value={t("450–480 kg (Approx.)", "450–480 किग्रा (लगभग)")}
            />
            <Spec
              icon={MapPin}
              label={t("Gender", "लिंग")}
              value={t("Female", "मादा")}
            />
          </div>
          <article className={styles.whyAnimal}>
            <h2>{t("Why this animal?", "यह पशु क्यों?")}</h2>
            <p>
              {t(
                "High milk yield, calm nature, well maintained and regularly vaccinated.",
                "अधिक दूध उत्पादन, शांत स्वभाव, अच्छी देखभाल और नियमित टीकाकरण।",
              )}
            </p>
          </article>
        </div>
      </section>

      <TrustStrip />

      <section className={styles.contentColumns}>
        <div className={styles.panelGrid}>
          <article className={styles.panel}>
            <h2>{t("Animal Health & Records", "पशु स्वास्थ्य और रिकॉर्ड")}</h2>
            <ul className={styles.recordList}>
              {[
                localized(
                  "Vaccination — FMD, HS, BQ & Brucellosis Vaccinated",
                  "टीकाकरण — FMD, HS, BQ और ब्रुसेलोसिस का टीका लगा",
                ),
                localized("Deworming — 10 May 2024", "कृमिनाशन — 10 मई 2024"),
                localized(
                  "Health Certificate — Issued 15 May 2024",
                  "स्वास्थ्य प्रमाणपत्र — 15 मई 2024 को जारी",
                ),
                localized(
                  "Milk Test — 22.8 Ltr/Day",
                  "दूध परीक्षण — 22.8 लीटर/दिन",
                ),
                localized(
                  "Pregnancy Test — Positive, 3 Months",
                  "गर्भावस्था परीक्षण — पॉज़िटिव, 3 महीने",
                ),
                localized(
                  "Breed Certificate — Available",
                  "नस्ल प्रमाणपत्र — उपलब्ध",
                ),
              ].map((item) => (
                <li key={t(item)}>
                  <CheckCircle2 size={16} />
                  <span>{t(item)}</span>
                  <b>{t("Demo", "डेमो")}</b>
                </li>
              ))}
            </ul>
          </article>
          <article className={styles.panel}>
            <h2>{t("About the Animal", "पशु के बारे में")}</h2>
            <ul className={styles.detailList}>
              {(
                [
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
                    localized("Ration", "खुराक"),
                    localized("12–14 kg/Day", "12–14 किग्रा/दिन"),
                  ],
                  [
                    localized("Suitable For", "उपयुक्त"),
                    localized("Dairy Farming", "डेयरी पालन"),
                  ],
                  [
                    localized("Remarks", "टिप्पणी"),
                    localized(
                      "Well maintained, no disease history",
                      "अच्छी देखभाल, बीमारी का कोई इतिहास नहीं",
                    ),
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
            <h2>{t("Delivery & Logistics", "डिलीवरी और लॉजिस्टिक्स")}</h2>
            <ul className={styles.detailList}>
              {(
                [
                  [
                    localized("Delivery Available", "डिलीवरी उपलब्ध"),
                    localized("Within 24–72 Hours", "24–72 घंटों के भीतर"),
                  ],
                  [
                    localized("Transport Partner", "परिवहन भागीदार"),
                    "Bihar Kisan Suvidha Demo Logistics",
                  ],
                  [
                    localized("Estimated Delivery", "अनुमानित डिलीवरी"),
                    localized("21–22 May 2024", "21–22 मई 2024"),
                  ],
                  [
                    localized("Transport Charge", "परिवहन शुल्क"),
                    "₹1,800–₹2,500",
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
            <h2>{t("Location", "स्थान")}</h2>
            <div className={styles.mapImage}>
              <Image
                src="/images/authenticated/pashu-bazaar/farm-map.jpg"
                alt={t("Farm location map", "फार्म के स्थान का नक्शा")}
                fill
                sizes="360px"
              />
            </div>
            <p>
              {t("Village:", "गाँव:")} {t("Amhara", "अमहरा")}
              <br />
              {t("Bihta, Patna, Bihar – 801103", "बिहटा, पटना, बिहार – 801103")}
            </p>
          </article>
        </div>
        <SellerCard />
      </section>

      <section className={styles.bottomActions}>
        <button type="button">
          <Heart size={20} />
          {t("Save Animal", "पशु सहेजें")}
        </button>
        <button type="button">
          <Share2 size={20} />
          {t("Compare", "तुलना करें")}
        </button>
        <Link href="/pashu-bazaar/animals/hf-cow/enquiry">
          <Heart size={20} />
          {t(
            "Proceed to Contact Seller",
            "विक्रेता से संपर्क करने के लिए आगे बढ़ें",
          )}
          <ArrowRight size={19} />
        </Link>
      </section>
      <aside className={styles.safeBar}>
        <ShieldCheck size={23} />
        <strong>{t("Safe Trade Tips", "सुरक्षित व्यापार सुझाव")}</strong>
        <span>
          {t(
            "Visit the farm, verify the animal and documents, meet the seller in person, and use secure payments only.",
            "फार्म जाएँ, पशु और दस्तावेज़ सत्यापित करें, विक्रेता से व्यक्तिगत रूप से मिलें और केवल सुरक्षित भुगतान करें।",
          )}
        </span>
      </aside>
    </div>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
}) {
  return (
    <div>
      <Icon size={18} />
      <span>
        <strong>{label}</strong>
        <small>{value}</small>
      </span>
    </div>
  );
}
