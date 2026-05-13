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

type WwMode = "classic" | "pointsplus";

/** Legacy (pre-PointsPlus) — fiber often capped at 4 g. */
function classicPoints(calories: number, fatG: number, fiberG: number) {
  const fiberCapped = Math.min(Math.max(fiberG, 0), 4);
  const raw = calories / 50 + fatG / 12 - fiberCapped / 5;
  return Math.max(0, Math.round(raw));
}

/** Published-style PointsPlus: (16P + 19C + 45F + 14Fi) / 175, rounded. */
function pointsPlusPoints(
  protein: number,
  carbs: number,
  fat: number,
  fiber: number,
) {
  const raw = (16 * protein + 19 * carbs + 45 * fat + 14 * fiber) / 175;
  return Math.max(0, Math.round(raw));
}

export function WeightWatchers_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<WwMode>("pointsplus");
  const [calories, setCalories] = useState("");
  const [fatC, setFatC] = useState("");
  const [fiberC, setFiberC] = useState("");
  const [p, setP] = useState("");
  const [c, setC] = useState("");
  const [f, setF] = useState("");
  const [fiberPp, setFiberPp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pts, setPts] = useState<number | null>(null);

  const run = () => {
    setError(null);
    if (mode === "classic") {
      const cal = parseFloat(calories);
      const fat = parseFloat(fatC);
      const fib = parseFloat(fiberC) || 0;
      if (Number.isNaN(cal) || cal < 0 || Number.isNaN(fat) || fat < 0 || fib < 0) {
        setError("Enter non-negative calories, fat, and fiber.");
        setPts(null);
        return;
      }
      setPts(classicPoints(cal, fat, fib));
    } else {
      const protein = parseFloat(p);
      const carbs = parseFloat(c);
      const fat = parseFloat(f);
      const fib = parseFloat(fiberPp) || 0;
      if (
        [protein, carbs, fat].some((x) => Number.isNaN(x) || x < 0) ||
        fib < 0
      ) {
        setError("Enter non-negative grams for protein, carbs, fat, and fiber.");
        setPts(null);
        return;
      }
      setPts(pointsPlusPoints(protein, carbs, fat, fib));
    }
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[11px] leading-snug text-[#64748b]">
        Unofficial estimates only — not affiliated with WW. SmartPoints uses a
        proprietary model not shown here.
      </p>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Formula
        </p>
        <CustomSelect<WwMode>
          id="ww-mode"
          value={mode}
          onChange={setMode}
          options={[
            {
              value: "classic",
              label: "Classic Points (calories, fat, fiber)",
            },
            {
              value: "pointsplus",
              label: "PointsPlus (protein, carbs, fat, fiber)",
            },
          ]}
        />
      </div>
      {mode === "classic" ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3">
          <div>
            <p className="mb-1 text-[12px] font-medium text-[#334155]">Calories</p>
            <InputWithSuffix
              type="number"
              min={0}
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              suffix="kcal"
              inputClassName="w-full max-w-[8rem]"
            />
          </div>
          <div>
            <p className="mb-1 text-[12px] font-medium text-[#334155]">Fat</p>
            <InputWithSuffix
              type="number"
              min={0}
              value={fatC}
              onChange={(e) => setFatC(e.target.value)}
              suffix="g"
              inputClassName="w-full max-w-[7rem]"
            />
          </div>
          <div>
            <p className="mb-1 text-[12px] font-medium text-[#334155]">Fiber</p>
            <InputWithSuffix
              type="number"
              min={0}
              value={fiberC}
              onChange={(e) => setFiberC(e.target.value)}
              suffix="g"
              inputClassName="w-full max-w-[7rem]"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div>
            <p className="mb-1 text-[12px] font-medium text-[#334155]">Protein</p>
            <InputWithSuffix
              type="number"
              min={0}
              value={p}
              onChange={(e) => setP(e.target.value)}
              suffix="g"
              inputClassName="w-full max-w-[7rem]"
            />
          </div>
          <div>
            <p className="mb-1 text-[12px] font-medium text-[#334155]">Carbs</p>
            <InputWithSuffix
              type="number"
              min={0}
              value={c}
              onChange={(e) => setC(e.target.value)}
              suffix="g"
              inputClassName="w-full max-w-[7rem]"
            />
          </div>
          <div>
            <p className="mb-1 text-[12px] font-medium text-[#334155]">Fat</p>
            <InputWithSuffix
              type="number"
              min={0}
              value={f}
              onChange={(e) => setF(e.target.value)}
              suffix="g"
              inputClassName="w-full max-w-[7rem]"
            />
          </div>
          <div>
            <p className="mb-1 text-[12px] font-medium text-[#334155]">Fiber</p>
            <InputWithSuffix
              type="number"
              min={0}
              value={fiberPp}
              onChange={(e) => setFiberPp(e.target.value)}
              suffix="g"
              inputClassName="w-full max-w-[7rem]"
            />
          </div>
        </div>
      )}
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Estimate points
      </button>
    </div>
  );

  const result =
    pts != null ? (
      <>
        <p className="text-center text-3xl font-bold text-[#d66844]">{pts}</p>
        <p className="text-center text-[14px] font-medium text-[#334155]">
          points (approx.)
        </p>
        <p className="max-w-[15rem] text-center text-[11px] text-[#64748b]">
          {mode === "classic"
            ? "Classic: cal÷50 + fat÷12 − fiber÷5 (fiber capped at 4 g), rounded."
            : "PointsPlus: (16P + 19C + 45F + 14Fi) ÷ 175, rounded."}
        </p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Choose a formula and enter the matching numbers.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
