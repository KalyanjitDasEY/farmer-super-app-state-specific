import {
  BarChart3,
  Bug,
  CalendarDays,
  CirclePlay,
  CloudRain,
  CloudSun,
  Droplets,
  Gift,
  HeartHandshake,
  Leaf,
  Map,
  MapPin,
  Microscope,
  PawPrint,
  Rocket,
  Salad,
  ScanSearch,
  ShoppingCart,
  Sprout,
  Store,
  ThermometerSun,
  Tractor,
  UsersRound,
  WalletCards,
  Wheat,
} from "lucide-react";

import { PageShell } from "@/components/layout/PageShell";
import { routes } from "@/config/routes";
import type { DashboardSnapshot } from "@/domain/models";
import type { Dictionary, TranslationKey } from "@/i18n/dictionaries";
import { formatDateTime } from "@/lib/format";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

import { KrishiMitraChat } from "./KrishiMitraChat";

const serviceItems: Array<{
  key: TranslationKey;
  icon: typeof Gift;
  href:
    | "schemes"
    | "track"
    | "mandi"
    | "weather"
    | "advisories"
    | "marketplace"
    | "nutricheck"
    | "cropDoctor"
    | "leafColourCheck"
    | "pestDisease"
    | "pashuBazaar"
    | "farms"
    | "machinery"
    | "startups"
    | "mksy"
    | "soilHealth"
    | "nearbyServices"
    | "planYourCrop"
    | "featurePreview"
    | "more"
    | "profile";
  descriptionKey: TranslationKey;
}> = [
  {
    key: "home.service.schemeDiscovery",
    icon: Gift,
    href: "schemes",
    descriptionKey: "home.service.schemeDiscoveryDescription",
  },
  {
    key: "home.service.mksy",
    icon: HeartHandshake,
    href: "mksy",
    descriptionKey: "home.service.mksyDescription",
  },
  {
    key: "home.service.land",
    icon: Map,
    href: "profile",
    descriptionKey: "home.service.landDescription",
  },
  {
    key: "home.service.soil",
    icon: Sprout,
    href: "soilHealth",
    descriptionKey: "home.service.soilDescription",
  },
  {
    key: "home.service.nearbySellers",
    icon: MapPin,
    href: "nearbyServices",
    descriptionKey: "home.service.nearbySellersDescription",
  },
  {
    key: "home.service.planYourCrop",
    icon: CalendarDays,
    href: "planYourCrop",
    descriptionKey: "home.service.planYourCropDescription",
  },
  {
    key: "home.service.mandi",
    icon: BarChart3,
    href: "mandi",
    descriptionKey: "home.service.mandiDescription",
  },
  {
    key: "home.service.enam",
    icon: ShoppingCart,
    href: "featurePreview",
    descriptionKey: "home.service.enamDescription",
  },
  {
    key: "home.service.weather",
    icon: CloudSun,
    href: "weather",
    descriptionKey: "home.service.weatherDescription",
  },
  {
    key: "home.service.advisory",
    icon: Leaf,
    href: "advisories",
    descriptionKey: "home.service.advisoryDescription",
  },
  {
    key: "home.service.inputs",
    icon: Store,
    href: "marketplace",
    descriptionKey: "home.service.inputsDescription",
  },
  {
    key: "home.service.rewards",
    icon: Gift,
    href: "featurePreview",
    descriptionKey: "home.service.rewardsDescription",
  },
  {
    key: "home.service.food",
    icon: Wheat,
    href: "featurePreview",
    descriptionKey: "home.service.foodDescription",
  },
  {
    key: "home.service.cropDoctor",
    icon: Microscope,
    href: "cropDoctor",
    descriptionKey: "home.service.cropDoctorDescription",
  },
  {
    key: "home.service.leafColour",
    icon: ScanSearch,
    href: "leafColourCheck",
    descriptionKey: "home.service.leafColourDescription",
  },
  {
    key: "home.service.nutriCheck",
    icon: Salad,
    href: "nutricheck",
    descriptionKey: "home.service.nutriCheckDescription",
  },
  {
    key: "home.service.pests",
    icon: Bug,
    href: "pestDisease",
    descriptionKey: "home.service.pestsDescription",
  },
  {
    key: "home.service.pashuBazaar",
    icon: PawPrint,
    href: "pashuBazaar",
    descriptionKey: "home.service.pashuBazaarDescription",
  },
  {
    key: "home.service.machinery",
    icon: Tractor,
    href: "machinery",
    descriptionKey: "home.service.machineryDescription",
  },
  {
    key: "home.service.myFarm",
    icon: Wheat,
    href: "farms",
    descriptionKey: "home.service.myFarmDescription",
  },
  {
    key: "home.service.fpo",
    icon: UsersRound,
    href: "featurePreview",
    descriptionKey: "home.service.fpoDescription",
  },
  {
    key: "home.service.finance",
    icon: WalletCards,
    href: "featurePreview",
    descriptionKey: "home.service.financeDescription",
  },
  {
    key: "home.service.training",
    icon: CirclePlay,
    href: "featurePreview",
    descriptionKey: "home.service.trainingDescription",
  },
  {
    key: "home.service.startups",
    icon: Rocket,
    href: "startups",
    descriptionKey: "home.service.startupsDescription",
  },
];

