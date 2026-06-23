"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import {
  CalculatorEmptyResult,
  CalculatorResultRow,
  calcLabelClass,
} from "@/components/shared/calculatorFields";
import {
  calcAge,
  parseDateInput,
  todayInput,
  type AgeResult,
} from "@/components/Other/shared/dateTimeUtils";

export function Age_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [birth, setBirth] = useState("2000-01-01");
  const [asOf, setAsOf] = useState(todayInput());
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AgeResult | null>(null);

  const run = () => {
    setError(null);
    const b = parseDateInput(birth);
    const a = parseDateInput(asOf);
    if (!b || !a) {
      setError("Enter a valid date of birth and target date.");
      setResult(null);
      return;
    }
    if (b.getTime() > a.getTime()) {
      setError("The date of birth must be on or before the target date.");
      setResult(null);
      return;
    }
    setResult(calcAge(b, a));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label htmlFor="age-birth" className={calcLabelClass}>
          Date of birth
        </label>
        <input
          id="age-birth"
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <div>
        <label htmlFor="age-asof" className={calcLabelClass}>
          Age at the date of
        </label>
        <input
          id="age-asof"
          type="date"
          value={asOf}
          onChange={(e) => setAsOf(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate age
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Age</p>
      <p className="mt-1 text-center text-2xl font-semibold text-[#d66844] sm:text-3xl">
        {result.years} yr {result.months} mo {result.days} d
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Total months" value={result.totalMonths.toLocaleString()} />
        <CalculatorResultRow label="Total weeks" value={result.totalWeeks.toLocaleString()} />
        <CalculatorResultRow label="Total days" value={result.totalDays.toLocaleString()} />
        <CalculatorResultRow label="Total hours" value={result.totalHours.toLocaleString()} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter a birth date to calculate age.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
