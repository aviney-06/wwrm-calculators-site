import Image from "next/image";
import Link from "next/link";
import type { HomeCategorySectionData } from "../types";

type Props = HomeCategorySectionData & {
  /** First section image should load with priority for LCP */
  imagePriority?: boolean;
};

export function HomeCategorySection({
  title,
  imageSrc,
  imageAlt,
  links,
  exploreHref,
  exploreLabel = "Explore All",
  imagePriority = false,
  disabled = false,
}: Props) {
  const linkClass = disabled
    ? "cursor-not-allowed text-[15px] text-neutral-1/45 no-underline"
    : "text-[15px] text-secondary underline-offset-2 hover:underline";
  const bulletClass = disabled ? "text-neutral-1/35" : "text-secondary";

  return (
    <section
      className={`flex flex-col gap-5 ${disabled ? "opacity-[0.92]" : ""}`}
      aria-disabled={disabled || undefined}
    >
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg bg-neutral-3">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, min(900px, 70vw)"
          priority={imagePriority}
        />
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-neutral-1 md:text-[28px]">
        {title}
      </h2>

      <ul className="grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
        {links.map(({ label, href }) => (
          <li key={href} className="flex min-w-0 items-start gap-2">
            <span className={`mt-0.5 shrink-0 ${bulletClass}`} aria-hidden>
              •
            </span>
            {disabled ? (
              <span className={linkClass}>{label}</span>
            ) : (
              <Link href={href} className={linkClass}>
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {disabled ? (
        <span
          aria-disabled
          className="flex w-full cursor-not-allowed select-none items-center justify-center rounded-md bg-neutral-3 px-4 py-3 text-center text-sm font-medium text-neutral-1/45"
        >
          {exploreLabel}
        </span>
      ) : (
        <Link
          href={exploreHref}
          className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-center text-sm font-medium text-neutral-2 transition-opacity hover:opacity-95"
        >
          {exploreLabel}
        </Link>
      )}
    </section>
  );
}
