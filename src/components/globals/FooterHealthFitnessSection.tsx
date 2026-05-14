"use client";

import { useState } from "react";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi";
import { HEALTH_FITNESS_CALCULATOR_LINKS } from "@/data/calculatorCategoryLinks";

export function FooterHealthFitnessSection() {
  const [open, setOpen] = useState(true);

  return (
    <section
      className="mt-10 border-t border-white/20 pt-2 md:pt-6"
      aria-label="Health and fitness calculators"
    >
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="footer-health-fitness-panel"
          className="flex min-h-12 w-full items-center justify-between gap-3 border-b border-white/20 py-3 text-left text-white"
        >
          <span className="text-sm font-bold leading-snug sm:text-[0.95rem]">
            Health and Fitness
          </span>
          <HiChevronDown
            aria-hidden
            className={`h-5 w-5 shrink-0 text-white/85 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
        <div
          id="footer-health-fitness-panel"
          hidden={!open}
          className="border-b border-white/15 py-4"
        >
          <nav aria-label="Health and fitness calculators">
            <ul className="grid grid-cols-2 gap-x-5 gap-y-3">
              {HEALTH_FITNESS_CALCULATOR_LINKS.map(({ href, label }) => (
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
          </nav>
        </div>
      </div>

      <div className="hidden md:flex md:flex-nowrap md:items-start md:gap-x-3">
        <h2
          id="footer-health-fitness-heading"
          className="m-0 shrink-0 text-sm font-bold leading-relaxed text-white sm:text-[0.95rem] md:pt-0.5"
        >
          Health and Fitness:
        </h2>
        <nav
          className="min-w-0 flex-1 text-[0.8125rem] leading-relaxed text-white/80 md:text-sm"
          aria-label="Health and fitness calculators"
        >
          {HEALTH_FITNESS_CALCULATOR_LINKS.map(({ href, label }, i) => (
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
      </div>
    </section>
  );
}
