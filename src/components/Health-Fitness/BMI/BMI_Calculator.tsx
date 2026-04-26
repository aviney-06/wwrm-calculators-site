"use client";

import { useCallback, useMemo, useState, type ComponentProps } from "react";

type Gender = "male" | "female";
type Unit = "imperial" | "metric";

/**
 * Design tokens mapped from the shared UI board (colors/components only).
 * Note: keeping typography untouched per request.
 */
const DESIGN_COLORS = {
  primary: "#1B5E20",
  secondary: "#455A64",
  tertiary: "#1976D2",
  neutral: "#F5F5F5",
  surface: "#FFFFFF",
  border: "#E5E7EB",
  textMuted: "#6B7280",
  semantic: {
    underweight: "#B9DDEE",
    normal: "#1B5E20",
    overweight: "#F59E0B",
    obese: "#EF4444",
  },
} as const;

const fieldBase =
  "h-[44px] w-full rounded-md border border-neutral-3 bg-neutral-3 pl-3.5 pr-9 text-[14px] font-semibold text-neutral-1 outline-none transition-colors placeholder:text-neutral-1/45 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:border-primary focus:ring-1 focus:ring-primary";

const labelClass =
  "text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-1/75";

const toggleBase =
  "flex h-[44px] flex-1 items-center justify-center rounded-md border text-[14px] font-semibold transition-colors";

const inputSuffixClass =
  "pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[12px] font-medium text-neutral-1/70";

const panelClass =
  "rounded-lg border border-neutral-3 bg-neutral-2 p-5 sm:p-6 md:p-10";

function InputWithSuffix({
  suffix,
  ...inputProps
}: ComponentProps<"input"> & {
  suffix: string;
}) {
  return (
    <div className="relative w-full">
      <input {...inputProps} className={fieldBase} />
      <span className={inputSuffixClass} aria-hidden>
        {suffix}
      </span>
    </div>
  );
}

function toKg(lbs: number) {
  return lbs * 0.45359237;
}

function toLbs(kg: number) {
  return kg / 0.45359237;
}

function toCm(ft: number, inches: number) {
  return (ft * 12 + inches) * 2.54;
}

function fromCmToFtIn(cm: number): { ft: number; inch: number } {
  if (cm <= 0) return { ft: 0, inch: 0 };
  const totalIn = cm / 2.54;
  const ft = Math.floor(totalIn / 12);
  let inch = totalIn - ft * 12;
  inch = Math.round(inch * 10) / 10;
  return { ft, inch };
}

function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function getCategorySummary(category: string): string {
  if (category === "Underweight") {
    return "Your BMI is below the healthy range. Consider discussing nutrition and activity with a healthcare professional.";
  }
  if (category === "Normal") {
    return "Your BMI falls within the healthy range. Maintaining a balanced diet and consistent physical activity is recommended.";
  }
  if (category === "Overweight") {
    return "Your BMI is above the healthy range. Gradual lifestyle adjustments can support better long-term metabolic health.";
  }
  return "Your BMI falls in the obese range. A clinician can help create a sustainable plan tailored to your health profile.";
}

function bmiToBarPositionPercent(bmi: number) {
  const clamped = Math.min(40, Math.max(15, bmi));
  return ((clamped - 15) / 25) * 100;
}

