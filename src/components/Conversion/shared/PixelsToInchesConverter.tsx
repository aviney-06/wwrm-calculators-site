"use client";

import { useRef, useState } from "react";
import { btnCalculate, numberFieldClass } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import { pixelsToInches } from "@/components/Conversion/shared/conversionUtils";

type Props = {
  emptyHint: string;
};

export function PixelsToInchesConverter({ emptyHint }: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [pixels, setPixels] = useState("1920");
  const [dpi, setDpi] = useState("96");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const px = Number(pixels.trim());
    const d = Number(dpi.trim());
    if (!Number.isFinite(px) || px < 0) {
      setError("Enter a valid pixel value.");
      setResult(null);
      return;
    }
    if (!Number.isFinite(d) || d <= 0) {
      setError("Enter a valid DPI greater than 0.");
      setResult(null);
      return;
    }
    const inches = pixelsToInches(px, d);
    if (inches == null) {
      setError("Could not convert with the given DPI.");
      setResult(null);
      return;
    }
    setResult(formatNum(inches, 4));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="px-value"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Pixels
        </label>
        <input
          id="px-value"
          type="number"
          min={0}
          step="any"
          value={pixels}
          onChange={(e) => setPixels(e.target.value)}
          className={`${numberFieldClass} w-full font-mono`}
        />
      </div>
      <div>
        <label
          htmlFor="px-dpi"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          DPI (dots per inch)
        </label>
        <input
          id="px-dpi"
          type="number"
          min={1}
          step="any"
          value={dpi}
          onChange={(e) => setDpi(e.target.value)}
          className={`${numberFieldClass} w-full max-w-[8rem] font-mono`}
        />
        <p className="mt-1 text-[11px] text-[#94a3b8] sm:text-[12px]">
          Screen default is often 96 DPI; print may use 300 DPI.
        </p>
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
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">Inches</p>
        <p className="mt-1 text-3xl font-semibold text-[#d66844] sm:text-4xl">
          {result}
          <span className="ml-1.5 text-[18px] font-medium text-[#334155] sm:text-[20px]">
            in
          </span>
        </p>
        <p className="mt-3 text-[12px] text-[#94a3b8] sm:text-[13px]">
          {pixels} px at {dpi} DPI
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
    />
  );
}
