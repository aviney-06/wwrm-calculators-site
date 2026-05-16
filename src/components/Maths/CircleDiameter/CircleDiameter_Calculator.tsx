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

type DMode = "fromR" | "fromC";
export function CircleDiameter_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<DMode>("fromR");
  const [val, setVal] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const v = parseFloat(val);
    if (Number.isNaN(v) || v <= 0) { setError("Enter a positive value."); setOut(null); return; }
    setOut(formatNum(mode === "fromR" ? 2 * v : v / Math.PI));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CustomSelect<DMode> id="d-mode" value={mode} onChange={setMode}
        options={[{ value: "fromR", label: "From radius" }, { value: "fromC", label: "From circumference" }]} />
      <InputWithSuffix type="number" suffix="" value={val} onChange={e => setVal(e.target.value)} inputClassName="max-w-[10rem]" />
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Find diameter</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">d = {out}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Circle diameter</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
