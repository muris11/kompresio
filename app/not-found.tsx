import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <div>
        <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
          404
        </p>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-950">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
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
