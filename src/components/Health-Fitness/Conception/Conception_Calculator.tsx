"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { FormError } from "../shared/StandardFormRows";

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Estimated conception ~266 days before due date (clinical convention) */
export function Conception_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [due, setDue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [conception, setConception] = useState<string | null>(null);

  const run = () => {
    setError(null);
    if (!due) {
      setError("Select an estimated due date.");
      setConception(null);
      return;
    }
    const d = new Date(due + "T12:00:00");
    if (Number.isNaN(d.getTime())) {
      setError("Invalid date.");
      setConception(null);
      return;
    }
    const c = addDays(d, -266);
    setConception(formatDate(c));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="conc-due"
          className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-1/75"
        >
          Estimated due date
        </label>
        <input
          id="conc-due"
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          className={`${fieldBase} w-full max-w-[12rem]`}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Estimate conception date
      </button>
    </div>
  );

  const result =
    conception != null ? (
      <>
        <p className="text-center text-xl font-bold text-[#d66844]">
          {conception}
        </p>
        <p className="max-w-[15rem] text-center text-[12px] text-[#64748b]">
          Rough estimate: 266 days before due date. Not for legal or medical
          proof.
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        If you know your due date, we estimate when conception may have
        occurred.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
