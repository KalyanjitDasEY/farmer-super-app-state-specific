import type { Metadata } from "next";
import {
  BadgeCheck,
  Check,
  PackageCheck,
  ShieldCheck,
  Sprout,
  Truck,
} from "lucide-react";

import { PriceSummary } from "@/features/marketplace/components/marketplace-components";
import { CheckoutForm } from "@/features/marketplace/components/marketplace-interactions";
import styles from "@/features/marketplace/components/marketplace.module.css";
import { createTranslator } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Checkout", "चेकआउट") };
}

export default async function MarketplaceCheckoutPage() {
  const t = createTranslator(await getRequestLocale());
  return (
    <div className={styles.fullMarketPage}>
      <ol className={styles.checkoutSteps}>
        <li className={styles.stepDone}>
          <Check size={15} /> {t("Cart", "कार्ट")}
        </li>
        <li className={styles.stepDone}>
          <Check size={15} /> {t("Address", "पता")}
        </li>
        <li className={styles.stepCurrent}>
          3 <span>{t("Payment", "भुगतान")}</span>
        </li>
        <li>
          4 <span>{t("Review & Confirm", "समीक्षा और पुष्टि")}</span>
        </li>
      </ol>
      <div className={styles.checkoutLayout}>
        <main>
          <header className={styles.checkoutHeading}>
            <h1>{t("Checkout", "चेकआउट")}</h1>
            <p>
              {t(
                "Review your order, confirm payment and place your order",
                "अपने ऑर्डर की समीक्षा करें, भुगतान की पुष्टि करें और ऑर्डर दें",
              )}
            </p>
          </header>
          <CheckoutForm />
        </main>
        <aside className={styles.checkoutRail}>
          <PriceSummary checkout />
          <section className={styles.savingsBanner}>
            <Sprout size={31} />
            <span>
              <strong>
                {t(
                  "You are saving ₹92 on this order!",
                  "आप इस ऑर्डर पर ₹92 बचा रहे हैं!",
                )}
              </strong>
              {t(
                "Thanks for choosing trusted & approved inputs.",
                "विश्वसनीय और अनुमोदित इनपुट चुनने के लिए धन्यवाद।",
              )}
            </span>
          </section>
          <section className={styles.assuranceCard}>
            <h2>{t("Order Assurance", "ऑर्डर आश्वासन")}</h2>
            <span>
              <ShieldCheck size={20} />
              <b>
                {t("100% Authentic", "100% असली")}
                <small>
                  {t(
                    "Government Approved Inputs",
                    "सरकार द्वारा अनुमोदित इनपुट",
                  )}
                </small>
              </b>
            </span>
            <span>
              <BadgeCheck size={20} />
              <b>
                {t("Quality Assured", "गुणवत्ता सुनिश्चित")}
                <small>
                  {t(
                    "Lab Tested & Certified",
                    "प्रयोगशाला में जांचे और प्रमाणित",
                  )}
                </small>
              </b>
            </span>
            <span>
              <Truck size={20} />
              <b>
                {t("On-time Delivery", "समय पर डिलीवरी")}
                <small>{t("Fast & Reliable", "तेज़ और भरोसेमंद")}</small>
              </b>
            </span>
            <span>
              <PackageCheck size={20} />
              <b>
                {t("Easy Returns", "आसान वापसी")}
                <small>{t("7-day easy return", "7 दिन में आसान वापसी")}</small>
              </b>
            </span>
          </section>
        </aside>
      </div>
    </div>
  );
}
