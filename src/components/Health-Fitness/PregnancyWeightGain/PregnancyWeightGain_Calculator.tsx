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
import { bmiFromImperial } from "../shared/healthConversions";

type Unit = "imperial" | "metric";

function iomRangeLb(bmi: number): { min: number; max: number; label: string } {
  if (bmi < 18.5)
    return { min: 28, max: 40, label: "Underweight (BMI under 18.5)" };
  if (bmi < 25)
    return { min: 25, max: 35, label: "Normal weight (BMI 18.5–24.9)" };
  if (bmi < 30)
    return { min: 15, max: 25, label: "Overweight (BMI 25–29.9)" };
  return { min: 11, max: 20, label: "Obese (BMI 30+)" };
}

export function PregnancyWeightGain_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [unit, setUnit] = useState<Unit>("imperial");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("female");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [cm, setCm] = useState("");
  const [preLbs, setPreLbs] = useState("");
  const [preKg, setPreKg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{
    min: number;
    max: number;
    label: string;
    bmi: number;
  } | null>(null);

  const handleUnit = useCallback(
    (u: Unit) => {
      if (u === unit) return;
      if (u === "metric") {
        const f = parseFloat(ft) || 0;
        const i = parseFloat(inch) || 0;
        const l = parseFloat(preLbs) || 0;
        setCm(toCm(f, i).toFixed(1));
        setPreKg(l ? (l * 0.45359237).toFixed(2) : "");
      } else {
        const c = parseFloat(cm) || 0;
        const k = parseFloat(preKg) || 0;
        const { ft: f, inch: inches } = fromCmToFtIn(c);
        setFt(String(f));
        setInch(String(inches));
        setPreLbs(k ? (k / 0.45359237).toFixed(1) : "");
      }
      setUnit(u);
    },
    [unit, ft, inch, cm, preLbs, preKg],
  );

  const run = () => {
    setError(null);
    const ageN = parseInt(age, 10);
    if (Number.isNaN(ageN) || ageN < 18) {
      setError("Enter age 18+.");
      setOut(null);
      return;
    }
    let hIn: number;
    let wLb: number;
    if (unit === "imperial") {
      const f = parseFloat(ft);
      const i = parseFloat(inch);
      const lb = parseFloat(preLbs);
      if (
        Number.isNaN(f) ||
        Number.isNaN(i) ||
        Number.isNaN(lb) ||
        i < 0 ||
        i >= 12 ||
        lb <= 0
      ) {
        setError("Enter pre-pregnancy height and weight.");
        setOut(null);
        return;
      }
      hIn = f * 12 + i;
      wLb = lb;
    } else {
      const c = parseFloat(cm);
      const k = parseFloat(preKg);
      if (Number.isNaN(c) || Number.isNaN(k) || c <= 0 || k <= 0) {
        setError("Enter pre-pregnancy height and weight.");
        setOut(null);
        return;
      }
      hIn = c / 2.54;
      wLb = k / 0.45359237;
    }
    const bmi = bmiFromImperial(wLb, hIn);
    const r = iomRangeLb(bmi);
    setOut({ ...r, bmi: Math.round(bmi * 10) / 10 });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <AgeGenderRow
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        ageId="pwg-age"
        ageMin={18}
        ageMax={55}
        ageHint="IOM total gain guidelines (singleton)."
      />
      <UnitsRow
        label="Units"
        selectId="pwg-units"
        select={
          <CustomSelect<Unit>
            id="pwg-units"
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
                inputClassName="w-full max-w-[7.5rem] sm:w-[7.5rem]"
              />
            )}
          </div>
        </div>
        <div className="min-w-0">
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
            Pre-pregnancy weight
          </p>
          <InputWithSuffix
            type="number"
            step={0.1}
            value={unit === "imperial" ? preLbs : preKg}
            onChange={(e) =>
              unit === "imperial"
                ? setPreLbs(e.target.value)
                : setPreKg(e.target.value)
            }
            suffix={unit === "imperial" ? "lbs" : "kg"}
            inputClassName="w-full max-w-[7.5rem] sm:w-[7.5rem]"
          />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Show recommended gain range
      </button>
    </div>
  );

  const result =
    out != null ? (
      <div className="max-w-[17rem] text-center">
        <p className="text-[12px] text-[#64748b]">
          Pre-pregnancy BMI {out.bmi} — {out.label}
        </p>
        <p className="mt-2 text-xl font-bold text-[#d66844]">
          {out.min}–{out.max} lb total
        </p>
        <p className="mt-2 text-[11px] leading-snug text-[#64748b]">
          IOM-style ranges — your OB may use different targets (twins, medical
          conditions, etc.).
        </p>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Uses pre-pregnancy BMI to suggest total weight-gain range.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
