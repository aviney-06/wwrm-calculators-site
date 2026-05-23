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

export function ProfitMargin_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [revenue, setRevenue] = useState("10000");
  const [cost, setCost] = useState("6000");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ profit: string; margin: string } | null>(null);

  const run = () => {
    setError(null);
    const rev = Number.parseFloat(revenue);
    const c = Number.parseFloat(cost);
    if (!Number.isFinite(rev) || rev <= 0 || !Number.isFinite(c) || c < 0) {
      setError("Enter positive revenue and non-negative cost.");
      setOut(null);
      return;
    }
    const profit = rev - c;
    setOut({ profit: formatNum(profit, 2), margin: formatNum((profit / rev) * 100, 2) });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="margin-revenue"
        label="Revenue"
        suffix="$"
        min={0}
        step="any"
        value={revenue}
        onChange={(e) => setRevenue(e.target.value)}
      />
      <CalculatorNumberField
        id="margin-cost"
        label="Cost"
        suffix="$"
        min={0}
        step="any"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate profit margin
      </button>
    </div>
  );

  const result = out ? (
    <div className="w-full max-w-md">
      <p className="mb-3 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {out.margin}%
      </p>
      <p className="mb-3 text-center text-[14px] font-medium text-[#334155]">profit margin</p>
      <dl>
        <CalculatorResultRow label="Profit" value={`$${out.profit}`} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter revenue and cost for margin % and profit.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Profit margin % = (revenue − cost) ÷ revenue × 100.
        </p>
      }
    />
  );
}
