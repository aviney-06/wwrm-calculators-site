"use client";
import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import { CalculatorTwoPanel, scrollResultIntoViewMobile } from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";

export function PythagoreanTheorem_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("3");
  const [b, setB] = useState("4");
  const [error, setError] = useState<string | null>(null);
  const [c, setC] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const x = parseFloat(a), y = parseFloat(b);
    if (Number.isNaN(x) || Number.isNaN(y) || x <= 0 || y <= 0) { setError("Enter positive leg lengths."); setC(null); return; }
    setC(formatNum(Math.sqrt(x*x + y*y)));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Leg a</p>
          <InputWithSuffix type="number" suffix="" value={a} onChange={e => setA(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Leg b</p>
          <InputWithSuffix type="number" suffix="" value={b} onChange={e => setB(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Find hypotenuse</button>
    </div>
  );
  const result = c != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{c}</p><p className="text-center text-[14px] text-[#334155]">hypotenuse c</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">c = √(a² + b²)</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
