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
import { pad2 } from "@/components/Other/shared/dateTimeUtils";

type Triple = { h: string; m: string; s: string };

function toSeconds(t: Triple): number | null {
  const h = Number(t.h || "0");
  const m = Number(t.m || "0");
  const s = Number(t.s || "0");
  if (![h, m, s].every((n) => Number.isFinite(n) && n >= 0)) return null;
  return h * 3600 + m * 60 + s;
}

function TripleInput({
  prefix,
  value,
  onChange,
}: {
  prefix: string;
  value: Triple;
  onChange: (t: Triple) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {(["h", "m", "s"] as const).map((k) => (
        <div key={k}>
          <label htmlFor={`${prefix}-${k}`} className={calcLabelClass}>
            {k === "h" ? "Hours" : k === "m" ? "Minutes" : "Seconds"}
          </label>
          <input
            id={`${prefix}-${k}`}
            type="number"
            min={0}
            inputMode="numeric"
            value={value[k]}
            placeholder="0"
            onChange={(e) => onChange({ ...value, [k]: e.target.value })}
            className={`${fieldBase} w-full`}
          />
        </div>
      ))}
    </div>
  );
}

export function TimeAdd_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState<Triple>({ h: "2", m: "30", s: "0" });
  const [b, setB] = useState<Triple>({ h: "1", m: "45", s: "0" });
  const [op, setOp] = useState<"add" | "subtract">("add");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ clock: string; decimal: number } | null>(null);

  const run = () => {
    setError(null);
    const sa = toSeconds(a);
    const sb = toSeconds(b);
    if (sa == null || sb == null) {
      setError("Enter valid, non-negative time values.");
      setResult(null);
      return;
    }
    const total = op === "add" ? sa + sb : sa - sb;
    const sign = total < 0 ? "-" : "";
    const abs = Math.abs(total);
    const h = Math.floor(abs / 3600);
    const m = Math.floor((abs % 3600) / 60);
    const s = abs % 60;
    setResult({
      clock: `${sign}${h}:${pad2(m)}:${pad2(s)}`,
      decimal: Math.round((total / 3600) * 100) / 100,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-5">
      <div>
        <p className={`${calcLabelClass} mb-2`}>First time</p>
        <TripleInput prefix="ta-a" value={a} onChange={setA} />
      </div>
      <div>
        <label htmlFor="ta-op" className={calcLabelClass}>
          Operation
        </label>
        <select
          id="ta-op"
          value={op}
          onChange={(e) => setOp(e.target.value as "add" | "subtract")}
          className={`${fieldBase} w-full`}
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (−)</option>
        </select>
      </div>
      <div>
        <p className={`${calcLabelClass} mb-2`}>Second time</p>
        <TripleInput prefix="ta-b" value={b} onChange={setB} />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">
        Result (h : mm : ss)
      </p>
      <p className="mt-1 text-center font-mono text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {result.clock}
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Decimal hours" value={String(result.decimal)} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter two times to add or subtract.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
