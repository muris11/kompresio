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
        <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-ash">
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
