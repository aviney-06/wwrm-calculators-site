"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";

export function RandomNumber_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<number[] | null>(null);

  const run = () => {
    setError(null);
    const lo = parseFloat(min);
    const hi = parseFloat(max);
    const n = parseInt(count, 10) || 1;
    if (Number.isNaN(lo) || Number.isNaN(hi)) {
      setError("Enter valid minimum and maximum values.");
      setValues(null);
      return;
    }
    if (lo > hi) {
      setError("Minimum must be less than or equal to maximum.");
      setValues(null);
      return;
    }
    if (n < 1 || n > 50) {
      setError("Count must be between 1 and 50.");
      setValues(null);
      return;
    }
    const out: number[] = [];
    for (let i = 0; i < n; i++) {
      out.push(Math.floor(Math.random() * (hi - lo + 1)) + lo);
    }
    setValues(out);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
            Minimum
          </p>
          <InputWithSuffix
            type="number"
            suffix=""
            value={min}
            onChange={(e) => setMin(e.target.value)}
            inputClassName="w-full max-w-[8rem]"
          />
        </div>
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
            Maximum
          </p>
          <InputWithSuffix
            type="number"
            suffix=""
            value={max}
            onChange={(e) => setMax(e.target.value)}
            inputClassName="w-full max-w-[8rem]"
          />
        </div>
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          How many numbers?
        </p>
        <InputWithSuffix
          type="number"
          min={1}
          max={50}
          suffix=""
          value={count}
          onChange={(e) => setCount(e.target.value)}
          inputClassName="max-w-[8rem]"
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Generate
      </button>
    </div>
  );

  const result =
    values != null ? (
      <div className="w-full max-w-[16rem] text-center">
        <p className="text-2xl font-bold leading-snug text-[#d66844] sm:text-3xl">
          {values.length === 1 ? values[0] : values.join(", ")}
        </p>
        <p className="mt-2 text-[13px] text-[#334155]">
          {values.length === 1 ? "random integer" : `${values.length} random integers`}
        </p>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Inclusive range — integers only.
      </p>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={null}
    />
  );
}