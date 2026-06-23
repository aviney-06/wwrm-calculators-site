"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase, numberFieldClass } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import { MCG_PER_IU, mcgToIu } from "@/components/Conversion/shared/conversionUtils";

type Props = {
  emptyHint: string;
};

const SUBSTANCE_IDS = Object.keys(MCG_PER_IU);

export function McgToIuConverter({ emptyHint }: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [mcg, setMcg] = useState("100");
  const [substance, setSubstance] = useState(SUBSTANCE_IDS[0]);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const amount = Number(mcg.trim());
    if (!Number.isFinite(amount) || amount < 0) {
      setError("Enter a valid amount in micrograms.");
      setResult(null);
      return;
    }
    const entry = MCG_PER_IU[substance];
    const iu = entry ? mcgToIu(amount, entry.factor) : null;
    if (iu == null) {
      setError("Could not convert for this substance.");
      setResult(null);
      return;
    }
    setResult(formatNum(iu, 2));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="mcg-iu-substance"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Substance
        </label>
        <select
          id="mcg-iu-substance"
          value={substance}
          onChange={(e) => setSubstance(e.target.value)}
          className={`${fieldBase} w-full appearance-none bg-white`}
        >
          {SUBSTANCE_IDS.map((id) => (
            <option key={id} value={id}>
              {MCG_PER_IU[id].label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="mcg-iu-value"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Micrograms (mcg)
        </label>
        <input
          id="mcg-iu-value"
          type="number"
          min={0}
          step="any"
          value={mcg}
          onChange={(e) => setMcg(e.target.value)}
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
          International units
        </p>
        <p className="mt-1 text-3xl font-semibold text-[#d66844] sm:text-4xl">
          {result}
          <span className="ml-1.5 text-[18px] font-medium text-[#334155] sm:text-[20px]">
            IU
          </span>
        </p>
        <p className="mt-3 text-[12px] text-[#94a3b8] sm:text-[13px]">
          {mcg} mcg of {MCG_PER_IU[substance]?.label}
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
          IU factors are substance-specific and standardized. Always follow
          product labeling and medical advice for dosing.
        </p>
      }
    />
  );
}
