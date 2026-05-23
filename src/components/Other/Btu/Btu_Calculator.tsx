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
  calcHintClass,
} from "@/components/shared/calculatorFields";

export function Btu_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [sqft, setSqft] = useState("400");
  const [ceiling, setCeiling] = useState("8");
  const [error, setError] = useState<string | null>(null);
  const [btu, setBtu] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const area = Number.parseFloat(sqft);
    const h = Number.parseFloat(ceiling);
    if (!Number.isFinite(area) || area <= 0 || !Number.isFinite(h) || h <= 0) {
      setError("Enter positive square footage and ceiling height.");
      setBtu(null);
      return;
    }
    const volume = area * h;
    const estimate = volume * 20;
    setBtu(formatNum(estimate, 0));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className={calcHintClass}>
        Rough cooling estimate: volume × 20 BTU (varies by climate and insulation).
      </p>
      <CalculatorNumberField
        id="btu-sqft"
        label="Square feet"
        suffix="sq ft"
        min={0}
        step="any"
        value={sqft}
        onChange={(e) => setSqft(e.target.value)}
      />
      <CalculatorNumberField
        id="btu-ceiling"
        label="Ceiling height"
        suffix="ft"
        min={0}
        step="any"
        value={ceiling}
        onChange={(e) => setCeiling(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Estimate BTU
      </button>
    </div>
  );

  const result = btu ? (
    <div className="text-center">
      <p className="text-4xl font-bold text-[#d66844]">{btu}</p>
      <p className="mt-2 text-[14px] text-[#334155]">BTU / hour (estimate)</p>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter room size for an HVAC BTU estimate.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Rule of thumb only — consult an HVAC professional for sizing.
        </p>
      }
    />
  );
}
