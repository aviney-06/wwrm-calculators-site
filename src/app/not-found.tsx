import Link from "next/link";
import type { Metadata } from "next";
import {
  FINANCE_CALCULATOR_LINKS,
  HEALTH_FITNESS_CALCULATOR_LINKS,
  MATHS_CALCULATOR_LINKS,
  OTHER_CALCULATOR_LINKS,
  type CalculatorLink,
} from "@/data/calculatorCategoryLinks";
import { SITE_NAME } from "@/lib/metadata";

export const metadata: Metadata = {
  title: `Page not found | ${SITE_NAME}`,
  description:
    "This page isn’t available. Explore calculators by category or return home.",
};

type CategoryBlock = {
  label: string;
  indexHref: string;
  links: CalculatorLink[];
};

const CATEGORY_BLOCKS: CategoryBlock[] = [
  {
    label: "Health & fitness",
    indexHref: "/health-fitness",
    links: HEALTH_FITNESS_CALCULATOR_LINKS,
  },
  {
    label: "Finance",
    indexHref: "/finance",
    links: FINANCE_CALCULATOR_LINKS,
  },
  {
    label: "Maths",
    indexHref: "/maths",
    links: MATHS_CALCULATOR_LINKS,
  },
  {
    label: "Other",
    indexHref: "/other",
    links: OTHER_CALCULATOR_LINKS,
  },
];

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-5xl px-0 pb-12 pt-2">
      <header className="mb-10 text-center md:mb-12">
        <p className="font-mono text-[13px] font-medium tabular-nums text-[#94a3b8]">
          404
        </p>
        <h1 className="mt-2 text-[1.35rem] font-bold tracking-tight text-[#1e293b] sm:text-[1.5rem]">
          This page isn’t available
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[0.9rem] leading-relaxed text-[#64748b]">
          The calculator or URL you opened doesn’t exist here. Explore others
          below or head home.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-[14px] font-medium text-[#2374ac] underline-offset-4 hover:underline"
        >
          Back to home
        </Link>
      </header>

      <div className="border-t border-[#E8ECF0] pt-10">
        <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
          Explore calculators
        </p>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {CATEGORY_BLOCKS.map(({ label, indexHref, links }) => (
            <section key={indexHref} className="min-w-0">
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">
                {label}
              </h2>
              <Link
                href={indexHref}
                className="mb-3 inline-block text-[12px] font-medium text-[#2374ac] underline-offset-2 hover:underline"
              >
                Explore category →
              </Link>
              <ul className="space-y-1.5 border-l border-[#E8ECF0] pl-3">
                {links.map(({ href, label: linkLabel }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[13px] leading-snug text-[#334155] underline-offset-2 hover:text-[#2374ac] hover:underline"
                    >
                      {linkLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
