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
  calcHintClass,
} from "@/components/shared/calculatorFields";

export function Calculus_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [coef, setCoef] = useState("3");
  const [power, setPower] = useState("2");
  const [x, setX] = useState("4");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ deriv: string; atX: string } | null>(null);

  const run = () => {
    setError(null);
    const c = Number.parseFloat(coef);
    const n = Number.parseFloat(power);
    const xv = Number.parseFloat(x);
    if (![c, n, xv].every(Number.isFinite)) {
      setError("Enter valid numbers.");
      setOut(null);
      return;
    }
    if (n === 0) {
      setOut({ deriv: "0", atX: "0" });
    } else {
      const newCoef = c * n;
      const newPow = n - 1;
      const at = newCoef * Math.pow(xv, newPow);
      const rule =
        newPow === 1
          ? `${formatNum(newCoef)}x`
          : newPow === 0
            ? formatNum(newCoef)
            : `${formatNum(newCoef)}x^${formatNum(newPow)}`;
      setOut({ deriv: rule, atX: formatNum(at) });
    }
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className={calcHintClass}>Derivative of f(x) = c·xⁿ at x (power rule).</p>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <CalculatorNumberField
          id="calculus-c"
          label="c"
          step="any"
          value={coef}
          onChange={(e) => setCoef(e.target.value)}
        />
        <CalculatorNumberField
          id="calculus-n"
          label="n"
          step="any"
          value={power}
          onChange={(e) => setPower(e.target.value)}
        />
        <CalculatorNumberField
          id="calculus-x"
          label="x"
          step="any"
          value={x}
          onChange={(e) => setX(e.target.value)}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate derivative
      </button>
    </div>
  );

  const result = out ? (
    <dl className="w-full max-w-md">
      <CalculatorResultRow label="f′(x)" value={out.deriv} />
      <CalculatorResultRow label="f′ at x" value={out.atX} />
    </dl>
  ) : (
    <CalculatorEmptyResult>Enter c, n, and x for the power-rule derivative.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          For f(x) = c·xⁿ, f′(x) = c·n·xⁿ⁻¹. Constant terms differentiate to 0.
        </p>
      }
    />
  );
}
