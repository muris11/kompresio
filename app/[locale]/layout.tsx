import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants/site";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  coerceLocale,
  localeHtmlLang,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { organizationSchema } from "@/lib/seo/metadata";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Kompresio - Compress, Convert, and Optimize Images Online",
    template: `%s`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.appName,
  category: "technology",
  classification: "Image Optimization & Web Performance Tools",
  keywords: [
    "Kompresio",
    "Kompresio app",
    "Kompresio online",
    "Kompresio image compressor",
    "Kompresio webp converter",
    "Kompresio image tools",
    "kompresio.center.biz.id",
    "kompres foto kompresio",
    "kompres gambar online",
    "kompres foto online gratis",
    "kompres foto tanpa pecah",
    "kecilkan ukuran foto",
    "ubah format webp",
    "image compressor",
    "compress image online",
    "free image optimizer",
    "WebP converter",
    "AVIF converter",
    "resize image online",
    "remove photo metadata",
    "clean EXIF online",
    "batch image converter",
    "image to pdf converter",
    "remove background online",
    "private image compression",
    "browser based image tools",
  ],
  authors: [
    { name: "Kompresio" },
    { name: siteConfig.developer.name, url: siteConfig.developer.url },
  ],
  creator: siteConfig.developer.name,
  publisher: "Kompresio",
  verification: {
    google: [
      "3HizIgkv3ixXoTBD3JukOfZZkzQFtC-pGBARnYNpGmo",
      "bf61d5da6cf3d8be",
    ],
    other: {
      "msvalidate.01": "BF12D55B2E8AE29E87DE1A2C39B9A6D2",
      "indexnow-key": "c037920ab6a84d4fa7129f7cf7c65306",
    },
  },
  other: {
    "developed-by": siteConfig.developer.label,
  },
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "64x64" }],
    apple: [{ url: "/icon.png", type: "image/png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;
  const locale: Locale = coerceLocale(rawLocale);
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={localeHtmlLang[locale]}
      className={`${inter.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-parchment text-charcoal">
        <JsonLd data={organizationSchema(locale)} />
        <LocaleProvider locale={locale}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter dictionary={dictionary} locale={locale} />
        </LocaleProvider>
      </body>
    </html>
  );
}
