"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, parseNumberList } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumbersListField,
} from "@/components/shared/calculatorFields";

export function Resistor_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState("100, 200, 300");
  const [mode, setMode] = useState<"series" | "parallel">("parallel");
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const vals = parseNumberList(raw).filter((v) => v > 0);
    if (vals.length < 1) {
      setError("Enter at least one positive resistance (Ω), comma-separated.");
      setTotal(null);
      return;
    }
    let r: number;
    if (mode === "series") {
      r = vals.reduce((a, b) => a + b, 0);
    } else {
      const sumInv = vals.reduce((a, v) => a + 1 / v, 0);
      r = 1 / sumInv;
    }
    setTotal(formatNum(r, 4));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("series")}
          className={`flex-1 rounded border px-2 py-2 text-[13px] ${mode === "series" ? "border-[#2374ac] bg-[#2374ac] text-white" : "border-[#E0E0E0]"}`}
        >
          Series
        </button>
        <button
          type="button"
          onClick={() => setMode("parallel")}
          className={`flex-1 rounded border px-2 py-2 text-[13px] ${mode === "parallel" ? "border-[#2374ac] bg-[#2374ac] text-white" : "border-[#E0E0E0]"}`}
        >
          Parallel
        </button>
      </div>
      <CalculatorNumbersListField
        id="resistor-values"
        label="Resistances (Ω)"
        value={raw}
        onChange={setRaw}
        rows={3}
        placeholder="e.g. 100, 220, 470"
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate resistance
      </button>
    </div>
  );

  const result = total ? (
    <div className="text-center">
      <p className="text-4xl font-bold text-[#d66844]">{total} Ω</p>
      <p className="mt-2 text-[14px] text-[#334155]">equivalent resistance ({mode})</p>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter resistor values for series or parallel total.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Series: R = R₁ + R₂ + … Parallel: 1/R = 1/R₁ + 1/R₂ + …
        </p>
      }
    />
  );
}
