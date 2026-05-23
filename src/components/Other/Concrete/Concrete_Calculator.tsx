"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { concreteCubicYards } from "@/components/Other/shared/otherCalcUtils";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
} from "@/components/shared/calculatorFields";

export function Concrete_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("4");
  const [error, setError] = useState<string | null>(null);
  const [yards, setYards] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const l = Number.parseFloat(length);
    const wd = Number.parseFloat(width);
    const d = Number.parseFloat(depth);
    if (![l, wd, d].every((n) => Number.isFinite(n) && n > 0)) {
      setError("Enter positive length, width, and depth.");
      setYards(null);
      return;
    }
    setYards(formatNum(concreteCubicYards(l, wd, d), 2));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="concrete-length"
        label="Length"
        suffix="ft"
        min={0}
        step="any"
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />
      <CalculatorNumberField
        id="concrete-width"
        label="Width"
        suffix="ft"
        min={0}
        step="any"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
      />
      <CalculatorNumberField
        id="concrete-depth"
        label="Depth"
        suffix="in"
        min={0}
        step="any"
        value={depth}
        onChange={(e) => setDepth(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate concrete
      </button>
    </div>
  );

  const result = yards ? (
    <div className="text-center">
      <p className="text-3xl font-bold text-[#d66844]">{yards}</p>
      <p className="mt-2 text-[14px] text-[#334155]">cubic yards</p>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter slab dimensions for volume in cubic yards.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Volume = length × width × (depth ÷ 12), converted to cubic yards. Add ~10% for waste.
        </p>
      }
    />
  );
}
