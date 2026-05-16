"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, parseNumberList, statsFromList } from "@/components/Maths/shared/mathUtils";

export function Average_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState("10, 20, 30, 40");
  const [error, setError] = useState<string | null>(null);
  const [avg, setAvg] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const vals = parseNumberList(raw);
    if (vals.length === 0) {
      setError("Enter at least one number (comma or space separated).");
      setAvg(null);
      return;
    }
    const s = statsFromList(vals);
    setAvg(formatNum(s.mean));
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
          placeholder="e.g. 10, 20, 30"
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate average</button>
    </div>
  );

  const result = avg != null ? (
    <>
      <p className="text-center text-3xl font-bold text-[#d66844]">{avg}</p>
      <p className="text-center text-[14px] text-[#334155]">arithmetic mean</p>
    </>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Sum ÷ count</p>
  );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
