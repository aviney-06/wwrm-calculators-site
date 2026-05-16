"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, decimalToFraction, fractionToString, simplifyFraction, allFactors, countSignificantFigures, parseNumberList } from "@/components/Maths/shared/mathUtils";

export function FractionEquivalent_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState("1");
  const [d, setD] = useState("2");
  const [newD, setNewD] = useState("8");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const num = parseInt(n, 10), den = parseInt(d, 10), target = parseInt(newD, 10);
    if ([num, den, target].some(v => Number.isNaN(v)) || den === 0 || target === 0) {
      setError("Enter valid non-zero denominators.");
      setOut(null);
      return;
    }
    if (target % den !== 0) {
      setError("New denominator must be a multiple of the original.");
      setOut(null);
      return;
    }
    const mult = target / den;
    setOut(fractionToString(num * mult, target));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <InputWithSuffix type="number" suffix="" value={n} onChange={e => setN(e.target.value)} inputClassName="w-[4rem]" />
        <span>/</span>
        <InputWithSuffix type="number" suffix="" value={d} onChange={e => setD(e.target.value)} inputClassName="w-[4rem]" />
        <span className="text-[#64748b]">→ ? /</span>
        <InputWithSuffix type="number" suffix="" value={newD} onChange={e => setNewD(e.target.value)} inputClassName="w-[4rem]" />
      </div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Convert</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Same value, new denominator</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
