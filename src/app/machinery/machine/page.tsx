import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import { Clock3, MapPin, MessageCircle, ShieldCheck, Star } from "lucide-react";

import {
  InclusionList,
  MachineSummary,
  MachineryPageHeader,
  PriceBreakdown,
} from "@/features/machinery/components/machinery-components";
import styles from "@/features/machinery/components/machinery.module.css";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t("Machine and Provider Detail", "मशीन और प्रदाता का विवरण"),
  };
}

export default async function MachineryDetailPage() {
  const t = createTranslator(await getRequestLocale());
  const dates = [
    ["Mon 20", "सोम 20"],
    ["Tue 21", "मंगल 21"],
    ["Wed 22", "बुध 22"],
    ["Thu 23", "गुरु 23"],
    ["Fri 24", "शुक्र 24"],
    ["Sat 25", "शनि 25"],
    ["Sun 26", "रवि 26"],
  ] as const;

  return (
    <div className={styles.stack}>
      <MachineryPageHeader
        backHref="/machinery/providers"
        title={t("Machine & Provider Detail", "मशीन और प्रदाता का विवरण")}
        subtitle={t(
          "Review machine, provider, availability and pricing before booking",
          "बुकिंग से पहले मशीन, प्रदाता, उपलब्धता और मूल्य की समीक्षा करें",
        )}
      />
      <MachineSummary />

      <div className={styles.detailTopGrid}>
        <section className={styles.detailPanel}>
          <h2>{t("Provider Information", "प्रदाता की जानकारी")}</h2>
          <div className={styles.providerProfile}>
            <span className={styles.providerLogo}>K</span>
            <div>
              <h3>
                Krishna FPO Society <ShieldCheck size={16} />
              </h3>
              <p>FPO · {t("6.2 km away", "6.2 किमी दूर")}</p>
              <strong>
                <Star size={16} /> 4.6 (128 {t("Reviews", "समीक्षाएँ")})
              </strong>
            </div>
          </div>
          <p className={styles.aboutProvider}>
            {t(
              "Krishna FPO Society provides farm mechanization services with trained operators and well-maintained machines. Serving 12+ villages in the region.",
              "Krishna FPO Society प्रशिक्षित ऑपरेटरों और अच्छी तरह रखरखाव वाली मशीनों के साथ कृषि मशीनीकरण सेवाएँ देता है। क्षेत्र के 12+ गाँवों में सेवा उपलब्ध है।",
            )}
          </p>
          <div className={styles.twoActions}>
            <button type="button">
              {t("View Provider Profile", "प्रदाता प्रोफ़ाइल देखें")}
            </button>
            <Link href="/more#help">
              <MessageCircle size={17} />{" "}
              {t("Chat with Provider", "प्रदाता से चैट करें")}
            </Link>
          </div>
        </section>
        <section className={styles.detailPanel}>
          <div className={styles.metricGrid}>
            <div>
              <small>{t("Response Time", "प्रतिक्रिया समय")}</small>
              <strong>{t("15 min", "15 मिनट")}</strong>
            </div>
            <div>
              <small>{t("Jobs Completed", "पूर्ण कार्य")}</small>
              <strong>1,250+</strong>
            </div>
            <div>
              <small>{t("Customer Rating", "ग्राहक रेटिंग")}</small>
              <strong>4.6/5</strong>
            </div>
          </div>
          <h2>{t("Location", "स्थान")}</h2>
          <div className={styles.locationPanel}>
            <Image
              src="/images/authenticated/machinery/provider-map.jpg"
              alt={t("Provider location map", "प्रदाता के स्थान का नक्शा")}
              width={180}
              height={150}
            />
            <span>
              <strong>{t("Main Office", "मुख्य कार्यालय")}</strong>
              {t(
                "Krishna FPO Society, Amhara, Bihta, Patna, Bihar – 801103",
                "Krishna FPO Society, अमहरा, बिहटा, पटना, बिहार – 801103",
              )}
              <small>
                {t(
                  "Service Area: Within 25 km radius",
                  "सेवा क्षेत्र: 25 किमी के दायरे में",
                )}
              </small>
            </span>
          </div>
        </section>
      </div>

      <div className={styles.detailTopGrid}>
        <section className={styles.detailPanel}>
          <h2>{t("Availability", "उपलब्धता")}</h2>
          <div className={styles.dateStrip}>
            {dates.map(([date, hindiDate]) => (
              <button
                className={date === "Thu 23" ? styles.selectedDate : ""}
                type="button"
                key={date}
              >
                {t(date, hindiDate)}
              </button>
            ))}
          </div>
          <p>
            {t(
              "Available Time Slots on Thu, 23 May",
              "गुरु, 23 मई को उपलब्ध समय स्लॉट",
            )}
          </p>
          <div className={styles.timeSlots}>
            {[
              "08:00 AM – 10:00 AM",
              "10:00 AM – 12:00 PM",
              "01:00 PM – 03:00 PM",
              "03:00 PM – 05:00 PM",
            ].map((time, index) => (
              <button
                className={index === 0 ? styles.selectedDate : ""}
                type="button"
                key={time}
              >
                {t(
                  time,
                  time
                    .replaceAll("AM", "पूर्वाह्न")
                    .replaceAll("PM", "अपराह्न"),
                )}
              </button>
            ))}
          </div>
        </section>
        <section className={styles.detailPanel}>
          <h2>{t("Selected Service Details", "चयनित सेवा विवरण")}</h2>
          <dl className={styles.detailList}>
            {(
              [
                [
                  localized("Field / Plot", "खेत / प्लॉट"),
                  localized(
                    "Field 1 - North Side (2.5 Acre)",
                    "खेत 1 - उत्तर दिशा (2.5 एकड़)",
                  ),
                ],
                [
                  localized("Operation", "कार्य"),
                  localized("Tillage / Ploughing", "जुताई / हल चलाना"),
                ],
                [
                  localized("Preferred Date", "पसंदीदा तिथि"),
                  localized("23 May 2024", "23 मई 2024"),
                ],
                [
                  localized("Time Slot", "समय स्लॉट"),
                  localized(
                    "08:00 AM – 10:00 AM",
                    "08:00 पूर्वाह्न – 10:00 पूर्वाह्न",
                  ),
                ],
                [
                  localized("Expected Duration", "अनुमानित अवधि"),
                  localized("2 Hours", "2 घंटे"),
                ],
                [
                  localized("Soil Condition", "मिट्टी की स्थिति"),
                  localized("Normal", "सामान्य"),
                ],
              ] as const
            ).map(([a, b]) => (
              <div key={t(a)}>
                <dt>{t(a)}</dt>
                <dd>{t(b)}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <div className={styles.fourPanelGrid}>
        <PriceBreakdown />
        <section className={styles.detailPanel}>
          <h2>{t("What's Included", "क्या शामिल है")}</h2>
          <InclusionList />
          <h3>{t("What's Not Included", "क्या शामिल नहीं है")}</h3>
          <p>
            {t("Extra Transport (>25 km)", "अतिरिक्त परिवहन (>25 किमी)")}
            <br />
            {t("Field Preparation", "खेत की तैयारी")}
            <br />
            {t("Additional Attachments", "अतिरिक्त अटैचमेंट")}
          </p>
        </section>
        <section className={styles.detailPanel}>
          <h2>{t("Ratings & Reviews", "रेटिंग और समीक्षाएँ")}</h2>
          <strong className={styles.largeRating}>4.6 ★★★★★</strong>
          <p>
            Suresh Yadav
            <br />
            <small>
              {t(
                "Machine was in excellent condition. Operator was skilled and on time.",
                "मशीन उत्कृष्ट स्थिति में थी। ऑपरेटर कुशल और समय पर था।",
              )}
            </small>
          </p>
          <p>
            Arvind Singh
            <br />
            <small>
              {t(
                "Good service and reasonable price.",
                "अच्छी सेवा और उचित मूल्य।",
              )}
            </small>
          </p>
        </section>
        <section className={styles.detailPanel}>
          <h2>{t("Policies & Safety", "नीतियाँ और सुरक्षा")}</h2>
          <InclusionList />
        </section>
      </div>

      <section className={styles.readyPanel}>
        <div>
          <Clock3 size={30} />
          <span>
            <strong>{t("Weather at Service Time", "सेवा के समय मौसम")}</strong>
            <b>29°C · {t("Partly Cloudy", "आंशिक बादल")}</b>
            <small>
              {t("Good for field operations", "खेत के कार्यों के लिए अच्छा")}
            </small>
          </span>
        </div>
        <div>
          <h2>{t("Ready to Book?", "बुक करने के लिए तैयार हैं?")}</h2>
          <p>
            {t(
              "You won't be charged until the provider confirms your booking.",
              "प्रदाता द्वारा बुकिंग की पुष्टि होने तक आपसे शुल्क नहीं लिया जाएगा।",
            )}
          </p>
          <strong>₹3,806</strong>
        </div>
        <div>
          <Link href="/machinery/review">
            {t("Request Booking", "बुकिंग अनुरोध भेजें")}
          </Link>
          <Link href="/more#help">
            {t("Enquire First", "पहले पूछताछ करें")}
          </Link>
        </div>
      </section>
      <aside className={styles.infoStrip}>
        <ShieldCheck size={20} />
        <span>
          <strong>
            {t("100% Safe & Trusted", "100% सुरक्षित और भरोसेमंद")}
          </strong>
          {t(
            "Verified providers, secure payments and dedicated support.",
            "सत्यापित प्रदाता, सुरक्षित भुगतान और समर्पित सहायता।",
          )}
        </span>
        <MapPin size={20} />
        <span>
          {t("Need Help? Contact Support", "मदद चाहिए? सहायता से संपर्क करें")}
        </span>
      </aside>
    </div>
  );
}
