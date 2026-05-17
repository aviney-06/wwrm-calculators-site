"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { ImperialFtInFields } from "@/components/Health-Fitness/shared/ImperialFtInFields";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { toCm } from "@/components/Health-Fitness/shared/healthConversions";
import { formatNum } from "@/components/Maths/shared/mathUtils";

type Props = {
  defaultFt?: string;
  defaultIn?: string;
  emptyHint: string;
};

export function FtInToCmConverter({
  defaultFt = "5",
  defaultIn = "7",
  emptyHint,
}: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [ft, setFt] = useState(defaultFt);
  const [inch, setInch] = useState(defaultIn);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const f = Number(ft.trim());
    const i = Number(inch.trim());
    if (
      ft.trim() === "" ||
      inch.trim() === "" ||
      !Number.isFinite(f) ||
      !Number.isFinite(i) ||
      f < 0 ||
      i < 0
    ) {
      setError("Enter valid feet and inches.");
      setResult(null);
      return;
    }
    if (i >= 12) {
      setError("Inches must be less than 12 (use feet for the rest).");
      setResult(null);
      return;
    }
    const cm = toCm(f, i);
    setResult(formatNum(cm, 1));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Height
        </p>
        <ImperialFtInFields
          ft={ft}
          inch={inch}
          onFtChange={setFt}
          onInchChange={setInch}
          ftInputProps={{ min: 0, id: "height-ft" }}
          inInputProps={{ min: 0, max: 11.9, step: 0.1, id: "height-in" }}
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
      <div className="text-center">
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">Centimeters</p>
        <p className="mt-1 text-3xl font-semibold text-[#d66844] sm:text-4xl">
          {result}
          <span className="ml-1.5 text-[18px] font-medium text-[#334155] sm:text-[20px]">
            cm
          </span>
        </p>
        <p className="mt-3 text-[12px] text-[#94a3b8] sm:text-[13px]">
          {ft} ft {inch} in → {result} cm
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
          Conversions use standard factors. For critical measurements, confirm
          with an authoritative source.
        </p>
      }
    />
  );
}
