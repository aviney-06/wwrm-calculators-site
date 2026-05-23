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
} from "@/components/shared/calculatorFields";

export function Density_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [mass, setMass] = useState("100");
  const [volume, setVolume] = useState("50");
  const [error, setError] = useState<string | null>(null);
  const [density, setDensity] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const m = Number.parseFloat(mass);
    const v = Number.parseFloat(volume);
    if (!Number.isFinite(m) || m <= 0 || !Number.isFinite(v) || v <= 0) {
      setError("Enter positive mass and volume.");
      setDensity(null);
      return;
    }
    setDensity(formatNum(m / v));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">Density = mass ÷ volume</p>
      <CalculatorNumberField
        id="density-mass"
        label="Mass"
        min={0}
        step="any"
        value={mass}
        onChange={(e) => setMass(e.target.value)}
      />
      <CalculatorNumberField
        id="density-volume"
        label="Volume"
        min={0}
        step="any"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate density
      </button>
    </div>
  );

  const result = density ? (
    <div className="text-center">
      <p className="text-4xl font-semibold text-[#d66844]">{density}</p>
      <p className="mt-2 text-[14px] text-[#334155]">density (mass ÷ volume)</p>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter mass and volume to find density.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px]">
          Use consistent units for mass and volume (e.g. kg and m³).
        </p>
      }
    />
  );
}
