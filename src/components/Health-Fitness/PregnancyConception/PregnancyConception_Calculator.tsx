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

/** Approximate conception ~14 days after LMP for 28-day cycle */
export function PregnancyConception_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [lmp, setLmp] = useState("");
  const [cycle, setCycle] = useState("28");
  const [error, setError] = useState<string | null>(null);
  const [windowText, setWindowText] = useState<string | null>(null);

  const run = () => {
    setError(null);
    if (!lmp) {
      setError("Select LMP date.");
      setWindowText(null);
      return;
    }
    const c = parseInt(cycle, 10);
    if (Number.isNaN(c) || c < 21 || c > 45) {
      setError("Cycle length usually 21–45 days.");
      setWindowText(null);
      return;
    }
    const start = new Date(lmp + "T12:00:00");
    if (Number.isNaN(start.getTime())) {
      setError("Invalid date.");
      setWindowText(null);
      return;
    }
    const ovulationOffset = Math.round(c / 2);
    const mid = addDays(start, ovulationOffset);
    const from = addDays(mid, -3);
    const to = addDays(mid, 1);
    setWindowText(
      `Approx. fertile window: ${formatDate(from)} – ${formatDate(to)} (estimate).`,
    );
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="pc-lmp"
          className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-1/75"
        >
          LMP start date
        </label>
        <input
          id="pc-lmp"
          type="date"
          value={lmp}
          onChange={(e) => setLmp(e.target.value)}
          className={`${fieldBase} w-full max-w-[12rem]`}
        />
      </div>
      <div>
        <label
          htmlFor="pc-cycle"
          className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-1/75"
        >
          Average cycle length (days)
        </label>
        <input
          id="pc-cycle"
          type="number"
          min={21}
          max={45}
          value={cycle}
          onChange={(e) => setCycle(e.target.value)}
          className={`${fieldBase} w-full max-w-[6rem]`}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Estimate fertile window
      </button>
    </div>
  );

  const result =
    windowText != null ? (
      <p className="max-w-[16rem] text-center text-[14px] leading-relaxed text-[#334155]">
        {windowText}
      </p>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Rough estimate only — ovulation varies by person and cycle.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
