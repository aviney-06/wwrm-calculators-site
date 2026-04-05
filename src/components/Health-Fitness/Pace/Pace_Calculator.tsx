"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { CustomSelect } from "../shared/CustomSelect";
import { InputWithSuffix } from "../shared/InputWithSuffix";
import { FormError } from "../shared/StandardFormRows";

type DistUnit = "mi" | "km";

function formatPace(secPerUnit: number) {
  if (!Number.isFinite(secPerUnit) || secPerUnit <= 0) return "—";
  const m = Math.floor(secPerUnit / 60);
  const s = Math.round(secPerUnit % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function Pace_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [dist, setDist] = useState("");
  const [unit, setUnit] = useState<DistUnit>("mi");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pace, setPace] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const d = parseFloat(dist);
    const m = parseInt(min, 10) || 0;
    const s = parseInt(sec, 10) || 0;
    if (Number.isNaN(d) || d <= 0) {
      setError("Enter a positive distance.");
      setPace(null);
      return;
    }
    const totalSec = m * 60 + s;
    if (totalSec <= 0) {
      setError("Enter time greater than zero.");
      setPace(null);
      return;
    }
    const secPer = totalSec / d;
    setPace(formatPace(secPer));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div className="min-w-0">
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
            Distance
          </p>
          <InputWithSuffix
            type="number"
            step={0.01}
            min={0}
            value={dist}
            onChange={(e) => setDist(e.target.value)}
            suffix={unit}
            inputClassName="w-full max-w-[8rem]"
          />
        </div>
        <div className="min-w-0">
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
            Unit
          </p>
          <CustomSelect<DistUnit>
            id="pace-unit"
            value={unit}
            onChange={setUnit}
            options={[
              { value: "mi", label: "Miles" },
              { value: "km", label: "Kilometers" },
            ]}
          />
        </div>
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Time (duration)
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <InputWithSuffix
            type="number"
            min={0}
            value={min}
            onChange={(e) => setMin(e.target.value)}
            suffix="min"
            inputClassName="w-[5rem]"
          />
          <InputWithSuffix
            type="number"
            min={0}
            max={59}
            value={sec}
            onChange={(e) => setSec(e.target.value)}
            suffix="sec"
            inputClassName="w-[5rem]"
          />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate pace
      </button>
    </div>
  );

  const label = unit === "mi" ? "min/mi" : "min/km";

  const result =
    pace != null ? (
      <>
        <p className="text-center text-3xl font-bold tabular-nums text-[#d66844]">
          {pace}
        </p>
        <p className="text-center text-[14px] font-medium text-[#334155]">
          {label}
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Enter distance and time for your run or ride.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
