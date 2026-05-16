"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, fractionToString, decimalToFraction } from "@/components/Maths/shared/mathUtils";

export function DecimalToFraction_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [val, setVal] = useState("0.75");
  const [error, setError] = useState<string | null>(null);
  const [frac, setFrac] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const x = parseFloat(val);
    if (Number.isNaN(x)) { setError("Enter a valid decimal."); setFrac(null); return; }
    const { num, den } = decimalToFraction(x);
    setFrac(fractionToString(num, den));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Decimal</p>
        <InputWithSuffix type="number" step="any" suffix="" value={val} onChange={e => setVal(e.target.value)} inputClassName="max-w-[10rem]" /></div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Convert</button>
    </div>
  );
  const result = frac != null ? (
    <><p className="text-center text-3xl font-bold text-[#d66844]">{frac}</p><p className="text-center text-[14px] text-[#334155]">simplified fraction</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Best rational approximation</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
