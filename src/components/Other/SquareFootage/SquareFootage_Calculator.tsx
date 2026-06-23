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

type Unit = "ft" | "in" | "yd" | "m";

const TO_FEET: Record<Unit, number> = { ft: 1, in: 1 / 12, yd: 3, m: 3.280839895 };

export function SquareFootage_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [length, setLength] = useState("12");
  const [width, setWidth] = useState("10");
  const [unit, setUnit] = useState<Unit>("ft");
  const [quantity, setQuantity] = useState("1");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    sqft: number;
    sqm: number;
    sqyd: number;
    cost: string | null;
  } | null>(null);

  const run = () => {
    setError(null);
    const l = Number(length);
    const w = Number(width);
    const q = Number(quantity || "1");
    if (![l, w].every((n) => Number.isFinite(n) && n > 0) || !Number.isFinite(q) || q <= 0) {
      setError("Enter positive length, width, and quantity.");
      setResult(null);
      return;
    }
    const factor = TO_FEET[unit];
    const sqft = l * factor * (w * factor) * q;
    let cost: string | null = null;
    if (price.trim() !== "") {
      const p = Number(price);
      if (Number.isFinite(p) && p >= 0) cost = `$${(sqft * p).toFixed(2)}`;
    }
    setResult({
      sqft: Math.round(sqft * 100) / 100,
      sqm: Math.round(sqft * 0.09290304 * 100) / 100,
      sqyd: Math.round((sqft / 9) * 100) / 100,
      cost,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-5">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="sf-length" className={calcLabelClass}>
            Length
          </label>
          <input
            id="sf-length"
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
          <label htmlFor="sf-width" className={calcLabelClass}>
            Width
          </label>
          <input
            id="sf-width"
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
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="sf-unit" className={calcLabelClass}>
            Measured in
          </label>
          <select
            id="sf-unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
            className={`${fieldBase} w-full`}
          >
            <option value="ft">Feet</option>
            <option value="in">Inches</option>
            <option value="yd">Yards</option>
            <option value="m">Meters</option>
          </select>
        </div>
        <div>
          <label htmlFor="sf-qty" className={calcLabelClass}>
            Number of areas
          </label>
          <input
            id="sf-qty"
            type="number"
            min={1}
            inputMode="numeric"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="sf-price" className={calcLabelClass}>
          Price per sq ft
          <span className="font-normal text-[#94a3b8]"> (optional)</span>
        </label>
        <input
          id="sf-price"
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          value={price}
          placeholder="$/sq ft"
          onChange={(e) => setPrice(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate square footage
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Total area</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {result.sqft.toLocaleString()} ft²
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Square yards" value={`${result.sqyd.toLocaleString()} yd²`} />
        <CalculatorResultRow label="Square meters" value={`${result.sqm.toLocaleString()} m²`} />
        {result.cost ? <CalculatorResultRow label="Estimated cost" value={result.cost} /> : null}
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter dimensions to calculate area.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
