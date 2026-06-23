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
import {
  CUBIC_FEET_PER_CUBIC_YARD,
  fmt,
  LENGTH_UNIT_OPTIONS,
  toFeet,
  type LengthUnit,
} from "@/components/Other/shared/measureUtils";

export function CubicYards_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("4");
  const [lwUnit, setLwUnit] = useState<LengthUnit>("ft");
  const [depthUnit, setDepthUnit] = useState<LengthUnit>("in");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ cubicYards: number; cubicFeet: number } | null>(null);

  const run = () => {
    setError(null);
    const l = Number(length);
    const w = Number(width);
    const d = Number(depth);
    if (![l, w, d].every((n) => Number.isFinite(n) && n > 0)) {
      setError("Enter positive length, width, and depth.");
      setResult(null);
      return;
    }
    const cubicFeet = toFeet(l, lwUnit) * toFeet(w, lwUnit) * toFeet(d, depthUnit);
    setResult({ cubicFeet, cubicYards: cubicFeet / CUBIC_FEET_PER_CUBIC_YARD });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-5">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="cy-l" className={calcLabelClass}>
            Length
          </label>
          <input
            id="cy-l"
            type="number"
            min={0}
            step="any"
            inputMode="decimal"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
        <div>
          <label htmlFor="cy-w" className={calcLabelClass}>
            Width
          </label>
          <input
            id="cy-w"
            type="number"
            min={0}
            step="any"
            inputMode="decimal"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cy-lwunit" className={calcLabelClass}>
          Length &amp; width units
        </label>
        <select
          id="cy-lwunit"
          value={lwUnit}
          onChange={(e) => setLwUnit(e.target.value as LengthUnit)}
          className={`${fieldBase} w-full`}
        >
          {LENGTH_UNIT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="cy-d" className={calcLabelClass}>
            Depth
          </label>
          <input
            id="cy-d"
            type="number"
            min={0}
            step="any"
            inputMode="decimal"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
        <div>
          <label htmlFor="cy-dunit" className={calcLabelClass}>
            Depth units
          </label>
          <select
            id="cy-dunit"
            value={depthUnit}
            onChange={(e) => setDepthUnit(e.target.value as LengthUnit)}
            className={`${fieldBase} w-full`}
          >
            {LENGTH_UNIT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate cubic yards
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Volume</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {fmt(result.cubicYards)} yd³
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Cubic feet" value={`${fmt(result.cubicFeet)} ft³`} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter dimensions to calculate cubic yards.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
