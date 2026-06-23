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

export function RoofPitch_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [rise, setRise] = useState("6");
  const [run, setRunValue] = useState("12");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    pitch: string;
    angle: number;
    percentage: number;
    slopeFactor: number;
  } | null>(null);

  const calculate = () => {
    setError(null);
    const r = Number(rise);
    const run_ = Number(run);
    if (!Number.isFinite(r) || r < 0 || !Number.isFinite(run_) || run_ <= 0) {
      setError("Enter a valid rise and a positive run.");
      setResult(null);
      return;
    }
    const ratioPer12 = (r / run_) * 12;
    const angle = (Math.atan(r / run_) * 180) / Math.PI;
    const slopeFactor = Math.sqrt(r * r + run_ * run_) / run_;
    setResult({
      pitch: `${Math.round(ratioPer12 * 100) / 100}:12`,
      angle: Math.round(angle * 100) / 100,
      percentage: Math.round((r / run_) * 10000) / 100,
      slopeFactor: Math.round(slopeFactor * 1000) / 1000,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-5">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        Enter the vertical rise and horizontal run (same units). Run defaults to 12 for the
        standard “x in 12” pitch.
      </p>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="rp-rise" className={calcLabelClass}>
            Rise
          </label>
          <input
            id="rp-rise"
            type="number"
            min={0}
            step="any"
            inputMode="decimal"
            value={rise}
            onChange={(e) => setRise(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
        <div>
          <label htmlFor="rp-run" className={calcLabelClass}>
            Run
          </label>
          <input
            id="rp-run"
            type="number"
            min={0}
            step="any"
            inputMode="decimal"
            value={run}
            onChange={(e) => setRunValue(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={calculate}>
        Calculate roof pitch
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Roof pitch</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {result.pitch}
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Angle" value={`${fmt(result.angle)}°`} />
        <CalculatorResultRow label="Grade" value={`${fmt(result.percentage)}%`} />
        <CalculatorResultRow label="Slope factor" value={String(result.slopeFactor)} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter rise and run to find the pitch.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          The slope factor multiplies the flat (plan) area to estimate the actual sloped roof area.
        </p>
      }
    />
  );
}
