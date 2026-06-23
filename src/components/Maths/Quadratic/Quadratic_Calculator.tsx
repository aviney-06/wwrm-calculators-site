"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorResultRow,
  calcLabelClass,
} from "@/components/shared/calculatorFields";

export function Quadratic_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("1");
  const [b, setB] = useState("-3");
  const [c, setC] = useState("2");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    headline: string;
    discriminant: string;
    nature: string;
    vertex: string;
  } | null>(null);

  const run = () => {
    setError(null);
    const av = parseFloat(a);
    const bv = parseFloat(b);
    const cv = parseFloat(c);
    if (![av, bv, cv].every(Number.isFinite)) {
      setError("Enter valid numbers for a, b, and c.");
      setResult(null);
      return;
    }
    if (av === 0) {
      setError("Coefficient a cannot be zero for a quadratic equation.");
      setResult(null);
      return;
    }
    const disc = bv * bv - 4 * av * cv;
    const vx = -bv / (2 * av);
    const vy = av * vx * vx + bv * vx + cv;
    const vertex = `(${formatNum(vx)}, ${formatNum(vy)})`;

    let headline: string;
    let nature: string;
    if (disc > 0) {
      const sq = Math.sqrt(disc);
      const x1 = (-bv + sq) / (2 * av);
      const x2 = (-bv - sq) / (2 * av);
      headline = `x₁ = ${formatNum(x1)},  x₂ = ${formatNum(x2)}`;
      nature = "Two distinct real roots";
    } else if (disc === 0) {
      const x1 = -bv / (2 * av);
      headline = `x = ${formatNum(x1)}`;
      nature = "One repeated real root";
    } else {
      const real = -bv / (2 * av);
      const imag = Math.sqrt(-disc) / (2 * av);
      const r = formatNum(real);
      const i = formatNum(Math.abs(imag));
      headline = `x = ${r} ± ${i}i`;
      nature = "Two complex roots";
    }

    setResult({
      headline,
      discriminant: formatNum(disc),
      nature,
      vertex,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const field = (id: string, label: string, value: string, setter: (v: string) => void) => (
    <div>
      <label htmlFor={id} className={calcLabelClass}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        step="any"
        inputMode="decimal"
        value={value}
        onChange={(e) => setter(e.target.value)}
        className={`${fieldBase} w-full`}
      />
    </div>
  );

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        For an equation of the form <span className="font-mono">ax² + bx + c = 0</span>.
      </p>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {field("qf-a", "a", a, setA)}
        {field("qf-b", "b", b, setB)}
        {field("qf-c", "c", c, setC)}
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Solve equation
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Roots</p>
      <p className="mt-1 text-center text-2xl font-bold text-[#d66844] sm:text-3xl">
        {result.headline}
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Nature of roots" value={result.nature} />
        <CalculatorResultRow label="Discriminant (b² − 4ac)" value={result.discriminant} />
        <CalculatorResultRow label="Vertex" value={result.vertex} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>x = (−b ± √(b² − 4ac)) / 2a</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
