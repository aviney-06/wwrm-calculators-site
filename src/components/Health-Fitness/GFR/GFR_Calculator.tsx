"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { InputWithSuffix } from "../shared/InputWithSuffix";
import { AgeGenderRow, FormError } from "../shared/StandardFormRows";

/** MDRD simplified (Scr mg/dL) — no race factor */
function gfrMdrd(scr: number, age: number, female: boolean) {
  const k = female ? 0.742 : 1;
  return 175 * scr ** -1.154 * age ** -0.203 * k;
}

export function GFR_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("female");
  const [scr, setScr] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [gfr, setGfr] = useState<number | null>(null);

  const run = () => {
    setError(null);
    const ageN = parseInt(age, 10);
    const s = parseFloat(scr);
    if (Number.isNaN(ageN) || ageN < 18 || ageN > 120) {
      setError("Enter age 18–120.");
      setGfr(null);
      return;
    }
    if (Number.isNaN(s) || s <= 0 || s > 30) {
      setError("Enter serum creatinine in mg/dL (typical 0.5–15).");
      setGfr(null);
      return;
    }
    const v = gfrMdrd(s, ageN, gender === "female");
    setGfr(Math.round(v));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <AgeGenderRow
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        ageId="gfr-age"
        ageMin={18}
        ageMax={120}
        ageHint="Adult estimate (MDRD)."
      />
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Serum creatinine
        </p>
        <InputWithSuffix
          type="number"
          step={0.01}
          min={0}
          value={scr}
          onChange={(e) => setScr(e.target.value)}
          suffix="mg/dL"
          inputClassName="max-w-[10rem]"
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Estimate GFR
      </button>
    </div>
  );

  const result =
    gfr != null ? (
      <>
        <p className="text-center text-3xl font-bold text-[#d66844]">{gfr}</p>
        <p className="text-center text-[14px] font-medium text-[#334155]">
          mL/min/1.73m² (MDRD)
        </p>
        <p className="max-w-[15rem] text-center text-[11px] text-[#64748b]">
          Simplified estimate — labs use CKD-EPI; follow your clinician
          &apos;s interpretation.
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Enter age, sex, and creatinine from blood work.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
