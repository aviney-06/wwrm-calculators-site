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

export function WinningPercentage_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [wins, setWins] = useState("45");
  const [losses, setLosses] = useState("37");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const w = parseFloat(wins), l = parseFloat(losses);
    if (Number.isNaN(w) || Number.isNaN(l) || w < 0 || l < 0) { setError("Enter non-negative wins and losses."); setOut(null); return; }
    const total = w + l;
    if (total === 0) { setError("Total games cannot be 0."); setOut(null); return; }
    setOut(formatNum((w / total) * 100) + "%");
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Wins</p>
          <InputWithSuffix type="number" suffix="" value={wins} onChange={e => setWins(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Losses</p>
          <InputWithSuffix type="number" suffix="" value={losses} onChange={e => setLosses(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
      </div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">wins ÷ (wins + losses)</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Win %</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
