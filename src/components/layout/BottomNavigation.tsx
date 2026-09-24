"use client";

import { House, Sprout, Stethoscope, Store, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { routes } from "@/config/routes";
import type { DashboardSnapshot } from "@/domain/models";
import { FarmerProfileOverview } from "@/features/profile/FarmerProfileOverview";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

const items = [
  ["home", House],
  ["myFarm", Sprout],
  ["nearbyMarket", Store],
  ["cropDoctor", Stethoscope],
  ["profile", UserRound],
] as const;

type NavigationItem = (typeof items)[number][0];
type LegacyNavigationItem = "schemes" | "mandi" | "apply" | "tracking" | "more";
export type BottomNavigationActive = NavigationItem | LegacyNavigationItem;

export function BottomNavigation({
  locale,
  dictionary,
  active,
  snapshot,
}: {
  locale: Locale;
  dictionary: Dictionary;
  active: BottomNavigationActive;
  snapshot: DashboardSnapshot;
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const hrefs = {
    home: routes.home(locale),
    myFarm: routes.farms(locale),
    nearbyMarket: routes.nearbyServices(locale),
    cropDoctor: routes.cropDoctor(locale),
    profile: routes.profile(locale),
  };

  useEffect(() => {
    if (!isProfileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
        profileButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isProfileOpen]);

  const closeProfile = () => {
    setIsProfileOpen(false);
    profileButtonRef.current?.focus();
  };

  return (
    <>
      <nav
        className={styles.bottomNav}
        aria-label={dictionary["common.primaryNavigation"]}
      >
        {items.map(([id, Icon]) =>
          id === "profile" ? (
            <button
              ref={profileButtonRef}
              type="button"
              key={id}
              className={[
                styles.navItem,
                active === id ? styles.navItemActive : "",
              ].join(" ")}
              aria-expanded={isProfileOpen}
              aria-controls="farmer-profile-drawer"
              onClick={() => setIsProfileOpen(true)}
            >
              <Icon size={23} aria-hidden="true" />
              <span>{dictionary[`common.${id}`]}</span>
            </button>
          ) : (
            <a
              key={id}
              className={[
                styles.navItem,
                active === id ? styles.navItemActive : "",
              ].join(" ")}
              href={hrefs[id]}
              aria-current={active === id ? "page" : undefined}
            >
              <Icon size={23} aria-hidden="true" />
              <span>{dictionary[`common.${id}`]}</span>
            </a>
          ),
        )}
      </nav>

      {isProfileOpen ? (
        <div
          className={styles.profileDrawerBackdrop}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              closeProfile();
            }
          }}
        >
          <aside
            className={styles.profileDrawer}
            id="farmer-profile-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="farmer-profile-title"
          >
            <div className={styles.profileDrawerHeader}>
              <h2 id="farmer-profile-title">{dictionary["profile.title"]}</h2>
              <button
                ref={closeButtonRef}
                type="button"
                className={styles.iconButton}
                onClick={closeProfile}
                aria-label={dictionary["common.close"]}
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <div className={styles.profileDrawerBody}>
              <FarmerProfileOverview
                locale={locale}
                dictionary={dictionary}
                snapshot={snapshot}
              />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
