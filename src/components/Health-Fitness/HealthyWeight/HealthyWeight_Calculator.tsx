"use client";

import { useCallback, useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { CustomSelect } from "../shared/CustomSelect";
import { InputWithSuffix } from "../shared/InputWithSuffix";
import { FormError, UnitsRow } from "../shared/StandardFormRows";
import { fromCmToFtIn, toCm } from "../shared/healthConversions";

type Unit = "imperial" | "metric";

export function HealthyWeight_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [unit, setUnit] = useState<Unit>("imperial");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [cm, setCm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState<{
    lo: number;
    hi: number;
    unitLabel: string;
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
    let heightIn: number;
    if (unit === "imperial") {
      const f = parseFloat(ft);
      const i = parseFloat(inch);
      if (Number.isNaN(f) || Number.isNaN(i) || i < 0 || i >= 12) {
        setError("Enter a valid height.");
        setRange(null);
        return;
      }
      heightIn = f * 12 + i;
    } else {
      const c = parseFloat(cm);
      if (Number.isNaN(c) || c <= 0) {
        setError("Enter height in cm.");
        setRange(null);
        return;
      }
      heightIn = c / 2.54;
    }
    if (heightIn <= 0) {
      setError("Enter a valid height.");
      setRange(null);
      return;
    }
    const loLb = (18.5 * heightIn * heightIn) / 703;
    const hiLb = (24.9 * heightIn * heightIn) / 703;
    if (unit === "imperial") {
      setRange({
        lo: Math.round(loLb * 10) / 10,
        hi: Math.round(hiLb * 10) / 10,
        unitLabel: "lbs",
      });
    } else {
      setRange({
        lo: Math.round(loLb * 0.45359237 * 10) / 10,
        hi: Math.round(hiLb * 0.45359237 * 10) / 10,
        unitLabel: "kg",
      });
    }
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <UnitsRow
        label="Units"
        selectId="hw-units"
        select={
          <CustomSelect<Unit>
            id="hw-units"
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
              inputClassName="max-w-[8rem]"
            />
          )}
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate healthy weight range
      </button>
    </div>
  );

  const result =
    range != null ? (
      <div className="text-center">
        <p className="text-[13px] text-[#64748b]">
          BMI {18.5}–{24.9} range
        </p>
        <p className="mt-2 text-2xl font-bold text-[#d66844]">
          {range.lo} – {range.hi} {range.unitLabel}
        </p>
        <p className="mt-2 text-[11px] text-[#94a3b8]">
          Approximate weight range for &quot;healthy&quot; BMI — not medical
          advice.
        </p>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Enter your height to see a typical healthy weight range.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
