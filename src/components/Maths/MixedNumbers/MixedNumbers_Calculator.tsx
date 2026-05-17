"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, fractionToString, decimalToFraction, gcd, lcm, simplifyFraction } from "@/components/Maths/shared/mathUtils";

export function MixedNumbers_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [whole, setWhole] = useState("2");
  const [n, setN] = useState("1");
  const [d, setD] = useState("4");
  const [error, setError] = useState<string | null>(null);
  const [improper, setImproper] = useState<string | null>(null);
  const [decimal, setDecimal] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const w = parseInt(whole, 10), num = parseInt(n, 10), den = parseInt(d, 10);
    if ([w, num, den].some(x => Number.isNaN(x)) || den === 0) { setError("Enter valid whole, numerator, and denominator."); return; }
    const sign = w < 0 ? -1 : 1;
    const absW = Math.abs(w);
    const impNum = sign * (absW * den + num);
    setImproper(fractionToString(impNum, den));
    setDecimal(formatNum(impNum / den, 6));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <InputWithSuffix type="number" suffix="" value={whole} onChange={e => setWhole(e.target.value)} inputClassName="w-[4rem]" />
        <InputWithSuffix type="number" suffix="" value={n} onChange={e => setN(e.target.value)} inputClassName="w-[3.5rem]" />
        <span className="text-[#64748b]">/</span>
        <InputWithSuffix type="number" suffix="" value={d} onChange={e => setD(e.target.value)} inputClassName="w-[3.5rem]" />
      </div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Convert</button>
    </div>
  );
  const result = improper != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{improper}</p><p className="text-center text-[14px] text-[#334155]">≈ {decimal}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">whole + fraction → improper</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
