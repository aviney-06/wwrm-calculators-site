"use client";

import type { ComponentProps, ReactNode } from "react";
import {
  fieldBase,
  numberInputNoSpinnerClass,
} from "@/components/Health-Fitness/shared/calculatorStyles";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";

export const calcLabelClass =
  "mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]";

export const calcHintClass = "text-[13px] text-[#64748b] sm:text-[14px]";

export const calcTextareaClass =
  "w-full rounded border border-[#E0E0E0] bg-white px-3 py-2 text-[14px] text-[#334155] outline-none focus:border-[#2374ac] focus:ring-1 focus:ring-[#2374ac]";

export const calcEmptyResultClass =
  "max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]";

type NumberFieldProps = Omit<ComponentProps<"input">, "className"> & {
  id: string;
  label: ReactNode;
  suffix?: string;
  hint?: string;
  optional?: boolean;
  wrapperClassName?: string;
};

/** Labelled number (or text) input — matches Mileage / IP Subnet calculators. */
export function CalculatorNumberField({
  id,
  label,
  suffix,
  hint,
  optional,
  wrapperClassName = "",
  type = "number",
  inputMode,
  ...inputProps
}: NumberFieldProps) {
  // On mobile, surface the numeric keypad by default for number fields.
  const resolvedInputMode =
    inputMode ?? (type === "number" ? "decimal" : undefined);
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className={calcLabelClass}>
        {label}
        {optional ? (
          <span className="font-normal text-[#94a3b8]"> (optional)</span>
        ) : null}
      </label>
      {hint ? <p className={`mb-1.5 ${calcHintClass}`}>{hint}</p> : null}
      {suffix != null && suffix !== "" ? (
        <InputWithSuffix
          id={id}
          type={type}
          inputMode={resolvedInputMode}
          suffix={suffix}
          className="w-full min-w-0"
          inputClassName="w-full"
          {...inputProps}
        />
      ) : (
        <input
          id={id}
          type={type}
          inputMode={resolvedInputMode}
          className={[
            fieldBase,
            "w-full",
            type === "number" ? numberInputNoSpinnerClass : "",
          ]
            .filter(Boolean)
            .join(" ")}
          {...inputProps}
        />
      )}
    </div>
  );
}

type NumbersListProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
};

/** Comma-separated number list — matches Standard Deviation calculator. */
export function CalculatorNumbersListField({
  id,
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
}: NumbersListProps) {
  return (
    <div>
      <label htmlFor={id} className={calcLabelClass}>
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className={calcTextareaClass}
      />
    </div>
  );
}

export function CalculatorResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-col gap-0.5 border-b border-[#E8ECF0] py-2 text-left last:border-b-0 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-[12px] font-medium text-[#64748b] sm:text-[13px]">{label}</dt>
      <dd className="font-mono text-[13px] text-[#334155] sm:text-right sm:text-[14px]">
        {value}
      </dd>
    </div>
  );
}

export function CalculatorEmptyResult({ children }: { children: ReactNode }) {
  return <p className={calcEmptyResultClass}>{children}</p>;
}
