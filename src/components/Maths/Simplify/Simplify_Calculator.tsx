"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { simplifyRadical } from "@/components/Maths/shared/radicalUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
  calcHintClass,
} from "@/components/shared/calculatorFields";

export function Simplify_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState("72");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const val = Number.parseInt(n, 10);
    const simplified = simplifyRadical(val);
    if (simplified == null) {
      setError("Enter a non-negative whole number under the radical.");
      setOut(null);
      return;
    }
    setOut(simplified);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className={calcHintClass}>
        Simplify √n into a√b form. For fractions use the Fraction Simplify tool.
      </p>
      <CalculatorNumberField
        id="simplify-n"
        label="Number under √"
        min={0}
        step={1}
        value={n}
        onChange={(e) => setN(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Simplify radical
      </button>
    </div>
  );

  const result = out ? (
    <div className="text-center">
      <p className="text-4xl font-bold text-[#d66844]">{out}</p>
      <p className="mt-2 text-[14px] text-[#334155]">simplified radical</p>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter a number to simplify √n in surd form.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Factors perfect squares out of the radicand (e.g. √72 = 6√2).
        </p>
      }
    />
  );
}
