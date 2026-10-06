import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
  Clock3,
  Download,
  MapPin,
  MessageCircle,
  Phone,
  Tractor,
} from "lucide-react";

import {
  BookingProgress,
  InclusionList,
  MachineSummary,
  MachineryPageHeader,
  PriceBreakdown,
  ServiceDetails,
  TrustStrip,
} from "@/features/machinery/components/machinery-components";
import styles from "@/features/machinery/components/machinery.module.css";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Machinery Booking Details", "मशीनरी बुकिंग विवरण") };
}

export default async function MachineryBookingPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <div className={styles.stack}>
      <MachineryPageHeader
        backHref="/machinery"
        title={t("Booking Details", "बुकिंग विवरण")}
        subtitle={t(
          "Track your machinery service in real time",
          "अपनी मशीनरी सेवा को वास्तविक समय में ट्रैक करें",
        )}
      />
      <section className={styles.confirmationBanner}>
        <span>
          <Check size={36} />
        </span>
        <div>
          <h1>{t("Booking Confirmed!", "बुकिंग की पुष्टि हुई!")}</h1>
          <p>
            {t(
              "Your booking has been confirmed successfully.",
              "आपकी बुकिंग सफलतापूर्वक पुष्ट हो गई है।",
            )}
          </p>
          <small>{t("Booking ID:", "बुकिंग ID:")} MCH-240524-00078</small>
        </div>
        <div>
          <small>{t("Total Amount Paid", "कुल भुगतान राशि")}</small>
          <strong>₹3,045</strong>
          <span>
            {t("24 May 2024, 07:42 AM", "24 मई 2024, 07:42 पूर्वाह्न")}
          </span>
          <button type="button">
            <Download size={17} /> {t("Download Receipt", "रसीद डाउनलोड करें")}
          </button>
        </div>
      </section>
      <MachineSummary />
      <BookingProgress />

      <div className={styles.trackingGrid}>
        <section className={styles.trackingPanel}>
          <div className={styles.sectionTitle}>
            <h2>{t("Live Tracking", "लाइव ट्रैकिंग")}</h2>
            <span>
              {t("Live · Updated just now", "लाइव · अभी अपडेट किया गया")}
            </span>
          </div>
          <div className={styles.trackingMap}>
            <Image
              src="/images/authenticated/machinery/tracking-map.jpg"
              alt={t(
                "Live machinery tracking map",
                "मशीनरी की लाइव ट्रैकिंग का नक्शा",
              )}
              fill
              sizes="500px"
            />
            <span>
              <Tractor size={24} />
            </span>
          </div>
        </section>
        <section className={styles.detailPanel}>
          <h2>{t("Estimated Arrival", "अनुमानित आगमन")}</h2>
          <strong className={styles.arrivalTime}>
            <Clock3 size={24} /> {t("25 min", "25 मिनट")}
          </strong>
          <p>
            {t(
              "09:40 AM · Distance: 8.3 km",
              "09:40 पूर्वाह्न · दूरी: 8.3 किमी",
            )}
          </p>
          <h3>{t("Vehicle / Machine", "वाहन / मशीन")}</h3>
          <p>
            UP53 AB 1234
            <br />
            Mahindra Tractor 45 HP
          </p>
          <h3>{t("Driver / Operator", "चालक / ऑपरेटर")}</h3>
          <p>Suresh Yadav · ★ 4.7 (86)</p>
          <div className={styles.twoActions}>
            <Link href="/more#help">
              <MessageCircle size={17} /> {t("Chat", "चैट")}
            </Link>
            <a href="tel:+911800000000">
              <Phone size={17} /> {t("Call", "कॉल")}
            </a>
          </div>
        </section>
        <section className={styles.detailPanel}>
          <h2>{t("What's Next?", "आगे क्या होगा?")}</h2>
          <ol className={styles.nextList}>
            {[
              localized("On Site", "स्थल पर"),
              localized("Work in Progress", "कार्य प्रगति पर"),
              localized("Job Completed", "कार्य पूर्ण"),
              localized("Payment Settled", "भुगतान निपटाया गया"),
            ].map((item) => (
              <li key={t(item)}>
                <CheckCircle2 size={18} />
                <span>
                  <strong>{t(item)}</strong>
                  {t(
                    "You will receive updates as the service progresses.",
                    "सेवा आगे बढ़ने पर आपको अपडेट मिलते रहेंगे।",
                  )}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className={styles.bookingDetailsGrid}>
        <ServiceDetails />
        <PriceBreakdown total="₹3,045" />
        <section className={styles.detailPanel}>
          <h2>{t("Inclusions", "शामिल सेवाएँ")}</h2>
          <InclusionList />
          <h2>{t("Need Help?", "मदद चाहिए?")}</h2>
          <Link className={styles.outlineAction} href="/more#help">
            {t("Chat with Support", "सहायता टीम से चैट करें")}
          </Link>
          <a className={styles.outlineAction} href="tel:+911800000000">
            {t("Call Support", "सहायता टीम को कॉल करें")}
          </a>
        </section>
      </div>
      <div className={styles.dashboardGrid}>
        <section className={styles.detailPanel}>
          <h2>{t("Updates & Notifications", "अपडेट और सूचनाएँ")}</h2>
          <p>
            {t(
              "Provider accepted your booking.",
              "प्रदाता ने आपकी बुकिंग स्वीकार कर ली।",
            )}
          </p>
          <p>
            {t(
              "Machine has been allotted and is on the way.",
              "मशीन आवंटित हो गई है और रास्ते में है।",
            )}
          </p>
          <p>
            {t(
              "You will be notified on arrival at your field.",
              "खेत पर पहुँचने पर आपको सूचित किया जाएगा।",
            )}
          </p>
        </section>
        <section className={styles.detailPanel}>
          <h2>{t("Documents & Invoice", "दस्तावेज़ और चालान")}</h2>
          <p>{t("Booking Confirmation · PDF", "बुकिंग पुष्टि · PDF")}</p>
          <p>{t("Payment Receipt · PDF", "भुगतान रसीद · PDF")}</p>
          <p>{t("Terms & Conditions · PDF", "नियम और शर्तें · PDF")}</p>
        </section>
        <section className={styles.detailPanel}>
          <h2>{t("Quick Actions", "त्वरित कार्रवाइयाँ")}</h2>
          <Link href="/machinery/requirements">
            {t("Reschedule Booking", "बुकिंग का समय बदलें")}
          </Link>
          <Link href="/machinery">
            {t("Cancel Booking", "बुकिंग रद्द करें")}
          </Link>
          <Link href="/machinery/bookings/mch-240524-00078/complete">
            {t("Complete Service & Rate", "सेवा पूर्ण करें और रेटिंग दें")}
          </Link>
        </section>
      </div>
      <TrustStrip />
      <aside className={styles.sourceNote}>
        <MapPin size={17} />{" "}
        {t(
          "This is a Bihar Kisan Suvidha demo booking, not a real reservation.",
          "यह बिहार किसान सुविधा की डेमो बुकिंग है, वास्तविक आरक्षण नहीं।",
        )}
      </aside>
    </div>
  );
}
