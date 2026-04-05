"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { AgeGenderRow } from "../shared/StandardFormRows";

type Gender = "male" | "female";
type Unit = "imperial" | "metric";

/** Reference: thin #E0E0E0 borders; slightly compact on small screens */
const fieldBase =
  "h-9 rounded border border-[#E0E0E0] bg-white pl-2 pr-8 text-[14px] text-[#334155] outline-none transition-shadow focus:border-[#2374ac] focus:ring-1 focus:ring-[#2374ac] sm:h-10 sm:pl-2.5 sm:pr-9 sm:text-[15px]";

/** Mobile: no min-height (fits split view); md+: match reference */
const panelInner =
  "flex min-h-0 flex-col p-3 sm:p-5 md:min-h-[500px] md:p-7";

const btnCalculate =
  "mt-auto w-full rounded-md bg-[#4CAF50] py-2.5 text-center text-[14px] font-semibold text-white shadow-sm hover:brightness-[1.02] active:brightness-95 sm:py-3 sm:text-[15px]";

const resultTerracotta = "#d66844";

/** Matches text inputs: #E0E0E0 border, blue focus ring; full width in narrow split column */
const unitsTriggerClass =
  "flex h-9 w-full min-w-0 max-w-full items-center justify-between gap-1.5 rounded border border-[#E0E0E0] bg-white pl-2 pr-1.5 text-left text-[13px] text-[#334155] outline-none transition-shadow hover:border-[#cbd5e1] focus:border-[#2374ac] focus:ring-1 focus:ring-[#2374ac] sm:h-10 sm:gap-2 sm:pl-2.5 sm:pr-2 sm:text-[15px]";