export function DashboardPage({
  locale,
  dictionary,
  snapshot,
}: {
  locale: Locale;
  dictionary: Dictionary;
  snapshot: DashboardSnapshot;
}) {
  const serviceHref = {
    schemes: routes.schemes(locale),
    track: routes.tracking(locale),
    mandi: routes.mandi(locale),
    weather: routes.weather(locale),
    advisories: routes.advisories(locale),
    marketplace: routes.marketplace(locale),
    nutricheck: routes.nutricheck(locale),
    cropDoctor: routes.cropDoctor(locale),
    leafColourCheck: routes.leafColourCheck(locale),
    pestDisease: routes.pestDisease(locale),
    pashuBazaar: routes.pashuBazaar(locale),
    farms: routes.farms(locale),
    machinery: routes.machinery(locale),
    startups: routes.startups(locale),
    mksy: routes.mksy(locale),
    soilHealth: routes.soilHealth(locale),
    nearbyServices: routes.nearbyServices(locale),
    planYourCrop: routes.planYourCrop(locale),
    featurePreview: routes.featurePreview(locale),
    profile: routes.profile(locale),
    more: routes.more(locale),
  };

  return (
    <PageShell
      locale={locale}
      dictionary={dictionary}
      authenticated
      activeNavigation="home"
    >
      <div className={`${styles.container} ${styles.sectionCompact}`}>
        <section className={`${styles.grid} ${styles.tripleGrid}`}>
          <article
            className={`${styles.card} ${styles.weatherCard}`}
            aria-label={dictionary["home.currentWeather"]}
          >
            <div className={styles.weatherTop}>
              <span>
                <MapPin size={17} aria-hidden="true" />
                {dictionary["common.patna"]}, {dictionary["common.bihar"]}
              </span>
              <strong>{dictionary["home.today"]}</strong>
            </div>
            <div className={styles.weatherMain}>
              <div>
                <strong>{snapshot.temperatureCelsius}°C</strong>
                <span>{dictionary["home.partlyCloudy"]}</span>
              </div>
              <CloudSun
                className={styles.weatherIcon}
                size={66}
                aria-hidden="true"
              />
            </div>
            <div className={styles.weatherMeta}>
              <span>
                <ThermometerSun size={17} aria-hidden="true" />
                {dictionary["home.feelsLike"]} {snapshot.temperatureCelsius + 3}
                °
              </span>
              <span>
                <Droplets size={17} aria-hidden="true" />
                68%
              </span>
              <span>
                <CloudRain size={17} aria-hidden="true" />
                {dictionary["home.rainTomorrow"]}
              </span>
            </div>
          </article>
        </section>

        <section className={styles.section}>
          <h2>{dictionary["home.services"]}</h2>
          <div className={`${styles.grid} ${styles.dashboardServiceGrid}`}>
            {serviceItems.map(({ key, icon: Icon, href, descriptionKey }) => {
              const destination =
                href === "featurePreview"
                  ? `${serviceHref.featurePreview}?feature=${encodeURIComponent(dictionary[key])}`
                  : serviceHref[href];

              return (
                <a
                  className={`${styles.card} ${styles.serviceCard}`}
                  href={destination}
                  key={key}
                >
                  <Icon size={38} aria-hidden="true" />
                  <h3>{dictionary[key]}</h3>
                  <p>{dictionary[descriptionKey]}</p>
                </a>
              );
            })}
          </div>
        </section>

        <p>
          {dictionary["common.lastUpdated"]}:{" "}
          <time dateTime={snapshot.updatedAt}>
            {formatDateTime(snapshot.updatedAt, locale)}
          </time>
        </p>
      </div>
      <KrishiMitraChat locale={locale} dictionary={dictionary} />
    </PageShell>
  );
}
