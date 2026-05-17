"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, gcd, lcm } from "@/components/Maths/shared/mathUtils";

export function PercentageDecrease_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [oldVal, setOldVal] = useState("100");
  const [newVal, setNewVal] = useState("80");
  const [error, setError] = useState<string | null>(null);
  const [pct, setPct] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const o = parseFloat(oldVal), n = parseFloat(newVal);
    if (Number.isNaN(o) || Number.isNaN(n) || o === 0) { setError("Enter valid values; original cannot be 0."); setPct(null); return; }
    setPct(formatNum(((o - n) / o) * 100) + "%");
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Original</p>
          <InputWithSuffix type="number" suffix="" value={oldVal} onChange={e => setOldVal(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">New value</p>
          <InputWithSuffix type="number" suffix="" value={newVal} onChange={e => setNewVal(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
      </div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate decrease</button>
    </div>
  );
  const result = pct != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{pct}</p><p className="text-center text-[14px] text-[#334155]">percent decrease</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">((original − new) ÷ original) × 100</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
