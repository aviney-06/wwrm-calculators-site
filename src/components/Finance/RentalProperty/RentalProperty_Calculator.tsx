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

export function RentalProperty_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [price, setPrice] = useState("300000");
  const [rent, setRent] = useState("2500");
  const [expenses, setExpenses] = useState("800");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ cashFlow: string; capRate: string } | null>(null);

  const run = () => {
    setError(null);
    const p = Number.parseFloat(price);
    const r = Number.parseFloat(rent);
    const e = Number.parseFloat(expenses);
    if (![p, r, e].every((n) => Number.isFinite(n) && n >= 0) || p <= 0) {
      setError("Enter valid property price and monthly amounts.");
      setOut(null);
      return;
    }
    const noi = (r - e) * 12;
    const cashFlow = r - e;
    setOut({
      cashFlow: formatNum(cashFlow, 2),
      capRate: formatNum((noi / p) * 100, 2),
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="rental-price"
        label="Purchase price"
        suffix="$"
        min={0}
        step="any"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <CalculatorNumberField
        id="rental-rent"
        label="Monthly rent"
        suffix="$"
        min={0}
        step="any"
        value={rent}
        onChange={(e) => setRent(e.target.value)}
      />
      <CalculatorNumberField
        id="rental-expenses"
        label="Monthly expenses"
        suffix="$"
        min={0}
        step="any"
        value={expenses}
        onChange={(e) => setExpenses(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate rental metrics
      </button>
    </div>
  );

  const result = out ? (
    <div className="w-full max-w-md">
      <p className="mb-3 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {out.capRate}%
      </p>
      <p className="mb-3 text-center text-[14px] font-medium text-[#334155]">cap rate</p>
      <dl>
        <CalculatorResultRow label="Monthly cash flow" value={`$${out.cashFlow}`} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter price, rent, and expenses for cash flow and cap rate.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Cap rate = annual NOI ÷ purchase price. Simplified — excludes financing, vacancy, and taxes.
        </p>
      }
    />
  );
}
