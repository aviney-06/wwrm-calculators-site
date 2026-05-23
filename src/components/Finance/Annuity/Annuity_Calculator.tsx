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
  calcHintClass,
} from "@/components/shared/calculatorFields";

export function Annuity_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("20");
  const [error, setError] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const p = Number.parseFloat(principal);
    const annual = Number.parseFloat(rate) / 100;
    const n = Number.parseFloat(years) * 12;
    if (!Number.isFinite(p) || p <= 0 || !Number.isFinite(annual) || annual < 0 || !Number.isFinite(n) || n < 1) {
      setError("Enter valid principal, rate, and years.");
      setPayment(null);
      return;
    }
    const r = annual / 12;
    let pmt: number;
    if (r === 0) {
      pmt = p / n;
    } else {
      pmt = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    setPayment(formatNum(pmt, 2));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className={calcHintClass}>Monthly payment on a loan (ordinary annuity).</p>
      <CalculatorNumberField
        id="annuity-principal"
        label="Loan amount"
        suffix="$"
        min={0}
        step="any"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
      />
      <CalculatorNumberField
        id="annuity-rate"
        label="Annual interest"
        suffix="%"
        min={0}
        step="any"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <CalculatorNumberField
        id="annuity-years"
        label="Term"
        suffix="yr"
        min={0}
        step="any"
        value={years}
        onChange={(e) => setYears(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate payment
      </button>
    </div>
  );

  const result = payment ? (
    <div className="text-center">
      <p className="text-4xl font-bold text-[#d66844]">${payment}</p>
      <p className="mt-2 text-[14px] text-[#334155]">monthly payment</p>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter loan amount, rate, and term for monthly payment.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Standard amortizing loan formula with monthly compounding. Does not include fees or insurance.
        </p>
      }
    />
  );
}
