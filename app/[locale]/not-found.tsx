"use client";

import Link from "next/link";

import { useDictionary, useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const dictionary = useDictionary();
  const { href } = useLocale();

  return (
    <section className="mx-auto grid min-h-[60vh] w-full max-w-3xl place-items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <div>
        <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-cerulean">
          404
        </p>
        <h1 className="mt-4 font-display text-heading-sm text-graphite sm:text-heading">
          {dictionary.notFound.title}
        </h1>
        <p className="mt-4 text-body-sm leading-7 text-ash">
          {dictionary.notFound.description}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href={href("/tools")}>{dictionary.common.browseTools}</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href={href("/")}>{dictionary.common.home}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
