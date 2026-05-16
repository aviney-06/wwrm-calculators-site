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
import { formatNum, gcd, lcm, lcmList, combinations, primeFactors } from "@/components/Maths/shared/mathUtils";

type Mode = "fromC" | "fromA";
export function RadiusOfCircle_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("fromC");
  const [val, setVal] = useState("31.416");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const v = parseFloat(val);
    if (Number.isNaN(v) || v <= 0) { setError("Enter a positive value."); setOut(null); return; }
    setOut(formatNum(mode === "fromC" ? v / (2 * Math.PI) : Math.sqrt(v / Math.PI)));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CustomSelect<Mode> id="r-mode" value={mode} onChange={setMode}
        options={[{ value: "fromC", label: "From circumference" }, { value: "fromA", label: "From area" }]} />
      <InputWithSuffix type="number" suffix="" value={val} onChange={e => setVal(e.target.value)} inputClassName="max-w-[10rem]" />
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Find radius</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">r = {out}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">r from C or A</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
