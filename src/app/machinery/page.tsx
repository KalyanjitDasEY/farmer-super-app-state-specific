import type { Metadata } from "next";
import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CloudRain,
  Search,
  ShieldCheck,
  Tractor,
  UsersRound,
} from "lucide-react";

import { withBasePath } from "@/config/base-path";
import {
  MachineryPageHeader,
  TrustStrip,
} from "@/features/machinery/components/machinery-components";
import styles from "@/features/machinery/components/machinery.module.css";
import {
  machineryCategories,
  providers,
} from "@/features/machinery/data/machinery-data";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = createTranslator(await getRequestLocale());
  return { title: t("Book Machinery", "मशीनरी बुक करें") };
}

const categoryImages = [
  "/images/authenticated/machinery/tractor-blue.jpg",
  "/images/authenticated/machinery/rotavator.jpg",
  "/images/authenticated/machinery/seed-drill.jpg",
  "/images/authenticated/machinery/combine-harvester.jpg",
  "/images/authenticated/machinery/provider-tractor-2.jpg",
  "/images/authenticated/machinery/provider-tractor-3.jpg",
] as const;

export default async function MachineryHomePage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <div className={styles.stack}>
      <MachineryPageHeader
        title={t("Book Farm Machinery", "कृषि मशीनरी बुक करें")}
        subtitle={t(
          "Trusted machines and trained operators near your farm.",
          "आपके खेत के पास भरोसेमंद मशीनें और प्रशिक्षित ऑपरेटर।",
        )}
      />
      <section className={styles.homeHero}>
        <div>
          <h2>
            {t("Right Machine. Right Time.", "सही मशीन। सही समय।")}
            <br />
            {t("Better Yield.", "बेहतर उपज।")}
          </h2>
          <p>
            {t(
              "Discover, compare and book trusted farm machinery and services near you.",
              "अपने पास भरोसेमंद कृषि मशीनरी और सेवाएँ खोजें, तुलना करें और बुक करें।",
            )}
          </p>
          <div className={styles.heroStats}>
            <span>
              <ShieldCheck size={23} />
              <small>{t("Verified Providers", "सत्यापित प्रदाता")}</small>
              <strong>1,250+</strong>
            </span>
            <span>
              <Tractor size={23} />
              <small>{t("Machines Available", "उपलब्ध मशीनें")}</small>
              <strong>3,800+</strong>
            </span>
            <span>
              <CalendarDays size={23} />
              <small>{t("Bookings Completed", "पूर्ण बुकिंग")}</small>
              <strong>25K+</strong>
            </span>
          </div>
        </div>
        <Image
          src="/images/authenticated/machinery/hero-tractor.jpg"
          alt={t(
            "Farm tractor ready for booking",
            "बुकिंग के लिए तैयार कृषि ट्रैक्टर",
          )}
          fill
          loading="eager"
          sizes="(max-width: 700px) 100vw, 50vw"
        />
      </section>

      <section className={styles.searchPanel}>
        <div>
          <h2>
            {t(
              "Find the right machine for your work",
              "अपने काम के लिए सही मशीन खोजें",
            )}
          </h2>
          <form action={withBasePath("/machinery/select")}>
            <input
              name="q"
              placeholder={t(
                "Search by machine, service or brand...",
                "मशीन, सेवा या ब्रांड से खोजें...",
              )}
            />
            <button aria-label={t("Search", "खोजें")} type="submit">
              <Search size={20} />
            </button>
          </form>
          <p>
            {t("Popular Searches:", "लोकप्रिय खोज:")}{" "}
            <span>{t("Tractor", "ट्रैक्टर")}</span>
            <span>{t("Rotavator", "रोटावेटर")}</span>
            <span>{t("Harvester", "हार्वेस्टर")}</span>
            <span>{t("Seeder", "सीडर")}</span>
          </p>
        </div>
        <Link href="/machinery/select">
          <Tractor size={35} />
          <span>
            <strong>{t("Select Operation", "कार्य चुनें")}</strong>
            <small>
              {t(
                "Choose the work you want to do",
                "वह काम चुनें जो आप करना चाहते हैं",
              )}
            </small>
          </span>
          <ChevronRight size={22} />
        </Link>
      </section>

      <section>
        <div className={styles.sectionTitle}>
          <h2>{t("Browse Machinery Categories", "मशीनरी श्रेणियाँ देखें")}</h2>
          <Link href="/machinery/select">
            {t("View All", "सभी देखें")} <ArrowRight size={17} />
          </Link>
        </div>
        <div className={styles.categoryGrid}>
          {machineryCategories.map((category, index) => (
            <Link href="/machinery/select" key={t(category)}>
              {categoryImages[index] ? (
                <span>
                  <Image
                    src={categoryImages[index]}
                    alt=""
                    fill
                    sizes="120px"
                  />
                </span>
              ) : (
                <span className={styles.categoryIcon}>
                  <Tractor size={34} />
                </span>
              )}
              <strong>{t(category)}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className={styles.sectionTitle}>
          <h2>
            {t("Nearby Verified Providers", "आस-पास के सत्यापित प्रदाता")}{" "}
            <small>{t("Within 25 km", "25 किमी के भीतर")}</small>
          </h2>
          <Link href="/machinery/providers">
            {t("View All", "सभी देखें")} <ArrowRight size={17} />
          </Link>
        </div>
        <div className={styles.providerScroller}>
          {providers.slice(0, 4).map((provider) => (
            <article key={provider.name}>
              <div>
                <Image src={provider.image} alt="" fill sizes="240px" />
                <b>{t("Verified", "सत्यापित")}</b>
              </div>
              <h3>{provider.name}</h3>
              <p>
                {t(provider.distance)}
                <span>
                  ★ {provider.rating} ({provider.reviews})
                </span>
              </p>
              <small>{t("18 Machines Available", "18 मशीनें उपलब्ध")}</small>
              <strong>
                {t("Start Price:", "शुरुआती मूल्य:")} ₹{provider.price}
                {t("/hr", "/घंटा")}
              </strong>
              <Link href="/machinery/providers">
                {t("View Machines", "मशीनें देखें")}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <div className={styles.homeLower}>
        <section className={styles.panel}>
          <div className={styles.sectionTitle}>
            <h2>{t("Your Current Bookings", "आपकी वर्तमान बुकिंग")}</h2>
            <Link href="/machinery/bookings/mch-240524-00078">
              {t("View All", "सभी देखें")}
            </Link>
          </div>
          {(
            [
              [
                localized("Rotavator (6 Feet)", "रोटावेटर (6 फीट)"),
                "Deoria FPO Society",
                localized(
                  "21 May 2024, 09:00 AM",
                  "21 मई 2024, 09:00 पूर्वाह्न",
                ),
                "₹2,400",
                localized("Upcoming", "आगामी"),
              ],
              [
                localized("Combine Harvester", "कंबाइन हार्वेस्टर"),
                "Sarita Agro Services",
                localized(
                  "23 May 2024, 07:00 AM",
                  "23 मई 2024, 07:00 पूर्वाह्न",
                ),
                "₹14,000",
                localized("Confirmed", "पुष्टि हुई"),
              ],
              [
                localized("Trolley (5 Ton)", "ट्रॉली (5 टन)"),
                "Krishna Custom Hiring",
                localized("18 May 2024", "18 मई 2024"),
                "₹1,800",
                localized("Completed", "पूर्ण"),
              ],
            ] as const
          ).map(([name, provider, date, price, status], index) => (
            <Link
              className={styles.bookingRow}
              href="/machinery/bookings/mch-240524-00078"
              key={t(name)}
            >
              <Image
                src={categoryImages[index + 1] ?? categoryImages[0]}
                alt=""
                width={72}
                height={56}
              />
              <span>
                <strong>{t(name)}</strong>
                <small>{provider}</small>
                <small>{t(date)}</small>
              </span>
              <b>{t(status)}</b>
              <em>
                {price}
                <small>
                  {index === 2 ? t("1 Day", "1 दिन") : t("2 Hours", "2 घंटे")}
                </small>
              </em>
              <ChevronRight size={19} />
            </Link>
          ))}
        </section>
        <aside className={styles.weatherCards}>
          <div>
            <CloudRain size={42} />
            <span>
              <strong>
                {t("Weather for Next 24 Hours", "अगले 24 घंटों का मौसम")}
              </strong>
              <b>
                32°C <small>{t("Light Rain", "हल्की बारिश")}</small>
              </b>
              <small>
                {t(
                  "Good for field operations after 02:00 PM",
                  "02:00 अपराह्न के बाद खेत के कार्यों के लिए अच्छा",
                )}
              </small>
            </span>
          </div>
          <div>
            <CalendarDays size={28} />
            <span>
              <strong>
                {t("Best Time to Spray Today", "आज छिड़काव का सर्वोत्तम समय")}
              </strong>
              <b>{t("04:00 PM – 06:00 PM", "04:00 अपराह्न – 06:00 अपराह्न")}</b>
            </span>
          </div>
          <div>
            <UsersRound size={28} />
            <span>
              <strong>
                {t("Need Help Selecting Machine?", "मशीन चुनने में मदद चाहिए?")}
              </strong>
              <small>
                {t(
                  "Ask Krishi Mitra for the right recommendation.",
                  "सही सुझाव के लिए कृषि मित्र से पूछें।",
                )}
              </small>
              <Link href="/more#help">
                {t("Ask Krishi Mitra", "कृषि मित्र से पूछें")}
              </Link>
            </span>
          </div>
        </aside>
      </div>
      <TrustStrip />
    </div>
  );
}
