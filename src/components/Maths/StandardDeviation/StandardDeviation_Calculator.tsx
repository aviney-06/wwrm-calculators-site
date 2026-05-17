"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, parseNumberList, statsFromList } from "@/components/Maths/shared/mathUtils";

export function StandardDeviation_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState("2, 4, 4, 4, 5, 5, 7, 9");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ sample: string; population: string } | null>(null);

  const run = () => {
    setError(null);
    const vals = parseNumberList(raw);
    if (vals.length < 2) {
      setError("Enter at least two numbers.");
      setOut(null);
      return;
    }
    const s = statsFromList(vals);
    setOut({
      sample: formatNum(s.sampleSd),
      population: formatNum(s.populationSd),
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Numbers</p>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={4}
          className="w-full rounded border border-[#E0E0E0] bg-white px-3 py-2 text-[14px] text-[#334155] outline-none focus:border-[#2374ac] focus:ring-1 focus:ring-[#2374ac]"
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );

  const result = out != null ? (
    <div className="w-full max-w-[14rem] space-y-2 text-[13px] text-[#334155]">
      <p className="text-center text-2xl font-bold text-[#d66844]">{out.sample}</p>
      <p className="text-center text-[14px] font-medium">sample SD (n−1)</p>
      <p className="pt-2 text-center"><span className="font-semibold">Population SD:</span> {out.population}</p>
    </div>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Sample & population standard deviation</p>
  );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
