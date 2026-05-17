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

export function AveragePercentage_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState("80, 90, 75");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const vals = parseNumberList(raw.replace(/%/g, ""));
    if (vals.length === 0) { setError("Enter percentages separated by commas."); setOut(null); return; }
    const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
    setOut(formatNum(avg) + "%");
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b]">Comma-separated % values</p>
      <input className="h-10 w-full rounded border border-[#E0E0E0] px-3 text-[14px]" value={raw} onChange={e => setRaw(e.target.value)} />
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Average</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Mean of percentages</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
