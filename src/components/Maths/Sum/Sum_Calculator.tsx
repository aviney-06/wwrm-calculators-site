"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, parseNumberList } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumbersListField,
  CalculatorResultRow,
} from "@/components/shared/calculatorFields";

export function Sum_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState("12, 18, 25, 7, 38");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    sum: string;
    count: number;
    mean: string;
    min: string;
    max: string;
  } | null>(null);

  const run = () => {
    setError(null);
    const nums = parseNumberList(raw);
    if (nums.length === 0) {
      setError("Enter at least one valid number (comma, space, or newline separated).");
      setResult(null);
      return;
    }
    const sum = nums.reduce((a, b) => a + b, 0);
    setResult({
      sum: formatNum(sum, 6),
      count: nums.length,
      mean: formatNum(sum / nums.length, 6),
      min: formatNum(Math.min(...nums), 6),
      max: formatNum(Math.max(...nums), 6),
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumbersListField
        id="sum-values"
        label="Numbers"
        value={raw}
        onChange={setRaw}
        placeholder="e.g. 12, 18, 25, 7, 38"
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate sum
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full max-w-md">
      <p className="mb-2 text-center text-4xl font-semibold text-[#d66844]">
        {result.sum}
      </p>
      <p className="mb-3 text-center text-[14px] font-medium text-[#334155]">sum total</p>
      <dl>
        <CalculatorResultRow label="Count" value={String(result.count)} />
        <CalculatorResultRow label="Mean (average)" value={result.mean} />
        <CalculatorResultRow label="Minimum" value={result.min} />
        <CalculatorResultRow label="Maximum" value={result.max} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>
      Enter a list of numbers to add them up.
    </CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
