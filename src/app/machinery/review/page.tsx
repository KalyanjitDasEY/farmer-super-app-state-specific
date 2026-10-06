import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Info,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import {
  InclusionList,
  MachineSummary,
  MachineryPageHeader,
  PriceBreakdown,
  ServiceDetails,
  TrustStrip,
} from "@/features/machinery/components/machinery-components";
import { PaymentMethods } from "@/features/machinery/components/machinery-interactions";
import styles from "@/features/machinery/components/machinery.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return {
    title: t("Booking Review and Payment", "बुकिंग समीक्षा और भुगतान"),
  };
}

export default async function MachineryReviewPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <div className={styles.stack}>
      <MachineryPageHeader
        backHref="/machinery/machine"
        title={t("Booking Review & Payment", "बुकिंग समीक्षा और भुगतान")}
        subtitle={t(
          "Review all details and confirm your booking",
          "सभी विवरणों की समीक्षा करके अपनी बुकिंग की पुष्टि करें",
        )}
      />
      <aside className={styles.matchNotice}>
        <Info size={18} />{" "}
        {t(
          "Please review your booking details, charges and policies before making the payment.",
          "भुगतान करने से पहले अपनी बुकिंग का विवरण, शुल्क और नीतियाँ जाँच लें।",
        )}
      </aside>
      <MachineSummary />

      <div className={styles.reviewGrid}>
        <div className={styles.stack}>
          <ServiceDetails />
          <div className={styles.reviewPair}>
            <section className={styles.detailPanel}>
              <h2>{t("Inclusions", "शामिल सेवाएँ")}</h2>
              <InclusionList />
            </section>
            <section className={styles.detailPanel}>
              <h2>{t("Important Notes", "महत्वपूर्ण नोट्स")}</h2>
              <p>
                {t(
                  "Extra transport beyond 25 km will be charged at actuals.",
                  "25 किमी से अधिक परिवहन का वास्तविक शुल्क लिया जाएगा।",
                )}
              </p>
              <p>
                {t(
                  "Waiting time beyond 30 minutes may be chargeable.",
                  "30 मिनट से अधिक प्रतीक्षा का शुल्क लग सकता है।",
                )}
              </p>
              <p>
                {t(
                  "Cancellation is free up to 12 hours before booking.",
                  "बुकिंग से 12 घंटे पहले तक रद्द करना निःशुल्क है।",
                )}
              </p>
            </section>
          </div>
          <section className={styles.detailPanel}>
            <h2>{t("Cancellation Policy", "रद्दीकरण नीति")}</h2>
            <ul>
              <li>
                {t(
                  "Free cancellation up to 12 hours before the booking time.",
                  "बुकिंग समय से 12 घंटे पहले तक निःशुल्क रद्दीकरण।",
                )}
              </li>
              <li>
                {t(
                  "50% charges applicable for cancellation between 12 to 2 hours.",
                  "12 से 2 घंटे के बीच रद्द करने पर 50% शुल्क लागू।",
                )}
              </li>
              <li>
                {t(
                  "No refund for cancellation within 2 hours.",
                  "2 घंटे के भीतर रद्द करने पर कोई धनवापसी नहीं।",
                )}
              </li>
            </ul>
          </section>
        </div>
        <div className={styles.stack}>
          <PriceBreakdown total="₹3,045" />
          <section className={styles.detailPanel}>
            <h2>{t("Payment Method", "भुगतान का तरीका")}</h2>
            <PaymentMethods />
          </section>
          <section className={styles.helpPanel}>
            <h2>{t("Need Help?", "मदद चाहिए?")}</h2>
            <p>
              {t(
                "Our support team is here to help you.",
                "हमारी सहायता टीम आपकी मदद के लिए उपलब्ध है।",
              )}
            </p>
            <Link href="/more#help">
              <MessageCircle size={17} />{" "}
              {t("Chat with Support", "सहायता टीम से चैट करें")}
            </Link>
          </section>
        </div>
      </div>

      <section className={styles.paymentSummary}>
        <div>
          <ShieldCheck size={25} />
          <span>
            <strong>{t("Price Summary", "मूल्य सारांश")}</strong>
            {t(
              "No hidden charges. What you see is what you pay.",
              "कोई छिपा शुल्क नहीं। जो दिखता है, वही भुगतान करें।",
            )}
          </span>
        </div>
        <div>
          <small>{t("Total Amount Payable", "कुल देय राशि")}</small>
          <strong>
            ₹3,045 <LockKeyhole size={19} />
          </strong>
          <span>
            {t(
              "Secure · Transparent · Trusted",
              "सुरक्षित · पारदर्शी · भरोसेमंद",
            )}
          </span>
        </div>
        <Link href="/machinery/bookings/mch-240524-00078">
          {t(
            "Confirm & Pay ₹3,045 →",
            "पुष्टि करें और ₹3,045 का भुगतान करें →",
          )}
        </Link>
      </section>
      <TrustStrip />
      <aside className={styles.sourceNote}>
        <Check size={17} />{" "}
        {t(
          "Bihar Kisan Suvidha demonstrates farm mechanization services; no real booking is made.",
          "बिहार किसान सुविधा कृषि मशीनीकरण सेवाओं का डेमो है; वास्तविक बुकिंग नहीं होती।",
        )}
      </aside>
    </div>
  );
}
