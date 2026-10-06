import { ServiceImage as Image } from "@/components/media/ServiceImage";
import Link from "next/link";
import { Plus, Search, ShieldCheck } from "lucide-react";

import {
  PashuBreadcrumb,
  PashuHeader,
} from "@/features/pashu-bazaar/components/pashu-components";
import styles from "@/features/pashu-bazaar/components/pashu-bazaar.module.css";
import {
  animals,
  animalStatusText,
} from "@/features/pashu-bazaar/data/pashu-data";
import { createTranslator, localized } from "@/i18n/localized-text";
import { getRequestLocale } from "@/i18n/server";

const stats = [
  [localized("All Listings", "सभी लिस्टिंग"), 18],
  [localized("Draft", "मसौदा"), 3],
  [localized("Under Review", "समीक्षाधीन"), 2],
  [localized("Active", "सक्रिय"), 8],
  [localized("Correction Required", "सुधार आवश्यक"), 1],
  [localized("Reserved", "आरक्षित"), 1],
  [localized("Sold", "बिक चुका"), 2],
  [localized("Paused", "रोका गया"), 0],
  [localized("Rejected", "अस्वीकृत"), 1],
] as const;

export default async function MyAnimalListingsPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <div className={styles.stack}>
      <PashuHeader role="Seller" />
      <PashuBreadcrumb items={[localized("My Listings", "मेरी लिस्टिंग")]} />
      <div className={styles.pageHeading}>
        <div>
          <h1>{t("My Animal Listings", "मेरी पशु लिस्टिंग")}</h1>
          <p>
            {t(
              "Manage all your animal listings in one place",
              "अपनी सभी पशु लिस्टिंग एक ही जगह प्रबंधित करें",
            )}
          </p>
        </div>
        <Link
          className={styles.primaryButton}
          href="/pashu-bazaar/listings/new"
        >
          <Plus size={18} />
          {t("Create New Listing", "नई लिस्टिंग बनाएँ")}
        </Link>
      </div>
      <nav
        className={styles.listingStats}
        aria-label={t("Listing status", "लिस्टिंग स्थिति")}
      >
        {stats.map(([label, count]) => (
          <button type="button" key={t(label)}>
            {t(label)}
            <b>{count}</b>
          </button>
        ))}
      </nav>
      <section className={styles.searchToolbar}>
        <label className={styles.searchBox}>
          <Search size={18} />
          <input
            type="search"
            placeholder={t(
              "Search by animal, breed or ID...",
              "पशु, नस्ल या ID से खोजें...",
            )}
          />
        </label>
        <button className={styles.secondaryButton} type="button">
          {t(
            "All Species · All Status · Newest First",
            "सभी प्रजातियाँ · सभी स्थितियाँ · नवीनतम पहले",
          )}
        </button>
      </section>
      <section className={styles.stack}>
        {animals
          .filter((animal) => animal.status)
          .slice(0, 7)
          .map((animal) => (
            <article className={styles.sellerListing} key={animal.slug}>
              <div className={styles.sellerListingImage}>
                <Image
                  src={animal.image}
                  alt={t(animal.name)}
                  fill
                  sizes="200px"
                />
              </div>
              <div>
                <span className={styles.statusPill}>
                  {animal.status ? t(animalStatusText[animal.status]) : null}
                </span>
                <h2>
                  {t(animal.name)} ({t(animal.category)})
                </h2>
                <p>
                  ID: LV-240518-{animal.reviews.toString().padStart(5, "0")}
                </p>
                <p>
                  {animal.breed} · {t(animal.age)}
                  <br />
                  {t(animal.production)}
                  <br />
                  {t(animal.location)}
                </p>
              </div>
              <div>
                <strong className={styles.listingPrice}>{animal.price}</strong>
                <p>
                  {t("Price Negotiable", "मूल्य पर बातचीत संभव")}
                  <br />
                  <br />
                  {t("Listed on", "सूचीबद्ध तिथि")}
                  <br />
                  <b>{t("18 May 2024", "18 मई 2024")}</b>
                </p>
              </div>
              <div className={styles.listingActions}>
                <Link
                  href={
                    animal.status === "Under Review"
                      ? "/pashu-bazaar/listings/hf-cow/review"
                      : "/pashu-bazaar/animals/hf-cow"
                  }
                >
                  {t("View Details", "विवरण देखें")}
                </Link>
                <button type="button">
                  {animal.status === "Draft"
                    ? t("Continue Editing", "संपादन जारी रखें")
                    : animal.status === "Rejected"
                      ? t("Edit & Resubmit", "संपादित कर पुनः भेजें")
                      : t("Edit Listing", "लिस्टिंग संपादित करें")}
                </button>
              </div>
            </article>
          ))}
      </section>
      <section className={styles.dualBanners}>
        <article className={styles.tipsPanel}>
          <h2>{t("Tips to sell faster", "जल्दी बेचने के सुझाव")}</h2>
          <ul className={styles.checkList}>
            {[
              localized(
                "Add clear and bright photos",
                "स्पष्ट और उजली तस्वीरें जोड़ें",
              ),
              localized(
                "Provide complete health records",
                "पूर्ण स्वास्थ्य रिकॉर्ड दें",
              ),
              localized(
                "Set a fair and competitive price",
                "उचित और प्रतिस्पर्धी मूल्य रखें",
              ),
              localized(
                "Respond quickly to enquiries",
                "पूछताछ का शीघ्र उत्तर दें",
              ),
            ].map((tip) => (
              <li key={t(tip)}>
                <ShieldCheck size={15} />
                {t(tip)}
              </li>
            ))}
          </ul>
        </article>
        <article className={styles.helpBanner}>
          <h2>{t("Verification Promise", "सत्यापन का वादा")}</h2>
          <p>
            {t(
              "Listings are illustrative. Confirm animal details and seller identity independently.",
              "लिस्टिंग सांकेतिक हैं। पशु और विक्रेता की पहचान स्वतंत्र रूप से जांचें।",
            )}
          </p>
        </article>
      </section>
    </div>
  );
}
