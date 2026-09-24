"use client";

import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import { Check, Star } from "lucide-react";
import { useMemo, useState } from "react";

import { machines, providers } from "@/features/machinery/data/machinery-data";
import { useLocale } from "@/i18n/LocaleProvider";
import { localized } from "@/i18n/localized-text";

import { ProviderCard } from "./machinery-components";
import styles from "./machinery.module.css";

export function OperationSelector() {
  const { t } = useLocale();
  const operations = [
    localized("Tillage / Ploughing", "जुताई / हल चलाना"),
    localized("Sowing / Planting", "बुवाई / रोपाई"),
    localized("Harvesting", "कटाई"),
    localized("Transport", "परिवहन"),
    localized("Irrigation", "सिंचाई"),
    localized("Spraying", "छिड़काव"),
  ] as const;
  const [selected, setSelected] = useState(0);
  return (
    <div className={styles.operationGrid}>
      {operations.map((operation, index) => (
        <button
          className={selected === index ? styles.selectedOperation : ""}
          onClick={() => setSelected(index)}
          type="button"
          key={t(operation)}
        >
          <span>
            <Image
              src={
                machines[index % machines.length]?.image ??
                "/images/authenticated/machinery/tractor-blue.jpg"
              }
              alt=""
              fill
              sizes="130px"
            />
          </span>
          <span>{t(operation)}</span>
          {selected === index ? <Check size={16} /> : null}
        </button>
      ))}
    </div>
  );
}

export function ProviderResults() {
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"recommended" | "price">("recommended");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matches = providers.filter(
      (provider) =>
        !normalized ||
        `${provider.name} ${t(provider.type)}`
          .toLowerCase()
          .includes(normalized),
    );
    return [...matches].sort((a, b) =>
      sort === "price"
        ? a.price - b.price
        : Number(b.rating) - Number(a.rating),
    );
  }, [query, sort, t]);

  return (
    <>
      <div className={styles.providerFilters}>
        <input
          aria-label={t("Search providers", "प्रदाता खोजें")}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("Search providers...", "प्रदाता खोजें...")}
          type="search"
          value={query}
        />
        <select
          aria-label={t("Sort providers", "प्रदाताओं को क्रमबद्ध करें")}
          onChange={(event) =>
            setSort(event.target.value as "recommended" | "price")
          }
          value={sort}
        >
          <option value="recommended">{t("Recommended", "अनुशंसित")}</option>
          <option value="price">
            {t("Price (Low to High)", "मूल्य (कम से अधिक)")}
          </option>
        </select>
        <select aria-label={t("Distance", "दूरी")}>
          <option>{t("Within 25 km", "25 किमी के भीतर")}</option>
          <option>{t("Within 10 km", "10 किमी के भीतर")}</option>
        </select>
        <select aria-label={t("Provider type", "प्रदाता का प्रकार")}>
          <option>{t("All Providers", "सभी प्रदाता")}</option>
          <option>FPO</option>
          <option>CHC</option>
        </select>
      </div>
      <p className={styles.matchNotice}>
        {t("We found", "हमें")} {filtered.length}{" "}
        {t(
          "compatible providers within 25 km for your requirement.",
          "आपकी आवश्यकता के अनुकूल प्रदाता 25 किमी के भीतर मिले।",
        )}
      </p>
      <div className={styles.providerResults}>
        <div className={styles.providerList}>
          {filtered.map((provider, index) => (
            <ProviderCard
              key={provider.name}
              provider={provider}
              rank={index + 1}
            />
          ))}
        </div>
        <aside className={styles.providerAside}>
          <div className={styles.mapImage}>
            <Image
              src="/images/authenticated/machinery/provider-map.jpg"
              alt={t(
                "Map showing nearby machinery providers",
                "आस-पास के मशीनरी प्रदाताओं को दिखाता नक्शा",
              )}
              fill
              sizes="340px"
            />
          </div>
          <div className={styles.whyProviders}>
            <h2>{t("Why these providers?", "यही प्रदाता क्यों?")}</h2>
            {[
              localized("Verified providers only", "केवल सत्यापित प्रदाता"),
              localized(
                "Machine and time availability matched",
                "मशीन और समय की उपलब्धता मेल खाती है",
              ),
              localized(
                "Within 25 km from your location",
                "आपके स्थान से 25 किमी के भीतर",
              ),
              localized(
                "Suitable for your field and operation",
                "आपके खेत और कार्य के लिए उपयुक्त",
              ),
            ].map((item) => (
              <p key={t(item)}>
                <Check size={15} /> {t(item)}
              </p>
            ))}
          </div>
          <div className={styles.helpPanel}>
            <h2>{t("Need Help?", "मदद चाहिए?")}</h2>
            <p>
              {t(
                "Ask Krishi Mitra or contact our support team.",
                "कृषि मित्र से पूछें या हमारी सहायता टीम से संपर्क करें।",
              )}
            </p>
            <Link href="/more#help">
              {t("Ask Krishi Mitra", "कृषि मित्र से पूछें")}
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

