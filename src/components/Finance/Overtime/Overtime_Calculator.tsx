"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
  CalculatorResultRow,
} from "@/components/shared/calculatorFields";

export function Overtime_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [rate, setRate] = useState("20");
  const [regularHours, setRegularHours] = useState("40");
  const [overtimeHours, setOvertimeHours] = useState("5");
  const [multiplier, setMultiplier] = useState("1.5");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    regularPay: string;
    overtimeRate: string;
    overtimePay: string;
    total: string;
    totalHours: string;
  } | null>(null);

  const run = () => {
    const r = Number(rate);
    const reg = Number(regularHours || "0");
    const ot = Number(overtimeHours || "0");
    const mult = Number(multiplier);
    if (!Number.isFinite(r) || r < 0) {
      setError("Enter a valid hourly rate.");
      setResult(null);
      return;
    }
    if (![reg, ot].every((n) => Number.isFinite(n) && n >= 0)) {
      setError("Enter valid regular and overtime hours.");
      setResult(null);
      return;
    }
    if (!Number.isFinite(mult) || mult < 1) {
      setError("Enter a valid overtime multiplier (1 or more).");
      setResult(null);
      return;
    }
    const otRate = r * mult;
    const regularPay = r * reg;
    const overtimePay = otRate * ot;
    setError(null);
    setResult({
      regularPay: `$${formatNum(regularPay, 2)}`,
      overtimeRate: `$${formatNum(otRate, 2)}/hr`,
      overtimePay: `$${formatNum(overtimePay, 2)}`,
      total: `$${formatNum(regularPay + overtimePay, 2)}`,
      totalHours: formatNum(reg + ot, 2),
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-5">
      <CalculatorNumberField
        id="ot-rate"
        label="Regular hourly rate"
        suffix="$/hr"
        min={0}
        step="any"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <CalculatorNumberField
          id="ot-reg"
          label="Regular hours"
          min={0}
          step="any"
          value={regularHours}
          onChange={(e) => setRegularHours(e.target.value)}
        />
        <CalculatorNumberField
          id="ot-ot"
          label="Overtime hours"
          min={0}
          step="any"
          value={overtimeHours}
          onChange={(e) => setOvertimeHours(e.target.value)}
        />
      </div>
      <CalculatorNumberField
        id="ot-mult"
        label="Overtime multiplier"
        hint="1.5 = time-and-a-half, 2 = double time."
        min={1}
        step="any"
        value={multiplier}
        onChange={(e) => setMultiplier(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate pay
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Total pay</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {result.total}
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Regular pay" value={result.regularPay} />
        <CalculatorResultRow label="Overtime rate" value={result.overtimeRate} />
        <CalculatorResultRow label="Overtime pay" value={result.overtimePay} />
        <CalculatorResultRow label="Total hours" value={result.totalHours} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter your hours and rate to calculate pay.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
