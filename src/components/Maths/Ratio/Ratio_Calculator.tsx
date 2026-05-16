"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, fractionToString, gcd, simplifyFraction } from "@/components/Maths/shared/mathUtils";

export function Ratio_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("12");
  const [b, setB] = useState("18");
  const [error, setError] = useState<string | null>(null);
  const [simple, setSimple] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const x = parseFloat(a), y = parseFloat(b);
    if (Number.isNaN(x) || Number.isNaN(y) || y === 0) { setError("Enter two numbers; second cannot be 0."); setSimple(null); return; }
    const g = gcd(Math.round(x * 1000), Math.round(y * 1000));
    const sn = Math.round(x * 1000) / g, sd = Math.round(y * 1000) / g;
    setSimple(`${sn} : ${sd}  (≈ ${formatNum(x / y, 4)})`);
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Value A</p>
          <InputWithSuffix type="number" suffix="" value={a} onChange={e => setA(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Value B</p>
          <InputWithSuffix type="number" suffix="" value={b} onChange={e => setB(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
      </div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Simplify ratio</button>
    </div>
  );
  const result = simple != null ? (<p className="text-center text-xl font-bold text-[#d66844] sm:text-2xl">{simple}</p>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Lowest terms ratio</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
