"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { HiArrowDown, HiArrowUp, HiSearch, HiX } from "react-icons/hi";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/globals/Breadcrumbs";

type LinkItem = { href: string; label: string };

type SortKey = "a-z" | "z-a";

type Props = {
  breadcrumbItems: BreadcrumbItem[];
  title: string;
  description: string;
  links: LinkItem[];
};

const sortOptions: {
  value: SortKey;
  label: string;
  Icon: typeof HiArrowUp;
}[] = [
  { value: "a-z", label: "A–Z", Icon: HiArrowUp },
  { value: "z-a", label: "Z–A", Icon: HiArrowDown },
];

const searchInputClass =
  "h-11 w-full rounded-md border border-[#E0E0E0] bg-white py-2 pl-9 pr-9 text-[14px] text-[#334155] outline-none transition-shadow placeholder:text-[#94a3b8] focus:border-[#2374ac] focus:ring-2 focus:ring-[#2374ac]/25 sm:h-10";

function filterAndSortLinks(
  links: LinkItem[],
  query: string,
  sort: SortKey,
): LinkItem[] {
  const q = query.trim().toLowerCase();
  let items = q
    ? links.filter((l) => l.label.toLowerCase().includes(q))
    : [...links];

  items = [...items].sort((a, b) => {
    const cmp = a.label.localeCompare(b.label, undefined, { sensitivity: "base" });
    return sort === "z-a" ? -cmp : cmp;
  });

  return items;
}

function SortSegmentedControl({
  sort,
  onSortChange,
}: {
  sort: SortKey;
  onSortChange: (next: SortKey) => void;
}) {
  return (
    <div
      className="flex shrink-0 items-center gap-2"
      role="radiogroup"
      aria-label="Sort calculators"
    >
      <span className="hidden text-[12px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8] sm:inline sm:text-[13px]">
        Sort
      </span>
      <div className="inline-flex max-w-[min(100vw-2rem,16rem)] overflow-x-auto rounded-lg border border-[#E0E0E0] bg-[#f1f5f9] p-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:max-w-none [&::-webkit-scrollbar]:hidden">
        {sortOptions.map(({ value, label, Icon }) => {
          const active = sort === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onSortChange(value)}
              className={[
                "inline-flex shrink-0 items-center justify-center gap-1 rounded-md px-2.5 py-2 text-[12px] font-medium transition-all sm:gap-1.5 sm:px-3 sm:text-[13px]",
                active
                  ? "bg-white text-[#2374ac] shadow-sm ring-1 ring-[#E0E0E0]"
                  : "text-[#64748b] hover:text-[#334155]",
              ].join(" ")}
            >
              <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
              <span className="whitespace-nowrap">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Directory layout for category landing pages with search and sort.
 */
export function CategoryCalculatorIndex({
  breadcrumbItems,
  title,
  description,
  links,
}: Props) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("a-z");

  const visibleLinks = useMemo(
    () => filterAndSortLinks(links, query, sort),
    [links, query, sort],
  );

  const trimmedQuery = query.trim();
  const total = links.length;
  const showing = visibleLinks.length;
  const activeSortLabel =
    sortOptions.find((o) => o.value === sort)?.label ?? "A–Z";

  return (
    <div className="w-full min-w-0">
      <Breadcrumbs className="mb-5" items={breadcrumbItems} />
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-black md:text-[28px]">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-black md:text-base">
          {description}
        </p>
      </header>

      <div
        className="mb-5 flex flex-row items-center gap-2 sm:gap-3 sm:rounded-lg sm:border sm:border-[#E8ECF0] sm:bg-[#fafbfc] sm:p-4"
        role="search"
      >
        <div className="relative min-w-0 flex-1">
          <label htmlFor="category-calc-search" className="sr-only">
            Search calculators in this category
          </label>
          <HiSearch
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]"
            aria-hidden
          />
          <input
            id="category-calc-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search calculators…"
            autoComplete="off"
            className={searchInputClass}
          />
          {trimmedQuery ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#94a3b8] transition-colors hover:bg-[#f1f5f9] hover:text-[#334155]"
              aria-label="Clear search"
            >
              <HiX className="h-4 w-4" aria-hidden />
            </button>
          ) : null}
        </div>

        <SortSegmentedControl sort={sort} onSortChange={setSort} />
      </div>

      <p
        className="mb-4 text-[13px] text-[#64748b] sm:text-[14px]"
        aria-live="polite"
      >
        {trimmedQuery ? (
          showing === 0 ? (
            <>
              No calculators match &ldquo;{trimmedQuery}&rdquo; in this category.
            </>
          ) : (
            <>
              <span className="font-medium text-[#334155]">{showing}</span> of{" "}
              {total} {total === 1 ? "calculator" : "calculators"} · sorted{" "}
              {activeSortLabel}
            </>
          )
        ) : (
          <>
            <span className="font-medium text-[#334155]">{showing}</span>{" "}
            {showing === 1 ? "calculator" : "calculators"} · sorted{" "}
            <span className="text-[#334155]">{activeSortLabel}</span>
          </>
        )}
      </p>

      {visibleLinks.length === 0 ? (
        <p className="text-[15px] text-[#64748b]">
          Try a different search term or clear the search box to see all tools.
        </p>
      ) : (
        <ul className="list-outside list-disc space-y-2.5 pl-6 text-[15px] marker:text-secondary md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-2.5 md:space-y-0">
          {visibleLinks.map(({ href, label }) => (
            <li key={href} className="min-w-0 pl-1">
              <Link
                href={href}
                className="text-secondary underline-offset-2 hover:underline"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
