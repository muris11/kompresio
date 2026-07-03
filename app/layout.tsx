import type { Metadata } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants/site";
import { organizationSchema } from "@/lib/seo/metadata";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Kompresio - Compress, Convert, and Optimize Images Online",
    template: "%s | Kompresio",
  },
  description: siteConfig.description,
  applicationName: siteConfig.appName,
  keywords: [
    "image compressor",
    "compress image online",
    "WebP converter",
    "AVIF converter",
    "resize image online",
    "metadata cleaner",
    "batch image converter",
  ],
  authors: [
    { name: "Kompresio" },
    { name: siteConfig.developer.name, url: siteConfig.developer.url },
  ],
  creator: siteConfig.developer.name,
  publisher: "Kompresio",
  other: {
    "developed-by": siteConfig.developer.label,
    "google-site-verification": "3HizIgkv3ixXoTBD3JukOfZZkzQFtC-pGBARnYNpGmo",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Kompresio - Compress, Convert, and Optimize Images Online",
    description:
      "Fast and private browser-based image compression, WebP conversion, resizing, metadata cleaning, and batch export.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kompresio image optimization toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kompresio - Compress, Convert, and Optimize Images Online",
    description:
      "Compress and convert images directly in your browser with Kompresio.",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <JsonLd data={organizationSchema()} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
