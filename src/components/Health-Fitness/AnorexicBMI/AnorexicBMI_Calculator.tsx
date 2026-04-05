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
import {
  bmiFromImperial,
  bmiFromMetric,
} from "../shared/healthConversions";

type Unit = "imperial" | "metric";
type Gender = "male" | "female";

export function AnorexicBMI_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [unit, setUnit] = useState<Unit>("imperial");
  const [gender, setGender] = useState<Gender>("female");
  const [age, setAge] = useState("");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [cm, setCm] = useState("");
  const [lbs, setLbs] = useState("");
  const [kg, setKg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [bmi, setBmi] = useState<number | null>(null);

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
    if (Number.isNaN(ageN) || ageN < 10) {
      setError("Enter age (10+).");
      setBmi(null);
      return;
    }
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
        setBmi(null);
        return;
      }
      const hIn = f * 12 + i;
      setBmi(Math.round(bmiFromImperial(lb, hIn) * 10) / 10);
    } else {
      const c = parseFloat(cm);
      const k = parseFloat(kg);
      if (Number.isNaN(c) || Number.isNaN(k) || c <= 0 || k <= 0) {
        setError("Enter valid height and weight.");
        setBmi(null);
        return;
      }
      setBmi(Math.round(bmiFromMetric(k, c) * 10) / 10);
    }
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] leading-snug text-amber-950">
        If you or someone you know struggles with eating or body image, you
        deserve support. In the U.S., call or text{" "}
        <span className="font-semibold">988</span> (Suicide &amp; Crisis) or
        contact NEDA at{" "}
        <span className="font-semibold"> nationaleatingdisorders.org</span>.
        This tool is only a BMI number — not a diagnosis.
      </p>
      <AgeGenderRow
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        ageId="abmi-age"
        ageMin={10}
        ageMax={120}
      />
      <UnitsRow
        label="Units"
        selectId="abmi-units"
        select={
          <CustomSelect<Unit>
            id="abmi-units"
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
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate BMI
      </button>
    </div>
  );

  const result =
    bmi != null ? (
      <>
        <p className="text-center text-3xl font-bold text-[#d66844]">{bmi}</p>
        <p className="text-center text-[13px] font-medium uppercase text-[#d66844]">
          BMI
        </p>
        <p className="max-w-[15rem] text-center text-[11px] text-[#64748b]">
          Same BMI math as our standard calculator — shown here with recovery
          resources. Talk to a clinician about healthy weight for you.
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Enter height and weight only if it is safe for you to do so.
      </p>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px]">
          This page does not encourage harmful weight goals. If you are in
          crisis, contact local emergency services or 988.
        </p>
      }
    />
  );
}
