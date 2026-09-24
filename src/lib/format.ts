import type { Locale } from "@/types/locale";

const localeTag = (locale: Locale) => (locale === "hi" ? "hi-IN" : "en-IN");

export function formatCurrency(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTag(locale), {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTag(locale)).format(value);
}

export function formatDateTime(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTag(locale), {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: locale === "hi" ? false : undefined,
  }).format(new Date(value));
}
