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

export function Force_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [m, setM] = useState("10");
  const [a, setA] = useState("9.81");
  const [error, setError] = useState<string | null>(null);
  const [force, setForce] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const mass = Number.parseFloat(m);
    const accel = Number.parseFloat(a);
    if (!Number.isFinite(mass) || !Number.isFinite(accel)) {
      setError("Enter valid numbers for mass and acceleration.");
      setForce(null);
      return;
    }
    if (mass < 0) {
      setError("Mass cannot be negative.");
      setForce(null);
      return;
    }
    setForce(formatNum(mass * accel, 4));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        Force = mass × acceleration (F = m × a)
      </p>
      <CalculatorNumberField
        id="force-m"
        label="Mass"
        suffix="kg"
        min={0}
        step="any"
        value={m}
        onChange={(e) => setM(e.target.value)}
      />
      <CalculatorNumberField
        id="force-a"
        label="Acceleration"
        suffix="m/s²"
        step="any"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate force
      </button>
    </div>
  );

  const result =
    force != null ? (
      <div className="text-center">
        <p className="text-4xl font-semibold text-[#d66844]">{force}</p>
        <p className="mt-2 text-[14px] text-[#334155]">newtons (N)</p>
      </div>
    ) : (
      <CalculatorEmptyResult>
        Enter mass and acceleration to find force.
      </CalculatorEmptyResult>
    );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
