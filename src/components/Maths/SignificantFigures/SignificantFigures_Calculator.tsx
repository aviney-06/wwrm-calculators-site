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

export function SignificantFigures_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [val, setVal] = useState("0.00450");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const c = countSignificantFigures(val);
    if (c === null) { setError("Enter a valid number."); setOut(null); return; }
    setOut(String(c));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <InputWithSuffix type="text" suffix="" value={val} onChange={e => setVal(e.target.value)} inputClassName="max-w-[12rem]" />
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Count</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">significant figures</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Sig fig counter</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
