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
import {
  durationMinutes,
  minutesToDecimalHours,
  minutesToHM,
  parseTimeToMinutes,
} from "@/components/Other/shared/dateTimeUtils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type DayRow = { start: string; end: string; brk: string };

const emptyRow: DayRow = { start: "", end: "", brk: "" };

export function TimeCard_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [rows, setRows] = useState<DayRow[]>(() =>
    DAYS.map((_, i) =>
      i < 5 ? { start: "09:00", end: "17:00", brk: "30" } : { ...emptyRow },
    ),
  );
  const [rate, setRate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    hm: string;
    decimal: number;
    pay: string | null;
    perDay: { day: string; hm: string }[];
  } | null>(null);

  const update = (i: number, key: keyof DayRow, value: string) => {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [key]: value } : r)));
  };

  const run = () => {
    setError(null);
    let total = 0;
    const perDay: { day: string; hm: string }[] = [];
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i]!;
      if (!r.start && !r.end) {
        perDay.push({ day: DAYS[i]!, hm: "—" });
        continue;
      }
      const s = parseTimeToMinutes(r.start);
      const e = parseTimeToMinutes(r.end);
      if (s == null || e == null) {
        setError(`Enter valid times for ${DAYS[i]} (or leave both blank).`);
        setResult(null);
        return;
      }
      const brk = Number(r.brk || "0");
      if (!Number.isFinite(brk) || brk < 0) {
        setError(`Enter a valid break for ${DAYS[i]}.`);
        setResult(null);
        return;
      }
      const worked = Math.max(0, durationMinutes(s, e) - brk);
      total += worked;
      const { hours, minutes } = minutesToHM(worked);
      perDay.push({ day: DAYS[i]!, hm: `${hours} h ${minutes} m` });
    }
    const { hours, minutes } = minutesToHM(total);
    const decimal = minutesToDecimalHours(total);
    let pay: string | null = null;
    if (rate.trim() !== "") {
      const r = Number(rate);
      if (Number.isFinite(r) && r >= 0) pay = `$${(decimal * r).toFixed(2)}`;
    }
    setResult({ hm: `${hours} h ${minutes} min`, decimal, pay, perDay });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        Enter clock in/out and break minutes for each day. Leave a day blank to skip it.
      </p>
      <div className="flex flex-col gap-2">
        {rows.map((r, i) => (
          <div key={DAYS[i]} className="flex items-center gap-1.5">
            <span className="w-9 shrink-0 text-[12px] font-medium text-[#64748b]">
              {DAYS[i]}
            </span>
            <input
              type="time"
              value={r.start}
              onChange={(e) => update(i, "start", e.target.value)}
              className={`${fieldBase} min-w-0 flex-1`}
              aria-label={`${DAYS[i]} clock in`}
            />
            <input
              type="time"
              value={r.end}
              onChange={(e) => update(i, "end", e.target.value)}
              className={`${fieldBase} min-w-0 flex-1`}
              aria-label={`${DAYS[i]} clock out`}
            />
            <input
              type="number"
              min={0}
              inputMode="numeric"
              value={r.brk}
              placeholder="brk"
              onChange={(e) => update(i, "brk", e.target.value)}
              className={`${fieldBase} w-14 shrink-0`}
              aria-label={`${DAYS[i]} break minutes`}
            />
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="tcard-rate" className={calcLabelClass}>
          Hourly rate
          <span className="font-normal text-[#94a3b8]"> (optional)</span>
        </label>
        <input
          id="tcard-rate"
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          value={rate}
          placeholder="$/hr"
          onChange={(e) => setRate(e.target.value)}
          className={`${fieldBase} w-full`}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate weekly total
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Weekly total</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {result.hm}
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Decimal hours" value={String(result.decimal)} />
        {result.pay ? <CalculatorResultRow label="Gross pay" value={result.pay} /> : null}
        {result.perDay.map((d) => (
          <CalculatorResultRow key={d.day} label={d.day} value={d.hm} />
        ))}
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Fill in your week to total the hours.</CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
