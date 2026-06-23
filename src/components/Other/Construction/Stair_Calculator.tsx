"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import {
  CalculatorEmptyResult,
  CalculatorResultRow,
  calcLabelClass,
} from "@/components/shared/calculatorFields";
import { fmt } from "@/components/Other/shared/measureUtils";

export function Stair_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [totalRise, setTotalRise] = useState("108");
  const [steps, setSteps] = useState("15");
  const [tread, setTread] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    riser: number;
    totalRun: number;
    stringer: number;
    angle: number;
  } | null>(null);

  const run = () => {
    setError(null);
    const rise = Number(totalRise);
    const n = Number(steps);
    const t = Number(tread);
    if (!Number.isFinite(rise) || rise <= 0) {
      setError("Enter a positive total rise (in inches).");
      setResult(null);
      return;
    }
    if (!Number.isInteger(n) || n < 2) {
      setError("Enter the number of steps (2 or more).");
      setResult(null);
      return;
    }
    if (!Number.isFinite(t) || t <= 0) {
      setError("Enter a positive tread depth (in inches).");
      setResult(null);
      return;
    }
    const riser = rise / n;
    const totalRun = (n - 1) * t;
    const stringer = Math.sqrt(rise * rise + totalRun * totalRun);
    const angle = (Math.atan(rise / totalRun) * 180) / Math.PI;
    setResult({
      riser: Math.round(riser * 100) / 100,
      totalRun: Math.round(totalRun * 100) / 100,
      stringer: Math.round(stringer * 100) / 100,
      angle: Math.round(angle * 100) / 100,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-5">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        Total rise is the floor-to-floor height. All dimensions in inches.
      </p>
      <div>
        <label htmlFor="st-rise" className={calcLabelClass}>
          Total rise (in)
        </label>
        <input
          id="st-rise"
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          value={totalRise}
          onChange={(e) => setTotalRise(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="st-steps" className={calcLabelClass}>
            Number of steps
          </label>
          <input
            id="st-steps"
            type="number"
            min={2}
            inputMode="numeric"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
        <div>
          <label htmlFor="st-tread" className={calcLabelClass}>
            Tread depth (in)
          </label>
          <input
            id="st-tread"
            type="number"
            min={0}
            step="any"
            inputMode="decimal"
            value={tread}
            onChange={(e) => setTread(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate stairs
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Riser height</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {fmt(result.riser)} in
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Total run" value={`${fmt(result.totalRun)} in`} />
        <CalculatorResultRow label="Stringer length" value={`${fmt(result.stringer)} in`} />
        <CalculatorResultRow label="Stair angle" value={`${fmt(result.angle)}°`} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter total rise and steps to size the stairs.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          A comfortable riser is roughly 7–7.75 in. Always check your local building code.
        </p>
      }
    />
  );
}
