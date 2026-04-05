"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { InputWithSuffix } from "../shared/InputWithSuffix";
import { AgeField, FormError } from "../shared/StandardFormRows";

export function TargetHeartRate_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [age, setAge] = useState("");
  const [resting, setResting] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [zones, setZones] = useState<{
    max: number;
    light: string;
    mod: string;
    hard: string;
  } | null>(null);

  const run = () => {
    setError(null);
    const ageN = parseInt(age, 10);
    if (Number.isNaN(ageN) || ageN < 10 || ageN > 100) {
      setError("Enter age 10–100.");
      setZones(null);
      return;
    }
    const maxHr = 220 - ageN;
    const r = parseInt(resting, 10);
    if (resting.trim() !== "" && (Number.isNaN(r) || r < 30 || r > 120)) {
      setError("Resting HR optional — use 30–120 or leave blank.");
      setZones(null);
      return;
    }
    if (resting.trim() !== "" && !Number.isNaN(r)) {
      const reserve = maxHr - r;
      setZones({
        max: maxHr,
        light: `${Math.round(r + reserve * 0.5)}–${Math.round(r + reserve * 0.6)}`,
        mod: `${Math.round(r + reserve * 0.6)}–${Math.round(r + reserve * 0.7)}`,
        hard: `${Math.round(r + reserve * 0.7)}–${Math.round(r + reserve * 0.85)}`,
      });
    } else {
      setZones({
        max: maxHr,
        light: `${Math.round(maxHr * 0.5)}–${Math.round(maxHr * 0.6)}`,
        mod: `${Math.round(maxHr * 0.6)}–${Math.round(maxHr * 0.7)}`,
        hard: `${Math.round(maxHr * 0.7)}–${Math.round(maxHr * 0.85)}`,
      });
    }
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <AgeField
        age={age}
        setAge={setAge}
        id="thr-age"
        ageMin={10}
        ageMax={100}
      />
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Resting heart rate (optional)
        </p>
        <InputWithSuffix
          type="number"
          min={30}
          max={120}
          value={resting}
          onChange={(e) => setResting(e.target.value)}
          suffix="bpm"
          inputClassName="max-w-[8rem]"
        />
        <p className="mt-1 text-[11px] text-[#94a3b8]">
          If provided, uses Karvonen (heart rate reserve).
        </p>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate heart rate zones
      </button>
    </div>
  );

  const result =
    zones != null ? (
      <div className="w-full max-w-[17rem] space-y-2 text-[13px] text-[#334155]">
        <p>
          <span className="font-semibold">Est. max HR:</span> {zones.max} bpm
        </p>
        <p>
          <span className="font-semibold">Light:</span> {zones.light} bpm
        </p>
        <p>
          <span className="font-semibold">Moderate:</span> {zones.mod} bpm
        </p>
        <p>
          <span className="font-semibold">Vigorous:</span> {zones.hard} bpm
        </p>
        <p className="pt-2 text-[11px] text-[#64748b]">
          220 − age is approximate; medications and fitness change targets.
        </p>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Training zones from age (and optional resting HR).
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
