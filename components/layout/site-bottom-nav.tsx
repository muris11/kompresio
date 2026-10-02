"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Gauge, Home, LayoutGrid, RefreshCw } from "lucide-react";

import { cn } from "@/lib/utils";

type NavTab = {
  label: string;
  href: string;
  icon: typeof Home;
  isCenter?: boolean;
};

const tabs: NavTab[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Tools", href: "/tools", icon: LayoutGrid },
  { label: "Compress", href: "/compress-image", icon: Gauge, isCenter: true },
  { label: "Convert", href: "/convert-to-webp", icon: RefreshCw },
  { label: "Blog", href: "/blog", icon: BookOpen },
];

export function SiteBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed bottom-3 left-1/2 z-40 flex w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 items-center justify-between gap-1 rounded-2xl border border-mist/90 bg-white/90 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl md:hidden"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          pathname === tab.href ||
          (tab.href !== "/" && pathname?.startsWith(tab.href));

        if (tab.isCenter) {
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label={tab.label}
              className={cn(
                "relative flex h-12 flex-1 flex-col items-center justify-center rounded-xl border text-[10.5px] font-medium transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.96]",
                isActive
                  ? "border-signal-blue bg-signal-blue font-semibold text-white shadow-sm"
                  : "border-signal-blue/25 bg-signal-blue/10 text-signal-blue hover:bg-signal-blue/15",
              )}
            >
              <Icon className="size-4.5" strokeWidth={2} />
              <span className="mt-0.5 tracking-tight">{tab.label}</span>
            </Link>
          );
        }

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-label={tab.label}
            className={cn(
              "flex h-12 flex-1 flex-col items-center justify-center rounded-xl text-[10.5px] font-medium transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.96]",
              isActive
                ? "bg-black/[0.05] font-semibold text-ink-black"
                : "text-ash hover:bg-black/[0.02] hover:text-charcoal",
            )}
          >
            <Icon className="size-4.5" strokeWidth={1.75} />
            <span className="mt-0.5 tracking-tight">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
