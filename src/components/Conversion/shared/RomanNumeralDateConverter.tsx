"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { arabicToRoman } from "@/components/Conversion/shared/conversionUtils";

type Props = {
  emptyHint: string;
};

export function RomanNumeralDateConverter({ emptyHint }: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [date, setDate] = useState("2024-01-01");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ roman: string; readable: string } | null>(
    null,
  );

  const run = () => {
    setError(null);
    const parts = date.split("-");
    if (parts.length !== 3) {
      setError("Pick a valid date.");
      setResult(null);
      return;
    }
    const [yearStr, monthStr, dayStr] = parts;
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);
    if (
      !Number.isInteger(year) ||
      !Number.isInteger(month) ||
      !Number.isInteger(day)
    ) {
      setError("Pick a valid date.");
      setResult(null);
      return;
    }
    if (year < 1 || year > 3999) {
      setError("Year must be between 1 and 3999 for Roman numerals.");
      setResult(null);
      return;
    }
    const dayRoman = arabicToRoman(day);
    const monthRoman = arabicToRoman(month);
    const yearRoman = arabicToRoman(year);
    if (!dayRoman || !monthRoman || !yearRoman) {
      setError("Could not convert this date to Roman numerals.");
      setResult(null);
      return;
    }
    setResult({
      roman: `${dayRoman} · ${monthRoman} · ${yearRoman}`,
      readable: `${day}/${month}/${year} (D · M · Y)`,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="roman-date-input"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Date
        </label>
        <input
          id="roman-date-input"
          type="date"
          min="0001-01-01"
          max="3999-12-31"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`${fieldBase} w-full font-mono`}
        />
        <p className="mt-1 text-[11px] text-[#94a3b8] sm:text-[12px]">
          Each part (day, month, year) is converted to Roman numerals.
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
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">
          Roman numeral date
        </p>
        <p className="mt-1 font-mono text-2xl font-semibold leading-snug text-[#d66844] sm:text-3xl">
          {result.roman}
        </p>
        <p className="mt-3 text-[12px] text-[#94a3b8] sm:text-[13px]">
          {result.readable}
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
          Standard subtractive Roman numerals. Years are limited to 1–3999.
        </p>
      }
    />
  );
}
