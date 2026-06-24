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

const num = (v: string) => Number.parseFloat(v);

export function Limit_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  // numerator a x^2 + b x + c, denominator d x^2 + e x + f
  const [na, setNa] = useState("1");
  const [nb, setNb] = useState("-1");
  const [nc, setNc] = useState("-2");
  const [da, setDa] = useState("0");
  const [db, setDb] = useState("1");
  const [dc, setDc] = useState("-2");
  const [target, setTarget] = useState("2");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    limit: string;
    leftSide: string;
    rightSide: string;
  } | null>(null);

  const run = () => {
    setError(null);
    const coeffs = [na, nb, nc, da, db, dc, target].map(num);
    if (coeffs.some((n) => !Number.isFinite(n))) {
      setError("Enter valid numbers for every coefficient and the target value.");
      setResult(null);
      return;
    }
    const [Na, Nb, Nc, Da, Db, Dc, x0] = coeffs as [
      number, number, number, number, number, number, number,
    ];
    const f = (x: number) => {
      const top = Na * x * x + Nb * x + Nc;
      const bottom = Da * x * x + Db * x + Dc;
      return top / bottom;
    };

    const h = 1e-6;
    const left = f(x0 - h);
    const right = f(x0 + h);

    if (!Number.isFinite(left) || !Number.isFinite(right)) {
      setError("The function is unbounded near that point — the limit does not exist (or is ±∞).");
      setResult(null);
      return;
    }

    const tol = Math.max(1e-4, Math.abs(left) * 1e-4);
    if (Math.abs(left - right) > tol) {
      setError("Left- and right-hand values disagree — the two-sided limit does not exist.");
      setResult(null);
      return;
    }

    const estimate = (left + right) / 2;
    // Snap to a clean value when extremely close.
    const rounded = Math.abs(estimate - Math.round(estimate)) < 1e-6 ? Math.round(estimate) : estimate;

    setResult({
      limit: formatNum(rounded, 6),
      leftSide: formatNum(left, 6),
      rightSide: formatNum(right, 6),
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const coeffRow = (
    label: string,
    fields: { id: string; ph: string; value: string; set: (v: string) => void }[],
  ) => (
    <div>
      <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">{label}</p>
      <div className="grid grid-cols-3 gap-2">
        {fields.map((fld) => (
          <CalculatorNumberField
            key={fld.id}
            id={fld.id}
            label={fld.ph}
            step="any"
            value={fld.value}
            onChange={(e) => fld.set(e.target.value)}
          />
        ))}
      </div>
    </div>
  );

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        Limit of (a x² + b x + c) ÷ (d x² + e x + f) as x → target.
      </p>
      {coeffRow("Numerator (a, b, c)", [
        { id: "lim-na", ph: "a", value: na, set: setNa },
        { id: "lim-nb", ph: "b", value: nb, set: setNb },
        { id: "lim-nc", ph: "c", value: nc, set: setNc },
      ])}
      {coeffRow("Denominator (d, e, f)", [
        { id: "lim-da", ph: "d", value: da, set: setDa },
        { id: "lim-db", ph: "e", value: db, set: setDb },
        { id: "lim-dc", ph: "f", value: dc, set: setDc },
      ])}
      <CalculatorNumberField
        id="lim-target"
        label="x approaches"
        step="any"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Estimate limit
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full max-w-md">
      <p className="mb-2 text-center text-4xl font-semibold text-[#d66844]">
        {result.limit}
      </p>
      <p className="mb-3 text-center text-[14px] font-medium text-[#334155]">
        limit as x → {target}
      </p>
      <dl>
        <CalculatorResultRow label="Left-hand value" value={result.leftSide} />
        <CalculatorResultRow label="Right-hand value" value={result.rightSide} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>
      Enter the rational function coefficients and the target value.
    </CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px]">
          Numerically estimates the two-sided limit, handling removable
          discontinuities (0/0). Set unused higher-order coefficients to 0.
        </p>
      }
    />
  );
}
