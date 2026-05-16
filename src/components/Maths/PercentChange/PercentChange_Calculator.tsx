"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";

export function PercentChange_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [start, setStart] = useState("100");
  const [end, setEnd] = useState("80");
  const [error, setError] = useState<string | null>(null);
  const [pct, setPct] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const s = parseFloat(start);
    const e = parseFloat(end);
    if (Number.isNaN(s) || Number.isNaN(e)) {
      setError("Enter valid numbers.");
      setPct(null);
      return;
    }
    if (s === 0) {
      setError("Starting value cannot be zero.");
      setPct(null);
      return;
    }
    const change = ((e - s) / s) * 100;
    const sign = change > 0 ? "+" : "";
    setPct(sign + formatNum(change) + "%");
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Starting value</p>
          <InputWithSuffix type="number" suffix="" value={start} onChange={(e) => setStart(e.target.value)} inputClassName="w-full max-w-[9rem]" />
        </div>
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Ending value</p>
          <InputWithSuffix type="number" suffix="" value={end} onChange={(e) => setEnd(e.target.value)} inputClassName="w-full max-w-[9rem]" />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate change</button>
    </div>
  );

  const result = pct != null ? (
    <>
      <p className="text-center text-3xl font-bold text-[#d66844]">{pct}</p>
      <p className="text-center text-[14px] text-[#334155]">percent change</p>
    </>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">((end − start) ÷ start) × 100</p>
  );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
