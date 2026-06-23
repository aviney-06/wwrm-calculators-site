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

export function BoardFoot_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [thickness, setThickness] = useState("2");
  const [width, setWidth] = useState("6");
  const [length, setLength] = useState("8");
  const [quantity, setQuantity] = useState("1");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ boardFeet: number; cost: string | null } | null>(null);

  const run = () => {
    setError(null);
    const t = Number(thickness);
    const w = Number(width);
    const l = Number(length);
    const q = Number(quantity || "1");
    if (![t, w, l].every((n) => Number.isFinite(n) && n > 0) || !Number.isFinite(q) || q <= 0) {
      setError("Enter positive thickness, width, length, and quantity.");
      setResult(null);
      return;
    }
    const boardFeet = ((t * w * l) / 12) * q;
    let cost: string | null = null;
    if (price.trim() !== "") {
      const p = Number(price);
      if (Number.isFinite(p) && p >= 0) cost = `$${(boardFeet * p).toFixed(2)}`;
    }
    setResult({ boardFeet, cost });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-5">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="bf-t" className={calcLabelClass}>
            Thickness (in)
          </label>
          <input
            id="bf-t"
            type="number"
            min={0}
            step="any"
            inputMode="decimal"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
        <div>
          <label htmlFor="bf-w" className={calcLabelClass}>
            Width (in)
          </label>
          <input
            id="bf-w"
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
          <label htmlFor="bf-l" className={calcLabelClass}>
            Length (ft)
          </label>
          <input
            id="bf-l"
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
          <label htmlFor="bf-q" className={calcLabelClass}>
            Number of boards
          </label>
          <input
            id="bf-q"
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
        <label htmlFor="bf-price" className={calcLabelClass}>
          Price per board foot
          <span className="font-normal text-[#94a3b8]"> (optional)</span>
        </label>
        <input
          id="bf-price"
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          value={price}
          placeholder="$/bd ft"
          onChange={(e) => setPrice(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate board feet
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Total board feet</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {fmt(result.boardFeet)} BF
      </p>
      {result.cost ? (
        <dl className="mt-4 w-full">
          <CalculatorResultRow label="Estimated cost" value={result.cost} />
        </dl>
      ) : null}
    </div>
  ) : (
    <CalculatorEmptyResult>Enter board dimensions to calculate board feet.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          1 board foot = 144 cubic inches (thickness × width in inches × length in feet ÷ 12).
        </p>
      }
    />
  );
}
