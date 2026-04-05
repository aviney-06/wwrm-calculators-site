"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { InputWithSuffix } from "../shared/InputWithSuffix";
import { FormError } from "../shared/StandardFormRows";

export function Carbohydrate_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [calories, setCalories] = useState("");
  const [carbPct, setCarbPct] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [grams, setGrams] = useState<number | null>(null);

  const run = () => {
    setError(null);
    const c = parseFloat(calories);
    const p = parseFloat(carbPct);
    if (Number.isNaN(c) || c <= 0) {
      setError("Enter daily calories.");
      setGrams(null);
      return;
    }
    if (Number.isNaN(p) || p <= 0 || p > 100) {
      setError("Enter carb percent between 1 and 100.");
      setGrams(null);
      return;
    }
    const g = (c * (p / 100)) / 4;
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
          inputClassName="w-full max-w-[10rem]"
        />
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Carbs (% of calories)
        </p>
        <InputWithSuffix
          type="number"
          min={1}
          max={100}
          value={carbPct}
          onChange={(e) => setCarbPct(e.target.value)}
          suffix="%"
          inputClassName="w-full max-w-[8rem]"
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate carbs
      </button>
    </div>
  );

  const result =
    grams != null ? (
      <>
        <p className="text-center text-3xl font-bold text-[#d66844]">{grams}</p>
        <p className="text-center text-[14px] font-medium text-[#334155]">
          grams / day
        </p>
        <p className="max-w-[14rem] text-center text-[11px] text-[#64748b]">
          At 4 kcal per gram of carbohydrate.
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Enter your calorie target and carb percentage.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
