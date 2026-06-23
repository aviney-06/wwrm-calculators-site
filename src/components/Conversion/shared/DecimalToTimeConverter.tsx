"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { decimalToTime } from "@/components/Conversion/shared/conversionUtils";

type Props = {
  emptyHint: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

export function DecimalToTimeConverter({ emptyHint }: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [value, setValue] = useState("2.5");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    clock: string;
    long: string;
  } | null>(null);

  const run = () => {
    setError(null);
    const trimmed = value.trim();
    if (trimmed === "") {
      setError("Enter decimal hours to convert.");
      setResult(null);
      return;
    }
    const n = Number(trimmed);
    if (!Number.isFinite(n) || n < 0) {
      setError("Enter a valid non-negative number.");
      setResult(null);
      return;
    }
    const { hours, minutes, seconds } = decimalToTime(n);
    setResult({
      clock: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
      long: `${hours} h ${minutes} m ${seconds} s`,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="decimal-time-input"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Decimal hours
        </label>
        <input
          id="decimal-time-input"
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="2.5"
          className={`${fieldBase} w-full font-mono`}
        />
        <p className="mt-1 text-[11px] text-[#94a3b8] sm:text-[12px]">
          e.g. 2.5 hours = 2 hours 30 minutes.
        </p>
      </div>
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
          Hours : minutes : seconds
        </p>
        <p className="mt-1 font-mono text-3xl font-semibold text-[#d66844] sm:text-4xl">
          {result.clock}
        </p>
        <p className="mt-3 text-[12px] text-[#94a3b8] sm:text-[13px]">
          {result.long}
        </p>
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
          Decimal hours are split into hours, minutes, and seconds.
        </p>
      }
    />
  );
}
