"use client";

import { useCallback, useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { CustomSelect } from "../shared/CustomSelect";
import { InputWithSuffix } from "../shared/InputWithSuffix";
import { AgeGenderRow, FormError, UnitsRow } from "../shared/StandardFormRows";
import { fromCmToFtIn, toCm } from "../shared/healthConversions";

type Unit = "imperial" | "metric";
type Gender = "male" | "female";

const ACTIVITY = [
  { value: "1.2", label: "Sedentary (little exercise)" },
  { value: "1.375", label: "Light (1–3 days/week)" },
  { value: "1.55", label: "Moderate (3–5 days/week)" },
  { value: "1.725", label: "Active (6–7 days/week)" },
  { value: "1.9", label: "Very active (athlete)" },
] as const;

function mifflinKgCm(kg: number, cm: number, age: number, male: boolean) {
  const s = male ? 5 : -161;
  return 10 * kg + 6.25 * cm - 5 * age + s;
}

/** Daily maintenance calories (same math as TDEE). */
export function Calorie_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [unit, setUnit] = useState<Unit>("imperial");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [cm, setCm] = useState("");
  const [lbs, setLbs] = useState("");
  const [kg, setKg] = useState("");
  const [activity, setActivity] = useState<(typeof ACTIVITY)[number]["value"]>(
    "1.55",
  );
  const [error, setError] = useState<string | null>(null);
  const [kcal, setKcal] = useState<number | null>(null);

  const handleUnit = useCallback(
    (u: Unit) => {
      if (u === unit) return;
      if (u === "metric") {
        const f = parseFloat(ft) || 0;
        const i = parseFloat(inch) || 0;
        const l = parseFloat(lbs) || 0;
        setCm(toCm(f, i).toFixed(1));
        setKg(l ? (l * 0.45359237).toFixed(2) : "");
      } else {
        const c = parseFloat(cm) || 0;
        const k = parseFloat(kg) || 0;
        const { ft: f, inch: inches } = fromCmToFtIn(c);
        setFt(String(f));
        setInch(String(inches));
        setLbs(k ? (k / 0.45359237).toFixed(1) : "");
      }
      setUnit(u);
    },
    [unit, ft, inch, cm, lbs, kg],
  );

  const run = () => {
    setError(null);
    const ageN = parseInt(age, 10);
    if (Number.isNaN(ageN) || ageN < 15 || ageN > 100) {
      setError("Enter a valid age (15–100).");
      setKcal(null);
      return;
    }
    let wKg: number;
    let hCm: number;
    if (unit === "imperial") {
      const f = parseFloat(ft);
      const i = parseFloat(inch);
      const lb = parseFloat(lbs);
      if (
        Number.isNaN(f) ||
        Number.isNaN(i) ||
        Number.isNaN(lb) ||
        i < 0 ||
        i >= 12 ||
        lb <= 0
      ) {
        setError("Enter valid height and weight.");
        setKcal(null);
        return;
      }
      hCm = (f * 12 + i) * 2.54;
      wKg = lb * 0.45359237;
    } else {
      const c = parseFloat(cm);
      const k = parseFloat(kg);
      if (Number.isNaN(c) || Number.isNaN(k) || c <= 0 || k <= 0) {
        setError("Enter valid height (cm) and weight (kg).");
        setKcal(null);
        return;
      }
      hCm = c;
      wKg = k;
    }
    const bmr = mifflinKgCm(wKg, hCm, ageN, gender === "male");
    const total = Math.round(bmr * parseFloat(activity));
    setKcal(total);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <AgeGenderRow
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        ageId="cal-age"
        ageMin={15}
        ageMax={100}
        ageHint="Maintenance calories use Mifflin–St Jeor × activity."
      />
      <UnitsRow
        label="Units"
        selectId="cal-units"
        select={
          <CustomSelect<Unit>
            id="cal-units"
            value={unit}
            onChange={handleUnit}
            options={[
              { value: "imperial", label: "Standard (US)" },
              { value: "metric", label: "Metric" },
            ]}
          />
        }
      />
      <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6">
        <div className="min-w-0">
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:mb-2.5 sm:text-[15px]">
            Height
          </p>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {unit === "imperial" ? (
              <>
                <InputWithSuffix
                  type="number"
                  value={ft}
                  onChange={(e) => setFt(e.target.value)}
                  suffix="ft"
                  inputClassName="w-[3rem] min-w-0 sm:w-[3.75rem]"
                />
                <InputWithSuffix
                  type="number"
                  max={11.9}
                  step={0.1}
                  value={inch}
                  onChange={(e) => setInch(e.target.value)}
                  suffix="in"
                  inputClassName="w-[3rem] min-w-0 sm:w-[3.75rem]"
                />
              </>
            ) : (
              <InputWithSuffix
                type="number"
                step={0.1}
                value={cm}
                onChange={(e) => setCm(e.target.value)}
                suffix="cm"
                inputClassName="w-full max-w-[7.5rem] sm:w-[7.5rem]"
              />
            )}
          </div>
        </div>
        <div className="min-w-0">
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:mb-2.5 sm:text-[15px]">
            Weight
          </p>
          <InputWithSuffix
            type="number"
            step={0.1}
            value={unit === "imperial" ? lbs : kg}
            onChange={(e) =>
              unit === "imperial"
                ? setLbs(e.target.value)
                : setKg(e.target.value)
            }
            suffix={unit === "imperial" ? "lbs" : "kg"}
            inputClassName="w-full max-w-[7.5rem] sm:w-[7.5rem]"
          />
        </div>
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Activity
        </p>
        <CustomSelect
          id="cal-act"
          value={activity}
          onChange={(v) => setActivity(v)}
          options={[...ACTIVITY]}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate daily calories
      </button>
    </div>
  );

  const result =
    kcal != null ? (
      <>
        <p className="text-center text-3xl font-bold tabular-nums text-[#d66844]">
          {kcal}
        </p>
        <p className="text-center text-[13px] font-medium text-[#334155]">
          kcal / day (maintenance)
        </p>
        <p className="max-w-[15rem] text-center text-[12px] text-[#64748b]">
          Same as TDEE — total daily energy expenditure estimate.
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Enter stats and how active you are most weeks.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
