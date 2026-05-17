"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import {
  arabicToRoman,
  romanToArabic,
} from "@/components/Conversion/shared/conversionUtils";

type Mode = "toRoman" | "toArabic";

type Props = {
  emptyHint: string;
};

export function RomanNumeralConverter({ emptyHint }: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("toRoman");
  const [value, setValue] = useState("2024");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const trimmed = value.trim();
    if (trimmed === "") {
      setError("Enter a number or Roman numeral.");
      setResult(null);
      return;
    }

    if (mode === "toRoman") {
      const n = Number(trimmed);
      if (!Number.isFinite(n) || !Number.isInteger(n)) {
        setError("Enter a whole number from 1 to 3999.");
        setResult(null);
        return;
      }
      const roman = arabicToRoman(n);
      if (roman == null) {
        setError("Enter a whole number from 1 to 3999.");
        setResult(null);
        return;
      }
      setResult(roman);
    } else {
      const arabic = romanToArabic(trimmed);
      if (arabic == null) {
        setError("Enter a valid Roman numeral (I, V, X, L, C, D, M).");
        setResult(null);
        return;
      }
      setResult(String(arabic));
    }
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Direction
        </p>
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#334155] sm:text-[15px]">
            <input
              type="radio"
              name="roman-mode"
              checked={mode === "toRoman"}
              onChange={() => setMode("toRoman")}
              className="h-3.5 w-3.5 accent-[#2374ac]"
            />
            Number → Roman
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#334155] sm:text-[15px]">
            <input
              type="radio"
              name="roman-mode"
              checked={mode === "toArabic"}
              onChange={() => setMode("toArabic")}
              className="h-3.5 w-3.5 accent-[#2374ac]"
            />
            Roman → Number
          </label>
        </div>
      </div>
      <div>
        <label
          htmlFor="roman-input"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          {mode === "toRoman" ? "Arabic number" : "Roman numeral"}
        </label>
        <input
          id="roman-input"
          type="text"
          inputMode={mode === "toRoman" ? "numeric" : "text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={mode === "toRoman" ? "2024" : "MMXXIV"}
          className={`${fieldBase} w-full font-mono uppercase`}
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
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">
          {mode === "toRoman" ? "Roman numeral" : "Arabic number"}
        </p>
        <p className="mt-1 font-mono text-3xl font-semibold text-[#d66844] sm:text-4xl">
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
          Standard subtractive Roman numerals from 1 to 3999.
        </p>
      }
    />
  );
}
