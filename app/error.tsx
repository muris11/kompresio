"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto grid min-h-[60vh] w-full max-w-3xl place-items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <div>
        <p className="text-[12px] uppercase tracking-[0.16em] text-destructive">
          Error
        </p>
        <h1 className="mt-4 font-display text-heading-sm text-graphite sm:text-heading">
          Something went wrong
        </h1>
        <p className="mt-4 text-body-sm leading-7 text-ash">
          Please refresh the page or try again.
        </p>
        <Button className="mt-8" onClick={reset}>
          Retry
        </Button>
      </div>
    </section>
  );
}
