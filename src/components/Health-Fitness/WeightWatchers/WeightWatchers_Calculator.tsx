"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { InputWithSuffix } from "../shared/InputWithSuffix";
import { FormError } from "../shared/StandardFormRows";

/** PointsPlus-style approximation (not official WW / WPP). */
function ppApprox(
  protein: number,
  carbs: number,
  fat: number,
  fiber: number,
) {
  const f = Math.min(fiber, 4);
  const raw =
    protein / 10.936 + carbs / 9.2105 + fat / 13.017 - f / 12.15;
  return Math.max(0, Math.round(raw));
}

export function WeightWatchers_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [p, setP] = useState("");
  const [c, setC] = useState("");
  const [f, setF] = useState("");
  const [fiber, setFiber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pts, setPts] = useState<number | null>(null);

  const run = () => {
    setError(null);
    const protein = parseFloat(p);
    const carbs = parseFloat(c);
    const fat = parseFloat(f);
    const fib = parseFloat(fiber) || 0;
    if (
      [protein, carbs, fat].some((x) => Number.isNaN(x) || x < 0) ||
      fib < 0
    ) {
      setError("Enter non-negative grams for macros and fiber.");
      setPts(null);
      return;
    }
    setPts(ppApprox(protein, carbs, fat, fib));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[11px] leading-snug text-[#64748b]">
        Unofficial PointsPlus-style estimate from one meal or one day of
        macros — not affiliated with WW.
      </p>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <p className="mb-1 text-[12px] font-medium text-[#334155]">Protein</p>
          <InputWithSuffix
            type="number"
            min={0}
            value={p}
            onChange={(e) => setP(e.target.value)}
            suffix="g"
            inputClassName="w-full max-w-[7rem]"
          />
        </div>
        <div>
          <p className="mb-1 text-[12px] font-medium text-[#334155]">Carbs</p>
          <InputWithSuffix
            type="number"
            min={0}
            value={c}
            onChange={(e) => setC(e.target.value)}
            suffix="g"
            inputClassName="w-full max-w-[7rem]"
          />
        </div>
        <div>
          <p className="mb-1 text-[12px] font-medium text-[#334155]">Fat</p>
          <InputWithSuffix
            type="number"
            min={0}
            value={f}
            onChange={(e) => setF(e.target.value)}
            suffix="g"
            inputClassName="w-full max-w-[7rem]"
          />
        </div>
        <div>
          <p className="mb-1 text-[12px] font-medium text-[#334155]">Fiber</p>
          <InputWithSuffix
            type="number"
            min={0}
            value={fiber}
            onChange={(e) => setFiber(e.target.value)}
            suffix="g"
            inputClassName="w-full max-w-[7rem]"
          />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Estimate points
      </button>
    </div>
  );

  const result =
    pts != null ? (
      <>
        <p className="text-center text-3xl font-bold text-[#d66844]">{pts}</p>
        <p className="text-center text-[14px] font-medium text-[#334155]">
          points (approx.)
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Enter macros for a meal or daily total.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
