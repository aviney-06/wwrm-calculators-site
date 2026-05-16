"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, gcd, lcm } from "@/components/Maths/shared/mathUtils";

export function CircumferenceToDiameter_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [c, setC] = useState("31.416");
  const [error, setError] = useState<string | null>(null);
  const [d, setD] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const circ = parseFloat(c);
    if (Number.isNaN(circ) || circ <= 0) { setError("Enter a positive circumference."); setD(null); return; }
    setD(formatNum(circ / Math.PI));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Circumference</p>
        <InputWithSuffix type="number" suffix="" value={c} onChange={e => setC(e.target.value)} inputClassName="max-w-[10rem]" /></div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Find diameter</button>
    </div>
  );
  const result = d != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{d}</p><p className="text-center text-[14px] text-[#334155]">diameter (d = C ÷ π)</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">From circumference</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
