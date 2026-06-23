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
  diffInDays,
  parseDateInput,
  todayInput,
} from "@/components/Other/shared/dateTimeUtils";

export function DaysBetween_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [from, setFrom] = useState(todayInput());
  const [to, setTo] = useState(todayInput());
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    days: number;
    weeks: string;
    breakdown: string;
  } | null>(null);

  const run = () => {
    setError(null);
    const a = parseDateInput(from);
    const b = parseDateInput(to);
    if (!a || !b) {
      setError("Enter two valid dates.");
      setResult(null);
      return;
    }
    const days = diffInDays(a, b);
    const age = calcAge(a, b);
    setResult({
      days,
      weeks: `${Math.floor(days / 7)} weeks ${days % 7} days`,
      breakdown: `${age.years} yr ${age.months} mo ${age.days} d`,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label htmlFor="db-from" className={calcLabelClass}>
          Start date
        </label>
        <input
          id="db-from"
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <div>
        <label htmlFor="db-to" className={calcLabelClass}>
          End date
        </label>
        <input
          id="db-to"
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Days between</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {result.days.toLocaleString()}
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="In weeks" value={result.weeks} />
        <CalculatorResultRow label="In years/months/days" value={result.breakdown} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Pick two dates to count the days between.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
