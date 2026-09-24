"use client";

import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock3,
  Fuel,
  Gauge,
  MapPin,
  ShieldCheck,
  Star,
  Tractor,
  UserRoundCheck,
} from "lucide-react";

import type {
  Machine,
  Provider,
} from "@/features/machinery/data/machinery-data";
import { useLocale } from "@/i18n/LocaleProvider";
import { localized } from "@/i18n/localized-text";

import styles from "./machinery.module.css";

export function MachineryPageHeader({
  title,
  subtitle,
  backHref,
}: {
  title: string;
  subtitle: string;
  backHref?: string;
}) {
  const { t } = useLocale();

  return (
    <div className={styles.pageHeader}>
      {backHref ? (
        <Link href={backHref} aria-label={t("Go back", "वापस जाएँ")}>
          <ArrowLeft size={22} />
        </Link>
      ) : null}
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export function BookingSteps({ current }: { current: number }) {
  const { t } = useLocale();
  const steps = [
    localized("Select Operation", "कार्य चुनें"),
    localized("Select Machine", "मशीन चुनें"),
    localized("Booking Requirement", "बुकिंग आवश्यकता"),
    localized("Review & Confirm", "समीक्षा और पुष्टि"),
    localized("Payment", "भुगतान"),
  ];
  return (
    <ol className={styles.bookingSteps}>
      {steps.map((step, index) => {
        const number = index + 1;
        const complete = number < current;
        return (
          <li
            className={
              number === current
                ? styles.currentStep
                : complete
                  ? styles.completeStep
                  : ""
            }
            key={t(step)}
          >
            <span>{complete ? <Check size={16} /> : number}</span>
            <strong>{t(step)}</strong>
            <small>
              {complete
                ? t("Completed", "पूर्ण")
                : number === current
                  ? t("In Progress", "प्रगति पर")
                  : t("Pending", "लंबित")}
            </small>
          </li>
        );
      })}
    </ol>
  );
}

export function MachineSummary({
  machine = null,
}: {
  machine?: Machine | null;
}) {
  const { t } = useLocale();
  const selected = machine ?? {
    name: localized(
      "Tractor (45 HP) with Mould Board Plough",
      "मोल्ड बोर्ड हल के साथ ट्रैक्टर (45 HP)",
    ),
    category: localized("Tillage / Ploughing", "जुताई / हल चलाना"),
    image: "/images/authenticated/machinery/tractor-plough.jpg",
    provider: "Krishna FPO Society",
    rating: "4.6",
    reviews: 128,
    distance: localized("6.2 km away", "6.2 किमी दूर"),
    price: 1450,
    coverage: localized("2.5 - 3.5 Acre/Hour", "2.5 - 3.5 एकड़/घंटा"),
    description: localized(
      "Best for primary tillage in medium to heavy soil.",
      "मध्यम से भारी मिट्टी में प्राथमिक जुताई के लिए सर्वोत्तम।",
    ),
    specifications: [
      localized("Power: 45 HP", "पावर: 45 HP"),
      localized("Drive: 4WD", "ड्राइव: 4WD"),
      localized("Plough: 2 Bottom", "हल: 2 बॉटम"),
      localized("Fuel: Diesel", "ईंधन: डीजल"),
    ],
  };
  return (
    <section className={styles.machineSummary}>
      <div className={styles.machineImage}>
        <Image
          src={selected.image}
          alt={t(selected.name)}
          fill
          loading="eager"
          sizes="260px"
        />
      </div>
      <div>
        <h2>{t(selected.name)}</h2>
        <span className={styles.categoryTag}>{t(selected.category)}</span>
        <div className={styles.machineFacts}>
          <span>
            <Gauge size={18} />
            <strong>45 HP</strong>
            <small>{t("Power", "पावर")}</small>
          </span>
          <span>
            <Tractor size={18} />
            <strong>4WD</strong>
            <small>{t("Drive", "ड्राइव")}</small>
          </span>
          <span>
            <Tractor size={18} />
            <strong>2 Bottom</strong>
            <small>{t("Plough", "हल")}</small>
          </span>
          <span>
            <Fuel size={18} />
            <strong>{t("Diesel", "डीजल")}</strong>
            <small>{t("Fuel", "ईंधन")}</small>
          </span>
        </div>
      </div>
      <div className={styles.providerSummary}>
        <small>{t("Provider", "प्रदाता")}</small>
        <strong>
          {selected.provider} <ShieldCheck size={16} />
        </strong>
        <span>
          <Star size={15} /> {selected.rating} ({selected.reviews})
        </span>
        <span>
          <MapPin size={15} /> {t(selected.distance)}
        </span>
      </div>
    </section>
  );
}

export function ProviderCard({
  provider,
  rank,
}: {
  provider: Provider;
  rank: number;
}) {
  const { t } = useLocale();

  return (
    <article className={styles.providerCard}>
      <span className={styles.rank}>{rank}</span>
      <div className={styles.providerImage}>
        <Image src={provider.image} alt="" fill sizes="150px" />
      </div>
      <div className={styles.providerInfo}>
        <h2>
          {provider.name} <ShieldCheck size={15} />
        </h2>
        <p>
          {t(provider.type)} · {t(provider.distance)}
        </p>
        <span>
          <Star size={15} /> {provider.rating} ({provider.reviews})
        </span>
        <small>
          <Tractor size={14} />{" "}
          {t(
            "45 HP Tractor · Mould Board Plough (2 Bottom)",
            "45 HP ट्रैक्टर · मोल्ड बोर्ड हल (2 बॉटम)",
          )}
        </small>
        <small>
          {t("Available on:", "उपलब्ध:")}{" "}
          <strong>
            {t("24 May", "24 मई")} · {t(provider.time)}
          </strong>
        </small>
        <div>
          {provider.included.map((item) => (
            <span key={t(item)}>
              <Check size={13} /> {t(item)}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.providerPrice}>
        <strong>
          ₹{provider.price.toLocaleString("en-IN")}
          <small>{t("/hr", "/घंटा")}</small>
        </strong>
        <span>
          ₹{(provider.price * 2.5).toLocaleString("en-IN")}{" "}
          {t("for 2.5 Acre", "2.5 एकड़ के लिए")}
        </span>
        <label>
          {t("Rate Basis", "दर का आधार")}
          <select defaultValue="Per Hour">
            <option value="Per Hour">{t("Per Hour", "प्रति घंटा")}</option>
            <option value="Per Acre">{t("Per Acre", "प्रति एकड़")}</option>
          </select>
        </label>
        <Link href="/machinery/machine">
          {t("Select Provider", "प्रदाता चुनें")}
        </Link>
        <Link href="/machinery/machine">
          {t("View Details", "विवरण देखें")}
        </Link>
      </div>
    </article>
  );
}

export function PriceBreakdown({ total = "₹3,806" }: { total?: string }) {
  const { t } = useLocale();
  const rows = [
    [localized("Base Rate (Per Hour)", "मूल दर (प्रति घंटा)"), "₹1,450"],
    [localized("Duration", "अवधि"), t("2 Hours", "2 घंटे")],
    [localized("Subtotal", "उप-योग"), "₹2,900"],
    [
      localized("Transport (Within 25 km)", "परिवहन (25 किमी के भीतर)"),
      t("Included", "शामिल"),
    ],
    [localized("Operator Charges", "ऑपरेटर शुल्क"), t("Included", "शामिल")],
    [localized("Fuel Charges", "ईंधन शुल्क"), t("Included", "शामिल")],
    [
      localized("Machinery Maintenance", "मशीनरी रखरखाव"),
      t("Included", "शामिल"),
    ],
    [localized("GST (5%)", "GST (5%)"), total === "₹3,045" ? "₹145" : "₹181"],
  ] as const;
  return (
    <section className={styles.detailPanel}>
      <h2>{t("Price Breakdown", "मूल्य विवरण")}</h2>
      <dl className={styles.priceList}>
        {rows.map(([label, value]) => (
          <div key={t(label)}>
            <dt>{t(label)}</dt>
            <dd>{value}</dd>
          </div>
        ))}
        <div className={styles.priceTotal}>
          <dt>{t("Total Amount", "कुल राशि")}</dt>
          <dd>{total}</dd>
        </div>
      </dl>
    </section>
  );
}

export function ServiceDetails() {
  const { t } = useLocale();
  const rows = [
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
      localized("24 May 2024", "24 मई 2024"),
    ],
    [
      localized("Time Slot", "समय स्लॉट"),
      localized("08:00 AM – 10:00 AM", "08:00 पूर्वाह्न – 10:00 पूर्वाह्न"),
    ],
    [localized("Duration", "अवधि"), localized("2 Hours", "2 घंटे")],
    [
      localized("Soil Condition", "मिट्टी की स्थिति"),
      localized("Normal", "सामान्य"),
    ],
    [
      localized("Access to Field", "खेत तक पहुँच"),
      localized("Good (Tractor access easy)", "अच्छी (ट्रैक्टर की पहुँच आसान)"),
    ],
    [
      localized("Transport", "परिवहन"),
      localized("Within 25 km (Included)", "25 किमी के भीतर (शामिल)"),
    ],
    [localized("Operator", "ऑपरेटर"), localized("Included", "शामिल")],
    [localized("Fuel", "ईंधन"), localized("Included", "शामिल")],
  ] as const;
  return (
    <section className={styles.detailPanel}>
      <h2>{t("Service Details", "सेवा विवरण")}</h2>
      <dl className={styles.detailList}>
        {rows.map(([label, value]) => (
          <div key={t(label)}>
            <dt>{t(label)}</dt>
            <dd>{t(value)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function TrustStrip() {
  const { t } = useLocale();
  return (
    <section className={styles.trustStrip}>
      <div>
        <ShieldCheck size={25} />
        <span>
          <strong>{t("Verified Providers", "सत्यापित प्रदाता")}</strong>
          {t("Background checked", "पृष्ठभूमि जाँची गई")}
        </span>
      </div>
      <div>
        <Gauge size={25} />
        <span>
          <strong>{t("Transparent Pricing", "पारदर्शी मूल्य")}</strong>
          {t("No hidden charges", "कोई छिपा शुल्क नहीं")}
        </span>
      </div>
      <div>
        <ShieldCheck size={25} />
        <span>
          <strong>{t("Secure Payments", "सुरक्षित भुगतान")}</strong>
          {t("Encrypted & safe", "एन्क्रिप्टेड और सुरक्षित")}
        </span>
      </div>
      <div>
        <Clock3 size={25} />
        <span>
          <strong>{t("On-time Service", "समय पर सेवा")}</strong>
          {t("Reliable & trusted", "विश्वसनीय और भरोसेमंद")}
        </span>
      </div>
    </section>
  );
}

export function InclusionList() {
  const { t } = useLocale();
  return (
    <ul className={styles.checkList}>
      {[
        localized("Trained Operator", "प्रशिक्षित ऑपरेटर"),
        localized("Fuel for Operation", "कार्य के लिए ईंधन"),
        localized(
          "Standard Transport (Within 25 km)",
          "मानक परिवहन (25 किमी के भीतर)",
        ),
        localized("Regular Maintenance", "नियमित रखरखाव"),
        localized("Basic Tool Kit", "बुनियादी टूल किट"),
      ].map((item) => (
        <li key={t(item)}>
          <Check size={15} /> {t(item)}
        </li>
      ))}
    </ul>
  );
}

export function BookingProgress() {
  const { t } = useLocale();
  const steps = [
    localized("Booking Confirmed", "बुकिंग की पुष्टि"),
    localized("Provider Accepted", "प्रदाता ने स्वीकार किया"),
    localized("Machine Allotted", "मशीन आवंटित"),
    localized("En Route to Field", "खेत की ओर रवाना"),
    localized("On Site", "स्थल पर"),
    localized("Work in Progress", "कार्य प्रगति पर"),
    localized("Completed", "पूर्ण"),
  ];
  return (
    <section className={styles.progressCard}>
      <div className={styles.sectionTitle}>
        <h2>{t("Booking Progress", "बुकिंग प्रगति")}</h2>
        <span>
          {t(
            "In Progress · Started at 09:15 AM",
            "प्रगति पर · 09:15 पूर्वाह्न पर शुरू",
          )}
        </span>
      </div>
      <ol>
        {steps.map((step, index) => (
          <li
            className={index < 4 ? styles.progressComplete : ""}
            key={t(step)}
          >
            <span>{index < 3 ? <Check size={14} /> : index + 1}</span>
            <strong>{t(step)}</strong>
            <small>
              {index < 4
                ? `${t("24 May", "24 मई")}, ${["07:42", "08:05", "08:20", "09:15"][index]} ${t("AM", "पूर्वाह्न")}`
                : t("Pending", "लंबित")}
            </small>
          </li>
        ))}
      </ol>
      <p>
        <UserRoundCheck size={18} />{" "}
        {t(
          "Provider is on the way to your field. You will be notified on arrival.",
          "प्रदाता आपके खेत की ओर आ रहा है। पहुँचने पर आपको सूचना दी जाएगी।",
        )}
      </p>
    </section>
  );
}

export function SectionLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link className={styles.sectionLink} href={href}>
      {children}
      <ChevronRight size={18} />
    </Link>
  );
}
