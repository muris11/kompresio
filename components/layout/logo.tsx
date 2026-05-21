import Link from "next/link";
import { Layers } from "lucide-react";

import { siteConfig } from "@/lib/constants/site";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Kompresio home">
      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_12px_26px_rgba(37,99,235,0.24)]">
        <Layers className="size-5" aria-hidden="true" />
      </span>
      <span className="text-lg font-extrabold tracking-normal text-slate-950">
        {siteConfig.name}
      </span>
    </Link>
  );
}
