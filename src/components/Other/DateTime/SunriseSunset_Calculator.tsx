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
  parseDateInput,
  sunTimes,
  todayInput,
  type SunResult,
} from "@/components/Other/shared/dateTimeUtils";

export function SunriseSunset_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [lat, setLat] = useState("40.7128");
  const [lng, setLng] = useState("-74.0060");
  const [date, setDate] = useState(todayInput());
  const [offset, setOffset] = useState("-5");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SunResult | null>(null);

  const run = () => {
    setError(null);
    const la = Number(lat);
    const lo = Number(lng);
    const tz = Number(offset);
    const d = parseDateInput(date);
    if (!d || !Number.isFinite(la) || la < -90 || la > 90) {
      setError("Enter a valid latitude (−90 to 90) and date.");
      setResult(null);
      return;
    }
    if (!Number.isFinite(lo) || lo < -180 || lo > 180) {
      setError("Enter a valid longitude (−180 to 180).");
      setResult(null);
      return;
    }
    if (!Number.isFinite(tz) || tz < -12 || tz > 14) {
      setError("Enter a valid UTC offset (−12 to 14).");
      setResult(null);
      return;
    }
    setResult(sunTimes(d, la, lo, tz));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-5">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="ss-lat" className={calcLabelClass}>
            Latitude
          </label>
          <input
            id="ss-lat"
            type="number"
            step="any"
            inputMode="decimal"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
        <div>
          <label htmlFor="ss-lng" className={calcLabelClass}>
            Longitude
          </label>
          <input
            id="ss-lng"
            type="number"
            step="any"
            inputMode="decimal"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="ss-date" className={calcLabelClass}>
            Date
          </label>
          <input
            id="ss-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
        <div>
          <label htmlFor="ss-offset" className={calcLabelClass}>
            UTC offset (hours)
          </label>
          <input
            id="ss-offset"
            type="number"
            step="any"
            inputMode="decimal"
            value={offset}
            onChange={(e) => setOffset(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate sun times
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <div className="flex justify-center gap-6 text-center">
        <div>
          <p className="text-[13px] text-[#64748b] sm:text-[14px]">Sunrise</p>
          <p className="mt-1 text-2xl font-semibold text-[#d66844] sm:text-3xl">
            {result.sunrise ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-[13px] text-[#64748b] sm:text-[14px]">Sunset</p>
          <p className="mt-1 text-2xl font-semibold text-[#d66844] sm:text-3xl">
            {result.sunset ?? "—"}
          </p>
        </div>
      </div>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Day length" value={result.dayLength} />
      </dl>
      {result.note ? (
        <p className="mt-2 text-center text-[12px] text-[#94a3b8]">{result.note}</p>
      ) : null}
    </div>
  ) : (
    <CalculatorEmptyResult>Enter a location and date for sun times.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Times are approximate (±a few minutes) and based on the standard sunrise equation.
        </p>
      }
    />
  );
}
