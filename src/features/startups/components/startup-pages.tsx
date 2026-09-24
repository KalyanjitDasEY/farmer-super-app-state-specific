"use client";

import { ServiceImage as Image } from "@/components/media/ServiceImage";
import { useLocale } from "@/i18n/LocaleProvider";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  ChevronRight,
  CircleCheck,
  Filter,
  Globe2,
  Handshake,
  Leaf,
  Mail,
  Map,
  MapPin,
  Package,
  Phone,
  Play,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  UsersRound,
} from "lucide-react";
import {
  FormEvent,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  type Startup,
  type StartupCategory,
  getStartup,
  startupCategories,
  startups,
  translateStartupText,
} from "@/features/startups/data/startup-data";

import styles from "./startups.module.css";

function StartupLogo({
  startup,
  large = false,
}: {
  startup: Startup;
  large?: boolean;
}) {
  const { t } = useLocale();
  const Icon = startup.icon;
  return (
    <div
      className={`${styles.startupLogo} ${styles[startup.tone]} ${large ? styles.largeLogo : ""}`}
    >
      <Icon aria-hidden="true" size={large ? 42 : 34} />
      <strong>{startup.brand}</strong>
      <small>{translateStartupText(t, startup.tagline)}</small>
    </div>
  );
}

export function StartupDirectory({
  initialCategory = "all",
  initialQuery = "",
}: {
  initialCategory?: StartupCategory;
  initialQuery?: string;
}) {
  const { t } = useLocale();
  const [category, setCategory] = useState<StartupCategory>(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [state, setState] = useState("all");
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase());

  const visibleStartups = useMemo(() => {
    const filtered = startups.filter((startup) => {
      const matchesCategory =
        category === "all" || startup.category === category;
      const matchesState = state === "all" || startup.state === state;
      const searchText =
        `${startup.name} ${translateStartupText(t, startup.categoryLabel)} ${translateStartupText(t, startup.description)} ${translateStartupText(t, startup.city)} ${translateStartupText(t, startup.state)}`.toLocaleLowerCase();
      return (
        matchesCategory &&
        matchesState &&
        (!deferredQuery || searchText.includes(deferredQuery))
      );
    });

    return [...filtered].sort((left, right) => {
      if (sort === "featured") return 0;
      if (sort === "rating") return right.rating - left.rating;
      if (sort === "newest") return right.year - left.year;
      return left.name.localeCompare(right.name);
    });
  }, [category, deferredQuery, sort, state, t]);

  const total =
    startupCategories.find((item) => item.id === category)?.count ??
    visibleStartups.length;

  return (
    <div className={styles.directory}>
      <nav
        className={styles.breadcrumb}
        aria-label={t("Breadcrumb", "नेविगेशन पथ")}
      >
        <Link href="/home">{t("Home", "होम")}</Link>
        <ChevronRight size={14} />
        <span>{t("Startups", "स्टार्टअप")}</span>
      </nav>

      <header className={styles.directoryHeader}>
        <Link href="/home" aria-label={t("Go back", "वापस जाएं")}>
          <ArrowLeft size={22} />
        </Link>
        <div>
          <h1>
            {t("Startups", "स्टार्टअप")} <Leaf size={23} aria-hidden="true" />
          </h1>
          <p>
            {t("Showing", "दिखाए जा रहे हैं")}{" "}
            {deferredQuery || state !== "all" ? visibleStartups.length : total}{" "}
            {t("startups", "स्टार्टअप")}
          </p>
        </div>
      </header>

      <div className={styles.directoryToolbar}>
        <label className={styles.startupSearch}>
          <Search size={21} aria-hidden="true" />
          <span className="sr-only">
            {t("Search startups", "स्टार्टअप खोजें")}
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t(
              "Search by startup name, solution or keyword...",
              "स्टार्टअप नाम, समाधान या कीवर्ड से खोजें...",
            )}
            type="search"
          />
        </label>
        <label className={styles.sortControl}>
          <span>{t("Sort", "क्रमबद्ध करें")}</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label={t("Sort startups", "स्टार्टअप क्रमबद्ध करें")}
          >
            <option value="featured">{t("Featured", "विशेष")}</option>
            <option value="rating">{t("Top rated", "सर्वोच्च रेटिंग")}</option>
            <option value="newest">{t("Newest", "नवीनतम")}</option>
            <option value="name">{t("Name", "नाम")}</option>
          </select>
          <SlidersHorizontal size={18} aria-hidden="true" />
        </label>
        <button
          className={showFilters ? styles.activeFilter : ""}
          type="button"
          onClick={() => setShowFilters((current) => !current)}
          aria-expanded={showFilters}
        >
          <Filter size={19} /> {t("Filters", "फ़िल्टर")}
        </button>
      </div>

      {showFilters ? (
        <div className={styles.filterPanel}>
          <label>
            {t("Location", "स्थान")}
            <select
              value={state}
              onChange={(event) => setState(event.target.value)}
            >
              <option value="all">{t("All states", "सभी राज्य")}</option>
              {[...new Set(startups.map((startup) => startup.state))].map(
                (location) => (
                  <option value={location} key={location}>
                    {translateStartupText(t, location)}
                  </option>
                ),
              )}
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              setState("all");
              setQuery("");
            }}
          >
            {t("Clear filters", "फ़िल्टर हटाएं")}
          </button>
        </div>
      ) : null}

      <div
        className={styles.categoryScroller}
        aria-label={t("Startup categories", "स्टार्टअप श्रेणियां")}
      >
        {startupCategories.map((item) => (
          <button
            className={category === item.id ? styles.selectedCategory : ""}
            type="button"
            key={item.id}
            onClick={() => setCategory(item.id)}
            aria-pressed={category === item.id}
          >
            {translateStartupText(t, item.label)} ({item.count})
          </button>
        ))}
      </div>

      {visibleStartups.length ? (
        <div className={styles.startupList}>
          {visibleStartups.map((startup) => (
            <article className={styles.startupCard} key={startup.slug}>
              <StartupLogo startup={startup} />
              <div className={styles.startupCardInfo}>
                <h2>{startup.name}</h2>
                <strong className={styles[startup.tone]}>
                  {translateStartupText(t, startup.categoryLabel)}
                </strong>
                <p>{translateStartupText(t, startup.description)}</p>
                <div>
                  <span>
                    <MapPin size={15} />{" "}
                    {translateStartupText(t, startup.state)}
                  </span>
                  <span>
                    <Building2 size={15} />{" "}
                    {translateStartupText(t, startup.city)}
                  </span>
                </div>
              </div>
              <div className={styles.startupCardAction}>
                <span className={styles.verified}>
                  <ShieldCheck size={17} />{" "}
                  {t("Verified Startup", "सत्यापित स्टार्टअप")}
                </span>
                <div>
                  <span>
                    <Star size={17} /> <strong>{startup.rating}</strong> (
                    {startup.reviews})
                  </span>
                  <i />
                  <span>
                    <CalendarDays size={16} /> {startup.year}
                  </span>
                </div>
                <Link href={`/startups/${startup.slug}`}>
                  {t("View Details", "विवरण देखें")} <ChevronRight size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.noStartups}>
          <Search size={34} />
          <h2>{t("No startups found", "कोई स्टार्टअप नहीं मिला")}</h2>
          <p>
            {t(
              "Try another keyword, category or location.",
              "कोई अन्य कीवर्ड, श्रेणी या स्थान आजमाएं।",
            )}
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setState("all");
              setQuery("");
            }}
          >
            {t("Show all startups", "सभी स्टार्टअप दिखाएं")}
          </button>
        </div>
      )}
    </div>
  );
}

