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

const GOALS = [
  { value: "0.7", label: "Maintenance / light" },
  { value: "0.85", label: "Active training" },
  { value: "1", label: "Muscle gain / intense" },
] as const;

export function Protein_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [lbs, setLbs] = useState("");
  const [goal, setGoal] = useState("0.85");
  const [error, setError] = useState<string | null>(null);
  const [grams, setGrams] = useState<number | null>(null);

  const run = () => {
    setError(null);
    const w = parseFloat(lbs);
    if (Number.isNaN(w) || w <= 0) {
      setError("Enter your body weight in pounds.");
      setGrams(null);
      return;
    }
    const gPerLb = parseFloat(goal);
    const g = w * gPerLb;
    setGrams(Math.round(g * 10) / 10);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Body weight
        </p>
        <InputWithSuffix
          type="number"
          min={0}
          step={0.1}
          value={lbs}
          onChange={(e) => setLbs(e.target.value)}
          suffix="lbs"
          inputClassName="max-w-[10rem]"
        />
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Goal
        </p>
        <CustomSelect
          id="prot-goal"
          value={goal}
          onChange={setGoal}
          options={[...GOALS]}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate protein
      </button>
    </div>
  );

  const result =
    grams != null ? (
      <>
        <p className="text-center text-3xl font-bold text-[#d66844]">{grams}</p>
        <p className="text-center text-[14px] font-medium text-[#334155]">
          g protein / day
        </p>
        <p className="max-w-[15rem] text-center text-[11px] text-[#64748b]">
          Rule-of-thumb from grams per lb body weight — adjust with your
          clinician or dietitian.
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Enter weight and pick a goal to estimate daily protein.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
