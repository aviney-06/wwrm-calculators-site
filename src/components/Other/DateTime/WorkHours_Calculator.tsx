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

export function WorkHours_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:30");
  const [breakMin, setBreakMin] = useState("30");
  const [rate, setRate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    hm: string;
    decimal: number;
    pay: string | null;
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
    const brk = Number(breakMin || "0");
    if (!Number.isFinite(brk) || brk < 0) {
      setError("Enter a valid break length in minutes.");
      setResult(null);
      return;
    }
    const worked = Math.max(0, durationMinutes(s, e) - brk);
    const { hours, minutes } = minutesToHM(worked);
    const decimal = minutesToDecimalHours(worked);
    let pay: string | null = null;
    if (rate.trim() !== "") {
      const r = Number(rate);
      if (Number.isFinite(r) && r >= 0) {
        pay = `$${(decimal * r).toFixed(2)}`;
      }
    }
    setResult({ hm: `${hours} h ${minutes} min`, decimal, pay });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="wh-start" className={calcLabelClass}>
            Clock in
          </label>
          <input
            id="wh-start"
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
        <div>
          <label htmlFor="wh-end" className={calcLabelClass}>
            Clock out
          </label>
          <input
            id="wh-end"
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="wh-break" className={calcLabelClass}>
            Break (minutes)
          </label>
          <input
            id="wh-break"
            type="number"
            min={0}
            inputMode="numeric"
            value={breakMin}
            onChange={(e) => setBreakMin(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
        <div>
          <label htmlFor="wh-rate" className={calcLabelClass}>
            Hourly rate
            <span className="font-normal text-[#94a3b8]"> (optional)</span>
          </label>
          <input
            id="wh-rate"
            type="number"
            min={0}
            step="any"
            inputMode="decimal"
            value={rate}
            placeholder="$/hr"
            onChange={(e) => setRate(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate work hours
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Hours worked</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {result.hm}
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Decimal hours" value={String(result.decimal)} />
        {result.pay ? <CalculatorResultRow label="Gross pay" value={result.pay} /> : null}
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter your shift to calculate worked hours.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
