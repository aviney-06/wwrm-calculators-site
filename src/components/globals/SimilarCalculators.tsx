"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { HiArrowRight } from "react-icons/hi";
import { FOOTER_CALCULATOR_CATEGORIES } from "@/data/calculatorCategoryLinks";

const MAX_SIMILAR = 20;

/**
 * Bottom-of-page interlinking shown only on a specific calculator page.
 * Lists up to {@link MAX_SIMILAR} other calculators from the same category
 * plus an "Explore all" link to that category's landing page.
 */
export function SimilarCalculators() {
  const pathname = usePathname();
  const segments = (pathname ?? "").split("/").filter(Boolean);

  // Only render on a calculator detail page: `/{category}/{calculator}`.
  if (segments.length !== 2) return null;

  const categoryHref = `/${segments[0]}`;
  const category = FOOTER_CALCULATOR_CATEGORIES.find(
    (c) => c.exploreHref === categoryHref,
  );
  if (!category) return null;

  const similar = category.links
    .filter((l) => l.href !== pathname)
    .slice(0, MAX_SIMILAR);
  if (similar.length === 0) return null;

  return (
    <section
      aria-label={`Other ${category.label} calculators`}
      className="border-t border-[#E8ECF0] bg-white"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 md:px-[100px] md:py-10">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-[15px] font-semibold tracking-tight text-neutral-1 md:text-base">
            Other {category.label} Calculators
          </h2>
          <Link
            href={category.exploreHref}
            className="group inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-primary transition-opacity hover:opacity-80"
          >
            Explore all
            <HiArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] leading-relaxed">
          {similar.map((c, i) => (
            <Fragment key={c.href}>
              <Link
                href={c.href}
                className="text-secondary underline-offset-2 transition-colors hover:text-primary hover:underline"
              >
                {c.label}
              </Link>
              {i < similar.length - 1 ? (
                <span className="text-[#d1d5db]" aria-hidden>
                  |
                </span>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
