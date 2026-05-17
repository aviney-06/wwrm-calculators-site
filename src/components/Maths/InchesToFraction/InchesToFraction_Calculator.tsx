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

export function InchesToFraction_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [inches, setInches] = useState("3.375");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const x = parseFloat(inches);
    if (Number.isNaN(x)) { setError("Enter decimal inches."); setOut(null); return; }
    const whole = Math.trunc(x);
    const frac = Math.abs(x - whole);
    const { num, den } = decimalToFraction(frac, 16);
    const sign = x < 0 && whole === 0 ? "-" : "";
    if (den === 1 || num === 0) setOut(`${sign}${whole}`);
    else if (whole === 0) setOut(`${sign}${fractionToString(num, den)} in`);
    else setOut(`${whole} ${fractionToString(num, den)} in`);
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <InputWithSuffix type="number" suffix="in" value={inches} onChange={e => setInches(e.target.value)} inputClassName="max-w-[10rem]" />
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Convert</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-2xl font-bold text-[#d66844] sm:text-3xl">{out}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Decimal → fraction</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
