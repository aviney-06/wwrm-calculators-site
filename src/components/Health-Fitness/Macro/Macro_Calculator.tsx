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
  { value: "1.2", label: "Sedentary" },
  { value: "1.375", label: "Light" },
  { value: "1.55", label: "Moderate" },
  { value: "1.725", label: "Active" },
  { value: "1.9", label: "Very active" },
] as const;

const SPLITS = [
  { value: "30-30-40", label: "Balanced (30% P / 30% F / 40% C)" },
  { value: "40-30-30", label: "Higher protein (40% / 30% / 30%)" },
  { value: "25-35-40", label: "Moderate protein (25% / 35% / 40%)" },
] as const;

function mifflinKgCm(kg: number, cm: number, age: number, male: boolean) {
  const s = male ? 5 : -161;
  return 10 * kg + 6.25 * cm - 5 * age + s;
}

export function Macro_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [unit, setUnit] = useState<Unit>("imperial");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [cm, setCm] = useState("");
  const [lbs, setLbs] = useState("");
  const [kg, setKg] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [split, setSplit] = useState("30-30-40");
  const [error, setError] = useState<string | null>(null);
  const [macros, setMacros] = useState<{
    kcal: number;
    p: number;
    f: number;
    c: number;
  } | null>(null);

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
      setMacros(null);
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
        setMacros(null);
        return;
      }
      hCm = (f * 12 + i) * 2.54;
      wKg = lb * 0.45359237;
    } else {
      const c = parseFloat(cm);
      const k = parseFloat(kg);
      if (Number.isNaN(c) || Number.isNaN(k) || c <= 0 || k <= 0) {
        setError("Enter valid height and weight.");
        setMacros(null);
        return;
      }
      hCm = c;
      wKg = k;
    }
    const bmr = mifflinKgCm(wKg, hCm, ageN, gender === "male");
    const kcal = Math.round(bmr * parseFloat(activity));
    let pPct = 0.3,
      fPct = 0.3,
      cPct = 0.4;
    if (split === "40-30-30") {
      pPct = 0.4;
      fPct = 0.3;
      cPct = 0.3;
    } else if (split === "25-35-40") {
      pPct = 0.25;
      fPct = 0.35;
      cPct = 0.4;
    }
    const p = Math.round((kcal * pPct) / 4);
    const fG = Math.round((kcal * fPct) / 9);
    const c = Math.round((kcal * cPct) / 4);
    setMacros({ kcal, p, f: fG, c });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <AgeGenderRow
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        ageId="macro-age"
        ageMin={15}
        ageMax={100}
      />
      <UnitsRow
        label="Units"
        selectId="macro-units"
        select={
          <CustomSelect<Unit>
            id="macro-units"
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
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
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
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
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
          id="macro-act"
          value={activity}
          onChange={setActivity}
          options={[...ACTIVITY]}
        />
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Macro split
        </p>
        <CustomSelect
          id="macro-split"
          value={split}
          onChange={setSplit}
          options={[...SPLITS]}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate macros
      </button>
    </div>
  );

  const result =
    macros != null ? (
      <div className="flex w-full max-w-[17rem] flex-col gap-3 text-center">
        <p className="text-2xl font-bold text-[#d66844]">{macros.kcal}</p>
        <p className="text-[12px] text-[#64748b]">kcal / day (TDEE estimate)</p>
        <ul className="space-y-2 text-left text-[14px] text-[#334155]">
          <li>
            <span className="font-medium">Protein:</span> {macros.p} g
          </li>
          <li>
            <span className="font-medium">Fat:</span> {macros.f} g
          </li>
          <li>
            <span className="font-medium">Carbs:</span> {macros.c} g
          </li>
        </ul>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Enter your details to see daily macro targets.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
