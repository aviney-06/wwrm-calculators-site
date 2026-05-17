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

export function SpeedDistanceTime_Calculator() {
  type Solve = "speed" | "distance" | "time";
  const resultRef = useRef<HTMLElement>(null);
  const [solve, setSolve] = useState<Solve>("speed");
  const [d, setD] = useState("120");
  const [t, setT] = useState("2");
  const [s, setS] = useState("60");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [unit, setUnit] = useState("");
  const run = () => {
    setError(null);
    if (solve === "speed") {
      const dist = parseFloat(d), time = parseFloat(t);
      if (Number.isNaN(dist) || Number.isNaN(time) || time <= 0) { setError("Enter distance and positive time."); setOut(null); return; }
      setOut(formatNum(dist / time)); setUnit("per hour (if distance in miles & time in hours)");
    } else if (solve === "distance") {
      const speed = parseFloat(s), time = parseFloat(t);
      if (Number.isNaN(speed) || Number.isNaN(time) || time <= 0) { setError("Enter speed and positive time."); setOut(null); return; }
      setOut(formatNum(speed * time)); setUnit("distance units");
    } else {
      const dist = parseFloat(d), speed = parseFloat(s);
      if (Number.isNaN(dist) || Number.isNaN(speed) || speed <= 0) { setError("Enter distance and positive speed."); setOut(null); return; }
      setOut(formatNum(dist / speed)); setUnit("time units");
    }
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Find</p>
        <CustomSelect<Solve> id="sdt-solve" value={solve} onChange={setSolve}
          options={[{ value: "speed", label: "Speed" }, { value: "distance", label: "Distance" }, { value: "time", label: "Time" }]} /></div>
      {solve !== "distance" && (
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Distance</p>
          <InputWithSuffix type="number" suffix="" value={d} onChange={e => setD(e.target.value)} inputClassName="max-w-[10rem]" /></div>
      )}
      {solve !== "time" && (
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Time</p>
          <InputWithSuffix type="number" suffix="" value={t} onChange={e => setT(e.target.value)} inputClassName="max-w-[10rem]" /></div>
      )}
      {solve !== "speed" && (
        <div><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Speed</p>
          <InputWithSuffix type="number" suffix="" value={s} onChange={e => setS(e.target.value)} inputClassName="max-w-[10rem]" /></div>
      )}
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{out}</p><p className="text-center text-[13px] text-[#64748b]">{unit}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">speed = distance ÷ time</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
