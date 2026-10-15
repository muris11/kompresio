"use client";

import { createContext, useContext, type ReactNode } from "react";

import { dictionaries, type Dictionary } from "@/lib/i18n/dictionaries";
import {
  defaultLocale,
  localePath,
  type Locale,
} from "@/lib/i18n/config";

type LocaleContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  /** Prefixes an internal path with the active locale when needed. */
  href: (path: string) => string;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  dictionary: dictionaries[defaultLocale],
  href: (path) => localePath(defaultLocale, path),
});

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value: LocaleContextValue = {
    locale,
    dictionary: dictionaries[locale],
    href: (path) => localePath(locale, path),
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useDictionary() {
  return useContext(LocaleContext).dictionary;
}
