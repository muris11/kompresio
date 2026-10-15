import Image from "next/image";
import Link from "next/link";

import { localePath, type Locale } from "@/lib/i18n/config";

/*
  Brand mark: the Kompresio logo asset plus a text-free link. The image is
  trimmed to its content box so it aligns cleanly inside the header.
*/
export function BrandMark({ locale }: { locale: Locale }) {
  return (
    <Link
      href={localePath(locale, "/")}
      aria-label="Kompresio home"
      className="flex shrink-0 items-center"
    >
      <Image
        src="/logo.png"
        alt="Kompresio"
        width={188}
        height={42}
        priority
        className="h-7 w-auto sm:h-8"
      />
    </Link>
  );
}
