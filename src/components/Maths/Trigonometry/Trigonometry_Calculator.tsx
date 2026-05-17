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

export function Trigonometry_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [deg, setDeg] = useState("30");
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const run = () => {
    setError(null);
    const d = parseFloat(deg);
    if (Number.isNaN(d)) { setError("Enter angle in degrees."); setLines(null); return; }
    const rad = (d * Math.PI) / 180;
    setLines([
      `sin = ${formatNum(Math.sin(rad), 6)}`,
      `cos = ${formatNum(Math.cos(rad), 6)}`,
      `tan = ${formatNum(Math.tan(rad), 6)}`,
    ]);
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <InputWithSuffix type="number" suffix="°" value={deg} onChange={e => setDeg(e.target.value)} inputClassName="max-w-[10rem]" />
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = lines != null ? (
    <div className="space-y-1 text-center text-[#334155]">
      {lines.map((l, i) => <p key={i} className="text-[14px] font-medium">{l}</p>)}
    </div>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Trig ratios</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
