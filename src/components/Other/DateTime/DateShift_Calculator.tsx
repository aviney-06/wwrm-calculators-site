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
  calcLabelClass,
} from "@/components/shared/calculatorFields";
import {
  formatDateLong,
  parseDateInput,
  shiftDate,
  todayInput,
  type ShiftUnit,
} from "@/components/Other/shared/dateTimeUtils";

export function DateShift_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [base, setBase] = useState(todayInput());
  const [op, setOp] = useState<"add" | "subtract">("add");
  const [value, setValue] = useState("30");
  const [unit, setUnit] = useState<ShiftUnit>("days");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const d = parseDateInput(base);
    const n = Number(value);
    if (!d) {
      setError("Enter a valid start date.");
      setResult(null);
      return;
    }
    if (!Number.isFinite(n) || n < 0) {
      setError("Enter a valid non-negative amount.");
      setResult(null);
      return;
    }
    setResult(formatDateLong(shiftDate(d, n, unit, op)));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label htmlFor="ds-base" className={calcLabelClass}>
          Start date
        </label>
        <input
          id="ds-base"
          type="date"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <div>
        <label htmlFor="ds-op" className={calcLabelClass}>
          Operation
        </label>
        <select
          id="ds-op"
          value={op}
          onChange={(e) => setOp(e.target.value as "add" | "subtract")}
          className={`${fieldBase} w-full`}
        >
          <option value="add">Add to date</option>
          <option value="subtract">Subtract from date</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="ds-value" className={calcLabelClass}>
            Amount
          </label>
          <input
            id="ds-value"
            type="number"
            min={0}
            inputMode="numeric"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`${fieldBase} w-full`}
          />
        </div>
        <div>
          <label htmlFor="ds-unit" className={calcLabelClass}>
            Unit
          </label>
          <select
            id="ds-unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as ShiftUnit)}
            className={`${fieldBase} w-full`}
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate date
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="text-center">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">Resulting date</p>
      <p className="mt-2 text-xl font-semibold text-[#d66844] sm:text-2xl">{result}</p>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter a date and amount to shift it.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
