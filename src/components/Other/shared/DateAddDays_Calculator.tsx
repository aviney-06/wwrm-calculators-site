"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { addDaysToDate, formatDateLong } from "@/components/Other/shared/otherCalcUtils";
import {
  calcHintClass,
  calcLabelClass,
  CalculatorEmptyResult,
} from "@/components/shared/calculatorFields";

type Props = { days: number; periodLabel: string };

export function DateAddDays_Calculator({ days, periodLabel }: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [start, setStart] = useState(() => new Date().toISOString().slice(0, 10));
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    const base = new Date(start + "T12:00:00");
    if (Number.isNaN(base.getTime())) return;
    const target = addDaysToDate(base, days);
    setResult(formatDateLong(target));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className={calcHintClass}>
        Add {days} days ({periodLabel}) to a start date.
      </p>
      <div>
        <label htmlFor="date-start" className={calcLabelClass}>
          Start date
        </label>
        <input
          id="date-start"
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate date
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="text-center">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">Date in {days} days</p>
      <p className="mt-2 text-xl font-semibold text-[#d66844] sm:text-2xl">{result}</p>
    </div>
  ) : (
    <CalculatorEmptyResult>Pick a start date to see the result.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
