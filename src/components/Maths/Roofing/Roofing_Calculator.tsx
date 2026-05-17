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

export function Roofing_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [length, setLength] = useState("40");
  const [width, setWidth] = useState("30");
  const [pitch, setPitch] = useState("6");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const l = parseFloat(length), w = parseFloat(width), p = parseFloat(pitch);
    if ([l, w, p].some(v => Number.isNaN(v)) || l <= 0 || w <= 0 || p < 0) {
      setError("Enter positive length, width, and pitch (rise per 12 in run).");
      setOut(null);
      return;
    }
    const factor = Math.sqrt(1 + (p / 12) ** 2);
    setOut(formatNum(l * w * factor));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Length (ft)</p>
          <InputWithSuffix type="number" suffix="" value={length} onChange={e => setLength(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Width (ft)</p>
          <InputWithSuffix type="number" suffix="" value={width} onChange={e => setWidth(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
      </div>
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Pitch (rise / 12 run)</p>
        <InputWithSuffix type="number" suffix="/12" value={pitch} onChange={e => setPitch(e.target.value)} inputClassName="max-w-[8rem]" /></div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Estimate area</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out} ft²</p><p className="text-center text-[14px] text-[#334155]">roof surface area</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Footprint × slope factor</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
