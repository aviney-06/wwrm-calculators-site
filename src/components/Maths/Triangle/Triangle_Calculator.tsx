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

export function Triangle_Calculator() {
  type Mode = "baseHeight" | "heron";
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("baseHeight");
  const [a, setA] = useState("6"); const [b, setB] = useState("4"); const [c, setC] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    if (mode === "baseHeight") {
      const base = parseFloat(a), height = parseFloat(b);
      if (Number.isNaN(base) || Number.isNaN(height) || base <= 0 || height <= 0) {
        setError("Enter positive base and height."); setOut(null); return;
      }
      setOut(formatNum(0.5 * base * height));
    } else {
      const s1 = parseFloat(a), s2 = parseFloat(b), s3 = parseFloat(c);
      if ([s1,s2,s3].some(n => Number.isNaN(n) || n <= 0)) { setError("Enter three positive sides."); setOut(null); return; }
      if (s1 + s2 <= s3 || s1 + s3 <= s2 || s2 + s3 <= s1) { setError("Sides do not form a valid triangle."); setOut(null); return; }
      const s = (s1 + s2 + s3) / 2;
      setOut(formatNum(Math.sqrt(s * (s - s1) * (s - s2) * (s - s3))));
    }
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Method</p>
        <CustomSelect<Mode> id="tri-mode" value={mode} onChange={setMode}
          options={[{ value: "baseHeight", label: "Base & height" }, { value: "heron", label: "Three sides (Heron)" }]} /></div>
      <div className="grid grid-cols-3 gap-2">
        <div><p className="mb-1 text-[11px] font-medium text-[#334155]">{mode === "baseHeight" ? "Base" : "Side a"}</p>
          <InputWithSuffix type="number" suffix="" value={a} onChange={e => setA(e.target.value)} inputClassName="w-full" /></div>
        <div><p className="mb-1 text-[11px] font-medium text-[#334155]">{mode === "baseHeight" ? "Height" : "Side b"}</p>
          <InputWithSuffix type="number" suffix="" value={b} onChange={e => setB(e.target.value)} inputClassName="w-full" /></div>
        {mode === "heron" && (
          <div><p className="mb-1 text-[11px] font-medium text-[#334155]">Side c</p>
            <InputWithSuffix type="number" suffix="" value={c} onChange={e => setC(e.target.value)} inputClassName="w-full" /></div>
        )}
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate area</button>
    </div>
  );
  const result = out != null ? (
    <><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">square units</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Triangle area</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
