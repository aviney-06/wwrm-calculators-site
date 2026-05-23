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
import {
  futureValueLumpSum,
  futureValueWithContributions,
  parseNonNegative,
  parsePositive,
} from "./financeCalcUtils";

export type CompoundSavingsVariant = {
  idPrefix: string;
  hint?: string;
  showMonthlyContribution?: boolean;
  defaultInitial: string;
  defaultMonthly: string;
  defaultRate: string;
  defaultYears: string;
  buttonLabel?: string;
};

export function CompoundSavings_Calculator({
  variant,
}: {
  variant: CompoundSavingsVariant;
}) {
  const resultRef = useRef<HTMLElement>(null);
  const [initial, setInitial] = useState(variant.defaultInitial);
  const [monthly, setMonthly] = useState(variant.defaultMonthly);
  const [rate, setRate] = useState(variant.defaultRate);
  const [years, setYears] = useState(variant.defaultYears);
  const [error, setError] = useState<string | null>(null);
  const [fv, setFv] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const init = parseNonNegative(initial) ?? 0;
    const contrib = variant.showMonthlyContribution
      ? (parseNonNegative(monthly) ?? 0)
      : 0;
    const annual = parseFloat(rate);
    const y = parsePositive(years);
    if (!Number.isFinite(annual) || annual < 0 || y == null) {
      setError("Enter valid rate and years.");
      setFv(null);
      return;
    }
    let value: number | null;
    if (variant.showMonthlyContribution === false && contrib === 0) {
      value = futureValueLumpSum(init, annual, y);
    } else {
      value = futureValueWithContributions(init, contrib, annual, y);
    }
    if (value == null) {
      setError("Could not calculate future value.");
      setFv(null);
      return;
    }
    setFv(formatNum(value, 2));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      {variant.hint ? <p className={calcHintClass}>{variant.hint}</p> : null}
      <CalculatorNumberField
        id={`${variant.idPrefix}-initial`}
        label="Starting balance"
        suffix="$"
        min={0}
        step="any"
        value={initial}
        onChange={(e) => setInitial(e.target.value)}
      />
      {variant.showMonthlyContribution !== false ? (
        <CalculatorNumberField
          id={`${variant.idPrefix}-monthly`}
          label="Monthly contribution"
          suffix="$"
          min={0}
          step="any"
          value={monthly}
          onChange={(e) => setMonthly(e.target.value)}
        />
      ) : null}
      <CalculatorNumberField
        id={`${variant.idPrefix}-rate`}
        label="Annual return / interest"
        suffix="%"
        min={0}
        step="any"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <CalculatorNumberField
        id={`${variant.idPrefix}-years`}
        label="Years"
        suffix="yr"
        min={0}
        step="any"
        value={years}
        onChange={(e) => setYears(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        {variant.buttonLabel ?? "Calculate"}
      </button>
    </div>
  );

  const result = fv ? (
    <div className="text-center">
      <p className="text-4xl font-bold text-[#d66844]">${fv}</p>
      <p className="mt-2 text-[14px] text-[#334155]">future value</p>
    </div>
  ) : (
    <CalculatorEmptyResult>
      Enter balance, contributions, rate, and years.
    </CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
