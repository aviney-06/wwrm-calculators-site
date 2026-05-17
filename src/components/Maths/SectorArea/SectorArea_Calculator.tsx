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

export function SectorArea_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [r, setR] = useState("10");
  const [deg, setDeg] = useState("60");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const radius = parseFloat(r), angle = parseFloat(deg);
    if (Number.isNaN(radius) || Number.isNaN(angle) || radius <= 0 || angle <= 0) {
      setError("Enter positive radius and angle.");
      setOut(null);
      return;
    }
    setOut(formatNum((angle / 360) * Math.PI * radius * radius));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2">
        <InputWithSuffix type="number" suffix="" value={r} onChange={e => setR(e.target.value)} inputClassName="w-full max-w-[9rem]" />
        <InputWithSuffix type="number" suffix="°" value={deg} onChange={e => setDeg(e.target.value)} inputClassName="w-full max-w-[9rem]" />
      </div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">(θ/360)πr²</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Sector area</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
