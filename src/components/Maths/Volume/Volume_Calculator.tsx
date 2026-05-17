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

type Shape = "box" | "cylinder" | "sphere";

export function Volume_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [shape, setShape] = useState<Shape>("box");
  const [a, setA] = useState("10");
  const [b, setB] = useState("5");
  const [c, setC] = useState("4");
  const [error, setError] = useState<string | null>(null);
  const [vol, setVol] = useState<string | null>(null);
  const [label, setLabel] = useState("");

  const run = () => {
    setError(null);
    const x = parseFloat(a);
    const y = parseFloat(b);
    const z = parseFloat(c);
    let v: number;
    if (shape === "box") {
      if ([x, y, z].some((n) => Number.isNaN(n) || n <= 0)) {
        setError("Enter positive length, width, and height.");
        setVol(null);
        return;
      }
      v = x * y * z;
      setLabel("cubic units (l × w × h)");
    } else if (shape === "cylinder") {
      if (Number.isNaN(x) || Number.isNaN(y) || x <= 0 || y <= 0) {
        setError("Enter positive radius and height.");
        setVol(null);
        return;
      }
      v = Math.PI * x * x * y;
      setLabel("cubic units (πr²h)");
    } else {
      if (Number.isNaN(x) || x <= 0) {
        setError("Enter a positive radius.");
        setVol(null);
        return;
      }
      v = (4 / 3) * Math.PI * x * x * x;
      setLabel("cubic units (⁴⁄₃πr³)");
    }
    setVol(formatNum(v));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Shape</p>
        <CustomSelect<Shape>
          id="vol-shape"
          value={shape}
          onChange={setShape}
          options={[
            { value: "box", label: "Rectangular box" },
            { value: "cylinder", label: "Cylinder" },
            { value: "sphere", label: "Sphere" },
          ]}
        />
      </div>
      {shape === "box" ? (
        <div className="grid grid-cols-3 gap-2">
          <div>
            <p className="mb-1 text-[12px] font-medium text-[#334155]">Length</p>
            <InputWithSuffix type="number" suffix="" min={0} value={a} onChange={(e) => setA(e.target.value)} inputClassName="w-full" />
          </div>
          <div>
            <p className="mb-1 text-[12px] font-medium text-[#334155]">Width</p>
            <InputWithSuffix type="number" suffix="" min={0} value={b} onChange={(e) => setB(e.target.value)} inputClassName="w-full" />
          </div>
          <div>
            <p className="mb-1 text-[12px] font-medium text-[#334155]">Height</p>
            <InputWithSuffix type="number" suffix="" min={0} value={c} onChange={(e) => setC(e.target.value)} inputClassName="w-full" />
          </div>
        </div>
      ) : shape === "cylinder" ? (
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <div>
            <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Radius</p>
            <InputWithSuffix type="number" suffix="" min={0} value={a} onChange={(e) => setA(e.target.value)} inputClassName="w-full max-w-[9rem]" />
          </div>
          <div>
            <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Height</p>
            <InputWithSuffix type="number" suffix="" min={0} value={b} onChange={(e) => setB(e.target.value)} inputClassName="w-full max-w-[9rem]" />
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Radius</p>
          <InputWithSuffix type="number" suffix="" min={0} value={a} onChange={(e) => setA(e.target.value)} inputClassName="max-w-[9rem]" />
        </div>
      )}
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate volume</button>
    </div>
  );

  const result = vol != null ? (
    <>
      <p className="text-center text-3xl font-bold text-[#d66844]">{vol}</p>
      <p className="text-center text-[14px] text-[#334155]">{label}</p>
    </>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Box, cylinder, or sphere</p>
  );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
