"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { CustomSelect } from "../shared/CustomSelect";
import { InputWithSuffix } from "../shared/InputWithSuffix";
import { FormError } from "../shared/StandardFormRows";

type Mode = "us" | "metric";

export function StepsToCalories_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("us");
  const [steps, setSteps] = useState("");
  const [stride, setStride] = useState(""); // inches (us) or cm (metric)
  const [weight, setWeight] = useState(""); // lbs or kg
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{
    distance: string;
    formulaKcal: number;
    simpleKcal: number;
  } | null>(null);

  const run = () => {
    setError(null);
    const nSteps = parseInt(steps, 10);
    const strideN = parseFloat(stride);
    const wN = parseFloat(weight);
    if (Number.isNaN(nSteps) || nSteps <= 0) {
      setError("Enter a positive step count.");
      setOut(null);
      return;
    }
    if (Number.isNaN(strideN) || strideN <= 0) {
      setError(
        mode === "us"
          ? "Enter stride length in inches."
          : "Enter stride length in centimeters.",
      );
      setOut(null);
      return;
    }
    if (Number.isNaN(wN) || wN <= 0) {
      setError(
        mode === "us" ? "Enter weight in pounds." : "Enter weight in kilograms.",
      );
      setOut(null);
      return;
    }

    let formulaKcal: number;
    let distanceLabel: string;

    if (mode === "us") {
      const miles = (nSteps * strideN) / 63360; // in × steps → miles
      formulaKcal = miles * 0.57 * wN;
      distanceLabel =
        miles < 0.01
          ? `${(miles * 5280).toFixed(0)} ft`
          : `${miles.toFixed(2)} mi`;
    } else {
      const km = (nSteps * strideN) / 100_000; // cm → km
      formulaKcal = km * 1.036 * wN;
      distanceLabel = km < 0.01 ? `${(km * 1000).toFixed(0)} m` : `${km.toFixed(2)} km`;
    }

    const simpleKcal = nSteps * 0.04;

    setOut({
      distance: distanceLabel,
      formulaKcal: Math.round(formulaKcal),
      simpleKcal: Math.round(simpleKcal),
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Units
        </p>
        <CustomSelect<Mode>
          id="steps-units"
          value={mode}
          onChange={setMode}
          options={[
            { value: "us", label: "US — stride (in), weight (lb)" },
            { value: "metric", label: "Metric — stride (cm), weight (kg)" },
          ]}
        />
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Steps
        </p>
        <InputWithSuffix
          type="number"
          min={1}
          inputMode="numeric"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          suffix="steps"
          inputClassName="max-w-[10rem]"
        />
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Stride length
        </p>
        <InputWithSuffix
          type="number"
          min={0}
          step={0.1}
          value={stride}
          onChange={(e) => setStride(e.target.value)}
          suffix={mode === "us" ? "in" : "cm"}
          inputClassName="max-w-[10rem]"
        />
        <p className="mt-1 text-[11px] text-[#94a3b8]">
          Distance = steps × stride; then calories from distance and weight.
        </p>
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Body weight
        </p>
        <InputWithSuffix
          type="number"
          min={0}
          step={0.1}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          suffix={mode === "us" ? "lbs" : "kg"}
          inputClassName="max-w-[10rem]"
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Estimate calories
      </button>
    </div>
  );

  const result =
    out != null ? (
      <div className="w-full max-w-[18rem] space-y-2 text-[13px] text-[#334155]">
        <p className="text-center">
          <span className="font-semibold">Distance:</span> {out.distance}
        </p>
        <p className="text-center text-2xl font-bold text-[#d66844]">
          {out.formulaKcal}
        </p>
        <p className="text-center text-[13px] font-medium">
          kcal (distance × weight formula)
        </p>
        <p className="border-t border-[#e2e8f0] pt-2 text-center text-[12px] text-[#64748b]">
          Rule-of-thumb: steps × 0.04 ≈{" "}
          <span className="font-semibold text-[#334155]">{out.simpleKcal}</span>{" "}
          kcal
        </p>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Steps, stride, and weight — see distance-based calories vs. 0.04 kcal/step.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
