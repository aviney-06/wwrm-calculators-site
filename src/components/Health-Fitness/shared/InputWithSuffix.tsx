"use client";

import type { ComponentProps } from "react";
import { fieldBase, numberInputNoSpinnerClass } from "./calculatorStyles";

export { numberInputNoSpinnerClass };

export function InputWithSuffix({
  suffix,
  className = "",
  inputClassName = "",
  type,
  ...inputProps
}: ComponentProps<"input"> & {
  suffix: string;
  inputClassName?: string;
}) {
  const hasSuffix = suffix.trim().length > 0;
  const isNumber = type === "number";

  return (
    <div className={`relative inline-flex ${className}`}>
      <input
        {...inputProps}
        type={type}
        className={[
          fieldBase,
          !hasSuffix && "!pr-2 sm:!pr-2.5",
          isNumber && numberInputNoSpinnerClass,
          inputClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      />
      {hasSuffix ? (
        <span
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none text-[11px] text-[#64748b] sm:right-2.5 sm:text-[12px]"
          aria-hidden
        >
          {suffix}
        </span>
      ) : null}
    </div>
  );
}
