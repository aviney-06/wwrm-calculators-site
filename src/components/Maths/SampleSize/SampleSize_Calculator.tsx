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

export function SampleSize_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [level, setLevel] = useState("95");
  const [margin, setMargin] = useState("5");
  const [proportion, setProportion] = useState("50");
  const [population, setPopulation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    sample: string;
    infinite: string;
  } | null>(null);

  const run = () => {
    setError(null);
    const e = Number.parseFloat(margin) / 100;
    const p = Number.parseFloat(proportion) / 100;
    if (!Number.isFinite(e) || e <= 0 || e >= 1) {
      setError("Margin of error must be between 0 and 100%.");
      setResult(null);
      return;
    }
    if (!Number.isFinite(p) || p <= 0 || p >= 1) {
      setError("Response proportion must be between 0 and 100%.");
      setResult(null);
      return;
    }
    const z = Z_BY_LEVEL[level]!;
    const n0 = (z * z * p * (1 - p)) / (e * e);
    let adjusted = n0;
    if (population.trim() !== "") {
      const N = Number.parseInt(population, 10);
      if (!Number.isFinite(N) || N < 1) {
        setError("Population size must be a positive whole number.");
        setResult(null);
        return;
      }
      adjusted = n0 / (1 + (n0 - 1) / N);
    }
    setResult({
      sample: String(Math.ceil(adjusted)),
      infinite: String(Math.ceil(n0)),
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label htmlFor="ss-level" className={calcLabelClass}>
          Confidence level
        </label>
        <CustomSelect<string>
          id="ss-level"
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
      <CalculatorNumberField
        id="ss-margin"
        label="Margin of error"
        suffix="%"
        min={0}
        step="any"
        value={margin}
        onChange={(e) => setMargin(e.target.value)}
      />
      <CalculatorNumberField
        id="ss-prop"
        label="Response proportion"
        suffix="%"
        hint="Use 50% for the most conservative (largest) sample."
        min={0}
        max={100}
        step="any"
        value={proportion}
        onChange={(e) => setProportion(e.target.value)}
      />
      <CalculatorNumberField
        id="ss-pop"
        label="Population size"
        optional
        hint="Leave blank for a very large / unknown population."
        min={1}
        step={1}
        inputMode="numeric"
        value={population}
        onChange={(e) => setPopulation(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate sample size
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full max-w-md">
      <p className="mb-2 text-center text-4xl font-semibold text-[#d66844]">
        {result.sample}
      </p>
      <p className="mb-3 text-center text-[14px] font-medium text-[#334155]">
        respondents needed
      </p>
      <dl>
        <CalculatorResultRow
          label="Unadjusted (infinite population)"
          value={result.infinite}
        />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>
      Choose your confidence level and margin of error to size your survey.
    </CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px]">
          Based on n = z²·p·(1−p) ÷ e², with a finite-population correction when
          a population size is given.
        </p>
      }
    />
  );
}
