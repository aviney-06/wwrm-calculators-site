"use client";

import { useRef, useState } from "react";
import { btnCalculate, numberFieldClass } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  letterGradeFromPercent,
  requiredFinalExamScore,
  testScorePercent,
} from "@/components/Education/shared/educationUtils";

type Mode = "final" | "score";

export function TestGrade_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("final");
  const [current, setCurrent] = useState("85");
  const [target, setTarget] = useState("90");
  const [finalWeight, setFinalWeight] = useState("25");
  const [correct, setCorrect] = useState("42");
  const [total, setTotal] = useState("50");
  const [error, setError] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);
  const [subtext, setSubtext] = useState<string | null>(null);

  const run = () => {
    setError(null);
    setSubtext(null);

    if (mode === "final") {
      const out = requiredFinalExamScore(
        Number(current),
        Number(target),
        Number(finalWeight),
      );
      if (!out.ok) {
        setError(out.error);
        setResultText(null);
        return;
      }
      const req = out.required;
      if (req > 100) {
        setResultText("Not possible");
        setSubtext(
          `You would need ${formatNum(req, 1)}% on the final — above 100%.`,
        );
      } else if (req < 0) {
        setResultText("Already achieved");
        setSubtext("You can score 0% on the final and still hit your target.");
      } else {
        setResultText(`${formatNum(req, 1)}%`);
        setSubtext(
          `Need ${formatNum(req, 1)}% on the final (${finalWeight}% weight) to reach ${target}%.`,
        );
      }
    } else {
      const out = testScorePercent(Number(correct), Number(total));
      if (!out.ok) {
        setError(out.error);
        setResultText(null);
        return;
      }
      setResultText(`${formatNum(out.percent, 1)}%`);
      setSubtext(`Letter grade: ${letterGradeFromPercent(out.percent)}`);
    }
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Calculator type
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#334155]">
            <input
              type="radio"
              name="test-grade-mode"
              checked={mode === "final"}
              onChange={() => setMode("final")}
              className="h-3.5 w-3.5 accent-[#2374ac]"
            />
            Final exam needed
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#334155]">
            <input
              type="radio"
              name="test-grade-mode"
              checked={mode === "score"}
              onChange={() => setMode("score")}
              className="h-3.5 w-3.5 accent-[#2374ac]"
            />
            Test score (%)
          </label>
        </div>
      </div>

      {mode === "final" ? (
        <>
          <div>
            <label
              htmlFor="tg-current"
              className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
            >
              Current grade
            </label>
            <InputWithSuffix
              id="tg-current"
              type="number"
              min={0}
              max={100}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              suffix="%"
              className="w-full min-w-0"
              inputClassName="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="tg-target"
              className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
            >
              Target grade
            </label>
            <InputWithSuffix
              id="tg-target"
              type="number"
              min={0}
              max={100}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              suffix="%"
              className="w-full min-w-0"
              inputClassName="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="tg-weight"
              className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
            >
              Final exam weight
            </label>
            <InputWithSuffix
              id="tg-weight"
              type="number"
              min={1}
              max={100}
              value={finalWeight}
              onChange={(e) => setFinalWeight(e.target.value)}
              suffix="%"
              className="w-full min-w-0"
              inputClassName="w-full"
            />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div>
            <label
              htmlFor="tg-correct"
              className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
            >
              Correct
            </label>
            <input
              id="tg-correct"
              type="number"
              inputMode="numeric"
              min={0}
              value={correct}
              onChange={(e) => setCorrect(e.target.value)}
              className={`${numberFieldClass} w-full font-mono`}
            />
          </div>
          <div>
            <label
              htmlFor="tg-total"
              className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
            >
              Total questions
            </label>
            <input
              id="tg-total"
              type="number"
              inputMode="numeric"
              min={1}
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              className={`${numberFieldClass} w-full font-mono`}
            />
          </div>
        </div>
      )}

      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate
      </button>
    </div>
  );

  const resultPanel =
    resultText != null ? (
      <div className="text-center">
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">
          {mode === "final" ? "Required on final" : "Test grade"}
        </p>
        <p className="mt-1 text-3xl font-semibold text-[#d66844] sm:text-4xl">
          {resultText}
        </p>
        {subtext ? (
          <p className="mt-3 max-w-xs text-[12px] leading-snug text-[#94a3b8] sm:text-[13px]">
            {subtext}
          </p>
        ) : null}
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Find the final exam score you need, or convert correct answers to a
        percentage.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />
  );
}
