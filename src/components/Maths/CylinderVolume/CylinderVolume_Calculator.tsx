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

export function CylinderVolume_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [r, setR] = useState("4");
  const [h, setH] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const radius = parseFloat(r), height = parseFloat(h);
    if (Number.isNaN(radius) || Number.isNaN(height) || radius <= 0 || height <= 0) {
      setError("Enter positive radius and height."); setOut(null); return;
    }
    setOut(formatNum(Math.PI * radius * radius * height));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Radius</p>
          <InputWithSuffix type="number" suffix="" value={r} onChange={e => setR(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Height</p>
          <InputWithSuffix type="number" suffix="" value={h} onChange={e => setH(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate volume</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">cubic units</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">V = πr²h</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
