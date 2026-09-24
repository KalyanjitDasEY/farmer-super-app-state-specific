"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import { createTranslator, type Translator } from "@/i18n/localized-text";
import type { Locale } from "@/types/locale";

type LocaleContextValue = {
  locale: Locale;
  t: Translator;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const value = useMemo(
    () => ({ locale, t: createTranslator(locale) }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider.");
  }
  return context;
}
