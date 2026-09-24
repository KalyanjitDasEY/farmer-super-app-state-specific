"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Info, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { resolveDemoLocation } from "@/app/actions/location";
import { Stepper } from "@/components/layout/Stepper";
import { routes } from "@/config/routes";
import type { AdministrativeArea } from "@/domain/models";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/locale";
import styles from "@/styles/application.module.css";

const locationSchema = z.object({
  districtId: z.string().min(1),
  tehsilId: z.string().min(1),
  villageId: z.string().min(1),
  anchorKhasra: z.string().regex(/^\d+(?:\/\d+)?$/),
});

type LocationValues = z.infer<typeof locationSchema>;

export function LocationForm({
  locale,
  dictionary,
  districts,
  tehsils,
  villages,
}: {
  locale: Locale;
  dictionary: Dictionary;
  districts: AdministrativeArea[];
  tehsils: AdministrativeArea[];
  villages: AdministrativeArea[];
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LocationValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      districtId: "",
      tehsilId: "",
      villageId: "",
      anchorKhasra: "",
    },
  });
  const districtId = useWatch({ control, name: "districtId" });
  const tehsilId = useWatch({ control, name: "tehsilId" });
  const availableTehsils = useMemo(
    () => tehsils.filter((item) => item.parentId === districtId),
    [districtId, tehsils],
  );
  const availableVillages = useMemo(
    () => villages.filter((item) => item.parentId === tehsilId),
    [tehsilId, villages],
  );

  const submit = handleSubmit(async (values) => {
    const result = await resolveDemoLocation(values);
    if (!result.ok) {
      setError("anchorKhasra", {
        message: dictionary["register.invalidKhasra"],
      });
      return;
    }
    sessionStorage.setItem("raj-kisan-registration-step", "location-complete");
    router.push("/register/complete");
  });

  return (
    <form className={`${styles.card} ${styles.formCard}`} onSubmit={submit}>
      <h1>{dictionary["register.locationTitle"]}</h1>
      <p>{dictionary["register.locationSubtitle"]}</p>
      <Stepper dictionary={dictionary} current={2} />

      <div className={styles.field}>
        <label htmlFor="district">
          {dictionary["register.district"]} <span aria-hidden="true">*</span>
        </label>
        <select
          className={styles.select}
          id="district"
          aria-invalid={Boolean(errors.districtId)}
          {...register("districtId", {
            onChange: () => {
              setValue("tehsilId", "");
              setValue("villageId", "");
            },
          })}
        >
          <option value="">-- {dictionary["register.district"]} --</option>
          {districts.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name[locale]}
            </option>
          ))}
        </select>
        {errors.districtId ? (
          <span className={styles.fieldError}>
            {dictionary["common.required"]}
          </span>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="tehsil">
          {dictionary["register.tehsil"]} <span aria-hidden="true">*</span>
        </label>
        <select
          className={styles.select}
          id="tehsil"
          disabled={!districtId}
          aria-invalid={Boolean(errors.tehsilId)}
          {...register("tehsilId", {
            onChange: () => setValue("villageId", ""),
          })}
        >
          <option value="">-- {dictionary["register.tehsil"]} --</option>
          {availableTehsils.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name[locale]}
            </option>
          ))}
        </select>
        {errors.tehsilId ? (
          <span className={styles.fieldError}>
            {dictionary["common.required"]}
          </span>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="village">
          {dictionary["register.village"]} <span aria-hidden="true">*</span>
        </label>
        <select
          className={styles.select}
          id="village"
          disabled={!tehsilId}
          aria-invalid={Boolean(errors.villageId)}
          {...register("villageId")}
        >
          <option value="">-- {dictionary["register.village"]} --</option>
          {availableVillages.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name[locale]}
            </option>
          ))}
        </select>
        {errors.villageId ? (
          <span className={styles.fieldError}>
            {dictionary["common.required"]}
          </span>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="khasra">
          {dictionary["register.khasra"]} <span aria-hidden="true">*</span>
        </label>
        <input
          className={styles.input}
          id="khasra"
          inputMode="numeric"
          placeholder="123/45"
          aria-invalid={Boolean(errors.anchorKhasra)}
          {...register("anchorKhasra")}
        />
        {errors.anchorKhasra ? (
          <span className={styles.fieldError}>
            {dictionary["register.invalidKhasra"]}
          </span>
        ) : null}
      </div>

      <div className={`${styles.notice} ${styles.noticeSuccess}`}>
        <MapPin size={22} aria-hidden="true" />
        <span>{dictionary["register.khasraHint"]}</span>
      </div>
      <div className={styles.formActions}>
        <button className={styles.button} type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? dictionary["common.loading"]
            : dictionary["register.resolve"]}
        </button>
        <a
          className={`${styles.button} ${styles.buttonSecondary}`}
          href={routes.registerIdentity(locale)}
        >
          {dictionary["common.back"]}
        </a>
      </div>
      <div className={styles.notice}>
        <Info size={22} aria-hidden="true" />
        <span>{dictionary["register.identityLimit"]}</span>
      </div>
    </form>
  );
}
