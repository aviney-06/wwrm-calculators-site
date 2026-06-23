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
  GALLONS_PER_CUBIC_FOOT,
  LENGTH_UNIT_OPTIONS,
  toFeet,
  type LengthUnit,
} from "@/components/Other/shared/measureUtils";

export function CubicFeet_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("8");
  const [height, setHeight] = useState("6");
  const [unit, setUnit] = useState<LengthUnit>("ft");
  const [quantity, setQuantity] = useState("1");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    cubicFeet: number;
    cubicYards: number;
    gallons: number;
  } | null>(null);

  const run = () => {
    setError(null);
    const l = Number(length);
    const w = Number(width);
    const h = Number(height);
    const q = Number(quantity || "1");
    if (![l, w, h].every((n) => Number.isFinite(n) && n > 0) || !Number.isFinite(q) || q <= 0) {
      setError("Enter positive length, width, height, and quantity.");
      setResult(null);
      return;
    }
    const cubicFeet = toFeet(l, unit) * toFeet(w, unit) * toFeet(h, unit) * q;
    setResult({
      cubicFeet,
      cubicYards: cubicFeet / CUBIC_FEET_PER_CUBIC_YARD,
      gallons: cubicFeet * GALLONS_PER_CUBIC_FOOT,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-5">
      <div className="grid grid-cols-3 gap-2">
        {[
          ["cf-l", "Length", length, setLength] as const,
          ["cf-w", "Width", width, setWidth] as const,
          ["cf-h", "Height", height, setHeight] as const,
        ].map(([id, label, val, setter]) => (
          <div key={id}>
            <label htmlFor={id} className={calcLabelClass}>
              {label}
            </label>
            <input
              id={id}
              type="number"
              min={0}
              step="any"
              inputMode="decimal"
              value={val}
              onChange={(e) => setter(e.target.value)}
              className={`${fieldBase} w-full`}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="cf-unit" className={calcLabelClass}>
            Units
          </label>
          <select
            id="cf-unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as LengthUnit)}
            className={`${fieldBase} w-full`}
          >
            {LENGTH_UNIT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-qty" className={calcLabelClass}>
            Quantity
          </label>
          <input
            id="cf-qty"
            type="number"
            min={1}
            inputMode="numeric"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate cubic feet
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Volume</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {fmt(result.cubicFeet)} ft³
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Cubic yards" value={`${fmt(result.cubicYards)} yd³`} />
        <CalculatorResultRow label="US gallons" value={fmt(result.gallons)} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter dimensions to calculate volume.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
