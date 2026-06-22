import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import type { HomeCategorySectionData } from "../types";

type Props = HomeCategorySectionData & {
  /** Kept for API compatibility with the home explore section; no longer used. */
  imagePriority?: boolean;
};

export function HomeCategorySection({
  title,
  links,
  exploreHref,
  exploreLabel = "Explore all",
  disabled = false,
}: Props) {
  const linkClass = disabled
    ? "cursor-not-allowed text-[14px] text-neutral-1/45 no-underline"
    : "text-[14px] text-secondary underline-offset-2 hover:underline";
  const bulletClass = disabled ? "text-neutral-1/35" : "text-primary";

  return (
    <section
      className={`flex h-full flex-col gap-3 rounded-lg border border-[#E8ECF0] bg-white p-4 transition-colors hover:border-primary/40 sm:p-5 ${
        disabled ? "opacity-[0.92]" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-primary/15 pb-2.5">
        <h2 className="text-lg font-bold tracking-tight text-neutral-1">
          {title}
        </h2>
        {disabled ? (
          <span
            aria-disabled
            className="inline-flex shrink-0 cursor-not-allowed select-none items-center gap-1 text-[13px] font-medium text-neutral-1/40"
          >
            {exploreLabel}
          </span>
        ) : (
          <Link
            href={exploreHref}
            className="group inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-primary transition-opacity hover:opacity-80"
          >
            {exploreLabel}
            <HiArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        )}
      </div>

      <ul className="grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
        {links.map(({ label, href }) => (
          <li key={href} className="flex min-w-0 items-start gap-2">
            <span className={`mt-1 shrink-0 text-[10px] ${bulletClass}`} aria-hidden>
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
    </section>
  );
}
