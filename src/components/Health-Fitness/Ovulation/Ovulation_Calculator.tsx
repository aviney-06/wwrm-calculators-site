"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
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

/** Ovulation ~14 days before next period → LMP + (cycle − 14) */
export function Ovulation_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [lmp, setLmp] = useState("");
  const [cycle, setCycle] = useState("28");
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);

  const run = () => {
    setError(null);
    if (!lmp) {
      setError("Select LMP date.");
      setText(null);
      return;
    }
    const c = parseInt(cycle, 10);
    if (Number.isNaN(c) || c < 21 || c > 45) {
      setError("Cycle length 21–45 days.");
      setText(null);
      return;
    }
    const start = new Date(lmp + "T12:00:00");
    if (Number.isNaN(start.getTime())) {
      setError("Invalid date.");
      setText(null);
      return;
    }
    const ov = addDays(start, c - 14);
    setText(
      `Estimated ovulation around ${fmt(ov)} (cycle ${c} days). Fertile window often spans several days before.`,
    );
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="ov-lmp"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          First day of last period (LMP)
        </label>
        <input
          id="ov-lmp"
          type="date"
          value={lmp}
          onChange={(e) => setLmp(e.target.value)}
          className="min-h-[44px] w-full max-w-[12rem] rounded border border-[#E0E0E0] bg-white px-3 text-[14px] outline-none focus:border-[#2374ac] focus:ring-2 focus:ring-[#2374ac]/30 sm:min-h-10"
        />
      </div>
      <div>
        <label
          htmlFor="ov-cycle"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Average cycle length (days)
        </label>
        <input
          id="ov-cycle"
          type="number"
          min={21}
          max={45}
          value={cycle}
          onChange={(e) => setCycle(e.target.value)}
          className="min-h-[44px] w-full max-w-[6rem] rounded border border-[#E0E0E0] bg-white px-3 text-[14px] outline-none focus:border-[#2374ac] focus:ring-2 focus:ring-[#2374ac]/30 sm:min-h-10"
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Estimate ovulation
      </button>
    </div>
  );

  const result =
    text != null ? (
      <p className="max-w-[16rem] text-center text-[14px] leading-relaxed text-[#334155]">
        {text}
      </p>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Rough estimate — tracking LH or BBT is more accurate.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
