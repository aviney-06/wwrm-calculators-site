"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
  CalculatorResultRow,
} from "@/components/shared/calculatorFields";

export function Square_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [side, setSide] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ area: string; perimeter: string; diagonal: string } | null>(
    null,
  );

  const run = () => {
    setError(null);
    const s = Number.parseFloat(side);
    if (!Number.isFinite(s) || s <= 0) {
      setError("Enter a positive side length.");
      setOut(null);
      return;
    }
    setOut({
      area: formatNum(s * s),
      perimeter: formatNum(4 * s),
      diagonal: formatNum(s * Math.SQRT2),
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="square-side"
        label="Side length"
        min={0}
        step="any"
        value={side}
        onChange={(e) => setSide(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate square
      </button>
    </div>
  );

  const result = out ? (
    <dl className="w-full max-w-md">
      <CalculatorResultRow label="Area" value={out.area} />
      <CalculatorResultRow label="Perimeter" value={out.perimeter} />
      <CalculatorResultRow label="Diagonal" value={out.diagonal} />
    </dl>
  ) : (
    <CalculatorEmptyResult>Enter side length for area, perimeter, and diagonal.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Area = s², perimeter = 4s, diagonal = s√2. Use consistent units.
        </p>
      }
    />
  );
}
