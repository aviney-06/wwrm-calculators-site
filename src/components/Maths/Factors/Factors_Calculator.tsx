"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, parseNumberList, allFactors, countSignificantFigures, decimalToFraction, fractionToString, simplifyFraction } from "@/components/Maths/shared/mathUtils";

export function Factors_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState("36");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const x = parseInt(n, 10);
    if (Number.isNaN(x) || x === 0) { setError("Enter a non-zero integer."); setOut(null); return; }
    const f = allFactors(x);
    setOut(f.join(", "));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <InputWithSuffix type="number" suffix="" value={n} onChange={e => setN(e.target.value)} inputClassName="max-w-[10rem]" />
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Find factors</button>
    </div>
  );
  const result = out != null ? (<p className="max-w-[16rem] text-center text-lg font-bold leading-snug text-[#d66844] sm:text-xl">{out}</p>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">All divisors</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
