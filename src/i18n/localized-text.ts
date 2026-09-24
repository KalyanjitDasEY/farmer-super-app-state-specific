import type { Locale } from "@/types/locale";

export type LocalizedText = Readonly<{
  en: string;
  hi: string;
}>;

export type Translator = {
  (value: LocalizedText | string): string;
  (english: string, hindi: string): string;
};

export function localized(en: string, hi: string): LocalizedText {
  return { en, hi };
}

export function localize(
  locale: Locale,
  value: LocalizedText | string,
): string {
  return typeof value === "string" ? value : value[locale];
}

export function createTranslator(locale: Locale): Translator {
  return (value: LocalizedText | string, hindi?: string) => {
    if (hindi !== undefined && typeof value === "string") {
      return locale === "hi" ? hindi : value;
    }

    return localize(locale, value);
  };
}
