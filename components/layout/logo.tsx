import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center"
      aria-label="Kompresio home"
    >
      <Image
        src="/logo.png"
        alt="Kompresio"
        width={360}
        height={90}
        priority
        className="h-20 w-auto md:h-24"
      />
    </Link>
  );
}
