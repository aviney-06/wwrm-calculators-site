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

/** Compendium-style walking METs by speed (mph). */
const WALKING_METS = [
  { value: "2.5", label: "2.0 mph (3.2 km/h) — MET 2.5" },
  { value: "3.3", label: "3.0 mph (4.8 km/h) — MET 3.3" },
  { value: "5", label: "4.0 mph (6.4 km/h) — MET 5.0" },
  { value: "8.3", label: "5.0 mph (8 km/h) — MET 8.3" },
] as const;

/** kcal = (MET × 3.5 × kg / 200) × minutes — ISO-style oxygen-based estimate. */
function caloriesFromMet(met: number, kg: number, minutes: number) {
  return (met * 3.5 * kg) / 200 * minutes;
}

export function WalkingCalorie_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [lbs, setLbs] = useState("");
  const [minutes, setMinutes] = useState("");
  const [met, setMet] = useState<(typeof WALKING_METS)[number]["value"]>("5");
  const [error, setError] = useState<string | null>(null);
  const [kcal, setKcal] = useState<number | null>(null);

  const run = () => {
    setError(null);
    const wLb = parseFloat(lbs);
    const m = parseFloat(minutes);
    const metVal = parseFloat(met);
    if (Number.isNaN(wLb) || wLb <= 0) {
      setError("Enter your weight in pounds.");
      setKcal(null);
      return;
    }
    if (Number.isNaN(m) || m <= 0) {
      setError("Enter walking time in minutes.");
      setKcal(null);
      return;
    }
    const kg = wLb * 0.45359237;
    const c = caloriesFromMet(metVal, kg, m);
    setKcal(Math.round(c));
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
          Walking speed (MET)
        </p>
        <CustomSelect
          id="walk-met"
          value={met}
          onChange={setMet}
          options={[...WALKING_METS]}
        />
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Duration
        </p>
        <InputWithSuffix
          type="number"
          min={1}
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          suffix="min"
          inputClassName="max-w-[8rem]"
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Estimate calories burned
      </button>
    </div>
  );

  const result =
    kcal != null ? (
      <>
        <p className="text-center text-3xl font-bold text-[#d66844]">{kcal}</p>
        <p className="text-center text-[14px] font-medium text-[#334155]">
          kcal burned (walking)
        </p>
        <p className="max-w-[16rem] text-center text-[11px] leading-snug text-[#64748b]">
          Uses MET × 3.5 × weight (kg) ÷ 200 × time (min). Same family as
          Compendium MET values; actual burn varies by terrain and fitness.
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Pick a walking pace and how long you walked.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
