"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { CustomSelect } from "@/components/Health-Fitness/shared/CustomSelect";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
  CalculatorResultRow,
  calcLabelClass,
} from "@/components/shared/calculatorFields";

type FnType = "polynomial" | "sqrt" | "rational" | "log";

export function Domain_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [type, setType] = useState<FnType>("sqrt");
  const [a, setA] = useState("1");
  const [b, setB] = useState("-4");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    fn: string;
    domain: string;
    note: string;
  } | null>(null);

  const run = () => {
    setError(null);
    if (type === "polynomial") {
      setResult({
        fn: "Any polynomial",
        domain: "(−∞, ∞)",
        note: "Polynomials are defined for every real number.",
      });
      scrollResultIntoViewMobile(resultRef.current);
      return;
    }
    const av = Number.parseFloat(a);
    const bv = Number.parseFloat(b);
    if (!Number.isFinite(av) || !Number.isFinite(bv)) {
      setError("Enter valid numbers for a and b.");
      setResult(null);
      return;
    }
    if (av === 0) {
      setError("a cannot be 0 for this function form.");
      setResult(null);
      return;
    }
    const root = -bv / av;
    const rootStr = formatNum(root, 6);
    const expr = `${formatNum(av, 6)}x ${bv >= 0 ? "+" : "−"} ${formatNum(Math.abs(bv), 6)}`;

    if (type === "sqrt") {
      // need ax + b >= 0
      const domain =
        av > 0 ? `[${rootStr}, ∞)` : `(−∞, ${rootStr}]`;
      setResult({
        fn: `f(x) = √(${expr})`,
        domain,
        note: `Requires ${expr} ≥ 0.`,
      });
    } else if (type === "rational") {
      setResult({
        fn: `f(x) = 1 ÷ (${expr})`,
        domain: `(−∞, ${rootStr}) ∪ (${rootStr}, ∞)`,
        note: `Excludes x = ${rootStr} where the denominator is 0.`,
      });
    } else {
      // log: need ax + b > 0
      const domain = av > 0 ? `(${rootStr}, ∞)` : `(−∞, ${rootStr})`;
      setResult({
        fn: `f(x) = ln(${expr})`,
        domain,
        note: `Requires ${expr} > 0.`,
      });
    }
    scrollResultIntoViewMobile(resultRef.current);
  };

  const needsCoeffs = type !== "polynomial";

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label htmlFor="dom-type" className={calcLabelClass}>
          Function form
        </label>
        <CustomSelect<FnType>
          id="dom-type"
          value={type}
          onChange={setType}
          options={[
            { value: "polynomial", label: "Polynomial — ax² + bx + c …" },
            { value: "sqrt", label: "Square root — √(ax + b)" },
            { value: "rational", label: "Rational — 1 / (ax + b)" },
            { value: "log", label: "Logarithm — ln(ax + b)" },
          ]}
        />
      </div>
      {needsCoeffs ? (
        <>
          <CalculatorNumberField
            id="dom-a"
            label="a (coefficient of x)"
            step="any"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
          <CalculatorNumberField
            id="dom-b"
            label="b (constant)"
            step="any"
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
        </>
      ) : null}
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Find domain
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full max-w-md">
      <p className="mb-2 text-center text-3xl font-semibold text-[#d66844]">
        {result.domain}
      </p>
      <p className="mb-3 text-center text-[14px] font-medium text-[#334155]">domain</p>
      <dl>
        <CalculatorResultRow label="Function" value={result.fn} />
        <CalculatorResultRow label="Condition" value={result.note} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>
      Pick a function form to find its domain in interval notation.
    </CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px]">
          Covers the most common single-term function forms with a linear inner
          expression ax + b.
        </p>
      }
    />
  );
}
