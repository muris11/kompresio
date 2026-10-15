export const locales = ["en", "id"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
};

export const localeShort: Record<Locale, string> = {
  en: "EN",
  id: "ID",
};

export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  id: "id",
};

export const localeOgLocale: Record<Locale, string> = {
  en: "en_US",
  id: "id_ID",
};

export const LOCALE_COOKIE = "kompresio_locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "id";
}

export function coerceLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/**
 * Builds a locale-aware path. The default locale (en) stays prefix-free so
 * existing URLs and search rankings are preserved; other locales are prefixed.
 */
export function localePath(locale: Locale, path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const clean = normalized === "/" ? "" : normalized;

  if (locale === defaultLocale) {
    return clean || "/";
  }

  return `/${locale}${clean}`;
}

/** Extracts the locale from a pathname that may start with a locale prefix. */
export function localeFromPathname(pathname: string): {
  locale: Locale;
  pathname: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (isLocale(first)) {
    return {
      locale: first,
      pathname: `/${segments.slice(1).join("/")}`.replace(/\/$/, "") || "/",
    };
  }

  return { locale: defaultLocale, pathname };
}
