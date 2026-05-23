"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, parseNumberList, statsFromList } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumbersListField,
  CalculatorResultRow,
} from "@/components/shared/calculatorFields";

export function Variance_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState("2, 4, 4, 5, 7, 9");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ sample: string; population: string } | null>(null);

  const run = () => {
    setError(null);
    const vals = parseNumberList(raw);
    if (vals.length < 2) {
      setError("Enter at least two numbers.");
      setOut(null);
      return;
    }
    const s = statsFromList(vals);
    setOut({
      sample: formatNum(s.sampleSd ** 2),
      population: formatNum(s.populationSd ** 2),
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumbersListField
        id="variance-numbers"
        label="Numbers"
        value={raw}
        onChange={setRaw}
        placeholder="e.g. 2, 4, 4, 5, 7, 9"
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate variance
      </button>
    </div>
  );

  const result = out ? (
    <div className="w-full max-w-md">
      <p className="mb-3 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {out.sample}
      </p>
      <p className="mb-3 text-center text-[14px] font-medium text-[#334155]">
        sample variance (n−1)
      </p>
      <dl>
        <CalculatorResultRow label="Population variance" value={out.population} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter at least two numbers for sample and population variance.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Sample variance divides by n−1; population variance divides by n.
        </p>
      }
    />
  );
}