const reasons = [
  [
    "Smart & Affordable",
    "स्मार्ट और किफायती",
    "Easy-to-use, cost-effective solutions for small & marginal farmers.",
    "छोटे और सीमांत किसानों के लिए उपयोग में आसान, किफायती समाधान।",
  ],
  [
    "Data Driven Decisions",
    "आंकड़ों पर आधारित निर्णय",
    "Actionable insights for better yield and resource management.",
    "बेहतर उपज और संसाधन प्रबंधन के लिए उपयोगी जानकारी।",
  ],
  [
    "Sustainable Farming",
    "टिकाऊ खेती",
    "Solutions that save water, reduce chemicals and protect the environment.",
    "पानी बचाने, रसायन घटाने और पर्यावरण की रक्षा करने वाले समाधान।",
  ],
  [
    "Strong After-Sales Support",
    "मजबूत बिक्री-पश्चात सहायता",
    "On-ground support and training by our agri-experts.",
    "हमारे कृषि विशेषज्ञों द्वारा जमीनी सहायता और प्रशिक्षण।",
  ],
] as const;

const farmerBenefits = [
  ["Increase in productivity & profit", "उत्पादकता और लाभ में वृद्धि"],
  ["Lower input cost and resource savings", "कम आदान लागत और संसाधन बचत"],
  ["Early pest & disease detection", "कीट और रोग की शीघ्र पहचान"],
  ["Better irrigation & water management", "बेहतर सिंचाई और जल प्रबंधन"],
  ["Access to agri-experts and advisory", "कृषि विशेषज्ञों और सलाह तक पहुंच"],
] as const;

