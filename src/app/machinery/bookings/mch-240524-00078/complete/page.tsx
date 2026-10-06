import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  AlertTriangle,
  Check,
  Download,
  ListChecks,
  ShieldCheck,
} from "lucide-react";

import {
  InclusionList,
  MachineSummary,
  MachineryPageHeader,
} from "@/features/machinery/components/machinery-components";
import { CompletionFeedback } from "@/features/machinery/components/machinery-interactions";
import styles from "@/features/machinery/components/machinery.module.css";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t("Service Completion and Rating", "सेवा पूर्णता और रेटिंग"),
  };
}

export default async function MachineryCompletionPage() {
  const t = createTranslator(await getRequestLocale());
  const summary = [
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
      localized("Service Date", "सेवा तिथि"),
      localized("24 May 2024", "24 मई 2024"),
    ],
    [
      localized("Time Slot", "समय स्लॉट"),
      localized("08:00 AM – 10:00 AM", "08:00 पूर्वाह्न – 10:00 पूर्वाह्न"),
    ],
    [localized("Total Duration", "कुल अवधि"), localized("2 Hours", "2 घंटे")],
    [
      localized("Area Covered", "कवर किया क्षेत्र"),
      localized("2.5 Acre", "2.5 एकड़"),
    ],
    [
      localized("Soil Condition", "मिट्टी की स्थिति"),
      localized("Normal", "सामान्य"),
    ],
    [localized("Operator", "ऑपरेटर"), "Suresh Yadav"],
    [localized("Machine / Vehicle No.", "मशीन / वाहन संख्या"), "UP53 AB 1234"],
    [
      localized("Transport", "परिवहन"),
      localized("Included (Within 25 km)", "शामिल (25 किमी के भीतर)"),
    ],
  ] as const;

  return (
    <div className={styles.stack}>
      <MachineryPageHeader
        backHref="/machinery/bookings/mch-240524-00078"
        title={t("Service Completion & Rating", "सेवा पूर्णता और रेटिंग")}
        subtitle={t(
          "Confirm completed work and share your feedback",
          "पूर्ण हुए कार्य की पुष्टि करें और अपनी प्रतिक्रिया साझा करें",
        )}
      />
      <section className={styles.confirmationBanner}>
        <span>
          <Check size={36} />
        </span>
        <div>
          <h1>{t("Service Completed!", "सेवा पूर्ण हुई!")}</h1>
          <p>
            {t(
              "Thank you for exploring Bihar Kisan Suvidha Machinery Services.",
              "बिहार किसान सुविधा की मशीनरी सेवाओं का डेमो देखने के लिए धन्यवाद।",
            )}
          </p>
          <small>
            {t(
              "Please confirm the service and share your feedback.",
              "कृपया सेवा की पुष्टि करें और अपनी प्रतिक्रिया साझा करें।",
            )}
          </small>
        </div>
        <div>
          <small>{t("Booking ID:", "बुकिंग ID:")} MCH-240524-00078</small>
          <span>
            {t(
              "Completed on: 24 May 2024, 11:35 AM",
              "पूर्ण हुआ: 24 मई 2024, 11:35 पूर्वाह्न",
            )}
          </span>
          <button type="button">
            <Download size={17} />{" "}
            {t("Download Completion Summary", "पूर्णता सारांश डाउनलोड करें")}
          </button>
        </div>
      </section>
      <MachineSummary />

      <div className={styles.reviewGrid}>
        <section className={styles.detailPanel}>
          <h2>{t("Service Summary", "सेवा सारांश")}</h2>
          <dl className={styles.detailList}>
            {summary.map(([a, b]) => (
              <div key={t(a)}>
                <dt>{t(a)}</dt>
                <dd>{t(b)}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className={styles.detailPanel}>
          <h2>{t("Work Completed", "पूर्ण कार्य")}</h2>
          <InclusionList />
          <p className={styles.allGood}>
            <Check size={18} /> {t("All Good", "सब ठीक है")}
          </p>
        </section>
      </div>

      <CompletionFeedback />
      <div className={styles.feedbackLower}>
        <section className={styles.detailPanel}>
          <h2>
            {t("Add Photos", "तस्वीरें जोड़ें")}{" "}
            <small>{t("(Optional)", "(वैकल्पिक)")}</small>
          </h2>
          <p>
            {t(
              "Upload photos of the completed work",
              "पूर्ण कार्य की तस्वीरें अपलोड करें",
            )}
          </p>
          <div className={styles.photoStrip}>
            {[1, 2, 3].map((item) => (
              <Image
                src={`/images/authenticated/machinery/field-${item}.jpg`}
                alt=""
                width={100}
                height={82}
                key={item}
              />
            ))}
          </div>
        </section>
        <section className={styles.detailPanel}>
          <h2>
            <ShieldCheck size={20} />{" "}
            {t("Safe & Trusted Service", "सुरक्षित और भरोसेमंद सेवा")}
          </h2>
          <p>
            {t(
              "This demo does not collect or process real payments.",
              "यह डेमो वास्तविक भुगतान नहीं लेता या संसाधित करता है।",
            )}
          </p>
        </section>
      </div>
      <section className={styles.paymentStatus}>
        <div>
          <strong>{t("Payment Status", "भुगतान स्थिति")}</strong>
          <b>{t("Paid", "भुगतान किया")} · ₹3,045</b>
          <small>
            {t("24 May 2024, 07:42 AM", "24 मई 2024, 07:42 पूर्वाह्न")}
          </small>
        </div>
        <div>
          <strong>{t("Invoice", "चालान")}</strong>
          <b>INV-MCH-240524-00078</b>
          <button type="button">
            <Download size={16} /> {t("Download Invoice", "चालान डाउनलोड करें")}
          </button>
        </div>
        <div>
          <strong>{t("Need Help?", "मदद चाहिए?")}</strong>
          <p>
            {t(
              "Contact our support team for any queries or issues.",
              "किसी भी प्रश्न या समस्या के लिए हमारी सहायता टीम से संपर्क करें।",
            )}
          </p>
          <Link href="/more#help">
            {t("Chat with Support", "सहायता टीम से चैट करें")}
          </Link>
        </div>
      </section>
      <div className={styles.pageActions}>
        <button type="button">
          <AlertTriangle size={18} />{" "}
          {t("Report an Issue", "समस्या की रिपोर्ट करें")}
        </button>
        <Link href="/machinery">
          <ListChecks size={18} /> {t("View My Bookings", "मेरी बुकिंग देखें")}
        </Link>
        <Link className={styles.primaryButton} href="/machinery">
          <Check size={18} />{" "}
          {t("Confirm & Close Booking", "पुष्टि करके बुकिंग बंद करें")}
        </Link>
      </div>
      <aside className={styles.sourceNote}>
        <ShieldCheck size={17} />{" "}
        {t(
          "Thank you for exploring Bihar Kisan Suvidha Machinery Services!",
          "बिहार किसान सुविधा मशीनरी सेवाओं का डेमो देखने के लिए धन्यवाद!",
        )}
      </aside>
    </div>
  );
}
