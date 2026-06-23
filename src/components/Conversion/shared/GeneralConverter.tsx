"use client";

import { useMemo, useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  convertGeneral,
  GENERAL_CATEGORIES,
  GENERAL_CATEGORY_BY_ID,
  type GeneralUnit,
} from "@/components/Conversion/shared/generalConversion";

type Props = {
  emptyHint: string;
};

type Resolved = {
  output: string;
  inputValue: string;
  from: GeneralUnit;
  to: GeneralUnit;
};

const selectClass = `${fieldBase} w-full appearance-none bg-white`;

export function GeneralConverter({ emptyHint }: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [categoryId, setCategoryId] = useState(GENERAL_CATEGORIES[0].id);
  const [fromId, setFromId] = useState(GENERAL_CATEGORIES[0].units[0].id);
  const [toId, setToId] = useState(GENERAL_CATEGORIES[0].units[1].id);
  const [value, setValue] = useState("1");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Resolved | null>(null);

  const units = useMemo(
    () => GENERAL_CATEGORY_BY_ID.get(categoryId)?.units ?? [],
    [categoryId],
  );

  const onCategoryChange = (nextId: string) => {
    const next = GENERAL_CATEGORY_BY_ID.get(nextId);
    if (!next) return;
    setCategoryId(nextId);
    setFromId(next.units[0].id);
    setToId(next.units[1]?.id ?? next.units[0].id);
    setError(null);
    setResult(null);
  };

  const swap = () => {
    setFromId(toId);
    setToId(fromId);
    setError(null);
    setResult(null);
  };

  const run = () => {
    setError(null);
    const trimmed = value.trim();
    if (trimmed === "") {
      setError("Enter a value to convert.");
      setResult(null);
      return;
    }
    const n = Number(trimmed);
    if (!Number.isFinite(n)) {
      setError("Enter a valid number.");
      setResult(null);
      return;
    }
    const converted = convertGeneral(n, categoryId, fromId, toId);
    const from = units.find((u) => u.id === fromId);
    const to = units.find((u) => u.id === toId);
    if (converted == null || !from || !to) {
      setError("Could not convert these units.");
      setResult(null);
      return;
    }
    const decimals = categoryId === "temperature" ? 2 : 6;
    setResult({
      output: formatNum(converted, decimals),
      inputValue: formatNum(n, decimals),
      from,
      to,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="general-category"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Measurement
        </label>
        <select
          id="general-category"
          value={categoryId}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={selectClass}
        >
          {GENERAL_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="general-value"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Value
        </label>
        <input
          id="general-value"
          type="number"
          inputMode="decimal"
          step="any"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`${fieldBase} w-full font-mono`}
        />
      </div>

      <div className="flex items-end gap-2">
        <div className="min-w-0 flex-1">
          <label
            htmlFor="general-from"
            className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
          >
            From
          </label>
          <select
            id="general-from"
            value={fromId}
            onChange={(e) => setFromId(e.target.value)}
            className={selectClass}
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label} ({u.symbol})
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={swap}
          aria-label="Swap units"
          className="mb-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border border-[#E0E0E0] bg-white text-[#64748b] transition-colors hover:border-[#2374ac] hover:text-[#2374ac]"
        >
          ⇄
        </button>
        <div className="min-w-0 flex-1">
          <label
            htmlFor="general-to"
            className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
          >
            To
          </label>
          <select
            id="general-to"
            value={toId}
            onChange={(e) => setToId(e.target.value)}
            className={selectClass}
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label} ({u.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Convert
      </button>
    </div>
  );

  const resultPanel =
    result != null ? (
      <div className="text-center">
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">
          {result.to.label}
        </p>
        <p className="mt-1 font-semibold text-[#d66844] text-3xl sm:text-4xl">
          {result.output}
          <span className="ml-1.5 text-[18px] font-medium text-[#334155] sm:text-[20px]">
            {result.to.symbol}
          </span>
        </p>
        <p className="mt-3 text-[12px] text-[#94a3b8] sm:text-[13px]">
          {result.inputValue} {result.from.symbol} → {result.output}{" "}
          {result.to.symbol}
        </p>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        {emptyHint}
      </p>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Conversions use standard factors (US customary units for volume). For
          critical measurements, confirm with an authoritative source.
        </p>
      }
    />
  );
}
