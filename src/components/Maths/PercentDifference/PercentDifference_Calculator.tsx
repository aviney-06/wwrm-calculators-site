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

export function PercentDifference_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [v1, setV1] = useState("50");
  const [v2, setV2] = useState("75");
  const [error, setError] = useState<string | null>(null);
  const [pct, setPct] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const a = parseFloat(v1);
    const b = parseFloat(v2);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      setError("Enter valid numbers.");
      setPct(null);
      return;
    }
    const avg = (a + b) / 2;
    if (avg === 0) {
      setError("Average of the two values cannot be zero.");
      setPct(null);
      return;
    }
    setPct(formatNum((Math.abs(a - b) / avg) * 100) + "%");
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Value 1</p>
          <InputWithSuffix type="number" suffix="" value={v1} onChange={(e) => setV1(e.target.value)} inputClassName="w-full max-w-[9rem]" />
        </div>
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Value 2</p>
          <InputWithSuffix type="number" suffix="" value={v2} onChange={(e) => setV2(e.target.value)} inputClassName="w-full max-w-[9rem]" />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );

  const result = pct != null ? (
    <>
      <p className="text-center text-3xl font-bold text-[#d66844]">{pct}</p>
      <p className="text-center text-[14px] text-[#334155]">percent difference</p>
    </>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">|V₁ − V₂| ÷ average × 100</p>
  );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
