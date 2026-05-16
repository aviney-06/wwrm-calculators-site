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
import { formatNum, gcd, lcm, lcmList, combinations, primeFactors } from "@/components/Maths/shared/mathUtils";

type FnType = "linear" | "quadratic";
export function Graph_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [fnType, setFnType] = useState<FnType>("linear");
  const [m, setM] = useState("2");
  const [b, setB] = useState("1");
  const [a, setA] = useState("1");
  const [xMin, setXMin] = useState("-2");
  const [xMax, setXMax] = useState("2");
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<string[] | null>(null);
  const run = () => {
    setError(null);
    const lo = parseFloat(xMin), hi = parseFloat(xMax);
    if (Number.isNaN(lo) || Number.isNaN(hi) || lo >= hi) { setError("x min must be less than x max."); setRows(null); return; }
    const pts: string[] = [];
    const steps = 5;
    for (let i = 0; i <= steps; i++) {
      const x = lo + (i / steps) * (hi - lo);
      let y: number;
      if (fnType === "linear") {
        const slope = parseFloat(m), intercept = parseFloat(b);
        if (Number.isNaN(slope) || Number.isNaN(intercept)) { setError("Enter valid m and b."); setRows(null); return; }
        y = slope * x + intercept;
      } else {
        const coef = parseFloat(a);
        if (Number.isNaN(coef)) { setError("Enter valid a."); setRows(null); return; }
        y = coef * x * x;
      }
      pts.push(`(${formatNum(x, 2)}, ${formatNum(y, 2)})`);
    }
    setRows(pts);
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CustomSelect<FnType> id="graph-fn" value={fnType} onChange={setFnType}
        options={[{ value: "linear", label: "y = mx + b" }, { value: "quadratic", label: "y = ax²" }]} />
      {fnType === "linear" ? (
        <div className="flex gap-2">
          <InputWithSuffix type="number" suffix="" value={m} onChange={e => setM(e.target.value)} inputClassName="w-[4rem]" />
          <span className="self-center text-[#64748b]">x +</span>
          <InputWithSuffix type="number" suffix="" value={b} onChange={e => setB(e.target.value)} inputClassName="w-[4rem]" />
        </div>
      ) : (
        <div><InputWithSuffix type="number" suffix="" value={a} onChange={e => setA(e.target.value)} inputClassName="w-[4rem]" />
          <span className="ml-1 text-[#64748b]">x²</span></div>
      )}
      <div className="grid grid-cols-2 gap-2">
        <InputWithSuffix type="number" suffix="" value={xMin} onChange={e => setXMin(e.target.value)} inputClassName="w-full" />
        <InputWithSuffix type="number" suffix="" value={xMax} onChange={e => setXMax(e.target.value)} inputClassName="w-full" />
      </div>
      <p className="text-[12px] text-[#64748b]">x min / x max</p>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Plot points</button>
    </div>
  );
  const result = rows != null ? (
    <div className="max-w-[14rem] text-center text-[13px] leading-relaxed text-[#334155]">
      {rows.map((row, i) => <p key={i} className={i === Math.floor(rows.length / 2) ? "font-bold text-[#d66844]" : ""}>{row}</p>)}
    </div>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Sample (x, y) points</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
