"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import {
  CalculatorEmptyResult,
  CalculatorResultRow,
  calcLabelClass,
} from "@/components/shared/calculatorFields";
import { fmt } from "@/components/Other/shared/measureUtils";

type FI = { ft: string; in: string };

function toInches(v: FI): number | null {
  const ft = Number(v.ft || "0");
  const inch = Number(v.in || "0");
  if (![ft, inch].every((n) => Number.isFinite(n) && n >= 0)) return null;
  return ft * 12 + inch;
}

function Row({
  prefix,
  value,
  onChange,
}: {
  prefix: string;
  value: FI;
  onChange: (v: FI) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      <div>
        <label htmlFor={`${prefix}-ft`} className={calcLabelClass}>
          Feet
        </label>
        <input
          id={`${prefix}-ft`}
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          value={value.ft}
          placeholder="0"
          onChange={(e) => onChange({ ...value, ft: e.target.value })}
          className={`${fieldBase} w-full`}
        />
      </div>
      <div>
        <label htmlFor={`${prefix}-in`} className={calcLabelClass}>
          Inches
        </label>
        <input
          id={`${prefix}-in`}
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          value={value.in}
          placeholder="0"
          onChange={(e) => onChange({ ...value, in: e.target.value })}
          className={`${fieldBase} w-full`}
        />
      </div>
    </div>
  );
}

export function FeetInches_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState<FI>({ ft: "5", in: "8" });
  const [b, setB] = useState<FI>({ ft: "2", in: "6" });
  const [op, setOp] = useState<"add" | "subtract">("add");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    ftIn: string;
    totalInches: number;
    decimalFeet: number;
  } | null>(null);

  const run = () => {
    setError(null);
    const ia = toInches(a);
    const ib = toInches(b);
    if (ia == null || ib == null) {
      setError("Enter valid, non-negative feet and inches.");
      setResult(null);
      return;
    }
    const total = op === "add" ? ia + ib : ia - ib;
    const sign = total < 0 ? "-" : "";
    const abs = Math.abs(total);
    const ft = Math.floor(abs / 12);
    const inch = Math.round((abs - ft * 12) * 100) / 100;
    setResult({
      ftIn: `${sign}${ft} ft ${inch} in`,
      totalInches: Math.round(total * 100) / 100,
      decimalFeet: Math.round((total / 12) * 1000) / 1000,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-5">
      <div>
        <p className={`${calcLabelClass} mb-2`}>First measurement</p>
        <Row prefix="fi-a" value={a} onChange={setA} />
      </div>
      <div>
        <label htmlFor="fi-op" className={calcLabelClass}>
          Operation
        </label>
        <select
          id="fi-op"
          value={op}
          onChange={(e) => setOp(e.target.value as "add" | "subtract")}
          className={`${fieldBase} w-full`}
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (−)</option>
        </select>
      </div>
      <div>
        <p className={`${calcLabelClass} mb-2`}>Second measurement</p>
        <Row prefix="fi-b" value={b} onChange={setB} />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Result</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {result.ftIn}
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Total inches" value={`${fmt(result.totalInches)} in`} />
        <CalculatorResultRow label="Decimal feet" value={`${result.decimalFeet} ft`} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter two measurements to add or subtract.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
