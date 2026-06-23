"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { numberToWords } from "@/components/Conversion/shared/conversionUtils";

type Props = {
  emptyHint: string;
};

export function NumberToWordsConverter({ emptyHint }: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [value, setValue] = useState("1234");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const trimmed = value.trim();
    if (trimmed === "") {
      setError("Enter a number to convert.");
      setResult(null);
      return;
    }
    const n = Number(trimmed);
    if (!Number.isFinite(n)) {
      setError("Enter a valid number.");
      setResult(null);
      return;
    }
    const words = numberToWords(n);
    if (words == null) {
      setError("Enter a number below 1 quintillion.");
      setResult(null);
      return;
    }
    setResult(words);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="number-to-words-input"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Number
        </label>
        <input
          id="number-to-words-input"
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="1234"
          className={`${fieldBase} w-full font-mono`}
        />
        <p className="mt-1 text-[11px] text-[#94a3b8] sm:text-[12px]">
          Whole numbers and decimals are supported (e.g. 1234.5).
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
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">In words</p>
        <p className="mt-1 text-xl font-semibold leading-snug text-[#d66844] sm:text-2xl">
          {result}
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
          Uses the US short-scale naming (thousand, million, billion, …).
        </p>
      }
    />
  );
}
