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

export function SolveForX_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("2");
  const [b, setB] = useState("3");
  const [c, setC] = useState("11");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const coef = parseFloat(a), off = parseFloat(b), rhs = parseFloat(c);
    if ([coef, off, rhs].some(v => Number.isNaN(v))) { setError("Enter numbers for a, b, and c."); setOut(null); return; }
    if (coef === 0) { setError("a cannot be 0."); setOut(null); return; }
    setOut(formatNum((rhs - off) / coef, 6));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b]">Solve ax + b = c</p>
      <div className="flex flex-wrap items-center gap-2">
        <InputWithSuffix type="number" suffix="" value={a} onChange={e => setA(e.target.value)} inputClassName="w-[4rem]" />
        <span className="text-[#64748b]">x +</span>
        <InputWithSuffix type="number" suffix="" value={b} onChange={e => setB(e.target.value)} inputClassName="w-[4rem]" />
        <span className="text-[#64748b]">=</span>
        <InputWithSuffix type="number" suffix="" value={c} onChange={e => setC(e.target.value)} inputClassName="w-[4rem]" />
      </div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Solve</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">x = {out}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Linear equation</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
