"use client";

import { ArrowLeft, ArrowRight, BadgeCheck, MapPin, Store } from "lucide-react";
import Link from "next/link";

import {
  nearbyHubCards,
  nearbyHubIcon,
  nearbyText,
} from "@/features/nearby/nearby-data";
import { useLocale } from "@/i18n/LocaleProvider";
import styles from "@/features/nearby/nearby.module.css";

const HubIcon = nearbyHubIcon;

export function NearbyHub() {
  const { t } = useLocale();
  return (
    <div className={styles.hubPage}>
      <Link className={styles.backLink} href="/home">
        <ArrowLeft size={19} aria-hidden="true" />{" "}
        {t("Back to Home", "होम पर वापस जाएं")}
      </Link>

      <section className={styles.hubHero}>
        <span className={styles.hubHeroIcon}>
          <HubIcon size={38} aria-hidden="true" />
        </span>
        <div>
          <p>{t("Local agriculture network", "स्थानीय कृषि नेटवर्क")}</p>
          <h1>
            {t("Nearby Sellers & Services", "आस-पास के विक्रेता और सेवाएं")}
          </h1>
          <span>
            {t(
              "Find trusted agricultural suppliers and storage facilities around Chomu.",
              "चौमूं के आसपास विश्वसनीय कृषि आपूर्तिकर्ता और भंडारण सुविधाएं खोजें।",
            )}
          </span>
        </div>
        <div className={styles.hubLocation}>
          <MapPin size={22} aria-hidden="true" />
          <span>
            <small>{t("Your location", "आपका स्थान")}</small>
            <strong>
              {t("Chomu, Jaipur, Rajasthan", "चौमूं, जयपुर, राजस्थान")}
            </strong>
          </span>
        </div>
      </section>

      <section className={styles.hubIntroduction}>
        <div>
          <span>
            <Store size={21} aria-hidden="true" />
          </span>
          <div>
            <h2>{t("Choose a nearby service", "आस-पास की सेवा चुनें")}</h2>
            <p>
              {t(
                "Compare verified sellers, available products, distance, timings and contact details.",
                "सत्यापित विक्रेताओं, उपलब्ध उत्पादों, दूरी, समय और संपर्क विवरण की तुलना करें।",
              )}
            </p>
          </div>
        </div>
        <p>
          <BadgeCheck size={18} aria-hidden="true" />
          {t(
            "Listings verified by the Agriculture Department, Rajasthan",
            "सूचियां राजस्थान कृषि विभाग द्वारा सत्यापित हैं",
          )}
        </p>
      </section>

      <div className={styles.hubGrid}>
        {nearbyHubCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              className={styles.hubCard}
              href={`/nearby/${card.id}`}
              key={card.id}
            >
              <span className={styles.hubCardIcon}>
                <Icon size={38} aria-hidden="true" />
              </span>
              <div>
                <h2>{t(nearbyText(card.title))}</h2>
                <p>{t(nearbyText(card.description))}</p>
                <small>{t(card.count)}</small>
              </div>
              <ArrowRight size={21} aria-hidden="true" />
            </Link>
          );
        })}
      </div>

      <section className={styles.hubTrust}>
        <article>
          <BadgeCheck size={26} aria-hidden="true" />
          <div>
            <strong>{t("Verified listings", "सत्यापित सूचियां")}</strong>
            <span>
              {t(
                "Department-verified sellers and facilities",
                "विभाग द्वारा सत्यापित विक्रेता और सुविधाएं",
              )}
            </span>
          </div>
        </article>
        <article>
          <MapPin size={26} aria-hidden="true" />
          <div>
            <strong>{t("Distance based", "दूरी के आधार पर")}</strong>
            <span>
              {t(
                "Results ordered around your selected location",
                "आपके चुने हुए स्थान के आसपास क्रमबद्ध परिणाम",
              )}
            </span>
          </div>
        </article>
        <article>
          <Store size={26} aria-hidden="true" />
          <div>
            <strong>{t("Direct contact", "सीधा संपर्क")}</strong>
            <span>
              {t(
                "Call a seller or service provider directly",
                "विक्रेता या सेवा प्रदाता को सीधे कॉल करें",
              )}
            </span>
          </div>
        </article>
      </section>
    </div>
  );
}
