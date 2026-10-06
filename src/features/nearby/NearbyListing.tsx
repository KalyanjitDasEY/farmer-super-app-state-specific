"use client";

import {
  ArrowLeft,
  ChevronDown,
  CircleHelp,
  Clock3,
  Headphones,
  Info,
  MapPin,
  Navigation,
  Phone,
  Search,
  SlidersHorizontal,
  SortAsc,
  Star,
  Store,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  nearbyServices,
  nearbyText,
  type NearbyServiceId,
} from "@/features/nearby/nearby-data";
import { useLocale } from "@/i18n/LocaleProvider";
import styles from "@/features/nearby/nearby.module.css";

type SortOption = "distance" | "rating" | "name";

export function NearbyListing({ serviceId }: { serviceId: NearbyServiceId }) {
  const { locale, t } = useLocale();
  const service = nearbyServices[serviceId];
  const ServiceIcon = service.icon;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(service.categories[0] ?? "");
  const [distance, setDistance] = useState("25");
  const [sort, setSort] = useState<SortOption>("distance");
  const [showHelp, setShowHelp] = useState(false);
  const [expandedSeller, setExpandedSeller] = useState<string>();

  const visibleSellers = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);
    const distanceLimit = Number(distance);
    return service.sellers
      .filter((seller) => seller.distance <= distanceLimit)
      .filter((seller) => {
        if (category === service.categories[0]) return true;
        return seller.products.some((product) =>
          product
            .toLocaleLowerCase("en")
            .includes(category.toLocaleLowerCase("en")),
        );
      })
      .filter((seller) => {
        if (!normalizedQuery) return true;
        return [seller.name, seller.owner, seller.address, ...seller.products]
          .map((value) => t(nearbyText(value)))
          .join(" ")
          .toLocaleLowerCase(locale)
          .includes(normalizedQuery);
      })
      .toSorted((left, right) => {
        if (sort === "name") return left.name.localeCompare(right.name);
        if (sort === "rating") {
          return (right.rating ?? 0) - (left.rating ?? 0);
        }
        return left.distance - right.distance;
      });
  }, [category, distance, locale, query, service, sort, t]);

  return (
    <div className={styles.listingPage}>
      <Link className={styles.backLink} href="/nearby">
        <ArrowLeft size={19} aria-hidden="true" />{" "}
        {t("Back to Nearby Services", "आस-पास की सेवाओं पर वापस जाएं")}
      </Link>

      <header className={styles.listingHero}>
        <span>
          <ServiceIcon size={37} aria-hidden="true" />
        </span>
        <div>
          <h1>{t(nearbyText(service.title))}</h1>
          <p>{t(nearbyText(service.description))}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowHelp((current) => !current)}
        >
          <CircleHelp size={20} aria-hidden="true" />
          {t("How it works?", "यह कैसे काम करता है?")}
        </button>
      </header>

      {showHelp ? (
        <section className={styles.howItWorks} aria-live="polite">
          <Info size={20} aria-hidden="true" />
          <p>
            {t(
              "Search and filter sample listings, compare distance and products, then contact the provider to confirm details.",
              "नमूना सूचियां खोजें और फ़िल्टर करें, दूरी व उत्पादों की तुलना करें, फिर विवरण की पुष्टि के लिए प्रदाता से संपर्क करें।",
            )}
          </p>
        </section>
      ) : null}

      <section className={styles.searchPanel}>
        <div className={styles.locationRow}>
          <div>
            <MapPin size={28} aria-hidden="true" />
            <span>
              <strong>
                {t("Amhara, Bihta, Patna, Bihar", "अमहरा, बिहटा, पटना, बिहार")}
              </strong>
              <small>{t("Demo location", "डेमो स्थान")}</small>
            </span>
          </div>
          <label>
            <Navigation size={24} aria-hidden="true" />
            <span>{t("Within", "के भीतर")}</span>
            <select
              aria-label={t("Search distance", "खोज की दूरी")}
              value={distance}
              onChange={(event) => setDistance(event.target.value)}
            >
              <option value="5">5 {t("km", "किमी")}</option>
              <option value="10">10 {t("km", "किमी")}</option>
              <option value="25">25 {t("km", "किमी")}</option>
            </select>
          </label>
        </div>

        <div className={styles.searchControls}>
          <label className={styles.searchBox}>
            <Search size={21} aria-hidden="true" />
            <span className="sr-only">
              {t("Search listings", "सूचियां खोजें")}
            </span>
            <input
              placeholder={t(nearbyText(service.searchPlaceholder))}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label className={styles.selectControl}>
            <SlidersHorizontal size={20} aria-hidden="true" />
            <span>{t(nearbyText(service.typeLabel))}</span>
            <select
              aria-label={t(nearbyText(service.typeLabel))}
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {service.categories.map((item) => (
                <option key={item} value={item}>
                  {t(nearbyText(item))}
                </option>
              ))}
            </select>
            <ChevronDown size={18} aria-hidden="true" />
          </label>
          <label className={styles.selectControl}>
            <SortAsc size={21} aria-hidden="true" />
            <span>{t("Sort By", "क्रमबद्ध करें")}</span>
            <select
              aria-label={t("Sort listings", "सूचियां क्रमबद्ध करें")}
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
            >
              <option value="distance">{t("Distance", "दूरी")}</option>
              <option value="rating">{t("Rating", "रेटिंग")}</option>
              <option value="name">{t("Name", "नाम")}</option>
            </select>
            <ChevronDown size={18} aria-hidden="true" />
          </label>
        </div>

        <div
          className={styles.categoryChips}
          aria-label={t("Listing categories", "सूची की श्रेणियां")}
        >
          {service.categories.map((item) => (
            <button
              className={category === item ? styles.activeChip : undefined}
              key={item}
              type="button"
              onClick={() => setCategory(item)}
            >
              {t(nearbyText(item))}
            </button>
          ))}
        </div>
      </section>

      <div className={styles.verificationStrip}>
        <span>
          <Info size={20} aria-hidden="true" />
          {t(nearbyText(service.verifiedMessage))}
        </span>
        <span>
          <Info size={18} aria-hidden="true" />
          {t(
            "Contact providers for current details",
            "वर्तमान जानकारी के लिए प्रदाताओं से संपर्क करें",
          )}
        </span>
      </div>

      <section className={styles.resultsSection}>
        <div className={styles.resultHeading}>
          <h2>
            {t(
              `${visibleSellers.length} ${
                serviceId === "warehouses" ? "facilities" : "sellers"
              } found`,
              `${visibleSellers.length} ${
                serviceId === "warehouses" ? "सुविधाएं" : "विक्रेता"
              } मिले`,
            )}
          </h2>
          <span>
            {t(
              "Nearest results shown first",
              "निकटतम परिणाम पहले दिखाए गए हैं",
            )}
          </span>
        </div>

        <div className={styles.sellerList}>
          {visibleSellers.map((seller, index) => {
            const isExpanded = expandedSeller === seller.id;
            return (
              <article className={styles.sellerCard} key={seller.id}>
                <div
                  className={`${styles.sellerVisual} ${styles[`visual${(index % 4) + 1}`]}`}
                >
                  <ServiceIcon size={38} aria-hidden="true" />
                  <strong>{t(nearbyText(service.shortTitle))}</strong>
                  <span>{t(nearbyText(seller.badge))}</span>
                </div>

                <div className={styles.sellerIdentity}>
                  <h3>{seller.name}</h3>
                  <p>
                    <UserRound size={16} aria-hidden="true" />{" "}
                    {t(nearbyText(seller.owner))}
                  </p>
                  <p>
                    <MapPin size={16} aria-hidden="true" />{" "}
                    {t(nearbyText(seller.address))}
                  </p>
                  <p>
                    <Clock3 size={16} aria-hidden="true" />{" "}
                    {t(nearbyText(seller.hours))}
                  </p>
                  <p>
                    <Phone size={16} aria-hidden="true" /> {seller.phone}
                  </p>
                </div>

                <div className={styles.sellerProducts}>
                  <small>
                    {serviceId === "warehouses"
                      ? t("Storage Type", "भंडारण का प्रकार")
                      : t(
                          `Available ${service.typeLabel.replace(" Type", "s")}`,
                          `उपलब्ध ${t(nearbyText(service.typeLabel))}`,
                        )}
                  </small>
                  <div>
                    {seller.products.map((product) => (
                      <span key={product}>{t(nearbyText(product))}</span>
                    ))}
                  </div>
                  {seller.capacity ? (
                    <p>
                      {t("Total Capacity", "कुल क्षमता")}{" "}
                      <strong>{t(nearbyText(seller.capacity))}</strong>
                      {t("Available Capacity", "उपलब्ध क्षमता")}{" "}
                      <b
                        className={
                          seller.availability === "full"
                            ? styles.capacityFull
                            : undefined
                        }
                      >
                        {t(nearbyText(seller.availableCapacity ?? ""))}
                      </b>
                    </p>
                  ) : (
                    <p>
                      <Info size={16} aria-hidden="true" />
                      {t(nearbyText(seller.feature))}
                    </p>
                  )}
                  {seller.rating ? (
                    <p className={styles.rating}>
                      <Star size={16} fill="currentColor" aria-hidden="true" />
                      {seller.rating} ({seller.ratings} {t("Ratings", "रेटिंग")}
                      )
                    </p>
                  ) : null}
                </div>

                <div className={styles.sellerActions}>
                  <strong>
                    <MapPin size={17} aria-hidden="true" />
                    {seller.distance} {t("km", "किमी")}
                  </strong>
                  {seller.availability ? (
                    <span
                      className={
                        seller.availability === "full"
                          ? styles.fullBadge
                          : styles.availableBadge
                      }
                    >
                      {seller.availability === "full"
                        ? t("Full", "भरा हुआ")
                        : t("Available", "उपलब्ध")}
                    </span>
                  ) : null}
                  <a href={`tel:+91${seller.phone.replaceAll(" ", "")}`}>
                    <Phone size={18} aria-hidden="true" />{" "}
                    {t("Call", "कॉल करें")}
                  </a>
                  <button
                    aria-expanded={isExpanded}
                    type="button"
                    onClick={() =>
                      setExpandedSeller(isExpanded ? undefined : seller.id)
                    }
                  >
                    {isExpanded
                      ? t("Hide Details", "विवरण छिपाएं")
                      : t("View Details", "विवरण देखें")}
                  </button>
                </div>

                {isExpanded ? (
                  <div className={styles.expandedDetails}>
                    <Store size={20} aria-hidden="true" />
                    <div>
                      <strong>{seller.name}</strong>
                      <p>
                        {t(nearbyText(seller.feature))}.{" "}
                        {t(
                          "Contact the provider before visiting to confirm stock, availability and current prices.",
                          "जाने से पहले स्टॉक, उपलब्धता और वर्तमान कीमतों की पुष्टि के लिए प्रदाता से संपर्क करें।",
                        )}
                      </p>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        seller.address,
                      )}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {t("Get Directions", "दिशा-निर्देश पाएं")}
                    </a>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>

        {visibleSellers.length === 0 ? (
          <div className={styles.emptyState}>
            <Search size={32} aria-hidden="true" />
            <h2>{t("No matching listings", "कोई मेल खाती सूची नहीं")}</h2>
            <p>
              {t(
                "Change the search text, category or distance and try again.",
                "खोज शब्द, श्रेणी या दूरी बदलकर फिर प्रयास करें।",
              )}
            </p>
          </div>
        ) : null}
      </section>

      <div className={styles.tipStrip}>
        <Info size={22} aria-hidden="true" />
        <strong>{t("Tip:", "सुझाव:")}</strong> {t(nearbyText(service.tip))}
      </div>

      <section className={styles.trustGrid}>
        <article>
          <Info size={27} aria-hidden="true" />
          <div>
            <strong>
              {serviceId === "warehouses"
                ? t("Sample Facilities", "नमूना सुविधाएं")
                : t("Sample Sellers", "नमूना विक्रेता")}
            </strong>
            <span>
              {t(
                "Confirm availability directly before visiting",
                "जाने से पहले उपलब्धता की सीधे पुष्टि करें",
              )}
            </span>
          </div>
        </article>
        <article>
          <Info size={27} aria-hidden="true" />
          <div>
            <strong>{t("Compare details", "विवरण की तुलना करें")}</strong>
            <span>
              {t(
                "Product and service information is illustrative",
                "उत्पाद और सेवा जानकारी उदाहरण के लिए है",
              )}
            </span>
          </div>
        </article>
        <article>
          <Headphones size={27} aria-hidden="true" />
          <div>
            <strong>{t("Need Help?", "मदद चाहिए?")}</strong>
            <span>
              {t(
                "Contact the listed provider",
                "सूचीबद्ध प्रदाता से संपर्क करें",
              )}
            </span>
          </div>
        </article>
      </section>
    </div>
  );
}
