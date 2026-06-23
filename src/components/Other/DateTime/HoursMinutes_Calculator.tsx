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
import { minutesToDecimalHours } from "@/components/Other/shared/dateTimeUtils";

type Row = { h: string; m: string };

export function HoursMinutes_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [rows, setRows] = useState<Row[]>([
    { h: "8", m: "30" },
    { h: "7", m: "45" },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    hm: string;
    decimal: number;
    minutes: number;
  } | null>(null);

  const update = (i: number, key: keyof Row, value: string) => {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [key]: value } : r)));
  };
  const addRow = () => setRows((prev) => [...prev, { h: "", m: "" }]);
  const removeRow = (i: number) =>
    setRows((prev) => (prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev));

  const run = () => {
    setError(null);
    let total = 0;
    for (const r of rows) {
      const h = Number(r.h || "0");
      const m = Number(r.m || "0");
      if (![h, m].every((n) => Number.isFinite(n) && n >= 0)) {
        setError("Enter valid, non-negative hours and minutes.");
        setResult(null);
        return;
      }
      total += h * 60 + m;
    }
    setResult({
      hm: `${Math.floor(total / 60)} h ${total % 60} min`,
      decimal: minutesToDecimalHours(total),
      minutes: total,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        Add as many hours &amp; minutes entries as you like to get a running total.
      </p>
      <div className="flex flex-col gap-2">
        {rows.map((r, i) => (
          <div key={i} className="flex items-end gap-2">
            <div className="flex-1">
              {i === 0 ? <label className={calcLabelClass}>Hours</label> : null}
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={r.h}
                placeholder="0"
                onChange={(e) => update(i, "h", e.target.value)}
                className={`${fieldBase} w-full`}
                aria-label={`Hours row ${i + 1}`}
              />
            </div>
            <div className="flex-1">
              {i === 0 ? <label className={calcLabelClass}>Minutes</label> : null}
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={r.m}
                placeholder="0"
                onChange={(e) => update(i, "m", e.target.value)}
                className={`${fieldBase} w-full`}
                aria-label={`Minutes row ${i + 1}`}
              />
            </div>
            <button
              type="button"
              onClick={() => removeRow(i)}
              className="mb-0.5 h-9 w-9 shrink-0 rounded border border-[#E0E0E0] text-[#64748b] hover:bg-[#f1f5f9]"
              aria-label={`Remove row ${i + 1}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addRow}
        className="self-start text-[13px] font-medium text-[#4CAF50] hover:underline"
      >
        + Add another
      </button>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Add up time
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Total time</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {result.hm}
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Decimal hours" value={String(result.decimal)} />
        <CalculatorResultRow label="Total minutes" value={result.minutes.toLocaleString()} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter hours and minutes to total them up.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
