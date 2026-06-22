"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { HiSearch } from "react-icons/hi";
import {
  type CalculatorLink,
  FOOTER_CALCULATOR_CATEGORIES,
} from "@/data/calculatorCategoryLinks";
import type { TopCalculator } from "@/lib/strapiCalculators";

type CalculatorEntry = CalculatorLink & { category: string };

type TopCategoryGroup = {
  category: string;
  href: string;
  items: CalculatorEntry[];
};

/** Flat, de-duplicated index of every calculator across all categories (universal search). */
const ALL_CALCULATORS: CalculatorEntry[] = (() => {
  const seen = new Set<string>();
  const entries: CalculatorEntry[] = [];
  for (const category of FOOTER_CALCULATOR_CATEGORIES) {
    for (const link of category.links) {
      if (seen.has(link.href)) continue;
      seen.add(link.href);
      entries.push({ ...link, category: category.label });
    }
  }
  return entries.sort((a, b) => a.label.localeCompare(b.label));
})();

/** href -> short catalog label, used to keep top-list labels concise vs. long CMS titles. */
const LABEL_BY_HREF = new Map(ALL_CALCULATORS.map((c) => [c.href, c.label]));

/** Category id (route prefix) -> { label, href } for the CMS-driven top list. */
const CATEGORY_META = new Map(
  FOOTER_CALCULATOR_CATEGORIES.map((c) => [
    c.id,
    { label: c.label, href: c.exploreHref },
  ]),
);

/** All category landing pages — used to interlink the categories not currently in focus. */
const ALL_CATEGORY_LINKS = FOOTER_CALCULATOR_CATEGORIES.map((c) => ({
  label: c.label,
  href: c.exploreHref,
}));

/** Group the CMS top calculators under their category, in the site's category order. */
function groupTopCalculators(top: TopCalculator[]): TopCategoryGroup[] {
  const byCategory = new Map<string, TopCategoryGroup>();
  for (const c of top) {
    const meta = CATEGORY_META.get(c.category);
    if (!meta) continue;
    let group = byCategory.get(c.category);
    if (!group) {
      group = { category: meta.label, href: meta.href, items: [] };
      byCategory.set(c.category, group);
    }
    const href = `/${c.category}/${c.slug}`;
    group.items.push({
      href,
      label: LABEL_BY_HREF.get(href) ?? c.title,
      category: meta.label,
    });
  }
  return FOOTER_CALCULATOR_CATEGORIES.map((c) => byCategory.get(c.id)).filter(
    (g): g is TopCategoryGroup => g != null,
  );
}

const MAX_RESULTS = 50;

function searchCalculators(query: string): CalculatorEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ALL_CALCULATORS.filter(
    (c) =>
      c.label.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q),
  ).slice(0, MAX_RESULTS);
}

function TopCalcItems({ items }: { items: CalculatorEntry[] }) {
  return (
    <ul className="space-y-0.5">
      {items.map((c) => (
        <li key={c.href} className="flex min-w-0 items-center gap-1.5">
          <span className="shrink-0 text-[9px] text-primary" aria-hidden>
            •
          </span>
          <Link
            href={c.href}
            className="truncate text-[12.5px] text-secondary underline-offset-2 hover:underline"
          >
            {c.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SearchSidebar({
  topCalculators = [],
}: {
  topCalculators?: TopCalculator[];
}) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchCalculators(query), [query]);
  const trimmed = query.trim();

  const topByCategory = useMemo(
    () => groupTopCalculators(topCalculators),
    [topCalculators],
  );

  const pathname = usePathname();
  const activeHref = `/${(pathname ?? "").split("/")[1] ?? ""}`;
  const activeGroup = topByCategory.find((g) => g.href === activeHref);
  const otherCategories = ALL_CATEGORY_LINKS.filter(
    (c) => c.href !== activeHref,
  );

  const hasTop = topByCategory.length > 0;

  return (
    <aside
      aria-label="Search calculators"
      className="flex w-full shrink-0 flex-col gap-4 md:sticky md:top-[88px] md:w-[min(30%,320px)] md:self-start lg:max-w-[320px]"
    >
      <div className="rounded-lg border border-neutral-3 bg-white p-4 sm:p-5">
        <h2 className="mb-3 text-sm font-semibold text-primary">
          Find a calculator
        </h2>

        <div className="relative">
          <label htmlFor="sidebar-calc-search" className="sr-only">
            Search calculators
          </label>
          <HiSearch
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]"
            aria-hidden
          />
          <input
            id="sidebar-calc-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search calculators…"
            autoComplete="off"
            className="h-11 w-full rounded-md border border-[#E0E0E0] bg-white py-2 pl-9 pr-3 text-[14px] text-[#334155] outline-none transition-shadow placeholder:text-[#94a3b8] focus:border-[#2374ac] focus:ring-2 focus:ring-[#2374ac]/25 sm:h-10"
          />
        </div>

        {trimmed ? (
          results.length === 0 ? (
            <p className="mt-3 text-[13px] text-[#64748b]">
              No calculators match &ldquo;{trimmed}&rdquo;. Try another term.
            </p>
          ) : (
            <ul className="mt-3 max-h-[60vh] divide-y divide-[#F1F5F9] overflow-y-auto md:max-h-[420px]">
              {results.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="block rounded-md px-2 py-2 transition-colors hover:bg-[#F1F5F9] focus:bg-[#F1F5F9] focus:outline-none"
                  >
                    <span className="block text-[13px] font-medium text-[#334155]">
                      {c.label}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-[#94a3b8]">
                      {process.env.NEXT_PUBLIC_SITE_URL + c.href}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )
        ) : null}
      </div>

      {hasTop ? (
      <section
        aria-label="Top online calculators"
        className="rounded-lg border border-neutral-3 bg-white p-4"
      >
        <h2 className="text-[13px] font-semibold text-primary">
          {activeGroup
            ? `Top ${activeGroup.category} Calculators`
            : "Top Online Calculators"}
        </h2>

        {activeGroup ? (
          <>
            <div className="mt-2.5">
              <TopCalcItems items={activeGroup.items} />
            </div>
            {otherCategories.length > 0 ? (
              <div className="mt-3 border-t border-[#F1F5F9] pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#94a3b8]">
                  Explore other categories
                </p>
                <div className="mt-1.5 flex flex-wrap gap-x-2.5 gap-y-1">
                  {otherCategories.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="text-[12px] text-secondary underline-offset-2 hover:underline"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div className="mt-2.5 space-y-3">
            {topByCategory.map((group) => (
              <div key={group.category}>
                <Link
                  href={group.href}
                  className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#94a3b8] transition-colors hover:text-primary"
                >
                  {group.category}
                </Link>
                <div className="mt-1">
                  <TopCalcItems items={group.items} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      ) : null}
    </aside>
  );
}
