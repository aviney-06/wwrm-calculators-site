"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";

export function PercentOff_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [price, setPrice] = useState("100");
  const [off, setOff] = useState("20");
  const [error, setError] = useState<string | null>(null);
  const [sale, setSale] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const p = parseFloat(price), pct = parseFloat(off);
    if (Number.isNaN(p) || Number.isNaN(pct) || p < 0 || pct < 0 || pct > 100) {
      setError("Enter price and discount 0–100%."); setSale(null); return;
    }
    const discount = p * (pct / 100);
    setSale(formatNum(p - discount));
    setSaved(formatNum(discount));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Original price</p>
          <InputWithSuffix type="number" suffix="" value={price} onChange={e => setPrice(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Percent off</p>
          <InputWithSuffix type="number" suffix="%" value={off} onChange={e => setOff(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate sale price</button>
    </div>
  );
  const result = sale != null ? (
    <div className="w-full max-w-[14rem] space-y-1 text-center">
      <p className="text-3xl font-bold text-[#d66844]">{sale}</p>
      <p className="text-[14px] text-[#334155]">sale price</p>
      <p className="text-[12px] text-[#64748b]">You save {saved}</p>
    </div>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Discounted price</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
