"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { CustomSelect } from "@/components/Health-Fitness/shared/CustomSelect";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
  CalculatorResultRow,
  calcLabelClass,
} from "@/components/shared/calculatorFields";
import { fmt } from "@/components/Other/shared/measureUtils";

type Unit = "lb" | "kg";

export function DogSize_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [weight, setWeight] = useState("10");
  const [ageWeeks, setAgeWeeks] = useState("16");
  const [unit, setUnit] = useState<Unit>("lb");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ adult: number } | null>(null);

  const run = () => {
    setError(null);
    const w = Number.parseFloat(weight);
    const age = Number.parseFloat(ageWeeks);
    if (!Number.isFinite(w) || w <= 0) {
      setError("Enter a positive current weight.");
      setResult(null);
      return;
    }
    if (!Number.isFinite(age) || age <= 0) {
      setError("Enter the puppy's age in weeks.");
      setResult(null);
      return;
    }
    // Common vet estimate: adult weight ≈ (current weight / age in weeks) × 52.
    const adult = (w / age) * 52;
    setResult({ adult });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="dog-weight"
        label="Current weight"
        suffix={unit}
        min={0}
        step="any"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <CalculatorNumberField
        id="dog-age"
        label="Current age"
        suffix="weeks"
        min={0}
        step="any"
        value={ageWeeks}
        onChange={(e) => setAgeWeeks(e.target.value)}
      />
      <div>
        <label htmlFor="dog-unit" className={calcLabelClass}>
          Weight unit
        </label>
        <CustomSelect<Unit>
          id="dog-unit"
          value={unit}
          onChange={setUnit}
          options={[
            { value: "lb", label: "Pounds (lb)" },
            { value: "kg", label: "Kilograms (kg)" },
          ]}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Estimate adult size
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="text-center">
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">Estimated adult weight</p>
      <p className="mt-1 text-4xl font-semibold text-[#d66844]">
        {fmt(result.adult)} {unit}
      </p>
      <dl className="mt-4 w-full text-left">
        <CalculatorResultRow
          label="In the other unit"
          value={
            unit === "lb"
              ? `${fmt(result.adult * 0.453592)} kg`
              : `${fmt(result.adult / 0.453592)} lb`
          }
        />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>
      Enter your puppy's weight and age to estimate adult size.
    </CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          A rough estimate only. Growth varies a lot by breed — your vet can give
          a more accurate projection.
        </p>
      }
    />
  );
}
