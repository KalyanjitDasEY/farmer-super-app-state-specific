import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/types/locale";

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const preferredLocale =
    cookieStore.get("bihar-kisan-locale")?.value ??
    cookieStore.get("raj-kisan-locale")?.value;
  return preferredLocale && isLocale(preferredLocale)
    ? preferredLocale
    : defaultLocale;
}
