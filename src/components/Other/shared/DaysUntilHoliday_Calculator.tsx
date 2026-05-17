"use client";

import { useMemo, useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import {
  daysUntilHoliday,
  type DaysUntilResult,
} from "@/components/Other/shared/otherUtils";

type Props = {
  month: number;
  day: number;
  holidayName: string;
  emoji?: string;
};

export function DaysUntilHoliday_Calculator({
  month,
  day,
  holidayName,
  emoji,
}: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [result, setResult] = useState<DaysUntilResult | null>(null);

  const todayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
    [],
  );

  const run = () => {
    setResult(daysUntilHoliday(month, day, holidayName));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        Today is <span className="font-medium text-[#334155]">{todayLabel}</span>
        . Count down to the next {holidayName}.
      </p>
      <button type="button" className={btnCalculate} onClick={run}>
        Count days
      </button>
    </div>
  );

  const resultPanel =
    result != null ? (
      <div className="text-center">
        {emoji ? (
          <p className="text-4xl" aria-hidden>
            {emoji}
          </p>
        ) : null}
        <p className="mt-2 text-[13px] text-[#64748b] sm:text-[14px]">
          Days until {holidayName}
        </p>
        <p className="mt-1 text-5xl font-semibold text-[#d66844]">
          {result.isToday ? "0" : result.days}
        </p>
        <p className="mt-2 text-[15px] font-medium text-[#334155]">
          {result.isToday
            ? `It's ${holidayName} today!`
            : result.days === 1
              ? "1 day to go"
              : `${result.days} days to go`}
        </p>
        <p className="mt-3 text-[12px] text-[#94a3b8] sm:text-[13px]">
          {result.targetLabel}
        </p>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Tap count to see how many days until the next {holidayName}.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />
  );
}
