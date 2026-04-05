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
import { idealWeightDevineKg } from "../shared/bodyComposition";

type Unit = "imperial" | "metric";
type Gender = "male" | "female";

export function IdealWeight_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [unit, setUnit] = useState<Unit>("imperial");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [cm, setCm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ideal, setIdeal] = useState<{
    kg: number;
    lb: number;
  } | null>(null);

  const handleUnit = useCallback(
    (u: Unit) => {
      if (u === unit) return;
      if (u === "metric") {
        const f = parseFloat(ft) || 0;
        const i = parseFloat(inch) || 0;
        setCm(toCm(f, i).toFixed(1));
      } else {
        const c = parseFloat(cm) || 0;
        const { ft: f, inch: inches } = fromCmToFtIn(c);
        setFt(String(f));
        setInch(String(inches));
      }
      setUnit(u);
    },
    [unit, ft, inch, cm],
  );

  const run = () => {
    setError(null);
    const ageN = parseInt(age, 10);
    if (Number.isNaN(ageN) || ageN < 18) {
      setError("Enter age 18+ (Devine formula is for adults).");
      setIdeal(null);
      return;
    }
    let hCm: number;
    if (unit === "imperial") {
      const f = parseFloat(ft);
      const i = parseFloat(inch);
      if (Number.isNaN(f) || Number.isNaN(i) || i < 0 || i >= 12) {
        setError("Enter a valid height.");
        setIdeal(null);
        return;
      }
      hCm = (f * 12 + i) * 2.54;
    } else {
      const c = parseFloat(cm);
      if (Number.isNaN(c) || c <= 0) {
        setError("Enter height in cm.");
        setIdeal(null);
        return;
      }
      hCm = c;
    }
    const kg = idealWeightDevineKg(hCm, gender === "male");
    const lb = kg / 0.45359237;
    setIdeal({ kg, lb });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <AgeGenderRow
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        ageId="iw-age"
        ageMin={18}
        ageMax={120}
        ageHint="Devine (1974) — adults."
      />
      <UnitsRow
        label="Units"
        selectId="iw-units"
        select={
          <CustomSelect<Unit>
            id="iw-units"
            value={unit}
            onChange={handleUnit}
            options={[
              { value: "imperial", label: "Standard (US)" },
              { value: "metric", label: "Metric" },
            ]}
          />
        }
      />
      <div>
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
                inputClassName="w-[3rem] sm:w-[3.75rem]"
              />
              <InputWithSuffix
                type="number"
                max={11.9}
                step={0.1}
                value={inch}
                onChange={(e) => setInch(e.target.value)}
                suffix="in"
                inputClassName="w-[3rem] sm:w-[3.75rem]"
              />
            </>
          ) : (
            <InputWithSuffix
              type="number"
              step={0.1}
              value={cm}
              onChange={(e) => setCm(e.target.value)}
              suffix="cm"
              inputClassName="max-w-[10rem]"
            />
          )}
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate ideal weight
      </button>
    </div>
  );

  const result =
    ideal != null ? (
      <div className="text-center">
        <p className="text-2xl font-bold text-[#d66844]">
          {ideal.lb.toFixed(1)} lb
        </p>
        <p className="mt-1 text-[14px] text-[#334155]">
          ({ideal.kg.toFixed(1)} kg)
        </p>
        <p className="mt-2 max-w-[15rem] text-[11px] text-[#64748b]">
          Devine formula — one of many &quot;ideal weight&quot; estimates, not a
          medical target.
        </p>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Height and sex drive this classic estimate.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
