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

/** Mosteller: sqrt(h_cm * w_kg / 3600) m² */
function bsaMosteller(hCm: number, wKg: number) {
  return Math.sqrt((hCm * wKg) / 3600);
}

export function BSA_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [unit, setUnit] = useState<Unit>("imperial");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [cm, setCm] = useState("");
  const [lbs, setLbs] = useState("");
  const [kg, setKg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [bsa, setBsa] = useState<number | null>(null);

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
    let hCm: number;
    let wKg: number;
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
        setBsa(null);
        return;
      }
      hCm = (f * 12 + i) * 2.54;
      wKg = lb * 0.45359237;
    } else {
      const c = parseFloat(cm);
      const k = parseFloat(kg);
      if (Number.isNaN(c) || Number.isNaN(k) || c <= 0 || k <= 0) {
        setError("Enter valid height (cm) and weight (kg).");
        setBsa(null);
        return;
      }
      hCm = c;
      wKg = k;
    }
    setBsa(Math.round(bsaMosteller(hCm, wKg) * 1000) / 1000);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <UnitsRow
        label="Units"
        selectId="bsa-units"
        select={
          <CustomSelect<Unit>
            id="bsa-units"
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
        Calculate BSA
      </button>
    </div>
  );

  const result =
    bsa != null ? (
      <>
        <p className="text-center text-3xl font-bold text-[#d66844]">{bsa}</p>
        <p className="text-center text-[14px] font-medium text-[#334155]">
          m² (Mosteller)
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Body surface area from height and weight.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
