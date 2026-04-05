"use client";

import { useCallback, useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { CustomSelect } from "../shared/CustomSelect";
import { InputWithSuffix } from "../shared/InputWithSuffix";
import {
  AgeGenderRow,
  FormError,
  UnitsRow,
} from "../shared/StandardFormRows";
import {
  fromCmToFtIn,
  inchesFromFtIn,
  toCm,
} from "../shared/healthConversions";

type Unit = "imperial" | "metric";
type Gender = "male" | "female";

/** US Navy body fat — measurements in inches */
function navyBodyFatMale(heightIn: number, waistIn: number, neckIn: number) {
  const a = 86.010 * Math.log10(waistIn - neckIn);
  const b = 70.041 * Math.log10(heightIn);
  return a - b + 36.76;
}

function navyBodyFatFemale(
  heightIn: number,
  waistIn: number,
  neckIn: number,
  hipIn: number,
) {
  const a = 163.205 * Math.log10(waistIn + hipIn - neckIn);
  const b = 97.684 * Math.log10(heightIn);
  return a - b - 78.387;
}

export function BodyFat_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [unit, setUnit] = useState<Unit>("imperial");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [cm, setCm] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [bodyFat, setBodyFat] = useState<number | null>(null);

  const handleUnit = useCallback(
    (u: Unit) => {
      if (u === unit) return;
      if (u === "metric") {
        const f = parseFloat(ft) || 0;
        const i = parseFloat(inch) || 0;
        setCm(toCm(f, i).toFixed(1));
        const neckIn = parseFloat(neck) || 0;
        const waistIn = parseFloat(waist) || 0;
        const hipIn = parseFloat(hip) || 0;
        setNeck((neckIn * 2.54).toFixed(1));
        setWaist((waistIn * 2.54).toFixed(1));
        setHip((hipIn * 2.54).toFixed(1));
      } else {
        const c = parseFloat(cm) || 0;
        const { ft: f, inch: inches } = fromCmToFtIn(c);
        setFt(String(f));
        setInch(String(inches));
        const n = parseFloat(neck) || 0;
        const w = parseFloat(waist) || 0;
        const h = parseFloat(hip) || 0;
        setNeck((n / 2.54).toFixed(1));
        setWaist((w / 2.54).toFixed(1));
        setHip((h / 2.54).toFixed(1));
      }
      setUnit(u);
    },
    [unit, ft, inch, cm, neck, waist, hip],
  );

  const run = () => {
    setError(null);
    const ageN = parseInt(age, 10);
    if (Number.isNaN(ageN) || ageN < 18) {
      setError("Enter age 18 or older for this estimate.");
      setBodyFat(null);
      return;
    }

    let heightIn: number;
    let neckIn: number;
    let waistIn: number;
    let hipIn: number;

    if (unit === "imperial") {
      const f = parseFloat(ft);
      const i = parseFloat(inch);
      const n = parseFloat(neck);
      const w = parseFloat(waist);
      const h = parseFloat(hip);
      if (
        Number.isNaN(f) ||
        Number.isNaN(i) ||
        Number.isNaN(n) ||
        Number.isNaN(w) ||
        (gender === "female" && Number.isNaN(h))
      ) {
        setError("Fill in all measurements.");
        setBodyFat(null);
        return;
      }
      heightIn = inchesFromFtIn(f, i);
      neckIn = n;
      waistIn = w;
      hipIn = gender === "female" ? h : 0;
    } else {
      const hCm = parseFloat(cm);
      const nCm = parseFloat(neck);
      const wCm = parseFloat(waist);
      const hipCm = parseFloat(hip);
      if (
        Number.isNaN(hCm) ||
        Number.isNaN(nCm) ||
        Number.isNaN(wCm) ||
        (gender === "female" && Number.isNaN(hipCm))
      ) {
        setError("Fill in all measurements.");
        setBodyFat(null);
        return;
      }
      heightIn = hCm / 2.54;
      neckIn = nCm / 2.54;
      waistIn = wCm / 2.54;
      hipIn = gender === "female" ? hipCm / 2.54 : 0;
    }

    if (waistIn <= neckIn || heightIn <= 0) {
      setError("Waist must be larger than neck; check your entries.");
      setBodyFat(null);
      return;
    }
    if (gender === "female" && waistIn + hipIn <= neckIn) {
      setError("Check waist, hip, and neck — hip + waist must exceed neck.");
      setBodyFat(null);
      return;
    }

    const pct =
      gender === "male"
        ? navyBodyFatMale(heightIn, waistIn, neckIn)
        : navyBodyFatFemale(heightIn, waistIn, neckIn, hipIn);

    if (!Number.isFinite(pct) || pct < 0 || pct > 80) {
      setError("Could not compute body fat from these values.");
      setBodyFat(null);
      return;
    }

    setBodyFat(Math.round(pct * 10) / 10);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <AgeGenderRow
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        ageId="bf-age"
        ageMin={18}
        ageMax={120}
        ageHint="Adults 18+ (Navy method estimate)."
      />

      <UnitsRow
        label="Units"
        selectId="bf-units"
        select={
          <CustomSelect<Unit>
            id="bf-units"
            value={unit}
            onChange={handleUnit}
            options={[
              { value: "imperial", label: "Standard (US)" },
              { value: "metric", label: "Metric" },
            ]}
            ariaLabel="Unit system"
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
                  min={0}
                  value={ft}
                  onChange={(e) => setFt(e.target.value)}
                  suffix="ft"
                  inputClassName="w-[3rem] min-w-0 sm:w-[3.75rem]"
                  aria-label="Feet"
                />
                <InputWithSuffix
                  type="number"
                  min={0}
                  max={11.9}
                  step={0.1}
                  value={inch}
                  onChange={(e) => setInch(e.target.value)}
                  suffix="in"
                  inputClassName="w-[3rem] min-w-0 sm:w-[3.75rem]"
                  aria-label="Inches"
                />
              </>
            ) : (
              <InputWithSuffix
                type="number"
                min={0}
                step={0.1}
                value={cm}
                onChange={(e) => setCm(e.target.value)}
                suffix="cm"
                inputClassName="w-full min-w-0 max-w-[7.5rem] sm:w-[7.5rem]"
                aria-label="Height cm"
              />
            )}
          </div>
        </div>
        <div className="min-w-0">
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:mb-2.5 sm:text-[15px]">
            Neck
          </p>
          <InputWithSuffix
            type="number"
            min={0}
            step={0.1}
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
            suffix={unit === "imperial" ? "in" : "cm"}
            inputClassName="w-full min-w-0 max-w-[7.5rem] sm:w-[7.5rem]"
            aria-label="Neck circumference"
          />
        </div>
      </div>

      <div
        className={`grid gap-2 sm:gap-4 md:gap-6 ${gender === "female" ? "grid-cols-2" : "grid-cols-1"}`}
      >
        <div className="min-w-0">
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:mb-2.5 sm:text-[15px]">
            Waist
          </p>
          <InputWithSuffix
            type="number"
            min={0}
            step={0.1}
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            suffix={unit === "imperial" ? "in" : "cm"}
            inputClassName="w-full min-w-0 max-w-[7.5rem] sm:w-[7.5rem]"
            aria-label="Waist circumference"
          />
        </div>
        {gender === "female" ? (
          <div className="min-w-0">
            <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:mb-2.5 sm:text-[15px]">
              Hip
            </p>
            <InputWithSuffix
              type="number"
              min={0}
              step={0.1}
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              suffix={unit === "imperial" ? "in" : "cm"}
              inputClassName="w-full min-w-0 max-w-[7.5rem] sm:w-[7.5rem]"
              aria-label="Hip circumference"
            />
          </div>
        ) : null}
      </div>

      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate body fat
      </button>
    </div>
  );

  const result =
    bodyFat != null ? (
      <>
        <p className="text-center text-3xl font-bold tabular-nums text-[#d66844]">
          {bodyFat}%
        </p>
        <p className="max-w-[16rem] text-center text-[13px] leading-snug text-[#64748b]">
          Estimated body fat (US Navy circumference method). Not a medical
          diagnosis.
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] px-1 text-center text-[11px] leading-snug text-[#9ca3af] sm:text-[14px]">
        Enter neck and waist (and hip for women), then calculate.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
