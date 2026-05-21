"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <div>
        <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-red-600">
          Error
        </p>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-950">
          Something went wrong
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Please refresh the page or try again.
        </p>
        <Button className="mt-8" onClick={reset}>
          Retry
        </Button>
      </div>
    </section>
  );
}
