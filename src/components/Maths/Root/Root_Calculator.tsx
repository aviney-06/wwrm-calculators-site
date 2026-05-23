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
} from "@/components/shared/calculatorFields";

export function Root_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [x, setX] = useState("16");
  const [n, setN] = useState("2");
  const [error, setError] = useState<string | null>(null);
  const [root, setRoot] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const val = Number.parseFloat(x);
    const degree = Number.parseInt(n, 10);
    if (!Number.isFinite(val) || val < 0) {
      setError("Enter a non-negative number.");
      setRoot(null);
      return;
    }
    if (!Number.isFinite(degree) || degree < 2) {
      setError("Root degree must be ≥ 2.");
      setRoot(null);
      return;
    }
    if (val === 0) {
      setRoot("0");
      scrollResultIntoViewMobile(resultRef.current);
      return;
    }
    setRoot(formatNum(Math.pow(val, 1 / degree)));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="root-x"
        label="Number"
        min={0}
        step="any"
        value={x}
        onChange={(e) => setX(e.target.value)}
      />
      <CalculatorNumberField
        id="root-n"
        label="Root degree (n)"
        min={2}
        step={1}
        value={n}
        onChange={(e) => setN(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate root
      </button>
    </div>
  );

  const result = root ? (
    <div className="text-center">
      <p className="text-4xl font-bold text-[#d66844]">{root}</p>
      <p className="mt-2 text-[14px] text-[#334155]">{n}th root</p>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter a number and root degree (n ≥ 2).</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
