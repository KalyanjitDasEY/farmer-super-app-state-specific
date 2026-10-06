"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig, SearchCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { Dictionary } from "@/i18n/dictionaries";
import styles from "@/styles/application.module.css";

const trackingSchema = z.object({
  reference: z.string().min(8).max(40),
  mobile: z.string().regex(/^[6-9]\d{9}$/),
});

type TrackingValues = z.infer<typeof trackingSchema>;

export function TrackingForm({ dictionary }: { dictionary: Dictionary }) {
  const [status, setStatus] = useState<"idle" | "found" | "notFound">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrackingValues>({
    resolver: zodResolver(trackingSchema),
    defaultValues: { reference: "", mobile: "" },
  });

  const submit = handleSubmit(async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    setStatus(
      values.reference.toUpperCase() === "BR-DEMO-2026-001" &&
        values.mobile === "9876543210"
        ? "found"
        : "notFound",
    );
  });

  return (
    <form className={`${styles.card} ${styles.formCard}`} onSubmit={submit}>
      <SearchCheck className={styles.softIcon} size={34} aria-hidden="true" />
      <h1>{dictionary["tracking.title"]}</h1>
      <p>{dictionary["tracking.subtitle"]}</p>
      <div className={styles.field}>
        <label htmlFor="tracking-reference">
          {dictionary["tracking.reference"]}
        </label>
        <input
          className={styles.input}
          id="tracking-reference"
          autoComplete="off"
          aria-invalid={Boolean(errors.reference)}
          {...register("reference")}
        />
        {errors.reference ? (
          <span className={styles.fieldError}>
            {dictionary["login.invalidIdentifier"]}
          </span>
        ) : null}
      </div>
      <div className={styles.field}>
        <label htmlFor="tracking-mobile">{dictionary["tracking.mobile"]}</label>
        <input
          className={styles.input}
          id="tracking-mobile"
          inputMode="tel"
          autoComplete="tel"
          maxLength={10}
          aria-invalid={Boolean(errors.mobile)}
          {...register("mobile")}
        />
        {errors.mobile ? (
          <span className={styles.fieldError}>
            {dictionary["login.invalidIdentifier"]}
          </span>
        ) : null}
      </div>
      <div className={styles.notice}>{dictionary["tracking.demoHint"]}</div>
      <button className={styles.button} type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? dictionary["common.loading"]
          : dictionary["tracking.action"]}
      </button>
      {status === "notFound" ? (
        <div className={`${styles.notice} ${styles.noticeError}`} role="alert">
          {dictionary["tracking.notFound"]}
        </div>
      ) : null}
      {status === "found" ? (
        <section
          className={`${styles.notice} ${styles.noticeSuccess}`}
          aria-live="polite"
        >
          <CircleCheckBig size={24} aria-hidden="true" />
          <div>
            <strong>{dictionary["tracking.found"]}</strong>
            <p>
              {dictionary["scheme.applicationStatus"]}:{" "}
              {dictionary["scheme.underReview"]}
            </p>
          </div>
        </section>
      ) : null}
    </form>
  );
}
