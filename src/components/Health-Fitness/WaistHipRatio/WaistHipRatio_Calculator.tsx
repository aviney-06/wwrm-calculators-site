"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { CustomSelect } from "../shared/CustomSelect";
import { FormError } from "../shared/StandardFormRows";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
  calcLabelClass,
} from "@/components/shared/calculatorFields";

type Gender = "male" | "female";

function riskCategory(ratio: number, gender: Gender): string {
  if (gender === "male") {
    if (ratio < 0.9) return "Low risk";
    if (ratio < 1.0) return "Moderate risk";
    return "High risk";
  }
  if (ratio < 0.8) return "Low risk";
  if (ratio < 0.85) return "Moderate risk";
  return "High risk";
}

export function WaistHipRatio_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [gender, setGender] = useState<Gender>("male");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ ratio: number; category: string } | null>(null);

  const run = () => {
    setError(null);
    const w = Number.parseFloat(waist);
    const h = Number.parseFloat(hip);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
      setError("Enter positive waist and hip measurements.");
      setResult(null);
      return;
    }
    const ratio = w / h;
    setResult({ ratio, category: riskCategory(ratio, gender) });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">
        Measure waist and hip in the same unit (cm or inches) — the ratio is the same either way.
      </p>
      <div>
        <label htmlFor="whr-gender" className={calcLabelClass}>
          Sex
        </label>
        <CustomSelect<Gender>
          id="whr-gender"
          value={gender}
          onChange={setGender}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
      </div>
      <CalculatorNumberField
        id="whr-waist"
        label="Waist circumference"
        min={0}
        step="any"
        value={waist}
        onChange={(e) => setWaist(e.target.value)}
      />
      <CalculatorNumberField
        id="whr-hip"
        label="Hip circumference"
        min={0}
        step="any"
        value={hip}
        onChange={(e) => setHip(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate ratio
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="text-center">
      <p className="text-4xl font-bold text-[#d66844]">{result.ratio.toFixed(2)}</p>
      <p className="mt-2 text-[14px] font-medium text-[#334155]">
        waist-to-hip ratio
      </p>
      <p className="mt-1 text-[13px] text-[#64748b]">{result.category} (WHO)</p>
    </div>
  ) : (
    <CalculatorEmptyResult>
      Enter waist and hip measurements to find your ratio.
    </CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px]">
          Risk bands follow World Health Organization guidance and are an
          estimate only — not medical advice.
        </p>
      }
    />
  );
}
