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

export function Kinetic_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [mass, setMass] = useState("10");
  const [velocity, setVelocity] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const m = parseFloat(mass), v = parseFloat(velocity);
    if (Number.isNaN(m) || Number.isNaN(v) || m < 0) { setError("Enter non-negative mass and velocity."); setOut(null); return; }
    setOut(formatNum(0.5 * m * v * v));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Mass (kg)</p>
          <InputWithSuffix type="number" suffix="" value={mass} onChange={e => setMass(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Velocity (m/s)</p>
          <InputWithSuffix type="number" suffix="" value={velocity} onChange={e => setVelocity(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
      </div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out} J</p><p className="text-center text-[14px] text-[#334155]">KE = ½mv²</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Kinetic energy</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
