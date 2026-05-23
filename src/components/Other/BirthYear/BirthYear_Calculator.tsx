"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
} from "@/components/shared/calculatorFields";

export function BirthYear_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [year, setYear] = useState("1990");
  const [error, setError] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null);

  const run = () => {
    setError(null);
    const y = Number.parseInt(year, 10);
    const now = new Date().getFullYear();
    if (!Number.isFinite(y) || y < 1900 || y > now) {
      setError(`Enter a birth year between 1900 and ${now}.`);
      setAge(null);
      return;
    }
    setAge(now - y);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="birthyear-year"
        label="Birth year"
        min={1900}
        step={1}
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate age
      </button>
    </div>
  );

  const result =
    age != null ? (
      <div className="text-center">
        <p className="text-5xl font-bold text-[#d66844]">{age}</p>
        <p className="mt-2 text-[14px] text-[#334155]">years old (approx.)</p>
      </div>
    ) : (
      <CalculatorEmptyResult>Enter birth year for approximate age.</CalculatorEmptyResult>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Age = current year − birth year. Does not account for month or day of birth.
        </p>
      }
    />
  );
}
