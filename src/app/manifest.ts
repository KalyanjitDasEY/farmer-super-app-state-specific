import type { MetadataRoute } from "next";

import { appBasePath, withBasePath } from "@/config/base-path";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: appBasePath || "/",
    name: "Bihar Kisan Suvidha - Bihar Farmer Demo",
    short_name: "Bihar Kisan",
    description: "Bilingual Bihar farmer services demo progressive web app.",
    start_url: `${appBasePath || ""}/`,
    scope: `${appBasePath || ""}/`,
    display: "standalone",
    background_color: "#f7faf7",
    theme_color: "#16752d",
    orientation: "portrait-primary",
    lang: "hi",
    categories: ["agriculture", "utilities"],
    icons: [
      {
        src: withBasePath("/icons/icon-192.png"),
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: withBasePath("/icons/icon-512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: withBasePath("/icons/maskable-512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
