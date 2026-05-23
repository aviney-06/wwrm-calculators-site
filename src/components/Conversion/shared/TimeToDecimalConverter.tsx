"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { timeToDecimalHours } from "@/components/Conversion/shared/conversionUtils";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
} from "@/components/shared/calculatorFields";

type Props = { emptyHint: string };

export function TimeToDecimalConverter({ emptyHint }: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [hours, setHours] = useState("1");
  const [minutes, setMinutes] = useState("30");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const h = Number.parseFloat(hours);
    const m = Number.parseFloat(minutes);
    if (!Number.isFinite(h) || h < 0 || !Number.isFinite(m) || m < 0) {
      setError("Enter non-negative hours and minutes.");
      setResult(null);
      return;
    }
    if (m >= 60) {
      setError("Minutes must be less than 60.");
      setResult(null);
      return;
    }
    setResult(formatNum(timeToDecimalHours(h, m), 4));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="time-decimal-hours"
        label="Hours"
        min={0}
        step={1}
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      <CalculatorNumberField
        id="time-decimal-minutes"
        label="Minutes"
        min={0}
        max={59}
        step={1}
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Convert to decimal
      </button>
    </div>
  );

  const resultPanel =
    result != null ? (
      <div className="text-center">
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">Decimal hours</p>
        <p className="mt-1 text-3xl font-semibold text-[#d66844] sm:text-4xl">
          {result}
          <span className="ml-1.5 text-[18px] font-medium text-[#334155] sm:text-[20px]">
            hr
          </span>
        </p>
      </div>
    ) : (
      <CalculatorEmptyResult>{emptyHint}</CalculatorEmptyResult>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px]">
          Decimal hours = hours + (minutes ÷ 60). Useful for payroll and billing.
        </p>
      }
    />
  );
}
