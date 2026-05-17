"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  conversionFunctions,
  type ConversionKey,
} from "@/components/Conversion/shared/conversionUtils";

type Props = {
  fromLabel: string;
  toLabel: string;
  fromUnit: string;
  toUnit: string;
  defaultValue: string;
  decimals?: number;
  converterKey: ConversionKey;
  emptyHint: string;
};

export function UnitConverter({
  fromLabel,
  toLabel,
  fromUnit,
  toUnit,
  defaultValue,
  decimals = 4,
  converterKey,
  emptyHint,
}: Props) {
  const convert = conversionFunctions[converterKey];
  const resultRef = useRef<HTMLElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const trimmed = value.trim();
    if (trimmed === "") {
      setError(`Enter a value in ${fromUnit}.`);
      setResult(null);
      return;
    }
    const n = Number(trimmed);
    if (!Number.isFinite(n)) {
      setError("Enter a valid number.");
      setResult(null);
      return;
    }
    const converted = convert(n);
    setResult(formatNum(converted, decimals));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="conversion-from"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          {fromLabel}
        </label>
        <InputWithSuffix
          id="conversion-from"
          type="number"
          inputMode="decimal"
          step="any"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          suffix={fromUnit}
          className="w-full min-w-0"
          inputClassName="w-full"
        />
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
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">{toLabel}</p>
        <p className="mt-1 font-semibold text-[#d66844] text-3xl sm:text-4xl">
          {result}
          <span className="ml-1.5 text-[18px] font-medium text-[#334155] sm:text-[20px]">
            {toUnit}
          </span>
        </p>
        <p className="mt-3 text-[12px] text-[#94a3b8] sm:text-[13px]">
          {formatNum(Number(value), decimals)} {fromUnit} → {result} {toUnit}
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
