"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { CustomSelect } from "@/components/Health-Fitness/shared/CustomSelect";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, gcd, lcm } from "@/components/Maths/shared/mathUtils";

export function ScientificNotation_Calculator() {
  type Mode = "toSci" | "fromSci";
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("toSci");
  const [val, setVal] = useState("12345");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const x = parseFloat(val);
    if (Number.isNaN(x)) { setError("Enter a valid number."); setOut(null); return; }
    setOut(mode === "toSci" ? x.toExponential(4) : formatNum(x, 8));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Direction</p>
        <CustomSelect<Mode> id="sci-mode" value={mode} onChange={setMode}
          options={[{ value: "toSci", label: "Decimal → scientific" }, { value: "fromSci", label: "Scientific → decimal" }]} /></div>
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Value</p>
        <InputWithSuffix type="text" suffix="" value={val} onChange={e => setVal(e.target.value)} inputClassName="w-full max-w-[12rem]" /></div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Convert</button>
    </div>
  );
  const result = out != null ? (<p className="text-center font-mono text-2xl font-bold text-[#d66844] sm:text-3xl">{out}</p>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">e notation ↔ decimal</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
