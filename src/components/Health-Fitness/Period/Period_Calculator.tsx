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

function fmt(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function Period_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [lmp, setLmp] = useState("");
  const [cycle, setCycle] = useState("28");
  const [error, setError] = useState<string | null>(null);
  const [next, setNext] = useState<string | null>(null);

  const run = () => {
    setError(null);
    if (!lmp) {
      setError("Select the first day of your last period.");
      setNext(null);
      return;
    }
    const c = parseInt(cycle, 10);
    if (Number.isNaN(c) || c < 21 || c > 45) {
      setError("Cycle length 21–45 days.");
      setNext(null);
      return;
    }
    const start = new Date(lmp + "T12:00:00");
    if (Number.isNaN(start.getTime())) {
      setError("Invalid date.");
      setNext(null);
      return;
    }
    const n = addDays(start, c);
    setNext(fmt(n));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="per-lmp"
          className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-1/75"
        >
          First day of last period
        </label>
        <input
          id="per-lmp"
          type="date"
          value={lmp}
          onChange={(e) => setLmp(e.target.value)}
          className={`${fieldBase} w-full max-w-[12rem]`}
        />
      </div>
      <div>
        <label
          htmlFor="per-cycle"
          className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-1/75"
        >
          Average cycle (days)
        </label>
        <input
          id="per-cycle"
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
        Next period start
      </button>
    </div>
  );

  const result =
    next != null ? (
      <>
        <p className="text-center text-xl font-bold text-[#d66844]">{next}</p>
        <p className="text-center text-[13px] text-[#64748b]">
          Estimated start of next cycle
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Predicts next period from LMP and cycle length.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
