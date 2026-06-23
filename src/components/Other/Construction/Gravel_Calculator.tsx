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

// Typical dry gravel density ~ 1.4 US tons per cubic yard.
const TONS_PER_CUBIC_YARD = 1.4;

export function Gravel_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("3");
  const [lwUnit, setLwUnit] = useState<LengthUnit>("ft");
  const [depthUnit, setDepthUnit] = useState<LengthUnit>("in");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    cubicYards: number;
    cubicFeet: number;
    tons: number;
    cost: string | null;
  } | null>(null);

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
    const cubicYards = cubicFeet / CUBIC_FEET_PER_CUBIC_YARD;
    const tons = cubicYards * TONS_PER_CUBIC_YARD;
    let cost: string | null = null;
    if (price.trim() !== "") {
      const p = Number(price);
      if (Number.isFinite(p) && p >= 0) cost = `$${(tons * p).toFixed(2)}`;
    }
    setResult({ cubicYards, cubicFeet, tons, cost });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-5">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="gv-l" className={calcLabelClass}>
            Length
          </label>
          <input
            id="gv-l"
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
          <label htmlFor="gv-w" className={calcLabelClass}>
            Width
          </label>
          <input
            id="gv-w"
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
        <label htmlFor="gv-lwunit" className={calcLabelClass}>
          Length &amp; width units
        </label>
        <select
          id="gv-lwunit"
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
          <label htmlFor="gv-d" className={calcLabelClass}>
            Depth
          </label>
          <input
            id="gv-d"
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
          <label htmlFor="gv-dunit" className={calcLabelClass}>
            Depth units
          </label>
          <select
            id="gv-dunit"
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
      <div>
        <label htmlFor="gv-price" className={calcLabelClass}>
          Price per ton
          <span className="font-normal text-[#94a3b8]"> (optional)</span>
        </label>
        <input
          id="gv-price"
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          value={price}
          placeholder="$/ton"
          onChange={(e) => setPrice(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate gravel needed
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Gravel needed</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {fmt(result.tons)} tons
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Cubic yards" value={`${fmt(result.cubicYards)} yd³`} />
        <CalculatorResultRow label="Cubic feet" value={`${fmt(result.cubicFeet)} ft³`} />
        {result.cost ? <CalculatorResultRow label="Estimated cost" value={result.cost} /> : null}
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter the area and depth to estimate gravel.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Weight assumes ~1.4 US tons per cubic yard of dry gravel; actual density varies by material.
        </p>
      }
    />
  );
}
