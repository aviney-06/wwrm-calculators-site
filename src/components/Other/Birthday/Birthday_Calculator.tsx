"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { daysUntilBirthday, formatDateLong } from "@/components/Other/shared/otherCalcUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
} from "@/components/shared/calculatorFields";

export function Birthday_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [month, setMonth] = useState("6");
  const [day, setDay] = useState("15");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ days: number; target: string; isToday: boolean } | null>(null);

  const run = () => {
    setError(null);
    const m = Number.parseInt(month, 10);
    const d = Number.parseInt(day, 10);
    if (!Number.isFinite(m) || m < 1 || m > 12 || !Number.isFinite(d) || d < 1 || d > 31) {
      setError("Enter a valid month (1–12) and day.");
      setOut(null);
      return;
    }
    const r = daysUntilBirthday(m, d);
    setOut({ days: r.days, target: formatDateLong(r.target), isToday: r.isToday });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-3">
        <CalculatorNumberField
          id="birthday-month"
          label="Month"
          min={1}
          max={12}
          step={1}
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <CalculatorNumberField
          id="birthday-day"
          label="Day"
          min={1}
          max={31}
          step={1}
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate days until birthday
      </button>
    </div>
  );

  const result = out ? (
    <div className="text-center">
      <p className="text-5xl font-bold text-[#d66844]">{out.isToday ? "0" : out.days}</p>
      <p className="mt-2 text-[14px] text-[#334155]">
        {out.isToday ? "Happy birthday!" : "days until your birthday"}
      </p>
      <p className="mt-2 text-[12px] text-[#94a3b8]">Next: {out.target}</p>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter your birthday month and day.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
