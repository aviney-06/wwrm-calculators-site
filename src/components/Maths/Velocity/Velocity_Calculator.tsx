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

export function Velocity_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [d, setD] = useState("100");
  const [t, setT] = useState("9.58");
  const [error, setError] = useState<string | null>(null);
  const [vel, setVel] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const dist = Number.parseFloat(d);
    const time = Number.parseFloat(t);
    if (!Number.isFinite(dist) || !Number.isFinite(time)) {
      setError("Enter valid numbers for displacement and time.");
      setVel(null);
      return;
    }
    if (time <= 0) {
      setError("Time must be greater than 0.");
      setVel(null);
      return;
    }
    setVel(formatNum(dist / time, 4));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        Average velocity = displacement ÷ time
      </p>
      <CalculatorNumberField
        id="vel-d"
        label="Displacement"
        suffix="m"
        step="any"
        value={d}
        onChange={(e) => setD(e.target.value)}
      />
      <CalculatorNumberField
        id="vel-t"
        label="Time"
        suffix="s"
        min={0}
        step="any"
        value={t}
        onChange={(e) => setT(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate velocity
      </button>
    </div>
  );

  const result =
    vel != null ? (
      <div className="text-center">
        <p className="text-4xl font-semibold text-[#d66844]">{vel}</p>
        <p className="mt-2 text-[14px] text-[#334155]">m/s average velocity</p>
        <p className="mt-1 text-[12px] text-[#64748b]">
          ≈ {formatNum(Number(vel) * 3.6, 2)} km/h · {formatNum(Number(vel) * 2.23694, 2)} mph
        </p>
      </div>
    ) : (
      <CalculatorEmptyResult>
        Enter displacement and time to find velocity.
      </CalculatorEmptyResult>
    );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
