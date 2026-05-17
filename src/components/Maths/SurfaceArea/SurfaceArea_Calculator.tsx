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

type SaShape = "box" | "cylinder" | "sphere";
export function SurfaceArea_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [shape, setShape] = useState<SaShape>("box");
  const [a, setA] = useState("10");
  const [b, setB] = useState("5");
  const [c, setC] = useState("4");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [label, setLabel] = useState("");
  const run = () => {
    setError(null);
    const x = parseFloat(a), y = parseFloat(b), z = parseFloat(c);
    let sa: number;
    if (shape === "box") {
      if ([x, y, z].some(n => Number.isNaN(n) || n <= 0)) { setError("Enter positive length, width, height."); setOut(null); return; }
      sa = 2 * (x * y + y * z + x * z);
      setLabel("2(lw + wh + lh)");
    } else if (shape === "cylinder") {
      if (Number.isNaN(x) || Number.isNaN(y) || x <= 0 || y <= 0) { setError("Enter positive radius and height."); setOut(null); return; }
      sa = 2 * Math.PI * x * (x + y);
      setLabel("2πr(r + h)");
    } else {
      if (Number.isNaN(x) || x <= 0) { setError("Enter positive radius."); setOut(null); return; }
      sa = 4 * Math.PI * x * x;
      setLabel("4πr²");
    }
    setOut(formatNum(sa));
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Shape</p>
        <CustomSelect<SaShape> id="sa-shape" value={shape} onChange={setShape}
          options={[{ value: "box", label: "Rectangular box" }, { value: "cylinder", label: "Cylinder" }, { value: "sphere", label: "Sphere" }]} /></div>
      <div className="grid grid-cols-3 gap-2">
        <InputWithSuffix type="number" suffix="" value={a} onChange={e => setA(e.target.value)} inputClassName="w-full" />
        <InputWithSuffix type="number" suffix="" value={b} onChange={e => setB(e.target.value)} inputClassName="w-full" />
        <InputWithSuffix type="number" suffix="" value={c} onChange={e => setC(e.target.value)} inputClassName="w-full" />
      </div>
      <p className="text-[12px] text-[#64748b]">{shape === "box" ? "l, w, h" : shape === "cylinder" ? "r, h, —" : "r, —, —"}</p>
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">{label}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Surface area</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
