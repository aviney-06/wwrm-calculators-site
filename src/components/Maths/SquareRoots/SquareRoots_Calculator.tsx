"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { CustomSelect } from "@/components/Health-Fitness/shared/CustomSelect";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, gcd, lcm, lcmList, combinations, primeFactors } from "@/components/Maths/shared/mathUtils";

export function SquareRoots_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState("144");
  const [error, setError] = useState<string | null>(null);
  const [sqrtOut, setSqrtOut] = useState<string | null>(null);
  const [cbrtOut, setCbrtOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const x = parseFloat(n);
    if (Number.isNaN(x)) { setError("Enter a valid number."); setSqrtOut(null); setCbrtOut(null); return; }
    if (x < 0) { setError("Square root requires a non-negative number."); setSqrtOut(null); setCbrtOut(null); return; }
    setSqrtOut(formatNum(Math.sqrt(x), 8));
    setCbrtOut(formatNum(Math.cbrt(x), 8));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Number</p>
        <InputWithSuffix type="number" suffix="" value={n} onChange={e => setN(e.target.value)} inputClassName="max-w-[10rem]" /></div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = sqrtOut != null ? (
    <div className="space-y-1 text-center">
      <p className="text-2xl font-bold text-[#d66844]">√x = {sqrtOut}</p>
      <p className="text-[14px] text-[#334155]">∛x = {cbrtOut}</p>
    </div>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Square & cube root</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
