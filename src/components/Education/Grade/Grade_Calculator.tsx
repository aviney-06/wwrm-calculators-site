"use client";

import { useRef, useState } from "react";
import { btnCalculate, numberFieldClass } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  calculateWeightedGrade,
  letterGradeFromPercent,
  type GradeRow,
} from "@/components/Education/shared/educationUtils";

type RowState = { score: string; weight: string };

const DEFAULT_ROWS: RowState[] = [
  { score: "85", weight: "30" },
  { score: "90", weight: "30" },
  { score: "78", weight: "40" },
];

export function Grade_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [rows, setRows] = useState<RowState[]>(DEFAULT_ROWS);
  const [error, setError] = useState<string | null>(null);
  const [grade, setGrade] = useState<number | null>(null);

  const updateRow = (index: number, field: keyof RowState, value: string) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  };

  const addRow = () => {
    setRows((prev) => [...prev, { score: "", weight: "" }]);
  };

  const run = () => {
    setError(null);
    const parsed: GradeRow[] = rows.map((r) => ({
      score: Number(r.score),
      weight: Number(r.weight),
    }));
    if (parsed.some((r) => !Number.isFinite(r.score) || !Number.isFinite(r.weight))) {
      setError("Enter valid numbers for every score and weight.");
      setGrade(null);
      return;
    }
    const out = calculateWeightedGrade(parsed);
    if (!out.ok) {
      setError(out.error);
      setGrade(null);
      return;
    }
    setGrade(out.grade);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const totalWeight = rows.reduce((s, r) => s + (Number(r.weight) || 0), 0);

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[12px] text-[#64748b] sm:text-[13px]">
        Enter each assignment score (0–100) and its weight. Weights do not need
        to total 100 — they are proportional.
      </p>
      <div className="space-y-2">
        <div className="grid grid-cols-[1fr_1fr] gap-2 px-1 text-[11px] font-medium text-[#64748b] sm:text-[12px]">
          <span>Score (%)</span>
          <span>Weight</span>
        </div>
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={100}
              value={row.score}
              onChange={(e) => updateRow(i, "score", e.target.value)}
              className={`${numberFieldClass} w-full font-mono`}
              aria-label={`Assignment ${i + 1} score`}
            />
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={row.weight}
              onChange={(e) => updateRow(i, "weight", e.target.value)}
              className={`${numberFieldClass} w-full font-mono`}
              aria-label={`Assignment ${i + 1} weight`}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addRow}
        className="self-start text-[13px] font-medium text-secondary underline-offset-2 hover:underline"
      >
        + Add assignment
      </button>
      <p className="text-[11px] text-[#94a3b8]">
        Total weight entered: {formatNum(totalWeight, 1)}
      </p>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate grade
      </button>
    </div>
  );

  const resultPanel =
    grade != null ? (
      <div className="text-center">
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">Course grade</p>
        <p className="mt-1 text-4xl font-semibold text-[#d66844]">
          {formatNum(grade, 2)}%
        </p>
        <p className="mt-2 text-[15px] font-medium text-[#334155]">
          Letter: {letterGradeFromPercent(grade)}
        </p>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Add assignment scores and weights to calculate your overall grade.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />
  );
}
