"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { CustomSelect } from "@/components/Health-Fitness/shared/CustomSelect";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";

type Mode = "percentOf" | "whatPercent";

const ACCENT = "#d66844";

export function Percent_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("percentOf");
  const [a, setA] = useState("15");
  const [b, setB] = useState("200");
  const [error, setError] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);
  const [resultDetail, setResultDetail] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (Number.isNaN(x) || Number.isNaN(y)) {
      setError("Enter valid numbers.");
      setResultText(null);
      return;
    }
    if (mode === "percentOf") {
      setResultText(formatNum((x / 100) * y));
      setResultDetail(`${x}% of ${y}`);
    } else {
      if (y === 0) {
        setError("Cannot divide by zero.");
        setResultText(null);
        return;
      }
      setResultText(`${formatNum((x / y) * 100)}%`);
      setResultDetail(`${x} is what percent of ${y}`);
    }
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Calculation
        </p>
        <CustomSelect<Mode>
          id="percent-mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: "percentOf", label: "X% of Y" },
            { value: "whatPercent", label: "X is what % of Y" },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
            {mode === "percentOf" ? "Percent (X)" : "Value (X)"}
          </p>
          <InputWithSuffix
            type="number"
            suffix={mode === "percentOf" ? "%" : ""}
            value={a}
            onChange={(e) => setA(e.target.value)}
            inputClassName="w-full max-w-[9rem]"
          />
        </div>
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
            {mode === "percentOf" ? "Of (Y)" : "Of total (Y)"}
          </p>
          <InputWithSuffix
            type="number"
            suffix=""
            value={b}
            onChange={(e) => setB(e.target.value)}
            inputClassName="w-full max-w-[9rem]"
          />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate
      </button>
    </div>
  );

  const result =
    resultText != null ? (
      <>
        <p className="text-center text-3xl font-bold" style={{ color: ACCENT }}>
          {resultText}
        </p>
        <p className="text-center text-[14px] text-[#334155]">{resultDetail}</p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Find a percentage of a number or what percent one value is of another.
      </p>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={null}
    />
  );
}
