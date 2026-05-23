"use client";

import { useState } from "react";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi";
import {
  FOOTER_CALCULATOR_CATEGORIES,
  type FooterCalculatorCategory,
} from "@/data/calculatorCategoryLinks";

function CalculatorLinksList({
  links,
  categoryLabel,
  className = "",
}: {
  links: FooterCalculatorCategory["links"];
  categoryLabel: string;
  className?: string;
}) {
  if (links.length === 0) {
    return (
      <p className={`text-sm text-white/70 ${className}`}>
        No calculators in this category yet.
      </p>
    );
  }

  return (
    <nav
      className={`min-w-0 text-[0.8125rem] leading-relaxed text-white/80 md:text-sm ${className}`}
      aria-label={`${categoryLabel} calculators`}
    >
      {links.map(({ href, label }, i) => (
        <span key={href}>
          {i > 0 ? (
            <span className="select-none px-1.5 text-white/35" aria-hidden>
              |
            </span>
          ) : null}
          <Link
            href={href}
            className="text-white/90 underline-offset-2 transition-colors hover:text-white hover:underline"
          >
            {label}
          </Link>
        </span>
      ))}
    </nav>
  );
}

function CategoryList({
  selectedId,
  onSelect,
  variant,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  variant: "desktop" | "mobile";
}) {
  return (
    <ul
      className={
        variant === "desktop"
          ? "m-0 flex list-none flex-col gap-2 p-0"
          : "m-0 flex list-none flex-col gap-1.5 p-0"
      }
      role="list"
    >
      {FOOTER_CALCULATOR_CATEGORIES.map((category) => {
        const active = category.id === selectedId;
        return (
          <li key={category.id}>
            <button
              type="button"
              onClick={() => onSelect(category.id)}
              className={
                variant === "desktop"
                  ? `w-full py-1.5 text-left text-sm transition-colors sm:text-[0.9rem] ${
                      active
                        ? "font-semibold text-white underline underline-offset-4"
                        : "font-medium text-white/75 hover:text-white hover:underline hover:underline-offset-4"
                    }`
                  : `w-full py-2.5 text-left text-sm transition-colors ${
                      active
                        ? "font-semibold text-white underline underline-offset-4"
                        : "font-medium text-white/80 hover:text-white"
                    }`
              }
              aria-current={active ? "true" : undefined}
            >
              {category.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function FooterCalculatorCategoriesSection() {
  const [selectedId, setSelectedId] = useState(
    FOOTER_CALCULATOR_CATEGORIES[0]?.id ?? "",
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const selected =
    FOOTER_CALCULATOR_CATEGORIES.find((c) => c.id === selectedId) ??
    FOOTER_CALCULATOR_CATEGORIES[0];

  if (!selected) return null;

  return (
    <section
      className="mt-10 border-t border-white/20 pt-2 md:pt-6"
      aria-label="Calculators by category"
    >
      {/* Mobile */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="footer-categories-panel"
          className="flex min-h-12 w-full items-center justify-between gap-3 border-b border-white/20 py-3 text-left text-white"
        >
          <span className="text-sm font-bold leading-snug sm:text-[0.95rem]">
            Calculators by category
          </span>
          <HiChevronDown
            aria-hidden
            className={`h-5 w-5 shrink-0 text-white/85 transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}
          />
        </button>
        <div
          id="footer-categories-panel"
          hidden={!mobileOpen}
          className="border-b border-white/15 py-4"
        >
          <CategoryList
            selectedId={selectedId}
            onSelect={setSelectedId}
            variant="mobile"
          />
          <div className="mt-4 border-t border-white/15 pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/60">
              {selected.label}
            </p>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-3">
              {selected.links.map(({ href, label }) => (
                <li key={href} className="min-w-0">
                  <Link
                    href={href}
                    className="block py-1 text-[0.8125rem] leading-snug text-white/90 underline-offset-2 transition-colors hover:text-white hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop — master / detail */}
      <div className="hidden md:flex md:gap-0">
        <div className="w-[min(100%,13.5rem)] shrink-0 pr-6">
          <CategoryList
            selectedId={selectedId}
            onSelect={setSelectedId}
            variant="desktop"
          />
        </div>
        <div
          className="min-h-[4rem] min-w-0 flex-1 border-l border-white/25 pl-6"
          aria-live="polite"
        >
          <CalculatorLinksList
            links={selected.links}
            categoryLabel={selected.label}
          />
        </div>
      </div>
    </section>
  );
}
