"use client";

import { useRef, useState } from "react";
import { btnCalculate, numberFieldClass } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { mlToGrams } from "@/components/Conversion/shared/conversionUtils";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import { CalculatorEmptyResult } from "@/components/shared/calculatorFields";

type Props = { emptyHint: string };

export function MlToGramsConverter({ emptyHint }: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [ml, setMl] = useState("250");
  const [density, setDensity] = useState("1");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const volume = Number(ml.trim());
    const d = Number(density.trim());
    if (!Number.isFinite(volume) || volume < 0) {
      setError("Enter a valid volume in ml.");
      setResult(null);
      return;
    }
    if (!Number.isFinite(d) || d <= 0) {
      setError("Enter a valid density (g/ml) greater than 0.");
      setResult(null);
      return;
    }
    const grams = mlToGrams(volume, d);
    if (grams == null) {
      setError("Could not convert with the given density.");
      setResult(null);
      return;
    }
    setResult(formatNum(grams, 4));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label htmlFor="ml-to-g-ml" className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Milliliters (ml)
        </label>
        <input
          id="ml-to-g-ml"
          type="number"
          min={0}
          step="any"
          value={ml}
          onChange={(e) => setMl(e.target.value)}
          className={`${numberFieldClass} w-full`}
        />
      </div>
      <div>
        <label htmlFor="ml-to-g-density" className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Density (g/ml)
        </label>
        <input
          id="ml-to-g-density"
          type="number"
          min={0.001}
          step="any"
          value={density}
          onChange={(e) => setDensity(e.target.value)}
          className={`${numberFieldClass} w-full max-w-[8rem]`}
        />
        <p className="mt-1 text-[11px] text-[#94a3b8] sm:text-[12px]">Water ≈ 1 g/ml.</p>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Convert
      </button>
    </div>
  );

  const resultPanel =
    result != null ? (
      <div className="text-center">
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">Grams</p>
        <p className="mt-1 text-3xl font-semibold text-[#d66844] sm:text-4xl">
          {result}
          <span className="ml-1.5 text-[18px] font-medium text-[#334155] sm:text-[20px]">g</span>
        </p>
      </div>
    ) : (
      <CalculatorEmptyResult>{emptyHint}</CalculatorEmptyResult>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px]">
          Volume to mass requires density. Default assumes water.
        </p>
      }
    />
  );
}
