"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import {
  convertShoeSize,
  type ShoeGender,
  type ShoeSizes,
  type ShoeSystem,
} from "@/components/Conversion/shared/conversionUtils";

type Props = {
  emptyHint: string;
};

const SYSTEM_OPTIONS: { id: ShoeSystem; label: string }[] = [
  { id: "us", label: "US" },
  { id: "uk", label: "UK" },
  { id: "eu", label: "EU" },
  { id: "cm", label: "CM (foot length)" },
];

const selectClass = `${fieldBase} w-full appearance-none bg-white`;

export function ShoeSizeConverter({ emptyHint }: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [gender, setGender] = useState<ShoeGender>("men");
  const [system, setSystem] = useState<ShoeSystem>("us");
  const [value, setValue] = useState("9");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ShoeSizes | null>(null);

  const run = () => {
    setError(null);
    const trimmed = value.trim();
    if (trimmed === "") {
      setError("Enter a shoe size to convert.");
      setResult(null);
      return;
    }
    const n = Number(trimmed);
    if (!Number.isFinite(n) || n <= 0) {
      setError("Enter a valid size greater than 0.");
      setResult(null);
      return;
    }
    const sizes = convertShoeSize(n, gender, system);
    if (sizes == null) {
      setError("Could not convert this size.");
      setResult(null);
      return;
    }
    setResult(sizes);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Gender
        </p>
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#334155] sm:text-[15px]">
            <input
              type="radio"
              name="shoe-gender"
              checked={gender === "men"}
              onChange={() => setGender("men")}
              className="h-3.5 w-3.5 accent-[#2374ac]"
            />
            Men
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#334155] sm:text-[15px]">
            <input
              type="radio"
              name="shoe-gender"
              checked={gender === "women"}
              onChange={() => setGender("women")}
              className="h-3.5 w-3.5 accent-[#2374ac]"
            />
            Women
          </label>
        </div>
      </div>
      <div>
        <label
          htmlFor="shoe-system"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Size system
        </label>
        <select
          id="shoe-system"
          value={system}
          onChange={(e) => setSystem(e.target.value as ShoeSystem)}
          className={selectClass}
        >
          {SYSTEM_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="shoe-value"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Size
        </label>
        <input
          id="shoe-value"
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`${fieldBase} w-full font-mono`}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Convert
      </button>
    </div>
  );

  const resultPanel =
    result != null ? (
      <div className="w-full max-w-[16rem]">
        <dl className="grid grid-cols-2 gap-2">
          {[
            { label: "US", value: result.us },
            { label: "UK", value: result.uk },
            { label: "EU", value: result.eu },
            { label: "CM", value: result.cm },
          ].map((row) => (
            <div
              key={row.label}
              className="rounded-md border border-[#E8ECF0] bg-[#f8fafc] px-3 py-2 text-center"
            >
              <dt className="text-[11px] uppercase tracking-wide text-[#94a3b8]">
                {row.label}
              </dt>
              <dd className="mt-0.5 text-xl font-semibold text-[#d66844]">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
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
          Shoe sizes are approximate and vary by brand and last. Use foot length
          (CM) and brand size charts for the best fit.
        </p>
      }
    />
  );
}
