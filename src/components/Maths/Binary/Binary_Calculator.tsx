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
import { formatNum, gcd, lcm } from "@/components/Maths/shared/mathUtils";

export function Binary_Calculator() {
  type Op = "add" | "sub" | "mul";
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("1010");
  const [b, setB] = useState("110");
  const [op, setOp] = useState<Op>("add");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [dec, setDec] = useState<string | null>(null);
  const parseBin = (s: string) => {
    const t = s.trim().replace(/^0b/i, "");
    if (!/^[01]+$/.test(t)) return null;
    return parseInt(t, 2);
  };
  const run = () => {
    setError(null);
    const x = parseBin(a), y = parseBin(b);
    if (x === null || y === null) { setError("Enter valid binary (0 and 1 only)."); setOut(null); return; }
    let r: number;
    if (op === "add") r = x + y;
    else if (op === "sub") r = x - y;
    else r = x * y;
    if (r < 0) { setError("Result is negative; try a different operation."); setOut(null); return; }
    setOut(r.toString(2));
    setDec(String(r));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Operation</p>
        <CustomSelect<Op> id="bin-op" value={op} onChange={setOp}
          options={[{ value: "add", label: "Add" }, { value: "sub", label: "Subtract" }, { value: "mul", label: "Multiply" }]} /></div>
      <div className="grid grid-cols-2 gap-2"><div><p className="mb-1 text-[12px] font-medium text-[#334155]">Binary 1</p>
        <input className="h-10 w-full max-w-[10rem] rounded border border-[#E0E0E0] px-2 font-mono text-[14px]" value={a} onChange={e => setA(e.target.value)} /></div>
        <div><p className="mb-1 text-[12px] font-medium text-[#334155]">Binary 2</p>
        <input className="h-10 w-full max-w-[10rem] rounded border border-[#E0E0E0] px-2 font-mono text-[14px]" value={b} onChange={e => setB(e.target.value)} /></div></div>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center font-mono text-2xl font-bold text-[#d66844] sm:text-3xl">{out}</p><p className="text-center text-[14px] text-[#334155]">decimal: {dec}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Binary arithmetic</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
