"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, parseNumberList, quartilesFromList } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumbersListField,
  CalculatorResultRow,
} from "@/components/shared/calculatorFields";

export function Quartile_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState("3, 7, 8, 5, 12, 14, 21, 13, 18");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ q1: string; q2: string; q3: string } | null>(null);

  const run = () => {
    setError(null);
    const vals = parseNumberList(raw);
    if (vals.length < 1) {
      setError("Enter at least one number.");
      setOut(null);
      return;
    }
    const q = quartilesFromList(vals);
    if (!q) {
      setError("Could not compute quartiles.");
      return;
    }
    setOut({ q1: formatNum(q.q1), q2: formatNum(q.q2), q3: formatNum(q.q3) });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumbersListField
        id="quartile-numbers"
        label="Numbers"
        value={raw}
        onChange={setRaw}
        placeholder="e.g. 3, 7, 8, 5, 12, 14, 21"
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate quartiles
      </button>
    </div>
  );

  const result = out ? (
    <dl className="w-full max-w-md">
      <CalculatorResultRow label="Q1 (25th percentile)" value={out.q1} />
      <CalculatorResultRow label="Q2 (median)" value={out.q2} />
      <CalculatorResultRow label="Q3 (75th percentile)" value={out.q3} />
    </dl>
  ) : (
    <CalculatorEmptyResult>Enter numbers to find Q1, Q2, and Q3.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
