import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kompresio - Online Image Optimizer & Converter",
    short_name: "Kompresio",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbfcfa",
    theme_color: "#0079bd",
    lang: "en",
    categories: ["utilities", "productivity", "photo"],
    icons: [
      {
        src: "/icon.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
