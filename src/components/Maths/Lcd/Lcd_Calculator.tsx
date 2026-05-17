"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, fractionToString, gcd, lcm, lcmList, combinations, primeFactors } from "@/components/Maths/shared/mathUtils";

export function Lcd_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [d1, setD1] = useState("4");
  const [d2, setD2] = useState("6");
  const [d3, setD3] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const denoms: number[] = [];
    for (const s of [d1, d2, d3]) {
      if (!s.trim()) continue;
      const v = parseInt(s, 10);
      if (Number.isNaN(v) || v === 0) { setError("Enter non-zero integer denominators."); setOut(null); return; }
      denoms.push(Math.abs(v));
    }
    if (denoms.length < 2) { setError("Enter at least two denominators."); setOut(null); return; }
    setOut(String(lcmList(denoms)));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b]">Denominators (optional third)</p>
      <div className="flex flex-wrap gap-2">
        <InputWithSuffix type="number" suffix="" value={d1} onChange={e => setD1(e.target.value)} inputClassName="w-[4rem]" />
        <InputWithSuffix type="number" suffix="" value={d2} onChange={e => setD2(e.target.value)} inputClassName="w-[4rem]" />
        <InputWithSuffix type="number" suffix="" value={d3} onChange={e => setD3(e.target.value)} inputClassName="w-[4rem]" />
      </div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Find LCD</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">least common denominator</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">LCM of denominators</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
