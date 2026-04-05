"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { InputWithSuffix } from "../shared/InputWithSuffix";
import { FormError, GenderField } from "../shared/StandardFormRows";

type G = "male" | "female";

/** Very rough trend estimate (not for legal or medical use). */
function estimateBac(
  stdDrinks: number,
  lbs: number,
  male: boolean,
  hours: number,
) {
  const w = Math.max(lbs, 90);
  const base = stdDrinks * 0.025 * (180 / w);
  return Math.max(0, base - 0.015 * hours);
}

export function BAC_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [drinks, setDrinks] = useState("");
  const [lbs, setLbs] = useState("");
  const [gender, setGender] = useState<G>("male");
  const [hours, setHours] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [bac, setBac] = useState<number | null>(null);

  const run = () => {
    setError(null);
    const d = parseFloat(drinks);
    const lb = parseFloat(lbs);
    const h = parseFloat(hours);
    if (Number.isNaN(d) || d <= 0 || d > 20) {
      setError("Enter standard drinks (1 = ~14g alcohol).");
      setBac(null);
      return;
    }
    if (Number.isNaN(lb) || lb <= 0) {
      setError("Enter body weight in pounds.");
      setBac(null);
      return;
    }
    if (Number.isNaN(h) || h < 0 || h > 24) {
      setError("Hours since drinking started (0–24).");
      setBac(null);
      return;
    }
    const pct = estimateBac(d, lb, gender === "male", h);
    setBac(Math.round(pct * 1000) / 1000);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Standard drinks
        </p>
        <InputWithSuffix
          type="number"
          step={0.5}
          min={0}
          value={drinks}
          onChange={(e) => setDrinks(e.target.value)}
          suffix="drinks"
          inputClassName="max-w-[10rem]"
        />
        <p className="mt-1 text-[11px] text-[#94a3b8]">
          ~14 g alcohol per US standard drink.
        </p>
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Weight
        </p>
        <InputWithSuffix
          type="number"
          min={0}
          value={lbs}
          onChange={(e) => setLbs(e.target.value)}
          suffix="lbs"
          inputClassName="max-w-[10rem]"
        />
      </div>
      <GenderField
        gender={gender}
        setGender={setGender}
        namePrefix="bac"
        hint="Used for body water estimate."
      />
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Hours since first drink
        </p>
        <InputWithSuffix
          type="number"
          min={0}
          step={0.25}
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          suffix="hrs"
          inputClassName="max-w-[8rem]"
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Estimate BAC
      </button>
    </div>
  );

  const result =
    bac != null ? (
      <>
        <p className="text-center text-3xl font-bold text-[#d66844]">{bac}%</p>
        <p className="max-w-[15rem] text-center text-[11px] leading-snug text-[#64748b]">
          Very rough model — never drink and drive. Legal limits vary by
          country; this is not evidence.
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Educational estimate only.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
