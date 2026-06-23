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
  dayBreakdown,
  parseDateInput,
  todayInput,
  type DayBreakdown,
} from "@/components/Other/shared/dateTimeUtils";

export function DayCounter_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [from, setFrom] = useState(todayInput());
  const [to, setTo] = useState(todayInput());
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DayBreakdown | null>(null);

  const run = () => {
    setError(null);
    const a = parseDateInput(from);
    const b = parseDateInput(to);
    if (!a || !b) {
      setError("Enter two valid dates.");
      setResult(null);
      return;
    }
    setResult(dayBreakdown(a, b));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        Counts every day in the range, including both the start and end date.
      </p>
      <div>
        <label htmlFor="dc-from" className={calcLabelClass}>
          From
        </label>
        <input
          id="dc-from"
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <div>
        <label htmlFor="dc-to" className={calcLabelClass}>
          To
        </label>
        <input
          id="dc-to"
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Count days
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Total days</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {result.totalDays.toLocaleString()}
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Weekdays (Mon–Fri)" value={result.weekdays.toLocaleString()} />
        <CalculatorResultRow label="Weekend days" value={result.weekendDays.toLocaleString()} />
        <CalculatorResultRow
          label="Full weeks + days"
          value={`${result.weeks} weeks ${result.remainderDays} days`}
        />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Pick a date range to count the days.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
