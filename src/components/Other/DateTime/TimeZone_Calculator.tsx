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
  convertTimeZone,
  TIME_ZONES,
  todayInput,
  zoneLabel,
  type TimeZoneResult,
} from "@/components/Other/shared/dateTimeUtils";

export function TimeZone_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [date, setDate] = useState(todayInput());
  const [time, setTime] = useState("12:00");
  const [fromZone, setFromZone] = useState("America/New_York");
  const [toZone, setToZone] = useState("Europe/London");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TimeZoneResult | null>(null);

  const run = () => {
    setError(null);
    const r = convertTimeZone(date, time, fromZone, toZone);
    if (!r) {
      setError("Enter a valid date and time.");
      setResult(null);
      return;
    }
    setResult(r);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const zoneOptions = TIME_ZONES.map((z) => (
    <option key={z} value={z}>
      {zoneLabel(z)}
    </option>
  ));

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-5">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="tz-date" className={calcLabelClass}>
            Date
          </label>
          <input
            id="tz-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
        <div>
          <label htmlFor="tz-time" className={calcLabelClass}>
            Time
          </label>
          <input
            id="tz-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="tz-from" className={calcLabelClass}>
          From time zone
        </label>
        <select
          id="tz-from"
          value={fromZone}
          onChange={(e) => setFromZone(e.target.value)}
          className={`${fieldBase} w-full`}
        >
          {zoneOptions}
        </select>
      </div>
      <div>
        <label htmlFor="tz-to" className={calcLabelClass}>
          To time zone
        </label>
        <select
          id="tz-to"
          value={toZone}
          onChange={(e) => setToZone(e.target.value)}
          className={`${fieldBase} w-full`}
        >
          {zoneOptions}
        </select>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Convert time
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">
        {result.zoneLabel}
      </p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {result.time}
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Date there" value={result.date} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Pick zones and a time to convert.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Daylight saving time is applied automatically for the selected date.
        </p>
      }
    />
  );
}
