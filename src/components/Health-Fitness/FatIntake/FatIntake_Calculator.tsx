"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { InputWithSuffix } from "../shared/InputWithSuffix";
import { FormError } from "../shared/StandardFormRows";

export function FatIntake_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [calories, setCalories] = useState("");
  const [fatPct, setFatPct] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [grams, setGrams] = useState<number | null>(null);

  const run = () => {
    setError(null);
    const c = parseFloat(calories);
    const p = parseFloat(fatPct);
    if (Number.isNaN(c) || c <= 0) {
      setError("Enter daily calories.");
      setGrams(null);
      return;
    }
    if (Number.isNaN(p) || p <= 0 || p > 100) {
      setError("Enter fat percent between 1 and 100.");
      setGrams(null);
      return;
    }
    const g = (c * (p / 100)) / 9;
    setGrams(Math.round(g * 10) / 10);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Daily calories
        </p>
        <InputWithSuffix
          type="number"
          min={0}
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          suffix="kcal"
          inputClassName="max-w-[10rem]"
        />
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Fat (% of calories)
        </p>
        <InputWithSuffix
          type="number"
          min={1}
          max={100}
          value={fatPct}
          onChange={(e) => setFatPct(e.target.value)}
          suffix="%"
          inputClassName="max-w-[8rem]"
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate fat grams
      </button>
    </div>
  );

  const result =
    grams != null ? (
      <>
        <p className="text-center text-3xl font-bold text-[#d66844]">{grams}</p>
        <p className="text-center text-[14px] font-medium text-[#334155]">
          g fat / day
        </p>
        <p className="max-w-[14rem] text-center text-[11px] text-[#64748b]">
          At 9 kcal per gram of fat.
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Split calories by fat percentage.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
