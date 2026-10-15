"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";

import { useDictionary, useLocale } from "@/components/providers/locale-provider";
import { writeLocaleCookie } from "@/lib/i18n/cookie";
import {
  localeFromPathname,
  localePath,
  localeLabels,
  localeShort,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const rawPathname = usePathname() || "/";
  const { locale } = useLocale();
  const dictionary = useDictionary();

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function switchTo(next: Locale) {
    const { pathname } = localeFromPathname(rawPathname);
    writeLocaleCookie(next);
    setOpen(false);
    router.push(localePath(next, pathname));
    router.refresh();
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={dictionary.common.language}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-mist px-3 py-2 text-[13px] font-medium text-ash transition-colors hover:bg-mist/40 hover:text-graphite"
      >
        <Globe className="size-3.5" aria-hidden="true" />
        {localeShort[locale]}
      </button>

      <ul
        role="listbox"
        className={cn(
          "absolute right-0 top-[calc(100%+8px)] z-50 min-w-[168px] origin-top-right overflow-hidden rounded-xl border border-mist bg-paper p-1 shadow-subtle transition-[opacity,transform] duration-150 ease-out",
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0",
        )}
      >
        {locales.map((option) => (
          <li key={option}>
            <button
              type="button"
              role="option"
              aria-selected={option === locale}
              onClick={() => switchTo(option)}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[14px] transition-colors",
                option === locale
                  ? "bg-mist/50 text-graphite"
                  : "text-ash hover:bg-mist/40 hover:text-graphite",
              )}
            >
              {localeLabels[option]}
              {option === locale ? <Check className="size-3.5" /> : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