type DetailTab = "overview" | "products" | "impact" | "reviews" | "media";

export function StartupDetail({ slug }: { slug: string }) {
  const { t } = useLocale();
  const startup = getStartup(slug);
  if (!startup) {
    throw new Error(`Startup not found: ${slug}`);
  }
  const [tab, setTab] = useState<DetailTab>("overview");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <div className={styles.detailPage}>
      <nav
        className={styles.breadcrumb}
        aria-label={t("Breadcrumb", "नेविगेशन पथ")}
      >
        <Link href="/home">{t("Home", "होम")}</Link>
        <ChevronRight size={14} />
        <Link href="/startups">{t("Startups", "स्टार्टअप")}</Link>
        <ChevronRight size={14} />
        <span>{startup.name}</span>
      </nav>

      <section className={styles.companyHero}>
        <Link
          className={styles.detailBack}
          href="/startups"
          aria-label={t("Go back", "वापस जाएं")}
        >
          <ArrowLeft size={22} />
        </Link>
        <StartupLogo startup={startup} large />
        <div className={styles.companyIntro}>
          <h1>{startup.name}</h1>
          <strong>{translateStartupText(t, startup.description)}</strong>
          <p>{translateStartupText(t, startup.about)}</p>
          <div>
            <span>
              <MapPin size={17} /> {translateStartupText(t, startup.city)},{" "}
              {translateStartupText(t, startup.state)}
            </span>
            <span>
              <CalendarDays size={17} /> {t("Founded in", "स्थापना")}{" "}
              {startup.year}
            </span>
          </div>
        </div>
        <div className={styles.companyHeroImage}>
          <Image
            src={startup.heroImage}
            alt={t(
              `${startup.name} agricultural solution`,
              `${startup.name} कृषि समाधान`,
            )}
            fill
            loading="eager"
            sizes="(max-width: 700px) 100vw, 240px"
          />
        </div>
      </section>

      <section
        className={styles.startupMetrics}
        aria-label={t("Startup impact", "स्टार्टअप प्रभाव")}
      >
        <div>
          <Star size={26} />
          <span>
            <strong>{startup.rating}</strong>
            <small>
              ({startup.reviews} {t("Ratings", "रेटिंग")})
            </small>
          </span>
        </div>
        <div>
          <UsersRound size={26} />
          <span>
            <strong>{startup.farmers}</strong>
            <small>{t("Farmers Benefited", "लाभान्वित किसान")}</small>
          </span>
        </div>
        <div>
          <Package size={26} />
          <span>
            <strong>{startup.products}</strong>
            <small>{t("Products / Solutions", "उत्पाद / समाधान")}</small>
          </span>
        </div>
        <div>
          <MapPin size={26} />
          <span>
            <strong>{startup.statesCovered}</strong>
            <small>{t("States Covered", "शामिल राज्य")}</small>
          </span>
        </div>
      </section>

      <section className={styles.solutionsPanel}>
        <div className={styles.sectionTitle}>
          <h2>{t("Our Solutions", "हमारे समाधान")}</h2>
          <button type="button" onClick={() => setTab("products")}>
            {t("View All", "सभी देखें")}
          </button>
        </div>
        <div className={styles.solutionScroller}>
          {startup.solutions.map((solution) => (
            <article key={solution.name}>
              <div>
                <Image src={solution.image} alt="" fill sizes="180px" />
              </div>
              <strong>{solution.name}</strong>
              <p>{translateStartupText(t, solution.description)}</p>
            </article>
          ))}
        </div>
      </section>

      <nav
        className={styles.detailTabs}
        aria-label={t("Startup details", "स्टार्टअप विवरण")}
      >
        {(
          [
            ["overview", t("Overview", "अवलोकन"), BarChart3],
            [
              "products",
              `${t("Products", "उत्पाद")} (${startup.products})`,
              Package,
            ],
            ["impact", t("Impact", "प्रभाव"), Leaf],
            [
              "reviews",
              `${t("Reviews", "समीक्षाएं")} (${startup.reviews})`,
              Star,
            ],
            ["media", t("Media", "मीडिया"), Play],
          ] as const
        ).map(([id, label, Icon]) => (
          <button
            className={tab === id ? styles.activeTab : ""}
            type="button"
            onClick={() => setTab(id)}
            key={id}
          >
            <Icon size={18} /> {label}
          </button>
        ))}
      </nav>

      {tab === "overview" ? (
        <Overview startup={startup} submitEnquiry={submitEnquiry} sent={sent} />
      ) : null}
      {tab === "products" ? <Products startup={startup} /> : null}
      {tab === "impact" ? <Impact startup={startup} /> : null}
      {tab === "reviews" ? <Reviews startup={startup} /> : null}
      {tab === "media" ? <MediaGallery startup={startup} /> : null}
    </div>
  );
}

