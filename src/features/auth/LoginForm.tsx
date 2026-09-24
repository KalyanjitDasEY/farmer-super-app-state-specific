"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { requestDemoOtp, verifyDemoOtp } from "@/app/actions/identity";
import { routes } from "@/config/routes";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

type Method = "janAadhaar" | "farmerId" | "mobile";

export function LoginForm({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const router = useRouter();
  const [method, setMethod] = useState<Method>("janAadhaar");
  const [identifier, setIdentifier] = useState("");
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const requestOtp = async () => {
    setPending(true);
    setError("");
    const normalized =
      method === "farmerId"
        ? identifier.replace(/\D/g, "").padEnd(10, "0").slice(0, 12)
        : identifier.replace(/\D/g, "");
    const result = await requestDemoOtp(normalized);
    setPending(false);
    if (!result.ok) {
      setError(dictionary["login.invalidIdentifier"]);
      return;
    }
    setChallengeId(result.challengeId);
  };

  const verify = async () => {
    if (!challengeId) return;
    setPending(true);
    setError("");
    const verified = await verifyDemoOtp(challengeId, otp);
    setPending(false);
    if (!verified) {
      setError(dictionary["login.invalidOtp"]);
      return;
    }
    sessionStorage.setItem("raj-kisan-demo-auth", "true");
    router.push("/home");
  };

  return (
    <section className={`${styles.card} ${styles.formCard}`}>
      <ShieldCheck className={styles.softIcon} aria-hidden="true" />
      <h1>{dictionary["login.title"]}</h1>
      <p>{dictionary["login.subtitle"]}</p>

      <fieldset>
        <legend className={styles.legend}>{dictionary["login.select"]}</legend>
        <div className={`${styles.radioCards} ${styles.loginRadioCards}`}>
          {(["janAadhaar", "farmerId", "mobile"] as const).map((option) => (
            <label className={styles.radioCard} key={option}>
              <input
                type="radio"
                name="login-method"
                value={option}
                checked={method === option}
                onChange={() => {
                  setMethod(option);
                  setIdentifier("");
                  setChallengeId(null);
                }}
              />
              <span>{dictionary[`login.${option}`]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor="login-identifier">
          {dictionary[`login.${method}`]}
        </label>
        <input
          className={styles.input}
          id="login-identifier"
          autoComplete={method === "mobile" ? "tel" : "off"}
          inputMode={method === "farmerId" ? "text" : "numeric"}
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "login-error" : undefined}
        />
      </div>

      {challengeId ? (
        <div className={styles.field}>
          <label htmlFor="login-otp">{dictionary["login.otp"]}</label>
          <input
            className={styles.input}
            id="login-otp"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
          />
        </div>
      ) : null}

      <div className={`${styles.notice} ${styles.noticeSuccess}`}>
        <ShieldCheck size={22} aria-hidden="true" />
        <span>{dictionary["login.otpHint"]}</span>
      </div>
      {error ? (
        <p className={styles.fieldError} id="login-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className={styles.formActions}>
        <button
          className={styles.button}
          type="button"
          disabled={pending || !identifier}
          onClick={challengeId ? verify : requestOtp}
        >
          {pending
            ? dictionary["common.loading"]
            : challengeId
              ? dictionary["login.verify"]
              : dictionary["login.sendOtp"]}
          <ArrowRight size={18} aria-hidden="true" />
        </button>
        <a
          className={`${styles.button} ${styles.buttonSecondary}`}
          href={routes.gateway(locale)}
        >
          {dictionary["common.back"]}
        </a>
      </div>
      <div className={styles.formDivider} />
      <h2>{dictionary["login.new"]}</h2>
      <p>{dictionary["login.newDescription"]}</p>
      <div className={styles.inlineActions}>
        <a
          className={`${styles.button} ${styles.buttonSecondary}`}
          href={routes.registerIdentity(locale)}
        >
          {dictionary["gateway.register"]}
        </a>
        <a
          className={`${styles.button} ${styles.buttonSecondary}`}
          href={routes.tracking(locale)}
        >
          {dictionary["gateway.track"]}
        </a>
      </div>
    </section>
  );
}
