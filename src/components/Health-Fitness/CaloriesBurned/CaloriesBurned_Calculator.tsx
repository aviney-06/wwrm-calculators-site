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

const ACTIVITIES = [
  { value: "3", label: "Walking (slow)" },
  { value: "3.5", label: "Walking (brisk)" },
  { value: "4", label: "Weight training (moderate)" },
  { value: "7", label: "Running (~5 mph)" },
  { value: "9", label: "Running (~6 mph)" },
  { value: "2.5", label: "Yoga / stretching" },
  { value: "5", label: "Cycling (leisure)" },
] as const;

export function CaloriesBurned_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [lbs, setLbs] = useState("");
  const [minutes, setMinutes] = useState("");
  const [met, setMet] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [burned, setBurned] = useState<number | null>(null);

  const run = () => {
    setError(null);
    const wLb = parseFloat(lbs);
    const m = parseFloat(minutes);
    const metVal = parseFloat(met);
    if (Number.isNaN(wLb) || wLb <= 0) {
      setError("Enter your weight in pounds.");
      setBurned(null);
      return;
    }
    if (Number.isNaN(m) || m <= 0) {
      setError("Enter duration in minutes.");
      setBurned(null);
      return;
    }
    const kg = wLb * 0.45359237;
    const hours = m / 60;
    const kcal = metVal * kg * hours;
    setBurned(Math.round(kcal));
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
          value={lbs}
          onChange={(e) => setLbs(e.target.value)}
          suffix="lbs"
          inputClassName="max-w-[10rem]"
        />
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Activity (MET)
        </p>
        <CustomSelect
          id="cb-met"
          value={met}
          onChange={setMet}
          options={[...ACTIVITIES]}
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
    burned != null ? (
      <>
        <p className="text-center text-3xl font-bold text-[#d66844]">{burned}</p>
        <p className="text-center text-[14px] font-medium text-[#334155]">
          kcal burned
        </p>
        <p className="max-w-[15rem] text-center text-[11px] text-[#64748b]">
          MET × weight (kg) × hours — rough estimate; heart rate and intensity
          vary.
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Pick an activity intensity and how long you did it.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