function Overview({
  startup,
  submitEnquiry,
  sent,
}: {
  startup: Startup;
  submitEnquiry: (event: FormEvent<HTMLFormElement>) => void;
  sent: boolean;
}) {
  const { t } = useLocale();
  return (
    <>
      <div className={styles.overviewGrid}>
        <section className={styles.detailPanel}>
          <h2>
            {t("Why", "क्यों")} {startup.brand}?
          </h2>
          <div className={styles.reasonList}>
            {reasons.map(
              ([title, titleHi, description, descriptionHi], index) => (
                <div key={title}>
                  <span>
                    <Leaf size={18 + index} />
                  </span>
                  <p>
                    <strong>{t(title, titleHi)}</strong>
                    <small>{t(description, descriptionHi)}</small>
                  </p>
                </div>
              ),
            )}
          </div>
        </section>
        <section className={styles.detailPanel}>
          <h2>
            {t("What Farmers & FPOs Get", "किसानों और FPO को क्या मिलता है")}
          </h2>
          <ul className={styles.benefitList}>
            {farmerBenefits.map(([benefit, benefitHi]) => (
              <li key={benefit}>
                <CircleCheck size={17} /> {t(benefit, benefitHi)}
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.operatingPanel}>
          <div>
            <h2>{t("Operating In", "इन क्षेत्रों में कार्यरत")}</h2>
            <strong>
              {startup.statesCovered} {t("States", "राज्य")}
            </strong>
          </div>
          <p>
            {t(
              "Uttar Pradesh · Maharashtra · Karnataka · Punjab · Rajasthan · Madhya Pradesh · Gujarat · Telangana",
              "उत्तर प्रदेश · महाराष्ट्र · कर्नाटक · पंजाब · राजस्थान · मध्य प्रदेश · गुजरात · तेलंगाना",
            )}
          </p>
          <Map size={72} aria-hidden="true" />
        </section>
        <MediaGallery startup={startup} compact />
      </div>

      <div className={styles.contactGrid}>
        <section className={styles.detailPanel}>
          <h2>{t("Get in Touch", "संपर्क करें")}</h2>
          <address>
            <a href="tel:+919876543210">
              <Phone size={17} /> +91 98765 43210
            </a>
            <a href={`mailto:hello@${startup.slug}.com`}>
              <Mail size={17} /> hello@{startup.slug}.com
            </a>
            <a href={`https://www.${startup.slug}.com`}>
              <Globe2 size={17} /> www.{startup.slug}.com
            </a>
            <span>
              <MapPin size={17} />{" "}
              {t("123, Agri Innovation Park", "123, कृषि नवाचार पार्क")},{" "}
              {translateStartupText(t, startup.city)},{" "}
              {translateStartupText(t, startup.state)}
            </span>
          </address>
        </section>
        <form
          className={styles.enquiryForm}
          data-no-route-transition
          onSubmit={submitEnquiry}
        >
          <h2>{t("Send an Enquiry", "पूछताछ भेजें")}</h2>
          <input
            aria-label={t("Your name", "आपका नाम")}
            required
            placeholder={t("Your Name", "आपका नाम")}
          />
          <input
            aria-label={t("Mobile number", "मोबाइल नंबर")}
            required
            inputMode="tel"
            placeholder={t("Mobile Number", "मोबाइल नंबर")}
          />
          <textarea
            aria-label={t("Message", "संदेश")}
            required
            placeholder={t("Write your message...", "अपना संदेश लिखें...")}
            rows={3}
          />
          <button type="submit">
            {t("Send Enquiry", "पूछताछ भेजें")} <Send size={17} />
          </button>
          {sent ? (
            <p role="status">
              <CircleCheck size={16} />{" "}
              {t(
                "Your enquiry has been sent successfully.",
                "आपकी पूछताछ सफलतापूर्वक भेज दी गई है।",
              )}
            </p>
          ) : null}
        </form>
        <section className={styles.collaboratePanel}>
          <h2>{t("Collaborate with Us", "हमारे साथ सहयोग करें")}</h2>
          <p>
            {t(
              "Interested in partnership, distribution or pilot projects?",
              "साझेदारी, वितरण या पायलट परियोजनाओं में रुचि है?",
            )}
          </p>
          <Link href="/more#help">
            <Handshake size={18} />{" "}
            {t("Partner / Collaborate", "साझेदारी / सहयोग")}
          </Link>
          <Link href="/more#help">
            <CalendarDays size={18} />{" "}
            {t("Request Demo", "डेमो का अनुरोध करें")}
          </Link>
        </section>
      </div>
    </>
  );
}

function Products({ startup }: { startup: Startup }) {
  const { t } = useLocale();
  return (
    <section className={styles.tabPanel}>
      <h2>{t("Products & Solutions", "उत्पाद और समाधान")}</h2>
      <p>
        {t(
          "Explore technology designed to make farm operations simpler and more productive.",
          "कृषि कार्यों को सरल और अधिक उत्पादक बनाने के लिए तैयार तकनीक देखें।",
        )}
      </p>
      <div className={styles.productGrid}>
        {startup.solutions.map((solution) => (
          <article key={solution.name}>
            <div>
              <Image src={solution.image} alt="" fill sizes="240px" />
            </div>
            <h3>{solution.name}</h3>
            <p>{translateStartupText(t, solution.description)}</p>
            <Link href="/more#help">
              {t("Enquire Now", "अभी पूछताछ करें")} <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function Impact({ startup }: { startup: Startup }) {
  const { t } = useLocale();
  return (
    <section className={styles.tabPanel}>
      <h2>
        {t("Impact created by", "द्वारा उत्पन्न प्रभाव")} {startup.name}
      </h2>
      <div className={styles.impactGrid}>
        <div>
          <UsersRound size={28} />
          <strong>{startup.farmers}</strong>
          <span>{t("farmers supported", "किसानों को सहायता")}</span>
        </div>
        <div>
          <MapPin size={28} />
          <strong>{startup.statesCovered}</strong>
          <span>{t("states covered", "राज्य शामिल")}</span>
        </div>
        <div>
          <Package size={28} />
          <strong>{startup.products}</strong>
          <span>{t("active solutions", "सक्रिय समाधान")}</span>
        </div>
        <div>
          <BarChart3 size={28} />
          <strong>18%</strong>
          <span>{t("average productivity gain", "औसत उत्पादकता वृद्धि")}</span>
        </div>
      </div>
    </section>
  );
}

function Reviews({ startup }: { startup: Startup }) {
  const { t } = useLocale();
  return (
    <section className={styles.tabPanel}>
      <h2>{t("Farmer Reviews", "किसान समीक्षाएं")}</h2>
      <div className={styles.reviewGrid}>
        {(
          [
            [
              "Ramesh Kumar",
              "The team explained the technology clearly and helped us use it confidently on our farm.",
              "टीम ने तकनीक को स्पष्ट रूप से समझाया और हमारे खेत में आत्मविश्वास से उपयोग करने में मदद की।",
            ],
            [
              "Sunita Devi",
              "The solution saved time and gave us useful information for making better crop decisions.",
              "इस समाधान ने समय बचाया और फसल संबंधी बेहतर निर्णय लेने के लिए उपयोगी जानकारी दी।",
            ],
          ] as const
        ).map(([name, review, reviewHi]) => (
          <article key={name}>
            <div>
              <strong>{name}</strong>
              <span>
                <Star size={15} /> {startup.rating}
              </span>
            </div>
            <p>{t(review, reviewHi)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function MediaGallery({
  startup,
  compact = false,
}: {
  startup: Startup;
  compact?: boolean;
}) {
  const { t } = useLocale();
  const images = [
    startup.heroImage,
    "/images/authenticated/startups/media-drone.jpg",
    "/images/authenticated/startups/media-app.jpg",
  ];
  return (
    <section className={compact ? styles.mediaPanel : styles.tabPanel}>
      <div className={styles.sectionTitle}>
        <h2>{t("Media Gallery", "मीडिया गैलरी")}</h2>
        {compact ? (
          <button type="button">{t("View All", "सभी देखें")}</button>
        ) : null}
      </div>
      <div className={styles.mediaGrid}>
        {images.map((image, index) => (
          <div key={`${image}-${index}`}>
            <Image
              src={image}
              alt={t(
                `${startup.name} media ${index + 1}`,
                `${startup.name} मीडिया ${index + 1}`,
              )}
              fill
              sizes="220px"
            />
            {index < 2 ? (
              <span>
                <Play size={16} fill="currentColor" />
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
