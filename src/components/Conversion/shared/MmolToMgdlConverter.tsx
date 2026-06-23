"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase, numberFieldClass } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import { MMOL_TO_MGDL, mmolToMgdl } from "@/components/Conversion/shared/conversionUtils";

type Props = {
  emptyHint: string;
};

const SUBSTANCE_IDS = Object.keys(MMOL_TO_MGDL);

export function MmolToMgdlConverter({ emptyHint }: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [mmol, setMmol] = useState("5.5");
  const [substance, setSubstance] = useState(SUBSTANCE_IDS[0]);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const amount = Number(mmol.trim());
    if (!Number.isFinite(amount) || amount < 0) {
      setError("Enter a valid value in mmol/L.");
      setResult(null);
      return;
    }
    const entry = MMOL_TO_MGDL[substance];
    const mgdl = entry ? mmolToMgdl(amount, entry.factor) : null;
    if (mgdl == null) {
      setError("Could not convert for this substance.");
      setResult(null);
      return;
    }
    setResult(formatNum(mgdl, 2));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="mmol-substance"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Substance
        </label>
        <select
          id="mmol-substance"
          value={substance}
          onChange={(e) => setSubstance(e.target.value)}
          className={`${fieldBase} w-full appearance-none bg-white`}
        >
          {SUBSTANCE_IDS.map((id) => (
            <option key={id} value={id}>
              {MMOL_TO_MGDL[id].label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="mmol-value"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Concentration (mmol/L)
        </label>
        <input
          id="mmol-value"
          type="number"
          min={0}
          step="any"
          value={mmol}
          onChange={(e) => setMmol(e.target.value)}
          className={`${numberFieldClass()} w-full font-mono`}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Convert
      </button>
    </div>
  );

  const resultPanel =
    result != null ? (
      <div className="text-center">
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">
          Concentration
        </p>
        <p className="mt-1 text-3xl font-semibold text-[#d66844] sm:text-4xl">
          {result}
          <span className="ml-1.5 text-[18px] font-medium text-[#334155] sm:text-[20px]">
            mg/dL
          </span>
        </p>
        <p className="mt-3 text-[12px] text-[#94a3b8] sm:text-[13px]">
          {mmol} mmol/L of {MMOL_TO_MGDL[substance]?.label}
        </p>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        {emptyHint}
      </p>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Conversion factors are substance-specific. For medical decisions, follow
          lab reference ranges and professional guidance.
        </p>
      }
    />
  );
}
