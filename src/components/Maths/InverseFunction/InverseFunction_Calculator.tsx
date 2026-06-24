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

export function InverseFunction_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("2");
  const [b, setB] = useState("3");
  const [evalAt, setEvalAt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    forward: string;
    inverse: string;
    evaluated: string | null;
  } | null>(null);

  const run = () => {
    setError(null);
    const av = Number.parseFloat(a);
    const bv = Number.parseFloat(b);
    if (!Number.isFinite(av) || !Number.isFinite(bv)) {
      setError("Enter valid numbers for a and b.");
      setResult(null);
      return;
    }
    if (av === 0) {
      setError("a cannot be 0 — a constant function has no inverse.");
      setResult(null);
      return;
    }
    const bSign = bv >= 0 ? `+ ${formatNum(bv, 6)}` : `− ${formatNum(Math.abs(bv), 6)}`;
    const inverse = `(x ${bv >= 0 ? "−" : "+"} ${formatNum(Math.abs(bv), 6)}) ÷ ${formatNum(av, 6)}`;

    let evaluated: string | null = null;
    if (evalAt.trim() !== "") {
      const x = Number.parseFloat(evalAt);
      if (!Number.isFinite(x)) {
        setError("Enter a valid value to evaluate the inverse at.");
        setResult(null);
        return;
      }
      evaluated = formatNum((x - bv) / av, 6);
    }

    setResult({
      forward: `f(x) = ${formatNum(av, 6)}x ${bSign}`,
      inverse: `f⁻¹(x) = ${inverse}`,
      evaluated,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        For a linear function f(x) = ax + b.
      </p>
      <CalculatorNumberField
        id="inv-a"
        label="a (coefficient of x)"
        step="any"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <CalculatorNumberField
        id="inv-b"
        label="b (constant)"
        step="any"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />
      <CalculatorNumberField
        id="inv-eval"
        label="Evaluate inverse at x"
        optional
        step="any"
        value={evalAt}
        onChange={(e) => setEvalAt(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Find inverse
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full max-w-md">
      <p className="mb-2 text-center text-2xl font-semibold text-[#d66844]">
        {result.inverse}
      </p>
      <dl className="mt-3">
        <CalculatorResultRow label="Original function" value={result.forward} />
        {result.evaluated != null ? (
          <CalculatorResultRow
            label={`f⁻¹(${evalAt})`}
            value={result.evaluated}
          />
        ) : null}
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>
      Enter a and b to find the inverse of f(x) = ax + b.
    </CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px]">
          Supports linear functions of the form f(x) = ax + b (a ≠ 0).
        </p>
      }
    />
  );
}
