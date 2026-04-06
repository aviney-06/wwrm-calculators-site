"use client";

import { useMemo, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { HomeCategorySection } from "@/components/Home/component/CategorySection";
import { homeCategorySections } from "@/components/Home/data";
import type { HomeCategorySectionData } from "@/components/Home/types";
import { CALCULATOR_LINKS_BY_EXPLORE_HREF } from "@/data/calculatorCategoryLinks";

/** Same link lists as each category index page — used for search only (home still shows preview lists when not searching). */
const SECTIONS_WITH_CATALOG_LINKS: HomeCategorySectionData[] =
  homeCategorySections.map((section) => ({
    ...section,
    links:
      CALCULATOR_LINKS_BY_EXPLORE_HREF[section.exploreHref] ?? section.links,
  }));

function filterByQuery(
  query: string,
  sections: HomeCategorySectionData[],
): HomeCategorySectionData[] {
  const q = query.trim().toLowerCase();
  if (!q) return sections;

  return sections
    .map((section) => {
      const titleMatch = section.title.toLowerCase().includes(q);
      const matchingLinks = section.links.filter((l) =>
        l.label.toLowerCase().includes(q),
      );
      if (titleMatch) return section;
      if (matchingLinks.length === 0) return null;
      return { ...section, links: matchingLinks };
    })
    .filter((s): s is HomeCategorySectionData => s != null);
}

export function HomeExploreSection() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query.trim()) return homeCategorySections;
    return filterByQuery(query, SECTIONS_WITH_CATALOG_LINKS);
  }, [query]);

  return (
    <>
      <div className="mx-auto mt-6 max-w-5xl md:mt-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
              Explore by category
            </p>
            <p className="mt-1 text-[13px] leading-snug text-[#64748b]">
              Pick a category or search by name.
            </p>
          </div>
          <div className="relative w-full shrink-0 sm:max-w-[min(100%,280px)] md:max-w-xs">
            <label htmlFor="home-calc-search" className="sr-only">
              Search calculators
            </label>
            <HiSearch
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]"
              aria-hidden
            />
            <input
              id="home-calc-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search calculators…"
              autoComplete="off"
              className="h-11 w-full rounded-md border border-[#E0E0E0] bg-white py-2 pl-9 pr-3 text-[14px] text-[#334155] outline-none transition-shadow placeholder:text-[#94a3b8] focus:border-[#2374ac] focus:ring-2 focus:ring-[#2374ac]/25 sm:h-10"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-12 md:mt-7">
        {filtered.length === 0 ? (
          <p className="text-center text-[14px] text-[#64748b]">
            No calculators match &ldquo;{query.trim()}&rdquo;. Try another
            term.
          </p>
        ) : (
          filtered.map((section, index) => (
            <HomeCategorySection
              key={section.title}
              {...section}
              imagePriority={index === 0}
            />
          ))
        )}
      </div>
    </>
  );
}
