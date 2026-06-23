"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { to12Hour, to24Hour } from "@/components/Other/shared/dateTimeUtils";

type Props = {
  emptyHint: string;
};

type Direction = "to24" | "to12";

export function MilitaryTimeConverter({ emptyHint }: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [direction, setDirection] = useState<Direction>("to24");
  const [twelve, setTwelve] = useState("9:30");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [twentyFour, setTwentyFour] = useState("14:30");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ headline: string; sub: string } | null>(null);

  const run = () => {
    setError(null);
    if (direction === "to24") {
      const converted = to24Hour(twelve, period);
      if (!converted) {
        setError("Enter a valid 12-hour time like 9:30.");
        setResult(null);
        return;
      }
      setResult({
        headline: converted,
        sub: `${twelve.trim()} ${period} (12-hour)`,
      });
    } else {
      const converted = to12Hour(twentyFour);
      if (!converted) {
        setError("Enter a valid 24-hour time like 14:30.");
        setResult(null);
        return;
      }
      setResult({
        headline: converted,
        sub: `${twentyFour.trim()} (24-hour)`,
      });
    }
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label htmlFor="mt-dir" className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Conversion
        </label>
        <select
          id="mt-dir"
          value={direction}
          onChange={(e) => {
            setDirection(e.target.value as Direction);
            setResult(null);
            setError(null);
          }}
          className={`${fieldBase} w-full`}
        >
          <option value="to24">12-hour → 24-hour (military)</option>
          <option value="to12">24-hour (military) → 12-hour</option>
        </select>
      </div>

      {direction === "to24" ? (
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <div>
            <label htmlFor="mt-12" className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]">
              12-hour time
            </label>
            <input
              id="mt-12"
              type="text"
              inputMode="numeric"
              value={twelve}
              placeholder="9:30"
              onChange={(e) => setTwelve(e.target.value)}
              className={`${fieldBase} w-full font-mono`}
            />
          </div>
          <div>
            <label htmlFor="mt-period" className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]">
              AM/PM
            </label>
            <select
              id="mt-period"
              value={period}
              onChange={(e) => setPeriod(e.target.value as "AM" | "PM")}
              className={`${fieldBase} w-full`}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor="mt-24" className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]">
            24-hour time
          </label>
          <input
            id="mt-24"
            type="text"
            inputMode="numeric"
            value={twentyFour}
            placeholder="14:30"
            onChange={(e) => setTwentyFour(e.target.value)}
            className={`${fieldBase} w-full font-mono`}
          />
        </div>
      )}

      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Convert
      </button>
    </div>
  );

  const resultPanel =
    result != null ? (
      <div className="text-center">
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">
          {direction === "to24" ? "Military (24-hour) time" : "12-hour time"}
        </p>
        <p className="mt-1 font-mono text-3xl font-semibold text-[#d66844] sm:text-4xl">
          {result.headline}
        </p>
        <p className="mt-3 text-[12px] text-[#94a3b8] sm:text-[13px]">{result.sub}</p>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        {emptyHint}
      </p>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Military time uses 00:00–23:59; midnight is 00:00 and noon is 12:00.
        </p>
      }
    />
  );
}
