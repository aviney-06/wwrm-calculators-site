"use client";

import type { ComponentProps } from "react";
import { InputWithSuffix } from "./InputWithSuffix";
import {
  imperialHeightFieldClass,
  imperialHeightInputClass,
  imperialHeightRowClass,
} from "./calculatorStyles";

type InputExtras = Omit<
  ComponentProps<"input">,
  "type" | "value" | "onChange" | "suffix"
>;

type Props = {
  ft: string;
  inch: string;
  onFtChange: (value: string) => void;
  onInchChange: (value: string) => void;
  ftInputProps?: InputExtras;
  inInputProps?: InputExtras;
};

export function ImperialFtInFields({
  ft,
  inch,
  onFtChange,
  onInchChange,
  ftInputProps,
  inInputProps,
}: Props) {
  return (
    <div className={imperialHeightRowClass}>
      <InputWithSuffix
        type="number"
        value={ft}
        onChange={(e) => onFtChange(e.target.value)}
        suffix="ft"
        className={imperialHeightFieldClass}
        inputClassName={imperialHeightInputClass}
        {...ftInputProps}
      />
      <InputWithSuffix
        type="number"
        max={11.9}
        step={0.1}
        value={inch}
        onChange={(e) => onInchChange(e.target.value)}
        suffix="in"
        className={imperialHeightFieldClass}
        inputClassName={imperialHeightInputClass}
        {...inInputProps}
      />
    </div>
  );
}
