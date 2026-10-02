"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
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
        width={140} 
        height={28} 
        className="h-[26px] w-auto"
        priority
      />
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-6 left-1/2 z-50 w-full max-w-fit -translate-x-1/2 px-4">
      <div className="mx-auto flex items-center justify-between gap-6 rounded-full border border-twilight bg-white/[0.06] p-2 pl-4 pr-2 shadow-sm backdrop-blur-md">
        <Mark />

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-4 md:flex"
        >
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-af text-[15px] font-medium text-charcoal transition-[opacity,color] duration-150 ease-out hover:text-ink-black hover:opacity-70"
              >
                {item.label}
              </Link>
            ))}
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
          "fixed top-[88px] left-1/2 z-40 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 grid overflow-hidden transition-[grid-template-rows] duration-200 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-1 rounded-2xl border border-mist bg-paper/95 p-3 shadow-subtle backdrop-blur-xl"
          >
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 font-af text-[15px] font-medium text-charcoal hover:bg-linen"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
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
