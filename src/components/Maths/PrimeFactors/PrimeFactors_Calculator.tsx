"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, gcd, lcm, lcmList, combinations, primeFactors } from "@/components/Maths/shared/mathUtils";

export function PrimeFactors_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState("360");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const x = parseInt(n, 10);
    if (Number.isNaN(x) || x < 2) { setError("Enter an integer ≥ 2."); setOut(null); return; }
    const factors = primeFactors(x);
    setOut(factors.length ? factors.join(" × ") : "—");
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <InputWithSuffix type="number" suffix="" value={n} onChange={e => setN(e.target.value)} inputClassName="max-w-[10rem]" />
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Factorize</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-xl font-bold text-[#d66844] sm:text-2xl">{out}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Prime factors</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
