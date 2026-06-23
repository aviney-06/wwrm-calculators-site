"use client";

import { useRef, useState } from "react";
import { btnCalculate, numberFieldClass } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import { gramsToMoles } from "@/components/Conversion/shared/conversionUtils";

type Props = {
  emptyHint: string;
};

export function GramsToMolesConverter({ emptyHint }: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const [grams, setGrams] = useState("18");
  const [molarMass, setMolarMass] = useState("18.015");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const mass = Number(grams.trim());
    const mm = Number(molarMass.trim());
    if (!Number.isFinite(mass) || mass < 0) {
      setError("Enter a valid mass in grams.");
      setResult(null);
      return;
    }
    if (!Number.isFinite(mm) || mm <= 0) {
      setError("Enter a valid molar mass (g/mol) greater than 0.");
      setResult(null);
      return;
    }
    const moles = gramsToMoles(mass, mm);
    if (moles == null) {
      setError("Could not convert with the given molar mass.");
      setResult(null);
      return;
    }
    setResult(formatNum(moles, 6));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="grams-value"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Mass (grams)
        </label>
        <input
          id="grams-value"
          type="number"
          min={0}
          step="any"
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
          className={`${numberFieldClass()} w-full font-mono`}
        />
      </div>
      <div>
        <label
          htmlFor="molar-mass"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Molar mass (g/mol)
        </label>
        <input
          id="molar-mass"
          type="number"
          min={0.001}
          step="any"
          value={molarMass}
          onChange={(e) => setMolarMass(e.target.value)}
          className={`${numberFieldClass()} w-full max-w-[10rem] font-mono`}
        />
        <p className="mt-1 text-[11px] text-[#94a3b8] sm:text-[12px]">
          Water (H₂O) ≈ 18.015 g/mol. Use the substance&rsquo;s molar mass.
        </p>
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
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">Moles</p>
        <p className="mt-1 text-3xl font-semibold text-[#d66844] sm:text-4xl">
          {result}
          <span className="ml-1.5 text-[18px] font-medium text-[#334155] sm:text-[20px]">
            mol
          </span>
        </p>
        <p className="mt-3 text-[12px] text-[#94a3b8] sm:text-[13px]">
          {grams} g ÷ {molarMass} g/mol
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
          Moles = mass ÷ molar mass. Molar mass depends on the chemical formula.
        </p>
      }
    />
  );
}
