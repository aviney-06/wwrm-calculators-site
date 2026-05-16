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

export function Distance_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [x1, setX1] = useState("0"); const [y1, setY1] = useState("0");
  const [x2, setX2] = useState("3"); const [y2, setY2] = useState("4");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const a = parseFloat(x1), b = parseFloat(y1), c = parseFloat(x2), d = parseFloat(y2);
    if ([a,b,c,d].some(Number.isNaN)) { setError("Enter valid coordinates."); setOut(null); return; }
    setOut(formatNum(Math.sqrt((c-a)**2 + (d-b)**2)));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div><p className="mb-1 text-[12px] font-medium text-[#334155]">Point 1 (x, y)</p>
        <div className="flex gap-2"><InputWithSuffix type="number" suffix="" value={x1} onChange={e => setX1(e.target.value)} inputClassName="w-[4rem]" />
        <InputWithSuffix type="number" suffix="" value={y1} onChange={e => setY1(e.target.value)} inputClassName="w-[4rem]" /></div></div>
      <div><p className="mb-1 text-[12px] font-medium text-[#334155]">Point 2 (x, y)</p>
        <div className="flex gap-2"><InputWithSuffix type="number" suffix="" value={x2} onChange={e => setX2(e.target.value)} inputClassName="w-[4rem]" />
        <InputWithSuffix type="number" suffix="" value={y2} onChange={e => setY2(e.target.value)} inputClassName="w-[4rem]" /></div></div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate distance</button>
    </div>
  );
  const result = out != null ? (
    <><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">units</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">√((x₂−x₁)² + (y₂−y₁)²)</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
