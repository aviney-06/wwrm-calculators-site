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

export function RandomNumber1to10_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState<number | null>(null);
  const run = () => {
    setN(Math.floor(Math.random() * 10) + 1);
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b]">Inclusive range 1 through 10.</p>
      <button type="button" className={btnCalculate} onClick={run}>Pick a number</button>
    </div>
  );
  const result = n != null ? (
    <><p className="text-center text-4xl font-bold text-[#d66844]">{n}</p><p className="text-center text-[14px] text-[#334155]">random integer</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Tap to roll 1–10</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
