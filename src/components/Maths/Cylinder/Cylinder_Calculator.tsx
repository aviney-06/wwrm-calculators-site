"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorResultRow,
  calcLabelClass,
} from "@/components/shared/calculatorFields";

export function Cylinder_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [radius, setRadius] = useState("4");
  const [height, setHeight] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    volume: string;
    baseArea: string;
    lateral: string;
    total: string;
  } | null>(null);

  const run = () => {
    setError(null);
    const r = parseFloat(radius);
    const h = parseFloat(height);
    if (![r, h].every((n) => Number.isFinite(n) && n > 0)) {
      setError("Enter a positive radius and height.");
      setResult(null);
      return;
    }
    const baseArea = Math.PI * r * r;
    const lateral = 2 * Math.PI * r * h;
    setResult({
      volume: formatNum(baseArea * h),
      baseArea: formatNum(baseArea),
      lateral: formatNum(lateral),
      total: formatNum(2 * baseArea + lateral),
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div>
          <label htmlFor="cyl-r" className={calcLabelClass}>
            Radius
          </label>
          <input
            id="cyl-r"
            type="number"
            min={0}
            step="any"
            inputMode="decimal"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
        <div>
          <label htmlFor="cyl-h" className={calcLabelClass}>
            Height
          </label>
          <input
            id="cyl-h"
            type="number"
            min={0}
            step="any"
            inputMode="decimal"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate cylinder
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Volume</p>
      <p className="mt-1 text-center text-3xl font-bold text-[#d66844] sm:text-4xl">
        {result.volume}
      </p>
      <p className="text-center text-[12px] text-[#94a3b8]">cubic units</p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Base area (πr²)" value={`${result.baseArea} sq units`} />
        <CalculatorResultRow label="Lateral surface area (2πrh)" value={`${result.lateral} sq units`} />
        <CalculatorResultRow label="Total surface area" value={`${result.total} sq units`} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>V = πr²h · Surface = 2πr(r + h)</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
