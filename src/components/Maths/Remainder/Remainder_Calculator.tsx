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

export function Remainder_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("17");
  const [b, setB] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const x = parseInt(a, 10), y = parseInt(b, 10);
    if (Number.isNaN(x) || Number.isNaN(y) || y === 0) { setError("Enter integers; divisor cannot be 0."); setOut(null); return; }
    setOut(String(x % y));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2">
        <InputWithSuffix type="number" suffix="" value={a} onChange={e => setA(e.target.value)} inputClassName="w-full max-w-[9rem]" />
        <InputWithSuffix type="number" suffix="" value={b} onChange={e => setB(e.target.value)} inputClassName="w-full max-w-[9rem]" />
      </div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">remainder</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">a mod b</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
