"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { pickPowerball } from "@/components/Other/shared/otherCalcUtils";
import { CalculatorEmptyResult, calcHintClass } from "@/components/shared/calculatorFields";

export function Powerball_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [nums, setNums] = useState<{ white: number[]; red: number } | null>(null);

  const run = () => {
    setNums(pickPowerball());
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className={calcHintClass}>
        Random Powerball-style pick: 5 white (1–69) + 1 red (1–26).
      </p>
      <button type="button" className={btnCalculate} onClick={run}>
        Generate numbers
      </button>
    </div>
  );

  const result = nums ? (
    <div className="text-center">
      <p className="font-mono text-lg text-[#334155]">{nums.white.join(" · ")}</p>
      <p className="mt-3 text-2xl font-bold text-[#d66844]">+ {nums.red}</p>
    </div>
  ) : (
    <CalculatorEmptyResult>Tap generate for a quick pick.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Random picks only — not affiliated with any lottery. Odds are not improved.
        </p>
      }
    />
  );
}