export function PaymentMethods() {
  const { t } = useLocale();
  const [method, setMethod] = useState("online");
  const methods = [
    [
      "online",
      localized("UPI / Net Banking / Cards", "UPI / नेट बैंकिंग / कार्ड"),
      localized("Recommended", "अनुशंसित"),
    ],
    [
      "apps",
      localized("Paytm / PhonePe / GPay", "Paytm / PhonePe / GPay"),
      null,
    ],
    [
      "wallet",
      localized("Wallet Balance", "वॉलेट शेष"),
      localized("Available Balance: ₹1,250", "उपलब्ध शेष: ₹1,250"),
    ],
    [
      "cash",
      localized("Cash on Delivery (COD)", "डिलीवरी पर नकद (COD)"),
      localized(
        "Pay at site after service completion",
        "सेवा पूर्ण होने के बाद स्थल पर भुगतान करें",
      ),
    ],
  ] as const;
  return (
    <div className={styles.paymentMethods}>
      {methods.map(([id, name, detail]) => (
        <button
          className={method === id ? styles.selectedPayment : ""}
          onClick={() => setMethod(id)}
          type="button"
          key={id}
        >
          <i>{method === id ? <Check size={14} /> : null}</i>
          <span>
            <strong>{t(name)}</strong>
            {detail ? <small>{t(detail)}</small> : null}
          </span>
        </button>
      ))}
    </div>
  );
}

export function CompletionFeedback() {
  const { t } = useLocale();
  const [rating, setRating] = useState(5);
  const [recommend, setRecommend] = useState(true);
  const [feedback, setFeedback] = useState("");
  return (
    <section className={styles.feedbackPanel}>
      <h2>{t("How was your experience?", "आपका अनुभव कैसा रहा?")}</h2>
      <p>
        {t(
          "Your feedback helps us improve the service for farmers like you.",
          "आपकी प्रतिक्रिया हमें आप जैसे किसानों के लिए सेवा बेहतर बनाने में मदद करती है।",
        )}
      </p>
      <div className={styles.ratingGrid}>
        {[
          localized("Service Quality", "सेवा की गुणवत्ता"),
          localized("Machine Condition", "मशीन की स्थिति"),
          localized("Operator Behaviour", "ऑपरेटर का व्यवहार"),
        ].map((label) => (
          <div key={t(label)}>
            <strong>{t(label)}</strong>
            <span>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  aria-label={t(`${value} stars`, `${value} स्टार`)}
                  onClick={() => setRating(value)}
                  type="button"
                  key={value}
                >
                  <Star
                    className={value <= rating ? styles.filledStar : ""}
                    size={22}
                  />
                </button>
              ))}
            </span>
            <small>{t("Excellent", "उत्कृष्ट")}</small>
          </div>
        ))}
      </div>
      <div className={styles.feedbackGrid}>
        <label>
          <span>
            {t("Additional Feedback", "अतिरिक्त प्रतिक्रिया")}{" "}
            <small>{t("(Optional)", "(वैकल्पिक)")}</small>
          </span>
          <textarea
            maxLength={300}
            onChange={(event) => setFeedback(event.target.value)}
            placeholder={t(
              "Share any additional comments or suggestions...",
              "कोई अतिरिक्त टिप्पणी या सुझाव साझा करें...",
            )}
            value={feedback}
          />
          <small>{feedback.length}/300</small>
        </label>
        <div>
          <strong>
            {t(
              "Would you recommend our service?",
              "क्या आप हमारी सेवा की अनुशंसा करेंगे?",
            )}
          </strong>
          <button
            className={recommend ? styles.selectedRecommend : ""}
            onClick={() => setRecommend(true)}
            type="button"
          >
            {t("Yes, Highly Recommend", "हाँ, अत्यधिक अनुशंसित")}
          </button>
          <button
            className={!recommend ? styles.selectedRecommend : ""}
            onClick={() => setRecommend(false)}
            type="button"
          >
            {t("No, Not Recommend", "नहीं, अनुशंसा नहीं")}
          </button>
        </div>
      </div>
    </section>
  );
}
