"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { useDictionary, useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { localeFromPathname } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const rawPathname = usePathname() || "/";
  const { locale, href } = useLocale();
  const dictionary = useDictionary();

  const { pathname } = localeFromPathname(rawPathname);

  const nav = [
    { label: dictionary.nav.tools, path: "/tools" },
    { label: dictionary.nav.compress, path: "/compress-image" },
    { label: dictionary.nav.convert, path: "/convert-to-webp" },
    { label: dictionary.nav.resize, path: "/resize-image" },
    { label: dictionary.nav.blog, path: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-mist/70 bg-parchment">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandMark locale={locale} />

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-0.5 md:flex"
        >
          {nav.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={href(item.path)}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors duration-150",
                  isActive
                    ? "bg-mist/60 text-graphite"
                    : "text-ash hover:bg-mist/40 hover:text-graphite",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <Button
            asChild
            size="sm"
            variant="dark"
            className="hidden md:inline-flex"
          >
            <Link href={href("/compress-image")}>
              {dictionary.common.startOptimizing}
            </Link>
          </Button>
          <button
            type="button"
            aria-label={open ? dictionary.header.closeMenu : dictionary.header.menu}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-full border border-mist text-graphite transition-colors hover:bg-mist/40 md:hidden"
          >
            <span className="relative block h-[14px] w-[18px]">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-[18px] rounded-full bg-current transition-transform duration-200",
                  open && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[6px] h-0.5 w-[18px] rounded-full bg-current transition-opacity duration-150",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[12px] h-0.5 w-[18px] rounded-full bg-current transition-transform duration-200",
                  open && "-translate-y-[6px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-mist/70 transition-[grid-template-rows] duration-[250ms] md:hidden",
          open ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex w-full max-w-[1200px] flex-col gap-1 px-4 py-3 sm:px-6"
          >
            {nav.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path !== "/" && pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  href={href(item.path)}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-3 text-[15px] font-medium transition-colors",
                    isActive
                      ? "bg-mist/60 text-graphite"
                      : "text-ash hover:bg-mist/40 hover:text-graphite",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button asChild variant="dark" className="mt-1 rounded-xl">
              <Link
                href={href("/compress-image")}
                onClick={() => setOpen(false)}
              >
                {dictionary.common.startOptimizing}
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
