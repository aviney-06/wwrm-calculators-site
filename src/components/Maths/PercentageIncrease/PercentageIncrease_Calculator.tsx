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

export function PercentageIncrease_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [oldVal, setOldVal] = useState("100");
  const [newVal, setNewVal] = useState("125");
  const [error, setError] = useState<string | null>(null);
  const [pct, setPct] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const o = parseFloat(oldVal);
    const n = parseFloat(newVal);
    if (Number.isNaN(o) || Number.isNaN(n)) {
      setError("Enter valid numbers.");
      setPct(null);
      return;
    }
    if (o === 0) {
      setError("Original value cannot be zero.");
      setPct(null);
      return;
    }
    setPct(formatNum(((n - o) / o) * 100) + "%");
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Original value</p>
          <InputWithSuffix type="number" suffix="" value={oldVal} onChange={(e) => setOldVal(e.target.value)} inputClassName="w-full max-w-[9rem]" />
        </div>
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">New value</p>
          <InputWithSuffix type="number" suffix="" value={newVal} onChange={(e) => setNewVal(e.target.value)} inputClassName="w-full max-w-[9rem]" />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate increase</button>
    </div>
  );

  const result = pct != null ? (
    <>
      <p className="text-center text-3xl font-bold text-[#d66844]">{pct}</p>
      <p className="text-center text-[14px] text-[#334155]">percentage increase</p>
    </>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">((new − original) ÷ original) × 100</p>
  );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
