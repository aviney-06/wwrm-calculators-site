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

export function PercentError_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [measured, setMeasured] = useState("10.2");
  const [accepted, setAccepted] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const m = parseFloat(measured), t = parseFloat(accepted);
    if (Number.isNaN(m) || Number.isNaN(t) || t === 0) { setError("Enter valid values; accepted cannot be 0."); setOut(null); return; }
    setOut(formatNum((Math.abs(m - t) / Math.abs(t)) * 100) + "%");
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Measured</p>
          <InputWithSuffix type="number" suffix="" value={measured} onChange={e => setMeasured(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Accepted</p>
          <InputWithSuffix type="number" suffix="" value={accepted} onChange={e => setAccepted(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
      </div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">percent error</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">|measured − accepted| ÷ |accepted| × 100</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
