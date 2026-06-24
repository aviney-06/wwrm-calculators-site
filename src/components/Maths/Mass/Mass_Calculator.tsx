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

export function Mass_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [f, setF] = useState("98.1");
  const [a, setA] = useState("9.81");
  const [error, setError] = useState<string | null>(null);
  const [mass, setMass] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const force = Number.parseFloat(f);
    const accel = Number.parseFloat(a);
    if (!Number.isFinite(force) || !Number.isFinite(accel)) {
      setError("Enter valid numbers for force and acceleration.");
      setMass(null);
      return;
    }
    if (accel === 0) {
      setError("Acceleration cannot be 0.");
      setMass(null);
      return;
    }
    setMass(formatNum(force / accel, 4));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        Mass = force ÷ acceleration (m = F ÷ a)
      </p>
      <CalculatorNumberField
        id="mass-f"
        label="Force"
        suffix="N"
        step="any"
        value={f}
        onChange={(e) => setF(e.target.value)}
      />
      <CalculatorNumberField
        id="mass-a"
        label="Acceleration"
        suffix="m/s²"
        step="any"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate mass
      </button>
    </div>
  );

  const result =
    mass != null ? (
      <div className="text-center">
        <p className="text-4xl font-semibold text-[#d66844]">{mass}</p>
        <p className="mt-2 text-[14px] text-[#334155]">kilograms (kg)</p>
      </div>
    ) : (
      <CalculatorEmptyResult>
        Enter force and acceleration to find mass.
      </CalculatorEmptyResult>
    );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
