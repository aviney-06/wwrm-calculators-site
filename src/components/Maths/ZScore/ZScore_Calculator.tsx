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

export function ZScore_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [x, setX] = useState("85");
  const [mean, setMean] = useState("75");
  const [sd, setSd] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [z, setZ] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const val = parseFloat(x), mu = parseFloat(mean), sigma = parseFloat(sd);
    if ([val, mu, sigma].some(Number.isNaN)) { setError("Enter valid numbers."); setZ(null); return; }
    if (sigma === 0) { setError("Standard deviation cannot be zero."); setZ(null); return; }
    setZ(formatNum((val - mu) / sigma));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Value (x)</p>
        <InputWithSuffix type="number" suffix="" value={x} onChange={e => setX(e.target.value)} inputClassName="max-w-[9rem]" /></div>
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Mean (μ)</p>
          <InputWithSuffix type="number" suffix="" value={mean} onChange={e => setMean(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Std dev (σ)</p>
          <InputWithSuffix type="number" suffix="" value={sd} onChange={e => setSd(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate z-score</button>
    </div>
  );
  const result = z != null ? (
    <><p className="text-center text-3xl font-bold text-[#d66844]">{z}</p><p className="text-center text-[14px] text-[#334155]">z-score</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">(x − μ) ÷ σ</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
