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

export function Log_Calculator() {
  type Base = "ln" | "log10";
  const resultRef = useRef<HTMLElement>(null);
  const [base, setBase] = useState<Base>("ln");
  const [x, setX] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const v = parseFloat(x);
    if (Number.isNaN(v) || v <= 0) { setError("Enter a positive number."); setOut(null); return; }
    setOut(formatNum(base === "ln" ? Math.log(v) : Math.log10(v), 6));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Log type</p>
        <CustomSelect<Base> id="log-base" value={base} onChange={setBase}
          options={[{ value: "ln", label: "Natural log (ln)" }, { value: "log10", label: "Common log (log₁₀)" }]} /></div>
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">x</p>
        <InputWithSuffix type="number" suffix="" value={x} onChange={e => setX(e.target.value)} inputClassName="max-w-[10rem]" /></div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Logarithm</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
