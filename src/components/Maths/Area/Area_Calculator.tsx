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

export function Area_Calculator() {
  type Shape = "rectangle" | "triangle" | "circle";
  const resultRef = useRef<HTMLElement>(null);
  const [shape, setShape] = useState<Shape>("rectangle");
  const [a, setA] = useState("10"); const [b, setB] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [hint, setHint] = useState("");
  const run = () => {
    setError(null);
    const x = parseFloat(a), y = parseFloat(b);
    if (shape === "rectangle") {
      if (Number.isNaN(x) || Number.isNaN(y) || x <= 0 || y <= 0) { setError("Enter positive length and width."); setOut(null); return; }
      setOut(formatNum(x * y)); setHint("length × width");
    } else if (shape === "triangle") {
      if (Number.isNaN(x) || Number.isNaN(y) || x <= 0 || y <= 0) { setError("Enter positive base and height."); setOut(null); return; }
      setOut(formatNum(0.5 * x * y)); setHint("½ × base × height");
    } else {
      if (Number.isNaN(x) || x <= 0) { setError("Enter a positive radius."); setOut(null); return; }
      setOut(formatNum(Math.PI * x * x)); setHint("πr²");
    }
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Shape</p>
        <CustomSelect<Shape> id="area-shape" value={shape} onChange={setShape}
          options={[{ value: "rectangle", label: "Rectangle" }, { value: "triangle", label: "Triangle" }, { value: "circle", label: "Circle" }]} /></div>
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">{shape === "circle" ? "Radius" : shape === "triangle" ? "Base" : "Length"}</p>
          <InputWithSuffix type="number" suffix="" value={a} onChange={e => setA(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
        {shape !== "circle" && (
          <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">{shape === "triangle" ? "Height" : "Width"}</p>
            <InputWithSuffix type="number" suffix="" value={b} onChange={e => setB(e.target.value)} inputClassName="w-full max-w-[9rem]" /></div>
        )}
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate area</button>
    </div>
  );
  const result = out != null ? (
    <><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[14px] text-[#334155]">{hint}</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Pick a shape</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
