"use client";

import { type ReactNode, useRef } from "react";
import {
  formSectionScroll,
  resultSectionScroll,
  twoPanelGridClass,
} from "./calculatorStyles";

type Props = {
  form: ReactNode;
  result: ReactNode;
  /** Optional ref attached to result section for scroll-into-view after calculate */
  resultRef?: React.RefObject<HTMLElement | null>;
  disclaimer?: ReactNode;
};

export function CalculatorTwoPanel({
  form,
  result,
  resultRef,
  disclaimer = (
    <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
      Note — This result is an estimate. Talk to a healthcare provider for
      personalized guidance.
    </p>
  ),
}: Props) {
  const internalRef = useRef<HTMLElement>(null);
  const ref = resultRef ?? internalRef;

  return (
    <div className="w-full">
      <div className={twoPanelGridClass}>
        <section className={formSectionScroll}>
          <h2 className="mb-3 text-center text-[15px] font-semibold text-[#334155] sm:mb-5 sm:text-[16px] md:mb-8 md:text-[17px]">
            Enter Details
          </h2>
          {form}
        </section>
        <section
          ref={ref}
          className={resultSectionScroll}
          aria-live="polite"
        >
          <h2 className="mb-2 text-center text-[15px] font-semibold text-[#334155] sm:mb-5 sm:text-[16px] md:mb-8 md:text-[17px]">
            Result
          </h2>
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 sm:gap-4 md:gap-6">
            {result}
          </div>
        </section>
      </div>
      {disclaimer}
    </div>
  );
}

/** Scroll result panel into view on narrow screens (call after successful calc). */
export function scrollResultIntoViewMobile(el: HTMLElement | null) {
  if (typeof window === "undefined" || !el) return;
  if (window.matchMedia("(max-width: 767px)").matches) {
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
}
