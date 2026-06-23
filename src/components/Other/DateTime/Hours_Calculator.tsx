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
  durationMinutes,
  minutesToDecimalHours,
  minutesToHM,
  parseTimeToMinutes,
} from "@/components/Other/shared/dateTimeUtils";

export function Hours_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    hm: string;
    decimal: number;
    minutes: number;
  } | null>(null);

  const run = () => {
    setError(null);
    const s = parseTimeToMinutes(start);
    const e = parseTimeToMinutes(end);
    if (s == null || e == null) {
      setError("Enter valid start and end times.");
      setResult(null);
      return;
    }
    const mins = durationMinutes(s, e);
    const { hours, minutes } = minutesToHM(mins);
    setResult({
      hm: `${hours} h ${minutes} min`,
      decimal: minutesToDecimalHours(mins),
      minutes: mins,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        Use 24-hour time. An end time earlier than the start is treated as the next day.
      </p>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="hc-start" className={calcLabelClass}>
            Start time
          </label>
          <input
            id="hc-start"
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
        <div>
          <label htmlFor="hc-end" className={calcLabelClass}>
            End time
          </label>
          <input
            id="hc-end"
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate hours
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Duration</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {result.hm}
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Decimal hours" value={String(result.decimal)} />
        <CalculatorResultRow label="Total minutes" value={result.minutes.toLocaleString()} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter start and end times.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
