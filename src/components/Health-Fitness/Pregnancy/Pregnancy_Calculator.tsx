"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { FormError } from "../shared/StandardFormRows";

/** Naegele: LMP + 280 days */
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

export function Pregnancy_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [lmp, setLmp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [due, setDue] = useState<string | null>(null);

  const run = () => {
    setError(null);
    if (!lmp) {
      setError("Select the first day of your last menstrual period (LMP).");
      setDue(null);
      return;
    }
    const start = new Date(lmp + "T12:00:00");
    if (Number.isNaN(start.getTime())) {
      setError("Invalid date.");
      setDue(null);
      return;
    }
    const d = addDays(start, 280);
    setDue(formatDate(d));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="preg-lmp"
          className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-1/75"
        >
          First day of last period (LMP)
        </label>
        <input
          id="preg-lmp"
          type="date"
          value={lmp}
          onChange={(e) => setLmp(e.target.value)}
          className={`${fieldBase} w-full max-w-[12rem]`}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate due date
      </button>
    </div>
  );

  const result =
    due != null ? (
      <>
        <p className="text-center text-xl font-bold leading-snug text-[#d66844]">
          {due}
        </p>
        <p className="text-center text-[13px] text-[#64748b]">
          Estimated due date (40 weeks from LMP)
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Choose your LMP date. This uses a standard 280-day rule — not a
        substitute for prenatal care.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
