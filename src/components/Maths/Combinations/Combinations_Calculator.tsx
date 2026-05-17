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

export function Combinations_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState("10");
  const [r, setR] = useState("3");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const nn = parseInt(n, 10), rr = parseInt(r, 10);
    if (Number.isNaN(nn) || Number.isNaN(rr) || nn < 0 || rr < 0) { setError("Enter non-negative integers."); setOut(null); return; }
    const c = combinations(nn, rr);
    if (!Number.isFinite(c)) { setError("Result too large."); setOut(null); return; }
    setOut(String(c));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b]">C(n, r) = n! / (r!(n−r)!)</p>
      <div className="grid grid-cols-2 gap-2">
        <InputWithSuffix type="number" suffix="" value={n} onChange={e => setN(e.target.value)} inputClassName="w-full max-w-[9rem]" />
        <InputWithSuffix type="number" suffix="" value={r} onChange={e => setR(e.target.value)} inputClassName="w-full max-w-[9rem]" />
      </div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">combinations</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">n choose r</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
