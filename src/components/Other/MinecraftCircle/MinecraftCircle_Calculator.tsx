"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { minecraftCirclePoints } from "@/components/Other/shared/otherCalcUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
} from "@/components/shared/calculatorFields";

export function MinecraftCircle_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [radius, setRadius] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);

  const run = () => {
    setError(null);
    const r = Number.parseInt(radius, 10);
    if (!Number.isFinite(r) || r < 1 || r > 50) {
      setError("Radius must be between 1 and 50.");
      setCount(null);
      return;
    }
    setCount(minecraftCirclePoints(r).length);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="minecraft-radius"
        label="Radius"
        suffix="blocks"
        min={1}
        max={50}
        step={1}
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Count blocks
      </button>
    </div>
  );

  const result =
    count != null ? (
      <div className="text-center">
        <p className="text-4xl font-bold text-[#d66844]">{count}</p>
        <p className="mt-2 text-[14px] text-[#334155]">blocks in filled circle</p>
      </div>
    ) : (
      <CalculatorEmptyResult>Enter radius (1–50) for block count in a filled circle.</CalculatorEmptyResult>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Uses a pixel-circle algorithm for block placement — counts filled blocks only.
        </p>
      }
    />
  );
}
