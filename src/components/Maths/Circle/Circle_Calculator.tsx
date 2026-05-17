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

export function Circle_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [r, setR] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const run = () => {
    setError(null);
    const radius = parseFloat(r);
    if (Number.isNaN(radius) || radius <= 0) { setError("Enter a positive radius."); setLines(null); return; }
    setLines([
      `d = ${formatNum(2 * radius)}`,
      `C = ${formatNum(2 * Math.PI * radius)}`,
      `A = ${formatNum(Math.PI * radius * radius)}`,
    ]);
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Radius</p>
        <InputWithSuffix type="number" suffix="" value={r} onChange={e => setR(e.target.value)} inputClassName="max-w-[10rem]" /></div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = lines != null ? (
    <div className="space-y-1 text-center text-[#334155]">
      {lines.map((l, i) => <p key={i} className={i === 2 ? "text-2xl font-bold text-[#d66844]" : "text-[14px]"}>{l}</p>)}
    </div>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">d, C, A from r</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