export function BMI_Calculator() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [cm, setCm] = useState("");
  const [lbs, setLbs] = useState("");
  const [kg, setKg] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const handleUnitChange = useCallback(
    (newUnit: Unit) => {
      if (newUnit === unit) return;
      if (newUnit === "metric") {
        const f = parseFloat(ft) || 0;
        const i = parseFloat(inch) || 0;
        const l = parseFloat(lbs) || 0;
        setCm((toCm(f, i) || 0).toFixed(1));
        setKg(l ? toKg(l).toFixed(2) : "");
      } else {
        const c = parseFloat(cm) || 0;
        const k = parseFloat(kg) || 0;
        const { ft: f, inch: inches } = fromCmToFtIn(c);
        setFt(String(f));
        setInch(String(inches));
        setLbs(k ? toLbs(k).toFixed(1) : "");
      }
      setUnit(newUnit);
    },
    [unit, ft, inch, lbs, cm, kg],
  );

  const compute = () => {
    const ageN = parseInt(age, 10);
    if (Number.isNaN(ageN) || ageN < 2 || ageN > 65) {
      setBmi(null);
      return;
    }

    let value: number;

    if (unit === "imperial") {
      const f = parseFloat(ft);
      const i = parseFloat(inch);
      const lb = parseFloat(lbs);
      if (
        Number.isNaN(f) ||
        Number.isNaN(i) ||
        Number.isNaN(lb) ||
        f < 0 ||
        i < 0 ||
        i >= 12 ||
        lb <= 0
      ) {
        setBmi(null);
        return;
      }
      const heightIn = f * 12 + i;
      if (heightIn <= 0) {
        setBmi(null);
        return;
      }
      value = (703 * lb) / (heightIn * heightIn);
    } else {
      const c = parseFloat(cm);
      const k = parseFloat(kg);
      if (Number.isNaN(c) || Number.isNaN(k) || c <= 0 || k <= 0) {
        setBmi(null);
        return;
      }
      const heightM = c / 100;
      value = k / (heightM * heightM);
    }

    setBmi(Math.round(value * 10) / 10);
  };

  const category = useMemo(
    () => (bmi != null ? bmiCategory(bmi) : ""),
    [bmi],
  );
  const markerPosition = bmi != null ? bmiToBarPositionPercent(bmi) : 40;
  const isMale = gender === "male";
  const isMetric = unit === "metric";

  return (
    <div className="w-full">
      <div className="grid gap-5 md:grid-cols-2 md:gap-8">
        <section className={`${panelClass} flex flex-col gap-5`}>
          <div>
            <p className={labelClass}>Biological Sex</p>
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                className={`${toggleBase} ${isMale ? "border-primary bg-primary text-neutral-2" : "border-transparent bg-neutral-3 text-neutral-1/80"}`}
                onClick={() => setGender("male")}
              >
                <span aria-hidden className="mr-2">
                  ♂
                </span>
                Male
              </button>
              <button
                type="button"
                className={`${toggleBase} ${!isMale ? "border-primary bg-primary text-neutral-2" : "border-transparent bg-neutral-3 text-neutral-1/80"}`}
                onClick={() => setGender("female")}
              >
                <span aria-hidden className="mr-2">
                  ♀
                </span>
                Female
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="bmi-age" className={labelClass}>
              Age
            </label>
            <div className="mt-2.5">
              <InputWithSuffix
                id="bmi-age"
                type="number"
                min={2}
                max={65}
                inputMode="numeric"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                suffix="years"
                aria-label="Age in years"
              />
            </div>
          </div>

          <div>
            <p className={labelClass}>Unit</p>
            <div className="mt-2.5 flex gap-3">
              <button
                type="button"
                className={`${toggleBase} ${isMetric ? "border-primary bg-primary text-neutral-2" : "border-transparent bg-neutral-3 text-neutral-1/80"}`}
                onClick={() => handleUnitChange("metric")}
              >
                Metric
              </button>
              <button
                type="button"
                className={`${toggleBase} ${!isMetric ? "border-primary bg-primary text-neutral-2" : "border-transparent bg-neutral-3 text-neutral-1/80"}`}
                onClick={() => handleUnitChange("imperial")}
              >
                Standard (US)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className={labelClass}>Height ({isMetric ? "cm" : "ft/in"})</p>
              <div className="mt-2.5 flex gap-2">
                {isMetric ? (
                  <InputWithSuffix
                    type="number"
                    min={0}
                    step={0.1}
                    inputMode="decimal"
                    value={cm}
                    onChange={(e) => setCm(e.target.value)}
                    suffix="cm"
                    aria-label="Height in centimeters"
                  />
                ) : (
                  <>
                    <InputWithSuffix
                      type="number"
                      min={0}
                      inputMode="decimal"
                      value={ft}
                      onChange={(e) => setFt(e.target.value)}
                      suffix="ft"
                      aria-label="Feet"
                    />
                    <InputWithSuffix
                      type="number"
                      min={0}
                      max={11.9}
                      step={0.1}
                      inputMode="decimal"
                      value={inch}
                      onChange={(e) => setInch(e.target.value)}
                      suffix="in"
                      aria-label="Inches"
                    />
                  </>
                )}
              </div>
            </div>

            <div>
              <p className={labelClass}>Weight ({isMetric ? "kg" : "lbs"})</p>
              <div className="mt-2.5">
                {isMetric ? (
                  <InputWithSuffix
                    type="number"
                    min={0}
                    step={0.1}
                    inputMode="decimal"
                    value={kg}
                    onChange={(e) => setKg(e.target.value)}
                    suffix="kg"
                    aria-label="Weight in kilograms"
                  />
                ) : (
                  <InputWithSuffix
                    type="number"
                    min={0}
                    step={0.1}
                    inputMode="decimal"
                    value={lbs}
                    onChange={(e) => setLbs(e.target.value)}
                    suffix="lbs"
                    aria-label="Weight in pounds"
                  />
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={compute}
            className="mt-auto h-[44px] rounded-md bg-primary text-sm font-semibold text-neutral-2 transition-opacity hover:opacity-95"
          >
            Calculate Result
          </button>
        </section>

        <section className={`${panelClass} flex flex-col`}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-1/75">
            Your Calculated Index
          </p>

          <div className="mt-4 flex items-end gap-1">
            <span className="text-[68px] font-extrabold leading-none text-primary">
              {bmi != null ? bmi.toFixed(1) : "--"}
            </span>
            <span className="pb-2 text-[18px] font-normal text-neutral-1/75">
              kg/m²
            </span>
          </div>

          <div className="mt-7">
            <div className="relative h-[8px] overflow-hidden rounded-full bg-neutral-3">
              <div
                className="absolute inset-y-0 left-0 w-[22%]"
                style={{ backgroundColor: DESIGN_COLORS.semantic.underweight }}
              />
              <div
                className="absolute inset-y-0 left-[22%] w-[22%]"
                style={{ backgroundColor: DESIGN_COLORS.semantic.normal }}
              />
              <div
                className="absolute inset-y-0 left-[44%] w-[25%]"
                style={{ backgroundColor: DESIGN_COLORS.semantic.overweight }}
              />
              <div
                className="absolute inset-y-0 right-0 w-[31%]"
                style={{ backgroundColor: DESIGN_COLORS.semantic.obese }}
              />
              <span
                className="absolute -top-1 h-4 w-[2px] rounded-full bg-neutral-1"
                style={{ left: `calc(${markerPosition}% - 1px)` }}
                aria-hidden
              />
            </div>
            <div className="mt-4 grid grid-cols-4 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-neutral-1/60">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>

          <div className="mt-12 rounded-md border border-neutral-3 bg-neutral-2 p-5 shadow-xs">
            <div className="flex gap-3">
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M8 12.5l2.6 2.7L16 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p className="text-[16px] font-semibold leading-tight text-neutral-1">
                  Health Category: {category || "Pending"}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-neutral-1/80">
                  {category
                    ? getCategorySummary(category)
                    : "Enter your details and select Calculate Result to view your category and guidance."}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="mt-auto inline-flex items-center gap-2 pt-8 text-xs font-semibold text-primary hover:underline"
          >
            Detailed clinical breakdown
            <span aria-hidden>→</span>
          </button>
        </section>
      </div>
    </div>
  );
}
