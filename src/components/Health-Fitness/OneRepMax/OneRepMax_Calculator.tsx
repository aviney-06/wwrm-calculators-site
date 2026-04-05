"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { InputWithSuffix } from "../shared/InputWithSuffix";
import { FormError } from "../shared/StandardFormRows";

/** Epley formula */
function oneRmEpley(weight: number, reps: number) {
  return weight * (1 + reps / 30);
}

export function OneRepMax_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [oneRm, setOneRm] = useState<number | null>(null);

  const run = () => {
    setError(null);
    const w = parseFloat(weight);
    const r = parseInt(reps, 10);
    if (Number.isNaN(w) || w <= 0) {
      setError("Enter weight lifted.");
      setOneRm(null);
      return;
    }
    if (Number.isNaN(r) || r < 1 || r > 15) {
      setError("Enter reps between 1 and 15.");
      setOneRm(null);
      return;
    }
    setOneRm(Math.round(oneRmEpley(w, r) * 10) / 10);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
            Weight lifted
          </p>
          <InputWithSuffix
            type="number"
            min={0}
            step={0.5}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            suffix="lbs"
            inputClassName="w-full max-w-[8rem]"
          />
        </div>
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
            Reps
          </p>
          <InputWithSuffix
            type="number"
            min={1}
            max={15}
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            suffix="reps"
            inputClassName="w-full max-w-[8rem]"
          />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Estimate 1RM
      </button>
    </div>
  );

  const result =
    oneRm != null ? (
      <>
        <p className="text-center text-3xl font-bold text-[#d66844]">{oneRm}</p>
        <p className="text-center text-[14px] font-medium text-[#334155]">
          lbs (estimated)
        </p>
        <p className="max-w-[14rem] text-center text-[11px] text-[#64748b]">
          Epley formula — use as a guide only; form and fatigue matter.
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Enter weight and reps at submax effort.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
