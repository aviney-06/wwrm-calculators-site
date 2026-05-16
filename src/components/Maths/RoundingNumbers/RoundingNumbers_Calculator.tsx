"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";

export function RoundingNumbers_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [val, setVal] = useState("3.14159");
  const [places, setPlaces] = useState("2");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const x = parseFloat(val);
    const p = parseInt(places, 10);
    if (Number.isNaN(x) || Number.isNaN(p) || p < 0 || p > 10) { setError("Enter a number and decimal places 0–10."); setOut(null); return; }
    setOut(x.toFixed(p));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Number</p>
          <InputWithSuffix type="number" step="any" suffix="" value={val} onChange={e => setVal(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Decimal places</p>
          <InputWithSuffix type="number" min={0} max={10} suffix="" value={places} onChange={e => setPlaces(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Round</button>
    </div>
  );
  const result = out != null ? (
    <><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">rounded</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Round to N decimal places</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
