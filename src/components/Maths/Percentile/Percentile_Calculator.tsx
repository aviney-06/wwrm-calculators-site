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

export function Percentile_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState("12, 15, 18, 20, 22, 25");
  const [pct, setPct] = useState("90");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const vals = parseNumberList(raw);
    const p = parseFloat(pct);
    if (vals.length === 0) { setError("Enter comma-separated data."); setOut(null); return; }
    if (Number.isNaN(p) || p < 0 || p > 100) { setError("Percentile must be 0–100."); setOut(null); return; }
    const sorted = [...vals].sort((a, b) => a - b);
    const rank = (p / 100) * (sorted.length - 1);
    const lo = Math.floor(rank);
    const hi = Math.ceil(rank);
    const frac = rank - lo;
    const value = sorted[lo]! + frac * (sorted[hi]! - sorted[lo]!);
    setOut(formatNum(value));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <input className="h-10 w-full rounded border border-[#E0E0E0] px-3 text-[14px]" value={raw} onChange={e => setRaw(e.target.value)} />
      <InputWithSuffix type="number" suffix="%" value={pct} onChange={e => setPct(e.target.value)} inputClassName="max-w-[8rem]" />
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">percentile value</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Linear interpolation</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
