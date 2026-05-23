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

export function RectangularPrism_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [l, setL] = useState("3");
  const [w, setW] = useState("4");
  const [h, setH] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ volume: string; surface: string } | null>(null);

  const run = () => {
    setError(null);
    const L = Number.parseFloat(l);
    const W = Number.parseFloat(w);
    const H = Number.parseFloat(h);
    if (![L, W, H].every((n) => Number.isFinite(n) && n > 0)) {
      setError("Enter positive length, width, and height.");
      setOut(null);
      return;
    }
    setOut({
      volume: formatNum(L * W * H),
      surface: formatNum(2 * (L * W + L * H + W * H)),
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="prism-length"
        label="Length"
        min={0}
        step="any"
        value={l}
        onChange={(e) => setL(e.target.value)}
      />
      <CalculatorNumberField
        id="prism-width"
        label="Width"
        min={0}
        step="any"
        value={w}
        onChange={(e) => setW(e.target.value)}
      />
      <CalculatorNumberField
        id="prism-height"
        label="Height"
        min={0}
        step="any"
        value={h}
        onChange={(e) => setH(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate prism
      </button>
    </div>
  );

  const result = out ? (
    <dl className="w-full max-w-md">
      <CalculatorResultRow label="Volume" value={out.volume} />
      <CalculatorResultRow label="Surface area" value={out.surface} />
    </dl>
  ) : (
    <CalculatorEmptyResult>Enter length, width, and height for volume and surface area.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Volume = l×w×h. Surface area = 2(lw + lh + wh). Use consistent units.
        </p>
      }
    />
  );
}
