"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
  calcHintClass,
} from "@/components/shared/calculatorFields";

export function Integral_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [coef, setCoef] = useState("1");
  const [power, setPower] = useState("2");
  const [a, setA] = useState("0");
  const [b, setB] = useState("1");
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const c = Number.parseFloat(coef);
    const n = Number.parseFloat(power);
    const lo = Number.parseFloat(a);
    const hi = Number.parseFloat(b);
    if (![c, n, lo, hi].every(Number.isFinite)) {
      setError("Enter valid numbers.");
      setValue(null);
      return;
    }
    if (n === -1) {
      setError("Power cannot be −1 for this tool.");
      setValue(null);
      return;
    }
    const F = (x: number) => (c * Math.pow(x, n + 1)) / (n + 1);
    setValue(formatNum(F(hi) - F(lo)));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className={calcHintClass}>Definite integral of c·xⁿ from a to b.</p>
      <div className="grid grid-cols-2 gap-3">
        <CalculatorNumberField
          id="integral-c"
          label="c"
          step="any"
          value={coef}
          onChange={(e) => setCoef(e.target.value)}
        />
        <CalculatorNumberField
          id="integral-n"
          label="n"
          step="any"
          value={power}
          onChange={(e) => setPower(e.target.value)}
        />
        <CalculatorNumberField
          id="integral-a"
          label="a (lower)"
          step="any"
          value={a}
          onChange={(e) => setA(e.target.value)}
        />
        <CalculatorNumberField
          id="integral-b"
          label="b (upper)"
          step="any"
          value={b}
          onChange={(e) => setB(e.target.value)}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate integral
      </button>
    </div>
  );

  const result = value ? (
    <div className="text-center">
      <p className="text-3xl font-bold text-[#d66844]">{value}</p>
      <p className="mt-2 text-[14px] text-[#334155]">definite integral</p>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter c, n, and limits a and b to integrate c·xⁿ.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Uses ∫ c·xⁿ dx = c·xⁿ⁺¹/(n+1). Power n cannot be −1.
        </p>
      }
    />
  );
}
