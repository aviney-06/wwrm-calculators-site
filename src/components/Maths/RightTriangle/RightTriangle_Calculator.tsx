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

export function RightTriangle_Calculator() {
  type Mode = "hypotenuse" | "leg";
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("hypotenuse");
  const [a, setA] = useState("3");
  const [b, setB] = useState("4");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [detail, setDetail] = useState("");

  const run = () => {
    setError(null);
    const x = parseFloat(a), y = parseFloat(b);
    if (Number.isNaN(x) || Number.isNaN(y) || x <= 0 || y <= 0) {
      setError("Enter positive side lengths."); setOut(null); return;
    }
    if (mode === "hypotenuse") {
      setOut(formatNum(Math.sqrt(x * x + y * y)));
      setDetail("hypotenuse c");
    } else {
      if (x <= y) { setError("Hypotenuse must be longer than the leg."); setOut(null); return; }
      setOut(formatNum(Math.sqrt(x * x - y * y)));
      setDetail("missing leg");
    }
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Solve for</p>
        <CustomSelect<Mode> id="rt-mode" value={mode} onChange={setMode}
          options={[{ value: "hypotenuse", label: "Hypotenuse (two legs)" }, { value: "leg", label: "Leg (hypotenuse + leg)" }]} />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">{mode === "hypotenuse" ? "Leg a" : "Hypotenuse"}</p>
          <InputWithSuffix type="number" suffix="" value={a} onChange={e => setA(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Leg</p>
          <InputWithSuffix type="number" suffix="" value={b} onChange={e => setB(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">{detail}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Right triangle solver</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
