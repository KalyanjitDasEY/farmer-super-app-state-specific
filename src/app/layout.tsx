import type { Metadata, Viewport } from "next";
import { Noto_Sans, Noto_Sans_Devanagari } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";

import { PwaClient } from "@/components/pwa/PwaClient";
import { withBasePath } from "@/config/base-path";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { getRequestLocale } from "@/i18n/server";

import "./globals.css";

const latin = Noto_Sans({
  variable: "--font-latin",
  subsets: ["latin"],
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_ORIGIN ?? "http://localhost:3001"),
  title: {
    default: "Bihar Kisan Suvidha",
    template: "%s | Bihar Kisan Suvidha",
  },
  description:
    "Bilingual progressive web application demonstrating Bihar farmer services.",
  applicationName: "Bihar Kisan Suvidha",
  manifest: withBasePath("/manifest.webmanifest"),
  icons: {
    icon: [
      {
        url: withBasePath("/icons/icon-192.png"),
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: withBasePath("/icons/icon-512.png"),
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: withBasePath("/icons/icon-192.png"),
  },
};

export const viewport: Viewport = {
  themeColor: "#16752d",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getRequestLocale();
  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${latin.variable} ${devanagari.variable}`}
      suppressHydrationWarning
    >
      <body
        style={
          {
            "--font-sans":
              "var(--font-latin), var(--font-devanagari), Arial, sans-serif",
          } as CSSProperties
        }
      >
        <LocaleProvider locale={locale}>
          {children}
          <PwaClient dictionary={getDictionary(locale)} />
        </LocaleProvider>
      </body>
    </html>
  );
}
