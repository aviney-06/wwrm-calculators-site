"use client";

import { useCallback, useMemo, useState, type ComponentProps } from "react";
import { fromCmToFtIn, toCm } from "../shared/healthConversions";
import {
  bmiFromImperial,
  bmiFromMetric,
} from "../shared/healthConversions";

type Unit = "imperial" | "metric";
type Gender = "male" | "female";

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

function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function AnorexicBMI_Calculator() {
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
  };

  const category = useMemo(() => (bmi != null ? bmiCategory(bmi) : ""), [bmi]);
  const isFemale = gender === "female";
  const isMetric = unit === "metric";
  const weightKg = useMemo(() => {
    if (unit === "metric") {
      const k = parseFloat(kg);
      return Number.isNaN(k) ? null : k;
    }
    const l = parseFloat(lbs);
    return Number.isNaN(l) ? null : l * 0.45359237;
  }, [unit, kg, lbs]);
  const targetLowerBound = 18.5;
  const distanceToTargetKg =
    bmi != null && weightKg != null && bmi > 0 && bmi < targetLowerBound
      ? (weightKg * targetLowerBound) / bmi - weightKg
      : null;

  return (
    <div className="w-full">
      <div className="grid gap-5 md:grid-cols-2 md:gap-8">
        <section className={`${panelClass} flex flex-col gap-5`}>
          <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] leading-snug text-amber-950">
            If you or someone you know struggles with eating or body image, you
            deserve support. In the U.S., call or text{" "}
            <span className="font-semibold">988</span> (Suicide &amp; Crisis) or
            contact NEDA at{" "}
            <span className="font-semibold">nationaleatingdisorders.org</span>.
            This tool is only a BMI number — not a diagnosis.
          </p>

          <div>
            <p className={labelClass}>Biological Sex</p>
            <div className="mt-2.5 flex gap-3">
              <button
                type="button"
                className={`${toggleBase} ${!isFemale ? "border-primary bg-primary text-neutral-2" : "border-transparent bg-neutral-3 text-neutral-1/80"}`}
                onClick={() => setGender("male")}
              >
                <span aria-hidden className="mr-2">
                  ♂
                </span>
                Male
              </button>
              <button
                type="button"
                className={`${toggleBase} ${isFemale ? "border-primary bg-primary text-neutral-2" : "border-transparent bg-neutral-3 text-neutral-1/80"}`}
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
            <label htmlFor="abmi-age" className={labelClass}>
              Age
            </label>
            <div className="mt-2.5">
              <InputWithSuffix
                id="abmi-age"
                type="number"
                min={10}
                max={120}
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
                onClick={() => handleUnit("metric")}
              >
                Metric
              </button>
              <button
                type="button"
                className={`${toggleBase} ${!isMetric ? "border-primary bg-primary text-neutral-2" : "border-transparent bg-neutral-3 text-neutral-1/80"}`}
                onClick={() => handleUnit("imperial")}
              >
                Standard
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
                    step={0.1}
                    value={cm}
                    onChange={(e) => setCm(e.target.value)}
                    suffix="cm"
                  />
                ) : (
                  <>
                    <InputWithSuffix
                      type="number"
                      value={ft}
                      onChange={(e) => setFt(e.target.value)}
                      suffix="ft"
                      aria-label="Feet"
                    />
                    <InputWithSuffix
                      type="number"
                      max={11.9}
                      step={0.1}
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
                <InputWithSuffix
                  type="number"
                  step={0.1}
                  value={isMetric ? kg : lbs}
                  onChange={(e) =>
                    isMetric ? setKg(e.target.value) : setLbs(e.target.value)
                  }
                  suffix={isMetric ? "kg" : "lbs"}
                />
              </div>
            </div>
          </div>

          {error ? (
            <p
              className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] leading-snug text-red-900"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <button
            type="button"
            className="mt-auto h-[44px] rounded-md bg-primary text-sm font-semibold text-neutral-2 transition-opacity hover:opacity-95"
            onClick={run}
          >
            Calculate BMI
          </button>
        </section>

        <section className={`${panelClass} flex flex-col`}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-1/75">
            Calculation Result
          </p>

          <div className="mt-5 flex items-end gap-1">
            <span className="text-5xl font-extrabold leading-none text-primary">
              {bmi != null ? bmi.toFixed(1) : "--"}
            </span>
            <span className="pb-2 text-xl font-normal text-neutral-1/75">
              kg/m²
            </span>
          </div>

          <p
            className={`mt-4 inline-flex items-center gap-2 text-[18px] font-semibold ${bmi != null && bmi < 18.5 ? "text-red-700" : "text-primary"}`}
          >
            <span aria-hidden>{bmi != null && bmi < 18.5 ? "⚠" : "✓"}</span>
            {category ? `${category} Range` : "Awaiting Input"}
          </p>

          <div className="mt-8 rounded-xl border border-neutral-3 bg-neutral-2 p-5 shadow-xs">
            <div className="border-l-4 border-primary pl-4">
              <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-primary">
                <span aria-hidden>✚</span>
                Recovery Perspective
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-neutral-1/85">
                {bmi != null && bmi < 18.5
                  ? "A BMI below 18.5 is clinically categorized as underweight. This measurement, while a useful screening tool, does not account for muscle mass, bone density, or overall body composition. In clinical contexts, rapid weight loss and nutritional deficiency markers are prioritized alongside this score to develop a sustainable recovery trajectory."
                  : "BMI is a screening metric and should be interpreted with broader clinical context including nutrition, energy levels, cycle history, and physical/mental wellbeing indicators."}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between rounded-md bg-neutral-3 px-4 py-3">
              <span className="text-sm font-semibold text-neutral-1/80">
                Ideal Range Lower Bound
              </span>
              <span className="text-xl font-semibold text-primary">
                {targetLowerBound}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-md bg-neutral-3 px-4 py-3">
              <span className="text-sm font-semibold text-neutral-1/80">
                Distance to Target
              </span>
              <span className="text-xl font-semibold text-red-700">
                {distanceToTargetKg != null ? `+${distanceToTargetKg.toFixed(1)} kg` : "--"}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
          >
            View Detailed Clinical Breakdown
            <span aria-hidden>›</span>
          </button>
        </section>
      </div>

      <p className="mt-4 text-center text-[11px] italic leading-snug text-neutral-1/55 sm:mt-8 sm:text-[13px]">
        This page does not encourage harmful weight goals. If you are in
        crisis, contact local emergency services or 988.
      </p>
    </div>
  );
}
