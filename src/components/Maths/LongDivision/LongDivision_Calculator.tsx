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

export function LongDivision_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [dividend, setDividend] = useState("17");
  const [divisor, setDivisor] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState<string | null>(null);
  const [r, setR] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const a = parseFloat(dividend), b = parseFloat(divisor);
    if (Number.isNaN(a) || Number.isNaN(b) || b === 0) { setError("Enter dividend and non-zero divisor."); return; }
    const qi = Math.trunc(a / b);
    const rem = a - qi * b;
    setQ(formatNum(qi, 6));
    setR(formatNum(rem, 6));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Dividend</p>
          <InputWithSuffix type="number" suffix="" value={dividend} onChange={e => setDividend(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Divisor</p>
          <InputWithSuffix type="number" suffix="" value={divisor} onChange={e => setDivisor(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
      </div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Divide</button>
    </div>
  );
  const result = q != null ? (
    <div className="w-full max-w-[14rem] space-y-1 text-center text-[#334155]">
      <p className="text-2xl font-bold text-[#d66844]">Q = {q}</p>
      <p className="text-[14px]">R = {r}</p>
    </div>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Quotient & remainder</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
