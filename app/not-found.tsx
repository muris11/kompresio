import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[60vh] w-full max-w-3xl place-items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <div>
        <p className="text-[12px] uppercase tracking-[0.16em] text-ash">404</p>
        <h1 className="mt-4 font-display text-heading-sm text-graphite sm:text-heading">
          Page not found
        </h1>
        <p className="mt-4 text-body-sm leading-7 text-ash">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/tools">Explore tools</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
