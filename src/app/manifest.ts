import type { MetadataRoute } from "next";

import { appBasePath, withBasePath } from "@/config/base-path";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: appBasePath || "/",
    name: "Raj Kisan Suvidha - Rajasthan Farmer Super App",
    short_name: "Raj Kisan",
    description: "Bilingual Rajasthan farmer services progressive web app.",
    start_url: `${appBasePath || ""}/`,
    scope: `${appBasePath || ""}/`,
    display: "standalone",
    background_color: "#f7faf7",
    theme_color: "#16752d",
    orientation: "portrait-primary",
    lang: "hi",
    categories: ["government", "agriculture", "utilities"],
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
