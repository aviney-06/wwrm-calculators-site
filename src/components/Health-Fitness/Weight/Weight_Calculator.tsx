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

type WUnit = "lb" | "kg" | "st";

const LB_PER_KG = 2.2046226218;
const LB_PER_ST = 14;

function splitStone(totalLb: number) {
  const st = Math.floor(totalLb / LB_PER_ST);
  const lb = totalLb - st * LB_PER_ST;
  return { st, lb };
}

export function Weight_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState<WUnit>("lb");
  const [error, setError] = useState<string | null>(null);
  const [converted, setConverted] = useState<{
    kg: number;
    lb: number;
    stLabel: string;
  } | null>(null);

  const run = () => {
    setError(null);
    const n = parseFloat(value);
    if (Number.isNaN(n) || n <= 0) {
      setError("Enter a positive weight.");
      setConverted(null);
      return;
    }
    let lb: number;
    if (unit === "kg") lb = n * LB_PER_KG;
    else if (unit === "st") lb = n * LB_PER_ST;
    else lb = n;

    if (lb > 1_000_000) {
      setError("Enter a realistic weight.");
      setConverted(null);
      return;
    }

    const kg = lb / LB_PER_KG;
    const { st, lb: remLb } = splitStone(lb);
    const stLabel =
      st > 0
        ? `${st} st ${remLb.toFixed(remLb < 10 ? 1 : 0)} lb`
        : `${remLb.toFixed(1)} lb`;

    setConverted({
      kg,
      lb,
      stLabel,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[11px] leading-snug text-[#64748b]">
        Convert between pounds, kilograms, and stone — handy when recipes or
        scales use different units.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
            Weight
          </p>
          <InputWithSuffix
            type="number"
            min={0}
            step={0.01}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            suffix={unit === "kg" ? "kg" : unit === "st" ? "st" : "lbs"}
            inputClassName="w-full max-w-[10rem]"
          />
        </div>
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
            Unit you entered
          </p>
          <CustomSelect<WUnit>
            id="weight-unit"
            value={unit}
            onChange={setUnit}
            options={[
              { value: "lb", label: "Pounds (lb)" },
              { value: "kg", label: "Kilograms (kg)" },
              { value: "st", label: "Stone (st)" },
            ]}
          />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Convert
      </button>
    </div>
  );

  const result =
    converted != null ? (
      <div className="w-full max-w-[17rem] space-y-2 text-left text-[13px] text-[#334155] sm:text-[14px]">
        <p>
          <span className="font-semibold">Kilograms:</span>{" "}
          {converted.kg.toFixed(2)} kg
        </p>
        <p>
          <span className="font-semibold">Pounds:</span>{" "}
          {converted.lb.toFixed(1)} lb
        </p>
        <p>
          <span className="font-semibold">Stone:</span> {converted.stLabel}
        </p>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Enter a weight and choose which unit it is in.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
