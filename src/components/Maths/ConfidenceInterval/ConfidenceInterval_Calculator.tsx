"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { CustomSelect } from "@/components/Health-Fitness/shared/CustomSelect";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
  CalculatorResultRow,
  calcLabelClass,
} from "@/components/shared/calculatorFields";

const Z_BY_LEVEL: Record<string, number> = {
  "80": 1.2816,
  "90": 1.6449,
  "95": 1.96,
  "98": 2.3263,
  "99": 2.5758,
};

export function ConfidenceInterval_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [mean, setMean] = useState("100");
  const [sd, setSd] = useState("15");
  const [size, setSize] = useState("36");
  const [level, setLevel] = useState("95");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    margin: string;
    lower: string;
    upper: string;
    se: string;
    z: string;
  } | null>(null);

  const run = () => {
    setError(null);
    const m = Number.parseFloat(mean);
    const s = Number.parseFloat(sd);
    const n = Number.parseInt(size, 10);
    if (!Number.isFinite(m) || !Number.isFinite(s) || s < 0) {
      setError("Enter a valid mean and a non-negative standard deviation.");
      setResult(null);
      return;
    }
    if (!Number.isFinite(n) || n < 2) {
      setError("Sample size must be a whole number of at least 2.");
      setResult(null);
      return;
    }
    const z = Z_BY_LEVEL[level]!;
    const se = s / Math.sqrt(n);
    const margin = z * se;
    setResult({
      margin: formatNum(margin, 4),
      lower: formatNum(m - margin, 4),
      upper: formatNum(m + margin, 4),
      se: formatNum(se, 4),
      z: String(z),
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="ci-mean"
        label="Sample mean (x̄)"
        step="any"
        value={mean}
        onChange={(e) => setMean(e.target.value)}
      />
      <CalculatorNumberField
        id="ci-sd"
        label="Standard deviation (σ or s)"
        min={0}
        step="any"
        value={sd}
        onChange={(e) => setSd(e.target.value)}
      />
      <CalculatorNumberField
        id="ci-n"
        label="Sample size (n)"
        min={2}
        step={1}
        inputMode="numeric"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <div>
        <label htmlFor="ci-level" className={calcLabelClass}>
          Confidence level
        </label>
        <CustomSelect<string>
          id="ci-level"
          value={level}
          onChange={setLevel}
          options={[
            { value: "80", label: "80%" },
            { value: "90", label: "90%" },
            { value: "95", label: "95%" },
            { value: "98", label: "98%" },
            { value: "99", label: "99%" },
          ]}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate interval
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full max-w-md">
      <p className="mb-2 text-center text-3xl font-semibold text-[#d66844]">
        {result.lower} – {result.upper}
      </p>
      <p className="mb-3 text-center text-[14px] font-medium text-[#334155]">
        {level}% confidence interval
      </p>
      <dl>
        <CalculatorResultRow label="Margin of error (±)" value={result.margin} />
        <CalculatorResultRow label="Standard error" value={result.se} />
        <CalculatorResultRow label="z-score used" value={result.z} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>
      Enter your sample statistics to find the confidence interval.
    </CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px]">
          Uses the z-distribution (large-sample / known σ). For small samples,
          use a t-interval instead.
        </p>
      }
    />
  );
}
