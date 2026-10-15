"use client";

import { useDictionary } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const dictionary = useDictionary();

  return (
    <section className="mx-auto grid min-h-[60vh] w-full max-w-3xl place-items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <div>
        <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-destructive">
          Error
        </p>
        <h1 className="mt-4 font-display text-heading-sm text-graphite sm:text-heading">
          {dictionary.error.title}
        </h1>
        <p className="mt-4 text-body-sm leading-7 text-ash">
          {dictionary.error.description}
        </p>
        <Button className="mt-8" onClick={reset}>
          {dictionary.error.retry}
        </Button>
      </div>
    </section>
  );
}
