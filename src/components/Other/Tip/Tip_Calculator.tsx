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

export function Tip_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [bill, setBill] = useState("50");
  const [tipPct, setTipPct] = useState("18");
  const [people, setPeople] = useState("1");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{
    tip: string;
    total: string;
    perPerson: string;
  } | null>(null);

  const run = () => {
    setError(null);
    const b = Number.parseFloat(bill);
    const p = Number.parseFloat(tipPct);
    const n = Number.parseInt(people, 10);
    if (!Number.isFinite(b) || b < 0) {
      setError("Enter a valid bill amount.");
      setOut(null);
      return;
    }
    if (!Number.isFinite(p) || p < 0) {
      setError("Enter a valid tip percentage.");
      setOut(null);
      return;
    }
    if (!Number.isFinite(n) || n < 1) {
      setError("Enter at least one person.");
      setOut(null);
      return;
    }
    const tip = b * (p / 100);
    const total = b + tip;
    setOut({
      tip: formatNum(tip, 2),
      total: formatNum(total, 2),
      perPerson: formatNum(total / n, 2),
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="tip-bill"
        label="Bill amount"
        suffix="$"
        type="number"
        min={0}
        step="0.01"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />
      <CalculatorNumberField
        id="tip-pct"
        label="Tip"
        suffix="%"
        type="number"
        min={0}
        step="any"
        value={tipPct}
        onChange={(e) => setTipPct(e.target.value)}
      />
      <CalculatorNumberField
        id="tip-people"
        label="Split between"
        hint="Number of people sharing the bill"
        type="number"
        min={1}
        step={1}
        value={people}
        onChange={(e) => setPeople(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate tip
      </button>
    </div>
  );

  const result =
    out != null ? (
      <div className="w-full max-w-md">
        <p className="mb-3 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
          ${out.tip}
        </p>
        <p className="mb-3 text-center text-[14px] font-medium text-[#334155]">tip amount</p>
        <dl>
          <CalculatorResultRow label="Total bill" value={`$${out.total}`} />
          <CalculatorResultRow label="Per person" value={`$${out.perPerson}`} />
        </dl>
      </div>
    ) : (
      <CalculatorEmptyResult>Enter bill, tip %, and people to split the total.</CalculatorEmptyResult>
    );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
