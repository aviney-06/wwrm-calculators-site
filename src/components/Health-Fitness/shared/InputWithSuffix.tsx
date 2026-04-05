"use client";

import type { ComponentProps } from "react";
import { fieldBase } from "./calculatorStyles";

export function InputWithSuffix({
  suffix,
  className = "",
  inputClassName = "",
  ...inputProps
}: ComponentProps<"input"> & {
  suffix: string;
  inputClassName?: string;
}) {
  return (
    <div className={`relative inline-flex ${className}`}>
      <input {...inputProps} className={`${fieldBase} ${inputClassName}`} />
      <span
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none text-[11px] text-[#64748b] sm:right-2.5 sm:text-[12px]"
        aria-hidden
      >
        {suffix}
      </span>
    </div>
  );
}
