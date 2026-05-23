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
  calcHintClass,
} from "@/components/shared/calculatorFields";
import {
  fhaMonthlyMip,
  loanPaymentMonthly,
  loanTotalInterest,
  parsePositive,
} from "./financeCalcUtils";

export type LoanPaymentVariant = {
  idPrefix: string;
  hint?: string;
  principalLabel: string;
  defaultPrincipal: string;
  defaultRate: string;
  defaultYears: string;
  buttonLabel?: string;
  includeFhaMip?: boolean;
  disclaimer?: string;
};

export function LoanPayment_Calculator({
  variant,
}: {
  variant: LoanPaymentVariant;
}) {
  const resultRef = useRef<HTMLElement>(null);
  const [principal, setPrincipal] = useState(variant.defaultPrincipal);
  const [rate, setRate] = useState(variant.defaultRate);
  const [years, setYears] = useState(variant.defaultYears);
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{
    payment: string;
    totalInterest: string;
    mip?: string;
  } | null>(null);

  const run = () => {
    setError(null);
    const p = parsePositive(principal);
    const annual = parseFloat(rate);
    const y = parsePositive(years);
    if (p == null || !Number.isFinite(annual) || annual < 0 || y == null) {
      setError("Enter valid loan amount, rate, and term.");
      setOut(null);
      return;
    }
    const pmt = loanPaymentMonthly(p, annual, y);
    const interest = loanTotalInterest(p, annual, y);
    if (pmt == null || interest == null) {
      setError("Could not calculate payment.");
      setOut(null);
      return;
    }
    const result: typeof out = {
      payment: formatNum(pmt, 2),
      totalInterest: formatNum(interest, 2),
    };
    if (variant.includeFhaMip) {
      result.mip = formatNum(fhaMonthlyMip(p), 2);
    }
    setOut(result);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      {variant.hint ? <p className={calcHintClass}>{variant.hint}</p> : null}
      <CalculatorNumberField
        id={`${variant.idPrefix}-principal`}
        label={variant.principalLabel}
        suffix="$"
        min={0}
        step="any"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
      />
      <CalculatorNumberField
        id={`${variant.idPrefix}-rate`}
        label="Annual interest rate"
        suffix="%"
        min={0}
        step="any"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <CalculatorNumberField
        id={`${variant.idPrefix}-years`}
        label="Loan term"
        suffix="yr"
        min={0}
        step="any"
        value={years}
        onChange={(e) => setYears(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        {variant.buttonLabel ?? "Calculate payment"}
      </button>
    </div>
  );

  const result = out ? (
    <div className="w-full max-w-md">
      <p className="mb-3 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        ${out.payment}
      </p>
      <p className="mb-3 text-center text-[14px] font-medium text-[#334155]">
        estimated monthly payment
      </p>
      <dl>
        <CalculatorResultRow
          label="Total interest"
          value={`$${out.totalInterest}`}
        />
        {out.mip != null ? (
          <CalculatorResultRow
            label="Est. FHA MIP / month"
            value={`$${out.mip}`}
          />
        ) : null}
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>
      Enter loan details for monthly payment and total interest.
    </CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        variant.disclaimer ? (
          <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
            {variant.disclaimer}
          </p>
        ) : undefined
      }
    />
  );
}
