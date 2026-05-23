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
} from "@/components/shared/calculatorFields";

export function Exponent_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [base, setBase] = useState("2");
  const [exp, setExp] = useState("8");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const b = Number.parseFloat(base);
    const e = Number.parseFloat(exp);
    if (!Number.isFinite(b) || !Number.isFinite(e)) {
      setError("Enter valid base and exponent.");
      setOut(null);
      return;
    }
    const val = Math.pow(b, e);
    if (!Number.isFinite(val)) {
      setError("Result is not a finite number.");
      setOut(null);
      return;
    }
    setOut(formatNum(val, 8));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="exponent-base"
        label="Base"
        step="any"
        value={base}
        onChange={(e) => setBase(e.target.value)}
      />
      <CalculatorNumberField
        id="exponent-exp"
        label="Exponent"
        step="any"
        value={exp}
        onChange={(e) => setExp(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate power
      </button>
    </div>
  );

  const result = out ? (
    <div className="text-center">
      <p className="text-4xl font-bold text-[#d66844]">{out}</p>
      <p className="mt-2 text-[14px] text-[#334155]">base^exponent</p>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter a base and exponent to compute a power.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
