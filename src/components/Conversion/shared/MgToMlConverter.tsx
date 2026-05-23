"use client";

import { useRef, useState } from "react";
import { btnCalculate, numberFieldClass } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import { mgToMl } from "@/components/Conversion/shared/conversionUtils";

type Props = {
  emptyHint: string;
};

export function MgToMlConverter({ emptyHint }: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [mg, setMg] = useState("500");
  const [density, setDensity] = useState("1000");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const mass = Number(mg.trim());
    const d = Number(density.trim());
    if (!Number.isFinite(mass) || mass < 0) {
      setError("Enter a valid mass in mg.");
      setResult(null);
      return;
    }
    if (!Number.isFinite(d) || d <= 0) {
      setError("Enter a valid density (mg/ml) greater than 0.");
      setResult(null);
      return;
    }
    const ml = mgToMl(mass, d);
    if (ml == null) {
      setError("Could not convert with the given density.");
      setResult(null);
      return;
    }
    setResult(formatNum(ml, 4));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="mg-value"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Milligrams (mg)
        </label>
        <input
          id="mg-value"
          type="number"
          min={0}
          step="any"
          value={mg}
          onChange={(e) => setMg(e.target.value)}
          className={`${numberFieldClass} w-full font-mono`}
        />
      </div>
      <div>
        <label
          htmlFor="mg-density"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Density (mg/ml)
        </label>
        <input
          id="mg-density"
          type="number"
          min={0.001}
          step="any"
          value={density}
          onChange={(e) => setDensity(e.target.value)}
          className={`${numberFieldClass} w-full max-w-[8rem] font-mono`}
        />
        <p className="mt-1 text-[11px] text-[#94a3b8] sm:text-[12px]">
          Water ≈ 1000 mg/ml. Adjust for other liquids or solutions.
        </p>
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
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">Milliliters</p>
        <p className="mt-1 text-3xl font-semibold text-[#d66844] sm:text-4xl">
          {result}
          <span className="ml-1.5 text-[18px] font-medium text-[#334155] sm:text-[20px]">
            ml
          </span>
        </p>
        <p className="mt-3 text-[12px] text-[#94a3b8] sm:text-[13px]">
          {mg} mg at {density} mg/ml
        </p>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        {emptyHint}
      </p>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Mass to volume requires density. Default assumes water-like density.
        </p>
      }
    />
  );
}
