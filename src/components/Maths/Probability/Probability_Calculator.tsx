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

export function Probability_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [pa, setPa] = useState("0.5");
  const [pb, setPb] = useState("0.4");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    notA: string;
    notB: string;
    both: string;
    either: string;
    neither: string;
  } | null>(null);

  const run = () => {
    setError(null);
    const a = Number.parseFloat(pa);
    const b = Number.parseFloat(pb);
    if (!Number.isFinite(a) || a < 0 || a > 1 || !Number.isFinite(b) || b < 0 || b > 1) {
      setError("Enter probabilities between 0 and 1.");
      setResult(null);
      return;
    }
    const both = a * b;
    const either = a + b - both;
    setResult({
      notA: formatNum(1 - a, 6),
      notB: formatNum(1 - b, 6),
      both: formatNum(both, 6),
      either: formatNum(either, 6),
      neither: formatNum(1 - either, 6),
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        Enter each probability as a decimal between 0 and 1.
      </p>
      <CalculatorNumberField
        id="prob-a"
        label="Probability of A — P(A)"
        min={0}
        max={1}
        step="any"
        value={pa}
        onChange={(e) => setPa(e.target.value)}
      />
      <CalculatorNumberField
        id="prob-b"
        label="Probability of B — P(B)"
        min={0}
        max={1}
        step="any"
        value={pb}
        onChange={(e) => setPb(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate probability
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full max-w-md">
      <p className="mb-3 text-center text-[14px] font-medium text-[#334155]">
        Assuming A and B are independent
      </p>
      <dl>
        <CalculatorResultRow label="Both occur — P(A ∩ B)" value={result.both} />
        <CalculatorResultRow label="Either occurs — P(A ∪ B)" value={result.either} />
        <CalculatorResultRow label="Neither occurs" value={result.neither} />
        <CalculatorResultRow label="Not A — P(A′)" value={result.notA} />
        <CalculatorResultRow label="Not B — P(B′)" value={result.notB} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>
      Enter P(A) and P(B) to find combined probabilities.
    </CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px]">
          Intersection and union assume the two events are independent.
        </p>
      }
    />
  );
}
