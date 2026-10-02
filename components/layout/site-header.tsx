"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { primaryNav } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

function Mark() {
  return (
    <Link
      href="/"
      aria-label="Kompresio home"
      className="flex items-center pr-2"
    >
      <Image 
        src="/logo.png" 
        alt="Kompresio" 
        width={240} 
        height={54} 
        className="h-11 w-auto"
        priority
      />
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-3 left-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-md md:max-w-fit md:top-6 -translate-x-1/2">
      <div className="flex w-full items-center justify-between gap-4 md:gap-6 rounded-full border border-mist/80 bg-white/80 p-2 pl-4 pr-2 shadow-subtle backdrop-blur-md">
        <Mark />

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
            {primaryNav.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 font-af text-[15px] font-medium transition-[opacity,color,background-color] duration-150 ease-out hover:text-ink-black",
                    isActive
                      ? "bg-mist/30 text-ink-black"
                      : "text-charcoal hover:bg-mist/20 hover:opacity-70"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

        <div className="hidden md:block">
          <Button asChild size="sm" variant="default" className="rounded-full pl-4 pr-1">
            <Link href="/compress-image">
              Start optimizing
              <span className="ml-1 flex size-6 items-center justify-center rounded-full border border-signal-blue">
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
            <Button
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

      <div
        className={cn(
          "fixed top-[68px] left-1/2 z-40 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-md -translate-x-1/2 grid overflow-hidden transition-[grid-template-rows] duration-200 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-1 rounded-2xl border border-mist bg-paper/95 p-3 shadow-subtle backdrop-blur-xl"
          >
            {primaryNav.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-3 font-af text-[15px] font-medium transition-colors",
                    isActive
                      ? "bg-linen text-ink-black"
                      : "text-charcoal hover:bg-linen hover:text-ink-black"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button asChild variant="default" className="mt-1 justify-between pr-2" onClick={() => setOpen(false)}>
              <Link href="/compress-image">
                Start optimizing
                <span className="flex size-6 items-center justify-center rounded-full border border-signal-blue">
                  <ArrowRight className="size-3.5" />
                </span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
