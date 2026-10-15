export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      {eyebrow ? (
        <p className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-cerulean">
          <span className="h-px w-5 bg-cerulean/40" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 break-words font-display text-heading-sm leading-[1.15] text-graphite sm:text-heading">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 break-words text-[17px] leading-8 text-ash">
          {description}
        </p>
      ) : null}
    </div>
  );
}
