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
import { formatNum, parseNumberList, allFactors, countSignificantFigures, decimalToFraction, fractionToString, simplifyFraction } from "@/components/Maths/shared/mathUtils";

type Known = "leg" | "hyp";
export function Triangle454590_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [known, setKnown] = useState<Known>("leg");
  const [val, setVal] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const run = () => {
    setError(null);
    const x = parseFloat(val);
    if (Number.isNaN(x) || x <= 0) { setError("Enter a positive length."); setLines(null); return; }
    const sqrt2 = Math.SQRT2;
    if (known === "leg") {
      setLines([`leg a = ${formatNum(x)}`, `leg b = ${formatNum(x)}`, `hypotenuse = ${formatNum(x * sqrt2)}`]);
    } else {
      const leg = x / sqrt2;
      setLines([`leg a = ${formatNum(leg)}`, `leg b = ${formatNum(leg)}`, `hypotenuse = ${formatNum(x)}`]);
    }
    scrollResultIntoViewMobile(resultRef.current);
  };
  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CustomSelect<Known> id="tri45" value={known} onChange={setKnown}
        options={[{ value: "leg", label: "Known: leg" }, { value: "hyp", label: "Known: hypotenuse" }]} />
      <InputWithSuffix type="number" suffix="" value={val} onChange={e => setVal(e.target.value)} inputClassName="max-w-[10rem]" />
      <FormError message={error} /><button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );
  const result = lines != null ? (
    <div className="space-y-1 text-center text-[#334155]">
      {lines.map((l, i) => <p key={i} className={i === 2 ? "text-xl font-bold text-[#d66844]" : "text-[14px]"}>{l}</p>)}
    </div>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Ratio 1 : 1 : √2</p>);
  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
