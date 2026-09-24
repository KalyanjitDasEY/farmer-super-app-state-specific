"use client";

import {
  Fingerprint,
  Hourglass,
  IdCard,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { requestDemoOtp, verifyDemoOtp } from "@/app/actions/identity";
import { Stepper } from "@/components/layout/Stepper";
import { routes } from "@/config/routes";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

export function IdentityForm({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const router = useRouter();
  const [method, setMethod] = useState<"aadhaar" | "janAadhaar">("aadhaar");
  const [identifier, setIdentifier] = useState("");
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const send = async () => {
    setPending(true);
    setError("");
    const result = await requestDemoOtp(identifier.replace(/\D/g, ""));
    setPending(false);
    if (!result.ok) {
      setError(dictionary["register.invalidIdentity"]);
      return;
    }
    setChallengeId(result.challengeId);
  };

  const verify = async () => {
    if (!challengeId) return;
    setPending(true);
    const result = await verifyDemoOtp(challengeId, otp);
    setPending(false);
    if (!result) {
      setError(dictionary["login.invalidOtp"]);
      return;
    }
    sessionStorage.setItem("raj-kisan-registration-step", "identity-complete");
    router.push("/register/location");
  };

  return (
    <section className={`${styles.card} ${styles.formCard}`}>
      <h1>{dictionary["register.identityTitle"]}</h1>
      <p>{dictionary["register.identitySubtitle"]}</p>
      <Stepper dictionary={dictionary} current={1} />

      <fieldset>
        <legend className={styles.formSectionTitle}>
          1.{" "}
          {locale === "hi" ? "पहचान विवरण दर्ज करें" : "Enter Identity Details"}
        </legend>
        <p className={styles.formHint}>
          {locale === "hi"
            ? "पहचान पत्र का प्रकार चुनें और संख्या दर्ज करें"
            : "Select the type of ID and enter the number"}
        </p>
        <div className={`${styles.radioCards} ${styles.identityRadioCards}`}>
          {(["aadhaar", "janAadhaar"] as const).map((option) => (
            <label className={styles.radioCard} key={option}>
              <input
                type="radio"
                name="identity-method"
                checked={method === option}
                onChange={() => {
                  setMethod(option);
                  setChallengeId(null);
                }}
              />
              {option === "aadhaar" ? (
                <Fingerprint aria-hidden="true" />
              ) : (
                <IdCard aria-hidden="true" />
              )}
              <span>
                <strong>{dictionary[`register.${option}`]}</strong>
                <small>
                  {option === "aadhaar"
                    ? locale === "hi"
                      ? "आधार से सत्यापित करें"
                      : "Verify with Aadhaar"
                    : locale === "hi"
                      ? "जन आधार से सत्यापित करें"
                      : "Verify with Jan Aadhaar"}
                </small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor="identity-number">
          {dictionary["register.identityNumber"]}
        </label>
        <input
          className={styles.input}
          id="identity-number"
          inputMode="numeric"
          autoComplete="off"
          maxLength={12}
          value={identifier}
          onChange={(event) =>
            setIdentifier(event.target.value.replace(/\D/g, ""))
          }
        />
      </div>

      <section className={styles.formSection}>
        <h2 className={styles.formSectionTitle}>
          2. {locale === "hi" ? "OTP से सत्यापित करें" : "Verify with OTP"}
        </h2>
        <p className={styles.formHint}>
          {locale === "hi"
            ? "पंजीकृत मोबाइल नंबर पर एक OTP भेजा जाएगा"
            : "We will send a One Time Password (OTP) to your registered mobile number."}
        </p>
        <div className={styles.mobileSummary}>
          <Smartphone size={19} aria-hidden="true" />
          <span>
            <small>{dictionary["register.mobile"]}</small>
            <strong>+91 98XXXXXX56</strong>
          </span>
        </div>
        <div className={styles.field}>
          <label htmlFor="registration-otp">{dictionary["login.otp"]}</label>
          <div className={styles.otpRow}>
            <input
              className={styles.input}
              id="registration-otp"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              disabled={!challengeId}
              placeholder={dictionary["login.otp"]}
              value={otp}
              onChange={(event) =>
                setOtp(event.target.value.replace(/\D/g, ""))
              }
            />
            <button
              className={`${styles.button} ${styles.buttonSecondary}`}
              type="button"
              disabled={pending || identifier.length !== 12}
              onClick={send}
            >
              {pending
                ? dictionary["common.loading"]
                : dictionary["register.sendOtp"]}
            </button>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <h2 className={styles.formSectionTitle}>
          3. {locale === "hi" ? "e-KYC स्थिति" : "e-KYC Status"}
        </h2>
        <div
          className={`${styles.notice} ${
            challengeId ? styles.noticeWarning : ""
          }`}
        >
          <Hourglass size={22} aria-hidden="true" />
          <span>
            <strong>{dictionary["register.pending"]}</strong>
            <small>
              {locale === "hi"
                ? "जारी रखने के लिए OTP से सत्यापन करें।"
                : "Verify using the OTP to continue."}
            </small>
          </span>
        </div>
      </section>

      <div className={`${styles.notice} ${styles.noticeSuccess}`}>
        <ShieldCheck size={22} aria-hidden="true" />
        <span>{dictionary["register.privacy"]}</span>
      </div>
      {error ? (
        <p className={styles.fieldError} role="alert">
          {error}
        </p>
      ) : null}

      <div className={styles.formActions}>
        <button
          className={styles.button}
          type="button"
          disabled={pending || !challengeId || otp.length !== 6}
          onClick={verify}
        >
          {pending
            ? dictionary["common.loading"]
            : dictionary["register.verify"]}
        </button>
        <a
          className={`${styles.button} ${styles.buttonSecondary}`}
          href={routes.gateway(locale)}
        >
          {dictionary["common.back"]}
        </a>
      </div>
      <p className={styles.notice}>{dictionary["register.identityLimit"]}</p>
    </section>
  );
}
