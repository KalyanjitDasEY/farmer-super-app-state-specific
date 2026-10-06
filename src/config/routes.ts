import { withBasePath } from "@/config/base-path";
import type { Locale } from "@/types/locale";

const routeFor = (locale: Locale, path: string) => {
  void locale;
  return withBasePath(path);
};

export const routes = {
  gateway: (locale: Locale) => routeFor(locale, "/"),
  imageCredits: (locale: Locale) => routeFor(locale, "/image-credits"),
  login: (locale: Locale) => routeFor(locale, "/login"),
  registerIdentity: (locale: Locale) => routeFor(locale, "/register/identity"),
  registerLocation: (locale: Locale) => routeFor(locale, "/register/location"),
  registerComplete: (locale: Locale) => routeFor(locale, "/register/complete"),
  home: (locale: Locale) => routeFor(locale, "/home"),
  mandi: (locale: Locale) => routeFor(locale, "/mandi"),
  weather: (locale: Locale) => routeFor(locale, "/weather"),
  advisories: (locale: Locale) => routeFor(locale, "/advisories"),
  marketplace: (locale: Locale) => routeFor(locale, "/marketplace"),
  nutricheck: (locale: Locale) => routeFor(locale, "/nutricheck"),
  cropDoctor: (locale: Locale) => routeFor(locale, "/crop-doctor"),
  leafColourCheck: (locale: Locale) => routeFor(locale, "/leaf-colour-check"),
  pestDisease: (locale: Locale) => routeFor(locale, "/pest-disease"),
  pashuBazaar: (locale: Locale) => routeFor(locale, "/pashu-bazaar"),
  farms: (locale: Locale) => routeFor(locale, "/farms"),
  machinery: (locale: Locale) => routeFor(locale, "/machinery"),
  startups: (locale: Locale) => routeFor(locale, "/startups"),
  mksy: (locale: Locale) => routeFor(locale, "/mksy"),
  soilHealth: (locale: Locale) => routeFor(locale, "/soil-health"),
  nearbyServices: (locale: Locale) => routeFor(locale, "/nearby"),
  planYourCrop: (locale: Locale) => routeFor(locale, "/plan-your-crop"),
  featurePreview: (locale: Locale) => routeFor(locale, "/feature-preview"),
  schemes: (locale: Locale) => routeFor(locale, "/schemes"),
  schemeDepartments: (locale: Locale) =>
    routeFor(locale, "/schemes/departments"),
  schemeCatalogue: (locale: Locale) => routeFor(locale, "/schemes/catalogue"),
  schemeDetail: (locale: Locale, schemeId: string) =>
    routeFor(locale, `/schemes/${schemeId}`),
  apply: (locale: Locale, schemeId: string) =>
    routeFor(locale, `/apply/${schemeId}`),
  tracking: (locale: Locale) => routeFor(locale, "/track"),
  profile: (locale: Locale) => routeFor(locale, "/profile"),
  profileDigitalId: (locale: Locale) => routeFor(locale, "/profile/digital-id"),
  profileVirtualId: (locale: Locale) =>
    routeFor(locale, "/profile/digital-id/vid"),
  profileWallet: (locale: Locale) => routeFor(locale, "/profile/wallet"),
  profileCredential: (locale: Locale) =>
    routeFor(locale, "/profile/wallet/credential"),
  profileConsent: (locale: Locale) =>
    routeFor(locale, "/profile/consent/select-fields"),
  profileConsentReview: (locale: Locale) =>
    routeFor(locale, "/profile/consent/review"),
  profileConsentToken: (locale: Locale) =>
    routeFor(locale, "/profile/consent/token"),
  profileRepresentatives: (locale: Locale) =>
    routeFor(locale, "/profile/representatives"),
  profileRepresentativeAdd: (locale: Locale) =>
    routeFor(locale, "/profile/representatives/add"),
  profileAudit: (locale: Locale) => routeFor(locale, "/profile/audit"),
  more: (locale: Locale) => routeFor(locale, "/more"),
  offline: (locale: Locale) => routeFor(locale, "/offline"),
} as const;
