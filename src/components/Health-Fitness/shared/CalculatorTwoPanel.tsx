"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  formPanelClass,
  resultPanelClass,
  twoPanelShellClass,
  twoPanelTrackClass,
} from "./calculatorStyles";

const MOBILE_SHOW_RESULT_EVENT = "calculator-mobile-show-result";

type Props = {
  form: ReactNode;
  result: ReactNode;
  resultRef?: React.RefObject<HTMLElement | null>;
  disclaimer?: ReactNode;
};

function FormHeading() {
  return (
    <h2 className="mb-3 text-center text-[15px] font-semibold text-[#334155] sm:mb-5 sm:text-[16px] md:mb-8 md:text-[17px]">
      Enter Details
    </h2>
  );
}

function ResultHeading() {
  return (
    <h2 className="mb-2 text-center text-[15px] font-semibold text-[#334155] sm:mb-5 sm:text-[16px] md:mb-8 md:text-[17px]">
      Result
    </h2>
  );
}

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
  const panelRef = useRef<HTMLDivElement>(null);
  const [mobileView, setMobileView] = useState<"form" | "result">("form");

  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;
    const onShowResult = () => setMobileView("result");
    node.addEventListener(MOBILE_SHOW_RESULT_EVENT, onShowResult);
    return () =>
      node.removeEventListener(MOBILE_SHOW_RESULT_EVENT, onShowResult);
  }, []);

  const trackClassName =
    mobileView === "result"
      ? `${twoPanelTrackClass} max-md:-translate-x-1/2`
      : `${twoPanelTrackClass} max-md:translate-x-0`;

  return (
    <div ref={panelRef} className="w-full">
      <div className={twoPanelShellClass}>
        <div className={trackClassName}>
          <section className={`w-1/2 shrink-0 md:w-auto ${formPanelClass}`}>
            <FormHeading />
            {form}
          </section>
          <section
            ref={ref}
            className={`w-1/2 shrink-0 md:w-auto ${resultPanelClass}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <button
              type="button"
              onClick={() => setMobileView("form")}
              className="mb-3 text-left text-[13px] font-medium text-secondary underline-offset-2 hover:underline md:hidden"
            >
              ← Edit inputs
            </button>
            <ResultHeading />
            <div className="flex flex-col items-center justify-center gap-2 md:min-h-0 md:flex-1 md:gap-6">
              {result}
            </div>
          </section>
        </div>
      </div>

      {disclaimer}
    </div>
  );
}

export function scrollResultIntoViewMobile(el: HTMLElement | null) {
  if (typeof window === "undefined" || !el) return;
  if (!window.matchMedia("(max-width: 767px)").matches) return;
  el.dispatchEvent(
    new CustomEvent(MOBILE_SHOW_RESULT_EVENT, { bubbles: true }),
  );
}
