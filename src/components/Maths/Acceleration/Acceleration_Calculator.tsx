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

export function Acceleration_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [vi, setVi] = useState("0");
  const [vf, setVf] = useState("27");
  const [t, setT] = useState("9");
  const [error, setError] = useState<string | null>(null);
  const [accel, setAccel] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const u = Number.parseFloat(vi);
    const v = Number.parseFloat(vf);
    const time = Number.parseFloat(t);
    if (!Number.isFinite(u) || !Number.isFinite(v) || !Number.isFinite(time)) {
      setError("Enter valid numbers for all fields.");
      setAccel(null);
      return;
    }
    if (time <= 0) {
      setError("Time must be greater than 0.");
      setAccel(null);
      return;
    }
    setAccel(formatNum((v - u) / time, 4));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        a = (final velocity − initial velocity) ÷ time
      </p>
      <CalculatorNumberField
        id="acc-vi"
        label="Initial velocity"
        suffix="m/s"
        step="any"
        value={vi}
        onChange={(e) => setVi(e.target.value)}
      />
      <CalculatorNumberField
        id="acc-vf"
        label="Final velocity"
        suffix="m/s"
        step="any"
        value={vf}
        onChange={(e) => setVf(e.target.value)}
      />
      <CalculatorNumberField
        id="acc-t"
        label="Time"
        suffix="s"
        min={0}
        step="any"
        value={t}
        onChange={(e) => setT(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate acceleration
      </button>
    </div>
  );

  const result =
    accel != null ? (
      <div className="text-center">
        <p className="text-4xl font-semibold text-[#d66844]">{accel}</p>
        <p className="mt-2 text-[14px] text-[#334155]">m/s² acceleration</p>
      </div>
    ) : (
      <CalculatorEmptyResult>
        Enter velocities and time to find acceleration.
      </CalculatorEmptyResult>
    );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
