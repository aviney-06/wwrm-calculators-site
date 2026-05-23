"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { loveCompatibility } from "@/components/Other/shared/otherCalcUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
} from "@/components/shared/calculatorFields";

export function Love_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pct, setPct] = useState<number | null>(null);

  const run = () => {
    setError(null);
    if (!a.trim() || !b.trim()) {
      setError("Enter both names.");
      setPct(null);
      return;
    }
    setPct(loveCompatibility(a, b));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="love-name-a"
        label="Your name"
        type="text"
        autoComplete="name"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <CalculatorNumberField
        id="love-name-b"
        label="Partner name"
        type="text"
        autoComplete="name"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate compatibility
      </button>
    </div>
  );

  const result =
    pct != null ? (
      <div className="text-center">
        <p className="text-5xl font-bold text-[#d66844]">{pct}%</p>
        <p className="mt-2 text-[13px] text-[#64748b]">compatibility (for fun only)</p>
      </div>
    ) : (
      <CalculatorEmptyResult>Enter two names for a fun compatibility score.</CalculatorEmptyResult>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          For entertainment only — not based on any scientific model.
        </p>
      }
    />
  );
}
