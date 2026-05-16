"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, gcd, lcm } from "@/components/Maths/shared/mathUtils";

export function Math_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [expr, setExpr] = useState("2 + 3 * 4");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {
    setError(null);
    const safe = expr.replace(/\s/g, "").replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
    if (!/^[0-9+\-*/().]+$/.test(safe)) { setError("Use numbers and + - * / ( ) only."); setOut(null); return; }
    try {
      const val = Function(`"use strict"; return (${safe})`)();
      if (typeof val !== "number" || !Number.isFinite(val)) throw new Error();
      setOut(formatNum(val, 8));
      scrollResultIntoViewMobile(resultRef.current);
    } catch {
      setError("Could not evaluate expression.");
      setOut(null);
    }
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Expression</p>
        <input className="h-10 w-full rounded border border-[#E0E0E0] px-3 font-mono text-[14px]" value={expr} onChange={e => setExpr(e.target.value)} /></div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">result</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Basic arithmetic</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
