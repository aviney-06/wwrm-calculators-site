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
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 select-none text-[12px] text-neutral-1/70"
        aria-hidden
      >
        {suffix}
      </span>
    </div>
  );
}
