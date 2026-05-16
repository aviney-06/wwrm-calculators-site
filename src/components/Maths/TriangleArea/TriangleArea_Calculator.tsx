"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, gcd, lcm, lcmList, combinations, primeFactors } from "@/components/Maths/shared/mathUtils";

export function TriangleArea_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [base, setBase] = useState("10");
  const [height, setHeight] = useState("6");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const b = parseFloat(base), h = parseFloat(height);
    if (Number.isNaN(b) || Number.isNaN(h) || b <= 0 || h <= 0) { setError("Enter positive base and height."); setOut(null); return; }
    setOut(formatNum(0.5 * b * h));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2">
        <InputWithSuffix type="number" suffix="" value={base} onChange={e => setBase(e.target.value)} inputClassName="w-full max-w-[9rem]" />
        <InputWithSuffix type="number" suffix="" value={height} onChange={e => setHeight(e.target.value)} inputClassName="w-full max-w-[9rem]" />
      </div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">A = ½bh</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">½ × base × height</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