const UNIT_OPTIONS: { value: Unit; label: string }[] = [
  { value: "imperial", label: "Standard (US)" },
  { value: "metric", label: "Metric" },
];

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function UnitsSelect({
  id,
  value,
  onChange,
}: {
  id: string;
  value: Unit;
  onChange: (u: Unit) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId().replace(/:/g, "");

  useEffect(() => {
    function handleDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleDoc);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleDoc);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const current =
    UNIT_OPTIONS.find((o) => o.value === value) ?? UNIT_OPTIONS[0];

  return (
    <div className="relative w-full min-w-0 sm:min-w-[12rem]" ref={rootRef}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className={unitsTriggerClass}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span className="truncate">{current.label}</span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-[#64748b] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded border border-[#E0E0E0] bg-white py-1 shadow-[0_4px_14px_rgba(15,23,42,0.08)]"
        >
          {UNIT_OPTIONS.map((opt) => (
            <li key={opt.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === opt.value}
                className={`flex w-full items-center px-2.5 py-2 text-left text-[15px] text-[#334155] transition-colors hover:bg-[#f8fafc] ${value === opt.value ? "bg-[#f1f5f9] font-medium" : ""}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function InputWithSuffix({
  suffix,
  className = "",
  inputClassName = "",
  ...inputProps
}: ComponentProps<"input"> & {
  suffix: string;
  inputClassName?: string;
}) {
  return (
    <div className={`relative inline-flex ${className}`}>
      <input {...inputProps} className={`${fieldBase} ${inputClassName}`} />
      <span
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none text-[11px] text-[#64748b] sm:right-2.5 sm:text-[12px]"
        aria-hidden
      >
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

function bmiToNeedleAngle(bmi: number) {
  const clamped = Math.min(40, Math.max(15, bmi));
  const t = (clamped - 15) / 25;
  return Math.PI * (1 - t);
}

export function BMI_Calculator() {
  const gaugeGradId = useId().replace(/:/g, "");
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

  const needleAngle = bmi != null ? bmiToNeedleAngle(bmi) : Math.PI * 0.65;
  const cx = 100;
  const cy = 100;
  const r = 78;
  const nx = cx + r * Math.cos(needleAngle);
  const ny = cy - r * Math.sin(needleAngle);

  return (
    <div className="w-full">
      {/*
        Mobile: stacked rows with capped height so form + result stay in view;
        md+: two columns like reference.
      */}
      <div
        className={[
          "grid overflow-hidden rounded-md border border-[#E0E0E0] bg-white",
          "max-md:h-[min(72dvh,34rem)] max-md:grid-rows-2 max-md:divide-y max-md:divide-[#E0E0E0]",
          "md:min-h-[500px] md:grid-cols-2 md:grid-rows-1 md:divide-x md:divide-y-0 md:divide-[#E0E0E0]",
        ].join(" ")}
      >
        {/* Enter Details */}
        <section
          className={`${panelInner} max-md:overflow-y-auto max-md:overscroll-contain`}
        >
          <h2 className="mb-3 text-center text-[15px] font-semibold text-[#334155] sm:mb-5 sm:text-[16px] md:mb-8 md:text-[17px]">
            Enter Details
          </h2>

          <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
            <AgeGenderRow
              age={age}
              setAge={setAge}
              gender={gender}
              setGender={setGender}
              ageId="bmi-age"
              ageMin={2}
              ageMax={65}
            />

            <div className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2">
              <label
                htmlFor="bmi-units"
                className="shrink-0 text-[13px] font-medium text-[#334155] sm:min-w-[2.5rem] sm:text-[15px]"
              >
                Units
              </label>
              <UnitsSelect
                id="bmi-units"
                value={unit}
                onChange={handleUnitChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6">
              <div className="min-w-0">
                <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:mb-2.5 sm:text-[15px]">
                  Height
                </p>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                  {unit === "imperial" ? (
                    <>
                      <InputWithSuffix
                        type="number"
                        min={0}
                        inputMode="decimal"
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
                        inputMode="decimal"
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
                      inputMode="decimal"
                      value={cm}
                      onChange={(e) => setCm(e.target.value)}
                      suffix="cm"
                      inputClassName="w-full min-w-0 max-w-[7.5rem] sm:w-[7.5rem]"
                      aria-label="Centimeters"
                    />
                  )}
                </div>
              </div>

              <div className="min-w-0">
                <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:mb-2.5 sm:text-[15px]">
                  Weight
                </p>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                  {unit === "imperial" ? (
                    <InputWithSuffix
                      type="number"
                      min={0}
                      step={0.1}
                      inputMode="decimal"
                      value={lbs}
                      onChange={(e) => setLbs(e.target.value)}
                      suffix="lbs"
                      inputClassName="w-full min-w-0 max-w-[7.5rem] sm:w-[7.5rem]"
                      aria-label="Pounds"
                    />
                  ) : (
                    <InputWithSuffix
                      type="number"
                      min={0}
                      step={0.1}
                      inputMode="decimal"
                      value={kg}
                      onChange={(e) => setKg(e.target.value)}
                      suffix="kg"
                      inputClassName="w-full min-w-0 max-w-[7.5rem] sm:w-[7.5rem]"
                      aria-label="Kilograms"
                    />
                  )}
                </div>
              </div>
            </div>

            <button type="button" onClick={compute} className={btnCalculate}>
              Calculate
            </button>
          </div>
        </section>

        {/* Result */}
        <section
          className={`${panelInner} max-md:overflow-y-auto max-md:overscroll-contain`}
        >
          <h2 className="mb-2 text-center text-[15px] font-semibold text-[#334155] sm:mb-5 sm:text-[16px] md:mb-8 md:text-[17px]">
            Result
          </h2>

          <div className="flex flex-1 flex-col items-center justify-center gap-2 sm:gap-4 md:gap-6">
            <div className="w-full max-w-[140px] sm:max-w-[200px] md:max-w-[260px]">
              <svg viewBox="0 0 200 110" className="w-full" aria-hidden>
                <defs>
                  <linearGradient
                    id={gaugeGradId}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="30%" stopColor="#fb923c" />
                    <stop offset="55%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
                <path
                  d="M 22 100 A 78 78 0 0 1 178 100"
                  fill="none"
                  stroke={`url(#${gaugeGradId})`}
                  strokeWidth={20}
                  strokeLinecap="round"
                />
                <line
                  x1={cx}
                  y1={cy}
                  x2={nx}
                  y2={ny}
                  stroke="#1f2937"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
                <circle cx={cx} cy={cy} r={5} fill="#1f2937" />
              </svg>
            </div>

            {bmi != null ? (
              <>
                <div
                  className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-[3px] border-double bg-white sm:h-20 sm:w-20 sm:border-4 md:h-24 md:w-24"
                  style={{
                    borderColor: resultTerracotta,
                    color: resultTerracotta,
                  }}
                >
                  <span className="text-xl font-bold tabular-nums leading-none sm:text-2xl md:text-[2rem]">
                    {bmi}
                  </span>
                </div>
                <p
                  className="text-center text-xs font-bold uppercase tracking-wide sm:text-base md:text-lg"
                  style={{ color: resultTerracotta }}
                >
                  {category}
                </p>
              </>
            ) : (
              <p className="max-w-[11rem] px-1 text-center text-[11px] leading-snug text-[#9ca3af] sm:max-w-[220px] sm:text-[14px] sm:leading-relaxed">
                Enter your details and tap Calculate to see your BMI.
              </p>
            )}
          </div>
        </section>
      </div>

      <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
        Note - This result is an estimate. Talk to a healthcare provider for
        personalized guidance.
      </p>
    </div>
  );
}
