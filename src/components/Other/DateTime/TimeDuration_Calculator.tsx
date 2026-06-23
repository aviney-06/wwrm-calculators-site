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

function nowLocalInput(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export function TimeDuration_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [start, setStart] = useState(nowLocalInput());
  const [end, setEnd] = useState(nowLocalInput());
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    headline: string;
    totalHours: number;
    totalMinutes: number;
  } | null>(null);

  const run = () => {
    setError(null);
    const s = new Date(start);
    const e = new Date(end);
    if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) {
      setError("Enter a valid start and end date/time.");
      setResult(null);
      return;
    }
    const totalMin = Math.round(Math.abs(e.getTime() - s.getTime()) / 60000);
    const days = Math.floor(totalMin / (24 * 60));
    const hours = Math.floor((totalMin % (24 * 60)) / 60);
    const minutes = totalMin % 60;
    setResult({
      headline: `${days} d ${hours} h ${minutes} min`,
      totalHours: Math.round((totalMin / 60) * 100) / 100,
      totalMinutes: totalMin,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label htmlFor="td-start" className={calcLabelClass}>
          Start date &amp; time
        </label>
        <input
          id="td-start"
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <div>
        <label htmlFor="td-end" className={calcLabelClass}>
          End date &amp; time
        </label>
        <input
          id="td-end"
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate duration
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Duration</p>
      <p className="mt-1 text-center text-2xl font-semibold text-[#d66844] sm:text-3xl">
        {result.headline}
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Total hours" value={result.totalHours.toLocaleString()} />
        <CalculatorResultRow label="Total minutes" value={result.totalMinutes.toLocaleString()} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Pick a start and end to measure the duration.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
