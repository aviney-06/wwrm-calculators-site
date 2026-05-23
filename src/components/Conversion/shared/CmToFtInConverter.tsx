"use client";

import { useRef, useState } from "react";
import { btnCalculate, numberFieldClass } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import { cmToFtIn, type CmToFtInResult } from "@/components/Conversion/shared/conversionUtils";

type Props = {
  defaultValue?: string;
  emptyHint: string;
};

export function CmToFtInConverter({
  defaultValue = "170",
  emptyHint,
}: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CmToFtInResult | null>(null);

  const run = () => {
    setError(null);
    const trimmed = value.trim();
    if (trimmed === "") {
      setError("Enter a height in centimeters.");
      setResult(null);
      return;
    }
    const n = Number(trimmed);
    if (!Number.isFinite(n) || n < 0) {
      setError("Enter a valid height in cm.");
      setResult(null);
      return;
    }
    setResult(cmToFtIn(n));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="height-cm"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Height
        </label>
        <div className="flex items-center gap-2">
          <input
            id="height-cm"
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`${numberFieldClass} w-full font-mono`}
          />
          <span className="shrink-0 text-[14px] text-[#64748b]">cm</span>
        </div>
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
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">Height</p>
        <p className="mt-1 text-3xl font-semibold text-[#d66844] sm:text-4xl">
          {result.feet}
          <span className="ml-1 text-[20px] font-medium text-[#334155] sm:text-[22px]">
            ft
          </span>
          <span className="mx-2 text-[#94a3b8]">·</span>
          {formatNum(result.inches, 1)}
          <span className="ml-1 text-[20px] font-medium text-[#334155] sm:text-[22px]">
            in
          </span>
        </p>
        <p className="mt-3 text-[12px] text-[#94a3b8] sm:text-[13px]">
          {formatNum(Number(value), 1)} cm ≈{" "}
          {formatNum(result.totalInches, 2)} in total
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
          Conversions use standard factors. For critical measurements, confirm
          with an authoritative source.
        </p>
      }
    />
  );
}
