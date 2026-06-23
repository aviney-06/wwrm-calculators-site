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
  formatDateLong,
  parseDateInput,
  todayInput,
  weekdayName,
} from "@/components/Other/shared/dateTimeUtils";

export function DayOfWeek_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [date, setDate] = useState(todayInput());
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    weekday: string;
    full: string;
    dayOfYear: number;
    week: number;
  } | null>(null);

  const run = () => {
    setError(null);
    const d = parseDateInput(date);
    if (!d) {
      setError("Enter a valid date.");
      setResult(null);
      return;
    }
    const startOfYear = new Date(d.getFullYear(), 0, 1);
    const dayOfYear =
      Math.floor((d.getTime() - startOfYear.getTime()) / 86_400_000) + 1;
    setResult({
      weekday: weekdayName(d),
      full: formatDateLong(d),
      dayOfYear,
      week: Math.ceil(dayOfYear / 7),
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label htmlFor="dow-date" className={calcLabelClass}>
          Date
        </label>
        <input
          id="dow-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Find day of week
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Day of the week</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {result.weekday}
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Date" value={result.full} />
        <CalculatorResultRow label="Day of year" value={String(result.dayOfYear)} />
        <CalculatorResultRow label="Week of year" value={String(result.week)} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Pick a date to find its weekday.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
