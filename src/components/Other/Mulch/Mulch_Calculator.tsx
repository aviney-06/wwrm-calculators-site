"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
  CalculatorResultRow,
} from "@/components/shared/calculatorFields";
import {
  CUBIC_FEET_PER_CUBIC_YARD,
  fmt,
} from "@/components/Other/shared/measureUtils";

// Standard bagged mulch is sold in 2 cubic foot bags.
const CUBIC_FEET_PER_BAG = 2;

export function Mulch_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("3");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    cubicYards: number;
    cubicFeet: number;
    bags: number;
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
    const cubicFeet = l * w * (d / 12);
    const cubicYards = cubicFeet / CUBIC_FEET_PER_CUBIC_YARD;
    const bags = Math.ceil(cubicFeet / CUBIC_FEET_PER_BAG);
    setResult({ cubicYards, cubicFeet, bags });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <CalculatorNumberField id="mulch-l" label="Length" suffix="ft" min={0} step="any" value={length} onChange={(e) => setLength(e.target.value)} />
        <CalculatorNumberField id="mulch-w" label="Width" suffix="ft" min={0} step="any" value={width} onChange={(e) => setWidth(e.target.value)} />
      </div>
      <CalculatorNumberField id="mulch-d" label="Depth" suffix="in" min={0} step="any" value={depth} onChange={(e) => setDepth(e.target.value)} />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate mulch needed
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Mulch needed</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {fmt(result.cubicYards)} yd³
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Cubic feet" value={`${fmt(result.cubicFeet)} ft³`} />
        <CalculatorResultRow label="2 ft³ bags" value={String(result.bags)} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter the area and depth to estimate mulch.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Bag count assumes 2 cubic foot bags and is rounded up. Bulk mulch is
          usually sold by the cubic yard.
        </p>
      }
    />
  );
}
