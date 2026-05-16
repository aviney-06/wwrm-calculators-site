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

export function PercentToDecimal_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [pct, setPct] = useState("25");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const raw = pct.replace(/%/g, "").trim();
    const x = parseFloat(raw);
    if (Number.isNaN(x)) { setError("Enter a valid percent."); setOut(null); return; }
    setOut(formatNum(x / 100, 8));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <InputWithSuffix type="number" suffix="%" value={pct} onChange={e => setPct(e.target.value)} inputClassName="max-w-[10rem]" />
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Convert</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">decimal</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">÷ 100</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
